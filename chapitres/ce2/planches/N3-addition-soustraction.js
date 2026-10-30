/* ============================================================
   CE2 · Planches : Addition et soustraction posées (N3)
   Mots terme, somme, différence (au programme du CE2 : « La somme de 12 et de 25 est 37 ») ; additions
   de deux ou trois nombres et soustractions posées en colonnes (entiers jusqu'à 10 000), soustraction
   par compensation (« +10 » en haut, « 1+ » en bas) ; calcul mental quand c'est possible.
   Relecture CE2-N3 (28/10/2026) : corrigés posés (retenues, compensation, et cassage pour comparer),
   nombres de longueurs différentes, opérations à poser à l'écran case par case, plus d'exemples quand
   il reste de la place, deux problèmes côte à côte, choix sans répétition du calcul, tableau pour
   « juste ou fausse ».
   Relecture CE2-N3-P3-E3 (30/10/2026, « de la place pour en mettre d'autres à droite ») : 8 calculs sur deux colonnes
   (P2-E7 garde ses 6 calculs : la planche 2 est pleine).
   ============================================================ */
(() => {
const { rmp } = P3, B = P3.B, R = P3.R;
const nb = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const td = (c, st) => `<td style="width:28px;height:30px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.1rem;font-weight:700;padding:1px 0;${st || ''}">${c}</td>`;
const ROUGE = '#E35D3A';
// Addition posée (deux ou trois termes) : retenues calculées ; o.trous : résultat en cases (écran), o.rep : résultat-réponse.
function add(L, o){
  // Retenue écrite au-dessus du rang suivant (pas au-dessus du chiffre qui dépasse tous les termes).
  const s = L.reduce((x, y) => x + y, 0), lg = String(s).length, lt = Math.max(...L.map(n => String(n).length)), r = Array(lg).fill(' '); let c = 0;
  for(let j = 0; j < lg - 1; j++){ const t = L.reduce((x, n) => x + Math.floor(n / 10 ** j) % 10, 0) + c; c = Math.floor(t / 10); if(c && j + 1 < lt) r[j + 1] = String(c); }
  const ret = r.reverse().join('');
  return cm1Posee([[' ', String(L[0])], ...L.slice(1).map(n => ['+', String(n)]), [' ', String(s)]], o && (o.trous || o.rep) ? '' : ret, o);
}
// Soustraction posée sans marques (pour l'écran : cases du résultat).
const sous = (a, b, o) => cm1Posee([[' ', String(a)], ['−', String(b)], [' ', String(a - b)]], '', o);
// Soustraction par compensation : « 1 » rouge devant le chiffre du haut (+10), « +1 » rouge sous le chiffre du bas.
function compens(a, b){
  const A = String(a).split('').map(Number), n = A.length, Bd = String(b).padStart(n, ' ').split('').map(c => c === ' ' ? null : +c);
  const haut = Array(n).fill(false), bas = Array(n).fill(false); let ret = 0;
  for(let j = n - 1; j >= 0; j--){ const y = (Bd[j] || 0) + ret; if(ret) bas[j] = true; if(A[j] < y){ haut[j] = true; ret = 1; } else ret = 0; }
  const r = String(a - b).padStart(n, ' ');
  return `<table style="border-collapse:collapse;margin:5px auto;"><tr>${td('')}${A.map((d, j) => td(haut[j] ? `<sup style="color:${ROUGE};font-size:.7rem;">1</sup>${d}` : d)).join('')}</tr>`
    + `<tr>${td('−', 'color:#FF8208;')}${Bd.map((d, j) => td(d == null && !bas[j] ? '' : `${d == null ? '' : d}${bas[j] ? `<sub style="color:${ROUGE};font-size:.7rem;">+1</sub>` : ''}`)).join('')}</tr>`
    + `<tr style="border-top:2px solid #1C1B2E;">${td('')}${r.split('').map(d => td(d === ' ' ? '' : d, 'color:#FF8208;font-size:1.2rem;')).join('')}</tr></table>`;
}
// Soustraction par cassage : les chiffres cassés sont barrés, la nouvelle valeur est écrite au-dessus.
function cassage(a, b){
  const T = String(a).split('').map(Number), n = T.length, Bd = String(b).padStart(n, ' ').split('').map(c => c === ' ' ? 0 : +c), mod = Array(n).fill(false), cur = T.slice();
  for(let j = n - 1; j >= 0; j--){ if(cur[j] < Bd[j]){ let k = j - 1; while(cur[k] === 0){ cur[k] = 9; mod[k] = true; k--; } cur[k]--; mod[k] = true; cur[j] += 10; mod[j] = true; } }
  const r = String(a - b).padStart(n, ' ');
  return `<table style="border-collapse:collapse;margin:5px auto;"><tr>${td('')}${cur.map((d, j) => td(mod[j] ? `<span style="color:${ROUGE};font-size:.75rem;">${d}</span>` : '')).join('')}</tr>`
    + `<tr>${td('')}${T.map((d, j) => td(mod[j] ? `<s style="color:#8A93A3;">${d}</s>` : d)).join('')}</tr>`
    + `<tr>${td('−', 'color:#FF8208;')}${String(b).padStart(n, ' ').split('').map(d => td(d === ' ' ? '' : d)).join('')}</tr>`
    + `<tr style="border-top:2px solid #1C1B2E;">${td('')}${r.split('').map(d => td(d === ' ' ? '' : d, 'color:#FF8208;font-size:1.2rem;')).join('')}</tr></table>`;
}
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px 18px;flex-wrap:wrap;">${l.join('')}</div>`;
// « Pose et calcule » : sur papier, le calcul à poser dans le cahier ; corrigé posé ; à l'écran, l'opération déjà posée se remplit case par case.
function aPoser(L, fig){
  const txt = L.map(([a, op, b]) => `${nb(a)} ${op} ${nb(b)} = `);
  return { eleve: plListe(txt.map(t => t + B(4))), corr: duo(L.map(([a, op, b]) => op === '+' ? add([a, b]) : fig(a, b))),
    ecran: { eleve: duo(L.map(([a, op, b]) => op === '+' ? add([a, b], { trous: true }) : sous(a, b, { trous: true }))), corr: duo(L.map(([a, op, b]) => op === '+' ? add([a, b], { rep: true }) : sous(a, b, { rep: true }))) } };
}
// Vérifier une soustraction par une addition : tableau (une ligne par calcul), l'addition à compléter, « juste · fausse » à entourer.
function verif(L){
  const lig = (cells) => `<tr class="pl-item" style="display:table-row;">${cells.map(c => `<td style="padding:6px 14px;border-bottom:1px solid #E3E8EF;white-space:nowrap;">${c}</td>`).join('')}</tr>`;
  const tete = `<tr>${['La soustraction', 'Je vérifie avec une addition', 'Elle est…'].map(h => `<th style="padding:4px 14px;text-align:left;font-size:.9rem;color:#5B6472;">${h}</th>`).join('')}</tr>`;
  const t = rows => `<table class="pl-chxtab" style="border-collapse:collapse;margin:4px 0;">${tete}${rows}</table>`;
  return { eleve: t(L.map(([a, b, r]) => lig([`${nb(a)} − ${nb(b)} = ${nb(r)}`, `${nb(r)} + ${nb(b)} = ${B(4)}`, '<b>juste · fausse</b>'])).join('')),
    corr: t(L.map(([a, b, r]) => lig([`${nb(a)} − ${nb(b)} = ${nb(r)}`, `${nb(r)} + ${nb(b)} = ${R(nb(r + b))}`, P3.entoureParmi('juste · fausse', r + b === a ? 'juste' : 'fausse')])).join('')) };
}

PLANCHES['ce2|Addition et soustraction posées'] = [
  { titre: 'Les mots et l\'addition posée', duree: '35 min',
    attendus: ['Utiliser les mots terme, somme, différence', 'Poser une addition de deux ou trois nombres en alignant les chiffres de même rang', 'Calculer avec des retenues'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec « somme » ou « différence ».',
        ...rmp([['Le résultat d\'une addition est une @.', 'somme'], ['Le résultat d\'une soustraction est une @.', 'différence'], ['La @ de 50 et 20 est 70.', 'somme'], ['La @ de 50 et 20 est 30.', 'différence']], 7) },
      { etoiles: 1, col: 1, consigne: 'Complète avec « termes » ou « somme ».',
        ...rmp([['Dans 12 + 25 = 37, 12 et 25 sont les @.', 'termes'], ['Dans 12 + 25 = 37, 37 est la @.', 'somme'], ['Dans 60 − 37 = 23, 60 et 37 sont les @.', 'termes']], 6) },
      { etoiles: 1, consigne: 'Pose et calcule dans ton cahier, puis écris le résultat.',
        ...aPoser([[346, '+', 252], [1457, '+', 328], [2609, '+', 1394], [5087, '+', 96]]) },
      { etoiles: 2, consigne: 'Complète l\'addition posée (attention aux retenues).',
        ...(() => { const L = [[4586, 2738], [3095, 907], [1248, 365, 2070]], g = o => plGrille(L.map(t => add(t, o)), 3);
          return { eleve: g({ trous: true }), corr: g(), ecran: { eleve: g({ trous: true }), corr: g({ rep: true }) } }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une école a commandé 1 250 cahiers en septembre, 875 en janvier et 1 380 en avril. Combien de cahiers en tout ?',
        corr: cm1Redac('Nombre de cahiers', { pose: add([1250, 875, 1380]) }, 'On peut poser une addition de trois nombres. L\'école a commandé 3 505 cahiers.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au cinéma, il y a eu 1 435 spectateurs samedi et 2 078 dimanche. Combien de spectateurs pendant le week-end ?',
        corr: cm1Redac('Nombre de spectateurs', { pose: add([1435, 2078]) }, 'Il y a eu 3 513 spectateurs pendant le week-end.') },
      { etoiles: 2, consigne: 'Complète.', ...rmp([['La somme de 250 et 150 : @', 400], ['La différence entre 800 et 300 : @', 500], ['La somme de 1 000 et 99 : @', '1 099'], ['La différence entre 1 000 et 1 : @', 999], ['La somme de 2 500 et 2 500 : @', '5 000'], ['La différence entre 4 000 et 500 : @', '3 500']], 4) },
    ] },
  { titre: 'Poser une soustraction', duree: '40 min',
    attendus: ['Poser une soustraction en alignant les chiffres de même rang, même quand les nombres n\'ont pas le même nombre de chiffres', 'Calculer par compensation (+10 en haut, 1+ en bas)', 'Vérifier une soustraction par une addition'],
    exos: [
      { etoiles: 1, consigne: 'Pose et calcule dans ton cahier, puis écris le résultat. Attention à bien aligner les unités !',
        ...aPoser([[876, '−', 452], [5638, '−', 415], [9087, '−', 3064], [1249, '−', 37]], compens) },
      { etoiles: 2, consigne: 'Pose et calcule (il y a des compensations).',
        ...aPoser([[752, '−', 386], [4305, '−', 1678], [6000, '−', 2345], [3021, '−', 456]], compens) },
      { etoiles: 2, consigne: 'Vérifie chaque soustraction par une addition, puis entoure si elle est juste ou fausse.',
        ...verif([[835, 267, 568], [4000, 1250, 3850], [1503, 728, 775]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le mont Blanc mesure 4 806 m. Le puy de Dôme mesure 1 465 m. Quelle est la différence de hauteur entre ces deux sommets ?',
        corr: cm1Redac('Différence de hauteur', { pose: duo([compens(4806, 1465), cassage(4806, 1465)]) }, 'À gauche par compensation, à droite par cassage (on casse une centaine) : le mont Blanc mesure 3 341 m de plus que le puy de Dôme.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un avion vole à 9 450 m d\'altitude. Il descend jusqu\'à 3 875 m. De combien de mètres est-il descendu ?',
        corr: cm1Redac('Descente de l\'avion', { pose: duo([compens(9450, 3875), cassage(9450, 3875)]) }, 'À gauche par compensation, à droite par cassage : l\'avion est descendu de 5 575 m.') },
      { etoiles: 1, consigne: 'Calcule de tête.', ...rmp([['500 − 200 = @', 300], ['1 000 − 400 = @', 600], ['850 − 50 = @', 800], ['3 400 − 1 000 = @', '2 400'], ['7 000 − 3 000 = @', '4 000'], ['960 − 60 = @', 900], ['5 500 − 500 = @', '5 000'], ['2 080 − 80 = @', '2 000']], 3) },
      { etoiles: 2, consigne: 'Trouve le nombre manquant.', ...rmp([['@ − 125 = 300', 425], ['1 000 − @ = 650', 350], ['@ + 480 = 1 000', 520], ['2 000 − @ = 1 250', 750], ['@ − 600 = 1 400', '2 000'], ['@ + 3 500 = 5 000', '1 500']], 3) },
    ] },
  { titre: 'Calculer de tête quand c\'est possible', duree: '30 min',
    attendus: ['Choisir entre calcul mental et calcul posé', 'Ajouter ou soustraire des dizaines, des centaines, des milliers'],
    exos: [
      { etoiles: 1, consigne: 'Calcule de tête.',
        ...rmp([['3 400 + 500 = @', '3 900'], ['6 080 + 20 = @', '6 100'], ['5 000 − 300 = @', '4 700'], ['2 750 − 50 = @', '2 700'], ['1 600 + 400 = @', '2 000'], ['8 300 − 300 = @', '8 000'], ['4 950 + 50 = @', '5 000'], ['7 200 − 1 000 = @', '6 200']], 4) },
      { etoiles: 2, consigne: 'Dans chaque ligne, entoure le calcul que tu ferais de tête. Tu poseras l\'autre.',
        ...P3.chxTab([['Ligne A', '2 000 + 3 000', '2 000 + 3 000 · 2 487 + 3 659'], ['Ligne B', '4 500 − 100', '4 532 − 1 875 · 4 500 − 100'], ['Ligne C', '6 000 − 1', '6 000 − 1 · 6 023 − 1 847'], ['Ligne D', '3 900 + 100', '3 768 + 1 459 · 3 900 + 100']]) },
      { etoiles: 2, consigne: 'Complète.',
        ...rmp([['999 + @ = 1 000', 1], ['@ + 600 = 1 000', 400], ['7 500 + @ = 8 000', 500], ['@ − 1 000 = 4 500', '5 500'], ['2 750 + @ = 3 000', 250], ['@ + 90 = 1 000', 910], ['4 300 + @ = 5 000', 700], ['@ − 50 = 9 950', '10 000']], 4) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Mia a 1 000 points au jeu. Elle en perd 250, puis en gagne 600. Combien de points a-t-elle ?',
        corr: cm1Redac('Après la perte', '1 000 − 250 = 750', 'Mia a 750 points.') + cm1Redac('Après le gain', '750 + 600 = 1 350', 'Mia a 1 350 points.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un libraire a 2 500 livres. Il en vend 500 le lundi et 1 000 le samedi. Combien lui en reste-t-il ?',
        corr: cm1Redac('Après le lundi', '2 500 − 500 = 2 000', 'Il reste 2 000 livres.') + cm1Redac('Après le samedi', '2 000 − 1 000 = 1 000', 'Il reste 1 000 livres au libraire.') },
      { etoiles: 1, consigne: 'Calcule de tête.', ...rmp([['999 + 1 = @', '1 000'], ['2 500 + 500 = @', '3 000'], ['4 000 − 1 = @', '3 999'], ['1 200 + 800 = @', '2 000'], ['9 999 + 1 = @', '10 000'], ['6 000 − 10 = @', '5 990']], 3) },
    ] },
];
})();
