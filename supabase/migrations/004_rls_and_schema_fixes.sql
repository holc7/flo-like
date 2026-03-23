-- ============================================
-- Fix RLS policies: wrap auth.uid() in subquery for per-query evaluation
-- Fix update_updated_at() search_path
-- Fix articles policy to require authenticated role
-- Remove redundant slug index
-- ============================================

-- Fix update_updated_at() function
create or replace function public.update_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Drop redundant index (slug already has unique constraint)
drop index if exists idx_articles_slug;

-- ============================================
-- PROFILES: fix RLS policies
-- ============================================
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can delete own profile" on public.profiles;

create policy "Users can view own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.profiles for update
  using ((select auth.uid()) = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check ((select auth.uid()) = id);

create policy "Users can delete own profile"
  on public.profiles for delete
  using ((select auth.uid()) = id);

-- ============================================
-- CYCLES: fix RLS policies
-- ============================================
drop policy if exists "Users can view own cycles" on public.cycles;
drop policy if exists "Users can insert own cycles" on public.cycles;
drop policy if exists "Users can update own cycles" on public.cycles;
drop policy if exists "Users can delete own cycles" on public.cycles;

create policy "Users can view own cycles"
  on public.cycles for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own cycles"
  on public.cycles for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update own cycles"
  on public.cycles for update
  using ((select auth.uid()) = user_id);

create policy "Users can delete own cycles"
  on public.cycles for delete
  using ((select auth.uid()) = user_id);

-- ============================================
-- DAILY_LOGS: fix RLS policies
-- ============================================
drop policy if exists "Users can view own logs" on public.daily_logs;
drop policy if exists "Users can insert own logs" on public.daily_logs;
drop policy if exists "Users can update own logs" on public.daily_logs;
drop policy if exists "Users can delete own logs" on public.daily_logs;

create policy "Users can view own logs"
  on public.daily_logs for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own logs"
  on public.daily_logs for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update own logs"
  on public.daily_logs for update
  using ((select auth.uid()) = user_id);

create policy "Users can delete own logs"
  on public.daily_logs for delete
  using ((select auth.uid()) = user_id);

-- ============================================
-- ARTICLES: fix RLS policy to require authenticated role
-- ============================================
drop policy if exists "Authenticated users can read published articles" on public.articles;

create policy "Authenticated users can read published articles"
  on public.articles for select
  to authenticated
  using (is_published = true);

-- ============================================
-- PUSH_SUBSCRIPTIONS: fix RLS policies
-- ============================================
drop policy if exists "Users can view own subscriptions" on public.push_subscriptions;
drop policy if exists "Users can insert own subscriptions" on public.push_subscriptions;
drop policy if exists "Users can delete own subscriptions" on public.push_subscriptions;

create policy "Users can view own subscriptions"
  on public.push_subscriptions for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own subscriptions"
  on public.push_subscriptions for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own subscriptions"
  on public.push_subscriptions for delete
  using ((select auth.uid()) = user_id);

-- ============================================
-- NOTIFICATION_LOG: fix RLS policy
-- ============================================
drop policy if exists "Users can view own notification log" on public.notification_log;

create policy "Users can view own notification log"
  on public.notification_log for select
  using ((select auth.uid()) = user_id);

-- ============================================
-- CONSENTS: fix RLS policies
-- ============================================
drop policy if exists "Users can view own consents" on public.consents;
drop policy if exists "Users can insert own consents" on public.consents;
drop policy if exists "Users can update own consents" on public.consents;

create policy "Users can view own consents"
  on public.consents for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert own consents"
  on public.consents for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update own consents"
  on public.consents for update
  using ((select auth.uid()) = user_id);
