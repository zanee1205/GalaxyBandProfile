-- Galaxy Band booking MVP. Run this in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text,
  email text,
  show_type text not null,
  event_date date,
  note text,
  source_page text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'confirmed', 'cancelled')),
  email_sent boolean not null default false,
  email_error text,
  constraint bookings_contact_required check (phone is not null or email is not null)
);

alter table public.bookings enable row level security;

-- No policies are intentionally created. Requests are written only by the
-- Vercel function using SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
