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
        <div style="display:flex;justify-content:center;align-items:stretch;gap:0;font-family:'JetBrains Mono',monospace;font-size:1.25rem;padding:20px 10px;background:var(--white);border-radius:8px;border:1px solid rgba(28,43,57,.1);">
          <div style="text-align:right;padding-right:16px;">
            <div class="dp-tag" style="color:var(--accent);">dividende</div>
            <div id="dpLeft" style="text-align:right;line-height:2;min-width:70px;"></div>
            <div class="dp-tag" id="dpResteTag" style="color:#9E1F5E;min-height:1.1em;"></div>
          </div>
          <div style="border-left:2px solid #1C1B2E;padding-left:16px;">
            <div class="dp-tag" style="color:var(--accent-orange);">diviseur</div>
            <div style="line-height:2;border-bottom:1.5px solid #1C1B2E;padding-bottom:2px;margin-left:-16px;padding-left:16px;">12</div>
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
      <div class="sub-header"><span class="letter">M</span><h4>Méthode : calculer avec des priorités et des parenthèses imbriquées</h4></div>
      <div class="figure-wrap">
        <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler le calcul dans le bon ordre.</p>
        <div class="step-display" id="od-imbriqueesDisplay"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="odImbriqueesDemo.next()">Étape suivante →</button>
          <button class="btn secondary" onclick="odImbriqueesDemo.reset()">Recommencer</button>
        </div>
      </div>

      <div class="sub-header"><span class="letter">M</span><h4>Méthode : traduire une phrase en calcul ("C'est le produit de... par...")</h4></div>
      <div class="def-box" style="margin-bottom:16px;">
        <b>Le produit</b> de a par b, c'est a × b.<br>
        <b>La somme</b> de a et b, c'est a + b.<br>
        <b>La différence</b> de a et b, c'est a − b.<br>
        <b>Le quotient</b> de a par b, c'est a ÷ b.
      </div>
      <div class="figure-wrap">
        <p class="hint interaction-hint" style="margin-top:6px;">Phrase à traduire : "C'est la somme du produit de 3 par 4 et du quotient de 8 par 2." Cliquez sur "Étape suivante".</p>
        <div class="step-display" id="od-phraseADisplay"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="odPhraseADemo.next()">Étape suivante →</button>
          <button class="btn secondary" onclick="odPhraseADemo.reset()">Recommencer</button>
        </div>
      </div>
      <div class="figure-wrap">
        <p class="hint interaction-hint" style="margin-top:6px;">Autre phrase, structure différente : "Le produit de la différence de 17 et 5 par 8." Cliquez sur "Étape suivante".</p>
        <div class="step-display" id="od-phraseBDisplay"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="odPhraseBDemo.next()">Étape suivante →</button>
          <button class="btn secondary" onclick="odPhraseBDemo.reset()">Recommencer</button>
        </div>
      </div>
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

/* ---- Méthode : calcul avec priorités ET parenthèses imbriquées combinées ---- */
const OD_IMBRIQUEES_STEPS = [
  {expr:'F = 3 × [(8 − 2) × 4 + (5 − 3)] − 10', note:"On repère les parenthèses les plus intérieures : (8 − 2) et (5 − 3)."},
  {expr:'F = 3 × [6 × 4 + (5 − 3)] − 10', note:"On calcule la 1re parenthèse la plus intérieure : 8 − 2 = 6."},
  {expr:'F = 3 × [6 × 4 + 2] − 10', note:"On calcule la 2e parenthèse la plus intérieure : 5 − 3 = 2."},
  {expr:'F = 3 × [24 + 2] − 10', note:"À l'intérieur du crochet, la multiplication est prioritaire sur l'addition : 6 × 4 = 24. Sans la parenthèse (8 − 2), on aurait dû calculer 8 − 2 × 4 = 8 − 8 = 0 : un résultat totalement différent !"},
  {expr:'F = 3 × 26 − 10', note:"On termine le calcul entre crochets : 24 + 2 = 26. Le crochet est résolu."},
  {expr:'F = 78 − 10', note:"La multiplication est prioritaire sur la soustraction : 3 × 26 = 78."},
  {expr:'F = 68', note:"Il ne reste que la soustraction : résultat final."},
];
const odImbriqueesDemo = makeStepDemo(OD_IMBRIQUEES_STEPS, 'od-imbriqueesDisplay');

/* ---- Méthode : traduire une phrase en calcul (produit/somme/différence/quotient) ----
   Signalé : "si tu mets somme en vert, tu mets aussi et en vert directement. Sur la phrase de
   départ, tu soulignes en bleu ce qui est à gauche du et puis en orange à droite. Les
   pointillés ont ces couleurs pour bien montrer où tout se place. Ensuite on s'intéresse à la
   partie bleue et on redécompose de la même façon mais toujours sur le rendu final qui se
   construit petit à petit." Codage couleur : VERT = le mot-clé de l'opération ET son
   mot-lien correspondant (et/par), toujours ensemble ; BLEU = ce qui est à GAUCHE du
   mot-lien ; ORANGE = ce qui est à DROITE -- ces mêmes couleurs se retrouvent aussitôt dans
   le squelette (les "…" à compléter). Une fois une partie identifiée, on zoome dessus et on
   lui applique la MÊME démarche récursivement (réutilisant bleu/orange localement), en
   modifiant petit à petit le même rendu final déjà affiché -- jamais en le remplaçant.
   Réponses vérifiées par calcul (16 et 96) avant rédaction. */
const OD_GREEN = 'color:#1F6B3A;font-weight:700;';
const OD_BLUE = 'color:var(--accent);font-weight:700;';
const OD_ORANGE = 'color:var(--accent-orange);font-weight:700;';
const OD_U_BLUE = 'text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:2px;';
const OD_U_ORANGE = 'text-decoration:underline;text-decoration-color:var(--accent-orange);text-decoration-thickness:2px;';
const OD_SKEL = txt => `<div style="margin-top:14px;font-size:1.3rem;">${txt}</div>`;

const OD_PHRASE_A_STEPS = [
  {expr:`la <b style="${OD_GREEN}">somme</b> du produit de 3 par 4 <b style="${OD_GREEN}">et</b> du quotient de 8 par 2`,
   note:"Je repère l'opération : une SOMME. Le mot-lien qui lui correspond est « et » : je mets les deux en vert ensemble."},
  {expr:`la <b style="${OD_GREEN}">somme</b> du <span style="${OD_BLUE}${OD_U_BLUE}">produit de 3 par 4</span> <b style="${OD_GREEN}">et</b> du <span style="${OD_ORANGE}${OD_U_ORANGE}">quotient de 8 par 2</span>`+
    OD_SKEL(`<span style="${OD_BLUE}">…</span> + <span style="${OD_ORANGE}">…</span>`),
   note:"Je souligne en bleu ce qui est à gauche du « et », en orange ce qui est à droite -- et je place ces mêmes couleurs dans les pointillés du squelette, pour montrer où chaque partie ira."},
  {expr:`le <b style="${OD_GREEN}">produit</b> de 3 <b style="${OD_GREEN}">par</b> 4`+
    OD_SKEL(`<span style="${OD_BLUE}">…</span> + <span style="${OD_ORANGE}">…</span>`),
   note:"Je m'intéresse maintenant à la partie bleue : « produit de 3 par 4 ». C'est un produit, de mot-lien « par » : même démarche, je les mets en vert."},
  {expr:`le produit de <span style="${OD_BLUE}${OD_U_BLUE}">3</span> <b style="${OD_GREEN}">par</b> <span style="${OD_ORANGE}${OD_U_ORANGE}">4</span>`+
    OD_SKEL(`<span style="${OD_BLUE}">3</span> × <span style="${OD_ORANGE}">4</span> + <span style="${OD_ORANGE}">…</span>`),
   note:"Je souligne 3 en bleu, 4 en orange -- et je les place directement dans le squelette, à l'endroit de la partie bleue de tout à l'heure."},
  {expr:OD_SKEL('3 × 4 + <span style="'+OD_ORANGE+'">…</span>'),
   note:"3 et 4 sont déjà des nombres : rien à décomposer de plus, cette partie est terminée (elle redevient neutre)."},
  {expr:`le <b style="${OD_GREEN}">quotient</b> de 8 <b style="${OD_GREEN}">par</b> 2`+OD_SKEL('3 × 4 + <span style="'+OD_ORANGE+'">…</span>'),
   note:"Je m'intéresse maintenant à la partie orange : « quotient de 8 par 2 ». C'est un quotient, de mot-lien « par »."},
  {expr:`le quotient de <span style="${OD_BLUE}${OD_U_BLUE}">8</span> <b style="${OD_GREEN}">par</b> <span style="${OD_ORANGE}${OD_U_ORANGE}">2</span>`+
    OD_SKEL(`3 × 4 + <span style="${OD_BLUE}">8</span> ÷ <span style="${OD_ORANGE}">2</span>`),
   note:"Je souligne 8 en bleu, 2 en orange -- et je complète le squelette."},
  {expr:'F = 3 × 4 + 8 ÷ 2', note:"8 et 2 sont déjà des nombres : l'expression est maintenant complète !"},
];
const odPhraseADemo = makeSingleStepDemo(OD_PHRASE_A_STEPS, 'od-phraseADisplay');

const OD_PHRASE_B_STEPS = [
  {expr:`le <b style="${OD_GREEN}">produit</b> de la différence de 17 et 5 <b style="${OD_GREEN}">par</b> 8`,
   note:"Je repère l'opération : un PRODUIT. Le mot-lien qui lui correspond est « par » -- attention, ne pas confondre avec le « et » de « différence de 17 et 5 », qui appartient à une autre partie. Je mets « produit » et « par » en vert ensemble."},
  {expr:`le <b style="${OD_GREEN}">produit</b> de <span style="${OD_BLUE}${OD_U_BLUE}">la différence de 17 et 5</span> <b style="${OD_GREEN}">par</b> <span style="${OD_ORANGE}${OD_U_ORANGE}">8</span>`+
    OD_SKEL(`<span style="${OD_BLUE}">…</span> × <span style="${OD_ORANGE}">8</span>`),
   note:"Je souligne en bleu ce qui est à gauche du « par », en orange ce qui est à droite -- ici, la partie orange est déjà un nombre (8), je la place directement dans le squelette."},
  {expr:`la <b style="${OD_GREEN}">différence</b> de 17 <b style="${OD_GREEN}">et</b> 5`+OD_SKEL(`<span style="${OD_BLUE}">…</span> × 8`),
   note:"Je m'intéresse maintenant à la partie bleue : « différence de 17 et 5 ». C'est une différence, de mot-lien « et » (celui-ci, à l'intérieur de cette partie)."},
  {expr:`la différence de <span style="${OD_BLUE}${OD_U_BLUE}">17</span> <b style="${OD_GREEN}">et</b> <span style="${OD_ORANGE}${OD_U_ORANGE}">5</span>`+
    OD_SKEL(`(<span style="${OD_BLUE}">17</span> − <span style="${OD_ORANGE}">5</span>) × 8`),
   note:"Je souligne 17 en bleu, 5 en orange -- et je les place dans le squelette. La parenthèse est nécessaire car ce résultat va ensuite être multiplié."},
  {expr:'F = (17 − 5) × 8', note:"17 et 5 sont déjà des nombres : l'expression est maintenant complète !"},
];
const odPhraseBDemo = makeSingleStepDemo(OD_PHRASE_B_STEPS, 'od-phraseBDisplay');

DEMO_REGISTRY['5e|Opérations sur les nombres décimaux'] = { cours:'cours-demo-decimaux', methode:'methode-demo-decimaux', exos:'exos-demo-decimaux', histoire:'histoire-demo-decimaux',
  init:()=>{ enchainementDemo.reset(); parenthesesDemo.reset(); divisionPoseeReset(); odImbriqueesDemo.reset(); odPhraseADemo.reset(); odPhraseBDemo.reset(); injectCourseAddButtons(document.getElementById('cours-demo-decimaux')); injectCourseAddButtons(document.getElementById('methode-demo-decimaux')); } };

DEMO_QUIZZES['5e|Opérations sur les nombres décimaux'] = [
  {q:"Que vaut 4 + 2 × 3 ?",
   opts:["18","10","9"], correct:1},
  {q:"Comment s'appelle le résultat d'une division ?",
   opts:["La somme","Le produit","Le quotient"], correct:2},
];
