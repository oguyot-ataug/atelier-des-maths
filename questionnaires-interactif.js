/* =====================================================================
   questionnaires-interactif.js -- Questionnaires, étape 3 : questions interactives

   Demandé : "des éléments à glisser, voir ce qui existe sur d'autres plateformes, par exemple :
   placer un point sur un repère ou un axe", puis "on peut aussi se servir des outils de
   correction pour insérer des choses bien spécifiques dans les énoncés".

   - Outils de correction dans les énoncés : la barre d'outils de l'outil de correction (figure,
     tableau, axe/repère, opérations posées, fractions, cubes, graphiques, statistiques,
     probabilités...) est proposée sous chaque énoncé ; le bloc produit s'insère sous l'énoncé et
     reste modifiable (addPendingBlock est intercepté pour le contexte « qz:<question> »).
   - Nouveaux types : placer des points sur un axe gradué, dans un repère ; associer (glisser-
     déposer) ; classer dans des catégories ; remettre dans l'ordre ; texte à trous ; construire une
     figure (outil de géométrie du site, corrigée à la main ou par l'IA d'après l'image).
   - Glisser-déposer au doigt ou à la souris, ou en deux touchers (choisir l'étiquette, puis sa
     place) : utilisable sur tablette, téléphone et au clavier-souris.

   Sécurité : les solutions (paires, classement, ordre, texte à trous, position des points, figure
   corrigée) ne sont jamais envoyées à l'élève avant la publication (qz_sujet_public) ; l'élève ne
   reçoit que les champs publics calculés à l'enregistrement (preparer).
   Dépend de questionnaires.js (QZ_EXT, qzP, qzEd...), app.js (addPendingBlock, setToolContext...),
   outils-figures.js (toolButtonsHTML) et cours-perso.js (cpFigOpenEditor, cpFigRender...).
   ===================================================================== */

/* ---------------------------------------------------------------------
   Outils de correction dans les énoncés
   --------------------------------------------------------------------- */
let qzBlocEdit = null; // { qid, bid } : bloc en cours de modification
function qzBlocsHtml(q){
  return (q.blocs || []).length ? `<div class="qz-blocs">${q.blocs.map(b => `<div class="qz-bloc">${b.html}</div>`).join('')}</div>` : '';
}
function qzEdBlocsHtml(q){
  if(typeof toolButtonsHTML !== 'function') return '';
  // L'animation de construction (tableau interactif, IA) ne se rejoue pas dans un questionnaire.
  const outils = toolButtonsHTML('qz:' + q.id).replace(/<button[^>]*needs-ai-geoanim[\s\S]*?<\/button>/, '').replace(/<button[^>]*outil-instruments[\s\S]*?<\/button>/, '');
  return `<div class="qz-lab" style="margin-top:10px;">Insérer dans l'énoncé <span class="hint" style="margin:0;">(outils de correction : figure, tableau, axe, opération posée, fraction, graphique, probabilités…)</span></div>
    <div class="qz-tools">${outils}</div>
    ${(q.blocs || []).map((b, i) => `<div class="qz-ed-bloc">
      <div class="qz-bloc">${b.html}</div>
      <span class="qz-ed-bloc-act">
        ${b.editFn ? `<button type="button" onclick="qzEdBlocModifier('${q.id}','${b.id}')" title="Modifier"><span class="gicon">edit</span></button>` : ''}
        <button type="button" onclick="qzEdBlocDeplacer('${q.id}','${b.id}',-1)" title="Monter" ${i === 0 ? 'disabled' : ''}><span class="gicon">arrow_upward</span></button>
        <button type="button" onclick="qzEdBlocSupprimer('${q.id}','${b.id}')" title="Retirer"><span class="gicon">delete</span></button>
      </span></div>`).join('')}`;
}
(function qzBrancherOutils(){
  if(typeof addPendingBlock !== 'function') return;
  const origAdd = addPendingBlock, origCtx = setToolContext, origCancel = cancelBlockEdit;
  addPendingBlock = function(type, html, data, editFn){
    const ctx = String(currentBlocksContext || '');
    if(!ctx.startsWith('qz:')) return origAdd.apply(this, arguments);
    const qid = ctx.slice(3), q = qzEd && qzEdQ(qid);
    if(!q){ qzBlocEdit = null; return; }
    q.blocs = q.blocs || [];
    const bloc = { id: qzId(), type, html, data, editFn: editFn || null };
    const i = qzBlocEdit && qzBlocEdit.qid === qid ? q.blocs.findIndex(b => b.id === qzBlocEdit.bid) : -1;
    if(i >= 0){ bloc.id = q.blocs[i].id; q.blocs[i] = bloc; } else q.blocs.push(bloc);
    qzBlocEdit = null;
    qzEdOuverte = qid;
    qzEdRender();
  };
  setToolContext = function(){ qzBlocEdit = null; return origCtx.apply(this, arguments); };
  cancelBlockEdit = function(){ qzBlocEdit = null; return origCancel.apply(this, arguments); };
})();
function qzEdBlocModifier(qid, bid){
  const q = qzEdQ(qid), b = q && (q.blocs || []).find(x => x.id === bid);
  if(!b || !b.editFn || typeof window[b.editFn] !== 'function') return;
  currentBlocksContext = 'qz:' + qid;
  if(!blocksStores[currentBlocksContext]) blocksStores[currentBlocksContext] = [];
  qzBlocEdit = { qid, bid };
  window[b.editFn](b.data);
}
function qzEdBlocDeplacer(qid, bid, sens){
  const q = qzEdQ(qid); if(!q) return;
  const i = q.blocs.findIndex(b => b.id === bid), j = i + sens;
  if(i < 0 || j < 0 || j >= q.blocs.length) return;
  [q.blocs[i], q.blocs[j]] = [q.blocs[j], q.blocs[i]];
  qzEdRender();
}
async function qzEdBlocSupprimer(qid, bid){
  if(!(await niceConfirm('Retirer cet élément de l\'énoncé ?'))) return;
  const q = qzEdQ(qid); if(!q) return;
  q.blocs = (q.blocs || []).filter(b => b.id !== bid);
  qzEdRender();
}

/* ---------------------------------------------------------------------
   Outils communs
   --------------------------------------------------------------------- */
const QZI_NS = 'http://www.w3.org/2000/svg';
function qziMelanger(a){ const r = a.slice(); for(let i = r.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
function qziObj(rep){ return rep && typeof rep === 'object' && !Array.isArray(rep) ? rep : {}; }
function qziArrondi(x){ return Math.round(x * 1e6) / 1e6; }
function qziQ(qid){ return (qzP && qzP.questions || []).find(q => q.id === qid); }
function qziSet(qid, chemin, valeur, rerender){
  const q = qzEdQ(qid); if(!q) return;
  const k = chemin.split('.'); let o = q;
  for(let i = 0; i < k.length - 1; i++){ o[k[i]] = o[k[i]] || {}; o = o[k[i]]; }
  o[k[k.length - 1]] = valeur;
  if(rerender) qzEdRender(); else { qzEdMajTotal(); qziMajApercu(qid); }
}
function qziAjouter(qid, liste, obj){ const q = qzEdQ(qid); if(!q) return; q[liste] = q[liste] || []; q[liste].push(Object.assign({ id: qzId() }, obj)); qzEdRender(); }
function qziMajApercu(qid){
  const q = qzEdQ(qid), el = document.getElementById('qziAp_' + qid);
  if(!q || !el || !qzX(q).apercu) return;
  try{ el.innerHTML = qzX(q).apercu(qzX(q).preparer ? qzX(q).preparer(JSON.parse(JSON.stringify(q))) : q); }catch(e){ el.innerHTML = ''; }
}
// Même comparaison que les réponses numériques / courtes : 3/4 = 0,75, majuscules et accents ignorés.
function qziEgal(attendu, donne, casse){
  const a = qzParseNombre(attendu), b = qzParseNombre(donne);
  if(!isNaN(a) && !isNaN(b)) return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a));
  return qzNormTexte(attendu, casse) === qzNormTexte(donne, casse);
}
// Critères du barème (question « figure », comme les questions ouvertes)
function qziCriteresHtml(q){
  const id = q.id;
  return `<label class="qz-lab">Attendus / corrigé <span class="hint" style="margin:0;">(jamais montrés à l'élève avant la publication ; servent aussi à la correction par l'IA)</span></label>
    <textarea rows="2" oninput="qzEdSet('${id}','attendus',this.value)" placeholder="Ce que la figure doit contenir…">${qzEsc(q.attendus)}</textarea>
    <span class="qz-lab">Barème détaillé <span class="hint" style="margin:0;">(facultatif)</span></span>
    ${(q.criteres || []).map(c => `<div class="qz-sub">
      <input type="text" value="${qzEsc(c.texte)}" oninput="qzEdSousSet('${id}','criteres','${c.id}','texte',this.value)" placeholder="Critère (ex. perpendiculaire bien tracée)">
      <input type="number" min="0" step="0.25" value="${c.points}" oninput="qzEdSousSet('${id}','criteres','${c.id}','points',parseFloat(this.value)||0)" style="width:70px;" title="Points"> pt
      <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','criteres','${c.id}')" title="Supprimer"><span class="gicon">close</span></button>
    </div>`).join('')}
    <button type="button" class="btn secondary qz-mini" onclick="qzEdSousAjouter('${id}','criteres')"><span class="gicon">add</span> Critère</button>`;
}

/* Glisser-déposer : [data-drag] vers [data-drop], à la souris ou au doigt ; un simple toucher
   sélectionne l'étiquette, un toucher sur une zone l'y dépose. */
function qziDnd(root, onDrop){
  root.querySelectorAll('[data-drag]').forEach(el => {
    el.addEventListener('pointerdown', ev => {
      if(ev.button > 0) return;
      ev.preventDefault();
      const x0 = ev.clientX, y0 = ev.clientY; let ghost = null;
      const move = e => {
        if(!ghost && Math.hypot(e.clientX - x0, e.clientY - y0) > 6){
          ghost = el.cloneNode(true); ghost.classList.add('qz-ghost'); ghost.classList.remove('qz-sel');
          document.body.appendChild(ghost); el.classList.add('qz-dragging');
        }
        if(ghost){
          ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
          root.querySelectorAll('[data-drop].qz-over').forEach(d => d.classList.remove('qz-over'));
          const t = document.elementFromPoint(e.clientX, e.clientY), d = t && t.closest('[data-drop]');
          if(d && root.contains(d)) d.classList.add('qz-over');
        }
      };
      const up = e => {
        document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
        el.classList.remove('qz-dragging');
        root.querySelectorAll('[data-drop].qz-over').forEach(d => d.classList.remove('qz-over'));
        if(ghost){
          ghost.remove();
          const t = document.elementFromPoint(e.clientX, e.clientY), d = t && t.closest('[data-drop]');
          if(d && root.contains(d) && e.type === 'pointerup') onDrop(el.dataset.drag, d.dataset.drop);
          return;
        }
        const sel = root.querySelector('[data-drag].qz-sel');
        if(sel === el){ el.classList.remove('qz-sel'); return; }
        if(sel) sel.classList.remove('qz-sel');
        el.classList.add('qz-sel');
      };
      document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
    });
  });
  root.querySelectorAll('[data-drop]').forEach(d => d.addEventListener('click', ev => {
    if(ev.target.closest('[data-drag]')) return;
    const sel = root.querySelector('[data-drag].qz-sel');
    if(sel) onDrop(sel.dataset.drag, d.dataset.drop);
  }));
}
function qziChip(item, mode, cls){
  return `<span class="qz-chip${cls ? ' ' + cls : ''}"${mode === 'passer' ? ` data-drag="${qzEsc(item.id)}"` : ''}>${qzMath(item.texte)}</span>`;
}

// Branche les interactions des questions affichées (passation et aperçu).
function qzMonterInter(root){
  if(!root || !qzP) return;
  root.querySelectorAll('[data-qzi]').forEach(box => {
    const q = qziQ(box.dataset.qid); if(!q) return;
    const X = qzX(q);
    if(X.drop) qziDnd(box, (a, b) => X.drop(q, a, b));
    if(X.monter) X.monter(q, box);
  });
}

/* ---------------------------------------------------------------------
   Associer (glisser les étiquettes de droite face à celles de gauche)
   --------------------------------------------------------------------- */
QZ_EXT.associer = {
  nouvelle(q){ q.paires = [0, 1, 2].map(() => ({ id: qzId(), gauche: '', droite: '' })); q.intrus = ''; },
  corps(q){
    const id = q.id;
    return `<span class="qz-lab">Paires à associer <span class="hint" style="margin:0;">(l'élève verra les étiquettes de droite mélangées)</span></span>
      ${(q.paires || []).map(p => `<div class="qz-sub">
        <input type="text" value="${qzEsc(p.gauche)}" oninput="qzEdSousSet('${id}','paires','${p.id}','gauche',this.value)" placeholder="ex. 1/2">
        <span class="gicon" style="color:#6B3FA0;">sync_alt</span>
        <input type="text" value="${qzEsc(p.droite)}" oninput="qzEdSousSet('${id}','paires','${p.id}','droite',this.value)" placeholder="ex. 0,5">
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','paires','${p.id}')" title="Supprimer"><span class="gicon">close</span></button></div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qziAjouter('${id}','paires',{gauche:'',droite:''})"><span class="gicon">add</span> Paire</button>
      <label class="qz-lab" style="margin-top:8px;">Étiquettes intruses <span class="hint" style="margin:0;">(facultatif, séparées par « ; » : à ne placer nulle part)</span></label>
      <input type="text" value="${qzEsc(q.intrus)}" oninput="qzEdSet('${id}','intrus',this.value)" placeholder="ex. 0,2 ; 2">`;
  },
  verifier(q){ return (q.paires || []).filter(p => String(p.gauche).trim() && String(p.droite).trim()).length < 2 ? 'il faut au moins deux paires complètes.' : null; },
  // Les étiquettes gardent leur identifiant tant que leur texte ne change pas, même si le professeur
  // corrige une paire en échangeant deux textes : les réponses déjà données (qui désignent des
  // étiquettes) restent lisibles et la copie se recorrige -- signalé : « Je n'arrive pas à faire que
  // ça recorrige correctement » (paires « Reste / 7 » et « Diviseur / 5 » inversées puis corrigées).
  preparer(q){
    const ps = (q.paires || []).filter(p => String(p.gauche).trim() && String(p.droite).trim());
    const ids = (anciens, voulus) => { // voulus : [{ texte, prefere }] -> ids, en réutilisant les anciens par texte
      const pris = new Set(), meme = (x, v) => !pris.has(x.id) && qziAsTxt(x.texte) === qziAsTxt(v.texte);
      const out = voulus.map(v => { const a = anciens.find(x => x.id === v.prefere && meme(x, v)) || anciens.find(x => meme(x, v)); if(a){ pris.add(a.id); return a.id; } return null; });
      return out.map((id, i) => id || (pris.has(voulus[i].prefere) ? voulus[i].prefere + qzId() : (pris.add(voulus[i].prefere), voulus[i].prefere)));
    };
    const gIds = ids(q.gauche || [], ps.map(p => ({ texte: p.gauche, prefere: 'g' + p.id })));
    const dVoulus = ps.map(p => ({ texte: p.droite, prefere: 'd' + p.id })).concat(qzListe(q.intrus).map((t, i) => ({ texte: t, prefere: 'x' + i })));
    const dIds = ids(q.droite || [], dVoulus);
    q.gauche = ps.map((p, i) => ({ id: gIds[i], texte: p.gauche }));
    q.droite = qziMelanger(dVoulus.map((v, i) => ({ id: dIds[i], texte: v.texte })));
    return q;
  },
  saisie(q, rep, mode){
    const r = qziObj(rep), pris = new Set(Object.values(r)), corr = mode === 'corrige';
    const droite = new Map((q.droite || []).map(d => [d.id, d])), att = qziAsAttendus(q);
    const juste = g => qziAsJuste(q, r, g.id, att);
    return `<div class="qz-as"${mode === 'passer' ? ` data-qzi="associer" data-qid="${q.id}"` : ''}>
      ${(q.gauche || []).map(g => { const d = droite.get(r[g.id]);
        const attendu = corr && !juste(g) && att.get(g.id);
        return `<div class="qz-as-row"><div class="qz-as-g">${qzMath(g.texte)}</div><span class="gicon qz-as-fl">east</span>
          <div class="qz-as-slot${corr ? (juste(g) ? ' juste' : ' faux') : ''}" data-drop="${g.id}">${d ? qziChip(d, mode) : `<span class="qz-vide">${mode === 'passer' ? 'Déposer ici' : '—'}</span>`}</div>
          ${attendu ? `<span class="qz-attendu">${qzMath(attendu)}</span>` : ''}</div>`; }).join('')}
      ${mode === 'passer' ? `<div class="qz-pool" data-drop="__pool">${(q.droite || []).filter(d => !pris.has(d.id)).map(d => qziChip(d, mode)).join('') || '<span class="qz-vide">Toutes les étiquettes sont placées.</span>'}</div>
        <p class="hint" style="margin:4px 0 0;">Faites glisser chaque étiquette à sa place (ou touchez l'étiquette, puis sa place).</p>` : ''}
    </div>`;
  },
  drop(q, did, cle){
    const r = Object.assign({}, qziObj(qzP.reponses[q.id]));
    Object.keys(r).forEach(k => { if(r[k] === did) delete r[k]; });
    if(cle !== '__pool') r[cle] = did;
    qzSaisieValeur(q.id, Object.keys(r).length ? r : undefined);
  },
  repondue(q, rep){ const r = qziObj(rep); return (q.gauche || []).every(g => r[g.id]); },
  auto(q, rep, max){
    const r = qziObj(rep), ps = (q.paires || []).filter(p => String(p.gauche).trim() && String(p.droite).trim());
    if(!ps.length) return 0;
    const att = qziAsAttendus(q);
    return Math.round(max * [...att.keys()].filter(gid => qziAsJuste(q, r, gid, att)).length / ps.length * 100) / 100;
  },
};
// Corrigé d'une question « associer » : étiquette de gauche (id) -> texte attendu à droite, lu dans
// les paires. Comparaison par texte : la bonne étiquette est celle qui porte le bon texte.
function qziAsTxt(t){ return String(t == null ? '' : t).trim(); }
function qziAsAttendus(q){
  const ps = (q.paires || []).filter(p => qziAsTxt(p.gauche) && qziAsTxt(p.droite)), g = q.gauche || [];
  const m = new Map(), prises = new Set();
  const choisir = p => { const a = g.find(x => !prises.has(x.id) && x.id === 'g' + p.id && qziAsTxt(x.texte) === qziAsTxt(p.gauche))
    || g.find(x => !prises.has(x.id) && qziAsTxt(x.texte) === qziAsTxt(p.gauche)); if(a){ prises.add(a.id); m.set(a.id, qziAsTxt(p.droite)); return true; } return false; };
  ps.filter(p => !choisir(p)).forEach(p => { const id = prises.has('g' + p.id) ? null : 'g' + p.id; if(id){ prises.add(id); m.set(id, qziAsTxt(p.droite)); } });
  return m;
}
function qziAsJuste(q, r, gid, att){
  const d = r[gid] && (q.droite || []).find(x => x.id === r[gid]);
  return !!d && att.has(gid) && qziAsTxt(d.texte) === att.get(gid);
}

/* ---------------------------------------------------------------------
   Classer (glisser chaque étiquette dans sa catégorie)
   --------------------------------------------------------------------- */
QZ_EXT.classer = {
  nouvelle(q){
    q.categories = [{ id: qzId(), nom: '' }, { id: qzId(), nom: '' }];
    q.elements = [0, 1, 2, 3].map(i => ({ id: qzId(), texte: '', cat: q.categories[i % 2].id }));
  },
  corps(q){
    const id = q.id, cats = q.categories || [];
    return `<span class="qz-lab">Catégories</span>
      ${cats.map((c, i) => `<div class="qz-sub"><span class="qz-lettre">${i + 1}</span>
        <input type="text" value="${qzEsc(c.nom)}" oninput="qzEdSousSet('${id}','categories','${c.id}','nom',this.value)" placeholder="ex. Nombres pairs">
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','categories','${c.id}')" title="Supprimer"><span class="gicon">close</span></button></div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qziAjouter('${id}','categories',{nom:''})"><span class="gicon">add</span> Catégorie</button>
      <span class="qz-lab" style="margin-top:8px;">Étiquettes et leur catégorie <span class="hint" style="margin:0;">(mélangées pour l'élève)</span></span>
      ${(q.elements || []).map(el => `<div class="qz-sub">
        <input type="text" value="${qzEsc(el.texte)}" oninput="qzEdSousSet('${id}','elements','${el.id}','texte',this.value)" placeholder="ex. 14">
        <select onchange="qzEdSousSet('${id}','elements','${el.id}','cat',this.value)">${cats.map((c, i) => `<option value="${c.id}"${el.cat === c.id ? ' selected' : ''}>${qzEsc(c.nom || 'Catégorie ' + (i + 1))}</option>`).join('')}</select>
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','elements','${el.id}')" title="Supprimer"><span class="gicon">close</span></button></div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qziAjouter('${id}','elements',{texte:'',cat:'${cats[0] ? cats[0].id : ''}'})"><span class="gicon">add</span> Étiquette</button>`;
  },
  verifier(q){
    if((q.categories || []).filter(c => String(c.nom).trim()).length < 2) return 'il faut au moins deux catégories nommées.';
    const els = (q.elements || []).filter(e => String(e.texte).trim());
    if(els.length < 2) return 'il faut au moins deux étiquettes.';
    if(els.some(e => !(q.categories || []).some(c => c.id === e.cat))) return 'chaque étiquette doit avoir une catégorie.';
    return null;
  },
  preparer(q){ q.pool = qziMelanger((q.elements || []).filter(e => String(e.texte).trim()).map(e => ({ id: e.id, texte: e.texte }))); return q; },
  saisie(q, rep, mode){
    const r = qziObj(rep), corr = mode === 'corrige', vrai = new Map((q.elements || []).map(e => [e.id, e.cat]));
    const pool = q.pool || [];
    return `<div class="qz-cl"${mode === 'passer' ? ` data-qzi="classer" data-qid="${q.id}"` : ''}>
      <div class="qz-cl-cats">${(q.categories || []).filter(c => String(c.nom).trim()).map(c => `<div class="qz-cl-cat" data-drop="${c.id}"><div class="qz-cl-nom">${qzMath(c.nom)}</div>
        <div class="qz-cl-in">${pool.filter(e => r[e.id] === c.id).map(e => qziChip(e, mode, corr ? (vrai.get(e.id) === c.id ? 'juste' : 'faux') : '')).join('') || `<span class="qz-vide">${mode === 'passer' ? 'Déposer ici' : '—'}</span>`}</div></div>`).join('')}</div>
      ${mode === 'passer' ? `<div class="qz-pool" data-drop="__pool">${pool.filter(e => !r[e.id]).map(e => qziChip(e, mode)).join('') || '<span class="qz-vide">Toutes les étiquettes sont classées.</span>'}</div>
        <p class="hint" style="margin:4px 0 0;">Faites glisser chaque étiquette dans sa catégorie (ou touchez l'étiquette, puis la catégorie).</p>`
        : pool.some(e => !r[e.id]) ? `<p class="hint" style="margin:6px 0 0;">Non classées : ${pool.filter(e => !r[e.id]).map(e => qziChip(e, mode, corr ? 'faux' : '')).join(' ')}</p>` : ''}
      ${corr && pool.some(e => r[e.id] !== vrai.get(e.id)) ? `<p class="qz-sol"><span class="gicon">check_circle</span> Classement attendu : ${(q.categories || []).map(c => `<b>${qzMath(c.nom)}</b> : ${(q.elements || []).filter(e => e.cat === c.id).map(e => qzMath(e.texte)).join(', ')}`).join(' · ')}</p>` : ''}
    </div>`;
  },
  drop(q, eid, cle){
    const r = Object.assign({}, qziObj(qzP.reponses[q.id]));
    if(cle === '__pool') delete r[eid]; else r[eid] = cle;
    qzSaisieValeur(q.id, Object.keys(r).length ? r : undefined);
  },
  repondue(q, rep){ const r = qziObj(rep); return (q.pool || []).every(e => r[e.id]); },
  auto(q, rep, max){
    const r = qziObj(rep), els = (q.elements || []).filter(e => String(e.texte).trim());
    return els.length ? Math.round(max * els.filter(e => r[e.id] === e.cat).length / els.length * 100) / 100 : 0;
  },
};

/* ---------------------------------------------------------------------
   Remettre dans l'ordre
   --------------------------------------------------------------------- */
QZ_EXT.ordonner = {
  nouvelle(q){ q.elements = [0, 1, 2, 3].map(() => ({ id: qzId(), texte: '' })); q.notation = 'partiel'; q.enonce = 'Range ces nombres dans l\'ordre croissant.'; },
  corps(q){
    const id = q.id, els = q.elements || [];
    return `<span class="qz-lab">Étiquettes, dans le BON ordre <span class="hint" style="margin:0;">(l'élève les recevra mélangées)</span></span>
      ${els.map((e, i) => `<div class="qz-sub"><span class="qz-lettre">${i + 1}</span>
        <input type="text" value="${qzEsc(e.texte)}" oninput="qzEdSousSet('${id}','elements','${e.id}','texte',this.value)" placeholder="Étiquette ${i + 1}">
        <button type="button" class="qz-x" onclick="qziOrdEd('${id}','${e.id}',-1)" title="Monter" ${i === 0 ? 'disabled' : ''}><span class="gicon">arrow_upward</span></button>
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','elements','${e.id}')" title="Supprimer"><span class="gicon">close</span></button></div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qziAjouter('${id}','elements',{texte:''})"><span class="gicon">add</span> Étiquette</button>
      <label class="qz-lab" style="margin-top:8px;">Notation <select onchange="qzEdSet('${id}','notation',this.value)">
        <option value="partiel"${q.notation !== 'tout_ou_rien' ? ' selected' : ''}>points partiels (étiquettes à la bonne place)</option>
        <option value="tout_ou_rien"${q.notation === 'tout_ou_rien' ? ' selected' : ''}>tout ou rien</option></select></label>`;
  },
  verifier(q){ return (q.elements || []).filter(e => String(e.texte).trim()).length < 2 ? 'il faut au moins deux étiquettes.' : null; },
  preparer(q){
    const els = (q.elements || []).filter(e => String(e.texte).trim()).map(e => ({ id: e.id, texte: e.texte }));
    let p = qziMelanger(els);
    for(let k = 0; k < 8 && els.length > 1 && p.every((e, i) => e.id === els[i].id); k++) p = qziMelanger(els);
    q.pool = p;
    return q;
  },
  ordre(q, rep){ const ids = (q.pool || []).map(e => e.id); return Array.isArray(rep) && rep.length === ids.length && rep.every(x => ids.includes(x)) ? rep : ids; },
  saisie(q, rep, mode){
    const ordre = this.ordre(q, rep), byId = new Map((q.pool || []).map(e => [e.id, e])), corr = mode === 'corrige';
    const bon = (q.elements || []).filter(e => String(e.texte).trim()).map(e => e.id);
    const touche = Array.isArray(rep);
    return `<div class="qz-ord"${mode === 'passer' ? ` data-qzi="ordonner" data-qid="${q.id}"` : ''}>
      ${ordre.map((id, i) => { const e = byId.get(id); if(!e) return '';
        return `<div class="qz-ord-row${corr ? (touche && bon[i] === id ? ' juste' : ' faux') : ''}" data-drop="${e.id}"><span class="qz-ord-n">${i + 1}</span>${qziChip(e, mode)}
          ${mode === 'passer' ? `<span class="qz-ord-btns"><button type="button" onclick="qziOrd('${q.id}','${e.id}',-1)" ${i === 0 ? 'disabled' : ''} title="Monter"><span class="gicon">arrow_upward</span></button><button type="button" onclick="qziOrd('${q.id}','${e.id}',1)" ${i === ordre.length - 1 ? 'disabled' : ''} title="Descendre"><span class="gicon">arrow_downward</span></button></span>` : ''}</div>`; }).join('')}
      ${mode === 'passer' ? (touche ? '<p class="hint" style="margin:4px 0 0;">Faites glisser une étiquette sur une autre pour la placer avant elle, ou utilisez les flèches.</p>'
        : `<div class="tool-row" style="margin-top:6px;"><button type="button" class="btn secondary qz-mini" onclick="qzSaisieValeur('${q.id}', ${JSON.stringify(ordre).replace(/"/g, '&quot;')})"><span class="gicon">check</span> Garder cet ordre</button><span class="hint" style="margin:0;">Déplacez les étiquettes (glisser ou flèches), ou gardez cet ordre.</span></div>`)
        : corr && touche && !ordre.every((id, i) => bon[i] === id) ? `<p class="qz-sol"><span class="gicon">check_circle</span> Ordre attendu : ${bon.map(id => qzMath((q.elements.find(e => e.id === id) || {}).texte)).join(' ; ')}</p>` : ''}
      ${corr && !touche ? '<p class="hint" style="margin:4px 0 0;">Pas de réponse.</p>' : ''}
    </div>`;
  },
  drop(q, a, b){
    if(a === b || b === '__pool') return;
    const o = this.ordre(q, qzP.reponses[q.id]).filter(x => x !== a);
    o.splice(o.indexOf(b), 0, a);
    qzSaisieValeur(q.id, o);
  },
  repondue(q, rep){ return Array.isArray(rep) && rep.length === (q.pool || []).length; },
  auto(q, rep, max){
    const bon = (q.elements || []).filter(e => String(e.texte).trim()).map(e => e.id);
    if(!Array.isArray(rep) || !bon.length) return 0;
    const justes = bon.filter((id, i) => rep[i] === id).length;
    if(q.notation === 'tout_ou_rien') return justes === bon.length ? max : 0;
    return Math.round(max * justes / bon.length * 100) / 100;
  },
};
function qziOrd(qid, eid, sens){
  const q = qziQ(qid); if(!q) return;
  const o = QZ_EXT.ordonner.ordre(q, qzP.reponses[qid]).slice(), i = o.indexOf(eid), j = i + sens;
  if(i < 0 || j < 0 || j >= o.length) return;
  [o[i], o[j]] = [o[j], o[i]];
  qzSaisieValeur(qid, o);
}
function qziOrdEd(qid, eid, sens){
  const q = qzEdQ(qid); if(!q) return;
  const i = q.elements.findIndex(e => e.id === eid), j = i + sens;
  if(i < 0 || j < 0 || j >= q.elements.length) return;
  [q.elements[i], q.elements[j]] = [q.elements[j], q.elements[i]];
  qzEdRender();
}

/* ---------------------------------------------------------------------
   Texte à trous : [[réponse]] ou [[réponse|variante]]
   --------------------------------------------------------------------- */
function qziTrous(src){
  const segs = [], rep = []; let i = 0, m; const re = /\[\[([^\]]+?)\]\]/g;
  while((m = re.exec(src || ''))){ segs.push(src.slice(i, m.index)); segs.push({ t: rep.length }); rep.push(m[1].split('|').map(x => x.trim()).filter(Boolean)); i = m.index + m[0].length; }
  segs.push((src || '').slice(i));
  return { segs, rep };
}
QZ_EXT.trous = {
  nouvelle(q){ q.trous_source = 'Un triangle qui a trois côtés de même longueur est un triangle [[équilatéral]].'; q.casse = false; q.enonce = 'Complète.'; },
  corps(q){
    const id = q.id;
    return `<label class="qz-lab">Texte à compléter <span class="hint" style="margin:0;">(mettez chaque réponse entre [[ ]] ; variantes acceptées séparées par | , ex. [[3/4|0,75]])</span></label>
      <textarea rows="4" oninput="qzEdSet('${id}','trous_source',this.value);qziMajApercu('${id}')">${qzEsc(q.trous_source)}</textarea>
      <div class="qz-apercu" id="qziAp_${id}">${this.apercu(q)}</div>
      <label class="qz-check" style="margin-top:6px;"><input type="checkbox" ${q.casse ? 'checked' : ''} onchange="qzEdSet('${id}','casse',this.checked)"> Respecter majuscules et accents</label>`;
  },
  apercu(q){ const t = qziTrous(q.trous_source); return t.segs.map(s => typeof s === 'string' ? qzMath(s) : `<span class="qz-trou-ap">${qzEsc(t.rep[s.t].join(' / '))}</span>`).join(''); },
  verifier(q){ return qziTrous(q.trous_source).rep.length ? null : 'mettez au moins une réponse entre [[ ]].'; },
  preparer(q){ q.segments = qziTrous(q.trous_source).segs; return q; },
  saisie(q, rep, mode){
    const r = qziObj(rep), corr = mode === 'corrige', sol = corr && q.trous_source ? qziTrous(q.trous_source).rep : null;
    return `<div class="qz-trous">${(q.segments || []).map(s => {
      if(typeof s === 'string') return qzMath(s);
      const v = r[s.t] == null ? '' : String(r[s.t]);
      const ok = sol && sol[s.t] && sol[s.t].some(a => qziEgal(a, v, q.casse));
      const larg = Math.max(5, Math.min(24, (sol && sol[s.t] ? sol[s.t][0].length : 6) + 3));
      return `<input type="text" class="qz-trou${corr ? (ok ? ' juste' : ' faux') : ''}" value="${qzEsc(v)}" size="${larg}" ${mode === 'passer' ? '' : 'disabled'} autocomplete="off" spellcheck="false"
        oninput="qziTrou('${q.id}',${s.t},this.value)">${corr && !ok && sol && sol[s.t] ? `<span class="qz-attendu">${qzEsc(sol[s.t][0])}</span>` : ''}`;
    }).join('')}</div>`;
  },
  repondue(q, rep){ const r = qziObj(rep); return (q.segments || []).filter(s => typeof s !== 'string').every(s => String(r[s.t] || '').trim()); },
  auto(q, rep, max){
    const sol = qziTrous(q.trous_source).rep, r = qziObj(rep);
    return sol.length ? Math.round(max * sol.filter((acc, i) => acc.some(a => qziEgal(a, r[i] == null ? '' : String(r[i]), q.casse))).length / sol.length * 100) / 100 : 0;
  },
};
function qziTrou(qid, i, v){
  if(!qzP) return;
  const r = Object.assign({}, qziObj(qzP.reponses[qid])); r[i] = v; qzP.reponses[qid] = r;
  qzModifie();
}

/* ---------------------------------------------------------------------
   Axe gradué : placer des points
   --------------------------------------------------------------------- */
const QZI_AXE = { W: 640, H: 132, x0: 34, x1: 606, y: 78 };
function qziAxeConf(q){
  const a = q.axe || {};
  const min = qzParseNombre(a.min), max = qzParseNombre(a.max), pas = qzParseNombre(a.pas), sous = Math.max(1, Math.min(20, parseInt(a.sous, 10) || 1));
  return { min: isNaN(min) ? 0 : min, max: isNaN(max) ? 1 : max, pas: pas > 0 ? pas : 1, sous, etiq: a.etiq || 'principales' };
}
function qziAxeX(c, v){ return QZI_AXE.x0 + (v - c.min) / (c.max - c.min) * (QZI_AXE.x1 - QZI_AXE.x0); }
function qziAxeSvg(q, marques, attendus){
  const c = qziAxeConf(q), A = QZI_AXE;
  if(!(c.max > c.min)) return '<p class="hint">Axe mal défini.</p>';
  const pasMin = c.pas / c.sous, n = Math.round((c.max - c.min) / pasMin);
  let g = `<line x1="${A.x0 - 12}" y1="${A.y}" x2="${A.x1 + 18}" y2="${A.y}" stroke="#1C1B2E" stroke-width="2"/><path d="M${A.x1 + 18},${A.y} l-9,-5 v10 z" fill="#1C1B2E"/>`;
  for(let k = 0; k <= n && k <= 400; k++){
    const v = c.min + k * pasMin, x = qziAxeX(c, v), princ = k % c.sous === 0;
    g += `<line x1="${x}" y1="${A.y - (princ ? 9 : 5)}" x2="${x}" y2="${A.y + (princ ? 9 : 5)}" stroke="#1C1B2E" stroke-width="${princ ? 1.6 : 1}"/>`;
    const ki = k / c.sous;
    if(princ && (c.etiq === 'principales' || (c.etiq === 'deux' && ki < 2))) g += `<text x="${x}" y="${A.y + 27}" text-anchor="middle" font-size="14" font-family="Inter,sans-serif" fill="#1C1B2E">${qzNum(qziArrondi(v))}</text>`;
  }
  (attendus || []).forEach(m => { const x = qziAxeX(c, m.v);
    g += `<line x1="${x}" y1="${A.y - 30}" x2="${x}" y2="${A.y}" stroke="#1E7B34" stroke-width="2" stroke-dasharray="4 3"/><text x="${x}" y="${A.y + 44}" text-anchor="middle" font-size="13" font-weight="700" fill="#1E7B34">${qzEsc(m.label)}</text>`; });
  (marques || []).forEach(m => { const x = qziAxeX(c, m.v), col = m.col || '#6B3FA0';
    g += `<g class="qz-marque" data-cible="${qzEsc(m.id)}"><line x1="${x}" y1="${A.y - 30}" x2="${x}" y2="${A.y}" stroke="${col}" stroke-width="3"/><circle cx="${x}" cy="${A.y}" r="4.5" fill="${col}"/>
      <rect x="${x - 13}" y="${A.y - 52}" width="26" height="22" rx="6" fill="${col}"/><text x="${x}" y="${A.y - 36}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${qzEsc(m.label)}</text></g>`; });
  return `<svg class="qz-axe-svg" viewBox="0 0 ${A.W} ${A.H}" xmlns="${QZI_NS}">${g}</svg>`;
}
function qziCiblesChips(q, rep, mode){
  if(mode !== 'passer') return '';
  const r = qziObj(rep), cs = q.cibles || [];
  // Le point suivant à placer est présélectionné (le premier s'ils sont tous placés).
  const suivant = Math.max(0, cs.findIndex(c => r[c.id] === undefined));
  return `<div class="qz-cibles">${cs.map((c, i) => `<button type="button" class="qz-cible${i === suivant ? ' on' : ''}${r[c.id] !== undefined ? ' place' : ''}" data-cible="${qzEsc(c.id)}">${qzEsc(c.label)}${r[c.id] !== undefined ? ' <span class="gicon">check</span>' : ''}</button>`).join('')}
    <span class="hint" style="margin:0;">Choisissez un point, puis touchez sa place${q.type === 'axe' ? ' sur l\'axe' : ' dans le repère'} ; vous pouvez ensuite le déplacer.</span></div>`;
}
// Placement par toucher / glisser, commun à l'axe et au repère.
function qziMonterPlacement(q, box, versValeur){
  const svg = box.querySelector('svg'); if(!svg) return;
  let courant = (box.querySelector('.qz-cible.on') || box.querySelector('.qz-cible:not(.place)') || box.querySelector('.qz-cible') || {}).dataset;
  courant = courant ? courant.cible : null;
  box.querySelectorAll('.qz-cible').forEach(b => b.addEventListener('click', () => {
    box.querySelectorAll('.qz-cible').forEach(x => x.classList.remove('on')); b.classList.add('on'); courant = b.dataset.cible;
  }));
  const pt = ev => { const m = svg.getScreenCTM(); if(!m) return null; const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(m.inverse()); };
  let drag = null;
  const poser = (id, ev) => {
    const p = pt(ev); if(!p || !id) return;
    const v = versValeur(p); if(v === null) return;
    const r = Object.assign({}, qziObj(qzP.reponses[q.id])); r[id] = v;
    qzP.reponses[q.id] = r;
    return r;
  };
  svg.addEventListener('pointerdown', ev => {
    const m = ev.target.closest('.qz-marque');
    if(m){ drag = m.dataset.cible; ev.preventDefault(); try{ svg.setPointerCapture(ev.pointerId); }catch(e){} return; }
    if(courant){ ev.preventDefault(); poser(courant, ev); qzSaisieValeur(q.id, qzP.reponses[q.id]); }
  });
  svg.addEventListener('pointermove', ev => {
    if(!drag) return;
    poser(drag, ev);
    const box2 = svg.parentElement; // redessin léger pendant le glisser
    const html = q.type === 'axe' ? qziAxeSvg(q, qziMarques(q, qzP.reponses[q.id])) : qziRepSvg(q, qziMarques(q, qzP.reponses[q.id]));
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    svg.innerHTML = tmp.firstElementChild.innerHTML;
    void box2;
  });
  const fin = () => { if(!drag) return; drag = null; qzSaisieValeur(q.id, qzP.reponses[q.id]); };
  svg.addEventListener('pointerup', fin); svg.addEventListener('pointercancel', fin);
}
function qziMarques(q, rep, cls){
  const r = qziObj(rep);
  return (q.cibles || []).filter(c => r[c.id] !== undefined).map(c => ({ id: c.id, label: c.label, v: r[c.id], col: cls ? cls(c, r[c.id]) : null }));
}
QZ_EXT.axe = {
  nouvelle(q){ q.axe = { min: '0', max: '2', pas: '1', sous: 4, etiq: 'principales' }; q.cibles = [{ id: qzId(), label: 'A', valeur: '3/4' }]; q.enonce = 'Place le point A d\'abscisse 3/4.'; },
  corps(q){
    const id = q.id, a = q.axe || {};
    return `<span class="qz-lab">Axe gradué</span>
      <div class="qz-reg-grid">
        <label>de <input type="text" value="${qzEsc(a.min)}" style="width:60px;" oninput="qziSet('${id}','axe.min',this.value)"></label>
        <label>à <input type="text" value="${qzEsc(a.max)}" style="width:60px;" oninput="qziSet('${id}','axe.max',this.value)"></label>
        <label>graduations principales tous les <input type="text" value="${qzEsc(a.pas)}" style="width:60px;" oninput="qziSet('${id}','axe.pas',this.value)"></label>
        <label>partagées en <input type="number" min="1" max="20" value="${a.sous || 1}" style="width:56px;" oninput="qziSet('${id}','axe.sous',parseInt(this.value,10)||1)"></label>
        <label>nombres écrits <select onchange="qziSet('${id}','axe.etiq',this.value)">
          <option value="principales"${(a.etiq || 'principales') === 'principales' ? ' selected' : ''}>sous chaque graduation principale</option>
          <option value="deux"${a.etiq === 'deux' ? ' selected' : ''}>sous les deux premières seulement</option>
          <option value="aucune"${a.etiq === 'aucune' ? ' selected' : ''}>aucun</option></select></label>
      </div>
      <span class="qz-lab">Points à placer <span class="hint" style="margin:0;">(abscisse : 3/4, 1,5, -2…)</span></span>
      ${(q.cibles || []).map(c => `<div class="qz-sub">
        <input type="text" value="${qzEsc(c.label)}" style="width:60px;flex:none;" oninput="qzEdSousSet('${id}','cibles','${c.id}','label',this.value);qziMajApercu('${id}')" placeholder="A">
        <input type="text" value="${qzEsc(c.valeur)}" oninput="qzEdSousSet('${id}','cibles','${c.id}','valeur',this.value);qziMajApercu('${id}')" placeholder="abscisse">
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','cibles','${c.id}')" title="Supprimer"><span class="gicon">close</span></button></div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qziAjouter('${id}','cibles',{label:String.fromCharCode(65+(qzEdQ('${id}').cibles||[]).length),valeur:''})"><span class="gicon">add</span> Point</button>
      <div class="qz-apercu qz-ap-fig" id="qziAp_${id}">${this.apercu(q)}</div>`;
  },
  apercu(q){ return qziAxeSvg(q, [], (q.cibles || []).map(c => ({ label: c.label, v: qzParseNombre(c.valeur) })).filter(m => !isNaN(m.v))); },
  verifier(q){
    const c = qziAxeConf(q);
    if(!(c.max > c.min)) return 'le début de l\'axe doit être plus petit que la fin.';
    if((c.max - c.min) / (c.pas / c.sous) > 400) return 'trop de graduations : augmentez l\'écart entre graduations.';
    if(!(q.cibles || []).length) return 'ajoutez au moins un point à placer.';
    for(const t of q.cibles){
      const v = qzParseNombre(t.valeur);
      if(!String(t.label).trim()) return 'chaque point doit avoir un nom.';
      if(isNaN(v) || v < c.min - 1e-9 || v > c.max + 1e-9) return `l'abscisse du point ${t.label} doit être un nombre de l'axe.`;
      const k = (v - c.min) / (c.pas / c.sous);
      if(Math.abs(k - Math.round(k)) > 1e-6) return `le point ${t.label} ne tombe pas sur une graduation : changez le partage des graduations.`;
    }
    return null;
  },
  saisie(q, rep, mode){
    const corr = mode === 'corrige', r = qziObj(rep);
    const ok = (c, v) => Math.abs(v - qzParseNombre(c.valeur)) < 1e-6;
    const marques = qziMarques(q, rep, corr && (q.cibles || []).every(c => c.valeur !== undefined) ? (c, v) => ok(c, v) ? '#1E7B34' : '#C0392B' : null);
    const att = corr ? (q.cibles || []).filter(c => c.valeur !== undefined && !(r[c.id] !== undefined && ok(c, r[c.id]))).map(c => ({ label: c.label, v: qzParseNombre(c.valeur) })).filter(m => !isNaN(m.v)) : [];
    return `<div class="qz-place"${mode === 'passer' ? ` data-qzi="axe" data-qid="${q.id}"` : ''}>${qziCiblesChips(q, rep, mode)}${qziAxeSvg(q, marques, att)}
      ${corr && att.length ? '<p class="hint" style="margin:2px 0 0;">En pointillés verts : les places attendues.</p>' : ''}</div>`;
  },
  monter(q, box){
    const c = qziAxeConf(q), pas = c.pas / c.sous;
    qziMonterPlacement(q, box, p => {
      const brut = c.min + (p.x - QZI_AXE.x0) / (QZI_AXE.x1 - QZI_AXE.x0) * (c.max - c.min);
      return qziArrondi(Math.max(c.min, Math.min(c.max, c.min + Math.round((brut - c.min) / pas) * pas)));
    });
  },
  repondue(q, rep){ const r = qziObj(rep); return (q.cibles || []).every(c => r[c.id] !== undefined); },
  auto(q, rep, max){
    const r = qziObj(rep), cs = q.cibles || [];
    return cs.length ? Math.round(max * cs.filter(c => r[c.id] !== undefined && Math.abs(r[c.id] - qzParseNombre(c.valeur)) < 1e-6).length / cs.length * 100) / 100 : 0;
  },
};

/* ---------------------------------------------------------------------
   Repère : placer des points
   --------------------------------------------------------------------- */
function qziRepConf(q){
  const r = q.repere || {}, n = k => { const v = qzParseNombre(r[k]); return isNaN(v) ? null : v; };
  const c = { xmin: n('xmin') ?? -5, xmax: n('xmax') ?? 5, ymin: n('ymin') ?? -5, ymax: n('ymax') ?? 5, pas: n('pas') > 0 ? n('pas') : 1, sous: Math.max(1, Math.min(4, parseInt(r.sous, 10) || 1)) };
  const nx = (c.xmax - c.xmin) / c.pas, ny = (c.ymax - c.ymin) / c.pas;
  c.u = Math.max(14, Math.min(46, 560 / Math.max(nx, ny, 1)));
  c.W = nx * c.u + 60; c.H = ny * c.u + 60;
  c.X = v => 30 + (v - c.xmin) / c.pas * c.u; c.Y = v => 30 + (c.ymax - v) / c.pas * c.u;
  return c;
}
function qziRepSvg(q, marques, attendus){
  const c = qziRepConf(q);
  if(!(c.xmax > c.xmin && c.ymax > c.ymin)) return '<p class="hint">Repère mal défini.</p>';
  let g = '';
  for(let x = c.xmin; x <= c.xmax + 1e-9; x += c.pas) g += `<line x1="${c.X(x)}" y1="${c.Y(c.ymax)}" x2="${c.X(x)}" y2="${c.Y(c.ymin)}" stroke="#DCD6CB" stroke-width="1"/>`;
  for(let y = c.ymin; y <= c.ymax + 1e-9; y += c.pas) g += `<line x1="${c.X(c.xmin)}" y1="${c.Y(y)}" x2="${c.X(c.xmax)}" y2="${c.Y(y)}" stroke="#DCD6CB" stroke-width="1"/>`;
  const ox = c.xmin <= 0 && c.xmax >= 0 ? 0 : c.xmin, oy = c.ymin <= 0 && c.ymax >= 0 ? 0 : c.ymin;
  g += `<line x1="${c.X(c.xmin)}" y1="${c.Y(oy)}" x2="${c.X(c.xmax) + 12}" y2="${c.Y(oy)}" stroke="#1C1B2E" stroke-width="1.8"/><path d="M${c.X(c.xmax) + 14},${c.Y(oy)} l-8,-4 v8 z" fill="#1C1B2E"/>`;
  g += `<line x1="${c.X(ox)}" y1="${c.Y(c.ymin)}" x2="${c.X(ox)}" y2="${c.Y(c.ymax) - 12}" stroke="#1C1B2E" stroke-width="1.8"/><path d="M${c.X(ox)},${c.Y(c.ymax) - 14} l-4,8 h8 z" fill="#1C1B2E"/>`;
  const fs = Math.max(9, Math.min(13, c.u * 0.42));
  for(let x = c.xmin; x <= c.xmax + 1e-9; x += c.pas) if(Math.abs(x - ox) > 1e-9) g += `<text x="${c.X(x)}" y="${c.Y(oy) + fs + 4}" text-anchor="middle" font-size="${fs}" fill="#1C1B2E" font-family="Inter,sans-serif">${qzNum(qziArrondi(x))}</text>`;
  for(let y = c.ymin; y <= c.ymax + 1e-9; y += c.pas) if(Math.abs(y - oy) > 1e-9) g += `<text x="${c.X(ox) - 5}" y="${c.Y(y) + fs / 3}" text-anchor="end" font-size="${fs}" fill="#1C1B2E" font-family="Inter,sans-serif">${qzNum(qziArrondi(y))}</text>`;
  g += `<text x="${c.X(ox) - 5}" y="${c.Y(oy) + fs + 4}" text-anchor="end" font-size="${fs}" fill="#1C1B2E" font-family="Inter,sans-serif">${ox === 0 && oy === 0 ? 'O' : ''}</text>`;
  (attendus || []).forEach(m => { const x = c.X(m.v[0]), y = c.Y(m.v[1]);
    g += `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#1E7B34" stroke-width="2" stroke-dasharray="3 3"/><text x="${x + 11}" y="${y + 16}" font-size="13" font-weight="700" fill="#1E7B34">${qzEsc(m.label)}</text>`; });
  (marques || []).forEach(m => { const x = c.X(m.v[0]), y = c.Y(m.v[1]), col = m.col || '#6B3FA0';
    g += `<g class="qz-marque" data-cible="${qzEsc(m.id)}"><circle cx="${x}" cy="${y}" r="13" fill="transparent"/><path d="M${x - 6},${y - 6} L${x + 6},${y + 6} M${x - 6},${y + 6} L${x + 6},${y - 6}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>
      <text x="${x + 8}" y="${y - 8}" font-size="15" font-weight="700" fill="${col}" font-family="Inter,sans-serif">${qzEsc(m.label)}</text></g>`; });
  return `<svg class="qz-rep-svg" viewBox="0 0 ${c.W} ${c.H}" style="max-width:${Math.round(c.W * 1.15)}px;" xmlns="${QZI_NS}">${g}</svg>`;
}
QZ_EXT.repere = {
  nouvelle(q){ q.repere = { xmin: '-5', xmax: '5', ymin: '-4', ymax: '4', pas: '1', sous: 1 }; q.cibles = [{ id: qzId(), label: 'A', x: '2', y: '3' }]; q.enonce = 'Place le point A(2 ; 3).'; },
  corps(q){
    const id = q.id, r = q.repere || {};
    const champ = (k, lab) => `<label>${lab} <input type="text" value="${qzEsc(r[k])}" style="width:52px;" oninput="qziSet('${id}','repere.${k}',this.value)"></label>`;
    return `<span class="qz-lab">Repère</span>
      <div class="qz-reg-grid">${champ('xmin', 'x de')}${champ('xmax', 'à')}${champ('ymin', 'y de')}${champ('ymax', 'à')}${champ('pas', 'unité / quadrillage')}
        <label>points placés <select onchange="qziSet('${id}','repere.sous',parseInt(this.value,10))"><option value="1"${(r.sous || 1) == 1 ? ' selected' : ''}>sur les nœuds du quadrillage</option><option value="2"${r.sous == 2 ? ' selected' : ''}>aussi à mi-carreau</option></select></label></div>
      <span class="qz-lab">Points à placer</span>
      ${(q.cibles || []).map(c => `<div class="qz-sub">
        <input type="text" value="${qzEsc(c.label)}" style="width:60px;flex:none;" oninput="qzEdSousSet('${id}','cibles','${c.id}','label',this.value);qziMajApercu('${id}')" placeholder="A">
        ( <input type="text" value="${qzEsc(c.x)}" style="width:60px;flex:none;" oninput="qzEdSousSet('${id}','cibles','${c.id}','x',this.value);qziMajApercu('${id}')" placeholder="x"> ;
        <input type="text" value="${qzEsc(c.y)}" style="width:60px;flex:none;" oninput="qzEdSousSet('${id}','cibles','${c.id}','y',this.value);qziMajApercu('${id}')" placeholder="y"> )
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','cibles','${c.id}')" title="Supprimer"><span class="gicon">close</span></button></div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qziAjouter('${id}','cibles',{label:String.fromCharCode(65+(qzEdQ('${id}').cibles||[]).length),x:'',y:''})"><span class="gicon">add</span> Point</button>
      <div class="qz-apercu qz-ap-fig" id="qziAp_${id}">${this.apercu(q)}</div>`;
  },
  apercu(q){ return qziRepSvg(q, [], (q.cibles || []).map(c => ({ label: c.label, v: [qzParseNombre(c.x), qzParseNombre(c.y)] })).filter(m => !isNaN(m.v[0]) && !isNaN(m.v[1]))); },
  verifier(q){
    const c = qziRepConf(q);
    if(!(c.xmax > c.xmin && c.ymax > c.ymin)) return 'les bornes du repère sont incohérentes.';
    if((c.xmax - c.xmin) / c.pas > 40 || (c.ymax - c.ymin) / c.pas > 40) return 'repère trop grand : augmentez l\'unité.';
    if(!(q.cibles || []).length) return 'ajoutez au moins un point à placer.';
    for(const t of q.cibles){
      const x = qzParseNombre(t.x), y = qzParseNombre(t.y), st = c.pas / c.sous;
      if(isNaN(x) || isNaN(y) || x < c.xmin || x > c.xmax || y < c.ymin || y > c.ymax) return `les coordonnées du point ${t.label} doivent être dans le repère.`;
      if([x - c.xmin, y - c.ymin].some(v => Math.abs(v / st - Math.round(v / st)) > 1e-6)) return `le point ${t.label} ne tombe pas sur le quadrillage : choisissez « aussi à mi-carreau » ou d'autres coordonnées.`;
    }
    return null;
  },
  saisie(q, rep, mode){
    const corr = mode === 'corrige', r = qziObj(rep);
    const ok = (c, v) => Array.isArray(v) && Math.abs(v[0] - qzParseNombre(c.x)) < 1e-6 && Math.abs(v[1] - qzParseNombre(c.y)) < 1e-6;
    const aSol = (q.cibles || []).every(c => c.x !== undefined);
    const marques = qziMarques(q, rep, corr && aSol ? (c, v) => ok(c, v) ? '#1E7B34' : '#C0392B' : null);
    const att = corr && aSol ? (q.cibles || []).filter(c => !ok(c, r[c.id])).map(c => ({ label: c.label, v: [qzParseNombre(c.x), qzParseNombre(c.y)] })) : [];
    return `<div class="qz-place"${mode === 'passer' ? ` data-qzi="repere" data-qid="${q.id}"` : ''}>${qziCiblesChips(q, rep, mode)}${qziRepSvg(q, marques, att)}
      ${corr && att.length ? '<p class="hint" style="margin:2px 0 0;">En pointillés verts : les places attendues.</p>' : ''}</div>`;
  },
  monter(q, box){
    const c = qziRepConf(q), st = c.pas / c.sous;
    qziMonterPlacement(q, box, p => {
      const x = c.xmin + (p.x - 30) / c.u * c.pas, y = c.ymax - (p.y - 30) / c.u * c.pas;
      const sx = qziArrondi(Math.max(c.xmin, Math.min(c.xmax, c.xmin + Math.round((x - c.xmin) / st) * st)));
      const sy = qziArrondi(Math.max(c.ymin, Math.min(c.ymax, c.ymin + Math.round((y - c.ymin) / st) * st)));
      return [sx, sy];
    });
  },
  repondue(q, rep){ const r = qziObj(rep); return (q.cibles || []).every(c => Array.isArray(r[c.id])); },
  auto(q, rep, max){
    const r = qziObj(rep), cs = q.cibles || [];
    const ok = c => Array.isArray(r[c.id]) && Math.abs(r[c.id][0] - qzParseNombre(c.x)) < 1e-6 && Math.abs(r[c.id][1] - qzParseNombre(c.y)) < 1e-6;
    return cs.length ? Math.round(max * cs.filter(ok).length / cs.length * 100) / 100 : 0;
  },
};

/* ---------------------------------------------------------------------
   Construire une figure (outil de géométrie du site)
   --------------------------------------------------------------------- */
function qziFigHtml(fig, titre){
  if(!fig || !fig.f || typeof cpFigState !== 'function') return '';
  try{
    const svg = document.createElementNS(QZI_NS, 'svg');
    svg.setAttribute('viewBox', cpFigVB(fig.vb).join(' '));
    svg.setAttribute('class', 'qz-fig');
    svg.setAttribute('xmlns', QZI_NS);
    cpFigRender(svg, cpFigState(fig.f));
    svg.querySelectorAll('.cp-fig-handle').forEach(h => h.remove());
    return `<figure class="qz-fig-box">${titre ? `<figcaption>${titre}</figcaption>` : ''}${svg.outerHTML}</figure>`;
  }catch(e){ return '<p class="hint">Figure illisible.</p>'; }
}
/* Figure manipulable (correction, résultats) -- signalé : "Je ne peux pas déplacer les points ici.
   Donc je ne peux pas vérifier." Même visionneuse que les figures des cours personnalisés
   (cpFigMount) : les points libres se déplacent, ceux posés sur une droite ou un cercle glissent
   dessus, tout ce qui en dépend suit -- une construction juste (perpendiculaire...) le reste,
   un dessin « à l'œil » se déforme. Rien n'est enregistré ; « Remettre la figure » la rétablit. */
const QZI_FIGS = new Map(); let qziFigN = 0;
function qziFigDynHtml(fig, titre, prof){
  if(!fig || !fig.f || typeof cpFigMount !== 'function') return qziFigHtml(fig, titre);
  const id = 'qzf' + (++qziFigN); QZI_FIGS.set(id, fig);
  return `<figure class="qz-fig-box dyn" data-qzfig="${id}">
    <figcaption>${titre || ''} <span class="qz-fig-aide"><span class="gicon">pan_tool</span> déplacez les points pour vérifier la construction</span></figcaption>
    <svg class="qz-fig" viewBox="${cpFigVB(fig.vb).join(' ')}" xmlns="${QZI_NS}"></svg>
    <div class="qz-fig-tools"><button type="button" class="btn secondary qz-mini cp-fig-reset"><span class="gicon">restart_alt</span> Remettre la figure</button>
      ${prof ? `<button type="button" class="btn secondary qz-mini" onclick="qziFigOutil('${id}')" title="Mesurer des longueurs ou des angles, tester la construction avec tous les outils ; la copie de l'élève n'est pas modifiée"><span class="gicon">architecture</span> Ouvrir dans l'outil de géométrie</button>` : ''}</div>
  </figure>`;
}
// Appelée après chaque affichage (voir qzChargerPhotos) : branche les figures pas encore montées.
function qziFigMonter(root){
  (root || document).querySelectorAll('figure.qz-fig-box.dyn:not([data-monte])').forEach(b => {
    const fig = QZI_FIGS.get(b.dataset.qzfig); if(!fig) return;
    b.dataset.monte = '1';
    try{ cpFigMount(b.querySelector('svg'), { f: fig.f }); }catch(e){ console.warn('figure :', e); }
  });
}
function qziFigOutil(id){
  const fig = QZI_FIGS.get(id); if(!fig || typeof cpFigOpenEditor !== 'function') return;
  cpFigOpenEditor({ f: fig.f, vb: fig.vb }, () => {});
  const b = document.getElementById('figValidateBtn'); if(b) b.textContent = 'Fermer (la copie n\'est pas modifiée)';
  ['figEnonceIaRow', 'figEnonceIaHint'].forEach(x => { const el = document.getElementById(x); if(el) el.style.display = 'none'; });
}
// Image JPEG (base64) d'une figure, pour la correction par l'IA.
async function qziFigImage(fig){
  const html = qziFigHtml(fig); if(!html) return null;
  const tmp = document.createElement('div'); tmp.innerHTML = html;
  const svg = tmp.querySelector('svg'); if(!svg) return null;
  const vb = cpFigVB(fig.vb);
  svg.setAttribute('width', 1000); svg.setAttribute('height', Math.round(1000 * vb[3] / vb[2]));
  svg.insertAdjacentHTML('afterbegin', `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#fff"/>`);
  const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
  return { media_type: 'image/jpeg', data: await qzBlobBase64(blob) };
}
function qziFigOuvrir(qid){
  const q = qziQ(qid); if(!q || typeof cpFigOpenEditor !== 'function') return;
  const depart = qzP.reponses[qid] || q.figure || null;
  cpFigOpenEditor(depart ? { f: depart.f, vb: depart.vb } : null, fig => qzSaisieValeur(qid, { f: fig.f, vb: fig.vb }));
  const b = document.getElementById('figValidateBtn'); if(b) b.textContent = '✓ Valider ma figure';
  ['figEnonceIaRow', 'figEnonceIaHint'].forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
}
function qziFigEditer(qid, champ){
  const q = qzEdQ(qid); if(!q || typeof cpFigOpenEditor !== 'function') return;
  cpFigOpenEditor(q[champ] ? { f: q[champ].f, vb: q[champ].vb } : null, fig => { q[champ] = { f: fig.f, vb: fig.vb }; qzEdOuverte = qid; qzEdRender(); });
}
QZ_EXT.figure = {
  manuel: true,
  nouvelle(q){ q.points = 2; q.attendus = ''; q.criteres = []; q.figure = null; q.figure_corrige = null; q.enonce = 'Construis…'; },
  max(q){ return (q.criteres || []).length ? q.criteres.reduce((s, c) => s + (Number(c.points) || 0), 0) : Number(q.points) || 0; },
  corps(q){
    const id = q.id;
    return `<div class="qz-fig-ed">
        <div><span class="qz-lab">Figure de départ <span class="hint" style="margin:0;">(facultatif : l'élève la complète)</span></span>
          ${qziFigHtml(q.figure) || '<p class="hint" style="margin:4px 0;">L\'élève part d\'une page blanche.</p>'}
          <button type="button" class="btn secondary qz-mini" onclick="qziFigEditer('${id}','figure')"><span class="gicon">draw</span> ${q.figure ? 'Modifier' : 'Construire'} la figure de départ</button>
          ${q.figure ? `<button type="button" class="btn secondary qz-mini" onclick="qzEdSet('${id}','figure',null,true)"><span class="gicon">delete</span></button>` : ''}</div>
        <div><span class="qz-lab">Figure attendue <span class="hint" style="margin:0;">(facultatif : pour vous et pour l'IA, montrée après publication)</span></span>
          ${qziFigHtml(q.figure_corrige) || '<p class="hint" style="margin:4px 0;">Aucune.</p>'}
          <button type="button" class="btn secondary qz-mini" onclick="qziFigEditer('${id}','figure_corrige')"><span class="gicon">draw</span> ${q.figure_corrige ? 'Modifier' : 'Construire'} la figure attendue</button>
          ${q.figure_corrige ? `<button type="button" class="btn secondary qz-mini" onclick="qzEdSet('${id}','figure_corrige',null,true)"><span class="gicon">delete</span></button>` : ''}</div>
      </div>${qziCriteresHtml(q)}`;
  },
  saisie(q, rep, mode, ctx){
    const corr = mode === 'corrige', prof = !!ctx && (ctx.pfx === 'c' || ctx.pfx === 'k');
    if(mode === 'passer') return `${qziFigHtml(rep || q.figure, rep ? 'Ma figure' : 'Figure de départ')}
      <button type="button" class="btn secondary" onclick="qziFigOuvrir('${q.id}')"><span class="gicon">draw</span> ${rep ? 'Modifier ma figure' : 'Construire ma figure'}</button>`;
    return `${rep ? qziFigDynHtml(rep, 'Figure de l\'élève', prof) : '<p class="hint">Aucune figure.</p>'}
      ${corr && q.figure_corrige && !(ctx && ctx.pfx === 'k') ? qziFigDynHtml(q.figure_corrige, 'Figure attendue', prof) : ''}
      ${corr && q.attendus ? `<div class="qz-sol"><span class="gicon">fact_check</span> <div><b>Attendus :</b> ${qzMath(q.attendus)}</div></div>` : ''}`;
  },
  repondue(q, rep){ return !!(rep && rep.f && rep.f.points && rep.f.points.length); },
  auto(){ return null; },
  async iaImages(q, rep){
    const out = [];
    const a = rep && rep.f ? await qziFigImage(rep) : null; if(a) out.push(a);
    const b = q.figure_corrige ? await qziFigImage(q.figure_corrige) : null; if(b) out.push(b);
    return out;
  },
  iaConsigne(q, n){
    return n ? `La réponse de l'élève est une FIGURE construite avec un logiciel de géométrie : image 1 = la figure de l'élève${q.figure_corrige && n > 1 ? ', image 2 = la figure attendue (corrigé du professeur)' : ''}. Juge la construction (points, droites, segments, cercles, angles, codages), pas le dessin au pixel près ; les noms des points peuvent différer s'ils sont cohérents.`
      : `L'élève n'a construit aucune figure : la note est 0.`;
  },
};

// Types proposés dans l'éditeur (avant « Texte / document »)
(function(){
  const nouveaux = [
    { id: 'axe', label: 'Point sur un axe', icon: 'linear_scale', aide: 'Placer un ou plusieurs points sur une droite graduée.' },
    { id: 'repere', label: 'Point dans un repère', icon: 'scatter_plot', aide: 'Placer des points de coordonnées données dans un repère.' },
    { id: 'associer', label: 'Associer', icon: 'sync_alt', aide: 'Relier chaque étiquette à la bonne (glisser-déposer).' },
    { id: 'classer', label: 'Classer', icon: 'category', aide: 'Ranger des étiquettes dans des catégories (glisser-déposer).' },
    { id: 'ordonner', label: 'Remettre dans l\'ordre', icon: 'format_list_numbered', aide: 'Ordonner des étiquettes (nombres, étapes d\'un calcul…).' },
    { id: 'trous', label: 'Texte à trous', icon: 'text_fields', aide: 'Compléter un texte ou un calcul.' },
    { id: 'figure', label: 'Construire une figure', icon: 'architecture', aide: 'Construction avec l\'outil de géométrie du site, corrigée à la main ou par l\'IA.' },
  ];
  const i = QZ_TYPES.findIndex(t => t.id === 'texte');
  QZ_TYPES.splice(i < 0 ? QZ_TYPES.length : i, 0, ...nouveaux);
})();

(function qziStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qz-tools{display:flex;flex-wrap:wrap;gap:4px;margin:2px 0 6px;}
    .qz-tools .tool-icon-btn{width:36px;height:36px;}
    .qz-blocs{display:flex;flex-direction:column;gap:8px;margin:8px 0;}
    .qz-bloc{max-width:100%;overflow-x:auto;}
    .qz-bloc svg{max-width:100%;height:auto;}
    .qz-ed-bloc{position:relative;border:1px dashed rgba(107,63,160,.35);border-radius:10px;padding:6px 40px 6px 8px;margin:6px 0;background:#fff;}
    .qz-ed-bloc-act{position:absolute;top:4px;right:4px;display:flex;flex-direction:column;gap:2px;}
    .qz-ed-bloc-act button{border:0;background:#F4EFFA;color:#6B3FA0;border-radius:6px;cursor:pointer;display:flex;padding:3px;}
    .qz-ed-bloc-act button:disabled{opacity:.35;cursor:default;}
    .qz-ed-bloc-act .gicon{font-size:17px;}
    .qz-chip{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1.5px solid #6B3FA0;color:#3b2466;border-radius:10px;padding:6px 12px;font-weight:600;cursor:grab;touch-action:none;user-select:none;box-shadow:0 2px 6px rgba(107,63,160,.15);}
    .qz-chip.qz-sel{background:#6B3FA0;color:#fff;box-shadow:0 0 0 3px rgba(107,63,160,.3);}
    .qz-chip.qz-dragging{opacity:.35;}
    .qz-chip.juste{border-color:#1E7B34;background:#EAF6EC;color:#1d5a2b;}
    .qz-chip.faux{border-color:#C0392B;background:#FBECEA;color:#8a1f1f;}
    .qz-q .qz-chip:not([data-drag]){cursor:default;}
    .qz-ghost{position:fixed;z-index:9999;pointer-events:none;transform:translate(-50%,-60%) rotate(-2deg);box-shadow:0 10px 24px rgba(0,0,0,.25);}
    .qz-vide{color:var(--ink-soft);font-size:.82rem;font-style:italic;}
    .qz-pool{display:flex;flex-wrap:wrap;gap:8px;min-height:46px;align-items:center;background:#FAF8F3;border:1.5px dashed rgba(28,43,57,.2);border-radius:12px;padding:8px;margin-top:10px;}
    [data-drop].qz-over{outline:3px solid rgba(107,63,160,.45);outline-offset:2px;}
    .qz-as{display:flex;flex-direction:column;gap:6px;}
    .qz-as-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    .qz-as-g{min-width:120px;font-weight:600;background:#F4EFFA;border-radius:10px;padding:7px 12px;}
    .qz-as-fl{color:var(--ink-soft);}
    .qz-as-slot{min-width:140px;min-height:40px;display:flex;align-items:center;border:1.5px dashed rgba(28,43,57,.25);border-radius:10px;padding:3px 6px;cursor:pointer;}
    .qz-as-slot.juste{border:2px solid #1E7B34;background:#EAF6EC;}
    .qz-as-slot.faux{border:2px solid #C0392B;background:#FBECEA;}
    .qz-attendu{font-size:.82rem;font-weight:700;color:#1E7B34;background:#EAF6EC;border-radius:6px;padding:1px 7px;margin-left:4px;}
    .qz-cl-cats{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;}
    .qz-cl-cat{border:1.5px solid rgba(107,63,160,.35);border-radius:12px;background:#fff;min-height:90px;cursor:pointer;}
    .qz-cl-nom{background:#F4EFFA;color:#3b2466;font-weight:700;padding:6px 10px;border-radius:11px 11px 0 0;}
    .qz-cl-in{display:flex;flex-wrap:wrap;gap:6px;padding:8px;}
    .qz-ord{display:flex;flex-direction:column;gap:6px;}
    .qz-ord-row{display:flex;align-items:center;gap:8px;border-radius:10px;padding:3px;}
    .qz-ord-row.juste{background:#EAF6EC;}
    .qz-ord-row.faux{background:#FBECEA;}
    .qz-ord-n{width:24px;text-align:center;font-weight:700;color:var(--ink-soft);}
    .qz-ord-btns{display:inline-flex;gap:2px;}
    .qz-ord-btns button{border:1px solid rgba(28,43,57,.2);background:#fff;border-radius:6px;cursor:pointer;display:flex;padding:2px;}
    .qz-ord-btns button:disabled{opacity:.3;cursor:default;}
    .qz-ord-btns .gicon{font-size:17px;}
    .qz-trous{line-height:2.4;font-size:1rem;}
    .qz-trou{padding:4px 8px;border:1.5px solid rgba(107,63,160,.45);border-radius:8px;font:inherit;margin:0 3px;background:#FBF9FE;}
    .qz-trou:focus{outline:none;border-color:#6B3FA0;box-shadow:0 0 0 3px rgba(107,63,160,.15);}
    .qz-trou.juste{border-color:#1E7B34;background:#EAF6EC;}
    .qz-trou.faux{border-color:#C0392B;background:#FBECEA;}
    .qz-trou-ap{background:#EAF6EC;color:#1d5a2b;border-radius:5px;padding:1px 6px;font-weight:700;}
    .qz-place svg{display:block;width:100%;height:auto;touch-action:none;background:#fff;border-radius:10px;border:1px solid rgba(28,43,57,.1);}
    .qz-rep-svg{margin:0 auto;}
    .qz-place [data-qzi] svg, .qz-place svg{cursor:crosshair;}
    .qz-marque{cursor:grab;}
    .qz-cibles{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 8px;}
    .qz-cible{border:1.5px solid #6B3FA0;background:#fff;color:#6B3FA0;border-radius:10px;padding:5px 12px;font:700 .95rem 'Space Grotesk',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:3px;}
    .qz-cible.on{background:#6B3FA0;color:#fff;box-shadow:0 0 0 3px rgba(107,63,160,.25);}
    .qz-cible.place:not(.on){border-color:#1E7B34;color:#1E7B34;}
    .qz-cible .gicon{font-size:16px;}
    .qz-ap-fig{background:#fff;}
    .qz-fig-box{margin:6px 0;}
    .qz-fig-box figcaption{font-size:.78rem;font-weight:700;color:var(--ink-soft);margin-bottom:3px;}
    .qz-fig{display:block;width:100%;max-width:520px;height:auto;background:#fff;border:1px solid rgba(28,43,57,.12);border-radius:8px;}
    .qz-fig-box.dyn{user-select:none;-webkit-user-select:none;} /* glisser un point ne sélectionne pas le texte autour */
    .qz-fig-box.dyn .qz-fig{touch-action:none;cursor:default;}
    .qz-fig-aide{display:inline-flex;align-items:center;gap:3px;font-weight:400;font-size:.74rem;color:#6B3FA0;margin-left:6px;} .qz-fig-aide .gicon{font-size:15px;}
    .qz-fig-tools{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;}
    .qz-fig-tools .cp-fig-reset{width:auto;height:auto;border-radius:999px;padding:4px 10px;display:inline-flex;gap:4px;font:inherit;font-size:.76rem;font-weight:700;}
    .qz-fig-ed{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
    @media (max-width:700px){ .qz-fig-ed{grid-template-columns:1fr;} .qz-as-g{min-width:0;flex:1;} }
  `;
  document.head.appendChild(st);
})();
