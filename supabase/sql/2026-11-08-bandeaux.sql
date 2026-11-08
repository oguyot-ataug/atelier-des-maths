-- Bandeaux d'information (demandé le 08/11/2026 : « Peut-on mettre une option "bandeau" qui permet à l'administrateur de
-- placer un bandeau d'information (destination à définir sous chips à cocher), un référent établissement et un professeur
-- pour une ou plusieurs classes. »)
--
-- Trois portées :
--   site          : l'administrateur ; destinataires cochés (visiteurs, élèves, professeurs, parents, référents),
--                   filtres facultatifs par niveaux et par établissements ;
--   etablissement : le référent de l'établissement (uai) ; destinataires professeurs et/ou élèves de l'établissement,
--                   filtre facultatif par niveaux ;
--   classes       : un professeur, pour une ou plusieurs de SES classes (class_ids) ; destinataires élèves et/ou
--                   professeurs de ces classes.
-- L'affichage passe par bandeaux_pour_moi() (SECURITY DEFINER) : la table elle-même n'est lisible que par ceux qui gèrent
-- les bandeaux (auteur, administrateur, référent de l'établissement).

create table if not exists public.bandeaux (
  id uuid primary key default gen_random_uuid(),
  auteur uuid not null default auth.uid() references auth.users(id) on delete cascade,
  portee text not null check (portee in ('site', 'etablissement', 'classes')),
  uai text references public.etablissements(uai) on delete cascade,
  class_ids uuid[] not null default '{}',
  cibles text[] not null default '{}' check (cibles <@ array['visiteur', 'eleve', 'prof', 'parent', 'referent'] and cardinality(cibles) > 0),
  niveaux text[] not null default '{}',
  uais text[] not null default '{}',
  texte text not null check (char_length(btrim(texte)) between 1 and 500),
  lien text check (lien is null or lien ~ '^(https://[^\s<>"]+|#/[A-Za-z0-9/_-]*)$'),
  lien_libelle text check (lien_libelle is null or char_length(lien_libelle) <= 40),
  style text not null default 'info' check (style in ('info', 'important', 'alerte', 'succes')),
  defile boolean not null default false,
  fermable boolean not null default true,
  debut timestamptz not null default now(),
  fin timestamptz,
  actif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (portee <> 'etablissement' or uai is not null),
  check (portee <> 'classes' or cardinality(class_ids) > 0),
  check (fin is null or fin > debut)
);
comment on table public.bandeaux is 'Bandeaux d''information affichés en haut du site (administrateur, référent d''établissement, professeur).';

create index if not exists bandeaux_actifs on public.bandeaux (portee) where actif;

-- Toutes les classes données appartiennent au professeur connecté (et ne sont pas archivées).
create or replace function public.bandeau_classes_ok(p_ids uuid[])
returns boolean language sql stable security definer set search_path = public as $$
  select cardinality(p_ids) > 0 and not exists (
    select 1 from unnest(p_ids) x(id)
    where not exists (select 1 from public.class_teachers ct where ct.class_id = x.id and ct.teacher_id = auth.uid())
  );
$$;

-- L'auteur et la date de création ne changent pas ; updated_at suit chaque modification (un bandeau modifié réapparaît
-- chez ceux qui l'avaient fermé).
create or replace function public.bandeaux_maj() returns trigger language plpgsql as $$
begin
  if tg_op = 'UPDATE' then new.auteur := old.auteur; new.created_at := old.created_at; end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists bandeaux_maj on public.bandeaux;
create trigger bandeaux_maj before insert or update on public.bandeaux for each row execute function public.bandeaux_maj();

alter table public.bandeaux enable row level security;

drop policy if exists bandeaux_lire on public.bandeaux;
create policy bandeaux_lire on public.bandeaux for select to authenticated using (
  auteur = auth.uid() or public.is_admin() or (portee = 'etablissement' and public.is_referent_of(uai))
);

drop policy if exists bandeaux_creer on public.bandeaux;
create policy bandeaux_creer on public.bandeaux for insert to authenticated with check (
  public.is_admin()
  or (auteur = auth.uid() and portee = 'etablissement' and public.is_referent_of(uai) and cibles <@ array['eleve', 'prof']
      and cardinality(uais) = 0 and cardinality(class_ids) = 0)
  or (auteur = auth.uid() and portee = 'classes' and public.bandeau_classes_ok(class_ids) and cibles <@ array['eleve', 'prof']
      and uai is null and cardinality(uais) = 0 and cardinality(niveaux) = 0)
);

drop policy if exists bandeaux_modifier on public.bandeaux;
create policy bandeaux_modifier on public.bandeaux for update to authenticated using (
  public.is_admin() or (portee = 'etablissement' and public.is_referent_of(uai)) or (portee = 'classes' and auteur = auth.uid())
) with check (
  public.is_admin()
  or (portee = 'etablissement' and public.is_referent_of(uai) and cibles <@ array['eleve', 'prof']
      and cardinality(uais) = 0 and cardinality(class_ids) = 0)
  or (portee = 'classes' and auteur = auth.uid() and public.bandeau_classes_ok(class_ids) and cibles <@ array['eleve', 'prof']
      and uai is null and cardinality(uais) = 0 and cardinality(niveaux) = 0)
);

drop policy if exists bandeaux_supprimer on public.bandeaux;
create policy bandeaux_supprimer on public.bandeaux for delete to authenticated using (
  public.is_admin() or (portee = 'etablissement' and public.is_referent_of(uai)) or (portee = 'classes' and auteur = auth.uid())
);

-- Droits de la Data API (obligatoires pour les nouvelles tables depuis le 30/10/2026). Les visiteurs ne lisent pas la
-- table : ils passent par bandeaux_pour_moi().
grant select, insert, update, delete on public.bandeaux to authenticated;
grant select, insert, update, delete on public.bandeaux to service_role;

-- Bandeaux à afficher pour le compte connecté (ou pour un visiteur). origine : qui parle (« L'Atelier des Maths »,
-- le nom de l'établissement, le nom du professeur).
create or replace function public.bandeaux_pour_moi()
returns table (id uuid, texte text, lien text, lien_libelle text, style text, defile boolean, fermable boolean,
               portee text, origine text, maj timestamptz)
language plpgsql stable security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_role text; v_uai text;
  r text[] := '{}'; n text[] := '{}'; u text[] := '{}'; cl_el uuid[] := '{}'; cl_pr uuid[] := '{}';
begin
  if v_uid is not null then
    select p.role, p.uai into v_role, v_uai from profiles p where p.id = v_uid;
  end if;
  if v_role = 'eleve' then
    r := array['eleve'];
    select coalesce(array_agg(c.id), '{}'), coalesce(array_agg(distinct lower(c.niveau)) filter (where c.niveau is not null), '{}'),
           coalesce(array_agg(distinct c.uai) filter (where c.uai is not null), '{}')
      into cl_el, n, u
      from class_students cs join classes c on c.id = cs.class_id
      where cs.student_id = v_uid and not coalesce(c.archive, false);
  elsif v_role = 'prof' then
    r := array['prof'];
    if exists (select 1 from etablissements e where e.referent_id = v_uid) then r := r || 'referent'::text; end if;
    select coalesce(array_agg(c.id), '{}'), coalesce(array_agg(distinct lower(c.niveau)) filter (where c.niveau is not null), '{}'),
           coalesce(array_agg(distinct c.uai) filter (where c.uai is not null), '{}')
      into cl_pr, n, u
      from class_teachers ct join classes c on c.id = ct.class_id
      where ct.teacher_id = v_uid and not coalesce(c.archive, false);
    u := u || coalesce((select array_agg(e.uai) from etablissements e where e.referent_id = v_uid), '{}');
  elsif v_role = 'parent' then
    r := array['parent'];
    select coalesce(array_agg(distinct lower(f.niveau)) filter (where f.niveau is not null), '{}'),
           coalesce(array_agg(distinct f.uai) filter (where f.uai is not null), '{}')
      into n, u from famille_enfants f where f.parent_id = v_uid;
  end if;
  if v_uai is not null then u := u || v_uai; end if;

  return query
  select b.id, b.texte, b.lien, b.lien_libelle, b.style, b.defile, b.fermable, b.portee,
         case b.portee
           when 'site' then 'L''Atelier des Maths'
           when 'etablissement' then coalesce((select e.nom from etablissements e where e.uai = b.uai), 'Votre établissement')
           else coalesce(nullif(btrim(coalesce(pa.prenom, '') || ' ' || coalesce(pa.nom, '')), ''), 'Votre professeur')
         end,
         b.updated_at
  from bandeaux b
  left join profiles pa on pa.id = b.auteur
  where b.actif and b.debut <= now() and (b.fin is null or b.fin > now())
    and (
      (b.portee = 'site' and (
         (v_uid is null and 'visiteur' = any(b.cibles))
         or (v_uid is not null and b.cibles && r
             and (cardinality(b.niveaux) = 0 or array(select lower(x) from unnest(b.niveaux) x) && n)
             and (cardinality(b.uais) = 0 or b.uais && u))))
      or (b.portee = 'etablissement' and v_uid is not null and b.uai = any(u) and b.cibles && r
          and (cardinality(b.niveaux) = 0 or array(select lower(x) from unnest(b.niveaux) x) && n))
      or (b.portee = 'classes' and v_uid is not null and (
           ('eleve' = any(b.cibles) and b.class_ids && cl_el)
           or ('prof' = any(b.cibles) and b.class_ids && cl_pr)))
    )
  order by case b.style when 'alerte' then 0 when 'important' then 1 else 2 end, b.portee = 'classes' desc, b.updated_at desc
  limit 5;
end $$;

revoke all on function public.bandeaux_pour_moi() from public;
grant execute on function public.bandeaux_pour_moi() to anon, authenticated;
grant execute on function public.bandeau_classes_ok(uuid[]) to authenticated;
