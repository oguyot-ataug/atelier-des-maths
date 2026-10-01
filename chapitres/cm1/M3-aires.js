/* ============================================================
   CHAPITRE : Aires (CM1, M3, période 4)
   Programme du cycle 3 (CM1) : notion d'aire (grandeur d'une surface), comparer des aires sans
   les mesurer (superposition, découpage-recollement) ; mesurer une aire en reportant une unité
   (carreau, demi-carreau) ; le centimètre carré (cm²) ; distinguer périmètre et aire. Les
   formules d'aire du carré et du rectangle sont vues en CM2 : en CM1, on compte des carreaux
   (en remarquant qu'un rectangle se compte par lignes : 3 lignes de 5 carreaux).
   ============================================================ */
(() => {
// Figure sur quadrillage : cases pleines [[x,y]] et demi-cases [[x,y,coin]] (coin : 'hg','hd','bg','bd' = triangle rectangle).
function quad(w, h, pleines, demis, c){
  const k = 24; let s = `<svg viewBox="0 0 ${w * k + 2} ${h * k + 2}" style="width:${Math.min(w * k + 2, 300)}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++) s += `<rect x="${1 + x * k}" y="${1 + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6" stroke-width=".8"/>`;
  (pleines || []).forEach(([x, y]) => { s += `<rect x="${1 + x * k}" y="${1 + y * k}" width="${k}" height="${k}" fill="${c}" fill-opacity=".55" stroke="#1F3A5C" stroke-width=".6"/>`; });
  (demis || []).forEach(([x, y, co]) => { const X = 1 + x * k, Y = 1 + y * k;
    const pts = { hg: [[X, Y], [X + k, Y], [X, Y + k]], hd: [[X, Y], [X + k, Y], [X + k, Y + k]], bg: [[X, Y], [X, Y + k], [X + k, Y + k]], bd: [[X + k, Y], [X + k, Y + k], [X, Y + k]] }[co];
    s += `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${c}" fill-opacity=".55" stroke="#1F3A5C" stroke-width=".6"/>`; });
  return s + '</svg>';
}
const rectCases = (x0, y0, w, h) => { const r = []; for(let y = y0; y < y0 + h; y++) for(let x = x0; x < x0 + w; x++) r.push([x, y]); return r; };
const FIG_A = rectCases(1, 1, 5, 3);
const FIG_B = [[1, 1], [2, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [4, 1]];
const FIG_T = { pleines: [[1, 2], [2, 2], [3, 2], [2, 1]], demis: [[0, 2, 'bd'], [4, 2, 'bg'], [1, 1, 'bd'], [3, 1, 'bg']] };
cm1Chapitre({
  titre: 'Aires', slug: 'aires',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce que l\'aire ?')}
${cm1Def('L\'<b>aire</b> d\'une figure est la <b>mesure de sa surface</b>, c\'est-à-dire de la place qu\'elle occupe à l\'intérieur de son contour.')}
${cm1Astuce('Ne confonds pas : le <b>périmètre</b> mesure le <b>contour</b> (une longueur, comme une clôture), l\'<b>aire</b> mesure l\'<b>intérieur</b> (une surface, comme une pelouse).')}

${cm1Lecon(2, 'Comparer des aires sans mesurer')}
${cm1Regle('Pour comparer deux aires, on peut <b>superposer</b> les figures (celle qui est entièrement recouverte a la plus petite aire), ou <b>découper</b> une figure et <b>recoller</b> les morceaux autrement : la forme change, mais l\'aire reste la même.')}

${cm1AnimAire('cm1-aire', { modeles: [2, 0] })}

${cm1Lecon(3, 'Mesurer une aire en comptant des carreaux')}
${cm1Regle('On choisit une <b>unité d\'aire</b> (par exemple un carreau) et on compte combien de fois elle est contenue dans la figure. Deux demi-carreaux font un carreau.')}
<div class="figure-wrap" style="display:flex;gap:26px;flex-wrap:wrap;justify-content:center;align-items:center;">
<div style="text-align:center;">${quad(7, 5, FIG_A, [], '#2EA8C9')}<div class="hint" style="margin:0;">Figure A : 15 carreaux</div></div>
<div style="text-align:center;">${quad(8, 5, FIG_B, [], '#2E9C6A')}<div class="hint" style="margin:0;">Figure B : 13 carreaux</div></div>
<div style="text-align:center;">${quad(5, 4, FIG_T.pleines, FIG_T.demis, '#E35D3A')}<div class="hint" style="margin:0;">Figure C : 4 carreaux + 4 demis = 6 carreaux</div></div></div>
${cm1Exemple('Pour la figure A, un rectangle, on n\'est pas obligé de compter un par un :', ['il y a 3 lignes de 5 carreaux, donc 3 × 5 = <b>15 carreaux</b>.'])}

${cmAnimPaver('cm1-ai-paver', { presets: [{ nom: '5 sur 3', l: 3, c: 5 }, { nom: '4 sur 4', l: 4, c: 4 }, { nom: '7 sur 2', l: 2, c: 7 }] })}

${cm1Lecon(4, 'Le centimètre carré')}
${cm1Def('Le <b>centimètre carré</b> (on écrit <b>1 cm²</b>) est l\'aire d\'un carré de 1 cm de côté.')}
<div class="figure-wrap"><svg viewBox="0 0 170 90" style="width:200px;"><rect x="20" y="20" width="50" height="50" fill="#7A4FC0" fill-opacity=".3" stroke="#1F3A5C" stroke-width="2"/><text x="45" y="50" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">1 cm²</text><text x="45" y="86" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">1 cm</text><text x="80" y="49" font-size="11" fill="#1F3A5C" font-family="Space Grotesk">1 cm</text></svg></div>
${cm1Exemple('Exemples :', ['un rectangle de 4 cm sur 2 cm contient 2 lignes de 4 carrés de 1 cm de côté : son aire est <b>8 cm²</b> ;', 'l\'ongle du pouce a une aire d\'environ 1 cm² ; une page de cahier, environ 500 cm².'])}

${cm1Lecon(5, 'Périmètre et aire : deux grandeurs différentes')}
<div class="figure-wrap" style="display:flex;gap:26px;flex-wrap:wrap;justify-content:center;align-items:center;">
<div style="text-align:center;">${quad(6, 4, rectCases(1, 1, 4, 2), [], '#2EA8C9')}<div class="hint" style="margin:0;">aire : 8 carreaux ; périmètre : 12</div></div>
<div style="text-align:center;">${quad(10, 3, rectCases(1, 1, 8, 1), [], '#2E9C6A')}<div class="hint" style="margin:0;">aire : 8 carreaux ; périmètre : 18</div></div></div>
${cm1Regle('Deux figures peuvent avoir la <b>même aire</b> et des <b>périmètres différents</b> (et inversement). L\'aire et le périmètre ne se mesurent pas avec les mêmes unités : cm pour le périmètre, cm² pour l\'aire.')}
`,
  methode: `
${cm1Demo('ai-compter', 'Mesurer l\'aire d\'une figure avec des demi-carreaux', 'Mesure l\'aire de la figure C (le « toit ») en carreaux.')}
${cm1Demo('ai-cm2', 'Trouver l\'aire d\'un rectangle en cm²', 'Un rectangle mesure 6 cm de long et 3 cm de large. Quelle est son aire ?')}
`,
  demos: [
    ['ai-compter', [
      { expr: quad(5, 4, FIG_T.pleines, FIG_T.demis, '#E35D3A'), note: 'On observe la figure : il y a des carreaux entiers et des demi-carreaux.' },
      { expr: 'Carreaux entiers : 4', note: 'On compte d\'abord les carreaux entiers.' },
      { expr: 'Demi-carreaux : 4, soit 2 carreaux', note: 'Deux demi-carreaux font un carreau : 4 demis = 2 carreaux.' },
      { expr: '4 + 2 = 6 carreaux', note: 'L\'aire de la figure C est 6 carreaux.' },
    ]],
    ['ai-cm2', [
      { expr: 'On pave le rectangle avec des carrés de 1 cm de côté.', note: 'Chaque petit carré a une aire de 1 cm².' },
      { expr: '3 lignes de 6 carrés', note: 'Le rectangle fait 3 cm de large (3 lignes) et 6 cm de long (6 carrés par ligne).' },
      { expr: '3 × 6 = 18', note: 'On compte les carrés avec une multiplication.' },
      { expr: 'Aire = 18 cm²', note: 'On n\'oublie pas l\'unité : cm² (centimètres carrés).' },
    ]],
  ],
  exos: cm1Exos('ai', [
    [`Quelle est l'aire de cette figure (en carreaux) ?<div style="margin:6px 0;">${quad(7, 5, [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [1, 3], [2, 3]], [], '#7A4FC0')}</div>`,
      cm1Redac('Aire de la figure', ['3 + 5 + 2', '10'], 'L\'aire de la figure est 10 carreaux (3 carreaux en haut, 5 au milieu, 2 en bas).')],
    [`Quelle est l'aire de cette figure ?<div style="margin:6px 0;">${quad(6, 4, [[1, 1], [2, 1], [1, 2], [2, 2], [3, 2]], [[3, 1, 'bg'], [4, 2, 'bg']], '#2EA8C9')}</div>`,
      cm1Redac('Aire de la figure', ['5 + 1', '6'], 'Il y a 5 carreaux entiers et 2 demi-carreaux, qui font 1 carreau : l\'aire est 6 carreaux.')],
    ['Un rectangle fait 4 carreaux de long et 3 carreaux de large. Quelle est son aire ? Quel est son périmètre (en côtés de carreau) ?',
      cm1Redac('Aire du rectangle', '3 × 4 = 12', 'L\'aire du rectangle est 12 carreaux.') + cm1Redac('Périmètre du rectangle', '4 + 3 + 4 + 3 = 14', 'Le périmètre est 14 côtés de carreau.')],
    ['Dessine sur ton cahier deux figures différentes qui ont chacune une aire de 6 carreaux.',
      cm1Redac('Deux figures de 6 carreaux', { suite: ['un rectangle de 3 sur 2 : 3 × 2 = 6', 'un rectangle de 6 sur 1 : 6 × 1 = 6'] }, 'Ces deux rectangles ont la même aire, 6 carreaux, mais pas la même forme.')],
    ['Quelle est l\'aire d\'un carré de 5 cm de côté ?',
      cm1Redac('Aire du carré', '5 × 5 = 25', 'On peut ranger 5 lignes de 5 carrés de 1 cm² : l\'aire du carré est 25 cm².')],
    ['Vrai ou faux ? « Si deux figures ont la même aire, elles ont le même périmètre. »',
      cm1Redac('Contre-exemple', { suite: ['rectangle de 4 sur 2 : aire 8, périmètre 12', 'rectangle de 8 sur 1 : aire 8, périmètre 18'] }, 'Faux : ces deux rectangles ont la même aire mais pas le même périmètre.')],
    [`Quelle unité choisir : cm ou cm² ?${cm1Liste(['le tour d\'une photo', 'la surface d\'un timbre', 'la longueur d\'un crayon'])}`,
      cm1Redac('Choix des unités', { suite: ['le tour d\'une photo : cm (un périmètre)', 'la surface d\'un timbre : cm² (une aire)', 'la longueur d\'un crayon : cm (une longueur)'] }, 'On utilise les cm pour les longueurs et les cm² pour les aires.')],
  ], { titre: 'Rédaction type : « Aire d\'un rectangle en cm² »', lignes: [['3 lignes de 7 carrés de 1 cm²', 'Je pave le rectangle.'], ['3 × 7 = 21', 'Je calcule.'], ['L\'aire est 21 cm².', 'Je conclus avec l\'unité.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : mesurer les champs', [
    'Mesurer des aires a d\'abord servi à mesurer des <b>champs</b> : pour les partager, les vendre, ou calculer l\'impôt. Dans l\'Égypte ancienne, après chaque crue du Nil, les arpenteurs recalculaient l\'aire des terres de chaque paysan.',
    'Autrefois en France, on utilisait l\'<b>arpent</b> ou le <b>journal</b> : la surface qu\'un paysan pouvait labourer en une journée ! Avec le système métrique, on a créé l\'<b>are</b> (l\'aire d\'un carré de 10 m de côté) et l\'<b>hectare</b>, encore utilisés pour les terrains.',
  ]),
  quiz: [
    { q: 'L\'aire d\'une figure mesure…', opts: ['son contour', 'sa surface', 'sa hauteur'], correct: 1 },
    { q: 'Deux demi-carreaux font…', opts: ['un carreau', 'deux carreaux', 'un quart de carreau'], correct: 0 },
    { q: 'Aire d\'un rectangle de 4 cm sur 3 cm ?', opts: ['7 cm²', '12 cm²', '14 cm'], correct: 1 },
  ],
});
})();
