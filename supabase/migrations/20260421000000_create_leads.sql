create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  nombre          text not null,
  telefono        text not null,
  email           text not null,
  comuna          text not null,
  tipo_propiedad  text,
  tipo_jardin     text,
  tamano          text,
  presupuesto     text,
  mensaje         text
);

alter table public.leads enable row level security;

-- Allow anonymous inserts only (public contact form)
create policy "anon_insert" on public.leads
  for insert to anon
  with check (true);

-- Only authenticated users (admin) can read
create policy "auth_select" on public.leads
  for select to authenticated
  using (true);
