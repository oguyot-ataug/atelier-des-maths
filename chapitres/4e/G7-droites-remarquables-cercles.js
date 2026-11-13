/* ============================================================
   CHAPITRE : Droites remarquables et cercles (4e, G7) -- NOUVEAU PROGRAMME (BO n° 10 du 05/03/2026, rentrée 2027)
   Demandé le 13/11/2026 (passage de la 4e au nouveau programme, voir CH4 dans app.js). Le programme de 4e nomme :
   « droites remarquables : médiatrices, médianes, hauteurs, bissectrices » ; « triangle rectangle inscrit dans un
   demi-cercle ; centre du cercle circonscrit » ; « reconnaître un parallélogramme particulier par ses diagonales » ;
   « construire des rectangles sans équerre ». Les droites remarquables ont été vues en 6e et 5e : le chapitre en fait le
   bilan et DÉMONTRE (concours des médiatrices, cercle circonscrit du triangle rectangle par les diagonales du rectangle).
   Utilise r4Ex / R4_REM / r4Colonne (4e N1) et le moteur g4* (4e G1), chargés avant.
   ============================================================ */

const DR4_BLEU = '#0C5BA0', DR4_VERT = '#1E7B34', DR4_ORANGE = '#E07B00', DR4_ROUGE = '#C0392B', DR4_VIOLET = '#7A4FC0', DR4_ENCRE = '#1C1B2E';
const dr4Tex = s => `<span class="tex"${s.length < 26 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const dr4Sub = (P, Q) => [P[0] - Q[0], P[1] - Q[1]], dr4D = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
// Centre du cercle circonscrit, orthocentre, centre de gravité, centre du cercle inscrit.
function dr4O(A, B, C){
  const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])), a2 = A[0] ** 2 + A[1] ** 2, b2 = B[0] ** 2 + B[1] ** 2, c2 = C[0] ** 2 + C[1] ** 2;
  return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d, (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d];
}
const dr4G = (A, B, C) => [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
const dr4H = (A, B, C) => { const O = dr4O(A, B, C); return [A[0] + B[0] + C[0] - 2 * O[0], A[1] + B[1] + C[1] - 2 * O[1]]; };
const dr4I = (A, B, C) => { const a = dr4D(B, C), b = dr4D(A, C), c = dr4D(A, B), s = a + b + c; return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s]; };
// Pied de la perpendiculaire à (PQ) passant par M.
const dr4Pied = (M, P, Q) => { const u = dr4Sub(Q, P), t = ((M[0] - P[0]) * u[0] + (M[1] - P[1]) * u[1]) / (u[0] ** 2 + u[1] ** 2); return [P[0] + t * u[0], P[1] + t * u[1]]; };
const dr4Cercle = (O, r, c, tirets) => `<circle cx="${O[0].toFixed(1)}" cy="${O[1].toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${c || DR4_BLEU}" stroke-width="1.8"${tirets ? ' stroke-dasharray="5 4"' : ''}/>`;
// Petit carré d'angle droit en V, entre les directions V→P et V→Q.
function dr4Droit(V, P, Q, k){
  k = k || 9; const u = dr4Sub(P, V), w = dr4Sub(Q, V), lu = Math.hypot(...u), lw = Math.hypot(...w);
  const a = [V[0] + u[0] / lu * k, V[1] + u[1] / lu * k], b = [a[0] + w[0] / lw * k, a[1] + w[1] / lw * k], c = [V[0] + w[0] / lw * k, V[1] + w[1] / lw * k];
  return `<polyline points="${[a, b, c].map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${DR4_ENCRE}" stroke-width="1.3"/>`;
}
// Figure : o = { T (sommets), noms, cercles: [[O, r, c]], seg: [[P, Q, c, w, tirets]], droites: [[P, Q, c]], pts: [[P, nom, ref]], extra, max }.
function dr4Fig(o){
  const T = o.T || [], G = T.length ? g4Centre(T) : [0, 0], noms = o.noms || ['A', 'B', 'C'], bornes = [...T];
  let h = T.length === 3 ? `<polygon points="${T.map(p => p.join(',')).join(' ')}" fill="${o.fond || 'rgba(12,91,160,.07)'}" stroke="none"/>` : '';
  (o.cercles || []).forEach(([O, r, c, t]) => { h += dr4Cercle(O, r, c, t); bornes.push([O[0] - r, O[1] - r], [O[0] + r, O[1] + r]); });
  (o.droites || []).forEach(([P, Q, c]) => { const A = g4Lerp(P, Q, -.25), B = g4Lerp(P, Q, 1.25); h += g4Seg(A, B, c, 1.5); bornes.push(A, B); });
  T.forEach((P, i) => { if(T.length > 1 && !(o.ouvert && i === T.length - 1)) h += g4Seg(P, T[(i + 1) % T.length], DR4_ENCRE, 2); });
  (o.seg || []).forEach(([P, Q, c, w, t]) => { h += g4Seg(P, Q, c, w || 2.4, t); bornes.push(P, Q); });
  if(o.extra) h += o.extra;
  (o.pts || []).forEach(([P, nom, ref]) => { h += g4Pt(P) + (nom ? g4Nom(P, ref || G, nom) : ''); bornes.push(P); });
  T.forEach((P, i) => { h += g4Pt(P) + g4Nom(P, G, noms[i]); });
  return g4Svg(h, bornes, o.max || 300);
}
const dr4Deux = (a, b) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4px 18px;align-items:center;">${a}${b}</div>`;
const dr4Grille = cases => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px 16px;align-items:start;margin:8px 0 12px;">${cases.map(([t, f]) => `<div style="text-align:center;"><div style="font-weight:700;color:${DR4_BLEU};">${t}</div>${f}</div>`).join('')}</div>`;

/* ---- Figures du bilan : un même triangle, ses quatre familles de droites ---- */
const DR4_T = [[150, 30], [40, 200], [290, 200]];
function dr4FigMed(){ const [A, B, C] = DR4_T, O = dr4O(A, B, C), r = dr4D(O, A); let s = '';
  [[A, B], [B, C], [C, A]].forEach(([P, Q]) => { const M = g4Lerp(P, Q, .5), n = [-(Q[1] - P[1]), Q[0] - P[0]]; s += g4Seg([M[0] - n[0] * .45, M[1] - n[1] * .45], [M[0] + n[0] * .45, M[1] + n[1] * .45], DR4_ORANGE, 1.5) + g4Traits(P, M, 1) + g4Traits(M, Q, 1) + dr4Droit(M, P, [M[0] + n[0], M[1] + n[1]], 7); });
  return dr4Fig({ T: DR4_T, cercles: [[O, r, DR4_BLEU]], extra: s, pts: [[O, 'O', [O[0], O[1] - 30]]], max: 230 }); }
function dr4FigHaut(){ const [A, B, C] = DR4_T, H = dr4H(A, B, C); let s = '';
  [[A, B, C], [B, C, A], [C, A, B]].forEach(([S, P, Q]) => { const K = dr4Pied(S, P, Q); s += g4Seg(S, K, DR4_VERT, 1.6) + dr4Droit(K, S, Q, 7); });
  return dr4Fig({ T: DR4_T, extra: s, pts: [[H, 'H', [H[0] + 30, H[1] + 10]]], max: 230 }); }
function dr4FigMedianes(){ const [A, B, C] = DR4_T, G = dr4G(A, B, C); let s = '';
  [[A, B, C], [B, C, A], [C, A, B]].forEach(([S, P, Q]) => { const M = g4Lerp(P, Q, .5); s += g4Seg(S, M, DR4_VIOLET, 1.6) + g4Traits(P, M, 2) + g4Traits(M, Q, 2); });
  return dr4Fig({ T: DR4_T, extra: s, pts: [[G, 'G', [G[0] - 30, G[1] - 10]]], max: 230 }); }
function dr4FigBiss(){ const [A, B, C] = DR4_T, I = dr4I(A, B, C), r = dr4D(I, dr4Pied(I, B, C)); let s = '';
  [A, B, C].forEach(S => { s += g4Seg(S, g4Lerp(S, I, 1.35), DR4_ROUGE, 1.5); });
  return dr4Fig({ T: DR4_T, cercles: [[I, r, DR4_ROUGE]], extra: s, pts: [[I, 'I', [I[0] + 30, I[1] + 30]]], max: 230 }); }

/* ---- Triangle rectangle et cercle ---- */
const DR4_RO = [170, 130], DR4_RR = 110, dr4Sur = deg => [DR4_RO[0] + DR4_RR * Math.cos(deg * Math.PI / 180), DR4_RO[1] - DR4_RR * Math.sin(deg * Math.PI / 180)];
const DR4_RB = dr4Sur(180), DR4_RC = dr4Sur(0), DR4_RA = dr4Sur(62);
function dr4FigRect(opts){
  opts = opts || {}; const A = opts.A || DR4_RA, s = dr4Droit(A, DR4_RB, DR4_RC) + (opts.mediane ? g4Seg(A, DR4_RO, DR4_ORANGE, 2.4) + g4Traits(DR4_RB, DR4_RO, 1) + g4Traits(DR4_RO, DR4_RC, 1) + g4Traits(A, DR4_RO, 1) : '');
  return dr4Fig({ T: [A, DR4_RB, DR4_RC], noms: opts.noms || ['A', 'B', 'C'], cercles: opts.sansCercle ? [] : [[DR4_RO, DR4_RR, DR4_BLEU]], seg: [[DR4_RB, DR4_RC, DR4_ORANGE, 3]], extra: s, pts: [[DR4_RO, opts.nomO || 'O', [DR4_RO[0], DR4_RO[1] - 30]]], max: opts.max || 280 });
}
// Rectangle formé par deux diamètres d'un même cercle (rectangle sans équerre).
function dr4FigRectSansEquerre(etape, max){
  const O = [150, 120], r = 95, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
  const A = P(20), B = P(130), C = P(200), D = P(310);
  const s = (etape >= 1 ? g4Seg(A, C, DR4_ORANGE, 1.8) : '') + (etape >= 2 ? g4Seg(B, D, DR4_VERT, 1.8) : '') + (etape >= 3 ? [[A, B], [B, C], [C, D], [D, A]].map(([X, Y]) => g4Seg(X, Y, DR4_ENCRE, 2.4)).join('') : '');
  const pts = [[O, 'O', [O[0] + 10, O[1] + 40]]].concat(etape >= 1 ? [[A, 'A', O], [C, 'C', O]] : [], etape >= 2 ? [[B, 'B', O], [D, 'D', O]] : []);
  return dr4Fig({ cercles: [[O, r, DR4_BLEU]], extra: s, pts, max: max || 250 });
}

document.getElementById('cours-demo-droites-remarquables-cercles-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les droites remarquables d'un triangle</h3></div>
<p style="margin:4px 0 8px;">Tu as rencontré ces droites en 6e et en 5e. Dans chaque triangle, les trois droites d'une même famille sont <b>concourantes</b> : elles passent par un même point.</p>
${dr4Grille([['Les médiatrices', dr4FigMed()], ['Les hauteurs', dr4FigHaut()], ['Les médianes', dr4FigMedianes()], ['Les bissectrices', dr4FigBiss()]])}
<div style="overflow-x:auto;"><table class="dr4-tab" style="border-collapse:collapse;margin:0 auto 12px;background:#fff;font-size:.92rem;">
  <tr style="background:#F4F5F8;font-weight:700;"><td>Droites</td><td>Définition</td><td>Point de concours</td><td>Ce qu'il faut savoir</td></tr>
  <tr><td><b style="color:${DR4_ORANGE};">Médiatrices</b></td><td>La médiatrice d'un côté est la perpendiculaire à ce côté en son milieu.</td><td><b>O</b>, centre du cercle circonscrit</td><td>O est à la même distance des trois sommets : OA = OB = OC.</td></tr>
  <tr><td><b style="color:${DR4_VERT};">Hauteurs</b></td><td>La hauteur issue d'un sommet est la droite qui passe par ce sommet et qui est perpendiculaire au côté opposé.</td><td><b>H</b>, l'orthocentre</td><td>Il peut être en dehors du triangle (triangle qui a un angle obtus).</td></tr>
  <tr><td><b style="color:${DR4_VIOLET};">Médianes</b></td><td>La médiane issue d'un sommet est la droite qui passe par ce sommet et par le milieu du côté opposé.</td><td><b>G</b>, le centre de gravité</td><td>Une médiane partage le triangle en deux triangles de même aire.</td></tr>
  <tr><td><b style="color:${DR4_ROUGE};">Bissectrices</b></td><td>La bissectrice d'un angle le partage en deux angles de même mesure.</td><td><b>I</b>, centre du cercle inscrit</td><td>I est à la même distance des trois côtés.</td></tr>
</table></div>
<style>.dr4-tab td{border:1px solid #C9D6E6;padding:6px 9px;vertical-align:top;}</style>

<span class="prop-badge">Propriété (rappel)</span>
<div class="def-box">Un point est sur la <b>médiatrice</b> d'un segment <b>si et seulement si</b> il est à la <b>même distance</b> des deux extrémités de ce segment.</div>
<p class="example-title">Démonstration : pourquoi les trois médiatrices sont-elles concourantes ?</p>
${r4Ex('', [
  ['Les médiatrices de [AB] et de [BC] se coupent en un point O.', 'Elles ne sont pas parallèles, car (AB) et (BC) ne le sont pas.'],
  ['O est sur la médiatrice de [AB], donc OA = OB.', ''],
  ['O est sur la médiatrice de [BC], donc OB = OC.', ''],
  ['Donc OA = OC : O est aussi sur la médiatrice de [AC].', 'Les trois médiatrices passent par O.'],
  ['Le cercle de centre O et de rayon OA passe par A, B et C : c\'est le <b>cercle circonscrit</b> au triangle.', ''],
])}

<div class="lesson-header"><span class="num">2</span><h3>Triangle rectangle et cercle circonscrit</h3></div>
<span class="prop-badge">Théorème 1</span>
<div class="def-box"><b>Si</b> un triangle est <b>rectangle</b>, <b>alors</b> le centre de son cercle circonscrit est le <b>milieu de son hypoténuse</b>.</div>
${dr4Deux(`<ul class="example-list"><li>Le triangle ABC est rectangle en A.</li><li>D'après le théorème, son cercle circonscrit a pour centre O, le milieu de l'hypoténuse [BC], et pour diamètre [BC].</li><li>Conséquence : OA = OB = OC, donc la <b>médiane</b> [AO] issue de l'angle droit mesure la <b>moitié de l'hypoténuse</b> : ${dr4Tex('AO = \\dfrac{BC}{2}')}.</li></ul>`, dr4FigRect({ mediane: true }))}

<span class="prop-badge">Théorème 2 (réciproque)</span>
<div class="def-box"><b>Si</b> un triangle est inscrit dans un cercle qui a pour <b>diamètre</b> l'un de ses côtés, <b>alors</b> ce triangle est <b>rectangle</b>. L'angle droit est au sommet opposé à ce diamètre.</div>
${dr4Deux(`<ul class="example-list"><li>Le point A est sur le cercle de diamètre [BC].</li><li>D'après le théorème, le triangle ABC est rectangle en A.</li><li>On dit aussi : un triangle inscrit dans un <b>demi-cercle</b> est rectangle.</li></ul>`, dr4FigRect({ A: dr4Sur(128) }))}
<div class="redaction-note" ${R4_REM}>Où que soit le point A sur le cercle (sauf en B et en C), l'angle ${dr4Tex('\\widehat{BAC}')} est droit ! Un « équivalent » du théorème 2 : si, dans un triangle, la médiane relative à un côté mesure la moitié de ce côté, alors le triangle est rectangle.</div>

<p class="example-title">Démonstration du théorème 1 :</p>
${dr4Deux(r4Ex('', [
  ['ABC est rectangle en A ; O est le milieu de [BC]. On note D le symétrique de A par rapport à O.', ''],
  ['Les diagonales [AD] et [BC] du quadrilatère ABDC ont le même milieu O : ABDC est un parallélogramme.', ''],
  ['Ce parallélogramme a un angle droit en A : c\'est un rectangle.', ''],
  ['Les diagonales d\'un rectangle ont la même longueur : AD = BC. Donc OA = OB = OC.', 'O est le centre du cercle circonscrit à ABC.'],
]), (() => { const D = [2 * DR4_RO[0] - DR4_RA[0], 2 * DR4_RO[1] - DR4_RA[1]]; return dr4Fig({ T: [DR4_RA, DR4_RB, DR4_RC], cercles: [[DR4_RO, DR4_RR, '#9CC8E8', true]], seg: [[DR4_RA, D, DR4_ORANGE, 1.8], [DR4_RB, D, DR4_VERT, 1.8], [DR4_RC, D, DR4_VERT, 1.8]], extra: dr4Droit(DR4_RA, DR4_RB, DR4_RC), pts: [[DR4_RO, 'O', [DR4_RO[0] + 25, DR4_RO[1] - 25]], [D, 'D', DR4_RO]], max: 280 }); })())}

<div class="lesson-header"><span class="num">3</span><h3>Reconnaître un parallélogramme particulier par ses diagonales</h3></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li><b>Si</b> un parallélogramme a des diagonales de <b>même longueur</b>, <b>alors</b> c'est un <b>rectangle</b>.</li>
  <li><b>Si</b> un parallélogramme a des diagonales <b>perpendiculaires</b>, <b>alors</b> c'est un <b>losange</b>.</li>
  <li><b>Si</b> un parallélogramme a des diagonales de même longueur <b>et</b> perpendiculaires, <b>alors</b> c'est un <b>carré</b>.</li>
</ul></div>
<div class="redaction-note" ${R4_REM}>Rappel : un quadrilatère dont les diagonales ont le <b>même milieu</b> est un parallélogramme. Par exemple, un quadrilatère dont les diagonales ont le même milieu et la même longueur est un rectangle.</div>

<div class="sub-header"><span class="letter">A</span><h4>Construire un rectangle sans équerre</h4></div>
${dr4Deux(`<ul class="example-list"><li>On trace un cercle de centre O, puis deux <b>diamètres</b> [AC] et [BD].</li><li>Les diagonales [AC] et [BD] du quadrilatère ABCD ont le même milieu O : c'est un parallélogramme.</li><li>Elles ont la même longueur (deux diamètres d'un même cercle) : ABCD est un <b>rectangle</b>. Aucun angle droit n'a été tracé à l'équerre !</li></ul>`, dr4FigRectSansEquerre(3))}
`;

document.getElementById('histoire-demo-droites-remarquables-cercles-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : de Thalès à Euler</div>
  <p style="margin:6px 0 10px;"><b>Thalès de Milet</b> (vers 625-547 av. J.-C.) passe pour le premier mathématicien grec. Selon l'historien Diogène Laërce, qui écrit environ huit siècles plus tard, Thalès aurait été le premier à inscrire un <b>triangle rectangle dans un demi-cercle</b>, et il aurait sacrifié un bœuf pour fêter cette découverte ! C'est pourquoi, en Allemagne ou en Angleterre, le théorème 2 de ce chapitre s'appelle… le « théorème de Thalès » (en France, ce nom désigne un autre théorème, que tu verras en 3e).</p>
  <p style="margin:0 0 10px;">Vers 300 av. J.-C., <b>Euclide</b> démontre dans ses <i>Éléments</i> que les médiatrices se coupent au centre du cercle circonscrit (livre IV), et que l'angle inscrit dans un demi-cercle est droit (livre III). Le concours des <b>hauteurs</b>, lui, n'est pas dans les <i>Éléments</i> : il apparaît dans des textes plus tardifs, et le mot « orthocentre » ne date que du 19e siècle.</p>
  <p style="margin:0;">En 1765, le Suisse <b>Leonhard Euler</b>, l'un des plus grands mathématiciens de tous les temps, découvre une surprise : dans tout triangle, le centre du cercle circonscrit O, le centre de gravité G et l'orthocentre H sont <b>alignés</b>, et G est toujours deux fois plus près de O que de H. Cette droite s'appelle la <b>droite d'Euler</b>.</p>
  ${(() => { const A = [120, 30], B = [30, 210], C = [330, 210], O = dr4O(A, B, C), G = dr4G(A, B, C), H = dr4H(A, B, C);
    return dr4Fig({ T: [A, B, C], droites: [[O, H, DR4_ROUGE]], pts: [[O, 'O', [O[0], O[1] + 30]], [G, 'G', [G[0], G[1] + 30]], [H, 'H', [H[0] - 30, H[1]]]], cercles: [[O, dr4D(O, A), '#9CC8E8', true]], max: 320 }); })()}
  <p style="margin:4px 0 0;text-align:center;font-size:.88rem;">La droite d'Euler (en rouge) passe par O, G et H.</p>
</div>
`;

/* ---- Méthodes (étapes) ---- */
const DR4_M1 = [
  { expr: 'Le point E est sur le cercle de diamètre [FG].', note: 'On écrit l\'hypothèse : un sommet du triangle sur un cercle dont un autre côté est un diamètre.', fig: dr4FigRect({ A: dr4Sur(55), noms: ['E', 'F', 'G'], nomO: 'O', max: 260 }) },
  { expr: 'Le triangle EFG est inscrit dans le cercle de diamètre [FG].', note: 'On reformule : c\'est la configuration du théorème 2.' },
  { expr: 'D\'après la réciproque (théorème 2), le triangle EFG est rectangle en E.', note: 'L\'angle droit est au sommet opposé au diamètre.' },
];
const DR4_M2 = [
  { expr: 'Le triangle RST est rectangle en R et RS = 6 cm, RT = 8 cm, ST = 10 cm. M est le milieu de [ST]. Calculer RM.', note: 'On cherche la longueur de la médiane issue de l\'angle droit.', fig: dr4FigRect({ noms: ['R', 'S', 'T'], nomO: 'M', mediane: true, sansCercle: true, max: 260 }) },
  { expr: 'D\'après le théorème 1, M est le centre du cercle circonscrit au triangle RST : MR = MS = MT.', note: 'Le centre du cercle circonscrit à un triangle rectangle est le milieu de l\'hypoténuse.' },
  { expr: dr4Tex('RM = \\dfrac{ST}{2}'), note: 'La médiane issue de l\'angle droit mesure la moitié de l\'hypoténuse.' },
  { expr: dr4Tex('RM = \\dfrac{10}{2}'), note: 'On remplace.' },
  { expr: 'RM = 5 cm.', note: 'Les longueurs RS et RT ne servaient pas !' },
];
const DR4_M3 = [
  { expr: 'ABCD est un parallélogramme de centre O, avec OA = 3 cm et OB = 3 cm.', note: 'On veut savoir si c\'est un parallélogramme particulier.' },
  { expr: 'Les diagonales d\'un parallélogramme ont le même milieu O :', note: 'On calcule la longueur des deux diagonales.' },
  { expr: dr4Tex('AC = 2 \\times OA = 2 \\times 3 = 6'), note: 'Longueur de la diagonale [AC], en cm.' },
  { expr: dr4Tex('BD = 2 \\times OB = 2 \\times 3 = 6'), note: 'Longueur de la diagonale [BD], en cm.' },
  { expr: 'AC = BD.', note: 'Les diagonales ont la même longueur.' },
  { expr: 'Le parallélogramme ABCD a des diagonales de même longueur : c\'est un rectangle.', note: 'Si, de plus, les diagonales étaient perpendiculaires, ce serait un carré.' },
];
const DR4_M4 = [
  { expr: 'Je trace un cercle de centre O.', note: 'Le rayon donnera la moitié des diagonales.', fig: dr4FigRectSansEquerre(0) },
  { expr: 'Je trace un diamètre [AC] à la règle.', note: 'Il passe par le centre O.', fig: dr4FigRectSansEquerre(1) },
  { expr: 'Je trace un deuxième diamètre [BD].', note: 'Choisir son inclinaison change la forme du rectangle.', fig: dr4FigRectSansEquerre(2) },
  { expr: 'Je trace le quadrilatère ABCD : c\'est un rectangle.', note: 'Ses diagonales ont le même milieu O et la même longueur (deux diamètres).', fig: dr4FigRectSansEquerre(3) },
];
const dr4M1Demo = makeStepDemo(DR4_M1, 'dr4-m1Display'), dr4M2Demo = makeStepDemo(DR4_M2, 'dr4-m2Display'), dr4M3Demo = makeStepDemo(DR4_M3, 'dr4-m3Display'), dr4M4Demo = makeStepDemo(DR4_M4, 'dr4-m4Display');
const dr4Bloc = (titre, id, demo, hint) => `
<div class="sub-header"><span class="letter">M</span><h4>${titre}</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">${hint}</p>
  <div class="step-display" id="${id}"></div>
  <div class="figure-toolbar"><button class="btn" onclick="${demo}.next()">Étape suivante →</button><button class="btn secondary" onclick="${demo}.reset()">Recommencer</button></div>
</div>`;
document.getElementById('methode-demo-droites-remarquables-cercles-4e').innerHTML = `
${dr4Bloc('Méthode 1 : démontrer qu\'un triangle est rectangle avec un cercle', 'dr4-m1Display', 'dr4M1Demo', 'Démontrer que le triangle EFG est rectangle.')}
${dr4Bloc('Méthode 2 : calculer la longueur de la médiane issue de l\'angle droit', 'dr4-m2Display', 'dr4M2Demo', 'Cliquez sur « Étape suivante ».')}
${dr4Bloc('Méthode 3 : reconnaître un parallélogramme particulier par ses diagonales', 'dr4-m3Display', 'dr4M3Demo', 'Le parallélogramme ABCD est-il un rectangle ?')}
${dr4Bloc('Méthode 4 : construire un rectangle sans équerre', 'dr4-m4Display', 'dr4M4Demo', 'Un compas et une règle suffisent.')}
`;

function dr4Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="dr4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="dr4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-droites-remarquables-cercles-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Démontrer qu'un triangle est rectangle avec un cercle »</h3>
  <p style="margin:0 0 8px;">[KL] est un diamètre d'un cercle (C), et M est un point de ce cercle, distinct de K et de L. Démontrer que le triangle KLM est rectangle.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Le point M est sur le cercle (C) de diamètre [KL].</span><span class="we-comment">On écrit l'hypothèse.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Le triangle KLM est donc inscrit dans le cercle de diamètre [KL].</span><span class="we-comment">On reconnaît la configuration.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">D'après le théorème du triangle inscrit dans un demi-cercle, KLM est rectangle en M.</span><span class="we-comment">On cite le théorème et on précise le sommet de l'angle droit.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${dr4Exo(1, 'Complète : les trois médiatrices d\'un triangle se coupent au centre du cercle … ; les trois hauteurs se coupent en un point appelé … ; les trois médianes se coupent au … ; les trois bissectrices se coupent au centre du cercle ….', [
    'Les médiatrices : au centre du cercle <b>circonscrit</b>.', 'Les hauteurs : en l\'<b>orthocentre</b>.', 'Les médianes : au <b>centre de gravité</b>.', 'Les bissectrices : au centre du cercle <b>inscrit</b>.'])}
  ${dr4Exo(2, 'ABC est un triangle rectangle en A tel que BC = 13 cm. Où se trouve le centre de son cercle circonscrit ? Quel est le rayon de ce cercle ?', [
    'D\'après le théorème 1, le centre du cercle circonscrit est le milieu O de l\'hypoténuse [BC].', 'Rayon du cercle :', dr4Tex('r = \\dfrac{BC}{2} = \\dfrac{13}{2} = 6{,}5'), 'Le rayon mesure 6,5 cm.'])}
  ${dr4Exo(3, '[EF] est un diamètre d\'un cercle de centre O, et G est un point du cercle (distinct de E et de F). Démontre que le triangle EFG est rectangle.', [
    'Le point G est sur le cercle de diamètre [EF] : le triangle EFG est inscrit dans un demi-cercle.', 'D\'après le théorème 2, le triangle EFG est rectangle en G.'])}
  ${dr4Exo(4, 'DEF est un triangle rectangle en D, avec EF = 9 cm. I est le milieu de [EF]. Calcule la longueur DI.', [
    'D\'après le théorème 1, I est le centre du cercle circonscrit au triangle DEF, donc ID = IE = IF.',
    dr4Tex('DI = \\dfrac{EF}{2} = \\dfrac{9}{2} = 4{,}5'), 'DI mesure 4,5 cm.'])}
  ${dr4Exo(5, 'RST est un triangle et M est le milieu de [ST], avec ST = 7 cm et RM = 3,5 cm. Le triangle RST est-il rectangle ? Justifie.', [
    'MS = MT = 3,5 cm (M est le milieu de [ST]) et MR = 3,5 cm.', 'Donc MR = MS = MT : le point R est sur le cercle de centre M et de diamètre [ST].',
    'D\'après le théorème 2, le triangle RST est rectangle en R.'])}
  ${dr4Exo(6, 'ABCD est un parallélogramme. Ses diagonales mesurent AC = 8 cm et BD = 8 cm, et elles sont perpendiculaires. Quelle est la nature de ABCD ?', [
    'Le parallélogramme ABCD a des diagonales de même longueur : c\'est un rectangle.', 'Ses diagonales sont aussi perpendiculaires : c\'est un losange.', 'ABCD est à la fois un rectangle et un losange : c\'est un <b>carré</b>.'])}
  ${dr4Exo(7, 'Explique comment construire un rectangle sans équerre, avec seulement un compas et une règle, puis justifie que la figure obtenue est bien un rectangle.', [
    'On trace un cercle de centre O, puis deux diamètres [AC] et [BD], et le quadrilatère ABCD.',
    'Les diagonales [AC] et [BD] ont le même milieu O : ABCD est un parallélogramme.', 'Elles ont la même longueur (le diamètre du cercle) : ABCD est un rectangle.'])}
  ${dr4Exo(8, 'Vrai ou faux ? « L\'orthocentre d\'un triangle rectangle est le sommet de l\'angle droit. » Justifie.', [
    'Vrai. Dans un triangle ABC rectangle en A, la hauteur issue de B est la droite (AB), car (AB) ⊥ (AC) ; la hauteur issue de C est la droite (AC).',
    'Ces deux hauteurs se coupent en A : l\'orthocentre est le sommet A de l\'angle droit.'])}
</div>
`;

DEMO_REGISTRY['4e|Droites remarquables et cercles'] = {
  cours: 'cours-demo-droites-remarquables-cercles-4e', methode: 'methode-demo-droites-remarquables-cercles-4e', exos: 'exos-demo-droites-remarquables-cercles-4e', histoire: 'histoire-demo-droites-remarquables-cercles-4e',
  init: () => {
    dr4M1Demo.reset(); dr4M2Demo.reset(); dr4M3Demo.reset(); dr4M4Demo.reset();
    ['cours', 'methode', 'exos', 'histoire'].forEach(k => renderStaticMath(document.getElementById(k + '-demo-droites-remarquables-cercles-4e')));
    injectCourseAddButtons(document.getElementById('cours-demo-droites-remarquables-cercles-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-droites-remarquables-cercles-4e'));
  }
};

DEMO_QUIZZES['4e|Droites remarquables et cercles'] = [
  { q: 'Les trois médiatrices d\'un triangle se coupent...', opts: ['au centre du cercle circonscrit', 'au centre de gravité', 'à l\'orthocentre'], correct: 0 },
  { q: 'La droite qui passe par un sommet et par le milieu du côté opposé est...', opts: ['une hauteur', 'une médiane', 'une médiatrice'], correct: 1 },
  { q: 'ABC est rectangle en A. Le centre de son cercle circonscrit est...', opts: ['le point A', 'le milieu de [BC]', 'le milieu de [AB]'], correct: 1 },
  { q: 'ABC est rectangle en A et BC = 12 cm. La médiane issue de A mesure...', opts: ['6 cm', '12 cm', '24 cm'], correct: 0 },
  { q: 'M est sur le cercle de diamètre [EF] (M distinct de E et F). Le triangle EFM est...', opts: ['isocèle en M', 'rectangle en M', 'équilatéral'], correct: 1 },
  { q: 'Un parallélogramme dont les diagonales ont la même longueur est...', opts: ['un losange', 'un rectangle', 'un trapèze'], correct: 1 },
  { q: 'Deux diamètres d\'un même cercle sont les diagonales...', opts: ['d\'un rectangle', 'd\'un losange, toujours', 'd\'un triangle'], correct: 0 },
];
