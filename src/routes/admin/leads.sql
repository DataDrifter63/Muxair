-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Creates the `leads` table used by /contact (insert) and /admin/leads (view/manage).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  business_name text not null,
  service_area text not null,
  need text not null,
  other_info text,
  heard_about text,
  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone (the public contact form, using the anon key) can submit a lead.
create policy "Public can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- Only logged-in admin users can read, update (status), or delete leads.
create policy "Authenticated can read leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "Authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

create policy "Authenticated can delete leads"
  on public.leads for delete
  to authenticated
  using (true);
