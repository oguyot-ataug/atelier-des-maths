/* =====================================================================
   planches-prog.js -- Défis de programmation dans Mon TD, faits en groupe au tableau.

   Demandé : « Je préfère qu'il soit dans Mon TD et qu'il reste dans la fenêtre de projection. C'est
   le genre de défi à faire en groupe au tableau. Olivia et ses copines ;-) »

   - Un chapitre déclare ses défis : PL_PROG['cm1|Droites parallèles et perpendiculaires'] = [ids]
     (défis de prog-defis.js). Mon TD les montre dans une rubrique « À l'ordinateur, en groupe »,
     avec un aperçu du décor (la droite (d), les pointillés à repasser).
   - « Projeter » : l'éditeur de blocs (programmation.js) est déplacé dans la fenêtre de projection
     (planches.js, #plProj) -- consigne, blocs, scène, « Vérifier mon programme » -- et rendu à sa
     page en fermant. Défi précédent / suivant, « Correction » = l'aide du défi.
   - Équipes : Oliv'IA et ses copines (Noa l'olive noire, Lila l'olive violette, Rosa l'olive rose) ;
     l'équipe choisie devient le lutin, et son trait a sa couleur.
   - Rien n'est enregistré (prog.tableau) : chaque défi repart d'un programme vide.
   ===================================================================== */

const PL_PROG = {}; // « niveau|titre du chapitre » -> [identifiants de défis]
const PL_EQUIPES = [
  { nom: 'Oliv\'IA', c: '#8DB84A', e: '#4F6B2A', trait: '#3E7D1E' },
  { nom: 'Noa', c: '#4A4756', e: '#1C1B22', trait: '#1C1B22' },
  { nom: 'Lila', c: '#9B72D6', e: '#5B3A99', trait: '#6A3FB0' },
  { nom: 'Rosa', c: '#EE9AB4', e: '#B5506F', trait: '#C2456B' },
];
function plProgDe(lvl, titre){ return (PL_PROG[lvl + '|' + titre] || []).filter(id => typeof progDefiParId === 'function' && progDefiParId(id)); }

// Petite olive (pastille d'équipe).
function plEquipeSvg(q, t){
  t = t || 26;
  return `<svg viewBox="0 0 30 34" style="width:${t}px;height:${t * 34 / 30}px;vertical-align:middle;"><path d="M15 6 q1 -4 4 -5" stroke="#4F6B2A" stroke-width="1.6" fill="none"/><ellipse cx="21" cy="3.5" rx="4.5" ry="2.2" fill="#7BAE4F" transform="rotate(-20 21 3.5)"/>
    <ellipse cx="15" cy="20" rx="11" ry="13" fill="${q.c}" stroke="${q.e}" stroke-width="2"/><circle cx="11" cy="18" r="3.4" fill="#fff"/><circle cx="19" cy="18" r="3.4" fill="#fff"/><circle cx="11.6" cy="18.8" r="1.6" fill="#1C2B39"/><circle cx="19.6" cy="18.8" r="1.6" fill="#1C2B39"/>
    <path d="M11.5 25 Q15 28 18.5 25" stroke="#2C3A1A" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
}

// Aperçu du décor d'un défi (repère de la scène : 480 × 360, origine au centre, y vers le haut).
function plProgApercu(d){
  const Y = y => -y;
  let s = `<svg viewBox="-240 -180 480 360" style="width:100%;max-width:300px;display:block;margin:4px auto;background:#fff;border:1px solid #DCE3EA;border-radius:8px;">`;
  (d.decor || []).forEach(o => {
    if(o.point) s += `<path d="M${o.x - 6},${Y(o.y) - 6} L${o.x + 6},${Y(o.y) + 6} M${o.x - 6},${Y(o.y) + 6} L${o.x + 6},${Y(o.y) - 6}" stroke="#1F3A5C" stroke-width="3"/>`;
    else s += `<line x1="${o.x1}" y1="${Y(o.y1)}" x2="${o.x2}" y2="${Y(o.y2)}" stroke="${o.pointille ? '#E35D3A' : '#1F3A5C'}" stroke-width="${o.pointille ? 4 : 3.5}"${o.pointille ? ' stroke-dasharray="12 10"' : ''} stroke-linecap="round"/>`;
    if(o.nom){ const lx = o.point ? o.x + 10 : o.lx != null ? o.lx : o.x2 + 6, ly = o.point ? o.y + 12 : o.ly != null ? o.ly : o.y2 + 8; s += `<text x="${lx}" y="${Y(ly)}" font-size="24" font-weight="700" fill="${o.pointille ? '#C04A28' : '#1F3A5C'}" font-family="Space Grotesk">${o.nom}</text>`; }
  });
  return s + '</svg>';
}

// Mon TD : la rubrique des défis.
function plTdProgHtml(lvl, c){
  const ids = plProgDe(lvl, c.t); if(!ids.length) return '';
  return `<section class="td-planche td-prog"><div class="td-p-tete"><span class="pl-ref">À l'ordinateur</span><b>En groupe, au tableau : programme Oliv'IA</b>
      <span class="hint" style="margin:0;">Les défis de programmation par blocs du chapitre, projetés en grand. Chaque équipe choisit son olive : ${PL_EQUIPES.map(q => plEquipeSvg(q, 18)).join('')}</span>
      <button type="button" class="btn secondary td-mini" data-tdprog="0"><span class="gicon">present_to_all</span> Projeter les défis</button></div>
    <div class="td-grille">${ids.map((id, j) => { const d = progDefiParId(id); return `<div class="td-vig">
      <div class="td-v-tete"><span class="pl-num">Défi ${j + 1}</span><span class="td-num"><span class="gicon">extension</span> blocs</span><b style="margin-left:auto;color:#1F3A5C;font-family:'Space Grotesk',sans-serif;">${escapeHtml(d.titre)}</b></div>
      <div class="td-v-corps"><div class="pl-consigne">${d.enonce}</div>${plProgApercu(d)}</div>
      <div class="td-v-pied"><button type="button" class="btn secondary td-mini" data-tdprog="${j}"><span class="gicon">present_to_all</span> Projeter</button></div></div>`; }).join('')}</div></section>`;
}

/* ---------- Projection ---------- */
async function plProgProjeter(lvl, c, j){
  const ids = plProgDe(lvl, c.t); if(!ids.length) return;
  if(plProj && plProj.prog) plProgQuitter();
  plProj = { lvl, c, prog: true, j: Math.max(0, Math.min(ids.length - 1, j || 0)), equipe: 0 };
  const v = plProjOuvrirVue();
  v.innerHTML = `<div class="plp-tete"><span class="pl-ref">À l'ordinateur</span><b id="plpProgTitre"></b><span class="plp-pos" id="plpProgPos"></span>
      <button class="plp-fermer" onclick="plProjFermer()" title="Fermer"><span class="gicon">close</span></button></div>
    <div class="plp-corps plp-prog" id="plpProgZone"><p class="hint">Chargement de l'éditeur de blocs…</p></div>
    <div class="plp-pied"><span class="plp-equipes" id="plpEquipes"></span>
      <button class="btn secondary" id="plpProgPrec" onclick="plProjAller(-1)"><span class="gicon">arrow_back</span> Défi précédent</button>
      <button class="btn plp-corr" onclick="plProjCorr()" title="L'aide du défi"><span class="gicon">lightbulb</span> Aide</button>
      <button class="btn secondary" id="plpProgSuiv" onclick="plProjAller(1)">Défi suivant <span class="gicon">arrow_forward</span></button></div>`;
  try{
    if(!((typeof prog !== 'undefined' && prog) && prog.ws && document.getElementById('progBlocs'))){ await progChargerBlockly(); progConstruire(document.getElementById('progRoot')); }
  }catch(e){ const z = document.getElementById('plpProgZone'); if(z) z.innerHTML = `<p class="hint">L'éditeur de blocs n'a pas pu être chargé (connexion ?). ${escapeHtml(e.message || '')}</p>`; return; }
  if(!plProj || !plProj.prog) return; // fermé pendant le chargement
  const el = document.querySelector('#progRoot > .prog'), z = document.getElementById('plpProgZone');
  if(!el || !z) return;
  if(typeof progArreter === 'function') progArreter();
  if(typeof progSauverCourant === 'function') progSauverCourant(); // le travail en cours de la page Programmation, avant de passer au tableau
  z.innerHTML = ''; z.appendChild(el);
  prog.devoir = null; prog.lecture = null; prog.tableau = true;
  plProgMaj();
}
function plProgMaj(){
  if(!plProj || !plProj.prog || typeof prog === 'undefined' || !prog || !prog.tableau) return;
  const ids = plProgDe(plProj.lvl, plProj.c.t), id = ids[plProj.j], d = progDefiParId(id);
  document.getElementById('plpProgTitre').textContent = d.titre;
  document.getElementById('plpProgPos').textContent = `Défi ${plProj.j + 1} / ${ids.length}`;
  document.getElementById('plpProgPrec').disabled = plProj.j === 0;
  document.getElementById('plpProgSuiv').disabled = plProj.j === ids.length - 1;
  progDefi(id);
  progCharger(progDepartDefaut());
  plProgEquipe(plProj.equipe);
}
function plProgEquipe(n){
  if(!plProj || !plProj.prog || typeof prog === 'undefined' || !prog) return;
  plProj.equipe = n; const q = PL_EQUIPES[n];
  const e = document.getElementById('plpEquipes');
  if(e) e.innerHTML = 'Équipe : ' + PL_EQUIPES.map((x, i) => `<button type="button" class="plp-eq${i === n ? ' on' : ''}" onclick="plProgEquipe(${i})" title="${escapeHtml(x.nom)}">${plEquipeSvg(x, 24)}<span>${escapeHtml(x.nom)}</span></button>`).join('');
  if(typeof progArreter === 'function') progArreter();
  prog.scene.equipe = q; prog.scene.reset(); prog.scene.fond(); if(typeof progMajPos === 'function') progMajPos();
  const m = document.getElementById('progVerifMsg'); if(m) m.innerHTML = '';
}
function plProgAller(dlt){
  const ids = plProgDe(plProj.lvl, plProj.c.t), j = Math.max(0, Math.min(ids.length - 1, plProj.j + dlt));
  if(j === plProj.j) return; plProj.j = j; plProgMaj();
}
// Rend l'éditeur à la page Programmation (en fermant la projection).
function plProgQuitter(){
  if(typeof prog === 'undefined' || !prog) return;
  if(typeof progArreter === 'function') progArreter();
  const el = document.querySelector('#plpProgZone > .prog'), root = document.getElementById('progRoot');
  if(el && root) root.appendChild(el);
  prog.tableau = false; prog.defi = null;
  if(prog.scene){ prog.scene.equipe = null; prog.scene.decor = null; prog.scene.depart = null; prog.scene.reset(); prog.scene.fond(); }
  try{ Blockly.svgResize(prog.ws); }catch(e){}
}

(function plProgStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .td-prog .td-p-tete .pl-ref{ background:#4C97FF; color:#fff; border-color:#4C97FF; }
    .plp-corps.plp-prog{ display:block; padding:10px 16px; overflow:auto; }
    #plProj .prog{ max-width:none; margin:0; }
    #plProj .prog-top, #plProj .prog-liste, #plProj #progDevoirBandeau{ display:none !important; }
    #plProj .prog-body{ display:block; }
    #plProj .prog-zone{ grid-template-columns:minmax(0,1.15fr) minmax(360px,1fr); }
    #plProj .prog-blocs{ height:calc(100vh - 250px); min-height:360px; }
    #plProj .prog-c-txt{ font-size:1.15rem; }
    .plp-equipes{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-right:auto; font-weight:700; color:#1F3A5C; }
    .plp-eq{ display:inline-flex; align-items:center; gap:4px; border:2px solid transparent; background:#F1F4F8; border-radius:999px; padding:2px 10px 2px 4px; cursor:pointer; font:700 .85rem 'Space Grotesk',sans-serif; color:#1F3A5C; }
    .plp-eq.on{ border-color:#1F7A4D; background:#EAF7EF; }
    @media (max-width:1000px){ #plProj .prog-zone{ grid-template-columns:1fr; } #plProj .prog-blocs{ height:420px; } }
  `;
  document.head.appendChild(st);
})();
