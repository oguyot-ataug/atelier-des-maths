# Notes pour Claude (conventions du projet)

## Supabase : GRANT explicite obligatoire pour toute nouvelle table (à partir du 30/10/2026)

Depuis le 30 octobre 2026, Supabase ne donne plus automatiquement accès à la Data API
(supabase-js / PostgREST / GraphQL) aux nouvelles tables du schéma `public`. Les tables déjà
créées avant cette date gardent leurs droits actuels -- rien à changer sur l'existant.

**Toute migration qui crée une nouvelle table doit donc inclure explicitement, dans la MÊME
migration**, en plus des policies RLS habituelles :

```sql
grant select on public.ma_table to anon;
grant select, insert, update, delete on public.ma_table to authenticated;
grant select, insert, update, delete on public.ma_table to service_role;
```

Adapter les verbes accordés au besoin réel de la table (RLS reste la vraie barrière de sécurité
qui décide QUELLES lignes sont visibles -- ces GRANT autorisent seulement l'accès à la Data API
elle-même). Sans ce GRANT, la table se crée sans erreur mais devient inaccessible via le client
("permission denied" côté PostgREST), y compris sur un nouveau projet, une preview branch, ou un
`supabase db reset` local. Source : mail Supabase du 23/09/2026.

Project ID Supabase de ce dépôt : `tdsdwbsvduitgrrrfjrp` (projet « AtelierMaths_Paris », région Paris eu-west-3, depuis le
29/10/2026). L'ancien projet de Dublin (`rngzubhnypmistjsumpz`, eu-west-1) est gardé intact quelques jours pour un retour en
arrière, puis supprimé : ne plus jamais l'utiliser. Déménagement fait par `.github/workflows/migration-paris.yml` (copie de la
base, des fichiers, des fonctions et des réglages de connexion ; les secrets des fonctions ont été ressaisis à la main).
Fonctions serveur : le code est dans `supabase/functions/<nom>/index.ts` ; la tâche GitHub « Déployer une fonction
serveur » (`.github/workflows/deploy-fonction.yml`, secret SUPABASE_ACCESS_TOKEN) le déploie à Paris à l'identique.

## Comptes : identifiant et adresse de récupération (depuis le 30/10/2026, build 1200)

On se connecte par identifiant (adresse fictive `identifiant@mathcollege.local`). Les adultes enregistrent une adresse
e-mail de récupération dans « Mon profil » (`profil.js`, table `profil_contact`, fonction `profil`) ; « Mot de passe
oublié » envoie le lien à cette adresse confirmée. Jamais d'adresse pour les élèves (mineurs).

Inscription d'un professeur : le profil « pending » est créé PAR LA BASE à la confirmation de l'adresse (déclencheur
`inscription_prof_auto` sur auth.users, `supabase/sql/2026-10-30-inscription-prof-auto.sql`), qui prévient aussi l'administrateur
(SMS + e-mail) ; le code du site (`finaliserInscriptionEnAttente`) reste en secours. « Dernière connexion » = `derniere_activite()`
(mot de passe ou session restée ouverte).

## Référencement : régénérer les pages statiques après toute modification d'un chapitre

Les pages indexables par Google (`cp/<chapitre>/`, `ce1/<chapitre>/`, `ce2/<chapitre>/`, `cm1/<chapitre>/`, `cm2/<chapitre>/`, `6e/<chapitre>/`, `5e/<chapitre>/`, `4e/<chapitre>/`, `3e/<chapitre>/`, `cp/`, `ce1/`, `ce2/`, `cm1/`, `cm2/`, `6e/`, `5e/`, `4e/`, `3e/`,
`professeurs/`, `programmes/`),
`sitemap.xml` et `robots.txt` sont GÉNÉRÉES à partir du vrai contenu des chapitres par
`tools/build-seo.js` (ne pas les modifier à la main). Après toute modification d'un fichier de
`chapitres/`, d'un titre de chapitre (CHCM1/CHCM2/CH6/CH5/CH4/CH3 dans app.js) ou de la page professeurs, relancer :

```
(cd tools && npm install)   # une fois par session : KaTeX pour rendre les formules
NODE_PATH=/opt/node22/lib/node_modules node tools/build-seo.js
```

et committer les fichiers produits avec le reste. Un chapitre sans vrai cours (« Cours en
construction ») n'a pas de page : elle apparaît automatiquement dès que son cours existe.

Ne JAMAIS retirer de `index.html` la balise `<meta name="google-site-verification" ...>` : elle
prouve à Google Search Console que le site nous appartient (validée le 26/09/2026) ; sans elle,
l'accès au suivi de l'indexation est perdu.

## Adresse du site : latelierdesmaths.fr (depuis le 28/10/2026)

Le site est servi par GitHub Pages sur **https://latelierdesmaths.fr** (fichier `CNAME`, réglage Custom domain
du dépôt). Les anciennes adresses redirigent en 301 avec le chemin (règles « Redirection de domaine » chez
Squarespace, où sont les DNS) : maths.latelieraugmente.fr et latelierdesmaths.com. Changement d'adresse déclaré
dans Google Search Console. Ne jamais supprimer ces redirections. Toute nouvelle URL absolue du site (code,
fonctions Supabase, mails, `tools/build-seo.js`) utilise latelierdesmaths.fr ; les adresses e-mail restent en
@latelieraugmente.fr. L'Atelier du Prof reste sur adp.latelieraugmente.fr.

## Programmes officiels : quel texte pour quel niveau

Nouveaux programmes (cycle 3 : CM1, CM2, 6e ; cycle 4 : 5e, 4e, 3e), avec une entrée en vigueur échelonnée :

- **CM1, CM2, 6e** : nouveau programme du cycle 3, en vigueur. Chapitres de CM1 et de 6e contrôlés
  (builds 858-859), chapitre 6e « Initiation à la pensée informatique » ajouté (build 862). CM1 réécrit
  en entier (23 chapitres, builds 864-867) et CM2 créé (25 chapitres, builds 869-872), en suivant la
  partie CM1 / CM2 du programme : les chapitres du CM utilisent les outils de `chapitres/cm1/_commun.js`
  (cm1Chapitre avec `niveau: 'cm2'` pour le CM2). Au CM : ni tableau de conversion ni tableau de
  proportionnalité, pas de rapporteur, notations de géométrie toujours expliquées.
- **5e** : nouveau programme du cycle 4, en vigueur dès l'année 2026-2027. Chapitres contrôlés et
  complétés, chapitre « Pensée informatique et programmation » ajouté (build 863).
- **4e** : le nouveau programme ne prend effet qu'en **septembre 2027**. D'ici là, garder l'ancien
  programme ; faire le contrôle de conformité de la 4e avant la rentrée 2027.
- **3e** : le nouveau programme ne prend effet qu'en **septembre 2028**. D'ici là, garder l'ancien
  programme (et le brevet correspondant) ; contrôle de la 3e avant la rentrée 2028.

Le texte du nouveau programme du cycle 4 (annexe 2) couvre déjà 4e et 3e : on peut s'en servir pour
préparer ces mises à jour, sans les publier avant la date d'effet.

## CP, CE1, CE2 : publiés, pas vendus (depuis le 28/10/2026, build 1193)

Les trois niveaux sont visibles de tous (menus, accueil, pages publiques `cp/`, `ce1/`, `ce2/`) ; la relecture
continue au fil de l'eau. Ils ne sont dans aucune offre (Professeur seul, Famille, licence établissement) : ne pas
les ajouter aux offres ni aux fonctions de paiement sans demande. `NIVEAUX_ADMIN` (app.js) liste ces niveaux non
vendus pour le bêta-test ; `NIVEAUX_MASQUES` (vide) masquerait un niveau en préparation.

## Page « Notions du CP à la 3e » (/programmes/)

Données dans `assets/programmes/notions.js`, uniquement d'après les programmes officiels (sources en tête du
fichier) ; la page est écrite par `tools/build-seo.js`.

## Rédaction pédagogique (chapitres du primaire, demandé le 01/10/2026)

« Je préfère quand tu te comportes comme un fin pédagogue » :

- **Animations** pour illustrer un maximum (lecteur commun `cmAnim`, `chapitres/cm1/_anims.js` ;
  animations du CE2 dans `chapitres/ce2/_anims.js` : sauts sur une droite, schémas en barres, jetons,
  glisse-nombre, horloge, règle, partage, diagramme, compas, angle, balance, verres, fractions…).
- **Jamais plusieurs calculs sur une même ligne** (une liste `cm1Liste`, ou `{ suite: [...] }`).
- **Pas de numérotation « 1. », « 2. »** devant les questions, surtout si elles commencent par un nombre
  ou un calcul (listes à puces ; le quiz affiche « Question 1 » au-dessus de l'énoncé).
- **Nombres en lettres en orthographe rectifiée** (tous niveaux) : des traits d'union entre tous les mots du
  nombre, « deux-mille-quatre-cent-six », « vingt-et-un », « deux-cents » ; « million » et « milliard » sont des
  noms, sans trait d'union (« trois millions deux-cent-mille »).
- **Fractions toujours en LaTeX**, jamais « a/b » : `cm1Frac(a, b)` dans les cours, quiz, corrections ;
  dans les dessins SVG, fraction en étage ; les questions flash « 3/4 » sont converties à l'affichage.
- **Tous les exercices de l'onglet Exercices ont une réponse rédigée** avec `cm1Redac(titre, calcul,
  phrase)` : un titre souligné qui reprend la question (« Âge de mamie : », souligné jusqu'à la dernière
  lettre du titre, jamais les deux-points) ; le calcul sur une ligne
  s'il tient, sinon « A = … » développé en colonne avec le résultat encadré ; puis une phrase de
  conclusion, systématiquement.

## Planches : jamais d'exercice seul en demi-largeur (demandé le 30/10/2026)

« Je ne veux jamais voir ça dans aucun niveau » : un exercice `{ col: 1 }` (demi-largeur) resté seul laisse un trou à sa droite
dans le Manuel. Chaque planche doit donc avoir un nombre pair d'exercices demi-largeur. Sinon : ajouter un exercice, ou mettre
l'exercice seul en pleine largeur (retirer `col: 1`) en doublant ses exemples pour remplir deux colonnes (listes `P3.rmp` : deux
colonnes automatiques ; choix « oui / non », « vrai / faux » : `P3.chx2`, deux tableaux côte à côte). Après toute modification de
planche, lancer `NODE_PATH=/opt/node22/lib/node_modules node tools/verif-trous.js` (doit répondre « Aucun trou »).

Une feuille qui dépasse la page A4 est resserrée à l'impression (`plRemplirPages`, planches.js) : jusqu'à 15 % pour l'élève, 30 %
pour le corrigé, en gardant toute la largeur ; jamais sur une feuille d'élève où l'on mesure une longueur à la règle. Au-delà,
alléger le contenu (demandé le 31/10/2026 : « Occupe-toi des feuilles qui débordent »).

## Conformité aux programmes : « Pour aller plus loin » (demandé le 28/10/2026)

« Ce qui est hors programme peut être mis en "pour aller plus loin" » : une notion d'un niveau supérieur n'est
pas supprimée mais placée en fin de chapitre sous un en-tête « Pour aller plus loin » (`ce1PlusLoin(titre, vers)`
dans `chapitres/ce1/_anims.js`, ou le même `sub-header` avec `data-oliv-plus`), ses planches titrées « Pour aller
plus loin : … », ses exercices préfixés « Pour aller plus loin : ». Ce qui manque au programme est ajouté au
chapitre concerné. CE1 contrôlé en entier, CP, 5e, 4e et 3e complétés (build 1194), CM1 et 6e (build 1195).
À la 4e et à la 3e, le contrôle suit l'ancien programme (2020) et ses attendus de fin d'année tant qu'il est en vigueur.

## Ventes fermées : page des tarifs hors ligne (depuis le 30/10/2026, build 1204)

Tant que les ventes ne sont pas ouvertes (bouton « Ouvrir les ventes » d'Administration › Offres profs), `tarifs/index.html`
est une page d'attente sans aucun prix (« Ouverture des ventes prochainement »). La page complète des tarifs est gardée dans
`_hors-ligne/tarifs.html`, dossier exclu de la publication (`deploy-pages.yml`). À l'ouverture des ventes : la recopier dans
`tarifs/index.html` (en retirant le bandeau « Ouverture des ventes prochainement »). Les comptes non « test » ne voient ni
offres, ni prix, ni lien vers les tarifs dans « Mon abonnement », ni prix dans l'Espace famille (`famVenteFermeeHtml`).

Paiement intégré au site (Stripe Embedded Checkout, build 1205) : `paiementOuvrir` (app.js) ; les fonctions prof-offre et famille
renvoient client_secret + clé publique si les secrets STRIPE_TEST_PUBLISHABLE_KEY / STRIPE_PUBLISHABLE_KEY existent, sinon la page Stripe.

## Prise de rendez-vous : outil du site (depuis le 30/10/2026, build 1213)

Page « Prendre rendez-vous » (`#/rendez-vous`, `rdv.js` ; accès : menu du compte, pied de page, /professeurs/, /tarifs/ ; pour
tous sauf les élèves). Fonction `rdv` (verify_jwt non ; calcul des créneaux dans `supabase/functions/rdv/creneaux.ts`), tables
`rdv_reglages` et `rdv_reservations` (`supabase/sql/2026-10-30-rendez-vous.sql`), réglages dans Administration › Rendez-vous.
E-mails aux couleurs du site (Resend, rendez-vous@latelieraugmente.fr), SMS par `alerte-sms` (sans_limite), rappels la veille et
purge à un an par pg_cron. Agendas pris en compte : `rdv_reglages.agendas` (cochés dans l'administration ; agendas abonnés par
adresse iCal lus événement par événement). Agenda Google relié par un compte de service (secrets GOOGLE_RDV_CLE, GOOGLE_RDV_COMPTE) : jamais
d'invitation Google (sendUpdates=none), le nom de l'administrateur n'apparaît nulle part. Cal.com et l'agenda de rendez-vous
Google ne sont plus utilisés.
