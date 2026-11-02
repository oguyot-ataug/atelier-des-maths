-- Rapport d'utilisation des voix en ligne (demandé le 02/11/2026 : « En admin, est-il possible d'avoir un rapport sur
-- l'utilisation de text-to-speech en nombres de caractères ? ») : le compteur voix_usage distingue la gamme de voix
-- (Neural2, Studio… : prix et part gratuite différents chez Google) et compte les synthèses (une par texte nouveau).
alter table public.voix_usage add column if not exists gamme text not null default 'Neural2';
alter table public.voix_usage add column if not exists syntheses integer not null default 0;
alter table public.voix_usage drop constraint if exists voix_usage_pkey;
alter table public.voix_usage add primary key (jour, user_id, gamme);
-- Droits inchangés : seule la fonction « voix » (service_role) lit et écrit.
revoke all on public.voix_usage from anon, authenticated;
grant select, insert, update, delete on public.voix_usage to service_role;
