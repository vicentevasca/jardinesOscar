alter table public.leads
  add column if not exists status text not null default 'nuevo'
    check (status in ('nuevo','contactado','propuesta','cerrado','descartado')),
  add column if not exists notes text;
