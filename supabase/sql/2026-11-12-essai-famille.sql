-- Essai Famille de 15 jours (demandé le 12/11/2026 : « Oui, mets en place l'essai Famille de 15 jours »).
-- À la création d'un compte Famille (fonction famille, action inscription), tous les niveaux du CP à la 3e
-- s'ouvrent pour 15 jours, pour le parent et ses enfants, sans carte bancaire.
-- L'essai est rangé À PART du paiement (essai_until) : niveaux, acces_until et montant_paye_centimes restent
-- ceux des paiements Stripe (famille_activer, devis, factures inchangés) ; un essai n'est jamais compté comme payé.
-- Aucune nouvelle table : pas de GRANT à ajouter.

alter table public.familles add column if not exists essai_until date;

-- État du compte Famille connecté : accès payé OU essai en cours.
create or replace function public.ma_famille()
 returns jsonb
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select jsonb_build_object(
    'parent_id', f.parent_id,
    'est_parent', f.parent_id = (select auth.uid()),
    'active', coalesce(f.acces_until >= current_date, false) or coalesce(f.essai_until >= current_date, false),
    'paye', coalesce(f.acces_until >= current_date, false),
    'essai', coalesce(f.essai_until >= current_date, false) and not coalesce(f.acces_until >= current_date, false),
    'essai_until', f.essai_until,
    'acces_until', f.acces_until,
    'niveaux', to_jsonb(f.niveaux),
    'niveaux_ouverts', to_jsonb(case
      when f.essai_until >= current_date then array['cp','ce1','ce2','cm1','cm2','6e','5e','4e','3e']
      when f.acces_until >= current_date then public.famille_niveaux_ouverts(f.niveaux)
      else '{}'::text[] end))
  from public.familles f
  where f.parent_id = (select auth.uid())
     or f.parent_id = (select parent_id from public.famille_enfants where enfant_id = (select auth.uid()));
$function$;

-- IA des enfants (avec la clé du parent) : aussi pendant l'essai.
create or replace function public.ai_student_sponsor(p_student uuid, p_feature text)
 returns table(teacher_id uuid, class_id uuid, quota integer, used integer, key_mode text, teacher_uai text)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select s.teacher_id, cs.class_id,
    case when s.student_mode = 'selected' and a.quota is not null then a.quota else s.student_weekly_quota end,
    (select count(*)::int from public.ai_usage_log l
      where l.user_id = p_student and l.billed_to = s.teacher_id and l.created_at > now() - interval '7 days'),
    case when p.role = 'admin' then 'site' else s.key_mode end,
    p.uai
  from public.class_students cs
  join public.class_teachers ct on ct.class_id = cs.class_id
  join public.teacher_ai_settings s on s.teacher_id = ct.teacher_id
  join public.profiles p on p.id = s.teacher_id
  left join public.student_ai_access a on a.teacher_id = s.teacher_id and a.student_id = p_student
  where cs.student_id = p_student
    and s.ai_students
    and coalesce((s.student_features ->> p_feature)::boolean, false)
    and public.ai_teacher_key_available(s.teacher_id)
    and (s.student_mode = 'all' or coalesce(a.enabled, false))
  union all
  select fe.parent_id, null::uuid, fe.ia_quota,
    (select count(*)::int from public.ai_usage_log l
      where l.user_id = p_student and l.billed_to = fe.parent_id and l.created_at > now() - interval '7 days'),
    'perso', null::text
  from public.famille_enfants fe
  join public.familles f on f.parent_id = fe.parent_id
  join public.teacher_ai_settings s on s.teacher_id = fe.parent_id
  where fe.enfant_id = p_student
    and fe.ia_enabled
    and (f.acces_until >= current_date or f.essai_until >= current_date)
    and coalesce((fe.ia_features ->> p_feature)::boolean, false)
    and s.key_secret_id is not null;
$function$;

-- IA du parent lui-même (avec sa clé) : aussi pendant l'essai.
create or replace function public.my_ai_access()
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare v_role text; v_uai text; s public.teacher_ai_settings; r jsonb := '{}'::jsonb; f text; ok boolean;
begin
  select role, uai into v_role, v_uai from public.profiles where id = auth.uid();
  if v_role is null then return jsonb_build_object('role', null); end if;
  if v_role in ('prof','admin') then
    select * into s from public.teacher_ai_settings where teacher_id = auth.uid();
    return jsonb_build_object('role', v_role,
      'self', v_role = 'admin' or coalesce(s.ai_self and public.ai_teacher_key_available(auth.uid()), false),
      'has_key', s.key_secret_id is not null,
      'key_mode', case when v_role = 'admin' then 'site' else coalesce(s.key_mode,'perso') end,
      'site_key', v_role = 'admin' or coalesce(s.key_mode,'perso') = 'site',
      'etab_key', exists (select 1 from public.etablissements e where e.uai = v_uai and e.ai_key_secret_id is not null));
  end if;
  if v_role = 'parent' then
    select * into s from public.teacher_ai_settings where teacher_id = auth.uid();
    return jsonb_build_object('role', v_role,
      'self', exists (select 1 from public.familles fa where fa.parent_id = auth.uid() and fa.ia_parent
                        and (fa.acces_until >= current_date or fa.essai_until >= current_date))
              and s.key_secret_id is not null,
      'has_key', s.key_secret_id is not null, 'key_mode', 'perso', 'site_key', false, 'etab_key', false);
  end if;
  foreach f in array array['quiz','tableau','figure'] loop
    select exists (select 1 from public.ai_student_sponsor(auth.uid(), f) sp where sp.quota is null or sp.used < sp.quota) into ok;
    r := r || jsonb_build_object(f, ok);
  end loop;
  r := r || jsonb_build_object('olivia', exists (select 1 from public.ai_olivia_sponsor(auth.uid())));
  return jsonb_build_object('role', v_role, 'features', r);
end $function$;
