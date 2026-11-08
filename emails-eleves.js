/* ============================================================
   Adresses e-mail des élèves (Mes classes › Élèves) -- demandé le 08/11/2026 : « Pour les élèves, il serait intéressant
   d'avoir une "option email". L'idée par exemple serait de pouvoir renseigner les emails de l'établissement s'ils en ont,
   de pouvoir également renseigner celui de l'enseignant et ainsi de permettre un envoi direct des mots de passes oubliés
   ou autres. Il peut s'agir de google education ou autres... »
   Choix validés : seules les adresses des domaines déclarés pour l'établissement (jamais Gmail…), saisies par le
   professeur ; l'élève confirme son adresse par un lien (s'il ne s'est jamais connecté, il choisit ensuite son mot de
   passe : identifiants à la création). Mot de passe oublié : lien à l'élève, sinon au professeur (son adresse « Mon
   profil »). Tout passe par la fonction serveur « profil » (actions domaines, eleves-emails, eleve-email).
   ============================================================ */
let eeEtat = { domaines: [], adresses: new Map(), adresseProf: null, etab: null };

function eeEsc(t){ return String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

async function eeOuvrir(){
  if(!currentClassId){ alert('Choisissez d\'abord une classe.'); return; }
  let ov = document.getElementById('eeOverlay');
  if(!ov){
    ov = document.createElement('div'); ov.id = 'eeOverlay'; ov.className = 'modal-overlay';
    ov.onclick = e => { if(e.target === ov) ov.style.display = 'none'; };
    document.body.appendChild(ov);
  }
  ov.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;max-height:90vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon">mail</span> Adresses e-mail des élèves</strong>
      <button class="modal-close" onclick="document.getElementById('eeOverlay').style.display='none'"><span class=gicon>close</span></button>
    </div>
    <div id="eeCorps">Chargement…</div></div>`;
  ov.style.display = 'flex';
  try{
    if(!teacherStudentsCache.length) await renderTeacherStudentsListing();
    const [d, l] = await Promise.all([profilAppel({ action: 'domaines' }), profilAppel({ action: 'eleves-emails', class_id: currentClassId })]);
    eeEtat = { domaines: d.domaines || [], etab: d.etablissement, adresseProf: d.adresse_prof, adresses: new Map((l.eleves || []).map(x => [x.id, x])) };
    eeRendu();
  }catch(e){ document.getElementById('eeCorps').textContent = 'Erreur : ' + e.message; }
}

function eeStatut(a){
  if(a && a.email) return `<span style="color:#1F7A4D;font-weight:700;">✓ ${eeEsc(a.email)}</span>`;
  if(a && a.attente) return `<span style="color:#B26A00;">⏳ ${eeEsc(a.attente)} <span class="hint">(en attente de confirmation par l'élève)</span></span>`;
  if(a && a.expiree) return '<span style="color:#B42318;">Lien de confirmation expiré : renvoyez-le</span>';
  return '<span class="hint">Aucune adresse</span>';
}

function eeRendu(){
  const c = document.getElementById('eeCorps'); if(!c) return;
  const dom = eeEtat.domaines;
  const prof = eeEtat.adresseProf
    ? `Sans adresse confirmée, « Mot de passe oublié » vous envoie le lien à transmettre à l'élève, à <b>${eeEsc(eeEtat.adresseProf)}</b>.`
    : `<b style="color:#B42318;">Vous n'avez pas d'adresse e-mail confirmée</b> : ajoutez-la dans <a href="#/profil" onclick="document.getElementById('eeOverlay').style.display='none'">Mon profil</a> pour recevoir les demandes de mot de passe des élèves qui n'ont pas d'adresse.`;
  const lignes = teacherStudentsCache.map(s => {
    const a = eeEtat.adresses.get(s.id), val = a ? (a.email || a.attente || '') : '';
    return `<tr><td style="font-weight:600;">${eeEsc(s.nom)}<div class="hint" style="font-weight:400;">${eeEsc(s.identifiant)}</div></td>
      <td>${eeStatut(a)}<div style="display:flex;gap:6px;margin-top:4px;"><input type="email" id="ee-${s.id}" value="${eeEsc(val)}" placeholder="${dom[0] ? 'prenom.nom@' + eeEsc(dom[0]) : 'adresse de l\'établissement'}" style="flex:1;min-width:0;" ${dom.length ? '' : 'disabled'}>
      <button class="btn secondary" style="font-size:.75rem;padding:4px 8px;" onclick="eeEnregistrer('${s.id}')" ${dom.length ? '' : 'disabled'}>${a && (a.attente || a.expiree) ? 'Renvoyer' : 'Enregistrer'}</button>
      ${a && (a.email || a.attente) ? `<button class="btn secondary" style="font-size:.75rem;padding:4px 8px;" title="Retirer l'adresse" onclick="eeRetirer('${s.id}')"><span class=gicon>delete</span></button>` : ''}</div>
      <div class="hint" id="ee-st-${s.id}"></div></td></tr>`;
  }).join('');
  c.innerHTML = `
    <p class="hint" style="margin:0 0 10px;">Seules les adresses fournies par l'établissement sont acceptées (messagerie de l'établissement, ENT, Google Workspace for Education…),
      jamais une adresse personnelle. L'élève reçoit un lien pour <b>confirmer</b> son adresse ; s'il ne s'est jamais connecté, il choisit ensuite son mot de passe.
      Une adresse confirmée lui permet de recevoir lui-même le lien « Mot de passe oublié ».</p>
    <fieldset style="border:1px solid var(--line,#D6DEE8);border-radius:10px;padding:10px 12px;margin:0 0 12px;">
      <legend style="font-weight:700;padding:0 6px;">Domaines des adresses${eeEtat.etab ? ' · ' + eeEsc(eeEtat.etab) : ''}</legend>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="eeDomaines" value="${eeEsc(dom.join(', '))}" placeholder="ex. eleves.college-victor-hugo.fr" style="flex:1;min-width:220px;">
        <button class="btn" style="font-size:.8rem;" onclick="eeDomainesEnregistrer()">Enregistrer les domaines</button>
      </div>
      <div class="hint" id="eeDomStatut" style="margin-top:4px;">${dom.length ? 'Plusieurs domaines : séparez-les par des virgules. Ils valent pour tous les professeurs de l\'établissement.' : 'Indiquez d\'abord la fin des adresses des élèves (ce qui suit le @).'}</div>
    </fieldset>
    <p class="hint" style="margin:0 0 10px;">${prof}</p>
    <details style="margin:0 0 12px;"><summary style="cursor:pointer;font-weight:600;">Coller une liste d'adresses</summary>
      <p class="hint" style="margin:6px 0;">Une ligne par élève : son identifiant (ou son nom) puis son adresse, séparés par un point-virgule, une tabulation ou une virgule (copie d'un tableur, de l'ENT…).</p>
      <textarea id="eeListe" rows="5" style="width:100%;" placeholder="l.martin ; lea.martin@eleves.college-x.fr"></textarea>
      <button class="btn secondary" style="margin-top:6px;" onclick="eeListeEnregistrer()" ${dom.length ? '' : 'disabled'}>Enregistrer la liste</button>
      <div class="hint" id="eeListeStatut"></div></details>
    <table class="sup-table"><thead><tr><th>Élève</th><th>Adresse e-mail</th></tr></thead><tbody>${lignes}</tbody></table>`;
}

async function eeDomainesEnregistrer(){
  const st = document.getElementById('eeDomStatut');
  const liste = (document.getElementById('eeDomaines').value || '').split(/[\s,;]+/).map(x => x.trim()).filter(Boolean);
  st.textContent = 'Enregistrement…';
  try{ const r = await profilAppel({ action: 'domaines', domaines: liste }); eeEtat.domaines = r.domaines || []; eeRendu(); }
  catch(e){ st.innerHTML = '<span style="color:#B42318;">' + eeEsc(e.message) + '</span>'; }
}

async function eeEnvoi(id, email){
  const r = await profilAppel({ action: 'eleve-email', student_id: id, email });
  const a = eeEtat.adresses.get(id) || { id };
  if(r.retire) eeEtat.adresses.delete(id);
  else if(!r.deja) eeEtat.adresses.set(id, Object.assign(a, { attente: r.attente, expiree: false, email: a.email || null }));
  return r;
}
async function eeEnregistrer(id){
  const st = document.getElementById('ee-st-' + id), email = (document.getElementById('ee-' + id).value || '').trim();
  if(!email){ st.textContent = 'Saisissez une adresse (ou utilisez la corbeille pour la retirer).'; return; }
  st.textContent = 'Envoi du lien de confirmation…';
  try{ const r = await eeEnvoi(id, email); eeRendu(); const s2 = document.getElementById('ee-st-' + id); if(s2) s2.textContent = r.deja ? 'Cette adresse est déjà confirmée.' : 'Lien de confirmation envoyé à l\'élève.'; }
  catch(e){ st.innerHTML = '<span style="color:#B42318;">' + eeEsc(e.message) + '</span>'; }
}
async function eeRetirer(id){
  if(!confirm('Retirer l\'adresse de cet élève ?')) return;
  try{ await eeEnvoi(id, ''); eeRendu(); }catch(e){ alert(e.message); }
}

// Liste collée : « identifiant ; adresse » (ou nom), une ligne par élève.
async function eeListeEnregistrer(){
  const st = document.getElementById('eeListeStatut');
  const norm = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  const lignes = (document.getElementById('eeListe').value || '').split(/\n+/).map(l => l.trim()).filter(Boolean);
  let ok = 0; const erreurs = [];
  for(const l of lignes){
    const m = l.match(/^(.*?)[;\t,]\s*([^\s;,]+@[^\s;,]+)\s*$/);
    if(!m){ erreurs.push(`« ${l} » : ligne non comprise`); continue; }
    const cle = norm(m[1]);
    const el = teacherStudentsCache.find(s => norm(s.identifiant) === cle || norm(s.nom) === cle || norm(String(s.nom).split(' ').reverse().join(' ')) === cle);
    if(!el){ erreurs.push(`« ${m[1].trim()} » : élève introuvable dans cette classe`); continue; }
    st.textContent = `Envoi ${ok + erreurs.length + 1} / ${lignes.length}…`;
    try{ await eeEnvoi(el.id, m[2]); ok++; }catch(e){ erreurs.push(`${el.nom} : ${e.message}`); }
  }
  eeRendu();
  const s2 = document.getElementById('eeListeStatut');
  if(s2) s2.innerHTML = `${ok} lien${ok > 1 ? 's' : ''} de confirmation envoyé${ok > 1 ? 's' : ''}.` + (erreurs.length ? '<br><span style="color:#B42318;">' + erreurs.map(eeEsc).join('<br>') + '</span>' : '');
}
