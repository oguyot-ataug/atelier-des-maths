/* ============================================================
   Animations des cours et méthodes du CM1 et du CM2 -- demandé : « pour les niveaux cm1 et cm2, il
   manque pas mal d'animations dans les cours ou les méthodes », puis « go ! » pour : fractions
   (partager puis colorier), opérations posées (pas à pas, sur les nombres de l'élève), symétrie
   axiale (pliage), aires (découper et recomposer), périmètre (la ficelle qu'on déroule).

   Un lecteur commun : cmAnim(id, { dessin(t, a) → { scene, texte }, duree, controles(a), legende }).
   t va de 0 à 1 (Lecture / Pause, curseur) ; les réglages (boutons) changent a.etat et relancent.
   Le dessin est lancé à l'ouverture du chapitre (cm1Chapitre › init, comme les pliages de patrons).
   Dépend de _commun.js (cm1Frac) ; chargé juste après lui.
   ============================================================ */
const CM_ANIMS = {};
const cmBorne = (v, a, b) => Math.max(a, Math.min(b, v));
const cmPhase = (t, a, b) => cmBorne((t - a) / (b - a), 0, 1);           // avancement de t dans [a, b]
const cmDoux = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // départ et arrivée en douceur
const cmNb = x => String(Math.round(x * 100) / 100).replace('.', ',');

function cmAnim(id, o){
  CM_ANIMS[id] = Object.assign({ id, t: 0, anim: null, etat: {} }, o);
  return `<div class="figure-wrap cm-anim" data-anim="${id}"><div class="cma-ctrl"></div><div class="cma-scene"></div><div class="cma-texte"></div>
    <div class="cmp-barre"><button type="button" class="btn cma-jouer" onclick="cmAnimJouer('${id}')"><span class="gicon">play_arrow</span> Lecture</button>
      <input type="range" min="0" max="1000" value="0" aria-label="Avancement" oninput="cmAnimT('${id}', this.value / 1000)"></div>
    ${o.legende ? `<p class="hint" style="margin:4px 0 0;">${o.legende}</p>` : ''}</div>`;
}
function cmAnimDessiner(id, ctrl){
  const a = CM_ANIMS[id], box = document.querySelector(`.cm-anim[data-anim="${id}"]`); if(!a || !box) return;
  if(ctrl !== false && a.controles) box.querySelector('.cma-ctrl').innerHTML = a.controles(a);
  const r = a.dessin(a.t, a);
  box.querySelector('.cma-scene').innerHTML = r.scene;
  box.querySelector('.cma-texte').innerHTML = r.texte || '';
  box.querySelector('input[type=range]').value = Math.round(a.t * 1000);
  box.querySelector('.cma-jouer').innerHTML = a.anim ? '<span class="gicon">pause</span> Pause' : a.t >= 1 ? '<span class="gicon">replay</span> Rejouer' : '<span class="gicon">play_arrow</span> Lecture';
}
function cmAnimT(id, t){ const a = CM_ANIMS[id]; cancelAnimationFrame(a.anim); a.anim = null; a.t = t; cmAnimDessiner(id, false); }
function cmAnimJouer(id){
  const a = CM_ANIMS[id];
  if(a.anim){ cancelAnimationFrame(a.anim); a.anim = null; cmAnimDessiner(id, false); return; }
  if(a.t >= 1) a.t = 0;
  const d = (typeof a.duree === 'function' ? a.duree(a) : a.duree) || 6000;
  let avant = performance.now();
  const pas = now => { a.t = Math.min(1, a.t + (now - avant) / d); avant = now; a.anim = a.t < 1 ? requestAnimationFrame(pas) : null; cmAnimDessiner(id, false); };
  a.anim = requestAnimationFrame(pas); cmAnimDessiner(id, false);
}
// Réglage changé par un bouton : nouvel état, retour au début, et lecture.
function cmAnimRegler(id, cle, val){
  const a = CM_ANIMS[id]; cancelAnimationFrame(a.anim); a.anim = null;
  a.etat[cle] = val; if(a.corriger) a.corriger(a); a.t = 0; cmAnimDessiner(id); cmAnimJouer(id);
}
const cmBtn = (id, cle, val, txt, on) => `<button type="button" class="cmp-mod${on ? ' on' : ''}" onclick="cmAnimRegler('${id}','${cle}',${JSON.stringify(val).replace(/"/g, '&quot;')})">${txt}</button>`;
const cmPlusMoins = (id, cle, v, min, max, txt) => `<span class="cma-pm">${txt} <button type="button" onclick="cmAnimRegler('${id}','${cle}',${Math.max(min, v - 1)})" ${v <= min ? 'disabled' : ''}>−</button><b>${v}</b><button type="button" onclick="cmAnimRegler('${id}','${cle}',${Math.min(max, v + 1)})" ${v >= max ? 'disabled' : ''}>+</button></span>`;

/* ------------------------------ 1. Fractions : partager, puis colorier ------------------------------ */
function cm1AnimFraction(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 5, k: o.k || 3, forme: o.forme || 'bande' }, duree: 7000,
    legende: 'Change le nombre de parts et de parts coloriées, ou la forme de l\'unité.',
    corriger: a => { a.etat.k = Math.min(a.etat.k, 2 * a.etat.n); },
    controles: a => `<div class="cmp-modeles">${cmBtn(id, 'forme', 'bande', 'Bande', a.etat.forme === 'bande')}${cmBtn(id, 'forme', 'disque', 'Disque', a.etat.forme === 'disque')}
      ${cmPlusMoins(id, 'n', a.etat.n, 2, 12, 'Parts égales')}${cmPlusMoins(id, 'k', a.etat.k, 0, 2 * a.etat.n, 'Parts coloriées')}</div>`,
    dessin: (t, a) => {
      const { n, k, forme } = a.etat, nbU = Math.max(1, Math.ceil(k / n));
      const coupes = Math.floor(cmPhase(t, .12, .48) * (n - 1) + 1e-6), colories = Math.floor(cmPhase(t, .55, .95) * k + 1e-6);
      let s = '';
      if(forme === 'bande'){
        const L = 280, H = 56, G = 36, W = nbU * L + (nbU - 1) * G + 8;
        for(let u = 0; u < nbU; u++){ const x0 = 4 + u * (L + G);
          for(let i = 0; i < n; i++){ const on = u * n + i < colories;
            s += `<rect x="${x0 + i * L / n}" y="8" width="${L / n}" height="${H}" fill="${on ? '#E35D3A' : '#fff'}" fill-opacity="${on ? .8 : 1}"/>`; }
          for(let i = 1; i < n; i++) if(i <= coupes || u > 0) s += `<line x1="${x0 + i * L / n}" y1="8" x2="${x0 + i * L / n}" y2="${8 + H}" stroke="#1F3A5C" stroke-width="2"/>`;
          s += `<rect x="${x0}" y="8" width="${L}" height="${H}" fill="none" stroke="#1F3A5C" stroke-width="2.5"/>`;
          if(nbU > 1) s += `<text x="${x0 + L / 2}" y="${H + 30}" text-anchor="middle" font-size="14" fill="#5B6472" font-family="Space Grotesk">unité ${u + 1}</text>`; }
        s = `<svg viewBox="0 0 ${W} ${nbU > 1 ? H + 40 : H + 16}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`;
      } else {
        const R = 70, W = nbU * 170;
        for(let u = 0; u < nbU; u++){ const cx = 85 + u * 170, cy = 80;
          for(let i = 0; i < n; i++){ const on = u * n + i < colories, a0 = -Math.PI / 2 + 2 * Math.PI * i / n, a1 = a0 + 2 * Math.PI / n;
            if(on) s += `<path d="M${cx} ${cy} L${(cx + R * Math.cos(a0)).toFixed(2)} ${(cy + R * Math.sin(a0)).toFixed(2)} A${R} ${R} 0 ${n === 1 ? 1 : 0} 1 ${(cx + R * Math.cos(a1)).toFixed(2)} ${(cy + R * Math.sin(a1)).toFixed(2)} Z" fill="#2EA8C9" fill-opacity=".8"/>`; }
          for(let i = 0; i < n; i++) if(u > 0 || (coupes > 0 && i <= coupes)){ const a0 = -Math.PI / 2 + 2 * Math.PI * i / n;
            s += `<line x1="${cx}" y1="${cy}" x2="${(cx + R * Math.cos(a0)).toFixed(2)}" y2="${(cy + R * Math.sin(a0)).toFixed(2)}" stroke="#1F3A5C" stroke-width="2"/>`; }
          s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#1F3A5C" stroke-width="2.5"/>`;
          if(nbU > 1) s += `<text x="${cx}" y="172" text-anchor="middle" font-size="14" fill="#5B6472" font-family="Space Grotesk">unité ${u + 1}</text>`; }
        s = `<svg viewBox="0 0 ${W} ${nbU > 1 ? 180 : 160}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`;
      }
      const unite = forme === 'bande' ? 'une bande' : 'un disque';
      const texte = t < .12 ? `Voici l'unité : ${unite}.`
        : t < .55 ? `On partage l'unité en <b>${n} parts égales</b> : chaque part est ${cm1Frac(1, n)} de l'unité.`
        : `On colorie <b>${colories}</b> part${colories > 1 ? 's' : ''} : on a colorié ${cm1Frac(colories, n)}${colories === n ? ' = 1 unité' : colories > n ? ', c\'est plus qu\'une unité' : ''}.`;
      return { scene: s, texte };
    } });
}

/* ------------------------------ 2. Opération posée, pas à pas ------------------------------
   L'élève tape ses nombres. Addition et soustraction de décimaux (virgules alignées, zéros ajoutés
   en gris), soustraction par compensation (« +10 » au-dessus du chiffre du haut, « 1+ » en petit à
   gauche du chiffre du bas de la colonne suivante -- même convention que le chapitre Opérations),
   multiplication d'un nombre (entier ou décimal) par un entier (produits partiels, décalage). */
const CM_RANGS = ['unités', 'dizaines', 'centaines', 'unités de mille', 'dizaines de mille', 'centaines de mille', 'unités de millions'];
const CM_DECS = ['dixièmes', 'centièmes', 'millièmes', 'dix-millièmes'];
function cmOpLire(s){ s = String(s || '').trim().replace(/\s/g, '').replace('.', ','); if(!/^\d+(,\d+)?$/.test(s)) return null; const [e, d = ''] = s.split(','); return { e: e.replace(/^0+(?=\d)/, ''), d }; }
function cmOpEtapes(sa, op, sb){
  const A = cmOpLire(sa), B = cmOpLire(sb);
  if(!A || !B) return { erreur: 'Tape deux nombres (entiers ou décimaux, avec une virgule).' };
  if(A.e.length + A.d.length > 8 || B.e.length + B.d.length > 8) return { erreur: 'Des nombres un peu plus petits, s\'il te plaît (8 chiffres au plus).' };
  const et = [], aff = x => x.replace('.', ',');
  if(op === '×'){
    if(B.d) return { erreur: 'Pour la multiplication, le deuxième nombre doit être un entier.' };
    if(B.e.length > 3) return { erreur: 'Le deuxième nombre doit avoir 3 chiffres au plus.' };
    const ai = A.e + A.d, nd = A.d.length, bi = B.e, parts = [];
    const total = BigInt(ai) * BigInt(bi), res = total.toString();
    const L = Math.max(ai.length + 1, bi.length + 1, res.length) + 1;
    const rang = (txt, opts) => Object.assign({ cells: txt.padStart(L).split('') }, opts || {});
    const avecVirgule = (digits, n) => { if(!n) return digits; const p = digits.padStart(n + 1, '0'); return p.slice(0, -n) + ',' + p.slice(-n); };
    const base = () => [rang(ai, { label: nd ? `← ${aff(sa)} sans sa virgule` : '' }), rang(bi, { sign: '×', bar: true })];
    et.push({ rows: base(), texte: nd ? `On pose ${aff(sa)} × ${bi}. On multiplie d'abord <b>sans s'occuper de la virgule</b> : ${ai} × ${bi}.` : `On pose ${ai} × ${bi} : le nombre qui a le plus de chiffres en haut.` });
    [...bi].reverse().forEach((c, i) => {
      const p = (BigInt(ai) * BigInt(c)).toString() + '0'.repeat(i); parts.push(p);
      const rows = base().concat(parts.map((q, j) => rang(q, { label: `← ${ai} × ${[...bi].reverse()[j]}${j ? ' ' + CM_RANGS[j] : ''}`, zeros: j })));
      et.push({ rows, col: null, texte: i === 0 ? `${ai} × ${c} = <b>${p}</b>` : `Chiffre des ${CM_RANGS[i]} : on décale, on écrit d'abord ${i > 1 ? i + ' zéros' : 'un zéro'}, puis ${ai} × ${c} = ${(BigInt(ai) * BigInt(c)).toString()} → <b>${p}</b>` });
    });
    if(parts.length > 1){
      const rows = base().concat(parts.map((q, j) => rang(q, { zeros: j, sign: j === parts.length - 1 ? '+' : '', bar: j === parts.length - 1 }))).concat([rang(res, { res: true })]);
      et.push({ rows, texte: `On additionne les résultats intermédiaires : ${parts.join(' + ')} = <b>${res}</b>.` });
    }
    const derniers = et[et.length - 1].rows, base2 = parts.length > 1 ? derniers.slice(0, -1) : derniers.slice(0, -1);
    if(nd){
      const fin = avecVirgule(res, nd).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
      et.push({ rows: base2.concat([rang(res, { res: true, fin: true, label: `→ ${aff(sa)} × ${bi} = <b>${fin}</b>` })]), fin: true,
        texte: `${aff(sa)} a <b>${nd} chiffre${nd > 1 ? 's' : ''} après la virgule</b> : le résultat aussi. ${res} devient <b>${fin}</b>.` });
    } else et.push({ rows: base2.concat([rang(res, { res: true, fin: true })]), texte: `${ai} × ${bi} = <b>${res}</b>`, fin: true });
    return { etapes: et };
  }
  // Addition / soustraction : on aligne les virgules et on complète avec des zéros.
  const nd = Math.max(A.d.length, B.d.length), ne = Math.max(A.e.length, B.e.length) + 1;
  const dA = A.d.padEnd(nd, '0'), dB = B.d.padEnd(nd, '0');
  const va = Number(A.e + '.' + dA), vb = Number(B.e + '.' + dB);
  if(op === '−' && vb > va) return { erreur: `${aff(sb)} est plus grand que ${aff(sa)} : au CM, on soustrait le plus petit nombre du plus grand.` };
  const col = (e, d) => (e.padStart(ne) + (nd ? ',' + d : '')).split('');
  const ajout = (orig, d) => d.slice(orig.length);            // zéros ajoutés (affichés en gris)
  const ta = col(A.e, dA), tb = col(B.e, dB), N = ta.length, virg = nd ? ne : -1;
  const haut = Array(N).fill(''), bas = Array(N).fill(''), res = Array(N).fill(''), ret = Array(N).fill('');
  const gris = (row, orig, d) => { const z = ajout(orig, d); return row.map((c, i) => i > virg && virg >= 0 && i - virg - 1 >= orig.length && z ? `<span style="color:#A0A8B4;">${c}</span>` : c); };
  const rangs = j => j > virg && virg >= 0 ? CM_DECS[j - virg - 1] : CM_RANGS[(virg >= 0 ? virg : N) - 1 - j];
  const tableau = (colActive, fin) => [
    { cells: ret, small: true, color: '#E35D3A' },
    { cells: gris(ta, A.d, dA).map((c, i) => haut[i] ? `${c}` : c), annot: haut },
    { cells: gris(tb, B.d, dB).map((c, i) => bas[i] ? cm1opCompPrefixCm(c) : c), sign: op, bar: true },
    { cells: res.slice(), res: true, fin }
  ].map(r => Object.assign(r, { col: colActive }));
  const zerosAjoutes = A.d.length !== B.d.length;
  et.push({ rows: tableau(null), texte: `On pose l'opération : ${nd ? 'les <b>virgules</b> les unes sous les autres' : 'les unités sous les unités'}${zerosAjoutes ? ', et on complète avec des <b>zéros</b> (en gris) pour avoir autant de chiffres après la virgule' : ''}.` });
  let r = 0;
  for(let j = N - 1; j >= 0; j--){
    if(j === virg){ res[j] = ','; et.push({ rows: tableau(j), texte: 'On écrit la <b>virgule</b> du résultat sous les virgules.' }); continue; }
    const x = +(ta[j].trim() || 0), y = +(tb[j].trim() || 0);
    if(op === '+'){
      if(!ta[j].trim() && !tb[j].trim() && !r) continue;
      const s = x + y + r, aR = r; res[j] = String(s % 10); r = Math.floor(s / 10);
      const k = j - 1 === virg ? j - 2 : j - 1; if(r && k >= 0) ret[k] = '1';
      et.push({ rows: tableau(j), texte: `Colonne des <b>${rangs(j)}</b> : ${x} + ${y}${aR ? ' + 1 (la retenue)' : ''} = ${s}. J'écris <b>${s % 10}</b>${r ? ', je retiens 1' : ''}.` });
    } else {
      if(!ta[j].trim() && !tb[j].trim()) continue;
      const yy = y + r; let txt;
      if(x < yy){
        haut[j] = '+10'; ret[j] = '+10';
        const k = j - 1 === virg ? j - 2 : j - 1; if(k >= 0) bas[k] = '1';
        res[j] = String(x + 10 - yy);
        txt = `Colonne des <b>${rangs(j)}</b> : ${r ? `en bas, ${y} + 1 (compensation) = ${yy} ; ` : ''}${x} &lt; ${yy}. J'ajoute <b>10</b> en haut (${x} devient ${x + 10}) et <b>1</b> en bas dans la colonne suivante (« 1+ »). ${x + 10} − ${yy} = <b>${x + 10 - yy}</b>.`;
        r = 1;
      } else { res[j] = String(x - yy); txt = `Colonne des <b>${rangs(j)}</b> : ${x} − ${yy}${r ? ` (${y} + 1 de la compensation)` : ''} = <b>${x - yy}</b>.`; r = 0; }
      et.push({ rows: tableau(j), texte: txt });
    }
  }
  if(op === '+' && r) { /* retenue finale déjà écrite sur la colonne de gauche */ }
  // Résultat sans zéros inutiles devant.
  for(let j = 0; j < N - 1 && (res[j] === '0' || res[j] === '') && j + 1 !== virg; j++) res[j] = '';
  const fin = res.join('').replace(/^,/, '0,');
  et.push({ rows: tableau(null, true), texte: `${aff(sa)} ${op} ${aff(sb)} = <b>${fin.replace(/(,\d*?)0+$/, '$1').replace(/,$/, '')}</b>`, fin: true });
  return { etapes: et };
}
function cm1opCompPrefixCm(d){ return `<span style="white-space:nowrap;"><span style="font-size:.55em;color:#E35D3A;vertical-align:top;">1+</span>${d}</span>`; }
function cmOpTableHtml(rows){
  return `<table class="cma-op">${rows.map(r => `<tr>${`<td class="cma-sg">${r.sign || ''}</td>`}${r.cells.map((c, i) => {
    const st = (r.bar ? 'border-bottom:2.5px solid #1F3A5C;' : '') + (r.col === i ? 'background:rgba(255,193,7,.28);' : '');
    const cls = r.small ? 'cma-ret' : r.res ? 'cma-res' + (r.fin ? ' cma-fin' : '') : '';
    return `<td class="${cls}" style="${st}">${c && String(c).trim() !== '' ? c : '&nbsp;'}</td>`; }).join('')}${r.label ? `<td class="cma-lab">${r.label}</td>` : ''}</tr>`).join('')}</table>`;
}
function cm1AnimOperation(id, o){
  o = o || {};
  const ops = o.ops || ['+', '−', '×'];
  return cmAnim(id, {
    etat: { a: o.a || '356', op: o.op || ops[0], b: o.b || '178' }, legende: o.legende || 'Tape tes propres nombres, choisis l\'opération, puis « Calculer ». Le calcul se déroule colonne par colonne.',
    duree: a => (a._et && a._et.etapes ? a._et.etapes.length : 4) * 1700,
    controles: a => `<form class="cma-saisie" onsubmit="event.preventDefault();cmOpCalculer('${id}',this)">
      <input name="a" value="${a.etat.a}" inputmode="decimal" aria-label="Premier nombre" size="8">
      <select name="op" aria-label="Opération">${ops.map(x => `<option ${x === a.etat.op ? 'selected' : ''}>${x}</option>`).join('')}</select>
      <input name="b" value="${a.etat.b}" inputmode="decimal" aria-label="Deuxième nombre" size="8">
      <button class="btn" type="submit"><span class="gicon">calculate</span> Calculer</button></form>`,
    dessin: (t, a) => {
      const key = a.etat.a + a.etat.op + a.etat.b;
      if(a._cle !== key){ a._et = cmOpEtapes(a.etat.a, a.etat.op, a.etat.b); a._cle = key; }
      if(a._et.erreur) return { scene: '', texte: `<span style="color:#C62828;">${a._et.erreur}</span>` };
      const E = a._et.etapes, i = Math.min(E.length - 1, Math.floor(t * E.length + 1e-9));
      return { scene: cmOpTableHtml(E[i].rows), texte: `<span class="cma-num">${i + 1} / ${E.length}</span> ${E[i].texte}` };
    } });
}
function cmOpCalculer(id, f){ const a = CM_ANIMS[id]; a.etat.a = f.a.value; a.etat.op = f.op.value; a.etat.b = f.b.value; a.t = 0; cancelAnimationFrame(a.anim); a.anim = null; cmAnimDessiner(id); cmAnimJouer(id); }

/* ------------------------------ 3. Symétrie axiale : le pliage ------------------------------ */
const CM_SYM_FIG = {
  drapeau: { nom: 'Drapeau', pts: [[2, 7], [2, 1], [5, 2], [3, 3], [3, 7]] },
  maison: { nom: 'Maison', pts: [[1, 7], [1, 4], [3, 2], [5, 4], [5, 7]] },
  bateau: { nom: 'Bateau', pts: [[1, 5], [5, 5], [4, 7], [2, 7]] },
  fleche: { nom: 'Flèche', pts: [[1, 4], [3, 2], [3, 3], [5, 3], [5, 5], [3, 5], [3, 6]] },
};
const CM_SYM_AXE = { vertical: { nom: 'Axe vertical', P: [6, 0], u: [0, 1] }, horizontal: { nom: 'Axe horizontal', P: [0, 6], u: [1, 0] }, diagonal: { nom: 'Axe oblique', P: [0, 0], u: [Math.SQRT1_2, Math.SQRT1_2] } };
function cm1AnimSymetrie(id, o){
  o = o || {};
  const axes = o.axes || ['vertical'];
  return cmAnim(id, {
    etat: { fig: o.fig || 'drapeau', axe: axes[0] }, duree: 7000,
    legende: 'On plie la feuille le long de l\'axe : la figure vient se poser sur son symétrique.',
    controles: a => `<div class="cmp-modeles">${Object.entries(CM_SYM_FIG).map(([k, f]) => cmBtn(id, 'fig', k, f.nom, a.etat.fig === k)).join('')}${axes.length > 1 ? '<span style="width:12px"></span>' + axes.map(k => cmBtn(id, 'axe', k, CM_SYM_AXE[k].nom, a.etat.axe === k)).join('') : ''}</div>`,
    dessin: (t, a) => {
      const K = 34, Wg = 12, Hg = a.etat.axe === 'vertical' ? 8 : 12;
      const ax = CM_SYM_AXE[a.etat.axe], n = [-ax.u[1], ax.u[0]];
      let pts = CM_SYM_FIG[a.etat.fig].pts;
      if(a.etat.axe === 'horizontal') pts = pts.map(([x, y]) => [y + 2, x]);   // la figure couchée, au-dessus de l'axe
      if(a.etat.axe === 'diagonal') pts = pts.map(([x, y]) => [x, y + 4]);     // sous la diagonale (y > x)
      // Pliage : la composante perpendiculaire à l'axe est multipliée par cos(π·k).
      const k = cmDoux(cmPhase(t, .1, .6)), c = Math.cos(Math.PI * k);
      const plie = ([x, y]) => { const d = (x - ax.P[0]) * n[0] + (y - ax.P[1]) * n[1]; return [x - d * n[0] + d * c * n[0], y - d * n[1] + d * c * n[1]]; };
      const sym = ([x, y]) => { const d = (x - ax.P[0]) * n[0] + (y - ax.P[1]) * n[1]; return [x - 2 * d * n[0], y - 2 * d * n[1]]; };
      const P = p => `${(p[0] * K).toFixed(1)},${(p[1] * K).toFixed(1)}`;
      let s = '';
      for(let i = 0; i <= Wg; i++) s += `<line x1="${i * K}" y1="0" x2="${i * K}" y2="${Hg * K}" stroke="#D5DCE4" stroke-width="1"/>`;
      for(let j = 0; j <= Hg; j++) s += `<line x1="0" y1="${j * K}" x2="${Wg * K}" y2="${j * K}" stroke="#D5DCE4" stroke-width="1"/>`;
      const A = [ax.P[0] - ax.u[0] * 30, ax.P[1] - ax.u[1] * 30], B = [ax.P[0] + ax.u[0] * 30, ax.P[1] + ax.u[1] * 30];
      s += `<line x1="${A[0] * K}" y1="${A[1] * K}" x2="${B[0] * K}" y2="${B[1] * K}" stroke="#D93025" stroke-width="3" stroke-dasharray="10 6"/>`;
      s += `<polygon points="${pts.map(P).join(' ')}" fill="#2EA8C9" fill-opacity=".55" stroke="#1F3A5C" stroke-width="2.5" stroke-linejoin="round"/>`;
      const fin = t >= .6;
      if(t > .1 && !fin) s += `<polygon points="${pts.map(plie).map(P).join(' ')}" fill="#2EA8C9" fill-opacity="${(.25 + .3 * Math.abs(c)).toFixed(2)}" stroke="#1F3A5C" stroke-width="2" stroke-dasharray="${c < 0 ? '0' : '5 4'}"/>`;
      if(fin){
        const im = pts.map(sym);
        s += `<polygon points="${im.map(P).join(' ')}" fill="#E35D3A" fill-opacity=".5" stroke="#8E2E1C" stroke-width="2.5" stroke-linejoin="round"/>`;
        const m = Math.floor(cmPhase(t, .66, .95) * pts.length + 1e-6);
        pts.slice(0, m).forEach((p, i) => { s += `<line x1="${p[0] * K}" y1="${p[1] * K}" x2="${im[i][0] * K}" y2="${im[i][1] * K}" stroke="#7A4FC0" stroke-width="1.6" stroke-dasharray="4 3"/><circle cx="${p[0] * K}" cy="${p[1] * K}" r="4" fill="#1F3A5C"/><circle cx="${im[i][0] * K}" cy="${im[i][1] * K}" r="4" fill="#8E2E1C"/>`; });
      }
      const scene = `<svg viewBox="-4 -4 ${Wg * K + 8} ${Hg * K + 8}" class="cma-svg" style="max-width:${Wg * K + 8}px;"><defs><clipPath id="cmaclip-${id}"><rect x="0" y="0" width="${Wg * K}" height="${Hg * K}"/></clipPath></defs><g clip-path="url(#cmaclip-${id})">${s}</g></svg>`;
      const texte = t < .1 ? 'La figure bleue et l\'<b>axe de symétrie</b> (en rouge).'
        : !fin ? 'On <b>plie</b> la feuille le long de l\'axe…'
        : t < .66 ? 'La figure se pose exactement sur son <b>symétrique</b> (en orange) : les deux figures se superposent.'
        : 'Chaque point et son symétrique sont <b>à la même distance de l\'axe</b>, de part et d\'autre, sur une même perpendiculaire à l\'axe.';
      return { scene, texte };
    } });
}

/* ------------------------------ 4. Aires : découper et recomposer ------------------------------ */
const CM_AIRES = [
  { nom: 'Parallélogramme', w: 9, h: 5, aire: 18, pieces: [
    { pts: [[0, 4], [2, 1], [2, 4]], vers: [6, 0], c: '#E35D3A' },
    { pts: [[2, 1], [8, 1], [6, 4], [2, 4]], vers: [0, 0], c: '#2EA8C9' } ],
    debut: 'Un parallélogramme. Combien de carreaux ? Difficile à compter avec les demi-carreaux…',
    fin: 'On découpe le triangle de gauche et on le recolle à droite : c\'est un rectangle de 6 × 3 = <b>18 carreaux</b>. Les deux figures ont la <b>même aire</b>.' },
  { nom: 'Triangle', w: 9, h: 6, aire: 12, pieces: [
    { pts: [[1, 1], [7, 5], [1, 5]], vers: [0, 0], c: '#2EA8C9' },
    { pts: [[1, 1], [7, 5], [1, 5]], tourne: true, c: '#E35D3A' } ],
    debut: 'Un triangle rectangle. Quelle est son aire ?',
    fin: 'Deux triangles identiques forment un rectangle de 6 × 4 = 24 carreaux : le triangle en est la <b>moitié</b>, <b>12 carreaux</b>.' },
  { nom: 'Escalier', w: 8, h: 6, aire: 18, pieces: [
    { pts: [[1, 2], [3, 2], [3, 5], [1, 5]], vers: [0, 0], c: '#2EA8C9' },
    { pts: [[1, 1], [3, 1], [3, 2], [1, 2]], vers: [4, 1], c: '#E35D3A' },
    { pts: [[3, 2], [5, 2], [5, 5], [3, 5]], vers: [0, 0], c: '#2E9C6A' },
    { pts: [[5, 3], [7, 3], [7, 5], [5, 5]], vers: [0, 0], c: '#F2A93B' } ],
    debut: 'Une figure en escalier : 8 + 6 + 4 carreaux.',
    fin: 'On déplace le haut de la première marche : on obtient un rectangle de 6 × 3 = <b>18 carreaux</b>. 8 + 6 + 4 = 18 : la figure n\'a pas changé d\'aire.' },
];
function cm1AnimAire(id, o){
  o = o || {};
  const liste = (o.modeles || [0, 1]).map(i => CM_AIRES[i]);
  return cmAnim(id, {
    etat: { m: 0 }, duree: 6500,
    legende: 'Découper une figure et déplacer les morceaux ne change pas son aire.',
    controles: a => liste.length > 1 ? `<div class="cmp-modeles">${liste.map((m, i) => cmBtn(id, 'm', i, m.nom, a.etat.m === i)).join('')}</div>` : '',
    dessin: (t, a) => {
      const M = liste[a.etat.m], K = 34, k = cmDoux(cmPhase(t, .25, .75));
      let s = '';
      for(let i = 0; i <= M.w; i++) s += `<line x1="${i * K}" y1="0" x2="${i * K}" y2="${M.h * K}" stroke="#D5DCE4"/>`;
      for(let j = 0; j <= M.h; j++) s += `<line x1="0" y1="${j * K}" x2="${M.w * K}" y2="${j * K}" stroke="#D5DCE4"/>`;
      M.pieces.forEach((p, i) => {
        let pts = p.pts;
        if(p.tourne){ // demi-tour autour du milieu de l'hypoténuse : le triangle complète le rectangle
          const cx = (p.pts[0][0] + p.pts[1][0]) / 2, cy = (p.pts[0][1] + p.pts[1][1]) / 2, ang = Math.PI * k;
          if(t < .2) return;
          pts = p.pts.map(([x, y]) => [cx + (x - cx) * Math.cos(ang) - (y - cy) * Math.sin(ang), cy + (x - cx) * Math.sin(ang) + (y - cy) * Math.cos(ang)]);
        } else pts = p.pts.map(([x, y]) => [x + p.vers[0] * k, y + p.vers[1] * k]);
        const coupe = t > .15 && (p.vers && (p.vers[0] || p.vers[1]) || p.tourne);
        s += `<polygon points="${pts.map(([x, y]) => `${(x * K).toFixed(1)},${(y * K).toFixed(1)}`).join(' ')}" fill="${p.c}" fill-opacity=".6" stroke="#1F3A5C" stroke-width="${coupe ? 2.5 : 2}" ${coupe && k < 1 ? 'stroke-dasharray="7 4"' : ''} stroke-linejoin="round"/>`;
      });
      const texte = t < .2 ? M.debut : t < .78 ? 'On <b>découpe</b> et on <b>déplace</b> un morceau…' : M.fin;
      return { scene: `<svg viewBox="-4 -4 ${M.w * K + 8} ${M.h * K + 8}" class="cma-svg" style="max-width:${M.w * K + 8}px;">${s}</svg>`, texte };
    } });
}

/* ------------------------------ 5. Périmètre : la ficelle qu'on déroule ------------------------------ */
const CM_PERIM = [
  { nom: 'Rectangle', pts: [[1, 1], [6, 1], [6, 4], [1, 4]] },
  { nom: 'Triangle', pts: [[1, 4], [5, 4], [1, 1]] },
  { nom: 'Figure en L', pts: [[1, 1], [3, 1], [3, 3], [6, 3], [6, 5], [1, 5]] },
];
function cm1AnimPerimetre(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { m: 0 }, duree: 9000,
    legende: 'Un carreau = 1 cm. La ficelle fait le tour de la figure, puis on la déroule le long d\'une règle.',
    controles: a => `<div class="cmp-modeles">${CM_PERIM.map((m, i) => cmBtn(id, 'm', i, m.nom, a.etat.m === i)).join('')}</div>`,
    dessin: (t, a) => {
      const M = CM_PERIM[a.etat.m], K = 30, pts = M.pts, n = pts.length;
      const cotes = pts.map((p, i) => { const q = pts[(i + 1) % n]; return { p, q, l: Math.hypot(q[0] - p[0], q[1] - p[1]) }; });
      const tot = cotes.reduce((s, c) => s + c.l, 0), Wg = Math.max(8, Math.ceil(tot) + 2), yL = 7.2;
      let s = '';
      for(let i = 0; i <= 8; i++) s += `<line x1="${i * K}" y1="0" x2="${i * K}" y2="${6 * K}" stroke="#E2E7EE"/>`;
      for(let j = 0; j <= 6; j++) s += `<line x1="0" y1="${j * K}" x2="${8 * K}" y2="${j * K}" stroke="#E2E7EE"/>`;
      s += `<polygon points="${pts.map(([x, y]) => `${x * K},${y * K}`).join(' ')}" fill="#2EA8C9" fill-opacity=".15" stroke="#1F3A5C" stroke-width="1.5"/>`;
      // Règle graduée sous la figure.
      s += `<rect x="${K - 6}" y="${yL * K - 4}" width="${(Wg - 1) * K + 12}" height="30" rx="4" fill="#FFF3D6" stroke="#C9A24A"/>`;
      for(let i = 0; i <= Wg - 1; i++) s += `<line x1="${(1 + i) * K}" y1="${yL * K - 4}" x2="${(1 + i) * K}" y2="${yL * K + 6}" stroke="#8A6D1F"/><text x="${(1 + i) * K}" y="${yL * K + 20}" font-size="11" text-anchor="middle" fill="#8A6D1F" font-family="Space Grotesk">${i}</text>`;
      // Phase 1 (0 → .5) : la ficelle fait le tour. Phase 2 (.55 → .95) : chaque côté va se poser sur la règle.
      const k1 = cmPhase(t, .05, .5), k2 = cmPhase(t, .55, .95), fait = k1 * tot;
      let cumul = 0, sTxt = [];
      cotes.forEach((c, i) => {
        const debut = cumul; cumul += c.l;
        const part = cmBorne((fait - debut) / c.l, 0, 1);
        const kc = cmDoux(cmBorne(k2 * n - i, 0, 1));
        const dst = [[1 + debut, yL], [1 + debut + c.l, yL]];
        const A = [c.p[0] + (dst[0][0] - c.p[0]) * kc, c.p[1] + (dst[0][1] - c.p[1]) * kc], Bf = [c.q[0] + (dst[1][0] - c.q[0]) * kc, c.q[1] + (dst[1][1] - c.q[1]) * kc];
        const B = kc > 0 ? Bf : [c.p[0] + (c.q[0] - c.p[0]) * part, c.p[1] + (c.q[1] - c.p[1]) * part];
        const coul = CM_PLIAGE_COUL[i % CM_PLIAGE_COUL.length];
        if(part > 0 || kc > 0) s += `<line x1="${(A[0] * K).toFixed(1)}" y1="${(A[1] * K).toFixed(1)}" x2="${(B[0] * K).toFixed(1)}" y2="${(B[1] * K).toFixed(1)}" stroke="${coul}" stroke-width="6" stroke-linecap="round"/>`;
        if(part >= 1 || kc > 0){ // longueur écrite à l'extérieur du côté (au-dessus quand il est posé sur la règle)
          const gx = pts.reduce((v, p) => v + p[0], 0) / n, gy = pts.reduce((v, p) => v + p[1], 0) / n;
          let mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, nx = -(B[1] - A[1]), ny = B[0] - A[0]; const ln = Math.hypot(nx, ny) || 1; nx /= ln; ny /= ln;
          if(kc < 1 && (mx - gx) * nx + (my - gy) * ny < 0){ nx = -nx; ny = -ny; }
          const off = kc >= 1 ? [0, -0.32] : [nx * .42, ny * .42 + .12];
          s += `<text x="${((mx + off[0]) * K).toFixed(1)}" y="${((my + off[1]) * K).toFixed(1)}" font-size="13" font-weight="700" text-anchor="middle" fill="${coul}" font-family="Space Grotesk">${cmNb(c.l)}</text>`; sTxt.push(cmNb(c.l)); }
      });
      if(k1 > 0 && k1 < 1 && k2 === 0){ const pos = (() => { let d = fait; for(const c of cotes){ if(d <= c.l) return [c.p[0] + (c.q[0] - c.p[0]) * d / c.l, c.p[1] + (c.q[1] - c.p[1]) * d / c.l]; d -= c.l; } return cotes[0].p; })();
        s += `<circle cx="${pos[0] * K}" cy="${pos[1] * K}" r="7" fill="#FF8208" stroke="#fff" stroke-width="2"/>`; }
      const W = Math.max(8, Wg) * K + 20;
      const texte = t < .05 ? 'Le <b>périmètre</b>, c\'est la longueur du tour de la figure.'
        : k2 === 0 ? `La ficelle fait le tour : ${sTxt.join(' + ') || '…'}${k1 >= 1 ? '' : '…'}`
        : k2 < 1 ? 'On déroule la ficelle le long de la règle…'
        : `Périmètre = ${cotes.map(c => cmNb(c.l)).join(' + ')} = <b>${cmNb(tot)} cm</b>${a.etat.m === 1 ? ' (le grand côté du triangle mesure 5 cm)' : ''}.`;
      return { scene: `<svg viewBox="0 -6 ${W} ${(yL + 1.4) * K + 10}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`, texte };
    } });
}
