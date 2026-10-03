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
const plNumNorm = s => { const t = String(s ?? '').replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().replace(/[.!]$/, '').replace(/’/g, '\''), n = t.replace(/(\d) (?=\d)/g, '$1'); return /^\d+$/.test(n) ? String(+n) : t; };
// Fraction écrite en LaTeX dans un bout de corrigé : [numérateur, dénominateur] ou null.
function plNumFracDe(el){
  const t = el.querySelector('.tex'), m = t && /\\[dt]?frac\{([^}]*)\}\{([^}]*)\}/.exec(t.textContent);
  return m && plNumNorm(t.textContent.replace(m[0], '')) === '' ? [m[1].trim(), m[2].trim()] : null;
}
function plNumFormes(svg){ return [...svg.querySelectorAll('polygon, path, rect')].filter(s => s.getAttribute('fill')); }
const plNumBlanc = f => /^(#fff|#ffffff|white|none)$/i.test(f || '');

// Analyse : modèle de l'exercice (énoncé transformé + clé), ou null s'il reste sur papier.
function plNumModele(x){
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
  // 1. Choix « vrai · faux » et fractions à entourer / barrer (items d'une grille ou d'une liste).
  const itE = [...E.querySelectorAll('.pl-item, li')], itC = [...C.querySelectorAll('.pl-item, li')];
  const marques = C.querySelectorAll('.pl-entoure, .pl-barre-rep').length;
  let vues = 0;
  if(marques){
    if(itE.length !== itC.length) return null;
    const bascules = [];
    itE.forEach((ei, n) => {
      const ci = itC[n], mk = ci.querySelectorAll('.pl-entoure, .pl-barre-rep');
      const b = [...ei.querySelectorAll('b')].find(z => /^\s*[^·]+·[^·]+$/.test(z.textContent));
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
  const trous = [...E.querySelectorAll('.pl-frac, .pl-case-seule, .pl-pts')], reps = [...C.querySelectorAll('.pl-rep')];
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
      tr.outerHTML = `<button type="button" class="pn-case${large ? ' pn-large' : ''}${tr.classList.contains('pl-case-seule') ? ' pn-signe' : ''}" data-pn="${id}" data-pnv="${id}"></button>`;
      cibles.push({ type: 'txt', id, rep });
    }
  }
  // 3. Figures blanches dans l'énoncé, coloriées dans le corrigé.
  const svE = [...E.querySelectorAll('svg')], svC = [...C.querySelectorAll('svg')];
  if(svE.length !== svC.length) return null;
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
    if(fa.length !== fb.length || !fa.length || fa.some(f => !plNumBlanc(f.getAttribute('fill')))) return null;
    const pleines = fb.filter(f => !plNumBlanc(f.getAttribute('fill')));
    const g = a.closest('.pl-unites') || a;
    if(!groupes.has(g)) groupes.set(g, { id: 'c' + (cibles.length + groupes.size), rep: 0, coul: null, n: 0 });
    const G = groupes.get(g);
    G.rep += pleines.length; if(pleines.length && !G.coul) G.coul = pleines[0].getAttribute('fill');
    fa.forEach(f => { f.setAttribute('data-pnp', `${G.id}:${G.n++}`); f.classList.add('pn-part'); });
  }
  groupes.forEach((G, g) => { g.setAttribute('data-pn', G.id); g.classList.add('pn-fig'); cibles.push({ type: 'fig', id: G.id, rep: G.rep, coul: G.coul || '#E35D3A' }); });
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
  };
  const effacerMarques = () => root.querySelectorAll('.pn-ok, .pn-ko').forEach(e => e.classList.remove('pn-ok', 'pn-ko'));
  const choisir = id => {
    sel = id; afficher();
    if(!id){ plClavier.fermer(); return; }
    const c = M.cibles.find(z => z.id === id || z.id + 'n' === id || z.id + 'd' === id);
    plClavier.mode = c && c.type === 'txt' && /[a-zé]/i.test(c.rep) ? 'abc' : '123';
    plClavier.ouvrir(touche);
  };
  const touche = t => {
    if(!sel) return;
    if(t === 'ok-fin'){ sel = null; afficher(); return; }
    let v = etat.v[sel] || '';
    if(t === '⌫') v = v.slice(0, -1);
    else if(t === 'ok'){ const cases = [...root.querySelectorAll('[data-pnv]')].map(b => b.dataset.pnv), i = cases.indexOf(sel); choisir(cases[i + 1] || null); return; }
    else if(t === 'vider') v = '';
    else if(/^[<>=]$/.test(t)) v = t;
    else if(v.length < 24) v += t;
    etat.v[sel] = v; effacerMarques(); afficher(); change();
  };
  root.onclick = e => {
    if(o.lecture) return;
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
    if(c.type === 'txt') return plNumNorm(etat.v[c.id]) === c.rep;
    if(c.type === 'frac') return plNumNorm(etat.v[c.id + 'n']) === plNumNorm(c.rep[0]) && plNumNorm(etat.v[c.id + 'd']) === plNumNorm(c.rep[1]);
    if(c.type === 'fig') return (etat.c[c.id] || []).length === c.rep;
    if(c.type === 'choix') return plNumNorm(etat.ch[c.id]) === c.rep;
    if(c.type === 'trace'){ const p = etat.tr[c.id] || [], P = c.rep; if(p.length !== 2) return false;
      const A = [p[0][0] * P.k, p[0][1] * P.k], d = [p[1][0] * P.k - A[0], p[1][1] * P.k - A[1]], L = Math.hypot(d[0], d[1]); if(!L) return false;
      return Math.abs(d[0] * P.v[1] - d[1] * P.v[0]) / L < .02 && Math.abs((P.M[0] - A[0]) * d[1] - (P.M[1] - A[1]) * d[0]) / L < P.k * .1; }
    if(c.type === 'bascule'){ const on = etat.t.filter(s => s.startsWith(c.id + ':')).map(s => +s.split(':')[1]).sort((a, b) => a - b); return on.join() === c.rep.slice().sort((a, b) => a - b).join(); }
    return false;
  };
  const marquer = res => {
    effacerMarques(); if(!res || !res.d) return;
    M.cibles.forEach((c, i) => { const el = root.querySelector(`[data-pn="${c.id}"]`) || (c.type === 'bascule' ? root.querySelector(`[data-pnt^="${c.id}:"]`)?.closest('.pl-grille, .pl-liste, ul') : null);
      if(el) el.classList.add(res.d[i] ? 'pn-ok' : 'pn-ko'); });
  };
  afficher(); if(o.res) marquer(o.res);
  return {
    total: M.cibles.length,
    etat: () => plNumCopie(etat),
    verifier(){ choisir(null); const d = M.cibles.map(juste), res = { juste: d.filter(Boolean).length, total: d.length, d }; marquer(res); return res; },
    effacer(){ etat = plNumEtatVide(); choisir(null); effacerMarques(); afficher(); change(); },
    poser(e, res){ etat = plNumEtatVide(e); afficher(); marquer(res); },
    fermer(){ if(sel){ sel = null; plClavier.fermer(); } }
  };
}
function plNumEtatVide(e){ e = e || {}; return { v: Object.assign({}, e.v), c: Object.assign({}, e.c), t: (e.t || []).slice(), ch: Object.assign({}, e.ch), tr: JSON.parse(JSON.stringify(e.tr || {})) }; }
function plNumCopie(e){ return JSON.parse(JSON.stringify(e)); }
// Phrase de bilan d'une vérification.
function plNumBilan(res){
  if(!res) return '';
  return res.juste === res.total ? `<b>Bravo, tout est juste !</b>` : `<b>${res.juste} réponse${res.juste > 1 ? 's' : ''} juste${res.juste > 1 ? 's' : ''} sur ${res.total}.</b> Corrige ce qui est en rouge, puis vérifie à nouveau.`;
}

/* ---------- Clavier virtuel (chiffres, signes, lettres) ---------- */
const plClavier = {
  el: null, cb: null, mode: '123',
  ouvrir(cb){ this.cb = cb; if(!this.el){ this.el = document.createElement('div'); this.el.id = 'plClavier'; document.body.appendChild(this.el);
      this.el.addEventListener('pointerdown', e => { const b = e.target.closest('button'); if(!b) return; e.preventDefault();
        if(b.dataset.m){ this.mode = b.dataset.m; this.rendre(); return; }
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
      ? [['7', '8', '9', '&lt;'], ['4', '5', '6', '='], ['1', '2', '3', '&gt;'], ['0', ',']]
      : ['azertyuiop', 'qsdfghjklm', 'wxcvbné', 'èàêç\''].map(l => l.split(''));
    this.el.innerHTML = `<div class="pn-cl-lignes">${lignes.map(l => `<div class="pn-cl-l">${l.map(t => k(t === '&lt;' ? '<' : t === '&gt;' ? '>' : t, t)).join('')}</div>`).join('')}
      <div class="pn-cl-l">${this.mode === 'abc' ? k(' ', 'espace', 'pn-cl-large') : ''}${k('⌫', '<span class="gicon">backspace</span>', 'pn-cl-gris')}
        <button type="button" data-m="${this.mode === '123' ? 'abc' : '123'}" class="pn-cl-gris">${this.mode === '123' ? 'abc' : '123'}</button>${k('ok', '<span class="gicon">keyboard_return</span>', 'pn-cl-ok')}${k('fermer', '<span class="gicon">keyboard_hide</span>', 'pn-cl-gris')}</div></div>`;
  }
};
function plClavierPhysique(e){
  if(!plClavier.cb || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.key === 'Backspace' ? '⌫' : e.key === 'Enter' || e.key === 'Tab' ? 'ok' : e.key === 'Escape' ? 'fermer' : e.key.length === 1 ? e.key.toLowerCase() : null;
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
    .pn-ex .pn-case{ display:inline-flex; align-items:center; justify-content:center; min-width:30px; height:26px; padding:0 5px; border:2px solid #3A6EA5; border-radius:6px; background:#fff;
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
    .pn-ex .pn-bascule.pn-entoure.on{ border:2.5px solid #1F7A4D; } .pn-lecture .pn-bascule, .pn-lecture .pn-mot{ border-color:transparent; }
    .pn-ex .pn-bascule.pn-barre.on::after{ content:''; position:absolute; left:2px; right:2px; top:50%; border-top:3px solid #C0392B; transform:rotate(-20deg); }
    .pn-ex .pn-choix{ display:inline-flex; gap:2px; align-items:center; } .pn-ex .pn-sep{ color:#8A93A3; margin:0 2px; }
    .pn-ex .pn-mot{ border:2px dashed rgba(58,110,165,.3); background:none; border-radius:999px; padding:1px 8px; font:700 1em inherit; color:#1F3A5C; cursor:pointer; }
    .pn-ex .pn-mot.on{ border:2.5px solid #1F7A4D; background:#F1FAF5; }
    .pn-ex .pn-ok{ outline:3px solid #1F7A4D; outline-offset:2px; border-radius:8px; }
    .pn-ex .pn-ko{ outline:3px solid #C0392B; outline-offset:2px; border-radius:8px; }
    .pn-ex .pn-case.pn-ok{ border-color:#1F7A4D; outline:none; background:#EAF7EF; } .pn-ex .pn-case.pn-ko{ border-color:#C0392B; outline:none; background:#FDECEA; }
    .pn-ex .pn-frac.pn-ok .pn-case{ border-color:#1F7A4D; background:#EAF7EF; } .pn-ex .pn-frac.pn-ko .pn-case{ border-color:#C0392B; background:#FDECEA; }
    .pn-ex .pn-frac.pn-ok, .pn-ex .pn-frac.pn-ko{ outline:none; }
    #plClavier{ display:none; position:fixed; left:50%; bottom:12px; transform:translateX(-50%); z-index:9700; background:#1F3A5C; border-radius:18px; padding:10px; box-shadow:0 10px 30px rgba(0,0,0,.3); touch-action:none; user-select:none; }
    .pn-cl-lignes{ display:flex; flex-direction:column; gap:6px; } .pn-cl-l{ display:flex; gap:6px; justify-content:center; }
    #plClavier button{ min-width:52px; height:52px; border:0; border-radius:12px; background:#fff; color:#1F3A5C; font:700 1.35rem 'Space Grotesk',Arial,sans-serif; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding:0 10px; }
    #plClavier button:active{ transform:scale(.95); } #plClavier .pn-cl-gris{ background:#DCE4EE; font-size:1rem; } #plClavier .pn-cl-ok{ background:#F08A3C; color:#fff; } #plClavier .pn-cl-large{ min-width:200px; font-size:1rem; }
    @media (max-width:600px){ #plClavier button{ min-width:30px; height:44px; font-size:1.1rem; padding:0 6px; } #plClavier{ padding:6px; width:calc(100vw - 16px); box-sizing:border-box; } .pn-cl-l{ gap:4px; } }
    .pn-actions{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:center; margin-top:10px; }
    .pn-bilan{ text-align:center; margin-top:8px; font-size:1rem; } .pn-bilan.ok{ color:#1F7A4D; } .pn-bilan.ko{ color:#9E1F5E; }
  `;
  document.head.appendChild(st);
})();
