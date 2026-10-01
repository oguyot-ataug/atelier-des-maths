/* =====================================================================
   flash-prets.js -- Questions flash prêtes à l'emploi pour chaque chapitre du primaire.

   Demandé : « On pourrait prévoir sur les classes du primaire des petites questions déjà préparées
   utilisables par l'enseignant avec les flashcodes sur chaque thème des cours. »

   Chaque chapitre du CE2, du CM1 et du CM2 déclare ses questions dans cm1Chapitre({ flash: [...] })
   (chapitres/cm1/_commun.js › CM_FLASH) : { q, r: [2 à 4 réponses], ok: index de la bonne }.
   Sur la page du chapitre, un professeur voit le bouton « Questions flash (cartes) » : la fenêtre
   montre les questions (bonne réponse en vert), il décoche celles qu'il ne veut pas, puis lance une
   séance en direct (questionnaires-direct.js › qzDirectLancer) où les élèves répondent en levant
   leur carte A, B, C ou D. Sans questions « flash », le quiz du chapitre sert de réserve.

   Dépend de app.js (currentUserRole, currentChapterLevel, currentChapterTitle, DEMO_QUIZZES),
   de chapitres/cm1/_commun.js (CM_FLASH) et de questionnaires-direct.js.
   ===================================================================== */

const FP_NIVEAUX = ['ce2', 'cm1', 'cm2'];
const FP_LETTRES = ['A', 'B', 'C', 'D'];

// Questions prêtes du chapitre, au format { q, r, ok } (le quiz du chapitre à défaut).
function fpQuestions(lvl, titre){
  const cle = lvl + '|' + titre;
  if(typeof CM_FLASH !== 'undefined' && CM_FLASH[cle] && CM_FLASH[cle].length) return CM_FLASH[cle];
  const quiz = (typeof DEMO_QUIZZES !== 'undefined' && DEMO_QUIZZES[cle]) || [];
  return quiz.filter(x => x.opts && x.opts.length <= 4).map(x => ({ q: x.q, r: x.opts, ok: x.correct }));
}
// Au format des questionnaires (QCM à une bonne réponse : compatible avec les cartes A à D).
function fpVersQuestionnaire(liste){
  return liste.map((x, i) => ({ id: 'fp' + i, type: 'qcm', enonce: x.q, points: 1, competence: '',
    choix: x.r.map((t, j) => ({ id: 'fp' + i + 'c' + j, texte: t, correct: j === x.ok })) }));
}

// Appelée à chaque ouverture de chapitre (app.js › openChapitre).
function fpMaj(lvl, titre){
  let b = document.getElementById('fpBouton');
  const ok = (currentUserRole === 'prof' || currentUserRole === 'admin') && FP_NIVEAUX.includes(lvl) && fpQuestions(lvl, titre).length > 0;
  if(!ok){ if(b) b.remove(); return; }
  if(!b){
    const meta = document.getElementById('chap-meta'); if(!meta) return;
    b = document.createElement('button'); b.id = 'fpBouton'; b.type = 'button'; b.className = 'btn secondary fp-bouton';
    b.innerHTML = '<span class="gicon">qr_code_2</span> Questions flash (cartes)';
    b.title = 'Des questions prêtes sur ce chapitre, à poser à la classe avec les cartes flashcode';
    b.onclick = () => fpOuvrir(currentChapterLevel, currentChapterTitle);
    meta.insertAdjacentElement('afterend', b);
  }
}

function fpOuvrir(lvl, titre){
  const liste = fpQuestions(lvl, titre);
  if(!liste.length) return;
  const gardees = new Set(liste.map((x, i) => i));
  const o = document.createElement('div'); o.className = 'qzd-ov';
  const rendre = () => {
    o.innerHTML = `<div class="qzd-modal fp-modal" role="dialog" aria-label="Questions flash prêtes">
      <h3><span class="gicon">qr_code_2</span> Questions flash : ${qzEsc(titre)}</h3>
      <p class="hint" style="margin:4px 0 10px;">Des questions prêtes sur ce chapitre. Les élèves répondent en levant leur carte <b>A, B, C ou D</b> ; vous lisez les cartes avec votre téléphone et vous voyez les réponses en direct. Décochez les questions que vous ne voulez pas poser.</p>
      <div class="fp-liste">${liste.map((x, i) => `<label class="fp-q${gardees.has(i) ? '' : ' off'}"><input type="checkbox" data-i="${i}" ${gardees.has(i) ? 'checked' : ''}>
        <span><b>${i + 1}. ${qzEsc(x.q)}</b><span class="fp-r">${x.r.map((t, j) => `<span class="${j === x.ok ? 'ok' : ''}">${FP_LETTRES[j]}. ${qzEsc(t)}</span>`).join('')}</span></span></label>`).join('')}</div>
      <p class="hint" style="margin:8px 0 0;">${gardees.size} question${gardees.size > 1 ? 's' : ''} retenue${gardees.size > 1 ? 's' : ''}.</p>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;"><button type="button" class="btn secondary" data-x>Annuler</button>
        <button type="button" class="btn" data-go ${gardees.size ? '' : 'disabled'}><span class="gicon">play_arrow</span> Choisir la classe et lancer</button></div></div>`;
  };
  rendre(); document.body.appendChild(o);
  o.addEventListener('change', e => { const c = e.target.closest('[data-i]'); if(!c) return; const i = +c.dataset.i; if(c.checked) gardees.add(i); else gardees.delete(i); rendre(); });
  o.addEventListener('click', e => {
    if(e.target === o || e.target.closest('[data-x]')){ o.remove(); return; }
    if(e.target.closest('[data-go]') && gardees.size){
      o.remove();
      const choisies = liste.filter((x, i) => gardees.has(i));
      qzDirectLancer({ titre: 'Questions flash · ' + titre, questions: fpVersQuestionnaire(choisies), reglages: { acces: 'cartes', melanger_choix: false } });
    }
  });
}

(function fpStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .fp-bouton{margin-top:8px;}
    .fp-modal{max-height:90vh;display:flex;flex-direction:column;}
    .fp-liste{overflow:auto;display:flex;flex-direction:column;gap:6px;padding-right:4px;}
    .fp-q{display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border:1px solid #E3E7EE;border-radius:10px;cursor:pointer;}
    .fp-q.off{opacity:.5;} .fp-q input{margin-top:4px;}
    .fp-r{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:4px;font-size:.88rem;color:#5B6472;}
    .fp-r .ok{color:#1E7A4F;font-weight:700;}`;
  document.head.appendChild(st);
})();
