/* =====================================================================
   cours-exos.js -- Exercices à faire pendant une session COURS, suivis en direct, et prise en main
   à distance.

   Demandé : « étape 3 go ! Possibilité de donner également des exercices de tout type (figure
   dynamique, programmation par blocs...). Est-il possible d'aider à distance les jeunes en prenant
   la main sur leur exercice ».

   - Un élément « exercice » s'ajoute à la session (à la préparation, ou en cours de séance depuis la
     télécommande) : un questionnaire de la banque (tous les types de questions : QCM, nombre, figure
     dynamique, tracé sur quadrillage, repère…), un défi de programmation par blocs, ou une figure à
     construire (énoncé + figure de départ facultative).
     Élément : { titre, html:'', exo:{ type:'qz', questions } | { type:'prog', defi } }.
   - Élève : il fait l'exercice dans le plein écran de la session (l'éditeur de blocs et l'outil de
     figure s'ouvrent par-dessus, sans quitter le plein écran) ; tout est enregistré au fil de l'eau
     (cours_direct_travail) ; « Lever la main » prévient le professeur.
   - Professeur : une vignette par élève (pastille par question, défi réussi, en train d'écrire,
     main levée) ; un clic → sa copie en direct (figure comprise, pendant qu'il la construit) ou son
     programme en direct. « Prendre la main » : l'écran de l'élève est verrouillé et il voit le
     professeur compléter sa copie, construire dans sa figure ou modifier son programme (le lutin
     part aussi chez lui) ; « Rendre la main » : l'élève reprend, avec les modifications.

   Base : table cours_direct_travaux (direct_id, item, student_id, reponses) ; l'élève écrit par la
   fonction cours_direct_travail (session ouverte, élément déjà donné), le professeur directement
   (RLS : sa session). Le corrigé n'est jamais envoyé aux élèves (cours_direct_etat le retire).
   Temps réel (canal cd-<id>) : trav (élève → prof), pilote et main (prof → élève), aide. Les
   messages ne portent que « qui » et « quel élément » : chacun relit la base, seule source de vérité.

   Dépend de cours-direct.js (cdP, cdE, cdToast…), questionnaires*.js (qzRenderSaisie, qzVerdict…),
   programmation.js / prog-defis.js (prog, progOuvrir, progDefi…), outils-figures.js, cours-perso.js.
   ===================================================================== */

const cx = { prog: null, figQid: null, figT: null, vueAvant: null };
const CX_COUL = { juste: '#1F7A4D', partiel: '#C77D1E', faux: '#9E1F5E', avoir: '#3A6EA5', sondage: '#3A6EA5', vide: '#D5DBE3' };
const cxClone = o => o == null ? o : JSON.parse(JSON.stringify(o));
const cxCtx = pfx => ({ reglages: {}, seed: null, pfx });
function cxEnvoyer(ch, event, payload){ try{ ch.send({ type: 'broadcast', event, payload }); }catch(e){} }
function cxNbQuestions(it){ return ((it.exo && it.exo.questions) || []).filter(q => q.type !== 'texte'); }

/* =====================================================================
   CHOIX D'UN EXERCICE (préparation ou en cours de séance)
   ===================================================================== */
function cxChoisir(){
  return new Promise(resolve => {
    let o = document.getElementById('cxChoix');
    if(!o){ o = document.createElement('div'); o.id = 'cxChoix'; o.className = 'modal-overlay'; document.body.appendChild(o); }
    o.style.zIndex = '9400';
    // Manuel (exercices des planches, planches.js) : niveaux et chapitres qui en ont.
    const avecPl = l => ((typeof CHAPITRES_BY_LEVEL !== 'undefined' && CHAPITRES_BY_LEVEL[l]) || []).filter(c => typeof plDe === 'function' && plDe(l, c.t).length);
    const nivMan = ['ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'].filter(l => (typeof niveauVisible !== 'function' || niveauVisible(l)) && avecPl(l).length);
    const lvl0 = typeof currentChapterLevel !== 'undefined' && nivMan.includes(currentChapterLevel) ? currentChapterLevel : nivMan[0];
    const code0 = lvl0 && typeof currentChapterCode !== 'undefined' && avecPl(lvl0).some(c => c.code === currentChapterCode) ? currentChapterCode : lvl0 ? (avecPl(lvl0)[0] || {}).code : null;
    const st = { onglet: lvl0 && code0 === (typeof currentChapterCode !== 'undefined' ? currentChapterCode : null) ? 'man' : 'qz', qzs: null, filtre: '', fig: { enonce: 'Construis…', figure: null }, man: { lvl: lvl0, code: code0, sel: [] } };
    let fini = false, veille = null;
    const fin = v => { if(fini) return; fini = true; clearInterval(veille); o.style.display = 'none'; resolve(v); };
    const charger = async () => {
      const { data } = await sb.from('questionnaires').select('id,titre,questions,reglages').eq('teacher_id', currentUser.id).order('updated_at', { ascending: false });
      st.qzs = (data || []).filter(q => !(q.reglages && q.reglages.copie_de) && (q.questions || []).some(x => x.type !== 'texte'));
      rendre();
    };
    const rendre = () => {
      const f = st.filtre.trim().toLowerCase();
      const nomNiv = l => ({ ce2: 'CE2', cm1: 'CM1', cm2: 'CM2' })[l] || l;
      const manC = st.man.lvl ? avecPl(st.man.lvl).find(c => c.code === st.man.code) : null;
      const corps = st.onglet === 'man'
        ? (!nivMan.length ? '<p class="hint">Aucun exercice de manuel disponible.</p>'
          : `<div class="cx-co-sel" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;"><select id="cxManNiv">${nivMan.map(l => `<option value="${l}"${l === st.man.lvl ? ' selected' : ''}>${nomNiv(l)}</option>`).join('')}</select>
             <select id="cxManCh" style="flex:1;min-width:200px;">${avecPl(st.man.lvl).map(c => `<option value="${cdEsc(c.code)}"${c.code === st.man.code ? ' selected' : ''}>${cdEsc(c.code + ' · ' + c.t)}</option>`).join('')}</select></div>
           <div class="cx-ch-liste">${manC ? plDe(st.man.lvl, manC.t).map((p, i) => `<div class="cx-man-pl"><b>${cdEsc(plRef(st.man.lvl, plCode(st.man.lvl, manC), i))} · ${cdEsc(p.titre)}</b></div>${p.exos.map((x, k) => {
               const tmp = document.createElement('div'); tmp.innerHTML = x.consigne; const txt = tmp.textContent.replace(/\s+/g, ' ').trim(), cle = i + '|' + k, ecran = typeof plNumPossible === 'function' && plNumPossible(x);
               return `<label class="cx-ch-it cx-man-it"><span><input type="checkbox" data-man="${cle}"${st.man.sel.includes(cle) ? ' checked' : ''}> <b>Exercice ${k + 1}</b> <span class="cx-man-et">${typeof plEtoiles === 'function' ? plEtoiles(x.etoiles || 1) : ''}</span></span>
                 <small>${cdEsc(txt.length > 110 ? txt.slice(0, 110) + '…' : txt)}</small><small>${ecran ? '<span class="gicon" style="font-size:14px;vertical-align:-2px;">touch_app</span> à faire à l\'écran, vérifié et suivi en direct' : '<span class="gicon" style="font-size:14px;vertical-align:-2px;">visibility</span> énoncé projeté chez les élèves, correction montrée par vous'}</small></label>`; }).join('')}`).join('') : ''}</div>
           <div style="text-align:right;margin-top:10px;"><button class="btn" id="cxManOk"${st.man.sel.length ? '' : ' disabled'}><span class="gicon">add</span> Ajouter ${st.man.sel.length > 1 ? 'ces ' + st.man.sel.length + ' exercices' : 'cet exercice'}</button></div>`)
        : st.onglet === 'qz'
        ? `<input type="search" id="cxFiltre" placeholder="Chercher un questionnaire…" value="${cdEsc(st.filtre)}" style="width:100%;margin-bottom:8px;">
           <div class="cx-ch-liste">${st.qzs == null ? '<p class="hint">Chargement de votre banque…</p>'
             : st.qzs.filter(q => !f || (q.titre || '').toLowerCase().includes(f)).map(q => { const qs = q.questions.filter(x => x.type !== 'texte');
               const types = [...new Set(qs.map(x => (typeof qzType === 'function' ? qzType(x.type).label : x.type)))].slice(0, 4).join(', ');
               return `<button class="cx-ch-it" data-qz="${q.id}"><b>${cdEsc(q.titre || 'Sans titre')} ${typeof qzModeBadge === 'function' ? qzModeBadge(q.reglages || {}) : ''}</b><small>${qs.length} question${qs.length > 1 ? 's' : ''} · ${cdEsc(types)}${['maison', 'classe'].includes(typeof qzModeCle === 'function' ? qzModeCle(q.reglages) : '') ? ' · enregistrée comme interrogation à la fin de la session' : ''}</small></button>`; }).join('')
               || '<p class="hint">Aucun questionnaire dans votre banque. Créez-en un dans « Questionnaires » : tous les types de questions s\'y trouvent (figure dynamique, tracé sur quadrillage, repère…).</p>'}</div>`
        : st.onglet === 'prog'
        ? `<div class="cx-ch-liste">${typeof PROG_DEFIS === 'undefined' ? '<p class="hint">Défis indisponibles.</p>' : PROG_DEFIS.map(d =>
            `<button class="cx-ch-it" data-prog="${d.id}"><b>${cdEsc(d.titre)}</b><small>${d.niveau} · ${d.trace || d.cibles ? 'Tracé' : 'Calcul'} · ${cdEsc(String(d.enonce).replace(/<[^>]+>/g, ''))}</small></button>`).join('')}</div>`
        : `<label class="cd-lab" style="align-items:flex-start;flex-direction:column;">Énoncé<textarea id="cxFigEnonce" rows="3" style="width:100%;">${cdEsc(st.fig.enonce)}</textarea></label>
           <div style="margin:8px 0;">${st.fig.figure && typeof qziFigHtml === 'function' ? qziFigHtml(st.fig.figure, 'Figure de départ') : '<p class="hint" style="margin:4px 0;">Sans figure de départ, l\'élève part d\'une page blanche.</p>'}
             <button class="btn secondary" id="cxFigBtn"><span class="gicon">draw</span> ${st.fig.figure ? 'Modifier' : 'Construire'} la figure de départ</button>
             ${st.fig.figure ? '<button class="btn secondary" id="cxFigSuppr"><span class="gicon">delete</span></button>' : ''}</div>
           <div style="text-align:right;"><button class="btn" id="cxFigOk"><span class="gicon">add</span> Ajouter cet exercice</button></div>`;
      o.innerHTML = `<div class="modal-card cx-ch">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">edit_square</span> Exercice à faire en direct</b>
          <button class="modal-close" id="cxChFermer"><span class="gicon">close</span></button></div>
        <p class="hint" style="margin:6px 0 10px;">Les élèves le font sur leur écran ; vous suivez leur travail en direct et vous pouvez prendre la main pour aider.</p>
        <div class="cx-onglets">
          ${nivMan.length ? `<button data-o="man" class="${st.onglet === 'man' ? 'on' : ''}"><span class="gicon">auto_stories</span> Manuel</button>` : ''}
          <button data-o="qz" class="${st.onglet === 'qz' ? 'on' : ''}"><span class="gicon">quiz</span> Questionnaire de ma banque</button>
          <button data-o="prog" class="${st.onglet === 'prog' ? 'on' : ''}"><span class="gicon">extension</span> Programmation par blocs</button>
          <button data-o="fig" class="${st.onglet === 'fig' ? 'on' : ''}"><span class="gicon">architecture</span> Figure à construire</button></div>
        <div class="cx-ch-corps">${corps}</div></div>`;
      o.querySelector('#cxChFermer').onclick = () => fin(null);
      o.querySelectorAll('.cx-onglets button').forEach(b => b.onclick = () => { st.onglet = b.dataset.o; rendre(); });
      const fl = o.querySelector('#cxFiltre'); if(fl){ fl.oninput = () => { st.filtre = fl.value; const p = fl.selectionStart; rendre(); const n = o.querySelector('#cxFiltre'); n.focus(); n.setSelectionRange(p, p); }; }
      o.querySelectorAll('[data-qz]').forEach(b => b.onclick = () => {
        const q = st.qzs.find(x => x.id === b.dataset.qz); if(!q) return;
        // Interrogation (mode « à la maison » ou « en classe ») : enregistrée comme une interrogation à la
        // fin de la session (cours-sessions.js), les copies des élèves comprises.
        const mode = typeof qzModeCle === 'function' ? qzModeCle(q.reglages) : 'maison', interro = mode === 'maison' || mode === 'classe';
        fin({ titre: (interro ? 'Interrogation : ' : 'Exercice : ') + (q.titre || 'questionnaire'), chapitre: '', html: '', prog: null,
          exo: { type: 'qz', questions: qzPreparer(cxClone(q.questions)), qz_id: q.id, qz_titre: q.titre || '', qz_mode: mode, interro } });
      });
      o.querySelectorAll('[data-prog]').forEach(b => b.onclick = () => {
        const d = progDefiParId(b.dataset.prog); if(!d) return;
        fin({ titre: 'Programmation : ' + d.titre, chapitre: '', html: '', prog: null, exo: { type: 'prog', defi: d.id } });
      });
      const mn = o.querySelector('#cxManNiv'); if(mn) mn.onchange = () => { st.man = { lvl: mn.value, code: (avecPl(mn.value)[0] || {}).code, sel: [] }; rendre(); };
      const mc = o.querySelector('#cxManCh'); if(mc) mc.onchange = () => { st.man.code = mc.value; st.man.sel = []; rendre(); };
      o.querySelectorAll('[data-man]').forEach(b => b.onchange = () => { const k = b.dataset.man; st.man.sel = st.man.sel.filter(x => x !== k); if(b.checked) st.man.sel.push(k);
        const ok = o.querySelector('#cxManOk'), n = st.man.sel.length; ok.disabled = !n; ok.innerHTML = `<span class="gicon">add</span> Ajouter ${n > 1 ? 'ces ' + n + ' exercices' : 'cet exercice'}`; });
      const mo = o.querySelector('#cxManOk');
      if(mo) mo.onclick = () => { if(!manC || !st.man.sel.length) return;
        // Dans l'ordre du manuel ; plusieurs exercices d'un coup (tableau d'éléments).
        const l = st.man.sel.map(x => x.split('|').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        fin(l.map(([i, k]) => plSessionItem(st.man.lvl, manC, i, k))); };
      const te = o.querySelector('#cxFigEnonce'); if(te) te.oninput = () => { st.fig.enonce = te.value; };
      const fb = o.querySelector('#cxFigBtn');
      if(fb) fb.onclick = () => {
        if(typeof cpFigOpenEditor !== 'function') return;
        o.style.display = 'none';
        cpFigOpenEditor(st.fig.figure ? { f: st.fig.figure.f, vb: st.fig.figure.vb } : null, fig => { st.fig.figure = { f: fig.f, vb: fig.vb }; o.style.display = 'flex'; rendre(); });
        clearInterval(veille);
        veille = setInterval(() => { const t = document.getElementById('toolsModalOverlay'); if(!fini && (!t || t.style.display === 'none')){ clearInterval(veille); o.style.display = 'flex'; } }, 400);
      };
      const fs = o.querySelector('#cxFigSuppr'); if(fs) fs.onclick = () => { st.fig.figure = null; rendre(); };
      const fo = o.querySelector('#cxFigOk');
      if(fo) fo.onclick = () => {
        const enonce = st.fig.enonce.trim(); if(!enonce){ niceAlert('Écrivez l\'énoncé de la construction.'); return; }
        const q = { id: 'fig' + Date.now().toString(36), type: 'figure', enonce, points: 2, attendus: '', criteres: [], figure: st.fig.figure, figure_corrige: null };
        fin({ titre: 'Figure : ' + enonce.replace(/\s+/g, ' ').slice(0, 50) + (enonce.length > 50 ? '…' : ''), chapitre: '', html: '', prog: null, exo: { type: 'qz', questions: [q] } });
      };
    };
    o.style.display = 'flex';
    rendre(); charger();
  });
}
/* ---------- Partie de cours d'un chapitre (demandé : « permettre d'ajouter une partie de cours ») ----------
   Niveau → chapitre → parties du cours et des méthodes (les mêmes que « + Cahier » : un titre de leçon
   ou un sous-titre et ce qui le suit). Le chapitre est ouvert derrière la fenêtre (cours personnalisé
   du professeur compris), chaque partie est recopiée par sectionVersHtml (app.js). Renvoie une liste
   d'éléments (vide si annulé). */
function cxChoisirCours(){
  return new Promise(resolve => {
    let o = document.getElementById('cxCours');
    if(!o){ o = document.createElement('div'); o.id = 'cxCours'; o.className = 'modal-overlay'; document.body.appendChild(o); }
    o.style.zIndex = '9400';
    const vue = document.querySelector('.view.active'), vueAvant = vue ? vue.id : null;
    const niveaux = ['ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'].filter(l => typeof niveauVisible !== 'function' || niveauVisible(l));
    const chapitres = l => (CHAPITRES_BY_LEVEL[l] || []).filter(c => DEMO_REGISTRY[l + '|' + c.t]);
    const st = { lvl: niveaux.includes(currentChapterLevel) ? currentChapterLevel : (niveaux.includes('6e') ? '6e' : niveaux[0]), code: null, parties: [], choisies: new Set(), occupe: false };
    if(niveaux.includes(currentChapterLevel) && chapitres(currentChapterLevel).some(c => c.code === currentChapterCode)) st.code = currentChapterCode;
    let fini = false;
    const fin = v => { if(fini) return; fini = true; o.style.display = 'none'; if(vueAvant && typeof showView === 'function') showView(vueAvant); resolve(v || []); };
    const nomNiv = l => ({ ce2: 'CE2', cm1: 'CM1', cm2: 'CM2' })[l] || l;
    const charger = () => {
      st.parties = []; st.choisies = new Set();
      const c = chapitres(st.lvl).find(x => x.code === st.code); if(!c){ rendre(); return; }
      try{ openChapitre(c, 'cours', st.lvl); }catch(e){ console.warn(e); }
      const demo = DEMO_REGISTRY[st.lvl + '|' + c.t];
      [['cours', 'Cours'], ['methode', 'Méthode']].forEach(([k, nom]) => {
        const box = demo && document.getElementById(demo[k]); if(!box) return;
        box.querySelectorAll('.lesson-header, .sub-header').forEach(h => {
          if(h.classList.contains('cp-hidden') || h.closest('.cp-hidden')) return;
          const t = h.querySelector('h3,h4'); if(!t || !t.textContent.trim()) return;
          st.parties.push({ h, onglet: nom, titre: t.textContent.trim(), lecon: h.classList.contains('lesson-header') });
        });
      });
      // Exercices du manuel (planches.js) : énoncé, puis correction montrée par le professeur.
      if(typeof plDe === 'function') plDe(st.lvl, c.t).forEach((pl, i) => pl.exos.forEach((x, k) => {
        const tmp = document.createElement('div'); tmp.innerHTML = x.consigne;
        const txt = tmp.textContent.replace(/\s+/g, ' ').trim();
        st.parties.push({ td: [i, k], onglet: 'Manuel (exercices des planches)', titre: `${(typeof plCode === 'function' ? plRef(st.lvl, plCode(st.lvl, c), i) : plRef(st.lvl, c.code, i))} · exercice ${k + 1} : ${txt.length > 70 ? txt.slice(0, 70) + '…' : txt}`, lecon: false });
      }));
      rendre();
    };
    const rendre = () => {
      const chs = chapitres(st.lvl);
      let onglet = '';
      o.innerHTML = `<div class="modal-card cx-ch">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">menu_book</span> Partie de cours</b>
          <button class="modal-close" id="cxCoFermer"><span class="gicon">close</span></button></div>
        <p class="hint" style="margin:6px 0 10px;">Choisissez le chapitre, puis les parties à montrer (cours, méthodes, ou exercices du manuel dont vous montrerez ensuite la correction). Elles sont ajoutées dans cet ordre. Si vous avez personnalisé le cours de ce chapitre, c'est votre version qui est reprise.</p>
        <div class="cx-co-sel"><select id="cxCoNiv">${niveaux.map(l => `<option value="${l}"${l === st.lvl ? ' selected' : ''}>${nomNiv(l)}</option>`).join('')}</select>
          <select id="cxCoCh"><option value="">Choisir un chapitre…</option>${chs.map(c => `<option value="${cdEsc(c.code)}"${c.code === st.code ? ' selected' : ''}>${cdEsc(c.code)} · ${cdEsc(c.t)}</option>`).join('')}</select></div>
        <div class="cx-ch-corps cx-co-liste">${!st.code ? '<p class="hint">Choisissez un chapitre.</p>' : st.parties.length ? st.parties.map((p, i) => `${p.onglet !== onglet ? `<b class="cx-co-onglet">${(onglet = p.onglet)}</b>` : ''}
            <label class="cx-co-p${p.lecon ? '' : ' sous'}"><input type="checkbox" data-i="${i}"${st.choisies.has(i) ? ' checked' : ''}> ${cdEsc(p.titre)}${p.lecon ? ' <small>(toute la partie)</small>' : ''}</label>`).join('')
          : '<p class="hint">Ce chapitre n\'a pas encore de cours découpé en parties.</p>'}</div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;align-items:center;"><span class="hint" style="margin:auto auto auto 0;" id="cxCoNb"></span>
          <button class="btn secondary" id="cxCoAnnuler">Annuler</button><button class="btn" id="cxCoOk"><span class="gicon">add</span> Ajouter</button></div></div>`;
      const nb = () => { const n = st.choisies.size, el = o.querySelector('#cxCoNb'); if(el) el.textContent = n ? n + ' partie' + (n > 1 ? 's' : '') + ' choisie' + (n > 1 ? 's' : '') : ''; const b = o.querySelector('#cxCoOk'); if(b) b.disabled = !n || st.occupe; };
      nb();
      o.querySelector('#cxCoFermer').onclick = o.querySelector('#cxCoAnnuler').onclick = () => fin([]);
      o.querySelector('#cxCoNiv').onchange = e => { st.lvl = e.target.value; st.code = null; st.parties = []; st.choisies = new Set(); rendre(); };
      o.querySelector('#cxCoCh').onchange = e => { st.code = e.target.value || null; charger(); };
      o.querySelectorAll('input[data-i]').forEach(c => c.onchange = () => { if(c.checked) st.choisies.add(+c.dataset.i); else st.choisies.delete(+c.dataset.i); nb(); });
      o.querySelector('#cxCoOk').onclick = async () => {
        const c = chapitres(st.lvl).find(x => x.code === st.code); if(!c || !st.choisies.size) return;
        st.occupe = true; nb(); o.querySelector('#cxCoOk').innerHTML = 'Préparation…';
        const items = [];
        for(const i of [...st.choisies].sort((a, b) => a - b)){
          const p = st.parties[i];
          if(p.td){ const [pi, k] = p.td;
            items.push(plSessionItem(st.lvl, c, pi, k));
            continue; }
          const n = st.parties.filter(x => x.onglet === p.onglet).indexOf(p);
          try{ const r = await sectionVersHtml(p.h); items.push({ titre: /^(méthode|cours)\b/i.test(r.titre) ? r.titre : (p.onglet === 'Méthode' ? 'Méthode : ' : 'Cours : ') + r.titre, chapitre: `${c.code} · ${c.t}`, html: r.html, prog: cdProgDe(r.html),
            src: { lvl: st.lvl, code: c.code, t: c.t, onglet: p.onglet === 'Méthode' ? 'methode' : 'cours', n, titre: p.titre } }); }
          catch(e){ console.warn('partie de cours', e); }
        }
        fin(items);
      };
    };
    o.style.display = 'flex';
    if(st.code) charger(); else rendre();
  });
}
/* ---------- Parties de cours vivantes (demandé : « fais en sorte que les animations fonctionnent aussi
   dans la session ») ----------
   La copie figée (html de l'élément) s'affiche d'abord ; puis le chapitre est préparé sans être affiché
   (openChapitre silencieux, cours personnalisé compris) et les VRAIS blocs de la partie sont déplacés
   dans la session : animations, démos pas à pas, figures manipulables y marchent comme dans le cours.
   Ils retournent à leur place (repères laissés dans le chapitre) dès qu'on change d'élément. Hors du
   chapitre, les couleurs du niveau (#view-chapitre.lvl-…) sont reprises en ligne. Si la partie n'est
   pas retrouvée (cours modifié, chapitre absent), la copie figée reste. */
const cxViv = { places: [], jeton: 0 };
function cxVivantRestaurer(){
  cxViv.jeton++;
  cxViv.places.forEach(({ n, p }) => { if(p.parentNode) p.replaceWith(n); else n.remove(); });
  cxViv.places = [];
}
function cxChapitreDe(src){
  const ok = (l, x) => x.code === src.code && (!src.t || x.t === src.t) && DEMO_REGISTRY[l + '|' + x.t];
  const niveaux = [src.lvl].concat(Object.keys(CHAPITRES_BY_LEVEL).filter(l => l !== src.lvl));
  for(const l of niveaux){ const c = (CHAPITRES_BY_LEVEL[l] || []).find(x => ok(l, x)); if(c) return { lvl: l, c, demo: DEMO_REGISTRY[l + '|' + c.t] }; }
  return null;
}
async function cxMonterVivant(host, src){
  if(typeof openChapitre !== 'function' || typeof DEMO_REGISTRY === 'undefined') return false;
  cxVivantRestaurer();
  const jeton = cxViv.jeton, ch = cxChapitreDe(src); if(!ch) return false;
  const boite = k => document.getElementById(ch.demo[k]);
  const pret = currentChapterLevel === ch.lvl && currentChapterTitle === ch.c.t && boite('cours') && boite('cours').children.length;
  if(!pret){
    // Le chapitre visible (s'il y en a un) n'est pas touché : seule la vue cachée est préparée.
    try{ await openChapitre(ch.c, 'cours', ch.lvl, { silencieux: true }); }catch(e){ console.warn('partie vivante', e); return false; }
  }
  if(jeton !== cxViv.jeton || !host.isConnected) return false;
  const titre = h => ((h.querySelector('h3,h4') || {}).textContent || '').trim();
  let h = null;
  for(const k of src.onglet ? [src.onglet] : ['cours', 'methode']){
    const box = boite(k); if(!box) continue;
    const hs = [...box.querySelectorAll('.lesson-header, .sub-header')].filter(x => !x.classList.contains('cp-hidden') && !x.closest('.cp-hidden'));
    h = src.n != null && hs[src.n] && titre(hs[src.n]) === src.titre ? hs[src.n] : hs.find(x => titre(x) === src.titre);
    if(h) break;
  }
  if(!h) return false;
  const lecon = h.classList.contains('lesson-header'), noeuds = [h];
  for(let n = h.nextElementSibling; n; n = n.nextElementSibling){
    if(n.classList.contains('lesson-header') || (!lecon && n.classList.contains('sub-header'))) break;
    if(!n.classList.contains('cp-hidden')) noeuds.push(n);
  }
  // Couleurs du niveau, calculées tant que les blocs sont encore dans le chapitre.
  const fige = (el, props) => { const cs = getComputedStyle(el); props.forEach(p => el.style.setProperty(p, cs.getPropertyValue(p), 'important')); };
  noeuds.forEach(x => {
    if(x.dataset.cdFige) return; x.dataset.cdFige = '1';
    [x, ...x.querySelectorAll('*')].filter(e => e.matches('.lesson-header, .lesson-header .num, .sub-header .letter')).forEach(e => fige(e, ['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']));
  });
  const essai = document.createElement('button'); essai.className = 'btn'; noeuds[0].parentNode.appendChild(essai);
  const coul = getComputedStyle(essai).backgroundColor; essai.remove();
  host.innerHTML = ''; host.classList.add('cd-vivant'); host.style.setProperty('--cd-btn', coul);
  noeuds.forEach(n => { const p = document.createComment('session COURS'); n.parentNode.insertBefore(p, n); cxViv.places.push({ n, p }); host.appendChild(n); });
  return true;
}
// Télécommande : ajouter un exercice ou une partie de cours pendant la séance (à la fin de la session :
// les numéros des éléments déjà donnés ne changent pas, le travail des élèves y reste rattaché).
async function cxProfAjouterItems(nouveaux, quoi){
  if(!cdP || !nouveaux.length) return;
  const items = cdP.items.concat(nouveaux);
  const { error } = await sb.from('cours_direct').update({ items }).eq('id', cdP.id);
  if(error){ niceAlert(quoi + ' non ajouté : ' + error.message); return; }
  cdP.items = items;
  const premier = items.length - nouveaux.length;
  if(await niceConfirm(`${quoi} ajouté${nouveaux.length > 1 ? 's' : ''} à la fin de la session. ${nouveaux.length > 1 ? 'Montrer le premier' : 'Le montrer'} aux élèves maintenant ?`)) cdProfAller(premier);
  else cdProfRendre();
}
async function cxProfAjouter(){ if(!cdP) return; const it = await cxChoisir(); if(it){ const l = [].concat(it); cxProfAjouterItems(l, l.length > 1 ? 'Exercices' : 'Exercice'); } }
async function cxProfAjouterCours(){ if(!cdP) return; const its = await cxChoisirCours(); if(its.length) cxProfAjouterItems(its, its.length > 1 ? 'Parties de cours' : 'Partie de cours'); }

/* =====================================================================
   PROFESSEUR : suivi en direct
   ===================================================================== */
function cxProfTrav(k){ if(!cdP.trav) cdP.trav = new Map(); if(!cdP.trav.has(k)) cdP.trav.set(k, new Map()); return cdP.trav.get(k); }
function cxProfItem(){ return cdP ? cdP.items[cdP.etat.idx || 0] : null; }
async function cxProfCharger(k, eleveId){
  if(!cdP) return;
  let r = sb.from('cours_direct_travaux').select('student_id,reponses,updated_at').eq('direct_id', cdP.id).eq('item', k);
  if(eleveId) r = r.eq('student_id', eleveId);
  const { data } = await r;
  if(!cdP) return;
  const m = cxProfTrav(k);
  (data || []).forEach(x => {
    if(cdP.main && cdP.main.e === x.student_id && cdP.main.k === k) return; // le professeur écrit : sa version fait foi
    const avant = m.get(x.student_id);
    m.set(x.student_id, Object.assign({}, avant, { rep: x.reponses || {}, t: Date.parse(x.updated_at) }));
  });
}
function cxProfTick(){ const it = cxProfItem(); if(it && it.exo){ const k = cdP.etat.idx || 0; cxProfCharger(k).then(() => cxProfMaj()); } }
async function cxProfRecu(p){
  if(!cdP || !p || !p.e) return;
  await cxProfCharger(p.k, p.e);
  const m = cxProfTrav(p.k), x = m.get(p.e); if(x) x.vu = Date.now();
  if(p.k === (cdP.etat.idx || 0)) cxProfMaj(p.e);
  if(cx.prog && cx.prog.role === 'prof' && cx.prog.e === p.e && cx.prog.k === p.k && cx.prog.mode === 'regarder' && x && x.rep && x.rep.programme) progCharger(x.rep.programme);
}
function cxProfAide(p){
  if(!cdP || !p || !p.e) return;
  if(!cdP.aides) cdP.aides = new Set();
  if(p.on){
    cdP.aides.add(p.e);
    const el = cdP.eleves.find(x => x.id === p.e);
    cdToast(`<span class="gicon">front_hand</span> <b>${cdEsc(el ? (el.prenom || el.label) : 'Un élève')}</b> lève la main.`);
    const t = document.querySelector('.cd-toast:last-of-type'); if(t) t.style.background = '#1F3A5C';
  } else cdP.aides.delete(p.e);
  cxProfMaj();
}
// Scène de la télécommande quand l'élément en cours est un exercice.
function cxProfMonter(k, it){
  const c = document.getElementById('cdProfContenu'); if(!c) return;
  const d = it.exo.type === 'prog' && typeof progDefiParId === 'function' ? progDefiParId(it.exo.defi) : null;
  const apercu = it.exo.type === 'td'
    ? `<details class="cx-apercu"><summary>Voir l'exercice et sa correction</summary>${it.html || ''}${it.corr ? '<div class="pl-ex-corr-titre">Correction</div>' + it.corr : ''}</details>`
    : it.exo.type === 'prog'
    ? `<div class="cx-consigne">${d ? d.enonce : 'Défi introuvable.'}</div>`
    : `<details class="cx-apercu"><summary>Voir l'exercice et son corrigé (${cxNbQuestions(it).length} question${cxNbQuestions(it).length > 1 ? 's' : ''})</summary>${it.exo.questions.map(q => q.type === 'texte'
        ? `<div class="qz-doc">${qzEnonceHtml(q)}</div>` : `<div class="qz-q">${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, undefined, 'corrige', cxCtx('k'))}</div></div>`).join('')}</details>`;
  c.innerHTML = `${apercu}<div class="cx-resume" id="cxResume"></div><div class="cx-grille" id="cxGrille"></div><div class="cx-detail" id="cxDetail"></div>`;
  if(typeof qzChargerPhotos === 'function') qzChargerPhotos(c);
  if(typeof qzMonterInter === 'function') qzMonterInter(c);
  cxProfMaj();
  cxProfCharger(k).then(() => cxProfMaj());
}
function cxEtatEleve(k, e){
  const x = cxProfTrav(k).get(e), m = cdP.membres && cdP.membres.get(e);
  return { x, rep: (x && x.rep) || null, ecrit: !!(x && x.vu && Date.now() - x.vu < 15000), aide: !!(cdP.aides && cdP.aides.has(e)),
    main: !!(cdP.main && cdP.main.e === e && cdP.main.k === k), present: !!(m && !m.dehors && Date.now() - Date.parse(m.vu_at) < 60000), dehors: !!(m && m.dehors) };
}
// Aperçu de toutes les copies (bouton « Aperçu des copies ») : redessiné au plus une fois par seconde.
function cxProfApercu(){ if(!cdP) return; cdP.apercu = !cdP.apercu; cxProfMaj(); }
function cxProfMaj(seul){
  const it0 = cxProfItem();
  if(cdP && cdP.apercu && it0 && it0.exo && it0.exo.type !== 'prog'){
    const t = Date.now();
    if(cdP.apT && t - cdP.apT < 1000){ clearTimeout(cdP.apTimer); cdP.apTimer = setTimeout(() => cxProfMaj(seul), 1000 - (t - cdP.apT)); return; }
    cdP.apT = t;
  }
  cxProfMajFaire(seul);
}
function cxProfMiniCopie(it, rep){
  if(it.exo.type === 'qz'){ let n = 0;
    return `<div class="cx-mini">${it.exo.questions.map(q => q.type === 'texte' ? '' : `<div class="cx-mini-q"><b>${++n}.</b> ${qzRenderSaisie(q, rep[q.id], 'corrige', cxCtx('a'))}</div>`).join('')}</div>`; }
  return `<div class="cx-mini cx-mini-td"></div>`;
}
function cxProfMajFaire(seul){
  const it = cxProfItem(); if(!it || !it.exo) return;
  const k = cdP.etat.idx || 0, g = document.getElementById('cxGrille'); if(!g) return;
  const qs = it.exo.type === 'qz' ? cxNbQuestions(it) : [], d = it.exo.type === 'prog' ? progDefiParId(it.exo.defi) : null;
  let commence = 0, fini = 0, aides = 0;
  g.innerHTML = cdP.eleves.map(e => {
    const s = cxEtatEleve(k, e.id), rep = s.rep || {};
    let corps, ok = false;
    if(it.exo.type === 'qz'){
      const rep2 = qs.map(q => rep[q.id]), nb = rep2.filter((r, i) => qzRepondue(qs[i], r)).length;
      if(nb) commence++; ok = !!rep._fini || (qs.length && nb === qs.length); if(ok) fini++;
      corps = `<div class="cx-pastilles">${qs.map((q, i) => { const v = qzVerdict(q, rep2[i]); return `<i title="Question ${i + 1}" style="background:${CX_COUL[v] || CX_COUL.vide}"></i>`; }).join('')}</div>
        <small>${nb} / ${qs.length} répondue${nb > 1 ? 's' : ''}${rep._fini ? ' · <b>a terminé</b>' : ''}</small>`;
    } else if(it.exo.type === 'td'){
      const r = rep.res, nbT = r ? r.total : cxTdTotal(it);
      if(rep.etat) commence++; ok = !!(r && r.juste === r.total); if(ok) fini++;
      corps = `<div class="cx-pastilles">${Array.from({ length: nbT }, (_, i) => `<i style="background:${r ? (r.d[i] ? CX_COUL.juste : CX_COUL.faux) : CX_COUL.vide}"></i>`).join('')}</div>
        <small>${r ? `${r.juste} / ${r.total} juste${r.juste > 1 ? 's' : ''}` : rep.etat ? 'pas encore vérifié' : 'pas commencé'}${rep.essais ? ` · ${rep.essais} vérification${rep.essais > 1 ? 's' : ''}` : ''}</small>`;
    } else {
      if(s.rep) commence++; ok = !!rep.reussi; if(ok) fini++;
      corps = `<small>${ok ? '<b style="color:#1F7A4D;">Défi réussi</b>' : s.rep ? `${rep.blocs || 0} bloc${rep.blocs > 1 ? 's' : ''} · ${rep.essais || 0} vérification${rep.essais > 1 ? 's' : ''}` : 'pas commencé'}</small>`;
    }
    if(s.aide) aides++;
    const cls = [s.aide ? 'aide' : '', s.main ? 'main' : '', s.dehors ? 'dehors' : '', ok ? 'ok' : '', cdP.selEx === e.id ? 'sel' : '', !s.present && !s.rep ? 'absent' : ''].join(' ');
    const ap = cdP.apercu && it.exo.type !== 'prog';
    return `<button class="cx-t ${cls}${ap ? ' cx-t-ap' : ''}" data-e="${e.id}" onclick="cxProfVoir('${e.id}')"><span class="cx-t-nom">${cdEsc(e.label)}${s.ecrit ? ' <span class="cx-ecrit" title="en train de travailler"></span>' : ''}${s.aide ? ' <span class="gicon" title="Main levée">front_hand</span>' : ''}${s.main ? ' <span class="gicon" title="Vous avez la main">pan_tool_alt</span>' : ''}</span>${corps}
      ${s.dehors ? '<small class="cx-rouge">SORTI de la page</small>' : ''}${typeof cdEqInfo === 'function' ? cdEqInfo(e.id, true) : ''}${ap && s.rep ? cxProfMiniCopie(it, rep) : ''}</button>`;
  }).join('') || '<p class="hint">Aucun élève dans cette classe.</p>';
  g.classList.toggle('cx-grille-ap', !!(cdP.apercu && it.exo.type !== 'prog'));
  if(cdP.apercu && it.exo.type === 'td'){ const x = cxTdExo(it);
    if(x) g.querySelectorAll('.cx-mini-td').forEach(z => { const t = cxProfTrav(k).get(z.closest('[data-e]').dataset.e), rp = (t && t.rep) || {}; plNum(z, x, { etat: rp.etat, res: rp.res, lecture: true }); }); }
  if(cdP.apercu && it.exo.type === 'qz' && typeof qzMonterInter === 'function') qzMonterInter(g);
  const r = document.getElementById('cxResume');
  if(r) r.innerHTML = `${it.exo.type !== 'prog' ? `<button class="btn secondary td-mini cx-ap-btn" onclick="cxProfApercu()"><span class="gicon">${cdP.apercu ? 'view_module' : 'grid_view'}</span> ${cdP.apercu ? 'Vignettes simples' : 'Aperçu des copies'}</button>` : ''}<b>${commence}</b> / ${cdP.eleves.length} ont commencé · <b>${fini}</b> ${it.exo.type === 'prog' ? 'ont réussi' : it.exo.type === 'td' ? 'ont tout juste' : 'ont terminé'}${aides ? ` · <b class="cx-bleu"><span class="gicon">front_hand</span> ${aides} main${aides > 1 ? 's' : ''} levée${aides > 1 ? 's' : ''}</b>` : ''}
    ${it.exo.type === 'td' ? '<span class="cx-leg"><i style="background:#1F7A4D"></i>juste <i style="background:#9E1F5E"></i>faux <i style="background:#D5DBE3"></i>pas vérifié</span>' : ''}
    ${it.exo.type === 'qz' ? '<span class="cx-leg"><i style="background:#1F7A4D"></i>juste <i style="background:#C77D1E"></i>en partie <i style="background:#9E1F5E"></i>faux <i style="background:#3A6EA5"></i>à regarder <i style="background:#D5DBE3"></i>pas répondu</span>' : ''}`;
  if(cdP.selEx && (!seul || seul === cdP.selEx) && !(cdP.main && cdP.main.e === cdP.selEx)) cxProfDetail();
}
function cxProfVoir(e){
  if(!cdP) return;
  if(cdP.main && cdP.main.e !== e) cxRelacher();
  cdP.selEx = cdP.selEx === e && !cdP.main ? null : e;
  cxProfMaj(); if(!cdP.selEx){ const d = document.getElementById('cxDetail'); if(d) d.innerHTML = ''; }
  else document.getElementById('cxDetail')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
// Le détail est redessiné à chaque modification de l'élève : le mot en cours d'écriture est gardé.
function cxProfDetail(){
  const box = document.getElementById('cxDetail'); if(!box || !cdP) return;
  const ta = box.querySelector('#cxMotTxt'), br = ta && ta.dataset.e === cdP.selEx ? { v: ta.value, f: document.activeElement === ta, s: ta.selectionStart } : null;
  cxProfDetailFaire();
  const nt = box.querySelector('#cxMotTxt');
  if(nt && br){ nt.value = br.v; if(br.f){ nt.focus(); try{ nt.setSelectionRange(br.s, br.s); }catch(e){} } }
}
function cxMotHtml(m, prof){
  if(!m || !m.t) return '';
  const h = m.at ? new Date(m.at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
  return `<span class="cx-mot-oliv">${typeof olivPoseSvg === 'function' ? olivPoseSvg('savoir') : ''}</span><div><b>${prof ? 'Votre dernier mot' : 'Le mot de ton professeur'}</b>${h ? ` <small>${h}</small>` : ''}<p>${cdEsc(m.t).replace(/\n/g, '<br>')}</p></div>`;
}
function cxProfDetailFaire(){
  const box = document.getElementById('cxDetail'), it = cxProfItem(); if(!box || !it || !it.exo || !cdP.selEx) return;
  const k = cdP.etat.idx || 0, e = cdP.eleves.find(x => x.id === cdP.selEx), s = cxEtatEleve(k, cdP.selEx), rep = s.rep || {};
  const tete = `<div class="cx-d-tete"><b>${cdEsc(e ? e.label : '')}</b>${s.aide ? ' <span class="cx-bleu"><span class="gicon">front_hand</span> main levée</span>' : ''}
      <span style="flex:1"></span>
      ${it.exo.type === 'prog' ? `<button class="btn secondary" onclick="cxProfProg('regarder')"><span class="gicon">visibility</span> Voir son programme en direct</button>` : ''}
      ${s.main ? `<button class="btn" style="background:#1F7A4D;" onclick="cxRelacher()"><span class="gicon">pan_tool</span> Rendre la main</button>`
        : `<button class="btn" style="background:#E35D3A;" onclick="${it.exo.type === 'prog' ? 'cxProfProg(\'main\')' : 'cxPrendre()'}"><span class="gicon">pan_tool_alt</span> Prendre la main</button>`}
      <button class="modal-close" onclick="cxProfVoir('${cdP.selEx}')" title="Fermer"><span class="gicon">close</span></button></div>
    <div class="cx-mot-prof"><textarea id="cxMotTxt" data-e="${cdP.selEx}" rows="2" placeholder="Un mot pour aider ${cdEsc(e ? (e.prenom || e.label) : 'l\'élève')} : il s'affiche sur son écran, au-dessus de l'exercice."></textarea>
      <button class="btn" onclick="cxProfMot()"><span class="gicon">send</span> Envoyer</button>
      ${rep._mot && rep._mot.t ? `<div class="cx-mot cx-mot-envoye">${cxMotHtml(rep._mot, true)}<button class="btn secondary td-mini" onclick="cxProfMot(true)" title="Retirer le mot de son écran"><span class="gicon">delete</span></button></div>` : ''}</div>`;
  if(it.exo.type === 'td'){
    const tenu = s.main, r = rep.res;
    const xc = cxTdExo(it);
    box.innerHTML = `${tete}${tenu ? '<p class="cx-tenu"><span class="gicon">pan_tool_alt</span> Vous avez la main : ce que vous faites ici apparaît en direct sur l\'écran de l\'élève. Rendez-lui la main ensuite.</p>' : ''}
      <p class="hint" style="margin:4px 0;">${r ? `Dernière vérification : ${r.juste} / ${r.total} juste${r.juste > 1 ? 's' : ''}.` : rep.etat ? 'Pas encore vérifié.' : 'Pas encore commencé.'}</p>${xc && xc.consigne ? `<div class="cx-consigne">${xc.consigne}</div>` : ''}<div class="cx-td" id="cxTdProf"></div>`;
    const x = cxTdExo(it), zone = box.querySelector('#cxTdProf');
    if(!x || !plNum(zone, x, { etat: rep.etat, res: tenu ? null : r, lecture: !tenu, onChange: tenu ? e => cxTdProfChange(e) : null })) zone.innerHTML = it.html || '';
    else if(zone.querySelector('.pn-b-ko, .pn-b-oubli')) zone.insertAdjacentHTML('afterend', '<p class="hint cx-leg-b"><i class="ok"></i>juste <i class="ko"></i>en trop <i class="oubli"></i>oublié</p>');
    return;
  }
  if(it.exo.type === 'prog'){
    box.innerHTML = `${tete}<p>${rep.reussi ? '<b style="color:#1F7A4D;">Défi réussi.</b>' : s.rep ? 'Défi pas encore réussi.' : 'Pas encore commencé.'} ${rep.blocs ? `${rep.blocs} bloc${rep.blocs > 1 ? 's' : ''} posé${rep.blocs > 1 ? 's' : ''}.` : ''}</p>
      ${rep.msg ? `<div class="cx-msg"><span class="gicon">info</span> Dernière vérification : ${cdEsc(String(rep.msg).replace(/^(celebration|info)\s+/, ''))}</div>` : ''}`;
    return;
  }
  const qs = it.exo.questions, tenu = s.main;
  const reps = tenu && qzP && qzP.cours && qzP.prof ? qzP.reponses : rep;
  let n = 0;
  box.innerHTML = `${tete}${tenu ? '<p class="cx-tenu"><span class="gicon">pan_tool_alt</span> Vous avez la main : ce que vous faites ici apparaît en direct sur l\'écran de l\'élève, qui ne peut plus rien modifier. Rendez-lui la main ensuite.</p>' : ''}
    ${qs.map(q => {
      if(q.type === 'texte') return `<div class="qz-doc">${qzEnonceHtml(q)}</div>`;
      const v = qzVerdict(q, reps[q.id]); n++;
      return `<div class="qz-q" id="${tenu ? 'qzQ_' + q.id : ''}" data-qid="${q.id}"><div class="cx-qn">Question ${n} <span class="cx-v" style="background:${CX_COUL[v]}">${{ juste: 'juste', partiel: 'en partie', faux: 'faux', avoir: 'à regarder', sondage: 'réponse', vide: 'pas de réponse' }[v]}</span></div>
        ${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, reps[q.id], tenu ? 'passer' : 'corrige', cxCtx(tenu ? 'p' : 'c'))}</div></div>`;
    }).join('')}`;
  if(typeof qzChargerPhotos === 'function') qzChargerPhotos(box);
  if(typeof qzMonterInter === 'function') qzMonterInter(box);
}
// Mot d'aide : envoyé à l'élève (canal), qui l'enregistre avec son travail (il le garde en se reconnectant).
function cxProfMot(effacer){
  if(!cdP || !cdP.selEx) return;
  const ta = document.getElementById('cxMotTxt'), t = effacer ? '' : (ta ? ta.value.trim() : '');
  if(!t && !effacer) return;
  const e = cdP.selEx, k = cdP.etat.idx || 0, m = { t, at: new Date().toISOString() };
  cxEnvoyer(cdP.ch, 'mot', { e, k, m });
  const x = cxProfTrav(k).get(e) || {}; x.rep = Object.assign({}, x.rep, { _mot: m }); cxProfTrav(k).set(e, x);
  if(cdP.mots == null) cdP.mots = 0; if(t) cdP.mots++;
  if(ta) ta.value = '';
  cxProfDetail();
  if(t) cdToast(`<span class="gicon">send</span> Mot envoyé à <b>${cdEsc((cdP.eleves.find(z => z.id === e) || {}).label || '')}</b>.`);
}
// Prise en main d'une copie (questionnaire, figure comprise).
async function cxPrendre(){
  if(!cdP || !cdP.selEx) return;
  const k = cdP.etat.idx || 0, e = cdP.selEx, it = cxProfItem(); if(!it || !it.exo) return;
  if(cdP.main) cxRelacher();
  cxEnvoyer(cdP.ch, 'main', { e, k, on: true });
  if(cdP.aides) cdP.aides.delete(e);
  const box = document.getElementById('cxDetail'); if(box) box.insertAdjacentHTML('afterbegin', '<p class="hint">Prise en main…</p>');
  await new Promise(r => setTimeout(r, 700)); // l'élève enregistre ce qu'il était en train de faire
  cdP.main = null; await cxProfCharger(k, e);
  if(!cdP || cdP.selEx !== e) return;
  cdP.main = { e, k };
  if(it.exo.type === 'td'){ cxProfMaj(); cxProfDetail(); return; }
  const rep = cxClone((cxProfTrav(k).get(e) || {}).rep || {});
  qzP = { direct: true, cours: true, prof: true, e, k, apercu: false, data: { devoir: { id: 'cours', titre: it.titre } }, devoirId: 'cours-' + cdP.id,
    questions: it.exo.questions, reglages: {}, copie: null, reponses: rep, sorties: 0, log: [] };
  cxProfMaj(); cxProfDetail();
}
function cxRelacher(){
  if(!cdP || !cdP.main) return;
  const { e, k } = cdP.main;
  if(cdP.tdT){ clearTimeout(cdP.tdT); cdP.tdT = null; const x = cxProfTrav(k).get(e); if(x) cxProfSauver(e, k, x.rep); }
  if(typeof plClavier !== 'undefined') plClavier.fermer();
  if(qzP && qzP.cours && qzP.prof){
    if(cx.figQid && typeof closeFigureTool === 'function'){ const t = document.getElementById('toolsModalOverlay'); if(t && t.style.display !== 'none') closeFigureTool(); }
    cxProfEnvoi(true); qzP = null;
  }
  cdP.main = null;
  cxEnvoyer(cdP.ch, 'main', { e, k, on: false });
  cxProfMaj(); cxProfDetail();
}
// Le professeur écrit dans la copie de l'élève : enregistré (RLS : sa session), puis signalé.
function cxProfEnvoi(tout_de_suite){
  if(!cdP || !cdP.main || !qzP || !qzP.prof) return;
  const { e, k } = cdP.main, rep = cxClone(qzP.reponses);
  const x = cxProfTrav(k).get(e) || {}; cxProfTrav(k).set(e, Object.assign(x, { rep, t: Date.now() }));
  clearTimeout(cdP.envT);
  const go = () => cxProfSauver(e, k, rep);
  if(tout_de_suite) go(); else cdP.envT = setTimeout(go, 400);
  cxProfMaj(e);
}
async function cxProfSauver(e, k, rep){
  if(!cdP) return;
  const { error } = await sb.from('cours_direct_travaux').upsert({ direct_id: cdP.id, item: k, student_id: e, reponses: rep, updated_at: new Date().toISOString() }, { onConflict: 'direct_id,item,student_id' });
  if(error){ cdToast('<span class="gicon">error</span> Modification non enregistrée : ' + cdEsc(error.message)); return; }
  cxEnvoyer(cdP.ch, 'pilote', { e, k });
}

/* ---------- Programmation : le professeur regarde ou prend la main ---------- */
async function cxProfProg(mode){
  if(!cdP || !cdP.selEx) return;
  const k = cdP.etat.idx || 0, e = cdP.selEx, it = cxProfItem(); if(!it || !it.exo || it.exo.type !== 'prog') return;
  await cxProfCharger(k, e);
  const rep = (cxProfTrav(k).get(e) || {}).rep || {};
  cx.prog = { role: 'prof', e, k, mode: 'regarder', defi: it.exo.defi };
  if(!(await cxProgOuvrir(it.exo.defi, rep.programme))) return;
  prog.lecture = { cours: true }; // rien n'est enregistré dans la progression du professeur
  const v = document.getElementById('progVerif'); if(v) v.hidden = true;
  if(mode === 'main') cxProgMain(true); else cxBandeau();
}
function cxProgMain(on){
  if(!cx.prog || cx.prog.role !== 'prof' || !cdP) return;
  const { e, k } = cx.prog;
  if(on){ cdP.main = { e, k }; if(cdP.aides) cdP.aides.delete(e); cx.prog.mode = 'main'; cxEnvoyer(cdP.ch, 'main', { e, k, on: true }); }
  else { cxProgEnvoi(true); cdP.main = null; cx.prog.mode = 'regarder'; cxEnvoyer(cdP.ch, 'main', { e, k, on: false }); }
  cxBandeau();
}
function cxProgEnvoi(tout_de_suite){
  if(!cx.prog || !prog || !prog.ws) return;
  clearTimeout(cx.prog.envT);
  const go = () => {
    if(!cx.prog || !prog || !prog.ws) return;
    if(cx.prog.role === 'prof'){
      if(cx.prog.mode !== 'main' || !cdP) return;
      const { e, k } = cx.prog, avant = (cxProfTrav(k).get(e) || {}).rep || {};
      const rep = Object.assign({}, avant, { programme: progProgramme(), blocs: cxBlocs() });
      cxProfTrav(k).set(e, { rep, t: Date.now() });
      cxProfSauver(e, k, rep);
    } else if(cx.prog.mode === 'travail' && cdE){
      const k = cx.prog.k, avant = cdE.trav.get(k) || {};
      cdE.trav.set(k, Object.assign({}, avant, { programme: progProgramme(), blocs: cxBlocs() }));
      cxEleveSauver(k);
    }
  };
  if(tout_de_suite) go(); else cx.prog.envT = setTimeout(go, cx.prog.role === 'prof' ? 400 : 700);
}
// Texte d'un message sans le nom de ses icônes (« celebration », « info »… écrits en clair dans .gicon).
function cxTexteSansIcones(el){ const c = el.cloneNode(true); c.querySelectorAll('.gicon').forEach(i => i.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); }
function cxBlocs(){ try{ return prog.ws.getAllBlocks(false).filter(b => !b.isShadow()).length; }catch(e){ return 0; } }

/* =====================================================================
   ÉLÈVE
   ===================================================================== */
async function cxEleveTravaux(){
  if(!cdE || cdE.trav) return;
  cdE.trav = new Map();
  const { data } = await sb.from('cours_direct_travaux').select('item,reponses').eq('direct_id', cdE.id).eq('student_id', currentUser.id);
  (data || []).forEach(x => cdE.trav.set(x.item, x.reponses || {}));
}
function cxEleveTete(k, it){
  const tenu = cdE.main === k, m = (cdE.trav.get(k) || {})._mot;
  return `<div class="cx-mot" id="cxMot"${m && m.t ? '' : ' hidden'}>${cxMotHtml(m)}</div><div class="cx-e-barre">${tenu ? '<span class="cx-tenu"><span class="gicon">pan_tool_alt</span> Ton professeur a pris la main pour t\'aider : regarde !</span>'
      : `<span class="cx-e-chip"><span class="gicon">edit_square</span> Exercice à faire</span><span class="hint" id="cxSave" style="margin:0;"></span><span style="flex:1"></span>
        <button class="btn secondary${cdE.aide ? ' cx-leve' : ''}" onclick="cxEleveAide()"><span class="gicon">front_hand</span> ${cdE.aide ? 'Main levée : ton professeur arrive' : 'Lever la main'}</button>`}</div>`;
}
/* ---------- Exercices du manuel faits à l'écran (planches-num.js) ----------
   Élément : { titre, html (énoncé figé), corr, exo:{ type:'td', lvl, code, t, i, k } } ; l'exercice est
   relu dans PLANCHES (scripts des chapitres). Travail : { etat, res (dernière vérification), essais }. */
function cxTdExo(it){
  const e = it && it.exo; if(!e || typeof plDe !== 'function') return null;
  const p = plDe(e.lvl, e.t)[e.i]; return p && p.exos[e.k] ? p.exos[e.k] : null;
}
function cxTdTotal(it){ const x = cxTdExo(it), m = x && typeof plNumModele === 'function' ? plNumModele(x) : null; return m ? m.cibles.length : 0; }
function cxTdProfChange(etat){
  if(!cdP || !cdP.main) return;
  const { e, k } = cdP.main, x = cxProfTrav(k).get(e) || {}, rep = Object.assign({}, x.rep, { etat, res: null });
  cxProfTrav(k).set(e, Object.assign(x, { rep, t: Date.now() }));
  clearTimeout(cdP.tdT); cdP.tdT = setTimeout(() => { cdP.tdT = null; cxProfSauver(e, k, rep); }, 400);
}
function cxEleveTd(k, it, c){
  const rep = cdE.trav.get(k) || {}, tenu = cdE.main === k, x = cxTdExo(it);
  const corr = it.corr && cdE.d && cdE.d.idx === k && cdE.d.etat && cdE.d.etat.corr;
  if(typeof plClavier !== 'undefined') plClavier.fermer();
  c.innerHTML = `${cxEleveTete(k, it)}${x && x.consigne ? `<div class="cx-consigne">${x.consigne}</div>` : ''}<div class="cx-td" id="cxTdEl"></div>
    ${tenu ? '' : `<div class="pn-actions"><button class="btn cx-td-verif" onclick="cxEleveTdVerifier()"><span class="gicon">task_alt</span> Vérifier ma réponse</button>
      <button class="btn secondary" onclick="cxEleveTdEffacer()"><span class="gicon">ink_eraser</span> Effacer</button></div>`}
    <div class="pn-bilan ${rep.res ? (rep.res.juste === rep.res.total ? 'ok' : 'ko') : ''}" id="cxTdBilan">${rep.res && typeof plNumBilan === 'function' ? plNumBilan(rep.res) : ''}</div>
    ${corr ? '<div class="cd-corr-montree"><span class="gicon">fact_check</span> Correction</div>' + it.corr : ''}`;
  const zone = c.querySelector('#cxTdEl');
  cdE.td = x && typeof plNum === 'function' ? plNum(zone, x, { etat: rep.etat, res: rep.res, lecture: tenu, onChange: etat => {
    const avant = cdE.trav.get(k) || {}; cdE.trav.set(k, Object.assign({}, avant, { etat, res: null }));
    const b = document.getElementById('cxTdBilan'); if(b){ b.innerHTML = ''; b.className = 'pn-bilan'; }
    const s = document.getElementById('cxSave'); if(s) s.textContent = 'Enregistrement…';
    clearTimeout(cdE.saveT); cdE.saveT = setTimeout(() => cxEleveSauver(k), 700);
  } }) : null;
  if(!cdE.td){ zone.innerHTML = it.html || ''; if(typeof renderStaticMath === 'function') renderStaticMath(zone); }
}
function cxEleveTdVerifier(){
  if(!cdE || !cdE.td) return;
  const k = cdE.vue, res = cdE.td.verifier(), avant = cdE.trav.get(k) || {};
  cdE.trav.set(k, Object.assign({}, avant, { etat: cdE.td.etat(), res, essais: (avant.essais || 0) + 1 }));
  const b = document.getElementById('cxTdBilan'); if(b){ b.className = 'pn-bilan ' + (res.juste === res.total ? 'ok' : 'ko'); b.innerHTML = plNumBilan(res); }
  cxEleveSauver(k);
}
function cxEleveTdEffacer(){ if(cdE && cdE.td) cdE.td.effacer(); }
// Remplit #cdEleveContenu quand l'élément affiché est un exercice.
async function cxEleveMonter(k, it){
  await cxEleveTravaux();
  const c = document.getElementById('cdEleveContenu'); if(!c || !cdE) return;
  cdE.cxMonte = k;
  const rep = cdE.trav.get(k) || {}, tenu = cdE.main === k;
  if(it.exo.type === 'td'){ if(qzP && qzP.cours) qzP = null; cxEleveTd(k, it, c); return; }
  if(it.exo.type === 'prog'){
    if(qzP && qzP.cours) qzP = null;
    const d = typeof progDefiParId === 'function' ? progDefiParId(it.exo.defi) : null;
    c.innerHTML = `${cxEleveTete(k, it)}<div class="cx-consigne">${d ? d.enonce : 'Défi introuvable.'}</div>
      <p>${rep.reussi ? '<b style="color:#1F7A4D;">Bravo, défi réussi !</b> Tu peux encore améliorer ton programme.' : rep.programme ? 'Ton programme est enregistré : continue !' : 'Construis ton programme avec les blocs, puis clique sur « Vérifier mon programme ».'}</p>
      <button class="btn" onclick="cxEleveProg()"><span class="gicon">extension</span> ${rep.programme ? 'Reprendre mon programme' : 'Ouvrir l\'éditeur de blocs'}</button>`;
    return;
  }
  const qs = it.exo.questions;
  qzP = { direct: true, cours: true, k, apercu: false, data: { devoir: { id: 'cours', titre: it.titre } }, devoirId: 'cours-' + cdE.id,
    questions: qs, reglages: {}, copie: null, reponses: cxClone(rep), sorties: 0, log: [] };
  let n = 0;
  c.innerHTML = `${cxEleveTete(k, it)}${qs.map(q => q.type === 'texte' ? `<div class="qz-doc">${qzEnonceHtml(q)}</div>`
      : `<div class="qz-q" id="qzQ_${q.id}" data-qid="${q.id}"><div class="cx-qn">Question ${++n}</div>${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, qzP.reponses[q.id], tenu ? 'lecture' : 'passer', cxCtx('p'))}</div></div>`).join('')}
    ${tenu ? '' : `<div class="cx-fin"><button class="btn${rep._fini ? ' secondary' : ''}" onclick="cxEleveFini()"><span class="gicon">${rep._fini ? 'undo' : 'task_alt'}</span> ${rep._fini ? 'Finalement, je continue' : 'J\'ai terminé'}</button></div>`}`;
  if(typeof qzChargerPhotos === 'function') qzChargerPhotos(c);
  if(typeof qzMonterInter === 'function') qzMonterInter(c);
}
// Appelé par qzModifie (questionnaires.js) quand qzP.cours.
function cxModifie(){
  if(!qzP || !qzP.cours) return;
  if(qzP.prof) return cxProfEnvoi();
  if(!cdE || cdE.main === qzP.k) return;
  const k = qzP.k, avant = cdE.trav.get(k) || {};
  cdE.trav.set(k, Object.assign(cxClone(qzP.reponses), cxCles(avant)));
  const s = document.getElementById('cxSave'); if(s) s.textContent = 'Enregistrement…';
  clearTimeout(cdE.saveT); cdE.saveT = setTimeout(() => cxEleveSauver(k), 700);
}
async function cxEleveSauver(k){
  if(!cdE) return;
  clearTimeout(cdE.saveT); cdE.saveT = null;
  const { error } = await sb.rpc('cours_direct_travail', { p_id: cdE.id, p_item: k, p_reponses: cdE.trav.get(k) || {} });
  const s = document.getElementById('cxSave');
  if(error){ if(s) s.textContent = 'Non enregistré : ' + error.message; return; }
  if(s) s.textContent = 'Enregistré';
  cxEnvoyer(cdE.ch, 'trav', { e: currentUser.id, k });
}
function cxEleveFini(){
  if(!cdE || !cdE.d) return;
  const k = cdE.vue, rep = Object.assign({}, cdE.trav.get(k) || {});
  if(rep._fini) delete rep._fini; else rep._fini = true;
  cdE.trav.set(k, rep); cxEleveSauver(k);
  cxEleveMonter(k, cdE.d.items[k]);
}
// Clés gardées quand l'élève réécrit ses réponses : terminé, mot du professeur, mains levées.
function cxCles(r){ const o = {}; Object.keys(r || {}).forEach(c => { if(c[0] === '_') o[c] = r[c]; }); return o; }
async function cxEleveMot(p){
  if(!cdE || !p || p.e !== currentUser.id) return;
  await cxEleveTravaux();
  const rep = Object.assign({}, cdE.trav.get(p.k)); rep._mot = p.m; cdE.trav.set(p.k, rep);
  if(qzP && qzP.cours && qzP.k === p.k) qzP.reponses._mot = p.m;
  cxEleveSauver(p.k);
  const z = document.getElementById('cxMot');
  if(z && cdE.vue === p.k){ z.innerHTML = cxMotHtml(p.m); z.hidden = !(p.m && p.m.t); }
  if(p.m && p.m.t){ cdToast(`<span class="gicon">chat</span> <b>Ton professeur :</b> ${cdEsc(p.m.t)}`); const t = document.querySelector('.cd-toast:last-of-type'); if(t) t.style.background = '#1F3A5C'; }
}
async function cxEleveAide(){
  if(!cdE) return;
  cdE.aide = !cdE.aide;
  if(cdE.aide){ // compté pour le bilan de la séance, sur l'élément regardé
    await cxEleveTravaux(); const k = cdE.vue, rep = Object.assign({}, cdE.trav.get(k));
    rep._mains = (rep._mains || 0) + 1; cdE.trav.set(k, rep); if(qzP && qzP.cours && qzP.k === k) qzP.reponses._mains = rep._mains;
    cxEleveSauver(k);
  }
  cxEnvoyer(cdE.ch, 'aide', { e: currentUser.id, on: cdE.aide });
  cxEleveRafraichir();
}
function cxEleveRafraichir(){
  if(!cdE || !cdE.d) return;
  if(cx.prog && cx.prog.role === 'eleve') return cxBandeau();
  const it = cdE.d.items[cdE.vue]; if(it && it.exo) cxEleveMonter(cdE.vue, it);
}
// Messages du professeur.
async function cxEleveMain(p){
  if(!cdE || !p || p.e !== currentUser.id) return;
  const it = cdE.d && cdE.d.items[p.k];
  if(p.on){
    if(cdE.saveT) await cxEleveSauver(qzP && qzP.cours ? qzP.k : p.k);
    if(cx.prog && cx.prog.role === 'eleve'){ clearTimeout(cx.prog.envT); if(cx.prog.mode === 'travail') cxProgEnvoi(true); }
    cdE.main = p.k; cdE.aide = false;
    if(cx.figQid && typeof closeFigureTool === 'function'){ const t = document.getElementById('toolsModalOverlay'); if(t && t.style.display !== 'none') closeFigureTool(); }
    if(it && it.exo && it.exo.type === 'prog'){
      if(cdE.vue !== p.k){ cdE.vue = p.k; cdEleveRendre(); }
      if(!cx.prog) await cxEleveProg();
      if(cx.prog){ cx.prog.mode = 'verrou'; cxBandeau(); }
      return;
    }
    if(cdE.vue !== p.k){ cdE.vue = p.k; cdEleveRendre(); } else cxEleveRafraichir();
  } else {
    cdE.main = null;
    await cxElevePilote({ e: p.e, k: p.k });
    if(cx.prog && cx.prog.role === 'eleve'){ cx.prog.mode = 'travail'; cxBandeau(); }
    else cxEleveRafraichir();
    cdToast('<span class="gicon">pan_tool</span> À toi de jouer : tu as de nouveau la main.');
    const t = document.querySelector('.cd-toast:last-of-type'); if(t) t.style.background = '#1F7A4D';
  }
}
async function cxElevePilote(p){
  if(!cdE || !p || p.e !== currentUser.id) return;
  if(p.lancer){ if(cx.prog && cx.prog.role === 'eleve' && typeof progLancer === 'function') cxLancerOrig(); return; }
  const { data } = await sb.from('cours_direct_travaux').select('reponses').eq('direct_id', cdE.id).eq('item', p.k).eq('student_id', currentUser.id).maybeSingle();
  if(!data || !cdE) return;
  cdE.trav.set(p.k, data.reponses || {});
  if(cx.prog && cx.prog.role === 'eleve' && cx.prog.k === p.k){ if(data.reponses && data.reponses.programme) progCharger(data.reponses.programme); return; }
  if(cdE.vue === p.k) cxEleveRafraichir();
}
async function cxEleveProg(){
  if(!cdE || !cdE.d) return;
  const k = cdE.vue, it = cdE.d.items[k]; if(!it || !it.exo || it.exo.type !== 'prog') return;
  cx.prog = { role: 'eleve', k, mode: cdE.main === k ? 'verrou' : 'travail', defi: it.exo.defi };
  const rep = cdE.trav.get(k) || {};
  await cxProgOuvrir(it.exo.defi, rep.programme || null);
}

/* ---------- Éditeur de blocs dans la session (élève et professeur) ---------- */
async function cxProgOuvrir(defiId, programme){
  const vue = document.querySelector('.view.active');
  cx.vueAvant = vue && vue.id !== 'view-programmation' ? vue.id : cx.vueAvant;
  document.body.classList.add('cd-travail');
  cxBandeau('<span class="cd-b-t">Chargement de l\'éditeur de blocs…</span>');
  if(typeof progOuvrir !== 'function'){ cxQuitterProg(); return false; }
  await progOuvrir({});
  if(!cx.prog) return false;
  if(!prog || !prog.ws || !progDefiParId(defiId)){ const r = cx.prog.role; cxQuitterProg(); if(r) niceAlert('L\'éditeur de blocs n\'a pas pu être chargé (connexion ?).'); return false; }
  progDefi(defiId);
  ['progTabs', 'progListe'].forEach(id => { const el = document.getElementById(id); if(el) el.hidden = true; });
  progCharger(programme || progDepartDefaut());
  prog.scene.reset(); prog.scene.fond(); progMajPos();
  cxBandeau();
  return true;
}
function cxQuitterProg(){
  if(!cx.prog && !document.body.classList.contains('cd-travail')) return;
  const p = cx.prog;
  if(p){
    if(p.role === 'eleve' && p.mode === 'travail') cxProgEnvoi(true);
    if(p.role === 'prof'){ if(p.mode === 'main') cxProgMain(false); if(prog) prog.lecture = null; }
  }
  cx.prog = null;
  if(typeof progArreter === 'function') progArreter();
  document.body.classList.remove('cd-travail');
  ['cxBandeau', 'cxVoile'].forEach(id => { const el = document.getElementById(id); if(el) el.remove(); });
  if(cx.vueAvant && typeof showView === 'function') showView(cx.vueAvant);
  cx.vueAvant = null;
  if(p && p.role === 'eleve' && cdE) cdEleveRendre();
  if(p && p.role === 'prof' && cdP){ cxProfMaj(); cxProfDetail(); }
}
function cxBandeau(msg){
  let b = document.getElementById('cxBandeau');
  if(!b){ b = document.createElement('div'); b.id = 'cxBandeau'; document.body.appendChild(b); }
  const p = cx.prog;
  let voile = null;
  if(msg || !p) b.innerHTML = msg || '';
  else if(p.role === 'prof'){
    const e = cdP && cdP.eleves.find(x => x.id === p.e), nom = cdEsc(e ? e.label : 'élève');
    b.innerHTML = p.mode === 'main'
      ? `<span class="cd-b-t"><span class="gicon">pan_tool_alt</span> Vous avez la main sur le programme de ${nom}</span><span class="cd-b-h">Il voit vos modifications ; 🏁 lance aussi le lutin chez lui.</span>
         <button class="go" onclick="cxProgMain(false)"><span class="gicon">pan_tool</span> Rendre la main</button><button onclick="cxQuitterProg()"><span class="gicon">close</span> Télécommande</button>`
      : `<span class="cd-b-t"><span class="gicon">visibility</span> Programme de ${nom}, en direct</span>
         <button class="go" style="background:#E35D3A;" onclick="cxProgMain(true)"><span class="gicon">pan_tool_alt</span> Prendre la main</button><button onclick="cxQuitterProg()"><span class="gicon">close</span> Télécommande</button>`;
    if(p.mode === 'regarder') voile = 'Vous regardez : prenez la main pour modifier.';
  } else {
    b.innerHTML = p.mode === 'verrou'
      ? `<span class="cd-b-t"><span class="gicon">pan_tool_alt</span> Ton professeur a pris la main pour t'aider : regarde !</span>`
      : `<span class="cd-b-t">${cdEsc(cdE && cdE.d ? cdE.d.titre : '')} · exercice</span>
         <button onclick="cxEleveAide()"${cdE && cdE.aide ? ' class="go" style="background:#3A6EA5;"' : ''}><span class="gicon">front_hand</span> ${cdE && cdE.aide ? 'Main levée' : 'Lever la main'}</button>
         <button onclick="cxQuitterProg()"><span class="gicon">arrow_back</span> Revenir au cours</button>`;
    if(p.mode === 'verrou') voile = 'Ton professeur modifie ton programme.';
  }
  let v = document.getElementById('cxVoile');
  if(voile){ if(!v){ v = document.createElement('div'); v.id = 'cxVoile'; document.body.appendChild(v); } v.innerHTML = `<span>${voile}</span>`; }
  else if(v) v.remove();
}

/* ---------- Branchements sur les outils existants ---------- */
// Programmation : chaque modification part (élève au travail, professeur qui a la main) ; 🏁 du
// professeur lance aussi le lutin chez l'élève ; une vérification de l'élève est transmise.
let cxLancerOrig = null;
(function cxBrancher(){
  if(typeof progModifie === 'function'){
    const o = progModifie;
    progModifie = function(){ const r = o.apply(this, arguments); if(cx.prog && prog && !prog.chargement && (cx.prog.mode === 'travail' || cx.prog.mode === 'main')) cxProgEnvoi(); return r; };
  }
  if(typeof progLancer === 'function'){
    const o = progLancer; cxLancerOrig = function(){ return o.apply(this, arguments); };
    progLancer = function(){ if(cx.prog && cx.prog.role === 'prof' && cx.prog.mode === 'main' && cdP) cxEnvoyer(cdP.ch, 'pilote', { e: cx.prog.e, k: cx.prog.k, lancer: true }); return o.apply(this, arguments); };
  }
  if(typeof progVerifier === 'function'){
    const o = progVerifier;
    progVerifier = async function(){
      const r = await o.apply(this, arguments);
      if(cx.prog && cx.prog.role === 'eleve' && cx.prog.mode === 'travail' && cdE){
        const k = cx.prog.k, avant = cdE.trav.get(k) || {}, res = document.querySelector('#progVerifMsg .prog-res');
        cdE.trav.set(k, Object.assign({}, avant, { programme: progProgramme(), blocs: cxBlocs(), essais: (avant.essais || 0) + 1,
          reussi: !!avant.reussi || !!(res && res.classList.contains('ok')), msg: res ? cxTexteSansIcones(res) : '' }));
        cxEleveSauver(k);
      }
      return r;
    };
  }
  // Figure dynamique d'une question : la construction part pendant qu'on la fait.
  if(typeof qziFigOuvrir === 'function'){
    const o = qziFigOuvrir;
    qziFigOuvrir = function(qid){
      if(qzP && qzP.cours){ if(!qzP.prof && cdE && cdE.main === qzP.k) return; cx.figQid = qid; }
      return o.apply(this, arguments);
    };
  }
  if(typeof renderFigureSvg === 'function'){
    const o = renderFigureSvg;
    renderFigureSvg = function(){ const r = o.apply(this, arguments); if(cx.figQid) cxFigChange(); return r; };
  }
  if(typeof closeFigureTool === 'function'){
    const o = closeFigureTool;
    closeFigureTool = function(){ if(cx.figQid){ clearTimeout(cx.figT); cx.figQid = null; } return o.apply(this, arguments); };
  }
})();
function cxFigChange(){
  clearTimeout(cx.figT);
  cx.figT = setTimeout(() => {
    const qid = cx.figQid; if(!qid || !qzP || !qzP.cours || typeof serializeFigState !== 'function') return;
    const t = document.getElementById('toolsModalOverlay'); if(!t || t.style.display === 'none') return;
    const vb = [figViewBox.x, figViewBox.y, figViewBox.w, figViewBox.h].map(v => Math.round(v * 10) / 10);
    qzP.reponses[qid] = { f: serializeFigState(figState), vb };
    cxModifie();
  }, 600);
}

(function cxStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .cx-ch{max-width:680px;width:94vw;max-height:88vh;display:flex;flex-direction:column;}
    .cx-onglets{display:flex;gap:4px;background:#EEF1F5;border-radius:10px;padding:3px;flex-wrap:wrap;margin-bottom:10px;}
    .cx-onglets button{border:0;background:none;border-radius:8px;padding:6px 12px;font:700 .85rem 'Space Grotesk',sans-serif;cursor:pointer;display:inline-flex;gap:4px;align-items:center;color:var(--ink);}
    .cx-onglets button.on{background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.12);}
    .cx-ch-corps{overflow:auto;flex:1;min-height:160px;}
    .cx-ch-liste{display:flex;flex-direction:column;gap:6px;}
    .cd-vivant button.btn:not(.secondary):not(.orange){background:var(--cd-btn) !important;border-color:var(--cd-btn) !important;}
    .cd-vivant .add-to-cahier-btn, .cd-vivant .cp-eb, .cd-vivant .cp-chip-edit{display:none !important;}
        .cx-co-sel{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;} .cx-co-sel select{flex:1;min-width:120px;} .cx-co-sel select:first-child{flex:0 0 90px;}
    .cx-co-liste{border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:8px 10px;background:#fff;}
    .cx-co-onglet{display:block;color:#1F3A5C;margin:6px 0 2px;font-family:'Space Grotesk',sans-serif;}
    .cx-co-p{display:block;padding:4px 2px;cursor:pointer;font-weight:700;} .cx-co-p.sous{font-weight:500;padding-left:22px;} .cx-co-p small{color:var(--ink-soft);font-weight:500;}
    .cx-ch-it{display:flex;flex-direction:column;gap:2px;text-align:left;border:1.5px solid rgba(28,43,57,.12);background:#fff;border-radius:10px;padding:8px 12px;cursor:pointer;font:inherit;color:var(--ink);}
    .cx-man-pl{font:700 .82rem 'Space Grotesk',sans-serif;color:#1F3A5C;margin:6px 0 0;} .cx-man-it{cursor:pointer;} .cx-man-et{color:#E9A21C;letter-spacing:2px;font-size:.8rem;} .cx-man-et .pl-et-off{color:#D8DCE3;} .cx-man-it input{vertical-align:-2px;}
    .cx-ch-it:hover{border-color:#1F3A5C;} .cx-ch-it small{color:var(--ink-soft);font-size:.78rem;}
    .cd-exos{margin-top:8px;} .cd-exos > b{display:block;color:#1F3A5C;margin:4px 0;}
    .cd-exo{display:flex;align-items:center;gap:6px;padding:4px 2px;} .cd-exo .gicon{color:#E35D3A;font-size:18px;}
    .cd-exo small{color:var(--ink-soft);} .cd-exo-act{margin-left:auto;display:flex;gap:2px;} .cd-exo-act button{border:0;background:none;cursor:pointer;color:var(--ink-soft);display:flex;padding:2px;} .cd-exo-act button:disabled{opacity:.3;cursor:default;} .cd-exo-act .gicon{font-size:17px;color:inherit !important;}
    .cx-apercu{background:#F6F8FB;border-radius:10px;padding:6px 10px;margin-bottom:10px;} .cx-apercu summary{cursor:pointer;font-weight:700;color:#1F3A5C;}
    .cx-consigne{background:#F6F8FB;border-radius:10px;padding:10px 14px;margin-bottom:10px;font-size:1.02rem;}
    .cx-resume{display:flex;gap:6px 14px;flex-wrap:wrap;align-items:center;font-family:'Space Grotesk',sans-serif;margin:4px 0 8px;}
    .cx-leg-b{display:flex;gap:4px;align-items:center;margin:6px 0 0;} .cx-leg-b i{width:14px;height:14px;border-radius:50%;display:inline-block;margin-left:8px;border:2.5px solid #1F7A4D;} .cx-leg-b i.ko{border-color:#C0392B;} .cx-leg-b i.oubli{border:2.5px dashed #E08A1E;}
    .cx-leg{display:inline-flex;gap:4px;align-items:center;font:500 .75rem Inter,sans-serif;color:var(--ink-soft);margin-left:auto;} .cx-leg i{width:10px;height:10px;border-radius:3px;display:inline-block;margin-left:6px;}
    .cx-bleu{color:#3A6EA5;} .cx-bleu .gicon,.cx-rouge .gicon{font-size:17px;vertical-align:middle;} .cx-rouge{color:#C0392B;font-weight:800;}
    .cx-grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;}
    .cx-grille.cx-grille-ap{grid-template-columns:repeat(auto-fill,minmax(300px,1fr));align-items:start;}
    .cx-mini{zoom:.62;pointer-events:none;max-height:420px;overflow:hidden;border-top:1px solid rgba(28,43,57,.1);padding-top:6px;font-size:.95rem;}
    .cx-mini-q{margin:0 0 6px;} .cx-mini svg{max-width:100%;height:auto;}
    .cx-ap-btn{float:right;margin-left:8px;}
    .cx-mot{display:flex;gap:10px;align-items:flex-start;background:#FFF8E6;border:2px solid #F0C24E;border-radius:14px;padding:8px 12px;margin:0 0 10px;}
    .cx-mot[hidden]{display:none;} .cx-mot p{margin:2px 0 0;white-space:normal;} .cx-mot small{color:var(--ink-soft);}
    .cx-mot-oliv{width:42px;height:42px;flex:none;display:inline-block;} .cx-mot-oliv svg{width:100%;height:100%;}
    .cx-mot-prof{display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap;margin:6px 0 10px;} .cx-mot-prof textarea{flex:1;min-width:240px;border-radius:10px;border:1.5px solid rgba(28,43,57,.2);padding:6px 10px;font:inherit;}
    .cx-mot-envoye{flex-basis:100%;margin:0;} .cx-mot-envoye > div{flex:1;}
    .cx-t{display:flex;flex-direction:column;gap:5px;text-align:left;border:2px solid rgba(28,43,57,.1);background:#fff;border-radius:12px;padding:8px 10px;cursor:pointer;font:inherit;color:var(--ink);}
    .cx-t small{color:var(--ink-soft);font-size:.76rem;}
    .cx-t.sel{border-color:#1F3A5C;box-shadow:0 0 0 3px rgba(31,58,92,.15);} .cx-t.ok{border-left:6px solid #1F7A4D;} .cx-t.absent{opacity:.6;}
    .cx-t.aide{background:#EAF1FA;border-color:#3A6EA5;} .cx-t.aide .gicon{color:#3A6EA5;animation:cdClign 1s infinite;}
    .cx-t.main{border-color:#E35D3A;} .cx-t.dehors{background:#FBECEA;}
    .cx-t-nom{font-weight:800;font-family:'Space Grotesk',sans-serif;display:flex;align-items:center;gap:4px;} .cx-t-nom .gicon{font-size:17px;color:#E35D3A;}
    .cx-ecrit{width:9px;height:9px;border-radius:50%;background:#2E9C6A;display:inline-block;animation:cdClign 1.2s infinite;}
    .cx-pastilles{display:flex;gap:3px;flex-wrap:wrap;} .cx-pastilles i{width:14px;height:14px;border-radius:4px;display:inline-block;}
    .cx-detail:not(:empty){margin-top:12px;border:2px solid #1F3A5C;border-radius:12px;padding:10px 14px;background:#fff;}
    .cx-d-tete{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;font-family:'Space Grotesk',sans-serif;} .cx-d-tete > b{font-size:1.1rem;}
    .cx-qn{font:800 .85rem 'Space Grotesk',sans-serif;color:#1F3A5C;margin-bottom:4px;display:flex;gap:8px;align-items:center;}
    .cx-v{color:#fff;border-radius:999px;padding:1px 8px;font-size:.72rem;}
    .cx-tenu{display:flex;gap:6px;align-items:center;background:#FDEEE9;color:#A8421F;border-radius:10px;padding:8px 12px;font-weight:700;margin:0 0 8px;}
    .cx-msg{background:#F6F8FB;border-radius:10px;padding:8px 12px;display:flex;gap:6px;}
    .cx-e-barre{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;} .cx-e-barre .cx-tenu{flex:1;margin:0;}
    .cx-e-chip{display:inline-flex;gap:4px;align-items:center;background:#E35D3A;color:#fff;border-radius:999px;padding:4px 12px;font-weight:700;font-size:.85rem;}
    .cx-leve{background:#3A6EA5 !important;color:#fff !important;border-color:#3A6EA5 !important;}
    #cdEleve .qz-q{background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:12px 14px;margin-bottom:12px;}
    .cx-fin{text-align:center;margin:14px 0 30px;}
    body.cd-travail #cdEleve, body.cd-travail #cdProf{display:none !important;}
    #cxBandeau{position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:9700;display:flex;gap:8px;align-items:center;background:rgba(31,58,92,.96);color:#fff;padding:8px 12px;border-radius:14px;font-family:'Space Grotesk',sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);flex-wrap:wrap;justify-content:center;max-width:94vw;}
    #cxBandeau:empty{display:none;}
    #cxBandeau button{border:0;border-radius:10px;background:rgba(255,255,255,.16);color:#fff;font:700 .9rem 'Space Grotesk',sans-serif;padding:6px 12px;cursor:pointer;display:inline-flex;gap:4px;align-items:center;}
    #cxBandeau button.go{background:#2E9C6A;} #cxBandeau .gicon{font-size:18px;vertical-align:middle;}
    body.cd-travail #view-programmation{padding-top:58px;}
    body.cd-travail .topbar, body.cd-travail #breadcrumb, body.cd-travail footer, body.cd-travail .site-footer{display:none !important;}
    #cxVoile{position:fixed;inset:0;z-index:9650;background:rgba(255,255,255,.08);cursor:not-allowed;display:flex;align-items:flex-end;justify-content:center;padding-bottom:18px;}
    #cxVoile span{background:#E35D3A;color:#fff;border-radius:999px;padding:6px 14px;font:700 .9rem 'Space Grotesk',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.2);}
    body.cd-eleve-ouvert #toolsModalOverlay, body.cd-prof-ouvert #toolsModalOverlay{z-index:9300 !important;}
    body.cd-eleve-ouvert #figFullscreenBtn{display:none !important;}
    body.cd-eleve-ouvert #niceModalOverlay, body.cd-prof-ouvert #niceModalOverlay, body.cd-travail #niceModalOverlay{z-index:9800 !important;}
    body.cd-travail .cd-toast, body.cd-eleve-ouvert .cd-toast{z-index:9900;}
  `;
  document.head.appendChild(st);
})();
