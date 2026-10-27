/* =====================================================================
   planches-choix.js -- Choisir des exercices du manuel (planches) pour une évaluation papier ou une
   interrogation en ligne.

   Demandé : « Serait-il possible de profiter de cette base d'exercices pour les insérer dans une
   interrogation en ligne ou papier ? »

   - plChoisirExos(o) : fenêtre de choix (niveau, chapitre, puis les exercices de chaque planche,
     affichés EN ENTIER comme dans le manuel). On peut cocher des exercices de plusieurs chapitres ;
     ils sont rendus dans l'ordre où on les a cochés.
     o = { titre, aide, lvl, t (chapitre de départ), ecran (true : seuls les exercices corrigés
     automatiquement à l'écran sont proposés -- les autres restent visibles, grisés), bouton (texte
     du bouton, n -> texte) }.
     Résultat : [{ lvl, c, i, k, x }] (c : chapitre de CHAPITRES_BY_LEVEL, x : l'exercice), ou null.
   - plExoCopieHtml(x, corr) : l'exercice tel qu'il s'imprime (consigne et contenu, formules déjà
     écrites), sans la bulle « Dans ton cahier ! » (sur une copie, l'élève répond sur la feuille).
   Dépend de planches.js (plDe, plRef, plCode, plEtoiles, plTrousAjustes) et planches-num.js
   (plNumPossible).
   ===================================================================== */

function plExoCopieHtml(x, corr){
  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;left:-9999px;top:0;width:700px;';
  d.innerHTML = `<div class="pl-consigne"><b>${x.consigne || ''}</b></div><div class="pl-corps">${corr ? (x.corr || x.eleve || '') : (typeof plTrousAjustes === 'function' ? plTrousAjustes(x) : x.eleve || '')}</div>`;
  document.body.appendChild(d);
  if(typeof renderStaticMath === 'function') renderStaticMath(d);
  const h = `<div class="pl-ex-cahier">${d.innerHTML}</div>`; d.remove(); return h;
}

function plChoisirExos(o){
  o = o || {};
  return new Promise(resolve => {
    const avecPl = l => ((typeof CHAPITRES_BY_LEVEL !== 'undefined' && CHAPITRES_BY_LEVEL[l]) || []).filter(c => plDe(l, c.t).length);
    const nivs = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'].filter(l => (typeof niveauVisible !== 'function' || niveauVisible(l)) && avecPl(l).length);
    if(!nivs.length){ resolve(null); return; }
    let ov = document.getElementById('plChoix');
    if(!ov){ ov = document.createElement('div'); ov.id = 'plChoix'; ov.className = 'modal-overlay'; document.body.appendChild(ov); }
    ov.style.zIndex = '9450';
    const lvl0 = nivs.includes(o.lvl) ? o.lvl : nivs[0];
    // Les chapitres sont repérés par leur titre : en 6e, deux chapitres portent le code N4 (et deux N5).
    const t0 = (avecPl(lvl0).find(c => c.t === o.t) || avecPl(lvl0)[0]).t;
    const st = { lvl: lvl0, t: t0, sel: [] }; // sel : clés « niveau|chapitre|planche|exercice », dans l'ordre des coches
    const cle = (lvl, t, i, k) => [lvl, t, i, k].join('|');
    const nomNiv = l => PL_NIVEAUX_TXT[l] || l;
    const esc = s => String(s ?? '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
    const texteBouton = n => o.bouton ? o.bouton(n) : (n > 1 ? `Ajouter ces ${n} exercices` : 'Ajouter cet exercice');
    const fin = v => { ov.style.display = 'none'; ov.innerHTML = ''; if(typeof plClavier !== 'undefined' && plClavier.fermer) plClavier.fermer(); resolve(v); };
    const pied = () => {
      const n = st.sel.length, b = ov.querySelector('#plChOk'), r = ov.querySelector('#plChNb');
      if(b){ b.disabled = !n; b.innerHTML = `<span class="gicon">add</span> ${texteBouton(n)}`; }
      if(r) r.textContent = n ? `${n} exercice${n > 1 ? 's' : ''} choisi${n > 1 ? 's' : ''}${new Set(st.sel.map(s => s.split('|').slice(0, 2).join('|'))).size > 1 ? ' (dans plusieurs chapitres)' : ''}` : 'Cochez un ou plusieurs exercices.';
    };
    const rendre = () => {
      const c = avecPl(st.lvl).find(x => x.t === st.t);
      const liste = c ? plDe(st.lvl, c.t).map((p, i) => `<div class="plch-pl">${esc(plRef(st.lvl, plCode(st.lvl, c), i))} · ${esc(p.titre)}</div>${p.exos.map((x, k) => {
        const kk = cle(st.lvl, c.t, i, k), ecran = typeof plNumPossible === 'function' && plNumPossible(x), off = o.ecran && !ecran, n = st.sel.indexOf(kk);
        return `<label class="plch-it${off ? ' off' : ''}"><span class="plch-tete"><span><input type="checkbox" data-plch="${esc(kk)}"${n >= 0 ? ' checked' : ''}${off ? ' disabled' : ''}> <b>Exercice ${k + 1}</b> <span class="plch-et">${typeof plEtoiles === 'function' ? plEtoiles(x.etoiles || 1) : ''}</span>${n >= 0 ? ` <span class="plch-rang">n° ${n + 1}</span>` : ''}</span>
          <small>${off ? '<span class="gicon">edit_off</span> sur papier seulement : pas de correction automatique à l\'écran' : ecran ? '<span class="gicon">touch_app</span> se fait aussi à l\'écran, corrigé automatiquement' : '<span class="gicon">description</span> sur papier'}</small></span>
          <div class="pl-ex-cahier plch-ap"><div class="pl-consigne"><b>${x.consigne}</b></div><div class="pl-corps">${typeof plTrousAjustes === 'function' ? plTrousAjustes(x) : x.eleve || ''}</div></div></label>`; }).join('')}`).join('') : '';
      ov.innerHTML = `<div class="modal-card plch">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="plch-h"><span class="gicon">auto_stories</span> ${esc(o.titre || 'Exercices du manuel')}</b>
          <button class="modal-close" id="plChFermer"><span class="gicon">close</span></button></div>
        ${o.aide ? `<p class="hint" style="margin:6px 0 8px;">${o.aide}</p>` : ''}
        <div class="plch-sel"><select id="plChNiv">${nivs.map(l => `<option value="${l}"${l === st.lvl ? ' selected' : ''}>${nomNiv(l)}</option>`).join('')}</select>
          <select id="plChCh">${avecPl(st.lvl).map(x => `<option value="${esc(x.t)}"${x.t === st.t ? ' selected' : ''}>${esc(x.code + ' · ' + x.t)}</option>`).join('')}</select></div>
        <div class="plch-corps">${liste}</div>
        <div class="plch-pied"><span class="hint" id="plChNb" style="margin:0;"></span><button class="btn" id="plChOk" disabled></button></div></div>`;
      if(typeof renderStaticMath === 'function') renderStaticMath(ov.querySelector('.plch-corps'));
      ov.querySelector('#plChFermer').onclick = () => fin(null);
      ov.onclick = e => { if(e.target === ov) fin(null); };
      ov.querySelector('#plChNiv').onchange = e => { st.lvl = e.target.value; st.t = avecPl(st.lvl)[0].t; rendre(); };
      ov.querySelector('#plChCh').onchange = e => { st.t = e.target.value; rendre(); };
      ov.querySelectorAll('[data-plch]').forEach(b => b.onchange = () => {
        const k = b.dataset.plch; st.sel = st.sel.filter(s => s !== k); if(b.checked) st.sel.push(k);
        // Numéros d'ordre à jour sans tout réafficher (la position dans la liste reste).
        ov.querySelectorAll('[data-plch]').forEach(c => { const r = c.closest('.plch-tete').querySelector('.plch-rang'), n = st.sel.indexOf(c.dataset.plch);
          if(n < 0){ if(r) r.remove(); } else if(r) r.textContent = 'n° ' + (n + 1); else c.parentElement.insertAdjacentHTML('beforeend', ` <span class="plch-rang">n° ${n + 1}</span>`); });
        pied();
      });
      ov.querySelector('#plChOk').onclick = () => {
        const res = st.sel.map(s => { const [lvl, t, i, k] = s.split('|'), c = avecPl(lvl).find(x => x.t === t), p = c && plDe(lvl, t)[+i], x = p && p.exos[+k];
          return x ? { lvl, c, i: +i, k: +k, x } : null; }).filter(Boolean);
        fin(res.length ? res : null);
      };
      pied();
    };
    rendre();
    ov.style.display = 'flex';
  });
}

(function plChoixStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .plch{ max-width:940px; width:94vw; max-height:92vh; display:flex; flex-direction:column; }
    .plch-h{ font-family:'Space Grotesk',sans-serif; display:inline-flex; align-items:center; gap:6px; }
    .plch-sel{ display:flex; gap:8px; flex-wrap:wrap; margin:8px 0; } .plch-sel select:first-child{ flex:0 0 90px; } .plch-sel select:last-child{ flex:1; min-width:200px; }
    .plch-corps{ overflow:auto; flex:1; min-height:160px; display:flex; flex-direction:column; gap:6px; }
    .plch-pl{ font:700 .82rem 'Space Grotesk',sans-serif; color:#1F3A5C; margin:6px 0 0; }
    .plch-it{ display:block; border:1.5px solid rgba(28,43,57,.12); background:#fff; border-radius:10px; padding:8px 12px; cursor:pointer; color:var(--ink); }
    .plch-it:hover{ border-color:#1F3A5C; } .plch-it:has(input:checked){ border-color:#2EA8C9; background:#F2FAFD; box-shadow:0 0 0 1px #2EA8C9; }
    .plch-it.off{ cursor:default; opacity:.55; } .plch-it.off:hover{ border-color:rgba(28,43,57,.12); }
    .plch-tete{ display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; } .plch-tete input{ vertical-align:-2px; }
    .plch-tete small{ color:var(--ink-soft); font-size:.78rem; display:inline-flex; align-items:center; gap:3px; } .plch-tete small .gicon{ font-size:14px; }
    .plch-et{ color:#E9A21C; letter-spacing:2px; font-size:.8rem; } .plch-et .pl-et-off{ color:#D8DCE3; }
    .plch-rang{ font:700 .72rem 'Space Grotesk',sans-serif; color:#fff; background:#2EA8C9; border-radius:999px; padding:1px 8px; }
    .plch-ap{ border-top:1px dashed rgba(28,43,57,.15); margin-top:6px; padding-top:8px; font-size:.9rem; line-height:1.45; overflow-x:auto; } .plch-ap .pl-consigne{ margin-bottom:6px; }
    .plch-pied{ display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:10px; }
  `;
  document.head.appendChild(st);
})();
