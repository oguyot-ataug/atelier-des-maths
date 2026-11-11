-- Dossiers « Mes évaluations et figures » élargis (demandé le 11/11/2026 : « Quand je crée un pdf, je pourrais aussi l'enregistrer dans ces
-- dossiers, quid des blocs de codage ? », choix : programmes par blocs + PDF des cours exportés).
--   * prog_programmes : programmes de la Création libre enregistrés sous un nom (avant : seulement sur l'appareil) ;
--   * prog_defis_perso.dossier_id : les défis créés par le professeur se rangent aussi ;
--   * docs_pdf + stockage privé « documents » : copie des PDF de cours exportés (chemin <user_id>/<uuid>.pdf).
-- Contrôle commun : le dossier d'un élément appartient à son propriétaire (dossier_controle).

create or replace function public.dossier_controle()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare u uuid := coalesce(to_jsonb(new)->>'user_id', to_jsonb(new)->>'teacher_id')::uuid;
begin
  if new.dossier_id is not null and not exists (select 1 from public.eval_dossiers d where d.id = new.dossier_id and d.user_id = u) then
    raise exception 'Ce dossier n''est pas à vous.';
  end if;
  return new;
end;
$function$;

-- Programmes par blocs.
create table if not exists public.prog_programmes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nom text not null check (char_length(nom) between 1 and 80),
  programme jsonb not null,
  dossier_id uuid references public.eval_dossiers(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (user_id, nom)
);
create index if not exists prog_programmes_dossier_idx on public.prog_programmes (dossier_id);
alter table public.prog_programmes enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'prog_programmes' and policyname = 'prog_programmes_moi') then
    create policy prog_programmes_moi on public.prog_programmes for all to authenticated
      using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
  end if;
end $$;
-- GRANT explicites (obligatoires pour toute nouvelle table depuis le 30/10/2026, voir CLAUDE.md) ; rien pour anon.
grant select, insert, update, delete on public.prog_programmes to authenticated;
grant select, insert, update, delete on public.prog_programmes to service_role;

-- Défis créés par le professeur.
alter table public.prog_defis_perso add column if not exists dossier_id uuid references public.eval_dossiers(id) on delete set null;

-- PDF des cours exportés.
create table if not exists public.docs_pdf (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nom text not null check (char_length(nom) between 1 and 120),
  chemin text not null unique,
  taille integer,
  dossier_id uuid references public.eval_dossiers(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists docs_pdf_user_idx on public.docs_pdf (user_id);
create index if not exists docs_pdf_dossier_idx on public.docs_pdf (dossier_id);
alter table public.docs_pdf enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'docs_pdf' and policyname = 'docs_pdf_moi') then
    create policy docs_pdf_moi on public.docs_pdf for all to authenticated
      using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()) and chemin like (select auth.uid())::text || '/%');
  end if;
end $$;
grant select, insert, update, delete on public.docs_pdf to authenticated;
grant select, insert, update, delete on public.docs_pdf to service_role;

-- Déclencheurs de contrôle du dossier.
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'prog_programmes_dossier') then
    create trigger prog_programmes_dossier before insert or update of dossier_id on public.prog_programmes for each row execute function public.dossier_controle();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'prog_defis_perso_dossier') then
    create trigger prog_defis_perso_dossier before insert or update of dossier_id on public.prog_defis_perso for each row execute function public.dossier_controle();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'docs_pdf_dossier') then
    create trigger docs_pdf_dossier before insert or update of dossier_id on public.docs_pdf for each row execute function public.dossier_controle();
  end if;
end $$;

-- Stockage privé des PDF : chacun lit, ajoute et supprime seulement dans son dossier <user_id>/ ; 20 Mo par fichier, PDF seulement.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values ('documents', 'documents', false, 20971520, array['application/pdf'])
  on conflict (id) do nothing;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'documents_moi_lire') then
    create policy documents_moi_lire on storage.objects for select to authenticated
      using (bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'documents_moi_ajouter') then
    create policy documents_moi_ajouter on storage.objects for insert to authenticated
      with check (bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'documents_moi_supprimer') then
    create policy documents_moi_supprimer on storage.objects for delete to authenticated
      using (bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
  end if;
end $$;
