-- Performance des règles d'accès (RLS) et index des clés étrangères -- 25/10/2026.
-- Demandé : « vendre un produit qui bloque, non merci ! ». Signalé par l'outil de conseils de Supabase :
--  - 138 règles (sur 154) recalculaient auth.uid() / is_admin() pour CHAQUE ligne lue. Écrites
--    (select auth.uid()), elles sont calculées une seule fois par requête : même résultat, mêmes droits.
--  - 46 clés étrangères sans index (lectures par élève / par classe, suppressions en cascade).
-- Sans danger si on le relance : une règle déjà réécrite n'est plus modifiée (« SELECT auth.uid() »).
-- Réécritures vérifiées une à une avant (EXPLAIN de chaque nouvelle condition, 0 erreur).

-- Copie des règles AVANT modification, dans un schéma non exposé à l'API (retour arrière : voir la fin).
create schema if not exists sauvegarde;
revoke all on schema sauvegarde from public, anon, authenticated;
create table if not exists sauvegarde.policies_20261025 as
  select tablename, policyname, qual, with_check from pg_policies where schemaname = 'public';

do $$
declare r record; n int := 0;
begin
  for r in
    with p as (
      select tablename, policyname, qual, with_check,
        regexp_replace(regexp_replace(qual, '(?<!SELECT )auth\.(uid|role|jwt)\(\)', '(select auth.\1())', 'g'),
                       '(?<!SELECT )(?<![.\w])(public\.)?is_admin\(\)', '(select public.is_admin())', 'g') as nq,
        regexp_replace(regexp_replace(with_check, '(?<!SELECT )auth\.(uid|role|jwt)\(\)', '(select auth.\1())', 'g'),
                       '(?<!SELECT )(?<![.\w])(public\.)?is_admin\(\)', '(select public.is_admin())', 'g') as nw
      from pg_policies where schemaname = 'public')
    select * from p where nq is distinct from qual or nw is distinct from with_check
  loop
    execute format('alter policy %I on public.%I', r.policyname, r.tablename)
      || case when r.nq is not null then format(' using (%s)', r.nq) else '' end
      || case when r.nw is not null then format(' with check (%s)', r.nw) else '' end;
    n := n + 1;
  end loop;
  raise notice '% règles réécrites', n;
end $$;

create index if not exists ai_usage_log_class_id_fk on public.ai_usage_log (class_id);
create index if not exists bilan_appreciations_class_id_fk on public.bilan_appreciations (class_id);
create index if not exists bilan_appreciations_student_id_fk on public.bilan_appreciations (student_id);
create index if not exists bug_reports_reporter_id_fk on public.bug_reports (reporter_id);
create index if not exists cahier_entries_teacher_id_fk on public.cahier_entries (teacher_id);
create index if not exists ceb_results_devoir_id_fk on public.ceb_results (devoir_id);
create index if not exists class_teachers_teacher_id_fk on public.class_teachers (teacher_id);
create index if not exists classes_creee_par_fk on public.classes (creee_par);
create index if not exists cm_results_devoir_id_fk on public.cm_results (devoir_id);
create index if not exists cours_direct_class_id_fk on public.cours_direct (class_id);
create index if not exists cours_direct_teacher_id_fk on public.cours_direct (teacher_id);
create index if not exists cours_direct_membres_student_id_fk on public.cours_direct_membres (student_id);
create index if not exists cours_direct_travaux_student_id_fk on public.cours_direct_travaux (student_id);
create index if not exists devoirs_questionnaire_id_fk on public.devoirs (questionnaire_id);
create index if not exists devoirs_teacher_id_fk on public.devoirs (teacher_id);
create index if not exists devoirs_rendus_student_id_fk on public.devoirs_rendus (student_id);
create index if not exists evaluations_owner_id_fk on public.evaluations (owner_id);
create index if not exists evaluations_updated_by_fk on public.evaluations (updated_by);
create index if not exists facturation_documents_client_id_fk on public.facturation_documents (client_id);
create index if not exists facturation_documents_prof_id_fk on public.facturation_documents (prof_id);
create index if not exists facturation_documents_source_id_fk on public.facturation_documents (source_id);
create index if not exists famille_paiements_facture_id_fk on public.famille_paiements (facture_id);
create index if not exists famille_paiements_parent_id_fk on public.famille_paiements (parent_id);
create index if not exists figures_sauvegardees_user_id_fk on public.figures_sauvegardees (user_id);
create index if not exists notes_papier_class_id_fk on public.notes_papier (class_id);
create index if not exists notes_papier_evaluation_id_fk on public.notes_papier (evaluation_id);
create index if not exists olivia_messages_class_id_fk on public.olivia_messages (class_id);
create index if not exists permis_rapporteur_resultats_classe_id_fk on public.permis_rapporteur_resultats (classe_id);
create index if not exists permis_rapporteur_resultats_eleve_id_fk on public.permis_rapporteur_resultats (eleve_id);
create index if not exists permis_rapporteur_sessions_classe_id_fk on public.permis_rapporteur_sessions (classe_id);
create index if not exists permis_rapporteur_sessions_prof_id_fk on public.permis_rapporteur_sessions (prof_id);
create index if not exists prof_paiements_prof_id_fk on public.prof_paiements (prof_id);
create index if not exists prog_defis_perso_teacher_id_fk on public.prog_defis_perso (teacher_id);
create index if not exists prog_defis_solution_teacher_id_fk on public.prog_defis_solution (teacher_id);
create index if not exists progressions_etab_auteur_id_fk on public.progressions_etab (auteur_id);
create index if not exists progressions_etab_valide_par_fk on public.progressions_etab (valide_par);
create index if not exists questionnaires_teacher_id_fk on public.questionnaires (teacher_id);
create index if not exists qz_cartes_student_id_fk on public.qz_cartes (student_id);
create index if not exists qz_copies_student_id_fk on public.qz_copies (student_id);
create index if not exists qz_direct_devoir_id_fk on public.qz_direct (devoir_id);
create index if not exists qz_direct_questionnaire_id_fk on public.qz_direct (questionnaire_id);
create index if not exists qz_direct_teacher_id_fk on public.qz_direct (teacher_id);
create index if not exists qz_direct_membres_student_id_fk on public.qz_direct_membres (student_id);
create index if not exists qz_direct_rep_student_id_fk on public.qz_direct_rep (student_id);
create index if not exists relecture_beta_user_id_fk on public.relecture_beta (user_id);
create index if not exists student_ai_access_student_id_fk on public.student_ai_access (student_id);

-- Contrôle : doit afficher 0 règle restante.
select count(*) as regles_restantes from pg_policies
where schemaname = 'public' and (qual ~ '(?<!SELECT )auth\.uid\(\)' or with_check ~ '(?<!SELECT )auth\.uid\(\)');

-- RETOUR ARRIÈRE (seulement en cas de problème) : remet chaque règle exactement comme avant.
-- do $$ declare r record; begin
--   for r in select * from sauvegarde.policies_20261025 loop
--     execute format('alter policy %I on public.%I', r.policyname, r.tablename)
--       || case when r.qual is not null then format(' using (%s)', r.qual) else '' end
--       || case when r.with_check is not null then format(' with check (%s)', r.with_check) else '' end;
--   end loop; end $$;
