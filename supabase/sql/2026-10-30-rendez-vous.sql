-- Outil de prise de rendez-vous du site (demandé le 30/10/2026 : « Est-il possible de créer son propre outil de
-- réservation ? », puis « Oui, lance-le avec les mêmes plages que Cal.com »). Fonction serveur : supabase/functions/rdv.
-- Réglages (une ligne) et réservations : lus et modifiés par l'administrateur (RLS is_admin) ; les visiteurs passent
-- uniquement par la fonction rdv (clé de service). GRANT explicites (nouvelles tables, voir CLAUDE.md).

create table public.rdv_reglages (
  id int primary key default 1 check (id = 1),
  actif boolean not null default true,
  -- Plages par jour de la semaine (1 = lundi … 7 = dimanche), heures de Paris : {"1": [["18:00","20:00"]], …}
  plages jsonb not null default '{}'::jsonb,
  duree_min int not null default 30 check (duree_min between 10 and 180),
  pause_min int not null default 10 check (pause_min between 0 and 120),
  preavis_h int not null default 12 check (preavis_h between 0 and 336),
  horizon_j int not null default 60 check (horizon_j between 1 and 365),
  -- Périodes sans rendez-vous : [{"du":"2026-12-19","au":"2027-01-03","motif":"Vacances"}]
  bloques jsonb not null default '[]'::jsonb,
  rappel_veille boolean not null default true,
  -- Lien de visio de secours, tant que l'agenda Google n'est pas relié (sinon un lien Meet par rendez-vous)
  lien_visio text not null default '',
  updated_at timestamptz not null default now()
);
insert into public.rdv_reglages (id, plages) values (1, '{"1":[["18:00","20:00"]],"2":[["08:00","12:00"]],"6":[["09:00","11:30"]]}');
alter table public.rdv_reglages enable row level security;
create policy rdv_reglages_admin on public.rdv_reglages for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
grant select, update on public.rdv_reglages to authenticated;
grant select, insert, update, delete on public.rdv_reglages to service_role;

create table public.rdv_reservations (
  id uuid primary key default gen_random_uuid(),
  debut timestamptz not null,
  fin timestamptz not null,
  nom text not null,
  email text not null,
  etablissement text not null default '',
  objet text not null default '',
  message text not null default '',
  user_id uuid references auth.users(id) on delete set null,
  statut text not null default 'confirme' check (statut in ('confirme', 'annule')),
  jeton text not null unique default replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
  google_event_id text,
  meet_url text,
  rappel_envoye_at timestamptz,
  annule_at timestamptz,
  annule_par text,
  created_at timestamptz not null default now()
);
-- Un seul rendez-vous confirmé par horaire de début (la fonction vérifie aussi les chevauchements).
create unique index rdv_reservations_debut_confirme on public.rdv_reservations (debut) where statut = 'confirme';
create index rdv_reservations_debut on public.rdv_reservations (debut);
create index rdv_reservations_user on public.rdv_reservations (user_id);
alter table public.rdv_reservations enable row level security;
create policy rdv_reservations_admin on public.rdv_reservations for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
grant select, update, delete on public.rdv_reservations to authenticated;
grant select, insert, update, delete on public.rdv_reservations to service_role;

-- Tâches automatiques (migration rendez_vous_taches_auto) : rappels la veille et purge à un an.
create extension if not exists pg_net;
create extension if not exists pg_cron;
select cron.schedule('rdv-rappels', '17 * * * *', $$select net.http_post(url := 'https://tdsdwbsvduitgrrrfjrp.supabase.co/functions/v1/rdv', body := '{"action":"rappels"}'::jsonb, headers := '{"Content-Type":"application/json"}'::jsonb)$$);
select cron.schedule('rdv-purge', '43 3 * * *', $$delete from public.rdv_reservations where fin < now() - interval '1 year'$$);

-- Agendas pris en compte (migration rendez_vous_agendas, demandé : « Il faudrait qu'il puisse prendre en compte d'autres
-- agendas secondaires ou autre ») : identifiants Google, 'primary' = agenda principal.
alter table public.rdv_reglages add column agendas text[] not null default '{primary}';
