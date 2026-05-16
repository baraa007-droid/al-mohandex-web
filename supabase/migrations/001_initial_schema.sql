-- =====================================================
-- Al-Mohandex Supabase Migration
-- 001_initial_schema.sql
-- =====================================================

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique not null,
  role text default 'user',
  avatar_url text,
  created_at timestamptz default now()
);

create index if not exists idx_users_role on users(role);

-- =====================================================
-- 2. PROJECTS TABLE
-- =====================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  category text,
  image_url text,
  technologies text[],
  featured boolean default false,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz default now()
);

create index if not exists idx_projects_slug on projects(slug);
create index if not exists idx_projects_category on projects(category);
create index if not exists idx_projects_featured on projects(featured);

-- =====================================================
-- 3. CONTACTS TABLE
-- =====================================================
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

create index if not exists idx_contacts_status on contacts(status);

-- =====================================================
-- 4. BLOG_POSTS TABLE
-- =====================================================
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  published boolean default false,
  author_id uuid references users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_blog_slug on blog_posts(slug);
create index if not exists idx_blog_published on blog_posts(published);

-- =====================================================
-- 5. CHAT_MESSAGES TABLE
-- =====================================================
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references users(id) on delete cascade,
  role text not null,
  message text not null,
  created_at timestamptz default now()
);

create index if not exists idx_chat_sender on chat_messages(sender_id);

-- =====================================================
-- 6. ADMIN_SETTINGS TABLE
-- =====================================================
create table if not exists admin_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text,
  maintenance_mode boolean default false,
  settings jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table users enable row level security;
alter table projects enable row level security;
alter table contacts enable row level security;
alter table blog_posts enable row level security;
alter table chat_messages enable row level security;
alter table admin_settings enable row level security;

-- =====================================================
-- USERS POLICIES
-- =====================================================
create policy "Users can view their own profile"
  on users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on users for select
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

create policy "Users can update their own profile"
  on users for update
  using (auth.uid() = id);

-- =====================================================
-- PROJECTS POLICIES
-- =====================================================
create policy "Public projects are viewable"
  on projects for select
  using (true);

create policy "Admins full access to projects"
  on projects for all
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- =====================================================
-- CONTACTS POLICIES
-- =====================================================
create policy "Anyone can create contacts"
  on contacts for insert
  with check (true);

create policy "Admins full access to contacts"
  on contacts for all
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- =====================================================
-- BLOG_POSTS POLICIES
-- =====================================================
create policy "Published posts are viewable"
  on blog_posts for select
  using (published = true);

create policy "Admins full access to blog posts"
  on blog_posts for all
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- =====================================================
-- CHAT_MESSAGES POLICIES
-- =====================================================
create policy "Users can insert chat messages"
  on chat_messages for insert
  with check (auth.uid() = sender_id);

create policy "Users can view their own messages"
  on chat_messages for select
  using (auth.uid() = sender_id);

create policy "Admins full access to chat messages"
  on chat_messages for all
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- =====================================================
-- ADMIN_SETTINGS POLICIES
-- =====================================================
create policy "Admins full access to settings"
  on admin_settings for all
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- =====================================================
-- TRIGGER: Auto-create user profile on signup
-- =====================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =====================================================
-- TRIGGER: Auto-update updated_at on blog_posts
-- =====================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger set_blog_posts_updated_at
  before update on blog_posts
  for each row
  execute function public.handle_updated_at();
