/* =====================================================================
   frise-histoire.js -- L'Atelier › Histoire des maths : une frise chronologique verticale des grandes avancées
   mathématiques, avec des vignettes de niveau (CE2… 3e) qui montrent quand on étudie la notion et ouvrent le
   chapitre. Demandé : « faire dans le menu atelier, un sous-menu Histoire qui montre une frise chronologique
   (horizontale ou verticale) avec les différentes avancées mathématiques. On pourra mettre des petites vignettes
   CE2, ..., 3 qui permettent aussi de visualiser quand on étudie la notion. »
   Vue #view-frise (index.html), route « histoire-maths » (router.js) ; hmRendre() construit la page.
   Les titres de chapitres doivent être ceux de CHCE2/CHCM1/CHCM2/CH6/CH5/CH4/CH3 (vérifiés au test).
   ===================================================================== */
const HM_NIV = { ce2: { lib: 'CE2', coul: '#7CB342', liste: () => typeof CHCE2 !== 'undefined' ? CHCE2 : [] },
  cm1: { lib: 'CM1', coul: '#2E7D32', liste: () => typeof CHCM1 !== 'undefined' ? CHCM1 : [] }, cm2: { lib: 'CM2', coul: '#00796B', liste: () => typeof CHCM2 !== 'undefined' ? CHCM2 : [] },
  '6e': { lib: '6e', coul: '#1565C0', liste: () => typeof CH6 !== 'undefined' ? CH6 : [] }, '5e': { lib: '5e', coul: '#C2410C', liste: () => typeof CH5 !== 'undefined' ? CH5 : [] },
  '4e': { lib: '4e', coul: '#00838F', liste: () => typeof CH4 !== 'undefined' ? CH4 : [] }, '3e': { lib: '3e', coul: '#7B1FA2', liste: () => typeof CH3 !== 'undefined' ? CH3 : [] } };
const HM_EPOQUES = [['prehistoire', 'Préhistoire et premières civilisations'], ['antiquite', 'Antiquité'], ['moyenage', 'Du Moyen Âge à l\'Islam médiéval'], ['renaissance', 'Renaissance'], ['modernes', 'Temps modernes'], ['contemporain', 'Époque contemporaine']];
// [époque, date affichée, emoji, titre, texte, [[niveau, titre du chapitre], …], lieu (HM_LIEUX), lieu de départ éventuel (flèche sur la carte)]
const HM_EVTS = [
  ['prehistoire', 'vers −20 000', '🦴', 'Le bâton d\'Ishango', 'Retrouvé au Congo, cet os porte des encoches groupées : l\'un des plus anciens objets qui semblent servir à compter.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999']], 'ishango'],
  ['prehistoire', 'vers −3300', '🏺', 'Les premiers nombres écrits', 'En Mésopotamie, des jetons d\'argile puis des signes sur des tablettes servent à tenir les comptes : l\'écriture des nombres naît avec la comptabilité.', [['cm1', 'Nombres entiers jusqu\'à 9 999'], ['cm2', 'Grands nombres jusqu\'à 999 999 999']], 'uruk'],
  ['prehistoire', 'vers −2560', '🧱', 'Les pyramides et la coudée royale', 'Pour bâtir la pyramide de Khéops, à Gizeh, les Égyptiens mesurent tous avec la même unité, la coudée royale (environ 52 cm) : chaque côté de la base mesure 440 coudées.', [['ce2', 'Les longueurs'], ['cm1', 'Longueurs, masses, contenances'], ['cm2', 'Longueurs, masses, contenances']], 'gizeh'],
  ['prehistoire', 'vers −2000', '🕰️', 'Babylone compte par soixantaines', 'Les Babyloniens écrivent les nombres en base 60. Héritage : 60 minutes dans une heure, 60 secondes dans une minute, 360 degrés dans un tour.', [['ce2', 'L\'heure et les durées'], ['cm1', 'Heures et durées'], ['cm2', 'Angles'], ['6e', 'Heures et durée'], ['6e', 'Angles et rapporteur']], 'babylone'],
  ['prehistoire', 'vers −1850', '🔻', 'Le papyrus de Moscou', 'Ce papyrus égyptien calcule le volume d\'une pyramide dont on a coupé la pointe : un calcul de volume vieux de près de 4 000 ans.', [['6e', 'Solides et volumes'], ['4e', 'Espace']], 'thebes'],
  ['prehistoire', 'vers −1800', '📐', 'La diagonale du carré', 'Une tablette babylonienne (YBC 7289) donne la longueur de la diagonale d\'un carré avec une précision étonnante : on connaît déjà la relation de Pythagore, plus de mille ans avant lui.', [['4e', 'Théorème de Pythagore']], 'babylone'],
  ['prehistoire', 'vers −1800', '✖️', 'Les tables de multiplication des scribes', 'À Nippur, en Mésopotamie, les élèves scribes recopient sur des tablettes d\'argile des tables de multiplication, qu\'ils apprennent par cœur.', [['ce2', 'Tables d\'addition et de multiplication'], ['cm1', 'Opérations sur les nombres entiers']], 'nippur'],
  ['prehistoire', 'vers −1650', '📜', 'Le papyrus Rhind', 'Le scribe égyptien Ahmès recopie 84 problèmes : partages, fractions, aires de champs, volumes de greniers. Les Égyptiens multiplient en doublant et en additionnant.', [['cm1', 'Fractions'], ['cm2', 'Multiplication'], ['6e', 'Fractions : nombres et partage']], 'thebes'],
  ['antiquite', 'vers −600', '🔺', 'Thalès', 'Le Grec Thalès aurait mesuré la hauteur d\'une pyramide grâce aux ombres et aux droites parallèles.', [['4e', 'Triangles et parallèles'], ['3e', 'Théorème de Thalès']], 'milet'],
  ['antiquite', 'vers −530', '🎵', 'Pythagore et son école', 'Né sur l\'île grecque de Samos, Pythagore part fonder son école à Crotone, une cité grecque du sud de l\'Italie. Pour les pythagoriciens, « tout est nombre » : ils étudient les nombres pairs et impairs, les accords de la musique et le célèbre théorème du triangle rectangle.', [['4e', 'Théorème de Pythagore']], 'crotone', 'samos'],
  ['antiquite', 'vers −300', '📚', 'Les Éléments d\'Euclide', 'À Alexandrie, Euclide rassemble la géométrie en 13 livres : définitions, propriétés, démonstrations. Il prouve aussi qu\'il existe une infinité de nombres premiers. Ce livre a servi de manuel pendant plus de 2 000 ans.', [['6e', 'Droites parallèles et perpendiculaires'], ['6e', 'Propriétés des triangles'], ['5e', 'Angles et parallélisme'], ['3e', 'Arithmétique']], 'alexandrie'],
  ['antiquite', 'vers −250', '⭕', 'Archimède et le nombre π', 'Archimède encadre le périmètre du cercle avec des polygones de 96 côtés : π est entre 3,140 et 3,143. Il calcule aussi l\'aire du disque et le volume de la boule.', [['cm2', 'Droites, segments et cercles'], ['6e', 'Aire et périmètre'], ['5e', 'Aires'], ['3e', 'Espace']], 'syracuse'],
  ['antiquite', 'vers −240', '🔢', 'Le crible d\'Ératosthène', 'Pour trouver les nombres premiers, Ératosthène barre les multiples de 2, de 3, de 5… Les nombres qui restent sont premiers. Il mesure aussi le tour de la Terre.', [['cm2', 'Multiples et diviseurs'], ['5e', 'Divisibilité'], ['4e', 'Divisibilité'], ['3e', 'Arithmétique']], 'alexandrie'],
  ['antiquite', 'vers −200', '🏮', 'Les Neuf Chapitres (Chine)', 'Ce manuel chinois résout des problèmes de partage et de proportions, et utilise des bâtonnets rouges et noirs pour des quantités positives et négatives : les premiers nombres relatifs.', [['cm1', 'Proportionnalité'], ['5e', 'Nombres relatifs'], ['5e', 'Opérations sur les nombres relatifs']], 'chine'],
  ['antiquite', 'vers 100', '🔢', 'Nicomaque et la « table de Pythagore »', 'À Gérase (actuelle Jordanie), Nicomaque écrit une « Introduction à l\'arithmétique » : nombres pairs et impairs, nombres premiers, et un tableau de multiplication que l\'on appelle encore « table de Pythagore ».', [['ce2', 'Tables d\'addition et de multiplication'], ['cm2', 'Multiples et diviseurs'], ['5e', 'Divisibilité']], 'gerase'],
  ['antiquite', 'vers 110', '🌐', 'Marin de Tyr : latitude et longitude', 'Le géographe Marin de Tyr (actuel Liban) repère chaque lieu de la Terre par deux nombres, sa latitude et sa longitude, sur des cartes quadrillées. Ptolémée reprendra sa méthode.', [['3e', 'Espace']], 'tyr'],
  ['antiquite', 'vers 150', '🌙', 'Les tables de cordes de Ptolémée', 'Pour l\'astronomie, Ptolémée calcule des tables qui relient les angles et les longueurs dans un cercle : les ancêtres de la trigonométrie.', [['4e', 'Cosinus'], ['3e', 'Trigonométrie']], 'alexandrie'],
  ['antiquite', 'vers 250', '❓', 'Diophante, père de l\'algèbre', 'À Alexandrie, Diophante résout des problèmes où l\'on cherche un nombre inconnu, avec des abréviations : un premier pas vers les équations.', [['5e', 'Équations'], ['3e', 'Équations']], 'alexandrie'],
  ['antiquite', 'vers 350', '🐚', 'Le zéro des Mayas', 'En Amérique centrale, sans aucun contact avec l\'Europe ni avec l\'Asie, les Mayas comptent par vingtaines et ont un signe pour le zéro (un coquillage) dans leur calendrier.', [['cm1', 'Nombres entiers jusqu\'à 9 999'], ['6e', 'Nombres entiers']], 'maya'],
  ['antiquite', 'vers 400', '🌟', 'Hypatie d\'Alexandrie', 'Première mathématicienne dont on connaît la vie, Hypatie enseigne les mathématiques et l\'astronomie, et commente les livres de Diophante et de Ptolémée.', [], 'alexandrie'],
  ['moyenage', 'vers 500', '0️⃣', 'Le zéro et la numération de position (Inde)', 'Les savants indiens écrivent les nombres avec dix chiffres dont le zéro, chaque chiffre valant selon sa position. C\'est notre système actuel.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999'], ['6e', 'Nombres entiers']], 'inde'],
  ['moyenage', '628', '➖', 'Brahmagupta et les nombres négatifs', 'L\'Indien Brahmagupta donne les règles de calcul avec le zéro et avec les « dettes » (nombres négatifs) : une dette retranchée de zéro devient un bien.', [['5e', 'Nombres relatifs'], ['5e', 'Opérations sur les nombres relatifs'], ['4e', 'Opérations sur les nombres relatifs']], 'inde'],
  ['moyenage', 'vers 820', '📖', 'Al-Khwarizmi et l\'algèbre', 'À Bagdad, Al-Khwarizmi écrit un livre sur l\'« al-jabr » (qui a donné le mot algèbre) pour résoudre des équations. Son nom a donné le mot « algorithme ».', [['6e', 'Initiation à l\'algèbre'], ['6e', 'Initiation à la pensée informatique'], ['4e', 'Équations']], 'bagdad'],
  ['moyenage', '952', '✏️', 'Al-Uqlidisi et les fractions décimales', 'À Damas, Al-Uqlidisi apprend à calculer avec les chiffres indiens sur le papier, et non plus sur une planche couverte de sable. Il écrit déjà des fractions décimales, six siècles avant Stevin.', [['cm1', 'Nombres décimaux'], ['6e', 'Nombres décimaux']], 'damas'],
  ['moyenage', 'vers 980', '🔭', 'Abu al-Wafa et la tangente', 'À Bagdad, l\'astronome Abu al-Wafa calcule des tables très précises qui relient les angles et les longueurs, et étudie une nouvelle grandeur : la tangente.', [['3e', 'Trigonométrie']], 'bagdad'],
  ['moyenage', 'vers 1020', '👁️', 'Ibn al-Haytham et la lumière', 'Au Caire, Ibn al-Haytham montre que l\'on voit grâce à la lumière qui va en ligne droite des objets jusqu\'à l\'œil. Les peintres de la Renaissance s\'appuieront sur ses travaux pour dessiner en perspective.', [['5e', 'Représentation de l\'espace']], 'caire'],
  ['moyenage', 'vers 1075', '📅', 'Omar Khayyam : équations et calendrier', 'À Ispahan (actuel Iran), le poète et mathématicien Omar Khayyam résout des équations difficiles à l\'aide de figures, et calcule la durée de l\'année pour un calendrier plus précis que le nôtre.', [['4e', 'Équations'], ['3e', 'Équations']], 'ispahan'],
  ['moyenage', '1202', '🐇', 'Fibonacci et les chiffres indo-arabes', 'Dans son « Livre du calcul », Fibonacci fait découvrir aux marchands européens les chiffres de 0 à 9, la barre de fraction et la règle de trois.', [['cm1', 'Opérations sur les nombres entiers'], ['cm1', 'Fractions'], ['6e', 'Proportionnalité']], 'pise'],
  ['moyenage', 'vers 1350', '📈', 'Nicole Oresme dessine la vitesse', 'L\'évêque normand Nicole Oresme représente une grandeur qui varie, comme la vitesse, par un dessin : un ancêtre des graphiques et des fonctions.', [['5e', 'Fonctions'], ['3e', 'Grandeurs composées']], 'paris'],
  ['moyenage', '14e siècle', '🕌', 'Les pavages de l\'Alhambra', 'À Grenade, les artistes musulmans couvrent les murs de l\'Alhambra de pavages faits de symétries, de translations et de rotations.', [['cm2', 'Symétrie axiale'], ['5e', 'Symétrie centrale'], ['4e', 'Translations'], ['3e', 'Rotation']], 'grenade'],
  ['renaissance', '1489', '➕', 'Les signes + et −', 'Ils apparaissent dans un livre imprimé de l\'Allemand Johannes Widmann, un manuel de calcul pour les marchands. Le symbole % vient lui aussi des marchands italiens (per cento).', [['ce2', 'Addition et soustraction posées'], ['cm2', 'Addition et soustraction'], ['5e', 'Pourcentages']], 'leipzig'],
  ['renaissance', '1557', '🟰', 'Le signe =', 'Le Gallois Robert Recorde invente le signe = : « rien ne peut être plus égal que deux droites parallèles de même longueur ».', [['6e', 'Initiation à l\'algèbre'], ['5e', 'Équations']], 'londres'],
  ['renaissance', '1585', '🔟', 'Simon Stevin et les nombres décimaux', 'Dans « La Disme », le Flamand Simon Stevin explique comment calculer avec les nombres décimaux, et propose déjà des mesures en dixièmes, centièmes, millièmes.', [['cm1', 'Nombres décimaux'], ['cm2', 'Nombres décimaux jusqu\'aux millièmes'], ['6e', 'Nombres décimaux']], 'leyde'],
  ['renaissance', '1591', '🔤', 'Viète calcule avec des lettres', 'Le Français François Viète désigne les nombres inconnus et les nombres connus par des lettres : c\'est la naissance du calcul littéral.', [['5e', 'Calcul littéral'], ['4e', 'Calcul littéral'], ['3e', 'Calcul littéral']], 'tours'],
  ['modernes', '1637', '📍', 'Descartes : repère et puissances', 'René Descartes repère les points par deux nombres et note les puissances avec un petit nombre en exposant (x³) : la géométrie et l\'algèbre se rejoignent.', [['4e', 'Puissances'], ['3e', 'Généralités sur les fonctions']], 'leyde'],
  ['modernes', '1654', '🎲', 'Pascal et Fermat : les probabilités', 'Le chevalier de Méré demande comment partager les mises d\'un jeu interrompu. Blaise Pascal et Pierre de Fermat en discutent par lettres : naissance du calcul des probabilités.', [['cm1', 'Probabilités'], ['cm2', 'Probabilités'], ['6e', 'Probabilités'], ['5e', 'Probabilités'], ['4e', 'Probabilités'], ['3e', 'Probabilités']], 'paris'],
  ['modernes', '1734', '𝑓', 'Euler et la notation f(x)', 'Le Suisse Leonhard Euler, l\'un des plus grands mathématiciens, popularise l\'écriture f(x) et la lettre π pour le nombre d\'Archimède.', [['5e', 'Fonctions'], ['3e', 'Généralités sur les fonctions'], ['3e', 'Fonctions linéaires et affines']], 'stpetersbourg'],
  ['modernes', '1795', '📏', 'Le système métrique', 'La Révolution crée le mètre, le litre et le gramme, avec leurs multiples et sous-multiples décimaux : des mesures communes à tous.', [['ce2', 'Les longueurs'], ['cm1', 'Longueurs, masses, contenances'], ['cm2', 'Longueurs, masses, contenances']], 'paris'],
  ['contemporain', '1843', '⚙️', 'Ada Lovelace, première programmeuse', 'L\'Anglaise Ada Lovelace écrit pour la machine à calculer de Charles Babbage ce qu\'on considère comme le premier programme informatique.', [['cm2', 'Pensée informatique'], ['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']], 'londres'],
  ['contemporain', '1858', '📊', 'Florence Nightingale et les diagrammes', 'Infirmière et statisticienne, Florence Nightingale prouve par des diagrammes que les soldats meurent surtout des maladies de l\'hôpital : les statistiques sauvent des vies.', [['ce2', 'Tableaux et diagrammes en barres'], ['cm1', 'Organisation et gestion de données'], ['6e', 'Gestion de données'], ['5e', 'Statistiques'], ['4e', 'Statistiques'], ['3e', 'Statistiques']], 'londres'],
  ['contemporain', '1936', '💻', 'Alan Turing et l\'ordinateur', 'Le mathématicien anglais Alan Turing décrit une machine capable d\'exécuter n\'importe quel algorithme : le modèle de nos ordinateurs. Pendant la guerre, il casse le code Enigma.', [['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']], 'cambridge'],
  ['contemporain', '2014', '🏅', 'Maryam Mirzakhani, médaille Fields', 'L\'Iranienne Maryam Mirzakhani est la première femme à recevoir la médaille Fields, la plus haute récompense en mathématiques, pour ses travaux sur la géométrie des surfaces.', [], 'stanford']];

// Où la notion est née : [nom, latitude, longitude]. Carte : planisphere.js (projection Equal Earth), chargé à la demande.
const HM_LIEUX = { ishango: ['Ishango (Congo)', 0.1, 29.6], uruk: ['Uruk (Mésopotamie, actuel Irak)', 31.3, 45.6], babylone: ['Babylone (Mésopotamie, actuel Irak)', 32.5, 44.4],
  thebes: ['Thèbes (Égypte)', 25.7, 32.6], milet: ['Milet (cité grecque, actuelle Turquie)', 37.5, 27.3], crotone: ['Crotone (cité grecque d\'Italie du Sud)', 39.1, 17.1],
  alexandrie: ['Alexandrie (Égypte)', 31.2, 29.9], syracuse: ['Syracuse (Sicile)', 37.1, 15.3], chine: ['Chine', 34.3, 108.9], maya: ['Pays maya (actuel Guatemala)', 17.4, -89.6],
  inde: ['Inde du Nord', 25, 78], bagdad: ['Bagdad (actuel Irak)', 33.3, 44.4], pise: ['Pise (Italie)', 43.7, 10.4], paris: ['Paris', 48.9, 2.35], grenade: ['Grenade (Espagne)', 37.2, -3.6],
  leipzig: ['Leipzig (Allemagne)', 51.3, 12.4], londres: ['Londres', 51.5, -0.1], cambridge: ['Cambridge (Angleterre)', 52.2, 0.1], leyde: ['Leyde (Pays-Bas)', 52.2, 4.5],
  tours: ['Tours', 47.4, 0.7], stpetersbourg: ['Saint-Pétersbourg (Russie)', 59.9, 30.3], stanford: ['Stanford (États-Unis)', 37.4, -122.2],
  samos: ['Samos (île grecque)', 37.75, 26.98], gizeh: ['Gizeh (Égypte)', 30.0, 31.1], caire: ['Le Caire (Égypte)', 30.05, 31.25], nippur: ['Nippur (Mésopotamie, actuel Irak)', 32.1, 45.2],
  gerase: ['Gérase (actuelle Jordanie)', 32.3, 35.9], tyr: ['Tyr (actuel Liban)', 33.3, 35.2], damas: ['Damas (actuelle Syrie)', 33.5, 36.3], ispahan: ['Ispahan (actuel Iran)', 32.65, 51.7] };
// Lieux trop proches pour deux points : Cambridge avec Londres ; Uruk, Nippur et Bagdad avec Babylone (Mésopotamie) ;
// Le Caire avec Gizeh ; Tyr et Gérase avec Damas (Proche-Orient : Liban, Syrie, Jordanie).
const HM_POINT = { cambridge: 'londres', uruk: 'babylone', nippur: 'babylone', bagdad: 'babylone', caire: 'gizeh', tyr: 'damas', gerase: 'damas' };

function hmChapitre(niv, titre){ return HM_NIV[niv].liste().find(c => c.t === titre) || null; }
function hmVisible(niv){ return typeof niveauVisible !== 'function' || niveauVisible(niv); }
const hmEsc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let hmFiltre = '';
function hmRendre(){
  const root = document.getElementById('friseRoot'); if(!root) return;
  const niveaux = Object.keys(HM_NIV).filter(hmVisible);
  const vignette = ([n, t]) => !hmVisible(n) ? '' : `<button type="button" class="hm-vig${hmFiltre === n ? ' on' : ''}" style="--c:${HM_NIV[n].coul}" title="${hmEsc(HM_NIV[n].lib + ' : ' + t)} (ouvrir le chapitre)" onclick="hmOuvrir('${n}', '${hmEsc(t.replace(/'/g, '\\\''))}')">${HM_NIV[n].lib}</button>`;
  let h = `<div class="hm-filtres"><span>Quand étudie-t-on ces notions ?</span><button type="button" class="hm-f${!hmFiltre ? ' on' : ''}" onclick="hmFiltrer('')">Tous les niveaux</button>${niveaux.map(n => `<button type="button" class="hm-f${hmFiltre === n ? ' on' : ''}" style="--c:${HM_NIV[n].coul}" onclick="hmFiltrer('${n}')">${HM_NIV[n].lib}</button>`).join('')}</div>`;
  h += `<p class="hint hm-aide">Les vignettes de couleur indiquent en quelle classe on étudie la notion : clique dessus pour ouvrir le chapitre.${hmFiltre ? ` Filtre : <b>${HM_NIV[hmFiltre].lib}</b>, les étapes qui ne concernent pas ce niveau sont estompées.` : ''}</p><div id="hmCarte" class="hm-carte-monde"></div><div class="hm-frise">`;
  HM_EPOQUES.forEach(([k, lib]) => {
    const l = HM_EVTS.filter(e => e[0] === k); if(!l.length) return;
    h += `<div class="hm-epoque"><span>${lib}</span></div>`;
    l.forEach(e => {
      const [, date, emo, titre, texte, nivs, lieu] = e, vis = nivs.filter(([n]) => hmVisible(n));
      h += `<div class="hm-evt${hmEstompe(e) ? ' estompe' : ''}" id="hm-e${HM_EVTS.indexOf(e)}"><div class="hm-date">${date}</div><div class="hm-point">${emo}</div>
        <div class="hm-carte"><b class="hm-titre">${titre}</b><p>${texte}</p><div class="hm-lieu"><span class="gicon">location_on</span> ${e[7] ? hmEsc(HM_LIEUX[e[7]][0]) + ' → ' : ''}${hmEsc(HM_LIEUX[lieu][0])}</div>${vis.length ? `<div class="hm-vigs">${vis.map(vignette).join('')}</div>` : ''}</div></div>`;
    });
  });
  root.innerHTML = h + '</div>';
  hmCarte();
}
function hmEstompe(e){ return !!hmFiltre && !e[5].some(([n]) => n === hmFiltre); }
function hmFiltrer(n){ hmFiltre = n; hmRendre(); }

/* ---- Carte du monde : où chaque notion est née. Demandé : « peut-on ajouter une carte du monde (nouveau
   planisphère adopté il y a environ un mois), en plaçant là où les différentes notions ont commencé ? » --
   projection Equal Earth, recommandée par l'Assemblée générale de l'ONU en septembre 2026. Vue « Monde » ;
   l'Europe et la Méditerranée, où les points se serrent, s'ouvrent dans un zoom. ---- */
let hmVue = 'monde', hmLieuSel = '';
// Projection Equal Earth (mêmes formules que d3-geo) avec les réglages de planisphere.js.
function hmProj(p, lat, lon){
  const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
  let lam = (lon + p.rot) * Math.PI / 180; lam = Math.atan2(Math.sin(lam), Math.cos(lam));
  const l = Math.asin(M * Math.sin(lat * Math.PI / 180)), l2 = l * l, l6 = l2 * l2 * l2;
  const x = lam * Math.cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), y = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2));
  return [p.tx + p.k * x, p.ty - p.k * y];
}
// Lieux affichés : un point par lieu (HM_POINT regroupe les lieux trop proches), avec ses étapes.
function hmPoints(){
  const pts = {};
  HM_EVTS.forEach((e, i) => { const k = HM_POINT[e[6]] || e[6]; (pts[k] = pts[k] || { k, evts: [] }).evts.push(i); });
  return Object.values(pts);
}
function hmNoms(p){ return p.evts.map(i => HM_LIEUX[HM_EVTS[i][6]][0]).filter((v, j, a) => a.indexOf(v) === j).join(' · '); }
function hmDansEurope(k){ const [, la, lo] = HM_LIEUX[k]; return lo >= -11 && lo <= 48 && la >= 24 && la <= 61; }
function hmCarte(){
  const box = document.getElementById('hmCarte'); if(!box) return;
  if(typeof HM_CARTE === 'undefined'){
    box.innerHTML = '<p class="hint">Chargement de la carte…</p>';
    if(!document.getElementById('hmCarteJs')){
      const v = (document.querySelector('script[src*="frise-histoire.js"]') || {}).src || '', sc = document.createElement('script');
      sc.id = 'hmCarteJs'; sc.src = 'planisphere.js' + (v.includes('?') ? v.slice(v.indexOf('?')) : ''); sc.onload = hmCarte;
      sc.onerror = () => { box.innerHTML = '<p class="hint">La carte n\'a pas pu être chargée.</p>'; };
      document.head.appendChild(sc);
    }
    return;
  }
  const C = HM_CARTE[hmVue], monde = hmVue === 'monde', pts = hmPoints();
  const r = monde ? 11 : 15, f = monde ? 12 : 15;
  let svg = `<svg viewBox="0 0 ${C.w} ${C.h}" class="hm-svg" role="img" aria-label="${monde ? 'Planisphère' : 'Carte de l\'Europe et de la Méditerranée'} : lieux où les notions sont nées">`;
  svg += monde ? `<path d="${C.sphere}" class="hm-mer"/>` : `<rect width="${C.w}" height="${C.h}" class="hm-mer"/>`;
  svg += `<path d="${C.grat}" class="hm-grat"/><path d="${C.terre}" class="hm-terre"/>`;
  if(monde){
    const nEu = pts.filter(p => hmDansEurope(p.k)).reduce((a, p) => a + p.evts.length, 0);
    svg += `<g class="hm-zone" onclick="hmZoom('europe')" tabindex="0" role="button" aria-label="Zoomer sur l'Europe et la Méditerranée"><path d="${C.cadre}"/>`;
    const b = [470, 34]; svg += `<text x="${b[0]}" y="${b[1] - 8}" class="hm-zone-txt">Europe et Méditerranée : ${nEu} étapes (zoom)</text></g>`;
  }
  pts.filter(p => monde !== hmDansEurope(p.k)).forEach(p => {
    const [x, y] = hmProj(C.p, HM_LIEUX[p.k][1], HM_LIEUX[p.k][2]), n = p.evts.filter(i => !hmEstompe(HM_EVTS[i])).length;
    svg += `<g class="hm-pt${n ? '' : ' estompe'}${hmLieuSel === p.k ? ' sel' : ''}" onclick="hmLieu('${p.k}')" tabindex="0" role="button"><title>${hmEsc(hmNoms(p))}</title>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/><text x="${x.toFixed(1)}" y="${(y + f * .36).toFixed(1)}" style="font-size:${f}px">${p.evts.length}</text></g>`;
  });
  // Trajets (lieu de départ → lieu de l'étape), sous les points : « flèche Samos → Crotone » (demandé).
  let fl = '';
  HM_EVTS.forEach(e => {
    if(!e[7] || monde === hmDansEurope(e[6]) || monde === hmDansEurope(e[7])) return; // seulement si les deux lieux sont sur cette carte
    const a = hmProj(C.p, HM_LIEUX[e[7]][1], HM_LIEUX[e[7]][2]), b = hmProj(C.p, HM_LIEUX[e[6]][1], HM_LIEUX[e[6]][2]);
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const d0 = [a[0] + ux * (r + 6), a[1] + uy * (r + 6)], d1 = [b[0] - ux * (r + 5), b[1] - uy * (r + 5)];
    const sg = ux > 0 ? 1 : -1, c = [(d0[0] + d1[0]) / 2 - uy * L * .22 * sg, (d0[1] + d1[1]) / 2 + ux * L * .22 * sg]; // courbe bombée vers le sud
    fl += `<g class="hm-trajet${hmEstompe(e) ? ' estompe' : ''}"><title>${hmEsc(e[3])} : ${hmEsc(HM_LIEUX[e[7]][0])} → ${hmEsc(HM_LIEUX[e[6]][0])}</title>
      <path d="M${d0.map(v => v.toFixed(1)).join(',')} Q${c.map(v => v.toFixed(1)).join(',')} ${d1.map(v => v.toFixed(1)).join(',')}" marker-end="url(#hmFleche)"/>
      <circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="4"/><text x="${(d0[0] + 2).toFixed(1)}" y="${(d0[1] - 12).toFixed(1)}" text-anchor="end">${hmEsc(HM_LIEUX[e[7]][0].split(' (')[0])}</text></g>`;
  });
  if(fl) svg = svg.replace('<path d="' + C.terre + '" class="hm-terre"/>', m => m + '<defs><marker id="hmFleche" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#7B1FA2"/></marker></defs>' + fl);
  svg += '</svg>';
  const sel = hmLieuSel && pts.find(p => p.k === hmLieuSel);
  const liste = sel ? `<div class="hm-lieu-liste"><b><span class="gicon">location_on</span> ${hmEsc(hmNoms(sel))}</b>${sel.evts.map(i => { const e = HM_EVTS[i]; return `<button type="button" class="hm-lieu-evt${hmEstompe(e) ? ' estompe' : ''}" onclick="hmVoirEtape(${i})"><span>${e[2]}</span> <span class="hm-lieu-date">${e[1]}</span> ${e[3]}</button>`; }).join('')}</div>`
    : `<p class="hint hm-carte-aide">${monde ? 'Clique sur un point pour voir les étapes nées à cet endroit (le nombre indique combien) ; clique sur le cadre pour zoomer sur l\'Europe et la Méditerranée.' : 'Clique sur un point pour voir les étapes nées à cet endroit.'}</p>`;
  box.innerHTML = `<div class="hm-carte-tete"><b><span class="gicon">public</span> Où sont nées ces notions ?</b>${monde ? '' : '<button type="button" class="hm-f" onclick="hmZoom(\'monde\')">← Monde entier</button>'}</div>
    ${svg}${liste}
    <p class="hm-proj">Planisphère en projection <b>Equal Earth</b>, que l'ONU recommande depuis septembre 2026 : chaque continent y garde sa vraie surface. Sur la carte de Mercator, l'Afrique paraît à peu près aussi grande que le Groenland ; en réalité, elle est 14 fois plus grande.</p>`;
}
function hmZoom(v){ hmVue = v; hmLieuSel = ''; hmCarte(); }
function hmLieu(k){ hmLieuSel = hmLieuSel === k ? '' : k; hmCarte(); }
function hmVoirEtape(i){
  const el = document.getElementById('hm-e' + i); if(!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.remove('hm-flash'); void el.offsetWidth; el.classList.add('hm-flash');
}
function hmOuvrir(niv, titre){
  const c = hmChapitre(niv, titre);
  if(!c || typeof openChapitre !== 'function') return;
  if(typeof currentLevel !== 'undefined') currentLevel = niv;
  openChapitre(c, 'cours', niv);
}

(function hmStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .hm-filtres{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:8px 0 4px; } .hm-filtres > span{ font-weight:600; margin-right:4px; }
    .hm-f{ border:1.5px solid var(--c,#8A8F98); color:var(--c,#4E5665); background:#fff; border-radius:999px; padding:3px 12px; font:700 .82rem Inter,sans-serif; cursor:pointer; }
    .hm-f.on{ background:var(--c,#1C1B2E); color:#fff; border-color:var(--c,#1C1B2E); }
    .hm-aide{ margin:4px 0 12px; }
    .hm-frise{ position:relative; padding-left:4px; }
    .hm-frise::before{ content:''; position:absolute; left:121px; top:0; bottom:0; width:3px; background:linear-gradient(#C9B6E6,#9CC6E8,#B6DDBF); border-radius:2px; }
    .hm-epoque{ position:relative; margin:18px 0 8px; padding-left:146px; } .hm-epoque span{ display:inline-block; background:#1C1B2E; color:#fff; font:700 .85rem 'Space Grotesk',sans-serif; padding:4px 14px; border-radius:999px; }
    .hm-evt{ display:grid; grid-template-columns:104px 36px 1fr; gap:6px; align-items:start; margin:8px 0; transition:opacity .2s; }
    .hm-evt.estompe{ opacity:.32; }
    .hm-date{ text-align:right; font:700 .85rem 'JetBrains Mono',monospace; color:#4E5665; padding-top:10px; }
    .hm-point{ width:34px; height:34px; border-radius:50%; background:#fff; border:2px solid #C9B6E6; display:flex; align-items:center; justify-content:center; font-size:1.05rem; position:relative; z-index:1; margin-top:2px; }
    .hm-carte{ background:var(--card,#fff); border:1px solid #E3E6EC; border-radius:12px; padding:9px 13px; box-shadow:0 1px 4px rgba(28,27,46,.06); }
    .hm-titre{ font:700 1rem 'Space Grotesk',sans-serif; color:#1C1B2E; } .hm-carte p{ margin:4px 0 6px; line-height:1.5; font-size:.92rem; }
    .hm-vigs{ display:flex; flex-wrap:wrap; gap:4px; }
    .hm-vig{ border:0; background:var(--c); color:#fff; font:700 .72rem Inter,sans-serif; border-radius:6px; padding:2px 8px; cursor:pointer; opacity:.9; }
    .hm-vig:hover{ opacity:1; transform:translateY(-1px); } .hm-vig.on{ box-shadow:0 0 0 2px #fff, 0 0 0 4px var(--c); }
    .hm-lieu{ font-size:.78rem; color:#6B7280; margin:-2px 0 5px; display:flex; align-items:center; gap:2px; } .hm-lieu .gicon{ font-size:15px; color:#C2410C; }
    .hm-evt.hm-flash .hm-carte{ animation:hmFlash 1.6s ease; } @keyframes hmFlash{ 0%,40%{ box-shadow:0 0 0 3px #F59E0B; } 100%{ box-shadow:0 1px 4px rgba(28,27,46,.06); } }
    .hm-carte-monde{ background:var(--card,#fff); border:1px solid #E3E6EC; border-radius:14px; padding:10px 12px; margin:0 0 14px; }
    .hm-carte-tete{ display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px; font-family:'Space Grotesk',sans-serif; } .hm-carte-tete .gicon{ vertical-align:-4px; color:#2F6FB3; }
    .hm-svg{ width:100%; height:auto; display:block; }
    .hm-mer{ fill:#E3F0FA; stroke:#9CC6E8; stroke-width:1.2; } .hm-grat{ fill:none; stroke:#fff; stroke-width:.8; } .hm-terre{ fill:#E8DFC9; stroke:#B9A882; stroke-width:.6; stroke-linejoin:round; }
    .hm-zone{ cursor:pointer; } .hm-zone path{ fill:rgba(194,65,12,.06); stroke:#C2410C; stroke-width:1.6; stroke-dasharray:6 4; } .hm-zone:hover path{ fill:rgba(194,65,12,.14); }
    .hm-zone-txt{ font:700 13px Inter,sans-serif; fill:#C2410C; paint-order:stroke; stroke:#fff; stroke-width:3px; }
    .hm-pt{ cursor:pointer; } .hm-pt circle{ fill:#C2410C; stroke:#fff; stroke-width:2; } .hm-pt text{ fill:#fff; font-family:Inter,sans-serif; font-weight:800; text-anchor:middle; pointer-events:none; }
    .hm-trajet path{ fill:none; stroke:#7B1FA2; stroke-width:3; stroke-dasharray:8 5; } .hm-trajet circle{ fill:#7B1FA2; stroke:#fff; stroke-width:1.5; } .hm-trajet text{ font:700 14px Inter,sans-serif; fill:#7B1FA2; paint-order:stroke; stroke:#fff; stroke-width:3px; } .hm-trajet.estompe{ opacity:.3; }
    .hm-pt:hover circle, .hm-pt.sel circle{ fill:#7B1FA2; } .hm-pt.estompe{ opacity:.3; }
    .hm-carte-aide{ margin:6px 0 0; } .hm-proj{ font-size:.78rem; color:#6B7280; margin:6px 0 0; line-height:1.45; }
    .hm-lieu-liste{ margin-top:8px; display:flex; flex-wrap:wrap; gap:6px; align-items:center; } .hm-lieu-liste > b{ width:100%; font-size:.9rem; } .hm-lieu-liste > b .gicon{ font-size:17px; vertical-align:-3px; color:#C2410C; }
    .hm-lieu-evt{ border:1px solid #E3E6EC; background:#FAFAFB; border-radius:10px; padding:4px 10px; font:600 .84rem Inter,sans-serif; cursor:pointer; text-align:left; } .hm-lieu-evt:hover{ border-color:#C2410C; } .hm-lieu-evt.estompe{ opacity:.4; }
    .hm-lieu-date{ font:700 .76rem 'JetBrains Mono',monospace; color:#6B7280; }
    @media (max-width:640px){ .hm-frise::before{ left:17px; } .hm-epoque{ padding-left:44px; } .hm-evt{ grid-template-columns:36px 1fr; } .hm-date{ grid-column:2; text-align:left; padding:0; order:-1; } .hm-point{ grid-row:1 / span 2; } .hm-carte{ grid-column:2; } }
  `;
  document.head.appendChild(s);
})();
