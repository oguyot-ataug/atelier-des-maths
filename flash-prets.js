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
   Parties du cours : le professeur choisit la leçon sur laquelle interroger (les questions sont rangées
   par leçon automatiquement) ; avec l'option IA (Mon compte › Intelligence artificielle), il génère des
   questions sur la partie choisie, gardées sur son appareil pour la fois suivante.

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
// Fractions écrites « a/b » dans les questions → LaTeX (demandé : « ne pas écrire les fractions a/b
// mais toujours en LaTeX, y compris dans les flashs »). « ?/8 » et « …/10 » (numérateur à trouver)
// aussi. Les formules déjà en $…$ ne sont pas touchées.
function fpTex(s){
  return String(s).split('$').map((p, i) => i % 2 ? p : p.replace(/(\d+|\?|…)\/(\d+)/g, (m, a, b) => '$\\dfrac{' + (a === '…' ? '\\ldots' : a) + '}{' + b + '}$')).join('$');
}
// Au format des questionnaires (QCM à une bonne réponse : compatible avec les cartes A à D).
function fpVersQuestionnaire(liste){
  return liste.map((x, i) => ({ id: 'fp' + i, type: 'qcm', enonce: fpTex(x.q), points: 1, competence: '',
    choix: x.r.map((t, j) => ({ id: 'fp' + i + 'c' + j, texte: fpTex(t), correct: j === x.ok })) }));
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

/* ---------- Parties du cours (demandé : « dire sur quelle partie du cours on souhaite interroger les
   élèves : des professeurs ne suivent pas toujours la progression des chapitres ») ----------
   Les leçons sont lues dans le cours du chapitre ouvert (titres « 1 », « 2 »… et leur texte). Chaque
   question prête est rangée dans la leçon dont le texte lui ressemble le plus (mots rares en commun) ;
   les questions générées par l'IA portent leur leçon. */
const FP_VIDES = new Set('avec dans pour plus moins sont est une des les aux par sur que qui quoi quel quelle quels quelles combien cette ceci cela ont faut fait font peut entre chaque deux trois quatre bien tout tous toute toutes leur leurs elle elles ils nous vous mais donc car comme alors aussi encore très faire être avoir'.split(' '));
const fpMots = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\$[^$]*\$/g, ' ').split(/[^a-z0-9]+/).filter(w => w.length >= 4 && !FP_VIDES.has(w) && !/^\d+$/.test(w)).map(w => w.replace(/(s|x)$/, ''));
function fpLecons(lvl, titre){
  const reg = typeof DEMO_REGISTRY !== 'undefined' && DEMO_REGISTRY[lvl + '|' + titre], c = reg && document.getElementById(reg.cours);
  if(!c) return [];
  const heads = [...c.querySelectorAll('.lesson-header')];
  return heads.map((h, i) => {
    let txt = '', n = h.nextElementSibling;
    while(n && !n.classList.contains('lesson-header')){ if(!n.classList.contains('cm-anim')) txt += ' ' + n.textContent; n = n.nextElementSibling; }
    const num = (h.querySelector('.num') || {}).textContent || String(i + 1), t = (h.querySelector('h3') || h).textContent.trim();
    return { n: i, num, titre: t, texte: txt.replace(/\s+/g, ' ').trim().slice(0, 2500) };
  });
}
function fpRanger(liste, lecons){
  if(!lecons.length) return;
  const sets = lecons.map(l => new Set(fpMots(l.titre + ' ' + l.titre + ' ' + l.texte))), df = new Map();
  sets.forEach(S => S.forEach(w => df.set(w, (df.get(w) || 0) + 1)));
  liste.forEach(x => { if(x.l != null) return; // déjà rangée (questions IA : indice ; questions prêtes : voir fpOuvrir)
    const mots = fpMots(x.q + ' ' + x.r.join(' ')); let best = -1, bs = 0;
    sets.forEach((S, k) => { const sc = mots.reduce((a, w) => a + (S.has(w) ? 1 / df.get(w) : 0), 0); if(sc > bs){ bs = sc; best = k; } });
    x.l = best >= 0 && bs >= .5 ? best : null; });
}
// Questions générées par l'IA, gardées sur cet appareil pour le professeur (réutilisables).
const fpCleIa = (lvl, titre) => 'fpIa:' + ((typeof currentUser !== 'undefined' && currentUser && currentUser.id) || 'anon') + ':' + lvl + '|' + titre;
function fpIaLire(lvl, titre){ try{ return JSON.parse(localStorage.getItem(fpCleIa(lvl, titre)) || '[]'); }catch(e){ return []; } }
function fpIaEcrire(lvl, titre, l){ try{ localStorage.setItem(fpCleIa(lvl, titre), JSON.stringify(l.slice(-200))); }catch(e){} }
const FP_NIV_TXT = { ce2: 'CE2', cm1: 'CM1', cm2: 'CM2' };
async function fpGenererIa(lvl, titre, lecon, nb){
  const niv = FP_NIV_TXT[lvl] || lvl;
  const consignes = ['ce2', 'cm1', 'cm2'].includes(lvl) ? 'Programme du cycle 3 (nouveaux programmes) : pas de tableau de conversion, pas de rapporteur, pas de produit en croix ; nombres adaptés au niveau.' : '';
  const prompt = `Tu es professeur des écoles. Écris ${nb} questions flash de mathématiques, niveau ${niv}, sur le chapitre « ${titre} »${lecon ? `, partie « ${lecon.titre} »` : ''}.
${lecon && lecon.texte ? `Voici le cours de cette partie (n'interroge que sur ce qui y est) :\n"""${lecon.texte.slice(0, 2000)}"""\n` : ''}${consignes}
Chaque question se résout de tête en moins de 30 secondes et se pose avec des cartes A, B, C, D : un QCM à 4 réponses courtes, une seule juste, les 3 autres étant des erreurs fréquentes d'élèves. Phrases courtes, vocabulaire du niveau. Écris une fraction « 3/4 ». Varie les questions (calcul, vocabulaire, raisonnement), sans en répéter.
Réponds UNIQUEMENT par un tableau JSON, sans texte autour : [{"q":"…","r":["…","…","…","…"],"ok":0}] où ok est l'indice (0 à 3) de la bonne réponse ; place la bonne réponse à des positions variées.`;
  const txt = await callClaude(prompt, 2500, { feature: 'quiz', chapitre: titre, niveau: lvl });
  const m = String(txt).match(/\[[\s\S]*\]/); if(!m) throw new Error('réponse illisible');
  return JSON.parse(m[0]).filter(x => x && typeof x.q === 'string' && Array.isArray(x.r) && x.r.length >= 2 && x.r.length <= 4 && Number.isInteger(x.ok) && x.ok >= 0 && x.ok < x.r.length)
    .map(x => ({ q: x.q.trim(), r: x.r.map(String), ok: x.ok, ia: true, l: lecon ? lecon.n : null }));
}

function fpOuvrir(lvl, titre){
  const lecons = fpLecons(lvl, titre);
  // l (questions prêtes) : numéro de la leçon dans le cours → indice ; sans l, rangement automatique.
  const base = fpQuestions(lvl, titre).map(x => { const y = Object.assign({}, x); if(y.l != null){ const k = lecons.findIndex(L => String(L.num).trim() === String(y.l)); y.l = k >= 0 ? k : null; } return y; });
  let ia = fpIaLire(lvl, titre);
  fpRanger(base, lecons);
  let filtre = 'tout';                              // 'tout' ou le numéro de la leçon
  const gardees = new Set();                         // clés des questions cochées
  const cle = (x, i) => (x.ia ? 'ia' : 'b') + i;
  const toutes = () => base.map((x, i) => ({ x, k: cle(x, i) })).concat(ia.map((x, i) => ({ x, k: cle(x, i) })));
  toutes().forEach(({ k }) => gardees.add(k));
  const visibles = () => toutes().filter(({ x }) => filtre === 'tout' || x.l === filtre);
  const iaOk = typeof callClaude === 'function' && document.body.classList.contains('ai-quiz');
  const o = document.createElement('div'); o.className = 'qzd-ov';
  let attente = false, msg = '';
  const rendre = () => {
    const vis = visibles(), nbG = vis.filter(({ k }) => gardees.has(k)).length;
    const compte = n => toutes().filter(({ x }) => n === 'tout' || x.l === n).length;
    const lec = filtre === 'tout' ? null : lecons[filtre];
    o.innerHTML = `<div class="qzd-modal fp-modal" role="dialog" aria-label="Questions flash prêtes">
      <h3><span class="gicon">qr_code_2</span> Questions flash : ${qzEsc(titre)}</h3>
      <p class="hint" style="margin:4px 0 8px;">Les élèves répondent en levant leur carte <b>A, B, C ou D</b> ; vous lisez les cartes avec votre téléphone et vous voyez les réponses en direct. Choisissez la partie du cours sur laquelle interroger, décochez les questions que vous ne voulez pas.</p>
      ${lecons.length ? `<div class="fp-parties"><b>Partie du cours :</b> <button type="button" class="fp-p${filtre === 'tout' ? ' on' : ''}" data-f="tout">Tout le chapitre <small>${compte('tout')}</small></button>${lecons.map(l => `<button type="button" class="fp-p${filtre === l.n ? ' on' : ''}" data-f="${l.n}" title="${qzEsc(l.titre)}">${qzEsc(l.num)}. ${qzEsc(l.titre)} <small>${compte(l.n)}</small></button>`).join('')}</div>` : ''}
      ${iaOk ? `<div class="fp-ia"><span class="gicon">auto_awesome</span> <span>Générer avec l'IA ${lec ? `sur « ${qzEsc(lec.titre)} »` : 'sur tout le chapitre'} :</span>
        ${[5, 10].map(n => `<button type="button" class="btn secondary qz-mini" data-ia="${n}" ${attente ? 'disabled' : ''}>${n} questions</button>`).join('')}${attente ? '<span class="hint" style="margin:0;">Génération en cours…</span>' : ''}${msg ? `<span class="hint" style="margin:0;">${msg}</span>` : ''}</div>` : ''}
      <div class="fp-liste">${vis.length ? vis.map(({ x, k }) => `<label class="fp-q${gardees.has(k) ? '' : ' off'}"><input type="checkbox" data-k="${k}" ${gardees.has(k) ? 'checked' : ''}>
        <span><b>${qzMath(fpTex(x.q))}</b>${x.ia ? ' <span class="fp-tag">IA</span>' : ''}${filtre === 'tout' && x.l != null && lecons[x.l] ? ` <span class="fp-tag fp-tag-l">${qzEsc(lecons[x.l].num)}. ${qzEsc(lecons[x.l].titre)}</span>` : ''}
          <span class="fp-r">${x.r.map((t, j) => `<span class="${j === x.ok ? 'ok' : ''}"><span class="fp-l">${FP_LETTRES[j]}</span> ${qzMath(fpTex(t))}</span>`).join('')}</span></span>
        ${x.ia ? `<button type="button" class="fp-suppr" data-suppr="${k}" title="Supprimer cette question"><span class="gicon">delete</span></button>` : ''}</label>`).join('')
        : `<p class="hint">Pas encore de question prête sur cette partie.${iaOk ? ' Générez-en avec l\'IA ci-dessus.' : ' Avec l\'option IA (Mon compte › Intelligence artificielle), vous pourriez en générer.'}</p>`}</div>
      <p class="hint" style="margin:8px 0 0;">${nbG} question${nbG > 1 ? 's' : ''} retenue${nbG > 1 ? 's' : ''}.</p>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;"><button type="button" class="btn secondary" data-x>Annuler</button>
        <button type="button" class="btn" data-go ${nbG ? '' : 'disabled'}><span class="gicon">play_arrow</span> Choisir la classe et lancer</button></div></div>`;
  };
  rendre(); document.body.appendChild(o);
  o.addEventListener('change', e => { const c = e.target.closest('[data-k]'); if(!c) return; if(c.checked) gardees.add(c.dataset.k); else gardees.delete(c.dataset.k); rendre(); });
  o.addEventListener('click', async e => {
    if(e.target === o || e.target.closest('[data-x]')){ o.remove(); return; }
    const f = e.target.closest('[data-f]'); if(f){ filtre = f.dataset.f === 'tout' ? 'tout' : +f.dataset.f; msg = ''; rendre(); return; }
    const sp = e.target.closest('[data-suppr]'); if(sp){ e.preventDefault(); const i = +sp.dataset.suppr.slice(2); ia.splice(i, 1); fpIaEcrire(lvl, titre, ia); gardees.clear(); toutes().forEach(({ k }) => gardees.add(k)); rendre(); return; }
    const g = e.target.closest('[data-ia]');
    if(g && !attente){
      attente = true; msg = ''; rendre();
      try{
        const nouv = await fpGenererIa(lvl, titre, filtre === 'tout' ? null : lecons[filtre], +g.dataset.ia);
        const avant = ia.length; ia = ia.concat(nouv); fpIaEcrire(lvl, titre, ia);
        nouv.forEach((x, j) => gardees.add('ia' + (avant + j)));
        msg = `${nouv.length} question${nouv.length > 1 ? 's' : ''} ajoutée${nouv.length > 1 ? 's' : ''} (gardée${nouv.length > 1 ? 's' : ''} pour la prochaine fois) : relisez-les avant de lancer.`;
      }catch(err){ msg = 'La génération n\'a pas abouti : ' + qzEsc(err.message === 'no-session' ? 'connectez-vous' : err.message) + '.'; }
      attente = false; rendre(); return;
    }
    if(e.target.closest('[data-go]')){
      const choisies = visibles().filter(({ k }) => gardees.has(k)).map(({ x }) => x);
      if(!choisies.length) return;
      o.remove();
      const lec = filtre === 'tout' ? null : lecons[filtre];
      qzDirectLancer({ titre: 'Questions flash · ' + titre + (lec ? ' · ' + lec.titre : ''), questions: fpVersQuestionnaire(choisies), reglages: { acces: 'cartes', melanger_choix: false } });
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
    .fp-r .ok{color:#1E7A4F;font-weight:700;}
    .fp-l{display:inline-block;min-width:18px;height:18px;line-height:18px;text-align:center;border-radius:4px;background:#EEF1F5;font:700 .72rem 'Space Grotesk',sans-serif;color:#1F3A5C;}
    .fp-r .ok .fp-l{background:#1E7A4F;color:#fff;}
    .fp-parties{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 8px;} .fp-p{border:1.5px solid #DCE2EA;background:#fff;border-radius:999px;padding:3px 10px;cursor:pointer;font:600 .82rem Inter,sans-serif;color:#1F3A5C;max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .fp-p.on{border-color:#1F7A4D;background:#EAF7EF;color:#1F7A4D;} .fp-p small{color:#8A93A3;font-weight:700;margin-left:2px;}
    .fp-ia{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 8px;padding:6px 10px;background:#F4F0FC;border-radius:10px;color:#4B2C82;font-weight:600;font-size:.88rem;} .fp-ia > .gicon{color:#7A4FC0;}
    .fp-tag{display:inline-block;background:#F4F0FC;color:#5B3A99;border-radius:6px;padding:0 6px;font:700 .7rem Inter,sans-serif;vertical-align:middle;} .fp-tag-l{background:#EEF4FB;color:#3A6EA5;font-weight:600;}
    .fp-q{position:relative;} .fp-suppr{margin-left:auto;border:0;background:none;color:#9E1F5E;cursor:pointer;align-self:center;} .fp-suppr .gicon{font-size:18px;}`;
  document.head.appendChild(st);
})();
