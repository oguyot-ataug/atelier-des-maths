/* ============================================================
   CHAPITRE : Opérations sur les nombres décimaux (5e, N1)
   Fichier autonome -- voir la note dans symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-decimaux').innerHTML = `

      <div class="lesson-header"><span class="num">1</span><h3>Vocabulaire des opérations</h3></div>
      <span class="def-badge">Définitions</span>
      <div class="def-box">
        <ul style="margin:0;padding-left:20px;line-height:1.8;">
          <li>Le résultat de l'<b>addition</b> 25 + 6 est la <b>somme</b> des <b>termes</b> 25 et 6.</li>
          <li>Le résultat de la <b>soustraction</b> 25 − 6 est la <b>différence</b> des <b>termes</b> 25 et 6.</li>
          <li>Le résultat de la <b>multiplication</b> 25 × 6 est le <b>produit</b> des <b>facteurs</b> 25 et 6.</li>
          <li>Le résultat de la <b>division</b> 25 ÷ 6 est le <b>quotient</b> de 25 par 6.</li>
        </ul>
      </div>

      <div class="lesson-header"><span class="num">2</span><h3>Priorités opératoires</h3></div>

      <div class="sub-header"><span class="letter">A</span><h4>Enchaînement d'opérations</h4></div>
      <span class="prop-badge">Règle</span>
      <div class="def-box">Dans une suite d'opérations, on effectue d'abord les <b>multiplications</b> et les <b>divisions</b>. On dit qu'elles sont <b>prioritaires</b> sur les additions et les soustractions.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple déroulé : B = 2,4 × 3 − 18 : 4 − 1,5</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler le calcul dans le bon ordre.</p>
        <div class="step-display" id="enchainementDisplay"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="enchainementDemo.next()">Étape suivante →</button>
          <button class="btn secondary" onclick="enchainementDemo.reset()">Recommencer</button>
        </div>
      </div>

      <p class="example-title">Remarques :</p>
      <ul class="example-list">
        <li>Dans une suite d'opérations ne comportant plus que des additions (ou plus que des multiplications), on peut <b>changer l'ordre des termes</b> (ou des facteurs).</li>
        <li>Dans une suite d'opérations ne comportant plus que des additions et des soustractions, ou plus que des multiplications et des divisions, on effectue les opérations <b>de gauche à droite</b>.</li>
      </ul>

      <div class="sub-header"><span class="letter">B</span><h4>Avec des parenthèses</h4></div>
      <span class="prop-badge">Règle</span>
      <div class="def-box">Dans une suite d'opérations avec des parenthèses, on effectue d'abord les calculs <b>entre parenthèses</b>.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple déroulé : D = 10 − [(9 − 3) × 0,5]</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler le calcul.</p>
        <div class="step-display" id="parenthesesDisplay"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="parenthesesDemo.next()">Étape suivante →</button>
          <button class="btn secondary" onclick="parenthesesDemo.reset()">Recommencer</button>
        </div>
      </div>

      <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
        Remarque : dans une suite d'opérations avec des parenthèses imbriquées (ou des crochets), on commence par effectuer les calculs dans les parenthèses <b>les plus intérieures</b>.
      </div>

      <div class="lesson-header"><span class="num">3</span><h3>Division euclidienne</h3></div>
      <span class="prop-badge">Règle</span>
      <div class="def-box">Dans une division euclidienne, on a toujours : <b>dividende = (diviseur × quotient) + reste</b>, avec <b>reste &lt; diviseur</b>.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple posé : la division de 758 par 12</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la division posée.</p>
        <div style="display:flex;justify-content:center;align-items:flex-start;gap:0;font-family:'JetBrains Mono',monospace;font-size:1.25rem;padding:20px 10px;background:var(--white);border-radius:8px;border:1px solid rgba(28,43,57,.1);">
          <div style="text-align:right;padding-right:16px;">
            <div class="dp-tag" style="color:var(--accent);">dividende</div>
            <div id="dpLeft" style="text-align:right;line-height:2;min-width:70px;"></div>
            <div class="dp-tag" id="dpResteTag" style="color:#9E1F5E;min-height:1.1em;"></div>
          </div>
          <div style="border-left:2px solid #1C1B2E;padding-left:16px;">
            <div class="dp-tag" style="color:var(--accent-orange);">diviseur</div>
            <div style="line-height:2;"><span style="display:inline-block;border-bottom:1.5px solid #1C1B2E;padding-bottom:2px;">12</span></div>
            <div style="display:flex;align-items:baseline;gap:8px;line-height:2;margin-top:6px;">
              <div id="dpQuotient" style="font-weight:700;"></div>
              <span class="dp-tag" style="color:#1F6B3A;white-space:nowrap;">← quotient</span>
            </div>
          </div>
        </div>
        <div class="step-note" id="dpNote" style="text-align:center;margin-top:10px;"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="divisionPoseeNext()">Étape suivante →</button>
          <button class="btn secondary" onclick="divisionPoseeReset()">Recommencer</button>
        </div>
      </div>
      <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
        Remarque : à la fin, on retrouve l'égalité <b>758 = (12 × 63) + 2</b>, avec 2 &lt; 12.
      </div>

`;

document.getElementById('histoire-demo-decimaux').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Avant l'invention de l'écriture décimale par Simon Stevin en 1585, poser une addition ou une multiplication avec des parties non entières était bien plus compliqué : il fallait passer par des fractions, avec des dénominateurs différents à mettre au même niveau à chaque étape. Dans son livre <i>La Thiende</i>, Stevin montre justement comment additionner, soustraire, multiplier et diviser des nombres décimaux presque aussi facilement que des nombres entiers, c'est précisément ce gain de simplicité qui a permis à cette écriture de s'imposer aussi vite chez les commerçants et les savants de son époque.
</div>
`;
document.getElementById('methode-demo-decimaux').innerHTML = `
      `;
document.getElementById('exos-demo-decimaux').innerHTML = `
      <div class="redaction-block">
        <h3>Rédaction type : « Effectuer un calcul avec priorités »</h3>
        <div class="redaction-template">
          <div class="we-row"><span class="we-expr">E = 4 + 2 × (7 − 3)</span><span class="we-comment">On calcule d'abord la parenthèse.</span></div>
          <div class="we-row"><span class="we-expr">E = 4 + 2 × 4</span><span class="we-comment">On effectue ensuite la multiplication.</span></div>
          <div class="we-row"><span class="we-expr">E = 4 + 8</span><span class="we-comment">Il ne reste que l'addition.</span></div>
          <div class="we-row"><span class="we-expr">E = 12</span><span class="we-comment">Résultat final.</span></div>
        </div>
      </div>
      <div class="redaction-block">
        <h3>Exercices</h3>
        <div class="exo-card">
          <div class="num">Exercice 1</div>
          Calcule en respectant les priorités opératoires : 6 + 3 × (9 − 5).
        </div>
      </div>
`;

const ENCHAINEMENT_STEPS = [
  {expr:'B = <span class="hl">2,4 × 3</span> − 18 : 4 − 1,5', note:"On effectue d'abord les multiplications et divisions, de gauche à droite : 2,4 × 3 = 7,2."},
  {expr:'B = 7,2 − <span class="hl">18 : 4</span> − 1,5', note:'18 : 4 = 4,5.'},
  {expr:'B = <span class="hl">7,2 − 4,5</span> − 1,5', note:"Il ne reste que des soustractions : on calcule de gauche à droite."},
  {expr:'B = <span class="hl">2,7 − 1,5</span>', note:'…'},
  {expr:'B = 1,2', note:'Résultat final.'},
];

const enchainementDemo = makeStepDemo(ENCHAINEMENT_STEPS, 'enchainementDisplay');

const PARENTHESES_STEPS = [
  {expr:'D = 10 − [<span class="hl">(9 − 3)</span> × 0,5]', note:'On commence par la parenthèse la plus intérieure.'},
  {expr:'D = 10 − [<span class="hl">6 × 0,5</span>]', note:"On calcule maintenant l'intérieur des crochets."},
  {expr:'D = 10 − <span class="hl">3</span>', note:'Les crochets se simplifient.'},
  {expr:'D = 7', note:'Résultat final.'},
];

const parenthesesDemo = makeStepDemo(PARENTHESES_STEPS, 'parenthesesDisplay');

const DP_ROW_758 = '&nbsp;&nbsp;758';
const DP_ROW_72  = '−&nbsp;72&nbsp;';
const DP_ROW_38  = '&nbsp;&nbsp;&nbsp;38';
const DP_ROW_36  = '−&nbsp;&nbsp;36';
const DP_ROW_2   = '&nbsp;&nbsp;&nbsp;&nbsp;2';
const DP_DOT = '<span style="color:var(--accent-orange);font-size:1.4em;">.</span>';
const DIVISION_POSEE_STEPS = [
  {rows:[{t:DP_ROW_758}], quotient:'', note:"On prend d'abord le nombre formé par le chiffre des centaines : 7. Comme 7 < 12, ce nombre ne contient pas 12 : il faut prendre un chiffre de plus."},
  {rows:[{t:DP_ROW_758}], quotient:'', note:'On prend alors le nombre de dizaines : 75. Cette fois, 75 contient 12 (75 ≥ 12) : le quotient aura donc un chiffre des dizaines.'},
  {rows:[{t:DP_ROW_758},{t:DP_ROW_72,sub:true}], quotient:'6'+DP_DOT, note:'12 × 6 = 72, le plus proche de 75 sans le dépasser : on retranche. Le point à côté du 6 rappelle que ce 6 est le chiffre des dizaines du quotient (il représente 60, pas 6).'},
  {rows:[{t:DP_ROW_758},{t:DP_ROW_72,sub:true},{t:DP_ROW_38}], quotient:'6'+DP_DOT, note:"75 − 72 = 3. On abaisse le chiffre des unités (8) : on obtient 38, un nombre d'unités cette fois."},
  {rows:[{t:DP_ROW_758},{t:DP_ROW_72,sub:true},{t:DP_ROW_38},{t:DP_ROW_36,sub:true}], quotient:'63', note:'12 × 3 = 36, le plus proche de 38 sans le dépasser : on retranche. Ce 3 est le chiffre des unités du quotient : il vient remplacer le point, à la même place.'},
  {rows:[{t:DP_ROW_758},{t:DP_ROW_72,sub:true},{t:DP_ROW_38},{t:DP_ROW_36,sub:true},{t:DP_ROW_2}], quotient:'63', note:'38 − 36 = 2. Le reste est 2, inférieur à 12 : la division est terminée.'},
];

let divisionPoseeIdx = 0;

function renderDivisionPosee(){
  const s = DIVISION_POSEE_STEPS[divisionPoseeIdx];
  document.getElementById('dpLeft').innerHTML = s.rows.map(r=>
    r.sub ? `<div><span class="dp-sub-inner">${r.t}</span></div>` : `<div>${r.t}</div>`
  ).join('');
  document.getElementById('dpQuotient').innerHTML = s.quotient;
  document.getElementById('dpNote').textContent = s.note;
  const isLastStep = divisionPoseeIdx === DIVISION_POSEE_STEPS.length-1;
  document.getElementById('dpResteTag').textContent = isLastStep ? '↑ reste' : '';
}

function divisionPoseeNext(){ if(divisionPoseeIdx<DIVISION_POSEE_STEPS.length-1) divisionPoseeIdx++; renderDivisionPosee(); }

function divisionPoseeReset(){ divisionPoseeIdx=0; renderDivisionPosee(); }

DEMO_REGISTRY['5e|Opérations sur les nombres décimaux'] = { cours:'cours-demo-decimaux', methode:'methode-demo-decimaux', exos:'exos-demo-decimaux', histoire:'histoire-demo-decimaux',
  init:()=>{ enchainementDemo.reset(); parenthesesDemo.reset(); divisionPoseeReset(); injectCourseAddButtons(document.getElementById('cours-demo-decimaux')); injectCourseAddButtons(document.getElementById('methode-demo-decimaux')); } };

DEMO_QUIZZES['5e|Opérations sur les nombres décimaux'] = [
  {q:"Que vaut 4 + 2 × 3 ?",
   opts:["18","10","9"], correct:1},
  {q:"Comment s'appelle le résultat d'une division ?",
   opts:["La somme","Le produit","Le quotient"], correct:2},
];
