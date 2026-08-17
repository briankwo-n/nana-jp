-- Japan trip app: run this once in the Supabase SQL Editor.
-- Dashboard -> SQL Editor -> New query -> paste -> Run.

-- ---------------------------------------------------------------
-- 1. Shared trip state (itinerary, receipts, photo lists)
-- ---------------------------------------------------------------
create table if not exists public.docs (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.docs enable row level security;

-- Open access. There is no login, so anyone with the site URL can read and
-- write. Fine for a two-person trip app; do not reuse this pattern elsewhere.
drop policy if exists "trip read"   on public.docs;
drop policy if exists "trip insert" on public.docs;
drop policy if exists "trip update" on public.docs;
drop policy if exists "trip delete" on public.docs;

create policy "trip read"   on public.docs for select to anon using (true);
create policy "trip insert" on public.docs for insert to anon with check (true);
create policy "trip update" on public.docs for update to anon using (true) with check (true);
create policy "trip delete" on public.docs for delete to anon using (true);

-- ---------------------------------------------------------------
-- 2. Live sync
-- ---------------------------------------------------------------
alter publication supabase_realtime add table public.docs;

-- ---------------------------------------------------------------
-- 3. Photo storage bucket
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('trip-media', 'trip-media', true)
on conflict (id) do nothing;

drop policy if exists "media read"   on storage.objects;
drop policy if exists "media write"  on storage.objects;
drop policy if exists "media update" on storage.objects;
drop policy if exists "media delete" on storage.objects;

create policy "media read"   on storage.objects for select to anon
  using (bucket_id = 'trip-media');
create policy "media write"  on storage.objects for insert to anon
  with check (bucket_id = 'trip-media');
create policy "media update" on storage.objects for update to anon
  using (bucket_id = 'trip-media') with check (bucket_id = 'trip-media');
create policy "media delete" on storage.objects for delete to anon
  using (bucket_id = 'trip-media');
