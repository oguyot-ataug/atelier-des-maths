/* ============================================================
   Bandeaux d'information -- demandé le 08/11/2026 : « Peut-on mettre une option "bandeau" qui permet à l'administrateur
   de placer un bandeau d'information (destination à définir sous chips à cocher), un référent établissement et un
   professeur pour une ou plusieurs classes. »
   - Administrateur (Administration › Bandeaux) : tout le site, destinataires cochés (visiteurs, élèves, professeurs,
     parents, référents), niveaux et établissements facultatifs.
   - Référent (Mon établissement › Bandeaux) : professeurs et/ou élèves de son établissement, niveaux facultatifs.
   - Professeur (Mes classes › « Bandeau d'information ») : élèves et/ou professeurs d'une ou plusieurs de ses classes.
   Table public.bandeaux (supabase/sql/2026-11-08-bandeaux.sql, règles d'accès dans la base) ; affichage par la fonction
   bandeaux_pour_moi(), sous le bandeau des professeurs en essai. Un bandeau fermé (✕) le reste sur l'appareil tant qu'il
   n'est pas modifié. Jamais sur L'Atelier du Prof, jamais à l'impression.
   ============================================================ */
const BD_STYLES = {
  info:      { nom: 'Information', ico: 'info' },
  important: { nom: 'Important',   ico: 'campaign' },
  alerte:    { nom: 'Alerte',      ico: 'warning' },
  succes:    { nom: 'Bonne nouvelle', ico: 'celebration' },
};
const BD_CIBLES = { visiteur: 'Visiteurs (non connectés)', eleve: 'Élèves', prof: 'Professeurs', parent: 'Parents', referent: 'Référents d\'établissement' };
const BD_NIVEAUX = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6e', '5e', '4e', '3e'];
const BD_FERMES_CLE = 'bandeauxFermes';

function bdEsc(t){ return String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
// Texte du bandeau : échappé ; **gras** permis.
function bdTexteHtml(t){ return bdEsc(String(t || '').replace(/\s+/g, ' ').trim()).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
function bdFermes(){ try{ return JSON.parse(localStorage.getItem(BD_FERMES_CLE) || '{}') || {}; }catch(e){ return {}; } }
function bdFermer(id, maj){
  const f = bdFermes(); f[id] = maj;
  try{ localStorage.setItem(BD_FERMES_CLE, JSON.stringify(f)); }catch(e){}
  const el = document.querySelector('#bandeauxInfo [data-bd="' + id + '"]'); if(el) el.remove();
}
function bdLienClic(lien){
  if(!lien) return;
  if(lien.startsWith('#/')){ location.hash = lien.slice(1); return; }
  window.open(lien, '_blank', 'noopener');
}

// Un bandeau, tel qu'il s'affiche (aussi pour l'aperçu de l'éditeur).
function bdBandeauHtml(b, apercu){
  const st = BD_STYLES[b.style] || BD_STYLES.info, txt = bdTexteHtml(b.texte) || '<span style="opacity:.7">Votre message…</span>';
  const corps = b.defile
    ? `<div class="bd-fenetre"><div class="bd-defile"><span class="bd-txt">${txt}<span class="bd-sep">✦</span></span><span class="bd-txt" aria-hidden="true">${txt}<span class="bd-sep">✦</span></span></div></div>`
    : `<div class="bd-fixe">${txt}</div>`;
  const lien = b.lien ? `<button type="button" class="bd-lien" ${apercu ? '' : `onclick="bdLienClic(${bdEsc(JSON.stringify(b.lien))})"`}>${bdEsc(b.lien_libelle || 'En savoir plus')}<span class="gicon">${b.lien.startsWith('#/') ? 'arrow_forward' : 'open_in_new'}</span></button>` : '';
  const fermer = b.fermable ? `<button type="button" class="bd-fermer" aria-label="Masquer ce message" title="Masquer ce message" ${apercu ? '' : `onclick="bdFermer('${b.id}', '${bdEsc(b.maj)}')"`}>✕</button>` : '';
  return `<div class="bandeau-info bd-${bdEsc(b.style)}${b.defile ? ' bd-anime' : ''}" data-bd="${bdEsc(b.id || '')}" role="status">
    <span class="gicon bd-ico" aria-hidden="true">${st.ico}</span>
    <span class="bd-origine">${bdEsc(b.origine || '')}</span>${corps}${lien}${fermer}</div>`;
}

// Affichage : à chaque ouverture de page et à chaque changement de compte (refreshAuthUI).
let bdMajEnCours = 0;
async function bandeauxInfoMaj(){
  const box = document.getElementById('bandeauxInfo'); if(!box) return;
  if(window.ADP || typeof sb === 'undefined'){ box.innerHTML = ''; return; }
  const n = ++bdMajEnCours;
  let liste = [];
  try{ const { data, error } = await sb.rpc('bandeaux_pour_moi'); if(!error && Array.isArray(data)) liste = data; }catch(e){}
  if(n !== bdMajEnCours) return; // une mise à jour plus récente est partie
  const f = bdFermes();
  box.innerHTML = liste.filter(b => !(b.fermable && f[b.id] === b.maj)).map(b => bdBandeauHtml(b)).join('');
}

/* ------------------------------------------------------------------ Éditeur (commun aux trois portées) */
let bdCtx = null; // { mode: 'site'|'etablissement'|'classes', classes:[], etabs:[], liste:[], edition:null, rootId }

function bdChips(nom, options, coches){
  return `<div class="bd-chips" data-chips="${nom}">${options.map(([v, l]) =>
    `<label class="bd-chip"><input type="checkbox" value="${bdEsc(v)}" ${coches.includes(v) ? 'checked' : ''} onchange="bdApercu()"><span>${bdEsc(l)}</span></label>`).join('')}</div>`;
}
function bdChipsVal(nom){ return [...document.querySelectorAll(`#bdForm [data-chips="${nom}"] input:checked`)].map(i => i.value); }
function bdDate(d){ if(!d) return ''; const x = new Date(d); return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
function bdDateFr(d){ return d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''; }

function bdDestinataires(b){
  const c = (b.cibles || []).map(x => (BD_CIBLES[x] || x).replace(/ \(.*\)/, '').toLowerCase());
  let t = c.join(', ');
  if(b.portee === 'classes'){
    const n = (b.class_ids || []).length;
    const noms = bdCtx.mode === 'classes' ? (b.class_ids || []).map(id => { const k = bdCtx.classes.find(x => x.id === id); return k ? k.nom : 'classe archivée'; }) : [n + ' classe' + (n > 1 ? 's' : '')];
    t = (b.cibles || []).map(x => x === 'eleve' ? 'élèves' : 'professeurs').join(' et ') + ' · ' + noms.join(', ');
  }
  if(b.portee === 'etablissement' && bdCtx.mode === 'site') t += ' · ' + bdEsc(b.uai);
  if((b.niveaux || []).length) t += ' · ' + b.niveaux.join(', ');
  if((b.uais || []).length) t += ' · ' + b.uais.map(u => { const e = (bdCtx.etabs || []).find(x => x.uai === u); return e ? e.nom : u; }).join(', ');
  return t;
}
function bdEtat(b){
  const now = Date.now();
  if(!b.actif) return '<span class="bd-etat bd-etat-off">En pause</span>';
  if(new Date(b.debut).getTime() > now) return `<span class="bd-etat bd-etat-attente">À partir du ${bdDateFr(b.debut)}</span>`;
  if(b.fin && new Date(b.fin).getTime() <= now) return '<span class="bd-etat bd-etat-off">Terminé</span>';
  return `<span class="bd-etat bd-etat-on">En ligne${b.fin ? ' jusqu\'au ' + bdDateFr(new Date(new Date(b.fin).getTime() - 1)) : ''}</span>`;
}

async function bdCharger(){
  const m = bdCtx.mode;
  let q = sb.from('bandeaux').select('*').order('created_at', { ascending: false });
  if(m === 'etablissement') q = q.eq('portee', 'etablissement').eq('uai', currentReferentEtab.uai);
  if(m === 'classes') q = q.eq('portee', 'classes').eq('auteur', currentUser.id);
  const { data, error } = await q; if(error) throw error;
  bdCtx.liste = data || [];
}

function bdRendu(){
  const root = document.getElementById(bdCtx.rootId); if(!root) return;
  const m = bdCtx.mode;
  const intro = m === 'site'
    ? 'Un message en haut de toutes les pages du site, pour les destinataires que vous cochez. Les bandeaux des référents et des professeurs apparaissent aussi ci-dessous (vous pouvez les mettre en pause ou les supprimer).'
    : m === 'etablissement'
      ? `Un message en haut des pages pour les professeurs et/ou les élèves de <b>${bdEsc(currentReferentEtab.nom || currentReferentEtab.uai)}</b>.`
      : 'Un message en haut des pages pour les élèves d\'une ou plusieurs de vos classes (et, si vous le souhaitez, pour vos collègues qui ont ces classes).';
  const lignes = bdCtx.liste.map(b => {
    const modifiable = m === 'site' ? b.portee === 'site' : true;
    return `<div class="bd-ligne">
      <div class="bd-ligne-apercu">${bdBandeauHtml(Object.assign({}, b, { origine: b.portee === 'site' ? '' : b.portee === 'etablissement' ? 'Établissement' : 'Classes' }), true)}</div>
      <div class="bd-ligne-infos">${bdEtat(b)} <span class="hint">Pour : ${bdDestinataires(b)}</span>
        <span class="bd-ligne-actions">
          ${modifiable ? `<button class="btn secondary" onclick="bdEditer('${b.id}')"><span class="gicon">edit</span> Modifier</button>` : ''}
          <button class="btn secondary" onclick="bdBasculer('${b.id}')"><span class="gicon">${b.actif ? 'pause' : 'play_arrow'}</span> ${b.actif ? 'Mettre en pause' : 'Remettre en ligne'}</button>
          <button class="btn secondary" title="Supprimer" onclick="bdSupprimer('${b.id}')"><span class="gicon">delete</span></button>
        </span></div></div>`;
  }).join('');
  root.innerHTML = `<p class="hint" style="margin:0 0 12px;max-width:80ch;">${intro}</p>
    <div id="bdFormBox">${bdFormHtml(bdCtx.edition)}</div>
    <h3 style="margin:18px 0 8px;font-family:'Space Grotesk',sans-serif;">${m === 'classes' ? 'Mes bandeaux' : 'Bandeaux enregistrés'}</h3>
    ${lignes || '<p class="hint">Aucun bandeau pour l\'instant.</p>'}`;
  bdApercu();
}

function bdFormHtml(b){
  const m = bdCtx.mode, e = b || { style: 'info', cibles: m === 'classes' ? ['eleve'] : [], niveaux: [], uais: [], class_ids: m === 'classes' && typeof currentClassId !== 'undefined' && currentClassId ? [currentClassId] : [], fermable: true, defile: false, debut: new Date().toISOString() };
  let dest = '';
  if(m === 'site'){
    dest = `<div class="bd-champ"><b>Destinataires</b>${bdChips('cibles', Object.entries(BD_CIBLES), e.cibles)}</div>
      <div class="bd-champ"><b>Niveaux</b> <span class="hint">(facultatif : rien de coché = tous les niveaux ; élèves et professeurs d'après leurs classes, parents d'après leurs enfants)</span>${bdChips('niveaux', BD_NIVEAUX.map(n => [n, n]), e.niveaux)}</div>
      <div class="bd-champ"><b>Établissements</b> <span class="hint">(facultatif : rien de coché = tous ; ne concerne pas les visiteurs)</span>${bdCtx.etabs.length ? bdChips('uais', bdCtx.etabs.map(x => [x.uai, x.nom || x.uai]), e.uais) : '<div class="hint">Aucun établissement enregistré.</div>'}</div>`;
  } else if(m === 'etablissement'){
    dest = `<div class="bd-champ"><b>Destinataires</b>${bdChips('cibles', [['prof', 'Professeurs de l\'établissement'], ['eleve', 'Élèves de l\'établissement']], e.cibles)}</div>
      <div class="bd-champ"><b>Niveaux</b> <span class="hint">(facultatif : rien de coché = tous les niveaux)</span>${bdChips('niveaux', BD_NIVEAUX.map(n => [n, n]), e.niveaux)}</div>`;
  } else {
    dest = `<div class="bd-champ"><b>Classes</b>${bdCtx.classes.length ? bdChips('classes', bdCtx.classes.map(c => [c.id, c.nom + (c.niveau ? ' (' + c.niveau + ')' : '')]), e.class_ids) : '<div class="hint">Vous n\'avez pas encore de classe.</div>'}</div>
      <div class="bd-champ"><b>Destinataires</b>${bdChips('cibles', [['eleve', 'Élèves de ces classes'], ['prof', 'Autres professeurs de ces classes']], e.cibles)}</div>`;
  }
  return `<form id="bdForm" class="bd-form" onsubmit="event.preventDefault(); bdEnregistrer();" oninput="bdApercu()">
    <div class="bd-form-titre"><span class="gicon">${b ? 'edit' : 'add_circle'}</span> ${b ? 'Modifier le bandeau' : 'Nouveau bandeau'}</div>
    <div class="bd-champ"><b>Message</b> <span class="hint">(500 caractères au plus ; **mot** pour mettre en gras)</span>
      <textarea id="bdTexte" rows="2" maxlength="500" required style="width:100%;">${bdEsc(e.texte || '')}</textarea></div>
    <div class="bd-champ"><b>Couleur</b><div class="bd-chips">${Object.entries(BD_STYLES).map(([k, s]) =>
      `<label class="bd-chip bd-chip-${k}"><input type="radio" name="bdStyle" value="${k}" ${e.style === k ? 'checked' : ''} onchange="bdApercu()"><span><span class="gicon">${s.ico}</span> ${s.nom}</span></label>`).join('')}</div></div>
    ${dest}
    <div class="bd-champ bd-ligne-champs">
      <label><span>Lien <span class="hint">(facultatif)</span></span><input type="text" id="bdLien" value="${bdEsc(e.lien || '')}" placeholder="https://… ou #/rendez-vous"></label>
      <label><span>Texte du bouton</span><input type="text" id="bdLienLib" maxlength="40" value="${bdEsc(e.lien_libelle || '')}" placeholder="En savoir plus"></label>
    </div>
    <div class="bd-champ bd-ligne-champs">
      <label><span>Du</span><input type="date" id="bdDebut" value="${bdDate(e.debut)}"></label>
      <label><span>Au <span class="hint">(inclus, facultatif)</span></span><input type="date" id="bdFin" value="${e.fin ? bdDate(new Date(new Date(e.fin).getTime() - 1)) : ''}"></label>
      <label class="bd-coche"><input type="checkbox" id="bdDefile" ${e.defile ? 'checked' : ''} onchange="bdApercu()"> Texte qui défile</label>
      <label class="bd-coche"><input type="checkbox" id="bdFermable" ${e.fermable ? 'checked' : ''} onchange="bdApercu()"> Peut être masqué (✕)</label>
    </div>
    <div class="bd-champ"><b>Aperçu</b><div id="bdApercu"></div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <button type="submit" class="btn"><span class="gicon">${b ? 'save' : 'campaign'}</span> ${b ? 'Enregistrer les modifications' : 'Publier le bandeau'}</button>
      ${b ? '<button type="button" class="btn secondary" onclick="bdEditer(null)">Annuler</button>' : ''}
      <span class="hint" id="bdStatut"></span></div>
  </form>`;
}

function bdLireForm(){
  const v = id => (document.getElementById(id) || {}).value || '';
  const st = (document.querySelector('#bdForm input[name=bdStyle]:checked') || {}).value || 'info';
  const lien = v('bdLien').trim();
  return {
    texte: v('bdTexte').trim(), style: st, lien: lien || null, lien_libelle: lien ? (v('bdLienLib').trim() || null) : null,
    defile: !!(document.getElementById('bdDefile') || {}).checked, fermable: !!(document.getElementById('bdFermable') || {}).checked,
    cibles: bdChipsVal('cibles'), niveaux: bdChipsVal('niveaux'), uais: bdChipsVal('uais'), class_ids: bdChipsVal('classes'),
    debut: v('bdDebut'), fin: v('bdFin'),
  };
}
function bdApercu(){
  const box = document.getElementById('bdApercu'); if(!box) return;
  const f = bdLireForm(), m = bdCtx.mode;
  const origine = m === 'site' ? 'L\'Atelier des Maths' : m === 'etablissement' ? (currentReferentEtab.nom || 'Votre établissement')
    : (document.getElementById('accountNameDisplay') || {}).textContent || 'Votre professeur';
  box.innerHTML = bdBandeauHtml(Object.assign({}, f, { origine, id: '' }), true);
}

async function bdEnregistrer(){
  const st = document.getElementById('bdStatut'), f = bdLireForm(), m = bdCtx.mode;
  const err = t => { st.innerHTML = '<span style="color:#B42318;">' + bdEsc(t) + '</span>'; };
  if(!f.texte) return err('Écrivez le message.');
  if(!f.cibles.length) return err('Cochez au moins un destinataire.');
  if(m === 'classes' && !f.class_ids.length) return err('Cochez au moins une classe.');
  if(f.lien && !/^(https:\/\/[^\s<>"]+|#\/[A-Za-z0-9/_-]*)$/.test(f.lien)) return err('Le lien doit commencer par https:// (ou #/ pour une page du site).');
  const debut = f.debut ? new Date(f.debut + 'T00:00:00') : new Date();
  const fin = f.fin ? new Date(new Date(f.fin + 'T00:00:00').getTime() + 86400000) : null;
  if(fin && fin <= debut) return err('La date de fin doit suivre la date de début.');
  const ligne = { texte: f.texte, style: f.style, lien: f.lien, lien_libelle: f.lien_libelle, defile: f.defile, fermable: f.fermable,
    cibles: f.cibles, niveaux: m === 'classes' ? [] : f.niveaux, uais: m === 'site' ? f.uais : [], class_ids: m === 'classes' ? f.class_ids : [],
    debut: (bdCtx.edition && !f.debut ? bdCtx.edition.debut : debut.toISOString()), fin: fin ? fin.toISOString() : null };
  if(!bdCtx.edition){ ligne.portee = m; ligne.uai = m === 'etablissement' ? currentReferentEtab.uai : null; ligne.actif = true; }
  st.textContent = 'Enregistrement…';
  const { error } = bdCtx.edition
    ? await sb.from('bandeaux').update(ligne).eq('id', bdCtx.edition.id)
    : await sb.from('bandeaux').insert(ligne);
  if(error) return err('Erreur : ' + error.message);
  bdCtx.edition = null;
  await bdCharger(); bdRendu(); bandeauxInfoMaj();
  const s2 = document.getElementById('bdStatut'); if(s2) s2.innerHTML = '<span style="color:#1F7A4D;">✓ Bandeau enregistré.</span>';
}
function bdEditer(id){
  bdCtx.edition = id ? bdCtx.liste.find(b => b.id === id) || null : null;
  document.getElementById('bdFormBox').innerHTML = bdFormHtml(bdCtx.edition); bdApercu();
  document.getElementById('bdFormBox').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
async function bdBasculer(id){
  const b = bdCtx.liste.find(x => x.id === id); if(!b) return;
  const { error } = await sb.from('bandeaux').update({ actif: !b.actif }).eq('id', id);
  if(error){ alert(error.message); return; }
  await bdCharger(); bdRendu(); bandeauxInfoMaj();
}
async function bdSupprimer(id){
  if(!confirm('Supprimer ce bandeau ?')) return;
  const { error } = await sb.from('bandeaux').delete().eq('id', id);
  if(error){ alert(error.message); return; }
  if(bdCtx.edition && bdCtx.edition.id === id) bdCtx.edition = null;
  await bdCharger(); bdRendu(); bandeauxInfoMaj();
}

async function bdOuvrirGestion(mode, rootId){
  bdCtx = { mode, rootId, classes: [], etabs: [], liste: [], edition: null };
  // Un seul éditeur à la fois (identifiants bdForm, bdApercu… uniques) : l'onglet d'administration ou la fenêtre du professeur.
  ['bdAdminRoot', 'bdProfRoot'].forEach(id => { const x = document.getElementById(id); if(x && id !== rootId) x.innerHTML = ''; });
  const root = document.getElementById(rootId); if(root) root.innerHTML = '<p class="hint">Chargement…</p>';
  try{
    const att = [bdCharger()];
    if(mode === 'site') att.push(sb.from('etablissements').select('uai,nom').order('nom').then(r => { bdCtx.etabs = r.data || []; }));
    att.push(sb.from('class_teachers').select('classes(id,nom,niveau,archive)').eq('teacher_id', currentUser.id).then(r => {
      bdCtx.classes = (r.data || []).map(x => x.classes).filter(c => c && !c.archive).sort((a, b) => String(a.nom).localeCompare(String(b.nom), 'fr', { numeric: true }));
    }));
    await Promise.all(att);
    bdRendu();
  }catch(e){ if(root) root.innerHTML = '<p style="color:#B42318;">Erreur : ' + bdEsc(e.message) + '</p>'; }
}

// Professeur : fenêtre ouverte depuis Mes classes.
function bdOuvrirProf(){
  let ov = document.getElementById('bdOverlay');
  if(!ov){
    ov = document.createElement('div'); ov.id = 'bdOverlay'; ov.className = 'modal-overlay';
    ov.onclick = e => { if(e.target === ov) bdFermerProf(); };
    document.body.appendChild(ov);
  }
  ov.innerHTML = `<div class="modal-card" style="max-width:820px;width:100%;max-height:92vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon">campaign</span> Bandeau d'information pour mes classes</strong>
      <button class="modal-close" onclick="bdFermerProf()"><span class=gicon>close</span></button>
    </div><div id="bdProfRoot"></div></div>`;
  ov.style.display = 'flex';
  bdOuvrirGestion('classes', 'bdProfRoot');
}

function bdFermerProf(){
  const ov = document.getElementById('bdOverlay'); if(ov){ ov.style.display = 'none'; ov.innerHTML = ''; }
  const onglet = document.querySelector('#adminTabs [data-admin-tab="bandeaux"]');
  if(onglet && onglet.classList.contains('active')) onglet.click(); // l'éditeur de l'onglet revient
}

// Administration (site) et Mon établissement (référent) : onglet « Bandeaux ».
(function bdAdminInstall(){
  const tabs = document.getElementById('adminTabs'), view = document.getElementById('view-admin');
  if(!tabs || !view) return;
  const btn = document.createElement('button');
  btn.className = 'tab-btn'; btn.dataset.adminTab = 'bandeaux';
  btn.innerHTML = '<span class=gicon>campaign</span> Bandeaux';
  tabs.appendChild(btn);
  const panel = document.createElement('div');
  panel.className = 'tab-panel'; panel.id = 'admin-panel-bandeaux';
  panel.innerHTML = '<div class="tool-shell"><div id="bdAdminRoot"></div></div>';
  view.appendChild(panel);
  btn.addEventListener('click', () => {
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active'); panel.classList.add('active');
    const scoped = typeof adminScopeUai === 'function' && !!adminScopeUai();
    if(scoped && !(typeof currentReferentEtab !== 'undefined' && currentReferentEtab)) return;
    bdOuvrirGestion(scoped ? 'etablissement' : 'site', 'bdAdminRoot');
  });
})();

// Première ouverture : si refreshAuthUI est déjà passé avant le chargement de ce fichier, afficher tout de suite.
if(typeof authUidPrec !== 'undefined' && authUidPrec !== undefined) bandeauxInfoMaj();
