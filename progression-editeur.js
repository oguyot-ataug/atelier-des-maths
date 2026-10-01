/* =====================================================================
   PROGRESSION-EDITEUR.JS -- « Ma progression » sur une échelle de temps verticale.
   Demandé : « on pourrait la rendre plus sexy. Imaginons une échelle de temps verticale. On
   pourrait déplacer nos blocs, les étirer et les réduire quand on modifie. Plutôt que d'éditer
   les dates. Bien évidemment toujours avec l'idée de déplacer et recalculer l'ensemble. »

   Principe : l'année est découpée en SEMAINES DE CLASSE (les semaines de vacances de la zone du
   professeur sont retirées de l'échelle et affichées comme des bandeaux). Chaque chapitre est un
   bloc dont la hauteur est sa durée, au demi-semaine près. Les blocs se suivent sans trou : en
   déplacer un ou changer sa durée recalcule toutes les dates qui suivent.
     - glisser la poignée ⠿ d'un bloc : changer sa place dans l'année ;
     - tirer la languette du bas : allonger ou raccourcir le chapitre ;
     - cliquer un bloc : le sélectionner (boutons ▲ ▼ − + et renommer, utilisables au clavier).
   Les données restent celles de l'ancien éditeur (progEditorItems et saveProgression, app.js) :
   seules les dates de début et de fin sont recalculées à chaque modification.
   ===================================================================== */
const PE_H = 44, PE_VAC = 50;             // hauteur d'une semaine de classe, d'un bandeau de vacances (px)
const PE_FIN_ANNEE = '2027-07-02';        // dernier jour de classe affiché (vendredi 2 juillet 2027)
let pe = { weeks: [], bands: [], weekY: [], start: 0, sel: -1, drag: null };

function peIso(d){ return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function peJour(iso){ return new Date(iso + 'T00:00:00'); }
function peTxt(d){ return d.getDate() + ' ' + FR_MONTHS_REV[d.getMonth()]; }
function peAdd(d, n){ const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }

/* Semaines de classe de l'année (lundis), sans les semaines de vacances de la zone. */
function peCalendrier(){
  const vac = getVacancesForZone(progUserZone);
  const weeks = [], bands = [];
  let lundi = peJour(FRISE_YEAR_START + '-08-31'); // lundi de la semaine de la rentrée (mardi 1er septembre)
  const fin = peJour(PE_FIN_ANNEE);
  let enVac = null;
  while(lundi <= fin){
    const v = vac.find(v => lundi >= peJour(v.debut) && lundi < peJour(v.fin));
    if(v){ enVac = v; }
    else {
      if(enVac){ bands.push({ avant: weeks.length, vac: enVac }); enVac = null; }
      weeks.push(new Date(lundi.getTime()));
    }
    lundi = peAdd(lundi, 7);
  }
  pe.weeks = weeks; pe.bands = bands;
  // Position verticale du début de chaque semaine (bandeaux de vacances compris), et quelques
  // semaines « hors année » à la suite pour voir un dépassement.
  pe.weekY = [];
  let y = 0;
  for(let i = 0; i <= weeks.length + 8; i++){
    if(bands.some(b => b.avant === i)) y += PE_VAC;
    pe.weekY.push(y);
    y += PE_H;
  }
}
function peLundi(i){ return i < pe.weeks.length ? pe.weeks[i] : peAdd(pe.weeks[pe.weeks.length - 1], 7 * (i - pe.weeks.length + 1)); }
function peY(off){ const i = Math.min(Math.floor(off), pe.weekY.length - 1); return pe.weekY[i] + (off - i) * PE_H; }
function peOffDeY(y){ // inverse de peY (approché à l'intérieur d'une semaine)
  let i = 0; while(i + 1 < pe.weekY.length && pe.weekY[i + 1] <= y) i++;
  return i + Math.max(0, Math.min(1, (y - pe.weekY[i]) / PE_H));
}
// Semaine (index) d'une date : celle qui la contient, sinon la suivante (date pendant des vacances).
function peSemaine(d, versApres){
  for(let i = 0; i < pe.weeks.length; i++){ const l = pe.weeks[i]; if(d >= l && d < peAdd(l, 7)) return { i, dedans: true }; if(l > d) return { i: versApres ? i : Math.max(0, i - 1), dedans: false }; }
  return { i: pe.weeks.length - 1, dedans: false };
}
function peOffDebut(d){ if(!d) return null; const s = peSemaine(d, true); return s.i + (s.dedans && d.getDay() >= 4 ? .5 : 0); }
function peOffFin(d){ if(!d) return null; const s = peSemaine(d, false); return s.i + (!s.dedans ? 1 : (d.getDay() >= 1 && d.getDay() <= 3 ? .5 : 1)); }
function peDateDebut(off){ const i = Math.floor(off); let d = peAdd(peLundi(i), off - i >= .5 ? 3 : 0); const r = peJour(FRISE_YEAR_START + '-09-01'); return d < r ? r : d; }
function peDateFin(off){ const i = Math.floor(off); return off - i >= .5 ? peAdd(peLundi(i), 2) : peAdd(peLundi(i - 1), 4); }

/* Durées (en semaines de classe) et début, lus une fois dans les dates des chapitres. */
function peInitDurees(){
  const its = progEditorItems;
  if(its.length && its.every(it => it._d)) return;
  its.forEach(it => {
    const a = peOffDebut(it.dateDebut), b = peOffFin(it.dateFin);
    it._d = (a != null && b != null && b > a) ? Math.max(.5, Math.round((b - a) * 2) / 2) : Math.max(.5, Number(it.s) || 1);
  });
  const premier = its[0] && peOffDebut(its[0].dateDebut);
  pe.start = premier != null ? Math.max(0, Math.min(6, premier)) : 0;
  pe.sel = -1;
}
/* Dates recalculées : les chapitres se suivent sans trou à partir du début choisi. */
function peRecalculer(){
  let off = pe.start;
  progEditorItems.forEach(it => { it._off = off; it.dateDebut = peDateDebut(off); it.dateFin = peDateFin(off + it._d); off += it._d; });
  return off;
}

function peRender(){
  const box = document.getElementById('progressionList'); if(!box) return;
  peCalendrier(); peInitDurees();
  const fin = peRecalculer(), dispo = pe.weeks.length;
  const H = pe.weekY[Math.min(pe.weekY.length - 1, Math.max(dispo, Math.ceil(fin)) + 1)] + 10;
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  let axe = '';
  pe.weeks.forEach((l0, i) => {
    const l = i === 0 ? peJour(FRISE_YEAR_START + '-09-01') : l0; // la rentrée est un mardi : on affiche 1er septembre
    const nouveauMois = i === 0 || l0.getMonth() !== (i === 1 ? 8 : pe.weeks[i - 1].getMonth());
    axe += `<div class="pe-sem${nouveauMois ? ' mois' : ''}" style="top:${pe.weekY[i]}px;height:${PE_H}px;">${nouveauMois ? `<b>${mois[l.getMonth()]}</b>` : ''}<span>${l.getDate()}</span></div>`;
  });
  const bandes = pe.bands.map(b => `<div class="pe-vac" style="top:${pe.weekY[b.avant] - PE_VAC + 3}px;height:${PE_VAC - 6}px;"><span class="gicon">beach_access</span><b>${escapeHtml(b.vac.label)}</b><span class="pe-vac-dates">${formatDateRangeFr(peJour(b.vac.debut), peJour(b.vac.fin))}</span></div>`).join('');
  const finAnnee = `<div class="pe-fin" style="top:${pe.weekY[dispo]}px;">Fin de l'année · vendredi 2 juillet</div>` + (fin > dispo ? `<div class="pe-hors" style="top:${pe.weekY[dispo]}px;height:${peY(fin) - pe.weekY[dispo]}px;"></div>` : '');
  const blocs = progEditorItems.map((it, i) => {
    const c = (CATS[it.cat] || {}).text || '#999', h = peY(it._off + it._d) - peY(it._off) - 3, nom = it.nomPerso || it.titre;
    return `<div class="pe-bloc${pe.sel === i ? ' sel' : ''}${h < 30 ? ' mini' : ''}" data-i="${i}" style="top:${peY(it._off) + 1}px;height:${h}px;--c:${c};" onclick="peSelect(${i})" tabindex="0" onkeydown="peClavier(event,${i})">
      <span class="pe-poignee" title="Glisser pour déplacer le chapitre" onpointerdown="peDebutDeplacer(event,${i})">⠿</span>
      <div class="pe-txt"><b class="${it.nomPerso ? 'perso' : ''}">${escapeHtml(nom)}</b> <span class="pe-code">${escapeHtml(it.code || '')}</span>
        <div class="pe-dates">${formatDateRangeFr(it.dateDebut, it.dateFin)} · ${String(it._d).replace('.', ',')} sem.</div></div>
      <span class="pe-etirer" title="Tirer pour allonger ou raccourcir" onpointerdown="peDebutEtirer(event,${i})"></span>
    </div>`;
  }).join('');
  const s = pe.sel >= 0 ? progEditorItems[pe.sel] : null;
  const debutOpts = [0, .5, 1, 1.5, 2, 3].map(o => `<option value="${o}" ${pe.start === o ? 'selected' : ''}>${peTxt(peDateDebut(o))}</option>`).join('');
  box.innerHTML = `
    <div class="pe-barre">
      <span class="pe-total ${fin > dispo ? 'trop' : ''}"><span class="gicon">${fin > dispo ? 'warning' : 'event_available'}</span>
        ${String(Math.round((fin - pe.start) * 2) / 2).replace('.', ',')} semaines de cours sur ${String(dispo - pe.start).replace('.', ',')} disponibles · fin le <b>${peTxt(peDateFin(fin))}</b>${fin > dispo ? ' : raccourcissez des chapitres' : fin < dispo ? ' · ' + String(dispo - fin).replace('.', ',') + ' sem. libre(s)' : ''}</span>
      <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;">Premier chapitre le <select onchange="pe.start=parseFloat(this.value);peRender()">${debutOpts}</select></label>
    </div>
    <div class="pe-outils">${s ? `<b>${escapeHtml(s.nomPerso || s.titre)}</b>
        <button class="btn secondary" onclick="peDeplacer(${pe.sel},-1)" ${pe.sel === 0 ? 'disabled' : ''} title="Avancer dans l'année">▲</button>
        <button class="btn secondary" onclick="peDeplacer(${pe.sel},1)" ${pe.sel === progEditorItems.length - 1 ? 'disabled' : ''} title="Reculer dans l'année">▼</button>
        <span class="pe-duree"><button class="btn secondary" onclick="peDuree(${pe.sel},-.5)" ${s._d <= .5 ? 'disabled' : ''}>−</button> ${String(s._d).replace('.', ',')} sem. <button class="btn secondary" onclick="peDuree(${pe.sel},.5)">+</button></span>
        <button class="btn secondary" onclick="peRenommer(${pe.sel})"><span class="gicon">edit</span> Renommer</button>`
      : '<span class="hint" style="margin:0;"><span class="gicon">touch_app</span> Glissez la poignée ⠿ pour déplacer un chapitre, tirez le bas d\'un bloc pour changer sa durée, ou cliquez un bloc pour le régler au demi-semaine près.</span>'}</div>
    <div class="pe-zone" style="height:${H}px;"><div class="pe-axe">${axe}</div><div class="pe-piste">${finAnnee}${blocs}</div>${bandes}</div>`;
}
function peSelect(i){ if(pe.drag) return; pe.sel = pe.sel === i ? -1 : i; peRender(); }
function peDeplacer(i, d){ const j = i + d, t = progEditorItems; if(j < 0 || j >= t.length) return; [t[i], t[j]] = [t[j], t[i]]; pe.sel = j; peRender(); }
function peDuree(i, d){ const it = progEditorItems[i]; it._d = Math.max(.5, Math.min(12, it._d + d)); peRender(); }
async function peRenommer(i){
  const it = progEditorItems[i];
  const n = await nicePrompt('Nom du chapitre dans votre progression (laisser vide pour le nom d\'origine) :', it.nomPerso || it.titre);
  if(n === null || n === undefined) return;
  it.nomPerso = (n.trim() && n.trim() !== it.titre) ? n.trim() : ''; peRender();
}
function peClavier(e, i){
  if(e.key === 'ArrowUp' && e.altKey){ e.preventDefault(); peDeplacer(i, -1); }
  else if(e.key === 'ArrowDown' && e.altKey){ e.preventDefault(); peDeplacer(i, 1); }
  else if(e.key === '+' || e.key === '='){ e.preventDefault(); peDuree(i, .5); }
  else if(e.key === '-'){ e.preventDefault(); peDuree(i, -.5); }
  else if(e.key === 'Enter'){ e.preventDefault(); peSelect(i); }
}
/* Glisser : la poignée déplace le bloc (les autres se réorganisent en direct) ; la languette du
   bas change la durée (les suivants se décalent en direct). Souris et doigt (pointer events). */
function pePisteY(e){ const p = document.querySelector('#progressionList .pe-piste'); return e.clientY - p.getBoundingClientRect().top; }
function peDefile(e){ const m = 60; if(e.clientY < m) window.scrollBy(0, -12); else if(e.clientY > window.innerHeight - m) window.scrollBy(0, 12); }
function peDebutDeplacer(e, i){
  e.preventDefault(); e.stopPropagation();
  const it = progEditorItems[i];
  pe.drag = { type: 'move', it, dy: pePisteY(e) - peY(it._off), bouge: false };
  pe.sel = i;
  window.addEventListener('pointermove', peBouge); window.addEventListener('pointerup', peFin, { once: true });
}
function peDebutEtirer(e, i){
  e.preventDefault(); e.stopPropagation();
  pe.drag = { type: 'size', it: progEditorItems[i], bouge: false };
  pe.sel = i;
  window.addEventListener('pointermove', peBouge); window.addEventListener('pointerup', peFin, { once: true });
}
function peBouge(e){
  const d = pe.drag; if(!d) return;
  d.bouge = true; peDefile(e);
  const t = progEditorItems, y = pePisteY(e);
  if(d.type === 'size'){
    const fin = Math.round(peOffDeY(y) * 2) / 2;
    const nd = Math.max(.5, Math.min(12, fin - d.it._off));
    if(nd !== d.it._d){ d.it._d = nd; peRender(); }
    return;
  }
  // Déplacement : le centre du bloc tiré indique sa nouvelle place parmi les autres.
  const centre = peOffDeY(y - d.dy) + d.it._d / 2;
  const autres = t.filter(x => x !== d.it);
  let k = 0, off = pe.start;
  while(k < autres.length && off + autres[k]._d / 2 < centre){ off += autres[k]._d; k++; }
  const idx = t.indexOf(d.it);
  if(k !== idx){ t.splice(idx, 1); t.splice(k, 0, d.it); pe.sel = k; peRender(); }
  const el = document.querySelector(`#progressionList .pe-bloc[data-i="${t.indexOf(d.it)}"]`);
  if(el){ el.classList.add('tire'); el.style.top = (y - d.dy) + 'px'; }
}
function peFin(){
  window.removeEventListener('pointermove', peBouge);
  const d = pe.drag;
  setTimeout(() => { pe.drag = null; }, 0); // le clic qui suit le relâchement ne doit pas désélectionner
  if(d) peRender();
}
