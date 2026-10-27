/* =====================================================================
   vie-ce2.js -- Maths & la vie : six activités du CE2 (onglet « Maths & la vie »).
   Demandé : « Dans quel chapitre on pourrait ajouter Maths & la vie ? », puis « Fais ceux du CE2 ».
   Une activité = un seul niveau (règle du 26/10/2026) ; programme du CE2 seulement : pas d'écriture à virgule
   pour les longueurs, masses et contenances, pas de tableau de conversion, durées en heures et minutes.

   1. « La pâte à crêpes » (cuisine, Masses et contenances) : peser 250 g de farine sur une balance à plateaux,
      verser 50 cL de lait dans un verre doseur, puis « 1 L = 100 cL ».
   2. « Le comptage des oiseaux » (nature, Tableaux et diagrammes en barres) : compter les oiseaux d'un jardin,
      remplir le tableau, tracer le diagramme en barres, répondre aux questions.
   3. « Le concours de saut en longueur » (sport, Les longueurs) : convertir en centimètres, faire le podium.
   4. « Le voyage en train » (géographie, L'heure et les durées) : lire une fiche horaire, calculer une durée,
      une heure d'arrivée avec un retard.
   5. « Le découpage plié » (arts, La symétrie) : découper sur une feuille pliée, déplier, retrouver un modèle.
   6. « Les courses avec 20 € » (argent, La monnaie) : choisir des articles, calculer le total, ce qui reste.

   Placement : <div class="vc-crepes"></div> … ; vcInitTout(conteneur), appelé par vieMaj (maths-vie.js).
   ===================================================================== */
const vcHasard = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const vcMelange = l => { const t = l.slice(); for(let i = t.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; };
function vcDire(el, h, cls){ const m = el.querySelector('.vc-msg'); if(m){ m.className = 'vc-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; } }
const vcBravo = t => `<span class="gicon">celebration</span> ${t}`, vcAide = t => `<span class="gicon">info</span> ${t}`;
const vcSavais = t => `<div class="vc-savais"><b><span class="gicon">lightbulb</span> Le savais-tu ?</b> ${t}</div>`;
const vcEntier = s => { const v = String(s || '').replace(/\s/g, ''); return /^\d+$/.test(v) ? +v : NaN; };

/* =====================================================================
   1. La pâte à crêpes : balance à plateaux, puis verre doseur
   ===================================================================== */
const VC_MASSES = [500, 200, 100, 50, 20, 10];
function vcCrepesMonter(el){
  const st = { etape: 1, masses: [], lait: 0 };
  el.innerHTML = `<div class="vc-box">
    <div class="vc-recette"><b>🥞 Pâte à crêpes (pour 12 crêpes)</b><ul><li>250 g de farine</li><li>50 cL de lait</li><li>3 œufs</li><li>50 g de beurre fondu</li><li>30 g de sucre</li></ul></div>
    <div class="vc-zone"></div><div class="vc-msg" aria-live="polite"></div>
    <div class="vc-actions"><button type="button" class="btn secondary" data-a="recommencer"><span class="gicon">refresh</span> Recommencer</button></div>
    ${vcSavais('Une balance à deux plateaux est en équilibre quand les deux côtés ont la même masse. Les boulangers pèsent leur farine au gramme près, et pour une recette, 1 litre de lait, c\'est 100 centilitres.')}</div>`;
  const zone = el.querySelector('.vc-zone');
  const tot = () => st.masses.reduce((a, b) => a + b, 0);
  function balance(){
    const t = tot(), d = Math.max(-1, Math.min(1, (t - 250) / 250)), ang = d * 12; // le plateau le plus lourd descend (angle négatif : la farine)
    // Masses posées sur le plateau de droite (repère du plateau : surface en y = 60, de −42 à 42), 5 par rangée.
    const masses = st.masses.map((m, i) => { const big = m >= 100, h = big ? 22 : 15, x = -42 + (i % 5) * 17, y = 60 - (Math.floor(i / 5) + 1) * 23 + (22 - h);
      return `<g transform="translate(${x} ${y})"><rect width="16" height="${h}" rx="3" fill="${big ? '#4E5665' : '#B8962E'}"/><text x="8" y="${h / 2 + 3}" font-size="8" text-anchor="middle" fill="#fff" font-family="Space Grotesk" font-weight="700">${m}</text></g>`; }).join('');
    return `<svg viewBox="0 0 360 170" class="vc-svg" style="max-width:420px;"><polygon points="166,160 194,160 180,60" fill="#8E9AA8"/>
      <g transform="rotate(${ang} 180 60)"><line x1="70" y1="60" x2="290" y2="60" stroke="#4E5665" stroke-width="5" stroke-linecap="round"/>
        <g transform="translate(70 60) rotate(${-ang})"><line x1="0" y1="0" x2="-30" y2="60" stroke="#4E5665"/><line x1="0" y1="0" x2="30" y2="60" stroke="#4E5665"/><path d="M-45 60 h90 l-8 10 h-74 z" fill="#C8D1DC" stroke="#4E5665"/>
          <path d="M-28 58 q28 -34 56 0 z" fill="#F4E9D4" stroke="#B9A57E"/><text x="0" y="50" font-size="10" text-anchor="middle" fill="#7A6232" font-family="Space Grotesk" font-weight="700">farine</text></g>
        <g transform="translate(290 60) rotate(${-ang})"><line x1="0" y1="0" x2="-30" y2="60" stroke="#4E5665"/><line x1="0" y1="0" x2="30" y2="60" stroke="#4E5665"/><path d="M-45 60 h90 l-8 10 h-74 z" fill="#C8D1DC" stroke="#4E5665"/>
          ${masses}</g></g>
      <circle cx="180" cy="60" r="5" fill="#4E5665"/><text x="180" y="20" font-size="14" text-anchor="middle" fill="${t === 250 ? '#1F7A4D' : '#1F3A5C'}" font-family="Space Grotesk" font-weight="700">${t === 250 ? 'Équilibre !' : ''}</text></svg>`;
  }
  function verre(){
    const h = 150, y0 = 10, niv = y0 + h - st.lait / 100 * h;
    let grad = ''; for(let v = 0; v <= 100; v += 10){ const y = y0 + h - v / 100 * h; grad += `<line x1="150" y1="${y}" x2="${v % 50 ? 162 : 170}" y2="${y}" stroke="#1F3A5C" stroke-width="1.2"/>` + (v % 20 === 0 || v === 50 ? `<text x="176" y="${y + 4}" font-size="11" fill="#1F3A5C" font-family="Space Grotesk">${v === 100 ? '100 cL = 1 L' : v + ' cL'}</text>` : ''); }
    return `<svg viewBox="0 0 280 175" class="vc-svg" style="max-width:340px;"><rect x="90" y="${niv}" width="80" height="${y0 + h - niv}" fill="#E8F1FA"/><path d="M90 ${y0} V${y0 + h} H170 V${y0}" fill="none" stroke="#1F3A5C" stroke-width="3"/>
      <path d="M170 40 q30 0 30 30 v40 q0 20 -30 20" fill="none" stroke="#1F3A5C" stroke-width="3"/>${grad}
      <text x="130" y="${Math.min(y0 + h - 6, niv + 18)}" font-size="12" text-anchor="middle" fill="#2F6FB3" font-family="Space Grotesk" font-weight="700">${st.lait ? st.lait + ' cL' : ''}</text></svg>`;
  }
  function rendre(){
    if(st.etape === 1){
      zone.innerHTML = `<p class="vc-consigne"><b>Étape 1 :</b> pèse <b>250 g</b> de farine. Pose des masses sur le plateau de droite jusqu'à l'équilibre. Clique sur une masse posée pour la retirer.</p>
        ${balance()}<div class="vc-boutons">${VC_MASSES.map(m => `<button type="button" class="vc-masse${m >= 100 ? ' grosse' : ''}" data-m="${m}">${m} g</button>`).join('')}</div>
        <div class="vc-posees">${st.masses.length ? 'Sur le plateau : ' + st.masses.map((m, i) => `<button type="button" class="vc-posee" data-i="${i}">${m} g ✕</button>`).join(' ') + ` = <b>${tot()} g</b>` : 'Le plateau est vide.'}</div>`;
      zone.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { if(st.masses.length < 10){ st.masses.push(+b.dataset.m); st.masses.sort((a, c) => c - a); rendre(); verifier(); } });
      zone.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { st.masses.splice(+b.dataset.i, 1); rendre(); verifier(); });
    } else if(st.etape === 2){
      zone.innerHTML = `<p class="vc-consigne"><b>Étape 2 :</b> verse <b>50 cL</b> de lait dans le verre doseur.</p>${verre()}
        <div class="vc-boutons"><button type="button" class="btn secondary" data-l="10">+ 10 cL</button><button type="button" class="btn secondary" data-l="5">+ 5 cL</button><button type="button" class="btn secondary" data-l="-5">− 5 cL</button><button type="button" class="btn" data-a="lait">C'est versé</button></div>`;
      zone.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { st.lait = Math.max(0, Math.min(100, st.lait + +b.dataset.l)); rendre(); });
      zone.querySelector('[data-a="lait"]').onclick = () => {
        if(st.lait === 50){ st.etape = 3; rendre(); vcDire(el, vcBravo('Parfait : 50 cL de lait, c\'est la moitié du verre de 1 L.'), 'ok'); }
        else vcDire(el, vcAide(`Il y a ${st.lait} cL dans le verre. Regarde la graduation 50 cL.`), 'ko'); };
    } else {
      zone.innerHTML = `<p class="vc-consigne"><b>Étape 3 :</b> pour toute la classe, on fait <b>2 recettes</b>. Il faut donc 2 fois 50 cL de lait. Il reste une bouteille de <b>1 L</b>. Est-ce assez ?</p>
        <div class="vc-boutons"><button type="button" class="btn secondary" data-r="oui">Oui, c'est juste assez</button><button type="button" class="btn secondary" data-r="non">Non, il en manque</button></div>`;
      zone.querySelectorAll('[data-r]').forEach(b => b.onclick = () => vcDire(el, b.dataset.r === 'oui'
        ? vcBravo('Oui : 50 cL + 50 cL = 100 cL, et 100 cL = 1 L. La bouteille est juste assez grande. Bon appétit !') : vcAide('Calcule 50 cL + 50 cL, puis souviens-toi : 1 L = 100 cL.'), b.dataset.r === 'oui' ? 'ok' : 'ko'));
    }
  }
  function verifier(){
    const t = tot();
    if(t === 250){ vcDire(el, vcBravo(`Équilibre : ${st.masses.join(' g + ')} g = 250 g. La farine est pesée !`), 'ok'); setTimeout(() => { st.etape = 2; rendre(); vcDire(el, ''); }, 1800); }
    else vcDire(el, t ? `${t} g : ${t < 250 ? 'pas assez, le plateau de la farine descend.' : 'trop, le plateau des masses descend.'}` : '');
  }
  el.querySelector('[data-a="recommencer"]').onclick = () => { st.etape = 1; st.masses = []; st.lait = 0; rendre(); vcDire(el, ''); };
  rendre();
}

/* =====================================================================
   2. Le comptage des oiseaux : compter, tableau, diagramme en barres
   ===================================================================== */
const VC_OISEAUX = [['mésange', '#2F8FD8', '#F5D33B'], ['merle', '#2B2B2B', '#2B2B2B'], ['moineau', '#8B6A47', '#D9D4C7'], ['rouge-gorge', '#8A6A4E', '#E8722C']];
const vcOiseau = (x, y, o, s) => { const [, dos, ventre] = o; s = s || 1;
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="14" ry="10" fill="${dos}"/><ellipse cx="2" cy="4" rx="9" ry="6" fill="${ventre}"/><circle cx="11" cy="-7" r="6.5" fill="${dos}"/>${o[0] === 'rouge-gorge' ? `<circle cx="12" cy="-4" r="5.5" fill="${ventre}"/><ellipse cx="5" cy="1" rx="9" ry="6" fill="${ventre}"/>` : ''}${o[0] === 'moineau' ? '<ellipse cx="14" cy="-3" rx="3" ry="4" fill="#222"/><rect x="6" y="-12" width="9" height="3" rx="1.5" fill="#8E8E8E"/>' : ''}<circle cx="13" cy="-8.5" r="1.5" fill="#fff"/><polygon points="17,-7 23,-5.5 17,-4" fill="${o[0] === 'merle' ? '#F2A31B' : '#E3A13A'}"/><polygon points="-13,-2 -22,-6 -20,3" fill="${dos}"/><line x1="-2" y1="9" x2="-3" y2="15" stroke="#6B4423" stroke-width="1.4"/><line x1="4" y1="9" x2="5" y2="15" stroke="#6B4423" stroke-width="1.4"/></g>`; };
function vcOiseauxMonter(el){
  const st = { n: [], etape: 1, barres: [0, 0, 0, 0] };
  el.innerHTML = `<div class="vc-box"><div class="vc-zone"></div><div class="vc-msg" aria-live="polite"></div>
    <div class="vc-actions"><button type="button" class="btn secondary" data-a="nouveau"><span class="gicon">refresh</span> Un autre jardin</button></div>
    ${vcSavais('Chaque hiver, des milliers de familles comptent les oiseaux de leur jardin pendant une heure et envoient leurs résultats à des scientifiques. En rassemblant tous ces tableaux, ils savent quels oiseaux deviennent plus rares.')}</div>`;
  const zone = el.querySelector('.vc-zone');
  function jardin(){
    const pos = []; let g = 1;
    const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
    g = st.graine;
    // Une case par oiseau sur une grille invisible de 10 × 4 (au plus 36 oiseaux), petit décalage dans la case :
    // deux oiseaux ne se recouvrent jamais -- signalé : un merle était caché derrière un rouge-gorge.
    const cases = []; for(let r = 0; r < 4; r++) for(let c = 0; c < 10; c++) cases.push([28 + c * 48, 36 + r * 34]);
    for(let i = cases.length - 1; i > 0; i--){ const j = Math.floor(alea() * (i + 1)); [cases[i], cases[j]] = [cases[j], cases[i]]; }
    st.n.forEach((k, t) => { for(let i = 0; i < k; i++){ const [x, y] = cases[pos.length]; pos.push([x + (alea() - .5) * 4, y + (alea() - .5) * 4, t]); } });
    return `<svg viewBox="0 0 500 190" class="vc-svg" style="max-width:560px;"><rect width="500" height="190" rx="10" fill="#E8F5E1"/><path d="M0 150 Q120 135 250 150 T500 145 V190 H0 Z" fill="#B9DFA4"/>
      <rect x="400" y="20" width="10" height="150" fill="#8B5E3C"/><circle cx="405" cy="30" r="40" fill="#7CBF6A" opacity=".55"/>${pos.map(([x, y, t]) => vcOiseau(x, y, VC_OISEAUX[t], .95)).join('')}</svg>`;
  }
  function diag(){
    const H = 160, max = 10, X = i => 60 + i * 80, Y = v => 15 + H - v * H / max;
    let g = ''; for(let v = 0; v <= max; v++) g += `<line x1="40" y1="${Y(v)}" x2="380" y2="${Y(v)}" stroke="${v ? '#E1E8F0' : '#1F3A5C'}" stroke-width="${v ? 1 : 1.6}"/><text x="34" y="${Y(v) + 4}" font-size="10" text-anchor="end" fill="#1F3A5C" font-family="Space Grotesk">${v}</text>`;
    VC_OISEAUX.forEach((o, i) => { const v = st.barres[i];
      g += `<rect x="${X(i)}" y="${Y(v)}" width="50" height="${H + 15 - Y(v)}" fill="${o[1]}" opacity=".75" stroke="#1F3A5C"/><text x="${X(i) + 25}" y="${H + 32}" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${o[0]}</text>`;
      for(let v2 = 1; v2 <= max; v2++) g += `<rect x="${X(i) - 8}" y="${Y(v2) - H / max / 2}" width="66" height="${H / max}" fill="transparent" data-b="${i}" data-v="${v2}" style="cursor:pointer"/>`; });
    return `<svg viewBox="0 0 400 200" class="vc-svg vc-diag" style="max-width:460px;">${g}<line x1="40" y1="15" x2="40" y2="${15 + H}" stroke="#1F3A5C" stroke-width="1.6"/></svg>`;
  }
  function rendre(){
    const total = st.n.reduce((a, b) => a + b, 0), plus = VC_OISEAUX[st.n.indexOf(Math.max(...st.n))][0];
    if(st.etape === 1){
      zone.innerHTML = `<p class="vc-consigne"><b>Étape 1 :</b> compte les oiseaux de chaque sorte et remplis le tableau.</p>${jardin()}
        <div class="vc-tab"><table><tr><th>Oiseau</th>${VC_OISEAUX.map(o => `<th>${o[0]}<br><svg viewBox="-24 -16 50 34" width="44">${vcOiseau(0, 0, o)}</svg></th>`).join('')}</tr>
        <tr><th>Nombre</th>${VC_OISEAUX.map((o, i) => `<td><input type="text" inputmode="numeric" size="2" data-c="${i}" aria-label="Nombre de ${o[0]}s"></td>`).join('')}</tr></table></div>
        <div class="vc-boutons"><button type="button" class="btn" data-a="tab">Vérifier le tableau</button></div>`;
      zone.querySelector('[data-a="tab"]').onclick = () => {
        const v = [...zone.querySelectorAll('[data-c]')].map(i => vcEntier(i.value)), faux = v.map((x, i) => x !== st.n[i]);
        zone.querySelectorAll('[data-c]').forEach((i, k) => i.classList.toggle('vc-faux', faux[k]));
        if(faux.some(Boolean)) vcDire(el, vcAide('Une ou plusieurs cases sont fausses (en rouge). Astuce : barre chaque oiseau dans ta tête, ou compte une sorte à la fois.'), 'ko');
        else { vcDire(el, vcBravo('Le tableau est juste !'), 'ok'); setTimeout(() => { st.etape = 2; rendre(); vcDire(el, ''); }, 1200); } };
    } else if(st.etape === 2){
      zone.innerHTML = `<p class="vc-consigne"><b>Étape 2 :</b> trace le diagramme en barres : clique dans chaque colonne à la hauteur du nombre d'oiseaux.</p>
        <div class="vc-tab"><table><tr>${VC_OISEAUX.map((o, i) => `<td>${o[0]} : <b>${st.n[i]}</b></td>`).join('')}</tr></table></div>${diag()}
        <div class="vc-boutons"><button type="button" class="btn" data-a="diag">Vérifier le diagramme</button></div>`;
      zone.querySelectorAll('[data-b]').forEach(r => r.addEventListener('click', () => { st.barres[+r.dataset.b] = +r.dataset.v; rendre(); }));
      zone.querySelector('[data-a="diag"]').onclick = () => {
        const faux = VC_OISEAUX.map((o, i) => st.barres[i] !== st.n[i] ? o[0] : null).filter(Boolean);
        if(faux.length) vcDire(el, vcAide(`Regarde la barre : ${faux.join(', ')}. Sa hauteur doit être le nombre du tableau.`), 'ko');
        else { vcDire(el, vcBravo('Le diagramme est juste !'), 'ok'); setTimeout(() => { st.etape = 3; rendre(); vcDire(el, ''); }, 1200); } };
    } else {
      zone.innerHTML = `<p class="vc-consigne"><b>Étape 3 :</b> lis ton diagramme et réponds.</p>${diag()}
        <div class="vc-questions"><label>Quel oiseau est le plus nombreux ? <select data-q="1"><option value="">…</option>${VC_OISEAUX.map(o => `<option>${o[0]}</option>`).join('')}</select></label>
        <label>Combien d'oiseaux en tout ? <input type="text" inputmode="numeric" size="3" data-q="2"></label></div>
        <div class="vc-boutons"><button type="button" class="btn" data-a="q">Vérifier</button></div>`;
      zone.querySelectorAll('[data-b]').forEach(r => r.style.pointerEvents = 'none');
      zone.querySelector('[data-a="q"]').onclick = () => {
        const a = zone.querySelector('[data-q="1"]').value, b = vcEntier(zone.querySelector('[data-q="2"]').value);
        if(a === plus && b === total) vcDire(el, vcBravo(`Oui : la plus haute barre est celle du ${plus}, et ${st.n.join(' + ')} = ${total} oiseaux.`), 'ok');
        else vcDire(el, vcAide(a !== plus ? 'Le plus nombreux, c\'est celui qui a la plus haute barre.' : 'Pour le total, additionne les quatre nombres du tableau.'), 'ko'); };
    }
  }
  function nouveau(){
    do { st.n = VC_OISEAUX.map(() => vcHasard(2, 9)); } while(st.n.filter(x => x === Math.max(...st.n)).length > 1); // un seul « plus nombreux »
    st.graine = vcHasard(1, 9999); st.etape = 1; st.barres = [0, 0, 0, 0]; rendre(); vcDire(el, '');
  }
  el.querySelector('[data-a="nouveau"]').onclick = nouveau;
  nouveau();
}

/* =====================================================================
   3. Le concours de saut en longueur : convertir en cm, faire le podium
   ===================================================================== */
const VC_SAUTEURS = ['Léa', 'Tom', 'Inès', 'Hugo', 'Zoé', 'Sami', 'Lina', 'Noé'];
const vcMcm = cm => { const m = Math.floor(cm / 100), r = cm % 100; return r ? `${m} m ${r} cm` : `${m} m`; };
function vcSautMonter(el){
  const st = { sauts: [], podium: [] };
  el.innerHTML = `<div class="vc-box"><div class="vc-zone"></div><div class="vc-msg" aria-live="polite"></div>
    <div class="vc-actions"><button type="button" class="btn secondary" data-a="nouveau"><span class="gicon">refresh</span> Un autre concours</button></div>
    ${vcSavais('Au saut en longueur, on mesure du bord de la planche d\'appel jusqu\'à la marque la plus proche laissée dans le sable. Le record du monde dépasse 8 m 90 cm : c\'est presque la longueur de deux voitures !')}</div>`;
  const zone = el.querySelector('.vc-zone');
  function bac(){
    const X = cm => 40 + (cm - 100) * 1.5;
    let g = `<rect x="20" y="20" width="460" height="${st.sauts.length * 26 + 20}" rx="8" fill="#F3E2B8"/><rect x="34" y="20" width="6" height="${st.sauts.length * 26 + 20}" fill="#fff" stroke="#8B6B3A"/>`;
    for(let m = 1; m <= 4; m++) g += `<line x1="${X(m * 100)}" y1="14" x2="${X(m * 100)}" y2="${st.sauts.length * 26 + 46}" stroke="#8B6B3A" stroke-dasharray="4 3"/><text x="${X(m * 100)}" y="${st.sauts.length * 26 + 58}" font-size="11" text-anchor="middle" fill="#6B4E1E" font-family="Space Grotesk" font-weight="700">${m} m</text>`;
    st.sauts.forEach((s, i) => { const y = 38 + i * 26; g += `<line x1="40" y1="${y}" x2="${X(s.cm)}" y2="${y}" stroke="${['#E35D3A', '#2EA8C9', '#2E9C6A', '#7A4FC0', '#E9A21C'][i]}" stroke-width="3" stroke-dasharray="2 4"/><circle cx="${X(s.cm)}" cy="${y}" r="5" fill="${['#E35D3A', '#2EA8C9', '#2E9C6A', '#7A4FC0', '#E9A21C'][i]}"/><text x="${X(s.cm) + 9}" y="${y + 4}" font-size="11" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${s.nom}</text>`; });
    return `<svg viewBox="0 0 500 ${st.sauts.length * 26 + 66}" class="vc-svg" style="max-width:560px;">${g}</svg>`;
  }
  function rendre(){
    zone.innerHTML = `<p class="vc-consigne">Voici les résultats du concours de la classe, notés par des élèves différents. Écris chaque saut <b>en centimètres</b>, puis clique sur les noms dans l'ordre pour faire le <b>podium</b> (le plus long d'abord).</p>
      <div class="vc-tab"><table><tr><th>Élève</th><th>Saut noté</th><th>En centimètres</th></tr>${st.sauts.map((s, i) => `<tr><td><button type="button" class="vc-nom" data-p="${i}">${s.nom}</button></td><td>${s.note}</td><td><input type="text" inputmode="numeric" size="4" data-cm="${i}" aria-label="Saut de ${s.nom} en centimètres"> cm</td></tr>`).join('')}</table></div>
      <div class="vc-podium">Podium : ${[0, 1, 2].map(k => `<span class="vc-marche m${k + 1}">${k + 1}<sup>${k ? 'e' : 'er'}</sup> ${st.podium[k] != null ? st.sauts[st.podium[k]].nom : '…'}</span>`).join('')} <button type="button" class="btn secondary vc-petit" data-a="effacer">Effacer le podium</button></div>
      <div class="vc-boutons"><button type="button" class="btn" data-a="verif">Vérifier</button><button type="button" class="btn secondary" data-a="sable">Voir les marques dans le sable</button></div><div class="vc-sable"></div>`;
    zone.querySelectorAll('[data-p]').forEach(b => { b.classList.toggle('pris', st.podium.includes(+b.dataset.p)); b.onclick = () => { if(st.podium.length < 3 && !st.podium.includes(+b.dataset.p)){ const v = [...zone.querySelectorAll('[data-cm]')].map(i => i.value); st.podium.push(+b.dataset.p); rendre(); zone.querySelectorAll('[data-cm]').forEach((i, k) => i.value = v[k]); } }; });
    zone.querySelector('[data-a="effacer"]').onclick = () => { const v = [...zone.querySelectorAll('[data-cm]')].map(i => i.value); st.podium = []; rendre(); zone.querySelectorAll('[data-cm]').forEach((i, k) => i.value = v[k]); };
    zone.querySelector('[data-a="sable"]').onclick = () => { zone.querySelector('.vc-sable').innerHTML = bac(); };
    zone.querySelector('[data-a="verif"]').onclick = () => {
      const v = [...zone.querySelectorAll('[data-cm]')].map(i => vcEntier(i.value)), faux = st.sauts.map((s, i) => v[i] !== s.cm);
      zone.querySelectorAll('[data-cm]').forEach((i, k) => i.classList.toggle('vc-faux', faux[k]));
      const ordre = st.sauts.map((s, i) => i).sort((a, b) => st.sauts[b].cm - st.sauts[a].cm).slice(0, 3);
      if(faux.some(Boolean)) vcDire(el, vcAide('Une ou plusieurs conversions sont fausses (en rouge). Rappel : 1 m = 100 cm, donc 2 m 15 cm = 200 cm + 15 cm = 215 cm.'), 'ko');
      else if(st.podium.length < 3) vcDire(el, vcAide('Les conversions sont justes ! Fais maintenant le podium en cliquant sur trois noms.'), 'ko');
      else if(st.podium.join() !== ordre.join()) vcDire(el, vcAide('Le podium n\'est pas dans le bon ordre : compare les nombres en centimètres.'), 'ko');
      else vcDire(el, vcBravo(`Bravo ! ${ordre.map(i => `${st.sauts[i].nom} (${st.sauts[i].cm} cm)`).join(', ')}.`), 'ok'); };
  }
  function nouveau(){
    const noms = vcMelange(VC_SAUTEURS).slice(0, 5), vus = new Set();
    st.sauts = noms.map((nom, k) => { let cm; do { cm = vcHasard(150, 330); } while(vus.has(cm) || [...vus].some(x => Math.abs(x - cm) < 4)); vus.add(cm);
      const f = (k + vcHasard(0, 2)) % 3; return { nom, cm, note: f === 0 ? `${cm} cm` : f === 1 || cm % 100 === 0 ? vcMcm(cm) : `${Math.floor(cm / 100)} m et ${cm % 100} cm` }; });
    st.podium = []; rendre(); vcDire(el, '');
  }
  el.querySelector('[data-a="nouveau"]').onclick = nouveau;
  nouveau();
}

/* =====================================================================
   4. Le voyage en train : lire une fiche horaire, calculer des durées
   ===================================================================== */
const vcHm = m => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`;
const vcDuree = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ' ' + (m % 60) + ' min' : ''}` : `${m} min`;
function vcTrainMonter(el){
  const GARES = ['Nancy', 'Lunéville', 'Sarrebourg', 'Saverne', 'Strasbourg'];
  const st = {};
  el.innerHTML = `<div class="vc-box"><div class="vc-zone"></div><div class="vc-msg" aria-live="polite"></div>
    <div class="vc-actions"><button type="button" class="btn secondary" data-a="nouveau"><span class="gicon">refresh</span> Un autre train</button></div>
    ${vcSavais('Avant l\'arrivée du train, chaque ville avait sa propre heure, réglée sur le Soleil : midi à Strasbourg arrivait environ 20 minutes avant midi à Paris ! Pour que les horaires des trains soient les mêmes partout, la France a choisi une heure unique en 1891.')}</div>`;
  const zone = el.querySelector('.vc-zone');
  const lire = (h, m) => { const H = vcEntier(h), M = vcEntier(m); return isNaN(H) || isNaN(M) || M > 59 ? NaN : H * 60 + M; };
  function rendre(){
    const d = st.h[0], a = st.h[st.h.length - 1], i = st.i, j = st.j;
    zone.innerHTML = `<p class="vc-consigne">Voici la fiche horaire du train TER du matin. Réponds aux questions (heures et minutes).</p>
      <div class="vc-tab vc-horaire"><table><tr><th>Gare</th>${GARES.map(g => `<th>${g}</th>`).join('')}</tr><tr><th>Heure</th>${st.h.map(h => `<td>${vcHm(h)}</td>`).join('')}</tr></table></div>
      <div class="vc-questions">
        <label>À quelle heure le train arrive-t-il à <b>${GARES[4]}</b> ? <input size="2" inputmode="numeric" data-r="1h"> h <input size="2" inputmode="numeric" data-r="1m"> min</label>
        <label>Combien de temps dure le trajet de <b>${GARES[i]}</b> à <b>${GARES[j]}</b> ? <input size="2" inputmode="numeric" data-r="2h"> h <input size="2" inputmode="numeric" data-r="2m"> min</label>
        <label>Ce jour-là, le train part de ${GARES[0]} avec <b>${st.retard} minutes de retard</b>. À quelle heure arrive-t-il à ${GARES[4]} ? <input size="2" inputmode="numeric" data-r="3h"> h <input size="2" inputmode="numeric" data-r="3m"> min</label></div>
      <div class="vc-boutons"><button type="button" class="btn" data-a="verif">Vérifier</button></div><div class="vc-axe"></div>`;
    const v = k => zone.querySelector(`[data-r="${k}"]`).value;
    zone.querySelector('[data-a="verif"]').onclick = () => {
      const r1 = lire(v('1h'), v('1m')), r2 = lire(v('2h'), v('2m')), r3 = lire(v('3h'), v('3m'));
      const ok = [r1 === a, r2 === st.h[j] - st.h[i], r3 === a + st.retard];
      ['1', '2', '3'].forEach((k, n) => zone.querySelectorAll(`[data-r^="${k}"]`).forEach(x => x.classList.toggle('vc-faux', !ok[n])));
      // Axe du temps de la question 2 : on avance jusqu'à l'heure pile, puis d'heure en heure, puis les minutes.
      const de = st.h[i], fin = st.h[j], bonds = []; let x = de;
      const hp = Math.ceil(de / 60) * 60; if(hp > x && hp <= fin){ bonds.push([hp - x, (hp - x) + ' min']); x = hp; }
      while(x + 60 <= fin){ bonds.push([60, '1 h']); x += 60; } if(x < fin) bonds.push([fin - x, (fin - x) + ' min']);
      zone.querySelector('.vc-axe').innerHTML = ok[1] ? '' : `<p class="hint" style="margin:8px 0 0;">Aide pour la durée : on avance sur l'axe du temps.</p>` + cmSauts(Math.floor(de / 15) * 15, Math.ceil(fin / 15) * 15, de, bonds, { pas: 15, fmt: vcHm, px: 460 });
      if(ok.every(Boolean)) vcDire(el, vcBravo(`Tout est juste ! Le trajet de ${GARES[i]} à ${GARES[j]} dure ${vcDuree(st.h[j] - st.h[i])}, et avec le retard le train arrive à ${vcHm(a + st.retard)}.`), 'ok');
      else vcDire(el, vcAide('Les réponses en rouge sont fausses. Pour une durée, avance de l\'heure de départ jusqu\'à l\'heure pile, puis compte les heures et les minutes.'), 'ko'); };
  }
  function nouveau(){
    let t = vcHasard(7, 9) * 60 + vcHasard(0, 11) * 5 + 2; st.h = [t];
    [vcHasard(18, 26), vcHasard(22, 34), vcHasard(14, 22), vcHasard(26, 38)].forEach(e => { t += e; st.h.push(t); });
    st.i = vcHasard(0, 1); st.j = vcHasard(3, 4); st.retard = [10, 15, 20, 25][vcHasard(0, 3)];
    rendre(); vcDire(el, '');
  }
  el.querySelector('[data-a="nouveau"]').onclick = nouveau;
  nouveau();
}

/* =====================================================================
   5. Le découpage plié : on découpe une moitié, on déplie, on retrouve un modèle
   ===================================================================== */
const VC_MOTIFS = [
  { nom: 'le sapin', c: ['5,0', '4,1', '5,1', '3,2', '4,2', '5,2', '4,3', '5,3', '2,4', '3,4', '4,4', '5,4', '5,5', '5,6'] },
  { nom: 'le cœur', c: ['2,1', '3,1', '1,2', '2,2', '3,2', '4,2', '1,3', '2,3', '3,3', '4,3', '5,3', '2,4', '3,4', '4,4', '5,4', '3,5', '4,5', '5,5', '4,6', '5,6', '5,7'] },
  { nom: 'la maison', c: ['5,0', '4,1', '5,1', '3,2', '4,2', '5,2', '2,3', '3,3', '4,3', '5,3', '3,4', '4,4', '5,4', '3,5', '5,5', '3,6', '5,6'] },
  { nom: 'le papillon', c: ['0,1', '1,1', '0,2', '1,2', '2,2', '4,2', '1,3', '2,3', '3,3', '4,3', '5,3', '3,4', '4,4', '5,4', '1,5', '2,5', '3,5', '4,5', '1,6', '2,6', '5,1', '5,2', '5,5', '5,6'] },
];
function vcPliageMonter(el){
  const W = 6, H = 8, K = 26, st = { coupe: new Set(), deplie: 0, modele: null, anim: null };
  el.innerHTML = `<div class="vc-box"><div class="vc-zone"></div><div class="vc-msg" aria-live="polite"></div>
    ${vcSavais('Au Mexique, en Chine ou en Pologne, on décore les fenêtres et les fêtes avec des papiers découpés. Les artistes plient leur feuille avant de couper : un seul coup de ciseaux dessine les deux côtés à la fois, parfaitement symétriques.')}</div>`;
  const zone = el.querySelector('.vc-zone');
  function feuille(){
    const k = st.deplie, dx = 2 * W * K + 20;
    let g = `<rect x="10" y="10" width="${W * K}" height="${H * K}" fill="#FFF8E7" stroke="#C9B48A"/>`;
    for(let x = 0; x < W; x++) for(let y = 0; y < H; y++){ const on = st.coupe.has(x + ',' + y); g += `<rect x="${10 + x * K}" y="${10 + y * K}" width="${K}" height="${K}" fill="${on ? '#E35D3A' : 'transparent'}" stroke="#E5DCC6" data-x="${x}" data-y="${y}" style="cursor:pointer"/>`; }
    // La moitié de droite apparaît en se dépliant (échelle horizontale de 0 à 1 autour du pli).
    let d = ''; for(let x = 0; x < W; x++) for(let y = 0; y < H; y++) if(st.coupe.has(x + ',' + y)) d += `<rect x="${10 + (2 * W - 1 - x) * K}" y="${10 + y * K}" width="${K}" height="${K}" fill="#E35D3A" opacity=".85"/>`;
    g += k > 0 ? `<g transform="translate(${10 + W * K} 0) scale(${k} 1) translate(${-(10 + W * K)} 0)"><rect x="${10 + W * K}" y="10" width="${W * K}" height="${H * K}" fill="#FFF3D6" stroke="#C9B48A"/>${d}</g>` : '';
    g += `<line x1="${10 + W * K}" y1="4" x2="${10 + W * K}" y2="${16 + H * K}" stroke="#7A4FC0" stroke-width="3" stroke-dasharray="8 5"/><text x="${10 + W * K}" y="${H * K + 30}" font-size="11" text-anchor="middle" fill="#7A4FC0" font-family="Space Grotesk" font-weight="700">pli</text>`;
    return `<svg viewBox="0 0 ${dx} ${H * K + 36}" class="vc-svg" style="max-width:${dx + 40}px;">${g}</svg>`;
  }
  const mini = m => { let g = ''; for(let x = 0; x < 2 * W; x++) for(let y = 0; y < H; y++){ const xx = x < W ? x : 2 * W - 1 - x; if(m.c.includes(xx + ',' + y)) g += `<rect x="${x * 9}" y="${y * 9}" width="9" height="9" fill="#2EA8C9"/>`; } return `<svg viewBox="-1 -1 ${2 * W * 9 + 2} ${H * 9 + 2}" width="${2 * W * 9 + 2}"><rect x="-1" y="-1" width="${2 * W * 9 + 2}" height="${H * 9 + 2}" fill="#fff" stroke="#C9B48A"/>${g}<line x1="${W * 9}" y1="-1" x2="${W * 9}" y2="${H * 9 + 1}" stroke="#7A4FC0" stroke-dasharray="3 2"/></svg>`; };
  function rendre(){
    zone.innerHTML = `<p class="vc-consigne">La feuille est <b>pliée</b> en deux le long du trait violet. Colorie les cases à découper sur la moitié de gauche, puis clique sur <b>Déplier</b>.${st.modele ? ` Défi : obtiens <b>${st.modele.nom}</b> du modèle.` : ''}</p>
      <div class="vc-pliage">${feuille()}${st.modele ? `<div class="vc-modele">Modèle :<br>${mini(st.modele)}</div>` : ''}</div>
      <div class="vc-boutons"><button type="button" class="btn" data-a="deplier">${st.deplie ? 'Replier' : 'Déplier'}</button><button type="button" class="btn secondary" data-a="effacer">Nouvelle feuille</button>
        <button type="button" class="btn secondary" data-a="defi">Un défi : reproduire un modèle</button>${st.modele ? '<button type="button" class="btn secondary" data-a="libre">Découpage libre</button>' : ''}</div>`;
    zone.querySelectorAll('[data-x]').forEach(r => r.addEventListener('click', () => { if(st.deplie) return; const c = r.dataset.x + ',' + r.dataset.y; st.coupe.has(c) ? st.coupe.delete(c) : st.coupe.add(c); rendre(); }));
    zone.querySelector('[data-a="deplier"]').onclick = () => {
      cancelAnimationFrame(st.anim); const de = st.deplie, but = de ? 0 : 1, t0 = performance.now();
      const pas = now => { const k = Math.min(1, (now - t0) / 900); st.deplie = de + (but - de) * k; rendre(); if(k < 1) st.anim = requestAnimationFrame(pas); else fin(but); };
      st.anim = requestAnimationFrame(pas); };
    zone.querySelector('[data-a="effacer"]').onclick = () => { st.coupe.clear(); st.deplie = 0; rendre(); vcDire(el, ''); };
    zone.querySelector('[data-a="defi"]').onclick = () => { st.modele = VC_MOTIFS[vcHasard(0, VC_MOTIFS.length - 1)]; st.coupe.clear(); st.deplie = 0; rendre(); vcDire(el, 'Regarde la moitié de gauche du modèle : c\'est elle qu\'il faut colorier.'); };
    const l = zone.querySelector('[data-a="libre"]'); if(l) l.onclick = () => { st.modele = null; st.coupe.clear(); st.deplie = 0; rendre(); vcDire(el, ''); };
  }
  function fin(deplie){
    if(!deplie){ vcDire(el, ''); return; }
    if(!st.modele){ vcDire(el, st.coupe.size ? 'Les deux moitiés sont <b>symétriques</b> : le pli est l\'<b>axe de symétrie</b>. Si on replie, elles se superposent exactement.' : 'Colorie d\'abord des cases sur la moitié de gauche.'); return; }
    const ok = st.modele.c.length === st.coupe.size && st.modele.c.every(c => st.coupe.has(c));
    vcDire(el, ok ? vcBravo(`C'est ${st.modele.nom} du modèle ! Le pli est son axe de symétrie.`) : vcAide('Ce n\'est pas tout à fait le modèle. Replie, compare la moitié de gauche case par case, puis corrige.'), ok ? 'ok' : 'ko');
  }
  rendre();
}

/* =====================================================================
   6. Les courses avec 20 € : choisir, additionner, ce qui reste
   ===================================================================== */
const VC_RAYON = [['une baguette', '🥖', 95], ['des pommes', '🍎', 245], ['un jus de fruits', '🧃', 180], ['un paquet de gâteaux', '🍪', 215], ['du fromage', '🧀', 360], ['des yaourts', '🥛', 160], ['une bande dessinée', '📖', 1150], ['un ballon', '⚽', 790], ['des crayons', '🖍️', 425], ['un cahier', '📓', 230], ['du chocolat', '🍫', 185], ['des bananes', '🍌', 210]];
const vcEu = c => `${Math.floor(c / 100)},${String(c % 100).padStart(2, '0')} €`;
const vcLireEu = s => { const v = String(s || '').replace(/\s|€/g, '').replace('.', ','); const m = v.match(/^(\d+)(?:,(\d{1,2}))?$/); return m ? +m[1] * 100 + (m[2] ? +(m[2].padEnd(2, '0')) : 0) : NaN; };
function vcCoursesMonter(el){
  const st = { panier: [], rayon: [], mission: null };
  el.innerHTML = `<div class="vc-box"><div class="vc-zone"></div><div class="vc-msg" aria-live="polite"></div>
    <div class="vc-actions"><button type="button" class="btn secondary" data-a="nouveau"><span class="gicon">refresh</span> Une autre mission</button></div>
    ${vcSavais('La virgule d\'un prix sépare les euros des centimes : 2,45 €, c\'est 2 euros et 45 centimes. Pour faire ses courses, on additionne d\'abord les euros, puis les centimes… et 100 centimes font 1 euro !')}</div>`;
  const zone = el.querySelector('.vc-zone');
  function rendre(){
    const tot = st.panier.reduce((s, i) => s + st.rayon[i][2], 0);
    zone.innerHTML = `<p class="vc-consigne">Tu as <b>20 €</b>. Mission : ${st.mission.texte} Clique sur les articles pour les mettre dans ton panier (clique dans le panier pour en retirer un).</p>
      <div class="vc-rayon">${st.rayon.map((a, i) => `<button type="button" class="vc-article${st.panier.includes(i) ? ' pris' : ''}" data-i="${i}"><span class="vc-emoji">${a[1]}</span>${a[0]}<b>${vcEu(a[2])}</b></button>`).join('')}</div>
      <div class="vc-panier"><b>🧺 Mon panier :</b> ${st.panier.length ? st.panier.map(i => `<button type="button" class="vc-posee" data-p="${i}">${st.rayon[i][1]} ${vcEu(st.rayon[i][2])} ✕</button>`).join(' ') : 'vide'}</div>
      <div class="vc-questions"><label>Total de mon panier : <input size="6" data-t="1" inputmode="decimal"> €</label><label>Il me reste : <input size="6" data-t="2" inputmode="decimal"> €</label></div>
      <div class="vc-boutons"><button type="button" class="btn" data-a="payer">Passer à la caisse</button></div>`;
    zone.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { const i = +b.dataset.i; if(!st.panier.includes(i)){ st.panier.push(i); rendre(); vcDire(el, ''); } });
    zone.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { st.panier = st.panier.filter(i => i !== +b.dataset.p); rendre(); vcDire(el, ''); });
    zone.querySelector('[data-a="payer"]').onclick = () => {
      const t = vcLireEu(zone.querySelector('[data-t="1"]').value), r = vcLireEu(zone.querySelector('[data-t="2"]').value), m = st.mission.ok(st.panier.map(i => st.rayon[i]));
      zone.querySelector('[data-t="1"]').classList.toggle('vc-faux', t !== tot); zone.querySelector('[data-t="2"]').classList.toggle('vc-faux', r !== 2000 - tot);
      if(!st.panier.length) vcDire(el, vcAide('Ton panier est vide !'), 'ko');
      else if(tot > 2000) vcDire(el, vcAide(`Ton panier coûte ${vcEu(tot)} : c'est plus que 20 €. Retire un article.`), 'ko');
      else if(m !== true) vcDire(el, vcAide(m), 'ko');
      else if(t !== tot) vcDire(el, vcAide('Le total n\'est pas juste. Additionne les euros, puis les centimes (100 centimes = 1 euro).'), 'ko');
      else if(r !== 2000 - tot) vcDire(el, vcAide(`Le total est juste. Pour ce qui reste, complète de ${vcEu(tot)} jusqu'à 20 € : d'abord jusqu'à l'euro suivant, puis jusqu'à 20 €.`), 'ko');
      else vcDire(el, vcBravo(`Mission réussie ! Tu dépenses ${vcEu(tot)} et il te reste ${vcEu(2000 - tot)}.`), 'ok'); };
  }
  const MISSIONS = [
    { texte: 'achète de quoi faire un <b>goûter pour 4 amis</b> : au moins 3 articles à manger ou à boire.', ok: l => l.filter(a => !['📖', '⚽', '🖍️', '📓'].includes(a[1])).length >= 3 || 'Il faut au moins 3 articles à manger ou à boire pour le goûter.' },
    { texte: 'achète <b>exactement 4 articles différents</b>.', ok: l => l.length === 4 || `Ton panier a ${l.length} article${l.length > 1 ? 's' : ''} : il en faut exactement 4.` },
    { texte: 'achète <b>une bande dessinée</b> et d\'autres choses, sans dépasser 20 €.', ok: l => l.some(a => a[1] === '📖') || 'N\'oublie pas la bande dessinée !' },
    { texte: 'remplis ton panier pour qu\'il te reste <b>moins de 5 €</b>.', ok: l => 2000 - l.reduce((s, a) => s + a[2], 0) < 500 || 'Il te reste trop d\'argent : il doit rester moins de 5 €.' },
  ];
  // La mission doit être possible avec les 8 articles du rayon : on essaie tous les paniers (256 au plus).
  const possible = (rayon, m) => { for(let k = 1; k < 1 << rayon.length; k++){ const l = rayon.filter((a, i) => k & (1 << i)); if(l.reduce((s, a) => s + a[2], 0) <= 2000 && m.ok(l) === true) return true; } return false; };
  function nouveau(){
    do { st.rayon = vcMelange(VC_RAYON).slice(0, 8); st.mission = MISSIONS[vcHasard(0, MISSIONS.length - 1)];
      if(st.mission.texte.includes('bande dessinée') && !st.rayon.some(a => a[1] === '📖')) st.rayon[0] = VC_RAYON.find(a => a[1] === '📖');
    } while(!possible(st.rayon, st.mission));
    st.panier = []; rendre(); vcDire(el, ''); }
  el.querySelector('[data-a="nouveau"]').onclick = nouveau;
  nouveau();
}

function vcInitTout(racine){
  if(!racine) return;
  [['.vc-crepes', vcCrepesMonter], ['.vc-oiseaux', vcOiseauxMonter], ['.vc-saut', vcSautMonter], ['.vc-train', vcTrainMonter], ['.vc-pliage-act', vcPliageMonter], ['.vc-courses', vcCoursesMonter]]
    .forEach(([sel, f]) => racine.querySelectorAll(sel).forEach(f));
}

(function vcStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .vc-box{ display:flex; flex-direction:column; gap:10px; }
    .vc-svg{ width:100%; display:block; margin:4px auto; }
    .vc-consigne{ margin:0; line-height:1.5; }
    .vc-recette{ background:#FFF6E8; border:1px solid #F0D9B5; border-radius:12px; padding:8px 14px; }
    .vc-recette ul{ margin:4px 0 0; padding-left:20px; columns:2; }
    .vc-boutons, .vc-actions{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; }
    .vc-masse{ border:none; border-radius:6px; padding:8px 12px; font:700 .95rem 'Space Grotesk',sans-serif; color:#fff; background:#B8962E; cursor:pointer; }
    .vc-masse.grosse{ background:#4E5665; }
    .vc-posees, .vc-panier{ text-align:center; }
    .vc-posee{ border:1px solid #CBD5E1; background:#fff; border-radius:999px; padding:3px 9px; margin:2px; cursor:pointer; font:600 .85rem Inter,sans-serif; }
    .vc-msg{ min-height:1.4em; text-align:center; line-height:1.5; }
    .vc-msg.ok{ color:#1F7A4D; font-weight:600; } .vc-msg.ko{ color:#A0522D; }
    .vc-msg .gicon{ vertical-align:-4px; }
    .vc-tab{ overflow-x:auto; } .vc-tab table{ border-collapse:collapse; margin:0 auto; }
    .vc-tab th, .vc-tab td{ border:1px solid #CBD5E1; padding:5px 10px; text-align:center; font-size:.92rem; }
    .vc-tab th{ background:#EEF4FB; }
    .vc-tab input, .vc-questions input{ text-align:center; font:700 1rem 'Space Grotesk',sans-serif; border:1.5px solid #9DB0C6; border-radius:6px; padding:3px 4px; }
    .vc-faux{ border-color:#D9534F !important; background:#FDECEA; }
    .vc-questions{ display:flex; flex-direction:column; gap:8px; align-items:center; }
    .vc-questions select{ font:600 .95rem Inter,sans-serif; padding:3px; }
    .vc-nom{ border:1.5px solid #9DB0C6; background:#fff; border-radius:999px; padding:3px 12px; font:700 .9rem 'Space Grotesk',sans-serif; cursor:pointer; }
    .vc-nom.pris{ background:#E7F3EC; border-color:#2E9C6A; }
    .vc-podium{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; align-items:center; font-weight:600; }
    .vc-marche{ background:#FFF3D6; border:1px solid #E9C46A; border-radius:8px; padding:4px 10px; } .vc-marche.m1{ background:#FCE7A8; }
    .vc-petit{ padding:4px 10px; font-size:.82rem; }
    .vc-horaire td{ font:700 1rem 'Space Grotesk',sans-serif; color:#1F3A5C; }
    .vc-pliage{ display:flex; flex-wrap:wrap; gap:14px; align-items:center; justify-content:center; }
    .vc-pliage .vc-svg{ max-width:380px; }
    .vc-modele{ text-align:center; font-weight:600; font-size:.9rem; }
    .vc-rayon{ display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:8px; }
    .vc-article{ display:flex; flex-direction:column; align-items:center; gap:2px; border:1.5px solid #D5DFEA; border-radius:12px; background:#fff; padding:8px; cursor:pointer; font:600 .85rem Inter,sans-serif; color:#1F3A5C; }
    .vc-article b{ font:700 1rem 'Space Grotesk',sans-serif; color:#B7791F; }
    .vc-article.pris{ background:#E7F3EC; border-color:#2E9C6A; }
    .vc-emoji{ font-size:1.7rem; }
    .vc-savais{ background:#F4F1FB; border-left:4px solid #7A4FC0; border-radius:8px; padding:8px 12px; line-height:1.5; font-size:.92rem; }
    .vc-savais .gicon{ color:#7A4FC0; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();
