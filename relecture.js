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
  // UNE SEULE entrée par clé : pour un exercice déjà corrigé, remplacer (ou retirer) l'ancienne entrée. Avec deux entrées, JavaScript
  // garde la DERNIÈRE du fichier -- la plus ancienne, puisque les nouvelles vont en tête -- et l'exercice restait « Commenté »
  // (signalé le 05/11/2026 : « Tu sembles avoir traité des exercices en CE2 mais ils ne sont pas marqués comme tels »).
  // La date d'un changement est l'heure RÉELLE de sa mise en ligne (heure du commit poussé sur main), jamais une heure
  // arrondie dans le futur : un exercice validé entre la mise en ligne et une date trop tardive resterait « Chgt effectué »
  // (signalé le 01/11/2026 pour 6e-N1 ; dates corrigées d'après l'historique des publications).
  // Version 1314 (05/11).
  '6e-N3-P5-E3': { date: '2026-11-05T06:39:33Z', note: "Tableau des arrondis en demi-largeur, aligné à gauche ; l'autre moitié revient à l'exercice voisin, et le tableau de troncature (par défaut, par excès, arrondi) passe aussi en demi-largeur (P5-E7)" },
  '6e-N3-P6-E5': { date: '2026-11-05T06:39:33Z', note: "Gardé comme retour sur la division euclidienne (spirale) : la consigne le dit (« Convertis en centimètres, puis pose une division euclidienne ») ; corrigé 240 = 75 × 3 + 15" },
  // Version 1313 (04/11).
  '5e-G2-P6-E2': { date: '2026-11-04T23:14:51Z', note: "Pleine largeur, en tableau à cocher sur deux colonnes (complémentaires, supplémentaires, aucun des deux en tête de colonne, une ligne par paire d'angles) ; huit paires ; P6-E1 aussi en pleine largeur (huit calculs)" },
  '6e-N3-P4-E2': { date: '2026-11-04T23:14:51Z', note: "Consigne : « Supprime les zéros inutiles : réécris chaque nombre. »" },
  '6e-N3-P4-E5': { date: '2026-11-04T23:14:51Z', note: "Plus de « milieu » : « Intercale entre les deux nombres le nombre qui a un chiffre de plus après la virgule et qui se termine par 5 » (réponse unique)" },
  '6e-N3-P6-E3': { date: '2026-11-04T23:14:51Z', note: "« Complète avec <, > ou = » dans une case (1,5 m et 145 cm, 0,8 kg et 790 g, 2,05 € et 2 € 50 c, 3,2 m et 320 cm)" },
  'CE2-N1-P4-E2': { date: '2026-11-04T23:14:51Z', note: "Graduation de 100 en 100 (au lieu de 50 en 50), comme l'exercice précédent : placer 7 400, 7 700 et 7 900" },
  'CE2-N3-P1-E2': { date: '2026-11-07T12:08:02Z', note: "Bêta : à l'écran, la case de réponse reste sur la ligne de sa phrase (sa largeur est comptée dans la largeur de l'exercice)" },
  'CE2-N3-P1-E3': { date: '2026-11-04T23:14:51Z', note: "À l'écran, l'élève pose lui-même chaque addition écrite en ligne, dans une grille vide plus large que nécessaire (deux colonnes en plus) ; les cases en trop doivent rester vides (une case remplie à tort est comptée fausse)" },
  'CE2-N3-P1-E7': { date: '2026-11-04T23:14:51Z', note: "À l'écran, les calculs restent sur deux colonnes comme sur le papier (tous les exercices pleine largeur)" },
  'CE2-N3-P2-E2': { date: '2026-11-04T23:14:51Z', note: "Corrigé : le « 1 » et le « +1 » de la compensation ne décalent plus les chiffres, les colonnes restent alignées" },
  'CE2-N3-P2-E4': { date: '2026-11-04T23:14:51Z', note: "Corrigé : les deux soustractions (compensation et cassage) alignées par le bas, résultats à la même hauteur ; chiffres alignés en colonnes" },
  'CE2-N3-P2-E5': { date: '2026-11-04T23:14:51Z', note: "Corrigé : les deux soustractions (compensation et cassage) alignées par le bas, résultats à la même hauteur ; chiffres alignés en colonnes" },
  'CE2-N3-P2-E6': { date: '2026-11-04T23:14:51Z', note: "À l'écran, les calculs restent sur deux colonnes comme sur le papier" },
  'CE2-N3-P2-E7': { date: '2026-11-04T23:14:51Z', note: "À l'écran, les calculs restent sur deux colonnes comme sur le papier" },
  'CE2-N3-P3-E1': { date: '2026-11-04T23:14:51Z', note: "À l'écran, les calculs restent sur deux colonnes comme sur le papier" },
  'CE2-N3-P3-E2': { date: '2026-11-04T23:14:51Z', note: "Consigne : « … puis pose l'autre dans ton cahier » ; le corrigé montre les quatre calculs posés (2 487 + 3 659, 4 532 − 1 875, 6 023 − 1 847, 3 768 + 1 459)" },
  'CE2-N3-P3-E3': { date: '2026-11-04T23:14:51Z', note: "À l'écran, les calculs restent sur deux colonnes comme sur le papier" },
  'CE2-N3-P3-E6': { date: '2026-11-04T23:14:51Z', note: "À l'écran, les calculs restent sur deux colonnes comme sur le papier" },
  // Version 1311 (03/11).
  '5e-G2-P1-E3': { date: '2026-11-03T08:01:01Z', note: "Quatrième figure remplacée : deux sommets différents, avec des côtés dans le prolongement l'un de l'autre (non adjacents : pas le même sommet)" },
  '5e-G2-P2-E6': { date: '2026-11-03T08:01:01Z', note: "Construction aux instruments refaite dans l'ordre demandé : droite tracée à la règle sans aucun point, point O placé sur la droite, angle de 35° au rapporteur, puis la sécante tracée ; les quatre angles marqués ensuite" },
  // Version 1309 (03/11).
  '5e-G2-P2-E5': { date: '2026-11-03T07:40:36Z', note: "À l'écran, les choix se cliquent de nouveau (la figure du corrigé empêchait la version écran ; elle reste sur le papier)" },
  '5e-G2-P5-E6': { date: '2026-11-03T07:40:36Z', note: "Corrigé rédigé avec les propriétés : données, « Or, dans un triangle la somme des angles est égale à 180° ; et dans un triangle isocèle, les angles à la base ont la même mesure », puis BAC + 2 × ACB = 180°, une étape par ligne, ACB = 66°" },
  '5e-G2-P5-E7': { date: '2026-11-03T07:40:36Z', note: "Valeurs changées : 36°, le deuxième angle triple (108°), le troisième 36° : le triangle est isocèle ; plus de « obtusangle »" },
  '5e-G2-P6-E3': { date: '2026-11-03T07:40:36Z', note: "Corrigé : dessin à main levée de l'angle droit partagé en â et 2â, puis â + 2â = 90°, 3 × â = 90°, â = 30°, 2â = 60°" },
  // Version 1307 (02/11).
  '5e-G2-P1-E1': { date: '2026-11-02T23:13:53Z', note: "Consigne : « Les angles â et b̂ sont supplémentaires. Calcule b̂. » ; chaque question « â = 35° : b̂ = … », corrigé « b̂ = 180° − 35° = 145° » ; chapeaux sur les angles" },
  '5e-G2-P1-E5': { date: '2026-11-02T23:13:53Z', note: "L'angle à calculer est nommé (AOx, point x sur la demi-droite) ; corrigé en quatre lignes : A, O, B alignés donc AOB = 180° ; AOx = AOB − xOB ; AOx = 180° − 53° ; AOx = 127°" },
  '5e-G2-P2-E2': { date: '2026-11-02T23:13:53Z', note: "Chapeaux sur les angles â, b̂, ĉ, dans la figure et dans les réponses" },
  '5e-G2-P2-E3': { date: '2026-11-02T23:13:53Z', note: "Exercice remplacé : (AB) et (CD) se coupent en O, AOC est le triple de AOD ; calculer les quatre angles (4 × AOD = 180°, AOD = 45°, AOC = 135°, puis les opposés par le sommet), figure avec les deux angles marqués" },
  '5e-G2-P3-E5': { date: '2026-11-02T23:13:53Z', note: "Corrigé : une figure avec deux droites non parallèles et une sécante, deux angles alternes-internes en rouge (118° et 132°) et deux angles correspondants en vert (62° et 48°), pour voir qu'ils n'ont pas la même mesure" },
  '5e-G2-P4-E2': { date: '2026-11-02T23:13:53Z', note: "Figures à main levée (traits tremblés), sans les lettres a et b ; consigne « Figures à main levée : les droites sont-elles parallèles ? »" },
  '5e-G2-P4-E4': { date: '2026-11-02T23:13:53Z', note: "Corrigé rédigé avec la propriété : angles correspondants et (d1) // (d2), « si deux droites parallèles sont coupées par une sécante, alors deux angles correspondants ont la même mesure », donc x = 110° ; puis x et y supplémentaires, y = 70°" },
  '5e-G2-P5-E2': { date: '2026-11-02T23:13:53Z', note: "Corrigé détaillé : somme des angles d'un triangle = 180°, BAC + ABC + ACB = 180°, ACB = 180° − BAC − ABC = 180° − 57° − 34° = 89°" },
  // Version 1274 (01/11).
  '6e-N3-P1-E6': { date: '2026-11-01T23:08:17Z', note: "Corrigé : « 400 centièmes + 50 centièmes = 450 centièmes », chaque terme avec son unité, une étape par ligne ; tableau de numération (unités, dixièmes, centièmes) pour lire le nombre de centièmes" },
  '6e-N3-P2-E1': { date: '2026-11-01T23:08:17Z', note: "Ajout de « le nombre de dixièmes / de centièmes / de dizaines » à côté de « le chiffre des… »" },
  '6e-N3-P3-E5': { date: '2026-11-01T23:08:17Z', note: "Corrigé : la demi-droite graduée tracée (de 0 à 0,7, en centièmes), avec les points A(0,4), B(0,45), C(0,5), D(0,62) ; exercice et voisin en pleine largeur" },
  // Version 1269 (01/11).
  '6e-G1-P4-E5': { date: '2026-11-01T17:20:27Z', note: "Bouton « Voir la construction aux instruments » : la construction rejouée avec la règle graduée et le compas du tableau (lecteur du site) ; sur le papier, la figure avec ses arcs" },
  // Version 1267 (01/11).
  '6e-G1-P1-E5': { date: '2026-11-01T16:51:35Z', note: "Corrigé : un schéma pour chaque cas (A, B, C alignés, longueurs indiquées)" },
  '6e-G1-P2-E5': { date: '2026-11-01T16:51:35Z', note: "La phrase se termine par des pointillés ; les propositions sont à part, en dessous, alignées" },
  '6e-G1-P2-E6': { date: '2026-11-01T16:51:35Z', note: "Milieu placé à la règle graduée (7 ÷ 2 = 3,5 cm), sans la construction au compas, vue plus tard avec la médiatrice" },
  '6e-G1-P3-E1': { date: '2026-11-01T16:51:35Z', note: "Ajout de « le rayon / un rayon », « le diamètre / un diamètre » (la longueur OA, le segment [OC]…)" },
  '6e-G1-P3-E4': { date: '2026-11-01T16:51:35Z', note: "Nom du point A écarté de la croix (même règle pour tous les points du chapitre)" },
  '6e-G1-P3-E5': { date: '2026-11-01T16:51:35Z', note: "Figure du corrigé élargie : le cercle de centre B n'est plus coupé" },
  '6e-G1-P4-E1': { date: '2026-11-01T16:51:35Z', note: "« rayon 5 côtés de carreau » (un carreau n'est pas une longueur)" },
  '6e-G1-P5-E1': { date: '2026-11-01T16:51:35Z', note: "« 1 côté de carreau représente 1 cm »" },
  '6e-G1-P5-E5': { date: '2026-11-01T16:51:35Z', note: "Corrigé : la figure construite (deux cercles, C et D, triangles ABC et ABD)" },
  '6e-G1-P1-E3': { date: '2026-11-01T16:30:50Z', note: "Doubles codages inclinés comme les simples ; consigne : « I est le milieu du segment [AB] et AB = 6 cm » (le seul trait sur [IB] ne le montrait pas)" },
  '6e-G1-P1-E4': { date: '2026-11-01T16:30:50Z', note: "« vrai · faux » dans une colonne à part, plus loin de l'énoncé, alignés (automatique pour toutes les listes de propositions à entourer)" },
  // Version 1263 (01/11).
  '6e-G2-P8-E4': { date: '2026-11-01T16:05:16Z', note: "Figure du corrigé sans « 5 cm » sur [CB] (longueur cherchée) ; rédaction : C appartient à la médiatrice de [AB] et CA = 5 cm. Or, tout point de la médiatrice d'un segment est à égale distance des extrémités de ce segment. Donc CB = CA = 5 cm." },
  // Version 1262 (01/11).
  '6e-N2-P4-E6': { date: '2026-11-01T15:47:51Z', note: "« 7/8 … 1 » à compléter par <, > ou = dans une case ; à l'écran, un clic passe de < à >, puis =" },
  '6e-N2-P4-E7': { date: '2026-11-01T15:47:51Z', note: "Corrigé avec le tracé : la demi-droite graduée sur papier quadrillé (unité 6 carreaux), les points 1/2, 7/6, 5/3 placés" },
  '6e-N2-P6-E6': { date: '2026-11-01T15:47:51Z', note: "Corrigé : 1/5 × 240 = 240/5 = 48, puis 2/5 × 240 = (2 × 240)/5 = 480/5 = 96, fractions écrites en étage" },
  '6e-N2-P7-E6': { date: '2026-11-01T15:56:42Z', note: "Corrigé en colonne avec une lettre : R = 25/100 × 40, R = (25 × 40)/100, R = 1000/100, R = 10 encadré ; aucune ligne ne commence par =, calcul jamais coupé" },
  '6e-N2-P7-E7': { date: '2026-11-01T15:56:42Z', note: "Corrigé en colonne avec une lettre : N = 45/100 × 600, N = 45 × 600/100, N = 45 × 6, N = 270 encadré" },
  // Version 1259 (01/11).
  '6e-G2-P1-E4': { date: '2026-11-01T13:25:00Z', note: "Phrase précisée : « Deux droites parallèles et distinctes n'ont aucun point commun » (deux droites confondues sont aussi parallèles et ont une infinité de points communs)" },
  '6e-G2-P3-E3': { date: '2026-11-01T13:25:00Z', note: "Figure du corrigé : (d), (d') et la parallèle passant par C restent tracées en entier comme traits de construction ; B n'est plus coupé" },
  '6e-G2-P4-E2': { date: '2026-11-01T13:25:00Z', note: "À l'écran : les trois quadrillages côte à côte, l'aide « touche deux points… » écrite une seule fois sous l'ensemble" },
  '6e-G2-P4-E5': { date: '2026-11-01T13:25:00Z', note: "Un cadre sur la feuille pour faire le tracé (plus besoin du cahier)" },
  '6e-G2-P5-E1': { date: '2026-11-01T13:25:00Z', note: "On complète (d1) … (d2) dans une case, sans écrire de phrase ; à l'écran, un clic passe de ⊥ à //, puis vide" },
  '6e-G2-P5-E2': { date: '2026-11-01T13:25:00Z', note: "À l'écran : les trois quadrillages côte à côte, l'aide écrite une seule fois sous l'ensemble" },
  '6e-G2-P6-E1': { date: '2026-11-01T13:25:00Z', note: "« Complète avec ⊥ ou // » dans une case ; à l'écran, bascule au clic" },
  '6e-G2-P6-E2': { date: '2026-11-01T13:25:00Z', note: "« Donc : (d3) … (d2) » à compléter dans une case ; à l'écran, bascule au clic" },
  '6e-G2-P6-E4': { date: '2026-11-01T13:25:00Z', note: "Figure ajoutée au corrigé : (d), (d') perpendiculaire passant par A, (d'') perpendiculaire à (d') passant par A, angles droits codés" },
  '6e-G2-P7-E1': { date: '2026-11-01T13:25:00Z', note: "« La médiatrice de [AB] est … » à compléter ; à l'écran, un clic dans la case passe de (d1) à (d2), puis (d3)" },
  // Version 1257 (01/11).
  '6e-G2-P3-E1': { date: '2026-11-01T12:59:57Z', note: "Nom (d) écrit à côté de la droite sur les trois figures ; dans la figure 3, la droite (d) est d'un seul tenant (elle était brisée en F)" },
  // Version 1256 (01/11) : retour bêta.
  '6e-G2-P1-E1': { date: '2026-11-01T12:50:58Z', note: "Les figures sur une ligne, la lettre dessous ; les choix en tableau en dessous, une ligne par figure (sous chaque petite figure, les mots empilés débordaient sur la voisine). Même présentation pour les autres exercices « une figure, un choix » du chapitre" },
  // Version 1252 (01/11).
  '6e-G2-P1-E2': { date: '2026-11-01T11:15:41Z', note: "Propositions en tableau, alignées en colonnes et à distance des noms des droites" },
  '6e-G2-P1-E5': { date: '2026-11-01T11:15:41Z', note: "Étiquette A dans le cadre. On complète avec les symboles : (AB) … (CD) avec ⊥ ou // ; à l'écran, chaque clic dans la case passe de ⊥ à //, puis vide" },
  '6e-G2-P2-E1': { date: '2026-11-01T12:42:58Z', note: "Propositions sur leur propre ligne, sous chaque question et en retrait (en tableau, elles s'écrasaient à l'impression en demi-largeur) ; étiquette D décollée du point" },
  '6e-G2-P2-E4': { date: '2026-11-01T11:15:41Z', note: "À l'écran, chaque droite tracée reçoit son nom : on choisit (AB), (d) ou (d') puis on trace (le nom suivant est proposé tout seul) ; la vérification contrôle aussi les noms" },
  // Version 1249 (01/11).
  '6e-N1-P3-E3': { date: '2026-11-01T09:31:51Z', note: "Les étiquettes 40 000 000 et 41 000 000 ne sont plus coupées : la droite graduée laisse la place des nombres aux deux bouts (vaut pour toutes les droites graduées du site)" },
  '6e-N1-P3-E7': { date: '2026-11-01T09:31:51Z', note: "Corrigé : le signe > seulement entre les nombres (58 989 749 > 48 619 695 > 11 822 592 > 8 921 981), puis les pays séparés par « ; » : Italie ; Espagne ; Belgique ; Suisse. Arrondis sur une ligne chacun" },
  '6e-N1-P4-E4': { date: '2026-11-01T09:31:51Z', note: "Propositions en tableau, à distance du calcul, alignées en colonnes" },
  '6e-N1-P4-E6': { date: '2026-11-01T09:31:51Z', note: "Corrigé raisonné sur la multiplication posée : 4 × 7 = 28 (on retient 2) ; on lit 15 au lieu de 12, donc 3 de retenue ; 4 × ■ + 2 = 30, 4 × ■ = 28, ■ = 7. La division 1 508 ÷ 4 = 377 reste en « autre méthode »" },
  '6e-N1-P5-E4': { date: '2026-11-07T12:08:02Z', note: "Bêta : la consigne dit la méthode (« ajouter 99, c'est ajouter 100 puis enlever 1 ; enlever 98, c'est enlever 100 puis ajouter 2 ») et les quatre calculs l'utilisent : 1 000 − 457 remplacé par 634 − 199" },
  // Version 1246 (31/10, fin d'après-midi).
  '6e-N1-P2-E2': { date: '2026-10-31T16:08:00Z', note: "La décomposition s'écrit avec les puissances de 10, comme dans le reste de la planche : 5 040 008 = 5 × 1 000 000 + 4 × 10 000 + 8 ; 12 000 300 = 1 × 10 000 000 + 2 × 1 000 000 + 3 × 100. Place agrandie sur papier et à l'écran (case à la longueur de la décomposition, « * » ou « x » acceptés pour ×)" },
  '6e-N1-P3-E6': { date: '2026-11-07T12:08:02Z', note: "Bêta : à l'écran, les six encadrements passent sur une seule colonne quand ils ne tiennent pas sur deux (plus de chevauchement) ; l'exercice se fait à l'écran (cases à remplir, « Vérifier »)" },
  // Version 1244 (31/10) : remarques du 31/10 sur 6e-N1, CP-N3, CE2-N2.
  'CP-N3-P1-E2': { date: '2026-10-31T12:50:00Z', note: "Les cubes sont dessinés en barres de dix bien droites, les unités en colonnes alignées à côté, le tout posé sur la même ligne de base (avant : cubes en vrac). À l'écran, les cases gardent la taille de la réponse" },
  '6e-N1-P1-E2': { date: '2026-10-31T15:58:00Z', note: "À l'écran, la saisie n'est plus coupée à 24 caractères : on peut écrire toute la réponse, même longue (deux milliards cinq-cents millions). Sur papier, les pointillés partent sous chaque nombre et vont jusqu'au bord droit. À l'écran, la case est à la longueur du nombre en lettres attendu (jusqu'à toute la largeur). Orthographe : « million » et « milliard » sont des noms, sans trait d'union (trois millions quatre-cents) ; les deux écritures sont acceptées à l'écran. Même correction dans tout le chapitre, le cours de 6e et le cours de CM2 sur les grands nombres" },
  '6e-N1-P4-E2': { date: '2026-10-31T12:50:00Z', note: "Sur papier, une case vide dans chaque colonne pour les produits intermédiaires et le résultat. À l'écran, les produits intermédiaires ne sont plus écrits d'avance : ce sont des cases à remplir, ligne par ligne (la touche OK suit l'ordre du calcul) ; les trois opérations sont séparées dans des cadres bien espacés. Même chose pour CM1-N3 (253 × 24 et 312 × 15)" },
  '6e-N1-P6-E3': { date: '2026-10-31T12:50:00Z', note: "Grille plus haute (11 carreaux) : toute la division, soustractions comprises, tient dedans" },
  'CE2-N2-P2-E1': { date: '2026-10-31T12:50:00Z', note: "Faisable à l'écran : une case par nombre (… × … = …) ; les deux facteurs sont acceptés dans un ordre ou dans l'autre (3 × 6 ou 6 × 3)" },
  // Build 1044 : grands nombres à l'écran. Clés mises à jour le 31/10/2026 (planches de 6e-N1 réorganisées par thème :
  // P1-E2 → P1-E4, P1-E3 → P2-E2, P1-E4 → P3-E4 ; P1-E5 et P1-E6, doublons de la planche 3, retirés).
  '6e-N1-P1-E1': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E4': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  // Version 1242 (31/10) : remarques du matin sur 6e-N1 (anciennes clés P1-E3 et P1-E4).
  '6e-N1-P3-E4': { date: '2026-10-31T10:54:00Z', note: "Exercice déplacé en planche 3 (Comparer). À l'écran, on clique dans la case : 1 clic <, 2 clics >, 3 clics =, un 4e clic vide la case (sans clavier) ; vaut pour toutes les cases de signe du site" },
  // Build 1182 : CP-N1, exercices faits à l'écran ; corrigés des choix à entourer ; choix sous les petites figures (bêta).
  'CP-N1-P1-E4': { date: '2026-10-27T18:33:51Z', note: "À l'écran : on touche le cadre pour dessiner un rond, on touche un rond pour l'effacer (bouton « Tout effacer ») ; c'est juste quand il y a le bon nombre de ronds" },
  'CP-N1-P1-E5': { date: '2026-10-27T19:10:49Z', note: "À l'écran, la case touchée se colorie en entier (plus de disque) ; le corrigé montre aussi des cases coloriées. Les boîtes « Dessine des jetons » (N2, N3) gardent des jetons" },
  'CP-N1-P3-E3': { date: '2026-10-27T18:33:51Z', note: "Corrigé : les deux nombres restent visibles, le bon est entouré. Corrigé pour tous les exercices « Entoure » des manuels (tous niveaux)" },
  'CP-N1-P3-E4': { date: '2026-10-27T18:33:51Z', note: "À l'écran : un cadre pour les billes de Léo, un pour celles de Zoé (on touche pour dessiner), puis on touche Léo ou Zoé. Consigne : « Dessine les billes de chacun, puis entoure qui en a le plus »" },
  'CP-N1-P3-E5': { date: '2026-10-27T18:33:51Z', note: "Corrigé : les deux nombres restent visibles, le bon est entouré (comme l'exercice 3)" },
  'CP-N1-P3-E6': { date: '2026-10-27T18:33:51Z', note: "À l'écran : on touche le cadre pour dessiner un rond, on touche un rond pour l'effacer (bouton « Tout effacer ») ; c'est juste quand il y a le bon nombre de ronds" },
  // Build 1183 : CP-N2, outils à l'écran (jetons bicolores, boîte à compléter, mains aux doigts mobiles).
  'CP-N2-P1-E6': { date: '2026-10-27T19:10:49Z', note: "À l'écran, on touche un jeton : rouge, puis bleu, puis blanc. Pour que la réponse puisse être vérifiée, les deux façons sont imposées : 4 rouges et 3 bleus, puis 6 rouges et 1 bleu" },
  'CP-N2-P2-E1': { date: '2026-10-27T19:51:50Z', note: "Addition « 6 + … = 10 » sur sa propre ligne, sous la boîte : les termes sont alignés (sur papier et à l'écran). Exercice placé en premier ; à l'écran, on touche les cases vides pour mettre les jetons bleus" },
  'CP-N2-P2-E4': { date: '2026-10-27T19:51:50Z', note: "C'est un défi : la boîte de dix est vide, l'élève dessine tout lui-même, en rouge les 6 images qu'il a, puis en bleu celles qui manquent (à l'écran, chaque toucher : rouge, puis bleu, puis vide) ; puis il écrit combien il en manque" },
  'CP-N2-P3-E3': { date: '2026-10-27T19:51:50Z', note: "On touche maintenant directement le doigt (levé ou replié, sur toute sa hauteur) ou le pouce (couché sur la paume ou levé) pour le lever ou le replier ; c'est juste avec 3 doigts levés sur chaque main" },
  // Build 1189 : projection stable, pommes à glisser, réponses ouvertes, rangements case par case, classes dès 4 chiffres.
  'CP-N3-P1-E1': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice" },
  'CP-N2-P3-E1': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice (écrire 10 ne fait plus passer la case à la ligne)" },
  'CP-N3-P1-E6': { date: '2026-10-27T22:08:00Z', note: "À l'écran, chaque case a dès le départ la taille de la réponse attendue (avec de la marge) : elle ne grandit plus quand on écrit, rien ne bouge. La place du message « Bravo… » est aussi réservée : « Vérifier ma réponse » ne fait plus remonter l'exercice. Nouveau : à l'écran, on peut faire glisser les pommes dans un cadre « paquet de 10 » pour les compter (aide non notée ; les pommes restent dans le dessin). Valable pour tous les exercices « Compte les pommes » du CP" },
  'CP-N3-P2-E7': { date: '2026-10-27T22:08:00Z', note: "Le décalage venait du message « Bravo… » qui apparaissait sous l'exercice après « Vérifier ma réponse » et faisait remonter l'exercice : sa place est maintenant réservée, plus rien ne bouge (toutes les projections)" },
  'CE2-N1-P1-E1': { date: '2026-10-27T22:08:00Z', note: "Chaque dessin est dans une case de même hauteur, la réponse en bas : les trois lignes de réponse sont alignées" },
  'CE2-N1-P2-E8': { date: '2026-10-28T10:13:30Z', note: "Plus de point central entre les deux écritures : elles sont séparées par un grand espace, et le tableau (nombre à gauche, écritures alignées à droite) prend toute la largeur ; une écriture ne se coupe plus en fin de ligne. Vaut pour tous les choix à entourer des planches (papier, projection, écran)" },
  'CE2-N1-P3-E2': { date: '2026-10-28T10:13:30Z', note: "L'encadrement « … < 4 563 < … » ne se coupe plus : il reste d'un seul tenant (s'il manque de place, il passe en entier à la ligne suivante). Vaut pour toutes les inégalités des exercices à compléter" },
  'CE2-N1-P3-E3': { date: '2026-10-28T10:13:30Z', note: "« … < … < … < … » ne se coupe plus en fin de ligne ; la liste des nombres à ranger est espacée, sans point central. Déjà faisable à l'écran (une case par nombre)" },
  'CE2-N1-P3-E7': { date: '2026-10-28T10:13:30Z', note: "Nombre écrit sans espace (2350) : en plus du message sous l'exercice, une étiquette apparaît au bout de la ligne : « Un espace tous les trois chiffres : 2 350 »" },
  'CE2-N1-P4-E3': { date: '2026-10-27T22:08:00Z', note: "Règle rendue cohérente : à l'écran, dès 4 chiffres, un nombre doit s'écrire avec un espace tous les trois chiffres quand la réponse attendue est écrite ainsi (9 999 et 10 000 ; 9999 est refusé comme 10000). Le message sous l'exercice dit alors : « Écris les nombres avec un espace tous les trois chiffres (9 999, 10 000) ». Une année (2026) reste sans espace" },
  'CE2-N1-P4-E4': { date: '2026-10-28T10:13:30Z', note: "Sur papier comme à l'écran, les nombres sont séparés par un grand espace, sans point central (règle appliquée à toutes les planches) ; à l'écran, un seul nombre se choisit" },
  // Build 1196 (28/10, inscrit le 30/10) : planches CE2-N3 et CE2-N4 réécrites ; les numéros d'exercices ont changé.
  'CE2-N3-P1-E4': { date: '2026-10-28T23:07:36Z', note: "Maintenant les exercices 5 et 6 : deux problèmes côte à côte ; le premier garde ses trois termes (l'addition à trois termes est posée à l'exercice 4)" },
  'CE2-N3-P1-E5': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 7 : six calculs sur deux colonnes" },
  'CE2-N3-P2-E1': { date: '2026-10-28T23:07:36Z', note: "Corrigé avec les soustractions posées ; nombres de longueurs différentes (5 638 − 415, 1 249 − 37) pour vérifier l'alignement ; à l'écran, la soustraction se pose case par case" },
  'CE2-N3-P2-E3': { date: '2026-10-28T23:07:36Z', note: "En tableau : la soustraction, l'addition qui la vérifie (à compléter), puis « juste » ou « fausse » à entourer" },
  'CE2-N3-P3-E4': { date: '2026-10-28T23:07:36Z', note: "Deux problèmes côte à côte (Mia, le libraire)" },
  'CE2-N4-P1-E4': { date: '2026-10-28T23:07:36Z', note: "À l'écran, la fraction se complète dans deux cases (numérateur et dénominateur)" },
  'CE2-N4-P2-E1': { date: '2026-10-28T23:07:36Z', note: "Quatre égalités sur deux colonnes" },
  'CE2-N4-P2-E2': { date: '2026-10-28T23:07:36Z', note: "Huit égalités sur deux colonnes" },
  'CE2-N4-P2-E3': { date: '2026-10-28T23:07:36Z', note: "Six égalités en deux tableaux côte à côte (égalité, puis « vraie fausse »), plus espacés" },
  'CE2-N4-P2-E4': { date: '2026-10-28T23:07:36Z', note: "« identique » au lieu de « pareille » ; deux problèmes côte à côte (la tarte, les rubans)" },
  'CE2-N4-P2-E5': { date: '2026-10-28T23:07:36Z', note: "Maintenant l'exercice 6 : huit égalités sur deux colonnes" },
  // Build 1223 (30/10) : remarques du 30/10 (CE2-N3, CE2-N4, 5e-N7).
  'CE2-N4-P1-E1': { date: '2026-10-30T19:40:00Z', note: "Huit figures plus petites sur quatre colonnes, la fraction toujours sous sa figure ; à l'écran, chaque fraction s'écrit dans ses deux cases" },
  'CE2-N4-P1-E5': { date: '2026-10-30T19:40:00Z', note: "Les fractions des choix s'affichent bien à l'écran (depuis le 28/10) ; deux exemples de plus, sur deux colonnes" },
  '5e-N7-P1-E1': { date: '2026-10-30T19:40:00Z', note: "À l'écran, « 6 × 6 » est accepté, tapé avec la touche × du clavier, avec * ou avec x (la réponse attendue restait écrite en LaTeX) ; vaut pour toutes les planches" },
  '5e-N7-P1-E3': { date: '2026-10-30T20:38:00Z', note: "À l'écran, la base et l'exposant s'écrivent chacun dans leur case, ajustée au chiffre, dans la police et à la taille de l'énoncé, sur la même ligne ; la case de l'exposant est petite et surélevée, collée à la base (comme une vraie puissance) ; une 4e ligne (7 × 7 × 7) ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P1-E4': { date: '2026-10-30T19:40:00Z', note: "Vrai ou faux en tableau : l'égalité à gauche, « vrai faux » alignés à droite ; une 4e égalité (1³ = 1). Sur papier, les exposants s'impriment bien (6² et non « 6^2 », défaut corrigé pour toutes les planches)" },
  '5e-N7-P2-E1': { date: '2026-10-30T20:38:00Z', note: "À l'écran, la base et l'exposant s'écrivent chacun dans leur case (6 puis 2) : rien n'est imprimé d'avance ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P2-E2': { date: '2026-10-30T20:38:00Z', note: "À l'écran, la base et l'exposant s'écrivent chacun dans leur case (3 puis 3) : rien n'est imprimé d'avance ; une 4e ligne (8 = 2³) ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P2-E3': { date: '2026-10-30T20:38:00Z', note: "Consigne précisée : « sous la forme d'un carré, puis sous la forme d'un cube » (64 = 8² = 4³), pour qu'il n'y ait qu'une réponse juste par case ; à l'écran, les bases et les exposants s'écrivent dans des cases, rien n'est imprimé d'avance ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  '5e-N7-P2-E4': { date: '2026-10-30T20:38:00Z', note: "À l'écran, les bases et les exposants s'écrivent dans des cases, rien n'est imprimé d'avance (7² < 50 < 8²) ; sur la feuille, la place de l'exposant est laissée en blanc, sans pointillés" },
  // Version 1232 (30/10).
  'CE2-N2-P3-E4': { date: '2026-10-30T23:10:00Z', note: "Énoncé : « Les produits suivants sont-ils égaux à 60 ? » ; « oui non » en tableau : les produits à gauche, « oui » et « non » alignés dans leurs colonnes, à distance de la question" },
  // Build 1230 (30/10) : remarques du soir sur 5e-N7, planches 3 et 4.
  '5e-N7-P3-E2': { date: '2026-10-30T21:40:00Z', note: "Corrigé réécrit : plus de titre « B : » ni de phrase ; la première ligne est le calcul demandé (B = 4 + 3 × 2³), puis B = 4 + 3 × 8, B = 4 + 24, B = 28 encadré" },
  '5e-N7-P3-E4': { date: '2026-10-30T21:40:00Z', note: "Corrigé : chaque calcul commence par le calcul demandé (C = (5 + 4)², D = 5² + 4²), résultats encadrés ; la phrase réponse reste, la question en demande une" },
  '5e-N7-P4-E1': { date: '2026-10-30T22:40:00Z', note: "Six questions sur deux colonnes, 3 et 3 (trois aires de carrés, trois volumes de cubes), formulées plus court pour tenir sur une ligne ; dans le Manuel aussi, les listes des exercices pleine largeur sont sur deux colonnes, comme sur la feuille" },
  '5e-N7-P4-E2': { date: '2026-10-30T21:40:00Z', note: "Exercice remplacé : « Un carré a un périmètre de 36 m. Calcule son aire. » La réponse vient de deux calculs (36 ÷ 4 = 9, puis 9² = 81) ; retrouver un côté à partir de l'aire (racine carrée) est au programme de 4e" },
  '6e-N2-P3-E1': { date: '2026-11-07T12:08:02Z', note: "Bêta : « Autre version » et fiche de répétition : trois quotients avec d'autres nombres, fraction déjà simplifiée (réponse unique), corrigé recalculé" },
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
  // Demandé le 07/11/2026 : « Dans les commentaires, ajouter une case à cocher "Ajouter autre version" "Ajouter fiche de
  // répétition" » : l'exercice doit pouvoir être refait avec d'autres nombres (planches-variantes.js : bouton « Autre version »,
  // et plusieurs versions imprimées sur une fiche de répétition).
  'Ajouter autre version',
  'Ajouter fiche de répétition',
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
// Une remarque de bêta-testeur antérieure à une correction publiée (RELECTURE_CHGT) est traitée d'office (demandé le
// 01/11/2026 : « Cet exercice est validé ! Pourquoi est-il en retour bêta ? »).
const rlCorrigeApres = r => { const ch = RELECTURE_CHGT[r.cle]; return !!ch && Date.parse(ch.date) > Date.parse(r.updated_at); };
const rlATraiter = r => r.statut === 'com' && !r.traite && !rlCorrigeApres(r);
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
  const dejaCorr = ((rl.retours && rl.retours.get(cle)) || []).filter(r => r.statut === 'com' && !r.traite && rlCorrigeApres(r)).length;
  const n = Math.max(0, (e.remarques_ouvertes || 0) - dejaCorr) + (e.statut_admin === 'com' ? 1 : 0);
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

/* ---------- Compteurs de relecture dans la progression d'un niveau (administrateur) ----------
   Demandé le 31/10/2026 : « Dans les progressions, peux-tu écrire pour admin, le nombre d'exercices validés, non examinés et
   commentés sous chaque chapitre ? Comme ça je peux avancer plus vite. » Sous chaque carte (vue Par thème) et chaque ligne
   (Frise de l'année) : validés, commentés, non examinés (et changés à revoir), d'après le statut de l'administrateur. */
function rlCompteChapitre(lvl, c){
  const n = { ok: 0, com: 0, non: 0, chgt: 0, total: 0 };
  plDe(lvl, c.t).forEach((p, i) => p.exos.forEach((x, k) => {
    const cle = rlCle(lvl, c, i, k); n.total++;
    if(rlChgt(cle)) n.chgt++;
    else { const st = (rl.lignes.get(cle) || {}).statut; n[st === 'ok' || st === 'com' ? st : 'non']++; }
  }));
  return n;
}
function rlCompteHtml(n){
  const b = (cl, ic, nb, un, plu) => nb ? `<span class="rl-pc rl-pc-${cl}"><span class="gicon">${ic}</span>${nb} ${nb > 1 ? plu : un}</span>` : '';
  if(n.ok === n.total) return `<span class="rl-pc rl-pc-fini"><span class="gicon">verified</span>${n.total} validés : terminé</span>`;
  return b('ok', 'verified', n.ok, 'validé', 'validés') + b('com', 'rate_review', n.com, 'commenté', 'commentés') + b('chgt', 'published_with_changes', n.chgt, 'à revoir', 'à revoir')
    + b('non', 'radio_button_unchecked', n.non, 'non examiné', 'non examinés');
}
async function rlProgression(lvl){
  if(!rlAdmin()) return;
  await rlCharger();
  document.querySelectorAll('#niveau-theme .chap-card[data-t], #niveau-frise .tl-item[data-t]').forEach(el => {
    const c = { code: el.dataset.code, t: el.dataset.t };
    let z = el.querySelector('.rl-prog');
    const n = rlCompteChapitre(lvl, c);
    if(!n.total){ if(z) z.remove(); return; }
    if(!z){ z = document.createElement('div'); z.className = 'rl-prog'; el.appendChild(z); }
    z.innerHTML = rlCompteHtml(n);
  });
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
  return `<div class="rl-betas">${com.map(r => `<div class="rl-beta${r.traite || rlCorrigeApres(r) ? ' traite' : ''}"><span class="gicon">group</span> <b>${rlEsc(rlNom(r))}</b>
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
