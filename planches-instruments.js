/* ============================================================
   PLANCHES-INSTRUMENTS.JS — Exercices de tracé faits à l'écran AVEC LES INSTRUMENTS DU SITE
   Demandé le 12/11/2026 : « Un outil de plus en reprenant les visuels et fonctionnalités des instruments du site ? »
   Un exercice de planche dont la figure porte data-plx = { t: 'instr', … } (plInstr) s'ouvre, à l'écran, sur le vrai
   tableau interactif (emprunté comme pour le lecteur des corrections, tbAiBorrowBoard) : même crayon, même gomme, même
   règle graduée, équerre, réquerre, compas, rapporteur. La figure de départ est construite par le programme du tableau
   (format de tbAiBuildPrompt), sans animation ; l'élève trace, puis « Vérifier » compare ses tracés aux attendus.
   Chargé après app.js, tableau-ia.js et planches-num.js (objet PLX).

   cfg = { t: 'instr', depart: [programme], outils: ['regle', 'equerre', 'requerre', 'compas', 'rapporteur'],
           att: [ { k: 'long', l: 6 }                         trait droit de 6 cm (n'importe où)
                  { k: 'seg', a: 'A', b: 'B' }                trait de A à B
                  { k: 'prolonge', a: 'A', b: 'B', l: 8 }     [AB] prolongé au-delà de B jusqu'à 8 cm depuis A
                  { k: 'droite', a: 'C', b: 'D' }             trait droit qui passe par C et D et dépasse les deux
                  { k: 'cercle', c: 'O', r: 3 } ou { k: 'cercle', c: 'O', par: 'A' }   cercle (au moins 300°)
                  { k: 'perp', d: ['A', 'B'], par: 'M' }      trait perpendiculaire à (AB) passant par M
                  { k: 'para', d: ['A', 'B'], par: 'N' } ],   trait parallèle à (AB) passant par N
           aide: 'texte facultatif sous le tableau' }
   ============================================================ */
const PLI_TOL = { cm: .15, deg: 2.5 }; // tolérances : 1,5 mm et 2,5°
const PLI_OUTILS = { regle: 'regle_grad', equerre: 'equerre', requerre: 'requerre2', compas: 'compas', rapporteur: 'rapporteur' };

// Figure papier + configuration de l'écran (data-plx). Sans figure : une figure vide (un svg, pour que l'énoncé et le corrigé
// gardent le même nombre de figures, plNumAnalyser).
function plInstr(fig, cfg){
  const f = fig || '<svg class="pl-libre pl-instr-vide" viewBox="0 0 10 1" style="width:10px;height:1px;"></svg>';
  return plX(f, Object.assign({ t: 'instr' }, cfg));
}

/* ---------- Lecture des tracés du tableau ---------- */
const pliPx = () => (typeof TB_PX_PER_CM !== 'undefined' ? TB_PX_PER_CM : 22);
// Points de la figure : ceux du tableau, plus les points cachés (cfg.caches : ils servent à placer une droite sans être
// montrés ni nommés).
function pliPoint(nom){ const c = pliEnCours && pliEnCours.caches && pliEnCours.caches[nom]; if(c) return c;
  const p = (tbPoints || []).find(q => (q.label || '') === nom); return p ? [p.x, p.y] : null; }
const pliDist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
// Trait droit : extrémités, longueur, direction (degrés, 0..180), ou null s'il n'est pas droit.
function pliDroit(s){
  const P = s.points; if(!P || P.length < 2) return null;
  const a = P[0], b = P[P.length - 1], L = pliDist(a, b); if(L < 8) return null;
  const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
  if(P.some(p => Math.abs((p[0] - a[0]) * uy - (p[1] - a[1]) * ux) > 3)) return null;
  let dir = Math.atan2(uy, ux) * 180 / Math.PI; dir = ((dir % 180) + 180) % 180;
  return { a, b, L, u: [ux, uy], dir };
}
// Cercle (moindres carrés) : centre, rayon, angle couvert en degrés.
function pliCercle(s){
  const P = s.points; if(!P || P.length < 8 || pliDroit(s)) return null;
  let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0, sxz = 0, syz = 0, sz = 0; const n = P.length;
  P.forEach(([x, y]) => { const z = x * x + y * y; sx += x; sy += y; sxx += x * x; syy += y * y; sxy += x * y; sxz += x * z; syz += y * z; sz += z; });
  // Résolution de [sxx sxy sx; sxy syy sy; sx sy n] [A B C] = [sxz syz sz] (x² + y² = A x + B y + C).
  const M = [[sxx, sxy, sx, sxz], [sxy, syy, sy, syz], [sx, sy, n, sz]];
  for(let i = 0; i < 3; i++){ let m = i; for(let j = i + 1; j < 3; j++) if(Math.abs(M[j][i]) > Math.abs(M[m][i])) m = j; [M[i], M[m]] = [M[m], M[i]];
    if(Math.abs(M[i][i]) < 1e-9) return null; for(let j = 0; j < 3; j++) if(j !== i){ const f = M[j][i] / M[i][i]; for(let k = i; k < 4; k++) M[j][k] -= f * M[i][k]; } }
  const A = M[0][3] / M[0][0], B = M[1][3] / M[1][1], C = M[2][3] / M[2][2], c = [A / 2, B / 2], r = Math.sqrt(C + c[0] * c[0] + c[1] * c[1]);
  if(!isFinite(r) || r < 4) return null;
  let tour = 0; for(let i = 1; i < n; i++){ let d = Math.atan2(P[i][1] - c[1], P[i][0] - c[0]) - Math.atan2(P[i - 1][1] - c[1], P[i - 1][0] - c[0]);
    if(d > Math.PI) d -= 2 * Math.PI; if(d < -Math.PI) d += 2 * Math.PI; tour += d; }
  return { c, r, couvert: Math.abs(tour) * 180 / Math.PI };
}
const pliAngle = (d1, d2) => { const d = Math.abs(d1 - d2) % 180; return Math.min(d, 180 - d); };
const pliDistDroite = (p, a, u) => Math.abs((p[0] - a[0]) * u[1] - (p[1] - a[1]) * u[0]);
// Un attendu est-il réalisé par l'un des tracés ? Renvoie un message si non.
function pliTeste(at, traits){
  const cm = pliPx(), tol = PLI_TOL.cm * cm, D = traits.map(pliDroit), Cc = traits.map(pliCercle);
  const pt = n => pliPoint(n);
  if(at.k === 'long') return D.some(d => d && Math.abs(d.L - at.l * cm) <= tol) ? null : `Il manque un trait de ${String(at.l).replace('.', ',')} cm.`;
  if(at.k === 'seg'){ const A = pt(at.a), B = pt(at.b); if(!A || !B) return null;
    return D.some(d => d && ((pliDist(d.a, A) <= tol && pliDist(d.b, B) <= tol) || (pliDist(d.a, B) <= tol && pliDist(d.b, A) <= tol))) ? null : `Il manque le trait de ${at.a} à ${at.b}.`; }
  if(at.k === 'droite'){ const A = pt(at.a), B = pt(at.b); if(!A || !B) return null;
    return D.some(d => d && pliDistDroite(A, d.a, d.u) <= tol && pliDistDroite(B, d.a, d.u) <= tol && d.L > pliDist(A, B) + cm) ? null : `Il manque la droite (${at.a}${at.b}).`; }
  if(at.k === 'prolonge'){ const A = pt(at.a), B = pt(at.b); if(!A || !B) return null; const u = [(B[0] - A[0]) / pliDist(A, B), (B[1] - A[1]) / pliDist(A, B)];
    const loin = Math.max(0, ...D.filter(d => d && pliAngle(d.dir, ((Math.atan2(u[1], u[0]) * 180 / Math.PI) % 180 + 180) % 180) <= PLI_TOL.deg && pliDistDroite(d.a, A, u) <= tol)
      .flatMap(d => [d.a, d.b]).map(p => (p[0] - A[0]) * u[0] + (p[1] - A[1]) * u[1]));
    return Math.abs(loin - at.l * cm) <= tol ? null : `Le trait doit mesurer ${String(at.l).replace('.', ',')} cm en tout.`; }
  if(at.k === 'cercle'){ const M = at.milieu && at.milieu.map(pt), O = M ? (M[0] && M[1] ? [(M[0][0] + M[1][0]) / 2, (M[0][1] + M[1][1]) / 2] : null) : pt(at.c); if(!O) return null;
    if(M && at.r == null && at.par == null){ const r = pliDist(M[0], M[1]) / 2; return Cc.some(c => c && pliDist(c.c, O) <= tol && Math.abs(c.r - r) <= tol && c.couvert >= 300) ? null : `Il manque le cercle de diamètre [${at.milieu.join('')}].`; } const r = at.r != null ? at.r * cm : at.par && pt(at.par) ? pliDist(O, pt(at.par)) : null; if(r == null) return null;
    return Cc.some(c => c && pliDist(c.c, O) <= tol && Math.abs(c.r - r) <= tol && c.couvert >= 300) ? null : `Il manque le cercle de centre ${at.c}.`; }
  if(at.k === 'perp' || at.k === 'para'){ const A = pt(at.d[0]), B = pt(at.d[1]), M = pt(at.par); if(!A || !B || !M) return null;
    let dAB = Math.atan2(B[1] - A[1], B[0] - A[0]) * 180 / Math.PI; dAB = ((dAB % 180) + 180) % 180; const voulu = at.k === 'perp' ? 90 : 0;
    return D.some(d => d && Math.abs(pliAngle(d.dir, dAB) - voulu) <= PLI_TOL.deg && pliDistDroite(M, d.a, d.u) <= tol && d.L >= 2 * cm) ? null
      : `Il manque la ${at.k === 'perp' ? 'perpendiculaire' : 'parallèle'} à ${at.nd || '(' + at.d.join('') + ')'} passant par ${at.par}.`; }
  return null;
}
function pliVerifier(C, departIds){
  // Les tracés de la figure de départ ne comptent pas (sauf pour un trait à prolonger) ; les traits de construction comptent.
  const tous = (tbInk || []).filter(s => s.points && s.points.length >= 2), siens = tous.filter(s => !(departIds || new Set()).has(s.id));
  const traits = siens;
  if((C.att || []).some(at => at.k === 'prolonge')) return pliVerifierAvec(C, siens, tous);
  return pliVerifierAvec(C, traits, traits);
}
function pliVerifierAvec(C, siens, tous){
  const manque = (C.att || []).map(at => pliTeste(at, at.k === 'prolonge' ? tous : siens)).filter(Boolean);
  return { ok: !manque.length && (C.att || []).length > 0 && siens.length > 0, manque };
}

/* ---------- Fenêtre : le tableau interactif emprunté ---------- */
let pliEnCours = null; // { C, fin, aide: [parent, suivant] }
function pliFenetre(){
  let o = document.getElementById('pliFond');
  if(!o){ o = document.createElement('div'); o.id = 'pliFond'; o.className = 'modal-overlay';
    o.style.cssText = 'display:none;z-index:9700;'; // au-dessus de la projection des planches (9500)
    o.innerHTML = `<div class="modal-card" style="max-width:1100px;width:97vw;padding:14px 16px;">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
        <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;"><span class="gicon">straighten</span> Construire avec les instruments</strong>
        <span id="pliConsigne" style="flex:1 1 300px;color:var(--ink-soft);font-size:.92rem;"></span>
        <button type="button" class="btn secondary" onclick="pliRecommencer()"><span class="gicon">restart_alt</span> Recommencer</button>
        <button type="button" class="btn" onclick="pliTerminer(true)"><span class="gicon">task_alt</span> J'ai fini</button>
        <button type="button" class="modal-close" onclick="pliTerminer(false)" title="Fermer sans garder"><span class="gicon">close</span></button>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-start;">
        <div id="pliPalette" style="display:flex;flex-direction:column;gap:8px;flex:none;"></div>
        <div id="pliPlateau" style="flex:1;min-width:0;"></div>
      </div>
      <div id="pliMessage" style="margin-top:8px;font-weight:600;"></div>
    </div>`;
    document.body.appendChild(o); }
  const h = document.fullscreenElement && document.fullscreenElement !== document.documentElement ? document.fullscreenElement : document.body;
  if(o.parentNode !== h) h.appendChild(o);
  return o;
}
function pliPalette(C){
  const types = ['crayon', 'gomme'].concat((C.outils || ['regle']).map(t => PLI_OUTILS[t]).filter(Boolean));
  const P = (typeof TB_PALETTE !== 'undefined' ? TB_PALETTE : []).filter(p => types.includes(p.type));
  document.getElementById('pliPalette').innerHTML = P.map(p => { const on = (tbTools || []).some(t => t.type === p.type);
    return `<button type="button" onclick="tbAddTool('${p.type}'); pliPalette(pliEnCours.C);" title="${p.label}" style="width:56px;height:56px;border:2px solid ${on ? '#0D5BA3' : 'rgba(28,43,57,.2)'};border-radius:8px;background:${on ? 'rgba(13,91,163,.12)' : '#fff'};cursor:pointer;display:flex;align-items:center;justify-content:center;">${p.icon}</button>`; }).join('');
}
async function pliPreparer(C){
  tbAiResetBorrowedBoard();
  if(C.depart && C.depart.length){
    try{ tbAiLoadProgram(C.depart, C.outils && C.outils.length ? C.outils : null); }
    catch(e){ console.warn('instruments : figure de départ', e); document.getElementById('pliMessage').textContent = 'La figure de départ n\'a pas pu être construite.'; return; }
    tbAiSilent = true; try{ await tbAiFinishPlan(); } finally { tbAiSilent = false; }
    tbAiPlan = null; tbAiPlanIndex = 0;
    // Points cachés (cfg.caches) : gardés pour la vérification, retirés du tableau.
    const cach = new Set(C.caches || []);
    if(pliEnCours){ pliEnCours.caches = {}; tbPoints.filter(p => cach.has(p.label)).forEach(p => { pliEnCours.caches[p.label] = [p.x, p.y]; }); }
    tbPoints = tbPoints.filter(p => !cach.has(p.label));
    const bar = document.getElementById('tbAiPlaybackBar'); if(bar) bar.style.display = 'none';
    tbTools = []; tbHistory = []; tbHistoryIndex = -1; tbPushHistory();
  }
  if(pliEnCours) pliEnCours.departIds = new Set((tbInk || []).map(s => s.id));
  // Le crayon est sorti d'office ; la règle aussi quand elle est le seul instrument.
  tbAddTool('crayon'); if((C.outils || []).length === 1 && PLI_OUTILS[C.outils[0]]) tbAddTool(PLI_OUTILS[C.outils[0]]);
  tbSetHelp((C.outils || []).includes('compas') ? 'compas' : (C.outils || []).includes('equerre') ? 'equerre' : 'regle_grad');
  tbRender(); pliPalette(C);
}
async function pliOuvrir(C, consigne, etat, fin){
  if(typeof tbAiBorrowBoard !== 'function') return;
  const o = pliFenetre(), plateau = document.getElementById('pliPlateau');
  if(!tbAiBorrowBoard(plateau, 'exercice')) return;
  const aide = document.getElementById('tbHelpBox'); pliEnCours = { C, fin, aide: aide ? [aide.parentNode, aide.nextSibling] : null };
  if(aide) plateau.appendChild(aide);
  document.getElementById('pliConsigne').innerHTML = consigne || '';
  document.getElementById('pliMessage').textContent = C.aide || '';
  o.style.display = 'flex';
  await pliPreparer(C);
  // Reprise d'un travail déjà commencé (tracés gardés dans l'état de l'exercice).
  if(etat && etat.ink && etat.ink.length){ JSON.parse(JSON.stringify(etat.ink)).forEach(s => { s.id = tbNextId++; tbInk.push(s); }); tbRender(); tbPushHistory(); }
}
async function pliRecommencer(){ if(pliEnCours) await pliPreparer(pliEnCours.C); document.getElementById('pliMessage').textContent = ''; }
async function pliTerminer(garder){
  if(!pliEnCours) return;
  const P = pliEnCours, res = garder ? pliVerifier(P.C, P.departIds) : null;
  // Seuls les tracés de l'élève sont gardés (la figure de départ est reconstruite à chaque ouverture).
  const ink = garder ? JSON.parse(JSON.stringify((tbInk || []).filter(s => s.points && s.points.length >= 2 && !(P.departIds || new Set()).has(s.id)))) : null;
  const vue = garder ? pliApercu() : null;
  pliEnCours = null;
  if(P.aide && P.aide[0]) P.aide[0].insertBefore(document.getElementById('tbHelpBox'), P.aide[1]);
  await tbAiReturnBoard();
  document.getElementById('pliFond').style.display = 'none';
  if(garder && P.fin) P.fin({ fait: true, ok: res.ok, manque: res.manque, ink, vue });
}
// Aperçu de la construction (tracés, points, instruments retirés), pour l'exercice.
function pliApercu(){
  const xs = [], ys = []; (tbInk || []).forEach(s => s.points.forEach(p => { xs.push(p[0]); ys.push(p[1]); })); (tbPoints || []).forEach(p => { xs.push(p.x); ys.push(p.y); });
  if(!xs.length) return '';
  const x0 = Math.min(...xs) - 16, y0 = Math.min(...ys) - 16, w = Math.max(...xs) - x0 + 16, h = Math.max(...ys) - y0 + 16;
  const traits = tbInk.map(s => `<polyline points="${s.points.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" fill="none" stroke="${s.construction ? '#9CA3AF' : (s.color || '#1C1B2E')}" stroke-width="2" stroke-linecap="round"/>`).join('');
  const pts = tbPoints.map(p => `<path d="M${p.x - 4},${p.y - 4} L${p.x + 4},${p.y + 4} M${p.x - 4},${p.y + 4} L${p.x + 4},${p.y - 4}" stroke="#1C1B2E" stroke-width="1.6"/>` + (p.label ? `<text x="${p.x + 7}" y="${p.y - 7}" font-size="15" font-family="Inter, Arial, sans-serif" fill="#1C1B2E">${escapeHtml(p.label)}</text>` : '')).join('');
  return `<svg viewBox="${x0.toFixed(0)} ${y0.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" style="width:${Math.min(420, w).toFixed(0)}px;max-width:100%;background:#fff;border:1px solid #D5DBE3;border-radius:8px;">${traits}${pts}</svg>`;
}

/* ---------- Outil de l'écran des planches ---------- */
if(typeof PLX !== 'undefined') PLX.instr = {
  monter(C, el, lire, ecrire){
    const zone = el.parentNode; if(!zone || zone.dataset.pliMonte === el.dataset.pn) return; zone.dataset.pliMonte = el.dataset.pn;
    zone.addEventListener('click', e => { const b = e.target.closest('.pn-instr'); if(!b || b.dataset.instr !== el.dataset.pn) return; e.stopPropagation();
      // Consigne de l'exercice : le plus proche bloc parent qui en contient une (projection, vignette, devoir…).
      let n = el.parentElement; while(n && !n.querySelector('.plp-consigne, .pl-consigne')) n = n.parentElement;
      const cons = n && n.querySelector('.plp-consigne, .pl-consigne');
      pliOuvrir(C, cons ? cons.innerHTML : '', lire(), st => ecrire(st)); }, true);
  },
  dessin: () => '',
  barre: (C, st, id) => `<button type="button" class="pn-xbtn pn-instr on" data-instr="${id}" style="font-weight:700;"><span class="gicon">straighten</span> ${st.fait ? 'Reprendre la construction' : 'Construire avec les instruments'}</button>`
    + (st.fait ? `<div class="pn-instr-vue" style="margin-top:6px;">${st.vue || ''}</div>` : `<span class="pn-xaide">Les instruments du site s'ouvrent : règle, équerre, compas…</span>`),
  juste: (C, st) => !!st.ok
};
