-- Adresse e-mail des élèves (demandé le 08/11/2026 : « Pour les élèves, il serait intéressant d'avoir une "option email".
-- L'idée par exemple serait de pouvoir renseigner les emails de l'établissement s'ils en ont, de pouvoir également
-- renseigner celui de l'enseignant et ainsi de permettre un envoi direct des mots de passes oubliés ou autres. »)
--
-- Choix validés : seules les adresses des domaines déclarés par l'établissement (messagerie de l'établissement, ENT,
-- Google Workspace for Education…) ; saisie par le professeur ; l'adresse ne sert qu'une fois confirmée par l'élève
-- (lien reçu dans sa boîte). « Mot de passe oublié » : lien à l'adresse de l'élève, sinon à son professeur.
-- Les adresses restent dans public.profil_contact (même table que les adultes), lue seulement par la fonction « profil ».

alter table public.etablissements add column if not exists domaines_eleves text[] not null default '{}';
comment on column public.etablissements.domaines_eleves is
  'Domaines des adresses e-mail des élèves acceptés (ex. eleves.college-x.fr), déclarés par un professeur de l''établissement.';

alter table public.profil_contact add column if not exists saisi_par uuid references auth.users(id) on delete set null;
comment on column public.profil_contact.saisi_par is
  'Compte qui a saisi l''adresse (professeur, pour un élève) ; null si la personne l''a saisie elle-même.';
