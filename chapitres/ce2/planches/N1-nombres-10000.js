/* ============================================================
   CE2 · Planches : Nombres jusqu'à 10 000 (N1)
   Demandé : « créer le manuel de CE2 ». Unités, dizaines, centaines, milliers ; écrire un nombre de
   plusieurs façons (chiffres, lettres, décompositions) ; comparer, encadrer, ranger ; demi-droite
   graduée. Nombres jusqu'à 10 000 seulement.
   ============================================================ */
(() => {
const { rmp } = P3;
const { svg, L, T } = CM2G;
// Matériel de numération : m cubes de mille, c plaques de cent, d barres de dix, u petits cubes.
const multibase = (m, c, d, u) => { let g = '', x = 4;
  for(let i = 0; i < m; i++){ g += `<rect x="${x}" y="8" width="34" height="34" fill="#F2A93B" stroke="#8A5A10" stroke-width="1.4"/><polygon points="${x},8 ${x + 8},2 ${x + 42},2 ${x + 34},8" fill="#F7C873" stroke="#8A5A10"/><polygon points="${x + 34},8 ${x + 42},2 ${x + 42},36 ${x + 34},42" fill="#D98E1E" stroke="#8A5A10"/>`; x += 48; }
  for(let i = 0; i < c; i++){ g += `<rect x="${x}" y="12" width="28" height="28" fill="#2EA8C9" stroke="#1F3A5C" stroke-width="1.2"/>`; x += 32; }
  for(let i = 0; i < d; i++){ g += `<rect x="${x}" y="12" width="6" height="28" fill="#2E9C6A" stroke="#1F3A5C" stroke-width="1"/>`; x += 9; }
  x += 3; for(let i = 0; i < u; i++){ g += `<rect x="${x + Math.floor(i / 2) * 9}" y="${i % 2 ? 24 : 33}" width="6" height="6" fill="#E35D3A" stroke="#1F3A5C" stroke-width=".8"/>`; }
  x += Math.ceil(u / 2) * 9 + 4;
  return svg(x, 46, g, Math.min(300, x * 1.1)); };
// Demi-droite graduée de a à b (pas, étiquettes tous les etiq), points nommés [[valeur, nom]].
const droite = (a, b, pas, etiq, pts, px) => { const W = 440, X = v => 20 + (v - a) * (W - 50) / (b - a); let g = L([10, 30], [W - 6, 30], '#1F3A5C', 1.6);
  for(let v = a; v <= b + 1e-9; v += pas){ const e = Math.abs((v - a) / etiq - Math.round((v - a) / etiq)) < 1e-6; g += L([X(v), e ? 23 : 26], [X(v), e ? 37 : 34], '#1F3A5C', e ? 1.4 : 1) + (e ? T([X(v), 52], String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' '), { fs: 10 }) : ''); }
  (pts || []).forEach(([v, n]) => { g += `<circle cx="${X(v)}" cy="30" r="3.5" fill="#E35D3A"/>` + T([X(v), 16], n, { c: '#E35D3A', fs: 12 }); });
  return svg(W, 58, g, px || 400); };
PLANCHES['ce2|Nombres jusqu\'à 10 000'] = [
  { titre: 'Unités, dizaines, centaines, milliers', duree: '30 min',
    attendus: ['Dénombrer avec des groupes de dix, cent, mille', 'Connaître les relations entre unités de numération', 'Écrire le nombre représenté par du matériel'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre représenté.',
        eleve: plGrille([multibase(2, 3, 4, 5) + '<br>' + P3.B(4), multibase(1, 0, 6, 2) + '<br>' + P3.B(4), multibase(3, 2, 0, 0) + '<br>' + P3.B(4)], 3),
        corr: plGrille([multibase(2, 3, 4, 5) + '<br>' + P3.R('2 345'), multibase(1, 0, 6, 2) + '<br>' + P3.R('1 062'), multibase(3, 2, 0, 0) + '<br>' + P3.R('3 200')], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['1 dizaine = @ unités', 10], ['1 centaine = @ dizaines', 10], ['1 millier = @ centaines', 10], ['1 millier = @ unités', '1 000']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['4 centaines = @ dizaines', 40], ['30 dizaines = @ centaines', 3], ['2 milliers = @ centaines', 20], ['5 000 = @ milliers', 5]]) },
      { etoiles: 3, cahier: true, consigne: 'Une usine range les crayons par boîtes de 10, les boîtes par cartons de 10, et les cartons par caisses de 10. Elle a fabriqué 4 637 crayons. Combien de caisses pleines peut-elle remplir ? Combien de cartons pleins en tout ?',
        corr: cm1Redac('Caisses pleines', { suite: ['1 carton = 10 boîtes de 10, soit 100 crayons', '1 caisse = 10 cartons de 100, soit 1 000 crayons'] },'4 637 = 4 milliers et 637 : l\'usine remplit 4 caisses pleines.') + cm1Redac('Cartons pleins', '4 637 = 46 centaines et 37 unités', 'Un carton contient 100 crayons : il y a 46 cartons pleins en tout.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Dans 4 562, le chiffre des centaines : @', 5], ['Dans 4 562, le nombre de centaines : @', 45], ['Dans 7 038, le chiffre des dizaines : @', 3]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['10 centaines = @', '1 000'], ['100 dizaines = @ unités', '1 000'], ['3 milliers et 5 centaines = @', '3 500']], 4) },
    ] },
  { titre: 'Écrire un nombre de plusieurs façons', duree: '30 min',
    attendus: ['Écrire un nombre en chiffres et en lettres', 'Décomposer un nombre', 'Passer d\'une écriture à une autre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        ...rmp([['deux-mille-quatre-cent-six : @', '2 406'], ['sept-mille-quatre-vingts : @', '7 080'], ['mille-neuf-cent-quinze : @', '1 915']], 4) },
      { etoiles: 1, col: 1, consigne: 'Écris en lettres.',
        ...rmp([['3 500 : @', 'trois-mille-cinq-cents'], ['6 072 : @', 'six-mille-soixante-douze']], 12) },
      { etoiles: 2, col: 1, consigne: 'Complète les décompositions.',
        ...rmp([['5 432 = 5 000 + @ + 30 + 2', 400], ['8 096 = 8 000 + @ + 6', 90], ['4 708 = 4 milliers + @ centaines + 8 unités', 7]]) },
      { etoiles: 2, col: 1, consigne: 'Quel nombre est-ce ?',
        ...rmp([['3 milliers, 2 centaines, 5 unités : @', '3 205'], ['6 centaines, 4 milliers, 1 dizaine : @', '4 610'], ['24 centaines et 7 unités : @', '2 407']], 4) },
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.', ...P3.rmp([['neuf-mille-neuf : @', '9 009'], ['quatre-mille-trois-cent-vingt : @', '4 320'], ['huit-mille-soixante-dix : @', '8 070']], 4) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.', ...P3.rmp([['1 200 : @', 'mille-deux-cents'], ['5 080 : @', 'cinq-mille-quatre-vingts']], 12) },
      { etoiles: 2, col: 1, consigne: 'Décompose.', ...P3.rmp([['6 305 = 6 000 + @ + 5', 300], ['9 060 = @ + 60', '9 000'], ['2 718 = @ + @ + @ + @', '2 000', 700, 10, 8]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'écriture juste.', ...P3.chx([['3 040', 'trois-mille-quarante', 'trois-mille-quarante · trois-cent-quarante'], ['7 700', 'sept-mille-sept-cents', 'sept-mille-sept-cents · sept-mille-soixante-dix']]) },
      { etoiles: 2, col: 1, consigne: 'Quel nombre est-ce ?', ...P3.rmp([['5 milliers et 12 unités : @', '5 012'], ['40 centaines : @', '4 000'], ['2 milliers et 30 dizaines : @', '2 300']], 4) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['le plus grand nombre de 4 chiffres : @', '9 999'], ['le plus petit nombre de 4 chiffres : @', '1 000'], ['le plus grand nombre de 4 chiffres tous différents : @', '9 876']], 4) },
    ] },
  { titre: 'Comparer, encadrer, ranger', duree: '30 min',
    attendus: ['Comparer deux nombres avec <, > ou =', 'Encadrer un nombre entre deux centaines, deux milliers', 'Ranger des nombres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec <, > ou =.',
        eleve: plListe(['3 457 ' + plCase() + ' 3 475', '8 090 ' + plCase() + ' 8 009', '5 000 ' + plCase() + ' 4 999', '2 dizaines ' + plCase() + ' 20']),
        corr: plListe(['3 457 ' + P3.R('<') + ' 3 475', '8 090 ' + P3.R('>') + ' 8 009', '5 000 ' + P3.R('>') + ' 4 999', '2 dizaines ' + P3.R('=') + ' 20']) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux centaines qui se suivent, puis entre deux milliers.',
        ...rmp([['@ < 4 563 < @', '4 500', '4 600'], ['@ < 4 563 < @', '4 000', '5 000'], ['@ < 7 091 < @', '7 000', '7 100']], 4) },
      { etoiles: 2, consigne: 'Range ces nombres du plus petit au plus grand.',
        ...rmp([['6 102 · 6 210 · 6 012 · 6 120 : @', '6 012 < 6 102 < 6 120 < 6 210'], ['9 999 · 10 000 · 9 909 · 9 990 : @', '9 909 < 9 990 < 9 999 < 10 000']], 16) },
      { etoiles: 3, cahier: true, consigne: 'Trouve tous les nombres de quatre chiffres qu\'on peut écrire avec les chiffres 3, 0, 5 et 1 (chacun une seule fois) et qui sont compris entre 3 000 et 5 000.',
        corr: cm1Redac('Nombres qui commencent par 3', { suite: ['3 015 ; 3 051 ; 3 105', '3 150 ; 3 501 ; 3 510'] }, 'Le chiffre des milliers doit être 3 (5 000 est trop grand) : il y a 6 nombres, de 3 015 à 3 510.') },
      { etoiles: 1, col: 1, consigne: 'Complète avec <, > ou =.', ...P3.rmp([['6 543 @ 6 534', '>'], ['1 099 @ 1 100', '<'], ['7 000 @ 7 milliers', '=']], 1) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux dizaines qui se suivent.', ...P3.rmp([['@ < 3 456 < @', '3 450', '3 460'], ['@ < 9 995 < @', '9 990', '10 000']], 4) },
      { etoiles: 2, col: 1, consigne: 'Écris un nombre qui convient.', ...P3.rmp([['4 999 < @ < 5 001', '5 000'], ['2 300 < @ < 2 400', 'par exemple 2 350']], 4) },
      { etoiles: 2, col: 1, consigne: 'Entoure le plus petit nombre.', ...P3.chx([['', '4 099', '4 099 · 4 909 · 4 990'], ['', '6 008', '6 080 · 6 800 · 6 008']]) },
    ] },
  { titre: 'La demi-droite graduée', duree: '25 min',
    attendus: ['Lire l\'abscisse d\'un point sur une demi-droite graduée', 'Placer un nombre sur une demi-droite graduée', 'Repérer le pas de la graduation'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre de chaque point.',
        eleve: droite(2000, 3000, 100, 500, [[2300, 'A'], [2800, 'B'], [2600, 'C']]) + plListe(['A : ' + P3.B(4) + '   B : ' + P3.B(4) + '   C : ' + P3.B(4)]),
        corr: droite(2000, 3000, 100, 500, [[2300, 'A'], [2800, 'B'], [2600, 'C']]) + plListe(['A : ' + P3.R('2 300') + '   B : ' + P3.R('2 800') + '   C : ' + P3.R('2 600')]) },
      { etoiles: 2, consigne: 'Place les nombres 7 400 (point D), 7 650 (point E) et 7 950 (point F).',
        eleve: droite(7000, 8000, 50, 500, []),
        corr: droite(7000, 8000, 50, 500, [[7400, 'D'], [7650, 'E'], [7950, 'F']]) },
      { etoiles: 2, col: 1, consigne: 'Complète la suite.',
        ...rmp([['4 980 ; 4 990 ; @ ; @', '5 000', '5 010'], ['3 700 ; 3 800 ; @ ; @', '3 900', '4 000'], ['9 997 ; 9 998 ; @ ; @', '9 999', '10 000']], 4) },
      { etoiles: 3, col: 1, consigne: 'Entoure le nombre le plus proche de 5 000.',
        eleve: plListe(['4 890 · 5 120 · 4 950 · 5 080']),
        corr: plListe(['4 890 · 5 120 · ' + plEntoure('4 950') + ' · 5 080 (il est à 50 de 5 000)']) },
      { etoiles: 1, consigne: 'Écris le nombre de chaque point.',
        eleve: droite(5000, 6000, 100, 500, [[5200, 'G'], [5500, 'H'], [5900, 'K']]) + plListe(['G : ' + P3.B(4) + '   H : ' + P3.B(4) + '   K : ' + P3.B(4)]),
        corr: droite(5000, 6000, 100, 500, [[5200, 'G'], [5500, 'H'], [5900, 'K']]) + plListe(['G : ' + P3.R('5 200') + '   H : ' + P3.R('5 500') + '   K : ' + P3.R('5 900')]) },
      { etoiles: 2, col: 1, consigne: 'Complète la suite.', ...P3.rmp([['@ ; 6 000 ; 6 001', '5 999'], ['2 450 ; 2 500 ; @ ; @', '2 550', '2 600']], 4) },
    ] },
];
})();
