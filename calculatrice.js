/* ============================================================
   calculatrice.js -- Calculatrice collège du site (demandé le 08/11/2026 : « Penses-tu que tu peux faire des émulateurs des
   calculatrices collège ? casio et texas instruments ? », puis « go sans mode algorithmique »).

   Ce n'est PAS une copie d'une machine du commerce (ni leur programme interne, ni leur façade, ni leurs logos) : une calculatrice
   originale, aux couleurs du site, qui se comporte comme les calculatrices collège. Une seule disposition (les dispositions
   « type Casio » / « type TI » ont été retirées le 08/11/2026). Tout s'affiche dans l'écran : résultat, tableau de valeurs,
   calculs précédents (▲ ▼) ; rien sous les touches.

   - Écriture naturelle (fractions en étage, puissances, racines), éditeur à gabarits : flèches pour passer du numérateur au
     dénominateur, sortir d'une racine… ; rendu KaTeX.
   - Calcul EXACT : fractions (BigInt), racines simplifiées (a√b), valeurs remarquables en trigonométrie (cos 60 = 1/2,
     sin 45 = √2/2) ; sinon valeur approchée à 10 chiffres. S⇔D (◄►) : fraction ↔ décimal.
   - Priorités, parenthèses, multiplication implicite (2π, 3(4 + 1)), (−), %, puissances de 10, Ans.
   - Division euclidienne (÷R : quotient et reste), décomposition en facteurs premiers (FACT, sur le dernier résultat).
   - Trigonométrie en degrés (cos, sin, tan et leurs réciproques par SECONDE / 2nde).
   - Tableau de valeurs d'une expression en x (début, fin, pas), dans l'écran.
   - « Montre-moi les touches » : calcMontrer(touches, titre) tape la suite de touches, touche par touche ; calcBouton(touches, libellé) écrit le bouton à placer dans un cours.
   Panneau flottant (déplaçable), ouvert par le menu L'Atelier ou par le bouton rond des chapitres du collège. Rien n'est envoyé.
   La touche ÷ et l'écran de la calculatrice gardent « ÷ » (exception prévue pour les calculatrices).
   ============================================================ */

/* ------------------------------ Nombres exacts ------------------------------ */
const CALC_MAXB = 10n ** 40n;
const cAbs = a => a < 0n ? -a : a;
function cPgcd(a, b){ a = cAbs(a); b = cAbs(b); while(b){ [a, b] = [b, a % b]; } return a; }
function cQ(n, d){
  if(d === undefined) d = 1n;
  if(d === 0n) throw new Error('Erreur math');
  if(d < 0n){ n = -n; d = -d; }
  const g = cPgcd(n, d) || 1n; n /= g; d /= g;
  if(cAbs(n) > CALC_MAXB || d > CALC_MAXB) return { k: 'f', v: Number(n) / Number(d) };
  return { k: 'q', n, d };
}
// Plus grand carré qui divise m : m = s² × r (r sans facteur carré). null si m est trop grand pour être décomposé vite.
function cCarre(m){
  if(m > 10n ** 14n) return null;
  let s = 1n, r = 1n, x = m;
  for(let p = 2n; p * p <= x; p += (p === 2n ? 1n : 2n)){
    let e = 0; while(x % p === 0n){ x /= p; e++; }
    for(let i = 0; i < Math.floor(e / 2); i++) s *= p;
    if(e % 2) r *= p;
  }
  return { s, r: r * x };
}
// Valeur c × √r (c rationnel, r sans facteur carré).
function cR(n, d, r){
  if(r === 1n) return cQ(n, d);
  const q = cQ(n, d); if(q.k !== 'q') return { k: 'f', v: q.v * Math.sqrt(Number(r)) };
  if(q.n === 0n) return q;
  return { k: 'r', n: q.n, d: q.d, r };
}
/* Sommes exactes (demandé le 08/11/2026 : « Oui », pour 3/4 + √12 = 3/4 + 2√3) : { k:'s', t:[{ n, d, r }] }, somme de termes
   n/d × √r (r = 1 : partie rationnelle), au plus 6 termes, r croissants ; un seul terme redevient 'q' ou 'r'. */
function cTermes(x){ return x.k === 's' ? x.t : [{ n: x.n, d: x.d, r: x.k === 'r' ? x.r : 1n }]; }
function cDeTermes(L){
  const m = new Map();
  L.forEach(u => { const k = u.r.toString(), v = m.get(k); m.set(k, v ? { n: v.n * u.d + u.n * v.d, d: v.d * u.d, r: u.r } : { n: u.n, d: u.d, r: u.r }); });
  const t = [];
  for(const u of m.values()){ const q = cQ(u.n, u.d); if(q.k !== 'q') return null; if(q.n !== 0n) t.push({ n: q.n, d: q.d, r: u.r }); }
  t.sort((x, y) => (x.r < y.r ? -1 : x.r > y.r ? 1 : 0));
  if(!t.length) return cQ(0n);
  if(t.length === 1) return t[0].r === 1n ? cQ(t[0].n, t[0].d) : cR(t[0].n, t[0].d, t[0].r);
  return t.length > 6 ? null : { k: 's', t };
}
function cF(x){
  if(x.k === 'f') return x.v;
  if(x.k === 's') return x.t.reduce((v, u) => v + Number(u.n) / Number(u.d) * Math.sqrt(Number(u.r)), 0);
  const v = Number(x.n) / Number(x.d);
  return x.k === 'r' ? v * Math.sqrt(Number(x.r)) : v;
}
const cFl = v => { if(!isFinite(v)) throw new Error('Erreur math'); return { k: 'f', v }; };
function cNeg(a){
  if(a.k === 'f') return cFl(-a.v);
  if(a.k === 's') return { k: 's', t: a.t.map(u => Object.assign({}, u, { n: -u.n })) };
  return Object.assign({}, a, { n: -a.n });
}
function cAdd(a, b){
  if(a.k === 'f' || b.k === 'f') return cFl(cF(a) + cF(b));
  return cDeTermes(cTermes(a).concat(cTermes(b))) || cFl(cF(a) + cF(b));
}
// Produit de deux termes n/d √r.
function cMul1(a, b){
  const ra = a.k === 'r' ? a.r : 1n, rb = b.k === 'r' ? b.r : 1n;
  if(ra === 1n || rb === 1n) return cR(a.n * b.n, a.d * b.d, ra * rb);
  const c = cCarre(ra * rb); if(!c) return cFl(cF(a) * cF(b));
  return cR(a.n * b.n * c.s, a.d * b.d, c.r);
}
function cMul(a, b){
  if(a.k === 'f' || b.k === 'f') return cFl(cF(a) * cF(b));
  if(a.k !== 's' && b.k !== 's') return cMul1(a, b);
  const un = u => u.r === 1n ? cQ(u.n, u.d) : cR(u.n, u.d, u.r), L = [];
  for(const u of cTermes(a)) for(const v of cTermes(b)){ const p = cMul1(un(u), un(v)); if(p.k === 'f') return cFl(cF(a) * cF(b)); if(p.n !== 0n) L.push(...cTermes(p)); }
  return cDeTermes(L) || cFl(cF(a) * cF(b));
}
function cInv(a){
  if(a.k === 'f'){ if(a.v === 0) throw new Error('Erreur math'); return cFl(1 / a.v); }
  if(a.k === 's'){
    // a + b√r : on multiplie par la quantité conjuguée, (a − b√r) / (a² − b² r) ; sinon valeur approchée.
    if(a.t.length === 2 && a.t[0].r === 1n){
      const x = cQ(a.t[0].n, a.t[0].d), y = a.t[1], conj = cDeTermes([a.t[0], { n: -y.n, d: y.d, r: y.r }]);
      const den = cAdd(cMul(x, x), cQ(-(y.n * y.n * y.r), y.d * y.d));
      if(conj && den.k === 'q' && den.n !== 0n) return cMul(conj, cInv(den));
    }
    const v = cF(a); if(v === 0) throw new Error('Erreur math'); return cFl(1 / v);
  }
  if(a.n === 0n) throw new Error('Erreur math');
  if(a.k === 'q') return cQ(a.d, a.n);
  return cR(a.d, a.n * a.r, a.r); // 1 / (c√r) = √r / (c × r)
}
function cDiv(a, b){ return cMul(a, cInv(b)); }
function cEstEntier(a){ return a.k === 'q' && a.d === 1n; }
function cPuis(a, b){
  if(cEstEntier(b) && cAbs(b.n) <= 400n && a.k !== 'f'){
    let e = b.n < 0n ? -b.n : b.n, r = cQ(1n), x = a;
    while(e > 0n){ if(e & 1n) r = cMul(r, x); e >>= 1n; if(e) x = cMul(x, x); if(r.k === 'f' || x.k === 'f') return cFl(Math.pow(cF(a), cF(b))); }
    return b.n < 0n ? cInv(r) : r;
  }
  if(b.k === 'q' && b.d === 2n && a.k === 'q' && a.n >= 0n) return cPuis(cRac(a), cQ(b.n)); // a^(n/2)
  const v = Math.pow(cF(a), cF(b)); if(isNaN(v)) throw new Error('Erreur math'); return cFl(v);
}
function cRac(a){
  if(a.k === 'q'){
    if(a.n < 0n) throw new Error('Erreur math');
    const c = cCarre(a.n * a.d); if(!c) return cFl(Math.sqrt(cF(a)));
    return cR(c.s, a.d, c.r); // √(n/d) = √(n d) / d
  }
  const v = cF(a); if(v < 0) throw new Error('Erreur math'); return cFl(Math.sqrt(v));
}
// Trigonométrie en degrés ; valeurs exactes pour les multiples de 30° et de 45°.
function cSinExact(x){ // x entier (degrés)
  const m = ((x % 360) + 360) % 360, s = m >= 180 ? -1n : 1n, t = m % 180, u = t > 90 ? 180 - t : t;
  const V = { 0: cQ(0n), 30: cQ(1n, 2n), 45: cR(1n, 2n, 2n), 60: cR(1n, 2n, 3n), 90: cQ(1n) }[u];
  return V ? cMul(V, cQ(s)) : null;
}
function cTrig(f, a){
  const x = cF(a), exact = cEstEntier(a) && cAbs(a.n) <= 100000n && (Number(a.n) % 30 === 0 || Number(a.n) % 45 === 0);
  if(f === 'sin' || f === 'cos' || f === 'tan'){
    if(exact){ const n = Number(a.n), s = cSinExact(n), c = cSinExact(90 - n);
      if(f === 'sin') return s; if(f === 'cos') return c;
      if(c.k !== 'f' && c.n === 0n) throw new Error('Erreur math'); return cDiv(s, c); }
    const r = x * Math.PI / 180, v = f === 'sin' ? Math.sin(r) : f === 'cos' ? Math.cos(r) : Math.tan(r);
    if(f === 'tan' && Math.abs(Math.cos(r)) < 1e-12) throw new Error('Erreur math');
    return cFl(Math.abs(v) < 1e-13 ? 0 : v);
  }
  if((f === 'asin' || f === 'acos') && (x < -1 - 1e-12 || x > 1 + 1e-12)) throw new Error('Erreur math');
  const xc = Math.max(-1, Math.min(1, x)), v = (f === 'asin' ? Math.asin(xc) : f === 'acos' ? Math.acos(xc) : Math.atan(x)) * 180 / Math.PI;
  return Math.abs(v - Math.round(v)) < 1e-9 ? cQ(BigInt(Math.round(v))) : cFl(v);
}
function cFacteurs(n){
  const out = []; let x = n;
  for(let p = 2n; p * p <= x; p += (p === 2n ? 1n : 2n)){ let e = 0; while(x % p === 0n){ x /= p; e++; } if(e) out.push([p, e]); }
  if(x > 1n) out.push([x, 1]);
  return out;
}

/* ------------------------------ Affichage des nombres ------------------------------ */
const calcVirg = s => s.replace('.', '{,}');
function calcFlottantTex(v){
  if(v === 0) return '0';
  const a = Math.abs(v);
  if(a >= 1e10 || a < 1e-9){
    let [m, e] = v.toExponential(9).split('e'); m = m.replace(/\.?0+$/, '');
    return `${calcVirg(m)}\\times10^{${+e}}`;
  }
  let s = v.toPrecision(10); if(s.includes('e')) s = String(v);
  if(s.includes('.')) s = s.replace(/\.?0+$/, '');
  return calcVirg(s);
}
// Écriture décimale d'une fraction : exacte si elle se termine (au plus 10 décimales), sinon arrondie à 10 chiffres.
function calcDecimalTex(x){
  if(x.k !== 'q') return calcFlottantTex(cF(x));
  let d = x.d, k = 0; while(d % 2n === 0n){ d /= 2n; k++; } let j = 0; while(d % 5n === 0n){ d /= 5n; j++; }
  const e = Math.max(k, j);
  if(d === 1n && e <= 10){
    const neg = x.n < 0n, m = cAbs(x.n) * 10n ** BigInt(e) / x.d, s = m.toString().padStart(e + 1, '0');
    const t = e ? s.slice(0, -e) + '.' + s.slice(-e) : s;
    if(t.replace('.', '').length <= 12) return (neg ? '-' : '') + calcVirg(t);
  }
  return calcFlottantTex(cF(x));
}
function calcValeurTex(x, decimal){
  if(x.k === 'f') return calcFlottantTex(x.v);
  if(decimal) return calcDecimalTex(x);
  if(x.k === 's'){ // une seule fraction : (3 + 8√3) / 4, comme les calculatrices collège
    const D = x.t.reduce((m, u) => m / cPgcd(m, u.d) * u.d, 1n);
    let num = '';
    x.t.forEach((u, j) => { const c = u.n * (D / u.d), a = cAbs(c);
      num += (c < 0n ? '-' : j ? '+' : '') + (u.r === 1n ? String(a) : `${a === 1n ? '' : a}\\sqrt{${u.r}}`); });
    return D === 1n ? num : `\\dfrac{${num}}{${D}}`;
  }
  const neg = x.n < 0n, n = cAbs(x.n), sg = neg ? '-' : '';
  if(x.k === 'q') return x.d === 1n ? sg + n : `${sg}\\dfrac{${n}}{${x.d}}`;
  const rac = `${n === 1n ? '' : n}\\sqrt{${x.r}}`;
  return x.d === 1n ? sg + rac : `${sg}\\dfrac{${rac}}{${x.d}}`;
}

/* ------------------------------ Touches ------------------------------
   Une seule disposition, aux couleurs du site (demandé le 08/11/2026 : « On va enlever modèle casio et ti et ne garder que le modèle
   bleu »). CALC_TOUCHES : nom de la touche (lecteur d'écran) ; CALC_ICONES : dessin des touches fraction, racine, puissances… */
const CALC_TOUCHES = {
  shift: 'SECONDE', mode: 'Tableau', x: 'x', left: '◀', right: '▶', up: '▲', down: '▼',
  frac: 'fraction', sqrt: 'racine carrée', sq: 'au carré', pow: 'puissance', neg: '(−)',
  cos: 'cos', sin: 'sin', tan: 'tan', acos: 'cos⁻¹', asin: 'sin⁻¹', atan: 'tan⁻¹',
  pi: 'π', sd: 'S⇔D', '(': '(', ')': ')', pct: '%', divr: '÷R', fact: 'FACT',
  del: 'DEL', ac: 'AC', '*': '×', '/': '÷', '+': '+', '-': '−', ',': ',', e10: '×10 puissance', ans: 'Ans', exe: 'EXE'
};
'0123456789'.split('').forEach(c => { CALC_TOUCHES[c] = c; });
const CALC_SECONDE = { cos: 'acos', sin: 'asin', tan: 'atan' };
const CALC_CLAVIER = { nav: ['shift', 'mode', 'x', 'left', 'right', 'up', 'down'],
  rangs: [['frac', 'sqrt', 'sq', 'pow', 'neg'], ['cos', 'sin', 'tan', 'pi', 'sd'], ['(', ')', 'pct', 'divr', 'fact'],
    ['7', '8', '9', 'del', 'ac'], ['4', '5', '6', '*', '/'], ['1', '2', '3', '+', '-'], ['0', ',', 'e10', 'ans', 'exe']] };
const calcLib = id => CALC_TOUCHES[id] || id;
const CALC_CASE = (w, h) => `<svg class="ck-case" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
const CALC_ICONES = {
  frac: `<svg viewBox="0 0 20 28" width="16" height="23" aria-hidden="true"><rect x="4" y="1.5" width="12" height="9.5" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><line x1="1" y1="14" x2="19" y2="14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="4" y="17" width="12" height="9.5" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`,
  sqrt: `<svg viewBox="0 0 32 24" width="29" height="22" aria-hidden="true"><path d="M1.5 14 L5.5 12 L10 21.5 L15 2.5 H30.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><rect x="17.5" y="7" width="11" height="12" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`,
  sq: `<span class="ci">x</span><sup>2</sup>`,
  pow: `<span class="ci">x</span><sup>${CALC_CASE(9, 10)}</sup>`,
  e10: `×10<sup>${CALC_CASE(9, 10)}</sup>`,
  x: `<span class="ci">x</span>`,
  sd: `S<span class="ck-fl">⇔</span>D`
};
const calcIcone = id => CALC_ICONES[id] || calcLib(id);

/* ------------------------------ État ------------------------------ */
const CALC = { racine: [], L: null, i: 0, seconde: false, res: null, resTex: '', decimal: false, ans: cQ(0n), fini: false, err: '',
  tableau: false, tabHtml: '', tabLignes: null, tabPos: 0, montre: null, hist: [], hi: -1 };
CALC.L = CALC.racine;

/* ------------------------------ Éditeur à gabarits ------------------------------
   Une liste de nœuds : { t:'c', v } (chiffre, signe, parenthèse, π, Ans, x, ÷R…), { t:'frac', a, b }, { t:'sqrt', a },
   { t:'pow', a } (exposant de ce qui précède), { t:'fn', f, a } (cos( … )). Le curseur : une liste et une position. */
const calcStruct = n => n.t !== 'c';
const calcSlots = n => n.t === 'frac' ? [n.a, n.b] : [n.a];
function calcParent(L, liste = CALC.racine){ // { n, i, L } : le nœud qui contient la liste L, sa place dans sa liste
  for(let i = 0; i < liste.length; i++){ const n = liste[i]; if(!calcStruct(n)) continue;
    for(const s of calcSlots(n)){ if(s === L) return { n, i, L: liste }; const r = calcParent(L, s); if(r) return r; } }
  return null;
}
function calcInserer(n){
  if(CALC.fini){ CALC.fini = false; CALC.racine.length = 0; CALC.L = CALC.racine; CALC.i = 0;
    // après un résultat, un signe d'opération continue à partir de Ans (comme sur les calculatrices)
    if(n.t === 'c' && /^[+\-×÷%]$|^÷R$/.test(n.v) || n.t === 'pow'){ CALC.racine.push({ t: 'c', v: 'Ans' }); CALC.i = 1; } }
  CALC.L.splice(CALC.i, 0, n); CALC.i++;
  if(calcStruct(n) && !(n.t === 'pow' && n.a.length)){ CALC.L = n.a; CALC.i = 0; }
}
function calcDroite(){
  const L = CALC.L;
  if(CALC.i < L.length){ const n = L[CALC.i]; if(calcStruct(n)){ CALC.L = n.a; CALC.i = 0; } else CALC.i++; return; }
  const p = calcParent(L); if(!p) return;
  if(p.n.t === 'frac' && L === p.n.a){ CALC.L = p.n.b; CALC.i = 0; return; }
  CALC.L = p.L; CALC.i = p.i + 1;
}
function calcGauche(){
  const L = CALC.L;
  if(CALC.i > 0){ const n = L[CALC.i - 1]; if(calcStruct(n)){ const s = calcSlots(n); CALC.L = s[s.length - 1]; CALC.i = CALC.L.length; } else CALC.i--; return; }
  const p = calcParent(L); if(!p) return;
  if(p.n.t === 'frac' && L === p.n.b){ CALC.L = p.n.a; CALC.i = p.n.a.length; return; }
  CALC.L = p.L; CALC.i = p.i;
}
function calcHautBas(haut){
  if(CALC.fini){ calcRappel(haut); return; } // après un résultat : ▲ ▼ parcourent les calculs précédents
  let L = CALC.L, p = calcParent(L);
  while(p && p.n.t !== 'frac'){ L = p.L; p = calcParent(L); }
  if(!p){ calcRappel(haut); return; }
  const cible = haut ? p.n.a : p.n.b; if(cible === L) return;
  CALC.L = cible; CALC.i = Math.min(CALC.i, cible.length);
}
// ▲ ▼ hors d'une fraction : les calculs précédents reviennent à l'écran (comme sur les calculatrices), pas de liste sous les touches.
function calcRappel(haut){
  const k = CALC.fini ? CALC.hi + (haut ? 1 : -1) : (haut ? 0 : -1);
  const h = CALC.hist[k]; if(!h) return;
  CALC.hi = k; CALC.racine.length = 0; CALC.racine.push(...JSON.parse(h.arbre)); CALC.L = CALC.racine; CALC.i = CALC.racine.length;
  CALC.res = h.res; CALC.err = h.err; CALC.decimal = h.decimal; CALC.fini = true;
}
function calcSuppr(){
  if(CALC.fini){ CALC.fini = false; }
  const L = CALC.L;
  if(CALC.i > 0){ const n = L[CALC.i - 1];
    if(calcStruct(n) && calcSlots(n).some(s => s.length)){ const s = calcSlots(n); CALC.L = s[s.length - 1]; CALC.i = CALC.L.length; return; }
    L.splice(CALC.i - 1, 1); CALC.i--; return; }
  const p = calcParent(L); if(!p) return;
  if(calcSlots(p.n).every(s => !s.length)){ p.L.splice(p.i, 1); CALC.L = p.L; CALC.i = p.i; return; }
  calcGauche();
}
// « ) » dans une fonction (cos( … ) ou une racine) sans parenthèse ouverte : on sort de la fonction.
function calcFermer(){
  const L = CALC.L, p = calcParent(L);
  const ouvertes = L.slice(0, CALC.i).reduce((k, n) => k + (n.v === '(' ? 1 : n.v === ')' ? -1 : 0), 0);
  if(p && p.n.t === 'fn' && ouvertes <= 0){ CALC.L = p.L; CALC.i = p.i + 1; return; }
  calcInserer({ t: 'c', v: ')' });
}

/* ------------------------------ Écriture LaTeX de l'expression ------------------------------ */
const CALC_CURSEUR = '\\textcolor{#E35D3A}{\\rule[-0.25em]{0.09em}{1.15em}}';
function calcTexListe(L, avecCurseur){
  let s = '';
  const cur = k => avecCurseur && L === CALC.L && CALC.i === k ? CALC_CURSEUR : '';
  L.forEach((n, k) => {
    s += cur(k);
    if(n.t === 'c'){
      const v = n.v;
      s += v === ',' ? '{,}' : v === '×' ? '\\times ' : v === '÷' ? '\\div ' : v === '−' ? '-' : v === '%' ? '\\%' : v === 'π' ? '\\pi ' : v === 'Ans' ? '\\text{Ans}' : v === '÷R' ? '\\,\\div\\!R\\,' : v;
    } else {
      const slot = S => { const t = calcTexListe(S, avecCurseur); return t || (avecCurseur ? '\\textcolor{#9AA3B2}{\\square}' : '\\square'); };
      if(n.t === 'frac') s += `\\dfrac{${slot(n.a)}}{${slot(n.b)}}`;
      else if(n.t === 'sqrt') s += `\\sqrt{${slot(n.a)}}`;
      else if(n.t === 'pow') s += `{}^{${slot(n.a)}}`;
      else if(n.t === 'fn') s += `\\${n.f.replace(/^a/, '')}${n.f[0] === 'a' ? '^{-1}' : ''}\\left(${slot(n.a)}\\right)`;
    }
  });
  s += cur(L.length);
  return s;
}

/* ------------------------------ Calcul ------------------------------ */
function calcEvaluer(L, x){
  // Division euclidienne : « a ÷R b », au premier niveau seulement.
  const kR = L.findIndex(n => n.t === 'c' && n.v === '÷R');
  if(kR >= 0){
    const a = calcEvaluer(L.slice(0, kR), x), b = calcEvaluer(L.slice(kR + 1), x);
    if(!cEstEntier(a) || !cEstEntier(b) || a.n < 0n || b.n <= 0n) throw new Error('Erreur math');
    return { k: 'eucl', q: a.n / b.n, r: a.n % b.n };
  }
  let pos = 0;
  const vu = () => L[pos], estC = (n, v) => n && n.t === 'c' && (v === undefined || n.v === v);
  const nombre = () => {
    let s = ''; while(estC(vu()) && /^[0-9,]$/.test(vu().v)){ s += vu().v; pos++; }
    if((s.match(/,/g) || []).length > 1 || s === ',') throw new Error('Erreur de syntaxe');
    if(s.includes(',')) CALC._decimal = true;
    const [e, d = ''] = s.split(',');
    return cQ(BigInt((e || '0') + d), 10n ** BigInt(d.length));
  };
  const debutAtome = n => n && (!estC(n) || /^[0-9,(πx]$|^Ans$/.test(n.v));
  const atome = () => {
    const n = vu(); if(!n) throw new Error('Erreur de syntaxe');
    if(estC(n) && /^[0-9,]$/.test(n.v)) return nombre();
    pos++;
    if(estC(n, '(')){ const v = somme(); if(estC(vu(), ')')) pos++; return v; } // parenthèse non fermée : fermée à la fin, comme les calculatrices
    if(estC(n, 'π')) return cFl(Math.PI);
    if(estC(n, 'Ans')) return CALC.ans;
    if(estC(n, 'x')){ if(x === undefined) throw new Error('Erreur : x sans tableau'); return x; }
    if(n.t === 'frac') return cDiv(calcEvaluer(n.a, x), calcEvaluer(n.b, x));
    if(n.t === 'sqrt') return cRac(calcEvaluer(n.a, x));
    if(n.t === 'fn') return cTrig(n.f, calcEvaluer(n.a, x));
    throw new Error('Erreur de syntaxe');
  };
  const postfixe = () => {
    let v = atome();
    for(;;){ const n = vu();
      if(n && n.t === 'pow'){ pos++; v = cPuis(v, calcEvaluer(n.a, x)); }
      else if(estC(n, '%')){ pos++; v = cDiv(v, cQ(100n)); }
      else return v; }
  };
  const facteur = () => {
    if(estC(vu(), '−')){ pos++; return cNeg(facteur()); }
    if(estC(vu(), '+')){ pos++; return facteur(); }
    return postfixe();
  };
  const produit = () => {
    let v = facteur();
    for(;;){ const n = vu();
      if(estC(n, '×')){ pos++; v = cMul(v, facteur()); }
      else if(estC(n, '÷')){ pos++; v = cDiv(v, facteur()); }
      else if(debutAtome(n) && !estC(n, ',')){ v = cMul(v, facteur()); } // multiplication implicite : 2π, 3(4 + 1), 2√3
      else return v; }
  };
  const somme = () => {
    let v = produit();
    for(;;){ const n = vu();
      if(estC(n, '+')){ pos++; v = cAdd(v, produit()); }
      else if(estC(n, '−')){ pos++; v = cAdd(v, cNeg(produit())); }
      else return v; }
  };
  if(!L.length) throw new Error('Erreur de syntaxe');
  const v = somme();
  if(pos < L.length) throw new Error('Erreur de syntaxe');
  return v;
}
function calcResultatTex(v){
  if(v.k === 'eucl') return `Q = ${v.q}\\quad R = ${v.r}`;
  if(v.k === 'fact') return v.tex;
  return calcValeurTex(v, CALC.decimal);
}
function calcExe(){
  if(CALC.fini && CALC.res){ return; }
  CALC._decimal = false;
  try{
    const v = calcEvaluer(CALC.racine);
    CALC.res = v; CALC.err = '';
    CALC.decimal = !!CALC._decimal && v.k !== 'eucl';
    if(v.k !== 'eucl') CALC.ans = v; else CALC.ans = cQ(v.q);
  }catch(e){ CALC.res = null; CALC.err = /^Erreur/.test(e.message) ? e.message : 'Erreur de syntaxe'; }
  CALC.fini = true;
  if(CALC.racine.length){ CALC.hist.unshift({ arbre: JSON.stringify(CALC.racine), res: CALC.res, err: CALC.err, decimal: CALC.decimal }); CALC.hist.length = Math.min(CALC.hist.length, 30); CALC.hi = 0; }
}

/* ------------------------------ Touches ------------------------------ */
const calcContientX = L => L.some(n => n.t === 'c' ? n.v === 'x' : calcSlots(n).some(calcContientX));
// Touche pressée par l'utilisateur (souris, doigt) : la démonstration en cours s'arrête et sa bande disparaît.
function calcClic(id){
  const b = document.getElementById('calcBande'); if(CALC.montre || (b && !b.hidden)){ calcMontreStop(); if(b) b.hidden = true; }
  calcTouche(id);
}
const CALC_TAB_VUES = 4; // lignes du tableau visibles à la fois
function calcTouche(id){
  if(CALC.tableau && CALC.tabLignes){
    if(id === 'up' || id === 'down'){ CALC.tabPos = Math.max(0, Math.min(CALC.tabLignes.length - CALC_TAB_VUES, CALC.tabPos + (id === 'up' ? -1 : 1))); calcAfficher(); return; }
    if(!/^(shift|mode|exe)$/.test(id)) CALC.tabLignes = null; // on revient à l'écriture de l'expression
  }
  const sec = CALC.seconde; if(id !== 'shift') CALC.seconde = false;
  if(sec && CALC_SECONDE[id]) id = CALC_SECONDE[id];
  const C = v => calcInserer({ t: 'c', v });
  if(/^[0-9]$/.test(id) || id === ',') C(id);
  else if(id === '+' || id === '(' || id === 'x') C(id);
  else if(id === '-') C('−');
  else if(id === 'neg') C('−');
  else if(id === '*') C('×');
  else if(id === '/') C('÷');
  else if(id === ')') { if(CALC.fini) C(')'); else calcFermer(); }
  else if(id === 'pi') C('π');
  else if(id === 'ans') C('Ans');
  else if(id === 'pct') C('%');
  else if(id === 'divr') C('÷R');
  else if(id === 'frac') calcInserer({ t: 'frac', a: [], b: [] });
  else if(id === 'sqrt') calcInserer({ t: 'sqrt', a: [] });
  else if(id === 'sq') calcInserer({ t: 'pow', a: [{ t: 'c', v: '2' }] });
  else if(id === 'pow') calcInserer({ t: 'pow', a: [] });
  else if(id === 'e10'){ C('×'); C('1'); C('0'); calcInserer({ t: 'pow', a: [] }); }
  else if(/^a?(cos|sin|tan)$/.test(id)) calcInserer({ t: 'fn', f: id, a: [] });
  else if(id === 'left'){ CALC.fini = false; calcGauche(); }
  else if(id === 'right'){ CALC.fini = false; calcDroite(); }
  else if(id === 'up') calcHautBas(true);
  else if(id === 'down') calcHautBas(false);
  else if(id === 'del') calcSuppr();
  else if(id === 'ac'){ CALC.decimal = false; CALC.racine.length = 0; CALC.L = CALC.racine; CALC.i = 0; CALC.res = null; CALC.err = ''; CALC.fini = false; }
  else if(id === 'exe'){ if(CALC.tableau && calcContientX(CALC.racine)) calcTableau(); else calcExe(); }
  else if(id === 'shift') CALC.seconde = !sec;
  else if(id === 'mode'){ CALC.tableau = !CALC.tableau; }
  else if(id === 'sd'){ if(CALC.res && CALC.res.k !== 'eucl' && CALC.res.k !== 'fact') CALC.decimal = !CALC.decimal; }
  else if(id === 'fact'){
    const a = CALC.res && CALC.res.k !== 'fact' ? CALC.res : CALC.ans;
    if(cEstEntier(a) && a.n >= 2n && a.n <= 10n ** 13n){
      const tex = cFacteurs(a.n).map(([p, e]) => e > 1 ? `${p}^{${e}}` : String(p)).join(' \\times ');
      CALC.res = { k: 'fact', tex }; CALC.err = ''; CALC.fini = true;
    } else { CALC.res = null; CALC.err = 'Erreur math'; CALC.fini = true; }
  }
  calcAfficher();
}

/* ------------------------------ Panneau ------------------------------ */
function calcCss(){
  if(document.getElementById('calcCss')) return;
  const st = document.createElement('style'); st.id = 'calcCss';
  st.textContent = `
  #calcPanneau{ position:fixed; right:18px; top:84px; z-index:9850; width:340px; max-width:calc(100vw - 24px); max-height:calc(100vh - 100px); overflow:auto;
    background:#1F3A5C; border-radius:22px; padding:10px 12px 14px; box-shadow:0 18px 50px rgba(15,30,50,.38); font-family:'Space Grotesk',Arial,sans-serif; color:#fff; }
  #calcPanneau[hidden]{ display:none; }
  .calc-tete{ display:flex; align-items:center; gap:6px; cursor:move; user-select:none; margin-bottom:8px; }
  .calc-tete b{ flex:1; font-size:.95rem; letter-spacing:.02em; }
  .calc-x{ border:0; background:rgba(255,255,255,.14); color:#fff; width:28px; height:28px; border-radius:50%; cursor:pointer; font-size:16px; line-height:28px; padding:0; }
  .calc-ecran{ background:#E9F0E4; color:#1C2B39; border-radius:10px; padding:6px 10px 6px; height:236px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start; box-shadow:inset 0 2px 6px rgba(0,0,0,.25); }
  .calc-etat{ display:flex; gap:8px; font:700 .62rem 'JetBrains Mono',monospace; color:#5B6472; min-height:12px; }
  .calc-etat .on{ color:#C2410C; }
  .calc-expr{ font-size:1.05rem; height:56px; flex:0 0 56px; display:flex; align-items:center; overflow-x:auto; overflow-y:auto; white-space:nowrap; padding:0; scrollbar-width:none; } /* hauteurs fixes : l'écran ne change plus de taille entre une fraction et un décimal */
  .calc-res{ font-size:1.25rem; height:62px; flex:0 0 62px; margin-top:auto; display:flex; align-items:center; justify-content:flex-end; overflow-x:auto; overflow-y:auto; white-space:nowrap; font-weight:600; scrollbar-width:none; }
  .calc-expr::-webkit-scrollbar, .calc-res::-webkit-scrollbar{ display:none; }
  .calc-res.err{ color:#B91C1C; font:700 .95rem 'Space Grotesk',Arial,sans-serif; }
  .calc-montre-bande{ position:fixed; z-index:9851; box-sizing:border-box; padding:8px 12px; background:#1F3A5C; color:#fff; border-radius:16px; font:500 .8rem 'Space Grotesk',Arial,sans-serif; line-height:1.9;
    box-shadow:0 12px 34px rgba(15,30,50,.32); }
  .calc-montre-bande[hidden]{ display:none; }
  .calc-montre-bande .k{ display:inline-block; min-width:22px; text-align:center; padding:0 6px; margin:0 2px; border-radius:6px; background:#fff; color:#1C2B39; font-weight:700; line-height:20px; }
  .calc-montre-bande .k.fait{ background:#F59E0B; color:#fff; }
  .calc-nav{ display:grid; grid-template-columns:1.6fr 1.3fr repeat(5, 1fr); gap:5px; margin:10px 0 6px; }
  .calc-k.var{ font:italic 600 1rem 'Times New Roman',Georgia,serif; }
  .calc-clav{ display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; }
  .calc-k{ position:relative; border:0; border-radius:9px; padding:13px 0 7px; font:700 .9rem 'Space Grotesk',Arial,sans-serif; background:#38557A; color:#fff; cursor:pointer;
    box-shadow:0 2px 0 rgba(0,0,0,.3); min-width:0; white-space:nowrap; overflow:hidden; }
  .calc-k.num{ background:#F3F5F8; color:#1C2B39; font-size:1.05rem; }
  .calc-k.op{ background:#5C7FA8; }
  .calc-k.exe{ background:#E35D3A; }
  .calc-k.ac{ background:#C2410C; }
  .calc-k.sec{ background:#F59E0B; color:#1C2B39; }
  .calc-k.nv{ padding:6px 0; font-size:.72rem; }
  .calc-k small{ position:absolute; top:1px; left:0; right:0; font:600 .55rem 'Space Grotesk',Arial,sans-serif; color:#FCD34D; }
  .calc-k:active, .calc-k.appui{ transform:translateY(2px); box-shadow:none; outline:3px solid #F59E0B; outline-offset:1px; }
  .calc-seconde .calc-k[data-k="cos"], .calc-seconde .calc-k[data-k="sin"], .calc-seconde .calc-k[data-k="tan"]{ outline:2px dashed #F59E0B; }
  .calc-tabzone{ flex:1 1 auto; display:flex; flex-direction:column; min-height:0; font-size:.78rem; }
  .calc-tabzone[hidden], .calc-res[hidden]{ display:none; }
  .calc-tabpar{ display:flex; gap:8px; align-items:center; font:700 .68rem 'JetBrains Mono',monospace; color:#3B4A5C; padding:2px 0 4px; border-bottom:1px dashed #9AA8A0; }
  .calc-tabpar input{ width:44px; padding:1px 3px; border:1px solid #9AA8A0; border-radius:4px; background:rgba(255,255,255,.55); font:700 .72rem 'JetBrains Mono',monospace; color:#1C2B39; }
  .calc-tab-corps{ flex:1 1 auto; overflow:hidden; min-height:0; position:relative; } /* comme une calculatrice : on fait défiler avec ▲ ▼, pas au doigt */
  .calc-tab-corps table{ border-collapse:collapse; width:100%; }
  .calc-tab-corps td, .calc-tab-corps th{ border-bottom:1px solid #C9D4C4; padding:0 6px; height:25px; text-align:center; font-weight:600; }
  .calc-tab-corps th{ border-bottom:1px dashed #9AA8A0; height:22px; }
  .calc-tab-fl{ position:absolute; right:2px; font:700 .62rem 'JetBrains Mono',monospace; color:#C2410C; }
  .calc-tab-corps p{ margin:6px 0 0; color:#5B6472; }
  .calc-k .ci{ font:italic 600 1.08rem 'Times New Roman',Georgia,serif; }
  .calc-k sup{ font-size:.7em; line-height:0; position:relative; top:-.5em; margin-left:1px; }
  .calc-k sup .ck-case{ width:.78em; height:.88em; vertical-align:0; }
  .calc-k svg{ vertical-align:middle; }
  .calc-k .ck-fl{ font-size:.9em; margin:0 1px; }
  .calc-k.ico{ display:flex; align-items:center; justify-content:center; padding:9px 0 5px; }
  .calc-montre-bande .k svg{ vertical-align:middle; height:16px; width:auto; }
  .calc-montre-bande .k sup{ font-size:.7em; } .calc-montre-bande .k .ci{ font:italic 700 .95rem 'Times New Roman',Georgia,serif; }
  #calcFlottant{ position:fixed; left:18px; bottom:72px; z-index:9790; width:44px; height:44px; border-radius:50%; border:0; background:#1F3A5C; color:#fff; cursor:pointer;
    box-shadow:0 4px 14px rgba(28,43,57,.25); display:none; align-items:center; justify-content:center; }
  #calcFlottant.vu{ display:flex; }
  .calc-montre{ display:inline-flex; align-items:center; gap:6px; border:1.5px solid #1F3A5C; background:#fff; color:#1F3A5C; border-radius:999px; padding:4px 12px;
    font:600 .82rem 'Inter',sans-serif; cursor:pointer; margin:4px 0; }
  .calc-montre .gicon{ font-size:18px; }
  @media print{ #calcPanneau, #calcFlottant, .calc-montre, .calc-montre-bande{ display:none !important; } }`;
  document.head.appendChild(st);
}
function calcTexte(tex){ try{ return katex.renderToString(tex, { throwOnError: false, trust: false }); }catch(e){ return tex; } }
function calcConstruire(){
  calcCss();
  let p = document.getElementById('calcPanneau');
  if(!p){ p = document.createElement('div'); p.id = 'calcPanneau'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Calculatrice'); p.hidden = true; document.body.appendChild(p); calcDeplacable(p); }
  const d = CALC_CLAVIER, cl = k => /^[0-9,]$/.test(k) ? 'num' : /^[+\-*/]$/.test(k) ? 'op' : k === 'exe' ? 'exe' : k === 'ac' ? 'ac' : k === 'shift' ? 'sec' : '';
  const touche = (k, nv) => { const sec = CALC_SECONDE[k] ? `<small>${calcLib(CALC_SECONDE[k])}</small>` : '', ico = CALC_ICONES[k] && /svg|class="ci"/.test(CALC_ICONES[k]) ? ' ico' : '';
    return `<button type="button" class="calc-k ${cl(k)}${nv ? ' nv' : ''}${ico}" data-k="${k}" aria-label="${calcLib(k)}" title="${calcLib(k)}" onclick="calcClic('${k}')">${sec}${calcIcone(k)}</button>`; };
  p.innerHTML = `<div class="calc-tete" title="Clavier de l'ordinateur accepté : chiffres, + − * / ^ ( ), Entrée, Retour arrière, flèches (▲ ▼ : calculs précédents)."><span class="gicon">calculate</span><b>Calculatrice</b>
      <button type="button" class="calc-x" onclick="calcFermerPanneau()" aria-label="Fermer la calculatrice">×</button></div>
    <div class="calc-ecran"><div class="calc-etat"></div><div class="calc-expr"></div><div class="calc-res" aria-live="polite"></div>
      <div class="calc-tabzone" hidden><div class="calc-tabpar">Début <input id="calcTabD" value="-3" inputmode="decimal"> Fin <input id="calcTabF" value="3" inputmode="decimal"> Pas <input id="calcTabP" value="1" inputmode="decimal"></div><div class="calc-tab-corps"></div></div></div>
    <div class="calc-nav">${d.nav.map(k => touche(k, true)).join('')}</div>
    <div class="calc-clav">${d.rangs.flat().map(k => touche(k)).join('')}</div>`;
  calcAfficher();
}
function calcAfficher(){
  const p = document.getElementById('calcPanneau'); if(!p) return;
  p.classList.toggle('calc-seconde', CALC.seconde);
  p.querySelector('.calc-etat').innerHTML = `<span class="${CALC.seconde ? 'on' : ''}">${CALC.seconde ? 'SECONDE' : ''}</span><span>DEG</span><span>${CALC.decimal ? 'Déc' : 'Exact'}</span>${CALC.tableau ? '<span class="on">TABLEAU</span>' : ''}`;
  const ex = calcTexListe(CALC.racine, !CALC.fini) || (CALC.fini ? '' : CALC_CURSEUR);
  p.querySelector('.calc-expr').innerHTML = calcTexte((CALC.tableau ? 'f(x) = ' : '') + ex);
  p.querySelector('.calc-ecran').classList.toggle('tab', CALC.tableau);
  const r = p.querySelector('.calc-res'), z = p.querySelector('.calc-tabzone');
  r.hidden = CALC.tableau; z.hidden = !CALC.tableau;
  r.classList.toggle('err', !!CALC.err);
  r.innerHTML = CALC.err ? CALC.err : CALC.fini && CALC.res ? calcTexte(calcResultatTex(CALC.res)) : '';
  if(CALC.tableau){ const T = CALC.tabLignes, V = CALC_TAB_VUES;
    z.querySelector('.calc-tab-corps').innerHTML = T ? `<table><tr><th>${calcTexte('x')}</th><th>${calcTexte('f(x)')}</th></tr>${T.slice(CALC.tabPos, CALC.tabPos + V).join('')}</table>`
        + (CALC.tabPos > 0 ? '<span class="calc-tab-fl" style="top:28px;">▲</span>' : '') + (CALC.tabPos + V < T.length ? '<span class="calc-tab-fl" style="bottom:2px;">▼</span>' : '')
      : CALC.tabHtml || '<p>Écris l\'expression avec la touche <i>x</i>, puis EXE.</p>'; }
  const e = p.querySelector('.calc-expr'); e.scrollLeft = e.scrollWidth;
}
function calcTableau(){
  const corps = { set innerHTML(h){ CALC.tabHtml = h; } }; // le tableau s'affiche dans l'écran (calcAfficher)
  const lire = id => { const s = String(document.getElementById(id).value).replace(',', '.').trim(); const v = Number(s); if(s === '' || !isFinite(v)) throw new Error('nombre'); return v; };
  try{
    const D = lire('calcTabD'), F = lire('calcTabF'), P = lire('calcTabP');
    if(P <= 0 || F < D) throw new Error('pas');
    const n = Math.floor((F - D) / P + 1e-9) + 1; if(n > 60) throw new Error('trop');
    const enQ = v => { const s = String(+v.toFixed(10)); const [e, d = ''] = s.replace('-', '').split('.'); const q = cQ(BigInt(e + d), 10n ** BigInt(d.length)); return s[0] === '-' ? cNeg(q) : q; };
    const lignes = [];
    for(let k = 0; k < n; k++){ const x = enQ(D + k * P); let y;
      try{ y = calcTexte(calcValeurTex(calcEvaluer(CALC.racine, x), false).replace(/\\dfrac/g, '\\tfrac')); }catch(e){ y = 'Erreur'; }
      lignes.push(`<tr><td>${calcTexte(calcValeurTex(x, true))}</td><td>${y}</td></tr>`); }
    CALC.tabLignes = lignes; CALC.tabPos = 0; corps.innerHTML = '';
  }catch(e){ CALC.tabLignes = null; corps.innerHTML = `<p style="color:#B91C1C;">${e.message === 'trop' ? 'Au plus 60 valeurs : augmente le pas.' : 'Vérifie le début, la fin et le pas (pas positif, fin après le début).'}</p>`; }
  calcAfficher();
}
function calcDeplacable(p){
  let dx = 0, dy = 0, en = false;
  p.addEventListener('pointerdown', e => { if(!e.target.closest('.calc-tete') || e.target.closest('button')) return; en = true; const r = p.getBoundingClientRect(); dx = e.clientX - r.left; dy = e.clientY - r.top; p.setPointerCapture(e.pointerId); });
  p.addEventListener('pointermove', e => { if(!en) return; p.style.left = Math.max(0, Math.min(innerWidth - 80, e.clientX - dx)) + 'px'; p.style.top = Math.max(0, Math.min(innerHeight - 60, e.clientY - dy)) + 'px'; p.style.right = 'auto'; calcPlacerBande(); });
  p.addEventListener('pointerup', () => { en = false; });
}
function calcOuvrir(){ calcConstruire(); document.getElementById('calcPanneau').hidden = false; }
function calcFermerPanneau(){ const p = document.getElementById('calcPanneau'); if(p) p.hidden = true; calcMontreStop(); const b = document.getElementById('calcBande'); if(b) b.hidden = true; }
// Clavier de l'ordinateur, quand le panneau est ouvert et que l'on n'écrit pas ailleurs.
document.addEventListener('keydown', e => {
  const p = document.getElementById('calcPanneau'); if(!p || p.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target; if(t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
  const K = { Enter: 'exe', '=': 'exe', Backspace: 'del', Escape: 'ac', Delete: 'ac', ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
    '+': '+', '-': '-', '*': '*', '/': '/', '(': '(', ')': ')', ',': ',', '.': ',', '^': 'pow', '%': 'pct', x: 'x', p: 'pi' };
  const k = /^[0-9]$/.test(e.key) ? e.key : K[e.key];
  if(!k) return; e.preventDefault(); calcClic(k);
});

/* ------------------------------ « Montre-moi les touches » ------------------------------ */
function calcMontreBande(touches, k, titre){
  let b = document.getElementById('calcBande');
  if(!b){ b = document.createElement('div'); b.id = 'calcBande'; b.className = 'calc-montre-bande'; b.setAttribute('aria-live', 'polite'); document.body.appendChild(b); }
  b.hidden = false;
  b.innerHTML = `${titre ? `<b>${titre}</b><br>` : ''}Touches : ${touches.map((t, j) => `<span class="k${j < k ? ' fait' : ''}">${calcIcone(t)}</span>`).join('')}
    <div style="font-size:.68rem;color:#B9C7D8;margin-top:2px;">Sur ta calculatrice, le nom ou la place d'une touche peut être un peu différent.</div>`;
  calcPlacerBande();
}
// La séquence de touches : une carte à part, sous la calculatrice (demandé le 08/11/2026 : « la séquence de touches peut se mettre sous
// la calculatrice mais indépendant ») ; au-dessus, ou à côté, quand la place manque sous elle.
function calcPlacerBande(){
  const b = document.getElementById('calcBande'), p = document.getElementById('calcPanneau'); if(!b || b.hidden || !p || p.hidden) return;
  const r = p.getBoundingClientRect(), m = 8; b.style.width = r.width + 'px';
  const h = b.offsetHeight; let x = r.left, y = r.bottom + m;
  if(y + h > innerHeight - m){
    if(r.top - m - h >= m) y = r.top - m - h;
    else if(r.left - m - r.width >= m){ x = r.left - m - r.width; y = Math.max(m, r.bottom - h); }
    else if(r.right + m + r.width <= innerWidth - m){ x = r.right + m; y = Math.max(m, r.bottom - h); }
    else y = innerHeight - m - h;
  }
  b.style.left = Math.max(m, x) + 'px'; b.style.top = Math.max(m, y) + 'px';
}
addEventListener('resize', () => calcPlacerBande());
function calcMontreStop(){ if(CALC.montre){ clearTimeout(CALC.montre.t); CALC.montre = null; } document.querySelectorAll('#calcPanneau .calc-k.appui').forEach(x => x.classList.remove('appui')); }
function calcMontrer(touches, titre){
  calcMontreStop(); calcOuvrir(); calcTouche('ac');
  const m = CALC.montre = { touches, titre: titre || '', k: 0, t: 0 };
  calcMontreBande(touches, 0, m.titre);
  const pas = () => {
    if(CALC.montre !== m) return;
    document.querySelectorAll('#calcPanneau .calc-k.appui').forEach(x => x.classList.remove('appui'));
    if(m.k >= touches.length){ CALC.montre = null; calcMontreBande(touches, touches.length, m.titre); return; }
    const id = touches[m.k], btn = document.querySelector(`#calcPanneau .calc-k[data-k="${CSS.escape(id)}"]`);
    if(btn) btn.classList.add('appui');
    calcTouche(id); m.k++; calcMontreBande(touches, m.k, m.titre);
    m.t = setTimeout(pas, 850);
  };
  m.t = setTimeout(pas, 500);
}
// Bouton à placer dans un cours : calcBouton(['cos', '3', '5', ')', 'exe'], 'Calculer cos 35° à la calculatrice').
function calcBouton(touches, libelle, titre){
  const j = JSON.stringify(touches).replace(/"/g, '&quot;'), t = JSON.stringify(titre || libelle || '').replace(/"/g, '&quot;');
  return `<button type="button" class="calc-montre" onclick="calcMontrer(${j}, ${t})"><span class="gicon">calculate</span> ${libelle || 'Montre-moi les touches'}</button>`;
}

/* ------------------------------ Bouton rond des chapitres du collège ------------------------------ */
let calcNiveauChapitre = '';
function calcMajBouton(lvl){
  if(lvl !== undefined) calcNiveauChapitre = lvl;
  calcCss();
  let b = document.getElementById('calcFlottant');
  if(!b){ b = document.createElement('button'); b.id = 'calcFlottant'; b.type = 'button'; b.title = 'Calculatrice'; b.setAttribute('aria-label', 'Ouvrir la calculatrice');
    b.innerHTML = '<span class="gicon">calculate</span>'; b.onclick = () => { const p = document.getElementById('calcPanneau'); if(p && !p.hidden) calcFermerPanneau(); else calcOuvrir(); };
    document.body.appendChild(b); }
  const v = document.getElementById('view-chapitre'), vu = !!(v && v.classList.contains('active')) && /^(6e|5e|4e|3e)$/.test(calcNiveauChapitre);
  b.classList.toggle('vu', vu);
}
