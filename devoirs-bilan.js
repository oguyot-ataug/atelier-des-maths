/* =====================================================================
   devoirs-bilan.js -- Devoirs en ligne : rangement par classe, archivage, bilan en tableau et
   appréciations de fin de période par l'IA.

   Demandé : « Ranger les devoirs en ligne comme les interrogations, archivage, bilan complet en
   tableau (comme un carnet de notes...). Dans ce tableau, prévoir un bilan IA avec appréciations :
   genre fin de trimestre, visible uniquement par l'enseignant. »

   - Liste (refreshDevoirsProfListing, devoirs.js) : une pastille par classe (la classe active par
     défaut), une section par classe, « Archiver » sur chaque devoir (devoirs.archive_at : rien ne
     change pour les élèves), « Archiver les terminés » (date limite passée), archives repliées.
   - « Bilan de la classe » : le tableau des devoirs de la période (bilan.js, mode « devoirs »), sans
     interrogations ni appréciations (demandé ensuite : le bilan complet avec les appréciations IA est
     dans Mes classes › Bilan).
   ===================================================================== */

/* ---------------- Liste rangée par classe ---------------- */
const dvl = { classe: undefined };
function dvlArchiveBtn(d){
  return d.archive_at
    ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="dvlArchiver('${d.id}',false)" title="Sortir des archives"><span class=gicon>unarchive</span></button>`
    : `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="dvlArchiver('${d.id}',true)" title="Archiver : rangé dans « Archives » en bas de la classe (rien ne change pour les élèves)"><span class=gicon>inventory_2</span></button>`;
}
function dvlFini(d){ return !!(d.date_limite && new Date(d.date_limite) < new Date(new Date().toDateString())); }
function dvlAfficher(el, devoirs, rows){
  dvl.devoirs = devoirs;
  const classes = new Map();
  devoirs.forEach(d => { if(!classes.has(d.class_id)) classes.set(d.class_id, { id: d.class_id, nom: d.classes ? d.classes.nom : 'Classe', n: 0 }); if(!d.archive_at) classes.get(d.class_id).n++; });
  const liste = [...classes.values()].sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { numeric: true }));
  let choix = dvl.classe;
  if(choix === undefined){ try{ choix = localStorage.getItem('dvlClasse'); }catch(e){ choix = null; } }
  if(!choix || (choix !== 'tout' && !classes.has(choix))) choix = classes.has(typeof currentClassId !== 'undefined' ? currentClassId : null) ? currentClassId : 'tout';
  const chips = `<div class="qz-cl-chips"><button class="${choix === 'tout' ? 'on' : ''}" onclick="dvlChoisir('tout')">Toutes les classes</button>${liste.map(c => `<button class="${choix === c.id ? 'on' : ''}" onclick="dvlChoisir('${c.id}')">${escapeHtml(c.nom)} <small>${c.n}</small></button>`).join('')}</div>`;
  el.innerHTML = chips + liste.filter(c => choix === 'tout' || c.id === choix).map(c => {
    const idx = devoirs.map((d, i) => i).filter(i => devoirs[i].class_id === c.id);
    const actifs = idx.filter(i => !devoirs[i].archive_at), arch = idx.filter(i => devoirs[i].archive_at);
    const finis = actifs.filter(i => dvlFini(devoirs[i])).length;
    return `<section class="qz-cl-sec"><div class="qz-cl-tete"><h3><span class="gicon">groups</span> ${escapeHtml(c.nom)}</h3>
        <span class="hint" style="margin:0;">${actifs.length} devoir${actifs.length > 1 ? 's' : ''} suivi${actifs.length > 1 ? 's' : ''}${arch.length ? ` · ${arch.length} archivé${arch.length > 1 ? 's' : ''}` : ''}</span>
        <span style="margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn" style="font-size:.78rem;padding:5px 10px;background:#1F3A5C;" onclick="dvbOuvrir('${c.id}')" title="Tous les devoirs et interrogations de la classe en tableau, avec les appréciations"><span class="gicon">table_view</span> Bilan de la classe</button>
          ${finis ? `<button class="btn secondary" style="font-size:.78rem;padding:5px 10px;" onclick="dvlArchiverFinis('${c.id}')" title="Devoirs dont la date limite est passée"><span class="gicon">inventory_2</span> Archiver les terminés (${finis})</button>` : ''}</span></div>
      ${actifs.length ? actifs.map(i => rows[i]).join('') : '<p class="hint">Aucun devoir en cours pour cette classe.</p>'}
      ${arch.length ? `<details class="qz-repli qz-archives"><summary><span class="gicon">inventory_2</span> Archives (${arch.length})</summary>${arch.map(i => rows[i]).join('')}</details>` : ''}</section>`;
  }).join('');
}
function dvlChoisir(c){ dvl.classe = c; try{ localStorage.setItem('dvlClasse', c); }catch(e){} refreshDevoirsProfListing(); }
async function dvlArchiver(id, on, silencieux){
  const { error } = await sb.from('devoirs').update({ archive_at: on ? new Date().toISOString() : null }).eq('id', id);
  if(error){ if(!silencieux) await niceAlert('Archivage impossible : ' + error.message); return false; }
  if(!silencieux) refreshDevoirsProfListing();
  return true;
}
async function dvlArchiverFinis(classe){
  const l = (dvl.devoirs || []).filter(d => d.class_id === classe && !d.archive_at && dvlFini(d));
  if(!l.length) return;
  if(!(await niceConfirm(`Archiver ${l.length} devoir${l.length > 1 ? 's' : ''} dont la date limite est passée ? Rien ne change pour les élèves ; vous les retrouvez dans « Archives », et ils restent dans le bilan de la classe.`))) return;
  for(const d of l) await dvlArchiver(d.id, true, true);
  refreshDevoirsProfListing();
}

/* Bilan en tableau : bilan.js (blOuvrir), mode « devoirs » ici (sans interrogations ni appréciations). */
function dvbOuvrir(classe){ blOuvrir({ classe, mode: 'devoirs' }); }

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .devoir-zone-create.replie > :not(.devoir-zone-title){display:none !important;}
    .devoir-zone-create.replie .devoir-zone-title{margin-bottom:0 !important;}
    .devoir-zone-create .devoir-zone-title::after{content:'▾';margin-left:8px;color:var(--ink-soft);} .devoir-zone-create.replie .devoir-zone-title::after{content:'▸';}
  `;
  document.head.appendChild(st);
})();
