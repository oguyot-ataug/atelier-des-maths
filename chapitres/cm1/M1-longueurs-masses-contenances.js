/* ============================================================
   CHAPITRE : Longueurs, masses, contenances (CM1, M1, période 1)
   Programme du cycle 3 (CM1) : comparer, estimer, mesurer des longueurs, des masses, des
   contenances ; unités usuelles et relations entre elles (km, m, dm, cm, mm ; t, kg, g ; L, dL,
   cL, mL) ; sens des préfixes kilo, déci, centi, milli. Le programme demande de NE PAS utiliser
   de tableau de conversion : chaque conversion est justifiée par une phrase (« 1 m = 100 cm, donc
   3 m = 3 × 100 cm = 300 cm »). Nombres entiers d'au plus 4 chiffres (périodes 1-2).
   ============================================================ */
(() => {
// Règle graduée en cm et mm avec le segment [AB] de 7 cm 4 mm.
function regle(){
  const u = 52, x0 = 20; let s = `<svg viewBox="0 0 ${x0 * 2 + 9 * u} 110" style="width:100%;max-width:520px;display:block;margin:6px auto;">`;
  s += `<line x1="${x0}" y1="18" x2="${x0 + 7.4 * u}" y2="18" stroke="#E35D3A" stroke-width="3"/><circle cx="${x0}" cy="18" r="3.5" fill="#E35D3A"/><circle cx="${x0 + 7.4 * u}" cy="18" r="3.5" fill="#E35D3A"/>
  <text x="${x0}" y="12" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk" text-anchor="middle">A</text><text x="${x0 + 7.4 * u}" y="12" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk" text-anchor="middle">B</text>`;
  s += `<rect x="${x0 - 12}" y="28" width="${9 * u + 24}" height="64" rx="5" fill="#FFF6D6" stroke="#B8962E"/>`;
  for(let i = 0; i <= 90; i++){ const x = x0 + i * u / 10, h = i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 9;
    s += `<line x1="${x}" y1="28" x2="${x}" y2="${28 + h}" stroke="#5B4A12" stroke-width="${i % 10 === 0 ? 1.4 : .8}"/>`;
    if(i % 10 === 0) s += `<text x="${x}" y="66" font-size="12" text-anchor="middle" fill="#5B4A12" font-family="Space Grotesk">${i / 10}</text>`; }
  return s + `<text x="${x0 + 8.7 * u}" y="84" font-size="11" text-anchor="end" fill="#5B4A12" font-family="Space Grotesk">cm</text></svg>`;
}
const P = (t, c) => `<b style="color:${c};">${t}</b>`;
const KILO = P('kilo', '#7A4FC0'), DECI = P('déci', '#2EA8C9'), CENTI = P('centi', '#2E9C6A'), MILLI = P('milli', '#E35D3A');
cm1Chapitre({
  titre: 'Longueurs, masses, contenances', slug: 'longueurs-masses-contenances',
  cours: `
${cm1Lecon(1, 'Mesurer une longueur')}
${cm1Regle('Pour mesurer un segment avec une règle, on place le <b>0 de la règle</b> sur une extrémité du segment et on lit la graduation à l\'autre extrémité.')}
<div class="figure-wrap">${regle()}</div>
${ce2AnimRegle('cm1-lmc-regle', { presets: [{ nom: '7 cm 4 mm', cm: 7, mm: 4 }, { nom: '6 cm 5 mm', cm: 6, mm: 5 }, { nom: '9 cm', cm: 9, mm: 0 }] })}
${cm1Exemple('Le segment [AB] (le segment d\'extrémités A et B) mesure :', ['7 cm et 4 mm, qu\'on écrit <b>7 cm 4 mm</b> ;', 'ou encore <b>74 mm</b> : 7 cm = 70 mm,', 'et 70 mm + 4 mm = 74 mm.'])}

${cm1Lecon(2, 'Les unités de longueur')}
${cm1Def(`L'unité principale est le <b>mètre (m)</b>. Les autres unités se forment avec des <b>préfixes</b> :<ul style="margin:6px 0 0;padding-left:18px;line-height:1.9;">
<li>${KILO} veut dire « <b>1 000 fois plus grand</b> » : 1 <b>k</b>m = 1 000 m ;</li>
<li>${DECI} veut dire « <b>10 fois plus petit</b> » : 1 m = 10 <b>d</b>m ;</li>
<li>${CENTI} veut dire « <b>100 fois plus petit</b> » : 1 m = 100 <b>c</b>m ;</li>
<li>${MILLI} veut dire « <b>1 000 fois plus petit</b> » : 1 m = 1 000 <b>m</b>m.</li></ul>`, 'Unités')}
${cm1Regle(cm1Liste(['1 cm = 10 mm', '1 dm = 10 cm', '1 m = 100 cm', '1 km = 1 000 m']), 'À retenir')}
${cm1Exemple('Ordres de grandeur :', ['l\'épaisseur d\'une pièce de monnaie : environ 2 mm ;', 'la largeur d\'un doigt : environ 1 cm ;', 'la hauteur d\'une porte : environ 2 m ;', 'la distance parcourue en 15 minutes de marche : environ 1 km.'])}

${cm1Lecon(3, 'Les unités de masse')}
${cm1Def(`L'unité principale est le <b>gramme (g)</b>. On utilise aussi le <b>kilogramme (kg)</b> et la <b>tonne (t)</b>.${cm1Liste(['1 kg = 1 000 g', '1 t = 1 000 kg'])}`, 'Unités')}
${ce2AnimBalance('cm1-lmc-balance', { presets: [{ nom: '2 kg 500 g et 2 050 g', g: ['sac A', 2500, '#C9A24A', '2 kg 500 g'], d: ['sac B', 2050, '#8E9AA8', '2 050 g'], montrer: true, fin: '2 kg 500 g = 2 500 g, et 2 500 g &gt; 2 050 g.' }, { nom: '1 kg et 1 000 g', g: ['farine', 1000, '#C9A24A', '1 kg'], d: ['sucre', 1000, '#8E9AA8', '1 000 g'], montrer: true }] })}
${cm1Exemple('Ordres de grandeur :', ['un trombone : environ 1 g ;', 'une tablette de chocolat : 100 g ;', 'un paquet de sucre : 1 kg ;', 'une voiture : environ 1 t.'])}
${cm1Rem('On mesure une masse avec une <b>balance</b>. Dans la vie courante, on dit souvent « poids », mais en mathématiques on parle de <b>masse</b>.')}

${cm1Lecon(4, 'Les unités de contenance')}
${cm1Def(`La <b>contenance</b> d'un récipient, c'est la quantité de liquide qu'il peut contenir. L'unité principale est le <b>litre (L)</b>.<br>
1 L = 10 ${DECI}litres (dL) = 100 ${CENTI}litres (cL) = 1 000 ${MILLI}litres (mL)`, 'Unités')}
${ce2AnimVerser('cm1-lmc-verser', {})}
${cm1Exemple('Ordres de grandeur :', ['une cuillère à café : 5 mL ;', 'une canette : 33 cL ;', 'une bouteille d\'eau : 1 L ou 1,5 L ;', 'un seau : 10 L.'])}

${cm1Lecon(5, 'Convertir sans tableau : on raisonne avec une phrase')}
${cm1Regle('Pour changer d\'unité, on part d\'une <b>relation connue</b> (par exemple 1 m = 100 cm) et on multiplie.')}
${cm1Exemple('Exemples :', ['4 m = 4 × 100 cm = <b>400 cm</b>, car 1 m = 100 cm.', '3 kg = 3 × 1 000 g = <b>3 000 g</b>, car 1 kg = 1 000 g.', '2 L = 2 × 100 cL = <b>200 cL</b>, car 1 L = 100 cL.', '2 km 350 m = 2 000 m + 350 m = <b>2 350 m</b>.', 'Dans l\'autre sens : 5 000 g, c\'est 5 fois 1 000 g, donc <b>5 kg</b>.'])}
${cm1Astuce(`Pour comparer deux mesures, on les exprime d'abord <b>dans la même unité</b>. Pour 1 m 20 cm et 125 cm :${cm1Liste(['1 m 20 cm = 120 cm', '120 cm &lt; 125 cm'])}`)}
`,
  methode: `
${cm1Demo('lmc-conv', 'Convertir une longueur', 'Combien de centimètres y a-t-il dans 3 m 45 cm ?')}
${cm1Demo('lmc-comp', 'Comparer deux masses', 'Qu\'est-ce qui est le plus lourd : un sac de 2 kg 500 g ou un sac de 2 050 g ?')}
${cm1Demo('lmc-cont', 'Résoudre un problème de contenance', 'Une bouteille contient 1 L de jus. On remplit des verres de 20 cL. Combien de verres peut-on remplir ?')}
`,
  demos: [
    ['lmc-conv', [
      { expr: '1 m = 100 cm', note: 'On part de la relation connue entre le mètre et le centimètre.' },
      { expr: '3 m = 3 × 100 cm = 300 cm', note: 'Il y a 3 mètres, donc 3 fois 100 cm.' },
      { expr: '300 cm + 45 cm = 345 cm', note: 'On ajoute les 45 cm.' },
      { expr: '3 m 45 cm = 345 cm', note: 'On conclut.' },
    ]],
    ['lmc-comp', [
      { expr: '2 kg 500 g   et   2 050 g', note: 'Les deux masses ne sont pas écrites dans la même unité : on convertit la première en grammes.' },
      { expr: '2 kg = 2 × 1 000 g = 2 000 g', note: 'Car 1 kg = 1 000 g.' },
      { expr: '2 kg 500 g = 2 000 g + 500 g = 2 500 g', note: 'On ajoute les 500 g.' },
      { expr: '2 500 g &gt; 2 050 g', note: 'On compare deux nombres entiers : le sac de 2 kg 500 g est le plus lourd.' },
    ]],
    ['lmc-cont', [
      { expr: '1 L = 100 cL', note: 'On exprime la contenance de la bouteille dans la même unité que celle des verres.' },
      { expr: '5 × 20 cL = 100 cL', note: 'On cherche combien de fois 20 cL il y a dans 100 cL.' },
      { expr: 'On peut remplir 5 verres.', note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('lmc', [
    [`Quelle unité choisir (km, m, cm ou mm) ?${cm1Liste(['la longueur d\'un crayon', 'la distance de Paris à Lyon', 'l\'épaisseur d\'un livre', 'la longueur de la cour'])}`,
      cm1Redac('Choix des unités', { suite: ['un crayon : cm (environ 15 cm)', 'Paris-Lyon : km (environ 470 km)', 'un livre : mm (environ 20 mm)', 'la cour : m (environ 40 m)'] }, 'On choisit l\'unité qui donne un nombre facile à lire.')],
    [`Convertis.${cm1Liste(['6 m en cm', '8 cm en mm', '3 km en m', '5 dm en cm'])}`,
      cm1Redac('Conversions de longueurs', { suite: ['6 m = 6 × 100 cm = 600 cm', '8 cm = 8 × 10 mm = 80 mm', '3 km = 3 × 1 000 m = 3 000 m', '5 dm = 5 × 10 cm = 50 cm'] }, 'On part chaque fois d\'une relation connue, puis on multiplie.')],
    [`Convertis.${cm1Liste(['7 kg en g', '4 000 g en kg', '2 t en kg'])}`,
      cm1Redac('Conversions de masses', { suite: ['7 kg = 7 × 1 000 g = 7 000 g', '4 000 g = 4 × 1 000 g = 4 kg', '2 t = 2 × 1 000 kg = 2 000 kg'] }, '7 kg font 7 000 g, 4 000 g font 4 kg et 2 t font 2 000 kg.')],
    [`Convertis.${cm1Liste(['3 L en cL', '2 L en mL', '4 dL en cL'])}`,
      cm1Redac('Conversions de contenances', { suite: ['3 L = 3 × 100 cL = 300 cL', '2 L = 2 × 1 000 mL = 2 000 mL', '4 dL = 4 × 10 cL = 40 cL'] }, '3 L font 300 cL, 2 L font 2 000 mL et 4 dL font 40 cL.')],
    [`Convertis.${cm1Liste(['1 m 75 cm en cm', '4 kg 250 g en g', '6 cm 3 mm en mm'])}`,
      cm1Redac('1 m 75 cm en cm', ['100 cm + 75 cm', '175 cm'], '1 m 75 cm, c\'est 175 cm.')
      + cm1Redac('4 kg 250 g en g', { nom: 'B', lignes: ['4 000 g + 250 g', '4 250 g'] }, '4 kg 250 g, c\'est 4 250 g.')
      + cm1Redac('6 cm 3 mm en mm', { nom: 'C', lignes: ['60 mm + 3 mm', '63 mm'] }, '6 cm 3 mm, c\'est 63 mm.')],
    ['Range du plus léger au plus lourd : 1 kg 200 g ; 1 020 g ; 2 kg ; 1 002 g.',
      cm1Redac('Les masses en grammes', { suite: ['1 kg 200 g = 1 200 g', '2 kg = 2 000 g'] }, 'Du plus léger au plus lourd : 1 002 g, 1 020 g, 1 kg 200 g, 2 kg.')],
    ['Trace un segment [CD] de 6 cm 5 mm. Combien mesure-t-il en millimètres ?',
      cm1Redac('Longueur de [CD] en mm', ['60 mm + 5 mm', '65 mm'], 'Le segment [CD] mesure 65 mm.')],
    ['Un cycliste parcourt 2 km 800 m le matin et 1 km 500 m l\'après-midi. Quelle distance a-t-il parcourue, en mètres ?',
      cm1Redac('Distance parcourue', ['2 800 m + 1 500 m', '4 300 m'], 'Le cycliste a parcouru 4 300 m, c\'est-à-dire 4 km 300 m.')],
  ], { titre: 'Rédaction type : « Convertir »', lignes: [['1 kg = 1 000 g', 'J\'écris la relation connue.'], ['5 kg = 5 × 1 000 g = 5 000 g', 'Je multiplie et je conclus.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : la naissance du mètre', [
    'Autrefois, chaque région avait ses propres mesures : le <b>pied</b>, le <b>pouce</b>, la <b>toise</b>, la <b>livre</b>… et elles changeaient d\'une ville à l\'autre ! Il était très difficile de commercer.',
    'Pendant la Révolution française, en 1791, on décide de créer une mesure « pour tous les temps, pour tous les peuples » : le <b>mètre</b>. Deux savants, <b>Delambre</b> et <b>Méchain</b>, mesurent pendant 6 ans la distance entre Dunkerque et Barcelone pour le définir à partir de la taille de la Terre.',
    'On invente en même temps le <b>gramme</b> et le <b>litre</b>, avec les préfixes kilo, déci, centi, milli. C\'est le <b>système métrique</b>, utilisé aujourd\'hui presque partout dans le monde.',
  ]),
  quiz: [
    { q: '1 km = …', opts: ['100 m', '1 000 m', '10 000 m'], correct: 1 },
    { q: '3 kg = …', opts: ['300 g', '3 000 g', '30 g'], correct: 1 },
    { q: 'Quelle est la contenance d\'une canette ?', opts: ['33 mL', '33 cL', '33 L'], correct: 1 },
    { q: '5 cm 2 mm = …', opts: ['52 mm', '502 mm', '7 mm'], correct: 0 },
  ],
});
})();
