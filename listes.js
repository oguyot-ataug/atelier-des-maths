/* =====================================================================
   listes.js -- Listes à apprendre (L'Atelier du Prof) : verbes irréguliers anglais.

   Demandé : « Verbes irréguliers ? Conjugaison ? Grammaire sous forme de jeux / exerciseurs », puis « Il faut
   toute la liste. Après le professeur pourrait générer des questions en cochant ceux qu'il a traités en classe ».
   Dans l'éditeur d'une interrogation (bouton « Verbes irréguliers ») : le professeur coche les verbes vus en classe
   (sa sélection est retenue dans son compte), choisit les formes de questions, et les questions s'ajoutent à
   l'interrogation -- qu'il donne ensuite comme toute interrogation (devoir, entraînement, séance en direct,
   cartes A/B/C/D pour les QCM, correction et notes).
   Formes : tableau à compléter (prétérit et participe passé, texte à trous), traduction (base verbale à partir
   du français, réponse courte), QCM sur le prétérit ou le participe passé.
   Variantes acceptées séparées par « / » (learnt / learned, got / gotten).
   ===================================================================== */

// [base, prétérit, participe passé, traduction, courant (1 = liste de base du collège)]
const VERBES_IRREGULIERS = [
  ['arise', 'arose', 'arisen', 'survenir, se lever', 0],
  ['awake', 'awoke', 'awoken', '(se) réveiller', 0],
  ['babysit', 'babysat', 'babysat', 'garder des enfants', 0],
  ['be', 'was / were', 'been', 'être', 1],
  ['bear', 'bore', 'borne', 'porter, supporter', 0],
  ['beat', 'beat', 'beaten', 'battre', 1],
  ['become', 'became', 'become', 'devenir', 1],
  ['begin', 'began', 'begun', 'commencer', 1],
  ['bend', 'bent', 'bent', 'plier, se pencher', 0],
  ['bet', 'bet', 'bet', 'parier', 0],
  ['bind', 'bound', 'bound', 'lier, relier', 0],
  ['bite', 'bit', 'bitten', 'mordre', 1],
  ['bleed', 'bled', 'bled', 'saigner', 0],
  ['blow', 'blew', 'blown', 'souffler', 1],
  ['break', 'broke', 'broken', 'casser', 1],
  ['breed', 'bred', 'bred', 'élever (des animaux)', 0],
  ['bring', 'brought', 'brought', 'apporter', 1],
  ['broadcast', 'broadcast', 'broadcast', 'diffuser', 0],
  ['build', 'built', 'built', 'construire', 1],
  ['burn', 'burnt / burned', 'burnt / burned', 'brûler', 1],
  ['burst', 'burst', 'burst', 'éclater', 0],
  ['buy', 'bought', 'bought', 'acheter', 1],
  ['cast', 'cast', 'cast', 'jeter, lancer', 0],
  ['catch', 'caught', 'caught', 'attraper', 1],
  ['choose', 'chose', 'chosen', 'choisir', 1],
  ['cling', 'clung', 'clung', "s'accrocher", 0],
  ['come', 'came', 'come', 'venir', 1],
  ['cost', 'cost', 'cost', 'coûter', 1],
  ['creep', 'crept', 'crept', 'ramper', 0],
  ['cut', 'cut', 'cut', 'couper', 1],
  ['deal', 'dealt', 'dealt', 'distribuer, traiter', 0],
  ['dig', 'dug', 'dug', 'creuser', 0],
  ['dive', 'dived / dove', 'dived', 'plonger', 0],
  ['do', 'did', 'done', 'faire', 1],
  ['draw', 'drew', 'drawn', 'dessiner, tirer', 1],
  ['dream', 'dreamt / dreamed', 'dreamt / dreamed', 'rêver', 1],
  ['drink', 'drank', 'drunk', 'boire', 1],
  ['drive', 'drove', 'driven', 'conduire', 1],
  ['eat', 'ate', 'eaten', 'manger', 1],
  ['fall', 'fell', 'fallen', 'tomber', 1],
  ['feed', 'fed', 'fed', 'nourrir', 1],
  ['feel', 'felt', 'felt', '(se) sentir, ressentir', 1],
  ['fight', 'fought', 'fought', 'se battre', 1],
  ['find', 'found', 'found', 'trouver', 1],
  ['flee', 'fled', 'fled', "s'enfuir", 0],
  ['fling', 'flung', 'flung', 'lancer violemment', 0],
  ['fly', 'flew', 'flown', 'voler (dans les airs)', 1],
  ['forbid', 'forbade', 'forbidden', 'interdire', 0],
  ['forecast', 'forecast', 'forecast', 'prévoir', 0],
  ['foresee', 'foresaw', 'foreseen', 'prévoir, anticiper', 0],
  ['forget', 'forgot', 'forgotten', 'oublier', 1],
  ['forgive', 'forgave', 'forgiven', 'pardonner', 1],
  ['freeze', 'froze', 'frozen', 'geler', 1],
  ['get', 'got', 'got / gotten', 'obtenir, devenir', 1],
  ['give', 'gave', 'given', 'donner', 1],
  ['go', 'went', 'gone', 'aller', 1],
  ['grind', 'ground', 'ground', 'moudre', 0],
  ['grow', 'grew', 'grown', 'grandir, faire pousser', 1],
  ['hang', 'hung', 'hung', 'pendre, accrocher', 1],
  ['have', 'had', 'had', 'avoir', 1],
  ['hear', 'heard', 'heard', 'entendre', 1],
  ['hide', 'hid', 'hidden', 'cacher', 1],
  ['hit', 'hit', 'hit', 'frapper', 1],
  ['hold', 'held', 'held', 'tenir', 1],
  ['hurt', 'hurt', 'hurt', 'blesser, faire mal', 1],
  ['keep', 'kept', 'kept', 'garder', 1],
  ['kneel', 'knelt / kneeled', 'knelt / kneeled', "s'agenouiller", 0],
  ['know', 'knew', 'known', 'savoir, connaître', 1],
  ['lay', 'laid', 'laid', 'poser, mettre (la table)', 0],
  ['lead', 'led', 'led', 'mener, conduire', 1],
  ['lean', 'leant / leaned', 'leant / leaned', "s'appuyer, se pencher", 0],
  ['leap', 'leapt / leaped', 'leapt / leaped', 'sauter, bondir', 0],
  ['learn', 'learnt / learned', 'learnt / learned', 'apprendre', 1],
  ['leave', 'left', 'left', 'partir, quitter, laisser', 1],
  ['lend', 'lent', 'lent', 'prêter', 1],
  ['let', 'let', 'let', 'laisser, permettre', 1],
  ['lie', 'lay', 'lain', 'être allongé', 0],
  ['light', 'lit / lighted', 'lit / lighted', 'allumer', 0],
  ['lose', 'lost', 'lost', 'perdre', 1],
  ['make', 'made', 'made', 'faire, fabriquer', 1],
  ['mean', 'meant', 'meant', 'signifier, vouloir dire', 1],
  ['meet', 'met', 'met', 'rencontrer', 1],
  ['mislead', 'misled', 'misled', 'induire en erreur', 0],
  ['mistake', 'mistook', 'mistaken', 'confondre, se tromper', 0],
  ['misunderstand', 'misunderstood', 'misunderstood', 'mal comprendre', 0],
  ['overcome', 'overcame', 'overcome', 'surmonter', 0],
  ['overhear', 'overheard', 'overheard', 'entendre par hasard', 0],
  ['overtake', 'overtook', 'overtaken', 'dépasser, doubler', 0],
  ['pay', 'paid', 'paid', 'payer', 1],
  ['prove', 'proved', 'proven / proved', 'prouver', 0],
  ['put', 'put', 'put', 'mettre, poser', 1],
  ['quit', 'quit', 'quit', 'quitter, arrêter', 0],
  ['read', 'read', 'read', 'lire', 1],
  ['rid', 'rid', 'rid', 'débarrasser', 0],
  ['ride', 'rode', 'ridden', 'aller (à cheval, à vélo)', 1],
  ['ring', 'rang', 'rung', 'sonner', 1],
  ['rise', 'rose', 'risen', 'se lever, monter', 1],
  ['run', 'ran', 'run', 'courir', 1],
  ['saw', 'sawed', 'sawn / sawed', 'scier', 0],
  ['say', 'said', 'said', 'dire', 1],
  ['see', 'saw', 'seen', 'voir', 1],
  ['seek', 'sought', 'sought', 'chercher', 0],
  ['sell', 'sold', 'sold', 'vendre', 1],
  ['send', 'sent', 'sent', 'envoyer', 1],
  ['set', 'set', 'set', 'fixer, placer', 1],
  ['sew', 'sewed', 'sewn / sewed', 'coudre', 0],
  ['shake', 'shook', 'shaken', 'secouer', 1],
  ['shed', 'shed', 'shed', 'verser (des larmes), perdre', 0],
  ['shine', 'shone', 'shone', 'briller', 1],
  ['shoot', 'shot', 'shot', 'tirer (avec une arme)', 1],
  ['show', 'showed', 'shown / showed', 'montrer', 1],
  ['shrink', 'shrank', 'shrunk', 'rétrécir', 0],
  ['shut', 'shut', 'shut', 'fermer', 1],
  ['sing', 'sang', 'sung', 'chanter', 1],
  ['sink', 'sank', 'sunk', 'couler, sombrer', 0],
  ['sit', 'sat', 'sat', 'être assis', 1],
  ['sleep', 'slept', 'slept', 'dormir', 1],
  ['slide', 'slid', 'slid', 'glisser', 0],
  ['smell', 'smelt / smelled', 'smelt / smelled', 'sentir (une odeur)', 1],
  ['sow', 'sowed', 'sown / sowed', 'semer', 0],
  ['speak', 'spoke', 'spoken', 'parler', 1],
  ['speed', 'sped / speeded', 'sped / speeded', 'aller vite', 0],
  ['spell', 'spelt / spelled', 'spelt / spelled', 'épeler', 1],
  ['spend', 'spent', 'spent', 'dépenser, passer (du temps)', 1],
  ['spill', 'spilt / spilled', 'spilt / spilled', 'renverser (un liquide)', 0],
  ['spin', 'spun', 'spun', 'tourner, filer', 0],
  ['spit', 'spat / spit', 'spat / spit', 'cracher', 0],
  ['split', 'split', 'split', 'fendre, diviser', 0],
  ['spoil', 'spoilt / spoiled', 'spoilt / spoiled', 'gâcher, gâter', 0],
  ['spread', 'spread', 'spread', 'étendre, répandre', 0],
  ['spring', 'sprang', 'sprung', 'bondir, jaillir', 0],
  ['stand', 'stood', 'stood', 'être debout', 1],
  ['steal', 'stole', 'stolen', 'voler (dérober)', 1],
  ['stick', 'stuck', 'stuck', 'coller', 1],
  ['sting', 'stung', 'stung', 'piquer', 0],
  ['stink', 'stank', 'stunk', 'puer', 0],
  ['strike', 'struck', 'struck', 'frapper', 0],
  ['strive', 'strove', 'striven', "s'efforcer", 0],
  ['swear', 'swore', 'sworn', 'jurer', 0],
  ['sweep', 'swept', 'swept', 'balayer', 0],
  ['swell', 'swelled', 'swollen / swelled', 'gonfler', 0],
  ['swim', 'swam', 'swum', 'nager', 1],
  ['swing', 'swung', 'swung', 'se balancer', 0],
  ['take', 'took', 'taken', 'prendre', 1],
  ['teach', 'taught', 'taught', 'enseigner', 1],
  ['tear', 'tore', 'torn', 'déchirer', 1],
  ['tell', 'told', 'told', 'dire, raconter', 1],
  ['think', 'thought', 'thought', 'penser', 1],
  ['throw', 'threw', 'thrown', 'lancer, jeter', 1],
  ['thrust', 'thrust', 'thrust', 'pousser violemment', 0],
  ['tread', 'trod', 'trodden', 'marcher sur, fouler', 0],
  ['understand', 'understood', 'understood', 'comprendre', 1],
  ['undertake', 'undertook', 'undertaken', 'entreprendre', 0],
  ['undo', 'undid', 'undone', 'défaire', 0],
  ['upset', 'upset', 'upset', 'contrarier', 0],
  ['wake', 'woke', 'woken', '(se) réveiller', 1],
  ['wear', 'wore', 'worn', 'porter (un vêtement)', 1],
  ['weave', 'wove', 'woven', 'tisser', 0],
  ['weep', 'wept', 'wept', 'pleurer', 0],
  ['win', 'won', 'won', 'gagner', 1],
  ['wind', 'wound', 'wound', 'enrouler, remonter', 0],
  ['withdraw', 'withdrew', 'withdrawn', 'retirer', 0],
  ['write', 'wrote', 'written', 'écrire', 1],
];
const lvForms = s => String(s).split('/').map(x => x.trim()).filter(Boolean);
const lvEsc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function lvMelanger(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// Sélection « vus en classe » : retenue dans le compte du professeur (métadonnées de connexion, sans table).
function lvVus(){ const m = typeof currentUser !== 'undefined' && currentUser && currentUser.user_metadata; return new Set((m && m.verbes_vus) || []); }
async function lvMemoriser(set){
  try{
    const { data } = await sb.auth.updateUser({ data: { verbes_vus: [...set] } });
    if(data && data.user) currentUser = data.user;
  }catch(e){ /* la sélection reste valable pour cette génération */ }
}

/* Questions au format de l'éditeur d'interrogations (qzEdNouvelle) pour un verbe. */
function lvQuestions(v, formes, tous){
  const [base, pret, pp, fr] = v, qs = [];
  const trou = s => '[[' + lvForms(s).join('|') + ']]';
  if(formes.tableau){
    const q = qzEdNouvelle('trous');
    q.enonce = 'Complète avec le prétérit et le participe passé.';
    q.trous_source = `**to ${base}** (${fr}) : prétérit ${trou(pret)} · participe passé ${trou(pp)}`;
    q.casse = false; q.points = 1; qs.push(q);
  }
  if(formes.traduction){
    const q = qzEdNouvelle('courte');
    q.enonce = `Traduis en anglais (base verbale) : « ${fr} »`;
    q.reponses = [base, 'to ' + base].join(' ; '); q.casse = false; q.points = 1; qs.push(q);
  }
  if(formes.qcm){
    // Prétérit ou participe passé (au hasard) ; mauvaises réponses : la forme régulière inventée, l'autre forme,
    // et la même forme d'un autre verbe de la liste.
    const surPret = Math.random() < .5, juste = lvForms(surPret ? pret : pp)[0], justes = new Set(lvForms(surPret ? pret : pp));
    const reg = base.endsWith('e') ? base + 'd' : base + 'ed';
    // Pièges crédibles d'abord : formes d'autres verbes qui commencent par la même lettre, puis les autres.
    const autresV = lvMelanger(tous.filter(x => x[0] !== base));
    const autres = [...autresV.filter(x => x[0][0] === base[0]), ...autresV.filter(x => x[0][0] !== base[0])].map(x => lvForms(surPret ? x[1] : x[2])[0]);
    const faux = [];
    [reg, lvForms(surPret ? pp : pret)[0], ...autres].forEach(f => { if(f && !justes.has(f) && !faux.includes(f) && faux.length < 3) faux.push(f); });
    const q = qzEdNouvelle('qcm');
    q.enonce = `Quel est le ${surPret ? 'prétérit' : 'participe passé'} de **to ${base}** (${fr}) ?`;
    q.choix = lvMelanger([{ id: qzId(), texte: juste, correct: true }, ...faux.map(f => ({ id: qzId(), texte: f, correct: false }))]);
    q.multiple = false; q.points = 1; qs.push(q);
  }
  return qs;
}

/* Fenêtre « Verbes irréguliers », ouverte depuis l'éditeur d'interrogation. */
function lvOuvrir(){
  const vus = lvVus();
  const st = { sel: new Set(vus.size ? vus : []), filtre: '', formes: { tableau: true, traduction: false, qcm: false }, nb: 0 };
  let o = document.getElementById('lvOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'lvOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o);
    o.addEventListener('click', ev => { if(ev.target === o) o.style.display = 'none'; }); }
  const rendre = () => {
    const f = st.filtre.trim().toLowerCase();
    const liste = VERBES_IRREGULIERS.filter(v => !f || v[0].includes(f) || v[1].includes(f) || v[2].includes(f) || v[3].toLowerCase().includes(f));
    const nbQ = st.sel.size * ['tableau', 'traduction', 'qcm'].filter(k => st.formes[k]).length;
    o.innerHTML = `<div class="modal-card lv">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon" style="color:#1F5FA8;vertical-align:-4px;">translate</span> Verbes irréguliers anglais</b>
        <button class="modal-close" onclick="document.getElementById('lvOverlay').style.display='none'"><span class="gicon">close</span></button></div>
      <p class="hint" style="margin:6px 0 10px;">Cochez les verbes vus en classe : votre sélection est retenue pour la prochaine fois. Les questions s'ajoutent à l'interrogation ; relisez-les avant de la donner.</p>
      <div class="lv-barre">
        <input type="search" id="lvFiltre" placeholder="Chercher un verbe (anglais ou français)…" value="${lvEsc(st.filtre)}">
        <button class="btn secondary td-mini" data-lv="courants">Les ${VERBES_IRREGULIERS.filter(v => v[4]).length} plus courants</button>
        <button class="btn secondary td-mini" data-lv="tous">Tous (${VERBES_IRREGULIERS.length})</button>
        <button class="btn secondary td-mini" data-lv="aucun">Aucun</button>
      </div>
      <div class="lv-liste">${liste.map(v => `<label class="lv-v${st.sel.has(v[0]) ? ' on' : ''}"><input type="checkbox" data-v="${lvEsc(v[0])}"${st.sel.has(v[0]) ? ' checked' : ''}>
          <b>${lvEsc(v[0])}</b><span>${lvEsc(v[1])}</span><span>${lvEsc(v[2])}</span><small>${lvEsc(v[3])}</small></label>`).join('') || '<p class="hint">Aucun verbe ne correspond.</p>'}</div>
      <div class="lv-formes"><b>Questions :</b>
        <label><input type="checkbox" data-f="tableau"${st.formes.tableau ? ' checked' : ''}> Compléter prétérit et participe passé</label>
        <label><input type="checkbox" data-f="traduction"${st.formes.traduction ? ' checked' : ''}> Traduire (français → base verbale)</label>
        <label><input type="checkbox" data-f="qcm"${st.formes.qcm ? ' checked' : ''}> QCM (prétérit ou participe ; jouable avec les cartes A B C D)</label></div>
      <div class="lv-pied"><label class="hint" style="margin:0;">Tirer au hasard <input type="number" id="lvNb" min="0" max="${st.sel.size}" value="${st.nb || ''}" placeholder="tous" style="width:70px;"> verbe(s) parmi les ${st.sel.size} cochés</label>
        <span style="flex:1"></span><span class="hint" style="margin:0;">${st.nb && st.nb < st.sel.size ? st.nb * (nbQ / Math.max(1, st.sel.size)) : nbQ} question(s)</span>
        <button class="btn" id="lvOk"${nbQ ? '' : ' disabled'}><span class="gicon">add</span> Ajouter les questions</button></div>
    </div>`;
    const filtre = o.querySelector('#lvFiltre');
    filtre.oninput = () => { st.filtre = filtre.value; const p = filtre.selectionStart; rendre(); const n = o.querySelector('#lvFiltre'); n.focus(); n.setSelectionRange(p, p); };
    o.querySelectorAll('[data-v]').forEach(c => c.onchange = () => { if(c.checked) st.sel.add(c.dataset.v); else st.sel.delete(c.dataset.v); rendre(); });
    o.querySelectorAll('[data-f]').forEach(c => c.onchange = () => { st.formes[c.dataset.f] = c.checked; rendre(); });
    o.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => {
      const k = b.dataset.lv;
      st.sel = new Set(k === 'aucun' ? [] : VERBES_IRREGULIERS.filter(v => k === 'tous' || v[4]).map(v => v[0])); rendre(); });
    const nb = o.querySelector('#lvNb'); nb.onchange = () => { st.nb = Math.max(0, Math.min(st.sel.size, parseInt(nb.value, 10) || 0)); rendre(); };
    o.querySelector('#lvOk').onclick = async () => {
      let verbes = VERBES_IRREGULIERS.filter(v => st.sel.has(v[0]));
      if(st.nb && st.nb < verbes.length) verbes = lvMelanger(verbes).slice(0, st.nb);
      if(!qzEd) qzEdReset();
      const qs = [];
      verbes.forEach(v => qs.push(...lvQuestions(v, st.formes, VERBES_IRREGULIERS)));
      qzEd.questions.push(...lvMelanger(qs));
      qzEdOuverte = null; qzEdRender();
      o.style.display = 'none';
      lvMemoriser(st.sel);
      const t = document.getElementById('qzfTitre'); if(t && !t.value.trim()) t.value = 'Verbes irréguliers';
      await niceAlert(`${qs.length} question${qs.length > 1 ? 's ajoutées' : ' ajoutée'} à l'interrogation (${verbes.length} verbe${verbes.length > 1 ? 's' : ''}, dans le désordre). Relisez-les, puis donnez l'interrogation : en devoir, en entraînement ou en séance en direct.`);
    };
  };
  o.style.display = 'flex'; rendre();
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .lv{ max-width:760px; width:95vw; max-height:90vh; display:flex; flex-direction:column; }
    .lv-barre{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; margin-bottom:8px; } .lv-barre input[type=search]{ flex:1; min-width:200px; }
    .lv-liste{ overflow:auto; flex:1; min-height:160px; border:1px solid rgba(28,43,57,.12); border-radius:10px; padding:4px; display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:2px; }
    .lv-v{ display:grid; grid-template-columns:20px 1.1fr 1.2fr 1.2fr; grid-template-rows:auto auto; column-gap:6px; align-items:center; padding:5px 8px; border-radius:8px; cursor:pointer; font-size:.88rem; }
    .lv-v:hover{ background:#F3F6FA; } .lv-v.on{ background:#EAF1FA; }
    .lv-v input{ grid-row:1 / span 2; } .lv-v b{ font-family:'Space Grotesk',sans-serif; } .lv-v small{ grid-column:2 / span 3; color:var(--ink-soft); font-size:.76rem; }
    .lv-formes{ display:flex; flex-wrap:wrap; gap:6px 14px; align-items:center; margin:10px 0 0; font-size:.9rem; } .lv-formes label{ display:inline-flex; gap:5px; align-items:center; }
    .lv-pied{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:10px; }
  `;
  document.head.appendChild(st);
})();
