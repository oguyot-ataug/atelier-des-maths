-- Manuel ouvert aux enfants des comptes Famille (demandé le 12/11/2026 : « oui » à « ouvrir le Manuel aux enfants des
-- familles, en mode entraînement, correction après un essai, résultats dans le suivi du parent »).
-- Une ligne par enfant et par exercice (ref = niveau|code du chapitre|planche|exercice|version).
-- L'enfant écrit seulement ses lignes, et seulement s'il est un enfant d'un compte Famille ; le parent lit celles
-- de ses enfants. Rien pour les visiteurs.

create table if not exists public.famille_manuel (
  enfant_id   uuid not null references auth.users(id) on delete cascade,
  ref         text not null check (length(ref) <= 120),
  niveau      text not null check (length(niveau) <= 8),
  chapitre    text not null check (length(chapitre) <= 160),
  libelle     text not null check (length(libelle) <= 120),
  ecran       boolean not null default false,  -- exercice fait à l'écran (vérifié) ; sinon fait dans le cahier
  juste       integer check (juste >= 0),
  total       integer check (total >= 0),
  meilleur    integer check (meilleur >= 0),
  essais      integer not null default 0 check (essais >= 0),
  fini        boolean not null default false,  -- « J'ai fini dans mon cahier » (exercices à faire dans le cahier)
  correction_vue boolean not null default false,
  etat        jsonb check (pg_column_size(etat) <= 20000), -- réponses à l'écran, pour reprendre l'exercice
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (enfant_id, ref)
);
create index if not exists famille_manuel_maj on public.famille_manuel (enfant_id, updated_at desc);

alter table public.famille_manuel enable row level security;

create policy famille_manuel_enfant_lit on public.famille_manuel for select to authenticated
  using (enfant_id = (select auth.uid()));
create policy famille_manuel_enfant_ajoute on public.famille_manuel for insert to authenticated
  with check (enfant_id = (select auth.uid())
    and exists (select 1 from public.famille_enfants fe where fe.enfant_id = (select auth.uid())));
create policy famille_manuel_enfant_modifie on public.famille_manuel for update to authenticated
  using (enfant_id = (select auth.uid()))
  with check (enfant_id = (select auth.uid())
    and exists (select 1 from public.famille_enfants fe where fe.enfant_id = (select auth.uid())));
create policy famille_manuel_parent_lit on public.famille_manuel for select to authenticated
  using (enfant_id in (select fe.enfant_id from public.famille_enfants fe where fe.parent_id = (select auth.uid())));

-- Accès à la Data API (obligatoire pour les tables créées depuis le 30/10/2026) ; RLS décide des lignes.
grant select, insert, update on public.famille_manuel to authenticated;
grant select, insert, update, delete on public.famille_manuel to service_role;
