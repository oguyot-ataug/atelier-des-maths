/* ============================================================
   calculatrice.js -- Calculatrice collège du site (demandé le 08/11/2026 : « Penses-tu que tu peux faire des émulateurs des
   calculatrices collège ? casio et texas instruments ? », puis « go sans mode algorithmique »).

   Ce n'est PAS une copie d'une machine du commerce (ni leur programme interne, ni leur façade, ni leurs logos) : une calculatrice
   originale, aux couleurs du site, qui se comporte comme les calculatrices collège. Deux dispositions de touches au choix,
   « type Casio » et « type TI » (ordre des touches et noms des fonctions proches de ceux que les élèves ont en main).

   - Écriture naturelle (fractions en étage, puissances, racines), éditeur à gabarits : flèches pour passer du numérateur au
     dénominateur, sortir d'une racine… ; rendu KaTeX.
   - Calcul EXACT : fractions (BigInt), racines simplifiées (a√b), valeurs remarquables en trigonométrie (cos 60 = 1/2,
     sin 45 = √2/2) ; sinon valeur approchée à 10 chiffres. S⇔D (◄►) : fraction ↔ décimal.
   - Priorités, parenthèses, multiplication implicite (2π, 3(4 + 1)), (−), %, puissances de 10, Ans.
   - Division euclidienne (÷R : quotient et reste), décomposition en facteurs premiers (FACT, sur le dernier résultat).
   - Trigonométrie en degrés (cos, sin, tan et leurs réciproques par SECONDE / 2nde).
   - Tableau de valeurs d'une expression en x (début, fin, pas).
   - « Montre-moi les touches » : calcMontrer(touches, titre) tape la suite de touches, touche par touche, sur la disposition
     choisie ; calcBouton(touches, libellé) écrit le bouton à placer dans un cours.
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
function cF(x){
  if(x.k === 'f') return x.v;
  const v = Number(x.n) / Number(x.d);
  return x.k === 'r' ? v * Math.sqrt(Number(x.r)) : v;
}
const cFl = v => { if(!isFinite(v)) throw new Error('Erreur math'); return { k: 'f', v }; };
function cNeg(a){ return a.k === 'f' ? cFl(-a.v) : Object.assign({}, a, { n: -a.n }); }
function cAdd(a, b){
  if(a.k === 'q' && b.k === 'q') return cQ(a.n * b.d + b.n * a.d, a.d * b.d);
  if(a.k === 'r' && b.k === 'r' && a.r === b.r) return cR(a.n * b.d + b.n * a.d, a.d * b.d, a.r);
  if(a.k !== 'f' && a.n === 0n) return b;
  if(b.k !== 'f' && b.n === 0n) return a;
  return cFl(cF(a) + cF(b));
}
function cMul(a, b){
  if(a.k === 'f' || b.k === 'f') return cFl(cF(a) * cF(b));
  const ra = a.k === 'r' ? a.r : 1n, rb = b.k === 'r' ? b.r : 1n;
  if(ra === 1n || rb === 1n) return cR(a.n * b.n, a.d * b.d, ra * rb);
  const c = cCarre(ra * rb); if(!c) return cFl(cF(a) * cF(b));
  return cR(a.n * b.n * c.s, a.d * b.d, c.r);
}
function cInv(a){
  if(a.k === 'f'){ if(a.v === 0) throw new Error('Erreur math'); return cFl(1 / a.v); }
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
  const neg = x.n < 0n, n = cAbs(x.n), sg = neg ? '-' : '';
  if(x.k === 'q') return x.d === 1n ? sg + n : `${sg}\\dfrac{${n}}{${x.d}}`;
  const rac = `${n === 1n ? '' : n}\\sqrt{${x.r}}`;
  return x.d === 1n ? sg + rac : `${sg}\\dfrac{${rac}}{${x.d}}`;
}

/* ------------------------------ Dispositions des touches ------------------------------
   Chaque touche : [identifiant, libellé type Casio, libellé type TI, fonction seconde (identifiant, libellé Casio, libellé TI)]. */
const CALC_TOUCHES = {
  shift: ['SECONDE', '2nde'], mode: ['Tableau', 'table'], x: ['x', 'x'],
  left: ['◀', '◀'], right: ['▶', '▶'], up: ['▲', '▲'], down: ['▼', '▼'],
  frac: ['▭⁄▭', 'n/d'], sqrt: ['√▭', '√'], sq: ['x²', 'x²'], pow: ['x^▭', '^'], neg: ['(−)', '(-)'],
  cos: ['cos', 'cos'], sin: ['sin', 'sin'], tan: ['tan', 'tan'], acos: ['cos⁻¹', 'cos⁻¹'], asin: ['sin⁻¹', 'sin⁻¹'], atan: ['tan⁻¹', 'tan⁻¹'],
  pi: ['π', 'π'], sd: ['S⇔D', '◄►'], '(': ['(', '('], ')': [')', ')'], pct: ['%', '%'], divr: ['÷R', '÷reste'], fact: ['FACT', 'facteurs'],
  del: ['DEL', 'suppr'], ac: ['AC', 'annul'], '*': ['×', '×'], '/': ['÷', '÷'], '+': ['+', '+'], '-': ['−', '−'],
  ',': [',', ','], e10: ['×10ˣ', '×10ⁿ'], ans: ['Ans', 'rép'], exe: ['EXE', 'entrer']
};
'0123456789'.split('').forEach(c => { CALC_TOUCHES[c] = [c, c]; });
const CALC_SECONDE = { cos: 'acos', sin: 'asin', tan: 'atan' };
const CALC_DISPOS = {
  casio: { nom: 'Type Casio', nav: ['shift', 'mode', 'x', 'left', 'right', 'up', 'down'],
    rangs: [['frac', 'sqrt', 'sq', 'pow', 'neg'], ['cos', 'sin', 'tan', 'pi', 'sd'], ['(', ')', 'pct', 'divr', 'fact'],
      ['7', '8', '9', 'del', 'ac'], ['4', '5', '6', '*', '/'], ['1', '2', '3', '+', '-'], ['0', ',', 'e10', 'ans', 'exe']] },
  ti: { nom: 'Type TI', nav: ['shift', 'mode', 'x', 'left', 'right', 'up', 'down'],
    rangs: [['frac', 'sd', 'sq', 'pow', 'sqrt'], ['sin', 'cos', 'tan', 'pi', 'pct'], ['(', ')', 'neg', 'divr', 'fact'],
      ['7', '8', '9', 'del', 'ac'], ['4', '5', '6', '*', '/'], ['1', '2', '3', '+', '-'], ['0', ',', 'e10', 'ans', 'exe']] }
};
const calcLib = (id, dispo) => (CALC_TOUCHES[id] || [id, id])[dispo === 'ti' ? 1 : 0];

/* ------------------------------ État ------------------------------ */
const CALC = { racine: [], L: null, i: 0, seconde: false, res: null, resTex: '', decimal: false, ans: cQ(0n), fini: false, err: '',
  dispo: 'casio', tableau: false, montre: null, hist: [] };
try{ if(localStorage.getItem('calcDispo') === 'ti') CALC.dispo = 'ti'; }catch(e){}
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
  let L = CALC.L, p = calcParent(L);
  while(p && p.n.t !== 'frac'){ L = p.L; p = calcParent(L); }
  if(!p) return;
  const cible = haut ? p.n.a : p.n.b; if(cible === L) return;
  CALC.L = cible; CALC.i = Math.min(CALC.i, cible.length);
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
      s += v === ',' ? '{,}' : v === '×' ? '\\times ' : v === '÷' ? '\\div ' : v === '−' ? '-' : v === '%' ? '\\%' : v === 'π' ? '\\pi ' : v === 'Ans' ? `\\text{${calcLib('ans', CALC.dispo)}}` : v === '÷R' ? '\\,\\div\\!R\\,' : v;
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
    CALC.hist.unshift({ e: calcTexListe(CALC.racine, false), r: calcResultatTex(v) }); CALC.hist.length = Math.min(CALC.hist.length, 20);
  }catch(e){ CALC.res = null; CALC.err = /^Erreur/.test(e.message) ? e.message : 'Erreur de syntaxe'; }
  CALC.fini = true;
}

/* ------------------------------ Touches ------------------------------ */
const calcContientX = L => L.some(n => n.t === 'c' ? n.v === 'x' : calcSlots(n).some(calcContientX));
// Touche pressée par l'utilisateur (souris, doigt) : la démonstration en cours s'arrête et sa bande disparaît.
function calcClic(id){
  if(CALC.montre || !document.querySelector('#calcPanneau .calc-montre-bande[hidden]')){ calcMontreStop(); const b = document.querySelector('#calcPanneau .calc-montre-bande'); if(b) b.hidden = true; }
  calcTouche(id);
}
function calcTouche(id){
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
  else if(id === 'ac'){ CALC.racine.length = 0; CALC.L = CALC.racine; CALC.i = 0; CALC.res = null; CALC.err = ''; CALC.fini = false; }
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
  #calcPanneau.ti{ background:#2B2F36; }
  .calc-tete{ display:flex; align-items:center; gap:6px; cursor:move; user-select:none; margin-bottom:8px; }
  .calc-tete b{ flex:1; font-size:.95rem; letter-spacing:.02em; }
  .calc-dispo{ display:inline-flex; background:rgba(255,255,255,.12); border-radius:999px; padding:2px; }
  .calc-dispo button{ border:0; background:transparent; color:#DCE6F2; font:600 .72rem 'Space Grotesk',Arial,sans-serif; padding:4px 9px; border-radius:999px; cursor:pointer; }
  .calc-dispo button.on{ background:#fff; color:#1F3A5C; }
  .calc-x{ border:0; background:rgba(255,255,255,.14); color:#fff; width:28px; height:28px; border-radius:50%; cursor:pointer; font-size:16px; line-height:28px; padding:0; }
  .calc-ecran{ background:#E9F0E4; color:#1C2B39; border-radius:10px; padding:6px 10px 6px; min-height:96px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:inset 0 2px 6px rgba(0,0,0,.25); }
  #calcPanneau.ti .calc-ecran{ background:#DDE3E8; }
  .calc-etat{ display:flex; gap:8px; font:700 .62rem 'JetBrains Mono',monospace; color:#5B6472; min-height:12px; }
  .calc-etat .on{ color:#C2410C; }
  .calc-expr{ font-size:1.05rem; min-height:34px; overflow-x:auto; overflow-y:hidden; white-space:nowrap; padding:2px 0; }
  .calc-res{ font-size:1.25rem; text-align:right; min-height:34px; overflow-x:auto; overflow-y:hidden; white-space:nowrap; font-weight:600; }
  .calc-res.err{ color:#B91C1C; font:700 .95rem 'Space Grotesk',Arial,sans-serif; }
  .calc-montre-bande{ margin:8px 0 0; padding:6px 8px; background:rgba(255,255,255,.1); border-radius:10px; font-size:.78rem; line-height:1.9; }
  .calc-montre-bande .k{ display:inline-block; min-width:22px; text-align:center; padding:0 6px; margin:0 2px; border-radius:6px; background:#fff; color:#1C2B39; font-weight:700; line-height:20px; }
  .calc-montre-bande .k.fait{ background:#F59E0B; color:#fff; }
  .calc-nav{ display:grid; grid-template-columns:1.6fr 1.3fr repeat(5, 1fr); gap:5px; margin:10px 0 6px; }
  .calc-k.var{ font:italic 600 1rem 'Times New Roman',Georgia,serif; }
  .calc-clav{ display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; }
  .calc-k{ position:relative; border:0; border-radius:9px; padding:13px 0 7px; font:700 .9rem 'Space Grotesk',Arial,sans-serif; background:#38557A; color:#fff; cursor:pointer;
    box-shadow:0 2px 0 rgba(0,0,0,.3); min-width:0; white-space:nowrap; overflow:hidden; }
  #calcPanneau.ti .calc-k{ background:#474D57; }
  .calc-k.num{ background:#F3F5F8; color:#1C2B39; font-size:1.05rem; } #calcPanneau.ti .calc-k.num{ background:#E7EAEE; color:#1C2B39; }
  .calc-k.op{ background:#5C7FA8; } #calcPanneau.ti .calc-k.op{ background:#5A6270; }
  .calc-k.exe{ background:#E35D3A; } #calcPanneau.ti .calc-k.exe{ background:#2E7DBA; }
  .calc-k.ac{ background:#C2410C; }
  .calc-k.sec{ background:#F59E0B; color:#1C2B39; } #calcPanneau.ti .calc-k.sec{ background:#3BA3E0; color:#fff; }
  .calc-k.nv{ padding:6px 0; font-size:.72rem; }
  .calc-k small{ position:absolute; top:1px; left:0; right:0; font:600 .55rem 'Space Grotesk',Arial,sans-serif; color:#FCD34D; }
  #calcPanneau.ti .calc-k small{ color:#8FD0F5; }
  .calc-k:active, .calc-k.appui{ transform:translateY(2px); box-shadow:none; outline:3px solid #F59E0B; outline-offset:1px; }
  .calc-seconde .calc-k[data-k="cos"], .calc-seconde .calc-k[data-k="sin"], .calc-seconde .calc-k[data-k="tan"]{ outline:2px dashed #F59E0B; }
  .calc-tab{ margin-top:8px; background:#fff; color:#1C2B39; border-radius:10px; padding:8px 10px; font-size:.8rem; }
  .calc-tab label{ display:inline-flex; align-items:center; gap:4px; margin-right:6px; }
  .calc-tab input{ width:52px; padding:3px 4px; border:1px solid #CBD2DC; border-radius:6px; font:600 .8rem 'JetBrains Mono',monospace; }
  .calc-tab table{ border-collapse:collapse; margin-top:6px; width:100%; }
  .calc-tab td, .calc-tab th{ border:1px solid #DDE2EA; padding:2px 6px; text-align:center; }
  .calc-tab-corps{ max-height:180px; overflow:auto; }
  .calc-hist{ margin-top:8px; font-size:.75rem; color:#DCE6F2; max-height:90px; overflow:auto; }
  .calc-hist div{ display:flex; justify-content:space-between; gap:8px; padding:1px 0; border-bottom:1px solid rgba(255,255,255,.1); cursor:pointer; }
  .calc-aide{ font-size:.68rem; color:#B9C7D8; margin:8px 2px 0; line-height:1.35; }
  #calcFlottant{ position:fixed; left:18px; bottom:72px; z-index:9790; width:44px; height:44px; border-radius:50%; border:0; background:#1F3A5C; color:#fff; cursor:pointer;
    box-shadow:0 4px 14px rgba(28,43,57,.25); display:none; align-items:center; justify-content:center; }
  #calcFlottant.vu{ display:flex; }
  .calc-montre{ display:inline-flex; align-items:center; gap:6px; border:1.5px solid #1F3A5C; background:#fff; color:#1F3A5C; border-radius:999px; padding:4px 12px;
    font:600 .82rem 'Inter',sans-serif; cursor:pointer; margin:4px 0; }
  .calc-montre .gicon{ font-size:18px; }
  @media print{ #calcPanneau, #calcFlottant, .calc-montre{ display:none !important; } }`;
  document.head.appendChild(st);
}
function calcTexte(tex){ try{ return katex.renderToString(tex, { throwOnError: false, trust: false }); }catch(e){ return tex; } }
function calcConstruire(){
  calcCss();
  let p = document.getElementById('calcPanneau');
  if(!p){ p = document.createElement('div'); p.id = 'calcPanneau'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Calculatrice'); p.hidden = true; document.body.appendChild(p); calcDeplacable(p); }
  const d = CALC_DISPOS[CALC.dispo], cl = k => /^[0-9,]$/.test(k) ? 'num' : /^[+\-*/]$/.test(k) ? 'op' : k === 'exe' ? 'exe' : k === 'ac' ? 'ac' : k === 'shift' ? 'sec' : '';
  const touche = (k, nv) => { const vr = k === 'x' ? ' var' : ''; const sec = CALC_SECONDE[k] ? `<small>${calcLib(CALC_SECONDE[k], CALC.dispo)}</small>` : '';
    return `<button type="button" class="calc-k ${cl(k)}${nv ? ' nv' : ''}${vr}" data-k="${k}" aria-label="${calcLib(k, CALC.dispo)}" onclick="calcClic('${k}')">${sec}${calcLib(k, CALC.dispo)}</button>`; };
  p.className = CALC.dispo === 'ti' ? 'ti' : '';
  p.innerHTML = `<div class="calc-tete"><span class="gicon">calculate</span><b>Calculatrice</b>
      <span class="calc-dispo" role="group" aria-label="Disposition des touches">${Object.entries(CALC_DISPOS).map(([k, v]) => `<button type="button" class="${k === CALC.dispo ? 'on' : ''}" onclick="calcDisposition('${k}')">${v.nom}</button>`).join('')}</span>
      <button type="button" class="calc-x" onclick="calcFermerPanneau()" aria-label="Fermer la calculatrice">×</button></div>
    <div class="calc-ecran"><div class="calc-etat"></div><div class="calc-expr"></div><div class="calc-res" aria-live="polite"></div></div>
    <div class="calc-montre-bande" hidden></div>
    <div class="calc-nav">${d.nav.map(k => touche(k, true)).join('')}</div>
    <div class="calc-clav">${d.rangs.flat().map(k => touche(k)).join('')}</div>
    <div class="calc-tab" hidden></div>
    <div class="calc-hist"></div>
    <p class="calc-aide">Calculatrice du site : les touches et les noms ressemblent à ceux des calculatrices collège, mais ce n'est pas une copie d'un modèle du commerce. Clavier de l'ordinateur accepté (chiffres, + − * / ^ ( ), Entrée, Retour arrière, flèches).</p>`;
  calcAfficher();
}
function calcAfficher(){
  const p = document.getElementById('calcPanneau'); if(!p) return;
  p.classList.toggle('calc-seconde', CALC.seconde);
  p.querySelector('.calc-etat').innerHTML = `<span class="${CALC.seconde ? 'on' : ''}">${CALC.seconde ? calcLib('shift', CALC.dispo) : ''}</span><span>DEG</span><span>${CALC.decimal ? 'Déc' : 'Exact'}</span>${CALC.tableau ? '<span class="on">TABLEAU</span>' : ''}`;
  p.querySelector('.calc-expr').innerHTML = calcTexte(calcTexListe(CALC.racine, !CALC.fini) || (CALC.fini ? '' : CALC_CURSEUR));
  const r = p.querySelector('.calc-res');
  r.classList.toggle('err', !!CALC.err);
  r.innerHTML = CALC.err ? CALC.err : CALC.fini && CALC.res ? calcTexte(calcResultatTex(CALC.res)) : '';
  const tab = p.querySelector('.calc-tab'); tab.hidden = !CALC.tableau;
  if(CALC.tableau && !tab.dataset.pret){ tab.dataset.pret = '1';
    tab.innerHTML = `<div>Tableau de valeurs de l'expression écrite (avec la touche <b>x</b>).</div>
      <div style="margin-top:4px;"><label>Début <input id="calcTabD" value="-3"></label><label>Fin <input id="calcTabF" value="3"></label><label>Pas <input id="calcTabP" value="1"></label>
      <button type="button" class="calc-montre" style="margin:4px 0 0;" onclick="calcTableau()">Calculer</button></div><div class="calc-tab-corps"></div>`; }
  p.querySelector('.calc-hist').innerHTML = CALC.hist.slice(0, 6).map((h, k) => `<div onclick="calcReprendre(${k})" title="Reprendre ce résultat (Ans)"><span>${calcTexte(h.e)}</span><span>${calcTexte(h.r)}</span></div>`).join('');
  const e = p.querySelector('.calc-expr'); e.scrollLeft = e.scrollWidth;
}
function calcReprendre(k){ const h = CALC.hist[k]; if(!h) return; CALC.racine.length = 0; CALC.racine.push({ t: 'c', v: 'Ans' }); CALC.L = CALC.racine; CALC.i = 1; CALC.fini = false; CALC.res = null; calcAfficher(); }
function calcTableau(){
  const p = document.getElementById('calcPanneau'), corps = p.querySelector('.calc-tab-corps');
  const lire = id => { const s = String(document.getElementById(id).value).replace(',', '.').trim(); const v = Number(s); if(s === '' || !isFinite(v)) throw new Error('nombre'); return v; };
  try{
    const D = lire('calcTabD'), F = lire('calcTabF'), P = lire('calcTabP');
    if(P <= 0 || F < D) throw new Error('pas');
    const n = Math.floor((F - D) / P + 1e-9) + 1; if(n > 60) throw new Error('trop');
    const enQ = v => { const s = String(+v.toFixed(10)); const [e, d = ''] = s.replace('-', '').split('.'); const q = cQ(BigInt(e + d), 10n ** BigInt(d.length)); return s[0] === '-' ? cNeg(q) : q; };
    let lignes = '';
    for(let k = 0; k < n; k++){ const x = enQ(D + k * P); let y;
      try{ y = calcTexte(calcValeurTex(calcEvaluer(CALC.racine, x), false)); }catch(e){ y = 'Erreur'; }
      lignes += `<tr><td>${calcTexte(calcValeurTex(x, true))}</td><td>${y}</td></tr>`; }
    corps.innerHTML = `<table><tr><th>x</th><th>${calcTexte(calcTexListe(CALC.racine, false) || 'f(x)')}</th></tr>${lignes}</table>`;
  }catch(e){ corps.innerHTML = `<p style="color:#B91C1C;margin:6px 0 0;">${e.message === 'trop' ? 'Au plus 60 valeurs : augmente le pas.' : 'Vérifie le début, la fin et le pas (pas positif, fin après le début).'}</p>`; }
}
function calcDeplacable(p){
  let dx = 0, dy = 0, en = false;
  p.addEventListener('pointerdown', e => { if(!e.target.closest('.calc-tete') || e.target.closest('button')) return; en = true; const r = p.getBoundingClientRect(); dx = e.clientX - r.left; dy = e.clientY - r.top; p.setPointerCapture(e.pointerId); });
  p.addEventListener('pointermove', e => { if(!en) return; p.style.left = Math.max(0, Math.min(innerWidth - 80, e.clientX - dx)) + 'px'; p.style.top = Math.max(0, Math.min(innerHeight - 60, e.clientY - dy)) + 'px'; p.style.right = 'auto'; });
  p.addEventListener('pointerup', () => { en = false; });
}
function calcOuvrir(){ calcConstruire(); document.getElementById('calcPanneau').hidden = false; }
function calcFermerPanneau(){ const p = document.getElementById('calcPanneau'); if(p) p.hidden = true; calcMontreStop(); }
function calcDisposition(d){
  if(!CALC_DISPOS[d]) return; CALC.dispo = d; try{ localStorage.setItem('calcDispo', d); }catch(e){}
  const m = CALC.montre; calcConstruire(); if(m) calcMontreBande(m.touches, m.k, m.titre);
}
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
  const b = document.querySelector('#calcPanneau .calc-montre-bande'); if(!b) return;
  b.hidden = false;
  b.innerHTML = `${titre ? `<b>${titre}</b><br>` : ''}Touches : ${touches.map((t, j) => `<span class="k${j < k ? ' fait' : ''}">${calcLib(t, CALC.dispo)}</span>`).join('')}
    <div style="font-size:.68rem;color:#B9C7D8;margin-top:2px;">Sur ta calculatrice, le nom ou la place d'une touche peut être un peu différent.</div>`;
}
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
