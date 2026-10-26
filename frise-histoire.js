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
const HM_EPOQUES = [['prehistoire', 'Préhistoire et premières civilisations'], ['antiquite', 'Antiquité grecque'], ['moyenage', 'Du Moyen Âge à l\'Islam médiéval'], ['renaissance', 'Renaissance'], ['modernes', 'Temps modernes'], ['contemporain', 'Époque contemporaine']];
// [époque, date affichée, emoji, titre, texte, [[niveau, titre du chapitre], …]]
const HM_EVTS = [
  ['prehistoire', 'vers −20 000', '🦴', 'Le bâton d\'Ishango', 'Retrouvé au Congo, cet os porte des encoches groupées : l\'un des plus anciens objets qui semblent servir à compter.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999']]],
  ['prehistoire', 'vers −3300', '🏺', 'Les premiers nombres écrits', 'En Mésopotamie, des jetons d\'argile puis des signes sur des tablettes servent à tenir les comptes : l\'écriture des nombres naît avec la comptabilité.', [['cm1', 'Nombres entiers jusqu\'à 9 999'], ['cm2', 'Grands nombres jusqu\'à 999 999 999']]],
  ['prehistoire', 'vers −2000', '🕰️', 'Babylone compte par soixantaines', 'Les Babyloniens écrivent les nombres en base 60. Héritage : 60 minutes dans une heure, 60 secondes dans une minute, 360 degrés dans un tour.', [['ce2', 'L\'heure et les durées'], ['cm1', 'Heures et durées'], ['cm2', 'Angles'], ['6e', 'Heures et durée'], ['6e', 'Angles et rapporteur']]],
  ['prehistoire', 'vers −1800', '📐', 'La diagonale du carré', 'Une tablette babylonienne (YBC 7289) donne la longueur de la diagonale d\'un carré avec une précision étonnante : on connaît déjà la relation de Pythagore, plus de mille ans avant lui.', [['4e', 'Théorème de Pythagore']]],
  ['prehistoire', 'vers −1650', '📜', 'Le papyrus Rhind', 'Le scribe égyptien Ahmès recopie 84 problèmes : partages, fractions, aires de champs, volumes de greniers. Les Égyptiens multiplient en doublant et en additionnant.', [['cm1', 'Fractions'], ['cm2', 'Multiplication'], ['6e', 'Fractions : nombres et partage']]],
  ['antiquite', 'vers −600', '🔺', 'Thalès', 'Le Grec Thalès aurait mesuré la hauteur d\'une pyramide grâce aux ombres et aux droites parallèles.', [['4e', 'Triangles et parallèles'], ['3e', 'Théorème de Thalès']]],
  ['antiquite', 'vers −530', '🎵', 'Pythagore et son école', 'Pour les pythagoriciens, « tout est nombre » : ils étudient les nombres pairs et impairs, les accords de la musique et le célèbre théorème du triangle rectangle.', [['4e', 'Théorème de Pythagore']]],
  ['antiquite', 'vers −300', '📚', 'Les Éléments d\'Euclide', 'À Alexandrie, Euclide rassemble la géométrie en 13 livres : définitions, propriétés, démonstrations. Il prouve aussi qu\'il existe une infinité de nombres premiers. Ce livre a servi de manuel pendant plus de 2 000 ans.', [['6e', 'Droites parallèles et perpendiculaires'], ['6e', 'Propriétés des triangles'], ['5e', 'Angles et parallélisme'], ['3e', 'Arithmétique']]],
  ['antiquite', 'vers −250', '⭕', 'Archimède et le nombre π', 'Archimède encadre le périmètre du cercle avec des polygones de 96 côtés : π est entre 3,140 et 3,143. Il calcule aussi l\'aire du disque et le volume de la boule.', [['cm2', 'Droites, segments et cercles'], ['6e', 'Aire et périmètre'], ['5e', 'Aires'], ['3e', 'Espace']]],
  ['antiquite', 'vers −240', '🔢', 'Le crible d\'Ératosthène', 'Pour trouver les nombres premiers, Ératosthène barre les multiples de 2, de 3, de 5… Les nombres qui restent sont premiers. Il mesure aussi le tour de la Terre.', [['cm2', 'Multiples et diviseurs'], ['5e', 'Divisibilité'], ['4e', 'Divisibilité'], ['3e', 'Arithmétique']]],
  ['antiquite', 'vers −200', '🏮', 'Les Neuf Chapitres (Chine)', 'Ce manuel chinois résout des problèmes de partage et de proportions, et utilise des bâtonnets rouges et noirs pour des quantités positives et négatives : les premiers nombres relatifs.', [['cm1', 'Proportionnalité'], ['5e', 'Nombres relatifs'], ['5e', 'Opérations sur les nombres relatifs']]],
  ['antiquite', 'vers 150', '🌙', 'Les tables de cordes de Ptolémée', 'Pour l\'astronomie, Ptolémée calcule des tables qui relient les angles et les longueurs dans un cercle : les ancêtres de la trigonométrie.', [['4e', 'Cosinus'], ['3e', 'Trigonométrie']]],
  ['antiquite', 'vers 250', '❓', 'Diophante, père de l\'algèbre', 'À Alexandrie, Diophante résout des problèmes où l\'on cherche un nombre inconnu, avec des abréviations : un premier pas vers les équations.', [['5e', 'Équations'], ['3e', 'Équations']]],
  ['antiquite', 'vers 400', '🌟', 'Hypatie d\'Alexandrie', 'Première mathématicienne dont on connaît la vie, Hypatie enseigne les mathématiques et l\'astronomie, et commente les livres de Diophante et de Ptolémée.', []],
  ['moyenage', 'vers 500', '0️⃣', 'Le zéro et la numération de position (Inde)', 'Les savants indiens écrivent les nombres avec dix chiffres dont le zéro, chaque chiffre valant selon sa position. C\'est notre système actuel.', [['ce2', 'Nombres jusqu\'à 10 000'], ['cm1', 'Nombres entiers jusqu\'à 9 999'], ['6e', 'Nombres entiers']]],
  ['moyenage', '628', '➖', 'Brahmagupta et les nombres négatifs', 'L\'Indien Brahmagupta donne les règles de calcul avec le zéro et avec les « dettes » (nombres négatifs) : une dette retranchée de zéro devient un bien.', [['5e', 'Nombres relatifs'], ['5e', 'Opérations sur les nombres relatifs'], ['4e', 'Opérations sur les nombres relatifs']]],
  ['moyenage', 'vers 820', '📖', 'Al-Khwarizmi et l\'algèbre', 'À Bagdad, Al-Khwarizmi écrit un livre sur l\'« al-jabr » (qui a donné le mot algèbre) pour résoudre des équations. Son nom a donné le mot « algorithme ».', [['6e', 'Initiation à l\'algèbre'], ['6e', 'Initiation à la pensée informatique'], ['4e', 'Équations']]],
  ['moyenage', '1202', '🐇', 'Fibonacci et les chiffres indo-arabes', 'Dans son « Livre du calcul », Fibonacci fait découvrir aux marchands européens les chiffres de 0 à 9, la barre de fraction et la règle de trois.', [['cm1', 'Opérations sur les nombres entiers'], ['cm1', 'Fractions'], ['6e', 'Proportionnalité']]],
  ['moyenage', 'vers 1350', '📈', 'Nicole Oresme dessine la vitesse', 'L\'évêque normand Nicole Oresme représente une grandeur qui varie, comme la vitesse, par un dessin : un ancêtre des graphiques et des fonctions.', [['5e', 'Fonctions'], ['3e', 'Grandeurs composées']]],
  ['moyenage', '14e siècle', '🕌', 'Les pavages de l\'Alhambra', 'À Grenade, les artistes musulmans couvrent les murs de l\'Alhambra de pavages faits de symétries, de translations et de rotations.', [['cm2', 'Symétrie axiale'], ['5e', 'Symétrie centrale'], ['4e', 'Translations'], ['3e', 'Rotation']]],
  ['renaissance', '1489', '➕', 'Les signes + et −', 'Ils apparaissent dans un livre imprimé de l\'Allemand Johannes Widmann, un manuel de calcul pour les marchands. Le symbole % vient lui aussi des marchands italiens (per cento).', [['ce2', 'Addition et soustraction posées'], ['cm2', 'Addition et soustraction'], ['5e', 'Pourcentages']]],
  ['renaissance', '1557', '🟰', 'Le signe =', 'Le Gallois Robert Recorde invente le signe = : « rien ne peut être plus égal que deux droites parallèles de même longueur ».', [['6e', 'Initiation à l\'algèbre'], ['5e', 'Équations']]],
  ['renaissance', '1585', '🔟', 'Simon Stevin et les nombres décimaux', 'Dans « La Disme », le Flamand Simon Stevin explique comment calculer avec les nombres décimaux, et propose déjà des mesures en dixièmes, centièmes, millièmes.', [['cm1', 'Nombres décimaux'], ['cm2', 'Nombres décimaux jusqu\'aux millièmes'], ['6e', 'Nombres décimaux']]],
  ['renaissance', '1591', '🔤', 'Viète calcule avec des lettres', 'Le Français François Viète désigne les nombres inconnus et les nombres connus par des lettres : c\'est la naissance du calcul littéral.', [['5e', 'Calcul littéral'], ['4e', 'Calcul littéral'], ['3e', 'Calcul littéral']]],
  ['modernes', '1637', '📍', 'Descartes : repère et puissances', 'René Descartes repère les points par deux nombres et note les puissances avec un petit nombre en exposant (x³) : la géométrie et l\'algèbre se rejoignent.', [['4e', 'Puissances'], ['3e', 'Généralités sur les fonctions']]],
  ['modernes', '1654', '🎲', 'Pascal et Fermat : les probabilités', 'Le chevalier de Méré demande comment partager les mises d\'un jeu interrompu. Blaise Pascal et Pierre de Fermat en discutent par lettres : naissance du calcul des probabilités.', [['cm1', 'Probabilités'], ['cm2', 'Probabilités'], ['6e', 'Probabilités'], ['5e', 'Probabilités'], ['4e', 'Probabilités'], ['3e', 'Probabilités']]],
  ['modernes', '1734', '𝑓', 'Euler et la notation f(x)', 'Le Suisse Leonhard Euler, l\'un des plus grands mathématiciens, popularise l\'écriture f(x) et la lettre π pour le nombre d\'Archimède.', [['5e', 'Fonctions'], ['3e', 'Généralités sur les fonctions'], ['3e', 'Fonctions linéaires et affines']]],
  ['modernes', '1795', '📏', 'Le système métrique', 'La Révolution crée le mètre, le litre et le gramme, avec leurs multiples et sous-multiples décimaux : des mesures communes à tous.', [['ce2', 'Les longueurs'], ['cm1', 'Longueurs, masses, contenances'], ['cm2', 'Longueurs, masses, contenances']]],
  ['contemporain', '1843', '⚙️', 'Ada Lovelace, première programmeuse', 'L\'Anglaise Ada Lovelace écrit pour la machine à calculer de Charles Babbage ce qu\'on considère comme le premier programme informatique.', [['cm2', 'Pensée informatique'], ['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']]],
  ['contemporain', '1858', '📊', 'Florence Nightingale et les diagrammes', 'Infirmière et statisticienne, Florence Nightingale prouve par des diagrammes que les soldats meurent surtout des maladies de l\'hôpital : les statistiques sauvent des vies.', [['ce2', 'Tableaux et diagrammes en barres'], ['cm1', 'Organisation et gestion de données'], ['6e', 'Gestion de données'], ['5e', 'Statistiques'], ['4e', 'Statistiques'], ['3e', 'Statistiques']]],
  ['contemporain', '1936', '💻', 'Alan Turing et l\'ordinateur', 'Le mathématicien anglais Alan Turing décrit une machine capable d\'exécuter n\'importe quel algorithme : le modèle de nos ordinateurs. Pendant la guerre, il casse le code Enigma.', [['6e', 'Initiation à la pensée informatique'], ['5e', 'Pensée informatique et programmation']]],
  ['contemporain', '2014', '🏅', 'Maryam Mirzakhani, médaille Fields', 'L\'Iranienne Maryam Mirzakhani est la première femme à recevoir la médaille Fields, la plus haute récompense en mathématiques, pour ses travaux sur la géométrie des surfaces.', []]];

function hmChapitre(niv, titre){ return HM_NIV[niv].liste().find(c => c.t === titre) || null; }
function hmVisible(niv){ return typeof niveauVisible !== 'function' || niveauVisible(niv); }
const hmEsc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let hmFiltre = '';
function hmRendre(){
  const root = document.getElementById('friseRoot'); if(!root) return;
  const niveaux = Object.keys(HM_NIV).filter(hmVisible);
  const vignette = ([n, t]) => !hmVisible(n) ? '' : `<button type="button" class="hm-vig${hmFiltre === n ? ' on' : ''}" style="--c:${HM_NIV[n].coul}" title="${hmEsc(HM_NIV[n].lib + ' : ' + t)} (ouvrir le chapitre)" onclick="hmOuvrir('${n}', '${hmEsc(t.replace(/'/g, '\\\''))}')">${HM_NIV[n].lib}</button>`;
  let h = `<div class="hm-filtres"><span>Quand étudie-t-on ces notions ?</span><button type="button" class="hm-f${!hmFiltre ? ' on' : ''}" onclick="hmFiltrer('')">Tous les niveaux</button>${niveaux.map(n => `<button type="button" class="hm-f${hmFiltre === n ? ' on' : ''}" style="--c:${HM_NIV[n].coul}" onclick="hmFiltrer('${n}')">${HM_NIV[n].lib}</button>`).join('')}</div>`;
  h += `<p class="hint hm-aide">Les vignettes de couleur indiquent en quelle classe on étudie la notion : clique dessus pour ouvrir le chapitre.${hmFiltre ? ` Filtre : <b>${HM_NIV[hmFiltre].lib}</b>, les étapes qui ne concernent pas ce niveau sont estompées.` : ''}</p><div class="hm-frise">`;
  HM_EPOQUES.forEach(([k, lib]) => {
    const l = HM_EVTS.filter(e => e[0] === k); if(!l.length) return;
    h += `<div class="hm-epoque"><span>${lib}</span></div>`;
    l.forEach(([, date, emo, titre, texte, nivs]) => {
      const vis = nivs.filter(([n]) => hmVisible(n)), estompe = hmFiltre && !vis.some(([n]) => n === hmFiltre);
      h += `<div class="hm-evt${estompe ? ' estompe' : ''}"><div class="hm-date">${date}</div><div class="hm-point">${emo}</div>
        <div class="hm-carte"><b class="hm-titre">${titre}</b><p>${texte}</p>${vis.length ? `<div class="hm-vigs">${vis.map(vignette).join('')}</div>` : ''}</div></div>`;
    });
  });
  root.innerHTML = h + '</div>';
}
function hmFiltrer(n){ hmFiltre = n; hmRendre(); }
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
    @media (max-width:640px){ .hm-frise::before{ left:17px; } .hm-epoque{ padding-left:44px; } .hm-evt{ grid-template-columns:36px 1fr; } .hm-date{ grid-column:2; text-align:left; padding:0; order:-1; } .hm-point{ grid-row:1 / span 2; } .hm-carte{ grid-column:2; } }
  `;
  document.head.appendChild(s);
})();
