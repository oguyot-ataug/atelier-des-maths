/* ============================================================
   5e · Planches : Pensée informatique et programmation (D3)
   Variables, entrées et sorties, programmes de calcul en blocs, boucles (robot), tracés de polygones.
   Les blocs reprennent les couleurs de la page Programmation (blocs de type Scratch).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const d = v => String(+(+v).toFixed(3)).replace('-', '−').replace('.', ',');
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(typeof r === 'number' ? d(r) : r)))) });
// Blocs : [famille, texte, blocs internes (boucle)].
const COUL = { evt: '#C88330', mvt: '#4C97FF', sty: '#0FBD8C', ctl: '#FFAB19', var: '#FF8C1A', ope: '#59C059', cap: '#5CB1D6' };
// Styles en ligne : ils doivent suivre dans la fenêtre d'impression des planches.
const BST = c => `background:${c};color:#fff;border-radius:6px;padding:4px 10px;-webkit-print-color-adjust:exact;print-color-adjust:exact;`;
const bloc = ([f, t, inner]) => inner ? `<div style="${BST(COUL[f])}"><span style="display:block;">${t}</span><div style="margin:3px 0 3px 12px;display:flex;flex-direction:column;gap:2px;">${inner.map(bloc).join('')}</div><span style="display:block;height:6px;"></span></div>` : `<div style="${BST(COUL[f])}">${t}</div>`;
const blocs = l => `<div style="display:inline-flex;flex-direction:column;gap:2px;margin:4px 0;font:600 .82rem Inter,Arial,sans-serif;">${l.map(bloc).join('')}</div>`;
const blanc = h => `<span style="background:#fff;color:#1C2B39;border-radius:4px;padding:0 4px;">${h}</span>`;
const FL = { h: '↑', b: '↓', g: '←', d: '→' };
const prog = p => `<span style="font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:2px;">${p.split('').map(c => FL[c] || c).join(' ')}</span>`;
function G(w, h, o){ const k = 30, m = 3, X = x => m + x * k + k / 2, Y = y => m + y * k + k / 2; let s = `<svg class="pl-libre" viewBox="0 0 ${w * k + 2 * m} ${h * k + 2 * m}" style="width:${w * k + 2 * m}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++) s += `<rect x="${m + x * k}" y="${m + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6"/>`;
  (o.obs || []).forEach(([x, y]) => { s += `<rect x="${m + x * k + 3}" y="${m + y * k + 3}" width="${k - 6}" height="${k - 6}" rx="5" fill="#8A6A2E"/>`; });
  if(o.chemin) s += `<polyline points="${o.chemin.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="3" stroke-dasharray="6 4"/>`;
  if(o.but) s += `<text x="${X(o.but[0])}" y="${Y(o.but[1]) + 7}" font-size="20" text-anchor="middle">⭐</text>`;
  if(o.fin) s += `<circle cx="${X(o.fin[0])}" cy="${Y(o.fin[1])}" r="9" fill="none" stroke="#2E9C6A" stroke-width="3"/>`;
  s += `<circle cx="${X(o.dep[0])}" cy="${Y(o.dep[1])}" r="9" fill="#2EA8C9"/>`;
  return s + '</svg>'; }
const chemin = (dep, p) => { const c = [dep.slice()]; let [x, y] = dep; p.split('').forEach(f => { x += { g: -1, d: 1 }[f] || 0; y += { h: -1, b: 1 }[f] || 0; c.push([x, y]); }); return c; };
// Programme avec boucle « répéter n fois (motif) », puis suite : texte affiché et chemin développé.
const boucle = (n, motif, suite) => ({ txt: `répéter ${n} fois ( ${prog(motif)} )${suite ? ' puis ' + prog(suite) : ''}`, p: motif.repeat(n) + (suite || '') });
const lire = (w, h, dep, P, obs) => { const c = chemin(dep, P.p), f = c[c.length - 1];
  return { eleve: `<div style="text-align:center;">${P.txt}</div>` + plX(G(w, h, { dep, obs }), { t: 'cases', mode: 'entoure', k: 30, ox: 3, oy: 3, w, h, att: [f] }), corr: `<div style="text-align:center;">${P.txt}</div>` + G(w, h, { dep, obs, chemin: c, fin: f }) }; };
const robot = (w, h, dep, but, obs, sol) => ({ eleve: plX(G(w, h, { dep, but, obs }), { t: 'robot', w, h, k: 30, m: 3, dep, but, obs }), corr: G(w, h, { dep, but, obs, chemin: chemin(dep, sol) }) + `<div style="text-align:center;">Par exemple : ${prog(sol)}</div>` });
// Tracé du stylo : polygone régulier à n côtés.
const poly = (n, c, w) => { const r = 34, pts = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (n % 2 ? 0 : Math.PI / n) + i * 2 * Math.PI / n; return [50 + r * Math.cos(a), 46 + r * Math.sin(a)]; });
  return `<svg class="pl-libre" viewBox="0 0 100 92" style="width:${w || 84}px;display:block;"><rect x="1" y="1" width="98" height="90" rx="8" fill="#fff" stroke="#C9DCEB"/><polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${c || '#0FBD8C'}" stroke-width="2.5"/></svg>`; };
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
PLANCHES['5e|Pensée informatique et programmation'] = [
  { titre: 'Variables, entrées et sorties', duree: '35 min',
    attendus: ['Suivre l\'évolution d\'une variable', 'Repérer l\'entrée et la sortie d\'un programme', 'Exécuter un programme pas à pas'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Que vaut la variable score à la fin ?',
        ...(() => { const P = blocs([['evt', 'quand le drapeau est cliqué'], ['var', 'mettre score à 5'], ['var', 'ajouter 3 à score'], ['var', 'mettre score à score × 2'], ['var', 'ajouter −4 à score']]), q = rmp([['score = @', 12]], 2);
          return { eleve: P + q.eleve, corr: P + q.corr }; })() },
      { etoiles: 1, col: 1, consigne: 'Programme : « demander un nombre ; mettre résultat à (réponse − 3) × 4 ; dire résultat ». Complète.',
        ...rmp([['Entrée 5 → sortie @', 8], ['Entrée 3 → sortie @', 0], ['Entrée 10 → sortie @', 28], ['Entrée 1 → sortie @', '−8']], 2) },
      { etoiles: 2, col: 1, consigne: 'Suis les variables a et b pas à pas : « mettre a à 2 ; mettre b à 7 ; mettre a à a + b ; mettre b à a − b ».',
        ...rmp([['Après la 3e instruction, a = @', 9], ['À la fin, a = @', 9], ['À la fin, b = @', 2]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure le rôle de chaque élément.',
        ...chx([['« demander un nombre » :', 'entrée', 'entrée · sortie · variable'], ['« dire résultat » :', 'sortie', 'entrée · sortie · variable'], ['« résultat » :', 'variable', 'entrée · sortie · variable']]) },
      { etoiles: 2, col: 1, consigne: 'Le programme précédent (« (réponse − 3) × 4 ») a dit 20. Quelle était l\'entrée ?',
        ...rmp([['Entrée : @', 8], ['Si la sortie est 0, l\'entrée était @', 3]], 2) },
      { etoiles: 1, col: 1, consigne: 'Que dit le lutin ?',
        ...(() => { const P = blocs([['evt', 'quand le drapeau est cliqué'], ['var', 'mettre prix à 12'], ['var', 'mettre quantité à 3'], ['sty', 'dire prix × quantité']]), q = rmp([['Le lutin dit @', 36]], 2);
          return { eleve: P + q.eleve, corr: P + q.corr }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris un programme qui demande la longueur du côté d\'un carré, puis qui dit son périmètre et son aire. Teste-le avec 7.',
        corr: cm1Redac('Programme', { suite: ['demander « côté ? » ; mettre c à réponse', 'dire 4 × c ; dire c × c'] }, 'Avec 7, le programme dit 28 (périmètre) puis 49 (aire).') },
    ] },
  { titre: 'Programmes de calcul et formules', duree: '35 min',
    attendus: ['Traduire un programme de calcul par une formule', 'Écrire un programme à partir d\'une formule', 'Tester un programme avec plusieurs entrées'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète le tableau des entrées et sorties du programme.',
        ...(() => { const P = blocs([['cap', 'demander « nombre ? »'], ['var', 'mettre x à réponse'], ['var', 'mettre y à 2 × x + 5'], ['sty', 'dire y']]), x = [0, 3, 6, 10], t = f => `<table class="pl-tab"><tr><th>x</th>${x.map(v => `<td>${v}</td>`).join('')}</tr><tr><th>y</th>${x.map(v => `<td>${f(v)}</td>`).join('')}</tr></table>`;
          return { eleve: P + t(() => B(1)), corr: P + t(v => R(2 * v + 5)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Entoure la formule de chaque programme (x est le nombre de départ).',
        ...chx([['Multiplier par 3, puis ajouter 1 :', '3x + 1', '3x + 1 · 3(x + 1)'], ['Ajouter 1, puis multiplier par 3 :', '3(x + 1)', '3x + 1 · 3(x + 1)'], ['Soustraire 4, puis prendre le double :', '2(x − 4)', '2x − 4 · 2(x − 4)']]) },
      { etoiles: 2, col: 1, consigne: 'Écris la formule du programme (x : nombre choisi).',
        ...rmp([['« × 5, puis − 2 » : @', '5x−2'], ['« + 7, puis × 2 » : @', '2(x+7)'], ['« × 4, puis + x » : @', '5x']], 5) },
      { etoiles: 2, col: 1, consigne: 'Programme : « choisir un nombre ; ajouter 6 ; multiplier par 2 ; soustraire 12 ». Teste-le.',
        ...rmp([['Avec 4 : @', 8], ['Avec 10 : @', 20], ['Avec 2,5 : @', 5], ['Que remarques-tu ? Le résultat est le @ du nombre choisi.', 'double']], 3) },
      { etoiles: 1, col: 1, consigne: 'Programme « × 3, puis + 4 ». Complète.',
        ...rmp([['Entrée 2 → sortie @', 10], ['Entrée 0 → sortie @', 4], ['Entrée −1 → sortie @', 1], ['Sortie 19 ← entrée @', 5]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Prouve que le programme précédent (« + 6 ; × 2 ; − 12 ») donne toujours le double du nombre choisi.',
        corr: cm1Redac('Preuve', '(x + 6) × 2 − 12 = 2x + 12 − 12 = 2x', 'Le résultat est toujours le double du nombre choisi.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris en blocs un programme qui demande le prix d\'un article et qui dit son prix après une remise de 20 %. Teste-le avec 45 €.',
        corr: cm1Redac('Programme', { suite: ['demander « prix ? » ; mettre p à réponse', 'mettre r à p × 20 : 100 ; dire p − r'] }, 'Avec 45 €, le programme dit 36 €.') },
    ] },
  { titre: 'Répéter : les boucles', duree: '40 min',
    attendus: ['Comprendre la boucle « répéter n fois »', 'Exécuter un programme avec une boucle', 'Raccourcir un programme grâce à une boucle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le robot (rond bleu) suit le programme. Entoure sa case d\'arrivée.', ...lire(7, 5, [0, 4], boucle(3, 'dh')) },
      { etoiles: 2, col: 1, consigne: 'Même consigne.', ...lire(7, 5, [0, 0], boucle(2, 'ddb', 'dd')) },
      { etoiles: 2, col: 1, consigne: 'Écris un programme pour amener le robot sur l\'étoile.', ...robot(7, 5, [0, 4], [6, 1], [[2, 4], [2, 3], [4, 1], [4, 2]], 'dhhhhdddddb') },
      { etoiles: 2, col: 1, consigne: 'Combien de fois le motif est-il répété ?',
        ...rmp([[`${prog('dddddddd')} = répéter @ fois ( → )`, 8], [`${prog('dhdhdhdh')} = répéter @ fois ( → ↑ )`, 4], [`${prog('ddbddbddb')} = répéter @ fois ( → → ↓ )`, 3]], 1) },
      { etoiles: 2, col: 1, consigne: 'Que vaut x à la fin ? « mettre x à 1 ; répéter 4 fois ( mettre x à x × 2 ) ».',
        ...rmp([['x = @', 16], ['Et avec « répéter 10 fois » : x = @', 1024]], 3) },
      { etoiles: 1, col: 1, consigne: 'Écris le programme avec une boucle (complète).',
        ...(() => { const l = [[`${prog('hhhhhh')} = répéter ${B(1)} fois ( ↑ )`, `${prog('hhhhhh')} = répéter ${R(6)} fois ( ↑ )`], [`${prog('gggghh')} = répéter ${B(1)} fois ( ← ) puis répéter ${B(1)} fois ( ↑ )`, `${prog('gggghh')} = répéter ${R(4)} fois ( ← ) puis répéter ${R(2)} fois ( ↑ )`]];
          return { eleve: plListe(l.map(x => x[0])), corr: plListe(l.map(x => x[1])) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris avec une boucle un programme qui fait dire au lutin les multiples de 7 de 7 à 70.',
        corr: cm1Redac('Programme', { suite: ['mettre n à 7', 'répéter 10 fois ( dire n ; ajouter 7 à n )'] }, 'Le lutin dit 7, 14, 21… jusqu\'à 70.') },
    ] },
  { titre: 'Tracer des figures avec le stylo', duree: '40 min',
    attendus: ['Lire un programme de tracé avec le stylo', 'Calculer l\'angle de rotation d\'un polygone régulier : 360 : n', 'Écrire un programme qui trace un polygone régulier'],
    exos: [
      { etoiles: 1, consigne: 'Quelle figure trace chaque programme ? Entoure la lettre de la bonne figure.',
        ...(() => { const F = [poly(3), poly(4, '#4C97FF'), poly(5, '#E35D3A'), poly(6, '#7A4FC0')], fig = duo(F.map((f, i) => col(f, '<b>' + 'ABCD'[i] + '</b>')));
          const q = chx([['répéter 4 fois ( avancer de 80 ; tourner de 90° ) :', 'B', 'A · B · C · D'], ['répéter 6 fois ( avancer de 50 ; tourner de 60° ) :', 'D', 'A · B · C · D'], ['répéter 3 fois ( avancer de 90 ; tourner de 120° ) :', 'A', 'A · B · C · D']]);
          return { eleve: fig + q.eleve, corr: fig + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Angle de rotation pour un polygone régulier (360 : nombre de côtés).',
        ...rmp([['Triangle équilatéral : @ °', 120], ['Carré : @ °', 90], ['Pentagone : @ °', 72], ['Octogone : @ °', 45]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète le programme qui trace un hexagone régulier de côté 60.',
        ...(() => { const e = blocs([['evt', 'quand le drapeau est cliqué'], ['sty', 'stylo en position d\'écriture'], ['ctl', `répéter ${blanc(B(1))} fois`, [['mvt', 'avancer de 60'], ['mvt', `tourner de ${blanc(B(1))} degrés`]]]]), c = blocs([['evt', 'quand le drapeau est cliqué'], ['sty', 'stylo en position d\'écriture'], ['ctl', `répéter ${blanc(R(6))} fois`, [['mvt', 'avancer de 60'], ['mvt', `tourner de ${blanc(R(60))} degrés`]]]]);
          return { eleve: e, corr: c }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Pour tracer un carré, on tourne 4 fois de 90° :', 'vrai'], ['Pour tracer un triangle équilatéral, on tourne de 60° :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Le lutin trace un carré de côté 50 pas. Complète.',
        ...rmp([['Longueur totale tracée : @ pas', 200], ['Nombre de rotations : @', 4], ['Somme des rotations : @ °', 360]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris un programme qui trace un octogone régulier de côté 40, puis un programme qui trace un rectangle de 100 sur 50.',
        corr: cm1Redac('Programmes', { suite: ['Octogone : répéter 8 fois ( avancer de 40 ; tourner de 45° )', 'Rectangle : répéter 2 fois ( avancer de 100 ; tourner de 90° ; avancer de 50 ; tourner de 90° )'] }, 'Pour un polygone régulier, l\'angle de rotation vaut 360 : nombre de côtés.') },
    ] },
];
})();
