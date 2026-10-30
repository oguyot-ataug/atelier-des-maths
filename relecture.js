/* =====================================================================
   relecture.js -- Relecture des exercices du manuel par l'administrateur.

   Demandé : « Pour chaque exercice du manuel, je te propose d'apporter une coche de validation, non
   examiné, ou commenté. Non examiné ou commenté permet d'ouvrir une fenêtre modale pour écrire un
   commentaire ou cocher un commentaire prédéfini (Est-ce bien au programme ? Plus d'exemples, Formatage à
   revoir…). L'idée est que tu puisses régulièrement faire une petite synthèse et faire les changements
   nécessaires. Si tu as changé, me prévenir avec une coche de type "Chgt effectué". Ce travail me
   permettrait de valider chaque exercice tant pour le format papier que sa fonctionnalité numérique. »

   - Onglet « Manuel » d'un chapitre, administrateur seulement : sous chaque vignette, trois états
     (Validé, Non examiné, Commenté). « Validé » s'enregistre d'un clic ; les deux autres ouvrent la fenêtre
     de commentaire (remarques prédéfinies à cocher + texte libre, papier ou écran).
   - En tête de l'onglet : le compte du chapitre et un filtre (tous, à examiner, commentés, changés).
   - « Chgt effectué » : posé par Claude dans RELECTURE_CHGT ci-dessous (dans le dépôt, avec la
     modification de l'exercice) ; il s'affiche tant que l'exercice n'a pas été revu après la date du
     changement. Une nouvelle validation (ou un nouveau commentaire) le fait disparaître.
   - Clé d'un exercice : référence de la planche + numéro (6e-G3-P2-E3) ; l'extrait de la consigne est
     gardé pour le retrouver si la numérotation bouge.

   Données : table relecture_exercices (une ligne par exercice relu ; lecture et écriture réservées à
   l'administrateur, is_admin()).

   Bêta-testeurs (demandé : « je propose que des professeurs soient bêta-testeurs (réglage dans admin). Les
   bêta-testeurs peuvent faire des retours sur les exercices des manuels (comme en mode admin) ») :
   - case « Bêta-testeur » dans la fiche d'un professeur (Administration, admin.js) → profiles.beta_testeur ;
   - le bêta-testeur a la même barre sous chaque vignette ; ses retours vont dans relecture_beta (une ligne
     par exercice et par testeur ; il ne voit que les siens) ;
   - l'administrateur voit sous chaque vignette les retours des testeurs (nom, remarques), les marque
     « Traité », et les retrouve dans « Toutes les remarques » et dans le filtre « Retours bêta ».
   - État commun de chaque exercice, vu par tous (demandé : « il faut que chacun sache si l'exercice est
     validé ou en cours d'examen ») : Validé (validé par l'administrateur, aucune remarque en attente),
     En cours d'examen (remarque non traitée de l'administrateur ou d'un testeur, ou changement à revoir),
     Non examiné. Fonction relecture_etat_global() (compte les remarques, sans en montrer le contenu).
   ===================================================================== */

// Changements faits à la suite d'une remarque : clé → { date (ISO, heure UTC du changement), note }.
const RELECTURE_CHGT = {
  // Build 1044 : grands nombres à l'écran, tableau de 6e-N1-P1-E3.
  '6e-N1-P1-E1': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E2': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E5': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E6': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E3': { date: '2026-10-09T14:24:20Z', note: "Tableau aligné à gauche, la colonne Décomposition va jusqu'à la marge droite ; à l'écran, nombres écrits par classes comme ci-dessus" },
  // Build 1182 : CP-N1, exercices faits à l'écran ; corrigés des choix à entourer ; choix sous les petites figures (bêta).
  'CP-N1-P1-E4': { date: '2026-10-27T18:33:51Z', note: "À l'écran : on touche le cadre pour dessiner un rond, on touche un rond pour l'effacer (bouton « Tout effacer ») ; c'est juste quand il y a le bon nombre de ronds" },
  'CP-N1-P1-E5': { date: '2026-10-27T19:10:49Z', note: "À l'écran, la case touchée se colorie en entier (plus de disque) ; le corrigé montre aussi des cases coloriées. Les boîtes « Dessine des jetons » (N2, N3) gardent des jetons" },
  'CP-N1-P3-E3': { date: '2026-10-27T18:33:51Z', note: "Corrigé : les deux nombres restent visibles, le bon est entouré. Corrigé pour tous les exercices « Entoure » des manuels (tous niveaux)" },
  'CP-N1-P3-E4': { date: '2026-10-27T18:33:51Z', note: "À l'écran : un cadre pour les billes de Léo, un pour celles de Zoé (on touche pour dessiner), puis on touche Léo ou Zoé. Consigne : « Dessine les billes de chacun, puis entoure qui en a le plus »" },
  'CP-N1-P3-E5': { date: '2026-10-27T18:33:51Z', note: "Corrigé : les deux nombres restent visibles, le bon est entouré (comme l'exercice 3)" },
  'CP-N1-P3-E6': { date: '2026-10-27T18:33:51Z', note: "À l'écran : on touche le cadre pour dessiner un rond, on touche un rond pour l'effacer (bouton « Tout effacer ») ; c'est juste quand il y a le bon nombre de ronds" },
  '6e-G2-P1-E1': { date: '2026-10-27T18:33:51Z', note: "Retour bêta « les choix se superposent » : à l'écran, sous chaque figure, les mots passent à la ligne au lieu de se chevaucher (vaut pour tous les choix à l'écran)" },
  // Build 1183 : CP-N2, outils à l'écran (jetons bicolores, boîte à compléter, mains aux doigts mobiles).
  'CP-N2-P1-E6': { date: '2026-10-27T19:10:49Z', note: "À l'écran, on touche un jeton : rouge, puis bleu, puis blanc. Pour que la réponse puisse être vérifiée, les deux façons sont imposées : 4 rouges et 3 bleus, puis 6 rouges et 1 bleu" },
  'CP-N2-P2-E1': { date: '2026-10-27T19:51:50Z', note: "Addition « 6 + … = 10 » sur sa propre ligne, sous la boîte : les termes sont alignés (sur papier et à l'écran). Exercice placé en premier ; à l'écran, on touche les cases vides pour mettre les jetons bleus" },
  'CP-N2-P2-E4': { date: '2026-10-27T19:51:50Z', note: "C'est un défi : la boîte de dix est vide, l'élève dessine tout lui-même, en rouge les 6 images qu'il a, puis en bleu celles qui manquent (à l'écran, chaque toucher : rouge, puis bleu, puis vide) ; puis il écrit combien il en manque" },
  'CP-N2-P3-E3': { date: '2026-10-27T19:51:50Z', note: "On touche maintenant directement le doigt (levé ou replié, sur toute sa hauteur) ou le pouce (couché sur la paume ou levé) pour le lever ou le replier ; c'est juste avec 3 doigts levés sur chaque main" },
  // Build 1189 : projection stable, pommes à glisser, réponses ouvertes, rangements case par case, classes dès 4 chiffres.
  'CP-N3-P1-E1': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice" },
  'CP-N3-P1-E2': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice" },
  'CP-N2-P3-E1': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice (écrire 10 ne fait plus passer la case à la ligne)" },
  'CP-N3-P1-E6': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice. Nouveau : à l'écran, on peut faire glisser les pommes dans un cadre « paquet de 10 » pour les compter (aide non notée ; les pommes restent dans le dessin). Valable pour tous les exercices « Compte les pommes » du CP" },
  'CP-N3-P2-E7': { date: '2026-10-27T22:08:00Z', note: "Le décalage venait du message « Bravo… » qui apparaissait sous l'exercice après « Vérifier ma réponse » et faisait remonter l'exercice : sa place est maintenant réservée, plus rien ne bouge (toutes les projections)" },
  'CE2-N1-P1-E1': { date: '2026-10-27T22:08:00Z', note: "Chaque dessin est dans une case de même hauteur, la réponse en bas : les trois lignes de réponse sont alignées" },
  'CE2-N1-P2-E8': { date: '2026-10-28T10:13:30Z', note: "Plus de point central entre les deux écritures : elles sont séparées par un grand espace, et le tableau (nombre à gauche, écritures alignées à droite) prend toute la largeur ; une écriture ne se coupe plus en fin de ligne. Vaut pour tous les choix à entourer des planches (papier, projection, écran)" },
  'CE2-N1-P3-E2': { date: '2026-10-28T10:13:30Z', note: "L'encadrement « … < 4 563 < … » ne se coupe plus : il reste d'un seul tenant (s'il manque de place, il passe en entier à la ligne suivante). Vaut pour toutes les inégalités des exercices à compléter" },
  'CE2-N1-P3-E3': { date: '2026-10-28T10:13:30Z', note: "« … < … < … < … » ne se coupe plus en fin de ligne ; la liste des nombres à ranger est espacée, sans point central. Déjà faisable à l'écran (une case par nombre)" },
  'CE2-N1-P3-E7': { date: '2026-10-28T10:13:30Z', note: "Nombre écrit sans espace (2350) : en plus du message sous l'exercice, une étiquette apparaît au bout de la ligne : « Un espace tous les trois chiffres : 2 350 »" },
  'CE2-N1-P4-E2': { date: '2026-10-28T10:13:30Z', note: "À l'écran : toucher un point déjà placé le sélectionne (cerclé en pointillés), puis toucher sa nouvelle place le déplace ; un bouton « Effacer D » retire le point sélectionné" },
  'CE2-N1-P4-E3': { date: '2026-10-27T22:08:00Z', note: "Règle rendue cohérente : à l'écran, dès 4 chiffres, un nombre doit s'écrire avec un espace tous les trois chiffres quand la réponse attendue est écrite ainsi (9 999 et 10 000 ; 9999 est refusé comme 10000). Le message sous l'exercice dit alors : « Écris les nombres avec un espace tous les trois chiffres (9 999, 10 000) ». Une année (2026) reste sans espace" },
  'CE2-N1-P4-E4': { date: '2026-10-28T10:13:30Z', note: "Sur papier comme à l'écran, les nombres sont séparés par un grand espace, sans point central (règle appliquée à toutes les planches) ; à l'écran, un seul nombre se choisit" },
  // Build 1196 (28/10, inscrit le 30/10) : planches CE2-N3 et CE2-N4 réécrites ; les numéros d'exercices ont changé.
  'CE2-N3-P1-E2': { date: '2026-10-28T23:07:36Z', note: "Planche réécrite (numéros décalés) : c'est maintenant l'exercice 3. À l'écran, chaque addition se pose case par case (chiffres et retenues), puis le résultat s'écrit" },
  'CE2-N3-P1-E3': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 4 : trois additions posées, dont une à trois termes. À l'écran, on touche les cases du résultat et des retenues pour écrire (une retenue : un seul chiffre)" },
  'CE2-N3-P1-E4': { date: '2026-10-28T23:07:36Z', note: "Maintenant les exercices 5 et 6 : deux problèmes côte à côte ; le premier garde ses trois termes (l'addition à trois termes est posée à l'exercice 4)" },
  'CE2-N3-P1-E5': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 7 : six calculs sur deux colonnes" },
  'CE2-N3-P2-E1': { date: '2026-10-28T23:07:36Z', note: "Corrigé avec les soustractions posées ; nombres de longueurs différentes (5 638 − 415, 1 249 − 37) pour vérifier l'alignement ; à l'écran, la soustraction se pose case par case" },
  'CE2-N3-P2-E2': { date: '2026-10-28T23:07:36Z', note: "Corrigé posé avec les compensations (+10 en haut, +1 en bas) ; nombres de longueurs différentes (3 021 − 456) ; à l'écran, posée case par case" },
  'CE2-N3-P2-E3': { date: '2026-10-28T23:07:36Z', note: "En tableau : la soustraction, l'addition qui la vérifie (à compléter), puis « juste » ou « fausse » à entourer" },
  'CE2-N3-P2-E4': { date: '2026-10-28T23:07:36Z', note: "Corrigé : la soustraction posée par compensation (retenues placées) et par cassage ; deux problèmes côte à côte (mont Blanc, avion)" },
  'CE2-N3-P2-E5': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 6 : huit calculs sur deux colonnes" },
  'CE2-N3-P2-E6': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 7 : six calculs sur deux colonnes" },
  'CE2-N3-P3-E1': { date: '2026-10-28T23:07:36Z', note: "Huit calculs sur deux colonnes" },
  'CE2-N3-P3-E2': { date: '2026-10-28T23:07:36Z', note: "Refait : une ligne par choix (Ligne A, B…), les deux calculs côte à côte et bien espacés, sans répétition ; consigne : « entoure le calcul que tu ferais de tête. Tu poseras l'autre. »" },
  'CE2-N3-P3-E4': { date: '2026-10-28T23:07:36Z', note: "Deux problèmes côte à côte (Mia, le libraire)" },
  'CE2-N3-P3-E6': { date: '2026-10-28T23:07:36Z', note: "Six calculs sur deux colonnes" },
  'CE2-N4-P1-E4': { date: '2026-10-28T23:07:36Z', note: "À l'écran, la fraction se complète dans deux cases (numérateur et dénominateur)" },
  'CE2-N4-P2-E1': { date: '2026-10-28T23:07:36Z', note: "Quatre égalités sur deux colonnes" },
  'CE2-N4-P2-E2': { date: '2026-10-28T23:07:36Z', note: "Huit égalités sur deux colonnes" },
  'CE2-N4-P2-E3': { date: '2026-10-28T23:07:36Z', note: "Six égalités en deux tableaux côte à côte (égalité, puis « vraie fausse »), plus espacés" },
  'CE2-N4-P2-E4': { date: '2026-10-28T23:07:36Z', note: "« identique » au lieu de « pareille » ; deux problèmes côte à côte (la tarte, les rubans)" },
  'CE2-N4-P2-E5': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 6 : huit égalités sur deux colonnes" },
  // Build 1223 (30/10) : remarques du 30/10 (CE2-N3, CE2-N4, 5e-N7).
  'CE2-N3-P2-E7': { date: '2026-10-30T19:40:00Z', note: "Déjà sur deux colonnes depuis le 28/10 (6 calculs). Pas d'ajout : la planche 2 est pleine, un calcul de plus la ferait passer sur une deuxième feuille" },
  'CE2-N3-P3-E3': { date: '2026-10-30T19:40:00Z', note: "Huit calculs sur deux colonnes (deux de plus)" },
  'CE2-N4-P1-E1': { date: '2026-10-30T19:40:00Z', note: "Huit figures plus petites sur quatre colonnes, la fraction toujours sous sa figure ; à l'écran, chaque fraction s'écrit dans ses deux cases" },
  'CE2-N4-P1-E5': { date: '2026-10-30T19:40:00Z', note: "Les fractions des choix s'affichent bien à l'écran (depuis le 28/10) ; deux exemples de plus, sur deux colonnes" },
  '5e-N7-P1-E1': { date: '2026-10-30T19:40:00Z', note: "À l'écran, « 6 × 6 » est accepté, tapé avec la touche × du clavier, avec * ou avec x (la réponse attendue restait écrite en LaTeX) ; vaut pour toutes les planches" },
  '5e-N7-P1-E3': { date: '2026-10-30T21:50:00Z', note: "À l'écran, la base et l'exposant s'écrivent chacun dans leur case, ajustée au chiffre, dans la police et à la taille de l'énoncé, sur la même ligne ; la case de l'exposant est petite et surélevée, collée à la base (comme une vraie puissance) ; une 4e ligne (7 × 7 × 7) ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P1-E4': { date: '2026-10-30T19:40:00Z', note: "Vrai ou faux en tableau : l'égalité à gauche, « vrai faux » alignés à droite ; une 4e égalité (1³ = 1). Sur papier, les exposants s'impriment bien (6² et non « 6^2 », défaut corrigé pour toutes les planches)" },
  '5e-N7-P2-E1': { date: '2026-10-30T21:50:00Z', note: "À l'écran, la base et l'exposant s'écrivent chacun dans leur case (6 puis 2) : rien n'est imprimé d'avance ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P2-E2': { date: '2026-10-30T21:50:00Z', note: "À l'écran, la base et l'exposant s'écrivent chacun dans leur case (3 puis 3) : rien n'est imprimé d'avance ; une 4e ligne (8 = 2³) ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P2-E3': { date: '2026-10-30T21:50:00Z', note: "Consigne précisée : « sous la forme d'un carré, puis sous la forme d'un cube » (64 = 8² = 4³), pour qu'il n'y ait qu'une réponse juste par case ; à l'écran, les bases et les exposants s'écrivent dans des cases, rien n'est imprimé d'avance ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P2-E4': { date: '2026-10-30T21:50:00Z', note: "À l'écran, les bases et les exposants s'écrivent dans des cases, rien n'est imprimé d'avance (7² < 50 < 8²) ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  // Build 1230 (30/10) : remarques du soir sur 5e-N7, planches 3 et 4.
  '5e-N7-P3-E2': { date: '2026-10-30T22:10:00Z', note: "Corrigé réécrit : plus de titre « B : » ni de phrase ; la première ligne est le calcul demandé (B = 4 + 3 × 2³), puis B = 4 + 3 × 8, B = 4 + 24, B = 28 encadré" },
  '5e-N7-P3-E4': { date: '2026-10-30T22:10:00Z', note: "Corrigé : chaque calcul commence par le calcul demandé (C = (5 + 4)², D = 5² + 4²), résultats encadrés ; la phrase réponse reste, la question en demande une" },
  '5e-N7-P4-E1': { date: '2026-10-30T22:40:00Z', note: "Six questions sur deux colonnes, 3 et 3 (trois aires de carrés, trois volumes de cubes), formulées plus court pour tenir sur une ligne ; dans le Manuel aussi, les listes des exercices pleine largeur sont sur deux colonnes, comme sur la feuille" },
  '5e-N7-P4-E2': { date: '2026-10-30T22:10:00Z', note: "Exercice remplacé : « Un carré a un périmètre de 36 m. Calcule son aire. » La réponse vient de deux calculs (36 ÷ 4 = 9, puis 9² = 81) ; retrouver un côté à partir de l'aire (racine carrée) est au programme de 4e" },
};

const RL_REMARQUES = [
  'Est-ce bien au programme ?',
  'Plus d\'exemples',
  'Formatage à revoir',
  'Erreur dans l\'énoncé ou le corrigé',
  'Consigne pas claire',
  'Figure ou dessin à revoir',
  'Trop difficile (étoiles à revoir)',
  'Trop facile (étoiles à revoir)',
  'Papier : mise en page (coupure, place pour répondre…)',
  'Écran : ne fonctionne pas bien',
  'Écran : devrait pouvoir se faire à l\'écran',
];
const RL_ETATS = { ok: ['check_circle', 'Validé'], non: ['radio_button_unchecked', 'Non examiné'], com: ['chat', 'Commenté'] };
const rl = { lignes: null, filtre: '', beta: null, betaUid: null, retours: new Map(), etats: new Map() };
const rlAdmin = () => typeof currentUserRole !== 'undefined' && currentUserRole === 'admin';
// Professeur bêta-testeur (profiles.beta_testeur, posé par l'administrateur) : relu une fois par compte.
async function rlEstBeta(){
  if(typeof currentUserRole === 'undefined' || currentUserRole !== 'prof' || !currentUser) return false;
  if(rl.betaUid !== currentUser.id){
    rl.betaUid = currentUser.id; rl.beta = false; rl.lignes = null;
    const { data } = await sb.from('profiles').select('beta_testeur').eq('id', currentUser.id).maybeSingle();
    rl.beta = !!(data && data.beta_testeur);
  }
  return rl.beta;
}
const rlBeta = () => !rlAdmin() && rl.beta && currentUser && rl.betaUid === currentUser.id;
const rlNom = r => r && r.profiles ? [r.profiles.prenom, r.profiles.nom].filter(Boolean).join(' ') : 'Bêta-testeur';
// Retours des bêta-testeurs à traiter (vus par l'administrateur).
const rlATraiter = r => r.statut === 'com' && !r.traite;
const rlEsc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rlCle = (lvl, c, i, k) => `${plRef(lvl, plCode(lvl, c), i)}-E${k + 1}`;
// Changement effectué et pas encore revu (la ligne a été mise à jour avant la date du changement).
function rlChgt(cle){
  const ch = RELECTURE_CHGT[cle], l = rl.lignes && rl.lignes.get(cle);
  if(!ch) return null;
  return !l || Date.parse(l.updated_at) < Date.parse(ch.date) ? ch : null;
}

async function rlCharger(force){
  const uid = currentUser && currentUser.id;
  if(rl.lignes && !force && rl.uid === uid) return rl.lignes;
  rl.uid = uid;
  const q = rlBeta() ? sb.from('relecture_beta').select('*').eq('user_id', currentUser.id) : sb.from('relecture_exercices').select('*');
  const { data, error } = await q;
  if(error){ rl.erreur = error.message; rl.lignes = new Map(); return rl.lignes; }
  rl.erreur = null; rl.lignes = new Map((data || []).map(r => [r.cle, r]));
  await rlEtatsCharger();
  if(rlAdmin()){ // retours des bêta-testeurs, regroupés par exercice
    const { data: b } = await sb.from('relecture_beta').select('*, profiles(nom, prenom)').order('updated_at');
    rl.retours = new Map(); (b || []).forEach(r => { if(!rl.retours.has(r.cle)) rl.retours.set(r.cle, []); rl.retours.get(r.cle).push(r); });
  }
  return rl.lignes;
}
// État commun de chaque exercice (administrateur et bêta-testeurs) : statut de l'administrateur et
// nombre de remarques de testeurs en attente / de validations.
async function rlEtatsCharger(){
  const { data, error } = await sb.rpc('relecture_etat_global');
  rl.etats = new Map(error ? [] : (data || []).map(r => [r.cle, r]));
}
function rlEtat(cle){
  const e = rl.etats.get(cle) || {}, chgt = !!RELECTURE_CHGT[cle] && !!rlChgt(cle);
  const n = (e.remarques_ouvertes || 0) + (e.statut_admin === 'com' ? 1 : 0);
  if(n || chgt) return ['examen', 'hourglass_top', 'En cours d\'examen', n ? `${n} remarque${n > 1 ? 's' : ''} en attente` : 'modifié, à revoir'];
  if(e.statut_admin === 'ok') return ['valide', 'verified', 'Validé', ''];
  return ['nonex', 'radio_button_unchecked', 'Non examiné', e.validations ? `validé par ${e.validations} testeur${e.validations > 1 ? 's' : ''}` : ''];
}
async function rlEnregistrer(lvl, c, i, k, maj){
  const x = plDe(lvl, c.t)[i].exos[k], cle = rlCle(lvl, c, i, k);
  const consigne = String(x.consigne || '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  const ligne = Object.assign({ cle, niveau: lvl, chapitre: `${c.code} · ${c.t}`, consigne, tags: [], commentaire: '' },
    (rl.lignes && rl.lignes.get(cle)) || {}, maj, { updated_at: new Date().toISOString() });
  delete ligne.updated_by;
  const beta = rlBeta(), table = beta ? 'relecture_beta' : 'relecture_exercices';
  if(beta){ delete ligne.id; delete ligne.profiles; ligne.user_id = currentUser.id; ligne.traite = false; }
  const { error } = await sb.from(table).upsert(ligne, { onConflict: beta ? 'cle,user_id' : 'cle' });
  if(error){ await niceAlert('Relecture non enregistrée : ' + error.message + (/relation|does not exist|schema cache/i.test(error.message) ? `\n\nLa table ${table} n'existe pas encore : exécutez le SQL fourni dans Supabase.` : '')); return false; }
  rl.lignes.set(cle, ligne);
  await rlEtatsCharger();
  return true;
}

/* ---------- Barre de relecture sous chaque vignette ---------- */
function rlBarreHtml(cle){
  const l = rl.lignes.get(cle), st = (l && l.statut) || 'non', ch = rlChgt(cle);
  const rem = l && (l.tags.length || l.commentaire) ? `<div class="rl-rem">${l.tags.map(t => `<span>${rlEsc(t)}</span>`).join('')}${l.commentaire ? `<em>${rlEsc(l.commentaire)}</em>` : ''}</div>` : '';
  const [ek, eic, et, ed] = rlEtat(cle);
  return `<div class="rl-etat rl-etat-${ek}" title="État de l'exercice pour toute l'équipe de relecture"><span class="gicon">${eic}</span> ${et}${ed ? ` <small>· ${rlEsc(ed)}</small>` : ''}</div>
    <div class="rl-barre"><span class="rl-moi">${rlBeta() ? 'Mon avis :' : 'Mon statut :'}</span>${Object.entries(RL_ETATS).map(([k, [ic, t]]) => `<button type="button" class="rl-b rl-${k}${st === k ? ' on' : ''}" data-rl="${k}"><span class="gicon">${ic}</span> ${t}</button>`).join('')}
      ${ch ? `<span class="rl-chgt" title="${rlEsc(ch.note || '')}"><span class="gicon">published_with_changes</span> Chgt effectué le ${new Date(ch.date).toLocaleDateString('fr-FR')}${ch.note ? ' : ' + rlEsc(ch.note) : ''}</span>` : ''}
      <span class="rl-cle">${rlEsc(cle)}</span></div>${rem}${rlAdmin() ? rlRetoursHtml(cle) : ''}`;
}
// Retours des bêta-testeurs sur un exercice (administrateur) : remarques, puis « validé par … ».
function rlRetoursHtml(cle){
  const l = rl.retours.get(cle) || []; if(!l.length) return '';
  const ok = l.filter(r => r.statut === 'ok'), com = l.filter(r => r.statut === 'com');
  return `<div class="rl-betas">${com.map(r => `<div class="rl-beta${r.traite ? ' traite' : ''}"><span class="gicon">group</span> <b>${rlEsc(rlNom(r))}</b>
      <span class="rl-rem">${(r.tags || []).map(t => `<span>${rlEsc(t)}</span>`).join('')}${r.commentaire ? `<em>${rlEsc(r.commentaire)}</em>` : ''}</span>
      <button type="button" class="rl-b rl-tr${r.traite ? ' on' : ''}" data-rltr="${r.id}"><span class="gicon">${r.traite ? 'task_alt' : 'radio_button_unchecked'}</span> Traité</button></div>`).join('')}
    ${ok.length ? `<div class="rl-beta-ok"><span class="gicon">group</span> Validé par ${ok.map(r => rlEsc(rlNom(r))).join(', ')}</div>` : ''}</div>`;
}
async function rlTraiter(id){
  const r = [...rl.retours.values()].flat().find(x => String(x.id) === String(id)); if(!r) return false;
  const { error } = await sb.from('relecture_beta').update({ traite: !r.traite }).eq('id', r.id);
  if(error){ await niceAlert('Non enregistré : ' + error.message); return false; }
  r.traite = !r.traite; await rlEtatsCharger(); return true;
}
function rlEtatVig(v, cle){
  const l = rl.lignes.get(cle), st = (l && l.statut) || 'non';
  v.classList.remove('rl-v-ok', 'rl-v-com', 'rl-v-chgt', 'rl-v-beta');
  if(rlChgt(cle)) v.classList.add('rl-v-chgt'); else if(st !== 'non') v.classList.add('rl-v-' + st);
  if(rlAdmin() && (rl.retours.get(cle) || []).some(rlATraiter)) v.classList.add('rl-v-beta');
}
async function rlDecorer(lvl, c){
  const root = document.getElementById('tdRoot'); if(!root || !(rlAdmin() || await rlEstBeta())) return;
  await rlCharger();
  const liste = plDe(lvl, c.t); if(!liste.length) return;
  const cles = [];
  liste.forEach((p, i) => p.exos.forEach((x, k) => {
    const v = document.getElementById(`tdv-${i}-${k}`); if(!v) return;
    const cle = rlCle(lvl, c, i, k); cles.push(cle);
    let b = v.querySelector('.rl-zone');
    if(!b){ b = document.createElement('div'); b.className = 'rl-zone'; v.appendChild(b); }
    b.innerHTML = rlBarreHtml(cle); v.dataset.rl = cle; rlEtatVig(v, cle);
    b.onclick = async e => {
      const tr = e.target.closest('[data-rltr]');
      if(tr){ e.stopPropagation(); if(await rlTraiter(tr.dataset.rltr)){ b.innerHTML = rlBarreHtml(cle); rlEtatVig(v, cle); rlEntete(lvl, c); } return; }
      const t = e.target.closest('[data-rl]'); if(!t) return;
      e.stopPropagation();
      if(t.dataset.rl === 'ok'){ if(await rlEnregistrer(lvl, c, i, k, { statut: 'ok' })){ b.innerHTML = rlBarreHtml(cle); rlEtatVig(v, cle); rlEntete(lvl, c); } }
      else rlFenetre(lvl, c, i, k, t.dataset.rl, () => { b.innerHTML = rlBarreHtml(cle); rlEtatVig(v, cle); rlEntete(lvl, c); });
    };
  }));
  rl.cles = cles;
  rlEntete(lvl, c);
}
// En tête de l'onglet : compte du chapitre, filtre, et toutes les remarques en cours (tous chapitres).
function rlEntete(lvl, c){
  const root = document.getElementById('tdRoot'); if(!root) return;
  let h = root.querySelector('.rl-entete');
  if(!h){ h = document.createElement('div'); h.className = 'rl-entete'; root.insertBefore(h, root.querySelector('.td-planche') || root.firstChild.nextSibling); }
  const n = { ok: 0, non: 0, com: 0, chgt: 0 };
  (rl.cles || []).forEach(k => { if(rlChgt(k)) n.chgt++; else n[((rl.lignes.get(k) || {}).statut) || 'non']++; });
  const nG = { valide: 0, examen: 0 }; (rl.cles || []).forEach(k => { const e = rlEtat(k)[0]; if(e in nG) nG[e]++; });
  const nBeta = rlAdmin() ? (rl.cles || []).filter(k => (rl.retours.get(k) || []).some(rlATraiter)).length : 0;
  const f = (id, t, nb) => `<button type="button" class="rl-f${rl.filtre === id ? ' on' : ''}" data-rlf="${id}">${t} <b>${nb}</b></button>`;
  h.innerHTML = `<b><span class="gicon">rate_review</span> ${rlBeta() ? 'Bêta-test : vos retours' : 'Relecture'}</b>
    ${f('', 'Tous', (rl.cles || []).length)}${f('ok', 'Validés', n.ok)}${f('non', 'Non examinés', n.non)}${f('com', 'Commentés', n.com)}${f('chgt', 'Chgt effectué', n.chgt)}${rlAdmin() ? f('beta', 'Retours bêta', nBeta) : ''}
    <span class="rl-moi" style="margin-left:6px;">Équipe :</span>${f('g-valide', 'Validés', nG.valide)}${f('g-examen', 'En cours d\'examen', nG.examen)}
    <span style="flex:1"></span><button type="button" class="btn secondary td-mini" data-rlsynth><span class="gicon">list_alt</span> Toutes les remarques</button>
    ${rl.erreur ? `<span class="rl-err">Relecture indisponible : ${rlEsc(rl.erreur)}</span>` : ''}`;
  h.onclick = e => {
    const b = e.target.closest('[data-rlf]'); if(b){ rl.filtre = b.dataset.rlf; rlFiltrer(); rlEntete(lvl, c); return; }
    if(e.target.closest('[data-rlsynth]')) rlSynthese();
  };
  rlFiltrer();
}
function rlFiltrer(){
  document.querySelectorAll('#tdRoot .td-vig[data-rl]').forEach(v => {
    const cle = v.dataset.rl, st = rlChgt(cle) ? 'chgt' : ((rl.lignes.get(cle) || {}).statut || 'non');
    const beta = (rl.filtre === 'beta' && (rl.retours.get(cle) || []).some(rlATraiter)) || rl.filtre === 'g-' + rlEtat(cle)[0];
    v.style.display = !rl.filtre || rl.filtre === st || beta ? '' : 'none';
  });
  document.querySelectorAll('#tdRoot .td-planche').forEach(s => {
    s.style.display = [...s.querySelectorAll('.td-vig[data-rl]')].some(v => v.style.display !== 'none') || !rl.filtre ? '' : 'none';
  });
}

/* ---------- Fenêtre de commentaire ---------- */
function rlFenetre(lvl, c, i, k, statut, apres){
  const cle = rlCle(lvl, c, i, k), l = rl.lignes.get(cle) || { tags: [], commentaire: '' };
  const o = document.createElement('div'); o.className = 'modal-overlay'; o.style.cssText = 'display:flex;z-index:9470;';
  const st0 = statut === 'non' && (l.tags.length || l.commentaire) ? 'com' : statut;
  o.innerHTML = `<div class="modal-card rl-modal">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">rate_review</span> ${rlEsc(cle)}</b>
      <button class="modal-close" data-rlx><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:4px 0 8px;">${rlEsc(`${c.code} · ${c.t}`)} — exercice ${k + 1} de la planche ${i + 1}</p>
    <div class="rl-tags">${RL_REMARQUES.concat(l.tags.filter(t => !RL_REMARQUES.includes(t))).map(t => `<label><input type="checkbox" value="${rlEsc(t)}"${l.tags.includes(t) ? ' checked' : ''}> ${rlEsc(t)}</label>`).join('')}</div>
    <label class="cd-lab" style="display:block;margin-top:8px;">Commentaire
      <textarea id="rlTexte" rows="4" style="width:100%;box-sizing:border-box;" placeholder="Ce qui ne va pas, ce qu'il faudrait changer (papier ou écran)…">${rlEsc(l.commentaire)}</textarea></label>
    <div class="rl-st"><label><input type="radio" name="rlSt" value="com"${st0 === 'com' ? ' checked' : ''}> Commenté (à reprendre)</label>
      <label><input type="radio" name="rlSt" value="non"${st0 === 'non' ? ' checked' : ''}> Non examiné (à revoir plus tard)</label></div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn secondary" data-rlx>Annuler</button><button class="btn" data-rlok><span class="gicon">save</span> Enregistrer</button></div></div>`;
  document.body.appendChild(o);
  const fermer = () => o.remove();
  o.addEventListener('click', async e => {
    if(e.target === o || e.target.closest('[data-rlx]')) return fermer();
    if(!e.target.closest('[data-rlok]')) return;
    const tags = [...o.querySelectorAll('.rl-tags input:checked')].map(x => x.value), commentaire = o.querySelector('#rlTexte').value.trim();
    let st = o.querySelector('input[name=rlSt]:checked').value;
    if(st === 'com' && !tags.length && !commentaire){ await niceAlert('Cochez une remarque ou écrivez un commentaire (ou choisissez « Non examiné »).'); return; }
    if(await rlEnregistrer(lvl, c, i, k, { statut: st, tags, commentaire })){ fermer(); apres(); }
  });
  setTimeout(() => { const t = o.querySelector('#rlTexte'); if(t) t.focus(); }, 50);
}

/* ---------- Toutes les remarques (tous chapitres) ---------- */
async function rlSynthese(){
  await rlCharger(true);
  const l = [...rl.lignes.values()].filter(r => r.statut === 'com' || rlChgt(r.cle)).sort((a, b) => a.cle.localeCompare(b.cle, 'fr', { numeric: true }));
  const tous = [...rl.lignes.values()], nOk = tous.filter(r => r.statut === 'ok').length;
  const o = document.createElement('div'); o.className = 'modal-overlay'; o.style.cssText = 'display:flex;z-index:9470;';
  o.innerHTML = `<div class="modal-card rl-modal" style="max-width:860px;max-height:88vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">list_alt</span> Remarques en cours</b>
      <button class="modal-close" data-rlx><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:4px 0 10px;">${nOk} exercice${nOk > 1 ? 's' : ''} validé${nOk > 1 ? 's' : ''} ; ${l.length} remarque${l.length > 1 ? 's' : ''} en cours (commentés, ou changés et à revoir), tous niveaux.</p>
    ${l.map(r => { const ch = rlChgt(r.cle); return `<div class="rl-s-l${ch ? ' chgt' : ''}"><div><b>${rlEsc(r.cle)}</b> <small>${rlEsc(r.chapitre || '')}</small></div>
      <small class="rl-s-c">${rlEsc(r.consigne || '')}</small>
      <div class="rl-rem">${(r.tags || []).map(t => `<span>${rlEsc(t)}</span>`).join('')}${r.commentaire ? `<em>${rlEsc(r.commentaire)}</em>` : ''}</div>
      ${ch ? `<small class="rl-chgt"><span class="gicon">published_with_changes</span> Chgt effectué le ${new Date(ch.date).toLocaleDateString('fr-FR')}${ch.note ? ' : ' + rlEsc(ch.note) : ''}</small>` : ''}</div>`; }).join('') || '<p class="hint">Aucune remarque en cours.</p>'}</div>`;
  document.body.appendChild(o);
  if(rlAdmin()){ // retours des bêta-testeurs à traiter, tous niveaux
    const rb = [...rl.retours.values()].flat().filter(rlATraiter).sort((a, b) => a.cle.localeCompare(b.cle, 'fr', { numeric: true }));
    const d = document.createElement('div');
    d.innerHTML = `<h4 style="margin:16px 0 4px;"><span class="gicon" style="vertical-align:-4px;">group</span> Retours des bêta-testeurs à traiter (${rb.length})</h4>`
      + (rb.map(r => `<div class="rl-s-l"><div><b>${rlEsc(r.cle)}</b> <small>${rlEsc(r.chapitre || '')}</small> · <b>${rlEsc(rlNom(r))}</b></div>
        <small class="rl-s-c">${rlEsc(r.consigne || '')}</small>
        <div class="rl-rem">${(r.tags || []).map(t => `<span>${rlEsc(t)}</span>`).join('')}${r.commentaire ? `<em>${rlEsc(r.commentaire)}</em>` : ''}</div>
        <button type="button" class="rl-b rl-tr" data-rltr="${r.id}" style="margin-top:4px;"><span class="gicon">radio_button_unchecked</span> Traité</button></div>`).join('') || '<p class="hint">Aucun retour à traiter.</p>');
    o.querySelector('.modal-card').appendChild(d);
  }
  o.addEventListener('click', async e => {
    if(e.target === o || e.target.closest('[data-rlx]')) return o.remove();
    const tr = e.target.closest('[data-rltr]');
    if(tr && await rlTraiter(tr.dataset.rltr)) tr.closest('.rl-s-l').classList.add('fait');
  });
}

// Branchement : après chaque affichage de l'onglet Manuel (planches.js › plTdRendre).
(function(){
  const brancher = () => {
    if(typeof plTdRendre !== 'function' || plTdRendre.rl) return false;
    const orig = plTdRendre;
    plTdRendre = function(lvl, c){ const r = orig.apply(this, arguments); if(rlAdmin() || (typeof currentUserRole !== 'undefined' && currentUserRole === 'prof')) rlDecorer(lvl, c); return r; };
    plTdRendre.rl = true;
    return true;
  };
  if(!brancher()) document.addEventListener('DOMContentLoaded', brancher);
  const st = document.createElement('style');
  st.textContent = `
    .rl-zone{border-top:1px dashed rgba(28,43,57,.18);margin-top:6px;padding-top:6px;}
    .rl-barre{display:flex;flex-wrap:wrap;gap:4px;align-items:center;}
    .rl-b{border:1px solid rgba(28,43,57,.18);background:#fff;border-radius:999px;padding:2px 9px 2px 6px;font:600 .76rem Inter,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:3px;color:#5B6472;}
    .rl-b .gicon{font-size:15px;} .rl-b.rl-ok.on{background:#E3F4EA;border-color:#1F7A4D;color:#1F7A4D;}
    .rl-b.rl-non.on{background:#EEF1F5;border-color:#8A94A3;color:#3C4654;} .rl-b.rl-com.on{background:#FDF1DF;border-color:#C77D1E;color:#A0620F;}
    .rl-chgt{display:inline-flex;align-items:center;gap:3px;background:#E6EEFB;color:#1F5FA8;border-radius:999px;padding:2px 9px;font:700 .74rem Inter,sans-serif;} .rl-chgt .gicon{font-size:15px;}
    .rl-cle{margin-left:auto;font:600 .7rem 'Space Grotesk',monospace;color:#9AA3AF;}
    .rl-rem{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;font-size:.76rem;} .rl-rem span{background:#FDF1DF;color:#8A5A00;border-radius:6px;padding:1px 6px;} .rl-rem em{color:#3C4654;flex-basis:100%;}
    .rl-etat{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:2px 10px 2px 7px;margin-bottom:5px;font:700 .76rem Inter,sans-serif;} .rl-etat .gicon{font-size:15px;} .rl-etat small{font-weight:500;}
    .rl-etat-valide{background:#E3F4EA;color:#1F7A4D;} .rl-etat-examen{background:#FDF1DF;color:#A0620F;} .rl-etat-nonex{background:#EEF1F5;color:#5B6472;}
    .rl-moi{font:600 .72rem Inter,sans-serif;color:#9AA3AF;margin-right:2px;}
    .rl-betas{margin-top:5px;display:flex;flex-direction:column;gap:4px;}
    .rl-beta{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;background:#F3EEFB;border-radius:8px;padding:4px 8px;font-size:.78rem;} .rl-beta .gicon, .rl-beta-ok .gicon{font-size:15px;color:#7A4FC0;}
    .rl-beta .rl-rem{margin:0;flex:1;} .rl-beta.traite{opacity:.55;} .rl-beta-ok{font-size:.76rem;color:#5B6472;display:flex;align-items:center;gap:4px;}
    .rl-b.rl-tr.on{background:#E3F4EA;border-color:#1F7A4D;color:#1F7A4D;} .rl-s-l.fait{opacity:.45;}
    .td-vig.rl-v-beta{box-shadow:inset 0 0 0 2px #A07BE0;}
    .td-vig.rl-v-ok{box-shadow:inset 0 0 0 2px #7CC29A;} .td-vig.rl-v-com{box-shadow:inset 0 0 0 2px #E8A64B;} .td-vig.rl-v-chgt{box-shadow:inset 0 0 0 2px #5B8FD6;}
    .rl-entete{display:flex;flex-wrap:wrap;gap:6px;align-items:center;background:#F7F9FC;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:8px 12px;margin:10px 0;font-size:.85rem;}
    .rl-entete > b .gicon{vertical-align:-4px;font-size:18px;color:#1F5FA8;}
    .rl-f{border:1px solid rgba(28,43,57,.15);background:#fff;border-radius:999px;padding:2px 10px;cursor:pointer;font:500 .8rem Inter,sans-serif;} .rl-f.on{background:#1F3A5C;color:#fff;border-color:#1F3A5C;}
    .rl-err{color:#C0392B;font-weight:600;flex-basis:100%;}
    .rl-modal{max-width:560px;width:94vw;}
    .rl-tags{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:4px 12px;font-size:.88rem;} .rl-tags label{display:flex;gap:6px;align-items:flex-start;}
    .rl-st{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:8px;font-size:.88rem;} .rl-st label{display:inline-flex;gap:5px;align-items:center;}
    .rl-s-l{border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:7px 10px;margin:6px 0;} .rl-s-l.chgt{border-color:#5B8FD6;}
    .rl-s-l small{color:#5B6472;} .rl-s-c{display:block;margin:2px 0;}
    @media print{ .rl-zone, .rl-entete{ display:none !important; } }
  `;
  document.head.appendChild(st);
})();
