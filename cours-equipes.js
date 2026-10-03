/* =====================================================================
   cours-equipes.js -- Équipes dans une session COURS (tous niveaux).

   Demandé : « souvent les professeurs des écoles n'ont pas de matériel pour tout le monde. Le fait de
   faire des équipes serait sympa (équipe de 2, 3, 4…), tirées aléatoirement ou définies par le
   professeur. Ça pourrait être généralisé à tous les niveaux. Et parfois […] "j'ai oublié mon ordi",
   "il n'est pas chargé" : permettre de joindre cet élève à un autre rapidement (il travaille à deux
   sur le même ordinateur), à tout moment de la session ("j'ai plus de batterie !"). »

   - Une équipe = un poste (l'élève connecté dont on utilise l'ordinateur) et ses coéquipiers :
     cours_direct.etat.equipes = [{ p: poste, m: [membres] }] ; etat.liens = [{ e, p, at }], l'historique
     des rattachements (pour le bilan, même si l'équipe change en cours de séance).
   - Télécommande : bouton « Équipes » (taille 2 à 6, tirage au sort parmi les élèves en classe en
     donnant un ordinateur à chaque équipe quand c'est possible, ou à la main) ; dans la liste de la
     classe, sur chaque élève, « rejoindre un camarade » (un clic : l'élève travaille sur l'ordinateur
     d'un élève connecté) et « détacher ».
   - Élève : un bandeau « Vous êtes 2 sur cet ordinateur : toi et Tom » (cours_direct_etat ne renvoie
     que l'équipe de l'élève, prénoms compris).
   - Bilan (cours-bilan.js) : un élève sans travail à lui pour un exercice reçoit celui de son poste,
     marqué « en équipe ».
   ===================================================================== */

const cdEq = () => (cdP && cdP.etat && cdP.etat.equipes) || [];
const cdEqNom = id => { const e = cdP && cdP.eleves.find(x => x.id === id); return e ? (e.prenom || e.label) : 'élève'; };
function cdEqPresent(id){ const m = cdP && cdP.membres.get(id); return !!(m && !m.dehors && Date.now() - Date.parse(m.vu_at) < 60000); }
function cdEqDe(id){ return cdEq().find(t => t.p === id || (t.m || []).includes(id)) || null; }

// Petit texte sous le nom d'un élève (liste de la classe, vignettes).
function cdEqInfo(id, court){
  const t = cdEqDe(id); if(!t) return '';
  const autres = [t.p].concat(t.m || []).filter(x => x && x !== id).map(cdEqNom);
  if(t.p === id) return `<small class="cd-eq"><span class="gicon">computer</span> ${court ? '+ ' : 'avec '}${cdEsc(autres.join(', '))}</small>`;
  return `<small class="cd-eq cd-eq-sans"><span class="gicon">group</span> ${t.p ? `sur l'ordinateur de ${cdEsc(cdEqNom(t.p))}` : 'en équipe (sans ordinateur)'}</small>`;
}

async function cdEqEnregistrer(equipes, liens){
  equipes = equipes.map(t => ({ p: t.p || null, m: (t.m || []).filter(x => x && x !== t.p) })).filter(t => t.p || t.m.length > 1);
  await cdProfEtat({ equipes, liens: (liens || (cdP.etat.liens || [])).slice(-300) });
  cdProfRendreClasse();
  if(typeof cxProfMajFaire === 'function' && document.getElementById('cxGrille')) cxProfMajFaire();
}

/* ---------- « Rejoindre un camarade » (à tout moment) ---------- */
function cdEqRejoindreChoix(id, btn){
  document.querySelectorAll('.cd-eq-pop').forEach(x => x.remove());
  const postes = cdP.eleves.filter(e => e.id !== id && cdEqPresent(e.id));
  const pop = document.createElement('div'); pop.className = 'cd-eq-pop';
  pop.innerHTML = `<b>${cdEsc(cdEqNom(id))} travaille sur l'ordinateur de…</b>${postes.length ? postes.map(e => `<button data-p="${e.id}">${cdEsc(e.label)}${cdEqDe(e.id) ? ' <small>(déjà en équipe)</small>' : ''}</button>`).join('') : '<p class="hint" style="margin:4px 0;">Aucun élève connecté pour l\'instant.</p>'}
    <button class="cd-eq-x" data-x>Annuler</button>`;
  document.body.appendChild(pop);
  const r = btn.getBoundingClientRect(); pop.style.top = Math.min(window.innerHeight - pop.offsetHeight - 8, r.bottom + 4) + 'px'; pop.style.left = Math.max(8, Math.min(window.innerWidth - pop.offsetWidth - 8, r.left - 120)) + 'px';
  pop.onclick = e => { const b = e.target.closest('button'); if(!b) return; pop.remove(); if(b.dataset.p) cdEqRattacher(id, b.dataset.p); };
  setTimeout(() => document.addEventListener('click', function f(e){ if(!pop.contains(e.target)){ pop.remove(); document.removeEventListener('click', f); } }), 0);
}
async function cdEqRattacher(id, poste){
  let eq = cdEq().map(t => ({ p: t.p, m: (t.m || []).filter(x => x !== id) }));
  eq = eq.map(t => t.p === id ? { p: t.m.find(cdEqPresent) || t.m[0] || null, m: t.m.filter(x => x !== (t.m.find(cdEqPresent) || t.m[0])) } : t);
  let t = eq.find(x => x.p === poste || x.m.includes(poste));
  if(!t){ t = { p: poste, m: [] }; eq.push(t); }
  if(!t.p) t.p = poste;
  t.m.push(id);
  const liens = (cdP.etat.liens || []).concat([{ e: id, p: t.p, at: new Date().toISOString() }]);
  await cdEqEnregistrer(eq, liens);
  if(typeof cdToast === 'function') cdToast(`<span class="gicon">group</span> <b>${cdEsc(cdEqNom(id))}</b> travaille maintenant sur l'ordinateur de <b>${cdEsc(cdEqNom(t.p))}</b>.`);
}
async function cdEqDetacher(id){
  const eq = cdEq().map(t => {
    if(t.p === id){ const n = (t.m || []).find(cdEqPresent) || (t.m || [])[0] || null; return { p: n, m: (t.m || []).filter(x => x !== n) }; }
    return { p: t.p, m: (t.m || []).filter(x => x !== id) };
  });
  await cdEqEnregistrer(eq);
}

/* ---------- Fenêtre « Équipes » : tirage au sort ou à la main ---------- */
function cdEqOuvrir(){
  if(!cdP) return;
  const st = { taille: cdP.eqTaille || 2, enClasse: new Set(cdP.eleves.map(e => e.id)), eq: cdEq().map(t => ({ p: t.p, m: (t.m || []).slice() })) };
  // Toute la classe est « en classe » par défaut (les élèves sans ordinateur sont justement ceux à répartir) ;
  // le professeur décoche les absents. Le tirage donne à chaque équipe un élève connecté quand c'est possible.
  if(cdP.eqAbsents) cdP.eqAbsents.forEach(id => st.enClasse.delete(id));
  const o = document.createElement('div'); o.className = 'modal-overlay cd-eq-ov'; o.style.display = 'flex';
  const membresDe = t => [t.p].concat(t.m).filter(Boolean);
  const equipeDe = id => st.eq.findIndex(t => membresDe(t).includes(id));
  const tirer = () => {
    const ids = cdP.eleves.map(e => e.id).filter(id => st.enClasse.has(id)), mel = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const co = mel(ids.filter(cdEqPresent)), sans = mel(ids.filter(id => !cdEqPresent(id))), T = Math.max(1, Math.ceil(ids.length / st.taille));
    st.eq = Array.from({ length: T }, (_, i) => ({ p: co[i] || null, m: [] }));
    const reste = mel(co.slice(T).concat(sans));
    reste.forEach(id => { const t = st.eq.reduce((a, b) => (membresDe(b).length < membresDe(a).length ? b : a)); if(!t.p) t.p = id; else t.m.push(id); });
  };
  const rendre = () => {
    const seuls = cdP.eleves.filter(e => st.enClasse.has(e.id) && equipeDe(e.id) < 0);
    const ligne = (id, i, poste) => `<div class="cd-eq-l${poste ? ' poste' : ''}"><button class="cd-eq-pc" data-pc="${i}|${id}" title="${poste ? 'Ordinateur de l\'équipe' : 'Utiliser l\'ordinateur de cet élève'}"><span class="gicon">${poste ? 'computer' : 'person'}</span></button>
        <span class="cd-eq-n">${cdEsc(cdP.eleves.find(e => e.id === id) ? cdP.eleves.find(e => e.id === id).label : 'élève')}</span>${cdEqPresent(id) ? '<span class="cd-eq-co" title="connecté">●</span>' : ''}
        <select data-mv="${id}"><option value="">Changer…</option>${st.eq.map((_, j) => j === i ? '' : `<option value="${j}">Équipe ${j + 1}</option>`).join('')}<option value="n">Nouvelle équipe</option><option value="s">Seul</option></select></div>`;
    o.innerHTML = `<div class="modal-card cd-eq-modal"><div class="cdb-tete"><b class="cd-h"><span class="gicon">groups</span> Équipes de la séance</b><span style="flex:1"></span><button class="modal-close" data-x><span class="gicon">close</span></button></div>
      <p class="hint" style="margin:4px 0 8px;">Une équipe travaille sur <b>un ordinateur</b> <span class="gicon" style="font-size:16px;vertical-align:middle;">computer</span> (celui d'un élève connecté) : ses résultats comptent pour toute l'équipe. On peut changer à tout moment.</p>
      <div class="cd-eq-barre">Taille : ${[2, 3, 4, 5, 6].map(n => `<button class="cd-eq-t${st.taille === n ? ' on' : ''}" data-t="${n}">${n}</button>`).join('')}
        <button class="btn" data-tirer><span class="gicon">casino</span> Tirer au sort</button><button class="btn secondary" data-vider>Tout défaire</button></div>
      <details class="cd-eq-classe"><summary>Élèves en classe aujourd'hui : <b>${st.enClasse.size}</b> / ${cdP.eleves.length}</summary><div>${cdP.eleves.map(e => `<label><input type="checkbox" data-ec="${e.id}" ${st.enClasse.has(e.id) ? 'checked' : ''}> ${cdEsc(e.label)}${cdEqPresent(e.id) ? ' <span class="cd-eq-co">●</span>' : ''}</label>`).join('')}</div></details>
      <div class="cd-eq-grille">${st.eq.map((t, i) => `<div class="cd-eq-carte"><b>Équipe ${i + 1}</b>${t.p ? '' : ' <small class="cdb-rouge">sans ordinateur connecté</small>'}${membresDe(t).map(id => ligne(id, i, id === t.p)).join('')}</div>`).join('')}
        ${seuls.length ? `<div class="cd-eq-carte cd-eq-seuls"><b>Seuls</b>${seuls.map(e => ligne(e.id, -1, false)).join('')}</div>` : ''}</div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;"><button class="btn secondary" data-x>Annuler</button><button class="btn" data-ok><span class="gicon">check</span> Valider les équipes</button></div></div>`;
  };
  tirer.vide = () => { st.eq = []; };
  if(!st.eq.length) tirer();
  rendre(); document.body.appendChild(o);
  o.addEventListener('change', e => {
    const c = e.target;
    if(c.dataset.ec){ cdP.eqAbsents = cdP.eqAbsents || new Set(); if(c.checked){ st.enClasse.add(c.dataset.ec); cdP.eqAbsents.delete(c.dataset.ec); } else { cdP.eqAbsents.add(c.dataset.ec); st.enClasse.delete(c.dataset.ec); st.eq.forEach(t => { if(t.p === c.dataset.ec) t.p = t.m.shift() || null; t.m = t.m.filter(x => x !== c.dataset.ec); }); } rendre(); return; }
    if(c.dataset.mv){
      const id = c.dataset.mv, v = c.value;
      st.eq.forEach(t => { if(t.p === id) t.p = t.m.shift() || null; t.m = t.m.filter(x => x !== id); });
      if(v === 'n') st.eq.push({ p: id, m: [] });
      else if(v !== 's' && v !== ''){ const t = st.eq[+v]; if(t){ if(!t.p) t.p = id; else t.m.push(id); } }
      st.eq = st.eq.filter(t => t.p || t.m.length); rendre();
    }
  });
  o.addEventListener('click', async e => {
    const b = e.target.closest('button'); if(!b){ if(e.target === o) o.remove(); return; }
    if(b.dataset.x !== undefined){ o.remove(); return; }
    if(b.dataset.t){ st.taille = cdP.eqTaille = +b.dataset.t; rendre(); return; }
    if(b.dataset.tirer !== undefined){ tirer(); rendre(); return; }
    if(b.dataset.vider !== undefined){ tirer.vide(); rendre(); return; }
    if(b.dataset.pc){ const [i, id] = b.dataset.pc.split('|'); const t = st.eq[+i]; if(t && t.p !== id){ t.m = t.m.filter(x => x !== id); if(t.p) t.m.unshift(t.p); t.p = id; } rendre(); return; }
    if(b.dataset.ok !== undefined){
      const at = new Date().toISOString(), liens = (cdP.etat.liens || []).concat(...st.eq.map(t => t.m.map(x => ({ e: x, p: t.p, at })))).filter(l => l.p);
      o.remove(); await cdEqEnregistrer(st.eq, liens);
      if(typeof cdToast === 'function') cdToast(`<span class="gicon">groups</span> ${st.eq.length ? `${st.eq.length} équipe${st.eq.length > 1 ? 's' : ''} : chaque élève voit avec qui il travaille.` : 'Équipes défaites : chacun travaille seul.'}`);
    }
  });
}

/* ---------- Élève : bandeau d'équipe ---------- */
function cdEleveEquipe(){
  const b = document.getElementById('cdEqBandeau'); if(!b || !cdE || !cdE.d) return;
  const q = cdE.d.equipe, avec = q && (q.avec || []).filter(Boolean);
  if(!q || !avec.length){ b.innerHTML = ''; b.hidden = true; return; }
  const liste = avec.length === 1 ? avec[0] : avec.slice(0, -1).join(', ') + ' et ' + avec[avec.length - 1];
  b.hidden = false;
  b.innerHTML = q.moi_poste
    ? `<span class="gicon">groups</span> Vous êtes ${avec.length + 1} sur cet ordinateur : toi et ${cdEsc(liste)}. Travaillez ensemble, chacun à son tour !`
    : `<span class="gicon">groups</span> Tu es en équipe avec ${cdEsc(liste)}${q.poste ? ` (sur l'ordinateur de ${cdEsc(q.poste)})` : ''}.`;
}

/* ---------- Bilan : poste d'un élève pour la séance (dernier rattachement, puis équipe finale) ---------- */
function cdEqPostes(etat){
  const via = new Map();
  ((etat && etat.liens) || []).forEach(l => { if(l.e && l.p) via.set(l.e, l.p); });
  ((etat && etat.equipes) || []).forEach(t => (t.m || []).forEach(x => { if(t.p) via.set(x, t.p); }));
  return via;
}

(function cdEqStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .cd-eq{display:inline-flex;align-items:center;gap:3px;color:#1F7A4D;font-weight:700;} .cd-eq .gicon{font-size:14px;} .cd-eq-sans{color:#3A6EA5;}
    .cd-el .cd-eq-btn{margin-left:auto;border:0;background:#EEF4FB;color:#3A6EA5;border-radius:8px;cursor:pointer;padding:2px 6px;display:inline-flex;align-items:center;}
    .cd-el .cd-eq-btn .gicon{font-size:17px;} .cd-el .cd-eq-btn.x{background:#FBE7EE;color:#9E1F5E;}
    .cd-eq-pop{position:fixed;z-index:9900;background:#fff;border:1px solid #DCE2EA;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.18);padding:10px;display:flex;flex-direction:column;gap:4px;max-height:60vh;overflow:auto;min-width:230px;}
    .cd-eq-pop button{border:0;background:#F3F6FA;border-radius:8px;padding:6px 10px;text-align:left;cursor:pointer;font:600 .9rem Inter,sans-serif;color:#1F3A5C;}
    .cd-eq-pop button:hover{background:#EAF7EF;} .cd-eq-pop .cd-eq-x{background:none;color:#5B6472;text-align:center;}
    .cd-eq-ov{z-index:9800;} .cd-eq-modal{max-width:980px;width:96vw;max-height:90vh;overflow:auto;}
    .cd-eq-barre{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:6px 0;font-weight:700;}
    .cd-eq-t{width:36px;height:36px;border-radius:10px;border:2px solid #DCE2EA;background:#fff;font:700 1rem 'Space Grotesk',sans-serif;cursor:pointer;} .cd-eq-t.on{border-color:#1F7A4D;background:#EAF7EF;color:#1F7A4D;}
    .cd-eq-classe{margin:4px 0 8px;} .cd-eq-classe > div{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:6px;font-size:.9rem;}
    .cd-eq-grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;}
    .cd-eq-carte{border:1.5px solid #DCE2EA;border-radius:12px;padding:8px 10px;background:#FBFCFE;display:flex;flex-direction:column;gap:4px;} .cd-eq-seuls{background:#FFF8EC;}
    .cd-eq-l{display:flex;align-items:center;gap:6px;} .cd-eq-l.poste .cd-eq-n{font-weight:800;color:#1F7A4D;} .cd-eq-n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .cd-eq-l select{max-width:110px;font-size:.8rem;} .cd-eq-pc{border:0;background:none;cursor:pointer;color:#8A93A3;display:flex;padding:0;} .cd-eq-l.poste .cd-eq-pc{color:#1F7A4D;}
    .cd-eq-co{color:#2E9C6A;font-size:.8rem;}
    #cdEqBandeau{background:#EAF7EF;color:#1F5E3B;border:1.5px solid #9ED3B4;border-radius:10px;padding:4px 12px;font-weight:700;display:flex;align-items:center;gap:6px;margin:6px 12px 0;} #cdEqBandeau[hidden]{display:none;}
  `;
  document.head.appendChild(st);
})();
