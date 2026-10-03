/* ============================================================
   CHAPITRE : Opérations sur les nombres entiers (CM1, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Construit à partir d'un cours de référence fourni par l'utilisateur (les quatre opérations
   posées, multiples/diviseurs, critères de divisibilité). La division euclidienne réutilise
   directement l'outil déjà existant (computeDivisionPosee, dpRenderDivisionTable,
   buildDivisionStages -- outils-figures.js) plutôt que de redévelopper un moteur séparé.
   ============================================================ */

/* Petit constructeur de table pour les opérations posées (addition, soustraction,
   multiplication) : chaque "rangée" est un tableau de cellules (chaîne ou nombre), avec une
   colonne de signe à gauche (+, −, × ou vide) et éventuellement un trait sous la rangée (bar).
   small=true pour une petite rangée d'ajustement (retenue, compensation...) au-dessus des
   nombres, big=true pour le résultat. label=texte optionnel affiché à droite de la rangée
   (ex. "← 34 × 3") pour rappeler ce que représente cette ligne -- signalé : "pour la
   multiplication, bien faire comprendre ce que représente chaque ligne". Aucun chiffre n'est
   jamais barré ici (signalé : "étrange tous ces chiffres barrés" -- voir la méthode de
   compensation utilisée pour la soustraction, qui ne modifie ni ne barre jamais les chiffres
   d'origine, seulement une petite annotation "+10" au-dessus du chiffre du haut, et "1+" en
   petit à gauche du chiffre du bas concerné -- voir cm1opCompPrefix ci-dessous). */
function cm1opRowsTable(rows){
  const trs = rows.map(r=>{
    const fs = r.small ? '.72rem' : (r.big ? '1.2rem' : '1.1rem');
    // line-height:1 + petit padding explicite -- sans ça, la ligne des retenues (police plus
    // petite) hérite de la hauteur de ligne par défaut du navigateur et flotte visiblement
    // au-dessus de la colonne qu'elle annote au lieu d'y rester collée -- signalé : "l'espace
    // entre la ligne des retenues et les chiffres en dessous est un peu généreux".
    const vPad = r.small ? '1px' : '2px';
    const signTd = `<td style="width:26px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:${fs};font-weight:700;line-height:1;padding:${vPad} 0;color:${r.signColor||'var(--accent-orange)'};${r.bar?'border-bottom:2.5px solid var(--ink);':''}">${r.sign||'&nbsp;'}</td>`;
    const tds = r.cells.map(c=>`<td style="width:32px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:${fs};font-weight:700;line-height:1;padding:${vPad} 0;${r.color?`color:${r.color};`:''}${r.bar?'border-bottom:2.5px solid var(--ink);':''}">${(c!=null&&c!=='')?c:'&nbsp;'}</td>`).join('');
    const labelTd = r.label ? `<td style="padding-left:14px;text-align:left;font-family:'Inter',sans-serif;font-size:.78rem;color:var(--ink-soft);white-space:nowrap;">${r.label}</td>` : '';
    return `<tr>${signTd}${tds}${labelTd}</tr>`;
  }).join('');
  return `<table style="border-collapse:collapse;margin:10px auto;">${trs}</table>`;
}
/* Petite annotation "1+" (compensation de soustraction) directement à gauche d'un chiffre, dans
   la même cellule -- signalé : "je préfère que le +1 sur le deuxième terme se note... à gauche
   du 2 en écrivant non pas +1 mais 1+ en petit". Réutilisée par soustractionPoseeHTML
   (outils-figures.js, chargé avant ce fichier -- appel sûr, seulement depuis l'intérieur d'une
   fonction, jamais au chargement). */
function cm1opCompPrefix(digit){
  return `<span style="white-space:nowrap;"><span style="font-size:.55em;color:var(--accent-orange);vertical-align:top;">1+</span>${digit}</span>`;
}

document.getElementById('cours-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Vocabulaire des quatre opérations</h3></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.9;">
    <li>Le résultat de l'<b>addition</b> s'appelle la <b>somme</b> des <b>termes</b>.</li>
    <li>Le résultat de la <b>soustraction</b> s'appelle la <b>différence</b> des <b>termes</b>.</li>
    <li>Le résultat de la <b>multiplication</b> s'appelle le <b>produit</b> des <b>facteurs</b>.</li>
    <li>Dans la <b>division euclidienne</b>, le résultat s'appelle le <b>quotient</b> (Q), et ce qu'il reste s'appelle le <b>reste</b> (R). Le reste est toujours plus petit que le diviseur.</li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Astuce : avant de poser un calcul, on peut <b>estimer</b> le résultat pour vérifier ensuite qu'il est raisonnable. Pour 802 + 99, 802 est proche de 800 et 99 est proche de 100 :${cm1Liste(['estimation : 800 + 100 = <b>900</b>', 'calcul exact : 802 + 99 = 901', 'les deux sont proches : le résultat est cohérent.'])}
</div>

<div class="lesson-header"><span class="num">2</span><h3>L'addition posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On <b>aligne</b> les nombres par colonnes (unités sous unités, dizaines sous dizaines...), puis on additionne colonne par colonne, en partant de la <b>droite</b>. Si une colonne dépasse 9, on écrit le chiffre des unités et on <b>retient</b> les dizaines pour la colonne suivante.</div>
<p class="example-title">Exemple : 356 + 178</p>
${cm1opRowsTable([
  {cells:['1','1',''], small:true},
  {cells:['3','5','6']},
  {cells:['1','7','8'], sign:'+', bar:true},
  {cells:['5','3','4'], color:'var(--accent-orange)', big:true},
])}
<p class="hint" style="text-align:center;margin:0 0 10px;">356 + 178 = 534. Le résultat s'appelle la <b>somme</b>.</p>

<div class="lesson-header"><span class="num">3</span><h3>La soustraction posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On aligne les nombres par colonnes, le plus grand nombre au-dessus. On soustrait colonne par colonne, en partant de la droite. Si le chiffre du haut est plus petit que celui du bas, on utilise la <b>compensation</b> : on ajoute 10 au chiffre du haut, ET on ajoute 1 au chiffre du bas de la colonne suivante -- comme on ajoute la même quantité (10) aux deux nombres, leur différence ne change pas !</div>
<p class="example-title">Exemple : 623 − 148</p>
${cm1opRowsTable([
  {cells:['','+10','+10'], small:true},
  {cells:['6','2','3']},
  {cells:[cm1opCompPrefix('1'), cm1opCompPrefix('4'), '8'], sign:'−', bar:true},
  {cells:['4','7','5'], color:'var(--accent-orange)', big:true},
])}
<p class="hint" style="text-align:center;margin:0 0 10px;">623 − 148 = 475. Le résultat s'appelle la <b>différence</b>.</p>

<div class="lesson-header"><span class="num">4</span><h3>La multiplication posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On multiplie d'abord le nombre du haut par le chiffre des <b>unités</b> du nombre du bas, puis par son chiffre des <b>dizaines</b> (le résultat s'écrit alors décalé, car on multiplie en réalité par des dizaines entières). On <b>additionne</b> enfin ces deux résultats intermédiaires.</div>
<p class="example-title">Exemple : 34 × 23</p>
${cm1opRowsTable([
  {cells:['','3','4'], label:'le nombre qu\'on multiplie'},
  {cells:['','2','3'], sign:'×', bar:true, label:'par combien on multiplie'},
  {cells:['1','0','2'], label:'← 34 × 3 (chiffre des unités de 23)'},
  {cells:['6','8','0'], bar:true, label:'← 34 × 20 (chiffre des dizaines de 23)'},
  {cells:['7','8','2'], color:'var(--accent-orange)', big:true, label:'← 102 + 680'},
])}
${cm1Liste(['34 × 3 = 102', '34 × 20 = 680', '102 + 680 = 782'])}<p class="hint" style="text-align:center;margin:0 0 10px;">Le résultat, 782, s'appelle le <b>produit</b>.</p>

<div class="lesson-header"><span class="num">5</span><h3>La division euclidienne posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On prend les chiffres du dividende un par un (en partant de la gauche), et on cherche à chaque étape combien de fois le diviseur y « rentre ». On écrit ce nombre de fois au quotient, on soustrait, et on abaisse le chiffre suivant du dividende.</div>
<p class="example-title">Exemple : 587 ÷ 9</p>
${divisionPoseeHTML(computeDivisionPosee(587,9))}

<div class="lesson-header"><span class="num">6</span><h3>Multiples et diviseurs</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.9;">
    <li>Un nombre entier est un <b>multiple</b> d'un autre nombre entier s'il est dans sa table de multiplication (ou son prolongement).<br>
    <span class="hint" style="margin:0;">Exemple : 42 est un multiple de 7 car il est dans la table de 7. En effet : 42 = 6 × 7.</span></li>
    <li>Un nombre entier est un <b>diviseur</b> d'un autre nombre entier si la division euclidienne du deuxième par le premier a un reste nul.<br>
    <span class="hint" style="margin:0;">Exemple : 7 est un diviseur de 42 car le reste de la division de 42 par 7 vaut 0. On dit aussi que 42 est <b>divisible</b> par 7.</span></li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  « 42 est un multiple de 7 » et « 7 est un diviseur de 42 » décrivent le <b>même</b> fait, vu de deux côtés différents !
</div>
${ce2AnimSauts('cm1-op-multiples', { legende: 'Les multiples de 7 : on avance de 7 en 7 à partir de 0.', presets: [{ nom: 'Multiples de 7', depart: 0, sauts: [[7, '+ 7'], [7, '+ 7'], [7, '+ 7'], [7, '+ 7'], [7, '+ 7'], [7, '+ 7']], min: 0, max: 48, fin: '0, 7, 14, 21, 28, 35, 42 : 42 est un multiple de 7, car 42 = 6 × 7.' }, { nom: 'Multiples de 6 et 56', depart: 0, sauts: [[6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6']], min: 0, max: 64, fin: 'On passe par 54, puis par 60 : on ne tombe jamais sur 56. 56 n\'est pas un multiple de 6.' }] })}

<div class="lesson-header"><span class="num">7</span><h3>Critères de divisibilité</h3></div>
<span class="prop-badge">Règles</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.9;">
    <li>Un nombre entier est <b>divisible par 2</b> (on dit qu'il est <b>pair</b>) si son chiffre des unités est 0, 2, 4, 6 ou 8.<br><span class="hint" style="margin:0;">Exemple : 116 est divisible par 2 car son chiffre des unités est 6.</span></li>
    <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.<br><span class="hint" style="margin:0;">Exemple : 115 est divisible par 5 car son chiffre des unités est 5.</span></li>
    <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.<br><span class="hint" style="margin:0;">Exemple : 110 est divisible par 10 car son chiffre des unités est 0.</span></li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Ces critères permettent de savoir si un nombre est divisible <b>sans avoir besoin de poser la division</b> -- il suffit de regarder son dernier chiffre !
</div>
`;

document.getElementById('methode-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Comment poser une addition avec retenue ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">356 + 178 : clique sur « Étape suivante » pour dérouler le calcul, colonne par colonne.</p>
  <div class="step-display" id="cm1op-additionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opAdditionDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opAdditionDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment poser une soustraction par compensation ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">623 − 148 : clique sur « Étape suivante » pour découvrir comment fonctionne la compensation.</p>
  <div class="step-display" id="cm1op-soustractionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opSoustractionDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opSoustractionDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment poser une multiplication ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">34 × 23 : clique sur « Étape suivante » pour voir apparaître les deux résultats intermédiaires, puis leur somme.</p>
  <div class="step-display" id="cm1op-multiplicationDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opMultiplicationDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opMultiplicationDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment poser une division euclidienne ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">587 ÷ 9 : clique sur « Étape suivante » pour dérouler la division, chiffre par chiffre.</p>
  <div id="cm1op-divisionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opDivisionNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opDivisionReset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Poser et effectuer une division euclidienne »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">438 ÷ 6</span><span class="we-comment">Je pose la division : 438 est le dividende, 6 est le diviseur.</span></div>
    <div class="we-row"><span class="we-expr">438 = 6 × 73 + 0</span><span class="we-comment">Je vérifie : 6 × 73 = 438, et le reste (0) est bien inférieur à 6.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Un cinéma a accueilli 467 spectateurs samedi et 385 dimanche. Combien de spectateurs a-t-il accueillis pendant le week-end ?
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-1">
      ${cm1Redac('Nombre de spectateurs', { pose: cm1opRowsTable([{cells:['1','1',''], small:true}, {cells:['4','6','7']}, {cells:['3','8','5'], sign:'+', bar:true}, {cells:['8','5','2'], color:'var(--accent-orange)', big:true}]) }, 'Le cinéma a accueilli 852 spectateurs pendant le week-end.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Un livre a 542 pages. Lina en a déjà lu 267. Combien de pages lui reste-t-il à lire ?
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-2">
      ${cm1Redac('Pages restantes', { pose: cm1opRowsTable([{cells:['','+10','+10'], small:true}, {cells:['5','4','2']}, {cells:[cm1opCompPrefix('2'), cm1opCompPrefix('6'), '7'], sign:'−', bar:true}, {cells:['2','7','5'], color:'var(--accent-orange)', big:true}]) }, 'Il reste 275 pages à lire à Lina.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un carton contient 213 crayons. Combien de crayons y a-t-il dans 4 cartons ?
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-3">
      ${cm1Redac('Nombre de crayons', { pose: cm1opRowsTable([{cells:['2','1','3']}, {cells:['','','4'], sign:'×', bar:true}, {cells:['8','5','2'], color:'var(--accent-orange)', big:true}]) }, 'Il y a 852 crayons dans 4 cartons.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    On range 438 œufs dans des boîtes de 6. Combien de boîtes remplit-on ? Vérifie ton résultat.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-4">
      ${cm1Redac('Nombre de boîtes', { pose: divisionPoseeHTML(computeDivisionPosee(438, 6)) }, 'Le quotient est 73 et le reste est 0 : on remplit 73 boîtes.') + cm1Redac('Vérification', '6 × 73 = 438', 'On retrouve bien 438 œufs : le résultat est juste.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Cite 5 multiples de 6. Le nombre 56 est-il un multiple de 6 ? Justifie.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-5">
      ${cm1Redac('Cinq multiples de 6', { suite: ['6 × 1 = 6', '6 × 2 = 12', '6 × 3 = 18', '6 × 4 = 24', '6 × 5 = 30'] }, '6, 12, 18, 24 et 30 sont des multiples de 6.') + cm1Redac('56 est-il un multiple de 6 ?', { suite: ['6 × 9 = 54', '6 × 10 = 60', '56 = 6 × 9 + 2'] }, 'Le reste de la division de 56 par 6 est 2, pas 0 : 56 n\'est pas un multiple de 6.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 6</div>
    Parmi ces nombres, lesquels sont divisibles par 2 ? par 5 ? par 10 ?${cm1Liste(['340', '125', '612', '1 000', '87'])}
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-6" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-6">
      ${cm1Redac('Divisibles par 2', 'Chiffre des unités 0, 2, 4, 6 ou 8.', '340, 612 et 1 000 sont divisibles par 2.') + cm1Redac('Divisibles par 5', 'Chiffre des unités 0 ou 5.', '340, 125 et 1 000 sont divisibles par 5.') + cm1Redac('Divisibles par 10', 'Chiffre des unités 0.', '340 et 1 000 sont divisibles par 10. 87 n\'est divisible ni par 2, ni par 5, ni par 10.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Entraînement libre</div>
    <h4 style="margin:0 0 6px;">Exerce-toi : division euclidienne</h4>
    <p class="hint" style="margin:0 0 10px;">Indique un dividende et un diviseur (les tiens, ou au hasard) : la division posée se calcule automatiquement.</p>
    <div data-role="cm1op-div-prac-widget">
      <div class="tool-row" style="margin-bottom:10px;">
        <input type="number" data-role="cm1op-div-prac-dividende" placeholder="Dividende (ex. 587)" style="width:160px;">
        <input type="number" data-role="cm1op-div-prac-diviseur" placeholder="Diviseur (ex. 9)" style="width:160px;">
        <button type="button" class="btn secondary" onclick="cm1opGenerateDivPractice(this)"><span class="gicon">casino</span> Nombres au hasard</button>
        <button type="button" class="btn" onclick="cm1opUpdateDivPractice(this)">Calculer</button>
      </div>
      <div data-role="cm1op-div-prac-area"></div>
      <label class="hint" style="display:block;margin:10px 0 0;"><input type="checkbox" data-role="cm1op-div-prac-step"> Afficher le détail étape par étape (plutôt que le résultat final seul)</label>
      <label class="hint" style="display:block;margin:6px 0 0;"><input type="checkbox" data-role="cm1op-div-prac-diff" checked onchange="cm1opUpdateDivPractice(this)"> Afficher les différences (détail des soustractions -- décochez pour ne garder que les restes successifs)</label>
      <label class="hint" style="display:block;margin:6px 0 0;"><input type="checkbox" data-role="cm1op-div-prac-vierge"> N'afficher que le dividende et le diviseur (à compléter toi-même sur ton cahier)</label>
    </div>
  </div>
</div>
`;

document.getElementById('histoire-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : d'où viennent les signes +, −, × et ÷ ?</div>
  Les quatre signes que tu utilises tous les jours en calcul n'ont pas toujours existé ! Pendant très longtemps, on écrivait les opérations en toutes lettres, ce qui prenait beaucoup de place et rendait les calculs difficiles à lire.<br><br>
  Les signes <b>+</b> et <b>−</b> apparaissent pour la première fois dans des documents de marchands allemands, à la fin du XVe siècle : le <b>+</b> (qui vient du mot latin « et », signifiant « et ») servait à noter un surplus de marchandises, et le <b>−</b> un manque. Un mathématicien allemand, Johannes Widmann, les utilise dans un livre imprimé en 1489 -- c'est l'une des toutes premières fois qu'on les voit sous cette forme.<br><br>
  Le signe <b>×</b> a été inventé bien plus tard, en 1631, par un mathématicien anglais nommé William Oughtred : une croix inclinée, facile à distinguer de la lettre « x ». Le signe <b>÷</b> (deux points séparés par un trait, qu'on appelle un « obélus ») a été proposé encore plus tard, en 1659, par le mathématicien suisse Johann Rahn.<br><br>
  Quant au signe <b>=</b>, il a été inventé en 1557 par un mathématicien gallois, Robert Recorde, qui expliquait avoir choisi deux traits parallèles « parce que deux choses ne peuvent pas être plus égales » ! Grâce à tous ces signes, on peut aujourd'hui écrire un calcul en quelques symboles, là où il fallait autrefois une phrase entière.
</div>
`;

/* ---- Méthodes animées : addition, soustraction, multiplication (démos par étape, langage
   volontairement simple, public CM1) ---- */
const CM1OP_ADDITION_STEPS = [
  {expr: cm1opRowsTable([
      {cells:['','',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['','',''], color:'var(--accent-orange)', big:true},
    ]), note: "On pose l'addition : on aligne les nombres par colonnes -- unités sous unités, dizaines sous dizaines, centaines sous centaines."},
  {expr: cm1opRowsTable([
      {cells:['','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['','','4'], color:'var(--accent-orange)', big:true},
    ]), note: "Unités : 6 + 8 = 14. J'écris 4 au résultat et je retiens 1 dizaine (au-dessus de la colonne des dizaines)."},
  {expr: cm1opRowsTable([
      {cells:['1','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['','3','4'], color:'var(--accent-orange)', big:true},
    ]), note: "Dizaines : 1 (retenue) + 5 + 7 = 13. J'écris 3 et je retiens 1 centaine (au-dessus de la colonne des centaines)."},
  {expr: cm1opRowsTable([
      {cells:['1','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['5','3','4'], color:'var(--accent-orange)', big:true},
    ]), note: "Centaines : 1 (retenue) + 3 + 1 = 5. J'écris 5."},
  {expr: cm1opRowsTable([
      {cells:['1','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['5','3','4'], color:'var(--accent-orange)', big:true},
    ]), note: "356 + 178 = 534. Le résultat de l'addition s'appelle la somme."},
];
const cm1opAdditionDemo = makeSingleStepDemo(CM1OP_ADDITION_STEPS, 'cm1op-additionDisplay');

/* Méthode de compensation (plutôt que l'emprunt classique) : quand un chiffre du haut est plus
   petit que celui du bas, on ajoute 10 à ce chiffre du haut ET 1 au chiffre du bas de la colonne
   suivante -- comme on ajoute la même quantité aux deux nombres, la différence ne change pas.
   Ni le nombre du haut ni celui du bas ne sont jamais modifiés ou barrés : seule une petite
   annotation "+10" apparaît au-dessus du chiffre du haut (comme les retenues de l'addition), et
   "1+" en petit à gauche du chiffre du bas concerné, sur sa propre ligne. */
const CM1OP_SOUSTRACTION_STEPS = [
  {expr: cm1opRowsTable([
      {cells:['','',''], small:true},
      {cells:['6','2','3']},
      {cells:['1','4','8'], sign:'−', bar:true},
      {cells:['','',''], color:'var(--accent-orange)', big:true},
    ]), note: "On pose la soustraction : 623 (le nombre dont on part) au-dessus, 148 (le nombre qu'on enlève) en dessous, alignés par colonnes."},
  {expr: cm1opRowsTable([
      {cells:['','','+10'], small:true},
      {cells:['6','2','3']},
      {cells:['1', cm1opCompPrefix('4'), '8'], sign:'−', bar:true},
      {cells:['','','5'], color:'var(--accent-orange)', big:true},
    ]), note: "Unités : 3 − 8, impossible ! Je compense : j'ajoute 10 au chiffre des unités du haut (3 devient 13) ET j'ajoute 1 au chiffre des dizaines du bas (4 devient 5) -- la différence ne change pas. 13 − 8 = 5."},
  {expr: cm1opRowsTable([
      {cells:['','+10','+10'], small:true},
      {cells:['6','2','3']},
      {cells:[cm1opCompPrefix('1'), cm1opCompPrefix('4'), '8'], sign:'−', bar:true},
      {cells:['','7','5'], color:'var(--accent-orange)', big:true},
    ]), note: "Dizaines : 2 − 5 (le 4 compensé en 5), impossible ! Je compense encore : j'ajoute 10 au chiffre des dizaines du haut (2 devient 12) ET j'ajoute 1 au chiffre des centaines du bas (1 devient 2). 12 − 5 = 7."},
  {expr: cm1opRowsTable([
      {cells:['','+10','+10'], small:true},
      {cells:['6','2','3']},
      {cells:[cm1opCompPrefix('1'), cm1opCompPrefix('4'), '8'], sign:'−', bar:true},
      {cells:['4','7','5'], color:'var(--accent-orange)', big:true},
    ]), note: "Centaines : 6 − 2 (le 1 compensé en 2) = 4."},
  {expr: cm1opRowsTable([
      {cells:['','+10','+10'], small:true},
      {cells:['6','2','3']},
      {cells:[cm1opCompPrefix('1'), cm1opCompPrefix('4'), '8'], sign:'−', bar:true},
      {cells:['4','7','5'], color:'var(--accent-orange)', big:true},
    ]), note: "623 − 148 = 475. Le résultat de la soustraction s'appelle la différence."},
];
const cm1opSoustractionDemo = makeSingleStepDemo(CM1OP_SOUSTRACTION_STEPS, 'cm1op-soustractionDisplay');

const CM1OP_MULTIPLICATION_STEPS = [
  {expr: cm1opRowsTable([
      {cells:['','3','4'], label:'le nombre qu\'on multiplie'},
      {cells:['','2','3'], sign:'×', bar:true, label:'par combien on multiplie'},
    ]), note: "On pose la multiplication : 34 (le nombre qu'on multiplie) au-dessus, 23 (par combien on multiplie) en dessous."},
  {expr: cm1opRowsTable([
      {cells:['','3','4'], label:'le nombre qu\'on multiplie'},
      {cells:['','2','3'], sign:'×', bar:true, label:'par combien on multiplie'},
      {cells:['1','0','2'], color:'var(--accent-orange)', label:'← 34 × 3 (chiffre des unités de 23)'},
    ]), note: "On multiplie d'abord 34 par le chiffre des unités de 23, c'est-à-dire par 3 : 34 × 3 = 102. On écrit ce résultat sous le trait."},
  {expr: cm1opRowsTable([
      {cells:['','3','4'], label:'le nombre qu\'on multiplie'},
      {cells:['','2','3'], sign:'×', bar:true, label:'par combien on multiplie'},
      {cells:['1','0','2'], label:'← 34 × 3 (chiffre des unités de 23)'},
      {cells:['6','8','0'], color:'var(--accent-orange)', bar:true, label:'← 34 × 20 (chiffre des dizaines de 23)'},
    ]), note: "On multiplie ensuite 34 par le chiffre des dizaines de 23, c'est-à-dire par 20 (2 dizaines) : 34 × 20 = 680. On écrit ce second résultat juste en dessous, avec un trait pour préparer l'addition."},
  {expr: cm1opRowsTable([
      {cells:['','3','4'], label:'le nombre qu\'on multiplie'},
      {cells:['','2','3'], sign:'×', bar:true, label:'par combien on multiplie'},
      {cells:['1','0','2'], label:'← 34 × 3 (chiffre des unités de 23)'},
      {cells:['6','8','0'], bar:true, label:'← 34 × 20 (chiffre des dizaines de 23)'},
      {cells:['7','8','2'], color:'var(--accent-orange)', big:true, label:'← 102 + 680'},
    ]), note: "Il ne reste plus qu'à additionner les deux résultats : 102 + 680 = 782."},
  {expr: cm1opRowsTable([
      {cells:['','3','4'], label:'le nombre qu\'on multiplie'},
      {cells:['','2','3'], sign:'×', bar:true, label:'par combien on multiplie'},
      {cells:['1','0','2'], label:'← 34 × 3 (chiffre des unités de 23)'},
      {cells:['6','8','0'], bar:true, label:'← 34 × 20 (chiffre des dizaines de 23)'},
      {cells:['7','8','2'], color:'var(--accent-orange)', big:true, label:'← 102 + 680'},
    ]), note: "34 × 23 = 782. Le résultat de la multiplication s'appelle le produit."},
];
const cm1opMultiplicationDemo = makeSingleStepDemo(CM1OP_MULTIPLICATION_STEPS, 'cm1op-multiplicationDisplay');

/* ---- Méthode animée : division euclidienne (587 ÷ 9) -- réutilise directement le moteur
   existant (computeDivisionPosee/buildDivisionStages/dpRenderDivisionTable) au lieu de
   redévelopper une table pas à pas, même principe que les démos 823÷14 (6e) et 758÷12 (5e). */
const CM1OP_DIVISION_RES = computeDivisionPosee(587, 9);
const CM1OP_DIVISION_STAGES = buildDivisionStages(CM1OP_DIVISION_RES);
let cm1opDivisionIdx = 0;
function cm1opDivisionRender(){
  const st = CM1OP_DIVISION_STAGES[cm1opDivisionIdx];
  document.getElementById('cm1op-divisionDisplay').innerHTML = `${dpRenderDivisionTable(st.rows, st.quotient, CM1OP_DIVISION_RES.divisor)}<p class="hint" style="margin:8px 0 0;">${st.caption}</p>`;
}
function cm1opDivisionNext(){ if(cm1opDivisionIdx<CM1OP_DIVISION_STAGES.length-1) cm1opDivisionIdx++; cm1opDivisionRender(); }
function cm1opDivisionReset(){ cm1opDivisionIdx=0; cm1opDivisionRender(); }

/* ---- Exerce-toi : division euclidienne (dividende/diviseur au choix ou au hasard) -- même
   outil que celui du prof (previewDivisionPosee, outils-figures.js) et que les widgets
   équivalents en 6e/5e, avec les mêmes options (étape par étape, différences, vierge). Scopé via
   un wrapper dédié (data-role) plutôt que .exo-card ou des id fixes -- voir le fix "résultat
   invisible en mode zoom" (build 580, 6e/5e) : la loupe plein écran ne clone que le CONTENU
   d'une carte, jamais son enveloppe .exo-card, donc closest('.exo-card') échouerait une fois
   zoomé. Nombres plus petits qu'en 6e/5e (public CM1). */
function cm1opGenerateDivPractice(btn){
  const wrap = btn.closest('[data-role="cm1op-div-prac-widget"]');
  wrap.querySelector('[data-role="cm1op-div-prac-dividende"]').value = Math.floor(Math.random()*400)+100; // 100-499
  wrap.querySelector('[data-role="cm1op-div-prac-diviseur"]').value = Math.floor(Math.random()*8)+2; // 2-9
  cm1opUpdateDivPractice(btn);
}
function cm1opUpdateDivPractice(el){
  const wrap = el.closest('[data-role="cm1op-div-prac-widget"]');
  const a = parseInt(wrap.querySelector('[data-role="cm1op-div-prac-dividende"]').value);
  const b = parseInt(wrap.querySelector('[data-role="cm1op-div-prac-diviseur"]').value);
  const area = wrap.querySelector('[data-role="cm1op-div-prac-area"]');
  const res = computeDivisionPosee(a,b);
  if(!res){ area.innerHTML = divisionPoseeHTML(null); return; }
  const stepByStep = wrap.querySelector('[data-role="cm1op-div-prac-step"]').checked;
  const vierge = wrap.querySelector('[data-role="cm1op-div-prac-vierge"]').checked;
  const showDiff = wrap.querySelector('[data-role="cm1op-div-prac-diff"]').checked;
  area.innerHTML = (stepByStep && !vierge) ? divisionStagesHTML(buildDivisionStages(res), res) : divisionPoseeHTML(res, vierge, showDiff);
}

DEMO_QUIZZES['cm1|Opérations sur les nombres entiers'] = [
  {q:"Dans l'addition 356 + 178, à l'étape des unités, 6 + 8 = 14. Que fait-on ?",
   opts:["On écrit 14 tel quel au résultat","On écrit 4 et on retient 1 dizaine","On écrit 1 et on retient 4"], correct:1},
  {q:"56 est-il un multiple de 6 ?",
   opts:["Oui, 56 = 6 × 9 exactement","Non, la division de 56 par 6 n'a pas un reste nul","Oui, car 5 + 6 = 11 est divisible par 6"], correct:1},
  {q:"Le nombre 340 est-il divisible par 10 ?",
   opts:["Oui, car son chiffre des unités est 0","Non, car il n'est pas dans la table de 10","Oui, car il est pair"], correct:0},
];

// Opération posée animée sur les nombres de l'élève (chapitres/cm1/_anims.js).
document.getElementById('methode-demo-cm1-operations-nombres-entiers').insertAdjacentHTML('beforeend', `<div class="sub-header"><span class="letter">M</span><h4>À toi : une opération posée, pas à pas</h4></div>${cm1AnimOperation('cm1-op-ent', { a: '623', op: '−', b: '148', ops: ['+', '−', '×'] })}`);
DEMO_REGISTRY['cm1|Opérations sur les nombres entiers'] = { cours:'cours-demo-cm1-operations-nombres-entiers', methode:'methode-demo-cm1-operations-nombres-entiers', exos:'exos-demo-cm1-operations-nombres-entiers', histoire:'histoire-demo-cm1-operations-nombres-entiers',
  init:()=>{ cm1opAdditionDemo.reset(); cm1opSoustractionDemo.reset(); cm1opMultiplicationDemo.reset(); cm1opDivisionReset(); cmAnimDessiner('cm1-op-ent'); cmAnimDessiner('cm1-op-multiples'); } };

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const pose = (a, op, b, res, ret, o) => cm1Posee([[' ', a], [op, b], [' ', res == null ? ' '.repeat(Math.max(a.length, b.length) + 1) : res]], ret, o);
// Version écran : l'opération est posée, le résultat se remplit case par case (planches-num.js).
const ecr = l => ({ ecran: { eleve: duo(l.map(([a, op, b, r]) => pose(a, op, b, r, '', { trous: true }))), corr: duo(l.map(([a, op, b, r]) => pose(a, op, b, r, '', { rep: true }))) } });
const ecrL = (l, res) => ({ eleve: duo([cm1Posee(l.concat([[' ', res]]), '', { trous: true })]), corr: duo([cm1Posee(l.concat([[' ', res]]), '', { rep: true })]) });
const grille = (l, h) => cm1Quad(l || 9, h || 6, [], { k: 17, largeur: (l || 9) * 17 });
const div = (a, b, vierge) => typeof divisionPoseeHTML === 'function' ? `<div class="pl-div">${divisionPoseeHTML(computeDivisionPosee(a, b), vierge)}</div>` : '';
const col = (h, ...l) => `<span style="display:flex;flex-direction:column;align-items:center;font-size:.85em;">${h}${l.map(t => `<span>${t}</span>`).join('')}</span>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
PLANCHES['cm1|Opérations sur les nombres entiers'] = [
  { titre: 'Addition et soustraction posées', duree: '35 min',
    attendus: ['Connaître le vocabulaire : somme, différence, produit, quotient', 'Poser et calculer une addition et une soustraction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec le bon mot.',
        eleve: plListe(['Le résultat d\'une addition est la ' + B(8) + '.', 'Le résultat d\'une soustraction est la ' + B(8) + '.', 'Le résultat d\'une multiplication est le ' + B(8) + '.']),
        corr: plListe(['Le résultat d\'une addition est la ' + R('somme') + '.', 'Le résultat d\'une soustraction est la ' + R('différence') + '.', 'Le résultat d\'une multiplication est le ' + R('produit') + '.']) },
      { etoiles: 1, col: 1, consigne: 'Complète pour arriver au nombre rond.',
        eleve: plListe(['3 500 + ' + B() + ' = 4 000', '1 250 + ' + B() + ' = 2 000', '6 000 − ' + B() + ' = 5 700', '980 + ' + B() + ' = 1 000']),
        corr: plListe(['3 500 + ' + R(500) + ' = 4 000', '1 250 + ' + R(750) + ' = 2 000', '6 000 − ' + R(300) + ' = 5 700', '980 + ' + R(20) + ' = 1 000']) },
      { etoiles: 1, col: 1, consigne: 'Calcule ces additions.',
        eleve: duo([pose('2457', '+', '1386'), pose('3608', '+', '975')]),
        corr: duo([pose('2457', '+', '1386', '3843', ' 11 '), pose('3608', '+', '975', '4583', '1 1 ')]), ...ecr([['2457', '+', '1386', '3843'], ['3608', '+', '975', '4583']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule ces soustractions.',
        eleve: duo([pose('5342', '−', '1718'), pose('7005', '−', '2468')]),
        corr: duo([pose('5342', '−', '1718', '3624'), pose('7005', '−', '2468', '4537')]), ...ecr([['5342', '−', '1718', '3624'], ['7005', '−', '2468', '4537']]) },
      { etoiles: 2, consigne: 'Pose et calcule dans le quadrillage.',
        eleve: duo(['<span style="text-align:center;">4 827 + 3 095<br>' + grille() + '</span>', '<span style="text-align:center;">6 250 − 3 784<br>' + grille() + '</span>', '<span style="text-align:center;">1 096 + 2 768 + 405<br>' + grille() + '</span>']),
        corr: duo([pose('4827', '+', '3095', '7922', '11 1 '), pose('6250', '−', '3784', '2466'), cm1Posee([[' ', '1096'], ['+', '2768'], ['+', '405'], [' ', '4269']], ' 112 ')]),
        ecran: { eleve: duo([pose('4827', '+', '3095', '7922', '', { trous: true }), pose('6250', '−', '3784', '2466', '', { trous: true }), cm1Posee([[' ', '1096'], ['+', '2768'], ['+', '405'], [' ', '4269']], '', { trous: true })]),
          corr: duo([pose('4827', '+', '3095', '7922', '', { rep: true }), pose('6250', '−', '3784', '2466', '', { rep: true }), cm1Posee([[' ', '1096'], ['+', '2768'], ['+', '405'], [' ', '4269']], '', { rep: true })]) } },
      { etoiles: 2, col: 1, cahier: true, consigne: 'La bibliothèque de l\'école a 1 245 livres. Elle en achète 378. Combien de livres a-t-elle maintenant ?',
        corr: cm1Redac('Nombre de livres', '1 245 + 378 = 1 623', 'La bibliothèque a maintenant 1 623 livres.', cm1Paquets([[1245, '1 245'], [378, '378']], { titre: '?', L: 300 })) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une salle de spectacle a 2 500 places. 1 868 spectateurs sont assis. Combien de places sont libres ?',
        corr: cm1Redac('Places libres', '2 500 − 1 868 = 632', 'Il reste 632 places libres.', cm1Paquets([[1868, '1 868'], [632, '?']], { titre: '2 500', L: 300 })) },
    ] },
  { titre: 'La multiplication posée', duree: '35 min',
    attendus: ['Connaître les tables de multiplication', 'Multiplier par 10, 100, 1 000', 'Poser et calculer une multiplication'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe(['7 × 8 = ' + B(3), '6 × 9 = ' + B(3), '8 × 4 = ' + B(3), '9 × 7 = ' + B(3), '6 × 6 = ' + B(3)]),
        corr: plListe(['7 × 8 = ' + R(56), '6 × 9 = ' + R(54), '8 × 4 = ' + R(32), '9 × 7 = ' + R(63), '6 × 6 = ' + R(36)]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe(['34 × 10 = ' + B(), '34 × 100 = ' + B(), '250 × 10 = ' + B(), '7 × 1 000 = ' + B(), '60 × 100 = ' + B()]),
        corr: plListe(['34 × 10 = ' + R(340), '34 × 100 = ' + R('3 400'), '250 × 10 = ' + R('2 500'), '7 × 1 000 = ' + R('7 000'), '60 × 100 = ' + R('6 000')]) },
      { etoiles: 2, col: 1, consigne: 'Calcule ces multiplications.',
        eleve: duo([pose('1237', '×', '4'), pose('2506', '×', '3')]),
        corr: duo([pose('1237', '×', '4', '4948'), pose('2506', '×', '3', '7518')]), ...ecr([['1237', '×', '4', '4948'], ['2506', '×', '3', '7518']]) },
      { etoiles: 2, col: 1, consigne: 'Décompose pour calculer de tête.',
        eleve: plListe(['23 × 4 = (20 × 4) + (3 × 4) = ' + B(3) + ' + ' + B(3) + ' = ' + B(3), '45 × 3 = (40 × 3) + (5 × 3) = ' + B(3) + ' + ' + B(3) + ' = ' + B(3)]),
        corr: plListe(['23 × 4 = (20 × 4) + (3 × 4) = ' + R(80) + ' + ' + R(12) + ' = ' + R(92), '45 × 3 = (40 × 3) + (5 × 3) = ' + R(120) + ' + ' + R(15) + ' = ' + R(135)]) },
      { etoiles: 3, consigne: 'Pose et calcule dans le quadrillage. Écris à côté de chaque ligne ce qu\'elle représente.',
        eleve: duo(['<span style="text-align:center;">253 × 24<br>' + cm1Quad(9, 7, [], { k: 17, largeur: 155 }) + '</span>', '<span style="text-align:center;">312 × 15<br>' + cm1Quad(9, 7, [], { k: 17, largeur: 155 }) + '</span>', '<span style="text-align:center;">1 408 × 6<br>' + grille() + '</span>']),
        corr: duo([col(cm1Posee([[' ', '253'], ['×', '24'], [' ', '1012', true], ['+', '5060'], [' ', '6072']]), '1 012 = 253 × 4', '5 060 = 253 × 20'),
          col(cm1Posee([[' ', '312'], ['×', '15'], [' ', '1560', true], ['+', '3120'], [' ', '4680']]), '1 560 = 312 × 5', '3 120 = 312 × 10'),
          col(pose('1408', '×', '6', '8448'))]),
        ecran: { eleve: duo([cm1Posee([[' ', '253'], ['×', '24'], [' ', '1012', true], ['+', '5060'], [' ', '6072']], '', { trous: true }), cm1Posee([[' ', '312'], ['×', '15'], [' ', '1560', true], ['+', '3120'], [' ', '4680']], '', { trous: true }), pose('1408', '×', '6', '8448', '', { trous: true })]),
          corr: duo([cm1Posee([[' ', '253'], ['×', '24'], [' ', '1012', true], ['+', '5060'], [' ', '6072']], '', { rep: true }), cm1Posee([[' ', '312'], ['×', '15'], [' ', '1560', true], ['+', '3120'], [' ', '4680']], '', { rep: true }), pose('1408', '×', '6', '8448', '', { rep: true })]) } },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une boîte contient 24 crayons. Combien de crayons y a-t-il dans 15 boîtes ?',
        corr: cm1Redac('Nombre de crayons', '24 × 15 = 360', 'Il y a 360 crayons dans 15 boîtes.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un car a 48 places. L\'école loue 6 cars pour transporter 275 élèves. Y a-t-il assez de places ? Combien en reste-t-il de libres ?',
        corr: cm1Redac('Nombre de places', '48 × 6 = 288', '288 places, c\'est plus que 275 élèves : il y a assez de places.')
          + cm1Redac('Places libres', '288 − 275 = 13', 'Il reste 13 places libres.') },
    ] },
  { titre: 'Division, multiples et diviseurs', duree: '40 min',
    attendus: ['Poser et calculer une division euclidienne', 'Reconnaître des multiples et des diviseurs', 'Utiliser les critères de divisibilité par 2, 5 et 10'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec les tables.',
        eleve: plListe(['Dans 42, combien de fois 6 ? ' + B(2), 'Dans 45, combien de fois 9 ? ' + B(2), 'Dans 30, combien de fois 7 ? ' + B(2) + ' reste ' + B(2), 'Dans 50, combien de fois 8 ? ' + B(2) + ' reste ' + B(2)]),
        corr: plListe(['Dans 42, combien de fois 6 ? ' + R(7), 'Dans 45, combien de fois 9 ? ' + R(5), 'Dans 30, combien de fois 7 ? ' + R(4) + ' reste ' + R(2), 'Dans 50, combien de fois 8 ? ' + R(6) + ' reste ' + R(2)]) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        eleve: plListe(['35 est un multiple de 5. <b>vrai · faux</b>', '6 est un diviseur de 24. <b>vrai · faux</b>', '48 est divisible par 10. <b>vrai · faux</b>', '72 est un multiple de 8. <b>vrai · faux</b>']),
        corr: plListe([['35 est un multiple de 5. ', 'vrai'], ['6 est un diviseur de 24. ', 'vrai'], ['48 est divisible par 10. ', 'faux'], ['72 est un multiple de 8. ', 'vrai']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 2, consigne: 'Pose et calcule ces divisions. Écris le quotient et le reste.',
        eleve: duo([`<span style="text-align:center;">857 ÷ 6<br>${grille(10, 8)}<br>quotient : ${B(3)} reste : ${B(2)}</span>`, `<span style="text-align:center;">639 ÷ 4<br>${grille(10, 8)}<br>quotient : ${B(3)} reste : ${B(2)}</span>`, `<span style="text-align:center;">1 250 ÷ 7<br>${grille(10, 8)}<br>quotient : ${B(3)} reste : ${B(2)}</span>`]),
        corr: duo([`<span style="text-align:center;">${div(857, 6)}quotient : ${R(142)} reste : ${R(5)}</span>`, `<span style="text-align:center;">${div(639, 4)}quotient : ${R(159)} reste : ${R(3)}</span>`, `<span style="text-align:center;">${div(1250, 7)}quotient : ${R(178)} reste : ${R(4)}</span>`]),
        // À l'écran : la potence à compléter case par case (avec les soustractions, puis sans).
        ecran: { eleve: duo([[857, 6, 1], [639, 4, 1], [1250, 7, 0]].map(([a, d, df]) => `<span style="text-align:center;">${plDivision(a, d, { mode: 'trous', diff: !!df })}<br>quotient : ${B(3)} reste : ${B(2)}</span>`)),
          corr: duo([[857, 6, 1, 142, 5], [639, 4, 1, 159, 3], [1250, 7, 0, 178, 4]].map(([a, d, df, q, r]) => `<span style="text-align:center;">${plDivision(a, d, { mode: 'rep', diff: !!df })}<br>quotient : ${R(q)} reste : ${R(r)}</span>`)) } },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles par 2.',
        eleve: plGrille(['38', '75', '120', '403', '96', '1 001'], 3),
        corr: plGrille(['38', '75', '120', '403', '96', '1 001'].map(n => /[02468]$/.test(n) ? plEntoure(n) : n), 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles par 5.',
        eleve: plGrille(['45', '52', '300', '1 205', '78', '990'], 3),
        corr: plGrille(['45', '52', '300', '1 205', '78', '990'].map(n => /[05]$/.test(n) ? plEntoure(n) : n), 3) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'On range 150 œufs dans des boîtes de 6. Combien de boîtes remplit-on ?',
        corr: cm1Redac('Nombre de boîtes', '150 = (6 × 25) + 0', 'On remplit 25 boîtes, et il ne reste aucun œuf.') },
      { etoiles: 3, col: 1, cahier: true, consigne: '93 élèves partent en sortie. On fait des équipes de 8. Combien d\'équipes complètes ? Combien d\'élèves restent ?',
        corr: cm1Redac('Division de 93 par 8', '93 = (8 × 11) + 5', 'On fait 11 équipes complètes de 8 élèves, et 5 élèves restent : ils forment une petite équipe en plus.') },
    ] },
];
})();
