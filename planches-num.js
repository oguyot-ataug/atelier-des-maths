/* =====================================================================
   planches-num.js -- Exercices des planches faits à l'écran (au tableau ou dans une session COURS).

   Demandé : « Des exercices type colorier des parts de fractions, placer, remplir des cases pourraient
   se faire numériquement avec des outils. Ça permettrait de faire des exercices en ouverture de
   session (bouton ajouter à la session). Pour l'élève au tableau, il pourrait se servir des outils de
   remplissage ou numérique (avec un petit clavier virtuel qui s'affiche) et un bouton vérifier ma
   réponse. »

   Rien à écrire en plus dans les chapitres : la version à l'écran est déduite de l'énoncé (eleve) et
   du corrigé (corr) de la planche, en les comparant.
   - Cases et pointillés (plFrac, plCase, plPointilles) ↔ réponses du corrigé (plRep), dans l'ordre :
     on touche la case, un clavier virtuel s'affiche (chiffres, < = >, lettres).
   - Figure blanche dans l'énoncé, coloriée dans le corrigé (bandes, disques, carrés, plUnites) : on
     touche les parts pour les colorier ; il faut colorier AUTANT de parts que le corrigé (n'importe
     lesquelles).
   - Fractions à entourer ou à barrer (plEntoure, plBarre) : on touche les bonnes.
   - « vrai · faux » : on touche le bon mot.
   - Droite à tracer sur un quadrillage (figure marquée data-pltrace) : on touche deux nœuds, la droite
     passe par eux ; elle est juste si elle passe par le point demandé dans la bonne direction.
   Si une partie du corrigé ne peut pas être vérifiée ainsi (demi-droite à graduer, bande à tracer,
   exercice « Dans ton cahier »), l'exercice reste sur papier : plNumPossible renvoie faux.

   État (enregistré dans une session) : { v: { idCase: 'texte' }, c: { idFigure: [parts] }, t: [ids],
   ch: { idChoix: 'mot' } } ; résultat d'une vérification : { juste, total, d: [vrai/faux par cible] }.
   ===================================================================== */

const plNumCache = new Map();
// Normalisation d'une réponse : espaces, casse, ponctuation finale ; un nombre perd ses zéros de tête
// (« 05 » minutes = « 5 ») et ses espaces (« 1 200 » = « 1200 »).
const plNumNorm = s => { const t = String(s ?? '').replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().replace(/[.!]$/, '').replace(/’/g, '\''), n = t.replace(/(\d) (?=\d)/g, '$1').replace(/[−–]/g, '-'); if(/^\d+$/.test(n)) return String(+n); return /[a-zà-ÿ]/i.test(n) ? (/[a-zà-ÿ]{3,}/i.test(t) ? t.replace(/[−–]/g, '-') : n.replace(/\s+/g, '')) : n.replace(/\s+/g, ''); }; // calcul littéral (« 5x + 3 », « 12 h 30 ») : sans espaces non plus // calcul (« 5 000 000 + 8 ») : sans espaces
// Grands nombres écrits par classes -- relecture 6e-N1-P1 : « En version numérique, respecter l'écriture avec
// espace des grands nombres ». Un entier de 5 chiffres ou plus doit être écrit par classes de trois chiffres
// séparées par un espace (2 300 000) ; « 2300000 » ou « 2 30 0000 » sont faux. Jusqu'à 4 chiffres, les deux
// écritures restent acceptées (1 200 ou 1200). La partie décimale n'est pas concernée.
function plNumClassesOk(s){
  const t = String(s ?? '').replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ');
  const re = /\d+(?: \d+)*/g; let m;
  while((m = re.exec(t))){
    if(m.index > 0 && /[,.]/.test(t[m.index - 1])) continue;
    if(m[0].replace(/ /g, '').length >= 5 && !/^\d{1,3}(?: \d{3})+$/.test(m[0])) return false;
  }
  return true;
}
// Fraction écrite en LaTeX dans un bout de corrigé : [numérateur, dénominateur] ou null.
function plNumFracDe(el){
  const t = el.querySelector('.tex'), m = t && /\\[dt]?frac\{([^}]*)\}\{([^}]*)\}/.exec(t.textContent);
  return m && plNumNorm(t.textContent.replace(m[0], '')) === '' ? [m[1].trim(), m[2].trim()] : null;
}
function plNumFormes(svg){ return [...svg.querySelectorAll('polygon, path, rect')].filter(s => s.getAttribute('fill')); }
const plNumBlanc = f => /^(#fff|#ffffff|white|none)$/i.test(f || '');

// Analyse : modèle de l'exercice (énoncé transformé + clé), ou null s'il reste sur papier.
function plNumModele(x){
  if(x && x.ecran) x = Object.assign({}, x, x.ecran); // version écran d'un exercice papier (opération posée sans quadrillage…)
  if(!x || x.cahier || !x.eleve || !x.corr) return null;
  const cle = x.eleve + '\u0000' + x.corr;
  if(plNumCache.has(cle)) return plNumCache.get(cle);
  let m = null;
  try{ m = plNumAnalyser(x); }catch(e){ console.warn('plNum', e); m = null; }
  plNumCache.set(cle, m); return m;
}
function plNumPossible(x){ return !!plNumModele(x); }
function plNumAnalyser(x){
  const E = document.createElement('div'), C = document.createElement('div');
  E.innerHTML = x.eleve; C.innerHTML = x.corr;
  if(C.querySelector('.cm-redac')) return null;
  const cibles = []; // { type, id, rep }
  // 0. Outils déclarés dans la planche (data-plx : barres, segments, cases, points, horloge, robot…).
  E.querySelectorAll('[data-plx]').forEach(el => { let cfg; try{ cfg = JSON.parse(el.getAttribute('data-plx')); }catch(e){ return; }
    if(!PLX[cfg.t]) return; const id = 'x' + cibles.length; el.setAttribute('data-pn', id); el.classList.add('pn-x', 'pn-x-' + cfg.t);
    el.insertAdjacentHTML('afterend', `<div class="pn-xbar" data-pnxbar="${id}"></div>`);
    cibles.push({ type: 'x', id, rep: cfg }); });
  // 1. Choix « vrai · faux » et fractions à entourer / barrer (items d'une grille ou d'une liste).
  const itE = [...E.querySelectorAll('.pl-item, li')], itC = [...C.querySelectorAll('.pl-item, li')];
  const marques = C.querySelectorAll('.pl-entoure, .pl-barre-rep').length;
  let vues = 0;
  if(marques){
    if(itE.length !== itC.length) return null;
    const bascules = [];
    itE.forEach((ei, n) => {
      const ci = itC[n], mk = ci.querySelectorAll('.pl-entoure, .pl-barre-rep');
      const b = [...ei.querySelectorAll('b')].find(z => /^\s*[^·]+(·[^·]+)+$/.test(z.textContent)); // deux mots ou plus : « vrai · faux », « + · − · × · ÷ »
      if(b){
        if(mk.length !== 1) return; vues++;
        const mots = b.textContent.split('·').map(s => s.trim()), id = 'ch' + cibles.length;
        b.outerHTML = `<span class="pn-choix" data-pn="${id}">${mots.map(w => `<button type="button" class="pn-mot" data-pnmot="${escapeHtml(w)}">${escapeHtml(w)}</button>`).join('<span class="pn-sep">·</span>')}</span>`;
        cibles.push({ type: 'choix', id, rep: plNumNorm(mk[0].textContent) });
        return;
      }
      if(ei.querySelector('.pl-frac, .pl-case, .pl-pts')) return;
      bascules.push([ei, mk]);
    });
    const mode = C.querySelector('.pl-barre-rep') ? 'barre' : 'entoure';
    if(bascules.some(([, mk]) => mk.length)){
      const id = 't' + cibles.length, attendus = [];
      bascules.forEach(([ei, mk], j) => { vues += mk.length;
        ei.innerHTML = `<button type="button" class="pn-bascule pn-${mode}" data-pnt="${id}:${j}">${ei.innerHTML}</button>`;
        if(mk.length) attendus.push(j); });
      cibles.push({ type: 'bascule', id, rep: attendus, mode });
    }
    if(vues !== marques) return null;
  }
  // 2. Cases et pointillés ↔ réponses du corrigé, dans l'ordre.
  const trous = [...E.querySelectorAll('.pl-frac, .pl-case-seule, .pl-pts')].filter(t => !t.closest('[data-plx]')), reps = [...C.querySelectorAll('.pl-rep')];
  if(trous.length !== reps.length) return null;
  for(let n = 0; n < trous.length; n++){
    const tr = trous[n], r = reps[n], id = 'v' + cibles.length;
    if(tr.classList.contains('pl-frac')){
      const f = plNumFracDe(r); if(!f) return null;
      tr.outerHTML = `<span class="pn-frac" data-pn="${id}"><button type="button" class="pn-case" data-pnv="${id}n"></button><span class="pn-barre"></span><button type="button" class="pn-case" data-pnv="${id}d"></button></span>`;
      cibles.push({ type: 'frac', id, rep: f });
    } else {
      if(plNumFracDe(r)) return null;
      const rep = plNumNorm(r.textContent); if(!rep) return null;
      const large = tr.classList.contains('pl-pts') && /[a-z]/i.test(rep);
      const lg = r.textContent.replace(/\s+/g, ' ').trim().length; // case à la taille de la réponse attendue
      tr.outerHTML = `<button type="button" class="pn-case${large ? ' pn-large' : ''}${tr.classList.contains('pl-case-seule') ? ' pn-signe' : ''}" data-pn="${id}" data-pnv="${id}"${!tr.classList.contains('pl-case-seule') && lg > 4 ? ` style="min-width:${Math.min(320, lg * 11 + 16)}px"` : ''}></button>`;
      // classes : la réponse attendue contient un grand nombre écrit par classes, l'élève doit l'écrire ainsi.
      const brut = r.textContent.replace(/[\u00a0\u202f]/g, ' '), classes = /\d{1,3}(?: \d{3})+/.test(brut) && /\d{5}/.test(brut.replace(/(\d) (?=\d)/g, '$1')) && plNumClassesOk(brut);
      cibles.push({ type: 'txt', id, rep, classes, maj: /^[(\[]?[A-ZÉÈ]/.test(r.textContent.trim()) }); // réponse en majuscule (nom de point…) : clavier en majuscules
    }
  }
  // 3. Figures blanches dans l'énoncé, coloriées dans le corrigé.
  let svE = [...E.querySelectorAll('svg')], svC = [...C.querySelectorAll('svg')];
  if(svE.length !== svC.length) return null;
  { const garde = svE.map(a => !a.closest('[data-plx]')); svE = svE.filter((_, i) => garde[i]); svC = svC.filter((_, i) => garde[i]); } // outils déclarés : déjà pris en compte
  const groupes = new Map();
  for(let n = 0; n < svE.length; n++){
    const a = svE[n], b = svC[n];
    // Droite à tracer sur un quadrillage (data-pltrace : { k, w, h, M, v }) : on touche deux nœuds.
    if(a.hasAttribute('data-pltrace')){
      const id = 'r' + cibles.length; let P; try{ P = JSON.parse(a.getAttribute('data-pltrace')); }catch(e){ return null; }
      a.setAttribute('data-pn', id); a.classList.add('pn-trace');
      a.insertAdjacentHTML('afterend', '<div class="pn-tr-aide">Touche deux points du quadrillage : la droite passe par ces deux points. Touche encore pour recommencer.</div>');
      cibles.push({ type: 'trace', id, rep: P }); continue;
    }
    if(a.outerHTML === b.outerHTML) continue;
    const fa = plNumFormes(a), fb = plNumFormes(b);
    if(!fa.length) continue; // rien à colorier : le corrigé ajoute seulement un dessin (équerre posée, tracé…)
    if(fa.some(f => !plNumBlanc(f.getAttribute('fill')))) continue; // figure déjà coloriée : c'est une illustration (schéma, figure codée…)
    if(fa.length !== fb.length) return null;
    const pleines = fb.filter(f => !plNumBlanc(f.getAttribute('fill')));
    const g = a.closest('.pl-unites') || a;
    if(!groupes.has(g)) groupes.set(g, { id: 'c' + (cibles.length + groupes.size), rep: 0, coul: null, n: 0 });
    const G = groupes.get(g);
    G.rep += pleines.length; if(pleines.length && !G.coul) G.coul = pleines[0].getAttribute('fill');
    fa.forEach(f => { f.setAttribute('data-pnp', `${G.id}:${G.n++}`); f.classList.add('pn-part'); });
  }
  groupes.forEach((G, g) => { if(!G.rep) return; /* rien à colorier dans le corrigé : ce n'est pas un coloriage */ g.setAttribute('data-pn', G.id); g.classList.add('pn-fig'); cibles.push({ type: 'fig', id: G.id, rep: G.rep, coul: G.coul || '#E35D3A' }); });
  if(!cibles.length) return null;
  return { html: E.innerHTML, cibles };
}

/* ---------- Montage interactif ----------
   plNum(root, x, { etat, res, lecture, onChange }) : écrit l'exercice dans root et le rend actif.
   Renvoie { etat(), verifier(), effacer(), marquer(res), total } ou null. */
function plNum(root, x, o){
  const M = plNumModele(x); if(!M) return null;
  o = o || {};
  let etat = plNumEtatVide(o.etat), sel = null;
  root.classList.add('pn-ex'); root.classList.toggle('pn-lecture', !!o.lecture);
  root.innerHTML = M.html;
  const NS = 'http://www.w3.org/2000/svg';
  M.cibles.filter(c => c.type === 'trace').forEach(c => {
    const svg = root.querySelector(`[data-pn="${c.id}"]`), P = c.rep; if(!svg) return;
    const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'pn-tr');
    g.innerHTML = `<line class="pn-tr-ligne" stroke="#E35D3A" stroke-width="2.4" stroke-linecap="round" style="display:none"/>`
      + Array.from({ length: Math.round(P.w / P.k) + 1 }, (_, i) => Array.from({ length: Math.round(P.h / P.k) + 1 }, (_, j) => `<circle class="pn-tr-n" data-pntr="${c.id}:${i}:${j}" cx="${i * P.k}" cy="${j * P.k}" r="${P.k * .42}" fill="transparent"/>`).join('')).join('');
    svg.appendChild(g);
  });
  // Droite passant par deux nœuds, coupée au bord du quadrillage.
  const trSeg = (P, A, B) => { const v = [B[0] - A[0], B[1] - A[1]]; let t0 = -1e9, t1 = 1e9; [[0, P.w], [0, P.h]].forEach(([mn, mx], i) => { if(Math.abs(v[i]) < 1e-9) return; const a = (mn - A[i]) / v[i], b = (mx - A[i]) / v[i]; t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b)); }); return [A[0] + v[0] * t0, A[1] + v[1] * t0, A[0] + v[0] * t1, A[1] + v[1] * t1]; };
  M.cibles.filter(c => c.type === 'x').forEach(c => { const el = root.querySelector(`[data-pn="${c.id}"]`);
    if(el && el.tagName.toLowerCase() === 'svg'){ const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'pn-xg'); el.appendChild(g); } });
  // Outils qu'on fait glisser (rapporteur) : K.monter(cfg, svg, lire, ecrire) branche les gestes une fois.
  M.cibles.filter(c => c.type === 'x' && PLX[c.rep.t].monter).forEach(c => { const el = root.querySelector(`[data-pn="${c.id}"]`); if(!el || o.lecture) return;
    PLX[c.rep.t].monter(c.rep, el, () => JSON.parse(JSON.stringify(etat.x[c.id] || {})), st => { etat.x[c.id] = st; effacerMarques(); afficher(); change(); }); });
  if(typeof renderStaticMath === 'function') renderStaticMath(root);
  const change = () => { if(o.onChange) o.onChange(plNumCopie(etat)); };
  const afficher = () => {
    root.querySelectorAll('[data-pnv]').forEach(b => { const v = etat.v[b.dataset.pnv] || ''; b.textContent = v; b.classList.toggle('pn-vide', !v); b.classList.toggle('pn-sel', sel === b.dataset.pnv); });
    M.cibles.filter(c => c.type === 'fig').forEach(c => { const on = new Set(etat.c[c.id] || []);
      root.querySelectorAll(`[data-pnp^="${c.id}:"]`).forEach(p => { const n = +p.dataset.pnp.split(':')[1];
        p.setAttribute('fill', on.has(n) ? c.coul : '#fff'); p.setAttribute('fill-opacity', on.has(n) ? '.8' : '1'); }); });
    root.querySelectorAll('[data-pnt]').forEach(b => b.classList.toggle('on', etat.t.includes(b.dataset.pnt)));
    M.cibles.filter(c => c.type === 'trace').forEach(c => { const pts = etat.tr[c.id] || [], P = c.rep, svg = root.querySelector(`[data-pn="${c.id}"]`); if(!svg) return;
      svg.querySelectorAll('.pn-tr-n').forEach(n => { const [, i, j] = n.dataset.pntr.split(':').map(Number), on = pts.some(q => q[0] === i && q[1] === j); n.setAttribute('fill', on ? '#E35D3A' : 'transparent'); n.setAttribute('r', on ? P.k * .2 : P.k * .42); });
      const l = svg.querySelector('.pn-tr-ligne');
      if(pts.length === 2){ const [x1, y1, x2, y2] = trSeg(P, [pts[0][0] * P.k, pts[0][1] * P.k], [pts[1][0] * P.k, pts[1][1] * P.k]); l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2); l.style.display = ''; }
      else l.style.display = 'none'; });
    root.querySelectorAll('.pn-choix').forEach(s => s.querySelectorAll('.pn-mot').forEach(b => b.classList.toggle('on', etat.ch[s.dataset.pn] === b.dataset.pnmot)));
    M.cibles.filter(c => c.type === 'x').forEach(c => { const el = root.querySelector(`[data-pn="${c.id}"]`), bar = root.querySelector(`[data-pnxbar="${c.id}"]`), K = PLX[c.rep.t], st = etat.x[c.id] || {};
      if(!el) return; const g = el.querySelector(':scope > .pn-xg');
      if(g) g.innerHTML = K.dessin ? K.dessin(c.rep, st) : ''; else if(K.texte) el.innerHTML = K.texte(c.rep, st);
      if(bar) bar.innerHTML = K.barre ? K.barre(c.rep, st, c.id) : ''; });
  };
  const effacerMarques = () => root.querySelectorAll('.pn-ok, .pn-ko, .pn-b-ok, .pn-b-ko, .pn-b-oubli').forEach(e => { e.classList.remove('pn-ok', 'pn-ko', 'pn-b-ok', 'pn-b-ko', 'pn-b-oubli'); if(e.dataset.pnt) e.removeAttribute('title'); });
  const choisir = id => {
    sel = id; afficher();
    if(!id){ plClavier.fermer(); return; }
    const c = M.cibles.find(z => z.id === id || z.id + 'n' === id || z.id + 'd' === id);
    plClavier.mode = c && c.type === 'txt' && /[a-zé]/i.test(c.rep) ? 'abc' : '123'; plClavier.maj = !!(c && c.maj);
    plClavier.ouvrir(touche);
    // Sur téléphone, le clavier couvre le bas de l'écran : on garde la case choisie visible.
    const vu = root.querySelector('.pn-sel'); if(vu && vu.scrollIntoView) requestAnimationFrame(() => vu.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  };
  const touche = t => {
    if(!sel) return;
    if(t === 'ok-fin'){ sel = null; afficher(); return; }
    let v = etat.v[sel] || '';
    if(t === '⌫') v = v.slice(0, -1);
    else if(t === 'ok'){ const cases = [...root.querySelectorAll('[data-pnv]')].map(b => b.dataset.pnv), i = cases.indexOf(sel); choisir(cases[i + 1] || null); return; }
    else if(t === 'vider') v = '';
    else if(/^[<>=]$/.test(t)) v = t;
    else if(t === ' ' && (!v || v.endsWith(' '))) return; // pas d'espace au début ni deux de suite
    else if(v.length < 24) v += t;
    etat.v[sel] = v; effacerMarques(); afficher(); change();
  };
  root.onclick = e => {
    if(o.lecture) return;
    const xb = e.target.closest('[data-pnxb]'), xs = e.target.closest('svg.pn-x');
    if(xb || xs){ const id = xb ? xb.dataset.pnxb.split('|')[0] : xs.dataset.pn, c = M.cibles.find(z => z.id === id); if(!c) return;
      const K = PLX[c.rep.t], st = JSON.parse(JSON.stringify(etat.x[id] || {}));
      if(xb) K.action(c.rep, st, xb.dataset.pnxb.split('|')[1]);
      else { const P = xs.createSVGPoint(); P.x = e.clientX; P.y = e.clientY; const m = xs.getScreenCTM(); if(!m || !K.tap) return; const q = P.matrixTransform(m.inverse()); K.tap(c.rep, st, q.x, q.y); }
      etat.x[id] = st; effacerMarques(); afficher(); change(); return; }
    const c = e.target.closest('[data-pnv]'), p = e.target.closest('[data-pnp]'), t = e.target.closest('[data-pnt]'), m = e.target.closest('.pn-mot');
    if(c){ choisir(sel === c.dataset.pnv ? null : c.dataset.pnv); return; }
    const tr = e.target.closest('[data-pntr]');
    if(tr){ const [id, i, j] = tr.dataset.pntr.split(':'), q = [+i, +j]; let l = (etat.tr[id] || []).slice();
      const k = l.findIndex(z => z[0] === q[0] && z[1] === q[1]);
      if(k >= 0) l.splice(k, 1); else if(l.length >= 2) l = [q]; else l.push(q);
      etat.tr[id] = l; effacerMarques(); afficher(); change(); return; }
    if(p){ const [id, n] = p.dataset.pnp.split(':'); const l = new Set(etat.c[id] || []); if(l.has(+n)) l.delete(+n); else l.add(+n); etat.c[id] = [...l]; }
    else if(t){ const i = etat.t.indexOf(t.dataset.pnt); if(i < 0) etat.t.push(t.dataset.pnt); else etat.t.splice(i, 1); }
    else if(m){ const id = m.closest('.pn-choix').dataset.pn; etat.ch[id] = etat.ch[id] === m.dataset.pnmot ? undefined : m.dataset.pnmot; }
    else return;
    effacerMarques(); afficher(); change();
  };
  const juste = c => {
    if(c.type === 'txt') return plNumNorm(etat.v[c.id]) === c.rep && (!c.classes || plNumClassesOk(etat.v[c.id]));
    if(c.type === 'frac') return plNumNorm(etat.v[c.id + 'n']) === plNumNorm(c.rep[0]) && plNumNorm(etat.v[c.id + 'd']) === plNumNorm(c.rep[1]);
    if(c.type === 'fig') return (etat.c[c.id] || []).length === c.rep;
    if(c.type === 'choix') return plNumNorm(etat.ch[c.id]) === c.rep;
    if(c.type === 'trace'){ const p = etat.tr[c.id] || [], P = c.rep; if(p.length !== 2) return false;
      const A = [p[0][0] * P.k, p[0][1] * P.k], d = [p[1][0] * P.k - A[0], p[1][1] * P.k - A[1]], L = Math.hypot(d[0], d[1]); if(!L) return false;
      return Math.abs(d[0] * P.v[1] - d[1] * P.v[0]) / L < .02 && Math.abs((P.M[0] - A[0]) * d[1] - (P.M[1] - A[1]) * d[0]) / L < P.k * .1; }
    if(c.type === 'x') return !!PLX[c.rep.t].juste(c.rep, etat.x[c.id] || {});
    if(c.type === 'bascule'){ const on = etat.t.filter(s => s.startsWith(c.id + ':')).map(s => +s.split(':')[1]).sort((a, b) => a - b); return on.join() === c.rep.slice().sort((a, b) => a - b).join(); }
    return false;
  };
  const marquer = res => {
    effacerMarques(); if(!res || !res.d) return;
    M.cibles.forEach((c, i) => { const el = root.querySelector(`[data-pn="${c.id}"]`) || (c.type === 'bascule' ? root.querySelector(`[data-pnt^="${c.id}:"]`)?.closest('.pl-grille, .pl-liste, ul') : null);
      if(el && res.d[i] !== null) el.classList.add(res.d[i] ? 'pn-ok' : 'pn-ko');
      // Bon nombre mais mal écrit : on dit pourquoi.
      if(el && res.d[i] === false && c.type === 'txt' && c.classes && plNumNorm(etat.v[c.id]) === c.rep) el.title = 'Écris le nombre par classes de trois chiffres, séparées par un espace (comme 2 300 000).';
      // Nombres à entourer / barrer : le cadre rouge autour de la grille ne disait pas LEQUEL était faux (signalé :
      // « Entoure les multiples de 6 », 40 entouré en trop, resté vert comme les autres). Chaque choix est marqué :
      // vert s'il est juste, rouge s'il est en trop ; les oubliés (orange) ne sont montrés qu'au professeur.
      if(c.type === 'bascule' && res.d[i] !== null) root.querySelectorAll(`[data-pnt^="${c.id}:"]`).forEach(b => {
        const j = +b.dataset.pnt.split(':')[1], on = etat.t.includes(b.dataset.pnt), att = c.rep.includes(j);
        const k = on ? (att ? 'pn-b-ok' : 'pn-b-ko') : (att && o.lecture ? 'pn-b-oubli' : '');
        if(k){ b.classList.add(k); b.title = { 'pn-b-ok': 'juste', 'pn-b-ko': c.mode === 'barre' ? 'barré à tort' : 'entouré à tort', 'pn-b-oubli': 'oublié' }[k]; } }); });
  };
  afficher(); if(o.res) marquer(o.res);
  return {
    total: M.cibles.filter(c => !(c.type === 'x' && c.rep.aide)).length,
    etat: () => plNumCopie(etat),
    // Résultat sans rien montrer (session où seul le professeur voit les erreurs).
    evaluer(){ const d = M.cibles.map(c => c.type === 'x' && c.rep.aide ? null : juste(c)), n = d.filter(v => v !== null); return { juste: n.filter(Boolean).length, total: n.length, d }; },
    verifier(){ choisir(null); const res = this.evaluer(); marquer(res); return res; },
    effacer(){ etat = plNumEtatVide(); choisir(null); effacerMarques(); afficher(); change(); },
    poser(e, res){ etat = plNumEtatVide(e); afficher(); marquer(res); },
    fermer(){ if(sel){ sel = null; plClavier.fermer(); } }
  };
}
function plNumEtatVide(e){ e = e || {}; return { v: Object.assign({}, e.v), c: Object.assign({}, e.c), t: (e.t || []).slice(), ch: Object.assign({}, e.ch), tr: JSON.parse(JSON.stringify(e.tr || {})), x: JSON.parse(JSON.stringify(e.x || {})) }; }

/* ---------- Outils interactifs déclarés dans les planches (data-plx='{"t": …}') ----------
   Demandé : « Certains exercices peuvent être réalisés sur écran ou en session et pourtant ils ne sont
   pas faits comme ça. Exemple : une barre à dessiner dans la gestion de données. »
   Le dessin papier porte sa clé (data-plx) ; à l'écran, l'élève agit directement sur le dessin.
   - barres  { xs, larg, y0, u, max, att: [valeur ou null] } : toucher la hauteur de la barre.
   - bandes  { x0, c, rows: [{ y, h, att }] } : toucher la case où la bande s'arrête.
   - seg     { k, ox, oy, w, h, att: [[x1, y1, x2, y2]] } : toucher deux nœuds du quadrillage = un segment.
   - cases   { k, ox, oy, w, h, att: [[x, y]], alt?: [[[x, y]]], coul?, mode?: 'entoure' } : toucher les carreaux.
   - pts     { noms, att: { nom: [x, y] }, grille?: { k, ox, oy, w, h }, cands?: [[x, y]] } : placer des points nommés.
   - horloge { cx, cy, r, h, m } : choisir l'aiguille, puis toucher le cadran.
   - robot   { w, h, k, m, dep, but, obs, att? } : composer un programme de flèches ; fleches { att } : sans quadrillage. */
const plxPgcd = (a, b) => b ? plxPgcd(b, a % b) : a;
function plxUnites(segs){ const s = new Set(); (segs || []).forEach(([a, b, c, d]) => { let dx = c - a, dy = d - b; const g = plxPgcd(Math.abs(dx), Math.abs(dy)); if(!g) return; dx /= g; dy /= g;
  for(let t = 0; t < g; t++){ const p = [a + dx * t, b + dy * t], q = [a + dx * (t + 1), b + dy * (t + 1)], k = p[0] < q[0] || (p[0] === q[0] && p[1] < q[1]) ? p.concat(q) : q.concat(p); s.add(k.join(',')); } }); return s; }
const plxEgal = (A, B) => A.size === B.size && [...A].every(x => B.has(x));
function plxNoeud(G, x, y){ const i = Math.round((x - G.ox) / G.k), j = Math.round((y - G.oy) / G.k);
  return i < 0 || j < 0 || i > G.w || j > G.h || Math.hypot(G.ox + i * G.k - x, G.oy + j * G.k - y) > G.k * .45 ? null : [i, j]; }
const plxBtn = (id, a, txt, on, cl) => `<button type="button" class="pn-xbtn${on ? ' on' : ''}${cl ? ' ' + cl : ''}" data-pnxb="${id}|${a}">${txt}</button>`;
const PLX_FL = { h: ['↑', 0, -1], b: ['↓', 0, 1], g: ['←', -1, 0], d: ['→', 1, 0] };
const plxFleches = p => (p || '').split('').map(f => `<b class="pn-fl">${PLX_FL[f][0]}</b>`).join('');
function plxRobot(R, p){ const c = [R.dep.slice()]; let [x, y] = R.dep, ok = true;
  (p || '').split('').forEach(f => { if(!ok) return; x += PLX_FL[f][1]; y += PLX_FL[f][2]; if(x < 0 || y < 0 || x >= R.w || y >= R.h || (R.obs || []).some(o => o[0] === x && o[1] === y)) ok = false; c.push([x, y]); });
  return { c, ok }; }
const plxBarreFleches = (id, st) => `<span class="pn-x-prog">${st.p ? plxFleches(st.p) : '<i>Touche les flèches pour écrire le programme.</i>'}</span>`
  + ['g', 'h', 'b', 'd'].map(f => plxBtn(id, 'f' + f, PLX_FL[f][0], false, 'pn-xfl')).join('') + plxBtn(id, 'del', '⌫') + plxBtn(id, 'vide', 'Effacer');
const plxActionFleches = (st, a) => { st.p = st.p || ''; if(a[0] === 'f' && st.p.length < 30) st.p += a[1]; else if(a === 'del') st.p = st.p.slice(0, -1); else if(a === 'vide') st.p = ''; };
const PLX = {
  barres: {
    tap(C, st, x, y){ const i = C.xs.findIndex((x0, i) => C.att[i] != null && x >= x0 - 8 && x <= x0 + C.larg + 8); if(i < 0) return; st.v = st.v || {};
      st.v[i] = Math.max(0, Math.min(C.max, Math.round((C.y0 - y) / C.u))); },
    dessin: (C, st) => Object.entries(st.v || {}).map(([i, v]) => `<rect x="${C.xs[i]}" y="${C.y0 - v * C.u}" width="${C.larg}" height="${v * C.u}" fill="${C.coul || '#E35D3A'}" fill-opacity=".75" stroke="#1F3A5C"/>`).join(''),
    juste: (C, st) => C.att.every((v, i) => v == null || (st.v || {})[i] === v)
  },
  bandes: {
    tap(C, st, x, y){ const i = C.rows.findIndex(r => y >= r.y - 2 && y <= r.y + r.h + 2); if(i < 0 || x < C.x0) return; st.v = st.v || {}; st.v[i] = Math.min(C.max || 30, Math.floor((x - C.x0) / C.c) + 1); },
    dessin: (C, st) => Object.entries(st.v || {}).map(([i, v]) => `<rect x="${C.x0}" y="${C.rows[i].y}" width="${v * C.c}" height="${C.rows[i].h}" fill="#7FC29B" stroke="#1F3A5C" stroke-width="1.2"/>`).join(''),
    juste: (C, st) => C.rows.every((r, i) => (st.v || {})[i] === r.att)
  },
  seg: {
    tap(C, st, x, y){ const n = plxNoeud(C, x, y); if(!n) return; st.s = st.s || [];
      if(!st.a){ st.a = n; return; } if(st.a[0] === n[0] && st.a[1] === n[1]){ st.a = null; return; }
      const k = st.s.findIndex(([a, b, c, d]) => (a === st.a[0] && b === st.a[1] && c === n[0] && d === n[1]) || (c === st.a[0] && d === st.a[1] && a === n[0] && b === n[1]));
      if(k >= 0) st.s.splice(k, 1); else st.s.push([st.a[0], st.a[1], n[0], n[1]]); st.a = null; },
    dessin: (C, st) => { const P = (i, j) => [C.ox + i * C.k, C.oy + j * C.k]; let s = '';
      for(let i = 0; i <= C.w; i++) for(let j = 0; j <= C.h; j++){ const [x, y] = P(i, j); s += `<circle cx="${x}" cy="${y}" r="${C.k * .14}" fill="#3A6EA5" fill-opacity=".25"/>`; }
      (st.s || []).forEach(([a, b, c, d]) => { const p = P(a, b), q = P(c, d); s += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${C.coul || '#E35D3A'}" stroke-width="2.6" stroke-linecap="round"/>`; });
      if(st.a){ const [x, y] = P(...st.a); s += `<circle cx="${x}" cy="${y}" r="${C.k * .22}" fill="#E35D3A"/>`; } return s; },
    barre: (C, st, id) => `<span class="pn-xaide">Touche deux points du quadrillage pour tracer un segment ; touche à nouveau les deux points pour l'effacer.</span>`,
    juste: (C, st) => plxEgal(plxUnites(st.s), plxUnites(C.att))
  },
  cases: {
    tap(C, st, x, y){ const i = Math.floor((x - C.ox) / C.k), j = Math.floor((y - C.oy) / C.k); if(i < 0 || j < 0 || i >= C.w || j >= C.h) return;
      st.c = st.c || []; const k = i + ',' + j, n = st.c.indexOf(k); if(n >= 0) st.c.splice(n, 1); else { if(C.mode === 'entoure') st.c = []; st.c.push(k); } },
    dessin: (C, st) => (st.c || []).map(k => { const [i, j] = k.split(',').map(Number), x = C.ox + i * C.k, y = C.oy + j * C.k;
      return C.mode === 'entoure' ? `<circle cx="${x + C.k / 2}" cy="${y + C.k / 2}" r="${C.k * .8}" fill="none" stroke="#1F7A4D" stroke-width="2.6"/>` : `<rect x="${x}" y="${y}" width="${C.k}" height="${C.k}" fill="${C.coul || '#7A4FC0'}" fill-opacity=".6" stroke="#1F3A5C" stroke-width=".8"/>`; }).join(''),
    juste: (C, st) => { const S = new Set(st.c || []); return [C.att].concat(C.alt || []).some(a => plxEgal(S, new Set(a.map(p => p.join(','))))); }
  },
  pts: {
    cands: C => C.cands || (() => { const G = C.grille, l = []; for(let i = 0; i <= G.w; i++) for(let j = 0; j <= G.h; j++) l.push([G.ox + i * G.k, G.oy + j * G.k]); return l; })(),
    tap(C, st, x, y){ const cur = st.cur || C.noms[0]; let best = null, d = C.tol || (C.grille ? C.grille.k * .5 : 12);
      PLX.pts.cands(C).forEach(p => { const e = Math.hypot(p[0] - x, p[1] - y); if(e < d){ d = e; best = p; } }); if(!best) return;
      st.p = st.p || {}; st.p[cur] = best; st.cur = C.noms.find(n => !st.p[n]) || cur; },
    action(C, st, a){ st.cur = a; },
    dessin: (C, st) => Object.entries(st.p || {}).map(([n, [x, y]]) => `<circle cx="${x}" cy="${y}" r="4" fill="#E35D3A"/><text x="${x + 6}" y="${y - 7}" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk">${n}</text>`).join(''),
    barre: (C, st, id) => `<span class="pn-xaide">Choisis un point, puis touche sa place :</span>` + C.noms.map(n => plxBtn(id, n, n, (st.cur || C.noms[0]) === n)).join(''),
    juste: (C, st) => C.noms.every(n => { const p = (st.p || {})[n], q = C.att[n]; return p && Math.abs(p[0] - q[0]) < 1 && Math.abs(p[1] - q[1]) < 1; })
  },
  horloge: {
    tap(C, st, x, y){ let a = Math.atan2(x - C.cx, C.cy - y) * 180 / Math.PI; if(a < 0) a += 360; const cur = st.cur || 'h';
      st[cur] = cur === 'm' ? Math.round(a / 30) * 30 % 360 : Math.round(a / 7.5) * 7.5 % 360; if(st.h == null || st.m == null) st.cur = cur === 'h' ? 'm' : 'h'; },
    action(C, st, a){ st.cur = a; },
    dessin: (C, st) => [['h', .5, 5, '#E35D3A'], ['m', .78, 3, '#2EA8C9']].filter(([k]) => st[k] != null).map(([k, l, w, c]) => { const r = st[k] * Math.PI / 180;
      return `<line x1="${C.cx}" y1="${C.cy}" x2="${(C.cx + C.r * l * Math.sin(r)).toFixed(1)}" y2="${(C.cy - C.r * l * Math.cos(r)).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`; }).join(''),
    barre: (C, st, id) => plxBtn(id, 'h', 'petite aiguille', (st.cur || 'h') === 'h', 'pn-xh') + plxBtn(id, 'm', 'grande aiguille', st.cur === 'm', 'pn-xm'),
    juste: (C, st) => { if(st.h == null || st.m == null) return false; const dh = Math.abs(((st.h - ((C.h % 12) * 30 + C.m / 2)) % 360 + 540) % 360 - 180);
      return st.m === (C.m * 6) % 360 && dh <= 16; }
  },
  robot: {
    action(C, st, a){ plxActionFleches(st, a); },
    dessin: (C, st) => { const X = i => C.m + i * C.k + C.k / 2, r = plxRobot(C, st.p), c = r.c;
      return (c.length > 1 ? `<polyline points="${c.map(([x, y]) => X(x) + ',' + X(y)).join(' ')}" fill="none" stroke="${r.ok ? '#E35D3A' : '#C0392B'}" stroke-width="3" stroke-dasharray="6 4"/>` : '')
        + `<circle cx="${X(c[c.length - 1][0])}" cy="${X(c[c.length - 1][1])}" r="${C.k * .32}" fill="none" stroke="${r.ok ? '#2E9C6A' : '#C0392B'}" stroke-width="3"/>`; },
    barre: (C, st, id) => plxBarreFleches(id, st),
    juste: (C, st) => { if(C.att) return st.p === C.att; const r = plxRobot(C, st.p), f = r.c[r.c.length - 1]; return r.ok && f[0] === C.but[0] && f[1] === C.but[1]; }
  },
  // Plusieurs droites sur un quadrillage : on touche deux nœuds, la droite passe par eux (coupée au bord).
  // { k, ox, oy, w, h, att: [{ p: [x, y], v: [dx, dy] }] } en carreaux.
  droites: {
    tap(C, st, x, y){ const n = plxNoeud(C, x, y); if(!n) return; st.l = st.l || [];
      if(!st.a){ st.a = n; return; } if(st.a[0] === n[0] && st.a[1] === n[1]){ st.a = null; return; }
      const sur = (L, q) => (L[2] - L[0]) * (q[1] - L[1]) - (L[3] - L[1]) * (q[0] - L[0]) === 0;
      const k = st.l.findIndex(L => sur(L, st.a) && sur(L, n));
      if(k >= 0) st.l.splice(k, 1); else st.l.push([st.a[0], st.a[1], n[0], n[1]]); st.a = null; },
    action(C, st, a){ if(a === 'vide'){ st.l = []; st.a = null; } },
    dessin: (C, st) => { const P = (i, j) => [C.ox + i * C.k, C.oy + j * C.k]; let s = '';
      for(let i = 0; i <= C.w; i++) for(let j = 0; j <= C.h; j++){ const [x, y] = P(i, j); s += `<circle cx="${x}" cy="${y}" r="${C.k * .14}" fill="#3A6EA5" fill-opacity=".22"/>`; }
      (st.l || []).forEach(([a, b, c, d], i) => { const v = [c - a, d - b]; let t0 = -1e9, t1 = 1e9; [[0, C.w], [0, C.h]].forEach(([mn, mx], q) => { if(!v[q]) return; const u = ([a, b][q]), e1 = (mn - u) / v[q], e2 = (mx - u) / v[q]; t0 = Math.max(t0, Math.min(e1, e2)); t1 = Math.min(t1, Math.max(e1, e2)); });
        const p = P(a + v[0] * t0, b + v[1] * t0), q = P(a + v[0] * t1, b + v[1] * t1); s += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${['#2E9C6A', '#E35D3A', '#7A4FC0', '#2EA8C9'][i % 4]}" stroke-width="2.4"/>`; });
      if(st.a){ const [x, y] = P(...st.a); s += `<circle cx="${x}" cy="${y}" r="${C.k * .22}" fill="#E35D3A"/>`; } return s; },
    barre: (C, st, id) => `<span class="pn-xaide">Touche deux points du quadrillage : la droite passe par eux.</span>` + plxBtn(id, 'vide', 'Effacer les droites'),
    juste: (C, st) => { const l = st.l || []; if(l.length !== C.att.length) return false;
      return C.att.every(({ p, v }) => l.some(([a, b, c, d]) => (c - a) * v[1] - (d - b) * v[0] === 0 && (c - a) * (p[1] - b) - (d - b) * (p[0] - a) === 0)); }
  },
  // Rapporteur du tableau interactif, à poser sur la figure (mêmes règles que le permis rapporteur :
  // aimant sur le sommet, accroche de la rotation sur un côté, crayon qui glisse sur l'arc degré par degré).
  // { V: [x, y] sommet, d1: direction du côté tracé (°, sens direct), r: rayon du rapporteur (px de la figure),
  //   mode: 'mesure' (aide pour lire, la réponse s'écrit dans les pointillés : aide = true) ou 'construire' (cible : mesure à obtenir) }.
  rapp: {
    // Plusieurs angles dans une même figure, un seul rapporteur : som = [[x, y, [directions des côtés]]] (aimant et accroche),
    // cons = [{ V, d1, cible }] pour construire (un côté tracé par sommet). Ancien format accepté : V, d1, cible.
    cons: C => C.cons || (C.V && C.cible != null ? [{ V: C.V, d1: C.d1, cible: C.cible }] : []),
    sommets: C => C.som || (C.V ? [[C.V[0], C.V[1], [C.d1]]] : []),
    pos0: C => C.p0 || [C.w / 2, C.h + C.r + 8],
    depart: C => ({ x: PLX.rapp.pos0(C)[0], y: PLX.rapp.pos0(C)[1], rot: C.rot0 || 0 }),
    monter(C, svg, lire, ecrire){
      // Sous la figure, une « réserve » où le rapporteur est rangé au départ.
      svg.setAttribute('viewBox', `0 0 ${C.w} ${C.h + C.r + 14}`);
      svg.style.width = '100%'; svg.style.maxWidth = Math.min(900, C.w * 1.45) + 'px'; svg.style.touchAction = 'none'; svg.style.overflow = 'visible';
      const pt = e => { const P = svg.createSVGPoint(); P.x = e.clientX; P.y = e.clientY; const m = svg.getScreenCTM(); return m ? P.matrixTransform(m.inverse()) : { x: 0, y: 0 }; };
      let geste = null;
      svg.addEventListener('pointerdown', e => { const z = e.target.closest('[data-rp]'); if(!z) return; const st = lire(), p = st.p || PLX.rapp.depart(C);
        geste = { k: z.dataset.rp, st, p, q: pt(e) }; svg.setPointerCapture && svg.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); });
      svg.addEventListener('pointermove', e => { if(!geste) return; const q = pt(e), { st } = geste, p = Object.assign({}, geste.p), S = PLX.rapp.sommets(C);
        if(geste.k === 'corps'){ p.x = geste.p.x + q.x - geste.q.x; p.y = geste.p.y + q.y - geste.q.y; const s0 = S.find(([x, y]) => Math.hypot(p.x - x, p.y - y) < C.r * .14); if(s0){ p.x = s0[0]; p.y = s0[1]; } }
        else if(geste.k === 'tourner'){ const ang = z => Math.atan2(p.y - z.y, z.x - p.x) * 180 / Math.PI; let d = (geste.p.rot || 0) + ang(q) - ang(geste.q);
          const s0 = S.find(([x, y]) => Math.hypot(p.x - x, p.y - y) < 1); for(const a of (s0 ? s0[2] : []).flatMap(a => [a, a + 180, a - 180])) if(Math.abs(((d - a) % 360 + 540) % 360 - 180) <= 4){ d = a; break; } p.rot = d; }
        else if(geste.k === 'crayon'){ let d = Math.atan2(p.y - q.y, q.x - p.x) * 180 / Math.PI - p.rot; d = ((d % 360) + 360) % 360; if(d > 180) d = d > 270 ? 0 : 180; st.c = Math.round(d); }
        st.p = p; ecrire(st); e.preventDefault(); });
      const fin = () => { geste = null; }; svg.addEventListener('pointerup', fin); svg.addEventListener('pointercancel', fin);
    },
    // Sommet sur lequel le rapporteur est posé (indice dans cons), ou -1.
    ici: (C, st) => { const p = st.p; return p ? PLX.rapp.cons(C).findIndex(k => Math.hypot(p.x - k.V[0], p.y - k.V[1]) < 1) : -1; },
    action(C, st, a){ const i = PLX.rapp.ici(C, st);
      if(a === 'trait' && i >= 0){ st.t = st.t || {}; st.t[i] = ((((st.c || 0) + st.p.rot) % 360) + 360) % 360; }
      if(a === 'replacer'){ delete st.p; delete st.c; }
      if(a === 'effacer'){ if(i >= 0 && st.t) delete st.t[i]; else delete st.t; } },
    dessin: (C, st) => { const p = st.p || PLX.rapp.depart(C), k = C.r / 449, R = C.r * .93; let s = '';
      Object.entries(st.t || {}).forEach(([i, t]) => { const V = PLX.rapp.cons(C)[i].V, a = t * Math.PI / 180, L = C.r * 1.3; s += `<line x1="${V[0]}" y1="${V[1]}" x2="${(V[0] + L * Math.cos(a)).toFixed(1)}" y2="${(V[1] - L * Math.sin(a)).toFixed(1)}" stroke="#E35D3A" stroke-width="2.2" stroke-linecap="round"/>`; });
      s += `<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(-p.rot).toFixed(2)})"><use data-rp="corps" href="#plRapporteur" transform="translate(${(-449.3 * k).toFixed(1)} ${(-451.6 * k).toFixed(1)}) scale(${k.toFixed(4)})" opacity=".88" style="cursor:grab;"/>`
        + `<circle data-rp="tourner" cx="${(C.r * .55).toFixed(1)}" cy="${(C.r * .2).toFixed(1)}" r="${Math.max(9, C.r * .11).toFixed(1)}" fill="#E35D3A" fill-opacity=".9" style="cursor:grab;"/><text x="${(C.r * .55).toFixed(1)}" y="${(C.r * .2 + 4).toFixed(1)}" font-size="11" text-anchor="middle" fill="#fff" pointer-events="none">↻</text>`;
      if(C.mode === 'construire'){ const a = (st.c || 0) * Math.PI / 180; s += `<g data-rp="crayon" transform="translate(${(R * Math.cos(a)).toFixed(1)} ${(-R * Math.sin(a)).toFixed(1)}) rotate(${(90 - (st.c || 0)).toFixed(1)})" style="cursor:grab;"><polygon points="-4,-34 4,-34 4,-8 0,0 -4,-8" fill="#E9C46A" stroke="#1C1B2E" stroke-width=".8"/><rect x="-4" y="-38" width="8" height="5" fill="#E35D3A"/><circle r="9" fill="transparent"/></g>`; }
      return s + '</g>'; },
    barre: (C, st, id) => C.mode === 'construire'
      ? `<span class="pn-xaide">Pose le centre du rapporteur sur un sommet O, tourne-le (↻) pour aligner le zéro sur [Ox), glisse le crayon jusqu'à la mesure demandée, puis trace. Recommence pour chaque angle.</span>` + plxBtn(id, 'trait', 'Tracer le côté') + plxBtn(id, 'effacer', 'Effacer ce trait') + plxBtn(id, 'replacer', 'Ranger le rapporteur')
      : `<span class="pn-xaide">Fais glisser le rapporteur sur un sommet, tourne-le (↻) pour aligner son zéro sur un côté, puis lis la mesure. Recommence pour chaque angle.</span>` + plxBtn(id, 'replacer', 'Ranger le rapporteur'),
    juste: (C, st) => { if(C.aide) return true; const L = PLX.rapp.cons(C); return L.length > 0 && L.every((k, i) => { const t = (st.t || {})[i]; if(t == null) return false; let d = Math.abs(t - k.d1) % 360; if(d > 180) d = 360 - d; return Math.abs(d - k.cible) <= 2; }); }
  },
  fleches: {
    action(C, st, a){ plxActionFleches(st, a); },
    texte: (C, st) => st.p ? plxFleches(st.p) : '&nbsp;',
    barre: (C, st, id) => plxBarreFleches(id, st),
    juste: (C, st) => st.p === C.att
  }
};
function plNumCopie(e){ return JSON.parse(JSON.stringify(e)); }
// Phrase de bilan d'une vérification.
function plNumBilan(res){
  if(!res) return '';
  return res.juste === res.total ? `<b>Bravo, tout est juste !</b>` : `<b>${res.juste} réponse${res.juste > 1 ? 's' : ''} juste${res.juste > 1 ? 's' : ''} sur ${res.total}.</b> Corrige ce qui est en rouge, puis vérifie à nouveau.`;
}

/* ---------- Clavier virtuel (chiffres, signes, lettres) ---------- */
const plClavier = {
  el: null, cb: null, mode: '123', maj: false,
  ouvrir(cb){ this.cb = cb; if(!this.el){ this.el = document.createElement('div'); this.el.id = 'plClavier'; document.body.appendChild(this.el);
      this.el.addEventListener('pointerdown', e => { const b = e.target.closest('button'); if(!b) return; e.preventDefault();
        if(b.dataset.m){ this.mode = b.dataset.m; this.rendre(); return; }
        if(b.dataset.maj){ this.maj = !this.maj; this.rendre(); return; }
        if(b.dataset.k === 'fermer'){ if(this.cb) this.cb('ok-fin'); this.fermer(); return; }
        if(this.cb) this.cb(b.dataset.k); }); }
    const h = document.fullscreenElement && document.fullscreenElement !== document.documentElement ? document.fullscreenElement : document.body;
    if(this.el.parentNode !== h) h.appendChild(this.el);
    this.rendre(); this.el.style.display = 'block'; document.addEventListener('keydown', plClavierPhysique, true);
    document.body.classList.add('pn-clavier-ouvert'); window.dispatchEvent(new Event('resize')); },
  fermer(){ if(this.el) this.el.style.display = 'none'; this.cb = null; document.removeEventListener('keydown', plClavierPhysique, true);
    document.body.classList.remove('pn-clavier-ouvert'); window.dispatchEvent(new Event('resize')); },
  rendre(){
    const k = (t, l, cl) => `<button type="button" data-k="${t}" class="${cl || ''}">${l || t}</button>`;
    const lignes = this.mode === '123'
      ? [['7', '8', '9', '&lt;', '('], ['4', '5', '6', '=', ')'], ['1', '2', '3', '&gt;', ':'], ['0', ',', '+', '−', '×']] // ( ) et : : priorités opératoires (5e)
      : ['azertyuiop', 'qsdfghjklm', 'wxcvbné', 'èàêç\'-()[]'].map(l => l.split('').map(c => this.maj ? c.toUpperCase() : c));
    this.el.innerHTML = `<div class="pn-cl-lignes">${lignes.map(l => `<div class="pn-cl-l">${l.map(t => k(t === '&lt;' ? '<' : t === '&gt;' ? '>' : t, t)).join('')}</div>`).join('')}
      <div class="pn-cl-l">${this.mode === 'abc' ? `<button type="button" data-maj="1" class="pn-cl-gris${this.maj ? ' pn-cl-on' : ''}" title="Majuscules">⇧ ${this.maj ? 'ABC' : 'abc'}</button>` + k(' ', 'espace', 'pn-cl-large') : k(' ', 'espace', 'pn-cl-esp')}${k('⌫', '<span class="gicon">backspace</span>', 'pn-cl-gris')}
        <button type="button" data-m="${this.mode === '123' ? 'abc' : '123'}" class="pn-cl-gris">${this.mode === '123' ? 'abc' : '123'}</button>${k('ok', '<span class="gicon">keyboard_return</span>', 'pn-cl-ok')}${k('fermer', '<span class="gicon">keyboard_hide</span>', 'pn-cl-gris')}</div></div>`;
  }
};
function plClavierPhysique(e){
  if(!plClavier.cb || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.key === 'Backspace' ? '⌫' : e.key === 'Enter' || e.key === 'Tab' ? 'ok' : e.key === 'Escape' ? 'fermer' : e.key.length === 1 ? e.key : null;
  if(!t) return;
  if(document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
  e.preventDefault(); e.stopPropagation();
  if(t === 'fermer'){ plClavier.cb('ok-fin'); plClavier.fermer(); } else plClavier.cb(t);
}

(function plNumStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .pn-ex .pl-grille{ display:grid; gap:8px 22px; align-items:center; } .pn-ex .pl-item{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; min-height:30px; }
    .pn-ex .pl-liste{ margin:0; padding-left:20px; } .pn-ex .pl-liste li{ margin:6px 0; }
    .pn-ex .pl-unites{ display:inline-flex; gap:5px; flex-wrap:wrap; align-items:center; vertical-align:middle; }
    .cx-td .pn-ex, .cx-td.pn-ex{ font-size:1.1rem; line-height:1.5; } @media (min-width:700px){ .cx-td.pn-ex{ zoom:1.3; } } .cx-td svg{ max-width:100%; height:auto; }
    .pn-ex .pn-case{ white-space:pre; display:inline-flex; align-items:center; justify-content:center; min-width:30px; height:26px; padding:0 5px; border:2px solid #3A6EA5; border-radius:6px; background:#fff;
      font:700 1rem 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; cursor:pointer; vertical-align:middle; margin:0 2px; }
    .pn-ex .pn-case.pn-large{ min-width:120px; } .pn-ex .pn-case.pn-vide{ background:#F3F7FC; }
    .pn-ex .pn-case.pn-sel{ border-color:#E35D3A; box-shadow:0 0 0 3px rgba(227,93,58,.25); background:#FFF6F2; }
    .pn-ex .pn-frac{ display:inline-flex; flex-direction:column; align-items:center; gap:3px; vertical-align:middle; margin:0 3px; }
    .pn-ex .pn-barre{ display:block; width:36px; border-top:2px solid #1C2B39; }
    .pn-ex svg.pn-trace{ width:min(100%, 520px) !important; height:auto !important; max-height:none !important; display:block; touch-action:manipulation; }
    .pn-ex .pn-tr-n{ cursor:pointer; } .pn-ex .pn-tr-n:hover{ fill:rgba(227,93,58,.25); } .pn-lecture .pn-tr-n{ cursor:default; } .pn-tr-aide{ font-size:.85rem; color:#4E5665; margin-top:4px; } .pn-lecture .pn-tr-aide{ display:none; }
    .pn-ex .pn-part{ cursor:pointer; } .pn-ex .pn-part:hover{ fill-opacity:.85; }
    .pn-lecture .pn-case, .pn-lecture .pn-part, .pn-lecture .pn-bascule, .pn-lecture .pn-mot{ cursor:default; }
    .pn-ex .pn-bascule{ border:2px dashed rgba(58,110,165,.3); background:none; border-radius:999px; padding:2px 8px; cursor:pointer; font:inherit; color:inherit; position:relative; }
    .pn-ex .pn-bascule.pn-entoure.on{ border:2.5px solid #1F3A5C; } .pn-lecture .pn-bascule, .pn-lecture .pn-mot{ border-color:transparent; }
    .pn-ex .pn-bascule.pn-barre.on::after{ content:''; position:absolute; left:2px; right:2px; top:50%; border-top:3px solid #C0392B; transform:rotate(-20deg); }
    .pn-ex .pn-choix{ display:inline-flex; gap:2px; align-items:center; } .pn-ex .pn-sep{ color:#8A93A3; margin:0 2px; }
    .pn-ex .pn-mot{ border:2px dashed rgba(58,110,165,.3); background:none; border-radius:999px; padding:1px 8px; font:700 1em inherit; color:#1F3A5C; cursor:pointer; }
    .pn-ex .pn-mot.on{ border:2.5px solid #1F3A5C; background:#EEF3F9; }
    .pn-ex .pn-bascule.pn-b-ok{ border:2.5px solid #1F7A4D !important; background:#EAF7EF; }
    .pn-ex .pn-bascule.pn-b-ko{ border:2.5px solid #C0392B !important; background:#FDECEA; }
    .pn-ex .pn-bascule.pn-b-oubli{ border:2.5px dashed #E08A1E !important; background:#FFF5E6; }
    .pn-ex .pn-ok{ outline:3px solid #1F7A4D; outline-offset:2px; border-radius:8px; }
    .pn-ex .pn-ko{ outline:3px solid #C0392B; outline-offset:2px; border-radius:8px; }
    .pn-ex .pn-case.pn-ok{ border-color:#1F7A4D; outline:none; background:#EAF7EF; } .pn-ex .pn-case.pn-ko{ border-color:#C0392B; outline:none; background:#FDECEA; }
    .pn-ex .pn-frac.pn-ok .pn-case{ border-color:#1F7A4D; background:#EAF7EF; } .pn-ex .pn-frac.pn-ko .pn-case{ border-color:#C0392B; background:#FDECEA; }
    .pn-ex .pn-frac.pn-ok, .pn-ex .pn-frac.pn-ko{ outline:none; }
    #plClavier{ display:none; position:fixed; left:50%; bottom:12px; transform:translateX(-50%); z-index:9700; background:#1F3A5C; border-radius:18px; padding:10px; box-shadow:0 10px 30px rgba(0,0,0,.3); touch-action:none; user-select:none; }
    .pn-cl-lignes{ display:flex; flex-direction:column; gap:6px; } .pn-cl-l{ display:flex; gap:6px; justify-content:center; }
    #plClavier button{ min-width:52px; height:52px; border:0; border-radius:12px; background:#fff; color:#1F3A5C; font:700 1.35rem 'Space Grotesk',Arial,sans-serif; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding:0 10px; }
    #plClavier button:active{ transform:scale(.95); } #plClavier .pn-cl-gris{ background:#DCE4EE; font-size:1rem; } #plClavier .pn-cl-on{ background:#3A6EA5; color:#fff; } #plClavier .pn-cl-ok{ background:#F08A3C; color:#fff; } #plClavier .pn-cl-large{ min-width:200px; font-size:1rem; } #plClavier .pn-cl-esp{ min-width:96px; font-size:.95rem; }
    @media (max-width:600px){ #plClavier button{ min-width:30px; height:44px; font-size:1.1rem; padding:0 6px; } #plClavier{ padding:6px; width:calc(100vw - 16px); box-sizing:border-box; } .pn-cl-l{ gap:4px; } }
    .pn-ex .pl-papier{ display:none; } /* ce qui ne sert que sur la feuille (ligne pour écrire…) */
    .pn-ex svg.pn-x{ width:min(100%, 520px) !important; height:auto !important; max-height:none !important; touch-action:manipulation; cursor:pointer; }
    .pn-ex svg.pn-x-horloge{ width:min(100%, 230px) !important; }
    .pn-xbar{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:4px 0 8px; font-size:.88rem; color:#4E5665; } .pn-xbar:empty{ display:none; } .pn-lecture .pn-xbar button{ display:none; }
    .pn-xbtn{ border:2px solid #3A6EA5; background:#fff; color:#1F3A5C; border-radius:10px; padding:3px 10px; font:700 .95rem 'Space Grotesk',Arial,sans-serif; cursor:pointer; min-width:40px; }
    .pn-xbtn.on{ background:#3A6EA5; color:#fff; } .pn-xbtn.pn-xfl{ font-size:1.25rem; min-width:46px; } .pn-xbtn.pn-xh.on{ background:#E35D3A; border-color:#E35D3A; } .pn-xbtn.pn-xm.on{ background:#2EA8C9; border-color:#2EA8C9; }
    .pn-x-prog{ display:inline-flex; flex-wrap:wrap; gap:2px; min-height:30px; min-width:120px; align-items:center; padding:2px 8px; border:2px dashed #B9C7D6; border-radius:8px; background:#fff; }
    .pn-fl{ display:inline-block; min-width:18px; text-align:center; color:#2EA8C9; font-size:1.15rem; }
    .pn-ex .pn-x-fleches{ display:inline-flex; min-width:120px; min-height:26px; border-bottom:2px dotted #8A93A3; align-items:center; }
    .pn-actions{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:center; margin-top:10px; }
    .pn-bilan{ text-align:center; margin-top:8px; font-size:1rem; } .pn-bilan.ok{ color:#1F7A4D; } .pn-bilan.ko{ color:#9E1F5E; }
  `;
  document.head.appendChild(st);
})();
