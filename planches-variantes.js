/* =====================================================================
   planches-variantes.js -- Autres versions d'un exercice du manuel (mêmes savoirs, autres nombres)

   Demandé : « Beaucoup d'exercices pourraient être dupliqués ou régénérés avec d'autres exemples. Ça
   permettrait, sans charger le manuel, de permettre au prof de faire des répétitions d'un même
   exercice. »

   Le manuel garde ses exercices tels qu'ils sont écrits (version 0). Une version n > 0 est fabriquée à
   la demande, toujours la même pour un même n (graine) : on peut la projeter, la mettre au cahier, en
   session (l'élève la fait à l'écran), ou en imprimer plusieurs sur une « fiche de répétition ».

   Deux sortes de générateurs :
   - explicites : l'exercice porte x.gen(alea) -> { eleve, corr, consigne? } (fractions de figures :
     fractions-figures.js ; d'autres familles s'ajoutent de la même façon) ;
   - automatiques : une liste de calculs « 47 + 9 = … », « 3,47 × 100 = … », « 5 + 4 × 3 = … » est
     reconnue dans le corrigé ; chaque calcul est refait avec d'autres nombres DE LA MÊME FORME (même
     nombre de chiffres et de décimales), en gardant les nombres qui font l'objet de l'exercice
     (× 10, + 9, − 99, × 5, × 25…) et les propriétés du résultat (entier, même nombre de décimales,
     division exacte, pas de nombre négatif). Le résultat est recalculé : le corrigé est toujours juste.
     Une liste où des nombres se répondent (« 3,7 × 24 » puis « 37 × 2,4 ») n'est pas modifiée.
   ===================================================================== */

// Générateur pseudo-aléatoire à graine (le même n donne toujours la même version).
function plAlea(seed){ let a = (seed * 2654435761) >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* ---------- Listes de calculs reconnues automatiquement ---------- */
const PLV_NB = /\d{1,3}(?:[   ]\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g;
const PLV_GARDES = new Set(['10', '100', '1000', '10000', '0,1', '0,01', '0,001', '9', '11', '19', '21', '99', '101', '999', '1001', '5', '25', '50', '4', '20', '0,5', '0,25', '1,5', '2']);
const plvBrut = s => String(s).replace(/[   ]/g, '');
const plvVal = s => parseFloat(plvBrut(s).replace(',', '.'));
function plvFormat(v, dec){
  const s = (Math.round(v * 1e9) / 1e9).toFixed(dec), [e, d] = s.split('.');
  const ent = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : e;
  return d ? ent + ',' + d : ent;
}
const plvDec = s => { const m = /,(\d+)$/.exec(plvBrut(s)); return m ? m[1].length : 0; };
const plvDecVal = v => { const s = String(Math.round(v * 1e9) / 1e9); return s.includes('.') ? s.split('.')[1].length : 0; };
// Valeur du trou « @ » dans une égalité écrite à la française (« 25 + @ = 40 », « 3 × 7 = @ ») ;
// null si illisible ou si le trou n'est pas « au premier degré ».
function plvResout(tpl){
  const t = tpl.replace(/\s*=\s*$/, '= @').replace(PLV_NB, m => String(plvVal(m))).replace(/[×x]/g, '*').replace(/[:÷]/g, '/').replace(/−/g, '-');
  const cotes = t.split('='); if(cotes.length !== 2 || (t.match(/@/g) || []).length !== 1) return null;
  if(!/^[\d\s.+\-*/()@=]+$/.test(t)) return null;
  const f = X => { try{ const g = Function('"use strict";return (' + cotes[0].replace('@', '(' + X + ')') + ')-(' + cotes[1].replace('@', '(' + X + ')') + ')'); const v = g(); return isFinite(v) ? v : NaN; }catch(e){ return NaN; } };
  const f0 = f(0), f1 = f(1), f2 = f(2);
  if([f0, f1, f2].some(isNaN) || Math.abs(f1 - f0) < 1e-12 || Math.abs((f2 - f1) - (f1 - f0)) > 1e-9) return null;
  const v = Math.round(-f0 / (f1 - f0) * 1e9) / 1e9; return Math.abs(f(v)) < 1e-7 ? v : null;
}
const plvCalc = txt => plvResout(txt);
// Un nombre de la même forme : même nombre de chiffres avant la virgule, même nombre de décimales.
// Le nouveau nombre reste du même ordre (entre la moitié et le double de l'ancien) ; pas de 1 ni de 0
// à la place d'un chiffre seul (« × 1 », « : 1 » n'apprendraient rien).
function plvForme(s, alea){
  const b = plvBrut(s), [e, d] = b.split(','), n = e.length, dec = d ? d.length : 0, o = plvVal(s);
  for(let t = 0; t < 60; t++){
    let ent = n === 1 ? String(e === '0' ? 0 : (e === '1' ? 1 : 2) + Math.floor(alea() * (e === '1' ? 9 : 8))) : String(1 + Math.floor(alea() * 9)) + Array.from({ length: n - 1 }, () => Math.floor(alea() * 10)).join('');
    // nombre rond (3 500, 20, 6 000) : autant de zéros à la fin
    const z = !dec && n >= 2 ? (/0+$/.exec(e) || [''])[0].length : 0;
    if(z && z < n) ent = ent.slice(0, n - z) + '0'.repeat(z);
    let fr = Array.from({ length: dec }, () => Math.floor(alea() * 10)).join('');
    if(dec && fr.endsWith('0')) fr = fr.slice(0, -1) + (1 + Math.floor(alea() * 9));
    const v = parseFloat(ent + (dec ? '.' + fr : ''));
    if(!(v > 0 || e === '0')) continue;
    if(o >= 2 && !(n === 1 && !dec) && (v < o / 2 || v > o * 2) && t < 50) continue;
    return { v, dec };
  }
  return { v: o, dec };
}
// Analyse d'un exercice : liste <li> du corrigé dont chaque ligne est un calcul à compléter (trou
// n'importe où), une division euclidienne (quotient et reste), ou une comparaison (<, >, =).
const PLV_REP_NB = /^\d{1,3}(?:[   ]\d{3})*(?:,\d+)?$|^\d+(?:,\d+)?$/;
const plvSigne = t => t === '<' || t === '&lt;' ? '<' : t === '>' || t === '&gt;' ? '>' : t === '=' ? '=' : null;
function plvLigne(li){
  const reps = [...li.querySelectorAll('.pl-rep')]; if(!reps.length || reps.length > 2) return null;
  let tpl = ''; li.childNodes.forEach(n => { tpl += reps.includes(n) ? ' @ ' : n.textContent; });
  tpl = tpl.replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim();
  const rv = reps.map(r => r.textContent.trim()), nbs = tpl.match(PLV_NB) || [];
  if(nbs.some(s => /^0\d/.test(plvBrut(s)))) return null;
  // division euclidienne
  let m;
  if(reps.length === 2 && rv.every(r => /^\d+$/.test(r)) && ((m = /^(\S+(?: \d{3})*) = (\d+) × @ \+ @$/.exec(tpl)) || (m = /^(\S+(?: \d{3})*) : (\d+) → quotient @, reste @$/.exec(tpl)))){
    const a = plvVal(m[1]), d = +m[2]; if(Math.floor(a / d) !== +rv[0] || a % d !== +rv[1]) return null;
    return { k: 'eucl', tpl, nbs, reps: rv };
  }
  if(reps.length !== 1) return null;
  // comparaison « A @ B »
  const sg = plvSigne(rv[0]);
  if(sg && nbs.length === 2 && /^[\d ,]+ @ [\d ,]+$/.test(tpl)){
    const A = plvVal(nbs[0]), B = plvVal(nbs[1]); if((A < B ? '<' : A > B ? '>' : '=') !== sg) return null;
    return { k: 'cmp', tpl, nbs, reps: rv };
  }
  // « 58 = 7 × 8 + … » : division euclidienne avec un seul trou (le reste reste plus petit que le diviseur)
  if((m = /^(\S+(?: \d{3})*) = (\d+) × (\d+|@) \+ (\d+|@)$/.exec(tpl)) && (m[3] === '@') !== (m[4] === '@')){
    const a = plvVal(m[1]), d = +m[2], q = m[3] === '@' ? +rv[0] : +m[3], r = m[4] === '@' ? +rv[0] : +m[4];
    if(Math.floor(a / d) !== q || a - d * q !== r) return null;
    return { k: 'eucl1', tpl, nbs, reps: rv, trou: m[3] === '@' ? 'q' : 'r' };
  }
  // calcul à compléter ; si les deux membres sont des calculs (« 8 + 7 = … + 10 »), chacun n'a que deux
  // nombres (une identité comme « 9 × 4 + 9 × 6 = 9 × (4 + 6) » ne se refait pas au hasard)
  const cotes = tpl.split('=');
  if(cotes.length === 2 && cotes.every(c => /[+\-−×x:÷]/.test(c)) && cotes.some(c => (c.match(/\d+(?:,\d+)?|@/g) || []).length > 2)) return null;
  if(!PLV_REP_NB.test(rv[0]) || !/^[\d\s,()+\-−×x:÷=@]+$/.test(tpl) || !/[+\-−×x:÷]/.test(tpl)) return null;
  const v = plvResout(tpl.replace('@', ' @ ').replace(/\s*@\s*$/, ' @')); if(v === null || Math.abs(v - plvVal(rv[0])) > 1e-9) return null;
  return { k: 'eq', tpl, nbs, reps: rv };
}
function plvAnalyse(x){
  if(!x || !x.corr || !x.eleve || typeof document === 'undefined') return null;
  const dc = document.createElement('div'), de = document.createElement('div'); dc.innerHTML = x.corr; de.innerHTML = x.eleve;
  const lc = [...dc.querySelectorAll('li')], le = [...de.querySelectorAll('li')];
  if(lc.length < 2 || lc.length !== le.length || dc.querySelectorAll('svg').length) return null;
  const conv = lc.map(plvConv);
  if(conv.every(Boolean)) return { conv, items: [] };
  const items = lc.map(plvLigne); if(!items.every(Boolean)) return null;
  // Nombres qui se répondent d'une ligne à l'autre (mêmes chiffres, écriture différente) : on ne touche à rien.
  const vus = new Map();
  for(const it of items) for(const s of it.nbs){ const k = plvBrut(s).replace(',', ''); if(k.length < 2) continue; const a = vus.get(k); if(a && a !== plvBrut(s)) return null; vus.set(k, plvBrut(s)); }
  const table = items.every(it => it.k === 'eq' && it.nbs.length === 2 && /^\d+ [×x] \d+ = @$/.test(it.tpl) && it.nbs.every(s => +s >= 2 && +s <= 10));
  return { items, table };
}
const zFin = v => { let z = 0; v = Math.round(Math.abs(v)); while(v && v % 10 === 0){ v /= 10; z++; } return z; };
// Refait une ligne ; garde un nombre « objet de l'exercice » ; null si on ne trouve pas.
function plvItem(it, alea, table, fixe, pris){
  const cle = s => s.replace(/\s+/g, '');
  if(it.k === 'eucl'){
    for(let t = 0; t < 200; t++){ const a = plvForme(it.nbs[0], alea), d = plvForme(it.nbs[1], alea);
      if(d.v < 2 || a.dec || d.dec) continue; const q = Math.floor(a.v / d.v), r = a.v - q * d.v; if(q < 1) continue;
      const nbs = [plvFormat(a.v, 0), String(d.v)]; if(pris.has(cle(nbs.join('|')))) continue; pris.add(cle(nbs.join('|')));
      return { nbs, reps: [plvFormat(q, 0), plvFormat(r, 0)] }; }
    return null;
  }
  if(it.k === 'eucl1'){
    for(let t = 0; t < 200; t++){ const a = plvForme(it.nbs[0], alea), d = plvForme(it.nbs[1], alea);
      if(d.v < 2 || a.dec || d.dec) continue; const q = Math.floor(a.v / d.v), r = a.v - q * d.v; if(q < 1) continue;
      const nbs = [plvFormat(a.v, 0), String(d.v), String(it.trou === 'q' ? r : q)]; if(pris.has(nbs.join('|'))) continue; pris.add(nbs.join('|'));
      return { nbs, reps: [String(it.trou === 'q' ? q : r)] }; }
    return null;
  }
  if(it.k === 'cmp'){
    const A = plvVal(it.nbs[0]), B = plvVal(it.nbs[1]), dB = plvDec(it.nbs[1]);
    for(let t = 0; t < 200; t++){ const a = plvForme(it.nbs[0], alea), b = A === B ? a.v : a.v * B / A;
      const nb = plvFormat(b, dB); if(plvBrut(nb).split(',')[0].length !== plvBrut(it.nbs[1]).split(',')[0].length) continue;
      const bv = plvVal(nb), na = plvFormat(a.v, a.dec); if(A !== B && bv === a.v) continue; if(pris.has(na + '|' + nb)) continue; pris.add(na + '|' + nb);
      const sg = a.v < bv ? '<' : a.v > bv ? '>' : '=';
      return { nbs: [na, nb], reps: [sg === '<' ? '&lt;' : sg === '>' ? '&gt;' : '='], html: true }; }
    return null;
  }
  const decRep = plvDec(it.reps[0]), positif = plvVal(it.reps[0]) >= 0, entier = !/,/.test(it.reps[0]);
  // calcul à deux nombres : on garde le nombre « objet » (+ 9, × 10, × 5…) ; enchaînement de calculs
  // (priorités) : seulement les puissances de 10.
  const special = s => it.nbs.length > 2 ? /^(10+|0,0*1)$/.test(plvBrut(s)) : PLV_GARDES.has(plvBrut(s));
  const garde = it.nbs.map((s, i) => !table && special(s) && !(it.nbs.every(special) && i === 0));
  if(!table && garde.every(Boolean)) return null;
  for(let t = 0; t < 400; t++){
    const nouv = it.nbs.map((s, i) => {
      if(fixe.has(plvBrut(s))) return fixe.get(plvBrut(s));
      if(garde[i]) return s;
      if(table) return String(2 + Math.floor(alea() * 8));
      const f = plvForme(s, alea); return plvFormat(f.v, f.dec);
    });
    if(nouv.every((s, i) => plvBrut(s) === plvBrut(it.nbs[i]))) continue;
    let k = 0; const txt = it.tpl.replace(PLV_NB, () => nouv[k++]);
    if(pris.has(cle(txt))) continue; // pas deux fois le même calcul dans la liste
    const v = plvResout(txt); if(v === null) continue;
    if(positif && v < 0) continue;
    if(plvDecVal(v) !== decRep || (entier && !Number.isInteger(v))) continue;
    if(entier && zFin(v) < zFin(plvVal(it.reps[0]))) continue; // résultat rond (4 000) : il reste rond
    pris.add(cle(txt));
    return { nbs: nouv, reps: [plvFormat(v, decRep)] };
  }
  return null;
}
// Version n d'un exercice-liste : les mêmes <li>, d'autres nombres.
function plvAuto(x, A, alea){
  if(A.conv) return plvConvAuto(x, A, alea);
  const fixe = new Map(), pris = new Set(), res = A.items.map(it => {
    const r = plvItem(it, alea, A.table, fixe, pris); if(!r) return null;
    // un nombre repris dans plusieurs lignes (36 × 10, 36 × 100…) garde la même nouvelle valeur
    if(it.k === 'eq') it.nbs.forEach((s, i) => { const b = plvBrut(s); if(!fixe.has(b) && A.items.filter(o => o.nbs.some(z => plvBrut(z) === b)).length > 1) fixe.set(b, r.nbs[i]); });
    return r;
  });
  const refaire = html => { const d = document.createElement('div'); d.innerHTML = html;
    [...d.querySelectorAll('li')].forEach((li, n) => { const r = res[n]; if(!r) return; let k = 0;
      const tw = document.createTreeWalker(li, NodeFilter.SHOW_TEXT, { acceptNode: t => t.parentElement.closest('.pl-rep') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      for(let t = tw.nextNode(); t; t = tw.nextNode()) t.nodeValue = t.nodeValue.replace(PLV_NB, m => k < r.nbs.length ? r.nbs[k++] : m);
      li.querySelectorAll('.pl-rep').forEach((rp, j) => { if(r.html) rp.innerHTML = r.reps[j]; else rp.textContent = r.reps[j]; }); });
    return d.innerHTML; };
  return { eleve: refaire(x.eleve), corr: refaire(x.corr) };
}

/* ---------- Conversions « 3 km = … m » ---------- */
const PLV_UNITES = (() => { const u = {};
  const fam = (f, l) => Object.entries(l).forEach(([k, v]) => { u[k] = { f, v }; });
  fam('long', { km: 1000, hm: 100, dam: 10, m: 1, dm: .1, cm: .01, mm: .001 });
  fam('masse', { t: 1e6, q: 1e5, kg: 1000, hg: 100, dag: 10, g: 1, dg: .1, cg: .01, mg: .001 });
  fam('cont', { hL: 100, daL: 10, L: 1, l: 1, dL: .1, cL: .01, mL: .001 });
  fam('aire', { 'km²': 1e6, 'hm²': 1e4, ha: 1e4, 'dam²': 100, a: 100, 'm²': 1, 'dm²': .01, 'cm²': 1e-4, 'mm²': 1e-6 });
  fam('vol', { 'm³': 1000, 'dm³': 1, 'cm³': .001, 'mm³': 1e-6 });
  fam('duree', { j: 86400, h: 3600, min: 60, s: 1 });
  return u; })();
// Une ligne « nombre unité = [réponse] unité » ; la réponse est recalculée par le rapport des unités.
function plvConv(li){
  const reps = li.querySelectorAll('.pl-rep'); if(reps.length !== 1) return null;
  const rp = reps[0], av = [], ap = []; let apres = false;
  li.childNodes.forEach(n => { if(n === rp){ apres = true; return; } (apres ? ap : av).push(n.textContent); });
  const a = av.join('').replace(/[  ]/g, ' ').trim(), b = ap.join('').replace(/[  ]/g, ' ').trim().replace(/[.;]$/, '');
  const m = /^(\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?)\s*([a-zA-Z²³]+)\s*=$/.exec(a), u2 = PLV_UNITES[b], rep = rp.textContent.trim();
  if(!m || !u2 || !PLV_UNITES[m[2]] || PLV_UNITES[m[2]].f !== u2.f) return null;
  const f = PLV_UNITES[m[2]].v / u2.v, val = plvVal(m[1]) * f;
  if(!/^\d{1,3}(?:[   ]\d{3})*(?:,\d+)?$|^\d+(?:,\d+)?$/.test(rep) || Math.abs(val - plvVal(rep)) > 1e-9 * Math.max(1, val)) return null;
  return { nb: m[1], f, rep };
}
function plvConvAuto(x, A, alea){
  const pris = new Set(), res = A.conv.map(c => {
    for(let t = 0; t < 200; t++){ const g = plvForme(c.nb, alea), nb = plvFormat(g.v, g.dec), v = Math.round(g.v * c.f * 1e9) / 1e9;
      if(plvBrut(nb) === plvBrut(c.nb) || pris.has(nb) || plvDecVal(v) > 4) continue;
      pris.add(nb); return { nb, rep: plvFormat(v, plvDecVal(v)) }; }
    return null; });
  const refaire = html => { const d = document.createElement('div'); d.innerHTML = html;
    [...d.querySelectorAll('li')].forEach((li, n) => { const r = res[n]; if(!r) return; let fait = false;
      for(const t of li.childNodes){ if(t.nodeType === 3 && !fait && /\d/.test(t.nodeValue)){ t.nodeValue = t.nodeValue.replace(PLV_NB, () => r.nb); fait = true; } }
      const rp = li.querySelector('.pl-rep'); if(rp) rp.textContent = r.rep; });
    return d.innerHTML; };
  return { eleve: refaire(x.eleve), corr: refaire(x.corr) };
}

/* ---------- Interface pour le manuel ---------- */
const plvCache = new WeakMap();
function plvAuto0(x){ if(!plvCache.has(x)) plvCache.set(x, plvAnalyse(x)); return plvCache.get(x); }
// L'exercice a-t-il d'autres versions ?
function plVariable(x){ return !!(x && (typeof x.gen === 'function' || plvAuto0(x))); }
// Version v de l'exercice x (v = 0 ou absent : l'exercice du manuel).
// Les versions sont gardées : la même version est le même objet (les exercices à l'écran s'en servent).
const plvVersions = new WeakMap();
function plVariante(x, v){
  if(!x || !v) return x;
  if(!plvVersions.has(x)) plvVersions.set(x, new Map());
  const m = plvVersions.get(x); if(m.has(v)) return m.get(v);
  // graine propre à l'exercice : deux exercices n'ont pas les mêmes nombres pour une même version
  let h = 2166136261; for(const ch of String(x.corr || x.consigne || '')){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  const alea = plAlea(((h >>> 0) % 100000) * 101 + v * 7919 + 13); let y = x;
  try{
    if(typeof x.gen === 'function') y = Object.assign({}, x, x.gen(alea), { v });
    else { const A = plvAuto0(x); if(A) y = Object.assign({}, x, plvAuto(x, A, alea), { v }); }
  }catch(e){ console.warn('Variante impossible', e); }
  m.set(v, y); return y;
}
