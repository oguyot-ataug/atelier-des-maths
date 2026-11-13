/* ============================================================
   5e · Planches : Fractions (N4)
   Quotient et égalité de quotients, simplification, comparaison, addition et soustraction, problèmes.
   Relecture du 12/11/2026 (16 remarques) : dénominateur imposé écrit dans la fraction ; listes sur deux colonnes ; « Complète
   avec <, > ou = » (comparer à 1) ; corrections qui expliquent pourquoi (réduction au même dénominateur, une égalité par ligne) ;
   calculs de fractions en colonne avec une lettre (« A = … », des pointillés pour chaque étape) ; corrections qui partent du
   calcul demandé (S = …, P = …) ; « Volume restant » (jamais « Litres restants »).
   ============================================================ */
(() => {
// Illustrations des problèmes concrets (chapitres/planches-dessins.js).
const DS = PL_DESSINS, illu = plIllu;
const pizza = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#E9B872" stroke="#A0622D" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="#E35D3A" opacity=".8"/>`
  + [[.3, .2], [-.35, .1], [.05, -.4], [-.1, .45]].map(([a, b]) => `<circle cx="${cx + a * r}" cy="${cy + b * r}" r="${r * .14}" fill="#FFF3D6"/>`).join('');
const pizzas5 = DS.fig(186, 84, [0, 1, 2, 3, 4].map(k => pizza(20 + k * 36, 22, 15)).join('') + [0, 1, 2, 3, 4, 5, 6, 7].map(k => DS.perso(18 + k * 21, 80, 26, k % 2 ? '#2E9C6A' : '#7A4FC0')).join(''), 160);
const reservoir = (() => { let g = DS.cylindre(44, 112, 32, 96, 72, '#F3F6FA');
  for(let k = 1; k < 4; k++) g += DS.ln([76, 112 - k * 24], [84, 112 - k * 24], '#1F3A5C', 1.2);
  return DS.fig(110, 124, g + DS.tx([44, 60], '60 L', { fs: 11 }) + `<rect x="80" y="104" width="22" height="7" fill="#8A93A3"/><path d="M102,107 l6,0" stroke="#8A93A3" stroke-width="3"/>`, 92); })();
const gateau12 = (() => { const cx = 56, cy = 54, r = 46; let g = `<circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#F7E7C6" stroke="#A0622D" stroke-width="1.4"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#F2B8C9" stroke="#A0622D" stroke-width="1.2"/>`;
  for(let k = 0; k < 12; k++){ const a = k * Math.PI / 6; g += DS.ln([cx, cy], [cx + r * Math.cos(a), cy + r * Math.sin(a)], '#A0622D', 1.1); }
  for(let k = 0; k < 12; k++){ const a = (k + .5) * Math.PI / 6; g += `<circle cx="${(cx + r * .72 * Math.cos(a)).toFixed(1)}" cy="${(cy + r * .72 * Math.sin(a)).toFixed(1)}" r="3.2" fill="#C0392B"/>`; }
  return DS.fig(112, 110, g, 96); })();
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac(), C = plCase();
const T = (a, b) => cm1Tex(`\\dfrac{${a}}{${b}}`);
const lt = '&lt;', gt = '&gt;';
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
// Comparer deux fractions : une case à compléter avec <, > ou = (bascule au clic à l'écran), demandé le 01/11/2026.
const signe = (it, f = h => `<span style="white-space:nowrap;display:inline-block;padding:4px 0;">${h}</span>`) => ({ eleve: plListe(it.map(([a, b]) => f(`${a} ${plCase()} ${b}`))), corr: plListe(it.map(([a, b, r, x]) => f(`${a} ${plRep(r === '<' ? '&lt;' : r === '>' ? '&gt;' : r)} ${b}`) + (x ? ` <small>${x}</small>` : ''))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Fractions égales : [a, b, c, d] → a/b = c/d, la case vide est la seconde fraction.
const egal = l => ({ eleve: plListe(l.map(([a, b]) => ligne(F(a, b), '=', Fr))), corr: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), '=', R(F(c, d))))) });
const cmp = l => ({ eleve: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), C, F(c, d)))), corr: plListe(l.map(([a, b, c, d]) => { const x = a * d - c * b; return ligne(F(a, b), R(x > 0 ? gt : x < 0 ? lt : '='), F(c, d)); })) });
// Opérations : [a, b, c, d, [n, d, étape]] → a/b op c/d = (étape =) n/d.
const ops = (l, op) => ({ eleve: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), op, F(c, d), '=', Fr))), corr: plListe(l.map(([a, b, c, d, r]) => ligne(F(a, b), op, F(c, d), '=', ...(r[2] ? [r[2], '='] : []), R(F(r[0], r[1]))))) });
// Les mêmes calculs sur deux colonnes (planche 4, exercices 1 et 2 : la feuille tient sur une page).
const ops2 = (l, op) => ({ eleve: plGrille(l.map(([a, b, c, d]) => ligne(F(a, b), op, F(c, d), '=', Fr)), 2), corr: plGrille(l.map(([a, b, c, d, r]) => ligne(F(a, b), op, F(c, d), '=', R(F(r[0], r[1])))), 2) });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
// Fraction dont le dénominateur est donné : seul le numérateur est à écrire (relecture 5e-N4-P2-E1 du 12/11/2026 : « Quel intérêt
// de demander sur 12 ? Autant l'écrire directement au dénominateur ! »).
// Numérateur et dénominateur de même hauteur : la barre au milieu, alignée sur celles des fractions voisines (relecture 5e-N4-P4-E6).
const fdT = x => /</.test(String(x)) ? x : `<span class="pl-fd-t">${x}</span>`; // nombre donné : police des fractions KaTeX
const fd = (haut, den) => `<span class="pl-fd fr-h"><span class="fr-n">${fdT(haut)}</span><span class="fr-b"></span><span class="fr-d">${fdT(den)}</span></span>`;
const pgcd = (a, b) => b ? pgcd(b, a % b) : a, ppcm = (a, b) => a / pgcd(a, b) * b;
// Pourquoi : une égalité ou une comparaison par ligne, sous la réponse (relecture 5e-N4-P3-E2, E5 : « La correction doit expliquer pourquoi »).
// Chaque égalité dans son propre bloc, sous la réponse (sur téléphone, un interligne fixe faisait chevaucher les fractions).
const pq = l => `<div style="flex-basis:100%;width:100%;margin:0 0 6px 4px;font-size:.92em;line-height:1.3;">${l.map(x => `<div style="padding:3px 0;white-space:nowrap;">${x}</div>`).join('')}</div>`;
const sg = (a, b, c, d) => { const x = a * d - c * b; return x > 0 ? gt : x < 0 ? lt : '='; };
const Fx = (a, b) => b === 1 ? String(a) : F(a, b); // un entier s'écrit sans dénominateur
// Comparer avec explication : [a, b, c, d] (c/d = 1 si d = 1 et c = 1 : « 1 »), réduits au même dénominateur.
const cmpX = (l, cols) => { const L = l.map(([a, b, c, d]) => { const m = d === 1 ? b : ppcm(b, d), A = a * m / b, Cc = c * m / d, s0 = sg(a, b, c, d), et = [];
    if(b !== m) et.push(`${F(a, b)} = ${F(A, m)}`); if(d !== m) et.push(`${Fx(c, d)} = ${F(Cc, m)}`); if(!(b === m && A === Cc)) et.push(`${F(A, m)} ${s0} ${F(Cc, m)}`); // 42/42 et 1 : « 1 = 42/42 » suffit
    return { e: ligne(F(a, b), C, Fx(c, d)), c: ligne(F(a, b), R(s0), Fx(c, d)) + pq(et) }; });
  return cols ? { eleve: plGrille(L.map(x => x.e), cols), corr: P3.enHaut(plGrille(L.map(x => x.c), cols)) } : { eleve: plListe(L.map(x => x.e)), corr: plListe(L.map(x => x.c)) }; };
// Calcul de fractions en colonne, une lettre par calcul : [lettre, expression, étape…, résultat] (relecture 5e-N4-P4-E3, E4, E5 :
// « Écrire des pointillés pour les étapes de réduction au même dénominateur. Donc A = … et à développer en colonne »).
// Une étape par bloc (relecture 5e-N4-P4-E5 du 13/11/2026 : « les fractions se superposent légèrement ») : une ligne à fractions
// prend la hauteur qu'il lui faut au lieu d'un interligne fixe.
const EF = (n, e, et, rep) => `<div style="white-space:nowrap;">${[`${n} = ${e}`, ...et.map(x => `${n} = ${rep(x)}`)].map(t => `<div class="pl-etape" style="display:flex;align-items:center;gap:4px;min-height:2.2em;margin:1px 0;">${t}</div>`).join('')}</div>`;
// À l'écran (relecture 5e-N4-P4 du 13/11/2026 : « La version écran ne peut pas convenir. L'idée est de faire des étapes avec
// réduction au même dénominateur ! ») : chaque étape garde sa forme, une fraction à compléter par terme (A = ▢/▢ + ▢/▢),
// puis la somme, puis la fraction simplifiée.
const SMX = new Map();
const etE = (x, corr) => { const m = SMX.get(x); if(!m) return corr ? R(x) : Fr;
  return m.f.map(([a, b]) => corr ? R(Fx(a, b)) : Fr).join(` ${m.op} `); };
const EFe = (n, e, et, corr) => `<div style="white-space:nowrap;">${[`${n} = ${e}`, ...et.map(x => `${n} = ${etE(x, corr)}`)].map(t => `<div style="display:flex;align-items:center;gap:6px;min-height:2.4em;padding:.6em 0;">${t}</div>`).join('')}</div>`;
const etf = (l, cols) => ({ eleve: P3.enHaut(plGrille(l.map(([n, e, ...et]) => EF(n, e, et, x => B(Math.max(4, Math.ceil(P3.lgVis(x) * .9))))), cols || 2)),
  corr: P3.enHaut(plGrille(l.map(([n, e, ...et]) => EF(n, e, et, R)), cols || 2)),
  ecran: { eleve: P3.enHaut(plGrille(l.map(([n, e, ...et]) => EFe(n, e, et, false)), cols || 2)), corr: P3.enHaut(plGrille(l.map(([n, e, ...et]) => EFe(n, e, et, true)), cols || 2)) } });
// Ligne d'une grille à fractions : hauteur fixe, contenu centré (la barre de fraction au milieu de la ligne).
const fx = h => `<div style="display:flex;align-items:center;min-height:3.1em;">${h}</div>`;
const sm = (op, ...f) => { const t = f.map(([a, b]) => Fx(a, b)).join(` ${op} `); SMX.set(t, { op, f }); return t; };
PLANCHES['5e|Fractions'] = [
  { titre: 'Une fraction est un quotient', duree: '35 min',
    attendus: ['Interpréter a/b comme le quotient de a par b', 'Trouver le nombre qui, multiplié par b, donne a', 'Passer de l\'écriture fractionnaire à l\'écriture décimale'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec une fraction.',
        eleve: plListe([ligne('7 ×', Fr, '= 3'), ligne('5 ×', Fr, '= 2'), ligne(Fr, '× 9 = 4'), ligne('12 ×', Fr, '= 1')]),
        corr: plListe([ligne('7 ×', R(F(3, 7)), '= 3'), ligne('5 ×', R(F(2, 5)), '= 2'), ligne(R(F(4, 9)), '× 9 = 4'), ligne('12 ×', R(F(1, 12)), '= 1')]) },
      { etoiles: 1, col: 1, consigne: 'Donne l\'écriture décimale.',
        eleve: plListe([ligne(F(3, 4), '=', B(2)), ligne(F(7, 2), '=', B(2)), ligne(F(1, 5), '=', B(2)), ligne(F(9, 10), '=', B(2)), ligne(F(13, 4), '=', B(2))]),
        corr: plListe([ligne(F(3, 4), '=', R('0,75')), ligne(F(7, 2), '=', R('3,5')), ligne(F(1, 5), '=', R('0,2')), ligne(F(9, 10), '=', R('0,9')), ligne(F(13, 4), '=', R('3,25'))]) },
      { etoiles: 1, col: 1, consigne: 'Écris sous forme de fraction décimale (dénominateur 10, 100…).',
        eleve: plListe([ligne('0,7 =', Fr), ligne('1,3 =', Fr), ligne('0,25 =', Fr), ligne('2,07 =', Fr)]),
        corr: plListe([ligne('0,7 =', R(F(7, 10))), ligne('1,3 =', R(F(13, 10))), ligne('0,25 =', R(F(25, 100))), ligne('2,07 =', R(F(207, 100)))]) },
      { etoiles: 2, col: 1, consigne: 'Encadre la fraction entre deux entiers consécutifs.',
        eleve: plListe([ligne(B(1), lt, F(17, 5), lt, B(1)), ligne(B(1), lt, F(25, 7), lt, B(1)), ligne(B(1), lt, F(9, 4), lt, B(1)), ligne(B(1), lt, F(100, 9), lt, B(1))]),
        corr: plListe([ligne(R(3), lt, F(17, 5), lt, R(4)), ligne(R(3), lt, F(25, 7), lt, R(4)), ligne(R(2), lt, F(9, 4), lt, R(3)), ligne(R(11), lt, F(100, 9), lt, R(12))]) },
      { etoiles: 2, col: 1, consigne: 'Entoure les fractions égales à 2.',
        ...(() => { const l = [[6, 3], [4, 8], [10, 5], [2, 1], [20, 10], [8, 2], [14, 7], [3, 6]];
          return { eleve: plGrille(l.map(([a, b]) => F(a, b)), 4), corr: plGrille(l.map(([a, b]) => a === 2 * b ? plEntoure(F(a, b)) : F(a, b)), 4) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(pizzas5, `On partage équitablement 5 pizzas entre 8 personnes. Quelle part chaque personne reçoit-elle ? Écris-la sous forme de fraction, puis en écriture décimale.`),
        corr: cm1Redac('Part de chacun', `5 : 8 = ${F(5, 8)} = 0,625`, `Chaque personne reçoit ${F(5, 8)} de pizza, soit 0,625 pizza.`) },
    ] },
  { titre: 'Égalité de quotients et simplification', duree: '40 min',
    attendus: ['Multiplier ou diviser le numérateur et le dénominateur par un même nombre', 'Simplifier une fraction', 'Reconnaître une fraction irréductible'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète le numérateur pour obtenir une fraction égale.',
        ...(() => { const l = [[3, 4, 9, 12], [2, 5, 8, 20], [7, 3, 35, 15], [5, 6, 15, 18], [4, 9, 12, 27], [1, 8, 5, 40]];
          return { eleve: plGrille(l.map(([a, b, , d]) => ligne(F(a, b), '=', fd(C, d))), 2), corr: plGrille(l.map(([a, b, c, d]) => ligne(F(a, b), '=', fd(R(c), d))), 2) }; })() },
      { etoiles: 1, col: 1, consigne: 'Simplifie (divise par le nombre indiqué).',
        eleve: plListe([ligne(F(12, 18), '=', Fr, '(par 6)'), ligne(F(15, 25), '=', Fr, '(par 5)'), ligne(F(28, 21), '=', Fr, '(par 7)'), ligne(F(40, 100), '=', Fr, '(par 20)')]),
        corr: plListe([ligne(F(12, 18), '=', R(F(2, 3))), ligne(F(15, 25), '=', R(F(3, 5))), ligne(F(28, 21), '=', R(F(4, 3))), ligne(F(40, 100), '=', R(F(2, 5)))]) },
      { etoiles: 2, col: 1, consigne: 'Simplifie le plus possible.',
        ...(() => { const l = [[18, 24, 3, 4], [35, 45, 7, 9], [36, 16, 9, 4], [72, 27, 8, 3], [20, 30, 2, 3], [42, 56, 3, 4]];
          return { eleve: plGrille(l.map(([a, b]) => ligne(F(a, b), '=', Fr)), 2), corr: plGrille(l.map(([a, b, c, d]) => ligne(F(a, b), '=', R(F(c, d)))), 2) }; })() },
      { etoiles: 2, col: 1, consigne: 'La fraction est-elle irréductible ? Entoure.',
        ...ch([[`${T(9, 14)} :`, 'oui'], [`${T(15, 21)} :`, 'non'], [`${T(11, 22)} :`, 'non'], [`${T(8, 27)} :`, 'oui']], 'oui · non') },
      { etoiles: 2, col: 1,
        ...(() => { const l = [[3, 5], [6, 10], [9, 15], [5, 3], [12, 20], [30, 50], [6, 15], [15, 25]], ok = ([a, b]) => a * 5 === b * 3;
          return { eleve: plGrille(l.slice(1).map(([a, b]) => F(a, b)), 4), corr: plGrille(l.slice(1).map(p => ok(p) ? plEntoure(F(...p)) : F(...p)), 4) }; })(),
        consigne: `Entoure les fractions égales à ${T(3, 5)}.` },
      { etoiles: 3, col: 1, cahier: true, consigne: `Dans une classe de 28 élèves, 21 sont demi-pensionnaires. Écris la fraction des élèves demi-pensionnaires, puis simplifie-la. Que signifie-t-elle ?`,
        corr: cm1Redac('Fraction des élèves demi-pensionnaires', `${F(21, 28)} = ${F(3, 4)} (on divise par 7)`, `Les ${F(3, 4)} des élèves sont demi-pensionnaires : 3 élèves sur 4.`) },
    ] },
  { titre: 'Comparer des fractions', duree: '40 min',
    attendus: ['Comparer deux fractions de même dénominateur', 'Comparer en réduisant au même dénominateur (dénominateurs multiples l\'un de l\'autre)', 'Ranger des fractions'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        ...(() => { const l = [[7, 9, 4, 9], [11, 13, 15, 13], [5, 5, 9, 9], [3, 2, 1, 2], [2, 7, 5, 7], [6, 11, 6, 11]];
          return { eleve: plGrille(l.map(([a, b, c, d]) => ligne(F(a, b), C, F(c, d))), 3), corr: plGrille(l.map(([a, b, c, d]) => ligne(F(a, b), R(sg(a, b, c, d)), F(c, d))), 3) }; })() },
      { etoiles: 2, col: 1, consigne: 'Réduis au même dénominateur, puis compare.', ...cmpX([[2, 3, 7, 12], [5, 4, 11, 8], [7, 10, 3, 5], [13, 6, 9, 4]], 2) },
      { etoiles: 2, col: 1, consigne: 'Compare à 1 : complète avec &lt;, &gt; ou =.', ...cmpX([[17, 16, 1, 1], [99, 100, 1, 1], [42, 42, 1, 1], [5, 8, 1, 1]], 2) },
      { etoiles: 2, consigne: `Range dans l'ordre croissant : ${T(5, 6)} ; ${T(2, 3)} ; ${T(7, 12)} ; ${T(3, 4)} ; ${T(1, 2)} (pense aux douzièmes).`,
        eleve: '<div style="text-align:center;">' + ligne(Fr, lt, Fr, lt, Fr, lt, Fr, lt, Fr) + '</div>',
        // Relecture 5e-N4-P3-E4 du 12/11/2026 : « La correction doit expliquer » : les fractions en douzièmes, puis le rangement.
        corr: plGrille([`${F(5, 6)} = ${F(10, 12)}`, `${F(2, 3)} = ${F(8, 12)}`, `${F(3, 4)} = ${F(9, 12)}`, `${F(1, 2)} = ${F(6, 12)}`], 4)
          + '<div style="text-align:center;margin:6px 0;">' + ligne(F(6, 12), lt, F(7, 12), lt, F(8, 12), lt, F(9, 12), lt, F(10, 12)) + '</div>'
          + '<div style="text-align:center;">' + ligne(R(F(1, 2)), lt, R(F(7, 12)), lt, R(F(2, 3)), lt, R(F(3, 4)), lt, R(F(5, 6))) + '</div>' },
      { etoiles: 2, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        ...cmpX([[3, 8, 1, 4], [5, 9, 2, 3], [11, 10, 6, 5], [7, 7, 13, 14]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Lucas a lu ${T(3, 5)} de son livre et Nora ${T(7, 10)} du même livre. Qui en a lu le plus ? Justifie.`,
        corr: cm1Redac('Qui en a lu le plus ?', `${F(3, 5)} = ${F(6, 10)} et ${F(6, 10)} &lt; ${F(7, 10)}`, 'Nora a lu la plus grande partie du livre.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Trouve une fraction comprise entre ${T(3, 4)} et 1, puis une fraction comprise entre ${T(1, 3)} et ${T(1, 2)}.`,
        // Une étape par ligne, sans mot ni « : » dans les calculs (relecture du 12/11/2026 : « le ":" après 8/8 […] on croit que c'est une division »).
        corr: cm1Redac(`Fraction comprise entre ${F(3, 4)} et 1`, { suite: [`${F(3, 4)} = ${F(6, 8)}`, `1 = ${F(8, 8)}`, `${F(6, 8)} < ${F(7, 8)} < ${F(8, 8)}`] }, `La fraction ${F(7, 8)} est comprise entre ${F(3, 4)} et 1.`)
          + cm1Redac(`Fraction comprise entre ${F(1, 3)} et ${F(1, 2)}`, { suite: [`${F(1, 3)} = ${F(4, 12)}`, `${F(1, 2)} = ${F(6, 12)}`, `${F(4, 12)} < ${F(5, 12)} < ${F(6, 12)}`] }, `La fraction ${F(5, 12)} est comprise entre ${F(1, 3)} et ${F(1, 2)}. On a écrit les fractions avec un dénominateur plus grand pour « faire de la place » entre elles.`) },
    ] },
  { titre: 'Additionner et soustraire des fractions', duree: '40 min',
    attendus: ['Additionner ou soustraire deux fractions de même dénominateur', 'Réduire au même dénominateur avant d\'additionner', 'Simplifier le résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...ops2([[3, 11, 5, 11, [8, 11]], [7, 9, 2, 9, [5, 9]], [15, 8, 3, 8, [12, 8]], [5, 13, 4, 13, [9, 13]]], '+') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...ops2([[9, 5, 2, 5, [7, 5]], [11, 12, 7, 12, [4, 12]], [20, 7, 6, 7, [14, 7]], [17, 10, 9, 10, [8, 10]]], '−') },
      { etoiles: 2, consigne: 'Réduis au même dénominateur, calcule, puis simplifie si possible. Une étape par ligne.',
        ...etf([['A', sm('+', [1, 3], [5, 6]), sm('+', [2, 6], [5, 6]), F(7, 6)], ['B', sm('+', [3, 4], [1, 12]), sm('+', [9, 12], [1, 12]), F(10, 12), F(5, 6)],
          ['C', sm('+', [2, 5], [7, 20]), sm('+', [8, 20], [7, 20]), F(15, 20), F(3, 4)], ['D', sm('+', [1, 2], [3, 8]), sm('+', [4, 8], [3, 8]), F(7, 8)]], 4) },
      { etoiles: 2, consigne: 'Réduis au même dénominateur, calcule, puis simplifie si possible. Une étape par ligne.',
        ...etf([['A', sm('−', [5, 6], [1, 3]), sm('−', [5, 6], [2, 6]), F(3, 6), F(1, 2)], ['B', sm('−', [7, 4], [3, 8]), sm('−', [14, 8], [3, 8]), F(11, 8)],
          ['C', sm('−', [9, 10], [2, 5]), sm('−', [9, 10], [4, 10]), F(5, 10), F(1, 2)], ['D', sm('−', [2, 3], [1, 6]), sm('−', [4, 6], [1, 6]), F(3, 6), F(1, 2)]], 4) },
      { etoiles: 2, consigne: 'Calcule (écris l\'entier sous forme de fraction). Écris une étape par ligne.',
        ...etf([['A', sm('+', [2, 1], [1, 3]), sm('+', [6, 3], [1, 3]), F(7, 3)], ['B', sm('−', [1, 1], [5, 9]), sm('−', [9, 9], [5, 9]), F(4, 9)],
          ['C', sm('−', [7, 4], [1, 1]), sm('−', [7, 4], [4, 4]), F(3, 4)], ['D', sm('−', [3, 1], [1, 2]), sm('−', [6, 2], [1, 2]), F(5, 2)]], 4) },
      // Pleine largeur (les exercices 3 à 5 passent sur toute la largeur, relecture du 12/11/2026) : quatre exemples sur deux colonnes ;
      // le dénominateur imposé est écrit dans la fraction (comme en planche 2, « Autant l'écrire directement au dénominateur ! »).
      { etoiles: 2, consigne: 'Complète.',
        // Grille remplie ligne par ligne (relecture 5e-N4-P4-E6 du 13/11/2026 : « mauvais alignements des traits de fraction entre deux
        // colonnes ») : les deux exemples d'une même ligne ont la même hauteur, barres de fraction à la même hauteur.
        eleve: plGrille([ligne(F(2, 7), '+', Fr, '=', cm1Tex('1')), ligne(fd(C, 6), '−', F(1, 6), '=', F(1, 2)), ligne(F(1, 4), '+', fd(C, 4), '=', F(3, 4)), ligne(F(3, 5), '+', Fr, '=', cm1Tex('1'))].map(fx), 2),
        corr: plGrille([ligne(F(2, 7), '+', R(F(5, 7)), '=', cm1Tex('1')), ligne(fd(R(4), 6), '−', F(1, 6), '=', F(1, 2)), ligne(F(1, 4), '+', fd(R(2), 4), '=', F(3, 4)), ligne(F(3, 5), '+', R(F(2, 5)), '=', cm1Tex('1'))].map(fx), 2) },
      { etoiles: 3, cahier: true, consigne: `Calcule ${T(1, 2)} + ${T(1, 4)} + ${T(1, 8)}, puis simplifie si possible. Que manque-t-il pour obtenir 1 ?`,
        // Relecture 5e-N4-P4-E7 du 12/11/2026 : « S = 1/2 + 1/4 + 1/8 et développer en colonne. La correction doit toujours partir du calcul demandé ».
        corr: cm1Redac('Somme des trois fractions', [{ nom: 'S', lignes: [`${F(1, 2)} + ${F(1, 4)} + ${F(1, 8)}`, `${F(4, 8)} + ${F(2, 8)} + ${F(1, 8)}`, F(7, 8)] }], `La somme vaut ${F(7, 8)} ; ${F(7, 8)} est irréductible.`)
          + cm1Redac('Ce qui manque pour obtenir 1', [{ nom: 'M', lignes: [`1 − ${F(7, 8)}`, `${F(8, 8)} − ${F(7, 8)}`, F(1, 8)] }], `Il manque ${F(1, 8)} pour obtenir 1.`) },
    ] },
  { titre: 'Résoudre des problèmes avec des fractions', duree: '45 min',
    attendus: ['Calculer une fraction d\'une quantité', 'Additionner des fractions dans un problème', 'Trouver la part restante'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([[`${T(3, 4)} de 20 = @`, 15], [`${T(2, 5)} de 35 = @`, 14], [`${T(5, 6)} de 42 = @`, 35], [`${T(7, 10)} de 3 = @`, '2,1']], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([[`${T(1, 4)} d\'une heure = @ min`, 15], [`${T(2, 3)} d\'une heure = @ min`, 40], [`${T(3, 5)} de 1 km = @ m`, 600], [`${T(3, 8)} de 1 kg = @ g`, 375]], 3) },
      { etoiles: 2, col: 1, consigne: 'Dans deux collèges, les élèves viennent à pied, en bus ou en voiture. Quelle fraction vient en voiture ?',
        eleve: plListe([ligne('À pied :', F(1, 4), '; en bus :', F(1, 2), '. En voiture :', Fr), ligne('À pied :', F(2, 5), '; en bus :', F(3, 10), '. En voiture :', Fr)]),
        corr: plListe([ligne('À pied :', F(1, 4), '; en bus :', F(1, 2), '. En voiture :', R(F(1, 4))), ligne('À pied :', F(2, 5), '; en bus :', F(3, 10), '. En voiture :', R(F(3, 10)))]) },
      { etoiles: 2, col: 1, consigne: 'Complète par = ou ≠.',
        ...P3.egal([[`${T(1, 2)} + ${T(1, 3)}`, T(2, 5), 0], [`${T(3, 4)} × 100`, '75', 1], [`${T(1, 3)} + ${T(1, 3)} + ${T(1, 3)}`, '1', 1], [`${T(1, 2)} × ${T(1, 2)}`, T(1, 4), 1]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(reservoir, `Un réservoir de 60 L est rempli aux ${T(3, 4)}. On utilise ${T(1, 3)} de sa contenance totale. Combien de litres reste-t-il ?`),
        // Relecture 5e-N4-P5-E5 du 12/11/2026 : « On ne dit pas Litres restants, c'est affreux. Volume restant » ; pas de « de » dans un calcul.
        corr: cm1Redac('Volume d\'eau au départ', [{ nom: 'V', lignes: [`${F(3, 4)} × 60`, '3 × 15', '45'] }], 'Le réservoir contient 45 L au départ.')
          + cm1Redac('Volume utilisé', [{ nom: 'U', lignes: [`${F(1, 3)} × 60`, '20'] }], 'On utilise 20 L.')
          + cm1Redac('Volume restant', [{ nom: 'R', lignes: ['45 − 20', '25'] }], 'Il reste 25 L dans le réservoir.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Lina dépense ${T(2, 5)} de son argent de poche en livres et ${T(1, 4)} en sorties. Quelle fraction de son argent lui reste-t-il ? Elle avait 40 € : combien lui reste-t-il ?`,
        corr: cm1Redac('Fraction restante', `1 − ${F(2, 5)} − ${F(1, 4)} = ${F(20, 20)} − ${F(8, 20)} − ${F(5, 20)} = ${F(7, 20)}`, `Il lui reste les ${F(7, 20)} de son argent.`) + cm1Redac('Somme restante', `${F(7, 20)} × 40 = 7 × ${F(40, 20)} = 7 × 2 = 14`, 'Il lui reste 14 €.') },
      { etoiles: 3, cahier: true, consigne: illu(gateau12, `Un gâteau est coupé en 12 parts égales. Paul en mange ${T(1, 4)}, Léa ${T(1, 3)} et Sam ${T(1, 6)}. Reste-t-il du gâteau ? Si oui, combien de parts ?`),
        // Relecture 5e-N4-P5-E7 du 12/11/2026 : « partir du calcul du départ et commencer par une lettre comme P = … ».
        corr: cm1Redac('Fraction du gâteau mangée', [{ nom: 'P', lignes: [`${F(1, 4)} + ${F(1, 3)} + ${F(1, 6)}`, `${F(3, 12)} + ${F(4, 12)} + ${F(2, 12)}`, F(9, 12)] }], `Ils ont mangé les ${F(9, 12)} du gâteau, soit 9 parts sur 12.`)
          + cm1Redac('Parts restantes', [{ nom: 'N', lignes: ['12 − 9', '3'] }], 'Oui, il reste du gâteau : 3 parts.') },
    ] },
];
})();
