-- CP, CE1 et CE2 entrent dans les offres (demandé le 10/11/2026 : « ajouter toutes les classes CP... à 3e ! partout où c'est
-- nécessaire », puis prix de l'école étendus du CP au CM2). Deux fonctions de la base limitaient encore les niveaux.

-- Offre Famille : niveaux payés + le niveau inférieur en révision, désormais du CP à la 3e (CE1 → CP, CM1 → CE2…).
create or replace function public.famille_niveaux_ouverts(p_niveaux text[])
 returns text[]
 language sql
 immutable
as $function$
  select coalesce(array_agg(n order by o), '{}') from (
    select distinct n, o from unnest(array['cp','ce1','ce2','cm1','cm2','6e','5e','4e','3e']) with ordinality as t(n, o)
    where n = any (p_niveaux)
       or (o < 9 and (array['cp','ce1','ce2','cm1','cm2','6e','5e','4e','3e'])[o + 1] = any (p_niveaux))
  ) s;
$function$;

-- Groupes de remédiation : CP et CE1 acceptés (CE2 à 3e jusqu'ici).
create or replace function public.groupe_enregistrer(p_id uuid, p_nom text, p_niveau text, p_eleves uuid[])
 returns uuid
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v_moi public.profiles; v_id uuid; v_ok uuid[]; v_niv text;
begin
  select * into v_moi from public.profiles where id = auth.uid();
  if v_moi.id is null or v_moi.role not in ('prof','admin') then raise exception 'Réservé aux professeurs.'; end if;
  if coalesce(trim(p_nom), '') = '' then raise exception 'Donnez un nom au groupe.'; end if;
  v_niv := case when upper(coalesce(p_niveau, '')) in ('CP','CE1','CE2','CM1','CM2') then upper(p_niveau) else p_niveau end;
  if coalesce(v_niv, '') not in ('CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e') then raise exception 'Niveau inconnu.'; end if;
  select coalesce(array_agg(distinct e.student_id), '{}') into v_ok from public.groupe_eleves_possibles() e where e.student_id = any(coalesce(p_eleves, '{}'));
  if coalesce(array_length(v_ok, 1), 0) = 0 then raise exception 'Choisissez au moins un élève.'; end if;
  if coalesce(array_length(v_ok, 1), 0) > 60 then raise exception 'Un groupe compte 60 élèves au plus.'; end if;
  if p_id is null then
    insert into public.classes (nom, niveau, uai, groupe, groupe_prof) values (left(trim(p_nom), 60), v_niv, v_moi.uai, true, v_moi.id) returning id into v_id;
    insert into public.class_teachers (class_id, teacher_id) values (v_id, v_moi.id);
  else
    select id into v_id from public.classes where id = p_id and groupe and not archive and groupe_prof = v_moi.id;
    if v_id is null then raise exception 'Groupe introuvable.'; end if;
    update public.classes set nom = left(trim(p_nom), 60), niveau = v_niv where id = v_id;
  end if;
  delete from public.class_students where class_id = v_id and student_id <> all(v_ok);
  insert into public.class_students (class_id, student_id) select v_id, x from unnest(v_ok) x
    where not exists(select 1 from public.class_students cs where cs.class_id = v_id and cs.student_id = x);
  return v_id;
end $function$;
