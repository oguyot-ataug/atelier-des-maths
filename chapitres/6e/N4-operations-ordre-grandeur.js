/* ============================================================
   CHAPITRE : Opérations et ordre de grandeur (6e, N4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Ce chapitre a été scindé en deux (contenu identique au support papier,
   qui couvre les deux sous la même référence N4, pages 34-43) : celui-ci
   garde l'addition/soustraction posées et l'ordre de grandeur (arrondir,
   tronquer) ; la multiplication/division (par 10-100-1000, multiplication
   décimale, division posée) est passée dans le nouveau fichier
   chapitres/6e/N4-multiplication-division.js. Les fonctions/constantes
   propres à la multiplication et à la division (ogPvRow/ogPvTable pour le
   tableau générique de valeurs de position, ogCells/ogRow/OG_DP_.../OG_MA_.../
   OG_MB_... pour la division posée et les méthodes ×10/100/1000) ont été
   déplacées avec leur contenu. ogPvHeader (juste l'en-tête du tableau de
   valeurs de position) reste dupliqué dans les deux fichiers : il est
   utilisé ici par le tableau d'arrondi (ogRoundTable) et là-bas par le
   tableau de multiplication (ogPvTable) -- chaque fichier reste autonome.
   ============================================================ */

/* ---- Addition/soustraction posées : colonnes absolues calées sur la virgule ----
   Colonnes : 0=signe, 1=dizaines, 2=unités, 3=virgule, 4=dixièmes, 5=centièmes.
   On n'aligne jamais par simple "text-align:right" (qui ne garantit pas du
   tout que les virgules tombent dans la même colonne dès que les nombres
   n'ont pas le même nombre de chiffres après la virgule). */
const OG_CELL_W = 20;
const OG_ADD_NCOLS = 6;
function ogAddCells(map){
  let out = '';
  for(let i=0;i<OG_ADD_NCOLS;i++){
    const c = map[i];
    out += `<span style="display:inline-block;width:${OG_CELL_W}px;text-align:center;">${c?c:''}</span>`;
  }
  return out;
}
function ogAddRow(map, topline){
  const border = topline ? 'border-top:1.5px solid #1C1B2E;padding-top:2px;' : '';
  return `<div style="width:${OG_CELL_W*OG_ADD_NCOLS}px;${border}">${ogAddCells(map)}</div>`;
}
function ogAddBlock(rows){
  return `<div style="font-family:'JetBrains Mono',monospace;font-size:1.15rem;">${rows.map(r=>ogAddRow(r.m, r.top)).join('')}</div>`;
}
const OG_ADD_WELL = [
  {m:{2:'9', 3:',', 4:'4'}},
  {m:{0:'+', 2:'0', 3:',', 4:'6', 5:'3'}},
  {m:{0:'+', 1:'1', 2:'2'}},
  {m:{0:'=', 1:'2', 2:'2', 3:',', 4:'0', 5:'3'}, top:true},
];
/* Erreur classique : 12 est aligné à droite sans tenir compte des unités --
   le 1 tombe sur la colonne des unités et le 2 sur celle des dixièmes (aucune
   virgule n'est écrite), au lieu du 1 en dizaines et du 2 en unités. */
const OG_ADD_BAD = [
  {m:{2:'9', 3:',', 4:'4'}},
  {m:{0:'+', 2:'0', 3:',', 4:'6', 5:'3'}},
  {m:{0:'+', 2:'1', 4:'2'}},
];
const OG_SUB_15 = [
  {m:{1:'1', 2:'5', 3:',', 4:'0'}},
  {m:{0:'−', 2:'6', 3:',', 4:'3'}},
  {m:{0:'=', 2:'8', 3:',', 4:'7'}, top:true},
];

document.getElementById('cours-demo-operations-ordre-grandeur-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Addition de nombres décimaux</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour poser et effectuer une <b>addition</b> de nombres décimaux, on place les nombres les uns en dessous des autres, de sorte que les <b>virgules soient alignées verticalement</b>.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> :</p>
<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;">
  <div>
    ${ogAddBlock(OG_ADD_WELL)}
    <p class="hint" style="text-align:center;margin:2px 0;">Addition bien posée</p>
  </div>
  <div>
    <div style="color:#9E1F5E;">${ogAddBlock(OG_ADD_BAD)}</div>
    <p class="hint" style="text-align:center;margin:2px 0;color:#9E1F5E;">Addition mal posée (virgules non alignées)</p>
  </div>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Soustraction de nombres décimaux</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour poser et effectuer une <b>soustraction</b> de nombres décimaux, on place les nombres les uns en dessous des autres, de sorte que les <b>virgules soient alignées verticalement</b>.</div>
<p style="margin:14px 0 6px;">Pour poser la soustraction 15 − 6,3, on place les nombres correctement et on ajoute un zéro pour que les deux nombres aient le même nombre de chiffres dans leur partie décimale (en effet, 15 = 15,0).</p>
${ogAddBlock(OG_SUB_15)}
`;

document.getElementById('histoire-demo-operations-ordre-grandeur-6e').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Estimer un ordre de grandeur, c'est un peu ce que le savant grec Archimède a fait vers 250 av. J.-C., dans un texte appelé <i>L'Arénaire</i> (« Celui qui compte les grains de sable »). À une époque où les Grecs ne savaient nommer que des nombres allant jusqu'à la « myriade » (10 000), Archimède invente un système pour écrire des nombres immensément plus grands, et calcule qu'il faudrait environ 10<sup>63</sup> grains de sable pour remplir tout l'Univers tel qu'on l'imaginait alors ! Cet exercice, à la fois amusant et sérieux, est l'un des tout premiers exemples connus de calcul d'ordre de grandeur.

  <p class="example-title" style="margin-top:20px;">Des cailloux au boulier : additionner et soustraire avant les chiffres</p>
  <p style="margin:0 0 12px;">Le mot « calcul » vient du latin <i>calculus</i>, qui signifie « petit caillou » : les Romains posaient de petits cailloux sur une table recouverte de sable (en grec, <i>abax</i>, d'où le mot « abaque ») pour compter et effectuer leurs opérations. Ils inventent ensuite l'<b>abaque à jetons</b>, une planche gravée de rainures dans lesquelles glissent des jetons, chaque rainure représentant un rang de la numération (unités, dizaines, centaines...). Cet outil reste utilisé en Europe jusqu'à la fin du XVIII<sup>e</sup> siècle, bien après l'apparition de nos chiffres actuels.</p>
  <p style="margin:0 0 12px;">En Chine apparaît au XIII<sup>e</sup> siècle le <b>boulier</b> (<i>suanpan</i>), qui pousse l'idée encore plus loin : chaque tige verticale représente un rang (unités, dizaines, centaines...), et des boules coulissantes permettent de composer n'importe quel chiffre de 0 à 9 sur chaque tige. C'est une manière très concrète de voir ce qu'est une <b>base de numération</b> : la position d'une boule sur sa tige compte dix fois plus que la même position sur la tige juste à sa droite -- exactement le principe qu'on utilise en posant une addition ou une soustraction, en alignant bien les unités sous les unités, les dixièmes sous les dixièmes...</p>
  <p style="margin:0;">Le boulier permet aussi de <i>voir</i> physiquement une retenue : quand une tige atteint 10 boules, on les échange contre une seule boule sur la tige suivante -- exactement le geste qu'on fait mentalement lorsqu'on pose une addition avec retenue, ou une soustraction avec la méthode par compensation.</p>
</div>
`;

/* ================= METHODE ================= */
/* ---- Soustraire des nombres décimaux par compensation (même méthode que la
   soustraction de durées, chapitre "Heures et durée") : quand une colonne du
   haut est trop petite, on lui ajoute 10 (affiché en vert au-dessus de son
   chiffre), et pour ne pas changer la différence, on ajoute 1 à la colonne
   suivante DU BAS (affiché en vert, accolé à son chiffre, sur une seconde
   ligne pour ne pas décaler l'alignement des colonnes). On ne modifie jamais
   les chiffres déjà écrits en haut.
   Exemple : 8,30 − 2,56 = 5,74 (vérifié : centièmes 0+10-6=4, dixièmes
   3+10-6=7, unités 8-3=5 -- et 8,30-2,56=5,74 directement). */
const OG_SUB_STEPS = [
  {text:"On pose la soustraction colonne par colonne, en commençant par les centièmes (à droite)."},
  {resCent:'4', plus10Cent:'+10', compDix:'+1',
   text:"Centièmes : 0 − 6 est impossible. On fait apparaître +10 au-dessus du 0 (en vert) : 0 + 10 = 10. Comme on a ajouté 10 centièmes au premier terme, on ajoute 1 dixième au second terme pour compenser : 5 devient 5 + 1. 10 − 6 = 4."},
  {resDix:'7', plus10Dix:'+10', compUnite:'+1',
   text:"Dixièmes : 3 − (5 + 1) = 3 − 6 est impossible. On fait apparaître +10 au-dessus du 3 (en vert) : 3 + 10 = 13. On ajoute donc 1 unité au second terme pour compenser : 2 devient 2 + 1. 13 − 6 = 7."},
  {resUnite:'5', text:"Unités : 8 − (2 + 1) = 8 − 3 = 5."},
  {final:true, text:"Résultat : 8,30 − 2,56 = 5,74."}
];
let ogSubStep = 0;
function ogSubReset(){
  ogSubStep = 0;
  ['ogSubResUnite','ogSubResDix','ogSubResCent','ogSubPlus10Dix','ogSubPlus10Cent','ogSubCompDix','ogSubCompUnite'].forEach(id=>document.getElementById(id).textContent='');
  document.getElementById('ogSubText').textContent = 'Clique sur « Étape suivante » pour commencer.';
  const btn = document.getElementById('btnOgSubNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function ogSubNextStep(){
  if(ogSubStep>=OG_SUB_STEPS.length-1) return;
  ogSubStep++;
  const s = OG_SUB_STEPS[ogSubStep];
  if(s.resCent!==undefined) document.getElementById('ogSubResCent').textContent = s.resCent;
  if(s.resDix!==undefined) document.getElementById('ogSubResDix').textContent = s.resDix;
  if(s.resUnite!==undefined) document.getElementById('ogSubResUnite').textContent = s.resUnite;
  if(s.plus10Cent!==undefined) document.getElementById('ogSubPlus10Cent').textContent = s.plus10Cent;
  if(s.plus10Dix!==undefined) document.getElementById('ogSubPlus10Dix').textContent = s.plus10Dix;
  if(s.compDix!==undefined) document.getElementById('ogSubCompDix').textContent = s.compDix;
  if(s.compUnite!==undefined) document.getElementById('ogSubCompUnite').textContent = s.compUnite;
  document.getElementById('ogSubText').textContent = s.text;
  if(s.final){ document.getElementById('btnOgSubNext').textContent = 'Terminé ✓'; document.getElementById('btnOgSubNext').disabled = true; }
}

/* Tableau de valeurs de position : milliers…millièmes, avec une frontière fixe
   (la virgule) entre la colonne des unités et celle des dixièmes. On ne fait
   jamais bouger la virgule : ce sont les CHIFFRES qui changent de colonne.
   Seul l'en-tête (ogPvHeader) est repris ici -- la ligne de valeurs elle-même
   est spécifique à l'arrondi (ogRoundRow, avec ses deux couleurs de repère). */
const OG_PV_COLS = ['milliers','centaines','dizaines','unités','dixièmes','centièmes','millièmes'];
const OG_PV_NCOLS = 7;
const OG_PV_CELL_W = 50;
function ogPvHeader(hi){
  return `<div style="display:flex;">${OG_PV_COLS.map((label,i)=>
    `<div style="width:${OG_PV_CELL_W}px;text-align:center;font-size:.6rem;line-height:1.15;font-weight:700;color:${i===hi?'var(--accent-orange)':'var(--ink-soft)'};${i===3?'border-right:2px dashed #1C1B2E;':''}">${label}</div>`
  ).join('')}</div>`;
}

/* ---- Arrondir un nombre décimal ----
   On repère le chiffre au rang demandé (orange), puis le chiffre juste après
   (teal) qui sert à décider : 0-4 → on ne change rien ; 5-9 → on augmente le
   chiffre repéré de 1 (avec parfois une retenue en cascade). */
function ogRoundRow(map, target, decision){
  let out = `<div style="display:flex;font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:700;">`;
  for(let i=0;i<OG_PV_NCOLS;i++){
    const d = map[i]||'';
    let bg = '';
    if(i===target) bg = 'background:rgba(255,130,8,.20);';
    else if(i===decision) bg = 'background:rgba(38,170,177,.22);';
    out += `<div style="width:${OG_PV_CELL_W}px;text-align:center;border-radius:6px;${bg}${i===3?'border-right:2px dashed #1C1B2E;':''}">${d}</div>`;
  }
  out += `</div>`;
  return out;
}
function ogRoundTable(map, target, decision){
  return `<div style="overflow-x:auto;padding:6px 0;">${ogPvHeader(target)}${ogRoundRow(map, target, decision)}</div>`;
}
/* Exemple 1 : arrondis 27,342 au dixième (le chiffre suivant, 4, est < 5 : on ne change rien). */
const OG_R1_STEPS = [
  {note:"On veut arrondir 27,342 au dixième. On repère le chiffre des dixièmes : 3.", map:{2:'2',3:'7',4:'3',5:'4',6:'2'}, target:4, decision:-1},
  {note:"On regarde le chiffre juste après (le chiffre des centièmes) : 4.", map:{2:'2',3:'7',4:'3',5:'4',6:'2'}, target:4, decision:5},
  {note:"4 est inférieur à 5 : on ne change rien au chiffre des dixièmes, et on supprime tout ce qui suit.", map:{2:'2',3:'7',4:'3'}, target:4, decision:-1},
  {note:"27,342 ≈ 27,3 (arrondi au dixième).", map:{2:'2',3:'7',4:'3'}, target:4, decision:-1, final:true},
];
let ogR1Idx = 0;
function ogRenderR1(){
  const s = OG_R1_STEPS[ogR1Idx];
  document.getElementById('og-r1-table').innerHTML = ogRoundTable(s.map, s.target, s.decision);
  document.getElementById('og-r1-note').textContent = s.note;
  document.querySelectorAll('#og-r1-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=ogR1Idx));
  const btn = document.getElementById('og-r1-next');
  btn.textContent = ogR1Idx>=OG_R1_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →';
  btn.disabled = ogR1Idx>=OG_R1_STEPS.length-1;
}
function ogR1Next(){ if(ogR1Idx<OG_R1_STEPS.length-1) ogR1Idx++; ogRenderR1(); }
function ogR1Reset(){ ogR1Idx=0; ogRenderR1(); }

/* Exemple 2 : arrondis 9,96 à l'unité (le chiffre suivant, 9, est ≥ 5 : on
   augmente le chiffre des unités de 1, ce qui provoque une retenue car 9+1=10). */
const OG_R2_STEPS = [
  {note:"On veut arrondir 9,96 à l'unité. On repère le chiffre des unités : 9.", map:{3:'9',4:'9',5:'6'}, target:3, decision:-1},
  {note:"On regarde le chiffre juste après (le chiffre des dixièmes) : 9.", map:{3:'9',4:'9',5:'6'}, target:3, decision:4},
  {note:"9 est 5 ou plus : il faut augmenter le chiffre des unités de 1. Attention : 9 + 1 = 10, cela provoque une retenue sur le chiffre des dizaines !", map:{2:'1',3:'0'}, target:3, decision:-1},
  {note:"9,96 ≈ 10 (arrondi à l'unité).", map:{2:'1',3:'0'}, target:3, decision:-1, final:true},
];
let ogR2Idx = 0;
function ogRenderR2(){
  const s = OG_R2_STEPS[ogR2Idx];
  document.getElementById('og-r2-table').innerHTML = ogRoundTable(s.map, s.target, s.decision);
  document.getElementById('og-r2-note').textContent = s.note;
  document.querySelectorAll('#og-r2-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=ogR2Idx));
  const btn = document.getElementById('og-r2-next');
  btn.textContent = ogR2Idx>=OG_R2_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →';
  btn.disabled = ogR2Idx>=OG_R2_STEPS.length-1;
}
function ogR2Next(){ if(ogR2Idx<OG_R2_STEPS.length-1) ogR2Idx++; ogRenderR2(); }
function ogR2Reset(){ ogR2Idx=0; ogRenderR2(); }

document.getElementById('methode-demo-operations-ordre-grandeur-6e').innerHTML = `
<p class="example-title" style="margin-top:0;">Soustraire des nombres décimaux (méthode par compensation)</p>
<p style="margin:0 0 14px;">Même principe que pour soustraire des durées (voir le chapitre « Heures et durée ») : quand une colonne est trop petite pour soustraire, on lui ajoute 10 (au lieu de 60 pour les durées), et on compense en ajoutant 1 à la colonne suivante du second terme.</p>
<p style="margin:0 0 8px;"><b>Exemple</b> : calcule 8,30 − 2,56.</p>
<div class="figure-wrap" style="max-width:320px;margin:8px 0;">
  <table id="ogSubTable" style="width:100%;border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:.95rem;text-align:center;">
    <thead>
      <tr><th style="width:16px;"></th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">unités</th><th style="padding:4px;"></th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">dixièmes</th><th style="padding:4px;color:#6B7A8C;font-weight:400;font-size:.72rem;">centièmes</th></tr>
      <tr>
        <td style="vertical-align:top;"></td><td style="vertical-align:top;"></td><td style="vertical-align:top;"></td>
        <td id="ogSubPlus10Dix" style="height:16px;color:#1E9E5A;font-size:.75rem;vertical-align:top;"></td>
        <td id="ogSubPlus10Cent" style="height:16px;color:#1E9E5A;font-size:.75rem;vertical-align:top;"></td>
      </tr>
    </thead>
    <tbody>
      <tr><td style="vertical-align:top;"></td><td style="vertical-align:top;">8</td><td style="vertical-align:top;">,</td><td style="vertical-align:top;">3</td><td style="vertical-align:top;">0</td></tr>
      <tr>
        <td style="vertical-align:top;">−<div style="height:12px;"></div></td>
        <td style="vertical-align:top;">2<div id="ogSubCompUnite" style="color:#1E9E5A;font-weight:700;font-size:.65rem;height:12px;line-height:12px;"></div></td>
        <td style="vertical-align:top;">,<div style="height:12px;"></div></td>
        <td style="vertical-align:top;">5<div id="ogSubCompDix" style="color:#1E9E5A;font-weight:700;font-size:.65rem;height:12px;line-height:12px;"></div></td>
        <td style="vertical-align:top;">6<div style="height:12px;"></div></td>
      </tr>
    </tbody>
    <tfoot>
      <tr style="border-top:2px solid #1C1B2E;">
        <td style="vertical-align:top;"></td>
        <td id="ogSubResUnite" style="padding-top:6px;font-weight:700;vertical-align:top;"></td>
        <td style="padding-top:6px;font-weight:700;vertical-align:top;">,</td>
        <td id="ogSubResDix" style="padding-top:6px;font-weight:700;vertical-align:top;"></td>
        <td id="ogSubResCent" style="padding-top:6px;font-weight:700;vertical-align:top;"></td>
      </tr>
    </tfoot>
  </table>
  <p class="hint" id="ogSubText" style="min-height:64px;margin:10px 0 0;">Clique sur « Étape suivante » pour commencer.</p>
  <div class="figure-toolbar">
    <button class="btn" id="btnOgSubNext" onclick="ogSubNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogSubReset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Arrondir un nombre décimal</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour arrondir un nombre à un rang donné, on repère le chiffre de ce rang, puis on regarde le chiffre juste après.
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li>S'il vaut <b>0, 1, 2, 3 ou 4</b>, on ne change rien au chiffre repéré, et on supprime tout ce qui suit.</li>
    <li>S'il vaut <b>5, 6, 7, 8 ou 9</b>, on augmente le chiffre repéré de 1 (avec parfois une retenue), et on supprime tout ce qui suit.</li>
  </ul>
</div>

<p class="example-title" style="margin-top:22px;">Troncature, arrondi par défaut, arrondi par excès</p>
<div class="def-box">
  <b>Troncature</b> : on supprime tous les chiffres après le rang demandé, sans regarder le chiffre suivant.<br>
  <b>Arrondi par défaut</b> : la valeur, à ce rang, la plus proche du nombre tout en restant <b>inférieure ou égale</b>.<br>
  <b>Arrondi par excès</b> : la valeur, à ce rang, la plus proche du nombre tout en restant <b>supérieure ou égale</b>.
</div>
<p style="margin:12px 0 8px;">Pour un nombre positif, la troncature et l'arrondi par défaut donnent toujours la même valeur. L'arrondi "classique" (au plus proche), lui, correspond tantôt à l'arrondi par défaut, tantôt à l'arrondi par excès, selon le chiffre suivant.</p>
<p style="margin:0 0 8px;"><b>Exemple</b> : pour le nombre 8,6427 :</p>
<table style="border-collapse:collapse;width:100%;font-size:.88rem;margin:0 0 16px;">
  <tr>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Rang</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Troncature</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Arrondi par défaut</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Arrondi par excès</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Arrondi (au plus proche)</th>
  </tr>
  <tr>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">à l'unité</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">9</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;font-weight:700;color:var(--accent-orange);">9</td>
  </tr>
  <tr>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">au dixième</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,6</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,6</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,7</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;font-weight:700;color:var(--accent-orange);">8,6</td>
  </tr>
  <tr>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">au centième</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,64</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,64</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,65</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;font-weight:700;color:var(--accent-orange);">8,64</td>
  </tr>
</table>
<p class="hint" style="margin:0 0 14px;">À l'unité, le chiffre suivant (6) est 5 ou plus : l'arrondi au plus proche correspond à l'arrondi par excès (9). Au dixième et au centième, le chiffre suivant (4 puis 2) est inférieur à 5 : l'arrondi au plus proche correspond à l'arrondi par défaut.</p>

<p style="margin:12px 0 8px;"><b>Exemple 1</b> : arrondis 27,342 au dixième.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div id="og-r1-table"></div>
  <div class="step-note" id="og-r1-note" style="text-align:center;margin-top:10px;"></div>
  <div class="step-list" id="og-r1-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On repère le chiffre des dixièmes.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On regarde le chiffre juste après (les centièmes).</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>Il est inférieur à 5 : on ne change rien, on supprime la suite.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On lit le résultat : 27,3.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="og-r1-next" onclick="ogR1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogR1Reset()">Recommencer</button>
  </div>
</div>

<p style="margin:18px 0 8px;"><b>Exemple 2</b> : arrondis 9,96 à l'unité (attention à la retenue).</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div id="og-r2-table"></div>
  <div class="step-note" id="og-r2-note" style="text-align:center;margin-top:10px;"></div>
  <div class="step-list" id="og-r2-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On repère le chiffre des unités.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On regarde le chiffre juste après (les dixièmes).</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>Il est 5 ou plus : on augmente le chiffre des unités de 1, avec une retenue.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On lit le résultat : 10.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="og-r2-next" onclick="ogR2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogR2Reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-operations-ordre-grandeur-6e').innerHTML = `
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Pose et effectue : 23,7 + 4,08 + 9, puis 18 − 5,64.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Arrondis 14,378 au centième.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Arrondis 6,95 à l'unité (attention à la retenue).
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Pour le nombre 12,367, donne : la troncature au dixième, l'arrondi par défaut au dixième, l'arrondi par excès au dixième, puis l'arrondi classique au dixième.
  </div>
</div>
`;

DEMO_REGISTRY['6e|Opérations et ordre de grandeur'] = {
  cours:'cours-demo-operations-ordre-grandeur-6e', methode:'methode-demo-operations-ordre-grandeur-6e', exos:'exos-demo-operations-ordre-grandeur-6e', histoire:'histoire-demo-operations-ordre-grandeur-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-operations-ordre-grandeur-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-operations-ordre-grandeur-6e'));
    ogSubReset(); ogR1Reset(); ogR2Reset();
    injectCourseAddButtons(document.getElementById('methode-demo-operations-ordre-grandeur-6e'));
  }
};

DEMO_QUIZZES['6e|Opérations et ordre de grandeur'] = [
  {q:"Pour poser une addition de nombres décimaux, il faut...",
   opts:["Aligner les chiffres de droite","Aligner les virgules","Aligner les chiffres des unités seulement"], correct:1},
  {q:"5,84 arrondi au dixième est...",
   opts:["5,8","5,9","6,0"], correct:0},
  {q:"La troncature de 9,876 au centième est...",
   opts:["9,87","9,88","9,9"], correct:0},
  {q:"L'arrondi par excès d'un nombre positif est...",
   opts:["toujours inférieur ou égal au nombre","toujours supérieur ou égal au nombre","toujours égal à la troncature"], correct:1},
  {q:"6,95 arrondi à l'unité est...",
   opts:["6","7","6,9"], correct:1},
];
