/* =====================================================================
   questionnaires-manuel.js -- Question « Exercice du manuel »

   Demandé : « Serait-il possible de profiter de cette base d'exercices pour les insérer dans une
   interrogation en ligne ou papier ? » (version papier : evaluation.js, bouton « Exercices du
   manuel »).

   - Le professeur choisit un ou plusieurs exercices des planches (planches-choix.js) : seuls ceux
     qui se font à l'écran sont proposés (cases à remplir, parts à colorier, nombres à entourer,
     droite à tracer… -- planches-num.js) ; chaque exercice choisi devient une question.
   - L'énoncé de la question reprend la consigne de l'exercice (modifiable) ; l'élève fait
     l'exercice à l'écran avec les outils du manuel (clavier virtuel, coloriage…).
   - Correction automatique : les points sont partagés entre les réponses à donner (3 cases justes
     sur 4 = les trois quarts des points).
   - « Une version différente pour chaque élève » (si l'exercice a des versions, planches-
     variantes.js) : le numéro de version est tiré d'une graine propre à l'élève et gardé dans sa
     réponse (rep.v), pour que le professeur corrige la même version.
   Réponse : { e: état planches-num (cases, parts…), v: version (facultatif) }.

   L'exercice est gardé dans la question (q.pm.x : consigne, énoncé, corrigé) : si le manuel change
   entre-temps, le questionnaire reste le même. Le corrigé y figure (qz_sujet_public ne le retire
   pas) ; ce n'est pas un secret de plus : les corrigés du manuel sont déjà dans les fichiers du site
   (comme pour les exercices faits pendant une session).
   Dépend de questionnaires.js (QZ_EXT, QZ_TYPES, qzEd, qzEdQ, qzEdRender, qzP, qzModifie, qzEsc,
   qzId, qzChargerPhotos), questionnaires-interactif.js (qziObj, qziQ), planches.js, planches-num.js,
   planches-variantes.js et planches-choix.js.
   ===================================================================== */

// Consigne (HTML des planches) -> énoncé de questionnaire (texte, formules entre $…$).
function qzpmEnonce(html){
  const d = document.createElement('div');
  d.innerHTML = String(html || '').replace(/<span class="tex">([\s\S]*?)<\/span>/g, (m, t) => '$' + t.replace(/\$/g, '') + '$')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<li[^>]*>/gi, '\n- ');
  return d.textContent.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
// L'exercice à faire : celui du manuel s'il n'a pas changé (il garde ses versions), sinon la copie.
function qzpmExo(q, v){
  const pm = q.pm || {}, L = typeof plDe === 'function' ? plDe(pm.lvl, pm.t) : [];
  const meme = y => y && pm.x && y.consigne === pm.x.consigne && y.eleve === pm.x.eleve && y.corr === pm.x.corr;
  let x = L[pm.i] && L[pm.i].exos[pm.k];
  if(!meme(x)){ x = null; for(const p of L) for(const y of p.exos) if(!x && meme(y)) x = y; }
  if(!x) return pm.x || {};
  return v && pm.varie && typeof plVariante === 'function' ? plVariante(x, v) : x;
}
// Version d'un élève : la même à chaque affichage (comme la fraction d'une figure).
function qzpmGraine(q){ let h = 2166136261; for(const ch of (typeof currentUser !== 'undefined' && currentUser ? currentUser.id : 'x') + '|' + q.id){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return 1 + (h >>> 0) % 997; }
function qzpmVide(e){
  e = e || {};
  return !(Object.values(e.v || {}).some(s => String(s || '').trim()) || Object.values(e.c || {}).some(a => a && a.length) || (e.t || []).length
    || Object.values(e.ch || {}).some(Boolean) || Object.values(e.tr || {}).some(a => a && a.length) || Object.keys(e.x || {}).length);
}
// Rendu figé (lecture, correction, cahier) : l'exercice monté hors de la page, puis recopié.
function qzpmStatique(x, etat, marquer){
  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;left:-9999px;top:0;width:700px;';
  document.body.appendChild(d);
  let h = '';
  try{
    const api = typeof plNum === 'function' ? plNum(d, x, { etat, lecture: true }) : null;
    if(api && marquer && etat) api.poser(etat, api.evaluer());
    h = api ? d.innerHTML : '';
  }catch(e){ h = ''; }
  d.remove();
  return h || (typeof plExoCopieHtml === 'function' ? plExoCopieHtml(Object.assign({}, x, { consigne: '' })) : '');
}
function qzpmRemplir(q, e){
  const x = e.x, M = typeof plNumModele === 'function' ? plNumModele(x) : null;
  q.pm = { lvl: e.lvl, t: e.c.t, i: e.i, k: e.k, ref: plRef(e.lvl, plCode(e.lvl, e.c), e.i) + ' · exercice ' + (e.k + 1),
    titre: (plDe(e.lvl, e.c.t)[e.i] || {}).titre || '', varie: false, variable: typeof plVariable === 'function' && plVariable(x),
    x: JSON.parse(JSON.stringify({ consigne: x.consigne, eleve: x.eleve, corr: x.corr, ecran: x.ecran, etoiles: x.etoiles })) };
  q.enonce = qzpmEnonce(x.consigne);
  q.points = Math.max(1, Math.min(M ? M.cibles.length : 2, 6));
}
// Éditeur : choisir l'exercice (plusieurs d'un coup : une question par exercice, à la suite).
async function qzpmChoisir(id, nouveau){
  const q0 = qzEdQ(id); if(!q0 || typeof plChoisirExos !== 'function') return;
  const pm = q0.pm;
  const l = await plChoisirExos({ ecran: true, titre: 'Exercice du manuel', lvl: pm ? pm.lvl : (typeof currentChapterLevel !== 'undefined' ? currentChapterLevel : null), t: pm ? pm.t : null,
    aide: 'Seuls les exercices qui se font à l\'écran et se corrigent automatiquement peuvent être cochés. Plusieurs exercices cochés : une question par exercice, dans l\'ordre des coches.',
    bouton: n => n > 1 ? `Ajouter ces ${n} exercices (${n} questions)` : 'Choisir cet exercice' });
  const q = qzEdQ(id); if(!q) return;
  if(!l || !l.length){ if(nouveau && !q.pm){ qzEd.questions = qzEd.questions.filter(z => z.id !== id); qzEdRender(); } return; }
  qzpmRemplir(q, l[0]);
  let i = qzEd.questions.indexOf(q);
  l.slice(1).forEach(e => { const n = { id: qzId(), type: 'manuel', enonce: '', points: 2, competence: '' }; qzpmRemplir(n, e); qzEd.questions.splice(++i, 0, n); });
  qzEdOuverte = id;
  qzEdRender();
}
function qzpmVarie(id, on){ const q = qzEdQ(id); if(!q || !q.pm) return; q.pm.varie = !!on; qzEdRender(); }

QZ_EXT.manuel = {
  nouvelle(q){ q.pm = null; q.points = 2; setTimeout(() => qzpmChoisir(q.id, true), 0); },
  corps(q){
    const pm = q.pm;
    if(!pm) return `<p class="hint" style="margin:6px 0;">Choisissez un exercice du manuel : l'élève le fait à l'écran (cases à remplir, parts à colorier…) et il est corrigé automatiquement.</p>
      <button type="button" class="btn secondary" onclick="qzpmChoisir('${q.id}')"><span class="gicon">auto_stories</span> Choisir dans le manuel</button>`;
    const M = typeof plNumModele === 'function' ? plNumModele(qzpmExo(q, 0)) : null, n = M ? M.cibles.length : 0;
    return `<div class="qzpm-ed">
      <div class="qzpm-ref"><span class="gicon">auto_stories</span> <b>Manuel ${qzEsc(pm.ref)}</b>${pm.titre ? ` <span class="hint" style="margin:0;">· ${qzEsc(pm.titre)}</span>` : ''}
        <button type="button" class="btn secondary" style="margin-left:auto;padding:3px 10px;font-size:.82rem;" onclick="qzpmChoisir('${q.id}')">Changer d'exercice</button></div>
      <p class="hint" style="margin:4px 0;">L'énoncé ci-dessus reprend la consigne de l'exercice : vous pouvez le modifier. Corrigé automatiquement : ${n} réponse${n > 1 ? 's' : ''} à donner, les points sont partagés entre elles.</p>
      ${pm.variable ? `<label class="qz-check"><input type="checkbox" ${pm.varie ? 'checked' : ''} onchange="qzpmVarie('${q.id}',this.checked)"> Une version différente pour chaque élève (mêmes questions, autres nombres)</label>` : ''}
      <div class="qzpm-ap">${qzpmStatique(qzpmExo(q, 0), null, false)}</div></div>`;
  },
  verifier(q){
    if(!q.pm) return 'choisissez un exercice du manuel.';
    return typeof plNumModele === 'function' && !plNumModele(qzpmExo(q, 0)) ? 'cet exercice ne se fait pas à l\'écran : choisissez-en un autre.' : null;
  },
  saisie(q, rep, mode){
    if(!q.pm) return '<p class="hint">Exercice non choisi.</p>';
    const r = qziObj(rep), passer = mode === 'passer';
    const v = q.pm.varie ? (r.v != null ? +r.v : passer ? qzpmGraine(q) : 0) : 0, x = qzpmExo(q, v);
    let h = `<div class="qzpm pn-ex${passer ? '' : ' pn-lecture'}" data-qzpm="${q.id}" data-qzpm-v="${v}" data-qzpm-mode="${passer ? 'passer' : 'fige'}">${qzpmStatique(x, r.e, mode === 'corrige')}</div>`;
    if(mode === 'corrige') h += `<div class="qzpm-corr"><div class="qzpm-corr-t"><span class="gicon">check_circle</span> Corrigé${v ? ' (version de l\'élève)' : ''}</div>${typeof plExoCopieHtml === 'function' ? plExoCopieHtml(Object.assign({}, x, { consigne: '' }), true) : ''}</div>`;
    return h;
  },
  repondue(q, rep){ return !qzpmVide(qziObj(rep).e); },
  auto(q, rep, max){
    const r = qziObj(rep); if(!q.pm || qzpmVide(r.e)) return 0;
    const d = document.createElement('div');
    try{
      const api = plNum(d, qzpmExo(q, q.pm.varie ? +r.v || 0 : 0), { etat: r.e, lecture: true }); if(!api) return 0;
      const res = api.evaluer();
      return res.total ? Math.round(max * res.juste / res.total * 4) / 4 : 0;
    }catch(e){ return 0; }
  },
};

// Passation : l'exercice devient actif une fois affiché (comme les figures manipulables). Chaque
// changement est gardé dans la réponse, sans réafficher la question (la case choisie reste).
function qzpmMonter(root){
  (root && root.querySelectorAll ? root : document).querySelectorAll('.qzpm[data-qzpm-mode="passer"]:not([data-monte])').forEach(el => {
    const qid = el.dataset.qzpm, q = typeof qziQ === 'function' ? qziQ(qid) : null; if(!q || !qzP) return;
    el.dataset.monte = '1';
    const v = +el.dataset.qzpmV || 0;
    plNum(el, qzpmExo(q, v), { etat: qziObj(qzP.reponses[qid]).e, onChange: e => {
      if(!qzP) return;
      if(qzpmVide(e)) delete qzP.reponses[qid]; else qzP.reponses[qid] = v ? { e, v } : { e };
      qzModifie();
    } });
  });
}
(function qzpmBrancher(){
  if(typeof qzChargerPhotos !== 'function') return;
  const orig = qzChargerPhotos;
  qzChargerPhotos = function(root){ try{ qzpmMonter(root); }catch(e){ console.warn('qzpm', e); } return orig.apply(this, arguments); };
})();

// Proposé dans l'éditeur, après « Fraction d'une figure » ; jamais demandé à l'IA.
(function(){
  const t = { id: 'manuel', label: 'Exercice du manuel', icon: 'auto_stories', aide: 'Un exercice des planches du manuel, fait à l\'écran (cases, coloriage, nombres à entourer…) et corrigé automatiquement. Plusieurs exercices d\'un coup possible.', sansIA: true };
  const i = QZ_TYPES.findIndex(x => x.id === 'fraction');
  QZ_TYPES.splice(i < 0 ? QZ_TYPES.length : i + 1, 0, t);
})();

(function qzpmStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qzpm{ font-size:.95rem; line-height:1.45; overflow-x:auto; }
    .qzpm-ed{ display:flex; flex-direction:column; gap:4px; }
    .qzpm-ref{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; color:#1F3A5C; } .qzpm-ref .gicon{ color:#E35D3A; }
    .qzpm-ap{ border:1.5px dashed rgba(28,43,57,.18); border-radius:10px; padding:8px 12px; background:#fff; margin-top:4px; overflow-x:auto; }
    .qzpm-corr{ margin-top:10px; border:1.5px solid rgba(31,122,77,.35); background:#F6FBF8; border-radius:10px; padding:8px 12px; }
    .qzpm-corr-t{ font:700 .88rem 'Space Grotesk',sans-serif; color:#1F7A4D; display:flex; align-items:center; gap:4px; margin-bottom:4px; }
  `;
  document.head.appendChild(st);
})();
