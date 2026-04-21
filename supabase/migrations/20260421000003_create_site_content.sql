create table if not exists public.site_content (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "public_select" on public.site_content
  for select to anon, authenticated using (true);

create policy "auth_all" on public.site_content
  for all to authenticated using (true) with check (true);
