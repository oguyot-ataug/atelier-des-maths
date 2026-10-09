/* =====================================================================
   relecture.js -- Relecture des exercices du manuel par l'administrateur.

   Demandé : « Pour chaque exercice du manuel, je te propose d'apporter une coche de validation, non
   examiné, ou commenté. Non examiné ou commenté permet d'ouvrir une fenêtre modale pour écrire un
   commentaire ou cocher un commentaire prédéfini (Est-ce bien au programme ? Plus d'exemples, Formatage à
   revoir…). L'idée est que tu puisses régulièrement faire une petite synthèse et faire les changements
   nécessaires. Si tu as changé, me prévenir avec une coche de type "Chgt effectué". Ce travail me
   permettrait de valider chaque exercice tant pour le format papier que sa fonctionnalité numérique. »

   - Onglet « Manuel » d'un chapitre, administrateur seulement : sous chaque vignette, trois états
     (Validé, Non examiné, Commenté). « Validé » s'enregistre d'un clic ; les deux autres ouvrent la fenêtre
     de commentaire (remarques prédéfinies à cocher + texte libre, papier ou écran).
   - En tête de l'onglet : le compte du chapitre et un filtre (tous, à examiner, commentés, changés).
   - « Chgt effectué » : posé par Claude dans RELECTURE_CHGT ci-dessous (dans le dépôt, avec la
     modification de l'exercice) ; il s'affiche tant que l'exercice n'a pas été revu après la date du
     changement. Une nouvelle validation (ou un nouveau commentaire) le fait disparaître.
   - Clé d'un exercice : référence de la planche + numéro (6e-G3-P2-E3) ; l'extrait de la consigne est
     gardé pour le retrouver si la numérotation bouge.

   Données : table relecture_exercices (une ligne par exercice relu ; lecture et écriture réservées à
   l'administrateur, is_admin()).
   ===================================================================== */

// Changements faits à la suite d'une remarque : clé → { date (ISO, heure UTC du changement), note }.
const RELECTURE_CHGT = {
  // Build 1044 : grands nombres à l'écran, tableau de 6e-N1-P1-E3.
  '6e-N1-P1-E1': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E2': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E5': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E6': { date: '2026-10-09T14:24:20Z', note: "À l'écran, touche « espace » sur le clavier des chiffres ; un nombre de 5 chiffres ou plus doit être écrit par classes (2 300 000), sinon il est compté faux avec l'explication" },
  '6e-N1-P1-E3': { date: '2026-10-09T14:24:20Z', note: "Tableau aligné à gauche, la colonne Décomposition va jusqu'à la marge droite ; à l'écran, nombres écrits par classes comme ci-dessus" },
};

const RL_REMARQUES = [
  'Est-ce bien au programme ?',
  'Plus d\'exemples',
  'Formatage à revoir',
  'Erreur dans l\'énoncé ou le corrigé',
  'Consigne pas claire',
  'Figure ou dessin à revoir',
  'Trop difficile (étoiles à revoir)',
  'Trop facile (étoiles à revoir)',
  'Papier : mise en page (coupure, place pour répondre…)',
  'Écran : ne fonctionne pas bien',
  'Écran : devrait pouvoir se faire à l\'écran',
];
const RL_ETATS = { ok: ['check_circle', 'Validé'], non: ['radio_button_unchecked', 'Non examiné'], com: ['chat', 'Commenté'] };
const rl = { lignes: null, filtre: '' };
const rlAdmin = () => typeof currentUserRole !== 'undefined' && currentUserRole === 'admin';
const rlEsc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rlCle = (lvl, c, i, k) => `${plRef(lvl, plCode(lvl, c), i)}-E${k + 1}`;
// Changement effectué et pas encore revu (la ligne a été mise à jour avant la date du changement).
function rlChgt(cle){
  const ch = RELECTURE_CHGT[cle], l = rl.lignes && rl.lignes.get(cle);
  if(!ch) return null;
  return !l || Date.parse(l.updated_at) < Date.parse(ch.date) ? ch : null;
}

async function rlCharger(force){
  if(rl.lignes && !force) return rl.lignes;
  const { data, error } = await sb.from('relecture_exercices').select('*');
  if(error){ rl.erreur = error.message; rl.lignes = new Map(); return rl.lignes; }
  rl.erreur = null; rl.lignes = new Map((data || []).map(r => [r.cle, r]));
  return rl.lignes;
}
async function rlEnregistrer(lvl, c, i, k, maj){
  const x = plDe(lvl, c.t)[i].exos[k], cle = rlCle(lvl, c, i, k);
  const consigne = String(x.consigne || '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  const ligne = Object.assign({ cle, niveau: lvl, chapitre: `${c.code} · ${c.t}`, consigne, tags: [], commentaire: '' },
    (rl.lignes && rl.lignes.get(cle)) || {}, maj, { updated_at: new Date().toISOString() });
  delete ligne.updated_by;
  const { error } = await sb.from('relecture_exercices').upsert(ligne, { onConflict: 'cle' });
  if(error){ await niceAlert('Relecture non enregistrée : ' + error.message + (/relation|does not exist|schema cache/i.test(error.message) ? '\n\nLa table relecture_exercices n\'existe pas encore : exécutez le SQL fourni dans Supabase.' : '')); return false; }
  rl.lignes.set(cle, ligne);
  return true;
}

/* ---------- Barre de relecture sous chaque vignette ---------- */
function rlBarreHtml(cle){
  const l = rl.lignes.get(cle), st = (l && l.statut) || 'non', ch = rlChgt(cle);
  const rem = l && (l.tags.length || l.commentaire) ? `<div class="rl-rem">${l.tags.map(t => `<span>${rlEsc(t)}</span>`).join('')}${l.commentaire ? `<em>${rlEsc(l.commentaire)}</em>` : ''}</div>` : '';
  return `<div class="rl-barre">${Object.entries(RL_ETATS).map(([k, [ic, t]]) => `<button type="button" class="rl-b rl-${k}${st === k ? ' on' : ''}" data-rl="${k}"><span class="gicon">${ic}</span> ${t}</button>`).join('')}
      ${ch ? `<span class="rl-chgt" title="${rlEsc(ch.note || '')}"><span class="gicon">published_with_changes</span> Chgt effectué le ${new Date(ch.date).toLocaleDateString('fr-FR')}${ch.note ? ' : ' + rlEsc(ch.note) : ''}</span>` : ''}
      <span class="rl-cle">${rlEsc(cle)}</span></div>${rem}`;
}
function rlEtatVig(v, cle){
  const l = rl.lignes.get(cle), st = (l && l.statut) || 'non';
  v.classList.remove('rl-v-ok', 'rl-v-com', 'rl-v-chgt');
  if(rlChgt(cle)) v.classList.add('rl-v-chgt'); else if(st !== 'non') v.classList.add('rl-v-' + st);
}
async function rlDecorer(lvl, c){
  const root = document.getElementById('tdRoot'); if(!root || !rlAdmin()) return;
  await rlCharger();
  const liste = plDe(lvl, c.t); if(!liste.length) return;
  const cles = [];
  liste.forEach((p, i) => p.exos.forEach((x, k) => {
    const v = document.getElementById(`tdv-${i}-${k}`); if(!v) return;
    const cle = rlCle(lvl, c, i, k); cles.push(cle);
    let b = v.querySelector('.rl-zone');
    if(!b){ b = document.createElement('div'); b.className = 'rl-zone'; v.appendChild(b); }
    b.innerHTML = rlBarreHtml(cle); v.dataset.rl = cle; rlEtatVig(v, cle);
    b.onclick = async e => {
      const t = e.target.closest('[data-rl]'); if(!t) return;
      e.stopPropagation();
      if(t.dataset.rl === 'ok'){ if(await rlEnregistrer(lvl, c, i, k, { statut: 'ok' })){ b.innerHTML = rlBarreHtml(cle); rlEtatVig(v, cle); rlEntete(lvl, c); } }
      else rlFenetre(lvl, c, i, k, t.dataset.rl, () => { b.innerHTML = rlBarreHtml(cle); rlEtatVig(v, cle); rlEntete(lvl, c); });
    };
  }));
  rl.cles = cles;
  rlEntete(lvl, c);
}
// En tête de l'onglet : compte du chapitre, filtre, et toutes les remarques en cours (tous chapitres).
function rlEntete(lvl, c){
  const root = document.getElementById('tdRoot'); if(!root) return;
  let h = root.querySelector('.rl-entete');
  if(!h){ h = document.createElement('div'); h.className = 'rl-entete'; root.insertBefore(h, root.querySelector('.td-planche') || root.firstChild.nextSibling); }
  const n = { ok: 0, non: 0, com: 0, chgt: 0 };
  (rl.cles || []).forEach(k => { if(rlChgt(k)) n.chgt++; else n[((rl.lignes.get(k) || {}).statut) || 'non']++; });
  const f = (id, t, nb) => `<button type="button" class="rl-f${rl.filtre === id ? ' on' : ''}" data-rlf="${id}">${t} <b>${nb}</b></button>`;
  h.innerHTML = `<b><span class="gicon">rate_review</span> Relecture</b>
    ${f('', 'Tous', (rl.cles || []).length)}${f('ok', 'Validés', n.ok)}${f('non', 'Non examinés', n.non)}${f('com', 'Commentés', n.com)}${f('chgt', 'Chgt effectué', n.chgt)}
    <span style="flex:1"></span><button type="button" class="btn secondary td-mini" data-rlsynth><span class="gicon">list_alt</span> Toutes les remarques</button>
    ${rl.erreur ? `<span class="rl-err">Relecture indisponible : ${rlEsc(rl.erreur)}</span>` : ''}`;
  h.onclick = e => {
    const b = e.target.closest('[data-rlf]'); if(b){ rl.filtre = b.dataset.rlf; rlFiltrer(); rlEntete(lvl, c); return; }
    if(e.target.closest('[data-rlsynth]')) rlSynthese();
  };
  rlFiltrer();
}
function rlFiltrer(){
  document.querySelectorAll('#tdRoot .td-vig[data-rl]').forEach(v => {
    const cle = v.dataset.rl, st = rlChgt(cle) ? 'chgt' : ((rl.lignes.get(cle) || {}).statut || 'non');
    v.style.display = !rl.filtre || rl.filtre === st ? '' : 'none';
  });
  document.querySelectorAll('#tdRoot .td-planche').forEach(s => {
    s.style.display = [...s.querySelectorAll('.td-vig[data-rl]')].some(v => v.style.display !== 'none') || !rl.filtre ? '' : 'none';
  });
}

/* ---------- Fenêtre de commentaire ---------- */
function rlFenetre(lvl, c, i, k, statut, apres){
  const cle = rlCle(lvl, c, i, k), l = rl.lignes.get(cle) || { tags: [], commentaire: '' };
  const o = document.createElement('div'); o.className = 'modal-overlay'; o.style.cssText = 'display:flex;z-index:9470;';
  const st0 = statut === 'non' && (l.tags.length || l.commentaire) ? 'com' : statut;
  o.innerHTML = `<div class="modal-card rl-modal">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">rate_review</span> ${rlEsc(cle)}</b>
      <button class="modal-close" data-rlx><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:4px 0 8px;">${rlEsc(`${c.code} · ${c.t}`)} — exercice ${k + 1} de la planche ${i + 1}</p>
    <div class="rl-tags">${RL_REMARQUES.concat(l.tags.filter(t => !RL_REMARQUES.includes(t))).map(t => `<label><input type="checkbox" value="${rlEsc(t)}"${l.tags.includes(t) ? ' checked' : ''}> ${rlEsc(t)}</label>`).join('')}</div>
    <label class="cd-lab" style="display:block;margin-top:8px;">Commentaire
      <textarea id="rlTexte" rows="4" style="width:100%;box-sizing:border-box;" placeholder="Ce qui ne va pas, ce qu'il faudrait changer (papier ou écran)…">${rlEsc(l.commentaire)}</textarea></label>
    <div class="rl-st"><label><input type="radio" name="rlSt" value="com"${st0 === 'com' ? ' checked' : ''}> Commenté (à reprendre)</label>
      <label><input type="radio" name="rlSt" value="non"${st0 === 'non' ? ' checked' : ''}> Non examiné (à revoir plus tard)</label></div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn secondary" data-rlx>Annuler</button><button class="btn" data-rlok><span class="gicon">save</span> Enregistrer</button></div></div>`;
  document.body.appendChild(o);
  const fermer = () => o.remove();
  o.addEventListener('click', async e => {
    if(e.target === o || e.target.closest('[data-rlx]')) return fermer();
    if(!e.target.closest('[data-rlok]')) return;
    const tags = [...o.querySelectorAll('.rl-tags input:checked')].map(x => x.value), commentaire = o.querySelector('#rlTexte').value.trim();
    let st = o.querySelector('input[name=rlSt]:checked').value;
    if(st === 'com' && !tags.length && !commentaire){ await niceAlert('Cochez une remarque ou écrivez un commentaire (ou choisissez « Non examiné »).'); return; }
    if(await rlEnregistrer(lvl, c, i, k, { statut: st, tags, commentaire })){ fermer(); apres(); }
  });
  setTimeout(() => { const t = o.querySelector('#rlTexte'); if(t) t.focus(); }, 50);
}

/* ---------- Toutes les remarques (tous chapitres) ---------- */
async function rlSynthese(){
  await rlCharger(true);
  const l = [...rl.lignes.values()].filter(r => r.statut === 'com' || rlChgt(r.cle)).sort((a, b) => a.cle.localeCompare(b.cle, 'fr', { numeric: true }));
  const tous = [...rl.lignes.values()], nOk = tous.filter(r => r.statut === 'ok').length;
  const o = document.createElement('div'); o.className = 'modal-overlay'; o.style.cssText = 'display:flex;z-index:9470;';
  o.innerHTML = `<div class="modal-card rl-modal" style="max-width:860px;max-height:88vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">list_alt</span> Remarques en cours</b>
      <button class="modal-close" data-rlx><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:4px 0 10px;">${nOk} exercice${nOk > 1 ? 's' : ''} validé${nOk > 1 ? 's' : ''} ; ${l.length} remarque${l.length > 1 ? 's' : ''} en cours (commentés, ou changés et à revoir), tous niveaux.</p>
    ${l.map(r => { const ch = rlChgt(r.cle); return `<div class="rl-s-l${ch ? ' chgt' : ''}"><div><b>${rlEsc(r.cle)}</b> <small>${rlEsc(r.chapitre || '')}</small></div>
      <small class="rl-s-c">${rlEsc(r.consigne || '')}</small>
      <div class="rl-rem">${(r.tags || []).map(t => `<span>${rlEsc(t)}</span>`).join('')}${r.commentaire ? `<em>${rlEsc(r.commentaire)}</em>` : ''}</div>
      ${ch ? `<small class="rl-chgt"><span class="gicon">published_with_changes</span> Chgt effectué le ${new Date(ch.date).toLocaleDateString('fr-FR')}${ch.note ? ' : ' + rlEsc(ch.note) : ''}</small>` : ''}</div>`; }).join('') || '<p class="hint">Aucune remarque en cours.</p>'}</div>`;
  document.body.appendChild(o);
  o.addEventListener('click', e => { if(e.target === o || e.target.closest('[data-rlx]')) o.remove(); });
}

// Branchement : après chaque affichage de l'onglet Manuel (planches.js › plTdRendre).
(function(){
  const brancher = () => {
    if(typeof plTdRendre !== 'function' || plTdRendre.rl) return false;
    const orig = plTdRendre;
    plTdRendre = function(lvl, c){ const r = orig.apply(this, arguments); if(rlAdmin()) rlDecorer(lvl, c); return r; };
    plTdRendre.rl = true;
    return true;
  };
  if(!brancher()) document.addEventListener('DOMContentLoaded', brancher);
  const st = document.createElement('style');
  st.textContent = `
    .rl-zone{border-top:1px dashed rgba(28,43,57,.18);margin-top:6px;padding-top:6px;}
    .rl-barre{display:flex;flex-wrap:wrap;gap:4px;align-items:center;}
    .rl-b{border:1px solid rgba(28,43,57,.18);background:#fff;border-radius:999px;padding:2px 9px 2px 6px;font:600 .76rem Inter,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:3px;color:#5B6472;}
    .rl-b .gicon{font-size:15px;} .rl-b.rl-ok.on{background:#E3F4EA;border-color:#1F7A4D;color:#1F7A4D;}
    .rl-b.rl-non.on{background:#EEF1F5;border-color:#8A94A3;color:#3C4654;} .rl-b.rl-com.on{background:#FDF1DF;border-color:#C77D1E;color:#A0620F;}
    .rl-chgt{display:inline-flex;align-items:center;gap:3px;background:#E6EEFB;color:#1F5FA8;border-radius:999px;padding:2px 9px;font:700 .74rem Inter,sans-serif;} .rl-chgt .gicon{font-size:15px;}
    .rl-cle{margin-left:auto;font:600 .7rem 'Space Grotesk',monospace;color:#9AA3AF;}
    .rl-rem{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;font-size:.76rem;} .rl-rem span{background:#FDF1DF;color:#8A5A00;border-radius:6px;padding:1px 6px;} .rl-rem em{color:#3C4654;flex-basis:100%;}
    .td-vig.rl-v-ok{box-shadow:inset 0 0 0 2px #7CC29A;} .td-vig.rl-v-com{box-shadow:inset 0 0 0 2px #E8A64B;} .td-vig.rl-v-chgt{box-shadow:inset 0 0 0 2px #5B8FD6;}
    .rl-entete{display:flex;flex-wrap:wrap;gap:6px;align-items:center;background:#F7F9FC;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:8px 12px;margin:10px 0;font-size:.85rem;}
    .rl-entete > b .gicon{vertical-align:-4px;font-size:18px;color:#1F5FA8;}
    .rl-f{border:1px solid rgba(28,43,57,.15);background:#fff;border-radius:999px;padding:2px 10px;cursor:pointer;font:500 .8rem Inter,sans-serif;} .rl-f.on{background:#1F3A5C;color:#fff;border-color:#1F3A5C;}
    .rl-err{color:#C0392B;font-weight:600;flex-basis:100%;}
    .rl-modal{max-width:560px;width:94vw;}
    .rl-tags{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:4px 12px;font-size:.88rem;} .rl-tags label{display:flex;gap:6px;align-items:flex-start;}
    .rl-st{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:8px;font-size:.88rem;} .rl-st label{display:inline-flex;gap:5px;align-items:center;}
    .rl-s-l{border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:7px 10px;margin:6px 0;} .rl-s-l.chgt{border-color:#5B8FD6;}
    .rl-s-l small{color:#5B6472;} .rl-s-c{display:block;margin:2px 0;}
    @media print{ .rl-zone, .rl-entete{ display:none !important; } }
  `;
  document.head.appendChild(st);
})();
