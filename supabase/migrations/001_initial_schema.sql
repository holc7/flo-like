-- ============================================
-- Cikel — Initial Database Schema
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  date_of_birth date,
  locale text not null default 'sl' check (locale in ('sl', 'en')),
  avg_cycle_length integer not null default 28 check (avg_cycle_length between 15 and 60),
  avg_period_length integer not null default 5 check (avg_period_length between 1 and 15),
  last_period_start date,
  notifications_enabled boolean not null default false,
  period_reminder_days integer not null default 2 check (period_reminder_days between 0 and 7),
  fertile_reminder boolean not null default false,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

-- ============================================
-- CYCLES
-- ============================================
create table public.cycles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  start_date date not null,
  end_date date,
  cycle_length integer check (cycle_length between 15 and 60),
  period_length integer check (period_length between 1 and 15),
  predicted_ovulation_date date,
  predicted_fertile_start date,
  predicted_fertile_end date,
  predicted_next_period date,
  is_predicted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, start_date)
);

alter table public.cycles enable row level security;

create policy "Users can view own cycles"
  on public.cycles for select
  using (auth.uid() = user_id);

create policy "Users can insert own cycles"
  on public.cycles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cycles"
  on public.cycles for update
  using (auth.uid() = user_id);

create policy "Users can delete own cycles"
  on public.cycles for delete
  using (auth.uid() = user_id);

create trigger cycles_updated_at
  before update on public.cycles
  for each row execute function public.update_updated_at();

create index idx_cycles_user_date on public.cycles(user_id, start_date desc);

-- ============================================
-- DAILY LOGS
-- ============================================
create type public.cervical_mucus_type as enum (
  'dry', 'sticky', 'creamy', 'watery', 'egg_white'
);

create table public.daily_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  log_date date not null,
  is_period_day boolean not null default false,
  flow_intensity integer check (flow_intensity between 1 and 5),
  mood integer check (mood between 1 and 5),
  energy_level integer check (energy_level between 1 and 5),
  pain_level integer check (pain_level between 0 and 5),
  sleep_quality integer check (sleep_quality between 1 and 5),
  physical_symptoms text[] default '{}',
  emotional_symptoms text[] default '{}',
  exercise boolean default false,
  intimacy boolean default false,
  cervical_mucus public.cervical_mucus_type,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, log_date)
);

alter table public.daily_logs enable row level security;

create policy "Users can view own logs"
  on public.daily_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own logs"
  on public.daily_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own logs"
  on public.daily_logs for update
  using (auth.uid() = user_id);

create policy "Users can delete own logs"
  on public.daily_logs for delete
  using (auth.uid() = user_id);

create trigger daily_logs_updated_at
  before update on public.daily_logs
  for each row execute function public.update_updated_at();

create index idx_daily_logs_user_date on public.daily_logs(user_id, log_date desc);

-- ============================================
-- ARTICLES
-- ============================================
create type public.article_category as enum (
  'menstrual_health', 'nutrition', 'exercise', 'mental_health', 'fertility', 'general'
);

create table public.articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title_sl text not null,
  title_en text not null,
  body_sl text not null,
  body_en text not null,
  excerpt_sl text,
  excerpt_en text,
  category public.article_category not null default 'general',
  cover_image_url text,
  is_published boolean not null default false,
  relevant_phases text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "Authenticated users can read published articles"
  on public.articles for select
  using (is_published = true);

create trigger articles_updated_at
  before update on public.articles
  for each row execute function public.update_updated_at();

create index idx_articles_category on public.articles(category);
create index idx_articles_slug on public.articles(slug);

-- ============================================
-- PUSH SUBSCRIPTIONS
-- ============================================
create table public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now(),
  unique(user_id, endpoint)
);

alter table public.push_subscriptions enable row level security;

create policy "Users can view own subscriptions"
  on public.push_subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can insert own subscriptions"
  on public.push_subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own subscriptions"
  on public.push_subscriptions for delete
  using (auth.uid() = user_id);

-- ============================================
-- NOTIFICATION LOG
-- ============================================
create table public.notification_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  notification_type text not null,
  sent_at timestamptz not null default now(),
  payload jsonb
);

alter table public.notification_log enable row level security;

create policy "Users can view own notification log"
  on public.notification_log for select
  using (auth.uid() = user_id);

create index idx_notification_log_user on public.notification_log(user_id, sent_at desc);
