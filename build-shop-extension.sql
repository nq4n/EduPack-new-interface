-- ================================
-- SCHEMA UPDATES FOR SHOP FUNCTIONALITY
-- ================================
-- Add missing columns to packages table for shop filtering and visibility

-- 1. Add new columns to packages table if they don't exist
alter table public.packages
add column if not exists grade text default 'all',
add column if not exists subject text default 'general',
add column if not exists price numeric(10,2) default 0,
add column if not exists thumbnail text default '/placeholder.svg',
add column if not exists is_public boolean default false;

-- 2. Create index for better query performance
create index if not exists packages_is_public_idx on public.packages(is_public);
create index if not exists packages_grade_idx on public.packages(grade);
create index if not exists packages_subject_idx on public.packages(subject);
create index if not exists packages_price_idx on public.packages(price);
create index if not exists packages_created_by_idx on public.packages(created_by_user_id);

-- 3. Update RLS policy to allow fetching public packages without authentication
drop policy if exists "Users can view packages they own or are public" on public.packages;

create policy "Users can view packages they own or are public"
  on public.packages for select
  using (
    is_public = true
    OR created_by_user_id = auth.uid()
    OR package_id IN (
      select package_id from public.package_owners
      where user_id = auth.uid()
    )
  );

-- 4. Ensure old policies don't conflict
drop policy if exists "Users can view packages they own" on public.packages;

-- 5. Add policy for public access (unauthenticated)
drop policy if exists "Public packages visible to all" on public.packages;

create policy "Public packages visible to all"
  on public.packages for select
  using (is_public = true);

-- ================================
-- PURCHASED_PACKAGES TABLE (for tracking purchases/access)
-- ================================
create table if not exists public.purchased_packages (
  id bigint generated always as identity primary key,
  user_id uuid references public.users(user_id) on delete cascade,
  package_id uuid references public.packages(package_id) on delete cascade,
  purchased_at timestamptz default now(),
  access_until timestamptz,
  unique(user_id, package_id)
);

alter table public.purchased_packages enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their purchases" on public.purchased_packages;
drop policy if exists "Users can insert their own purchases" on public.purchased_packages;

-- Create policies
create policy "Users can view their purchases"
  on public.purchased_packages for select
  using (user_id = auth.uid());

create policy "Users can insert their own purchases"
  on public.purchased_packages for insert
  with check (user_id = auth.uid());

-- Create indexes
create index if not exists purchased_packages_user_idx on public.purchased_packages(user_id);
create index if not exists purchased_packages_package_idx on public.purchased_packages(package_id);
