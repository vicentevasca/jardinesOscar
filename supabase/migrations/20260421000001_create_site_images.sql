-- Stores custom image overrides uploaded by the admin
create table if not exists public.site_images (
  key        text primary key,
  url        text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_images enable row level security;

-- Anyone can read published images (needed by public landing page)
create policy "public_select" on public.site_images
  for select to anon, authenticated
  using (true);

-- Only authenticated admin can insert/update/delete
create policy "auth_upsert" on public.site_images
  for all to authenticated
  using (true)
  with check (true);

-- Also allow authenticated to update leads.read flag
create policy "auth_update_leads" on public.leads
  for update to authenticated
  using (true)
  with check (true);

-- Storage bucket for site images (run once manually if not using migrations)
-- In Supabase dashboard: Storage → New bucket → "site-images" → Public
