-- Supabase schema: mirrored from the product team's provided script so RLS/table expectations stay in sync with the backend.
-- ================================
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

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on public.users;
drop policy if exists "Users can insert their own profile on signup" on public.users;
drop policy if exists "Users can update their own profile" on public.users;

-- Create policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = user_id);

create policy "Users can insert their own profile on signup"
  on public.users for insert
  with check (auth.uid() = user_id);

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

-- Drop existing policies if they exist
drop policy if exists "Users can view packages they own" on public.packages;
drop policy if exists "Users can insert their own packages" on public.packages;
drop policy if exists "Users can update their own packages" on public.packages;
drop policy if exists "Users can delete their own packages" on public.packages;

-- Create policies
create policy "Users can view packages they own"
  on public.packages for select
  using (
    created_by_user_id = auth.uid()
    OR package_id IN (
      select package_id from public.package_owners
      where user_id = auth.uid()
    )
  );

create policy "Users can insert their own packages"
  on public.packages for insert
  with check (created_by_user_id = auth.uid());

create policy "Users can update their own packages"
  on public.packages for update
  using (created_by_user_id = auth.uid());

create policy "Users can delete their own packages"
  on public.packages for delete
  using (created_by_user_id = auth.uid());

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

-- Drop existing policies if they exist
drop policy if exists "Users can view ownership entries they belong to" on public.package_owners;
drop policy if exists "Only package creator can add owners" on public.package_owners;
drop policy if exists "Only package creator can remove owners" on public.package_owners;
drop policy if exists "Only package creator can update collaborator roles" on public.package_owners;

-- Create policies
create policy "Users can view ownership entries they belong to"
  on public.package_owners for select
  using (user_id = auth.uid());

create policy "Only package creator can add owners"
  on public.package_owners for insert
  with check (
    exists (
      select 1 from public.packages
      where packages.package_id = package_owners.package_id
      and packages.created_by_user_id = auth.uid()
    )
  );

create policy "Only package creator can remove owners"
  on public.package_owners for delete
  using (
    exists (
      select 1 from public.packages
      where packages.package_id = package_owners.package_id
      and packages.created_by_user_id = auth.uid()
    )
  );

create policy "Only package creator can update collaborator roles"
  on public.package_owners for update
  using (
    exists (
      select 1 from public.packages
      where packages.package_id = package_owners.package_id
      and packages.created_by_user_id = auth.uid()
    )
  );

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

-- Drop existing policies if they exist
drop policy if exists "Users can view their own billing" on public.billing;
drop policy if exists "Users can insert their own billing entries" on public.billing;

-- Create policies
create policy "Users can view their own billing"
  on public.billing for select
  using (user_id = auth.uid());

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

-- Drop existing policies if they exist
drop policy if exists "Messages are readable by admins only" on public.messages;
drop policy if exists "Anyone can submit a message" on public.messages;

-- Create policies
create policy "Messages are readable by admins only"
  on public.messages for select
  using (auth.role() = 'service_role');   -- adjust if needed

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

-- Drop existing storage policies if they exist
drop policy if exists "Users can upload to their folder" on storage.objects;
drop policy if exists "Users can read their files" on storage.objects;
drop policy if exists "Users can delete their files" on storage.objects;

-- Allow users to upload files inside their folder
create policy "Users can upload to their folder"
on storage.objects for insert
with check (
  bucket_id = 'packages'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read files inside their folder
create policy "Users can read their files"
on storage.objects for select
using (
  bucket_id = 'packages'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own files
create policy "Users can delete their files"
on storage.objects for delete
using (
  bucket_id = 'packages'
  and (storage.foldername(name))[1] = auth.uid()::text
);
