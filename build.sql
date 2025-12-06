-- ================================
-- 1. USERS TABLE
-- ================================
create table if not exists public.users (
  user_id uuid primary key default auth.uid(),
  email text not null unique,
  full_name text,
  avatar_url text,
  preferred_language text check (preferred_language in ('ar', 'en')),
  created_at timestamptz default now()
);

-- RLS
alter table public.users enable row level security;

drop policy if exists "Users can view their own profile" on public.users;
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own profile" on public.users;
create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = user_id);

-- ================================
-- 2. PACKAGES TABLE
-- ================================
create table if not exists public.packages (
  package_id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  storage_path text not null,
  created_by_user_id uuid references public.users(user_id) on delete cascade,
  created_at timestamptz default now()
);

alter table public.packages enable row level security;

drop policy if exists "Users can view packages they own" on public.packages;
create policy "Users can view packages they own"
  on public.packages for select
  using (
    created_by_user_id = auth.uid()
    OR package_id IN (
      select package_id from public.package_owners
      where user_id = auth.uid()
    )
  );

drop policy if exists "Users can insert their own packages" on public.packages;
create policy "Users can insert their own packages"
  on public.packages for insert
  with check (created_by_user_id = auth.uid());

drop policy if exists "Users can update their own packages" on public.packages;
create policy "Users can update their own packages"
  on public.packages for update
  using (
    created_by_user_id = auth.uid()
    OR package_id IN (
      select package_id from public.package_owners
      where user_id = auth.uid() and can_edit = true
    )
  );

drop policy if exists "Users can delete their own packages" on public.packages;
create policy "Users can delete their own packages"
  on public.packages for delete
  using (
    created_by_user_id = auth.uid()
    OR package_id IN (
      select package_id from public.package_owners
      where user_id = auth.uid() and role = 'owner' -- Or another condition you prefer
    )
  );

-- ================================
-- 3. PACKAGE_OWNERS TABLE
-- ================================
create table if not exists public.package_owners (
  id bigint generated always as identity primary key,
  package_id uuid references public.packages(package_id) on delete cascade,
  user_id uuid references public.users(user_id) on delete cascade,
  role text default 'owner',
  can_edit boolean default true,
  created_at timestamptz default now()
);

alter table public.package_owners enable row level security;

drop policy if exists "Users can view ownership entries they belong to" on public.package_owners;
create policy "Users can view ownership entries they belong to"
  on public.package_owners for select
  using (
    package_id IN (
      select package_id from public.packages
      -- This reuses the SELECT policy from the packages table
      -- to determine who can see the owners list.
    )
  );

drop policy if exists "Package owners can add new collaborators" on public.package_owners;
create policy "Package owners can add new collaborators"
  on public.package_owners for insert
  with check (
    exists (
      select 1
      from public.packages p
      left join public.package_owners po on p.package_id = po.package_id
      where p.package_id = package_owners.package_id
      and (
        p.created_by_user_id = auth.uid() -- User is the original creator
        or (po.user_id = auth.uid() and po.role = 'owner') -- Or user is an owner
      )
    )
  );

drop policy if exists "Package owners can remove collaborators" on public.package_owners;
create policy "Package owners can remove collaborators"
  on public.package_owners for delete
  using (
    exists (
      select 1
      from public.packages p
      left join public.package_owners po on p.package_id = po.package_id
      where p.package_id = package_owners.package_id
      and (
        p.created_by_user_id = auth.uid() -- User is the original creator
        or (po.user_id = auth.uid() and po.role = 'owner') -- Or user is an owner
      )
    )
  );

drop policy if exists "Package owners can update collaborator roles" on public.package_owners;
create policy "Package owners can update collaborator roles"
  on public.package_owners for update
  using (
    exists (
      select 1
      from public.packages p
      left join public.package_owners po on p.package_id = po.package_id
      where p.package_id = package_owners.package_id
      and (
        p.created_by_user_id = auth.uid() -- User is the original creator
        or (po.user_id = auth.uid() and po.role = 'owner') -- Or user is an owner
      )
    )
  )
  with check ( true ); -- Add more specific checks if needed

-- ================================
-- 4. BILLING TABLE
-- ================================
create table if not exists public.billing (
  billing_id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(user_id) on delete cascade,
  billing_type text check (billing_type in ('subscription', 'credit')),
  amount numeric(10,2) not null,
  credit_value integer,
  notes text,
  created_at timestamptz default now()
);

alter table public.billing enable row level security;

drop policy if exists "Users can view their own billing" on public.billing;
create policy "Users can view their own billing"
  on public.billing for select
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own billing entries" on public.billing;
create policy "Users can insert their own billing entries"
  on public.billing for insert
  with check (user_id = auth.uid());

-- ================================
-- 5. MESSAGES TABLE (Team notifications)
-- ================================
create table if not exists public.messages (
  message_id bigint generated always as identity primary key,
  name text,
  email text,
  message text,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

drop policy if exists "Messages are readable by admins only" on public.messages;
create policy "Messages are readable by admins only"
  on public.messages for select
  using (auth.role() = 'service_role');   -- adjust if needed

drop policy if exists "Anyone can submit a message" on public.messages;
create policy "Anyone can submit a message"
  on public.messages for insert
  with check (true);

-- ================================
-- 6. STORAGE POLICIES (packages bucket)
-- ================================
-- Make sure the bucket exists:
insert into storage.buckets (id, name, public)
values ('packages', 'packages', false)
on conflict do nothing;

-- Allow users to upload files inside their folder
drop policy if exists "Users can upload to their folder" on storage.objects;
create policy "Users can upload to their folder"
on storage.objects for insert
with check (
  bucket_id = 'packages'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read files inside their folder
drop policy if exists "Users can read their files" on storage.objects;
create policy "Users can read their files"
on storage.objects for select
using (
  bucket_id = 'packages'
  and ( (storage.foldername(name))[1] = auth.uid()::text -- User is the owner of the folder
    or exists ( -- Or the user is a collaborator on a package within this folder
      select 1
      from public.packages p
      join public.package_owners po on p.package_id = po.package_id
      where p.created_by_user_id::text = (storage.foldername(name))[1] -- The folder belongs to the package creator
      and po.user_id = auth.uid() -- And the current user is listed as an owner/collaborator
    )
  )
);

-- ================================
-- 7. RPC FUNCTIONS
-- ================================
create or replace function get_accessible_packages()
returns setof packages
language sql
security definer
as $$
  select p.*
  from public.packages p where p.created_by_user_id = auth.uid()
  union
  select p.*
  from public.packages p
  join public.package_owners po on p.package_id = po.package_id
  where po.user_id = auth.uid();
$$;

-- Grant execute permission to authenticated users
grant execute on function public.get_accessible_packages() to authenticated;

-- ================================
-- 8. TRIGGERS
-- ================================
-- Function to add creator to package_owners table
create or replace function public.handle_new_package_owner()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.package_owners (package_id, user_id, role, can_edit)
  values (new.package_id, new.created_by_user_id, 'owner', true);
  return new;
end;
$$;

drop trigger if exists on_package_created on public.packages;
-- Trigger to call the function after a new package is inserted
create trigger on_package_created
  after insert on public.packages
  for each row execute procedure public.handle_new_package_owner();

drop policy if exists "Users can delete package files" on storage.objects;
-- Allow package owners and collaborators with edit rights to delete files
create policy "Users can delete package files"
on storage.objects for delete
using (
  bucket_id = 'packages'
  and ( (storage.foldername(name))[1] = auth.uid()::text -- User is the owner of the folder
    or exists ( -- Or the user is a collaborator with edit rights
      select 1
      from public.packages p
      join public.package_owners po on p.package_id = po.package_id
      where p.created_by_user_id::text = (storage.foldername(name))[1] -- The folder belongs to the package creator
      and po.user_id = auth.uid() -- And the current user is a collaborator
      and po.can_edit = true -- And they have edit permissions
    )
  )
);

-- ================================
-- 9. USER SYNC TRIGGER
-- ================================
-- Function to create a new user profile when a new user signs up in Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (user_id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger to call the function after a new user is created in the auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
