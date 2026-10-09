/* =====================================================================
   cours-bilan.js -- Bilan d'une séance COURS en direct.

   Demandé : « A-t-on un résumé de la séance de cours ? Qui a bien répondu par exercice, qui a levé la
   main, qui a quitté la page... ? »

   Un tableau par séance : une ligne par élève (entré ou non), une colonne par exercice (réponses justes,
   défi réussi), puis les mains levées, les mots du professeur et les sorties de la page (nombre et
   heure de la dernière). Sous chaque exercice : combien ont tout juste. On le consulte depuis la
   télécommande (« Bilan »), à la fin de la séance, ou plus tard depuis le Cahier de corrections
   (« Bilans des séances » : les séances de la classe active). Imprimable.

   Bilan d'un élève (« Permettre aussi d'isoler les bilans complets d'un élève ») : toutes les sessions de sa
   classe, de la plus récente à la plus ancienne, avec sa présence, ses résultats exercice par exercice, ses
   mains levées et ses sorties de la page. Depuis la page Sessions, ou d'un clic sur son nom dans un bilan.

   Données : cours_direct (éléments, corrigés compris côté professeur), cours_direct_membres (entrée,
   sorties), cours_direct_travaux (réponses ; _mains = mains levées, _mot = mot du professeur).
   ===================================================================== */

async function cdBilan(id){
  if(!currentClassId && !id && !cdP){ await niceAlert('Choisissez d\'abord la classe en haut de la page.'); return; }
  let o = document.getElementById('cdBilan');
  if(!o){ o = document.createElement('div'); o.id = 'cdBilan'; o.className = 'modal-overlay'; o.style.zIndex = '9450'; document.body.appendChild(o); }
  o.innerHTML = '<div class="modal-card cdb"><p class="hint">Chargement du bilan…</p></div>'; o.style.display = 'flex';
  o.onclick = e => { if(e.target === o) o.style.display = 'none'; };
  const classe = id ? null : (cdP ? cdP.classId : currentClassId);
  // Séances de la classe (les plus récentes d'abord), pour passer de l'une à l'autre.
  let row = null;
  if(id){ const { data } = await sb.from('cours_direct').select('*').eq('id', id).maybeSingle(); row = data; }
  else if(cdP){ const { data } = await sb.from('cours_direct').select('*').eq('id', cdP.id).maybeSingle(); row = data; }
  if(!row && classe){ const { data } = await sb.from('cours_direct').select('*').eq('teacher_id', currentUser.id).eq('class_id', classe).order('created_at', { ascending: false }).limit(1); row = data && data[0]; }
  if(!row){ o.innerHTML = `<div class="modal-card cdb"><div class="cdb-tete"><b class="cd-h"><span class="gicon">summarize</span> Bilan des séances</b><button class="modal-close" onclick="document.getElementById('cdBilan').style.display='none'"><span class="gicon">close</span></button></div><p class="hint">Aucune séance COURS pour cette classe.</p></div>`; return; }
  const [{ data: seances }, eleves, { data: membres }, { data: travaux }] = await Promise.all([
    sb.from('cours_direct').select('id,titre,created_at').eq('teacher_id', currentUser.id).eq('class_id', row.class_id).order('created_at', { ascending: false }).limit(30),
    qzElevesDevoir({ class_id: row.class_id }).then(l => typeof elevesReels === 'function' ? elevesReels(l) : l),
    sb.from('cours_direct_membres').select('student_id,joined_at,sorties,sortie_at').eq('direct_id', row.id),
    sb.from('cours_direct_travaux').select('item,student_id,reponses').eq('direct_id', row.id)
  ]);
  cdBilanRendre(o, row, seances || [], eleves || [], membres || [], travaux || []);
}
// Résultat d'un élève à un exercice : { j (justes), n (total), txt, cl (ok | moyen | ko | vide) }.
function cdBilanCase(it, rep){
  if(!rep) return { txt: '—', cl: 'vide' };
  if(it.exo.type === 'prog') return rep.reussi ? { txt: 'réussi', cl: 'ok', ok: true } : { txt: rep.programme ? `${rep.blocs || 0} bloc${rep.blocs > 1 ? 's' : ''}` : '—', cl: rep.programme ? 'ko' : 'vide' };
  let j = 0, n = 0, avoir = 0, repondu = 0;
  if(it.exo.type === 'td'){
    if(!rep.res) return { txt: rep.etat ? 'pas vérifié' : '—', cl: rep.etat ? 'moyen' : 'vide' };
    j = rep.res.juste; n = rep.res.total; repondu = 1;
  } else {
    const qs = (it.exo.questions || []).filter(q => q.type !== 'texte'); n = qs.length;
    qs.forEach(q => { const v = qzVerdict(q, rep[q.id]); if(v !== 'vide') repondu++; if(v === 'juste') j++; if(v === 'avoir' || v === 'sondage') avoir++; });
    if(!repondu) return { txt: '—', cl: 'vide' };
  }
  const ok = j === n;
  return { j, n, ok, txt: `${j} / ${n}${avoir ? ` <small>(+${avoir} à lire)</small>` : ''}`, cl: ok ? 'ok' : j * 2 >= n ? 'moyen' : 'ko' };
}
function cdBilanRendre(o, row, seances, eleves, membres, travaux){
  const items = row.items || [], exos = items.map((it, k) => ({ it, k })).filter(x => x.it && x.it.exo);
  const M = new Map(membres.map(m => [m.student_id, m])), T = new Map();
  travaux.forEach(t => T.set(t.item + '|' + t.student_id, t.reponses || {}));
  const hh = d => d ? new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
  const date = new Date(row.created_at).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  // Élèves de la classe, puis ceux qui seraient entrés sans y être (changement de classe…).
  // Équipes (cours-equipes.js) : un élève sans travail à lui reçoit celui de l'ordinateur de son équipe.
  const via = typeof cdEqPostes === 'function' ? cdEqPostes(row.etat) : new Map();
  const repDe = (k, id) => { const r = T.get(k + '|' + id); if(r || !via.has(id)) return { r }; const r2 = T.get(k + '|' + via.get(id)); return { r: r2, eq: !!r2 }; };
  const nomDe = id => { const e = eleves.find(x => x.id === id); return e ? (e.prenom || e.label) : ''; };
  const lignes = eleves.map(e => ({ id: e.id, nom: e.label })).concat(membres.filter(m => !eleves.some(e => e.id === m.student_id)).map(m => ({ id: m.student_id, nom: 'Élève' })));
  const parEx = exos.map(() => ({ ok: 0, commence: 0 }));
  let entres = 0, mainsTot = 0, sortiesTot = 0, motsTot = 0;
  const corps = lignes.map(e => {
    const m = M.get(e.id); if(m) entres++;
    let mains = 0, mots = 0;
    items.forEach((_, k) => { const r = T.get(k + '|' + e.id); if(r){ mains += r._mains || 0; if(r._mot && r._mot.t) mots++; } });
    mainsTot += mains; motsTot += mots; sortiesTot += (m && m.sorties) || 0;
    const cases = exos.map(({ it, k }, i) => { const x = repDe(k, e.id), c = cdBilanCase(it, x.r); if(c.cl !== 'vide') parEx[i].commence++; if(c.ok) parEx[i].ok++; return `<td class="cdb-c ${c.cl}">${c.txt}${x.eq ? '<small class="cdb-eq"> en équipe</small>' : ''}</td>`; }).join('');
    return `<tr class="${m || via.has(e.id) ? '' : 'cdb-absent'}"><th><a href="#" class="cdb-el" data-el="${e.id}" title="Toutes les sessions de cet élève">${cdEsc(e.nom)}</a></th><td>${m ? hh(m.joined_at) : via.has(e.id) ? `<span class="cdb-eq">avec ${cdEsc(nomDe(via.get(e.id)))}</span>` : '<span class="cdb-gris">pas entré</span>'}</td>${cases}
      <td class="cdb-n">${mains ? `<span class="gicon">front_hand</span> ${mains}` : ''}</td><td class="cdb-n">${mots ? `<span class="gicon">chat</span> ${mots}` : ''}</td>
      <td class="cdb-n ${m && m.sorties ? 'cdb-rouge' : ''}">${m && m.sorties ? `${m.sorties} <small>(dernière à ${hh(m.sortie_at)})</small>` : ''}</td></tr>`;
  }).join('');
  const titreEx = ({ it, k }) => cdEsc(String(it.titre || '').replace(/^(Exercice|Programmation|Figure)\s*:\s*/, ''));
  o.innerHTML = `<div class="modal-card cdb">
    <div class="cdb-tete"><b class="cd-h"><span class="gicon">summarize</span> Bilan de la séance</b>
      <select id="cdbSeance">${seances.map(s => `<option value="${s.id}"${s.id === row.id ? ' selected' : ''}>${new Date(s.created_at).toLocaleDateString('fr-FR')} · ${cdEsc(s.titre || 'Séance')}</option>`).join('')}</select>
      <span style="flex:1"></span><button class="btn secondary" id="cdbImprimer"><span class="gicon">print</span> Imprimer</button>
      <button class="modal-close" onclick="document.getElementById('cdBilan').style.display='none'"><span class="gicon">close</span></button></div>
    <div id="cdbFeuille"><h2 class="cdb-h">${cdEsc(row.titre || 'Séance')} <small>${date}${row.ended_at ? '' : ' · en cours'}</small></h2>
    <div class="cdb-chiffres"><span><b>${entres}</b> / ${lignes.length} élèves entrés</span><span><b>${items.length}</b> élément${items.length > 1 ? 's' : ''} dont <b>${exos.length}</b> exercice${exos.length > 1 ? 's' : ''}</span>
      <span><span class="gicon">front_hand</span> <b>${mainsTot}</b> main${mainsTot > 1 ? 's' : ''} levée${mainsTot > 1 ? 's' : ''}</span><span><span class="gicon">chat</span> <b>${motsTot}</b> mot${motsTot > 1 ? 's' : ''} envoyé${motsTot > 1 ? 's' : ''}</span>
      <span class="${sortiesTot ? 'cdb-rouge' : ''}"><span class="gicon">logout</span> <b>${sortiesTot}</b> sortie${sortiesTot > 1 ? 's' : ''} de la page</span></div>
    <div class="cdb-table"><table><thead><tr><th>Élève</th><th>Entré à</th>${exos.map((x, i) => `<th title="${titreEx(x)}">Ex. ${i + 1}<small>${titreEx(x)}</small></th>`).join('')}<th>Mains levées</th><th>Mots reçus</th><th>Sorties</th></tr></thead>
      <tbody>${corps || `<tr><td colspan="${5 + exos.length}" class="hint">Aucun élève dans cette classe.</td></tr>`}</tbody>
      ${exos.length ? `<tfoot><tr><th>Tout juste</th><td></td>${parEx.map(p => `<td class="cdb-c">${p.ok} / ${p.commence}</td>`).join('')}<td colspan="3"></td></tr></tfoot>` : ''}</table></div>
    <p class="hint cdb-leg"><span class="cdb-c ok">tout juste</span> <span class="cdb-c moyen">au moins la moitié</span> <span class="cdb-c ko">moins de la moitié</span> <span class="cdb-c vide">—</span> pas répondu. Pour les questions à corriger soi-même, voir la copie dans la télécommande.</p></div></div>`;
  o.querySelector('#cdbSeance').onchange = e => cdBilan(e.target.value);
  o.querySelectorAll('[data-el]').forEach(a => a.onclick = ev => { ev.preventDefault(); cdBilanEleve(row.class_id, a.dataset.el); });
  o.querySelector('#cdbImprimer').onclick = () => {
    const w = window.open('', '_blank'); if(!w){ niceAlert('Autorisez les fenêtres pour imprimer.'); return; }
    w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Bilan · ${cdEsc(row.titre || 'Séance')}</title><style>${CDB_CSS}
      body{font-family:Inter,Arial,sans-serif;color:#1C2B39;margin:12mm;} .gicon{display:none;} @page{size:A4 landscape;margin:10mm;}</style></head>
      <body>${o.querySelector('#cdbFeuille').innerHTML}<script>setTimeout(()=>print(),300)<\/script></body></html>`);
    w.document.close();
  };
}
/* ---------- Bilan d'un élève : toutes ses sessions ---------- */
async function cdBilanEleve(classId, eleveId){
  let o = document.getElementById('cdBilanEl');
  if(!o){ o = document.createElement('div'); o.id = 'cdBilanEl'; o.className = 'modal-overlay'; o.style.zIndex = '9465'; document.body.appendChild(o); }
  o.onclick = e => { if(e.target === o) o.style.display = 'none'; };
  o.style.display = 'flex';
  const classes = typeof accountClassesList !== 'undefined' ? accountClassesList : [];
  if(!classId){ o.innerHTML = '<div class="modal-card cdb"><p class="hint">Aucune classe.</p></div>'; return; }
  o.innerHTML = '<div class="modal-card cdb"><p class="hint">Chargement…</p></div>';
  const eleves = await qzElevesDevoir({ class_id: classId }).then(l => typeof elevesReels === 'function' ? elevesReels(l) : l);
  if(!eleveId || !eleves.some(e => e.id === eleveId)) eleveId = eleves[0] && eleves[0].id;
  const tete = `<div class="cdb-tete"><b class="cd-h"><span class="gicon">person_search</span> Bilan d'un élève</b>
      <select id="cdbElClasse">${classes.map(c => `<option value="${c.id}"${c.id === classId ? ' selected' : ''}>${cdEsc(c.label)}</option>`).join('')}</select>
      <select id="cdbElEleve">${eleves.map(e => `<option value="${e.id}"${e.id === eleveId ? ' selected' : ''}>${cdEsc(e.label)}</option>`).join('')}</select>
      <span style="flex:1"></span><button class="btn secondary" id="cdbElImprimer"><span class="gicon">print</span> Imprimer</button>
      <button class="modal-close" onclick="document.getElementById('cdBilanEl').style.display='none'"><span class="gicon">close</span></button></div>`;
  const brancher = () => {
    o.querySelector('#cdbElClasse').onchange = e => cdBilanEleve(e.target.value, null);
    o.querySelector('#cdbElEleve').onchange = e => cdBilanEleve(classId, e.target.value);
    o.querySelector('#cdbElImprimer').onclick = () => {
      const f = o.querySelector('#cdbElFeuille'); if(!f) return;
      const w = window.open('', '_blank'); if(!w){ niceAlert('Autorisez les fenêtres pour imprimer.'); return; }
      w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Bilan des sessions</title><style>${CDB_CSS}
        body{font-family:Inter,Arial,sans-serif;color:#1C2B39;margin:12mm;} .gicon{display:none;} @page{size:A4;margin:10mm;}</style></head>
        <body>${f.innerHTML}<script>setTimeout(()=>print(),300)<\/script></body></html>`);
      w.document.close();
    };
  };
  if(!eleveId){ o.innerHTML = `<div class="modal-card cdb">${tete}<p class="hint">Aucun élève dans cette classe.</p></div>`; brancher(); return; }
  const { data: rows0 } = await sb.from('cours_direct').select('id,titre,created_at,ended_at,items,etat').eq('teacher_id', currentUser.id).eq('class_id', classId).order('created_at', { ascending: false }).limit(80);
  // Sessions programmées pas encore commencées : écartées.
  const rows = (rows0 || []).filter(r => !((r.etat || {}).debut && Date.parse(r.etat.debut) > Date.now()));
  const ids = rows.map(r => r.id);
  // Travail en équipe : l'élève sans ordinateur reçoit le travail du poste de son équipe.
  const postes = new Map(rows.map(r => [r.id, typeof cdEqPostes === 'function' ? cdEqPostes(r.etat).get(eleveId) : null]));
  const qui = [...new Set([eleveId, ...[...postes.values()].filter(Boolean)])];
  const [{ data: membres }, { data: travaux }] = ids.length ? await Promise.all([
    sb.from('cours_direct_membres').select('direct_id,joined_at,sorties,sortie_at').in('direct_id', ids).eq('student_id', eleveId),
    sb.from('cours_direct_travaux').select('direct_id,item,student_id,reponses').in('direct_id', ids).in('student_id', qui)
  ]) : [{ data: [] }, { data: [] }];
  const M = new Map((membres || []).map(m => [m.direct_id, m])), T = new Map();
  (travaux || []).forEach(t => T.set(t.direct_id + '|' + t.item + '|' + t.student_id, t.reponses || {}));
  const eleve = eleves.find(e => e.id === eleveId), nomDe = id => { const e = eleves.find(x => x.id === id); return e ? (e.prenom || e.label) : ''; };
  const hh = d => d ? new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
  let presentes = 0, exTot = 0, exFaits = 0, exJustes = 0, mainsTot = 0, sortiesTot = 0;
  const blocs = rows.map(r => {
    const m = M.get(r.id), poste = postes.get(r.id), items = r.items || [];
    const exos = items.map((it, k) => ({ it, k })).filter(x => x.it && x.it.exo);
    if(m || poste) presentes++;
    let mains = 0;
    items.forEach((_, k) => { const x = T.get(r.id + '|' + k + '|' + eleveId); if(x) mains += x._mains || 0; });
    mainsTot += mains; sortiesTot += (m && m.sorties) || 0; exTot += exos.length;
    const lignes = exos.map(({ it, k }, i) => {
      let rep = T.get(r.id + '|' + k + '|' + eleveId), eq = false;
      if(!rep && poste){ rep = T.get(r.id + '|' + k + '|' + poste); eq = !!rep; }
      const c = cdBilanCase(it, rep);
      if(c.cl !== 'vide') exFaits++; if(c.ok) exJustes++;
      return `<tr><th>Ex. ${i + 1} <small>${cdEsc(String(it.titre || '').replace(/^(Exercice|Programmation|Figure)\s*:\s*/, ''))}</small></th><td class="cdb-c ${c.cl}">${c.txt}${eq ? '<small class="cdb-eq"> en équipe</small>' : ''}</td></tr>`;
    }).join('');
    const statut = m ? `entré à ${hh(m.joined_at)}` : poste ? `<span class="cdb-eq">avec ${cdEsc(nomDe(poste))}</span>` : '<span class="cdb-gris">pas entré</span>';
    return `<div class="cdbe-s${m || poste ? '' : ' cdb-absent'}"><div class="cdbe-t"><b>${cdEsc(r.titre || 'Séance')}</b>
        <small>${new Date(r.created_at).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}${r.ended_at ? '' : ' · en cours'} · ${statut}${mains ? ` · <span class="gicon">front_hand</span> ${mains}` : ''}${m && m.sorties ? ` · <span class="cdb-rouge">${m.sorties} sortie${m.sorties > 1 ? 's' : ''} de la page</span>` : ''}</small></div>
      ${exos.length ? `<div class="cdb-table"><table>${lignes}</table></div>` : '<small class="cdb-gris">Pas d\'exercice dans cette session.</small>'}</div>`;
  }).join('');
  o.innerHTML = `<div class="modal-card cdb">${tete}
    <div id="cdbElFeuille"><h2 class="cdb-h">${cdEsc(eleve ? eleve.label : '')} <small>${cdEsc((classes.find(c => c.id === classId) || {}).label || '')} · sessions COURS</small></h2>
    <div class="cdb-chiffres"><span><b>${presentes}</b> / ${rows.length} session${rows.length > 1 ? 's' : ''} suivie${presentes > 1 ? 's' : ''}</span>
      <span><b>${exJustes}</b> exercice${exJustes > 1 ? 's' : ''} tout juste · <b>${exFaits}</b> commencé${exFaits > 1 ? 's' : ''} · ${exTot} proposé${exTot > 1 ? 's' : ''}</span>
      <span><span class="gicon">front_hand</span> <b>${mainsTot}</b> main${mainsTot > 1 ? 's' : ''} levée${mainsTot > 1 ? 's' : ''}</span>
      <span class="${sortiesTot ? 'cdb-rouge' : ''}"><span class="gicon">logout</span> <b>${sortiesTot}</b> sortie${sortiesTot > 1 ? 's' : ''} de la page</span></div>
    ${blocs || '<p class="hint">Aucune session pour cette classe.</p>'}
    <p class="hint cdb-leg"><span class="cdb-c ok">tout juste</span> <span class="cdb-c moyen">au moins la moitié</span> <span class="cdb-c ko">moins de la moitié</span> <span class="cdb-c vide">—</span> pas répondu.</p></div></div>`;
  brancher();
}
const CDB_CSS = `
  .cdb-h{font:700 1.2rem 'Space Grotesk',Arial,sans-serif;margin:6px 0;} .cdb-h small{font-weight:500;color:#5B6472;font-size:.8em;}
  .cdb-chiffres{display:flex;gap:8px 18px;flex-wrap:wrap;margin:4px 0 10px;font-size:.9rem;} .cdb-chiffres .gicon{font-size:16px;vertical-align:middle;}
  .cdb-table{overflow:auto;} .cdb-table table{border-collapse:collapse;font-size:.85rem;min-width:100%;}
  .cdb-table th, .cdb-table td{border:1px solid #DCE2EA;padding:4px 8px;text-align:center;white-space:nowrap;}
  .cdb-table tbody th{text-align:left;font-weight:700;} .cdb-table thead th{background:#F3F5F8;vertical-align:bottom;}
  .cdb-table thead th small{display:block;font-weight:500;color:#5B6472;max-width:140px;overflow:hidden;text-overflow:ellipsis;}
  .cdb-table tfoot th, .cdb-table tfoot td{background:#F3F5F8;font-weight:700;}
  .cdb-c.ok{background:#E3F4EA;color:#1F7A4D;font-weight:700;} .cdb-c.moyen{background:#FDF1DF;color:#A0620F;font-weight:700;} .cdb-c.ko{background:#FBE7EE;color:#9E1F5E;font-weight:700;} .cdb-c.vide{color:#9AA3AF;}
  .cdb-absent th, .cdb-absent td{color:#9AA3AF;} .cdb-gris{color:#9AA3AF;} .cdb-rouge{color:#C0392B;font-weight:700;} .cdb-n .gicon{font-size:15px;vertical-align:middle;}
  .cdb-leg .cdb-c{display:inline-block;padding:0 6px;border-radius:5px;}
  .cdb-eq{color:#3A6EA5;font-weight:600;font-size:.85em;}
  .cdb-el{color:inherit;text-decoration:none;} .cdb-el:hover{text-decoration:underline;color:#1F5FA8;}
  .cdbe-s{border:1px solid #DCE2EA;border-radius:10px;padding:8px 10px;margin:8px 0;break-inside:avoid;}
  .cdbe-t b{font-family:'Space Grotesk',Arial,sans-serif;} .cdbe-t small{display:block;color:#5B6472;margin:1px 0 6px;} .cdbe-t .gicon{font-size:15px;vertical-align:-3px;}
  .cdbe-s .cdb-table table{min-width:0;} .cdbe-s .cdb-table tbody th{position:static;box-shadow:none;font-weight:600;} .cdbe-s .cdb-table th small{color:#5B6472;font-weight:500;margin-left:4px;}
  .cdbe-s.cdb-absent{opacity:.65;}
  /* Colonne des noms (et ligne des titres) figée quand on fait défiler -- demandé : « Dans les bilans, figer les
     colonnes NOM Prénom ». Bordures en ombre : avec border-collapse, une cellule figée perd les siennes. */
  .cdb-table thead th{position:sticky;top:0;z-index:2;} .cdb-table tfoot th, .cdb-table tfoot td{position:sticky;bottom:0;z-index:2;}
  .cdb-table tbody th, .cdb-table thead th:first-child, .cdb-table tfoot th{position:sticky;left:0;z-index:3;box-shadow:inset -1px 0 #DCE2EA;}
  .cdb-table tbody th{background:#fff;z-index:1;} .cdb-table thead th:first-child, .cdb-table tfoot th{z-index:4;}
`;
(function(){ const st = document.createElement('style'); st.textContent = CDB_CSS + `
  .cdb{max-width:1100px;width:96vw;max-height:90vh;overflow:auto;}
  .cdb .cdb-table{max-height:62vh;}
  .cdb-tete{display:flex;gap:10px;align-items:center;flex-wrap:wrap;} .cdb-tete select{max-width:340px;}
`; document.head.appendChild(st); })();
