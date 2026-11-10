-- Demandes de devis de la page des tarifs (demandé le 10/11/2026 : « Demander un devis doit faire apparaître un formulaire simple
-- à remplir (profs seul, établissement, famille, profs particuliers...) et s'adapter en fonction »).
-- Écrites UNIQUEMENT par la fonction serveur demande-devis (clé de service) : aucun accès pour anon ni pour authenticated.
-- La table sert aussi de garde-fou contre les robots (nombre de demandes par adresse IP chiffrée, par heure).
create table if not exists public.demandes_devis (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profil text not null check (profil in ('seul', 'ecole', 'particulier', 'etablissement', 'famille')),
  nom text not null,
  email text not null,
  details jsonb not null default '{}'::jsonb,   -- champs propres au profil (niveaux, classes, effectifs, UAI...)
  estimation_centimes int,                       -- estimation indicative affichée au demandeur
  message text,
  ip_hash text,                                  -- empreinte SHA-256 de l'adresse IP (jamais l'adresse elle-même)
  traite boolean not null default false
);
create index if not exists demandes_devis_ip_idx on public.demandes_devis (ip_hash, created_at);
alter table public.demandes_devis enable row level security;
-- Aucune policy : seule la clé de service (fonction demande-devis, administration) y accède.
-- GRANT explicites (obligatoires pour toute nouvelle table depuis le 30/10/2026, voir CLAUDE.md) : service_role seulement.
revoke all on public.demandes_devis from anon, authenticated;
grant select, insert, update, delete on public.demandes_devis to service_role;
