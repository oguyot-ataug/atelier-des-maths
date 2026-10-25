/* =====================================================================
   maths-vie.js -- Onglet « Maths & la vie » des chapitres.
   Demandé : « Faut-il faire un nouvel onglet dans les chapitres… pour mettre ces exemples dans une
   rubrique bien à elle ? » ; nom choisi : « Maths & la vie ».

   Les activités « maths et… » (musique-maths.js, perspective-arts.js, sport-maths.js, cuisine-maths.js,
   nature-maths.js, argent-maths.js, jeux-maths.js, sciences-maths.js) et leurs pages d'histoire thématiques ne sont plus dans les onglets Méthode et
   Histoire : elles sont rangées ici, par thème. L'onglet n'apparaît que dans les chapitres qui en ont
   (VIE_CHAPITRES) : inutile de remplir tous les chapitres.
   vieMaj(niveau, titre) : appelé par openChapitre (app.js) ; vieA(niveau, titre) : le chapitre en a-t-il ?
   ===================================================================== */
const VIE_THEMES = {
  musique: { ou: 'en musique', titre: 'Maths et musique', icone: 'music_note', coul: '#7A4FC0', histoire: () => typeof MM_HISTOIRE_HTML !== 'undefined' ? MM_HISTOIRE_HTML : '' },
  arts: { ou: 'en peinture', titre: 'Maths et arts', icone: 'palette', coul: '#B5651D', histoire: () => typeof PA_HISTOIRE_HTML !== 'undefined' ? PA_HISTOIRE_HTML : '' },
  sport: { ou: 'en sport', titre: 'Maths et sport', icone: 'sprint', coul: '#1E7B34', histoire: () => typeof SP_HISTOIRE_HTML !== 'undefined' ? SP_HISTOIRE_HTML : '' },
  cuisine: { ou: 'en cuisine', titre: 'Maths et cuisine', icone: 'skillet', coul: '#C0533E', histoire: () => typeof CU_HISTOIRE_HTML !== 'undefined' ? CU_HISTOIRE_HTML : '' },
  nature: { ou: 'dans la nature', titre: 'Maths et nature', icone: 'eco', coul: '#2E8B57', histoire: () => typeof NA_HISTOIRE_HTML !== 'undefined' ? NA_HISTOIRE_HTML : '' },
  argent: { ou: 'avec l\'argent', titre: 'Maths et argent', icone: 'payments', coul: '#B7791F', histoire: () => typeof AR_HISTOIRE_HTML !== 'undefined' ? AR_HISTOIRE_HTML : '' },
  sciences: { ou: 'en sciences', titre: 'Maths et sciences', icone: 'science', coul: '#1F6F8B', histoire: () => typeof SC_HISTOIRE_HTML !== 'undefined' ? SC_HISTOIRE_HTML : '' },
  jeux: { ou: 'dans les jeux', titre: 'Maths et jeux', icone: 'extension', coul: '#5B2F9E', histoire: () => typeof JX_HISTOIRE_HTML !== 'undefined' ? JX_HISTOIRE_HTML : '' } };
const vieFr = (a, b) => `<span class="tex">\\dfrac{${a}}{${b}}</span>`;
// Activités : titre, petite consigne, et la balise que le module du thème transforme en activité.
const VIE_ACTIVITES = {
  mesure: { theme: 'musique', titre: 'Remplis la mesure', aide: `En musique, la durée d'une note est une fraction de la mesure : une ronde vaut 1, une blanche ${vieFr(1, 2)}, une noire ${vieFr(1, 4)}, une croche ${vieFr(1, 8)}. Monte le son !`, html: '<div class="mm-mesure"></div>' },
  canonSym: { theme: 'musique', titre: 'Le canon miroir', aide: 'Une mélodie dessinée sur un quadrillage : on lui applique une symétrie, et on écoute ce que devient la musique. Monte le son, puis joue à « Devine la transformation » !', html: '<div class="mm-canon" data-transf="axeV,axeH,centre"></div>' },
  canonTr: { theme: 'musique', titre: 'Translations et symétries d\'une mélodie', aide: 'Une mélodie dessinée sur un quadrillage : une translation la répète (ou la transpose), une symétrie la retourne. Monte le son, puis joue à « Devine la transformation » !', html: '<div class="mm-canon" data-transf="rep,transp,axeV,axeH,centre"></div>' },
  fuite: { theme: 'arts', titre: 'Trouve le point de fuite d\'un tableau', aide: 'À la Renaissance, les peintres découvrent la perspective : sur le tableau, des droites parallèles dans la réalité se rejoignent toutes en un même point, le point de fuite. Retrouve-le dans ces tableaux redessinés.', html: '<div class="pa-fuite"></div>' },
  cube: { theme: 'arts', titre: 'Dessiner en perspective', aide: 'Deux façons de dessiner un solide : la perspective centrale des peintres (avec un point de fuite) et la perspective cavalière du cahier de maths.', html: '<div class="pa-cube"></div>' },
  alberti: { theme: 'arts', titre: 'Le pavement d\'Alberti', aide: 'En 1435, Leon Battista Alberti explique aux peintres comment dessiner un carrelage en perspective. Suis sa construction pas à pas : on y retrouve la proportionnalité et le théorème de Thalès.', html: '<div class="pa-alberti"></div>' },
  piste: { theme: 'sport', titre: 'La piste d\'athlétisme', aide: 'Au 400 m, les coureurs ne partent pas sur la même ligne. Pourquoi ? La réponse est dans la longueur du cercle.', html: '<div class="sp-piste"></div>' },
  bolt: { theme: 'sport', titre: 'Cours contre Usain Bolt', aide: 'Une course de 100 m contre les plus grands sprinteurs (et un guépard) : la distance est proportionnelle à la durée, et la vitesse est le coefficient.', html: '<div class="sp-bolt"></div>' },
  stats5: { theme: 'sport', titre: 'Qui sélectionner ?', aide: 'Trois sauteurs en longueur, six sauts chacun. Selon l\'épreuve, quel athlète choisir ? Les indicateurs ne donnent pas tous la même réponse !', html: '<div class="sp-stats" data-crit="max,moyenne"></div>' },
  stats4: { theme: 'sport', titre: 'Qui sélectionner ?', aide: 'Trois sauteurs en longueur, six sauts chacun. Selon l\'épreuve, quel athlète choisir ? Les indicateurs statistiques ne donnent pas tous la même réponse !', html: '<div class="sp-stats" data-crit="max,moyenne,mediane"></div>' },
  stats3: { theme: 'sport', titre: 'Qui sélectionner ?', aide: 'Trois sauteurs en longueur, six sauts chacun. Selon l\'épreuve, quel athlète choisir ? Les indicateurs statistiques ne donnent pas tous la même réponse !', html: '<div class="sp-stats" data-crit="max,moyenne,mediane,etendue"></div>' },
  recetteCm2: { theme: 'cuisine', titre: 'Adapter une recette', aide: 'Une recette est donnée pour un certain nombre de personnes. Pour en nourrir plus (ou moins), on calcule d\'abord la quantité pour une seule personne.', html: '<div class="cu-recette" data-niv="cm2"></div>' },
  recette6: { theme: 'cuisine', titre: 'Adapter une recette', aide: 'Une recette est donnée pour un certain nombre de personnes. Pour en nourrir plus (ou moins), toutes les quantités changent de la même façon.', html: '<div class="cu-recette" data-niv="6e"></div>' },
  recette5: { theme: 'cuisine', titre: 'Adapter une recette', aide: 'Une recette est donnée pour un certain nombre de personnes. Pour en nourrir plus (ou moins), toutes les quantités changent de la même façon.', html: '<div class="cu-recette" data-niv="5e"></div>' },
  pizza: { theme: 'cuisine', titre: 'La pizza party', aide: 'Combien de pizzas commander quand chaque invité mange la même fraction de pizza ?', html: '<div class="cu-pizza"></div>' },
  four: { theme: 'cuisine', titre: 'La recette américaine', aide: 'Les recettes américaines donnent la température du four en degrés Fahrenheit : la conversion en degrés Celsius est une fonction affine.', html: '<div class="cu-four"></div>' },
  flocon: { theme: 'nature', titre: 'Fabrique un flocon', aide: 'Les ailes d\'un papillon, les branches d\'un flocon de neige : la nature est pleine de symétries. Dessine et regarde ton dessin se recopier.', html: '<div class="na-flocon" data-modes="axe,flocon"></div>' },
  floconRot: { theme: 'nature', titre: 'Fabrique un flocon', aide: 'Un flocon de neige revient sur lui-même par une rotation de 60° ; il a aussi 6 axes de symétrie. Compare avec un « moulin » qui n\'a que des rotations.', html: '<div class="na-flocon" data-modes="flocon,moulin"></div>' },
  tournesol: { theme: 'nature', titre: 'Le tournesol et l\'angle d\'or', aide: 'Les graines d\'un tournesol sont disposées en spirales grâce à un angle bien particulier. Lequel ?', html: '<div class="na-tournesol"></div>' },
  monnaie: { theme: 'argent', titre: 'Rendre la monnaie', aide: 'À la caisse, le client paie avec un billet : à toi de lui rendre la monnaie avec les pièces et les billets. Le commerçant, lui, ne fait pas de soustraction : il complète !', html: '<div class="ar-monnaie"></div>' },
  affaire: { theme: 'argent', titre: 'La meilleure affaire', aide: 'Deux offres pour le même produit : laquelle est la moins chère ? Pour comparer, on calcule le prix d\'un seul article.', html: '<div class="ar-affaire" data-niv="cm"></div>' },
  affaire6: { theme: 'argent', titre: 'La meilleure affaire', aide: 'Deux offres pour le même produit : laquelle est la moins chère ? Pour comparer, on calcule le prix d\'un seul article, ou d\'un kilogramme.', html: '<div class="ar-affaire" data-niv="6e"></div>' },
  soldes5: { theme: 'argent', titre: 'Les soldes', aide: 'Calculer un prix soldé, puis déjouer le piège des démarques successives.', html: '<div class="ar-soldes" data-niv="5e"></div>' },
  soldes4: { theme: 'argent', titre: 'Les soldes', aide: 'Calculer un prix soldé avec un coefficient multiplicateur, puis déjouer le piège des démarques successives.', html: '<div class="ar-soldes" data-niv="4e"></div>' },
  soldes3: { theme: 'argent', titre: 'Les soldes', aide: 'Un prix soldé est une fonction linéaire du prix de départ : déjoue le piège des démarques successives.', html: '<div class="ar-soldes" data-niv="3e"></div>' },
  interets4: { theme: 'argent', titre: 'Faire grossir son épargne', aide: 'Avec les intérêts composés, on multiplie chaque année par le même nombre : c\'est une puissance.', html: '<div class="ar-interets" data-niv="4e"></div>' },
  interets3: { theme: 'argent', titre: 'Faire grossir son épargne', aide: 'Intérêts simples ou composés : l\'un donne une fonction affine (une droite), l\'autre non.', html: '<div class="ar-interets" data-niv="3e"></div>' },
  carre: { theme: 'jeux', titre: 'Le carré magique', aide: 'Le plus ancien jeu de nombres connu, venu de Chine : chaque ligne, chaque colonne et chaque diagonale doit avoir la même somme.', html: '<div class="jx-carre"></div>' },
  carreRel: { theme: 'jeux', titre: 'Le carré magique des relatifs', aide: 'Le carré magique chinois, avec les nombres de −4 à 4 : chaque ligne, chaque colonne et chaque diagonale doit avoir la même somme.', html: '<div class="jx-carre" data-niv="relatifs"></div>' },
  nim: { theme: 'jeux', titre: 'Le jeu des allumettes', aide: 'Le jeu de Fort Boyard : celui qui prend la dernière allumette a perdu. La division par 4 donne le secret pour gagner à tous les coups.', html: '<div class="jx-nim"></div>' },
  nim5: { theme: 'jeux', titre: 'Le jeu des allumettes', aide: 'Le jeu de Fort Boyard : celui qui prend la dernière allumette a perdu. Les multiples de 4 donnent le secret pour gagner à tous les coups.', html: '<div class="jx-nim" data-niv="5e"></div>' },
  hanoi: { theme: 'jeux', titre: 'Les tours de Hanoï', aide: 'Le casse-tête d\'Édouard Lucas (1883) : combien de déplacements faut-il au minimum ? La réponse est une puissance de 2.', html: '<div class="jx-hanoi"></div>' },
  des: { theme: 'jeux', titre: 'Les trois dés de Galilée', aide: 'Avec trois dés, la somme 10 sort plus souvent que la somme 9 : l\'énigme qui a fait naître les probabilités.', html: '<div class="jx-des"></div>' },
  orage: { theme: 'sciences', titre: 'À quelle distance est l\'orage ?', aide: 'Le son du tonnerre parcourt 340 mètres chaque seconde : en comptant les secondes entre l\'éclair et le tonnerre, on sait où est l\'orage. Monte le son !', html: '<div class="sc-orage" data-niv="cm"></div>' },
  orage5: { theme: 'sciences', titre: 'À quelle distance est l\'orage ?', aide: 'Le son du tonnerre parcourt 340 mètres chaque seconde : la distance est proportionnelle à la durée. Monte le son !', html: '<div class="sc-orage" data-niv="5e"></div>' },
  orage3: { theme: 'sciences', titre: 'À quelle distance est l\'orage ?', aide: 'La vitesse du son est une grandeur composée : 340 m/s. Avec d = v × t, on trouve la distance de l\'orage. Monte le son !', html: '<div class="sc-orage" data-niv="3e"></div>' },
  eprouvette: { theme: 'sciences', titre: 'Le volume d\'un caillou', aide: 'Avec une éprouvette graduée, on mesure le volume d\'un objet de n\'importe quelle forme : c\'est l\'idée d\'Archimède.', html: '<div class="sc-eprouvette" data-niv="cm"></div>' },
  eprouvette6: { theme: 'sciences', titre: 'Le volume d\'un caillou', aide: 'Avec une éprouvette graduée, on mesure le volume d\'un objet de n\'importe quelle forme. Et 1 mL = 1 cm³ !', html: '<div class="sc-eprouvette" data-niv="6e"></div>' },
  eprouvette3: { theme: 'sciences', titre: 'Flotte ou coule ?', aide: 'Volume avec une éprouvette, masse avec une balance : la masse volumique (une grandeur composée) dit si l\'objet flotte.', html: '<div class="sc-eprouvette" data-niv="3e"></div>' },
  univers: { theme: 'sciences', titre: 'De l\'atome à l\'Univers', aide: 'Les scientifiques mesurent des objets minuscules et immenses : les puissances de 10 et l\'écriture scientifique sont faites pour ça.', html: '<div class="sc-univers"></div>' },
  chute5: { theme: 'sciences', titre: 'La bille de Galilée', aide: 'Une bille roule sur un plan incliné : la distance est une fonction du temps… mais pas proportionnelle !', html: '<div class="sc-chute" data-niv="5e"></div>' },
  chute3: { theme: 'sciences', titre: 'La bille de Galilée', aide: 'Une bille roule sur un plan incliné : la distance est une fonction du temps, ni linéaire ni affine.', html: '<div class="sc-chute" data-niv="3e"></div>' },
  etang: { theme: 'nature', titre: 'Combien de poissons dans l\'étang ?', aide: 'Comment les biologistes comptent-ils les animaux sauvages sans les attraper tous ? Avec la proportionnalité et un peu de hasard.', html: '<div class="na-etang"></div>' } };
// Chapitres (clé « niveau|titre ») -> activités, dans l'ordre d'affichage (les thèmes suivent cet ordre).
const VIE_CHAPITRES = {
  'cm1|Opérations sur les nombres décimaux': ['monnaie'],
  'cm1|Procédures de calcul mental': ['carre'],
  'cm1|Proportionnalité': ['affaire'],
  'cm1|Longueurs, masses, contenances': ['eprouvette'],
  'cm2|Longueurs, masses, contenances': ['eprouvette'],
  'cm2|Addition et soustraction': ['monnaie'],
  'cm2|Procédures de calcul mental': ['carre'],
  'cm2|Division': ['affaire', 'nim'],
  'cm2|Multiples et diviseurs': ['nim'],
  'cm2|Fractions : comparer et calculer': ['mesure', 'pizza'],
  'cm2|Proportionnalité': ['recetteCm2', 'affaire', 'orage'],
  'cm2|Symétrie axiale': ['flocon'],
  '6e|Fractions : comparaison et addition': ['mesure'],
  '6e|Fractions : multiplication': ['pizza'],
  '6e|Proportionnalité': ['recette6', 'affaire6', 'orage'],
  '6e|Nombres décimaux': ['monnaie'],
  '6e|Opérations et ordre de grandeur': ['carre'],
  '6e|Multiplication et division': ['nim'],
  '6e|Initiation à la pensée informatique': ['hanoi'],
  '6e|Aire et périmètre': ['piste'],
  '6e|Angles et rapporteur': ['tournesol'],
  '6e|Symétrie axiale': ['flocon'],
  '6e|Solides et volumes': ['cube', 'eprouvette6'],
  '5e|Symétrie centrale': ['canonSym'],
  '5e|Représentation de l\'espace': ['fuite', 'cube'],
  '5e|Proportionnalité': ['recette5', 'orage5'],
  '5e|Statistiques': ['stats5'],
  '5e|Pourcentages': ['soldes5'],
  '5e|Divisibilité': ['nim5'],
  '5e|Opérations sur les nombres relatifs': ['carreRel'],
  '5e|Probabilités': ['des'],
  '5e|Fonctions': ['chute5'],
  '4e|Translations': ['canonTr'],
  '4e|Triangles et parallèles': ['alberti'],
  '4e|Proportionnalité': ['bolt', 'soldes4'],
  '4e|Puissances': ['interets4', 'hanoi', 'univers'],
  '4e|Statistiques': ['stats4'],
  '4e|Probabilités': ['etang', 'des'],
  '3e|Théorème de Thalès': ['alberti'],
  '3e|Grandeurs composées': ['bolt', 'orage3', 'eprouvette3'],
  '3e|Statistiques': ['stats3'],
  '3e|Fonctions linéaires et affines': ['four', 'soldes3'],
  '3e|Généralités sur les fonctions': ['interets3', 'chute3'],
  '3e|Puissances': ['hanoi', 'univers'],
  '3e|Rotation': ['floconRot'],
  '3e|Probabilités': ['etang', 'des'] };
function vieA(niv, titre){ return !!VIE_CHAPITRES[niv + '|' + titre]; }
function vieHtml(liste){
  const themes = [];
  liste.forEach(k => { const a = VIE_ACTIVITES[k]; if(!a) return; let t = themes.find(x => x.k === a.theme); if(!t){ t = { k: a.theme, acts: [] }; themes.push(t); } t.acts.push(a); });
  return `<div class="vie-intro"><span class="gicon">public</span><div><b>Maths &amp; la vie</b> : les maths de ce chapitre, on les croise ${themes.map(t => VIE_THEMES[t.k].ou).join(', ').replace(/, ([^,]*)$/, ' et $1')}. Des activités à manipuler${themes.some(t => t.k === 'musique' || t.k === 'sciences') ? ' (monte le son !)' : ''} et un peu d'histoire.</div></div>`
    + themes.map(t => { const T = VIE_THEMES[t.k];
      return `<section class="vie-theme" style="--vie:${T.coul}"><h3 class="vie-theme-h"><span class="gicon">${T.icone}</span> ${T.titre}</h3>`
        + t.acts.map(a => `<div class="sub-header" style="margin-top:14px;"><span class="letter">${T.titre.split(' ').pop()[0].toUpperCase()}</span><h4>${a.titre}</h4></div>
          <div class="figure-wrap"><p class="hint interaction-hint" style="margin-top:6px;">${a.aide}</p>${a.html}</div>`).join('')
        + T.histoire() + '</section>'; }).join('');
}
// Onglet affiché ou non, et contenu construit à l'ouverture du chapitre.
function vieMaj(niv, titre){
  const btn = document.getElementById('tabVie'), box = document.getElementById('vie-contenu');
  const liste = VIE_CHAPITRES[niv + '|' + titre];
  if(btn) btn.style.display = liste ? '' : 'none';
  if(!box) return;
  if(!liste){ box.innerHTML = ''; box.style.display = 'none'; return; }
  box.style.display = 'block';
  box.innerHTML = vieHtml(liste);
  if(typeof renderStaticMath === 'function') renderStaticMath(box);
  [typeof mmInitTout === 'function' && mmInitTout, typeof paInitTout === 'function' && paInitTout, typeof spInitTout === 'function' && spInitTout,
   typeof cuInitTout === 'function' && cuInitTout, typeof naInitTout === 'function' && naInitTout,
   typeof arInitTout === 'function' && arInitTout, typeof jxInitTout === 'function' && jxInitTout,
   typeof scInitTout === 'function' && scInitTout].forEach(f => { if(f) f(box); });
}

(function vieStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .vie-intro{ display:flex; gap:12px; align-items:flex-start; background:linear-gradient(135deg,#EEF6FF,#F4FBEF); border:1px solid #D5E5F2; border-radius:14px; padding:12px 16px; line-height:1.55; margin-bottom:8px; }
    .vie-intro > .gicon{ font-size:30px; color:#2F6FB3; }
    .vie-theme{ border-top:3px solid var(--vie); margin-top:22px; padding-top:6px; }
    .vie-theme-h{ font:700 1.25rem 'Space Grotesk',sans-serif; color:var(--vie); display:flex; align-items:center; gap:8px; margin:6px 0 4px; }
    .vie-theme-h .gicon{ font-size:26px; }
    .vie-theme .sub-header .letter{ background:var(--vie); }
    .vie-theme .history-box{ margin-top:18px; }
  `;
  document.head.appendChild(s);
})();
