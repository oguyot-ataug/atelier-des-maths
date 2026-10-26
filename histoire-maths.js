/* =====================================================================
   histoire-maths.js -- Maths et histoire : sept activités et une page Histoire (onglet « Maths & la vie »).
   Demandé : « Que peux-tu proposer pour maths et histoire avant de construire ? », puis « Fais le tout. Insiste
   aussi dans le piège des historiens sur les dates des changements de siècle et de millénaire ».
   Les maths au service des hommes du passé (compter, dater, construire, coder) ; une activité par niveau.

   1. « Compter comme les Égyptiens et les Romains » (CM1 Nombres entiers jusqu'à 9 999) : écrire en hiéroglyphes,
      lire une date en chiffres romains ; pourquoi la position et le zéro simplifient tout.
   2. « La multiplication des scribes égyptiens » (CM2 Multiplication) : doublements successifs (papyrus Rhind).
   3. « Pourquoi 60 minutes dans une heure ? » (6e Heures et durée) : compter jusqu'à 60 sur ses doigts comme les
      Babyloniens ; calculs de durées avec retenue de 60.
   4. « La frise chronologique » (5e Nombres relatifs) : dates avant J.-C. en négatif, temps écoulé ; le piège
      des historiens : pas d'année 0, siècles de 1 à 100, 21e siècle et 3e millénaire commencés en 2001.
   5. « La pyramide de Khéops » (4e Espace) : volume d'une pyramide, nombre de blocs, rythme du chantier.
   6. « Thalès mesure la pyramide » (4e Triangles et parallèles) : ombres et rayons parallèles, proportionnalité.
   7. « Casser le code de Jules César » (3e Statistiques) : chiffrement par décalage, fréquences des lettres.

   Placement : <div class="hi-numeration">, <div class="hi-egypte">, <div class="hi-base60">, <div class="hi-frise">,
   <div class="hi-kheops">, <div class="hi-thales">, <div class="hi-cesar"> ; hiInitTout(conteneur). HI_HISTOIRE_HTML.
   ===================================================================== */
const hiN = (v, d) => (+v).toLocaleString('fr-FR', { maximumFractionDigits: d == null ? 0 : d });
const hiS = v => v < 0 ? '−' + hiN(-v) : hiN(v);
const hiAn = a => a < 0 ? '−' + (-a) : String(a);                                  // une année s'écrit sans espace : 1918, −3300
const hiAlea = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function hiDire(el, h, cls){ const m = el.querySelector('.hi-msg'); if(!m) return; m.className = 'hi-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }
function hiRomain(n){ let r = ''; [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']].forEach(([v, s]) => { while(n >= v){ r += s; n -= v; } }); return r; }

/* =====================================================================
   1. Compter comme les Égyptiens et les Romains (CM1)
   ===================================================================== */
// Hiéroglyphes dessinés (pas de police spéciale) : bâton 1, anse 10, corde enroulée 100, fleur de lotus 1 000.
const HI_HIERO = {
  1000: '<path d="M12,30 V12" stroke="#2E5E30" stroke-width="2.4"/><path d="M12,13 C4,10 3,3 7,1 C9,5 11,6 12,9 C13,6 15,5 17,1 C21,3 20,10 12,13 Z" fill="#3E8E4E"/><path d="M4,26 Q12,20 20,26" fill="none" stroke="#2E5E30" stroke-width="2"/>',
  100: '<path d="M12,16 m0,0 a2,2 0 1 1 2,2 a4,4 0 1 1 -4,-4 a6,6 0 1 1 6,6 a8,8 0 1 1 -8,-8 M12,6 V30" fill="none" stroke="#8B5E3C" stroke-width="2"/>',
  10: '<path d="M5,30 V14 A7,7 0 0 1 19,14 V30" fill="none" stroke="#2F4E8B" stroke-width="3" stroke-linecap="round"/>',
  1: '<path d="M12,4 V30" stroke="#8E3B2E" stroke-width="3.4" stroke-linecap="round"/>' };
const hiGlyphe = v => `<svg class="hi-glyphe" viewBox="0 0 24 32" aria-label="${v}">${HI_HIERO[v]}</svg>`;
const HI_DATES = [[1789, 'Sur le fronton d\'un bâtiment de la Révolution'], [1515, 'Sur une plaque qui rappelle la bataille de Marignan'], [1492, 'Sur la carte d\'un navigateur'], [1918, 'Sur un monument aux morts'],
  [2026, 'Au générique d\'un film de cette année'], [800, 'Sur un livre consacré au couronnement de Charlemagne'], [1666, 'Au-dessus de la porte d\'une vieille maison'], [1944, 'Sur une plaque de la Libération'], [1889, 'Sur une gravure de la tour Eiffel']];
function hiNumerationMonter(el){
  const st = { cible: 0, pose: { 1000: 0, 100: 0, 10: 0, 1: 0 }, date: null };
  el.innerHTML = `<div class="hi-box">
    <div class="hi-part"><b class="hi-part-t"><span class="gicon">edit</span> Écris comme un scribe égyptien</b>
      <div class="hi-consigne">Il y a 5 000 ans, les Égyptiens écrivaient les nombres avec des dessins : un <b>bâton</b> pour 1, une <b>anse</b> pour 10, une <b>corde enroulée</b> pour 100, une <b>fleur de lotus</b> pour 1 000. Écris le nombre demandé.</div>
      <div class="hi-cible"></div>
      <div class="hi-palette">${[1000, 100, 10, 1].map(v => `<button type="button" data-g="${v}">${hiGlyphe(v)}<small>${hiN(v)}</small></button>`).join('')}</div>
      <div class="hi-papyrus"></div>
      <div class="hi-actions"><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button><button type="button" class="btn secondary" data-a="effacer"><span class="gicon">undo</span> Effacer</button><button type="button" class="btn secondary" data-a="autre"><span class="gicon">refresh</span> Un autre nombre</button></div>
      <div class="hi-msg" aria-live="polite"></div></div>
    <div class="hi-part"><b class="hi-part-t"><span class="gicon">account_balance</span> Lis une date en chiffres romains</b>
      <div class="hi-consigne">Les Romains utilisaient des lettres : <b>I</b> = 1, <b>V</b> = 5, <b>X</b> = 10, <b>L</b> = 50, <b>C</b> = 100, <b>D</b> = 500, <b>M</b> = 1 000. Une lettre placée <b>avant</b> une lettre plus grande se retranche : IV = 4, IX = 9, XC = 90, CM = 900.</div>
      <div class="hi-monument"></div>
      <div class="hi-actions"><label>Cette date est l'année <input type="number" min="1" max="9999" data-a="annee" style="width:80px;"></label><button type="button" class="btn" data-a="lire"><span class="gicon">task_alt</span> Vérifier</button><button type="button" class="btn secondary" data-a="date"><span class="gicon">refresh</span> Une autre date</button></div>
      <div class="hi-msg2" aria-live="polite"></div></div></div>`;
  const $ = s => el.querySelector(s);
  function papyrus(){
    const l = [1000, 100, 10, 1].flatMap(v => Array(st.pose[v]).fill(v));
    $('.hi-papyrus').innerHTML = l.length ? l.map(v => `<button type="button" data-r="${v}" title="Retirer">${hiGlyphe(v)}</button>`).join('') : '<span class="hi-vide">Ton papyrus est vide.</span>';
    el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { st.pose[+b.dataset.r]--; papyrus(); });
  }
  function autre(){
    st.cible = hiAlea(1001, 9999); st.pose = { 1000: 0, 100: 0, 10: 0, 1: 0 };
    $('.hi-cible').innerHTML = `Écris <b>${hiN(st.cible)}</b> en hiéroglyphes.`; papyrus(); hiDire(el, '');
  }
  function verifier(){
    const c = [Math.floor(st.cible / 1000), Math.floor(st.cible / 100) % 10, Math.floor(st.cible / 10) % 10, st.cible % 10];
    const ok = st.pose[1000] === c[0] && st.pose[100] === c[1] && st.pose[10] === c[2] && st.pose[1] === c[3];
    const nb = c.reduce((a, b) => a + b, 0);
    hiDire(el, (ok ? '<span class="gicon">celebration</span> Bravo, un vrai scribe ! ' : '<span class="gicon">info</span> Regarde bien : ')
      + `<div class="hi-etapes"><div>${hiN(st.cible)} = ${c[0]} millier${c[0] > 1 ? 's' : ''}, ${c[1]} centaine${c[1] > 1 ? 's' : ''}, ${c[2]} dizaine${c[2] > 1 ? 's' : ''} et ${c[3]} unité${c[3] > 1 ? 's' : ''}.</div><div>Il faut donc ${c[0]} lotus, ${c[1]} corde${c[1] > 1 ? 's' : ''}, ${c[2]} anse${c[2] > 1 ? 's' : ''} et ${c[3]} bâton${c[3] > 1 ? 's' : ''} : <b>${nb} dessins</b>.</div></div>`
      + `Nous, nous écrivons ce nombre avec seulement 4 chiffres : chaque chiffre change de valeur selon sa <b>position</b>, et le <b>zéro</b> marque une place vide. Les Égyptiens n'avaient pas de zéro.`, ok ? 'ok' : 'ko');
  }
  function date(){
    const l = HI_DATES.filter(d => d !== st.date); st.date = l[Math.floor(Math.random() * l.length)];
    $('.hi-monument').innerHTML = `<div class="hi-pierre"><span>${hiRomain(st.date[0])}</span></div><div class="hi-legende">${st.date[1]}</div>`;
    $('[data-a="annee"]').value = ''; $('.hi-msg2').innerHTML = '';
  }
  function lire(){
    const n = st.date[0], g = parseInt($('[data-a="annee"]').value, 10), ok = g === n, parts = [];
    [[1000, 'milliers'], [100, 'centaines'], [10, 'dizaines'], [1, 'unités']].forEach(([v]) => { const k = Math.floor(n / v) % 10 * v; if(k) parts.push(k); });
    const m = $('.hi-msg2');
    m.className = 'hi-msg2 ' + (ok ? 'ok' : 'ko');
    m.innerHTML = (ok ? '<span class="gicon">celebration</span> Exact ! ' : '<span class="gicon">info</span> On découpe la date : ')
      + `<div class="hi-etapes">${parts.map(k => `<div><b>${hiRomain(k)}</b> = ${hiN(k)}</div>`).join('')}<div>${parts.map(hiN).join(' + ')} = <b>${hiAn(n)}</b></div></div>`;
  }
  el.querySelectorAll('[data-g]').forEach(b => b.onclick = () => { if(st.pose[+b.dataset.g] < 9){ st.pose[+b.dataset.g]++; papyrus(); } });
  $('[data-a="verif"]').onclick = verifier;
  $('[data-a="effacer"]').onclick = () => { st.pose = { 1000: 0, 100: 0, 10: 0, 1: 0 }; papyrus(); };
  $('[data-a="autre"]').onclick = autre;
  $('[data-a="lire"]').onclick = lire;
  $('[data-a="date"]').onclick = date;
  autre(); date();
}

/* =====================================================================
   2. La multiplication des scribes égyptiens (CM2)
   ===================================================================== */
function hiEgypteMonter(el){
  const st = { a: 0, b: 0, lignes: [], coche: new Set(), fini: false };
  el.innerHTML = `<div class="hi-box">
    <div class="hi-consigne">Vers 1650 avant J.-C., le scribe <b>Ahmès</b> recopie sur un papyrus des problèmes de calcul. Pour multiplier, les Égyptiens ne connaissaient pas les tables : ils savaient seulement <b>doubler</b> et <b>additionner</b>. À toi d'essayer !</div>
    <div class="hi-cible"></div>
    <table class="hi-doubles"><thead><tr><th></th><th>colonne de 1</th><th class="hi-b"></th></tr></thead><tbody></tbody></table>
    <div class="hi-actions"><button type="button" class="btn" data-a="doubler"><span class="gicon">exposure_plus_2</span> Doubler les deux colonnes</button><button type="button" class="btn" data-a="addition" style="background:#8E3B2E;"><span class="gicon">functions</span> Additionner les lignes cochées</button><button type="button" class="btn secondary" data-a="autre"><span class="gicon">refresh</span> Une autre multiplication</button></div>
    <div class="hi-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s);
  function autre(){
    st.a = hiAlea(11, 29); st.b = hiAlea(12, 48); st.lignes = [[1, st.b]]; st.coche = new Set(); st.fini = false;
    $('.hi-cible').innerHTML = `Calcule <b>${st.a} × ${st.b}</b> comme un scribe.`; $('.hi-b').textContent = 'colonne de ' + st.b;
    rendre(); hiDire(el, `Double les deux colonnes tant que la colonne de 1 ne dépasse pas ${st.a}.`);
  }
  function rendre(){
    $('.hi-doubles tbody').innerHTML = st.lignes.map(([g, d], i) => `<tr class="${st.coche.has(i) ? 'on' : ''}"><td><input type="checkbox" data-i="${i}" ${st.coche.has(i) ? 'checked' : ''} aria-label="Cocher la ligne"></td><td>${hiN(g)}</td><td>${hiN(d)}</td></tr>`).join('');
    el.querySelectorAll('[data-i]').forEach(c => c.onchange = () => { c.checked ? st.coche.add(+c.dataset.i) : st.coche.delete(+c.dataset.i); rendre(); somme(); });
  }
  function somme(){ const s = [...st.coche].reduce((t, i) => t + st.lignes[i][0], 0); hiDire(el, `Lignes cochées : la colonne de 1 fait <b>${s}</b>${s === st.a ? ' : c\'est exactement ' + st.a + ' !' : ' (il faut ' + st.a + ').'}`, s === st.a ? 'ok' : ''); }
  function doubler(){
    const [g, d] = st.lignes[st.lignes.length - 1];
    if(g * 2 > st.a){ hiDire(el, `La ligne suivante donnerait ${g * 2}, plus grand que ${st.a} : on s'arrête. Coche maintenant les lignes dont la colonne de 1 fait ${st.a} en tout.`); return; }
    st.lignes.push([g * 2, d * 2]); rendre();
    hiDire(el, `<div class="hi-etapes"><div>${hiN(g)} + ${hiN(g)} = ${hiN(g * 2)}</div><div>${hiN(d)} + ${hiN(d)} = ${hiN(d * 2)}</div></div>`);
  }
  function addition(){
    const l = [...st.coche].sort((x, y) => x - y).map(i => st.lignes[i]), s = l.reduce((t, x) => t + x[0], 0);
    if(s !== st.a){ hiDire(el, `<span class="gicon">info</span> Les lignes cochées font ${s} dans la colonne de 1 : il faut exactement ${st.a}. Commence par la plus grande ligne possible.`, 'ko'); return; }
    const r = l.reduce((t, x) => t + x[1], 0);
    hiDire(el, `<span class="gicon">celebration</span> Bravo !<div class="hi-etapes"><div>${l.map(x => x[0]).join(' + ')} = ${st.a}</div><div>donc ${st.a} × ${st.b} = ${l.map(x => hiN(x[1])).join(' + ')}</div><div>${st.a} × ${st.b} = <b>${hiN(r)}</b></div></div>Vérifie avec une multiplication posée : tu trouves bien ${hiN(st.a * st.b)}. Le scribe n'a utilisé que des doubles et des additions !`, 'ok');
  }
  $('[data-a="doubler"]').onclick = doubler;
  $('[data-a="addition"]').onclick = addition;
  $('[data-a="autre"]').onclick = autre;
  autre();
}

/* =====================================================================
   3. Pourquoi 60 minutes dans une heure ? (6e)
   ===================================================================== */
function hiBase60Monter(el){
  // Les mains servent de compteur de minutes : 60 minutes = mains pleines (5 doigts levés) = 1 heure, on referme et on
  // retient 1 heure -- demandé : « Qu'est-ce qui permet à partir des mains de répondre à la question posée sur la
  // durée ? », puis « oui, fais cette version » (les mains comptent les minutes de la question, animation).
  const st = { n: 0, h: null, q: null, anim: 0, joue: false };
  el.innerHTML = `<div class="hi-box">
    <div class="hi-consigne">Il y a 4 000 ans, les <b>Babyloniens</b> comptaient par soixantaines. On pense qu'ils comptaient sur leurs doigts : en regardant la paume de sa main droite, on touche avec le pouce les <b>12 phalanges</b> des quatre autres doigts ; chaque fois qu'on arrive à 12, on lève un doigt de la main gauche. Avec <b>5 doigts</b> levés : 5 fois 12, c'est 60. Nos <b>minutes</b> fonctionnent ainsi : à 60, les mains sont pleines, c'est <b>une heure</b>.</div>
    <div class="hi-curseur"><label>Minutes comptées sur les mains : <b class="hi-nb"></b> <input type="range" min="0" max="60" value="0" data-r="n"></label></div>
    <div class="hi-horloge"><span class="hi-depart"></span><span class="hi-hh-l">heures ajoutées :</span><span class="hi-perles"></span><span class="hi-hh"></span></div>
    <svg class="hi-svg hi-mains" viewBox="0 0 560 310"></svg>
    <div class="hi-explic"></div>
    <div class="hi-quiz"><b><span class="gicon">schedule</span> À toi :</b> <span class="hi-qq"></span>
      <div class="hi-actions"><input type="number" min="0" max="23" data-a="h" style="width:60px;"> h <input type="number" min="0" max="59" data-a="m" style="width:60px;"> min <button type="button" class="btn" data-a="verif">Vérifier</button>
        <button type="button" class="btn secondary" data-a="voir"><span class="gicon">front_hand</span> Voir sur les mains</button><button type="button" class="btn secondary" data-a="autre"><span class="gicon">refresh</span> Une autre question</button></div></div>
    <div class="hi-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.hi-mains');
  // Les mains de l'élève, vues côté paume (on compte sur les phalanges) : main gauche à gauche avec le pouce à gauche,
  // main droite à droite avec le pouce à droite -- signalé : « A-t-on une vue de la paume ou du dos de la main ? ».
  // Main droite : le pouce touche les 12 phalanges (index 1 à 3, majeur 4 à 6, annulaire 7 à 9, auriculaire 10 à 12).
  // Main gauche : un doigt levé par douzaine terminée (pouce, index, majeur, annulaire, auriculaire : 12, 24… 60).
  const PEAU = '#F5CDA7', TRAIT = '#C08A5A', LONG = { index: 100, majeur: 112, annulaire: 104, auriculaire: 84 }, NUM = { index: 0, majeur: 1, annulaire: 2, auriculaire: 3 };
  const LEVE = ['pouce', 'index', 'majeur', 'annulaire', 'auriculaire'];
  function main(cx, droite, n){
    const px = cx - 75, pt = 172, ph = n % 12, leves = droite ? 0 : Math.floor(n / 12);   // n = 12 × doigts levés + phalanges
    const doigts = droite ? ['auriculaire', 'annulaire', 'majeur', 'index'] : ['index', 'majeur', 'annulaire', 'auriculaire'];
    let h = '', devant = '', cible = null;                 // devant : doigts repliés, dessinés PAR-DESSUS la paume
    doigts.forEach((f, i) => {
      const x = px + 8 + i * 35, rang = LEVE.indexOf(f), leve = droite || rang < leves, L = leve ? LONG[f] : 28, haut = pt - L;
      if(!leve){ // doigt replié sur la paume : on voit le dessus des deux premières phalanges, le bout touche la paume
        devant += `<rect x="${x}" y="${pt - 14}" width="31" height="58" rx="15.5" fill="#EDBF95" stroke="${TRAIT}" stroke-width="1.4"/><path d="M${x + 6},${pt + 8} q9.5,4 19,0" fill="none" stroke="${TRAIT}" opacity=".6"/><ellipse cx="${x + 15.5}" cy="${pt + 34}" rx="9" ry="6" fill="#F6D6B8" stroke="${TRAIT}" stroke-width=".8"/>`;
        return;
      }
      h += `<rect x="${x}" y="${haut}" width="31" height="${L + 34}" rx="15.5" fill="${!droite && leve ? '#9CCBF0' : PEAU}" stroke="${!droite && leve ? '#3F7FBF' : TRAIT}" stroke-width="1.4"/>`;
      if(leve) for(let k = 1; k <= 2; k++) h += `<path d="M${x + 7},${haut + L * k / 3} q8.5,3 17,0" fill="none" stroke="${droite ? TRAIT : '#3F7FBF'}" stroke-width="1" opacity=".7"/>`;
      if(droite) for(let p = 0; p < 3; p++){
        const k = NUM[f] * 3 + p + 1, y = pt - L * (p + .5) / 3, cur = k === ph, fait = k < ph;
        if(cur) cible = [x + 15.5, y];
        h += cur ? `<circle cx="${x + 15.5}" cy="${y}" r="12" fill="#E67E22"/><text x="${x + 15.5}" y="${y + 4.5}" font-size="12" font-weight="700" text-anchor="middle" fill="#fff">${k}</text>`
          : `${fait ? `<circle cx="${x + 15.5}" cy="${y}" r="10.5" fill="#F7C77E"/>` : ''}<text x="${x + 15.5}" y="${y + 4}" font-size="11" text-anchor="middle" fill="#7A4E26">${k}</text>`;
      }
      if(!droite && leve) h += `<text x="${x + 15.5}" y="${haut - 8}" font-size="12" font-weight="700" text-anchor="middle" fill="#2F6FB3">${12 * (rang + 1)}</text>`;
    });
    // pouce
    const pouceLeve = droite || leves >= 1, ax = droite ? px + 136 : px + 14, ay = pt + 62, ang = droite ? 38 : (pouceLeve ? -38 : 62), Lp = pouceLeve ? 80 : 46;
    const pouce = `<g transform="rotate(${ang} ${ax} ${ay})"><rect x="${ax - 16}" y="${ay - Lp}" width="32" height="${Lp + 18}" rx="16" fill="${!droite && pouceLeve ? '#9CCBF0' : PEAU}" stroke="${!droite && pouceLeve ? '#3F7FBF' : TRAIT}" stroke-width="1.4"/>${droite ? `<ellipse cx="${ax}" cy="${ay - Lp + 14}" rx="10" ry="12" fill="#F0A35E"/>` : ''}${!droite && pouceLeve ? `<text x="${ax}" y="${ay - Lp - 7}" font-size="12" font-weight="700" text-anchor="middle" fill="#2F6FB3" transform="rotate(${-ang} ${ax} ${ay - Lp - 11})">12</text>` : ''}</g>`;
    if(pouceLeve) h += pouce; else devant += pouce;
    h += `<rect x="${px}" y="${pt - 6}" width="150" height="116" rx="44" fill="${PEAU}" stroke="${TRAIT}" stroke-width="1.4"/><path d="M${px + 34},${pt + 40} q40,22 84,4" fill="none" stroke="${TRAIT}" opacity=".45"/>` + devant;
    if(droite && cible){ const r = 38 * Math.PI / 180, tx = ax + Math.sin(r) * (-1) * -(Lp - 14) , ty = ay - Math.cos(r) * (Lp - 14);
      h += `<path d="M${tx.toFixed(1)},${ty.toFixed(1)} Q${((tx + cible[0]) / 2).toFixed(1)},${(Math.min(ty, cible[1]) - 30).toFixed(1)} ${cible[0]},${cible[1] + 10}" fill="none" stroke="#E67E22" stroke-width="2" stroke-dasharray="4 3"/>`; }
    return h + `<text x="${cx}" y="300" font-size="13" text-anchor="middle" fill="#4E5665">${droite ? 'main droite : les phalanges' : 'main gauche : les douzaines'}</text>`;
  }
  function rendre(){
    const n = st.n, lev = Math.floor(n / 12), r = n % 12, pl = (k, m) => k + ' ' + m + (k > 1 ? 's' : '');
    $('.hi-nb').textContent = n + ' min';
    $('[data-r="n"]').value = n;
    svg.innerHTML = '<rect width="560" height="310" fill="#FBF6EC" rx="12"/>' + main(150, false, n) + main(410, true, n);
    $('.hi-horloge').style.display = st.h === null ? 'none' : '';
    if(st.h !== null){ // perles : seulement les heures ajoutées (brunes : durée du cours ; orange : heure retenue grâce aux mains pleines)
      const plus = st.h - st.q.h;
      $('.hi-depart').innerHTML = `départ <b>${st.q.h} h ${String(st.q.m).padStart(2, '0')}</b>`;
      $('.hi-perles').innerHTML = plus ? Array.from({ length: plus }, (_, i) => `<span class="hi-perle${i >= st.q.dh ? ' neuve' : ''}">+1 h</span>`).join('') : '<span class="hi-vide">aucune</span>';
      $('.hi-hh').innerHTML = n === 60 ? `${st.h} h + 60 min` : `${st.h} h ${String(n).padStart(2, '0')}`; }
    $('.hi-explic').innerHTML = !n ? 'Les mains sont fermées : 0 minute.' : !lev ? `${n} min : le pouce droit a touché ${pl(n, 'phalange')}.`
      : `${n} min = ${pl(lev, 'douzaine')} (${pl(lev, 'doigt')} levé${lev > 1 ? 's' : ''} à gauche)${r ? ' + ' + pl(r, 'phalange') : ''}${n === 60 ? ' : les mains sont pleines, c\'est <b>1 heure</b> !' : '.'}`;
  }
  const deux = m => String(m).padStart(2, '0');
  function question(){
    clearTimeout(st.anim); st.joue = false; $('[data-r="n"]').disabled = false;
    const h = hiAlea(7, 15), m = hiAlea(15, 55), dh = hiAlea(0, 2), dm = Math.random() < .75 ? hiAlea(Math.max(20, 61 - m), 55) : hiAlea(10, Math.max(10, 59 - m));
    st.q = { h, m, dh, dm }; st.h = null; st.n = 0;
    $('.hi-qq').innerHTML = `Un cours commence à <b>${h} h ${deux(m)}</b> et dure <b>${dh ? dh + ' h ' : ''}${dm} min</b>. À quelle heure se termine-t-il ?`;
    $('[data-a="h"]').value = ''; $('[data-a="m"]').value = ''; hiDire(el, ''); rendre();
  }
  function correction(){
    const { h, m, dh, dm } = st.q, tm = m + dm, rh = h + dh + Math.floor(tm / 60), rm = tm % 60;
    return { rh, rm, txt: `<div class="hi-etapes"><div>Minutes : ${m} + ${dm} = ${tm} min.</div>${tm >= 60 ? `<div>${tm} min = 60 min + ${tm - 60} min : les mains se sont remplies une fois, on retient 1 heure.</div>` : ''}<div>Heures : ${h}${dh ? ' + ' + dh : ''}${tm >= 60 ? ' + 1' : ''} = ${rh} h.</div><div>Le cours finit à <b>${rh} h ${deux(rm)}</b>.</div></div>` };
  }
  // Animation : départ, ajout des heures (perles), puis les minutes une à une sur les mains ; à 60, on referme et on retient 1 h.
  function voir(){
    clearTimeout(st.anim); st.joue = true; $('[data-r="n"]').disabled = true;
    const { h, m, dh, dm } = st.q, c = correction();
    st.h = h; st.n = m; rendre();
    hiDire(el, `Départ : <b>${h} h ${deux(m)}</b>. Les perles comptent les heures, les mains comptent les minutes.`);
    let etapeH = 0, restant = dm;
    const pas = () => {
      if(etapeH < dh){ etapeH++; st.h++; rendre(); hiDire(el, `On ajoute les heures : ${h} h + ${etapeH} h = <b>${st.h} h ${deux(st.n)}</b>.`); st.anim = setTimeout(pas, 900); return; }
      if(restant > 0){
        restant--; st.n++;
        if(st.n === 60){ rendre(); hiDire(el, '<b>60 minutes : les mains sont pleines, c\'est 1 heure !</b> On les referme et on ajoute une perle.');
          st.anim = setTimeout(() => { st.n = 0; st.h++; rendre(); hiDire(el, `On retient 1 heure : <b>${st.h} h 00</b>, et on continue à compter les minutes.`); st.anim = setTimeout(pas, 1100); }, 1700); return; }
        rendre(); hiDire(el, `On ajoute les minutes : encore ${restant} min à compter.`); st.anim = setTimeout(pas, dm > 40 ? 110 : 160); return;
      }
      st.joue = false; $('[data-r="n"]').disabled = false;
      hiDire(el, `<span class="gicon">flag</span> Arrivée : le cours finit à <b>${st.h} h ${deux(st.n)}</b>.` + c.txt, 'ok');
    };
    st.anim = setTimeout(pas, 1100);
  }
  $('[data-a="verif"]').onclick = () => {
    const c = correction(), ok = parseInt($('[data-a="h"]').value, 10) === c.rh && parseInt($('[data-a="m"]').value, 10) === c.rm;
    hiDire(el, `${ok ? '<span class="gicon">celebration</span> Exact !' : '<span class="gicon">info</span> Pas tout à fait. Clique sur « Voir sur les mains », ou lis le calcul :'}${c.txt}${ok ? 'Clique sur « Voir sur les mains » pour regarder les minutes se compter… et l\'heure se retenir.' : ''}`, ok ? 'ok' : 'ko');
  };
  $('[data-a="voir"]').onclick = voir;
  $('[data-a="autre"]').onclick = question;
  $('[data-r="n"]').oninput = e => { if(st.joue) return; st.n = +e.target.value; st.h = null; rendre(); };
  question();
}

/* =====================================================================
   4. La frise chronologique et le piège des historiens (5e)
   ===================================================================== */
// [année, événement, emoji, étage de l'étiquette : 0 dessus, 1 dessous, 2 tout en haut, 3 tout en bas]
const HI_EVTS = [[-3300, 'Invention de l\'écriture', '✍️', 0], [-2560, 'Pyramide de Khéops', '🔺', 1], [-753, 'Fondation de Rome', '🐺', 0], [-52, 'Bataille d\'Alésia', '⚔️', 1], [496, 'Baptême de Clovis', '👑', 0],
  [800, 'Charlemagne empereur', '🏰', 1], [1492, 'Christophe Colomb en Amérique', '⛵', 0], [1789, 'Révolution française', '🇫🇷', 1], [1969, 'Premiers pas sur la Lune', '🚀', 2], [2001, 'Début du 21e siècle', '🎆', 3]];
function hiSiecle(a){ return a > 0 ? Math.floor((a - 1) / 100) + 1 : -(Math.floor((-a - 1) / 100) + 1); }
const hiOrd = n => n === 1 ? '1er' : n + 'e';
function hiFriseMonter(el){
  const st = { a: null, b: null, q: null };
  el.innerHTML = `<div class="hi-box">
    <div class="hi-consigne">Les historiens comptent les années à partir de la naissance de Jésus-Christ. Les dates <b>avant J.-C.</b> se placent comme des <b>nombres négatifs</b> sur une droite graduée. Clique sur deux événements pour calculer le temps écoulé.</div>
    <svg class="hi-svg hi-frise-svg" viewBox="0 0 640 215"></svg>
    <div class="hi-msg" aria-live="polite"></div>
    <div class="hi-piege"><b><span class="gicon">warning</span> Le piège des historiens : il n'y a pas d'année 0</b>
      <ul><li>Juste avant l'an <b>1</b>, il y a l'an <b>1 avant J.-C.</b> (−1) : l'année 0 n'existe pas. Entre une date avant J.-C. et une date après J.-C., le calcul avec les nombres relatifs donne <b>une année de trop</b>.</li>
      <li>Le <b>1er siècle</b> va de l'an <b>1</b> à l'an <b>100</b> (et non de 0 à 99). Un siècle se termine donc toujours par une année « ronde » : le <b>20e siècle</b> va du 1er janvier <b>1901</b> au 31 décembre <b>2000</b>.</li>
      <li>Le <b>21e siècle</b> et le <b>3e millénaire</b> n'ont pas commencé en 2000, mais le <b>1er janvier 2001</b> ! L'an 2000 était la dernière année du 20e siècle et du 2e millénaire… même si le monde entier a fait la fête le 31 décembre 1999.</li>
      <li>Avant J.-C., c'est à l'envers : le <b>1er siècle avant J.-C.</b> va de −100 à −1, et la bataille d'Alésia (−52) s'y trouve.</li>
      <li>Pour trouver le siècle d'une année après J.-C. : on enlève 1, on garde le nombre de centaines, on ajoute 1. Exemple pour 1789 : 1789 − 1 = 1788 ; 17 centaines ; 17 + 1 = <b>18e siècle</b>.</li></ul></div>
    <div class="hi-quiz"><b><span class="gicon">quiz</span></b> <span class="hi-qq"></span> <span class="hi-qr"></span></div>
    <div class="hi-msg2" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.hi-frise-svg'), X = a => 40 + (a + 3500) / 5600 * 560;
  function dessiner(){
    let h = '<rect width="640" height="215" fill="#FBF6EC" rx="12"/><line x1="30" x2="610" y1="110" y2="110" stroke="#1C1B2E" stroke-width="2"/><path d="M610,104 L620,110 L610,116 Z" fill="#1C1B2E"/>';
    for(let a = -3000; a <= 2000; a += 1000) h += `<line x1="${X(a)}" x2="${X(a)}" y1="104" y2="116" stroke="#1C1B2E"/><text x="${X(a)}" y="130" font-size="11" text-anchor="middle" fill="#4E5665">${hiAn(a)}</text>`;
    h += `<line x1="${X(0)}" x2="${X(0)}" y1="96" y2="184" stroke="#8E3B2E" stroke-width="1.5" stroke-dasharray="3 3"/><text x="${X(0)}" y="194" font-size="9.5" text-anchor="middle" fill="#8E3B2E">an 1 : naissance de J.-C.</text><text x="${X(-1900)}" y="206" font-size="11" text-anchor="middle" fill="#8E3B2E">avant J.-C. (dates négatives)</text><text x="${X(900)}" y="206" font-size="11" text-anchor="middle" fill="#2F6FB3">après J.-C. (dates positives)</text>`;
    HI_EVTS.forEach((e, i) => {
      const x = X(e[0]), bas = e[3] % 2 === 1, y = [62, 158, 34, 186][e[3]], on = e === st.a || e === st.b;
      h += `<g data-e="${i}" style="cursor:pointer"><line x1="${x}" x2="${x}" y1="110" y2="${bas ? y - 14 : y + 8}" stroke="${on ? '#C0392B' : '#9AA5B4'}"/><circle cx="${x}" cy="110" r="${on ? 6 : 4}" fill="${on ? '#C0392B' : '#2F6FB3'}"/><text x="${x}" y="${y}" font-size="16" text-anchor="middle">${e[2]}</text><text x="${x + (e[3] > 1 ? 30 : 0)}" y="${e[3] > 1 ? y - 4 : y + (bas ? 15 : -19)}" font-size="9.5" text-anchor="middle" fill="#1C1B2E" font-weight="${on ? 700 : 400}">${hiAn(e[0])}</text></g>`;
    });
    svg.innerHTML = h;
    svg.querySelectorAll('[data-e]').forEach(g => g.onclick = () => clic(HI_EVTS[+g.dataset.e]));
  }
  function clic(e){
    if(!st.a || st.b){ st.a = e; st.b = null; dessiner(); hiDire(el, `${e[1]} (${hiAn(e[0])})… et le deuxième événement ?`); return; }
    if(e === st.a) return;
    st.b = e; dessiner();
    const [p, q] = st.a[0] < st.b[0] ? [st.a, st.b] : [st.b, st.a], d = q[0] - p[0], traverse = p[0] < 0 && q[0] > 0;
    hiDire(el, `<b>${p[1]}</b> (${hiAn(p[0])}) puis <b>${q[1]}</b> (${hiAn(q[0])}) :<div class="hi-etapes"><div>${hiAn(q[0])} − ${p[0] < 0 ? '(' + hiAn(p[0]) + ')' : hiAn(p[0])}${p[0] < 0 ? ` = ${hiAn(q[0])} + ${-p[0]}` : ''} = ${hiN(d)}</div>${traverse ? `<div>Pas d'année 0 entre les deux : ${hiN(d)} − 1 = <b>${hiN(d - 1)} ans</b>.</div>` : `<div>Il s'est écoulé <b>${hiN(d)} ans</b>.</div>`}</div>${traverse ? 'Le calcul avec les relatifs compte une année 0 qui n\'a jamais existé : on enlève 1. C\'est le piège des historiens !' : ''}`);
  }
  const QUESTIONS = [
    () => { const s = hiAlea(12, 21); return { q: `En quelle année commence le ${hiOrd(s)} siècle ?`, r: (s - 1) * 100 + 1, u: '', e: `Le ${hiOrd(s)} siècle va de ${(s - 1) * 100 + 1} à ${s * 100} : il commence en <b>${(s - 1) * 100 + 1}</b>, pas en ${(s - 1) * 100}.` }; },
    () => { const s = hiAlea(12, 20); return { q: `En quelle année se termine le ${hiOrd(s)} siècle ?`, r: s * 100, u: '', e: `Le ${hiOrd(s)} siècle se termine le 31 décembre <b>${s * 100}</b> : l'année ronde est la <b>dernière</b> du siècle.` }; },
    () => { const a = [1900, 2000, 1800, 1500, 1600][hiAlea(0, 4)]; return { q: `L'année ${a} fait partie de quel siècle ?`, r: a / 100, u: 'e siècle', e: `${a} − 1 = ${a - 1} ; ${Math.floor((a - 1) / 100)} centaines ; ${Math.floor((a - 1) / 100)} + 1 = ${a / 100}. L'année ${a} est la dernière du <b>${a / 100}e siècle</b>, pas la première du suivant !` }; },
    () => { const a = hiAlea(1001, 2099); return { q: `L'année ${a} fait partie de quel siècle ?`, r: hiSiecle(a), u: 'e siècle', e: `${a} − 1 = ${a - 1} ; ${Math.floor((a - 1) / 100)} centaines ; ${Math.floor((a - 1) / 100)} + 1 = <b>${hiSiecle(a)}e siècle</b>.` }; },
    () => ({ q: 'En quelle année a commencé le 3e millénaire ?', r: 2001, u: '', e: 'Le 1er millénaire va de l\'an 1 à l\'an 1000, le 2e de 1001 à 2000 : le 3e millénaire a commencé le 1er janvier <b>2001</b>.' }),
    () => ({ q: 'L\'an 2000 fait partie de quel millénaire ?', r: 2, u: 'e millénaire', e: 'Le 2e millénaire va de 1001 à 2000 : l\'an 2000 en est la <b>dernière année</b>.' }),
    () => { const s = hiAlea(1, 5); return { q: `Le ${hiOrd(s)} siècle avant J.-C. commence en quelle année ? (réponds avec un nombre négatif)`, r: -s * 100, u: '', e: `Avant J.-C., on compte à l'envers : le ${hiOrd(s)} siècle av. J.-C. va de <b>${hiS(-s * 100)}</b> à ${hiS(-(s - 1) * 100 - 1)}.` }; }];
  function question(){
    st.q = QUESTIONS[hiAlea(0, QUESTIONS.length - 1)]();
    $('.hi-qq').innerHTML = st.q.q;
    $('.hi-qr').innerHTML = `<input type="number" data-a="rep" style="width:80px;"> ${st.q.u} <button type="button" class="btn" data-a="verif">Vérifier</button>`;
    $('[data-a="verif"]').onclick = () => {
      const ok = parseInt($('[data-a="rep"]').value, 10) === st.q.r, m = $('.hi-msg2');
      m.className = 'hi-msg2 ' + (ok ? 'ok' : 'ko'); m.innerHTML = (ok ? '<span class="gicon">celebration</span> Exact ! ' : '<span class="gicon">info</span> ') + st.q.e;
      setTimeout(question, 400);
    };
  }
  dessiner(); question(); hiDire(el, 'Clique sur un premier événement.');
}

/* =====================================================================
   5. La pyramide de Khéops (4e Espace)
   ===================================================================== */
function hiKheopsMonter(el){
  const C = 230, H = 146, st = { etape: 0, anim: 0 };
  el.innerHTML = `<div class="hi-box">
    <div class="hi-consigne">Construite vers 2560 avant J.-C., la grande pyramide de <b>Khéops</b> a une base carrée de <b>230 m</b> de côté et mesurait <b>146 m</b> de haut. Combien de pierres a-t-il fallu ? Calcule pas à pas.</div>
    <svg class="hi-svg hi-pyr" viewBox="0 0 560 250"></svg>
    <div class="hi-etapes-q"></div>
    <div class="hi-msg" aria-live="polite"></div>
    <div class="hi-actions"><button type="button" class="btn secondary" data-a="construire"><span class="gicon">construction</span> Voir le chantier</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.hi-pyr');
  function dessiner(n){ // n assises posées sur 40
    let h = '<rect width="560" height="250" fill="#F7E7C6" rx="12"/><rect y="215" width="560" height="35" fill="#E3C891"/>';
    const bx = 280, by = 215;
    for(let k = 0; k < n; k++){
      const w1 = 400 * (1 - k / 40), w2 = 400 * (1 - (k + 1) / 40), y1 = by - k * 4.6, y2 = by - (k + 1) * 4.6;
      h += `<path d="M${bx - w1 / 2},${y1} L${bx - w2 / 2},${y2} L${bx + w2 / 2},${y2} L${bx + w1 / 2},${y1} Z" fill="${k % 2 ? '#D9B77A' : '#CFAE70'}" stroke="#B08A4A" stroke-width=".5"/>`;
      h += `<path d="M${bx + w1 / 2},${y1} L${bx + w1 / 2 + 50 * (1 - k / 40)},${y1 - 22 * (1 - k / 40)} L${bx + w2 / 2 + 50 * (1 - (k + 1) / 40)},${y2 - 22 * (1 - (k + 1) / 40)} L${bx + w2 / 2},${y2} Z" fill="#B99556"/>`;
    }
    if(n >= 40) h += `<line x1="${bx}" y1="${by - 184}" x2="${bx}" y2="${by}" stroke="#C0392B" stroke-dasharray="4 3"/><text x="${bx + 6}" y="${by - 90}" font-size="12" fill="#C0392B">146 m</text><text x="${bx}" y="${by + 16}" font-size="12" text-anchor="middle" fill="#6B4A22">230 m</text>`;
    svg.innerHTML = h;
  }
  const ETAPES = [
    { q: 'Aire de la base carrée (en m²) :', r: C * C, tol: 0, e: `<div>Aire de la base : B = 230 × 230 = <b>52 900 m²</b>.</div>` },
    { q: 'Volume de la pyramide (en m³, arrondi à l\'unité) :', r: Math.round(C * C * H / 3), tol: 2, e: `<div>V = <span class="tex">\\dfrac{1}{3}</span> × B × h = 52 900 × 146 ÷ 3 ≈ <b>2 574 467 m³</b>.</div>` },
    { q: 'Un bloc de pierre mesure en moyenne 1,1 m³. Nombre de blocs (en millions, au dixième près) :', r: 2.3, tol: .051, dec: true, e: `<div>2 574 467 ÷ 1,1 ≈ 2 340 424, soit environ <b>2,3 millions de blocs</b>.</div>` },
    { q: 'Le chantier a duré environ 20 ans, à 300 jours par an et 10 heures par jour. Combien de blocs fallait-il poser chaque heure (à l\'unité près) ?', r: 39, tol: 1, e: `<div>Heures de travail : 20 × 300 × 10 = 60 000 h.</div><div>2 340 424 ÷ 60 000 ≈ <b>39 blocs par heure</b> : plus d'un bloc toutes les deux minutes, jour après jour, pendant 20 ans !</div>` }];
  function etape(){
    const E = ETAPES[st.etape];
    if(!E){ $('.hi-etapes-q').innerHTML = ''; return; }
    $('.hi-etapes-q').innerHTML = `<div class="hi-actions"><label>${E.q} <input type="text" inputmode="decimal" data-a="rep" style="width:110px;"></label><button type="button" class="btn" data-a="verif">Vérifier</button><button type="button" class="btn secondary" data-a="aide">Voir le calcul</button></div>`;
    const corriger = montrer => {
      const g = parseFloat(String($('[data-a="rep"]').value).replace(/\s/g, '').replace(',', '.')), ok = Math.abs(g - E.r) <= E.tol;
      if(!ok && !montrer){ hiDire(el, '<span class="gicon">info</span> Pas encore : vérifie ton calcul, ou clique sur « Voir le calcul ».', 'ko'); return; }
      hiDire(el, (ok ? '<span class="gicon">celebration</span> Exact !' : '') + `<div class="hi-etapes">${ETAPES.slice(0, st.etape + 1).map(x => x.e).join('')}</div>`, ok ? 'ok' : '');
      if(typeof renderStaticMath === 'function') renderStaticMath(el.querySelector('.hi-msg'));
      st.etape++; etape();
    };
    $('[data-a="verif"]').onclick = () => corriger(false);
    $('[data-a="aide"]').onclick = () => corriger(true);
  }
  $('[data-a="construire"]').onclick = () => { cancelAnimationFrame(st.anim); const t0 = performance.now(); const pas = now => { const n = Math.min(40, Math.floor((now - t0) / 90)); dessiner(n); if(n < 40) st.anim = requestAnimationFrame(pas); }; st.anim = requestAnimationFrame(pas); };
  dessiner(40); etape();
  hiDire(el, `Rappel : le volume d'une pyramide est V = <span class="tex">\\dfrac{1}{3}</span> × aire de la base × hauteur.`);
  if(typeof renderStaticMath === 'function') renderStaticMath(el);
}

/* =====================================================================
   6. Thalès mesure la pyramide (4e Triangles et parallèles)
   ===================================================================== */
function hiThalesMonter(el){
  const st = { ang: 40, ok: false };
  const BATON = 1.8, DEMI = 115, H = 146;
  el.innerHTML = `<div class="hi-box">
    <div class="hi-consigne">Vers 600 avant J.-C., le savant grec <b>Thalès</b> visite l'Égypte. On raconte qu'il mesura la hauteur de la grande pyramide <b>sans y grimper</b>, avec un simple bâton planté dans le sable et les <b>ombres</b>. Change la hauteur du Soleil, puis calcule la hauteur de la pyramide.</div>
    <div class="hi-curseur"><label>Hauteur du Soleil <input type="range" min="25" max="48" value="40" data-r="ang"></label></div>
    <svg class="hi-svg hi-thales-svg" viewBox="0 0 640 260"></svg>
    <div class="hi-donnees"></div>
    <div class="hi-actions"><label>Hauteur de la pyramide : <input type="text" inputmode="decimal" data-a="h" style="width:80px;"> m</label><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button></div>
    <div class="hi-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.hi-thales-svg');
  const ombres = () => { const t = Math.tan(st.ang * Math.PI / 180); return { b: Math.round(BATON / t * 100) / 100, p: Math.round((H / t - DEMI) * 10) / 10 }; };
  function dessiner(){
    const t = Math.tan(st.ang * Math.PI / 180), k = .62, sol = 225, cx = 170;
    const xA = cx, yA = sol - H * k, xO = cx + H / t * k;                               // sommet, bout de l'ombre
    let h = `<rect width="640" height="260" fill="#FFF4D6" rx="12"/><rect y="${sol}" width="640" height="35" fill="#E3C891"/>`;
    h += `<path d="M${cx - DEMI * k},${sol} L${xO},${sol} L${cx + DEMI * k},${sol} Z" fill="#8E7A55" opacity=".55"/>`;
    h += `<path d="M${cx - DEMI * k},${sol} L${xA},${yA} L${cx + DEMI * k},${sol} Z" fill="#D9B77A" stroke="#B08A4A"/>`;
    h += `<line x1="${xA}" y1="${yA}" x2="${xO}" y2="${sol}" stroke="#E67E22" stroke-width="1.6" stroke-dasharray="6 4"/>`;
    const bx = 520, bh = BATON * 18, bo = BATON / t * 18;                                   // bâton dessiné plus grand (zoom)
    h += `<line x1="${bx}" y1="${sol}" x2="${bx}" y2="${sol - bh}" stroke="#6B4A22" stroke-width="4"/><line x1="${bx}" y1="${sol}" x2="${bx + bo}" y2="${sol}" stroke="#4E3B22" stroke-width="5" opacity=".6"/><line x1="${bx}" y1="${sol - bh}" x2="${bx + bo}" y2="${sol}" stroke="#E67E22" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${bx - 6}" y="${sol - bh / 2}" font-size="11" text-anchor="end" fill="#6B4A22">${hiN(BATON, 1)} m</text>`;
    h += `<circle cx="600" cy="38" r="16" fill="#F7C531"/><text x="${cx}" y="${sol + 16}" font-size="11" text-anchor="middle" fill="#4E3B22">centre de la base</text><line x1="${cx}" y1="${sol}" x2="${cx}" y2="${yA}" stroke="#C0392B" stroke-dasharray="3 3"/><text x="${cx - 6}" y="${(sol + yA) / 2}" font-size="12" text-anchor="end" fill="#C0392B">h ?</text>`;
    svg.innerHTML = h;
    const o = ombres();
    $('.hi-donnees').innerHTML = `<div>Ombre du bâton : <b>${hiN(o.b, 2)} m</b>.</div><div>Ombre de la pyramide, depuis le bord de la base : <b>${hiN(o.p, 1)} m</b> ; depuis le centre, il faut ajouter la moitié du côté de la base (115 m) : ${hiN(o.p, 1)} + 115 = <b>${hiN(o.p + DEMI, 1)} m</b>.</div>`;
  }
  $('[data-a="verif"]').onclick = () => {
    const o = ombres(), L = o.p + DEMI, h = BATON * L / o.b, g = parseFloat(String($('[data-a="h"]').value).replace(',', '.')), ok = Math.abs(g - h) <= 2;
    hiDire(el, `${ok ? '<span class="gicon">celebration</span> Bravo, comme Thalès !' : '<span class="gicon">info</span> Voici le raisonnement :'}
      <div class="hi-etapes"><div>Les rayons du Soleil sont parallèles. Plante le bâton pour que le bout de son ombre tombe au même point que le bout de l'ombre de la pyramide : le même rayon passe par le sommet de la pyramide et par le haut du bâton.</div><div>Le petit triangle (bâton, son ombre) est alors dans le grand (hauteur, ombre depuis le centre), et le bâton est <b>parallèle</b> à la hauteur : tous deux sont verticaux. C'est la configuration du chapitre, les longueurs sont <b>proportionnelles</b> : h ÷ ${hiN(L, 1)} = ${hiN(BATON, 1)} ÷ ${hiN(o.b, 2)}.</div><div>h = ${hiN(BATON, 1)} × ${hiN(L, 1)} ÷ ${hiN(o.b, 2)} ≈ <b>${hiN(h, 0)} m</b>.</div></div>Change la hauteur du Soleil : les ombres changent, mais la hauteur trouvée reste la même. On raconte aussi que Thalès attendit le moment où l'ombre du bâton était égale à sa longueur : à cet instant, l'ombre de la pyramide est égale à sa hauteur !`, ok ? 'ok' : 'ko');
  };
  $('[data-r="ang"]').oninput = e => { st.ang = +e.target.value; dessiner(); hiDire(el, ''); };
  dessiner();
}

/* =====================================================================
   7. Casser le code de Jules César (3e Statistiques)
   ===================================================================== */
const HI_FR = { E: 14.7, A: 7.6, S: 7.9, I: 7.5, T: 7.2, N: 7.1, R: 6.6, U: 6.3, L: 5.5, O: 5.4, D: 3.7, C: 3.3, M: 3.0, P: 3.0, V: 1.6, Q: 1.4, F: 1.1, B: .9, G: .9, H: .7, J: .6, X: .4, Y: .3, Z: .3, W: .1, K: .1 };
const HI_TEXTES = ['LES LEGIONS DE CESAR ATTENDENT LES ORDRES PRES DU CAMP ROMAIN LES ESPIONS GAULOIS ONT VU LES TROUPES ENNEMIES TRAVERSER LA RIVIERE IL FAUT ENVOYER DES RENFORTS AVANT LA NUIT ET GARDER CE MESSAGE SECRET',
  'LA REINE ENVERRA SES MESSAGERS DEMAIN MATIN ILS PORTERONT UNE LETTRE SCELLEE QUE PERSONNE NE DOIT LIRE LES ENNEMIS SURVEILLENT LES ROUTES ALORS IL FAUDRA PASSER PAR LA FORET ET ATTENDRE LE SIGNAL DES GUETTEURS',
  'RENDEZ VOUS SOUS LE GRAND CHENE A LA TOMBEE DE LA NUIT APPORTEZ LES CARTES ET LES PLANS DE LA VILLE NOUS PARTIRONS ENSEMBLE VERS LE NORD SANS ETRE VUS LES SOLDATS DU ROI NE SE DOUTENT DE RIEN'];
const hiDecal = (t, k) => t.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65));
function hiCesarMonter(el){
  const st = { cle: 0, texte: '', code: '', essai: 0 };
  el.innerHTML = `<div class="hi-box">
    <div class="hi-consigne">Pour ses messages secrets, <b>Jules César</b> décalait chaque lettre de l'alphabet de 3 rangs : A devient D, B devient E… Un espion a intercepté le message ci-dessous, mais il ne connaît pas le décalage. Au 9e siècle, le savant arabe <b>Al-Kindi</b> a trouvé comment faire : regarder les <b>fréquences</b> des lettres.</div>
    <div class="hi-code"></div>
    <svg class="hi-svg hi-freq" viewBox="0 0 640 210"></svg>
    <div class="hi-curseur"><label>Décalage à essayer : <b class="hi-k"></b> <input type="range" min="0" max="25" value="0" data-r="k"></label></div>
    <div class="hi-clair"></div>
    <div class="hi-msg" aria-live="polite"></div>
    <div class="hi-actions"><button type="button" class="btn secondary" data-a="autre"><span class="gicon">refresh</span> Un autre message</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.hi-freq');
  function nouveau(){
    st.texte = HI_TEXTES[Math.floor(Math.random() * HI_TEXTES.length)]; st.cle = hiAlea(3, 23); st.code = hiDecal(st.texte, st.cle); st.essai = 0;
    $('[data-r="k"]').value = 0; $('.hi-code').innerHTML = `<b>Message intercepté :</b><div class="hi-mono">${st.code}</div>`; rendre();
    hiDire(el, 'Les barres <b style="color:#8E3B2E">brunes</b> donnent la fréquence de chaque lettre dans le message, les <b style="color:#2F6FB3">bleues</b> la fréquence habituelle en français. Fais glisser le décalage jusqu\'à ce qu\'elles se ressemblent.');
  }
  function rendre(){
    const k = st.essai, clair = hiDecal(st.code, -k), lettres = clair.replace(/[^A-Z]/g, ''), n = lettres.length, f = {};
    for(const c of lettres) f[c] = (f[c] || 0) + 1;
    let h = '<rect width="640" height="210" fill="#FBF6EC" rx="12"/>';
    for(let i = 0; i < 26; i++){
      const c = String.fromCharCode(65 + i), x = 22 + i * 23.5, fm = (f[c] || 0) / n * 100, ff = HI_FR[c];
      h += `<rect x="${x}" y="${170 - ff * 9}" width="9" height="${ff * 9}" fill="#7FB3E0"/><rect x="${x + 10}" y="${170 - fm * 9}" width="9" height="${fm * 9}" fill="#8E3B2E" opacity=".8"/><text x="${x + 10}" y="186" font-size="11" text-anchor="middle" fill="#1C1B2E">${c}</text>`;
    }
    h += '<line x1="15" x2="630" y1="170" y2="170" stroke="#1C1B2E"/><text x="20" y="20" font-size="11" fill="#4E5665">fréquence en %</text>';
    svg.innerHTML = h;
    $('.hi-k').textContent = k;
    $('.hi-clair').innerHTML = `<b>Avec ce décalage, on lit :</b><div class="hi-mono ${k === st.cle ? 'ok' : ''}">${clair}</div>`;
    if(k === st.cle){
      const plus = Object.entries(f).sort((a, b) => b[1] - a[1])[0];
      hiDire(el, `<span class="gicon">celebration</span> Message déchiffré ! Le décalage était de <b>${st.cle}</b>.<div class="hi-etapes"><div>Dans le message codé, la lettre la plus fréquente était <b>${hiDecal(plus[0], st.cle)}</b> : ${plus[1]} fois sur ${n} lettres, soit une fréquence d'environ ${hiN(plus[1] / n * 100, 1)} %.</div><div>En français, la lettre la plus fréquente est le <b>E</b> (environ 15 %).</div><div>Donc ${hiDecal(plus[0], st.cle)} remplace sans doute E : le décalage est de ${st.cle} rangs.</div></div>C'est l'<b>analyse des fréquences</b> : une méthode statistique pour casser un code.`, 'ok');
    }
  }
  $('[data-r="k"]').oninput = e => { st.essai = +e.target.value; rendre(); if(st.essai !== st.cle) hiDire(el, 'Pas encore : les deux séries de barres ne se ressemblent pas.'); };
  $('[data-a="autre"]').onclick = nouveau;
  nouveau();
}

/* ---------- Construction ---------- */
function hiInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.hi-numeration').forEach(hiNumerationMonter);
  racine.querySelectorAll('.hi-egypte').forEach(hiEgypteMonter);
  racine.querySelectorAll('.hi-base60').forEach(hiBase60Monter);
  racine.querySelectorAll('.hi-frise').forEach(hiFriseMonter);
  racine.querySelectorAll('.hi-kheops').forEach(hiKheopsMonter);
  racine.querySelectorAll('.hi-thales').forEach(hiThalesMonter);
  racine.querySelectorAll('.hi-cesar').forEach(hiCesarMonter);
}

/* =====================================================================
   Page Histoire « Maths et histoire » (sans fraction écrite : lisible du CM1 à la 3e)
   ===================================================================== */
const HI_HISTOIRE_HTML = `
<div class="history-box hi-hist">
  <div class="history-title"><span class="gicon">account_balance</span> Maths et histoire : compter, dater, construire, coder</div>

  <h4 class="hi-hist-h">Le papyrus du scribe Ahmès (vers 1650 avant J.-C.)</h4>
  <p>Le <b>papyrus Rhind</b>, du nom de l'Écossais qui l'acheta en 1858, mesure plus de 5 mètres de long. Le scribe <b>Ahmès</b> y a recopié 84 problèmes : partager des pains entre des ouvriers, calculer l'aire d'un champ, le volume d'un grenier… Il est conservé au British Museum, à Londres. C'est l'un des plus anciens « manuels de maths » connus.</p>

  <h4 class="hi-hist-h">Les tablettes de Babylone et la base 60</h4>
  <p>En Mésopotamie, les scribes écrivaient en appuyant un roseau taillé dans l'argile fraîche. Ils comptaient par <b>soixantaines</b> : c'est de là que viennent nos 60 minutes dans une heure, nos 60 secondes dans une minute et les 360 degrés d'un tour complet. Des milliers de tablettes de calcul ont été retrouvées : tables de multiplication, problèmes, et même des exercices d'écoliers avec leurs erreurs !</p>

  <h4 class="hi-hist-h">Les pyramides : un chantier géant</h4>
  <p>La pyramide de <b>Khéops</b>, à Gizeh, est restée le plus haut monument construit par les humains pendant près de <b>3 800 ans</b>, jusqu'à la cathédrale de Lincoln en Angleterre, vers 1311. Ses bâtisseurs n'étaient pas des esclaves, comme on l'a longtemps cru, mais des ouvriers organisés en équipes, nourris et logés près du chantier : les archéologues ont retrouvé leur village.</p>

  <h4 class="hi-hist-h">Des chiffres romains aux chiffres indo-arabes</h4>
  <p>Pendant plus de mille ans, l'Europe a écrit les nombres en <b>chiffres romains</b>, et calculé avec des jetons sur une table, l'abaque. Nos chiffres, avec le <b>zéro</b>, viennent de l'Inde et sont arrivés en Europe par les savants arabes, au Moyen Âge. On voit encore des chiffres romains pour les siècles (le XXIe siècle), les rois (Louis XIV), les cadrans d'horloge et les dates gravées sur les monuments.</p>

  <h4 class="hi-hist-h">Pourquoi n'y a-t-il pas d'année 0 ?</h4>
  <p>Notre façon de compter les années a été inventée vers 525 par un moine, <b>Denys le Petit</b>, qui fixa l'an 1 à la naissance de Jésus-Christ, comme il la calculait. En Europe, à cette époque, on ne connaissait pas encore le zéro : il n'y a donc pas d'année 0. C'est pourquoi les siècles commencent en …01 et que le 21e siècle a commencé le 1er janvier 2001.</p>

  <h4 class="hi-hist-h">Des codes secrets : de César à Alan Turing</h4>
  <p>Jules César chiffrait ses messages militaires par décalage. Au 9e siècle, à Bagdad, <b>Al-Kindi</b> écrit le premier traité pour casser les codes, grâce aux fréquences des lettres. Pendant la Seconde Guerre mondiale, les Allemands utilisent la machine <b>Enigma</b>, réputée inviolable : le mathématicien anglais <b>Alan Turing</b> et son équipe, à Bletchley Park, parviennent à la déchiffrer, en s'appuyant sur les travaux de mathématiciens polonais. On estime que cela a raccourci la guerre de plusieurs années.</p>

  <div class="hi-hist-a-toi"><span class="gicon">travel_explore</span> <b>À toi !</b> Cherche une date en chiffres romains dans ta ville : sur un monument aux morts, le fronton d'une mairie ou d'une école, une vieille maison, le cadran d'une horloge… Note-la, puis traduis-la en chiffres d'aujourd'hui. De quel siècle est-elle ?</div>
</div>`;

(function hiStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .hi-box{ display:flex; flex-direction:column; gap:10px; }
    .hi-part{ display:flex; flex-direction:column; gap:8px; border:1px solid #E8D9C0; border-radius:12px; padding:10px 14px; background:#FFFCF6; }
    .hi-part-t{ font:700 1rem 'Space Grotesk',sans-serif; color:#8E3B2E; } .hi-part-t .gicon{ vertical-align:-4px; }
    .hi-consigne{ font-size:.95rem; line-height:1.55; }
    .hi-cible{ text-align:center; font-size:1.05rem; }
    .hi-svg{ width:100%; max-width:640px; display:block; margin:0 auto; border-radius:12px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .hi-mains{ max-width:560px; }
    .hi-depart{ color:#4E5665; } .hi-hh-l{ color:#4E5665; }
    .hi-horloge{ display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; font-size:.95rem; }
    .hi-perles{ display:flex; flex-wrap:wrap; gap:3px; max-width:min(420px,70vw); }
    .hi-perle{ height:24px; padding:0 8px; border-radius:12px; background:#8E3B2E; color:#fff; font:700 .72rem Inter,sans-serif; display:inline-flex; align-items:center; justify-content:center; }
    .hi-perle.neuve{ background:#E67E22; box-shadow:0 0 0 2px #F7C77E; }
    .hi-hh{ font:700 1.3rem 'JetBrains Mono',monospace; color:#8E3B2E; min-width:7ch; } .hi-pyr{ max-width:560px; }
    .hi-msg, .hi-msg2{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.6; } .hi-msg .gicon, .hi-msg2 .gicon{ font-size:18px; vertical-align:-3px; }
    .hi-msg.ok, .hi-msg2.ok{ color:#1E5E30; } .hi-msg.ko, .hi-msg2.ko{ color:#9A3A12; }
    .hi-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; font-size:.93rem; }
    .hi-etapes{ display:flex; width:fit-content; max-width:100%; flex-direction:column; gap:3px; text-align:left; margin:6px auto; background:#FBF1E6; border-radius:10px; padding:8px 14px; color:#1C1B2E; }
    .hi-glyphe{ width:24px; height:32px; vertical-align:middle; }
    .hi-palette{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; }
    .hi-palette button{ display:flex; flex-direction:column; align-items:center; border:1.5px solid #E0CDA8; background:#fff; border-radius:12px; padding:4px 12px; cursor:pointer; font:600 .8rem Inter,sans-serif; color:#6B4A22; }
    .hi-palette button:hover{ border-color:#8E3B2E; }
    .hi-papyrus{ display:flex; flex-wrap:wrap; gap:2px; justify-content:center; align-items:center; min-height:52px; background:linear-gradient(#F3E2B8,#EAD39E); border-radius:8px; padding:8px; box-shadow:inset 0 0 8px rgba(120,80,20,.25); }
    .hi-papyrus button{ border:0; background:none; padding:0; cursor:pointer; }
    .hi-vide{ color:#8B6B3A; font-size:.88rem; }
    .hi-monument{ display:flex; flex-direction:column; align-items:center; gap:4px; }
    .hi-pierre{ background:linear-gradient(#D8D2C4,#BDB5A3); border:3px solid #9C9483; border-radius:6px; padding:10px 26px; box-shadow:0 2px 6px rgba(0,0,0,.25); }
    .hi-pierre span{ font:700 1.8rem 'Times New Roman',serif; letter-spacing:.18em; color:#3B3528; text-shadow:0 1px 0 #EEE; }
    .hi-legende{ font-size:.85rem; color:#6B6F7A; font-style:italic; }
    .hi-doubles{ margin:0 auto; border-collapse:collapse; font:600 1rem 'JetBrains Mono',monospace; }
    .hi-doubles th, .hi-doubles td{ border:1px solid #E0CDA8; padding:4px 16px; text-align:center; } .hi-doubles th{ background:#F6EBD6; font:600 .85rem Inter,sans-serif; }
    .hi-doubles tr.on td{ background:#FFF0C2; }
    .hi-curseur{ text-align:center; } .hi-curseur input{ width:min(300px,70%); vertical-align:middle; } .hi-nb, .hi-k{ font:700 1.2rem 'JetBrains Mono',monospace; color:#8E3B2E; display:inline-block; min-width:2.2ch; }
    .hi-explic{ text-align:center; font-size:.95rem; }
    .hi-quiz{ background:#FBF1E6; border:1px solid #E8D2B4; border-radius:12px; padding:10px 14px; text-align:center; line-height:2; font-size:.93rem; }
    .hi-quiz .gicon{ vertical-align:-4px; color:#8E3B2E; }
    .hi-piege{ background:#FFF4E5; border:1px solid #F0C98A; border-left:5px solid #E67E22; border-radius:10px; padding:10px 14px; font-size:.92rem; line-height:1.55; }
    .hi-piege .gicon{ vertical-align:-4px; color:#E67E22; } .hi-piege ul{ margin:6px 0 0; padding-left:20px; } .hi-piege li{ margin:4px 0; }
    .hi-donnees{ display:flex; flex-direction:column; gap:3px; align-items:center; text-align:center; font-size:.92rem; }
    .hi-code, .hi-clair{ font-size:.9rem; text-align:center; }
    .hi-mono{ font:600 .88rem 'JetBrains Mono',monospace; letter-spacing:.06em; background:#F4EEE1; border-radius:8px; padding:8px 10px; margin-top:4px; word-break:break-word; text-align:left; }
    .hi-mono.ok{ background:#E3F4E6; color:#1E5E30; }
    .hi-hist p{ margin:6px 0 10px; line-height:1.6; }
    .hi-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#8E3B2E; margin:16px 0 4px; }
    .hi-hist-a-toi{ margin-top:14px; background:#FBF1E6; border:1px solid #E8D2B4; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .hi-hist-a-toi .gicon{ color:#8E3B2E; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();
