-- ============================================
-- Cikel — GDPR Consents
-- ============================================

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null check (consent_type in ('health_data_processing', 'cycle_predictions')),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(user_id, consent_type)
);

alter table public.consents enable row level security;

create policy "Users can view own consents"
  on public.consents for select
  using (auth.uid() = user_id);

create policy "Users can insert own consents"
  on public.consents for insert
  with check (auth.uid() = user_id);

create policy "Users can update own consents"
  on public.consents for update
  using (auth.uid() = user_id);

create index idx_consents_user on public.consents(user_id);
