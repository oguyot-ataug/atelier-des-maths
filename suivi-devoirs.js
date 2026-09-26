/* =====================================================================
   SUIVI-DEVOIRS.JS -- Tentatives et temps de travail RÉEL sur les devoirs
   Demandé : "Dans les résultats des devoirs, est-ce qu'on peut voir le nombre de tentatives
   des élèves et le temps passé réellement dessus ?" -- puis : "L'élève peut être en pause une
   minute facilement sur un Objectif Nombre ! Il cherche, ce n'est pas facile. Pour les
   automatismes, ok."

   Chaque séance de travail d'un élève sur un devoir (une tentative de séquence d'automatismes,
   un compte d'Objectif Nombre, une séance dans l'outil de figure) est une ligne de
   devoir_sessions. Le temps ACTIF n'avance que si :
     - l'onglet est visible (changer d'onglet ou d'application met en pause),
     - l'activité est à l'écran (modale d'automatismes ouverte, vue Objectif Nombre affichée,
       outil de figure ouvert),
     - l'élève n'est pas inactif depuis trop longtemps : 1 minute pour les automatismes (des
       calculs rapides), 5 minutes pour Objectif Nombre et les figures (chercher sans toucher
       à rien fait partie du travail).
   Quand l'élève dépasse ce seuil (vraiment parti), l'attente déjà comptée depuis sa dernière
   action est retirée. Une séance quittée sans être finie est « abandonnée ». Le temps est enregistré toutes les
   20 secondes : fermer brutalement la page ne fait perdre que les dernières secondes.
   Ne concerne que les élèves (jamais le test d'un devoir par le professeur).
   ===================================================================== */

const DS_IDLE_MS = { automatismes: 60*1000, compte_est_bon: 5*60*1000, figure: 5*60*1000 };
const DS_FLUSH_MS = 20*1000;
const dsOpen = new Set();   // séances en cours dans cette page
let dsLastInput = performance.now();

function dsEnabled(){
  return typeof currentUserRole!=='undefined' && currentUserRole==='eleve' && typeof currentUser!=='undefined' && currentUser
    && !(typeof devoirTestModeActive!=='undefined' && devoirTestModeActive);
}

/* Ouvre une séance. isActive() dit si l'activité est à l'écran. */
function dsStart(kind, devoirId, item, isActive){
  if(!dsEnabled() || !devoirId) return null;
  const now = performance.now();
  const s = { kind, devoirId, item: item==null ? null : String(item), isActive, id: null, activeMs: 0, actions: 0,
    lastTick: now, flushed: -1, statut: 'en_cours', pending: null, sinceInput: 0, idleCut: false };
  s.pending = sb.from('devoir_sessions').insert({ devoir_id: devoirId, student_id: currentUser.id, kind, item: s.item })
    .select('id').single()
    .then(({ data, error })=>{ if(error) throw error; s.id = data.id; })
    .catch(e=>{ console.warn('suivi devoir :', e); s.failed = true; });
  dsOpen.add(s);
  return s;
}
function dsTick(s, now){
  const dt = Math.min(now - s.lastTick, 2000); // un minuteur ralenti (onglet en arrière-plan) ne compte pas en bloc
  s.lastTick = now;
  if(document.visibilityState!=='visible') return;
  if(now - dsLastInput > (DS_IDLE_MS[s.kind] || 60000)){
    // Vraiment parti : l'attente déjà comptée depuis sa dernière action est retirée aussi.
    if(!s.idleCut){ s.activeMs = Math.max(0, s.activeMs - s.sinceInput); s.idleCut = true; }
    return;
  }
  let on = true;
  try{ on = !s.isActive || !!s.isActive(); }catch(e){ on = false; }
  if(on && dt>0){ s.activeMs += dt; s.sinceInput += dt; }
}
async function dsFlush(s){
  if(s.failed) return;
  if(s.pending) await s.pending;
  if(!s.id || s.failed) return;
  const ms = Math.round(s.activeMs);
  const key = ms + '|' + s.actions + '|' + s.statut;
  if(key===s.flushed) return;
  s.flushed = key;
  const { error } = await sb.from('devoir_sessions').update({ active_ms: ms, actions: s.actions, statut: s.statut }).eq('id', s.id);
  if(error){ console.warn('suivi devoir :', error); s.flushed = -1; }
}
/* Ferme une séance : 'terminee' (validée, rendue) ou 'abandonnee' (quittée sans finir). */
function dsEnd(s, statut){
  if(!s || !dsOpen.has(s)) return;
  dsTick(s, performance.now());
  s.statut = statut || 'terminee';
  dsOpen.delete(s);
  return dsFlush(s);
}
function dsAction(s){ if(s && dsOpen.has(s)) s.actions++; }

// Horloge commune : temps actif à la seconde, enregistrement périodique.
setInterval(()=>{ const now = performance.now(); dsOpen.forEach(s=>dsTick(s, now)); }, 1000);
setInterval(()=>{ dsOpen.forEach(s=>dsFlush(s)); }, DS_FLUSH_MS);
function dsOnInput(){ dsLastInput = performance.now(); dsOpen.forEach(s=>{ s.sinceInput = 0; s.idleCut = false; }); }
['pointerdown','pointermove','keydown','wheel','touchstart','input'].forEach(ev=>
  document.addEventListener(ev, dsOnInput, { passive: true, capture: true }));
document.addEventListener('visibilitychange', ()=>{
  const now = performance.now();
  dsOpen.forEach(s=>{ dsTick(s, now); if(document.visibilityState==='hidden') dsFlush(s); });
  if(document.visibilityState==='visible') dsOnInput(); // revenir sur l'onglet = reprendre
});

/* ---------- Automatismes ---------- */
let dsCM = null;
function dsCMStart(){
  if(dsCM) dsEnd(dsCM, 'abandonnee'); // « Recommencer » sans avoir validé
  dsCM = (typeof currentDevoirCM!=='undefined' && currentDevoirCM)
    ? dsStart('automatismes', currentDevoirCM.devoirId, currentCMSeq && currentCMSeq.id,
        ()=>{ const o = document.getElementById('cmExerciseModalOverlay'); return !!o && o.style.display!=='none'; })
    : null;
}
function dsCMEnd(statut){ if(dsCM){ dsEnd(dsCM, statut); dsCM = null; } }

/* ---------- Objectif Nombre ---------- */
let dsCEB = null;
function dsCEBStart(){
  if(dsCEB) dsEnd(dsCEB, 'abandonnee'); // nouveau compte alors que le précédent n'était pas validé
  dsCEB = (typeof currentDevoirCEB!=='undefined' && currentDevoirCEB)
    ? dsStart('compte_est_bon', currentDevoirCEB.devoirId, currentDevoirCEB.roundIndex, ()=>{
        const v = document.getElementById('view-compte');
        return !!v && v.classList.contains('active') && typeof cebState!=='undefined' && cebState && !cebState.finished;
      })
    : null;
}
function dsCEBEnd(statut){ if(dsCEB){ dsEnd(dsCEB, statut); dsCEB = null; } }

/* ---------- Figures ---------- */
let dsFig = null;
function dsFigStart(devoirId){
  if(dsFig) dsEnd(dsFig, 'terminee');
  dsFig = dsStart('figure', devoirId, null, ()=>{
    const p = document.getElementById('figurePanel'), o = document.getElementById('toolsModalOverlay');
    return !!p && p.style.display!=='none' && !!o && o.style.display!=='none';
  });
}
function dsFigSaved(){ dsAction(dsFig); if(dsFig) dsFlush(dsFig); }
function dsFigEnd(){ if(dsFig){ dsEnd(dsFig, 'terminee'); dsFig = null; } }

/* ---------- Lecture côté professeur ---------- */
const DS_STALE_MS = 10*60*1000; // « en cours » sans nouvelle depuis 10 min = abandonnée
async function dsLoadForDevoir(devoirId){
  const { data, error } = await sb.from('devoir_sessions').select('student_id,kind,item,active_ms,actions,statut,updated_at').eq('devoir_id', devoirId);
  if(error){ console.warn('suivi devoir :', error); return null; }
  const now = Date.now();
  const byStudent = new Map();
  (data||[]).forEach(r=>{
    const abandon = r.statut==='abandonnee' || (r.statut==='en_cours' && now - new Date(r.updated_at).getTime() > DS_STALE_MS);
    if(!byStudent.has(r.student_id)) byStudent.set(r.student_id, []);
    byStudent.get(r.student_id).push(Object.assign({}, r, { abandon, enCours: r.statut==='en_cours' && !abandon }));
  });
  return byStudent;
}
/* Résumé d'un ensemble de séances (d'un élève, éventuellement d'un seul item). */
function dsSummary(sessions, item){
  const list = (sessions||[]).filter(s=>item===undefined || String(s.item)===String(item));
  return {
    n: list.length,
    abandons: list.filter(s=>s.abandon).length,
    enCours: list.filter(s=>s.enCours).length,
    activeMs: list.reduce((t,s)=>t + (s.active_ms||0), 0),
    actions: list.reduce((t,s)=>t + (s.actions||0), 0),
  };
}
function dsFormatMs(ms){
  if(!ms) return '0 s';
  const s = Math.round(ms/1000);
  if(s<60) return s+' s';
  const m = Math.floor(s/60), r = s%60;
  if(m<60) return m+' min '+String(r).padStart(2,'0')+' s';
  return Math.floor(m/60)+' h '+String(m%60).padStart(2,'0');
}
