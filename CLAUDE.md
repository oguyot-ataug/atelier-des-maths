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
29/10/2026). L'ancien projet de Dublin (`rngzubhnypmistjsumpz`, eu-west-1) a été SUPPRIMÉ le 05/11/2026 (fonctionnement de Paris
confirmé avant) : il n'existe plus. Les scripts du déménagement (migration-paris.yml et
.github/scripts/migration-*) ont été retirés du dépôt le 05/11/2026.
Fonctions serveur : le code est dans `supabase/functions/<nom>/index.ts` ; la tâche GitHub « Déployer une fonction
serveur » (`.github/workflows/deploy-fonction.yml`, secret SUPABASE_ACCESS_TOKEN, option `--yes` exigée par l'outil Supabase
depuis novembre 2026) le déploie à Paris à l'identique.

## Comptes : identifiant et adresse de récupération (depuis le 30/10/2026, build 1200)

On se connecte par identifiant (adresse fictive `identifiant@mathcollege.local`). Les adultes enregistrent une adresse
e-mail de récupération dans « Mon profil » (`profil.js`, table `profil_contact`, fonction `profil`) ; « Mot de passe
oublié » envoie le lien à cette adresse confirmée.
Élèves (demandé le 08/11/2026, « option email ») : UNIQUEMENT une adresse fournie par l'établissement, d'un domaine déclaré
(`etablissements.domaines_eleves`, jamais une messagerie publique : liste WEBMAIL de la fonction `profil`), saisie par le
PROFESSEUR (Mes classes › Élèves › « Adresses e-mail », `emails-eleves.js`, actions `domaines`, `eleves-emails`, `eleve-email`),
active seulement après confirmation par l'élève (lien 48 h ; élève jamais connecté : la confirmation ouvre sa première
connexion, invitation.html). « Mot de passe oublié » d'un élève : lien à son adresse confirmée, sinon lien de 7 jours envoyé à
ses professeurs (adresse « Mon profil » ou de connexion), au plus toutes les 10 min. Jamais d'adresse personnelle d'élève.

Inscription d'un professeur : le profil « pending » est créé PAR LA BASE à la confirmation de l'adresse (déclencheur
`inscription_prof_auto` sur auth.users, `supabase/sql/2026-10-30-inscription-prof-auto.sql`), qui prévient aussi l'administrateur
(SMS + e-mail) ; le code du site (`finaliserInscriptionEnAttente`) reste en secours. « Dernière connexion » = `derniere_activite()`
(mot de passe ou session restée ouverte).

## Référencement : régénérer les pages statiques après toute modification d'un chapitre

Les pages indexables par Google (`cp/<chapitre>/`, `ce1/<chapitre>/`, `ce2/<chapitre>/`, `cm1/<chapitre>/`, `cm2/<chapitre>/`, `6e/<chapitre>/`, `5e/<chapitre>/`, `4e/<chapitre>/`, `3e/<chapitre>/`, `cp/`, `ce1/`, `ce2/`, `cm1/`, `cm2/`, `6e/`, `5e/`, `4e/`, `3e/`,
`professeurs/`, `programmes/`),
`sitemap.xml` et `robots.txt` sont GÉNÉRÉES à partir du vrai contenu des chapitres par
`tools/build-seo.js` (ne pas les modifier à la main).

**Une seule fois par jour, automatiquement (demandé le 07/11/2026 : « On pourrait programmer ça une seule fois dans
la journée ? »)** : le workflow `.github/workflows/seo-quotidien.yml` régénère les pages chaque nuit (03:23 UTC, après
la tâche de relecture de minuit), committe sur main ce qui a changé et relance le déploiement. Ne plus lancer
build-seo (environ 12 minutes) après chaque modification d'un chapitre : les pages publiques suivent le lendemain matin.
Pour une publication immédiate (nouveau chapitre, titre changé, demande expresse) : Actions › « Pages publiques
(référencement) » › Run workflow, ou à la main :

```
(cd tools && npm install)   # une fois par session : KaTeX pour rendre les formules
NODE_PATH=/opt/node22/lib/node_modules node tools/build-seo.js
```

Avant de pousser sur main, toujours ramener main (`git merge --ff-only origin/main`) : le workflow y committe chaque
nuit. Un chapitre sans vrai cours (« Cours en
construction ») n'a pas de page : elle apparaît automatiquement dès que son cours existe.

Ne JAMAIS retirer de `index.html` la balise `<meta name="google-site-verification" ...>` : elle
prouve à Google Search Console que le site nous appartient (validée le 26/09/2026) ; sans elle,
l'accès au suivi de l'indexation est perdu.

## Bibliothèques et polices hébergées par le site (depuis le 09/11/2026)

Signalé : « les angles dans les énoncés affichaient des widehat et pour beaucoup d'élèves les icônes ne passaient pas » (session COURS
d'un groupe de 5e) : certains réseaux d'établissement bloquent cdnjs et Google Fonts. KaTeX 0.16.9 (`assets/katex/`, copié de
tools/node_modules/katex/dist), html2pdf 0.10.1 (`assets/lib/`) et la police des icônes (`assets/fonts/material-symbols-outlined.woff2`,
instance fixe opsz 20 / graisse 400 / contour, 400 Ko, déclarée en tête de styles.css) sont servis par le site ; les fenêtres
d'impression utilisent `${location.origin}/assets/katex/katex.min.css`. Ne pas revenir aux liens cdnjs / Google pour ces fichiers.
Restent chez Google : les polices de texte (Space Grotesk, Inter, JetBrains Mono, Caveat), avec des polices de secours si bloquées.

## Adresse du site : latelierdesmaths.fr (depuis le 28/10/2026)

Le site est servi par GitHub Pages sur **https://latelierdesmaths.fr** (fichier `CNAME`, réglage Custom domain
du dépôt). Les anciennes adresses redirigent en 301 avec le chemin (règles « Redirection de domaine » chez
Squarespace, où sont les DNS) : maths.latelieraugmente.fr et latelierdesmaths.com. Changement d'adresse déclaré
dans Google Search Console. Ne jamais supprimer ces redirections. Toute nouvelle URL absolue du site (code,
fonctions Supabase, mails, `tools/build-seo.js`) utilise latelierdesmaths.fr. L'Atelier du Prof reste sur adp.latelieraugmente.fr.

**Adresses e-mail en @latelierdesmaths.fr (depuis le 31/10/2026)** : « Tout ce qui concerne l'atelier des maths doit avoir comme
domaine latelierdesmaths.fr, y compris mailing ». **Une seule adresse, contact@latelierdesmaths.fr** (demandé le 01/11/2026 : « ne
multiplie pas les adresses à l'avenir », puis « contact ») : tous les e-mails partent de contact@ (fonctions Resend et e-mails de
connexion de Supabase Auth) et les réponses y reviennent. Ne jamais créer d'autre adresse d'expédition (les anciennes notifications@,
compte@, devis@, factures@, rendez-vous@ ne servent plus). Chaque fonction envoie par `envoiResend` : si Resend refuse le domaine,
l'e-mail repart depuis l'ancien domaine latelieraugmente.fr. Les documents de facturation déjà émis gardent leur adresse
d'origine. Ne pas toucher à adp.js (L'Atelier du Prof).

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

## CP, CE1, CE2 : publiés (28/10/2026) et VENDUS depuis le 10/11/2026

Demandé le 10/11/2026 : « ajouter toutes les classes CP... à 3e ! partout où c'est nécessaire », prix de l'école étendus du CP au
CM2 (validé) : Professeur des écoles 29 € pour une classe, tous niveaux du CP au CM2 (+ 10 € par classe) ; Famille école 25 € pour un
niveau, 39 € pour deux niveaux ou plus ; licence établissement 2,50 € par élève du CP au CM2. Listes de niveaux étendues : fonctions
`prof-offre`, `famille`, `stripe-webhook` (filtre des niveaux payés !), `demande-devis` ; `offres-prof.js`, `famille.js`,
`facturation.js`, `simulateur.js`, `groupes.js`, `progression-etab.js` ; base : `famille_niveaux_ouverts`, `groupe_enregistrer`
(`supabase/sql/2026-11-10-cp-ce2-en-vente.sql`) ; page des tarifs, CGV. `NIVEAUX_ADMIN` (app.js) est vide (gardé pour un futur niveau
en préparation, bêta-testeurs) ; `NIVEAUX_MASQUES` (vide) masquerait un niveau en préparation.

## Lexique du CP à la 3e (menu L'Atelier, visible par tous, depuis le 02/11/2026)

Données : `assets/lexique/donnees.js` (358 mots : ceux que nomment les programmes, d'après `assets/programmes/notions.js`, au niveau
où le texte les nomme la première fois ; `nv` : nouveau programme 4e/3e). Pour chaque mot : définition pour l'élève, exemple, précision
pour le professeur (masquée aux comptes élèves). Page `#view-lexique`, code `lexique.js`. Un mot ajouté au tableau des notions doit
aussi être ajouté (avec ses trois textes) au lexique.

## Page « Notions du CP à la 3e » (/programmes/)

Données dans `assets/programmes/notions.js`, uniquement d'après les programmes officiels (sources en tête du
fichier) ; la page est écrite par `tools/build-seo.js`.

## Rédaction pédagogique (chapitres du primaire, demandé le 01/10/2026)

« Je préfère quand tu te comportes comme un fin pédagogue » :

- **Animations** pour illustrer un maximum (lecteur commun `cmAnim`, `chapitres/cm1/_anims.js`, avec curseur de vitesse
  commun à toutes les animations, retenu sur l'appareil, `cmAnimVitesse` ;
  animations du CE2 dans `chapitres/ce2/_anims.js` : sauts sur une droite, schémas en barres, jetons,
  glisse-nombre, horloge, règle, partage, diagramme, compas, angle, balance, verres, fractions…).
- **Jamais plusieurs calculs sur une même ligne** (une liste `cm1Liste`, ou `{ suite: [...] }`).
- **Jamais de français dans une ligne de calcul** (demandé le 07/11/2026 : « ne jamais mélanger calcul et "français", ici "de",
  quelle horreur ! ») : pas de « 10 % de 40 », « la moitié de », « donc », « et », « soit » entre deux calculs. Les mots vont dans le
  titre et la phrase de `cm1Redac` ; un pourcentage s'écrit en fraction (`F(10, 100) × 40 = F(400, 100) = 4`). Au collège comme au
  primaire, décomposer : un `cm1Redac` par étape (« Augmentation » : la part ; « Prix après l'augmentation » : 40 + 4 = 44…).
- **Division écrite « : » PARTOUT, jamais « ÷ »** (demandé le 07/11/2026 : « Oui, partout « : » à la place de ÷ ») : énoncés,
  cours, méthodes, corrigés, quiz, questions flash, lexique, mini-jeux (compte est bon, calcul mental, programmation…), LaTeX
  (`:` et jamais `\div`). Seules exceptions : l'histoire du signe ÷ (Rahn 1659, obèle) et la touche ÷ des calculatrices. Filets de
  sécurité : `cm1Deux` (cm1Redac), `redacDeuxPoints` (rédactions types), `oliviaFormat` (Oliv'IA, dont la consigne le demande aussi) ;
  la lecture à voix haute dit « divisé par » pour « 12 : 3 ». Éviter deux « : » ambigus sur une ligne (« Calcul : 12 : 3 » va,
  mais pas « 12 quarts : 3 : 1/4 »).
- **Au collège, on garde les écritures fractionnaires, y compris pour symboliser les divisions** (demandé le 08/11/2026) :
  fraction d'une quantité, pourcentage, quatrième proportionnelle (Thalès, échelles), aire du triangle, volume de la pyramide,
  moyenne : `F('2 \\times 35', 5)`, `2 × F(35, 5)`, `F(21, 4) = 5,25`, jamais « (2 × 35) : 5 », « 2 × (35 : 5) », « 9 × 4 : 6 ».
  Les trois méthodes de a/b × c (6e N5), dans cet ordre : Méthode 1 `2/5 × 35 = 0,4 × 35 = 14` ; Méthode 2
  `2/5 × 35 = 2 × 35/5 = 2 × 7 = 14` ; Méthode 3 `2/5 × 35 = (2 × 35)/5 = 70/5 = 14`. Le « : » reste pour une division seule
  (« 22 : 2 = 11 »), au primaire, en programmation et dans les exercices sur les priorités.
- **Pas de numérotation « 1. », « 2. »** devant les questions, surtout si elles commencent par un nombre
  ou un calcul (listes à puces ; le quiz affiche « Question 1 » au-dessus de l'énoncé).
- **Nombres en lettres en orthographe rectifiée** (tous niveaux) : des traits d'union entre tous les mots du
  nombre, « deux-mille-quatre-cent-six », « vingt-et-un », « deux-cents » ; « million » et « milliard » sont des
  noms, sans trait d'union (« trois millions deux-cent-mille »).
- **Fractions toujours en LaTeX**, jamais « a/b » : `cm1Frac(a, b)` dans les cours, quiz, corrections ;
  dans les dessins SVG, fraction en étage ; les questions flash « 3/4 » sont converties à l'affichage.
- **Titre de rédaction = ce que demande l'énoncé** (demandé le 08/11/2026 : « Ici "Une semaine :" ne veut rien dire. Il faut dire
  "Quantité bue en une semaine :" ») : la grandeur ou l'objet cherché, jamais un mot seul (« Calcul », « Total », « Volume »), un
  complément de temps ou de lieu (« Une semaine », « Au parc », « Avec 5 ») ou un nom d'objet (« Les jetons ») ; seules les étapes de
  raisonnement gardent leur nom (Vérification, Thalès, Pythagore, Démonstration…). Contrôle : scratchpad titres_vagues*.py.
- **Tous les exercices de l'onglet Exercices ont une réponse rédigée** avec `cm1Redac(titre, calcul,
  phrase)` : un titre souligné qui reprend la question (« Âge de mamie : », souligné jusqu'à la dernière
  lettre du titre, jamais les deux-points) ; le calcul sur une ligne
  s'il tient, sinon « A = … » développé en colonne avec le résultat encadré ; puis une phrase de
  conclusion, systématiquement.

## Opérations posées : même écriture à tous les niveaux (demandé le 05/11/2026)

Cours, méthodes, exercices, corrigés, animations : les retenues de l'addition et le « +10 » de la soustraction par compensation
s'écrivent JUSTE au-dessus de leur chiffre (« +10 » centré) ; le « +1 » de la compensation est un petit indice collé en bas à droite
de son chiffre, sans le déplacer ni déborder sur la colonne voisine (plus de « 1+ » à gauche) ; l'espace entre les classes
(« 2 476 ») est un petit écart, pas une colonne. Dessins concernés : `cm1Posee` (chapitres/cm1/_commun.js), `cm1opRowsTable` /
`cm1opCompPrefix` (CM1 Opérations, aussi l'outil de correction), animations `cm1AnimOperation` (_anims.js), planches CE2-N3,
démonstrations de 6e (décimaux, durées).

## « Dans mon cahier » : opérations posées sur feuille Seyès (demandé le 07/11/2026)

Bouton « Dans mon cahier » (`cahierBouton`, chapitres/cm1/_commun.js) en tête des onglets Cours, Méthode, Exercices des chapitres
qui ont des opérations `cm1Posee` : chaque tableau d'opération (classe `pose-ecran`, données `data-cahier`) reçoit à côté son dessin
Seyès (`cm1PoseeCahier` : marge rouge, un chiffre par carreau sur une ligne principale, retenues et « +10 » dans l'interligne
au-dessus, « +1 » en indice, police Caveat). Réglage retenu sur l'appareil (`cahierSeyes`), valable partout (classe `cahier-on` sur
body, dessins ajoutés aussi au contenu affiché plus tard) ; l'impression garde toujours l'opération habituelle. Méthodes animées (table `.cma-op` de `cmOpTableHtml`, _anims.js) : même feuille
en fond par la feuille de style (07/11/2026).
Corrections des exercices faits dans le cahier (demandé le 07/11/2026) : `.cahier-page` (onglet Exercices des chapitres, `cm1Exos` ;
exercices de planche `cahier: true` ou « dans/sur ton cahier », `plExoCorps`) : quand le mode est actif (classe `cahier-actif`, jamais
dans `.pl-page` : Manuel, impression), la correction s'écrit sur la feuille (Caveat 23 px, ligne de base CAHIER_B = 23 px sous le haut
de chaque carreau de 32 px) ; `cahierCaler` allonge chaque bloc jusqu'au carreau suivant ; les opérations posées dans `.cm-redac-pose`
y sont dessinées sans feuille propre (`cm1PoseeCahier(d, true)`), dans les carreaux de la page ; depuis le 08/11/2026 (relecture CE2-N3-P1-E3 :
« ça fait mal aux yeux ! ») TOUTE opération posée d'une page de cahier est dessinée ainsi, puis calée par cahierCaler (classe `pose-cale`,
`--psl`/`--pst` au pixel entier : haut sur un carreau, colonnes sur les traits verticaux). Opérations côte à côte (même groupe) : si l'une a des retenues,
toutes réservent cette ligne (`cm1PoseeCahier(d, nu, hautForce)`), pour rester alignées (relecture « Non alignés ! »).
Opérations côte à côte d'une page de cahier : toujours sur une ligne à l'écran (pas de retour à la ligne, la page défile ; demandé : « doit garder
ce format horizontal »), à la taille des carreaux (flex-shrink 0) ; projection : opérations dessinées avant l'agrandissement (plProjRendre).
Corrigés imprimés « fond Seyès » (demandé le 08/11/2026 : « Dans les corrigés papiers, ajouter l'option "fond seyes" pour certains exercices ») :
case des réglages des planches (`plPrefs().seyes`) ; les corrigés des exercices « dans ton cahier » (.cahier-page) s'impriment comme « Dans mon
cahier » : `plSeyesPreparer` (classes, opérations nu), `plCssSeyes` (règles .cahier-actif / pose-cahier de styles.css recopiées dans la fenêtre
d'impression, police Caveat), `plSeyesCaler` (cahierCaler sur la fenêtre d'impression, juste avant d'imprimer) ; l'impression attend la police Caveat (`fonts.load` explicite, sinon le PDF part avec la police de secours) ; lignes de la feuille en dessin vectoriel derrière le texte (`plSeyesFond`, `.cahier-fond`), car les dégradés de l'écran sont rastérisés dans le PDF (interlignes irréguliers) ; à l'impression les opérations
côte à côte peuvent passer à la ligne.
Lignes avec une fraction (demandé le 07/11/2026, validé sur images) : barre de fraction CHEVAUCHANT la ligne principale, « = » et
signes (− + × ÷ : < >) centrés dessus (un trait de chaque côté) -- UNIQUEMENT dans une ligne qui a une fraction (rappelé le 07/11/2026 ;
ailleurs les signes restent posés sur la ligne d'écriture ; « : » centré seulement dans une ligne de calcul) ; dans KaTeX, `.mord` de la fraction, `.mrel`, `.mbin` descendus de
0,25 em + 1 px ; signes écrits en texte enveloppés par `cahierOps` (`.cahier-op`, 1,2 em, descendus de 0,27 em) ; `cahierCaler` cale
la ligne d'écriture du bloc sur une ligne principale (padding-top `--calh`), sans arrondi au pixel.
Titre de rédaction (`.cm-redac-sou`) souligné SUR L'INTERLIGNE (première ligne fine sous la ligne principale, demandé le 07/11/2026) :
trait dessiné en fond à 9,25 px sous la ligne d'écriture (`--soul`, calculé dans `cahierCaler`), continu sous les jambages.
Raisonnements (`.cm-redac`) séparés d'une ligne vide ; deux lignes à fraction qui se suivent sans carreau vide entre elles
(`--calm`, cahierCaler ; demandé le 07/11/2026), phrase de conclusion comprise ; un seul carreau entre un résultat et le titre suivant :
si le raisonnement finit par une fraction, son dénominateur occupe ce carreau (`--redm` 0, cahierCaler ; demandé le 08/11/2026).
Titre avec une fraction : soulignement passé sous le dénominateur, et titre remonté d'un carreau quand l'encre le permet (`--redm` −32 px,
mesure des glyphes par `cahierEncre`) ; exposants sans interligne propre. Contrôle des deux règles sur toutes les corrections (scratchpad
regles.js) : 0 écart le 08/11/2026.
Couleurs du cahier (07/11/2026) : écriture bleu encre #1E3A8A ; soulignement et résultats en VERT #15803D (demandé : « du vert pour souligner
et pour les résultats à la place du rouge ») ; retenues, « +10 », « +1 » en rouge #E35D3A ; signes opératoires orange.
Bouton flottant (`#cahierFlottant`, `cahierFlottantMaj`, demandé le 07/11/2026 : « accessible partout ») : en bas à gauche, dès qu'une
opération posée ou une `.cahier-page` est à l'écran, masqué si le bouton d'en-tête d'onglet est visible ; jamais à l'impression.
Tous les chapitres, collège compris (demandé le 08/11/2026 : « étends-le au collège et aux 4 chapitres de CM1 ») : `cahierChapitre(demo)`
(_commun.js, appelé par openChapitre) fait de chaque `.exo-correction` de l'onglet Exercices une `.cahier-page` (sauf correction
interactive : boutons, saisie) et ajoute le bouton en tête des onglets ; rédactions types `.redaction-template`/`.we-row` une ligne par
carreau. Exemples rédigés des cours, méthodes et rédactions types (demandé le 08/11/2026 : « Ces exemples aussi doivent être placés sur
papier seyes ») : chaque `.redaction-template` hors correction et non interactif est enveloppé dans une `.cahier-page.cahier-exemple`
(cahierChapitre) ; commentaire `.we-comment` à la suite, sans agrandir la ligne ; formule longue (`cl4Long`…) sur la ligne.
Phrase à fraction écrite sur plusieurs lignes : classe `cahier-fr2` (cahierCaler), une ligne tous les deux carreaux, chacune sur une
ligne principale. Signes ≈ ≠ ≤ ≥ (absents de Caveat) : `.cahier-op-fin`, ni gras ni agrandis.
Lignes à fraction qui se suivent : la remontée d'un carreau (`--calm`) vaut aussi pour les paragraphes `p` et les `li` d'une correction.
Blocs sans classe d'une page de cahier en `display:flow-root` : la marge d'une figure (margin:6px auto) ne sort plus du bloc et ne décale
plus la rédaction qui suit (relecture du 08/11/2026 : « la rédaction n'est pas sur les lignes principales »).
Droites graduées (demandé le 08/11/2026 : « l'axe doit être sur la ligne principale et on se sert des lignes verticales comme support de nos
graduations », puis « Cale dans tous les niveaux et les chapitres concernés ») : toute figure SVG d'une page de cahier qui a une droite graduée
(`data-axe="x0,pas,y,largeur"` en unités du viewBox, ou reconnue par `cahierAxe` : ligne horizontale coupée par au moins 5 graduations
régulières) est étirée EN LARGEUR seulement (`cahierAxeEtire` : textes, points, flèches, écarts verticaux inchangés ; figure d'origine rendue
hors du mode cahier, `cahierAxesRendre`) : écart entre graduations = un nombre entier de carreaux, au plus près de l'origine (un carreau si
l'écart d'origine est plus petit ; la page défile si la droite est plus large) ; axe sur une ligne principale, graduations sur les lignes
verticales (`--axw`, `--axl`, `--axt`, au pixel entier, sinon l'observateur de taille boucle).
Division posée dans une correction : `.dp-boite`, lignes dans un bloc `id="…-dpLeft"`, quotient `id="…-dpQuotient"`, chiffres `dpCases` ;
elle garde sa propre feuille (hors de la `.cahier-page`, cahierChapitre). Opérations des cours du collège : tableaux `table.cma-op` (soustraction de décimaux, durées, `ogAddBlock`, `cm1opRowsTable` du
CM1) et divisions posées `.dp-boite` (6e N1, 6e N4, 5e N1 ; un caractère par case `dpCases`, app.js) dessinées sur la feuille par la
feuille de style. Toute nouvelle opération posée d'un cours du collège : `cm1Posee`, ou ces classes.
Exercices « dans ton cahier » (demandé le 08/11/2026 : « Tous les exercices "dans ton cahier" doivent avoir cet outil ! ») : corrigé dans
une `.cahier-page` (plExoCorps) ; pour « Pose (et calcule) dans ton cahier », `plPoseesAuto` (planches.js) ajoute au corrigé chaque
opération posée, lue dans `x.calc` (P3.rmp) et vérifiée : `cm1Posee` (addition, soustraction, multiplication entière), `plMulDecimale`,
`plDivEuclide`, `plDivDecimale` (tableaux .cma-op) ; à l'écran seulement (`.pl-poses-auto` masqué dans `.pl-page` et à l'impression).
Repère invisible `.pl-cahier-m` dans l'énoncé : le bouton flottant apparaît dès l'énoncé.
Consigne « Pose (et calcule / et effectue) » sans place pour poser (ni quadrillage, ni opération à compléter) : toujours « dans ton cahier »
(demandé le 08/11/2026 : « il n'y a pas la place pour poser. Il faut donc leur demander de le faire dans le cahier »).
Opérations à compléter (`trous`, `cases`) : classe `pose-trous`, feuille Seyès dessinée en fond par la seule feuille de style
(cases de 32 px, cases à remplir conservées, « Vérifier » inchangé) ; en projection le bouton flottant passe en haut à gauche.

## Planches : jamais d'exercice seul en demi-largeur (demandé le 30/10/2026)

« Je ne veux jamais voir ça dans aucun niveau » : un exercice `{ col: 1 }` (demi-largeur) resté seul laisse un trou à sa droite
dans le Manuel. Chaque planche doit donc avoir un nombre pair d'exercices demi-largeur. Sinon : ajouter un exercice, ou mettre
l'exercice seul en pleine largeur (retirer `col: 1`) en doublant ses exemples pour remplir deux colonnes (listes `P3.rmp` : deux
colonnes automatiques ; choix « oui / non », « vrai / faux » : `P3.chx2`, deux tableaux côte à côte). Après toute modification de
planche, lancer `NODE_PATH=/opt/node22/lib/node_modules node tools/verif-trous.js` (doit répondre « Aucun trou »).

Mise en forme (demandé le 31/10/2026) : un nombre n'est jamais coupé en fin de ligne (fait automatiquement : `plInsecable`,
planches.js) ; une décomposition, un encadrement, une égalité à compléter ne se poursuivent jamais sur la ligne suivante
(`white-space:nowrap` sur la ligne, exercice élargi si besoin) ; plusieurs propositions à entourer sont sur une même ligne ou
alignées en dessous (`P3.chxTab`, `P3.chx2`), jamais collées à la question. Automatique : les propositions « <b>a · b · c</b> »
ne sont jamais coupées (`.pl-props`, planches.js) ; un exercice `{ uneLigne: true }` met une ligne de calcul par question, sur
toute la largeur, sans retour à la ligne (rangements, décompositions, encadrements trop longs pour une demi-colonne).

Propositions à entourer en fin de question (« vrai · faux », « oui · non »…) : rangées automatiquement dans une colonne à part,
alignées, plus loin de l'énoncé (`plChoixCols`, planches.js ; demandé le 01/11/2026). Propositions trop longues pour tenir à côté
(plus de 16 caractères en demi-largeur, 48 en pleine largeur) : sous chaque question, au même retrait. Rien à écrire dans les sources.

Collège (6e à 3e), sur le papier (Manuel et feuilles imprimées) : les cases (`plCase`, fractions `plFrac`) s'affichent en pointillés
(classe `pl-college`, demandé le 01/11/2026) ; l'écran garde ses cases à cliquer. Comparer deux quantités : « Complète avec <, > ou = »
dans une case (`plCase()`), jamais « entoure la première · la seconde » ; une case à choix au clic : `plCase('(d1)|(d2)|(d3)')`.

Une feuille qui dépasse la page A4 est resserrée à l'impression (`plRemplirPages`, planches.js) : jusqu'à 15 % pour l'élève, 30 %
pour le corrigé, en gardant toute la largeur ; jamais sur une feuille d'élève où l'on mesure une longueur à la règle. Au-delà,
alléger le contenu (demandé le 31/10/2026 : « Occupe-toi des feuilles qui débordent »).

## Figures : marques des points (demandé le 01/11/2026)

« Point isolé : une croix ; point sur une droite, un segment, une demi-droite : un petit trait perpendiculaire ; point
d'intersection : rien. » Appliqué automatiquement à toutes les figures SVG (planches, Manuel, écran, cours, animations,
impressions, projection) par `geo-points.js` : chaque croix est comparée aux lignes de la figure qui passent par son centre
(le quadrillage, clair ou fin, ne compte pas). Les figures peuvent donc toujours dessiner les points en croix. Contrôle :
`NODE_PATH=/opt/node22/lib/node_modules node tools/verif-points.js` (doit répondre « Aucune croix mal placée »). Une figure
qui doit garder ses croix telles quelles : attribut `data-geo-garde` sur le groupe concerné.
Codages de longueur (demandé le 01/11/2026 : « les faire inclinés et assez petits pour ne pas les confondre avec des points ») :
même fichier, deuxième passe ; un petit trait (ou 2, 3 traits parallèles) qui coupe une ligne en son milieu devient un trait de
7 px incliné à 60°. Ne sont pas touchés : traits de points (nom à côté, ou trait simple qui n'est pas au milieu d'un segment
entre deux repères ; un double ou triple trait dessiné en plusieurs lignes est testé comme un seul codage), graduations (ligne fléchée, trait à l'extrémité de la ligne, plus de trois traits serrés, cinq groupes ou
plus, nombre à côté).
Noms de droites (demandé le 01/11/2026) : « (d1) » s'affiche toujours (d₁) (numéro en indice, `<sub>` ou tspan), automatiquement
(`geoIndices`, même fichier) ; on peut donc continuer à écrire « (d1) » dans les sources.

## Géométrie dynamique dans les cours (demandé le 03/11/2026)

« Un/plusieurs exercices de géométrie dynamique seraient intéressants pour approfondir les notions ou découvrir une notion » :
blocs `.fig-dyn` du moteur de la Géométrie interactive (outils-figures.js : points à déplacer, Réinitialiser), écrits dans le
fichier du chapitre (`apdFig(points, shapes)`, chapitres/5e/G2-angles-parallelisme.js ; encadré `.dyn-activite`). Forme
`angles-somme` (sommets dans l'ordre) : angles intérieurs d'un polygone et leur somme, arrondis pour que la somme reste exacte.

Objets masqués et liste des objets de la Géométrie interactive (demandé le 10/11/2026) : réglage `masque` d'un point ou d'un objet
(clic droit « Masquer l'objet », ou l'œil de la liste) : ni dessiné ni cliquable, mais ce qui en dépend suit toujours ; bouton
« Liste des objets » (`figObjetsBasculer`, panneau `#figObjets`) : œil, couleur, options (menu du clic droit, `onFigureContextMenu(evt, obj)`),
survol = objet mis en évidence (`figSurvol`).

« Mes évaluations » en gestionnaire de fichiers (demandé le 10/11/2026) : `openEvalListModal` / `evalListeRendre` (evaluation.js, objet `evf`) ;
dossiers PERSONNELS `eval_dossiers` (sous-dossiers) et `eval_rangement` (une évaluation par dossier et par utilisateur ; absente = racine),
`supabase/sql/2026-11-10-eval-dossiers.sql` ; propriétaires par `evaluations_proprietaires()` ; une évaluation partagée n'apparaît qu'une fois.

## Corrections animées des constructions : AUX INSTRUMENTS DU SITE (demandé le 01/11/2026)

« Oui, mets en place la correction animée », puis « Tu n'as pas utilisé les instruments du site ! » : une figure de construction
d'un corrigé s'écrit avec `plConstruction({ w, h, px, programme, outils, depart, etapes })` (`constructions.js`). Papier, Manuel,
impressions : la figure finale dessinée par `depart`/`etapes` (éléments seg, arc, cercle, pt, txt, codage, droit). À l'écran
(vignettes, correction, projection) : bouton « Voir la construction aux instruments » qui ouvre le lecteur du tableau interactif
(`tbAiOpenPlayer`, tableau-ia.js) avec `programme` = programme de construction au format du tableau (point, segment_length, circle,
intersect, midpoint, perpendicular, perpendicular_bisector, angle_bisector… ; voir `tbAiBuildPrompt`) : vraie règle graduée,
équerre, compas, barre de lecture. Ne jamais refaire une animation maison. En place en 6e : Distance et cercles, Construction de
triangles, Angles (bissectrice), Symétrie axiale, Propriétés des triangles (cercle circonscrit).
Chapitres aussi (demandé le 08/11/2026 : « on veut voir le tracé se faire avec les instruments en correction ») : 6e Angles et rapporteur,
exercices 1 (angle de 128°) et 4 (bissectrice au rapporteur d'un angle de 78°), opération `angle` du tableau (rapporteur).

## Voix en ligne (Google Cloud Text-to-Speech, depuis le 02/11/2026)

Lecture à voix haute : `voixParler(texte, { vitesse, onend, onerror })` et `voixArreter()` (app.js), utilisés partout (cours,
quiz du CP, frise d'histoire). Comptes connectés, fonction `voix` active : voix en ligne seulement (Inès par défaut), liste donnée
par le serveur : Google Neural2 Inès et Paul, Studio Léa et Hugo -- PAS Chirp 3 HD, qui épelle les élisions : « s'écrire » lu
« esse écrire ». Les voix de l'appareil n'apparaissent plus dans le réglage pour eux (demandé le 02/11/2026 ; une option pour les
remettre pourra venir plus tard) ; elles restent pour les visiteurs et en secours. Oliv'IA a sa voix (bouton 🔊 sur ses réponses, `oliviaEcouter`,
olivia.js) : style « olivia » de la fonction, voix Neural2 de femme 4 demi-tons plus haut et un peu plus rapide (OLIVIA). Microsoft Azure a été abandonné (création du compte bloquée).
La fonction (`supabase/functions/voix`, verify_jwt non) synthétise chaque texte UNE fois par voix et range le MP3 dans le
stockage public `voix` ; plafonds VOIX_MAX_MOIS (800 000 caractères, sous le million gratuit de Google, SMS d'alerte à 80 % par alerte-sms, suivi dans Administration › IA) et
VOIX_MAX_JOUR par compte (20 000), compteur
`voix_usage` (`supabase/sql/2026-11-02-voix.sql` ; par gamme de voix et nombre de synthèses depuis `2026-11-02-voix-rapport.sql`),
rapport dans Administration › IA (« Rapport détaillé des voix en ligne », action `rapport` : mois, jours, comptes, coût estimé). Identification : le compte de service de l'agenda (secret GOOGLE_RDV_CLE,
ou GOOGLE_TTS_CLE s'il existe), portée cloud-platform ; l'API « Cloud Text-to-Speech » doit être activée dans son projet
Google Cloud (n° 736105734207), avec facturation. Sans cela, ou en cas de souci, la voix de l'appareil prend le relais.
Ne jamais envoyer de nom d'élève à la synthèse.
Animations du CP (demandé le 08/11/2026 : « les élèves ne savent pas encore lire ») : le lecteur commun `cmAnim` lit chaque nouveau commentaire
(identifiant « cp-… » ou option `voix: true` ; `cmAnimDire`, chapitres/cm1/_anims.js) et suspend l'animation jusqu'à la fin de la phrase ; un commentaire
qui prolonge le précédent ne lit que la suite (« un, deux » → « trois ») ; bouton « Voix » retenu sur l'appareil (`cmAnimVoix`).
« Ok Olivia ! » (olivia.js, 02/11/2026) : bouton oreille d'Oliv'IA, PROFESSEURS SEULEMENT (`oliviaProf` ; écoute à la demande, pages de cours), mot
d'éveil `OLIV_EVEIL`, question dictée envoyée comme une question écrite, réponse lue puis écoute de la suite 10 s ; bouton micro
pour une question dictée. Reconnaissance vocale du navigateur (sur l'appareil si possible) ; rien d'autre n'est gardé ni envoyé.
Lecture : émojis jamais lus, unités en toutes lettres (`speechUnites`, `voixPrononcer`, app.js), « Oliv'IA » dit « Olivia ».

## Calculatrice collège (demandé le 08/11/2026 : « des émulateurs des calculatrices collège ? casio et texas instruments ? », puis « go sans mode algorithmique »)

`calculatrice.js` : calculatrice ORIGINALE du site (jamais le programme interne, la façade, les logos ou les noms de modèles d'une
machine du commerce), panneau flottant déplaçable (menu L'Atelier › Calculatrice ; bouton rond `#calcFlottant` dans les chapitres
6e-3e). Une seule disposition, aux couleurs du site (« Type Casio » / « Type TI » retirés le 08/11/2026 : « ne garder que le modèle
bleu ») ; touches fraction, racine, puissances dessinées (`CALC_ICONES`) ; tout s'affiche DANS l'écran (tableau de valeurs, calculs
précédents par ▲ ▼), jamais sous les touches (« c'est étrange de voir s'afficher des données en dessous ») ; écran de taille FIXE, assez grand dès
le départ (236 px), qui ne s'agrandit jamais (tableau compris) ; tableau de valeurs : 4 lignes à la fois, défilement avec ▲ ▼ seulement (pas au doigt,
« comme une vraie calculatrice »), toute autre touche revient à l'écriture de l'expression ; séquence de « Montre-moi les touches » dans une carte à part sous la
calculatrice (`#calcBande`, `calcPlacerBande` : au-dessus ou à côté si la place manque). Écriture
naturelle à gabarits (fraction, racine, puissance, cos( )) ; calcul exact (fractions BigInt, a√b, valeurs remarquables de la
trigonométrie en degrés, sommes de fractions et de racines affichées en une fraction : (3 + 8√3)/4), sinon 10 chiffres ; S⇔D / ◄► ; ÷R (quotient, reste), FACT (facteurs premiers), %, ×10ˣ, Ans, tableau de
valeurs (touche Tableau, expression en x). L'écran garde « ÷ » (exception des calculatrices). « Montre-moi les touches » :
`calcBouton(touches, libellé)` dans un cours, `calcMontrer(touches, titre)` (identifiants : chiffres, ',', '+', '-', '*', '/', '(',
')', frac, sqrt, sq, pow, neg, cos, sin, tan, shift, pi, pct, divr, fact, sd, ans, e10, x, left, right, up, down, del, ac, exe).
En place : 3e Trigonométrie, 4e Cosinus, Pythagore, Puissances, 5e Fractions. Pas de mode algorithmique.

## Conformité aux programmes : « Pour aller plus loin » (demandé le 28/10/2026)

« Ce qui est hors programme peut être mis en "pour aller plus loin" » : une notion d'un niveau supérieur n'est
pas supprimée mais placée en fin de chapitre sous un en-tête « Pour aller plus loin » (`ce1PlusLoin(titre, vers)`
dans `chapitres/ce1/_anims.js`, ou le même `sub-header` avec `data-oliv-plus`), ses planches titrées « Pour aller
plus loin : … », ses exercices préfixés « Pour aller plus loin : ». Ce qui manque au programme est ajouté au
chapitre concerné. CE1 contrôlé en entier, CP, 5e, 4e et 3e complétés (build 1194), CM1 et 6e (build 1195).
À la 4e et à la 3e, le contrôle suit l'ancien programme (2020) et ses attendus de fin d'année tant qu'il est en vigueur.

## Ventes : ouverture le 1er décembre 2026, page des tarifs publique (depuis le 10/11/2026)

**Ouverture des ventes le 1er décembre 2026** (autorisation de cumul d'activités obtenue le 10/11/2026). Depuis le 10/11/2026
(« On peut mettre la page des tarifs pour tous ! »), `tarifs/index.html` est la page COMPLÈTE des tarifs, publique et indexable,
avec le bandeau « Ouverture des ventes le 1er décembre 2026 · en attendant, essai gratuit » (à retirer le 1er décembre, le jour du
bouton « Ouvrir les ventes » d'Administration › Offres profs). `_hors-ligne/tarifs.html` (exclu de la publication) en reste la copie
de travail. Jusqu'à l'ouverture, DANS LE SITE, les comptes non « test » ne voient ni offres, ni prix, ni lien vers les tarifs dans
« Mon abonnement », ni prix dans l'Espace famille (`famVenteFermeeHtml`).
Page des tarifs DANS le site aussi (demandé le 10/11/2026) : vue `#/tarifs` (`tarifs.js`, visiteurs non connectés) qui
charge le contenu de `/tarifs/` (une seule source : modifier `tarifs/index.html`, et sa copie `_hors-ligne/tarifs.html`).
Tarifs bien visibles (demandé le 10/11/2026 : « je trouve que la page tarif est trop cachée ») : bouton « Tarifs » du menu principal
(`#navTarifs`) et bouton « Voir les tarifs » de l'accueil (`#heroTarifs`), lien du pied de page (`#footTarifs`) : VISITEURS NON CONNECTÉS
seulement (demandé le 10/11/2026 : « Supprimer la page tarif quand on est connecté » ; refreshAuthUI, tarifsOuvrir renvoie à l'accueil),
jamais sur L'Atelier du Prof. La page publique /tarifs/ reste accessible à tous par son adresse.
Plus de lien vers L'Atelier du Prof dans le pied de page de L'Atelier des Maths (demandé le 10/11/2026).
« Demander un devis » (demandé le 10/11/2026 : « un formulaire simple à remplir (profs seul, établissement, famille, profs particuliers...)
et s'adapter en fonction ») : fenêtre `#dvFond` de `tarifs/index.html` (boutons `data-devis`, préremplie depuis l'estimateur avec
`data-calc`), estimation indicative, envoi à la fonction `demande-devis` (verify_jwt non) qui range la demande dans `demandes_devis`
(`supabase/sql/2026-11-10-demandes-devis.sql`, clé de service seulement) et l'envoie à contact@ (reply_to = demandeur ; SMS pour un
établissement). Anti-robots : champ piège `site_web`, 4 s minimum, pas de lien, 3 demandes/heure par IP (empreinte), 40/jour.
Aucun e-mail au demandeur (un robot ferait écrire le site à n'importe qui).
Professeur seul au collège, grille du 10/11/2026 (« Pour le prof seul, faire une offre acceptable ») : 39 € un niveau, 54 € deux,
69 € trois ou quatre (`seul_niveau` 15 €, `seul_plafond` 69 €), jusqu'à 6 classes de 30 élèves comprises (`seul_classes`), + 10 € par
classe au-delà (`seul_classe`) ; prix dans `prof_parametres.prix` (Administration › Offres profs), calcul dans la fonction `prof-offre`
(`prixCollege`, `classesComprises`) et `offres-prof.js` ; CGV (index.html, partie B) à tenir à jour avec la page des tarifs.

Paiement intégré au site (Stripe Embedded Checkout, build 1205) : `paiementOuvrir` (app.js) ; les fonctions prof-offre et famille
renvoient client_secret + clé publique si les secrets STRIPE_TEST_PUBLISHABLE_KEY / STRIPE_PUBLISHABLE_KEY existent, sinon la page Stripe.

## Prise de rendez-vous : outil du site (depuis le 30/10/2026, build 1213)

Page « Prendre rendez-vous » (`#/rendez-vous`, `rdv.js` ; accès : menu du compte, pied de page, /professeurs/, /tarifs/ ; pour
tous sauf les élèves). Fonction `rdv` (verify_jwt non ; calcul des créneaux dans `supabase/functions/rdv/creneaux.ts`), tables
`rdv_reglages` et `rdv_reservations` (`supabase/sql/2026-10-30-rendez-vous.sql`), réglages dans Administration › Rendez-vous.
E-mails aux couleurs du site (Resend, contact@latelierdesmaths.fr), SMS par `alerte-sms` (sans_limite), rappels la veille et
purge à un an par pg_cron. Agendas pris en compte : `rdv_reglages.agendas` (cochés dans l'administration ; agendas abonnés par
adresse iCal lus événement par événement). Agenda Google relié par un compte de service (secrets GOOGLE_RDV_CLE, GOOGLE_RDV_COMPTE) : jamais
d'invitation Google (sendUpdates=none), le nom de l'administrateur n'apparaît nulle part. Cal.com et l'agenda de rendez-vous
Google ne sont plus utilisés.
Bandeau défilant des professeurs en essai (`#bandeauEssai`, `bandeauEssaiMaj`, app.js ; build 1308) : relecture en cours, invitation au
rendez-vous et au bêta-test ; à chaque ouverture de page et connexion, jamais aux abonnés, licences établissement, bêta-testeurs, ni sur ADP.

## Bandeaux d'information (demandé le 08/11/2026, build 1348)

« Une option "bandeau" […] l'administrateur […] (destination à définir sous chips à cocher), un référent établissement et un professeur
pour une ou plusieurs classes » : `bandeaux.js`, table `bandeaux` (`supabase/sql/2026-11-08-bandeaux.sql`, droits vérifiés par la base),
affichage `#bandeauxInfo` sous `#bandeauEssai` par `bandeaux_pour_moi()` (refreshAuthUI ; jamais sur ADP ni à l'impression). Gestion :
Administration › Bandeaux (site : visiteurs, élèves, professeurs, parents, référents ; niveaux et établissements facultatifs),
Mon établissement › Bandeaux (référent : professeurs / élèves de l'établissement), Mes classes › « Bandeau d'information » (professeur :
élèves / collègues de ses classes). Un bandeau masqué (✕) le reste sur l'appareil tant qu'il n'est pas modifié (localStorage).
