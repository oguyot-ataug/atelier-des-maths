/* ============================================================
   CHAPITRE : Grands nombres jusqu'à 999 999 (CM1, N6, période 3)
   Programme du cycle 3 : les nombres de 5 ou 6 chiffres ne sont abordés qu'à partir de la période 3
   (le chapitre N1 se limite à 9 999). Contenu repris de l'ancien N1.
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Premier cours du niveau CM1 : lecture/écriture, décomposition, chiffre des/nombre de,
   comparaison et rangement des nombres entiers jusqu'à 999 999 (2 classes : milliers et
   unités -- la classe des millions arrive dans un chapitre ultérieur, cohérent avec le
   sommaire du programme).
   ============================================================ */
cm1Conteneurs('grands-nombres');
document.getElementById('cours-demo-cm1-grands-nombres').innerHTML = `
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Rappel : en début d'année, on a travaillé avec les nombres jusqu'à 9 999 (chapitre « Nombres entiers jusqu'à 9 999 »). On découvre maintenant deux nouveaux rangs : les <b>dizaines de mille</b> et les <b>centaines de mille</b>.</div>
<div class="lesson-header"><span class="num">1</span><h3>Lire et écrire un grand nombre</h3></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.8;">
    <li>Un <b>chiffre</b> est l'un des dix symboles 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.</li>
    <li>Un <b>nombre</b> s'écrit avec un ou plusieurs chiffres, assemblés dans un certain ordre.</li>
  </ul>
</div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour lire facilement un grand nombre, on le sépare en <b>tranches de trois chiffres</b>, en partant de la droite. Chaque tranche s'appelle une <b>classe</b>.</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Astuce : forme des paquets de 3 chiffres en partant de la <b>droite</b> du nombre -- le dernier paquet, tout à gauche, peut avoir moins de 3 chiffres.
</div>
<p class="example-title">Exemple : 724916 s'écrit 724 916.</p>
<p class="hint" style="margin:10px 0 6px;">On peut s'aider d'un tableau de numération :</p>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.85rem;margin:0 0 16px;">
  <tr>
    <th colspan="3" style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des mille</th>
    <th colspan="3" style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des unités</th>
  </tr>
  <tr>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">U</th>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">7</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">2</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">4</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">9</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">1</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">6</td>
  </tr>
</table>
</div>
<ul class="example-list">
  <li>Ce nombre se lit : <b>sept-cent-vingt-quatre-mille-neuf-cent-seize</b>.</li>
  <li>On l'écrit avec un petit espace entre chaque classe : 724 916 (jamais de point ni de virgule).</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Décomposer un nombre</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Décomposer un nombre, c'est l'écrire comme une <b>somme</b> qui montre la valeur de chaque chiffre selon sa position.</div>
<p class="example-title">Reprenons 724 916 :</p>
<ul class="example-list">
  <li>Décomposition par classes :<br>
    724 916 = <b>724</b> mille + <b>916</b> unités
  </li>
  <li>Décomposition complète (addition) :<br>
    724 916 = 700 000 + 20 000 + 4 000 + 900 + 10 + 6
  </li>
  <li>Décomposition multiplicative :<br>
    724 916 = (7 × 100 000) + (2 × 10 000) + (4 × 1 000) + (9 × 100) + (1 × 10) + (6 × 1)
  </li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>« Le chiffre des... » et « le nombre de... »</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  <b>Le chiffre des</b> unités (ou dizaines, centaines...) est le seul chiffre situé à cette position.<br>
  <b>Le nombre de</b> dizaines (ou centaines, mille...) compte combien de fois cette unité est contenue en entier dans le nombre -- on « efface » mentalement les chiffres à sa droite.
</div>
<p class="example-title">Toujours avec 724 916 :</p>
<ul class="example-list">
  <li>7 est le chiffre des centaines de mille &nbsp;·&nbsp; 2 est le chiffre des dizaines de mille &nbsp;·&nbsp; 4 est le chiffre des unités de mille</li>
  <li>9 est le chiffre des centaines &nbsp;·&nbsp; 1 est le chiffre des dizaines &nbsp;·&nbsp; 6 est le chiffre des unités</li>
  <li>Le <b>nombre de centaines</b> de 724 916 est <b>7 249</b> (on efface les 2 derniers chiffres, 1 et 6).</li>
  <li>Le <b>nombre de mille</b> de 724 916 est <b>724</b>.</li>
</ul>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Attention à ne pas confondre : le <b>chiffre</b> des mille de 724 916 est 4, alors que le <b>nombre</b> de mille est 724 !
</div>

<div class="lesson-header"><span class="num">4</span><h3>Comparer deux nombres</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  Pour comparer deux nombres entiers, on compare d'abord leur <b>nombre de chiffres</b> : celui qui en a le plus est le plus grand.<br>
  S'ils ont le même nombre de chiffres, on compare les chiffres un par un, en partant de la <b>gauche</b>.
</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>52 480 < 137 026 &nbsp;<span class="hint" style="margin:0;">(52 480 a 5 chiffres, 137 026 en a 6 : il est donc plus grand)</span></li>
  <li>384 250 > 384 097 &nbsp;<span class="hint" style="margin:0;">(mêmes centaines de mille, dizaines de mille et unités de mille : 384 -- on compare ensuite 250 et 097, et 250 > 097)</span></li>
</ul>
<div class="def-box" style="margin-top:12px;">
  <b>a &lt; b</b> se lit « a est <b>plus petit que</b> b », ou « a est <b>inférieur à</b> b ».<br>
  <b>a &gt; b</b> se lit « a est <b>plus grand que</b> b », ou « a est <b>supérieur à</b> b ».
</div>

<div class="lesson-header"><span class="num">5</span><h3>Ranger des nombres</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  Ranger des nombres dans l'<b>ordre croissant</b>, c'est les ranger du plus petit au plus grand.<br>
  Ranger des nombres dans l'<b>ordre décroissant</b>, c'est les ranger du plus grand au plus petit.
</div>
<p class="example-title">Range dans l'ordre croissant : 45 610 ; 6 980 ; 45 106 ; 128 400.</p>
<p style="margin:6px 0 0;font-family:'JetBrains Mono',monospace;">6 980 &lt; 45 106 &lt; 45 610 &lt; 128 400</p>
${ce2AnimSauts('cm1-gn-sauts', { legende: 'Les grands nombres sur une droite : on avance de 10 000 en 10 000, puis on franchit 100 000.', presets: [
  { nom: 'De 10 000 en 10 000', depart: 60000, sauts: [[10000, '+ 10 000'], [10000, '+ 10 000'], [10000, '+ 10 000'], [10000, '+ 10 000']], min: 55000, max: 105000, fin: '60 000, 70 000, 80 000, 90 000, <b>100 000</b> : 10 dizaines de mille font une centaine de mille.' },
  { nom: 'Après 99 999', depart: 99997, sauts: [[1, '+ 1'], [1, '+ 1'], [1, '+ 1']], min: 99995, max: 100002, fin: '99 999 + 1 = <b>100 000</b> (cent-mille) : le nombre passe à 6 chiffres.' }] })}
`;

document.getElementById('methode-demo-cm1-grands-nombres').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Comment lire un grand nombre ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Clique sur « Étape suivante » pour découvrir comment lire 517 328, petit bout par petit bout.</p>
  <div class="step-display" id="cm1gn-lireDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1gnLireDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1gnLireDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment comparer deux nombres ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Entre 68 450 et 68 540, lequel est le plus grand ? Clique sur « Étape suivante » pour le découvrir.</p>
  <div class="step-display" id="cm1gn-comparerDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1gnComparerDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1gnComparerDemo.reset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-cm1-grands-nombres').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Décomposer un nombre »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">306 254</span><span class="we-comment">Je repère les deux tranches : 306 et 254.</span></div>
    <div class="we-row"><span class="we-expr">= 300 000 + 6 000 + 200 + 50 + 4</span><span class="we-comment">Je décompose selon la valeur de chaque chiffre.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Écris en chiffres le nombre : quatre-cent-douze-mille-sept-cent-trois.
    <button type="button" class="exo-correction-toggle" data-target="cm1gn-correction-1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1gn-correction-1">
      ${cm1Redac('Le nombre en chiffres', { suite: ['classe des mille : quatre-cent-douze, 412', 'classe des unités : sept-cent-trois, 703'] }, 'Le nombre s\'écrit 412 703.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Décompose le nombre 583 940 selon la valeur de chaque chiffre.
    <button type="button" class="exo-correction-toggle" data-target="cm1gn-correction-2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1gn-correction-2">
      ${cm1Redac('Décomposition de 583 940', '583 940 = 500 000 + 80 000 + 3 000 + 900 + 40', 'Chaque terme donne la valeur d\'un chiffre ; le 0 des unités ne donne rien.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Dans le nombre 271 806, quel est le chiffre des centaines ? Quel est le nombre de centaines ?
    <button type="button" class="exo-correction-toggle" data-target="cm1gn-correction-3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1gn-correction-3">
      ${cm1Redac('Chiffre des centaines', '271 <b>8</b>06 : le 3<sup>e</sup> chiffre en partant de la droite', 'Le chiffre des centaines de 271 806 est 8.') + cm1Redac('Nombre de centaines', '271 806 = 2 718 centaines et 6 unités', 'Le nombre de centaines de 271 806 est 2 718.')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Range dans l'ordre décroissant : 90 415 ; 9 999 ; 90 145 ; 104 200.
    <button type="button" class="exo-correction-toggle" data-target="cm1gn-correction-4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1gn-correction-4">
      ${cm1Redac('Ordre décroissant', '104 200 &gt; 90 415 &gt; 90 145 &gt; 9 999', 'Le plus grand nombre est 104 200 (6 chiffres) et le plus petit est 9 999 (4 chiffres).')}
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Attention au piège ! Compare 74 500 et 8 900 en expliquant ta méthode.
    <button type="button" class="exo-correction-toggle" data-target="cm1gn-correction-5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1gn-correction-5">
      ${cm1Redac('Comparaison', { suite: ['74 500 a 5 chiffres.', '8 900 a 4 chiffres.'] }, 'Donc 74 500 &gt; 8 900, même si 8 900 commence par un chiffre plus grand : on vérifie d\'abord le nombre de chiffres.')}
    </div>
  </div>
</div>
`;

document.getElementById('histoire-demo-cm1-grands-nombres').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : comment écrivait-on les nombres avant ?</div>
  On n'a pas toujours écrit les nombres comme aujourd'hui ! Il y a environ 5 000 ans, en Égypte ancienne, on dessinait un petit rond pour 1, un fer à cheval pour 10, une corde enroulée pour 100... Pour écrire un nombre, il fallait dessiner chaque symbole autant de fois que nécessaire : pour écrire 23, on dessinait 2 fers à cheval et 3 petits ronds. Ça marchait, mais pour de très grands nombres, il fallait dessiner énormément de symboles !<br><br>
  Plus tard, les Romains ont inventé leurs propres symboles : I pour 1, V pour 5, X pour 10, L pour 50, C pour 100... Tu as sans doute déjà vu ces lettres sur une horloge, ou pour écrire le nom d'un roi (Louis XIV, par exemple). Mais ce système restait compliqué : pour écrire 1 998, il fallait écrire MCMXCVIII !<br><br>
  Notre façon d'écrire les nombres aujourd'hui vient de l'Inde, il y a plus de 1 500 ans, puis a voyagé jusqu'en Europe grâce aux savants arabes -- c'est pour ça qu'on parle de « chiffres arabes ». Son astuce géniale : la <b>position</b> de chaque chiffre indique sa valeur (unités, dizaines, centaines...). Avec seulement 10 symboles (0 à 9), on peut écrire n'importe quel nombre, aussi grand soit-il, sans jamais avoir besoin d'en inventer de nouveaux !
</div>
`;

/* Méthodes animées, langage volontairement simple (public CM1). */
const CM1NE_LIRE_STEPS = [
  {expr:'517328', note:"On sépare le nombre en tranches de 3 chiffres, en partant de la droite."},
  {expr:'517 328', note:'On obtient deux tranches : 517 et 328.'},
  {expr:'<span class="hl">517</span> 328', note:'La tranche de gauche, c\'est la classe des mille : on dit « cinq-cent-dix-sept mille ».'},
  {expr:'517 <span class="hl">328</span>', note:'La tranche de droite, c\'est la classe des unités : on dit « trois-cent-vingt-huit ».'},
  {expr:'517 328', note:'On lit le nombre en entier : cinq-cent-dix-sept-mille-trois-cent-vingt-huit.'},
];
const cm1gnLireDemo = makeStepDemo(CM1NE_LIRE_STEPS, 'cm1gn-lireDisplay');

const CM1NE_COMPARER_STEPS = [
  {expr:'68 450   et   68 540', note:'On compte le nombre de chiffres de chaque nombre : 5 chiffres chacun. On continue.'},
  {expr:'<span class="hl">68</span> 450   et   <span class="hl">68</span> 540', note:'Les deux premiers chiffres sont identiques (6 et 8). On continue à comparer, chiffre par chiffre, vers la droite.'},
  {expr:'68 <span class="hl">4</span>50   et   68 <span class="hl">5</span>40', note:'Le chiffre suivant est différent : 4 et 5. Comme 4 est plus petit que 5, on peut déjà conclure.'},
  {expr:'68 450 < 68 540', note:'Donc 68 450 est plus petit que 68 540 !'},
];
const cm1gnComparerDemo = makeStepDemo(CM1NE_COMPARER_STEPS, 'cm1gn-comparerDisplay');

DEMO_QUIZZES['cm1|Grands nombres jusqu\'à 999 999'] = [
  {q:"Comment écrit-on en chiffres quatre-cent-douze-mille-sept-cent-trois ?",
   opts:["412 703","4 127 03","400 12 703"], correct:0},
  {q:"Dans le nombre 724 916, quel est le chiffre des centaines ?",
   opts:["7","9","6"], correct:1},
  {q:"Pour comparer deux nombres entiers, que doit-on regarder en premier ?",
   opts:["Le tout premier chiffre à gauche","Le nombre de chiffres","La couleur de l'écriture"], correct:1},
];

DEMO_REGISTRY['cm1|Grands nombres jusqu\'à 999 999'] = { cours:'cours-demo-cm1-grands-nombres', methode:'methode-demo-cm1-grands-nombres', exos:'exos-demo-cm1-grands-nombres', histoire:'histoire-demo-cm1-grands-nombres',
  init:()=>{ cm1gnLireDemo.reset(); cm1gnComparerDemo.reset(); cmAnimDessiner('cm1-gn-sauts'); } };

