/* =====================================================================
   simulateur.js -- Simulateur de classe (L'Atelier du prof › Simulateur de classe).

   Demandé : « il serait intéressant pour un prof d'avoir un écran de test avec plusieurs simulations
   d'écran pour tester nos outils avant de plonger dans le grand bain en classe » ; et les élèves de
   test ne doivent plus apparaître dans les bilans.

   - Chaque professeur a jusqu'à trois élèves fictifs (Élève A, B, C), créés par la fonction serveur
     « simulateur » et rattachés à UNE de ses classes : ils reçoivent donc les devoirs, interrogations,
     sessions COURS et questions flash de cette classe.
   - L'écran du simulateur montre côte à côte la vue professeur (le site, avec la session du
     professeur) et les écrans des élèves fictifs. Chaque écran d'élève est le site ouvert avec
     ?simu=<élève> : il a sa propre session (rangée à part, voir app.js), obtenue du serveur sans
     mot de passe, pour les élèves fictifs du professeur seulement.
   - Dans un écran d'élève, passer d'une fenêtre à l'autre n'est pas une « sortie » ; le bouton
     « Simuler une sortie » en provoque une, pour voir l'alerte côté professeur.
   - Élèves tests (public.eleves_test) : signalés « (test) », en fin de liste ; exclus des bilans,
     moyennes, carnet de notes, décomptes de copies rendues et tirage au sort (elevesReels).
   ===================================================================== */

/* ---------- Élèves tests : repérage partout ---------- */
let elevesTestIds = new Set(), elevesTestT = 0, elevesTestP = null;
function elevesTestCharger(force){
  if(typeof currentUser === 'undefined' || !currentUser || !['prof', 'admin'].includes(currentUserRole)) return Promise.resolve(elevesTestIds);
  if(!force && elevesTestP && Date.now() - elevesTestT < 60000) return elevesTestP;
  elevesTestT = Date.now();
  elevesTestP = sb.from('eleves_test').select('student_id').then(({ data }) => { elevesTestIds = new Set((data || []).map(x => x.student_id)); return elevesTestIds; }).catch(() => elevesTestIds);
  return elevesTestP;
}
function estEleveTest(id){ return elevesTestIds.has(id); }
// Classe de simulation : visible seulement dans la fenêtre professeur du simulateur (qui ne voit qu'elle).
let classesSimuIds = new Set(), classesSimuP = null;
function classesSimuCharger(force){
  if(typeof currentUser === 'undefined' || !currentUser || !['prof', 'admin'].includes(currentUserRole)) return Promise.resolve(classesSimuIds);
  if(!force && classesSimuP) return classesSimuP;
  classesSimuP = sb.from('classes_test').select('class_id').then(({ data }) => { classesSimuIds = new Set((data || []).map(x => x.class_id)); return classesSimuIds; }).catch(() => classesSimuIds);
  return classesSimuP;
}
function classeVisible(id){ return (typeof SIMPROF !== 'undefined' && SIMPROF) ? classesSimuIds.has(id) : !classesSimuIds.has(id); }
function elevesReels(liste){ return (liste || []).filter(e => !e.test && !estEleveTest(e.id)); }

/* ---------- Côté écran d'élève (page ouverte avec ?simu=) ---------- */
if(typeof SIMU !== 'undefined' && SIMU){
  window.addEventListener('message', async e => {
    if(e.origin !== location.origin || !e.data) return;
    if(e.data.type === 'simu-session'){ try{ await sb.auth.setSession({ access_token: e.data.access_token, refresh_token: e.data.refresh_token }); }catch(err){ console.warn(err); } }
    if(e.data.type === 'simu-sortie') simuSortie();
  });
  // Passer d'un écran à l'autre du simulateur n'est pas une sortie (fenêtre quittée / plein écran).
  window.addEventListener('load', () => {
    // Dans le simulateur, une sortie n'est signalée que par le bouton « Simuler une sortie ».
    if(typeof cdSignaler === 'function'){ const orig = cdSignaler; cdSignaler = function(dehors, motif){ if(dehors && motif !== 'sortie simulée') return; return orig.apply(this, arguments); }; }
    try{ parent.postMessage({ type: 'simu-pret', simu: SIMU }, location.origin); }catch(err){}
  });
}
// Sortie simulée (bouton du simulateur) : session COURS, interrogation chronométrée.
function simuSortie(){
  if(typeof cdE !== 'undefined' && cdE && typeof cdSignaler === 'function'){ cdSignaler(true, 'sortie simulée'); return; }
  if(typeof qzP !== 'undefined' && qzP && qzP.onVis && qzP.copie){
    qzP.sortieDebut = Date.now() - 5000;
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    qzP.onVis();
    delete document.hidden;
  }
}

/* ---------- Côté professeur : l'écran du simulateur ---------- */
const sim = { eleves: [], classe: null, niveau: null, nb: 3, disposition: 'prof', grand: null };
const SIM_NIVEAUX = ['cm1', 'cm2', '6e', '5e', '4e', '3e'];
async function simAppel(body){
  const { data: { session } } = await sb.auth.getSession();
  if(!session) throw new Error('Connectez-vous d\'abord.');
  const res = await fetch(SUPABASE_URL + '/functions/v1/simulateur', { method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token, 'apikey': SUPABASE_ANON_KEY }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({ error: 'Réponse illisible du serveur.' }));
  if(data.error) throw new Error(data.error);
  return data;
}
async function simOuvrir(){
  if(typeof SIMU !== 'undefined' && (SIMU || SIMPROF)) return; // pas de simulateur dans le simulateur
  showView('view-simulateur'); if(typeof setActiveTopnav === 'function') setActiveTopnav(null);
  const root = document.getElementById('simRoot');
  root.innerHTML = '<p class="hint">Chargement…</p>';
  try{ const r = await simAppel({ action: 'etat' }); sim.eleves = r.eleves || []; sim.classe = r.classe || null; }catch(e){ root.innerHTML = `<p class="hint">Erreur : ${escapeHtml(e.message)}</p>`; return; }
  const act = (accountClassesList || []).find(c => c.id === currentClassId);
  if(!sim.niveau) sim.niveau = sim.classe ? sim.classe.niveau : (act && SIM_NIVEAUX.includes(String(act.niveau).toLowerCase()) ? String(act.niveau).toLowerCase() : '6e');
  if(sim.eleves.length && !sim.nbChoisi) sim.nb = Math.min(3, sim.eleves.length);
  simRendre();
}
function simRendre(){
  const root = document.getElementById('simRoot'); if(!root) return;
  const nivTxt = n => typeof niveauLabel === 'function' ? niveauLabel(n) : n.toUpperCase();
  const dansClasse = e => sim.classe && e.classes.some(c => c.id === sim.classe.id);
  const pret = sim.classe && sim.classe.niveau === sim.niveau && sim.eleves.length >= sim.nb && sim.eleves.slice(0, sim.nb).every(dansClasse) && sim.eleves.every(e => e.classes.length === 1);
  root.innerHTML = `
    <span class="back-btn" data-nav="home" onclick="showView('view-home')">← Accueil</span>
    <h1 style="margin:6px 0 4px;"><span class="gicon">devices</span> Simulateur de classe</h1>
    <p style="color:var(--ink-soft);max-width:80ch;">Testez vos outils comme en classe, avant les élèves : votre écran de professeur et ceux de un à trois élèves fictifs, côte à côte. Tout se passe dans une <b>classe de simulation</b> à vous, « Simulation » : dans la fenêtre professeur, c'est la seule classe visible ; ailleurs sur le site, elle n'apparaît jamais. Ce que vous y créez (interrogations, devoirs, sessions) ne touche donc aucune vraie classe.</p>
    <div class="sim-prep">
      <div><b>1. Niveau de la classe de simulation</b>
        <div class="qz-cl-chips" style="margin:6px 0 0;">${SIM_NIVEAUX.map(n => `<button class="${n === sim.niveau ? 'on' : ''}" onclick="sim.niveau='${n}';simRendre()">${nivTxt(n)}</button>`).join('')}</div>
        <p class="hint" style="margin:4px 0 0;">Pour voir les chapitres, devoirs et interrogations de ce niveau.</p></div>
      <div><b>2. Nombre d'élèves</b>
        <div class="qz-cl-chips" style="margin:6px 0 0;">${[1, 2, 3].map(n => `<button class="${n === sim.nb ? 'on' : ''}" onclick="sim.nb=${n};sim.nbChoisi=true;simRendre()">${n}</button>`).join('')}</div></div>
      <div><b>3. Disposition</b>
        <div class="qz-cl-chips" style="margin:6px 0 0;"><button class="${sim.disposition === 'prof' ? 'on' : ''}" onclick="sim.disposition='prof';simRendre()">Professeur + élèves</button><button class="${sim.disposition === 'eleves' ? 'on' : ''}" onclick="sim.disposition='eleves';simRendre()">Élèves seulement</button></div></div>
      <div class="sim-go">${pret ? `<button class="btn" onclick="simLancer()"><span class="gicon">play_arrow</span> Lancer la simulation</button>`
        : `<button class="btn" onclick="simPreparer()"><span class="gicon">person_add</span> Préparer la classe de simulation (${nivTxt(sim.niveau)}, ${sim.nb} élève${sim.nb > 1 ? 's' : ''})</button>`}
        ${sim.eleves.length ? `<button class="btn secondary" style="color:#a83c1f;" onclick="simSupprimer()" title="Supprime la classe de simulation, vos élèves fictifs et tout ce qui s'y trouve"><span class="gicon">delete</span></button>` : ''}
        <span class="hint" id="simEtat" style="margin:0;">${sim.classe ? `Classe « ${escapeHtml(sim.classe.nom)} » (${nivTxt(sim.classe.niveau)}) · élèves fictifs : ${sim.eleves.map(e => 'Élève ' + e.lettre).join(', ') || 'aucun'}.` : ''}</span></div>
    </div>
    <div id="simScene"></div>`;
}
async function simPreparer(){
  const et = document.getElementById('simEtat'); if(et) et.textContent = 'Préparation de la classe de simulation…';
  try{ const r = await simAppel({ action: 'preparer', niveau: sim.niveau, nb: sim.nb }); sim.eleves = r.eleves || []; sim.classe = r.classe || null; }
  catch(e){ if(et) et.textContent = 'Erreur : ' + e.message; return; }
  elevesTestCharger(true); classesSimuCharger(true);
  simRendre();
}
async function simSupprimer(){
  if(!(await niceConfirm('Supprimer la classe de simulation et vos élèves fictifs ? Tout ce qui s\'y trouve (interrogations, devoirs, sessions, copies, résultats) est supprimé. Vous pourrez la recréer quand vous voulez.'))) return;
  let r; try{ r = await simAppel({ action: 'supprimer' }); }catch(e){ await niceAlert('Erreur : ' + e.message); return; }
  if(r && r.classe) await niceAlert('Élèves fictifs supprimés ; classe de simulation ' + r.classe);
  sim.eleves = []; sim.classe = null; elevesTestCharger(true); classesSimuCharger(true); simRendre();
}
function simLancer(){
  const sc = document.getElementById('simScene'); if(!sc) return;
  const eleves = sim.eleves.slice(0, sim.nb), base = location.pathname;
  const cadre = (id, titre, src, cls) => `<div class="sim-ecran ${cls}" id="sim-${id}"><div class="sim-barre"><b>${titre}</b><span style="flex:1"></span>
      ${id !== 'prof' ? `<button class="btn secondary qz-mini" onclick="simSortieEleve('${id}')" title="Comme si l'élève passait sur un autre onglet"><span class="gicon">logout</span> Simuler une sortie</button>` : ''}
      <button class="btn secondary qz-mini" onclick="simRecharger('${id}')" title="Recharger cet écran"><span class="gicon">refresh</span></button>
      <button class="btn secondary qz-mini" onclick="simGrand('${id}')" title="Agrandir / réduire"><span class="gicon">${sim.grand === id ? 'close_fullscreen' : 'open_in_full'}</span></button></div>
    <div class="sim-cadre"><iframe src="${src}" data-sim="${id}" allow="clipboard-write; fullscreen 'none'" title="${titre}"></iframe></div></div>`;
  sc.innerHTML = `<div class="sim-outils"><button class="btn secondary" onclick="simPleinEcran()"><span class="gicon">fullscreen</span> Plein écran</button>
      <button class="btn secondary" onclick="simArreter()"><span class="gicon">stop</span> Arrêter la simulation</button>
      <span class="hint" style="margin:0;">Astuce : dans la fenêtre professeur, ouvrez une session COURS (Cahier de corrections) ou des questions flash : le bandeau « Rejoindre » apparaît chez les élèves fictifs.</span></div>
    <div class="sim-grille ${sim.disposition}${sim.grand ? ' grand' : ''}">
      ${sim.disposition === 'prof' ? cadre('prof', '<span class="gicon">school</span> Professeur (vous) · classe de simulation', base + '?simprof=' + eleves.map(e => e.student_id).join(',') + '#/', 'prof') : ''}
      <div class="sim-eleves n${eleves.length}">${eleves.map(e => cadre(e.student_id, `<span class="gicon">person</span> Élève ${e.lettre} <small>(test)</small>`, `${base}?simu=${e.student_id}#/`, 'eleve')).join('')}</div></div>`;
  simAjuster();
  window.addEventListener('resize', simAjuster);
  sc.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// Chaque écran garde une vraie taille d'ordinateur (1280 px de large) et s'affiche réduit.
function simAjuster(){
  document.querySelectorAll('.sim-cadre').forEach(c => {
    const f = c.querySelector('iframe'); if(!f) return;
    const l = c.clientWidth, z = Math.min(1, l / 1280);
    f.style.width = (l / z) + 'px'; f.style.height = (c.clientHeight / z) + 'px'; f.style.transform = `scale(${z})`;
  });
}
// Un écran d'élève est prêt : on lui donne sa session (jamais celle du professeur).
window.addEventListener('message', async e => {
  if(e.origin !== location.origin || !e.data || e.data.type !== 'simu-pret' || !sim.eleves.some(x => x.student_id === e.data.simu)) return;
  try{ const s = await simAppel({ action: 'session', student_id: e.data.simu }); e.source.postMessage({ type: 'simu-session', access_token: s.access_token, refresh_token: s.refresh_token }, location.origin); }
  catch(err){ const b = document.querySelector(`#sim-${CSS.escape(e.data.simu)} .sim-barre b`); if(b) b.insertAdjacentHTML('beforeend', ` <span class="bl-rouge">${escapeHtml(err.message)}</span>`); }
});
function simCadre(id){ return document.querySelector(`iframe[data-sim="${CSS.escape(id)}"]`); }
function simSortieEleve(id){ const f = simCadre(id); if(f) f.contentWindow.postMessage({ type: 'simu-sortie' }, location.origin); }
function simRecharger(id){ const f = simCadre(id); if(f) f.contentWindow.location.reload(); }
function simGrand(id){
  sim.grand = sim.grand === id ? null : id;
  document.querySelectorAll('.sim-ecran').forEach(x => x.classList.toggle('agrandi', x.id === 'sim-' + sim.grand));
  document.querySelector('.sim-grille')?.classList.toggle('grand', !!sim.grand);
  document.querySelectorAll('.sim-ecran').forEach(x => { const b = x.querySelector('[onclick^="simGrand"] .gicon'); if(b) b.textContent = x.id === 'sim-' + sim.grand ? 'close_fullscreen' : 'open_in_full'; });
  setTimeout(simAjuster, 30);
}
function simPleinEcran(){
  const v = document.getElementById('view-simulateur');
  if(document.fullscreenElement) document.exitFullscreen().catch(() => {}); else if(v && v.requestFullscreen) v.requestFullscreen().then(() => setTimeout(simAjuster, 200)).catch(() => {});
}
function simArreter(){ const sc = document.getElementById('simScene'); if(sc) sc.innerHTML = ''; sim.grand = null; window.removeEventListener('resize', simAjuster); }

(function(){
  const st = document.createElement('style');
  st.textContent = `
    html.simu-frame #aideBtn, html.simu-frame #aideBulle, html.simu-frame [data-nav="simulateur"]{display:none !important;}
    #view-simulateur{max-width:none;}
    #view-simulateur:fullscreen{background:var(--bg, #FBF8F2);overflow:auto;padding:12px;}
    .sim-prep{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px 18px;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:14px;padding:12px 16px;margin:10px 0 14px;}
    .sim-go{grid-column:1 / -1;display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
    .sim-outils{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:0 0 10px;}
    .sim-grille{display:grid;gap:12px;margin-left:calc(50% - 50vw + 16px);margin-right:calc(50% - 50vw + 16px);}
    #view-simulateur:fullscreen .sim-grille{margin:0;}
    .sim-grille.prof{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);}
    .sim-eleves{display:grid;gap:12px;} .sim-grille.eleves .sim-eleves.n2{grid-template-columns:1fr 1fr;} .sim-grille.eleves .sim-eleves.n3{grid-template-columns:1fr 1fr 1fr;}
    .sim-ecran{background:#fff;border:2px solid rgba(28,43,57,.12);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;min-width:0;}
    .sim-ecran.prof{border-color:#1F3A5C;} .sim-ecran.eleve{border-color:#8DB84A;}
    .sim-barre{display:flex;align-items:center;gap:6px;padding:5px 8px;background:#F3F5F8;font-family:'Space Grotesk',sans-serif;} .sim-barre .gicon{font-size:17px;vertical-align:middle;}
    .sim-ecran.prof .sim-barre{background:#1F3A5C;color:#fff;} .sim-ecran.prof .sim-barre .btn{background:rgba(255,255,255,.16) !important;color:#fff !important;border-color:transparent !important;} .sim-ecran.eleve .sim-barre{background:#F1F8E6;}
    .sim-cadre{position:relative;overflow:hidden;height:72vh;}
    .sim-grille.prof .sim-eleves .sim-cadre{height:calc((72vh - ${2} * 12px - 3 * 34px) / 3);min-height:220px;}
    .sim-grille.prof .sim-eleves.n1 .sim-cadre{height:72vh;} .sim-grille.prof .sim-eleves.n2 .sim-cadre{height:calc(36vh - 23px);}
    .sim-grille.eleves .sim-cadre{height:76vh;}
    .sim-cadre iframe{position:absolute;top:0;left:0;border:0;transform-origin:0 0;background:#fff;}
    .sim-grille.grand .sim-ecran:not(.agrandi){display:none;} .sim-grille.grand{grid-template-columns:1fr !important;} .sim-grille.grand .sim-eleves{grid-template-columns:1fr !important;}
    .sim-grille.grand .sim-ecran.agrandi .sim-cadre{height:82vh;}
  `;
  document.head.appendChild(st);
})();
