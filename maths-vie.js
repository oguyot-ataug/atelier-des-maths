/* =====================================================================
   maths-vie.js -- Onglet « Maths & la vie » des chapitres.
   Demandé : « Faut-il faire un nouvel onglet dans les chapitres… pour mettre ces exemples dans une
   rubrique bien à elle ? » ; nom choisi : « Maths & la vie ».

   Les activités « maths et… » (musique-maths.js, perspective-arts.js, sport-maths.js, cuisine-maths.js,
   nature-maths.js) et leurs pages d'histoire thématiques ne sont plus dans les onglets Méthode et
   Histoire : elles sont rangées ici, par thème. L'onglet n'apparaît que dans les chapitres qui en ont
   (VIE_CHAPITRES) : inutile de remplir tous les chapitres.
   vieMaj(niveau, titre) : appelé par openChapitre (app.js) ; vieA(niveau, titre) : le chapitre en a-t-il ?
   ===================================================================== */
const VIE_THEMES = {
  musique: { titre: 'Maths et musique', icone: 'music_note', coul: '#7A4FC0', histoire: () => typeof MM_HISTOIRE_HTML !== 'undefined' ? MM_HISTOIRE_HTML : '' },
  arts: { titre: 'Maths et arts', icone: 'palette', coul: '#B5651D', histoire: () => typeof PA_HISTOIRE_HTML !== 'undefined' ? PA_HISTOIRE_HTML : '' },
  sport: { titre: 'Maths et sport', icone: 'sprint', coul: '#1E7B34', histoire: () => typeof SP_HISTOIRE_HTML !== 'undefined' ? SP_HISTOIRE_HTML : '' },
  cuisine: { titre: 'Maths et cuisine', icone: 'skillet', coul: '#C0533E', histoire: () => typeof CU_HISTOIRE_HTML !== 'undefined' ? CU_HISTOIRE_HTML : '' },
  nature: { titre: 'Maths et nature', icone: 'eco', coul: '#2E8B57', histoire: () => typeof NA_HISTOIRE_HTML !== 'undefined' ? NA_HISTOIRE_HTML : '' } };
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
  etang: { theme: 'nature', titre: 'Combien de poissons dans l\'étang ?', aide: 'Comment les biologistes comptent-ils les animaux sauvages sans les attraper tous ? Avec la proportionnalité et un peu de hasard.', html: '<div class="na-etang"></div>' } };
// Chapitres (clé « niveau|titre ») -> activités, dans l'ordre d'affichage (les thèmes suivent cet ordre).
const VIE_CHAPITRES = {
  'cm2|Fractions : comparer et calculer': ['mesure', 'pizza'],
  'cm2|Proportionnalité': ['recetteCm2'],
  'cm2|Symétrie axiale': ['flocon'],
  '6e|Fractions : comparaison et addition': ['mesure'],
  '6e|Fractions : multiplication': ['pizza'],
  '6e|Proportionnalité': ['recette6'],
  '6e|Aire et périmètre': ['piste'],
  '6e|Angles et rapporteur': ['tournesol'],
  '6e|Symétrie axiale': ['flocon'],
  '6e|Solides et volumes': ['cube'],
  '5e|Symétrie centrale': ['canonSym'],
  '5e|Représentation de l\'espace': ['fuite', 'cube'],
  '5e|Proportionnalité': ['recette5'],
  '5e|Statistiques': ['stats5'],
  '4e|Translations': ['canonTr'],
  '4e|Triangles et parallèles': ['alberti'],
  '4e|Proportionnalité': ['bolt'],
  '4e|Statistiques': ['stats4'],
  '4e|Probabilités': ['etang'],
  '3e|Théorème de Thalès': ['alberti'],
  '3e|Grandeurs composées': ['bolt'],
  '3e|Statistiques': ['stats3'],
  '3e|Fonctions linéaires et affines': ['four'],
  '3e|Rotation': ['floconRot'],
  '3e|Probabilités': ['etang'] };
function vieA(niv, titre){ return !!VIE_CHAPITRES[niv + '|' + titre]; }
function vieHtml(liste){
  const themes = [];
  liste.forEach(k => { const a = VIE_ACTIVITES[k]; if(!a) return; let t = themes.find(x => x.k === a.theme); if(!t){ t = { k: a.theme, acts: [] }; themes.push(t); } t.acts.push(a); });
  return `<div class="vie-intro"><span class="gicon">public</span><div><b>Maths &amp; la vie</b> : les maths de ce chapitre, on les croise en ${themes.map(t => VIE_THEMES[t.k].titre.replace('Maths et ', '')).join(', ').replace(/, ([^,]*)$/, ' et $1')}. Des activités à manipuler${themes.some(t => t.k === 'musique') ? ' (monte le son pour la musique !)' : ''} et un peu d'histoire.</div></div>`
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
   typeof cuInitTout === 'function' && cuInitTout, typeof naInitTout === 'function' && naInitTout].forEach(f => { if(f) f(box); });
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
