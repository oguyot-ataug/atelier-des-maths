/* =====================================================================
   manuel-famille.js -- Le Manuel pour les enfants des comptes Famille, en entraînement

   Demandé le 12/11/2026 : « En famille, les élèves ont bien accès aux exercices des manuels ? », puis « oui »
   à la proposition : onglet Manuel ouvert aux enfants, exercices faits à l'écran avec « Vérifier », exercices du
   cahier avec « J'ai fini dans mon cahier », correction seulement APRÈS un essai, résultats dans le suivi du parent.

   - Seulement pour un enfant d'un compte Famille (pmfEnfant : élève dont ma_famille() renvoie une famille dont il
     n'est pas le parent). Les élèves des classes ne changent pas : leur professeur leur donne ces exercices.
   - Pas de Projeter, Cahier de la classe, Session, Planches à imprimer ni Fiche de répétition ; « Autre version »
     reste (s'entraîner encore).
   - Exercice qui se fait à l'écran (plNumPossible, planches-num.js) : « Faire l'exercice » monte l'outil (plNum),
     « Vérifier » compte les réponses justes ; la correction s'ouvre après la première vérification.
   - Autre exercice : énoncé, « J'ai fini dans mon cahier », puis la correction.
   - Table famille_manuel (supabase/sql/2026-11-12-famille-manuel.sql) : une ligne par enfant et par exercice
     (ref = niveau|chapitre|planche|exercice|version), réponses gardées pour reprendre, meilleur résultat, essais,
     correction vue ; le parent la lit dans son suivi (famille.js, famSuiviHtml).
   Dépend de planches.js (plDe, plRef, plCode, plExoCorps, plMarque, plTdV, plTdCle, plTdX, plTdVerTxt),
   planches-num.js (plNum, plNumPossible, plNumBilan, plClavier), planches-variantes.js (plVariable, plVariante).
   ===================================================================== */
function pmfEnfant(){
  return typeof currentUserRole !== 'undefined' && currentUserRole === 'eleve' && typeof famState !== 'undefined' && !!famState && !famState.est_parent;
}
const pmf = { lignes: new Map(), outils: new Map(), saveT: new Map(), lvl: null, c: null };
function pmfRef(lvl, c, i, k){ const v = plTdV[plTdCle(lvl, c, i, k)] || 0; return `${lvl}|${plCode(lvl, c)}|${i}|${k}|${v}`; }
function pmfLibelle(lvl, c, i, k){ const v = plTdV[plTdCle(lvl, c, i, k)] || 0; return `${plRef(lvl, plCode(lvl, c), i)} · exercice ${k + 1}${v ? ' · version ' + (v + 1) : ''}`; }
function pmfEsc(s){ return String(s ?? '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch])); }

async function pmfRendre(lvl, c){
  const root = document.getElementById('tdRoot'); if(!root) return;
  pmf.lvl = lvl; pmf.c = c; pmf.outils.clear();
  root.classList.toggle('pl-college', typeof plCollege === 'function' && plCollege(lvl));
  const liste = plDe(lvl, c.t), n = liste.reduce((a, p) => a + p.exos.length, 0);
  root.innerHTML = `<div class="td-intro"><span class="pl-oliv">${typeof plOliv === 'function' ? plOliv('muscle') : ''}</span><div><b>Manuel : ${n} exercices pour t'entraîner</b>
      <p class="hint" style="margin:2px 0 0;">Les exercices marqués <b>à l'écran</b> se font ici : réponds, puis « Vérifier ». Les autres se font <b>dans ton cahier</b>.
      La correction s'ouvre quand tu as essayé.</p></div></div>
    ${liste.map((p, i) => `<section class="td-planche"><div class="td-p-tete"><span class="pl-ref">${plRef(lvl, plCode(lvl, c), i)}</span>${p.brevet ? '<span class="pl-brevet">Objectif Brevet</span>' : ''}<b>${pmfEsc(p.titre)}</b>
        <span class="hint" style="margin:0;">${(p.attendus || []).map(pmfEsc).join(' · ')}</span></div>
      <div class="td-grille">${p.exos.map((x, k) => `<div class="td-vig pmf-vig${x.col === 1 ? '' : ' td-plein'}${x.uneLigne ? ' pl-une-ligne' : ''}" id="tdv-${i}-${k}" data-pmf="${i}|${k}"></div>`).join('')}</div></section>`).join('')}`;
  liste.forEach((p, i) => p.exos.forEach((x, k) => pmfVignette(i, k)));
  root.onclick = pmfClic;
  // Résultats déjà enregistrés (reprise, correction déjà ouverte).
  try{
    const { data } = await sb.from('famille_manuel').select('*').eq('enfant_id', currentUser.id).like('ref', `${lvl}|${plCode(lvl, c)}|%`);
    if(pmf.c !== c) return;
    (data || []).forEach(r => pmf.lignes.set(r.ref, r));
    liste.forEach((p, i) => p.exos.forEach((x, k) => pmfVignette(i, k)));
  }catch(e){ /* hors ligne : l'entraînement reste possible, sans enregistrement */ }
}
function pmfVignette(i, k){
  const { lvl, c } = pmf, v = document.getElementById(`tdv-${i}-${k}`); if(!v) return;
  const x = plTdX(lvl, c, i, k), ecran = typeof plNumPossible === 'function' && plNumPossible(x);
  const r = pmf.lignes.get(pmfRef(lvl, c, i, k)) || {}, essaye = ecran ? (r.essais || 0) > 0 : !!r.fini;
  const ouvert = pmf.outils.has(`${i}|${k}`), corr = v.classList.contains('pmf-corr-on');
  const statut = ecran
    ? (r.essais ? (r.meilleur === r.total && r.total ? '<span class="pmf-ok"><span class="gicon">check_circle</span> réussi</span>' : `<span class="pmf-enc">${r.meilleur || 0}/${r.total} au mieux</span>`) : '')
    : (r.fini ? '<span class="pmf-ok"><span class="gicon">check_circle</span> fait</span>' : '');
  v.innerHTML = `<div class="td-v-tete"><span class="pl-num">Exercice ${k + 1}</span><span class="td-ver" id="tdver-${i}-${k}">${plTdVerTxt(lvl, c, i, k)}</span>${typeof plMarque === 'function' ? plMarque(lvl, x) : ''}
      <span class="td-num"><span class="gicon">${ecran ? 'touch_app' : 'edit_note'}</span> ${ecran ? 'à l\'écran' : 'dans ton cahier'}</span>${statut}</div>
    <div class="td-v-corps"><div class="pl-consigne">${x.consigne}</div><div class="pl-corps" id="pmfZ-${i}-${k}">${ouvert ? '' : plExoCorps(x, false)}</div>
      <div class="pn-bilan" id="pmfB-${i}-${k}"></div>
      ${corr && essaye ? `<div class="pmf-corr"><div class="cd-corr-montree"><span class="gicon">fact_check</span> Correction</div><div class="pl-corps">${plExoCorps(x, true)}</div></div>` : ''}</div>
    <div class="td-v-pied">
      ${ecran ? (ouvert ? `<button type="button" class="btn td-mini" data-pmfverif="${i}|${k}"><span class="gicon">task_alt</span> Vérifier</button>
          <button type="button" class="btn secondary td-mini" data-pmfeff="${i}|${k}"><span class="gicon">ink_eraser</span> Effacer</button>`
        : `<button type="button" class="btn td-mini" data-pmffaire="${i}|${k}"><span class="gicon">edit_square</span> ${r.etat ? 'Reprendre l\'exercice' : 'Faire l\'exercice'}</button>`)
        : (r.fini ? '' : `<button type="button" class="btn td-mini" data-pmffini="${i}|${k}"><span class="gicon">task_alt</span> J'ai fini dans mon cahier</button>`)}
      ${essaye ? `<button type="button" class="btn secondary td-mini" data-pmfcorr="${i}|${k}"><span class="gicon">${corr ? 'visibility_off' : 'fact_check'}</span> ${corr ? 'Cacher la correction' : 'Voir la correction'}</button>`
        : `<span class="hint pmf-attente"><span class="gicon">lock</span> correction après ton essai</span>`}
      ${typeof plVariable === 'function' && plVariable(plDe(lvl, c.t)[i].exos[k]) ? `<button type="button" class="btn secondary td-mini td-var" data-tdvar="${i}|${k}" title="Le même exercice avec d'autres nombres"><span class="gicon">autorenew</span> Autre version</button>` : ''}
    </div>`;
  if(ouvert) pmfMonter(i, k);
  if(typeof renderStaticMath === 'function') renderStaticMath(v);
}
function pmfMonter(i, k){
  const { lvl, c } = pmf, z = document.getElementById(`pmfZ-${i}-${k}`); if(!z) return;
  const x = plTdX(lvl, c, i, k), ref = pmfRef(lvl, c, i, k), r = pmf.lignes.get(ref) || {};
  const outil = plNum(z, x, { etat: r.etat || null, onChange: etat => {
    const b = document.getElementById(`pmfB-${i}-${k}`); if(b){ b.innerHTML = ''; b.className = 'pn-bilan'; }
    clearTimeout(pmf.saveT.get(ref)); pmf.saveT.set(ref, setTimeout(() => pmfSauver(i, k, { etat }), 900));
  } });
  if(outil) pmf.outils.set(`${i}|${k}`, outil);
  if(typeof renderStaticMath === 'function') renderStaticMath(z);
}
function pmfClic(e){
  const t = e.target, d = s => { const b = t.closest(`[data-${s}]`); return b ? b.getAttribute(`data-${s}`).split('|').map(Number) : null; };
  let a;
  if((a = d('pmffaire'))){ pmf.outils.set(a.join('|'), null); pmfVignette(...a); }
  else if((a = d('pmfverif'))){
    const o = pmf.outils.get(a.join('|')); if(!o) return;
    const res = o.verifier(), b = document.getElementById(`pmfB-${a[0]}-${a[1]}`);
    if(b){ b.className = 'pn-bilan ' + (res.juste === res.total ? 'ok' : 'ko'); b.innerHTML = plNumBilan(res); }
    const ref = pmfRef(pmf.lvl, pmf.c, a[0], a[1]), r = pmf.lignes.get(ref) || {};
    clearTimeout(pmf.saveT.get(ref));
    pmfSauver(a[0], a[1], { etat: o.etat(), juste: res.juste, total: res.total, meilleur: Math.max(r.meilleur || 0, res.juste), essais: (r.essais || 0) + 1 }).then(() => {
      // Première vérification : le bouton de correction apparaît (l'outil reste monté, avec ses marques).
      const v = document.getElementById(`tdv-${a[0]}-${a[1]}`), pied = v && v.querySelector('.pmf-attente');
      if(pied) pied.outerHTML = `<button type="button" class="btn secondary td-mini" data-pmfcorr="${a[0]}|${a[1]}"><span class="gicon">fact_check</span> Voir la correction</button>`;
    });
  }
  else if((a = d('pmfeff'))){ const o = pmf.outils.get(a.join('|')); if(o) o.effacer(); }
  else if((a = d('pmffini'))){ pmfSauver(a[0], a[1], { fini: true }).then(() => pmfVignette(...a)); }
  else if((a = d('pmfcorr'))){
    const v = document.getElementById(`tdv-${a[0]}-${a[1]}`), on = !v.classList.contains('pmf-corr-on');
    v.classList.toggle('pmf-corr-on', on);
    const o = pmf.outils.get(a.join('|')); if(o && o.fermer) o.fermer();
    pmf.outils.delete(a.join('|')); // l'exercice se rouvre avec ses réponses enregistrées
    if(on) pmfSauver(a[0], a[1], { correction_vue: true });
    pmfVignette(...a);
  }
  else if((a = d('tdvar'))){
    if(typeof plClavier !== 'undefined') plClavier.fermer();
    const cle = plTdCle(pmf.lvl, pmf.c, a[0], a[1]); plTdV[cle] = (plTdV[cle] || 0) + 1;
    pmf.outils.delete(a.join('|')); document.getElementById(`tdv-${a[0]}-${a[1]}`).classList.remove('pmf-corr-on'); pmfVignette(...a);
  }
  else if(t.closest('[data-tdorig]')){
    const b = t.closest('[data-tdorig]'), [i, k] = b.dataset.tdorig.split('|').map(Number);
    plTdV[plTdCle(pmf.lvl, pmf.c, i, k)] = 0; pmf.outils.delete(`${i}|${k}`); document.getElementById(`tdv-${i}-${k}`).classList.remove('pmf-corr-on'); pmfVignette(i, k);
  }
}
async function pmfSauver(i, k, champs){
  const { lvl, c } = pmf; if(!lvl || !c || typeof currentUser === 'undefined' || !currentUser) return;
  const x = plTdX(lvl, c, i, k), ref = pmfRef(lvl, c, i, k), avant = pmf.lignes.get(ref) || {};
  const ligne = Object.assign({ ecran: typeof plNumPossible === 'function' && plNumPossible(x), essais: 0, fini: false, correction_vue: false }, avant, champs, {
    enfant_id: currentUser.id, ref, niveau: lvl, chapitre: String(c.t).slice(0, 160), libelle: pmfLibelle(lvl, c, i, k).slice(0, 120), updated_at: new Date().toISOString() });
  delete ligne.created_at;
  pmf.lignes.set(ref, ligne);
  try{ const { error } = await sb.from('famille_manuel').upsert(ligne, { onConflict: 'enfant_id,ref' }); if(error) console.warn('famille_manuel', error.message); }
  catch(e){ /* hors ligne */ }
}
(function(){
  const st = document.createElement('style');
  st.textContent = `
    .pmf-vig .td-v-tete{ gap:6px; flex-wrap:wrap; }
    .pmf-vig .td-num{ margin:0 auto 0 4px; }
    .pmf-ok, .pmf-enc{ display:inline-flex; align-items:center; gap:3px; font:700 .72rem 'Space Grotesk',sans-serif; border-radius:999px; padding:1px 8px; }
    .pmf-ok{ color:#1F7A4D; background:#E7F5EE; } .pmf-ok .gicon{ font-size:15px; }
    .pmf-enc{ color:#8A5A00; background:#FFF4DE; }
    .pmf-attente{ display:inline-flex; align-items:center; gap:3px; margin:0 4px; } .pmf-attente .gicon{ font-size:15px; }
    .pmf-vig .td-v-pied{ flex-wrap:wrap; }
    .pmf-corr{ margin-top:10px; border-top:1px dashed #C9D3DF; padding-top:8px; }`;
  document.head.appendChild(st);
})();
