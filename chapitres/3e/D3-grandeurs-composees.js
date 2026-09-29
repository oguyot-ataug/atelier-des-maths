/* ============================================================
   CHAPITRE : Grandeurs composées (3e, D3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (capture du manuel, p. 120) : plan du manuel (grandeur quotient : vitesse, masse
   volumique, débit ; grandeur produit : aire, énergie électrique ; conversions d'unités), titres
   reformulés, exemples nouveaux. Méthode animée : une voiture qui roule (d, t, v, avec la conversion
   des heures-minutes), un convertisseur km/h ↔ m/s, une cuve qui se remplit (débit), l'énergie
   consommée par un appareil et son coût.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const GC3_BLEU = '#0C5BA0', GC3_VERT = '#1E7B34', GC3_ROUGE = '#C0392B', GC3_ORANGE = '#E07B00';
const gc3Tex = s => `<span class="tex">${s}</span>`;
// Nombre à la française (virgule, espace des milliers), arrondi à d décimales sans zéros inutiles.
const gc3N = (v, d) => { const p = Math.pow(10, d == null ? 2 : d), r = Math.round(v * p) / p, [e, f] = String(Math.abs(r)).split('.');
  return (r < 0 ? '−' : '') + e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (f ? ',' + f : ''); };
const gc3T = (v, d) => gc3N(v, d).replace(',', '{,}').replace(/ /g, '\\,');
const gc3Formule = (f, txt) => `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:6px 0 10px;"><span style="border:2px solid ${GC3_BLEU};border-radius:8px;padding:4px 14px;background:#fff;">${gc3Tex(f)}</span><span>${txt}</span></div>`;

document.getElementById('cours-demo-grandeurs-composees-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les grandeurs quotients</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une <b>grandeur quotient</b> est obtenue en <b>divisant</b> une grandeur par une autre.</div>
<p class="example-title">Trois grandeurs quotients très courantes :</p>
<ul class="example-list">
  <li>La <b>vitesse</b> <i>v</i>, par exemple en km/h : ${gc3Formule('v = \\dfrac{d}{t}', 'où <i>d</i> est la distance parcourue (en km) et <i>t</i> la durée du parcours (en h).')}</li>
  <li>La <b>masse volumique</b> ρ (« rhô »), par exemple en kg/m³ : ${gc3Formule('\\rho = \\dfrac{m}{V}', 'où <i>m</i> est la masse (en kg) et <i>V</i> le volume (en m³).')}</li>
  <li>Le <b>débit</b> <i>D</i>, par exemple en m³/s : ${gc3Formule('D = \\dfrac{V}{t}', 'où <i>V</i> est le volume écoulé (en m³) et <i>t</i> la durée (en s).')}</li>
</ul>
${r4Ex('Exemple 1 : un cycliste parcourt 45 km en 1 h 30 min. Quelle est sa vitesse moyenne ?', [
  ['1 h 30 min = 1,5 h', 'Attention : 30 min, c\'est une demi-heure, pas « 0,30 h ».'],
  [gc3Tex('v = \\dfrac{d}{t} = \\dfrac{45\\text{ km}}{1{,}5\\text{ h}} = 30\\text{ km/h}'), 'On divise la distance par la durée.'],
])}
${r4Ex('Exemple 2 : un bloc d\'aluminium de 200 cm³ a une masse de 540 g. Quelle est la masse volumique de l\'aluminium ?', [
  [gc3Tex('\\rho = \\dfrac{m}{V} = \\dfrac{540\\text{ g}}{200\\text{ cm}^3} = 2{,}7\\text{ g/cm}^3'), 'On divise la masse par le volume.'],
])}
${r4Ex('Exemple 3 : un robinet remplit un seau de 12 L en 1 min 30 s. Quel est son débit, en L/min ?', [
  ['1 min 30 s = 1,5 min', 'On exprime la durée dans l\'unité voulue.'],
  [gc3Tex('D = \\dfrac{V}{t} = \\dfrac{12\\text{ L}}{1{,}5\\text{ min}} = 8\\text{ L/min}'), 'On divise le volume par la durée.'],
])}
<div class="redaction-note" ${R4_REM}><b>Attention</b> : il faut veiller à la <b>cohérence des unités</b> dans les calculs. Une distance en km divisée par une durée en h donne des km/h ; une distance en m divisée par une durée en s donne des m/s. Les durées en heures et minutes doivent être converties en nombre décimal (1 h 45 min = 1,75 h).</div>

<div class="lesson-header"><span class="num">2</span><h3>Les grandeurs produits</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une <b>grandeur produit</b> est obtenue en <b>multipliant</b> deux grandeurs.</div>
<p class="example-title">Deux exemples :</p>
<ul class="example-list">
  <li>L'<b>aire</b> 𝒜 d'un rectangle, par exemple en m² : ${gc3Formule('\\mathcal{A} = L \\times \\ell', 'où <i>L</i> et <i>ℓ</i> sont la longueur et la largeur (en m).')}</li>
  <li>L'<b>énergie électrique</b> <i>E</i> consommée, par exemple en Wh (wattheure) : ${gc3Formule('E = P \\times t', 'où <i>P</i> est la puissance de l\'appareil (en W, watt) et <i>t</i> la durée de fonctionnement (en h).')}</li>
</ul>
${r4Ex('Exemple : un radiateur de 1 500 W fonctionne pendant 4 h. Quelle énergie consomme-t-il ?', [
  [gc3Tex('E = P \\times t = 1\\,500\\text{ W} \\times 4\\text{ h} = 6\\,000\\text{ Wh}'), 'On multiplie la puissance par la durée.'],
  ['6 000 Wh = 6 kWh', '1 kWh (kilowattheure) = 1 000 Wh : c\'est l\'unité des factures d\'électricité.'],
])}

<div class="lesson-header"><span class="num">3</span><h3>Convertir des unités de grandeurs composées</h3></div>
<p style="margin:4px 0 8px;">On convertit <b>chaque unité séparément</b>, puis on refait le calcul.</p>
${r4Ex('Exemple 1 : convertir 90 km/h en m/s.', [
  ['1 km = 1 000 m et 1 h = 3 600 s', 'On écrit les égalités entre unités.'],
  [gc3Tex('90\\text{ km/h} = \\dfrac{90\\,000\\text{ m}}{3\\,600\\text{ s}} = \\dfrac{90\\,000}{3\\,600}\\text{ m/s} = 25\\text{ m/s}'), 'On remplace, puis on calcule.'],
])}
${r4Ex('Exemple 2 : convertir 12 m/s en km/h.', [
  ['En 1 h = 3 600 s, on parcourt 12 × 3 600 = 43 200 m, soit 43,2 km.', 'On cherche la distance parcourue en une heure.'],
  ['12 m/s = 43,2 km/h', ''],
])}
${r4Ex('Exemple 3 : convertir l\'énergie de 2,5 kWh en Wmin (watt-minute).', [
  ['1 kW = 1 000 W et 1 h = 60 min', 'On écrit les égalités entre unités.'],
  ['2,5 kWh = 2 500 W × 60 min = 150 000 Wmin', 'On remplace dans le produit.'],
])}
${r4Ex('Exemple 4 : convertir la masse volumique de l\'aluminium, 2,7 g/cm³, en kg/m³.', [
  ['1 g = 0,001 kg et 1 cm³ = 0,000 001 m³', 'On écrit les égalités entre unités.'],
  [gc3Tex('2{,}7\\text{ g/cm}^3 = \\dfrac{0{,}0027\\text{ kg}}{0{,}000\\,001\\text{ m}^3} = 2\\,700\\text{ kg/m}^3'), 'On remplace dans le quotient, puis on calcule.'],
])}
<div class="redaction-note" ${R4_REM}>Astuce pour les vitesses : pour passer des m/s aux km/h, on multiplie par 3,6 ; pour passer des km/h aux m/s, on divise par 3,6 (car 1 m/s = 3 600 m/h = 3,6 km/h).</div>
`;

document.getElementById('histoire-demo-grandeurs-composees-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Comment mesurer la vitesse d'un bateau en pleine mer, sans repère ? À partir du 16e siècle, les marins utilisent le <b>loch</b> : une planchette lestée, attachée à une longue corde sur laquelle on a fait des <b>nœuds</b> régulièrement espacés. On jette la planchette à l'eau, qui reste presque immobile, et l'on compte le nombre de nœuds qui filent entre les mains pendant la durée d'un petit sablier. Plus il en passe, plus le bateau va vite ! C'est l'origine du <b>nœud</b>, l'unité de vitesse encore utilisée en mer et dans les airs : 1 nœud correspond à 1 mille marin par heure, soit 1,852 km/h. Encore une grandeur quotient : une distance divisée par une durée.
</div>
`;

document.getElementById('methode-demo-grandeurs-composees-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer une vitesse moyenne</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez la distance et la durée du trajet, puis lancez la voiture. La durée en heures et minutes est d'abord convertie en heures décimales.</p>
  <svg id="gc3-routeSvg" viewBox="0 0 520 110" style="width:100%;max-width:540px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:540px;margin:0 auto;">
    <label for="gc3-d" style="font-weight:700;">Distance</label><input id="gc3-d" type="range" min="5" max="300" step="5" value="45" oninput="gc3RouteMaj()"><span id="gc3-dVal" style="font-family:'JetBrains Mono',monospace;min-width:70px;"></span>
    <label for="gc3-h" style="font-weight:700;">Heures</label><input id="gc3-h" type="range" min="0" max="4" step="1" value="1" oninput="gc3RouteMaj()"><span id="gc3-hVal" style="font-family:'JetBrains Mono',monospace;"></span>
    <label for="gc3-m" style="font-weight:700;">Minutes</label><input id="gc3-m" type="range" min="0" max="55" step="5" value="30" oninput="gc3RouteMaj()"><span id="gc3-mVal" style="font-family:'JetBrains Mono',monospace;"></span>
  </div>
  <div id="gc3-routeInfo" style="text-align:center;margin:10px 0 4px;line-height:2;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="gc3RouteRouler()"><span class="gicon">play_arrow</span> Lancer la voiture</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : convertir une vitesse (km/h ↔ m/s)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez une vitesse et choisissez le sens de la conversion.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="gc3-cvVal" type="text" inputmode="decimal" value="90" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:120px;text-align:center;" oninput="gc3Convertir()">
    <select id="gc3-cvSens" onchange="gc3Convertir()" style="font-size:1rem;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"><option value="kmh">km/h → m/s</option><option value="ms">m/s → km/h</option></select>
  </div>
  <div id="gc3-cvResultat" style="text-align:center;line-height:2.2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : le débit d'un robinet</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Une cuve de 240 L se remplit. Réglez le débit du robinet, puis lancez le remplissage : volume, durée et débit sont liés par ${gc3Tex('D = \\dfrac{V}{t}')}, donc ${gc3Tex('t = \\dfrac{V}{D}')}.</p>
  <svg id="gc3-cuveSvg" viewBox="0 0 300 230" style="width:100%;max-width:300px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:460px;margin:0 auto;">
    <label for="gc3-debit" style="font-weight:700;">Débit</label><input id="gc3-debit" type="range" min="4" max="40" step="2" value="12" oninput="gc3CuveMaj()"><span id="gc3-debitVal" style="font-family:'JetBrains Mono',monospace;min-width:80px;"></span>
  </div>
  <div id="gc3-cuveInfo" style="text-align:center;margin:10px 0 4px;line-height:2;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="gc3CuveRemplir()"><span class="gicon">water_drop</span> Remplir</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : l'énergie consommée par un appareil</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Une bouilloire de 2 000 W fonctionne 6 minutes par jour. Quelle énergie consomme-t-elle en un an, et combien cela coûte-t-il à 0,25 € le kWh ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="gc3-energieDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="gc3EnergieDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="gc3EnergieDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function gc3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="gc3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="gc3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-grandeurs-composees-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer avec une grandeur composée »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Durée : 2 h 15 min = 2,25 h</span><span class="we-comment">1. On met les données dans des unités cohérentes.</span></div>
    <div class="we-row"><span class="we-expr">${gc3Tex('v = \\dfrac{d}{t}')}</span><span class="we-comment">2. On écrit la formule.</span></div>
    <div class="we-row"><span class="we-expr">${gc3Tex('v = \\dfrac{351\\text{ km}}{2{,}25\\text{ h}} = 156\\text{ km/h}')}</span><span class="we-comment">3. On remplace, on calcule, avec l'unité.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">La vitesse moyenne du train est de 156 km/h.</span><span class="we-comment">4. On répond par une phrase.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${gc3Exo(1, 'Un train parcourt 351 km en 2 h 15 min. Calcule sa vitesse moyenne en km/h.', [
    '2 h 15 min = 2,25 h (15 min = un quart d\'heure).', gc3Tex('v = \\dfrac{351}{2{,}25} = 156') + ' : la vitesse moyenne est de 156 km/h.'])}
  ${gc3Exo(2, 'Une voiture roule à 80 km/h. Combien de temps met-elle pour parcourir 60 km ? Donne la réponse en minutes.', [
    gc3Tex('v = \\dfrac{d}{t}') + ' donc ' + gc3Tex('t = \\dfrac{d}{v} = \\dfrac{60}{80} = 0{,}75') + ' h.', '0,75 h = 0,75 × 60 min = 45 min.'])}
  ${gc3Exo(3, 'Convertis : a) 72 km/h en m/s ; b) 15 m/s en km/h.', [
    'a) ' + gc3Tex('72\\text{ km/h} = \\dfrac{72\\,000\\text{ m}}{3\\,600\\text{ s}} = 20\\text{ m/s}'),
    'b) En 1 h = 3 600 s : 15 × 3 600 = 54 000 m = 54 km, donc 15 m/s = 54 km/h.'])}
  ${gc3Exo(4, 'Un bloc de glace de 2 m³ a une masse de 1 840 kg. Calcule la masse volumique de la glace. Sachant que celle de l\'eau est de 1 000 kg/m³, explique pourquoi la glace flotte.', [
    gc3Tex('\\rho = \\dfrac{m}{V} = \\dfrac{1\\,840}{2} = 920') + ' kg/m³.', 'Un mètre cube de glace est plus léger qu\'un mètre cube d\'eau (920 kg < 1 000 kg) : la glace flotte.'])}
  ${gc3Exo(5, 'Une baignoire de 180 L est remplie par un robinet de débit 12 L/min. Combien de temps faut-il pour la remplir ?', [
    gc3Tex('D = \\dfrac{V}{t}') + ' donc ' + gc3Tex('t = \\dfrac{V}{D} = \\dfrac{180}{12} = 15') + ' min.'])}
  ${gc3Exo(6, 'Une ampoule LED de 8 W reste allumée 5 h par jour pendant 30 jours. Quelle énergie consomme-t-elle ? Et une ancienne ampoule de 60 W, dans les mêmes conditions ?', [
    'Durée totale : 5 × 30 = 150 h.', 'LED : E = 8 W × 150 h = 1 200 Wh = 1,2 kWh.', 'Ancienne ampoule : E = 60 W × 150 h = 9 000 Wh = 9 kWh, soit 7,5 fois plus.'])}
  ${gc3Exo(7, 'Convertis : a) 2 400 kg/m³ en g/cm³ ; b) un débit de 0,9 m³/h en L/min.', [
    'a) 2 400 kg = 2 400 000 g et 1 m³ = 1 000 000 cm³, donc 2 400 kg/m³ = ' + gc3Tex('\\dfrac{2\\,400\\,000\\text{ g}}{1\\,000\\,000\\text{ cm}^3}') + ' = 2,4 g/cm³.',
    'b) 0,9 m³ = 900 L et 1 h = 60 min, donc 0,9 m³/h = ' + gc3Tex('\\dfrac{900\\text{ L}}{60\\text{ min}}') + ' = 15 L/min.'])}
  ${gc3Exo(8, 'En 2009, Usain Bolt a couru le 100 m en 9,58 s. Calcule sa vitesse moyenne en m/s, puis en km/h (arrondis au dixième). Un guépard peut atteindre 100 km/h : qui est le plus rapide ?', [
    gc3Tex('v = \\dfrac{100}{9{,}58} \\approx 10{,}44') + ' m/s.', '10,44 × 3,6 ≈ 37,6 km/h.', 'Le guépard est bien plus rapide : 100 km/h > 37,6 km/h.'])}
  ${gc3Exo(9, 'Léo fait l\'aller Paris – Orléans (120 km) à 60 km/h, et le retour à 40 km/h. Il dit : « Ma vitesse moyenne sur l\'aller-retour est de 50 km/h ». A-t-il raison ?', [
    'Aller : t = 120 ÷ 60 = 2 h. Retour : t = 120 ÷ 40 = 3 h.', 'Aller-retour : 240 km en 5 h, donc ' + gc3Tex('v = \\dfrac{240}{5} = 48') + ' km/h.',
    'Léo a tort : la vitesse moyenne n\'est pas la moyenne des deux vitesses, car il roule plus longtemps à 40 km/h.'])}
</div>
`;

/* ---- Méthode 1 : la voiture ---- */
let gc3Raf = null;
function gc3Voiture(x){
  return `<g transform="translate(${x.toFixed(1)},52)"><rect x="-26" y="-14" width="52" height="16" rx="5" fill="${GC3_ROUGE}"/><path d="M-14,-14 L-8,-26 L10,-26 L17,-14 Z" fill="${GC3_ROUGE}"/><path d="M-9,-15 L-5,-23 L1,-23 L1,-15 Z M4,-15 L4,-23 L9,-23 L13,-15 Z" fill="#D6ECFA"/><circle cx="-14" cy="3" r="6" fill="#1C1B2E"/><circle cx="14" cy="3" r="6" fill="#1C1B2E"/></g>`;
}
function gc3RouteDessin(k){
  const d = Number(document.getElementById('gc3-d').value), x0 = 40, x1 = 480;
  const svg = document.getElementById('gc3-routeSvg'); if(!svg) return;
  svg.innerHTML = `<rect x="0" y="58" width="520" height="22" fill="#6B7280"/><line x1="0" y1="69" x2="520" y2="69" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>`
    + `<line x1="${x0}" y1="86" x2="${x1}" y2="86" stroke="#1C1B2E" stroke-width="1.2"/><line x1="${x0}" y1="82" x2="${x0}" y2="90" stroke="#1C1B2E"/><line x1="${x1}" y1="82" x2="${x1}" y2="90" stroke="#1C1B2E"/>`
    + `<text x="${(x0 + x1) / 2}" y="104" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="${GC3_BLEU}" font-weight="700">d = ${gc3N(d)} km</text>`
    + `<text x="${x0}" y="104" text-anchor="middle" font-size="11" fill="#6B7280">départ</text><text x="${x1}" y="104" text-anchor="middle" font-size="11" fill="#6B7280">arrivée</text>`
    + gc3Voiture(x0 + (x1 - x0) * k);
}
function gc3RouteMaj(){
  cancelAnimationFrame(gc3Raf);
  const d = Number(document.getElementById('gc3-d').value), h = Number(document.getElementById('gc3-h').value), m = Number(document.getElementById('gc3-m').value);
  document.getElementById('gc3-dVal').textContent = d + ' km'; document.getElementById('gc3-hVal').textContent = h + ' h'; document.getElementById('gc3-mVal').textContent = m + ' min';
  gc3RouteDessin(0);
  const info = document.getElementById('gc3-routeInfo'), t = h + m / 60;
  if(t === 0){ info.innerHTML = '<span class="hint" style="margin:0;">Choisissez une durée non nulle.</span>'; return; }
  const exact = Math.abs(t * 100 - Math.round(t * 100)) < 1e-9;
  info.innerHTML = `Durée : ${h} h ${m} min = ${gc3Tex(`${h} + \\dfrac{${m}}{60}`)} ${exact ? '=' : '≈'} ${gc3Tex(gc3T(t, 2))} h<br>`
    + `${gc3Tex(`v = \\dfrac{d}{t} = \\dfrac{${gc3T(d)}\\text{ km}}{${exact ? gc3T(t, 2) : `${h} + \\frac{${m}}{60}`}\\text{ h}} ${Math.abs(d / t * 10 - Math.round(d / t * 10)) < 1e-9 ? '=' : '\\approx'} ${gc3T(d / t, 1)}\\text{ km/h}`)}`;
  renderStaticMath(info);
}
function gc3RouteRouler(){
  cancelAnimationFrame(gc3Raf);
  const t0 = performance.now(), dur = 2500;
  const f = now => { const k = Math.min(1, (now - t0) / dur); gc3RouteDessin(k); if(k < 1) gc3Raf = requestAnimationFrame(f); };
  gc3Raf = requestAnimationFrame(f);
}

/* ---- Méthode 2 : conversion km/h ↔ m/s ---- */
function gc3Convertir(){
  const v = parseFloat(String(document.getElementById('gc3-cvVal').value).replace(',', '.').replace(/\s/g, '')), sens = document.getElementById('gc3-cvSens').value;
  const out = document.getElementById('gc3-cvResultat');
  if(!(v >= 0) || v > 1e7){ out.innerHTML = '<p class="hint" style="color:#a83c1f;">Écrivez une vitesse positive.</p>'; return; }
  const approx = x => Math.abs(x * 100 - Math.round(x * 100)) < 1e-9 ? '=' : '\\approx';
  if(sens === 'kmh'){
    const r = v / 3.6;
    out.innerHTML = gc3Tex(`${gc3T(v, 4)}\\text{ km/h} = \\dfrac{${gc3T(v * 1000, 4)}\\text{ m}}{3\\,600\\text{ s}} ${approx(r)} ${gc3T(r, 2)}\\text{ m/s}`)
      + `<br><span class="hint" style="margin:0;">Raccourci : ${gc3N(v, 4)} ÷ 3,6 ${approx(r) === '=' ? '=' : '≈'} ${gc3N(r, 2)}</span>`;
  } else {
    const r = v * 3.6;
    out.innerHTML = `En 1 h = 3 600 s, on parcourt ${gc3N(v, 4)} × 3 600 = ${gc3N(v * 3600, 2)} m, soit ${gc3N(r, 4)} km.<br>`
      + gc3Tex(`${gc3T(v, 4)}\\text{ m/s} = ${gc3T(r, 4)}\\text{ km/h}`) + `<br><span class="hint" style="margin:0;">Raccourci : ${gc3N(v, 4)} × 3,6 = ${gc3N(r, 4)}</span>`;
  }
  renderStaticMath(out);
}

/* ---- Méthode 3 : la cuve ---- */
let gc3CuveRaf = null;
const GC3_CUVE_V = 240;
function gc3CuveDessin(niveau, coule){
  const svg = document.getElementById('gc3-cuveSvg'); if(!svg) return;
  const x = 80, y = 60, w = 150, h = 150, hh = h * niveau;
  svg.innerHTML = `<path d="M20,18 L120,18 L120,30 L110,30 L110,24 L20,24 Z" fill="#8A919C"/><rect x="30" y="8" width="16" height="10" rx="3" fill="${GC3_ROUGE}"/>`
    + (coule ? `<rect x="112" y="30" width="6" height="${(y + h - hh - 30).toFixed(1)}" fill="#5DADE2" opacity=".85"/>` : '')
    + `<rect x="${x}" y="${(y + h - hh).toFixed(1)}" width="${w}" height="${hh.toFixed(1)}" fill="#5DADE2" opacity=".75"/>`
    + `<path d="M${x},${y} L${x},${y + h} L${x + w},${y + h} L${x + w},${y}" fill="none" stroke="#1C1B2E" stroke-width="3"/>`
    + [0, 0.25, 0.5, 0.75, 1].map(k => `<line x1="${x + w}" y1="${y + h - h * k}" x2="${x + w + 8}" y2="${y + h - h * k}" stroke="#1C1B2E"/><text x="${x + w + 12}" y="${y + h - h * k + 4}" font-family="JetBrains Mono" font-size="11">${GC3_CUVE_V * k} L</text>`).join('');
}
function gc3CuveMaj(){
  cancelAnimationFrame(gc3CuveRaf);
  const D = Number(document.getElementById('gc3-debit').value), t = GC3_CUVE_V / D;
  document.getElementById('gc3-debitVal').textContent = D + ' L/min';
  gc3CuveDessin(0, false);
  const info = document.getElementById('gc3-cuveInfo');
  const mn = Math.floor(t), s = Math.round((t - mn) * 60);
  info.innerHTML = gc3Tex(`t = \\dfrac{V}{D} = \\dfrac{${GC3_CUVE_V}\\text{ L}}{${D}\\text{ L/min}} ${Math.abs(t * 100 - Math.round(t * 100)) < 1e-9 ? '=' : '\\approx'} ${gc3T(t, 2)}\\text{ min}`)
    + (s ? ` &nbsp;soit ${mn} min ${s} s` : '') + `<br><span class="hint" style="margin:0;">Plus le débit est grand, plus la cuve se remplit vite.</span>`;
  renderStaticMath(info);
}
function gc3CuveRemplir(){
  cancelAnimationFrame(gc3CuveRaf);
  const D = Number(document.getElementById('gc3-debit').value), dur = 400 * GC3_CUVE_V / D, t0 = performance.now(); // 1 min réelle = 0,4 s
  const f = now => { const k = Math.min(1, (now - t0) / dur); gc3CuveDessin(k, k < 1); if(k < 1) gc3CuveRaf = requestAnimationFrame(f); };
  gc3CuveRaf = requestAnimationFrame(f);
}

/* ---- Méthode 4 : énergie et facture ---- */
const GC3_ENERGIE_STEPS = [
  { expr: '6 min = 0,1 h', note: 'La puissance est en W : on exprime la durée en heures pour obtenir des Wh.' },
  { expr: gc3Tex('E = P \\times t = 2\\,000\\text{ W} \\times 0{,}1\\text{ h} = 200\\text{ Wh}'), note: 'Énergie consommée en un jour.' },
  { expr: '200 Wh × 365 = 73 000 Wh = 73 kWh', note: 'Énergie consommée en un an (1 kWh = 1 000 Wh).' },
  { expr: '73 kWh × 0,25 €/kWh = 18,25 €', note: 'Le prix est une grandeur quotient (€/kWh) : on multiplie par l\'énergie pour obtenir le coût.' },
];
const gc3EnergieDemo = makeStepDemo(GC3_ENERGIE_STEPS, 'gc3-energieDisplay');

DEMO_REGISTRY['3e|Grandeurs composées'] = {
  cours: 'cours-demo-grandeurs-composees-3e', methode: 'methode-demo-grandeurs-composees-3e', exos: 'exos-demo-grandeurs-composees-3e', histoire: 'histoire-demo-grandeurs-composees-3e',
  init: () => {
    gc3RouteMaj(); gc3Convertir(); gc3CuveMaj(); gc3EnergieDemo.reset();
    ['cours-demo-grandeurs-composees-3e', 'methode-demo-grandeurs-composees-3e', 'exos-demo-grandeurs-composees-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-grandeurs-composees-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-grandeurs-composees-3e'));
  }
};

DEMO_QUIZZES['3e|Grandeurs composées'] = [
  { q: 'La vitesse est une grandeur...', opts: ['quotient', 'produit', 'ni l\'un ni l\'autre'], correct: 0 },
  { q: 'L\'énergie électrique E = P × t est une grandeur...', opts: ['quotient', 'produit'], correct: 1 },
  { q: '1 h 30 min correspond à...', opts: ['1,3 h', '1,5 h', '1,03 h'], correct: 1 },
  { q: 'Une voiture parcourt 150 km en 2 h. Sa vitesse moyenne est...', opts: ['75 km/h', '300 km/h', '152 km/h'], correct: 0 },
  { q: '36 km/h correspond à...', opts: ['10 m/s', '129,6 m/s', '3,6 m/s'], correct: 0 },
  { q: 'Un appareil de 500 W fonctionne 3 h. Il consomme...', opts: ['1,5 kWh', '166 Wh', '503 Wh'], correct: 0 },
  { q: 'Une masse de 3 kg occupe 0,002 m³. Sa masse volumique est...', opts: ['1 500 kg/m³', '0,006 kg/m³', '6 kg/m³'], correct: 0 },
];
