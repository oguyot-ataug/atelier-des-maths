/* =====================================================================
   flashcartes.js -- Questions flash au primaire, avec des cartes flashcode

   Demandé : « Les enfants n'ont pas d'ordinateur donc il faudrait qu'ils répondent à des questionnaires
   type A, B, C ou D en montrant un flashcode. Chaque élève serait associé à quatre plaquettes flashcode
   [...] Un flashcode aurait en son centre la lettre bien écrite pour que l'enfant la distingue bien.
   Pour chaque question posée, le professeur des écoles pourrait alors prendre son téléphone et lire tous
   les flashcodes de la classe. Au vidéoprojecteur, passeraient en vert les flashcodes bien lus et en
   rouge resteraient ceux qui n'ont pas encore été flashés. Afin d'éviter d'imprimer de nouveaux
   flashcodes chaque année, il faut mettre un petit numéro en dessous afin que le professeur l'associe
   au bon élève. [...] planches de flashcodes (4 sur une page A4 : Élève 1 - A, Élève 1 - B, ...).
   En mode dupliquer, ne pas montrer les résultats des élèves. En mode écran étendu, montrer les
   résultats sur l'écran du professeur. »

   - Cartes : un QR code (version 1, correction H) contenant « AM-<numéro>-<lettre> », la lettre écrite
     en grand au centre (5 modules sur 29 : testé, les codes restent lisibles), le numéro en dessous.
     Aucun nom dans le code : chaque année, on réattribue les numéros (table qz_cartes, par classe).
   - Séance : une séance de Questions flash ordinaire (qz_direct) avec acces = 'cartes'. Seules les
     questions qui se répondent par une lettre sont gardées : QCM à une bonne réponse et 4 propositions
     au plus (A, B, C, D dans l'ordre de l'éditeur), vrai/faux à une affirmation (A = Vrai, B = Faux).
   - Téléphone : flash.html?c=<code>, sans connexion au site (comme la caméra du téléphone). Il lit
     toutes les cartes visibles à la fois (ZXing, vendor/zxing) et envoie les numéros et lettres lus à
     l'ordinateur par un canal temps réel « qzc-<code> ». C'est l'ordinateur (connecté) qui enregistre
     les réponses dans qz_direct_rep (policies « cartes » : élèves de la classe seulement). Un enfant qui
     montre une autre carte change sa réponse (la dernière lue compte) tant que la question est ouverte.
   - Écran dupliqué : l'écran du professeur montre la question et la grille des numéros (vert : carte
     lue, rouge : pas encore), sans les résultats. Écran étendu : le bouton « Projection » ouvre une
     fenêtre à part (?proj=flash) à glisser sur le vidéoprojecteur, avec la question et la grille ;
     l'écran du professeur montre alors les résultats (répartition, lettre de chaque élève).

   Dépend de questionnaires-direct.js (qzD, qzDirectRender...), questionnaires.js (qzOrdreChoix,
   qzEnonceHtml, qzMath, qzElevesDevoir, qzEsc), vendor/qrcode.js et d'app.js (sb, niceAlert...).
   ===================================================================== */

const QZC_LETTRES = ['A', 'B', 'C', 'D'];
const QZC_PROJ = new URLSearchParams(location.search).get('proj') === 'flash';
const QZC_ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
let qzc = null; // { id, code, ch, carte: Map(numéro → élève), num: Map(élève → numéro), raz, telVu, veille, voir }
let qzcProjWin = null, qzcBc = null;

/* ------------------------------ Questions compatibles ------------------------------ */
function qzcCompatible(q){
  if(!q) return false;
  if(q.type === 'qcm'){ const n = qzOrdreChoix(q, {}, null).length; return !q.multiple && n >= 2 && n <= 4; }
  if(q.type === 'vf') return (q.items || []).length === 1;
  return false;
}
function qzcChoix(q){
  if(q.type === 'vf'){ const it = q.items[0]; return [{ L: 'A', html: 'Vrai', correct: !!it.vrai }, { L: 'B', html: 'Faux', correct: !it.vrai }]; }
  return qzOrdreChoix(q, {}, null).map((c, i) => ({ L: QZC_LETTRES[i], html: qzMath(c.texte), correct: !!c.correct }));
}
function qzcReponse(q, L){
  const i = QZC_LETTRES.indexOf(L); if(i < 0) return undefined;
  if(q.type === 'vf') return i > 1 ? undefined : { [q.items[0].id]: i === 0 };
  const c = qzOrdreChoix(q, {}, null)[i]; return c ? c.id : undefined;
}
function qzcLettre(q, rep){
  if(rep == null) return '';
  if(q.type === 'vf'){ const v = rep[q.items[0].id]; return v === true ? 'A' : v === false ? 'B' : ''; }
  const i = qzOrdreChoix(q, {}, null).findIndex(c => c.id === rep); return i >= 0 ? QZC_LETTRES[i] : '';
}
// Au lancement : on ne garde que les pages (documents + question) dont la question se répond par une carte.
function qzcFiltrer(questions){
  const pages = qzPages(questions), ok = pages.filter(p => qzcCompatible(p.find(x => x.type !== 'texte')));
  return { questions: ok.flat(), gardees: ok.length, sautees: pages.filter(p => p.some(x => x.type !== 'texte')).length - ok.length };
}

/* ---------------------------------- Cartes ---------------------------------- */
function qzcTexteCode(num, L){ return 'AM-' + num + '-' + L; }
function qzcQrSvg(num, L){
  const q = qrcode(1, 'H'); q.addData(qzcTexteCode(num, L), 'Alphanumeric'); q.make();
  const n = q.getModuleCount(), m = 2, T = n + 2 * m, ov = 5, a = (T - ov) / 2;
  let d = '';
  for(let r = 0; r < n; r++) for(let c = 0; c < n; c++) if(q.isDark(r, c)) d += `M${c + m},${r + m}h1v1h-1z`;
  return `<svg class="qzc-qr" viewBox="0 0 ${T} ${T}" xmlns="http://www.w3.org/2000/svg"><rect width="${T}" height="${T}" fill="#fff"/><path d="${d}" fill="#000" shape-rendering="crispEdges"/>`
    + `<rect x="${a}" y="${a}" width="${ov}" height="${ov}" fill="#fff"/><text x="${T / 2}" y="${T / 2 + ov * 0.36}" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-size="${ov}" text-anchor="middle" fill="#000">${L}</text></svg>`;
}
async function qzcNumeros(classId){
  const { data } = await sb.from('qz_cartes').select('student_id,numero').eq('class_id', classId);
  return new Map((data || []).map(r => [r.student_id, r.numero]));
}
// Planches à imprimer : une page A4 par numéro, avec ses 4 cartes A, B, C, D (à découper).
function qzcImprimer(de, a, noms){
  de = Math.max(1, Math.min(999, de | 0)); a = Math.max(de, Math.min(999, a | 0));
  const pages = [];
  for(let n = de; n <= a; n++){
    const nom = noms && noms.get(n) ? ' · ' + qzEsc(noms.get(n)) : '';
    pages.push(`<section class="page">${QZC_LETTRES.map(L => `<div class="carte">${qzcQrSvg(n, L)}<div class="num">${n}${nom}</div></div>`).join('')}</section>`);
  }
  const w = window.open('', '_blank');
  if(!w){ niceAlert('La page d\'impression n\'a pas pu s\'ouvrir : autorisez les fenêtres surgissantes (pop-up) pour ce site.'); return; }
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Cartes flashcode ${de} à ${a}</title><style>
    @page{size:A4 portrait;margin:0;} *{box-sizing:border-box;} body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#E9ECF1;}
    .barre{position:sticky;top:0;display:flex;gap:12px;align-items:center;justify-content:center;background:#1C2B39;color:#fff;padding:10px;font-size:14px;}
    .barre button{font:600 15px Arial,sans-serif;border:0;border-radius:8px;padding:8px 16px;background:#FF8208;color:#fff;cursor:pointer;}
    .page{width:210mm;height:297mm;margin:10mm auto;background:#fff;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;break-after:page;page-break-after:always;}
    .carte{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2mm;border:.3mm dashed #B9C0CA;}
    .qzc-qr{width:92mm;height:92mm;display:block;}
    .num{font-size:13pt;font-weight:700;color:#444;letter-spacing:.5px;}
    @media print{ body{background:#fff;} .barre{display:none;} .page{margin:0;} }
  </style></head><body><div class="barre">${a - de + 1} planche${a > de ? 's' : ''} (numéros ${de} à ${a}) · imprimez à 100 %, sans « ajuster à la page », puis découpez les cartes en suivant les pointillés.
    <button onclick="print()">Imprimer</button></div>${pages.join('')}</body></html>`);
  w.document.close();
}

/* ------------------------- Numéros des cartes (par classe) ------------------------- */
async function qzcGerer(classId, apres){
  const classes = (typeof accountClassesList !== 'undefined' ? accountClassesList : []) || [];
  if(!classes.length){ await niceAlert('Aucune classe sur votre compte.'); return; }
  const st = { classId: classId || classes[0].id, eleves: [], num: new Map(), charge: false, err: '' };
  const o = document.createElement('div'); o.className = 'qzd-ov';
  const lire = () => { o.querySelectorAll('[data-num]').forEach(i => { const v = parseInt(i.value, 10); if(v > 0) st.num.set(i.dataset.num, v); else st.num.delete(i.dataset.num); }); };
  const rendre = () => {
    const max = Math.max(st.eleves.length, ...[...st.num.values()], 1);
    o.innerHTML = `<div class="qzd-modal qzc-gerer" role="dialog" aria-label="Cartes flashcode">
      <h3><span class="gicon">qr_code_2</span> Cartes flashcode</h3>
      <p class="hint" style="margin:0 0 8px;">Chaque élève reçoit quatre cartes (A, B, C, D) portant le même numéro. Les cartes ne portent pas de nom : l'an prochain, gardez-les et attribuez simplement les numéros à vos nouveaux élèves.</p>
      <div class="qzc-l"><label>Classe <select data-classe>${classes.map(c => `<option value="${c.id}" ${c.id === st.classId ? 'selected' : ''}>${qzEsc(c.label)}</option>`).join('')}</select></label>
        <button type="button" class="btn secondary" data-auto><span class="gicon">format_list_numbered</span> Numéroter 1, 2, 3… (ordre alphabétique)</button></div>
      <div class="qzc-liste">${!st.charge ? '<p class="hint">Chargement…</p>' : !st.eleves.length ? '<p class="hint">Aucun élève dans cette classe.</p>'
        : st.eleves.map(e => `<label class="qzc-el"><span>${qzEsc(e.label)}</span><input type="number" min="1" max="999" data-num="${e.id}" value="${st.num.get(e.id) || ''}" placeholder="—"></label>`).join('')}</div>
      <p class="hint" style="margin:6px 0 0;color:#a83c1f;">${qzEsc(st.err)}</p>
      <div class="qzc-l" style="justify-content:flex-end;"><button type="button" class="btn secondary" data-x>Fermer</button><button type="button" class="btn" data-ok><span class="gicon">save</span> Enregistrer les numéros</button></div>
      <div class="qzc-impr"><b><span class="gicon">print</span> Imprimer les planches</b> <span class="hint" style="margin:0;">(une page A4 par numéro : ses 4 cartes)</span>
        <div class="qzc-l">Numéros <input type="number" min="1" max="999" value="1" data-de> à <input type="number" min="1" max="999" value="${max}" data-a>
          <label class="hint" style="margin:0;display:flex;gap:5px;align-items:center;"><input type="checkbox" data-noms> Écrire aussi le prénom (cartes à refaire chaque année)</label>
          <button type="button" class="btn" data-imp><span class="gicon">print</span> Imprimer</button></div></div></div>`;
  };
  const charger = async () => {
    st.charge = false; rendre();
    const [el, num] = await Promise.all([qzElevesDevoir({ class_id: st.classId }), qzcNumeros(st.classId)]);
    st.eleves = el; st.num = num; st.charge = true; st.err = ''; rendre();
  };
  document.body.appendChild(o); charger();
  o.addEventListener('change', e => { if(e.target.matches('[data-classe]')){ st.classId = e.target.value; charger(); } });
  o.addEventListener('click', async e => {
    const t = e.target;
    if(t === o || t.closest('[data-x]')){ o.remove(); if(apres) apres(); return; }
    if(t.closest('[data-auto]')){
      lire();
      if(st.num.size && !(await niceConfirm('Renuméroter tous les élèves de 1 à ' + st.eleves.length + ' dans l\'ordre alphabétique ? Les numéros actuels seront remplacés (pensez à les enregistrer ensuite).'))) return;
      st.num = new Map(st.eleves.map((x, i) => [x.id, i + 1])); rendre(); return;
    }
    if(t.closest('[data-ok]')){
      lire();
      const vus = new Map(); let doublon = null;
      st.num.forEach((n, id) => { if(n > 999) doublon = n; else if(vus.has(n)) doublon = n; vus.set(n, id); });
      if(doublon){ st.err = 'Le numéro ' + doublon + ' est utilisé deux fois (ou dépasse 999).'; rendre(); return; }
      const { error: e1 } = await sb.from('qz_cartes').delete().eq('class_id', st.classId);
      const rows = [...st.num.entries()].map(([student_id, numero]) => ({ class_id: st.classId, student_id, numero, updated_at: new Date().toISOString() }));
      const { error: e2 } = e1 ? { error: e1 } : rows.length ? await sb.from('qz_cartes').insert(rows) : { error: null };
      if(e2){ st.err = 'Erreur : ' + e2.message; rendre(); return; }
      if(qzD && qzc && qzD.row.class_id === st.classId) await qzcChargerNumeros();
      st.err = ''; o.remove(); if(apres) apres();
      if(qzD && qzc) qzDirectRender();
      return;
    }
    if(t.closest('[data-imp]')){
      lire();
      const de = parseInt(o.querySelector('[data-de]').value, 10) || 1, a = parseInt(o.querySelector('[data-a]').value, 10) || de;
      let noms = null;
      if(o.querySelector('[data-noms]').checked){ noms = new Map(); st.eleves.forEach(x => { const n = st.num.get(x.id); if(n) noms.set(n, x.prenom || x.label); }); }
      qzcImprimer(de, a, noms);
    }
  });
}

/* ------------------------------ Séance (ordinateur) ------------------------------ */
function qzcActif(){ return !!(qzD && qzD.row && qzD.row.acces === 'cartes'); }
function qzcNouveauCode(){ const a = new Uint8Array(8); crypto.getRandomValues(a); return Array.from(a, x => QZC_ALPHA[x % QZC_ALPHA.length]).join(''); }
function qzcUrl(){ return location.origin + '/flash.html?c=' + qzc.code; }
async function qzcChargerNumeros(){
  const num = await qzcNumeros(qzD.row.class_id), ids = new Set(qzD.eleves.map(e => e.id));
  qzc.num = new Map([...num.entries()].filter(([id]) => ids.has(id)));
  qzc.carte = new Map([...qzc.num.entries()].map(([id, n]) => [n, id]));
}
// Appelé par qzDirectOuvrir pour une séance à cartes (avant le premier rendu).
async function qzcOuvrir(){
  qzcFermer();
  const id = qzD.id;
  let code = null; try{ code = localStorage.getItem('qzcCode:' + id); }catch(e){}
  if(!code || code.length !== 8){ code = qzcNouveauCode(); try{ localStorage.setItem('qzcCode:' + id, code); }catch(e){} }
  qzc = { id, code, carte: new Map(), num: new Map(), raz: 0, telVu: 0, voir: false };
  await qzcChargerNumeros();
  if(qzD.row.ended_at) return;
  qzc.ch = sb.channel('qzc-' + code, { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'lu' }, ({ payload }) => qzcLus(payload || {}))
    .on('broadcast', { event: 'hello' }, () => { const neuf = !qzcTelRelie(); qzc.telVu = Date.now(); qzcTelEnvoyer(); if(neuf) qzcMajTel(); })
    .subscribe();
  qzc.veille = setInterval(() => {
    if(!qzc || !qzcActif()){ return; }
    qzcTelEnvoyer(); qzcMajTel();
    if(qzcProjWin && qzcProjWin.closed){ qzcProjWin = null; qzDirectRender(); }
  }, 3000);
}
function qzcFermer(){
  if(!qzc) return;
  clearInterval(qzc.veille);
  try{ if(qzc.ch){ qzc.ch.send({ type: 'broadcast', event: 'etat', payload: { phase: 'ferme' } }); sb.removeChannel(qzc.ch); } }catch(e){}
  if(qzcProjWin && !qzcProjWin.closed) qzcProjEnvoyer({ type: 'fin' });
  qzc = null;
}
function qzcCle(){ return (qzD.etat.qid || '') + '#' + (qzc.raz || 0); }
function qzcRaz(){ if(qzc) qzc.raz++; }
function qzcTelRelie(){ return !!(qzc && Date.now() - qzc.telVu < 12000); }
function qzcPageCourante(){ const i = qzDirectIndex(); return i >= 0 ? qzD.pages[i] : null; }
function qzcLusQ(q){ // numéro → lettre, pour la question q
  const reps = qzD.reps.get(q.id) || new Map(), l = {};
  qzc.num.forEach((n, sid) => { const L = qzcLettre(q, reps.get(sid)); if(L) l[n] = L; });
  return l;
}
// Lectures envoyées par le téléphone : enregistrées comme réponses validées de la question en cours.
async function qzcLus(p){
  if(!qzc || !qzcActif()) return;
  qzc.telVu = Date.now();
  const pg = qzcPageCourante();
  if(!pg || p.cle !== qzcCle() || qzD.etat.phase !== 'question' || qzDFerme(pg.q.id)){ qzcTelEnvoyer(); return; }
  const q = pg.q;
  if(!qzD.reps.has(q.id)) qzD.reps.set(q.id, new Map());
  if(!qzD.valides.has(q.id)) qzD.valides.set(q.id, new Set());
  const reps = qzD.reps.get(q.id), val = qzD.valides.get(q.id), rows = [], avant = new Map();
  (p.l || []).forEach(([num, L]) => {
    const sid = qzc.carte.get(Number(num)); if(!sid) return;
    const rep = qzcReponse(q, L); if(rep === undefined) return;
    if(JSON.stringify(reps.get(sid)) === JSON.stringify(rep)) return;
    avant.set(sid, reps.get(sid)); reps.set(sid, rep); val.add(sid);
    rows.push({ direct_id: qzD.id, student_id: sid, qid: q.id, reponse: rep, valide: true, updated_at: new Date().toISOString() });
  });
  if(rows.length){
    qzDirectMajStats();
    const { error } = await sb.from('qz_direct_rep').upsert(rows, { onConflict: 'direct_id,student_id,qid' });
    if(error){ console.warn('Cartes flashcode : réponses non enregistrées', error); avant.forEach((r, sid) => { if(r === undefined){ reps.delete(sid); val.delete(sid); } else reps.set(sid, r); }); qzDirectMajStats(); }
  }
  qzcTelEnvoyer();
}
// État envoyé au téléphone : question en cours, cartes déjà enregistrées, numéros attendus.
function qzcTelEnvoyer(){
  if(!qzc || !qzc.ch || !qzD) return;
  const pg = qzcPageCourante(), fin = !!qzD.row.ended_at || qzD.etat.phase === 'fin';
  const phase = fin ? 'fin' : !pg || qzD.etat.phase === 'attente' ? 'attente' : qzD.etat.phase === 'correction' ? 'correction' : qzDFerme(pg.q.id) ? 'close' : 'question';
  const payload = { cle: qzcCle(), phase, n: qzDirectIndex() + 1, total: qzD.pages.length, titre: qzD.row.titre || '',
    lus: pg ? qzcLusQ(pg.q) : {}, attendus: [...qzc.num.values()].sort((a, b) => a - b), sans: qzD.eleves.length - qzc.num.size,
    lettres: pg ? qzcChoix(pg.q).length : 4 };
  try{ qzc.ch.send({ type: 'broadcast', event: 'etat', payload }); }catch(e){}
}
function qzcMajTel(){ const el = document.getElementById('qzcTel'); if(el) el.outerHTML = qzcTelPill(); }
function qzcTelPill(){
  const ok = qzcTelRelie();
  return `<button type="button" id="qzcTel" class="qzd-tg${ok ? ' on' : ''}" onclick="qzcRelierTel()" title="Relier le téléphone qui lit les cartes"><span class="gicon">${ok ? 'phonelink_ring' : 'smartphone'}</span> ${ok ? 'Téléphone relié' : 'Relier le téléphone'}</button>`;
}
function qzcQrLienHtml(){
  const q = qrcode(0, 'M'); q.addData(qzcUrl()); q.make();
  return `<div class="qzc-lien"><div class="qzc-lien-qr">${q.createSvgTag({ cellSize: 4, margin: 2, scalable: true })}</div>
    <div><b>Avec votre téléphone</b>, scannez ce code (appareil photo) : la page de lecture des cartes s'ouvre, sans connexion au site.
    <small>Ou tapez l'adresse <b>${qzEsc(location.host)}/flash.html</b> et le code <b class="qzc-code">${qzc.code.slice(0, 4)}-${qzc.code.slice(4)}</b></small></div></div>`;
}
function qzcRelierTel(){
  const o = document.createElement('div'); o.className = 'qzd-ov';
  o.innerHTML = `<div class="qzd-modal" role="dialog" aria-label="Relier le téléphone"><h3><span class="gicon">smartphone</span> Relier le téléphone</h3>
    ${qzcQrLienHtml()}<p class="hint">Le téléphone lit en même temps toutes les cartes qu'il voit : passez dans les rangs en visant les cartes levées. Rien n'est enregistré sur le téléphone.</p>
    <div style="display:flex;justify-content:flex-end;"><button type="button" class="btn" data-x>OK</button></div></div>`;
  o.addEventListener('click', e => { if(e.target === o || e.target.closest('[data-x]')) o.remove(); });
  document.body.appendChild(o);
}

/* -------------------------- Rendu (écran du professeur) -------------------------- */
function qzcProjOuverte(){ return !!(qzcProjWin && !qzcProjWin.closed); }
// Résultats visibles : sur l'écran du professeur quand la projection est dans une autre fenêtre
// (écran étendu), ou s'il les demande explicitement ; jamais sur la projection.
function qzcVoir(){ return qzcProjOuverte() || !!(qzc && qzc.voir); }
function qzcBasculerVoir(){ if(!qzc) return; qzc.voir = !qzc.voir; qzDirectRender(); }
function qzcOutilsHtml(){
  const proj = qzcProjOuverte();
  return `${qzcTelPill()}
    <button type="button" class="qzd-tg${proj ? ' on' : ''}" onclick="qzcProjBasculer()" title="${proj ? 'Fermer la fenêtre de projection' : 'Écran étendu : ouvrir la projection dans une fenêtre à glisser sur le vidéoprojecteur ; les résultats restent sur votre écran'}"><span class="gicon">cast</span> ${proj ? 'Projection ouverte' : 'Projection (écran étendu)'}</button>
    ${proj ? '' : `<button type="button" class="qzd-tg${qzc && qzc.voir ? ' on' : ''}" onclick="qzcBasculerVoir()" title="Écran dupliqué : les résultats sont masqués pour ne pas être projetés"><span class="gicon">${qzc && qzc.voir ? 'visibility' : 'visibility_off'}</span> ${qzc && qzc.voir ? 'Résultats visibles' : 'Résultats masqués'}</button>`}
    <button type="button" class="qzd-tg" onclick="qzcGerer('${qzD.row.class_id}')" title="Numéros des cartes et impression des planches"><span class="gicon">qr_code_2</span> Cartes</button>`;
}
function qzcEleves(){ // élèves de la séance, par numéro de carte (sans carte : à la fin)
  return qzD.eleves.map(e => ({ e, n: qzc.num.get(e.id) || 0 })).sort((a, b) => (a.n || 1e4) - (b.n || 1e4) || a.e.label.localeCompare(b.e.label, 'fr'));
}
function qzcAttenteHtml(){
  const sans = qzD.eleves.length - qzc.num.size;
  return `<div class="qzd-attente qzc-attente">
    <span class="gicon">qr_code_2</span><h2>Sortez les cartes flashcode</h2>
    <p>Pour chaque question, les élèves lèvent la carte de leur réponse (A, B, C ou D) ; vous passez le téléphone devant les cartes.</p>
    ${qzcQrLienHtml()}
    ${sans ? `<p class="qzc-alerte"><span class="gicon">warning</span> ${sans} élève${sans > 1 ? 's n\'ont' : ' n\'a'} pas de numéro de carte. <a href="#" onclick="qzcGerer('${qzD.row.class_id}');return false;">Attribuer les numéros</a></p>` : ''}
    ${qzcGrilleHtml(null, false)}
    <button class="btn qz-go" onclick="qzDirectAller(0)"><span class="gicon">play_arrow</span> Lancer la question 1</button></div>`;
}
function qzcQuestionHtml(p, corr){
  const vf = p.q.type === 'vf';
  return `${p.docs.map(d => `<div class="qz-doc">${qzEnonceHtml(d)}</div>`).join('')}
    <div class="qz-q">${qzEnonceHtml(p.q)}${vf ? `<p class="qzc-aff">${qzMath(p.q.items[0].texte)}</p>` : ''}</div>
    <div class="qzc-choix">${qzcChoix(p.q).map(c => `<div class="qzc-ch${corr && c.correct ? ' ok' : ''}"><span class="qzc-L">${c.L}</span><span class="qzc-t">${c.html}</span>${corr && c.correct ? '<span class="gicon">check_circle</span>' : ''}</div>`).join('')}</div>`;
}
function qzcMainHtml(i, p){
  const corr = qzD.etat.phase === 'correction';
  return `<div class="qzd-main qzc-main">
    <div class="qzd-q">
      <div class="qzd-qhead"><span class="qzd-num">Question ${i + 1} / ${qzD.pages.length}</span>
        ${corr ? '<span class="qzd-phase corr"><span class="gicon">fact_check</span> Correction affichée</span>' : qzDReste() === 0 ? '<span class="qzd-phase clos"><span class="gicon">lock_clock</span> Réponses closes</span>' : '<span class="qzd-phase"><span class="dot"></span> Levez vos cartes !</span>'}
        ${corr ? '' : qzDMinuteurHtml(p.q)}</div>
      ${qzcQuestionHtml(p, corr)}
    </div>
    <div class="qzd-res" id="qzdRes">${qzcResHtml(p.q)}</div></div>`;
}
// Grille des numéros : vert = carte lue, rouge = pas encore. Avec les résultats (écran du professeur
// seulement) : la lettre de chaque élève, colorée juste / faux.
function qzcGrilleHtml(q, voir){
  const reps = q ? qzD.reps.get(q.id) || new Map() : new Map();
  return `<div class="qzc-grille">${qzcEleves().map(({ e, n }) => {
    const r = reps.get(e.id), L = q ? qzcLettre(q, r) : '', v = L && voir ? qzDVerdict(q, r) : '';
    return `<div class="qzc-t ${!n ? 'sans' : L ? 'lu' : q ? 'attente' : ''}" title="${qzEsc(e.label)}${n ? '' : ' : pas de carte'}"><b>${n || '?'}</b><small>${qzEsc(e.prenom || e.label)}</small>${L && voir ? `<i class="${v}">${L}</i>` : ''}</div>`;
  }).join('')}</div>`;
}
function qzcResHtml(q){
  const voir = qzcVoir(), s = qzDStats(q), total = qzc.num.size;
  let h = `<div class="qzd-compte"><div><b>${s.n}</b> / ${total}</div><span>carte${s.n > 1 ? 's' : ''} lue${s.n > 1 ? 's' : ''}</span>
    <div class="qzd-prog"><i style="width:${qzDPct(s.n, total)}%"></i></div>
    ${total && s.n >= total ? '<small class="qzd-tous"><span class="gicon">check_circle</span> Toutes les cartes sont lues</small>' : ''}</div>`;
  if(!voir) h += `<p class="qzd-cache"><span class="gicon">visibility_off</span> Résultats masqués (écran dupliqué). Avec « Projection », ils s'affichent ici, sur votre écran seulement.</p>`;
  else if(s.n){
    const cnt = {}; s.m.forEach(r => { const L = qzcLettre(q, r); cnt[L] = (cnt[L] || 0) + 1; });
    if(!qzX(q).sondage) h += qzDBarre(s.c, s.n, true) + `<div class="qzd-leg">${QZD_VERDICTS.filter(([k]) => s.c[k]).map(([k, l]) => `<span class="${k}"><i></i>${l} <b>${qzDPct(s.c[k], s.n)} %</b> <small>(${s.c[k]})</small></span>`).join('')}</div>`;
    h += `<div class="qzd-det">${qzcChoix(q).map(c => `<div class="qzd-ch${c.correct ? ' ok' : ''}"><span class="l"><b class="qzc-mini">${c.L}</b> ${c.html}</span><span class="b"><i style="width:${qzDPct(cnt[c.L] || 0, s.n)}%"></i></span><b>${cnt[c.L] || 0}</b></div>`).join('')}</div>`;
  }
  return h + qzcGrilleHtml(q, voir);
}
// Après chaque rendu : projection et téléphone à jour.
function qzcApresRendu(){ if(!qzcActif()) return; qzcProjEnvoyer(); qzcTelEnvoyer(); }

/* -------------------- Projection (écran étendu, fenêtre à part) -------------------- */
function qzcCanalProj(){
  if(!qzcBc && typeof BroadcastChannel !== 'undefined'){
    qzcBc = new BroadcastChannel('atelier-flash');
    qzcBc.onmessage = e => { const m = e.data || {}; if(QZC_PROJ) qzcProjRecu(m); else if(m.type === 'pret') qzcProjEnvoyer(); };
  }
  return qzcBc;
}
async function qzcProjBasculer(){
  if(qzcProjOuverte()){ qzcProjWin.close(); qzcProjWin = null; qzDirectRender(); return; }
  if(typeof BroadcastChannel === 'undefined'){ await niceAlert('Ce navigateur ne permet pas la fenêtre de projection.'); return; }
  qzcCanalProj();
  qzcProjWin = window.open(location.pathname + '?proj=flash', 'atelierFlash', 'width=1100,height=720,resizable=yes');
  if(!qzcProjWin){ await niceAlert('La fenêtre n\'a pas pu s\'ouvrir : autorisez les fenêtres surgissantes (pop-up) pour ce site.'); return; }
  qzDirectRender();
  niceAlert('Fenêtre de projection ouverte : faites-la glisser sur l\'écran du vidéoprojecteur, puis double-cliquez dedans pour la mettre en plein écran. Les résultats s\'affichent maintenant ici, sur votre écran seulement.');
}
// Message envoyé à la projection : jamais de résultats, seulement la question et les cartes lues.
function qzcProjEnvoyer(m){
  if(!qzcProjOuverte()) return;
  const c = qzcCanalProj(); if(!c) return;
  if(m){ c.postMessage(m); return; }
  if(!qzcActif()) return;
  const i = qzDirectIndex(), p = qzD.pages[i], fin = !!qzD.row.ended_at || qzD.etat.phase === 'fin', attente = !p || qzD.etat.phase === 'attente';
  const reps = p ? qzD.reps.get(p.q.id) || new Map() : new Map();
  const tuiles = qzcEleves().filter(x => x.n).map(({ e, n }) => ({ n, p: e.prenom || e.label, lu: !!(p && qzcLettre(p.q, reps.get(e.id))) }));
  c.postMessage({ type: 'etat', titre: qzD.row.titre || '', fin, attente, n: i + 1, total: qzD.pages.length,
    corr: qzD.etat.phase === 'correction', html: p && !attente && !fin ? qzcQuestionHtml(p, qzD.etat.phase === 'correction') : '', tuiles });
}
function qzcProjRecu(m){
  const r = document.getElementById('qzcProj'); if(!r) return;
  if(m.type === 'fin' || (m.type === 'etat' && m.fin)){ r.innerHTML = '<div class="qzc-p-att"><span class="gicon">flag</span><b>Séance terminée</b><small>Bravo à tous !</small></div>'; return; }
  if(m.type !== 'etat') return;
  const lus = m.tuiles.filter(t => t.lu).length;
  const grille = `<div class="qzc-grille grand">${m.tuiles.map(t => `<div class="qzc-t ${m.attente ? '' : t.lu ? 'lu' : 'attente'}"><b>${t.n}</b><small>${qzEsc(t.p)}</small></div>`).join('')}</div>`;
  r.innerHTML = m.attente
    ? `<div class="qzc-p-att"><span class="gicon">qr_code_2</span><b>${qzEsc(m.titre)}</b><small>Sortez vos cartes : A, B, C et D.</small></div>${grille}`
    : `<div class="qzc-p-tete"><span>Question ${m.n} / ${m.total}</span><span class="qzc-p-lus"><b>${lus}</b> / ${m.tuiles.length} cartes lues</span></div>
       <div class="qzc-p-corps"><div class="qzc-p-q">${m.html}</div>${grille}</div>`;
}
function qzcProjDemarrer(){
  document.body.classList.add('qzc-proj-body');
  document.title = 'Questions flash -- projection';
  const r = document.createElement('div'); r.id = 'qzcProj';
  r.innerHTML = '<div class="qzc-p-att"><span class="gicon">cast</span><b>Projection des Questions flash</b><small>En attente de la séance, sur l\'autre fenêtre… Double-clic : plein écran.</small></div>';
  document.body.appendChild(r);
  document.addEventListener('dblclick', () => {
    if(document.fullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else { const el = document.documentElement, f = el.requestFullscreen || el.webkitRequestFullscreen; if(f) f.call(el); }
  });
  qzcCanalProj(); qzcBc.postMessage({ type: 'pret' });
}
if(QZC_PROJ) window.addEventListener('load', () => setTimeout(qzcProjDemarrer, 50));
if(!QZC_PROJ) qzcCanalProj();

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .qzc-l{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0;}
    .qzc-l input[type=number]{width:74px;padding:6px 8px;border-radius:8px;border:1px solid rgba(28,43,57,.2);font:inherit;}
    .qzc-l select{padding:6px 8px;border-radius:8px;}
    .qzc-gerer{max-width:620px;}
    .qzc-liste{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:4px 14px;max-height:340px;overflow:auto;border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:8px 10px;}
    .qzc-el{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:.92rem;}
    .qzc-el input{width:70px;padding:4px 6px;border-radius:8px;border:1px solid rgba(28,43,57,.2);font:600 1rem 'Space Grotesk',sans-serif;text-align:center;}
    .qzc-impr{margin-top:12px;border-top:1px solid rgba(28,43,57,.1);padding-top:10px;}
    .qzc-lien{display:flex;gap:14px;align-items:center;text-align:left;background:rgba(12,91,160,.05);border-radius:14px;padding:12px;margin:12px auto;max-width:560px;}
    .qzc-lien-qr{width:130px;flex:none;background:#fff;border-radius:8px;} .qzc-lien-qr svg{width:100%;height:auto;display:block;}
    .qzc-lien small{display:block;color:#5B6472;margin-top:6px;} .qzc-code{letter-spacing:.12em;font-family:'Space Grotesk',sans-serif;}
    .qzc-alerte{color:#a83c1f !important;display:flex;gap:6px;align-items:center;justify-content:center;}
    .qzc-aff{font-size:1.15rem;font-weight:600;margin:6px 0;}
    .qzc-choix{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:12px;}
    .qzc-ch{display:flex;align-items:center;gap:12px;background:#fff;border:2px solid rgba(28,43,57,.12);border-radius:14px;padding:10px 12px;font-size:1.1rem;}
    .qzc-ch.ok{border-color:#1E7B34;background:#E8F5EA;} .qzc-ch > .gicon{color:#1E7B34;margin-left:auto;}
    .qzc-L{flex:none;width:44px;height:44px;border-radius:10px;background:#1C2B39;color:#fff;display:flex;align-items:center;justify-content:center;font:800 1.6rem Arial,sans-serif;}
    .qzc-ch.ok .qzc-L{background:#1E7B34;}
    .qzc-mini{display:inline-block;min-width:18px;text-align:center;background:#1C2B39;color:#fff;border-radius:4px;font-size:.78rem;margin-right:2px;}
    .qzc-grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(74px,1fr));gap:6px;margin-top:12px;}
    .qzc-t{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:10px;padding:6px 4px;background:#EEF1F5;color:#4E5665;min-height:54px;}
    .qzc-t b{font:700 1.3rem 'Space Grotesk',sans-serif;line-height:1.1;} .qzc-t small{font-size:.72rem;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .qzc-t.attente{background:#C62828;color:#fff;} .qzc-t.lu{background:#1E7B34;color:#fff;animation:qzcLu .35s ease-out;}
    .qzc-t.sans{background:#fff;border:1.5px dashed #C9CED6;color:#8A919C;}
    .qzc-t i{position:absolute;top:-6px;right:-6px;width:24px;height:24px;border-radius:50%;background:#fff;color:#20242E;border:2px solid #8A919C;font:800 .85rem Arial,sans-serif;display:flex;align-items:center;justify-content:center;font-style:normal;}
    .qzc-t i.juste{border-color:#1E7B34;color:#1E7B34;} .qzc-t i.faux{border-color:#C62828;color:#C62828;}
    @keyframes qzcLu{from{transform:scale(1.18);}to{transform:scale(1);}}
    .qzc-attente .qzc-grille{max-width:900px;margin:12px auto;}
    .qzc-proj-body{overflow:hidden;}
    #qzcProj{position:fixed;inset:0;z-index:2147483000;background:#F7F4EE;overflow:auto;padding:2.5vh 2.5vw;display:flex;flex-direction:column;gap:2vh;font-size:clamp(18px,1.9vw,44px);}
    @media (min-width:1300px){ .qzc-p-q{zoom:1.35;} } @media (min-width:1700px){ .qzc-p-q{zoom:1.7;} } @media (min-width:2300px){ .qzc-p-q{zoom:2.2;} }
    .qzc-p-att{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:4vh 0;}
    .qzc-p-att .gicon{font-size:4em;color:#D93025;} .qzc-p-att b{font:700 2em 'Space Grotesk',sans-serif;} .qzc-p-att small{font-size:1.1em;color:#4E5665;}
    .qzc-p-tete{display:flex;justify-content:space-between;align-items:center;font:700 1.1em 'Space Grotesk',sans-serif;color:#0C5BA0;}
    .qzc-p-lus b{font-size:1.5em;color:#1E7B34;}
    .qzc-p-corps{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:2.5vw;align-items:start;}
    .qzc-p-q .qz-q{font-size:1.25em;} .qzc-p-q .qzc-ch{font-size:1.1em;} .qzc-p-q .qzc-L{width:2.2em;height:2.2em;font-size:1.4em;}
    .qzc-grille.grand{grid-template-columns:repeat(auto-fill,minmax(5.2em,1fr));gap:.45em;margin:0;}
    .qzc-grille.grand .qzc-t{min-height:3.6em;} .qzc-grille.grand .qzc-t b{font-size:1.6em;} .qzc-grille.grand .qzc-t small{font-size:.7em;}
    @media (max-width:900px){ .qzc-p-corps{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();
