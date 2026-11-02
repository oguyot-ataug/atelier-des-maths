-- Voix naturelles en ligne (Azure AI Speech) -- demandé le 02/11/2026 : « essayons ». Voir supabase/functions/voix.
-- 1. Stockage public « voix » : un fichier MP3 par texte et par voix, synthétisé une seule fois puis réutilisé par tous.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('voix', 'voix', true, 5242880, array['audio/mpeg'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['audio/mpeg'];

-- 2. Compteur de caractères synthétisés (plafond du mois pour le site, plafond du jour par compte). Seule la fonction
-- « voix » (service_role) y lit et écrit : aucun accès pour les comptes du site.
create table if not exists public.voix_usage (
  jour date not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  caracteres integer not null default 0,
  primary key (jour, user_id)
);
alter table public.voix_usage enable row level security;
revoke all on public.voix_usage from anon, authenticated;
grant select, insert, update, delete on public.voix_usage to service_role;
