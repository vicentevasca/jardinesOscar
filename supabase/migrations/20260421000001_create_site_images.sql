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

-- Storage: create public bucket for site images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  8388608,  -- 8 MB
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do nothing;

-- Storage RLS policies on storage.objects
create policy "site_images_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'site-images');

create policy "site_images_auth_upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-images');

create policy "site_images_auth_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-images');

create policy "site_images_auth_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-images');
