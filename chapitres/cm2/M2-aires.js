/* ============================================================
   CHAPITRE : Aires (CM2, M2, période 3)
   Programme du cycle 3 (CM2) : comparer des aires ; déterminer des aires ; unités cm², dm², m²
   et conversions entre elles (en raisonnant : 1 dm² = 100 cm² car un carré de 1 dm de côté
   contient 10 × 10 carrés de 1 cm de côté) ; aire du carré et du rectangle. Ne pas confondre
   aire et périmètre.
   ============================================================ */
(() => {
function quad(w, h, cases, c){
  const k = 22; let s = `<svg viewBox="0 0 ${w * k + 2} ${h * k + 2}" style="width:${Math.min(w * k + 2, 280)}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++) s += `<rect x="${1 + x * k}" y="${1 + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6" stroke-width=".8"/>`;
  cases.forEach(([x, y]) => { s += `<rect x="${1 + x * k}" y="${1 + y * k}" width="${k}" height="${k}" fill="${c}" fill-opacity=".55" stroke="#1F3A5C" stroke-width=".6"/>`; });
  return s + '</svg>';
}
const rc = (x0, y0, w, h) => { const r = []; for(let y = y0; y < y0 + h; y++) for(let x = x0; x < x0 + w; x++) r.push([x, y]); return r; };
function dm2(){
  let s = '<svg viewBox="0 0 220 220" style="width:200px;display:block;margin:0 auto;"><rect x="10" y="10" width="200" height="200" fill="#2EA8C9" fill-opacity=".1" stroke="#1F3A5C" stroke-width="2"/>';
  for(let i = 1; i < 10; i++) s += `<line x1="${10 + i * 20}" y1="10" x2="${10 + i * 20}" y2="210" stroke="#9BB0C4" stroke-width=".7"/><line x1="10" y1="${10 + i * 20}" x2="210" y2="${10 + i * 20}" stroke="#9BB0C4" stroke-width=".7"/>`;
  return s + '<rect x="10" y="10" width="20" height="20" fill="#E35D3A" fill-opacity=".7"/></svg>';
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Aires', slug: 'aires',
  cours: `
${cm1Lecon(1, 'Aire et unités d\'aire')}
${cm1Def('L\'<b>aire</b> d\'une figure mesure la <b>surface</b> qu\'elle occupe. On la mesure en comptant combien de fois une <b>unité d\'aire</b> y est contenue.<br>1 <b>cm²</b> (centimètre carré) est l\'aire d\'un carré de 1 cm de côté ; 1 <b>dm²</b> celle d\'un carré de 1 dm de côté ; 1 <b>m²</b> celle d\'un carré de 1 m de côté.')}
${cm1Astuce('L\'aire mesure l\'intérieur (en cm², m²…), le périmètre mesure le contour (en cm, m…). Ce sont deux grandeurs différentes.')}

${cm1Lecon(2, 'Convertir des aires en raisonnant')}
<div class="figure-wrap">${dm2()}<p class="hint" style="margin:4px 0 0;">Un carré de 1 dm de côté (10 cm) contient 10 lignes de 10 carrés de 1 cm² : 1 dm² = 100 cm².</p></div>
${cm1Regle('<b>1 dm² = 100 cm²</b> · <b>1 m² = 100 dm²</b> = 10 000 cm²', 'À retenir')}
${cm1Exemple('Exemples :', ['3 dm² = 3 × 100 cm² = 300 cm².', '2,5 m² = 2,5 × 100 dm² = 250 dm².', '700 cm² = 7 dm², car 100 cm² = 1 dm².'])}
${cm1Rem('Attention : 1 dm = 10 cm, mais 1 dm² = 100 cm² ! Pour les aires, on passe d\'une unité à la suivante en multipliant par <b>100</b>.')}

${cm1Lecon(3, 'Aire du rectangle et du carré')}
<div class="figure-wrap" style="display:flex;gap:26px;flex-wrap:wrap;justify-content:center;align-items:center;">${quad(7, 5, rc(1, 1, 5, 3), '#2EA8C9')}${quad(5, 5, rc(1, 1, 3, 3), '#2E9C6A')}</div>
${cm1Regle('Un rectangle de 5 cm sur 3 cm contient 3 lignes de 5 carrés de 1 cm² : son aire est 5 × 3 = 15 cm².<br><b>Aire du rectangle = longueur × largeur</b> · <b>Aire du carré = côté × côté</b><br>Les deux longueurs doivent être dans la <b>même unité</b>.')}
${cm1Exemple('Exemples :', ['Un carré de 3 cm de côté : 3 × 3 = <b>9 cm²</b>.', 'Une chambre rectangulaire de 4 m sur 3,5 m : 4 × 3,5 = <b>14 m²</b>.', 'Un rectangle de 2 dm sur 15 cm : 2 dm = 20 cm, donc 20 × 15 = <b>300 cm²</b>.'])}

${cm1AnimAire('cm2-aire', { modeles: [0, 1, 2] })}

${cm1Lecon(4, 'Aire de figures composées')}
${cm1Regle('Pour une figure faite de plusieurs rectangles, on la <b>découpe</b> en rectangles, on calcule l\'aire de chacun et on <b>additionne</b>. On peut aussi calculer l\'aire d\'un grand rectangle et <b>enlever</b> ce qui manque.')}
`,
  methode: `
${cm1Demo('c2-ai-rect', 'Calculer l\'aire d\'un rectangle', 'Un terrain rectangulaire mesure 25 m de long et 12 m de large. Quelle est son aire ?')}
${cm1Demo('c2-ai-L', 'Calculer l\'aire d\'une figure en L', 'Une figure en L est formée d\'un rectangle de 6 cm sur 2 cm et d\'un carré de 2 cm de côté posé dessus. Quelle est son aire ?')}
`,
  demos: [
    ['c2-ai-rect', [
      { expr: 'Longueur 25 m, largeur 12 m', note: 'Même unité : le mètre.' },
      { expr: 'Aire = longueur × largeur', note: 'On utilise la règle de calcul du rectangle.' },
      { expr: '25 × 12 = 300', note: '25 × 12 = 25 × 10 + 25 × 2 = 250 + 50.' },
      { expr: 'Aire = 300 m²', note: 'L\'unité d\'aire est le mètre carré.' },
    ]],
    ['c2-ai-L', [
      { expr: 'Rectangle : 6 × 2 = 12 cm²', note: 'On découpe la figure : d\'abord le rectangle.' },
      { expr: 'Carré : 2 × 2 = 4 cm²', note: 'Puis le carré.' },
      { expr: '12 + 4 = 16 cm²', note: 'On additionne les aires des morceaux.' },
    ]],
  ],
  exos: cm1Exos('c2ai', [
    ['Calcule l\'aire : rectangle de 8 cm sur 5 cm · carré de 7 cm de côté · rectangle de 2,5 m sur 4 m.', '40 cm² · 49 cm² · 10 m²'],
    ['Convertis : 5 dm² en cm² · 3 m² en dm² · 600 cm² en dm² · 1,5 m² en dm².', '500 cm² · 300 dm² · 6 dm² · 150 dm²'],
    ['Quelle unité choisir (cm², dm², m²) ? L\'aire d\'un timbre · d\'une salle de classe · d\'une feuille de cahier.', 'cm² · m² · dm² (environ 6 dm²) ou cm² (environ 620 cm²).'],
    ['Un carré a une aire de 36 cm². Combien mesure son côté ? Quel est son périmètre ?', '6 cm (6 × 6 = 36) ; périmètre 4 × 6 = 24 cm.'],
    ['Un rectangle a une aire de 24 cm² et une longueur de 8 cm. Quelle est sa largeur ?', '3 cm (8 × 3 = 24).'],
    ['Trouve deux rectangles de même aire (24 cm²) mais de périmètres différents.', '6 cm × 4 cm (périmètre 20 cm) et 12 cm × 2 cm (périmètre 28 cm), par exemple.'],
    ['Une pièce de 5 m sur 4 m doit être carrelée. Une boîte de carrelage couvre 2 m². Combien de boîtes faut-il ?', 'Aire : 5 × 4 = 20 m² ; 20 ÷ 2 = 10 boîtes.'],
  ], { titre: 'Rédaction type : « Aire d\'un rectangle »', lignes: [['A = L × l', 'J\'écris la règle.'], ['A = 9 cm × 4 cm = 36 cm²', 'Je remplace et je calcule.'], ['L\'aire est 36 cm².', 'Je conclus avec l\'unité d\'aire.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : l\'are et l\'hectare', [
    'Quand le système métrique est créé en 1795, on invente aussi une unité pour mesurer les terrains : l\'<b>are</b>, l\'aire d\'un carré de 10 m de côté (100 m²). L\'<b>hectare</b> vaut 100 ares : c\'est à peu près la surface d\'un terrain de football et demi.',
    'Les agriculteurs parlent encore aujourd\'hui en hectares pour mesurer leurs champs.',
  ]),
  quiz: [
    { q: 'Aire d\'un rectangle de 7 cm sur 4 cm ?', opts: ['22 cm²', '28 cm²', '28 cm'], correct: 1 },
    { q: '1 dm² = …', opts: ['10 cm²', '100 cm²', '1 000 cm²'], correct: 1 },
    { q: 'Aire d\'un carré de 10 m de côté ?', opts: ['40 m²', '100 m²', '20 m²'], correct: 1 },
  ],
});
})();
