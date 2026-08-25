/* ============================================================
   CHAPITRE : Heures et durées (6e, M2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   §1 Unités de mesure de durées (tableau).
   §2 Conversions de durées : deux exemples numériques (valeurs
   différentes du support papier), avec la division euclidienne
   présentée sous forme de raisonnement rédigé (pas un pavé de
   division posée digit par digit comme N4 -- ce serait disproportionné
   ici, l'enjeu est la conversion, pas la technique de division).
   §3 Écritures sexagésimale et décimale d'une durée (A et B), avec un
   tableau d'équivalences usuelles.

   Méthode : addition et soustraction de durées posées verticalement
   (colonnes h/min/min/s), animées pas à pas avec retenue/emprunt en
   base 60 -- demande explicite, complément par rapport au support
   papier qui ne les couvre pas.

   Toutes les valeurs numériques ci-dessous ont été calculées et
   vérifiées avant intégration.

   Exercices/histoire laissés en placeholder pour une prochaine
   session, comme pour D1/D2/G6/M1 à leurs débuts. Un quiz dédié est
   ajouté dès cette session (retour d'expérience : le quiz par défaut
   retombe sinon sur un fallback générique sans rapport).
   ============================================================ */

document.getElementById('cours-demo-heures-durees').innerHTML = `

<div class="lesson-header"><span class="num">1</span><h3>Unités de mesure de durées</h3></div>

<table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:.9rem;margin:10px 0;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);background:rgba(191,220,251,.3);">1 millénaire = 1 000 ans</td>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);background:rgba(191,220,251,.3);">1 siècle = 100 ans</td>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);background:rgba(191,220,251,.3);">1 année = 365 ou 366 jours (bissextile)</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);">1 jour = 24 h</td>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);">1 h = 60 min</td>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);">1 min = 60 s</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);" colspan="3">1 h = 3 600 s</td>
    </tr>
  </tbody>
</table>

<div class="lesson-header"><span class="num">2</span><h3>Conversions de durées</h3></div>

<p class="example-title" style="margin-top:0;">Exemple 1 : combien de secondes y a-t-il dans 3 h 24 min 17 s ?</p>
<ul class="example-list">
  <li><span class="tex">3\\text{ h} = 3 \\times 3\\,600\\text{ s} = 10\\,800\\text{ s}</span></li>
  <li><span class="tex">24\\text{ min} = 24 \\times 60\\text{ s} = 1\\,440\\text{ s}</span></li>
  <li><span class="tex">3\\text{ h } 24\\text{ min } 17\\text{ s} = 10\\,800\\text{ s} + 1\\,440\\text{ s} + 17\\text{ s} = 12\\,257\\text{ s}</span></li>
</ul>

<p class="example-title">Exemple 2 : combien d'heures, minutes et secondes y a-t-il dans 25 000 s ?</p>
<div class="redaction-block">
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">On convertit d'abord les secondes en minutes et secondes, en divisant 25 000 par 60.</span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">25\\,000 = 60 \\times 416 + 40</span></span><span class="we-comment">416 est le plus grand nombre tel que 60 × 416 ≤ 25 000.</span></div>
    <div class="we-row"><span class="we-expr">Donc 25 000 s = 416 min 40 s.</span></div>
    <div class="we-row"><span class="we-expr">On convertit ensuite les minutes en heures et minutes, en divisant 416 par 60.</span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">416 = 60 \\times 6 + 56</span></span><span class="we-comment">6 est le plus grand nombre tel que 60 × 6 ≤ 416.</span></div>
    <div class="we-row"><span class="we-expr">Donc 416 min = 6 h 56 min.</span></div>
  </div>
</div>
<p style="margin:4px 0 0;">On a donc <b>25 000 s = 6 h 56 min 40 s</b>.</p>

<div class="lesson-header"><span class="num">3</span><h3>Écritures sexagésimale et décimale d'une durée</h3></div>

<p class="example-title" style="margin-top:0;">A. Passage de l'écriture sexagésimale à l'écriture décimale</p>
<p style="margin:4px 0 10px;">Exemple : convertis 5 h 24 min en écriture décimale.</p>
<ul class="example-list">
  <li>1 h = 60 min, donc <span class="tex">1\\text{ min} = \\dfrac{1}{60}\\text{ h}</span> et <span class="tex">24\\text{ min} = 24 \\times \\dfrac{1}{60}\\text{ h} = \\dfrac{24}{60}\\text{ h} = 0{,}4\\text{ h}</span></li>
  <li>donc 5 h 24 min = <b>5,4 h</b>.</li>
</ul>

<p class="example-title" style="margin-top:20px;">B. Passage de l'écriture décimale à l'écriture sexagésimale</p>
<p style="margin:4px 0 10px;">Exemple : convertis 2,85 h en heures et minutes.</p>
<ul class="example-list">
  <li><span class="tex">2{,}85\\text{ h} = 2\\text{ h} + 0{,}85\\text{ h}</span>. Or 1 h = 60 min, donc <span class="tex">0{,}85\\text{ h} = 0{,}85 \\times 60\\text{ min} = 51\\text{ min}</span></li>
  <li>donc 2,85 h = <b>2 h 51 min</b>.</li>
</ul>

<p class="hint" style="margin-top:16px;"><b>Remarque</b> : on a les égalités suivantes :</p>
<div style="display:flex;flex-wrap:wrap;gap:10px 26px;margin:6px 0 0;">
  <span class="tex">0{,}5\\text{ h} = \\dfrac{1}{2}\\text{ h} = 30\\text{ min}</span>
  <span class="tex">0{,}25\\text{ h} = \\dfrac{1}{4}\\text{ h} = 15\\text{ min}</span>
  <span class="tex">0{,}75\\text{ h} = \\dfrac{3}{4}\\text{ h} = 45\\text{ min}</span>
  <span class="tex">0{,}1\\text{ h} = \\dfrac{1}{10}\\text{ h} = 6\\text{ min}</span>
  <span class="tex">0{,}2\\text{ h} = \\dfrac{1}{5}\\text{ h} = 12\\text{ min}</span>
</div>
`;

document.getElementById('methode-demo-heures-durees').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Additionner ou soustraire des durées en les posant</h4></div>
<p class="hint" style="margin:8px 0 16px;">On pose l'opération comme pour des nombres entiers, colonne par colonne (secondes, puis minutes, puis heures) -- mais avec une retenue de <b>60</b> et non de 10.</p>

<div style="display:flex;gap:28px;flex-wrap:wrap;">

  <div style="flex:1 1 300px;min-width:260px;">
    <p class="example-title" style="margin-top:0;">Addition : 2 h 47 min 38 s + 1 h 26 min 45 s</p>
    <div class="figure-wrap" style="max-width:320px;margin:8px 0;">
      <table id="m2AddTable" style="width:100%;border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:.95rem;text-align:center;">
        <thead>
          <tr><th style="width:16px;"></th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">h</th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">min</th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">s</th></tr>
          <tr><td></td><td id="m2AddCarryH" style="height:16px;color:#E35D3A;font-size:.75rem;"></td><td id="m2AddCarryMin" style="height:16px;color:#E35D3A;font-size:.75rem;"></td><td></td></tr>
        </thead>
        <tbody>
          <tr><td></td><td>2</td><td>47</td><td>38</td></tr>
          <tr><td>+</td><td>1</td><td>26</td><td>45</td></tr>
        </tbody>
        <tfoot>
          <tr style="border-top:2px solid #1C1B2E;"><td></td><td id="m2AddResH" style="padding-top:6px;font-weight:700;"></td><td id="m2AddResMin" style="padding-top:6px;font-weight:700;"></td><td id="m2AddResS" style="padding-top:6px;font-weight:700;"></td></tr>
        </tfoot>
      </table>
      <p class="hint" id="m2AddText" style="min-height:48px;margin:10px 0 0;">Clique sur « Étape suivante » pour commencer.</p>
      <div class="figure-toolbar">
        <button class="btn" id="btnM2AddNext" onclick="m2AddNextStep()">Étape suivante →</button>
        <button class="btn secondary" onclick="m2AddReset()">Recommencer</button>
      </div>
    </div>
  </div>

  <div style="flex:1 1 300px;min-width:260px;">
    <p class="example-title" style="margin-top:0;">Soustraction : 5 h 12 min 18 s − 2 h 45 min 50 s</p>
    <div class="figure-wrap" style="max-width:320px;margin:8px 0;">
      <table id="m2SubTable" style="width:100%;border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:.95rem;text-align:center;">
        <thead>
          <tr><th style="width:16px;"></th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">h</th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">min</th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">s</th></tr>
          <tr><td></td><td></td><td id="m2SubPlus60Min" style="height:16px;color:#1E9E5A;font-size:.75rem;"></td><td id="m2SubPlus60S" style="height:16px;color:#1E9E5A;font-size:.75rem;"></td></tr>
        </thead>
        <tbody>
          <tr><td></td><td>5</td><td>12</td><td>18</td></tr>
          <tr><td>−</td><td>2<span id="m2SubCompH" style="color:#1E9E5A;font-weight:700;"></span></td><td>45<span id="m2SubCompMin" style="color:#1E9E5A;font-weight:700;"></span></td><td>50</td></tr>
        </tbody>
        <tfoot>
          <tr style="border-top:2px solid #1C1B2E;"><td></td><td id="m2SubResH" style="padding-top:6px;font-weight:700;"></td><td id="m2SubResMin" style="padding-top:6px;font-weight:700;"></td><td id="m2SubResS" style="padding-top:6px;font-weight:700;"></td></tr>
        </tfoot>
      </table>
      <p class="hint" id="m2SubText" style="min-height:64px;margin:10px 0 0;">Clique sur « Étape suivante » pour commencer.</p>
      <div class="figure-toolbar">
        <button class="btn" id="btnM2SubNext" onclick="m2SubNextStep()">Étape suivante →</button>
        <button class="btn secondary" onclick="m2SubReset()">Recommencer</button>
      </div>
    </div>
  </div>

</div>
`;

document.getElementById('exos-demo-heures-durees').innerHTML = `
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

/* ================= Addition de durées posée (retenue en base 60) =================
   2h47min38s + 1h26min45s = 4h14min23s (vérifié : 15263 s au total, dans les deux sens). */
const M2_ADD_STEPS = [
  {text:"On pose l'addition colonne par colonne, en commençant par les secondes (à droite), comme pour des nombres entiers."},
  {resS:'23', carryMin:'+1', text:"Secondes : 38 + 45 = 83 s. Comme 83 ≥ 60, on pose 83 − 60 = 23 s et on retient 1 min (83 s = 1 min 23 s)."},
  {resMin:'14', carryH:'+1', text:"Minutes : 47 + 26 + 1 (retenue) = 74 min. Comme 74 ≥ 60, on pose 74 − 60 = 14 min et on retient 1 h (74 min = 1 h 14 min)."},
  {resH:'4', text:"Heures : 2 + 1 + 1 (retenue) = 4 h. Pas de retenue ici (4 < 60 h... et surtout on ne convertit plus, les heures sont la plus grande unité)."},
  {final:true, text:"Résultat : 2 h 47 min 38 s + 1 h 26 min 45 s = 4 h 14 min 23 s."}
];
let m2AddStep = 0;
function m2AddReset(){
  m2AddStep = 0;
  ['m2AddResH','m2AddResMin','m2AddResS','m2AddCarryH','m2AddCarryMin'].forEach(id=>document.getElementById(id).textContent='');
  document.getElementById('m2AddText').textContent = 'Clique sur « Étape suivante » pour commencer.';
  const btn = document.getElementById('btnM2AddNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function m2AddNextStep(){
  if(m2AddStep>=M2_ADD_STEPS.length-1) return;
  m2AddStep++;
  const s = M2_ADD_STEPS[m2AddStep];
  if(s.resS!==undefined) document.getElementById('m2AddResS').textContent = s.resS;
  if(s.resMin!==undefined) document.getElementById('m2AddResMin').textContent = s.resMin;
  if(s.resH!==undefined) document.getElementById('m2AddResH').textContent = s.resH;
  if(s.carryMin!==undefined) document.getElementById('m2AddCarryMin').textContent = s.carryMin;
  if(s.carryH!==undefined) document.getElementById('m2AddCarryH').textContent = s.carryH;
  document.getElementById('m2AddText').textContent = s.text;
  if(s.final){ document.getElementById('btnM2AddNext').textContent = 'Terminé ✓'; document.getElementById('btnM2AddNext').disabled = true; }
}

/* ================= Soustraction de durées posée (méthode par compensation) =================
   5h12min18s - 2h45min50s = 2h26min28s (vérifié : 8788 s au total, dans les deux sens,
   et retrouvé par calcul direct de chaque étape de compensation ci-dessous).

   Méthode par compensation (au lieu de l'emprunt classique) : quand une colonne du haut
   est trop petite, on lui ajoute 60 (affiché en vert au-dessus de son chiffre) -- et pour
   que la différence ne change pas, on ajoute 1 à la colonne suivante du bas (affiché en
   vert, accolé à son chiffre). On ne touche jamais aux chiffres déjà écrits en haut. */
const M2_SUB_STEPS = [
  {text:"On pose la soustraction colonne par colonne, en commençant par les secondes (à droite)."},
  {resS:'28', plus60S:'+60', compMin:'+1',
   text:"Secondes : 18 − 50 est impossible. On fait apparaître +60 au-dessus du 18 (en vert) : 18 + 60 = 78. Comme on a ajouté 60 s au premier terme, on ajoute 1 min au second terme pour compenser : 45 devient 45 + 1. 78 − 50 = 28 s."},
  {resMin:'26', plus60Min:'+60', compH:'+1',
   text:"Minutes : 12 − (45 + 1) = 12 − 46 est impossible. On fait apparaître +60 au-dessus du 12 (en vert) : 12 + 60 = 72. On ajoute donc 1 h au second terme pour compenser : 2 devient 2 + 1. 72 − 46 = 26 min."},
  {resH:'2', text:"Heures : 5 − (2 + 1) = 5 − 3 = 2 h."},
  {final:true, text:"Résultat : 5 h 12 min 18 s − 2 h 45 min 50 s = 2 h 26 min 28 s."}
];
let m2SubStep = 0;
function m2SubReset(){
  m2SubStep = 0;
  ['m2SubResH','m2SubResMin','m2SubResS','m2SubPlus60S','m2SubPlus60Min','m2SubCompMin','m2SubCompH'].forEach(id=>document.getElementById(id).textContent='');
  document.getElementById('m2SubText').textContent = 'Clique sur « Étape suivante » pour commencer.';
  const btn = document.getElementById('btnM2SubNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function m2SubNextStep(){
  if(m2SubStep>=M2_SUB_STEPS.length-1) return;
  m2SubStep++;
  const s = M2_SUB_STEPS[m2SubStep];
  if(s.resS!==undefined) document.getElementById('m2SubResS').textContent = s.resS;
  if(s.resMin!==undefined) document.getElementById('m2SubResMin').textContent = s.resMin;
  if(s.resH!==undefined) document.getElementById('m2SubResH').textContent = s.resH;
  if(s.plus60S!==undefined) document.getElementById('m2SubPlus60S').textContent = s.plus60S;
  if(s.plus60Min!==undefined) document.getElementById('m2SubPlus60Min').textContent = s.plus60Min;
  if(s.compMin!==undefined) document.getElementById('m2SubCompMin').textContent = ' '+s.compMin;
  if(s.compH!==undefined) document.getElementById('m2SubCompH').textContent = ' '+s.compH;
  document.getElementById('m2SubText').textContent = s.text;
  if(s.final){ document.getElementById('btnM2SubNext').textContent = 'Terminé ✓'; document.getElementById('btnM2SubNext').disabled = true; }
}

DEMO_REGISTRY['6e|Heures et durée'] = {
  cours:'cours-demo-heures-durees', methode:'methode-demo-heures-durees', exos:'exos-demo-heures-durees',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-heures-durees'));
    renderStaticMath(document.getElementById('methode-demo-heures-durees'));
    renderStaticMath(document.getElementById('exos-demo-heures-durees'));
    injectCourseAddButtons(document.getElementById('cours-demo-heures-durees'));
    injectCourseAddButtons(document.getElementById('methode-demo-heures-durees'));
    m2AddReset();
    m2SubReset();
  }
};

DEMO_QUIZZES['6e|Heures et durée'] = [
  {q:"1 h est égal à...", opts:["100 min","60 min","24 min"], correct:1},
  {q:"Combien de secondes y a-t-il dans 2 h ?", opts:["120 s","3 600 s","7 200 s"], correct:2},
  {q:"3,5 h en heures et minutes est égal à...", opts:["3 h 5 min","3 h 30 min","3 h 50 min"], correct:1},
  {q:"2 h 40 min + 1 h 30 min = ...", opts:["3 h 10 min","4 h 10 min","3 h 70 min"], correct:1},
  {q:"5 h − 2 h 15 min = ...", opts:["2 h 45 min","3 h 15 min","2 h 15 min"], correct:0}
];
