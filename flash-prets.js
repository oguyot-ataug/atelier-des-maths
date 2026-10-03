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
/* ---------- Dessins dans les questions (demandé : « est-ce que les questions IA peuvent se servir aussi
   des graphismes du site, genre lire l'heure ? ») ----------
   Une question peut porter fig : { type, … } ; le site dessine la figure avec ses propres outils
   (chapitres/cm1/_commun.js) : l'IA ne dessine rien, elle choisit le dessin et ses paramètres. */
const FP_FIGS = {
  horloge: 'une horloge à aiguilles : {"type":"horloge","h":3,"m":40} (h de 1 à 12, m de 0 à 55, de 5 en 5)',
  disque: 'un disque partagé en n parts égales dont k coloriées : {"type":"disque","n":8,"k":3}',
  bande: 'une bande partagée en n parts égales dont k coloriées : {"type":"bande","n":5,"k":2} (k peut dépasser n)',
  graduation: 'une demi-droite graduée de 0 à max, chaque unité partagée en n, un point A placé à la valeur v : {"type":"graduation","max":3,"n":4,"v":1.75,"lettre":"A"}',
  axe: 'un axe gradué de min à max, graduations tous les pas, nombres écrits tous les etiq, un point A à la valeur v : {"type":"axe","min":0,"max":1000,"pas":50,"etiq":200,"v":650,"lettre":"A"}',
  regle: 'un segment [AB] posé sur une règle graduée en cm et mm, de longueur mm millimètres : {"type":"regle","mm":47}',
  quadrillage: 'une figure coloriée sur un quadrillage de l × h carreaux, cases = liste des carreaux [colonne, ligne] coloriés : {"type":"quadrillage","l":8,"h":5,"cases":[[1,1],[2,1],[1,2]]}',
  balance: 'une balance en équilibre, un objet à gauche, des masses marquées à droite : {"type":"balance","objet":"🍎","masses":["500 g","200 g","50 g"]}'
};
const fpEnt = (v, a, b) => Number.isFinite(+v) ? Math.max(a, Math.min(b, Math.round(+v))) : null;
function fpHorloge(h, m){
  const cx = 60, cy = 60, R = n => n.toFixed(1); let s = `<svg viewBox="0 0 120 120" style="width:150px;"><circle cx="60" cy="60" r="56" fill="#FFFDF7" stroke="#1F3A5C" stroke-width="3"/>`;
  for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, g = i % 5 === 0, r1 = g ? 47 : 51; s += `<line x1="${R(cx + r1 * Math.sin(a))}" y1="${R(cy - r1 * Math.cos(a))}" x2="${R(cx + 54 * Math.sin(a))}" y2="${R(cy - 54 * Math.cos(a))}" stroke="#1F3A5C" stroke-width="${g ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; s += `<text x="${R(cx + 38 * Math.sin(a))}" y="${R(cy - 38 * Math.cos(a) + 4)}" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${i}</text>`; }
  const am = m * Math.PI / 30, ah = ((h % 12) + m / 60) * Math.PI / 6;
  s += `<line x1="60" y1="60" x2="${R(cx + 26 * Math.sin(ah))}" y2="${R(cy - 26 * Math.cos(ah))}" stroke="#E35D3A" stroke-width="5" stroke-linecap="round"/>`;
  return s + `<line x1="60" y1="60" x2="${R(cx + 44 * Math.sin(am))}" y2="${R(cy - 44 * Math.cos(am))}" stroke="#2EA8C9" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="3.5" fill="#1F3A5C"/></svg>`;
}
// Figure validée (paramètres de l'IA bornés) → { svg, w } ou null.
function fpFigSvg(f){
  if(!f || typeof f !== 'object' || typeof cm1Disque !== 'function') return null;
  try{
    switch(f.type){
      case 'horloge': { const h = fpEnt(f.h, 0, 23), m = fpEnt(f.m, 0, 59); return h == null || m == null ? null : { svg: fpHorloge(h, m), w: 160 }; }
      case 'disque': { const n = fpEnt(f.n, 1, 12), k = fpEnt(f.k, 0, 12); return n && k != null && k <= n ? { svg: cm1Disque(n, k), w: 130 } : null; }
      case 'bande': { const n = fpEnt(f.n, 1, 12), k = fpEnt(f.k, 0, 36); return n && k != null ? { svg: cm1Bande(n, k), w: 260 * Math.max(1, Math.ceil(k / n)) } : null; }
      case 'graduation': { const max = fpEnt(f.max, 1, 6), n = fpEnt(f.n, 1, 12), v = +f.v; if(!max || !n || !(v >= 0 && v <= max)) return null;
        return { svg: cm1Graduation(max, n, [[v, String(f.lettre || 'A').slice(0, 2)]]), w: 500 }; }
      case 'axe': { const min = +f.min, max = +f.max, pas = +f.pas, etiq = +f.etiq, v = +f.v;
        if(![min, max, pas, etiq, v].every(Number.isFinite) || max <= min || pas <= 0 || (max - min) / pas > 60 || etiq < pas || v < min || v > max) return null;
        return { svg: cm1Axe(min, max, pas, etiq, [[v, String(f.lettre || 'A').slice(0, 2)]]), w: 520 }; }
      case 'regle': { const mm = fpEnt(f.mm, 1, 150); return mm ? { svg: cm1RegleGraduee(mm, 'AB'), w: 520 } : null; }
      case 'quadrillage': { const l = fpEnt(f.l, 1, 16), h = fpEnt(f.h, 1, 12); if(!l || !h || !Array.isArray(f.cases)) return null;
        const cases = f.cases.filter(c => Array.isArray(c) && c.length === 2).map(([x, y]) => [fpEnt(x, 0, l - 1), fpEnt(y, 0, h - 1)]).filter(([x, y]) => x != null && y != null);
        return { svg: cm1Quad(l, h, cases, { k: 22, contour: true }), w: l * 22 + 2 }; }
      case 'balance': { const ms = (Array.isArray(f.masses) ? f.masses : []).map(String).filter(m => /^\d+([,.]\d+)?\s?k?g$/.test(m.trim())).slice(0, 5);
        return ms.length ? { svg: cm1Balance(String(f.objet || '?').slice(0, 4), ms), w: 280 } : null; }
    }
  }catch(e){}
  return null;
}
// La figure en image autonome (data:image/svg+xml) : c'est ce que les questionnaires affichent (q.image).
function fpFigUri(f){
  const r = fpFigSvg(f); if(!r) return '';
  const svg = r.svg.replace(/^<svg([^>]*?)\sstyle="[^"]*"/, '<svg$1').replace(/^<svg/, `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(r.w)}"`)
    .replace(/font-family="Space Grotesk"/g, 'font-family="Space Grotesk, Arial, sans-serif"').replace(/class="[^"]*"/g, '');
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
const fpFigHtml = (f, cls) => { const u = fpFigUri(f); return u ? `<img class="${cls || 'fp-fig'}" src="${u}" alt="">` : ''; };
// Sur une horloge, la bonne réponse doit être l'heure dessinée (on écarte les questions où l'IA s'est trompée).
function fpFigCoherente(x){
  if(!x.fig || x.fig.type !== 'horloge') return true;
  const t = String(x.r[x.ok]).replace(/\s/g, ''), mm = t.match(/(\d{1,2})h(\d{1,2})?/);
  if(!mm) return true; // réponse en mots (« midi et quart »…) : le professeur vérifie avec « Essayer »
  return (+mm[1]) % 12 === (+x.fig.h) % 12 && (+(mm[2] || 0)) === +x.fig.m;
}

// Au format des questionnaires (QCM à une bonne réponse : compatible avec les cartes A à D).
function fpVersQuestionnaire(liste){
  return liste.map((x, i) => ({ id: 'fp' + i, type: 'qcm', enonce: fpTex(x.q), points: 1, competence: '', ...(x.fig && fpFigUri(x.fig) ? { image: fpFigUri(x.fig) } : {}),
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
Tu peux faire lire un dessin (au moins le tiers des questions quand le chapitre s'y prête : lire l'heure, une fraction coloriée, un point sur une droite graduée, une longueur sur une règle, une aire en carreaux, une masse sur une balance…). Ajoute alors à la question une clé "fig" ; le site dessine lui-même la figure. Dessins possibles :
${Object.values(FP_FIGS).map(t => '- ' + t).join('\n')}
La question parle du dessin (« Quelle heure indique l'horloge ? », « Quelle fraction du disque est coloriée ? », « Quel nombre repère le point A ? »…) et la bonne réponse doit correspondre exactement au dessin. Écris les heures « 3 h 40 ».
Réponds UNIQUEMENT par un tableau JSON, sans texte autour : [{"q":"…","r":["…","…","…","…"],"ok":0}] (avec "fig":{…} si la question a un dessin) où ok est l'indice (0 à 3) de la bonne réponse ; place la bonne réponse à des positions variées.`;
  const txt = await callClaude(prompt, 2500, { feature: 'quiz', chapitre: titre, niveau: lvl });
  const m = String(txt).match(/\[[\s\S]*\]/); if(!m) throw new Error('réponse illisible');
  return JSON.parse(m[0]).filter(x => x && typeof x.q === 'string' && Array.isArray(x.r) && x.r.length >= 2 && x.r.length <= 4 && Number.isInteger(x.ok) && x.ok >= 0 && x.ok < x.r.length)
    .map(x => ({ q: x.q.trim(), r: x.r.map(String), ok: x.ok, ia: true, l: lecon ? lecon.n : null, ...(x.fig && fpFigSvg(x.fig) ? { fig: x.fig } : {}) }))
    .filter(x => (x.fig || !/(horloge|ci-dessous|le dessin|la figure|cette balance|ce quadrillage)/i.test(x.q)) && fpFigCoherente(x));
}

// « Essayer » : le professeur passe les questions retenues lui-même, une par une (rien n'est enregistré).
function fpEssayer(liste, titre){
  let i = 0, choisi = null, bons = 0;
  const o = document.createElement('div'); o.className = 'qzd-ov fp-essai-ov';
  const rendre = () => {
    const x = liste[i], fini = i >= liste.length;
    o.innerHTML = `<div class="qzd-modal fp-essai" role="dialog" aria-label="Essayer les questions flash">
      <div class="fp-essai-tete"><b><span class="gicon">quiz</span> Essai · ${qzEsc(titre)}</b><span>${fini ? 'Terminé' : `Question ${i + 1} / ${liste.length}`}</span><button type="button" class="modal-close" data-x><span class="gicon">close</span></button></div>
      ${fini ? `<div class="fp-essai-fin"><b>${bons} / ${liste.length}</b> bonne${bons > 1 ? 's' : ''} réponse${bons > 1 ? 's' : ''}.<p class="hint">Rien n'est enregistré : c'était pour essayer les questions avant la classe.</p><button type="button" class="btn" data-x>Fermer</button></div>`
      : `<div class="fp-essai-q">${qzMath(fpTex(x.q))}${fpFigHtml(x.fig, 'fp-essai-fig')}</div>
      <div class="fp-essai-r">${x.r.map((t, j) => `<button type="button" class="fp-essai-c${choisi == null ? '' : j === x.ok ? ' ok' : j === choisi ? ' ko' : ' off'}" data-c="${j}" ${choisi == null ? '' : 'disabled'}><span class="fp-l">${FP_LETTRES[j]}</span> ${qzMath(fpTex(t))}</button>`).join('')}</div>
      <div class="fp-actions"><span class="hint" style="margin:0;">${choisi == null ? 'Choisissez une réponse.' : choisi === x.ok ? '<b style="color:#1E7A4F;">Juste !</b>' : `<b style="color:#9E1F5E;">Non :</b> la bonne réponse est ${FP_LETTRES[x.ok]}.`}</span><span style="flex:1"></span>
        <button type="button" class="btn" data-suiv ${choisi == null ? 'disabled' : ''}>${i + 1 < liste.length ? 'Question suivante' : 'Voir le résultat'} <span class="gicon">arrow_forward</span></button></div>`}</div>`;
  };
  rendre(); document.body.appendChild(o);
  o.addEventListener('click', e => {
    if(e.target === o || e.target.closest('[data-x]')){ o.remove(); return; }
    const c = e.target.closest('[data-c]'); if(c && choisi == null){ choisi = +c.dataset.c; if(choisi === liste[i].ok) bons++; rendre(); return; }
    if(e.target.closest('[data-suiv]')){ i++; choisi = null; rendre(); }
  });
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
        <span><b>${qzMath(fpTex(x.q))}</b>${fpFigHtml(x.fig)}${x.ia ? ' <span class="fp-tag">IA</span>' : ''}${filtre === 'tout' && x.l != null && lecons[x.l] ? ` <span class="fp-tag fp-tag-l">${qzEsc(lecons[x.l].num)}. ${qzEsc(lecons[x.l].titre)}</span>` : ''}
          <span class="fp-r">${x.r.map((t, j) => `<span class="${j === x.ok ? 'ok' : ''}"><span class="fp-l">${FP_LETTRES[j]}</span> ${qzMath(fpTex(t))}</span>`).join('')}</span></span>
        ${x.ia ? `<button type="button" class="fp-suppr" data-suppr="${k}" title="Supprimer cette question"><span class="gicon">delete</span></button>` : ''}</label>`).join('')
        : `<p class="hint">Pas encore de question prête sur cette partie.${iaOk ? ' Générez-en avec l\'IA ci-dessus.' : ' Avec l\'option IA (Mon compte › Intelligence artificielle), vous pourriez en générer.'}</p>`}</div>
      <p class="hint" style="margin:8px 0 0;">${nbG} question${nbG > 1 ? 's' : ''} retenue${nbG > 1 ? 's' : ''}.${!iaOk && msg ? ' <b style="color:#1F7A4D;">' + msg + '</b>' : ''}</p>
      <div class="fp-actions"><button type="button" class="btn secondary" data-x>Annuler</button><span style="flex:1"></span>
        <button type="button" class="btn secondary fp-btn-essai" data-essai ${nbG ? '' : 'disabled'} title="Passer les questions retenues vous-même, une par une, avant la classe"><span class="gicon">quiz</span> Essayer</button>
        <button type="button" class="btn secondary fp-btn-banque" data-banque ${nbG ? '' : 'disabled'} title="Les questions retenues deviennent un questionnaire de votre banque (sur tous vos appareils), réutilisable en devoir, en interrogation ou en séance"><span class="gicon">save</span> Enregistrer dans ma banque</button>
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
    if(e.target.closest('[data-essai]')){ const l = visibles().filter(({ k }) => gardees.has(k)).map(({ x }) => x); if(l.length) fpEssayer(l, titre); return; }
    const bq = e.target.closest('[data-banque]');
    if(bq){
      const l = visibles().filter(({ k }) => gardees.has(k)).map(({ x }) => x); if(!l.length) return;
      if(typeof sb === 'undefined' || !sb || typeof currentUser === 'undefined' || !currentUser){ await niceAlert('Connectez-vous pour enregistrer dans votre banque.'); return; }
      const lec = filtre === 'tout' ? null : lecons[filtre];
      const t = await nicePrompt('Nom du questionnaire dans votre banque :', 'Questions flash · ' + titre + (lec ? ' · ' + lec.titre : ''));
      if(!t) return;
      bq.disabled = true;
      const { error } = await sb.from('questionnaires').insert({ teacher_id: currentUser.id, titre: t, questions: fpVersQuestionnaire(l), reglages: { acces: 'cartes', melanger_choix: false } });
      bq.disabled = false;
      if(error){ await niceAlert('Enregistrement impossible : ' + error.message); return; }
      msg = `« ${qzEsc(t)} » est enregistré dans votre banque (Questionnaires) : ${l.length} question${l.length > 1 ? 's' : ''}.`; rendre(); return;
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
    .fp-q{position:relative;}
    .fp-modal h3{color:#5B3A99;} .fp-modal h3 > .gicon{color:#7A4FC0;}
    .fp-p:nth-of-type(6n+1){border-color:#B9CFE8;} .fp-p:nth-of-type(6n+2){border-color:#9ED3B4;} .fp-p:nth-of-type(6n+3){border-color:#F2CD86;} .fp-p:nth-of-type(6n+4){border-color:#F3B7A6;} .fp-p:nth-of-type(6n+5){border-color:#C9B5EE;} .fp-p:nth-of-type(6n){border-color:#8FD0D9;}
    .fp-p.on{border-color:#1F7A4D !important;}
    .fp-q{background:#FBFCFE;} .fp-q:nth-child(odd){background:#F7F9FD;} .fp-q.off{background:#fff;}
    .fp-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px;}
    .btn.secondary.fp-btn-essai{background:#FFF6E5;border-color:#F2CD86;color:#8A5A00;} .btn.secondary.fp-btn-banque{background:#EAF7EF;border-color:#9ED3B4;color:#1F7A4D;}
    .fp-essai{max-width:720px;width:94vw;} .fp-essai-tete{display:flex;align-items:center;gap:10px;color:#5B3A99;} .fp-essai-tete > span{margin-left:auto;font-weight:700;color:#5B6472;}
    .fp-essai-q{font:700 1.35rem 'Space Grotesk',sans-serif;color:#1F3A5C;margin:16px 0 12px;}
    .fp-essai-fig{display:block;margin:10px auto 0;max-width:100%;max-height:230px;}
    .fp-fig{display:block;margin:6px 0 2px;max-width:min(100%,320px);max-height:110px;}
    .fp-essai-r{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .fp-essai-c{display:flex;align-items:center;gap:8px;padding:12px 14px;border-radius:12px;border:2px solid #DCE2EA;background:#fff;cursor:pointer;font:600 1.05rem Inter,sans-serif;color:#1F3A5C;text-align:left;}
    .fp-essai-c:nth-child(1){border-color:#E35D3A;} .fp-essai-c:nth-child(2){border-color:#2EA8C9;} .fp-essai-c:nth-child(3){border-color:#2E9C6A;} .fp-essai-c:nth-child(4){border-color:#E9A21C;}
    .fp-essai-c.ok{background:#EAF7EF;border-color:#1E7A4F !important;} .fp-essai-c.ko{background:#FBE7EE;border-color:#9E1F5E !important;} .fp-essai-c.off{opacity:.5;}
    .fp-essai-fin{text-align:center;padding:20px 0;font-size:1.2rem;}
    @media (max-width:560px){ .fp-essai-r{grid-template-columns:1fr;} } .fp-suppr{margin-left:auto;border:0;background:none;color:#9E1F5E;cursor:pointer;align-self:center;} .fp-suppr .gicon{font-size:18px;}`;
  document.head.appendChild(st);
})();
