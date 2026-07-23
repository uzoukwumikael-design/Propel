-- ─────────────────────────────────────────────
-- PROPEL — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  plan text default 'starter' check (plan in ('starter', 'builder', 'scale')),
  stripe_customer_id text unique,
  ai_credits_used integer default 0,
  ai_credits_limit integer default 10,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── PROJECTS ──────────────────────────────────
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  tagline text,
  website text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy "Users can crud own projects"
  on public.projects for all
  using (auth.uid() = user_id);

-- ── COPY GENERATIONS ──────────────────────────
create table public.copy_generations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  copy_type text not null,
  tone text,
  product_description text,
  target_audience text,
  results jsonb,
  saved_copy text,
  created_at timestamptz default now()
);

alter table public.copy_generations enable row level security;

create policy "Users can crud own generations"
  on public.copy_generations for all
  using (auth.uid() = user_id);

-- ── PRESS KITS ────────────────────────────────
create table public.press_kits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  company_name text not null,
  kit_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.press_kits enable row level security;

create policy "Users can crud own press kits"
  on public.press_kits for all
  using (auth.uid() = user_id);

-- ── CHECKLIST PROGRESS ────────────────────────
create table public.checklist_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  completed_ids integer[] default '{}',
  updated_at timestamptz default now()
);

alter table public.checklist_progress enable row level security;

create policy "Users can crud own checklist"
  on public.checklist_progress for all
  using (auth.uid() = user_id);

-- ── SUBSCRIPTIONS ─────────────────────────────
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_subscription_id text unique,
  stripe_price_id text,
  plan text not null,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);
