/* =====================================================================
   argent-maths.js -- Maths et argent : quatre activités et une page Histoire (onglet « Maths & la vie »).
   Demandé : « On peut faire un thème maths et argent et maths et jeux dans l'histoire en attendant ».

   1. « Rendre la monnaie » (CM1, CM2, 6e : nombres décimaux) : le client paie avec un billet, l'élève rend
      la monnaie avec les pièces et billets de la caisse ; « Comme le commerçant » compte en avançant du
      prix jusqu'au billet, une étape par ligne.
   2. « La meilleure affaire » (CM1, CM2, 6e : proportionnalité, division) : deux offres du même produit ;
      on compare le prix d'un seul (ou d'un kilogramme en 6e : data-niv="6e").
   3. « Les soldes » (5e Pourcentages, 4e Proportionnalité, 3e Fonctions linéaires) : calcul d'une
      réduction, puis « −20 % puis −30 %, est-ce −50 % ? » ; coefficient multiplicateur en 4e et 3e.
   4. « Faire grossir son épargne » (4e et 3e Puissances, 3e Fonctions) : intérêts simples (droite) et
      intérêts composés (puissances), temps de doublement, règle de 72.

   Placement : <div class="ar-monnaie"></div>, <div class="ar-affaire" data-niv="cm|6e"></div>,
   <div class="ar-soldes" data-niv="5e|4e|3e"></div>, <div class="ar-interets" data-niv="4e|3e"></div> ;
   arInitTout(conteneur). AR_HISTOIRE_HTML : la page Histoire.
   ===================================================================== */
const arE = c => (c / 100).toFixed(2).replace('.', ',') + ' €';              // centimes -> « 7,35 € »
const arN = (v, d) => (+v).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: d == null ? 2 : d });
const arHasard = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function arDire(el, h, cls){ const m = el.querySelector('.ar-msg'); if(!m) return; m.className = 'ar-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }

/* =====================================================================
   1. Rendre la monnaie
   ===================================================================== */
const AR_CAISSE = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];               // en centimes
const AR_ACHATS = [['un livre', '📕'], ['une baguette et des croissants', '🥖'], ['un cahier et des stylos', '📒'], ['un ballon', '⚽'], ['une boîte de crayons', '🖍️'], ['un jeu de cartes', '🃏'], ['des fruits', '🍎'], ['une bande dessinée', '📗']];
function arPiece(c, petit){
  const billet = c >= 500, cl = billet ? 'ar-billet b' + c : 'ar-piece' + (c >= 100 ? ' euro' : c >= 10 ? ' or' : ' cuivre');
  return `<span class="${cl}${petit ? ' petit' : ''}">${c >= 100 ? c / 100 + ' €' : c + ' c'}</span>`;
}
function arMonnaieMonter(el){
  const st = { prix: 0, donne: 0, rendu: [], achat: null };
  el.innerHTML = `<div class="ar-box">
    <div class="ar-ticket"></div>
    <div class="ar-consigne">Tu es à la caisse : clique sur les pièces et les billets pour <b>rendre la monnaie</b> au client. Clique sur une pièce rendue pour la reprendre.</div>
    <div class="ar-caisse">${AR_CAISSE.map(c => `<button type="button" data-c="${c}" aria-label="${c >= 100 ? c / 100 + ' euros' : c + ' centimes'}">${arPiece(c)}</button>`).join('')}</div>
    <div class="ar-plateau" aria-live="polite"></div>
    <div class="ar-msg" aria-live="polite"></div>
    <div class="ar-actions"><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> J'ai rendu la monnaie</button>
      <button type="button" class="btn secondary" data-a="commercant"><span class="gicon">storefront</span> Comme le commerçant</button>
      <button type="button" class="btn secondary" data-a="nouveau"><span class="gicon">refresh</span> Un autre client</button></div></div>`;
  const $ = s => el.querySelector(s);
  function nouveau(){
    st.achat = AR_ACHATS[arHasard(0, AR_ACHATS.length - 1)];
    st.prix = arHasard(1, 989) * 5; if(st.prix % 100 === 0) st.prix += 35;            // de 0,05 € à 49,80 €, jamais un prix rond
    st.donne = [500, 1000, 2000, 5000].find(b => b > st.prix);                        // le plus petit billet qui suffit
    st.rendu = [];
    $('.ar-ticket').innerHTML = `<span class="ar-emoji">${st.achat[1]}</span><div><div>Le client achète <b>${st.achat[0]}</b> : <b class="ar-gros">${arE(st.prix)}</b></div>
      <div>Il paie avec ${st.donne >= 500 ? 'un billet de' : ''} <b class="ar-gros">${arE(st.donne)}</b>.</div></div>`;
    plateau(); arDire(el, 'Combien faut-il lui rendre ? Rends la monnaie, puis clique sur « J\'ai rendu la monnaie ».');
  }
  function plateau(){
    const p = $('.ar-plateau');
    p.innerHTML = st.rendu.length ? st.rendu.map((c, i) => `<button type="button" data-i="${i}" title="Reprendre">${arPiece(c, true)}</button>`).join('') : '<span class="ar-vide">Monnaie rendue : rien pour l\'instant</span>';
    p.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { st.rendu.splice(+b.dataset.i, 1); plateau(); });
  }
  const glouton = r => { const l = []; AR_CAISSE.forEach(c => { while(r >= c){ l.push(c); r -= c; } }); return l; };
  function verifier(){
    const tot = st.rendu.reduce((a, b) => a + b, 0), du = st.donne - st.prix, min = glouton(du).length;
    if(tot === du) arDire(el, `<span class="gicon">celebration</span> Bravo : tu as rendu <b>${arE(tot)}</b>, le compte est bon !` + (st.rendu.length > min ? ` Tu as utilisé ${st.rendu.length} pièces et billets : on pouvait le faire avec <b>${min}</b> seulement.` : ` Et avec le moins de pièces possible (${min}) !`), 'ok');
    else arDire(el, `<span class="gicon">info</span> Tu as rendu ${arE(tot)}. ${tot < du ? 'Ce n\'est pas assez : le client n\'est pas content !' : 'C\'est trop : la caisse perd de l\'argent !'} Essaie « Comme le commerçant ».`, 'ko');
  }
  // Le commerçant ne soustrait pas : il complète, du prix jusqu'à la somme donnée, en rendant les pièces une à une.
  function commercant(){
    const etapes = []; let x = st.prix;
    for(const pas of [10, 100, 1000]){ if(x % pas && x < st.donne){ const cible = Math.min(st.donne, Math.ceil(x / pas) * pas); etapes.push([x, cible]); x = cible; } }
    if(x < st.donne) etapes.push([x, st.donne]);
    st.rendu = []; plateau();
    let i = 0, lignes = [];
    const suite = () => {
      if(i >= etapes.length){ arDire(el, `<div class="ar-etapes">${lignes.join('')}</div><b>On a rendu ${arE(st.donne - st.prix)}.</b> Le commerçant n'a fait aucune soustraction : il a complété le prix, étape par étape, jusqu'à ${arE(st.donne)}.`, 'ok'); return; }
      const [a, b] = etapes[i++], pieces = glouton(b - a);
      st.rendu.push(...pieces); plateau();
      lignes.push(`<div>${arE(a)} <span class="gicon">arrow_forward</span> ${arE(b)} : je rends ${pieces.map(c => arPiece(c, true)).join(' ')}</div>`);
      arDire(el, `<div class="ar-etapes">${lignes.join('')}</div>`);
      setTimeout(suite, 1300);
    };
    suite();
  }
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { if(st.rendu.length < 30){ st.rendu.push(+b.dataset.c); st.rendu.sort((x, y) => y - x); plateau(); } });
  $('[data-a="verif"]').onclick = verifier;
  $('[data-a="commercant"]').onclick = commercant;
  $('[data-a="nouveau"]').onclick = nouveau;
  nouveau();
}

/* =====================================================================
   2. La meilleure affaire
   ===================================================================== */
const AR_PRODUITS = [['yaourts', 'yaourt', '🥛'], ['croissants', 'croissant', '🥐'], ['stylos', 'stylo', '🖊️'], ['balles de tennis', 'balle', '🎾'], ['cahiers', 'cahier', '📓'], ['jus de fruits', 'jus de fruits', '🧃']];
const AR_VRAC = [['riz', '🍚'], ['pâtes', '🍝'], ['café', '☕'], ['farine', '🌾'], ['fromage râpé', '🧀']];
function arAffaireMonter(el){
  const six = el.dataset.niv === '6e', st = { offres: [], score: 0, tour: 0, fini: false };
  el.innerHTML = `<div class="ar-box">
    <div class="ar-consigne">Au supermarché, deux offres pour le même produit. <b>Laquelle est la moins chère ?</b> Ce n'est pas forcément le plus petit prix affiché !</div>
    <div class="ar-offres"></div>
    <div class="ar-msg" aria-live="polite"></div>
    <div class="ar-actions"><button type="button" class="btn secondary" data-a="nouveau"><span class="gicon">refresh</span> Deux autres offres</button><span class="ar-score"></span></div></div>`;
  const $ = s => el.querySelector(s);
  function nouveau(){
    st.fini = false;
    if(six && Math.random() < .5){ // en vrac : prix au kilogramme
      const p = AR_VRAC[arHasard(0, AR_VRAC.length - 1)], m = [[250, 1000], [500, 1500], [500, 2000], [750, 1500], [250, 750]][arHasard(0, 4)];
      let k1 = arHasard(8, 22) * 40, k2 = k1 + arHasard(-3, 3) * 40; if(k2 === k1) k2 += 40;   // prix d'un kilogramme, en centimes (multiple de 40 : prix entiers en centimes)
      st.offres = [{ q: m[0], prix: k1 * m[0] / 1000, unite: 'kg' }, { q: m[1], prix: k2 * m[1] / 1000, unite: 'kg' }].map(o => ({ ...o, nom: p[0], emoji: p[1], u: o.prix * 1000 / o.q }));
      if(Math.random() < .5) st.offres.reverse();
    } else {
      const p = AR_PRODUITS[arHasard(0, AR_PRODUITS.length - 1)], n = [[2, 3], [3, 4], [4, 6], [2, 5], [3, 8], [4, 10], [6, 8]][arHasard(0, 6)];
      let u1 = arHasard(6, 40) * 5, u2 = u1 + arHasard(-3, 3) * 5; if(u2 === u1) u2 += 5;     // prix d'un seul, en centimes
      st.offres = [{ q: n[0], u: u1 }, { q: n[1], u: u2 }].map(o => ({ ...o, prix: o.u * o.q, nom: p[0], un: p[1], emoji: p[2] }));
      if(Math.random() < .5) st.offres.reverse();
    }
    const titre = o => o.unite ? `Paquet de ${o.q >= 1000 ? arN(o.q / 1000) + ' kg' : o.q + ' g'}` : `Lot de ${o.q} ${o.nom}`;
    $('.ar-offres').innerHTML = st.offres.map((o, i) => `<button type="button" class="ar-offre" data-o="${i}"><span class="ar-emoji">${o.emoji.repeat(o.unite ? 1 : Math.min(o.q, 5))}</span>
      <span class="ar-offre-t">${titre(o)}${o.unite ? ' de ' + o.nom : ''}</span><span class="ar-etiquette">${arE(Math.round(o.prix))}</span></button>`).join('');
    el.querySelectorAll('[data-o]').forEach(b => b.onclick = () => choisir(+b.dataset.o));
    arDire(el, 'Clique sur l\'offre la plus avantageuse.');
  }
  function choisir(i){
    if(st.fini) return; st.fini = true; st.tour++;
    const [a, b] = st.offres, best = a.u < b.u ? 0 : 1, ok = i === best;
    if(ok) st.score++;
    el.querySelectorAll('[data-o]').forEach((x, k) => x.classList.add(k === best ? 'gagne' : 'perd'));
    const ligne = (o, l) => o.unite
      ? `<div>Offre ${l} : un kilogramme coûte ${arE(Math.round(o.prix))} × 1 000 ÷ ${arN(o.q)} = <b>${arE(Math.round(o.u))}</b>.</div>`
      : `<div>Offre ${l} : un ${o.un} coûte ${arE(o.prix)} ÷ ${o.q} = <b>${arE(o.u)}</b>.</div>`;
    arDire(el, `${ok ? '<span class="gicon">celebration</span> Bien vu ! ' : '<span class="gicon">info</span> Pas cette fois. '}Pour comparer, on calcule le prix ${a.unite ? 'd\'un kilogramme' : 'd\'un seul ' + a.un} dans chaque offre :
      <div class="ar-etapes">${ligne(a, 'A')}${ligne(b, 'B')}</div>L'offre ${best ? 'B' : 'A'} est la moins chère, même si ${st.offres[best].prix > st.offres[1 - best].prix ? 'son prix affiché est plus grand' : 'les deux prix affichés sont proches'}.`, ok ? 'ok' : 'ko');
    $('.ar-score').textContent = `Score : ${st.score} sur ${st.tour}`;
  }
  $('[data-a="nouveau"]').onclick = nouveau;
  nouveau();
}

/* =====================================================================
   3. Les soldes
   ===================================================================== */
function arSoldesMonter(el){
  const coef = el.dataset.niv !== '5e', st = { prix: 80, p: 20, rep: null };
  el.innerHTML = `<div class="ar-box">
    <div class="ar-consigne">C'est les soldes ! Choisis le prix d'un article et le pourcentage de réduction.</div>
    <div class="ar-curseurs"><label>Prix : <input type="range" min="10" max="200" step="5" value="80" data-r="prix"> <b class="ar-v-prix"></b></label>
      <label>Réduction : <input type="range" min="5" max="70" step="5" value="20" data-r="p"> <b class="ar-v-p"></b></label></div>
    <div class="ar-solde"></div>
    <div class="ar-calc"></div>
    <div class="ar-defi"><b><span class="gicon">quiz</span> Le piège des démarques</b><div>Un magasin affiche <b>« −20 % »</b>, puis une semaine plus tard <b>« −30 % supplémentaires sur le prix déjà soldé »</b>. Au total, est-ce une réduction de 50 % ?</div>
      <div class="ar-actions"><button type="button" class="btn secondary" data-q="plus">Plus que 50 %</button><button type="button" class="btn secondary" data-q="egal">Exactement 50 %</button><button type="button" class="btn secondary" data-q="moins">Moins que 50 %</button></div>
      <svg class="ar-barres" viewBox="0 0 520 150"></svg></div>
    <div class="ar-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s);
  function calcul(){
    const r = st.prix * st.p / 100, n = st.prix - r;
    $('.ar-v-prix').textContent = arN(st.prix) + ' €'; $('.ar-v-p').textContent = st.p + ' %';
    $('.ar-solde').innerHTML = `<span class="ar-avant">${arN(st.prix)} €</span><span class="ar-badge">−${st.p} %</span><span class="ar-apres">${arN(n)} €</span>`;
    $('.ar-calc').innerHTML = `<div>Réduction : ${st.p} % de ${arN(st.prix)} €, c'est ${arN(st.prix)} × ${st.p} ÷ 100 = <b>${arN(r)} €</b>.</div>
      <div>Prix soldé : ${arN(st.prix)} − ${arN(r)} = <b>${arN(n)} €</b>.</div>`
      + (coef ? `<div class="ar-autre">Plus rapide : enlever ${st.p} %, c'est garder ${100 - st.p} %, donc <b>multiplier par ${arN(1 - st.p / 100)}</b> : ${arN(st.prix)} × ${arN(1 - st.p / 100)} = ${arN(n)} €.</div>` : '');
  }
  function barres(etape){
    const v = [100, 80, 56], lab = ['Prix de départ', 'Après −20 %', 'Après −30 %'], h = [];
    for(let i = 0; i <= etape; i++){
      const y = 18 + i * 42, w = v[i] * 3.6;
      h.push(`<text x="0" y="${y + 17}" font-size="13" fill="#4E5665">${lab[i]}</text><rect x="112" y="${y}" width="${w}" height="26" rx="5" fill="${['#2F6FB3', '#B7791F', '#C0533E'][i]}"><animate attributeName="width" from="${i ? v[i - 1] * 3.6 : 0}" to="${w}" dur=".7s"/></rect><text x="${118 + w}" y="${y + 18}" font-size="14" font-weight="700" fill="#1C1B2E">${v[i]} €</text>`);
    }
    if(etape === 2) h.push(`<line x1="${112 + 180}" y1="10" x2="${112 + 180}" y2="140" stroke="#1C1B2E" stroke-dasharray="4 3"/><text x="${116 + 180}" y="146" font-size="11" fill="#1C1B2E">50 € (−50 %)</text>`);
    $('.ar-barres').innerHTML = h.join('');
  }
  function repondre(q){
    let e = 0; barres(0);
    const t = setInterval(() => { e++; barres(e); if(e >= 2){ clearInterval(t); expliquer(q); } }, 900);
  }
  function expliquer(q){
    const ok = q === 'moins';
    arDire(el, `${ok ? '<span class="gicon">celebration</span> Exact : c\'est moins !' : '<span class="gicon">info</span> Eh non : c\'est moins que 50 % !'} Prenons un article à 100 € :
      <div class="ar-etapes"><div>−20 % : 100 − 20 = <b>80 €</b>.</div><div>−30 % de 80 €, c'est 80 × 30 ÷ 100 = 24 €.</div><div>Nouveau prix : 80 − 24 = <b>56 €</b>.</div></div>
      On paie 56 € au lieu de 100 € : la réduction totale est de <b>44 %</b>, pas 50 %. La deuxième réduction se calcule sur un prix déjà plus petit.`
      + (coef ? `<div class="ar-autre">Avec les coefficients : × 0,8 puis × 0,7, c'est multiplier par 0,8 × 0,7 = <b>0,56</b>.${el.dataset.niv === '3e' ? ' Le prix soldé est une <b>fonction linéaire</b> du prix de départ : f(x) = 0,56x.' : ''}</div>` : ''), ok ? 'ok' : 'ko');
  }
  el.querySelectorAll('[data-r]').forEach(r => r.oninput = () => { st[r.dataset.r] = +r.value; calcul(); });
  el.querySelectorAll('[data-q]').forEach(b => b.onclick = () => repondre(b.dataset.q));
  calcul(); barres(0);
}

/* =====================================================================
   4. Faire grossir son épargne (intérêts simples et composés)
   ===================================================================== */
function arInteretsMonter(el){
  const trois = el.dataset.niv === '3e', st = { t: 5, n: 20 }, C = 1000;
  el.innerHTML = `<div class="ar-box">
    <div class="ar-consigne">Tu places <b>1 000 €</b> à la banque, avec un taux d'intérêt par an. Deux façons de calculer les intérêts :
      <b style="color:#2F6FB3">intérêts simples</b> (chaque année, ${'on gagne toujours le même montant, calculé sur les 1 000 € de départ'}) ou
      <b style="color:#C0533E">intérêts composés</b> (chaque année, les intérêts s'ajoutent et rapportent à leur tour).</div>
    <div class="ar-curseurs"><label>Taux : <input type="range" min="1" max="12" step="1" value="5" data-r="t"> <b class="ar-v-t"></b></label>
      <label>Durée : <input type="range" min="1" max="40" step="1" value="20" data-r="n"> <b class="ar-v-n"></b></label></div>
    <svg class="ar-graphe" viewBox="0 0 560 300"></svg>
    <div class="ar-calc"></div>
    <div class="ar-actions"><button type="button" class="btn secondary" data-a="double"><span class="gicon">timer</span> En combien d'années l'argent double-t-il ?</button></div>
    <div class="ar-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s);
  const simple = k => C * (1 + st.t / 100 * k), compose = k => C * Math.pow(1 + st.t / 100, k);
  function dessiner(){
    $('.ar-v-t').textContent = st.t + ' % par an'; $('.ar-v-n').textContent = st.n + ' ans';
    const ymax = Math.max(2000, Math.ceil(compose(st.n) / 1000) * 1000), X = k => 60 + k * 480 / st.n, Y = v => 270 - v * 250 / ymax;
    let h = `<rect width="560" height="300" fill="#FFFDF6"/>`;
    for(let v = 0; v <= ymax; v += ymax > 6000 ? 2000 : 1000) h += `<line x1="60" x2="540" y1="${Y(v)}" y2="${Y(v)}" stroke="#E8E2D0"/><text x="54" y="${Y(v) + 4}" font-size="11" text-anchor="end" fill="#6B6F7A">${arN(v)} €</text>`;
    const pas = st.n > 20 ? 5 : st.n > 10 ? 2 : 1;
    for(let k = 0; k <= st.n; k += pas) h += `<text x="${X(k)}" y="288" font-size="11" text-anchor="middle" fill="#6B6F7A">${k}</text>`;
    h += `<text x="540" y="276" font-size="11" text-anchor="end" fill="#6B6F7A">années</text><line x1="60" x2="540" y1="270" y2="270" stroke="#6B6F7A"/>`;
    const ligne = (f, c) => { let d = ''; for(let k = 0; k <= st.n; k += .25) d += (d ? ' L' : 'M') + X(k).toFixed(1) + ',' + Y(f(k)).toFixed(1); return `<path d="${d}" fill="none" stroke="${c}" stroke-width="3"/>`; };
    h += ligne(simple, '#2F6FB3') + ligne(compose, '#C0533E');
    for(let k = 0; k <= st.n; k++) h += `<circle cx="${X(k)}" cy="${Y(compose(k))}" r="2.6" fill="#C0533E"/>`;
    h += `<text x="${X(st.n) - 4}" y="${Y(simple(st.n)) + 16}" font-size="12" text-anchor="end" fill="#2F6FB3" font-weight="700">${arN(simple(st.n), 0)} €</text><text x="${X(st.n) - 4}" y="${Y(compose(st.n)) - 8}" font-size="12" text-anchor="end" fill="#C0533E" font-weight="700">${arN(compose(st.n), 0)} €</text>`;
    $('.ar-graphe').innerHTML = h;
    const c = arN(1 + st.t / 100, 2);
    $('.ar-calc').innerHTML = `<div><b style="color:#2F6FB3">Intérêts simples</b> : on gagne ${arN(C * st.t / 100)} € chaque année. Après ${st.n} ans : 1 000 + ${arN(C * st.t / 100)} × ${st.n} = <b>${arN(simple(st.n), 0)} €</b>.${trois ? ' C\'est une <b>fonction affine</b> de la durée : sa courbe est une droite.' : ''}</div>
      <div><b style="color:#C0533E">Intérêts composés</b> : chaque année, on multiplie par ${c}. Après ${st.n} ans : 1 000 × ${c}<sup>${st.n}</sup> ≈ <b>${arN(compose(st.n), 0)} €</b>.${trois ? ' Ce n\'est pas une fonction affine : la courbe se redresse de plus en plus.' : ' C\'est une <b>puissance</b> : on multiplie ' + st.n + ' fois par ' + c + '.'}</div>`;
  }
  function doubler(){
    let k = 0; while(compose(k) < 2 * C) k++;
    arDire(el, `À ${st.t} % par an, en intérêts composés, l'argent double en <b>${k} ans</b> (1 000 × ${arN(1 + st.t / 100, 2)}<sup>${k}</sup> ≈ ${arN(compose(k), 0)} €). En intérêts simples, il faut ${arN(100 / st.t, 1)} ans.
      <div class="ar-autre"><b>La règle de 72</b>, connue des marchands italiens depuis 1494 : le temps de doublement est à peu près 72 ÷ ${st.t} ≈ <b>${arN(72 / st.t, 1)} ans</b>.</div>`, 'ok');
  }
  el.querySelectorAll('[data-r]').forEach(r => r.oninput = () => { st[r.dataset.r] = +r.value; dessiner(); arDire(el, ''); });
  $('[data-a="double"]').onclick = doubler;
  dessiner();
}

/* ---------- Construction ---------- */
function arInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.ar-monnaie').forEach(arMonnaieMonter);
  racine.querySelectorAll('.ar-affaire').forEach(arAffaireMonter);
  racine.querySelectorAll('.ar-soldes').forEach(arSoldesMonter);
  racine.querySelectorAll('.ar-interets').forEach(arInteretsMonter);
}

/* =====================================================================
   Page Histoire « Maths et argent » (sans fraction écrite : lisible du CM1 à la 3e)
   ===================================================================== */
const AR_HISTOIRE_HTML = `
<div class="history-box ar-hist">
  <div class="history-title"><span class="gicon">payments</span> Maths et argent : compter, échanger, prêter</div>

  <h4 class="ar-hist-h">Les premiers comptes, avant l'écriture</h4>
  <p>Il y a plus de 5 000 ans, en <b>Mésopotamie</b> (l'Irak actuel), les marchands et les temples comptent les moutons, les sacs de grain et les jarres d'huile avec de petits <b>jetons d'argile</b>. Pour qu'on ne puisse pas tricher, on les enferme dans une boule d'argile, sur laquelle on imprime leur forme. Puis on se contente des empreintes, sur une tablette : c'est l'un des débuts de l'<b>écriture</b>… et des nombres écrits. Écrire, ce fut d'abord tenir des comptes !</p>

  <h4 class="ar-hist-h">Fibonacci apprend aux marchands à calculer (1202)</h4>
  <p>En Europe, on calcule encore avec des chiffres romains et des jetons posés sur une table à compter, l'<b>abaque</b>. Fils d'un marchand de Pise, <b>Fibonacci</b> a appris en Afrique du Nord les chiffres indiens transmis par les savants arabes : 0, 1, 2… 9. Dans son <i>Livre du calcul</i> (1202), il montre aux commerçants comment s'en servir pour changer des monnaies, partager des bénéfices ou calculer des intérêts. En quelques siècles, ces chiffres remplacent les chiffres romains.</p>

  <h4 class="ar-hist-h">Les signes + et −, le symbole %</h4>
  <p>Les signes <b>+</b> et <b>−</b> apparaissent pour la première fois dans un livre imprimé en 1489, un manuel de calcul pour les marchands écrit par l'Allemand <b>Johannes Widmann</b> : ils y indiquent un surplus ou un manque dans une caisse de marchandises. Le symbole <b>%</b> vient des marchands italiens : ils écrivaient « per cento » (pour cent), abrégé en « p cento », puis en un petit signe qui est devenu notre %.</p>

  <h4 class="ar-hist-h">Les banquiers italiens et la règle de 72</h4>
  <p>Au 15e siècle, les grandes familles de banquiers de Florence et de Venise prêtent de l'argent dans toute l'Europe. En 1494, le moine mathématicien <b>Luca Pacioli</b> publie un énorme traité où il explique la comptabilité en « partie double » (encore utilisée aujourd'hui) et une astuce : pour savoir en combien d'années un placement double, on divise <b>72</b> par le taux d'intérêt. C'est la <b>règle de 72</b> !</p>

  <h4 class="ar-hist-h">Une monnaie décimale : le franc, puis l'euro</h4>
  <p>Sous l'Ancien Régime, une livre valait 20 sous et un sou 12 deniers : bon courage pour rendre la monnaie ! En 1795, en même temps que le mètre et le kilogramme, la Révolution crée le <b>franc</b> : 1 franc = 10 décimes = 100 centimes. C'est l'une des premières monnaies <b>décimales</b>, et c'est pourquoi on écrit les prix avec une virgule et deux chiffres après. Le Royaume-Uni n'a adopté la monnaie décimale qu'en <b>1971</b> ! Depuis 2002, nous payons en <b>euros</b> : 1 euro = 100 centimes.</p>

  <div class="ar-hist-a-toi"><span class="gicon">shopping_cart</span> <b>À toi !</b> Au supermarché, regarde les petites étiquettes sous les prix : elles indiquent le <b>prix au kilogramme</b> (ou au litre). Choisis un produit vendu en deux tailles de paquet, et cherche lequel est vraiment le moins cher. Le plus gros paquet gagne-t-il toujours ?</div>
</div>`;

(function arStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .ar-box{ display:flex; flex-direction:column; gap:10px; }
    .ar-consigne{ font-size:.95rem; line-height:1.55; }
    .ar-ticket{ display:flex; gap:14px; align-items:center; background:#FFF8E6; border:1px dashed #D9B45A; border-radius:12px; padding:10px 16px; line-height:1.7; }
    .ar-emoji{ font-size:2rem; line-height:1; }
    .ar-gros{ font:700 1.15rem 'Space Grotesk',sans-serif; color:#8A5A00; }
    .ar-caisse{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; background:#F4EEE1; border-radius:12px; padding:10px; }
    .ar-caisse button, .ar-plateau button{ border:0; background:none; padding:0; cursor:pointer; }
    .ar-caisse button:hover{ transform:translateY(-2px); }
    .ar-piece{ display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:50%; font:700 .78rem Inter,sans-serif; box-shadow:inset 0 0 0 3px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.25); }
    .ar-piece.cuivre{ background:radial-gradient(circle at 35% 35%,#E8A27A,#B5652F); color:#fff; width:38px; height:38px; }
    .ar-piece.or{ background:radial-gradient(circle at 35% 35%,#F7DE7E,#C9A227); color:#5A4300; width:42px; height:42px; }
    .ar-piece.euro{ background:radial-gradient(circle at 50% 50%,#F2D777 0 46%,#C8CDD3 48% 100%); color:#3B3B3B; }
    .ar-billet{ display:inline-flex; align-items:center; justify-content:center; width:74px; height:42px; border-radius:5px; font:700 .9rem 'Space Grotesk',sans-serif; color:#fff; box-shadow:0 1px 3px rgba(0,0,0,.3); }
    .ar-billet.b500{ background:linear-gradient(135deg,#9BA3AE,#6E7682); } .ar-billet.b1000{ background:linear-gradient(135deg,#E07C6C,#B5483A); } .ar-billet.b2000{ background:linear-gradient(135deg,#6E9BD8,#2F5E9E); }
    .ar-piece.petit{ transform:scale(.82); } .ar-billet.petit{ transform:scale(.82); }
    .ar-plateau{ display:flex; flex-wrap:wrap; gap:2px; align-items:center; justify-content:center; min-height:54px; border:2px dashed #C9B98F; border-radius:12px; padding:6px; }
    .ar-vide{ color:#8A8F98; font-size:.9rem; }
    .ar-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.6; } .ar-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .ar-msg.ok{ color:#1E5E30; } .ar-msg.ko{ color:#9A3A12; }
    .ar-etapes{ display:flex; width:fit-content; max-width:100%; flex-direction:column; gap:3px; text-align:left; margin:6px auto; background:#FFFBF0; border-radius:10px; padding:8px 14px; color:#1C1B2E; }
    .ar-etapes .gicon{ font-size:16px; vertical-align:-3px; color:#8A5A00; }
    .ar-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; }
    .ar-score{ font:600 .9rem 'JetBrains Mono',monospace; color:#4E5665; }
    .ar-offres{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
    .ar-offre{ display:flex; flex-direction:column; align-items:center; gap:6px; width:min(240px,44%); border:2px solid #E2D7BC; border-radius:14px; background:#fff; padding:12px; cursor:pointer; font:500 .95rem Inter,sans-serif; }
    .ar-offre:hover{ border-color:#B7791F; } .ar-offre.gagne{ border-color:#1E7B34; background:#EEF8F0; } .ar-offre.perd{ opacity:.6; }
    .ar-etiquette{ background:#FFD84D; color:#1C1B2E; font:700 1.2rem 'Space Grotesk',sans-serif; padding:3px 12px; border-radius:6px; transform:rotate(-3deg); }
    .ar-curseurs{ display:flex; gap:18px; flex-wrap:wrap; justify-content:center; font-size:.92rem; } .ar-curseurs input{ width:160px; vertical-align:middle; }
    .ar-solde{ display:flex; gap:14px; align-items:center; justify-content:center; font:700 1.3rem 'Space Grotesk',sans-serif; }
    .ar-avant{ color:#8A8F98; text-decoration:line-through; } .ar-apres{ color:#C0533E; font-size:1.6rem; }
    .ar-badge{ background:#C0533E; color:#fff; border-radius:999px; padding:3px 12px; font-size:1rem; }
    .ar-calc{ display:flex; flex-direction:column; gap:4px; align-items:center; text-align:center; font-size:.93rem; line-height:1.55; }
    .ar-autre{ margin-top:6px; color:#5B2F9E; }
    .ar-defi{ background:#F7F2FC; border:1px solid #DCCDF0; border-radius:12px; padding:10px 14px; display:flex; flex-direction:column; gap:8px; line-height:1.55; }
    .ar-defi .gicon{ vertical-align:-4px; color:#5B2F9E; }
    .ar-barres{ width:100%; max-width:520px; margin:0 auto; display:block; }
    .ar-graphe{ width:100%; max-width:560px; display:block; margin:0 auto; border-radius:12px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .ar-hist p{ margin:6px 0 10px; line-height:1.6; }
    .ar-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#8A5A00; margin:16px 0 4px; }
    .ar-hist-a-toi{ margin-top:14px; background:#FFF6DD; border:1px solid #EBD18B; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .ar-hist-a-toi .gicon{ color:#B7791F; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();
