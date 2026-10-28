/* ============================================================
   chapitres/cp/_anims.js -- Dessins et animations du CP.

   Demandé : « le site est aussi très utile pour l'enseignant, surtout avec un maximum d'animations
   visuelles ». Au CP, le cours est d'abord projeté au tableau : l'enseignant montre, la classe
   regarde, compte et répond à l'oral. Chaque animation utilise le lecteur commun (cmAnim,
   chapitres/cm1/_anims.js : Lecture / Pause, curseur, réglages) et se lance à l'ouverture du
   chapitre (cm1Chapitre › init).

   Dessins fixes : cpDe (points du dé ; de 6 à 10, deux dés « 5 et encore… »), cpDoigts (deux
   mains), cpBoiteDix (boîte de dix), cpPommes (une collection à compter), cpNombre (le nombre en
   chiffres, en lettres et avec ses points).
   Animations : cpAnimFlash (une quantité vue un instant : « Combien ? »), cpAnimCompter (compter
   une collection, le dernier nombre dit), cpAnimBoiteDix (remplir la boîte, ce qu'il manque pour
   faire 10), cpAnimMaison (toutes les façons de faire un nombre : la maison du nombre).
   Dépend de chapitres/cm1/_anims.js (cmAnim, cmBtn, cmPlusMoins, cmPhase, cmDoux) et de
   chapitres/ce2/_anims.js (CE2C, ce2T).
   ============================================================ */
const CP_MOTS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
const CPC = { jeton: '#E35D3A', jeton2: '#2EA8C9', case: '#FFF7E8', bord: '#1F3A5C', pomme: '#D93A2B', feuille: '#3E9B4F' };
const cpSvg = (w, h, s, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`;
// « Pour aller plus loin » : notion du CE1 (ou d'après : vers = 'CE2'), en fin de chapitre, hors programme du CP.
const cpPlusLoin = (titre, vers) => `<div class="sub-header" data-oliv-plus="En route vers le ${vers || 'CE1'} !"><span class="letter">+</span><h4>Pour aller plus loin : ${titre}</h4></div>`;

/* ---- Points du dé (grille 3 × 3) ---- */
const CP_DE = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]] };
// Un dé dessiné en (x, y), de côté c, avec n points (0 à 6) ; k : nombre de points déjà montrés.
function cpDeSvg(x, y, c, n, o){
  o = o || {}; const k = o.k == null ? n : o.k, coul = o.coul || CPC.bord;
  let s = `<rect x="${x}" y="${y}" width="${c}" height="${c}" rx="${c * .16}" fill="#fff" stroke="${CPC.bord}" stroke-width="2.5"/>`;
  (CP_DE[n] || []).forEach(([i, j], q) => { if(q < k) s += `<circle cx="${x + c * (.22 + .28 * i)}" cy="${y + c * (.22 + .28 * j)}" r="${c * .09}" fill="${coul}"/>`; });
  return s;
}
// Le nombre n (0 à 10) avec les points du dé : un dé jusqu'à 5 ou 6, deux dés « 5 et encore… » au-delà.
function cpDe(n, o){
  o = o || {}; const c = o.c || 64;
  if(n <= 6 && !(o.cinq && n > 5)) return cpSvg(c + 6, c + 6, cpDeSvg(3, 3, c, n), o.px);
  return cpSvg(2 * c + 18, c + 6, cpDeSvg(3, 3, c, 5) + cpDeSvg(c + 15, 3, c, n - 5, { coul: CPC.jeton }), o.px);
}

/* ---- Les doigts : les deux mains de l'enseignant, paumes tournées vers la classe ; n doigts levés ----
   Signalé : « Les pouces ne sont pas du bon côté ! » Paumes vers la classe, les pouces sont à
   l'extérieur. On lève le pouce, puis l'index (à côté du pouce), le majeur, l'annulaire,
   l'auriculaire. o.droite : main dessinée à droite (son pouce est à droite). */
function cpMainSvg(x, y, n, o){ return cpMainDoigtsSvg(x, y, [0, 1, 2, 3, 4].map(d => n >= d + 1), o); }
// Une main dont on choisit les doigts levés : leves = [pouce, index, majeur, annulaire, auriculaire] (vrai : levé).
function cpMainDoigtsSvg(x, y, leves, o){
  o = o || {}; const peau = '#F6C9A0', trait = '#9A5B34', dr = !!o.droite, st = `fill="${peau}" stroke="${trait}" stroke-width="1.8"`;
  // Pouce levé : dessiné avant la paume, qui recouvre sa base (il reste attaché à la main).
  const px = dr ? x + 52 : x + 6, py = y + 68;
  let s = leves[0] ? `<rect x="${px - 6.5}" y="${py - 42}" width="13" height="44" rx="6.5" ${st} transform="rotate(${dr ? 30 : -30} ${px} ${py})"/>` : '';
  s += `<rect x="${x}" y="${y + 40}" width="58" height="46" rx="14" ${st}/>`;
  // Pouce replié : couché sur la paume.
  if(!leves[0]) s += `<rect x="${dr ? x + 30 : x + 4}" y="${y + 58}" width="24" height="12" rx="6" ${st}/>`;
  // Quatre doigts, de l'index (à côté du pouce) à l'auriculaire.
  const L = [44, 48, 44, 36];
  for(let d = 0; d < 4; d++){ const h = leves[d + 1] ? L[d] : 10, cx = dr ? x + 44 - d * 13.5 : x + 3 + d * 13.5;
    s += `<rect x="${cx}" y="${y + 44 - h}" width="11" height="${h + 6}" rx="5.5" ${st}/>`; }
  return s;
}
function cpDoigts(n, o){
  o = o || {};
  const g = Math.min(5, n), d = Math.max(0, n - 5), deux = n > 5 || o.deux;
  return cpSvg(deux ? 214 : 104, 96, cpMainSvg(30, 6, g) + (deux ? cpMainSvg(126, 6, d, { droite: true }) : ''), o.px);
}

/* ---- Boîte de dix : 2 rangées de 5 cases ; n jetons (rangée du haut d'abord) ---- */
function cpBoiteDixSvg(x, y, n, o){
  o = o || {}; const c = o.c || 40, k = o.k == null ? n : o.k;
  let s = `<rect x="${x}" y="${y}" width="${5 * c}" height="${2 * c}" fill="${CPC.case}" stroke="${CPC.bord}" stroke-width="2.5"/>`;
  for(let i = 1; i < 5; i++) s += `<line x1="${x + i * c}" y1="${y}" x2="${x + i * c}" y2="${y + 2 * c}" stroke="${CPC.bord}" stroke-width="1.5"/>`;
  s += `<line x1="${x}" y1="${y + c}" x2="${x + 5 * c}" y2="${y + c}" stroke="${CPC.bord}" stroke-width="1.5"/>`;
  // o.plein : cases coloriées en entier (« colorie les cases ») au lieu de jetons.
  for(let q = 0; q < Math.min(10, k); q++){ const i = q % 5, j = Math.floor(q / 5), f = (o.couleurs && o.couleurs[q]) || CPC.jeton;
    s += o.plein ? `<rect x="${x + c * i + 1.5}" y="${y + c * j + 1.5}" width="${c - 3}" height="${c - 3}" fill="${f}"/>`
      : `<circle cx="${x + c * i + c / 2}" cy="${y + c * j + c / 2}" r="${c * .34}" fill="${f}" stroke="${CPC.bord}" stroke-width="1.2"/>`; }
  (o.vides || []).forEach(q => { const i = q % 5, j = Math.floor(q / 5);
    s += `<circle cx="${x + c * i + c / 2}" cy="${y + c * j + c / 2}" r="${c * .34}" fill="none" stroke="${CE2C.vert}" stroke-width="2.4" stroke-dasharray="5 4"/>`; });
  return s;
}
function cpBoiteDix(n, o){ o = o || {}; const c = o.c || 40; return cpSvg(5 * c + 6, 2 * c + 6, cpBoiteDixSvg(3, 3, n, o), o.px); }

/* ---- Une collection de pommes, disposées « en vrac » (toujours la même disposition pour un tirage) ---- */
function cpPositions(n, graine, W, H){
  let g = graine || 7; const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const pts = [];
  for(let essai = 0; pts.length < n && essai < 2000; essai++){
    const p = [28 + alea() * (W - 56), 30 + alea() * (H - 58)];
    if(pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > 46)) pts.push(p);
  }
  return pts;
}
const cpPomme = (x, y, o) => { o = o || {}; const r = o.r || 15;
  return `<g opacity="${o.op == null ? 1 : o.op}"><circle cx="${x}" cy="${y}" r="${r}" fill="${o.coul || CPC.pomme}" stroke="#7A1E14" stroke-width="1.4"/>`
    + `<line x1="${x}" y1="${y - r + 2}" x2="${x + 2}" y2="${y - r - 7}" stroke="#6B4423" stroke-width="2.4" stroke-linecap="round"/>`
    + `<ellipse cx="${x + 8}" cy="${y - r - 4}" rx="6" ry="3" fill="${CPC.feuille}" transform="rotate(-25 ${x + 8} ${y - r - 4})"/>`
    + `<ellipse cx="${x - r * .35}" cy="${y - r * .3}" rx="${r * .22}" ry="${r * .32}" fill="#fff" opacity=".35"/></g>`; };
function cpPommes(n, o){ o = o || {}; const W = o.W || 300, H = o.H || 150; return cpSvg(W, H, cpPositions(n, o.graine, W, H).map(([x, y]) => cpPomme(x, y)).join(''), o.px); }

/* ---- Fiche d'un nombre : chiffre, mot, points du dé, doigts, boîte de dix ---- */
function cpNombre(n){
  return `<div class="cpn-fiche"><div class="cpn-fiche-n">${n}</div><div class="cpn-fiche-mot">${CP_MOTS[n]}</div>
    <div class="cpn-fiche-des">${cpDe(n, { c: 40 })}${cpBoiteDix(n, { c: 22 })}</div></div>`;
}

/* ---------------- Flash : une quantité vue un instant, « Combien ? » ----------------
   Montrée 1,5 s, cachée (la classe répond), puis révélée et comptée point par point. */
function cpAnimFlash(id, o){
  o = o || {};
  const MODES = { de: 'Points du dé', doigts: 'Doigts', boite: 'Boîte de dix', vrac: 'En vrac' };
  return cmAnim(id, {
    etat: { n: o.n || 4, mode: o.mode || 'de' }, duree: 9000,
    legende: o.legende || 'Au tableau : la quantité apparaît un instant, puis disparaît. « Combien ? » Les élèves répondent avec leurs doigts ou à l\'oral, puis on vérifie en comptant.',
    controles: a => `<div class="cmp-modeles">${(o.modes || Object.keys(MODES)).map(m => cmBtn(id, 'mode', m, MODES[m], a.etat.mode === m)).join('')}
      ${cmPlusMoins(id, 'n', a.etat.n, 1, 10, 'Nombre')}<button type="button" class="cmp-mod" onclick="cmAnimRegler('${id}','n',${1 + Math.floor(Math.random() * 10)})">Au hasard</button></div>`,
    dessin: (t, a) => {
      const { n, mode } = a.etat, W = 360, H = 170;
      const vu = t < .18, cache = t >= .18 && t < .5, compte = Math.floor(cmPhase(t, .52, .86) * n + 1e-6), fin = t >= .88;
      let s = '';
      if(cache) s = `<rect x="70" y="20" width="220" height="130" rx="18" fill="#EEF2F7" stroke="${CPC.bord}" stroke-width="2" stroke-dasharray="8 6"/>` + ce2T(180, 100, '?', { t: 64, c: CE2C.violet, g: 700 });
      else {
        const k = vu ? n : Math.max(compte, fin ? n : 0);
        if(mode === 'de'){ s = n <= 6 ? cpDeSvg(130, 35, 100, n, { k: vu ? n : k }) : cpDeSvg(60, 35, 100, 5, { k: vu ? 5 : Math.min(5, k) }) + cpDeSvg(200, 35, 100, n - 5, { k: vu ? n - 5 : Math.max(0, k - 5), coul: CPC.jeton }); }
        else if(mode === 'boite') s = cpBoiteDixSvg(80, 45, n, { c: 40, k: vu ? n : k });
        else if(mode === 'doigts') s = `<g transform="translate(41 18) scale(1.3)">${cpMainSvg(30, 6, Math.min(5, vu ? n : k))}${cpMainSvg(126, 6, Math.max(0, (vu ? n : k) - 5), { droite: true })}</g>`;
        else s = cpPositions(n, n * 3 + 1, W, H).map(([x, y], i) => cpPomme(x, y, { op: vu || i < k ? 1 : .18 })).join('');
        if(!vu && compte && !fin){ // le nombre qu'on dit en comptant
          s += ce2T(W - 30, 30, compte, { t: 26, c: CE2C.vert, g: 700 }); }
        if(fin) s += ce2T(W - 34, 40, n, { t: 40, c: CE2C.rouge, g: 700 });
      }
      const texte = vu ? 'Regardez bien…'
        : cache ? '<b>Combien</b> en avez-vous vu ? Montrez-le avec vos doigts.'
        : !fin ? `On vérifie en comptant : ${CP_MOTS.slice(1, compte + 1).join(', ')}${compte ? '…' : ''}`
        : `Il y en a <b>${n}</b> (${CP_MOTS[n]}).${mode === 'de' && n > 5 ? ` On voit <b>5 et encore ${n - 5}</b>.` : mode === 'boite' && n > 5 ? ` Une rangée pleine, c'est 5 : <b>5 et encore ${n - 5}</b>.` : mode === 'boite' && n === 5 ? ' Une rangée pleine : 5.' : ''}`;
      return { scene: `<svg viewBox="0 0 ${W} ${H}" class="cma-svg" style="max-width:${W * 1.2}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Compter une collection : un nombre pour chaque objet, le dernier dit combien ---------------- */
function cpAnimCompter(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 7, g: 3 }, duree: a => 2500 + a.etat.n * 900,
    legende: o.legende || 'On touche chaque pomme une seule fois en disant un nombre. Le dernier nombre dit, c\'est le nombre de pommes.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'n', a.etat.n, 1, 10, 'Pommes')}<button type="button" class="cmp-mod" onclick="cmAnimRegler('${id}','g',${Math.floor(Math.random() * 900) + 11})">Mélanger</button></div>`,
    dessin: (t, a) => {
      const { n, g } = a.etat, W = 380, H = 190, pts = cpPositions(n, g * 13 + n, W, H);
      // Ordre de comptage : de gauche à droite, pour ne pas en oublier.
      const ordre = pts.map((p, i) => i).sort((i, j) => pts[i][0] - pts[j][0]);
      const k = Math.floor(cmPhase(t, .06, .84) * n + 1e-6), fin = t >= .88;
      let s = pts.map(([x, y]) => cpPomme(x, y)).join('');
      ordre.slice(0, k).forEach((i, q) => { const [x, y] = pts[i];
        s += `<circle cx="${x}" cy="${y}" r="21" fill="none" stroke="${CE2C.vert}" stroke-width="3"/>` + `<circle cx="${x + 16}" cy="${y + 16}" r="11" fill="${q === k - 1 && !fin ? CE2C.vert : '#fff'}" stroke="${CE2C.vert}" stroke-width="2"/>` + ce2T(x + 16, y + 21, q + 1, { t: 13, c: q === k - 1 && !fin ? '#fff' : CE2C.vert, g: 700 }); });
      if(k > 0 && k <= n && !fin){ const [x, y] = pts[ordre[k - 1]]; s += `<path d="M${x - 26} ${y + 30} l14 -12 l-2 8 l10 -2 z" fill="${CE2C.violet}"/>`; } // le doigt qui pointe
      const texte = k === 0 ? 'Combien y a-t-il de pommes ? On compte en touchant chaque pomme <b>une seule fois</b>.'
        : !fin ? `${CP_MOTS.slice(1, k + 1).join(', ')}…`
        : `Le dernier nombre dit est <b>${n}</b> : il y a <b>${n} pomme${n > 1 ? 's' : ''}</b>.`;
      return { scene: `<svg viewBox="0 0 ${W} ${H}" class="cma-svg" style="max-width:${W * 1.2}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Boîte de dix : on la remplit, puis ce qu'il manque pour faire 10 ---------------- */
function cpAnimBoiteDix(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 7 }, duree: a => 3000 + a.etat.n * 500 + 3500,
    legende: o.legende || 'Les jetons remplissent d\'abord la rangée du haut. On voit tout de suite combien il y en a, et combien il manque pour faire 10.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'n', a.etat.n, 1, 10, 'Jetons')}</div>`,
    dessin: (t, a) => {
      const n = a.etat.n, m = 10 - n, W = 330, H = 150;
      const k = Math.floor(cmPhase(t, .04, .5) * n + 1e-6), plein = t >= .5, manque = t >= .62;
      // Cases vides entourées une à une (en vert), toutes à la fin.
      const nv = t >= .85 ? m : manque ? Math.floor(cmPhase(t, .62, .85) * m + 1e-6) : 0;
      let s = cpBoiteDixSvg(65, 20, n, { c: 40, k: plein ? n : k, vides: Array.from({ length: nv }, (_, i) => n + i) });
      if(plein) s += ce2T(165, 130, n, { t: 22, c: CPC.jeton, g: 700 }) + (t >= .85 && m ? ce2T(215, 130, `+ ${m} = 10`, { t: 22, c: CE2C.vert, g: 700, a: 'start' }) : '');
      const texte = !plein ? `On pose les jetons : ${k}…`
        : !manque ? `Il y a <b>${n}</b> jetons.${n > 5 && n < 10 ? ` Une rangée pleine (5) et encore ${n - 5} : <b>5 et ${n - 5}</b>, c'est ${n}.` : n === 10 ? ' La boîte est pleine : <b>10</b>, c\'est une dizaine !' : n === 5 ? ' Une rangée pleine : <b>5</b>.' : ''}`
        : m === 0 ? 'La boîte est pleine : il ne manque rien. <b>10</b>, c\'est une dizaine !'
        : t < .85 ? 'Combien de cases vides ?'
        : `Il manque <b>${m}</b> jeton${m > 1 ? 's' : ''} pour faire 10 : <b>${n} et ${m}, c'est 10</b>.`;
      return { scene: `<svg viewBox="0 0 ${W} ${H}" class="cma-svg" style="max-width:${W * 1.25}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- La maison du nombre : toutes les façons de faire n avec deux paquets ----------------
   Les jetons rouges passent un par un en bleu ; chaque partage s'écrit dans la maison. */
function cpAnimMaison(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 6 }, duree: a => 2000 + (a.etat.n + 1) * 1500,
    legende: o.legende || 'Les jetons sont toujours les mêmes : on change seulement la façon de les partager en deux paquets.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'n', a.etat.n, 2, 10, 'Nombre')}</div>`,
    dessin: (t, a) => {
      const n = a.etat.n, W = 560, P = 36, x0 = 20, y0 = 70;
      const etape = Math.min(n, Math.floor(cmPhase(t, .08, .96) * (n + 1) + 1e-6)); // 0 … n : jetons passés en bleu
      const lignes = etape + (t >= .08 ? 1 : 0);
      let s = '';
      // Les jetons : on écarte les deux paquets (rouges à gauche, bleus à droite).
      for(let i = 0; i < n; i++){ const bleu = i >= n - etape, x = x0 + i * P + (bleu ? 18 : 0) + P / 2;
        s += `<circle cx="${x}" cy="${y0}" r="14" fill="${bleu ? CPC.jeton2 : CPC.jeton}" stroke="${CPC.bord}" stroke-width="1.3"/>`; }
      const r = n - etape, b = etape;
      s += ce2T(x0 + (r * P) / 2, y0 + 40, r ? r : '', { t: 18, c: CPC.jeton, g: 700 }) + ce2T(x0 + 18 + r * P + (b * P) / 2, y0 + 40, b ? b : '', { t: 18, c: CPC.jeton2, g: 700 });
      // La maison : un toit avec le nombre, une ligne par partage.
      const mx = 400, mw = 130, lh = 24, top = 16;
      s += `<polygon points="${mx},${top + 40} ${mx + mw / 2},${top} ${mx + mw},${top + 40}" fill="#FDE3D2" stroke="${CPC.bord}" stroke-width="2"/>` + ce2T(mx + mw / 2, top + 32, n, { t: 22, g: 700 });
      s += `<rect x="${mx}" y="${top + 40}" width="${mw}" height="${(n + 1) * lh + 8}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/><line x1="${mx + mw / 2}" y1="${top + 40}" x2="${mx + mw / 2}" y2="${top + 48 + (n + 1) * lh}" stroke="${CPC.bord}" stroke-width="1.2"/>`;
      for(let q = 0; q < Math.min(lignes, n + 1); q++){ const y = top + 40 + 22 + q * lh, on = q === lignes - 1;
        s += ce2T(mx + mw / 4, y, n - q, { t: 16, c: CPC.jeton, g: on ? 700 : 600 }) + ce2T(mx + 3 * mw / 4, y, q, { t: 16, c: CPC.jeton2, g: on ? 700 : 600 }); }
      const H = top + 56 + (n + 1) * lh;
      const texte = t < .08 ? `Voici <b>${n}</b> jetons. De combien de façons peut-on les partager en deux paquets ?`
        : t < .96 ? `<b>${n}</b>, c'est <b style="color:${CPC.jeton};">${r}</b> et <b style="color:${CPC.jeton2};">${b}</b> : ${n} = ${r} + ${b}`
        : `Toutes les façons de faire <b>${n}</b> sont rangées dans la maison du ${n}.`;
      return { scene: `<svg viewBox="0 0 ${W} ${Math.max(H, 120)}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Où est le chat ? Positions autour d'une table (G1) ----------------
   Le chat s'arrête à chaque position (sur, sous, devant, derrière la table, à gauche, à droite,
   près, loin), puis va à la suivante. Le sol est vu en perspective : ce qui est derrière est plus
   haut et plus petit ; « derrière », le plateau de la table cache une partie du chat. */
const CP_POS = [
  { x: 210, y: 84, s: 1, phrase: 'Le chat est <b>sur</b> la table.' },
  { x: 210, y: 178, s: .9, phrase: 'Le chat est <b>sous</b> la table.' },
  { x: 225, y: 204, s: 1.25, phrase: 'Le chat est <b>devant</b> la table : il est plus près de nous.' },
  { x: 205, y: 106, s: .95, derriere: true, phrase: 'Le chat est <b>derrière</b> la table : on ne voit que sa tête, la table cache le reste.' },
  { x: 75, y: 178, s: 1, phrase: 'Le chat est <b>à gauche</b> de la table.' },
  { x: 345, y: 178, s: 1, phrase: 'Le chat est <b>à droite</b> de la table.' },
  { x: 296, y: 178, s: 1, phrase: 'Le chat est <b>près</b> de la table.' },
  { x: 405, y: 140, s: .55, phrase: 'Le chat est <b>loin</b> de la table.' },
];
const cpChat = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M14 4 q22 -8 20 -26" fill="none" stroke="#F2A93B" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="0" cy="0" rx="20" ry="13" fill="#F2A93B" stroke="#8A5A10" stroke-width="1.5"/><circle cx="-18" cy="-14" r="11" fill="#F2A93B" stroke="#8A5A10" stroke-width="1.5"/>
  <polygon points="-27,-21 -25,-33 -18,-24" fill="#F2A93B" stroke="#8A5A10"/><polygon points="-15,-24 -9,-33 -9,-20" fill="#F2A93B" stroke="#8A5A10"/>
  <circle cx="-22" cy="-15" r="1.8" fill="#1F3A5C"/><circle cx="-14" cy="-15" r="1.8" fill="#1F3A5C"/><path d="M-21 -9 q3 2 6 0" fill="none" stroke="#1F3A5C" stroke-width="1.2"/>
  <rect x="-16" y="9" width="5" height="9" rx="2" fill="#F2A93B"/><rect x="8" y="9" width="5" height="9" rx="2" fill="#F2A93B"/></g>`;
// La table, avec une nappe qui tombe devant : « derrière », seule la tête du chat dépasse.
const cpTable = `<rect x="152" y="116" width="10" height="80" fill="#B07A45" stroke="#6B4423"/><rect x="258" y="116" width="10" height="80" fill="#B07A45" stroke="#6B4423"/><rect x="140" y="104" width="140" height="12" rx="3" fill="#B07A45" stroke="#6B4423" stroke-width="2"/>`
  + `<path d="M136 102 H284 V136 ${Array.from({ length: 8 }, () => 'q-9.25 9 -18.5 0').join(' ')} Z" fill="#F7D6D0" stroke="#C0645A" stroke-width="1.6"/>`
  + Array.from({ length: 7 }, (_, i) => `<circle cx="${148 + i * 20.7}" cy="120" r="3" fill="#E58A7E"/>`).join('');
function cpAnimPositions(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: {}, duree: CP_POS.length * 2600,
    legende: o.legende || 'Au tableau : mettez sur pause à chaque arrêt et demandez « Où est le chat ? » avant de lire la réponse.',
    dessin: (t) => {
      const n = CP_POS.length, f = Math.min(n - .001, t * n), i = Math.floor(f), loc = f - i;
      const A = CP_POS[i], B = CP_POS[Math.min(n - 1, i + 1)], bouge = i < n - 1 && loc > .6, k = cmDoux(cmPhase(loc, .6, 1));
      const P = !bouge ? A : { x: A.x + (B.x - A.x) * k, y: A.y + (B.y - A.y) * k, s: A.s + (B.s - A.s) * k, derriere: k < .5 ? A.derriere : B.derriere };
      const decor = `<rect x="0" y="0" width="440" height="120" fill="#F7F3EC"/><rect x="0" y="120" width="440" height="110" fill="#EFE6D6"/><line x1="0" y1="120" x2="440" y2="120" stroke="#C9B48A"/>`;
      const s = decor + (P.derriere ? cpChat(P.x, P.y, P.s) + cpTable : cpTable + cpChat(P.x, P.y, P.s));
      return { scene: `<svg viewBox="0 0 440 230" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte: bouge ? '…' : A.phrase.replace('<b>', '<b style="font-size:1.15em;">') };
    } });
}
// Un enfant vu de dos, la main gauche levée : vu de dos, sa gauche est aussi notre gauche.
function cpGaucheDroite(o){
  o = o || {};
  return cpSvg(220, 170, `<circle cx="110" cy="42" r="22" fill="#6B4423"/><rect x="84" y="64" width="52" height="58" rx="14" fill="#2EA8C9"/>
    <path d="M86 76 L52 30" stroke="#F6C9A0" stroke-width="10" stroke-linecap="round"/><circle cx="50" cy="26" r="9" fill="#F6C9A0"/>
    <path d="M134 76 L160 108" stroke="#F6C9A0" stroke-width="10" stroke-linecap="round"/><rect x="90" y="120" width="14" height="40" rx="5" fill="#1F3A5C"/><rect x="116" y="120" width="14" height="40" rx="5" fill="#1F3A5C"/>`
    + ce2T(40, 12, 'gauche', { c: CPC.jeton, t: 15, g: 700 }) + ce2T(184, 130, 'droite', { c: CPC.jeton2, t: 15, g: 700 }), o.px || 200);
}

/* ---------------- Le paquet de dix : une dizaine et des unités (N3) ----------------
   Les jetons en vrac se rangent : dix font un paquet (une dizaine), les autres sont les unités. */
function cpVrac(n, graine, W, H, d){
  let g = graine; const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const pts = [];
  for(let essai = 0; pts.length < n && essai < 5000; essai++){ const p = [20 + alea() * (W - 40), 20 + alea() * (H - 40)];
    if(pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > (essai < 3000 ? d : d * .8))) pts.push(p); }
  return pts;
}
function cpAnimDizaine(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 14 }, duree: 8000,
    legende: o.legende || 'Mettez sur pause au début : « Combien y a-t-il de jetons ? » C\'est long à compter… Rangés en un paquet de dix, on le voit tout de suite.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'n', a.etat.n, 10, 19, 'Jetons')}</div>`,
    dessin: (t, a) => {
      const n = a.etat.n, u = n - 10, W = 460, vrac = cpVrac(n, n * 7 + 3, W, 130, 30);
      const k = cmDoux(cmPhase(t, .2, .6)), ferme = t > .62;
      let s = '';
      vrac.forEach(([x0, y0], i) => { const j = i - 10;
        const [dx, dy] = i < 10 ? [40 + i * 26, 160] : [330 + (j % 5) * 24, j < 5 ? 160 : 186];
        s += `<circle cx="${x0 + (dx - x0) * k}" cy="${y0 + (dy - y0) * k}" r="10" fill="${i < 10 || k < .5 ? CPC.jeton : CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1.2"/>`; });
      if(ferme) s += `<rect x="24" y="145" width="266" height="30" rx="15" fill="none" stroke="${CE2C.vert}" stroke-width="3"/>` + ce2T(157, 200, '1 dizaine', { c: CE2C.vert, t: 15, g: 700 })
        + (u ? ce2T(330 + (Math.min(u, 5) - 1) * 12, u > 5 ? 214 : 192, `${u} unité${u > 1 ? 's' : ''}`, { c: CPC.jeton2, t: 15, g: 700 }) : '');
      const texte = t < .2 ? `Voici des jetons en vrac. <b>Combien</b> y en a-t-il ? Difficile de le voir d'un coup d'œil…`
        : !ferme ? 'On range les jetons : on fait un paquet de <b>dix</b>.'
        : `<b>${n}</b>, c'est <b>1 dizaine</b>${u ? ` et <b>${u} unité${u > 1 ? 's' : ''}</b> : ${n} = 10 + ${u}` : ' : dix jetons, un paquet de dix'}.`;
      return { scene: `<svg viewBox="0 0 ${W} 220" class="cma-svg" style="max-width:${W + 60}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Ajouter, retirer : des jetons entrent dans la boîte ou en sortent (N4) ---------------- */
function cpAnimAjouter(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { mode: o.mode || 'ajouter', a: o.a || 5, b: o.b || 3 }, duree: 8000,
    legende: o.legende || 'Choisissez « ajouter » ou « retirer » et les nombres. Mettez sur pause avant la fin : « Combien y en a-t-il maintenant ? »',
    corriger: a => { const e = a.etat; if(e.mode === 'ajouter') e.a = Math.min(e.a, 9); e.b = Math.max(1, Math.min(e.b, e.mode === 'ajouter' ? 10 - e.a : e.a)); },
    controles: a => { const e = a.etat, aj = e.mode === 'ajouter';
      return `<div class="cmp-modeles">${cmBtn(id, 'mode', 'ajouter', 'Ajouter', aj)}${cmBtn(id, 'mode', 'retirer', 'Retirer', !aj)}
      ${cmPlusMoins(id, 'a', e.a, 1, aj ? 9 : 10, 'Au début')}${cmPlusMoins(id, 'b', e.b, 1, aj ? 10 - e.a : e.a, aj ? 'On en ajoute' : 'On en retire')}</div>`; },
    dessin: (t, a) => {
      const { mode, a: A, b: B } = a.etat, aj = mode === 'ajouter', fin = aj ? A + B : A - B;
      const place = i => [70 + (i % 5) * 34, 92 + Math.floor(i / 5) * 34], dehors = j => [304 + (j % 5) * 30, 92 + Math.floor(j / 5) * 34];
      const k = cmDoux(cmPhase(t, .3, .7));
      let s = `<rect x="45" y="70" width="195" height="88" rx="10" fill="#FFF7E8" stroke="${CPC.bord}" stroke-width="2.5"/>` + ce2T(142, 60, 'la boîte', { t: 13, c: CE2C.gris });
      const jeton = (x, y, c) => `<circle cx="${x}" cy="${y}" r="12" fill="${c}" stroke="${CPC.bord}" stroke-width="1.2"/>`;
      for(let i = 0; i < A; i++){ const [x, y] = place(i), part = !aj && i >= A - B;
        if(!part){ s += jeton(x, y, CPC.jeton); continue; }
        const [X, Y] = dehors(i - (A - B)); s += jeton(x + (X - x) * k, y + (Y - y) * k, CPC.jeton2); }
      if(aj) for(let j = 0; j < B; j++){ const [x, y] = place(A + j), [X, Y] = dehors(j);
        if(t > .12) s += jeton(X + (x - X) * k, Y + (y - Y) * k, CPC.jeton2); }
      if(t > .2 && t < .75) s += `<path d="${aj ? 'M290 50 L252 50' : 'M246 50 L284 50'}" stroke="${CE2C.violet}" stroke-width="3" marker-end="url(#cpfl-${id})"/>`
        + ce2T(268, 38, aj ? '+' + B : '−' + B, { t: 16, c: CE2C.violet, g: 700 });
      const texte = t < .25 ? `Dans la boîte, il y a <b>${A}</b> jeton${A > 1 ? 's' : ''}.`
        : t < .75 ? (aj ? `On en <b>ajoute ${B}</b>…` : `On en <b>retire ${B}</b>…`)
        : `Il y a maintenant <b>${fin}</b> jeton${fin > 1 ? 's' : ''} dans la boîte : <b>${A} ${aj ? '+' : '−'} ${B} = ${fin}</b>.`;
      return { scene: `<svg viewBox="0 0 460 180" class="cma-svg" style="max-width:520px;"><defs><marker id="cpfl-${id}" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${CE2C.violet}"/></marker></defs>${s}</svg>`, texte };
    } });
}

/* ---------------- Quadrillage, petits dessins et flèches (G1, G5) ---------------- */
const CP_Q = 44; // côté d'une case du quadrillage
// Petits dessins posés dans une case (centre x, y).
const CP_ICO = {
  souris: (x, y) => `<path d="M${x + 10} ${y + 4} q12 2 10 12" fill="none" stroke="#8A8F98" stroke-width="2"/><ellipse cx="${x}" cy="${y + 3}" rx="12" ry="8" fill="#B8BDC6" stroke="#5B6472" stroke-width="1.2"/><circle cx="${x - 9}" cy="${y - 6}" r="5" fill="#D9A3B0" stroke="#5B6472"/><circle cx="${x - 12}" cy="${y + 1}" r="1.5" fill="#1F3A5C"/>`,
  fromage: (x, y) => `<polygon points="${x - 14},${y + 10} ${x + 14},${y + 10} ${x + 14},${y - 10}" fill="#F5C842" stroke="#B8860B" stroke-width="1.5" stroke-linejoin="round"/><circle cx="${x + 6}" cy="${y + 3}" r="2.6" fill="#D9A520"/><circle cx="${x + 10}" cy="${y - 3}" r="1.8" fill="#D9A520"/>`,
  etoile: (x, y) => `<polygon points="${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { const r = i % 2 ? 6 : 15, a = -Math.PI / 2 + i * Math.PI / 5; return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`; }).join(' ')}" fill="#F5B700" stroke="#A67C00" stroke-width="1.2"/>`,
  coeur: (x, y) => `<path d="M${x} ${y + 12} C${x - 20} ${y - 2} ${x - 10} ${y - 16} ${x} ${y - 6} C${x + 10} ${y - 16} ${x + 20} ${y - 2} ${x} ${y + 12} z" fill="#E35D3A" stroke="#9E2F18" stroke-width="1.2"/>`,
  rond: (x, y) => `<circle cx="${x}" cy="${y}" r="12" fill="#2EA8C9" stroke="#1F3A5C" stroke-width="1.2"/>`,
  carre: (x, y) => `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" fill="#2E9C6A" stroke="#1F3A5C" stroke-width="1.2"/>`,
  arbre: (x, y) => `<rect x="${x - 3}" y="${y + 2}" width="6" height="12" fill="#6B4423"/><circle cx="${x}" cy="${y - 4}" r="12" fill="#3E9B4F"/>`,
};
// Quadrillage de nc × nr cases ; objets : [[type, colonne, ligne], …] (ligne 0 en haut).
function cpQuad(nc, nr, objets, o){
  o = o || {}; const W = nc * CP_Q + 6, H = nr * CP_Q + 6;
  let s = `<rect x="3" y="3" width="${nc * CP_Q}" height="${nr * CP_Q}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`;
  for(let i = 1; i < nc; i++) s += `<line x1="${3 + i * CP_Q}" y1="3" x2="${3 + i * CP_Q}" y2="${3 + nr * CP_Q}" stroke="#9FB0C4" stroke-width="1.2"/>`;
  for(let j = 1; j < nr; j++) s += `<line x1="3" y1="${3 + j * CP_Q}" x2="${3 + nc * CP_Q}" y2="${3 + j * CP_Q}" stroke="#9FB0C4" stroke-width="1.2"/>`;
  (o.colorie || []).forEach(([c, r, coul]) => { s += `<rect x="${3 + c * CP_Q + 2}" y="${3 + r * CP_Q + 2}" width="${CP_Q - 4}" height="${CP_Q - 4}" fill="${coul || '#FDE3D2'}"/>`; });
  if(o.chemin) s += `<polyline points="${o.chemin.map(([c, r]) => `${3 + c * CP_Q + CP_Q / 2},${3 + r * CP_Q + CP_Q / 2}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 4" stroke-linecap="round"/>`;
  objets.forEach(([t, c, r]) => { s += CP_ICO[t](3 + c * CP_Q + CP_Q / 2, 3 + r * CP_Q + CP_Q / 2); });
  return cpSvg(W, H, s, o.px);
}
// Les flèches : d (droite), g (gauche), h (en haut), b (en bas).
const CP_ANG = { d: 0, b: 90, g: 180, h: 270 }, CP_PAS = { d: [1, 0], g: [-1, 0], h: [0, -1], b: [0, 1] };
const cpFleche = (d, on) => cpSvg(34, 34, `<rect x="1" y="1" width="32" height="32" rx="7" fill="${on ? '#EDE4FA' : '#fff'}" stroke="${on ? CE2C.violet : '#9FB0C4'}" stroke-width="${on ? 2.4 : 1.4}"/><g transform="rotate(${CP_ANG[d]} 17 17)"><path d="M7 17 H24 M18 10 L25 17 L18 24" fill="none" stroke="${CPC.bord}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></g>`, 30);
const cpCode = (txt, on) => `<span class="cpn-code">${txt.split('').map((d, i) => cpFleche(d, i === on)).join('')}</span>`;
const cpSuivre = (dep, txt) => { const L = [dep.slice()]; txt.split('').forEach(d => { const p = L[L.length - 1]; L.push([p[0] + CP_PAS[d][0], p[1] + CP_PAS[d][1]]); }); return L; };

/* ---------------- Barres de dix cubes et bande des nombres (N3…) ---------------- */
// Barres de dix cubes et cubes seuls (matériel de numération).
function cpCubes(n, o){
  o = o || {}; const q = o.q || 16, d = Math.floor(n / 10), u = n % 10;
  let s = '';
  for(let b = 0; b < d; b++) for(let i = 0; i < 10; i++) s += `<rect x="${4 + i * q}" y="${4 + b * (q + 8)}" width="${q}" height="${q}" fill="${CE2C.vert}" stroke="#14583A" stroke-width="1.2"/>`;
  const x0 = d ? 10 * q + 22 : 4;
  for(let i = 0; i < u; i++) s += `<rect x="${x0 + (i % 5) * (q + 4)}" y="${4 + Math.floor(i / 5) * (q + 8)}" width="${q}" height="${q}" fill="${CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1.2"/>`;
  const W = x0 + Math.min(u, 5) * (q + 4) + 6, H = Math.max(d, u > 5 ? 2 : u ? 1 : 0) * (q + 8) + 4;
  return cpSvg(Math.max(W, 10 * q + 8), H, s, o.px);
}
// La bande des nombres de a à b, avec des cases éventuellement vides (trous) ou colorées.
function cpBande(a, b, o){
  o = o || {}; const c = o.c || 30, n = b - a + 1;
  let s = '';
  for(let i = 0; i < n; i++){ const v = a + i, trou = (o.trous || []).includes(v), on = (o.on || []).includes(v);
    s += `<rect x="${3 + i * c}" y="3" width="${c}" height="${c}" fill="${on ? '#FDE3D2' : v === 10 || v === 20 ? '#E7F5EE' : '#fff'}" stroke="${CPC.bord}" stroke-width="1.5"/>`
      + (trou ? '' : ce2T(3 + i * c + c / 2, 3 + c * .68, v, { t: c * .45, g: 700, c: on ? CPC.jeton : CPC.bord })); }
  return cpSvg(n * c + 6, c + 6, s, o.px);
}

/* ---------------- Schéma en barres, sauts sur la bande, jetons barrés (N4…) ---------------- */
// Schéma en barres : parts = [[valeur, texte, couleur], …] sur une ligne, total écrit sous l'accolade.
function cpSchema(parts, total, o){
  o = o || {}; const U = o.u || 26, W = parts.reduce((s, p) => s + p[0], 0) * U;
  let s = '', x = 4;
  parts.forEach(([v, tx, c]) => { s += `<rect x="${x}" y="4" width="${v * U}" height="34" fill="${c === '#fff' ? '#fff' : c}" fill-opacity="${c === '#fff' ? 1 : .45}" stroke="${CE2C.encre}" stroke-width="1.6"${c === '#fff' ? ' stroke-dasharray="5 4"' : ''}/>` + ce2T(x + v * U / 2, 27, tx, { t: 16, g: 700 }); x += v * U; });
  s += `<path d="M4 44 q0 10 10 10 H${4 + W / 2 - 8} q8 0 8 8 q0 -8 8 -8 H${W - 6} q10 0 10 -10" fill="none" stroke="${CE2C.rouge}" stroke-width="2"/>` + ce2T(4 + W / 2, 82, total, { t: 16, g: 700, c: CE2C.rouge });
  return cpSvg(W + 8, 88, s, o.px);
}
// Sauts sur la bande des nombres : de a, n sauts de +1 (ou −1 si n < 0).
function cpSautsBande(a, n, o){
  o = o || {}; const de = o.de != null ? o.de : 0, fin = o.a || 12, c = 30, X = v => 4 + (v - de) * c + c / 2;
  let s = '';
  for(let v = de; v <= fin; v++){ const on = v === a || v === a + n;
    s += `<rect x="${4 + (v - de) * c}" y="40" width="${c}" height="${c}" fill="${v === a + n ? '#FDE3D2' : v === a ? '#E3F3FA' : '#fff'}" stroke="${CPC.bord}" stroke-width="1.4"/>` + ce2T(X(v), 60, v, { t: 14, g: on ? 700 : 600, c: v === a + n ? CPC.jeton : CPC.bord }); }
  const sg = n < 0 ? -1 : 1, col = n < 0 ? CE2C.rouge : CE2C.vert;
  for(let q = 0; q < Math.abs(n); q++){ const x0 = X(a + q * sg), x1 = X(a + (q + 1) * sg);
    s += `<path d="M${x0} 38 Q${(x0 + x1) / 2} 8 ${x1} 36" fill="none" stroke="${col}" stroke-width="2.2"/><polygon points="${x1},38 ${x1 - 5 * sg},30 ${x1 + 3 * sg},30" fill="${col}"/>` + ce2T((x0 + x1) / 2, 16, sg > 0 ? '+1' : '−1', { t: 11, c: col, g: 700 }); }
  return cpSvg((fin - de + 1) * c + 8, 76, s, o.px);
}
// Une rangée de jetons ; les k derniers sont barrés (retirés).
function cpJetons(n, barres, coul){
  let s = '';
  for(let i = 0; i < n; i++){ const x = 18 + i * 30, b = i >= n - (barres || 0);
    s += `<circle cx="${x}" cy="20" r="11" fill="${(coul && coul[i]) || CPC.jeton}" stroke="${CPC.bord}" opacity="${b ? .45 : 1}"/>` + (b ? `<path d="M${x - 11} 31 L${x + 11} 9" stroke="${CE2C.encre}" stroke-width="2.6" stroke-linecap="round"/>` : ''); }
  return cpSvg(n * 30 + 8, 40, s);
}
const cpBleus = (a, b) => Array(a).fill(CPC.jeton).concat(Array(b).fill(CPC.jeton2));

/* ================= Période 2 et suivantes ================= */
// Le nom d'un nombre de 0 à 100, en orthographe rectifiée (traits d'union partout : vingt-et-un, quatre-vingts…) --
// demandé : « deux mille quatre cent six s'écrit deux-mille-quatre-cent-six ».
function cpMot(n){
  const U = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
  if(n <= 16) return U[n];
  if(n < 20) return 'dix-' + U[n - 10];
  if(n === 100) return 'cent';
  const D = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
  const d = Math.floor(n / 10), u = n % 10;
  if(d <= 6) return D[d] + (u === 0 ? '' : u === 1 ? '-et-un' : '-' + U[u]);
  if(d === 7) return 'soixante' + (n === 71 ? '-et-onze' : '-' + cpMot(n - 60));
  if(n === 80) return 'quatre-vingts';
  return 'quatre-vingt-' + cpMot(n - 80);
}
// Barres de dix cubes debout (une barre = une dizaine) et cubes seuls, rangés par 5 (dessin SVG brut).
function cpBarresSvg(x, y, n, q, o){
  o = o || {}; const d = Math.floor(n / 10), u = n % 10;
  let s = '';
  for(let b = 0; b < d; b++) for(let i = 0; i < 10; i++) s += `<rect x="${x + b * (q + 6)}" y="${y + i * q}" width="${q}" height="${q}" fill="${o.cd || CE2C.vert}" stroke="#14583A" stroke-width="1"/>`;
  const x0 = x + d * (q + 6) + (d ? 8 : 0);
  for(let j = 0; j < u; j++) s += `<rect x="${x0 + Math.floor(j / 5) * (q + 3)}" y="${y + 10 * q - (j % 5 + 1) * (q + 2)}" width="${q}" height="${q}" fill="${o.cu || CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1"/>`;
  return s;
}
const cpBarresL = (n, q) => { const d = Math.floor(n / 10), u = n % 10; return d * (q + 6) + (d ? 8 : 0) + (u ? (u > 5 ? 2 : 1) * (q + 3) : 0) + 2; };
function cpBarres(n, o){ o = o || {}; const q = o.q || 12; return cpSvg(cpBarresL(n, q) + 6, 10 * q + 6, cpBarresSvg(3, 3, n, q, o), o.px); }

/* ---- Grouper par dix : des cubes en vrac se rangent en barres de dix ---- */
function cpAnimGrouper(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 34 }, duree: a => 4000 + Math.floor(a.etat.n / 10) * 900,
    legende: o.legende || 'Faites pause au début : « Combien de cubes ? » Trop long à compter un par un… On les range par dix.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'n', a.etat.n, 11, o.max || 59, 'Cubes')}<button type="button" class="cmp-mod" onclick="cmAnimRegler('${id}','n',${11 + Math.floor(Math.random() * ((o.max || 59) - 10))})">Au hasard</button></div>`,
    dessin: (t, a) => {
      const n = a.etat.n, d = Math.floor(n / 10), u = n % 10, q = 12, W = 500, H = 200;
      const vrac = cpVrac(n, n * 11 + 5, W, H, 15);
      const L = cpBarresL(n, q), X0 = (W - L) / 2, Y0 = 30;
      const dest = i => { const b = Math.floor(i / 10); if(b < d) return [X0 + b * (q + 6), Y0 + (i % 10) * q];
        const j = i - d * 10; return [X0 + d * (q + 6) + (d ? 8 : 0) + Math.floor(j / 5) * (q + 3), Y0 + 10 * q - (j % 5 + 1) * (q + 2)]; };
      // Chaque paquet de dix part à son tour, puis les unités.
      const nb = d + (u ? 1 : 0), part = i => Math.min(Math.floor(i / 10), d);
      let s = '';
      vrac.forEach(([x0, y0], i) => { const g = part(i), k = cmDoux(cmPhase(t, .12 + g * .6 / nb, .12 + (g + 1) * .6 / nb)), [x1, y1] = dest(i);
        s += `<rect x="${x0 - q / 2 + (x1 - x0 + q / 2) * k}" y="${y0 - q / 2 + (y1 - y0 + q / 2) * k}" width="${q}" height="${q}" fill="${g < d && k > .99 ? CE2C.vert : CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1"/>`; });
      const fin = t > .74, cpt = Math.min(d, Math.floor(cmPhase(t, .74, .9) * (d + 1)));
      if(fin){ for(let b = 0; b < cpt; b++) s += ce2T(X0 + b * (q + 6) + q / 2, Y0 + 10 * q + 20, (b + 1) * 10, { t: 13, c: CE2C.vert, g: 700 });
        if(t > .9 && u) s += ce2T(X0 + d * (q + 6) + (d ? 8 : 0) + (u > 5 ? q + 2 : q / 2), Y0 + 10 * q + 20, `+ ${u}`, { t: 13, c: CPC.jeton2, g: 700 }); }
      const texte = t < .12 ? 'Des cubes en vrac. <b>Combien</b> y en a-t-il ?'
        : !fin ? 'On fait des barres de <b>dix</b> cubes…'
        : t < .9 ? `On compte les barres de dix : ${Array.from({ length: Math.max(cpt, 1) }, (_, i) => (i + 1) * 10).join(', ')}…`
        : `<b>${d} dizaine${d > 1 ? 's' : ''}</b>${u ? ` et <b>${u} unité${u > 1 ? 's' : ''}</b>` : ''} : il y a <b>${n}</b> cubes (${cpMot(n)}).`;
      return { scene: `<svg viewBox="0 0 ${W} ${H}" class="cma-svg" style="max-width:${W + 40}px;">${s}</svg>`, texte };
    } });
}

/* ---- Le tableau des nombres : 10 cases par ligne ---- */
function cpTableau(de, a, o){
  o = o || {}; const c = o.c || 30, n = a - de + 1, L = Math.ceil(n / 10);
  let s = '';
  for(let i = 0; i < n; i++){ const v = de + i, x = 3 + (i % 10) * c, y = 3 + Math.floor(i / 10) * c, trou = (o.trous || []).includes(v), on = (o.on || []).includes(v), col = o.colonne != null && v % 10 === o.colonne;
    s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${on ? '#FDE3D2' : col ? '#E3F3FA' : '#fff'}" stroke="${CPC.bord}" stroke-width="1.2"/>` + (trou ? '' : ce2T(x + c / 2, y + c * .66, v, { t: c * .42, g: on ? 700 : 600, c: on ? CPC.jeton : CPC.bord })); }
  return cpSvg(10 * c + 6, L * c + 6, s, o.px);
}

/* ---- Comparer : le crocodile ouvre la bouche vers le plus grand nombre ---- */
function cpCrocoSvg(x, y, dir, k){ // dir = 1 : bouche ouverte vers la droite (« < ») ; k : ouverture (0 à 1)
  const o = 30 * (k == null ? 1 : k), L = 54, ex = x + dir * L;
  let s = `<path d="M${x} ${y} L${ex} ${y - o} L${ex} ${y - o - 12} L${x - dir * 8} ${y - 8} Z" fill="#3E9B4F" stroke="#1F5C2E" stroke-width="2" stroke-linejoin="round"/>`
    + `<path d="M${x} ${y} L${ex} ${y + o} L${ex} ${y + o + 10} L${x - dir * 8} ${y + 7} Z" fill="#3E9B4F" stroke="#1F5C2E" stroke-width="2" stroke-linejoin="round"/>`;
  for(let i = 1; i <= 4; i++){ const f = i / 5, xx = x + dir * L * f; s += `<path d="M${xx} ${y - o * f} l${dir * 4} 7 l${dir * 4} -7" fill="#fff" stroke="#fff"/><path d="M${xx} ${y + o * f} l${dir * 4} -7 l${dir * 4} 7" fill="#fff" stroke="#fff"/>`; }
  return s + `<circle cx="${x + dir * 6}" cy="${y - 16}" r="6" fill="#fff" stroke="#1F5C2E"/><circle cx="${x + dir * 7}" cy="${y - 16}" r="2.6" fill="#1F3A5C"/>`;
}
function cpAnimCroco(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: o.legende || 'Le crocodile est gourmand : il ouvre toujours la bouche du côté du plus grand nombre.',
    controles: a => ce2Choix(id, P.map(([x, y]) => ({ nom: `${x} et ${y}` })), a),
    dessin: (t, a) => {
      const [A, B] = P[a.etat.p], q = 11, dA = Math.floor(A / 10), dB = Math.floor(B / 10);
      let s = cpBarresSvg(60, 20, A, q) + cpBarresSvg(340, 20, B, q) + ce2T(60 + cpBarresL(A, q) / 2, 160, A, { t: 30, g: 700 }) + ce2T(340 + cpBarresL(B, q) / 2, 160, B, { t: 30, g: 700 });
      const k = cmDoux(cmPhase(t, .55, .8)), dir = A < B ? 1 : -1;
      if(t > .55 && A !== B) s += `<g opacity="${k}">${cpCrocoSvg(dir > 0 ? 226 : 280, 92, dir, k)}</g>` + (t > .82 ? ce2T(250, 160, A < B ? '&lt;' : '&gt;', { t: 40, g: 700, c: CE2C.vert }) : '');
      if(t > .55 && A === B) s += ce2T(250, 160, '=', { t: 40, g: 700, c: CE2C.vert });
      const texte = t < .2 ? `Qui est le plus grand : <b>${A}</b> ou <b>${B}</b> ?`
        : t < .55 ? (dA !== dB ? `On regarde d'abord les <b>dizaines</b> : ${dA} dizaine${dA > 1 ? 's' : ''} et ${dB} dizaine${dB > 1 ? 's' : ''}.` : `Même nombre de dizaines (${dA}) : on regarde les <b>unités</b>, ${A % 10} et ${B % 10}.`)
        : A === B ? 'Les deux nombres sont égaux.'
        : t < .82 ? `Le crocodile ouvre la bouche vers <b>${Math.max(A, B)}</b>.`
        : `<b>${A} ${A < B ? '&lt;' : '&gt;'} ${B}</b> : on lit « ${A} est ${A < B ? 'plus petit' : 'plus grand'} que ${B} ».`;
      return { scene: `<svg viewBox="0 0 500 175" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

/* ---- Le double (on ajoute la même quantité, comme dans un miroir) et la moitié (on partage en deux parts égales) ---- */
function cpAnimDouble(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { mode: o.mode || 'double', n: o.n || 4 }, duree: 7000,
    legende: o.legende || 'Double : la même quantité apparaît en face, comme dans un miroir. Moitié : on partage en deux parts égales.',
    controles: a => `<div class="cmp-modeles">${cmBtn(id, 'mode', 'double', 'Le double', a.etat.mode === 'double')}${cmBtn(id, 'mode', 'moitie', 'La moitié', a.etat.mode === 'moitie')}${cmPlusMoins(id, 'n', a.etat.n, 1, 10, a.etat.mode === 'double' ? 'Nombre' : 'Dans chaque part')}</div>`,
    dessin: (t, a) => {
      const { mode, n } = a.etat, k = cmDoux(cmPhase(t, .2, .65)), P = 30;
      const pos = (i, cote) => [cote < 0 ? 230 - 22 - (i % 5) * P : 270 + 22 + (i % 5) * P, 50 + Math.floor(i / 5) * P];
      let s = `<line x1="250" y1="20" x2="250" y2="130" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 5"/>`;
      if(mode === 'double'){
        for(let i = 0; i < n; i++){ const [x, y] = pos(i, -1), [x2] = pos(i, 1); s += `<circle cx="${x}" cy="${y}" r="11" fill="${CPC.jeton}" stroke="${CPC.bord}"/>`;
          if(t > .2) s += `<circle cx="${x + (x2 - x) * k}" cy="${y}" r="11" fill="${CPC.jeton2}" stroke="${CPC.bord}" opacity="${.3 + .7 * k}"/>`; }
      } else {
        for(let i = 0; i < 2 * n; i++){ const x0 = 250 - (2 * n - 1) * 13 + i * 26, y0 = 160, cote = i % 2 ? 1 : -1, [x1, y1] = pos(Math.floor(i / 2), cote);
          s += `<circle cx="${x0 + (x1 - x0) * k}" cy="${y0 + (y1 - y0) * k}" r="11" fill="${cote < 0 ? CPC.jeton : CPC.jeton2}" stroke="${CPC.bord}"/>`; }
      }
      const fin = t > .7;
      if(fin) s += ce2T(150, 120 + (n > 5 ? 10 : 0), n, { t: 24, g: 700, c: CPC.jeton }) + ce2T(350, 120 + (n > 5 ? 10 : 0), n, { t: 24, g: 700, c: CPC.jeton2 });
      const texte = mode === 'double'
        ? (t < .2 ? `Voici <b>${n}</b> jeton${n > 1 ? 's' : ''}.` : !fin ? 'On en met autant de l\'autre côté…' : `Le double de ${n}, c'est <b>${n} + ${n} = ${2 * n}</b>.`)
        : (t < .2 ? `Voici <b>${2 * n}</b> jetons. On les partage en deux parts égales.` : !fin ? 'Un pour toi, un pour moi…' : `Chaque part a <b>${n}</b> jeton${n > 1 ? 's' : ''} : la moitié de ${2 * n}, c'est <b>${n}</b>, car ${n} + ${n} = ${2 * n}.`);
      return { scene: `<svg viewBox="0 0 500 190" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

/* ---- Comparer des longueurs : côte à côte, avec une bande, avec des trombones ---- */
const cpCrayon = (x, y, L, c) => `<rect x="${x}" y="${y - 9}" width="${L - 26}" height="18" rx="3" fill="${c}" stroke="${CPC.bord}" stroke-width="1.4"/><polygon points="${x + L - 26},${y - 9} ${x + L},${y} ${x + L - 26},${y + 9}" fill="#F3D7A8" stroke="${CPC.bord}" stroke-width="1.4"/><polygon points="${x + L - 8},${y - 3} ${x + L},${y} ${x + L - 8},${y + 3}" fill="${CPC.bord}"/>`;
const cpTrombone = (x, y) => `<path d="M${x + 2} ${y} H${x + 30} a5 5 0 0 1 0 10 H${x + 6} a3.5 3.5 0 0 1 0 -7 H${x + 26}" fill="none" stroke="#7F8A98" stroke-width="2.2"/>`;
function cpAnimLongueurs(id){
  const P = [{ nom: 'Côte à côte' }, { nom: 'Avec une bande de papier' }, { nom: 'Avec des trombones' }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: 'Pour comparer des longueurs, on part toujours <b>du même point</b>.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = a.etat.p; let s = '', texte = '';
      if(p === 0){ const k = cmDoux(cmPhase(t, .25, .6));
        s = `<line x1="60" y1="20" x2="60" y2="150" stroke="${CE2C.vert}" stroke-width="2" stroke-dasharray="5 4" opacity="${t > .25 ? 1 : 0}"/>` + cpCrayon(60, 50, 250, '#E35D3A') + cpCrayon(160 - 100 * k, 110, 220, '#2EA8C9');
        texte = t < .25 ? 'Quel crayon est le plus long ? On ne peut pas le dire : ils ne partent pas du même endroit.' : t < .65 ? 'On aligne les deux crayons au même point de départ…' : 'Le crayon <b>rouge</b> dépasse : il est <b>plus long</b> que le crayon bleu.'; }
      else if(p === 1){ const k1 = cmDoux(cmPhase(t, .15, .4)), k2 = cmDoux(cmPhase(t, .5, .8));
        s = `<rect x="40" y="40" width="180" height="16" fill="#9BC53D" stroke="${CPC.bord}"/>` + ce2T(130, 30, 'le ruban vert', { t: 13 }) + `<rect x="260" y="140" width="200" height="16" fill="#F2A93B" stroke="${CPC.bord}"/>` + ce2T(360, 176, 'le ruban orange', { t: 13 })
          + `<rect x="${40 + 220 * k2}" y="${70 + 70 * k2 - 30 * k2}" width="${180 * k1}" height="10" fill="#fff" stroke="${CE2C.violet}" stroke-width="2"/>`;
        texte = t < .15 ? 'Les deux rubans sont collés au mur, on ne peut pas les rapprocher.' : t < .45 ? 'On coupe une bande de papier aussi longue que le ruban vert.' : t < .82 ? 'On porte la bande jusqu\'au ruban orange, en partant du même bout.' : 'Le ruban orange dépasse de la bande : il est <b>plus long</b> que le ruban vert.'; }
      else { const n = Math.min(7, Math.floor(cmPhase(t, .15, .8) * 7.99));
        s = `<rect x="40" y="60" width="252" height="16" fill="#9BC53D" stroke="${CPC.bord}"/>`;
        for(let i = 0; i < n; i++) s += cpTrombone(40 + i * 36, 100) + ce2T(58 + i * 36, 136, i + 1, { t: 13, c: CE2C.violet, g: 700 });
        texte = t < .15 ? 'Combien de trombones faut-il pour faire la longueur du ruban ?' : t < .85 ? 'On pose les trombones bout à bout, sans laisser d\'espace…' : 'Le ruban est long comme <b>7 trombones</b>.'; }
      return { scene: `<svg viewBox="0 0 500 190" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

/* ---- Les formes : on suit le bord, on compte les côtés et les sommets ---- */
const CP_FORMES = {
  carre: { nom: 'Le carré', pts: [[170, 30], [300, 30], [300, 160], [170, 160]], c: '#2EA8C9', fin: '<b>4 côtés</b> de la même longueur et <b>4 sommets</b>.' },
  rectangle: { nom: 'Le rectangle', pts: [[120, 50], [360, 50], [360, 150], [120, 150]], c: '#2E9C6A', fin: '<b>4 côtés</b> et <b>4 sommets</b> : deux grands côtés, deux petits côtés.' },
  triangle: { nom: 'Le triangle', pts: [[240, 25], [350, 165], [130, 165]], c: '#E9C46A', fin: '<b>3 côtés</b> et <b>3 sommets</b>.' },
  disque: { nom: 'Le disque', rond: true, c: '#E35D3A', fin: 'Le bord est tout rond : <b>pas de côté droit</b>, <b>pas de sommet</b>. Le bord du disque s\'appelle un <b>cercle</b>.' },
};
function cpAnimFormes(id){
  const K = Object.keys(CP_FORMES), P = K.map(k => ({ nom: CP_FORMES[k].nom }));
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: 'Le doigt fait le tour de la forme : on compte les côtés (les traits droits) et les sommets (les « pointes »).',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const F = CP_FORMES[K[a.etat.p]]; let s = '';
      if(F.rond){ const k = cmPhase(t, .1, .7), r = 75, a1 = k * 2 * Math.PI;
        s = `<circle cx="240" cy="95" r="${r}" fill="${F.c}" fill-opacity=".35"/>` + (k > 0 ? `<path d="M240 20 A${r} ${r} 0 ${a1 > Math.PI ? 1 : 0} 1 ${240 + r * Math.sin(a1)} ${95 - r * Math.cos(a1)}" fill="none" stroke="${CE2C.violet}" stroke-width="4"/>` : '');
        return { scene: `<svg viewBox="0 0 480 190" class="cma-svg" style="max-width:480px;">${s}</svg>`, texte: t < .72 ? 'On suit le bord avec le doigt…' : F.fin }; }
      const pts = F.pts, n = pts.length, k = cmPhase(t, .1, .75) * n, cote = Math.min(n, Math.floor(k));
      s = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${F.c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2"/>`;
      for(let i = 0; i < n; i++){ const A = pts[i], B = pts[(i + 1) % n], f = Math.max(0, Math.min(1, k - i));
        if(f > 0) s += `<line x1="${A[0]}" y1="${A[1]}" x2="${A[0] + (B[0] - A[0]) * f}" y2="${A[1] + (B[1] - A[1]) * f}" stroke="${CE2C.violet}" stroke-width="5" stroke-linecap="round"/>`;
        if(f >= 1){ const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, cx = pts.reduce((s, p) => s + p[0], 0) / n, cy = pts.reduce((s, p) => s + p[1], 0) / n, d = Math.hypot(mx - cx, my - cy);
          s += `<circle cx="${mx + (mx - cx) / d * 22}" cy="${my + (my - cy) / d * 22}" r="11" fill="${CE2C.violet}"/>` + ce2T(mx + (mx - cx) / d * 22, my + (my - cy) / d * 22 + 5, i + 1, { t: 13, c: '#fff', g: 700 }); } }
      if(t > .78) pts.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="7" fill="${CE2C.rouge}" stroke="#fff" stroke-width="2"/>`; });
      const texte = t < .1 ? `${F.nom} : on fait le tour avec le doigt.` : t < .78 ? `Côté ${Math.max(1, Math.min(n, cote + 1))}…` : `${F.nom} a ${F.fin}`;
      return { scene: `<svg viewBox="0 0 480 190" class="cma-svg" style="max-width:480px;">${s}</svg>`, texte };
    } });
}

/* ---- La monnaie : pièces de 1 € et 2 €, billets de 5, 10, 20 et 50 € ---- */
function cpArgentSvg(x, y, v){
  if(v <= 2){ const r = v === 2 ? 22 : 20, ext = v === 2 ? '#C9CBCF' : '#E2C36B', int = v === 2 ? '#E2C36B' : '#C9CBCF';
    return `<circle cx="${x + r}" cy="${y + r}" r="${r}" fill="${ext}" stroke="#7A6A3A" stroke-width="1.2"/><circle cx="${x + r}" cy="${y + r}" r="${r * .68}" fill="${int}" stroke="#7A6A3A" stroke-width=".8"/>` + ce2T(x + r, y + r + 5, v + ' €', { t: 12, g: 700, c: '#3B2B05' }); }
  const C = { 5: '#9AA3AE', 10: '#D9776A', 20: '#5B8FD0', 50: '#E39A3B' }[v] || '#999';
  return `<rect x="${x}" y="${y}" width="84" height="46" rx="4" fill="${C}" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/><rect x="${x + 5}" y="${y + 5}" width="74" height="36" rx="3" fill="none" stroke="#fff" stroke-opacity=".6"/>` + ce2T(x + 42, y + 30, v + ' €', { t: 17, g: 700, c: '#fff' });
}
const cpArgentL = v => v <= 2 ? (v === 2 ? 44 : 40) : 84;
function cpArgent(liste, o){
  o = o || {}; let x = 3, s = '';
  liste.forEach(v => { s += cpArgentSvg(x, v <= 2 ? 6 : 3, v); x += cpArgentL(v) + 6; });
  return cpSvg(x, 54, s, o.px);
}
function cpAnimPayer(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2500 + P[a.etat.p].paye.length * 1100,
    legende: o.legende || 'On pose l\'argent un à un dans la coupelle et on compte à mesure : le plus gros d\'abord.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], L = p.paye, n = L.length, k = cmPhase(t, .15, .85) * n, pose = Math.min(n, Math.floor(k));
      let s = `<ellipse cx="250" cy="160" rx="190" ry="26" fill="#EFE6D6" stroke="#C9B48A" stroke-width="2"/>` + `<g transform="translate(18 14)"><rect width="110" height="52" rx="8" fill="#FFF7E8" stroke="${CPC.bord}" stroke-width="2"/>${ce2T(55, 22, p.objet || 'Prix', { t: 13 })}${ce2T(55, 44, p.prix + ' €', { t: 20, g: 700, c: CE2C.rouge })}</g>`;
      let x = 70, total = 0;
      L.forEach((v, i) => { const f = cmDoux(Math.max(0, Math.min(1, k - i))), y1 = v <= 2 ? 136 : 132, x0 = 160 + i * 6, y0 = 30;
        if(i < pose + 1 && f > 0) s += `<g transform="translate(${x0 + (x - x0) * f - x} ${(y0 - y1) * (1 - f)})">${cpArgentSvg(x, y1 - (v <= 2 ? 0 : 6), v)}</g>`;
        if(i < pose) total += v; x += cpArgentL(v) + 6; });
      s += ce2T(440, 60, total + ' €', { t: 28, g: 700, c: total === p.prix ? CE2C.vert : CPC.bord });
      const texte = t < .15 ? `${p.objet ? p.objet + ' coûte' : 'Il faut payer'} <b>${p.prix} €</b>. Comment payer ?`
        : t < .86 ? `On compte : ${L.slice(0, Math.max(1, pose)).reduce((acc, v) => (acc.push((acc.length ? acc[acc.length - 1] : 0) + v), acc), []).join(', ')}…`
        : p.fin || `On a posé <b>${p.prix} €</b> : ${L.join(' + ')} = ${p.prix}.`;
      return { scene: `<svg viewBox="0 0 500 195" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

/* ================= Période 3 ================= */
/* ---- Les nombres de 60 à 99 : le mot ne dit pas toujours les dizaines ! (soixante-quatorze = 60 + 14) ---- */
function cpAnimMot(id, o){
  const P = (o && o.presets) || [70, 74, 80, 85, 90, 97].map(n => ({ nom: String(n), n }));
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: (o && o.legende) || 'On écoute le mot, on le découpe, puis on range les cubes en barres de dix.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const n = P[a.etat.p].n, mot = cpMot(n), q = 11;
      // Le découpage du mot : ce que l'on entend.
      const parts = n < 80 ? [60, n - 60] : [80, n - 80], mots = parts.map(v => v ? cpMot(v) : '');
      let s = ce2T(250, 34, mot, { t: 26, g: 700, c: CE2C.violet });
      const k1 = t > .15, k2 = cmDoux(cmPhase(t, .5, .75));
      if(k1){ s += ce2T(150, 72, mots[0], { t: 17, g: 700, c: CE2C.vert }) + (parts[1] ? ce2T(350, 72, mots[1], { t: 17, g: 700, c: CPC.jeton2 }) + ce2T(250, 72, '+', { t: 20, g: 700 }) : '');
        s += ce2T(150, 96, parts[0], { t: 15, c: CE2C.vert }) + (parts[1] ? ce2T(350, 96, parts[1], { t: 15, c: CPC.jeton2 }) : ''); }
      if(t > .3){ // les cubes : les dizaines de la première partie, puis la deuxième partie (barres et cubes seuls)
        const d0 = parts[0] / 10, d1 = Math.floor(parts[1] / 10), u = parts[1] % 10, X = 250 - cpBarresL(n, q) / 2;
        for(let b = 0; b < d0 + d1; b++){ const xa = b < d0 ? 150 - d0 * (q + 6) / 2 + b * (q + 6) : 330 + (b - d0) * (q + 6), xb = X + b * (q + 6), x = xa + (xb - xa) * k2;
          for(let i = 0; i < 10; i++) s += `<rect x="${x}" y="${110 + i * q}" width="${q}" height="${q}" fill="${b < d0 ? CE2C.vert : '#7FCBA6'}" stroke="#14583A" stroke-width="1"/>`; }
        for(let j = 0; j < u; j++){ const xa = 330 + d1 * (q + 6) + 8 + Math.floor(j / 5) * (q + 3), xb = X + (d0 + d1) * (q + 6) + 8 + Math.floor(j / 5) * (q + 3), x = xa + (xb - xa) * k2;
          s += `<rect x="${x}" y="${110 + 10 * q - (j % 5 + 1) * (q + 2)}" width="${q}" height="${q}" fill="${CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1"/>`; }
      }
      const d = Math.floor(n / 10), u = n % 10;
      const texte = t < .15 ? `Écoutez : « <b>${mot}</b> ».`
        : t < .5 ? `On entend <b>${mots[0]}</b>${parts[1] ? ` et <b>${mots[1]}</b> : ${parts[0]} + ${parts[1]}` : ''}.`
        : t < .8 ? 'On met toutes les barres de dix ensemble…'
        : `<b>${n}</b>, c'est <b>${d} dizaines</b>${u ? ` et <b>${u} unité${u > 1 ? 's' : ''}</b>` : ''} : ${d * 10}${u ? ' + ' + u : ''}.`;
      return { scene: `<svg viewBox="0 0 500 236" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

/* ---- Le tableau des nombres : avancer de 1 (vers la droite) ou de 10 (vers le bas) ---- */
function cpAnimTableau(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2500 + P[a.etat.p].sauts.length * 1300,
    legende: o.legende || 'Dans le tableau, descendre d\'une ligne, c\'est ajouter 10 ; monter d\'une ligne, c\'est enlever 10.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], c = 34, pos = v => [3 + (v % 10) * c + c / 2, 3 + Math.floor(v / 10) * c + c / 2];
      const L = [p.de]; p.sauts.forEach(d => L.push(L[L.length - 1] + d));
      const n = p.sauts.length, f = cmPhase(t, .15, .85) * n, i = Math.min(n, Math.floor(f));
      let s = '';
      for(let v = 0; v < 100; v++){ const [x, y] = pos(v), on = L.slice(0, i + 1).includes(v), fin = t > .86 && v === L[n];
        s += `<rect x="${x - c / 2}" y="${y - c / 2}" width="${c}" height="${c}" fill="${fin ? '#FDE3D2' : v === p.de ? '#E3F3FA' : on ? '#F3EEFB' : '#fff'}" stroke="${CPC.bord}" stroke-width="1"/>` + ce2T(x, y + 5, v, { t: 13, g: on || fin ? 700 : 500, c: fin ? CPC.jeton : CPC.bord }); }
      for(let q = 0; q < Math.min(n, Math.ceil(f)); q++){ const [x0, y0] = pos(L[q]), [x1, y1] = pos(L[q + 1]), k = Math.min(1, f - q);
        s += `<line x1="${x0}" y1="${y0}" x2="${x0 + (x1 - x0) * k}" y2="${y0 + (y1 - y0) * k}" stroke="${p.sauts[q] > 0 ? CE2C.vert : CE2C.rouge}" stroke-width="4" stroke-linecap="round" opacity=".8"/>`; }
      const tot = L[n] - p.de;
      const texte = t < .15 ? `On part de <b>${p.de}</b>.` : t < .86 ? `${p.sauts.slice(0, Math.max(1, Math.ceil(f))).map(d => (d > 0 ? '+ ' : '− ') + Math.abs(d)).join(', ')}…`
        : p.fin || `<b>${p.de} ${tot >= 0 ? '+' : '−'} ${Math.abs(tot)} = ${L[n]}</b>`;
      return { scene: `<svg viewBox="0 0 346 346" class="cma-svg" style="max-width:420px;">${s}</svg>`, texte };
    } });
}

/* ---- Soustraire en cassant une dizaine : on échange une barre contre dix cubes ---- */
function cpAnimCasser(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 10000, legende: o.legende || 'Il n\'y a pas assez de cubes seuls : on casse une barre de dix en dix cubes.',
    controles: a => ce2Choix(id, P.map(([x, y]) => ({ nom: `${x} − ${y}` })), a),
    dessin: (t, a) => {
      const [A, B] = P[a.etat.p], q = 13, d = Math.floor(A / 10), u = A % 10, casse = u < B % 10 || (B < 10 && u < B);
      const bD = Math.floor(B / 10), bU = B % 10;
      const k1 = cmDoux(cmPhase(t, .2, .4)), k2 = cmPhase(t, .5, .85);
      let s = '';
      // Barres de dix (la dernière se casse si besoin).
      for(let b = 0; b < d; b++){ const brise = casse && b === d - 1, retireD = b >= d - (casse ? 1 : 0) - bD && b < d - (casse ? 1 : 0), xb = 30 + b * (q + 8);
        if(brise && t > .2) continue;
        s += `<g opacity="${retireD && k2 > 0 ? Math.max(.15, 1 - k2 * 2) : 1}">`;
        for(let i = 0; i < 10; i++) s += `<rect x="${xb}" y="${30 + i * q}" width="${q}" height="${q}" fill="${CE2C.vert}" stroke="#14583A" stroke-width="1"/>`;
        s += `</g>`; }
      // Cubes seuls (plus les dix de la barre cassée).
      const nu = u + (casse && t > .2 ? 10 : 0), x0 = 30 + d * (q + 8) + 20;
      for(let j = 0; j < nu; j++){ const neuf = j >= u, xd = x0 + Math.floor(j / 5) * (q + 4), yd = 30 + 10 * q - (j % 5 + 1) * (q + 3);
        const xs = 30 + (d - 1) * (q + 8), ys = 30 + (j - u) * q, x = neuf ? xs + (xd - xs) * k1 : xd, y = neuf ? ys + (yd - ys) * k1 : yd;
        const retire = j >= nu - bU && k2 > 0;
        s += `<rect x="${x}" y="${y}" width="${q}" height="${q}" fill="${neuf ? '#7FD0E6' : CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1" opacity="${retire ? Math.max(.15, 1 - k2 * 2) : 1}"/>` + (retire && k2 > .5 ? `<path d="M${x} ${y + q} L${x + q} ${y}" stroke="${CE2C.rouge}" stroke-width="2"/>` : ''); }
      const R = A - B;
      const texte = t < .2 ? `<b>${A} − ${B}</b> : ${A}, c'est ${d} barres et ${u} cube${u > 1 ? 's' : ''} seul${u > 1 ? 's' : ''}. ${casse ? `On ne peut pas enlever ${bU} cubes seuls !` : ''}`
        : t < .45 ? (casse ? `On casse une barre : ${d - 1} barres et ${u + 10} cubes seuls. C'est toujours ${A}.` : 'Il y a assez de cubes seuls.')
        : t < .88 ? `On enlève ${bD ? `${bD} barre${bD > 1 ? 's' : ''} et ` : ''}${bU} cube${bU > 1 ? 's' : ''}…`
        : `Il reste ${Math.floor(R / 10)} barre${Math.floor(R / 10) > 1 ? 's' : ''} et ${R % 10} cube${R % 10 > 1 ? 's' : ''} : <b>${A} − ${B} = ${R}</b>.`;
      return { scene: `<svg viewBox="0 0 470 180" class="cma-svg" style="max-width:500px;">${s}</svg>`, texte };
    } });
}

/* ---- L'horloge des heures entières : la grande aiguille fait un tour, la petite avance d'un nombre ---- */
function cpAnimHeure(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { h: o.h || 8 }, duree: 7000,
    legende: o.legende || 'Quand la grande aiguille fait un tour complet, la petite aiguille avance d\'un nombre : une heure a passé.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'h', a.etat.h, 1, 12, 'Heure')}</div>`,
    dessin: (t, a) => {
      const h = a.etat.h, k = cmDoux(cmPhase(t, .2, .85)), mt = h * 60 + 60 * k, h2 = h % 12 + 1;
      const s = ce2Horloge(130, 125, 105, mt) + ce2T(330, 90, t < .86 ? `${h} h` : `${h2} h`, { t: 34, g: 700, c: CE2C.rouge })
        + ce2T(330, 125, t < .86 ? cpHeureMots(h) : cpHeureMots(h2), { t: 15, c: CE2C.gris });
      const texte = t < .2 ? `La petite aiguille montre le <b>${h}</b>, la grande aiguille est sur le <b>12</b> : il est <b>${h} heure${h > 1 ? 's' : ''}</b>.`
        : t < .86 ? 'La grande aiguille fait le tour du cadran…'
        : `La petite aiguille est sur le <b>${h2}</b>, la grande est revenue sur le 12 : il est <b>${h2} heure${h2 > 1 ? 's' : ''}</b>. Une heure a passé.`;
      return { scene: `<svg viewBox="0 0 440 250" class="cma-svg" style="max-width:440px;">${s}</svg>`, texte };
    } });
}
const cpHeureMots = h => h === 12 ? 'midi ou minuit' : h === 1 ? 'une heure' : cpMot(h) + ' heures';
// Une horloge fixe à h heures (heures entières), en SVG prêt à poser.
const cpHorloge = (h, px) => cpSvg(160, 160, ce2Horloge(80, 80, 74, h * 60), px || 130);

/* ---- La règle graduée en centimètres : on place le 0 au début ---- */
function cpRegleSvg(x0, y, n, K){
  let s = `<rect x="${x0 - 14}" y="${y}" width="${n * K + 28}" height="40" rx="4" fill="#FFF3D6" stroke="#C9A24A"/>`;
  for(let i = 0; i <= n; i++){ const x = x0 + i * K; s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 16}" stroke="#8A6D1F" stroke-width="1.6"/>` + ce2T(x, y + 33, i, { t: 13, c: '#8A6D1F', g: 700 }); }
  return s;
}
function cpRegle(n, o){ o = o || {}; const K = o.K || 36; let s = cpRegleSvg(18, o.seg ? 34 : 4, n, K);
  if(o.seg) s += `<line x1="${18 + (o.de || 0) * K}" y1="22" x2="${18 + ((o.de || 0) + o.seg) * K}" y2="22" stroke="${CE2C.encre}" stroke-width="4" stroke-linecap="round"/>`;
  return cpSvg(n * K + 36, o.seg ? 78 : 48, s, o.px); }
function cpAnimMesurer(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 7500, legende: o.legende || 'On place le 0 de la règle au début du trait, et on lit le nombre au bout.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], K = 36, X = 40, de = p.de || 0, k = cmDoux(cmPhase(t, .15, .5));
      let s = `<line x1="${X}" y1="40" x2="${X + p.cm * K}" y2="40" stroke="${CE2C.encre}" stroke-width="5" stroke-linecap="round"/>`;
      s += `<g transform="translate(${-de * K} ${(1 - k) * 60})" opacity="${Math.min(1, k * 2)}">${cpRegleSvg(X, 52, 12, K)}</g>`;
      if(t > .55){ const xr = X + p.cm * K; s += `<line x1="${xr}" y1="30" x2="${xr}" y2="70" stroke="${CE2C.rouge}" stroke-width="2.5" stroke-dasharray="4 3"/>` + ce2T(xr, 22, p.cm + de, { t: 18, g: 700, c: CE2C.rouge }); }
      const texte = t < .15 ? 'Combien mesure ce trait ?' : t < .55 ? (de ? `Attention : on place la règle… mais le trait commence en face du <b>${de}</b>, pas du 0 !` : 'On place le <b>0</b> de la règle juste au début du trait.')
        : de ? `Au bout, on lit ${p.cm + de}. Mais on est parti de ${de} : le trait mesure ${p.cm + de} − ${de} = <b>${p.cm} cm</b>. Il vaut mieux partir du 0 !`
        : `Au bout du trait, on lit <b>${p.cm}</b> : le trait mesure <b>${p.cm} cm</b> (${cpMot(p.cm)} centimètres).`;
      return { scene: `<svg viewBox="0 0 ${X * 2 + 12 * K} 110" class="cma-svg" style="max-width:560px;">${s}</svg>`, texte };
    } });
}

/* ================= Périodes 4 et 5 ================= */
/* ---- Des groupes égaux : les paquets apparaissent un à un, on ajoute à mesure (pas de signe × au CP) ---- */
function cpAnimGroupes(id, o){
  o = o || {};
  const OBJ = { pommes: (x, y) => cpPomme(x, y, { r: 9 }), jetons: (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="${CPC.jeton}" stroke="${CPC.bord}"/>` };
  return cmAnim(id, {
    etat: { g: o.g || 4, n: o.n || 3 }, duree: a => 2000 + a.etat.g * 1200,
    legende: o.legende || 'Des paquets qui ont tous le même nombre d\'objets : on compte de 3 en 3 (ou de 2 en 2, de 5 en 5…).',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'g', a.etat.g, 2, 5, 'Paquets')}${cmPlusMoins(id, 'n', a.etat.n, 2, 5, 'Dans chaque paquet')}</div>`,
    dessin: (t, a) => {
      const { g, n } = a.etat, k = Math.min(g, Math.floor(cmPhase(t, .1, .85) * g + 1e-6) + (t >= .1 ? 1 : 0)), W = 500, bw = 88, gap = (W - g * bw) / (g + 1);
      let s = '';
      for(let i = 0; i < g; i++){ const x0 = gap + i * (bw + gap), vu = i < k;
        s += `<rect x="${x0}" y="20" width="${bw}" height="90" rx="12" fill="${vu ? '#FFF7E8' : '#F4F6F9'}" stroke="${vu ? CPC.bord : '#C7D2DE'}" stroke-width="2" ${vu ? '' : 'stroke-dasharray="6 4"'}/>`;
        if(vu){ for(let j = 0; j < n; j++){ const col = j % 3, row = Math.floor(j / 3); s += (OBJ[o.objet] || OBJ.jetons)(x0 + 20 + col * 24, 46 + row * 32); }
          s += ce2T(x0 + bw / 2, 132, (i + 1) * n, { t: 18, g: 700, c: CE2C.vert }); } }
      const somme = Array(k).fill(n).join(' + ');
      const texte = t < .1 ? `<b>${g}</b> paquets de <b>${n}</b>. Combien en tout ?` : t < .88 ? `On compte de ${n} en ${n} : ${Array.from({ length: k }, (_, i) => (i + 1) * n).join(', ')}…`
        : `${somme} = <b>${g * n}</b>. Il y a <b>${g * n}</b> objets en tout.`;
      return { scene: `<svg viewBox="0 0 ${W} 145" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

/* ---- Des points alignés ? On pose la règle sur deux points et on regarde le troisième ---- */
function cpAnimAligne(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 7000, legende: o.legende || 'On pose le bord de la règle sur deux points : le troisième touche-t-il aussi le bord ?',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], [A, B, C] = p.pts, k = cmDoux(cmPhase(t, .15, .5));
      const ang = Math.atan2(B[1] - A[1], B[0] - A[0]) * 180 / Math.PI, n = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / n, uy = (B[1] - A[1]) / n;
      // La règle est posée le long de (AB) et assez longue pour aller jusqu'en face de C.
      const pc = (C[0] - A[0]) * ux + (C[1] - A[1]) * uy, L = pc + 80, cx = A[0] + ux * pc / 2, cy = A[1] + uy * pc / 2;
      let s = '';
      s += `<g transform="translate(${cx} ${cy}) rotate(${ang}) translate(0 ${(1 - k) * 80})" opacity="${Math.min(1, k * 2)}"><rect x="${-L / 2}" y="0" width="${L}" height="34" rx="3" fill="#FFF3D6" fill-opacity=".85" stroke="#C9A24A"/></g>`;
      const ok = p.aligne;
      [[A, 'A'], [B, 'B'], [C, 'C']].forEach(([[x, y], nom], i) => { const hl = i === 2 && t > .6;
        s += `<path d="M${x - 6} ${y - 6} L${x + 6} ${y + 6} M${x - 6} ${y + 6} L${x + 6} ${y - 6}" stroke="${hl ? (ok ? CE2C.vert : CE2C.rouge) : CE2C.encre}" stroke-width="2.6"/>` + ce2T(x, y - 12, nom, { t: 15, g: 700 }); });
      if(t > .75 && ok) s += `<line x1="${A[0]}" y1="${A[1]}" x2="${C[0]}" y2="${C[1]}" stroke="${CE2C.vert}" stroke-width="2.5"/>`;
      const texte = t < .15 ? 'Les points A, B et C sont-ils <b>alignés</b> (sur une même ligne droite) ?' : t < .6 ? 'Je pose le bord de la règle sur A et B…'
        : ok ? 'C touche aussi le bord de la règle : <b>A, B et C sont alignés</b>. On peut tracer un trait droit qui passe par les trois.' : 'C ne touche pas le bord de la règle : <b>A, B et C ne sont pas alignés</b>.';
      return { scene: `<svg viewBox="0 0 480 220" class="cma-svg" style="max-width:500px;">${s}</svg>`, texte };
    } });
}

/* ---- Aller à la dizaine : 8 + 5, on complète la boîte de dix (8 + 2), puis le reste (3) ---- */
function cpAnimDixPlus(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { a: o.a || 8, b: o.b || 5 }, duree: 9000,
    legende: o.legende || 'On remplit d\'abord la boîte de dix, puis on met le reste dans la deuxième boîte : 10 et encore…',
    corriger: a => { a.etat.b = Math.max(10 - a.etat.a + 1, Math.min(a.etat.b, 9)); },
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'a', a.etat.a, 6, 9, 'Premier nombre')}${cmPlusMoins(id, 'b', a.etat.b, 11 - a.etat.a, 9, 'On ajoute')}</div>`,
    dessin: (t, a) => {
      const { a: A, b: B } = a.etat, c1 = 10 - A, c2 = B - c1, c = 38;
      const k1 = cmDoux(cmPhase(t, .2, .45)), k2 = cmDoux(cmPhase(t, .55, .8));
      let s = cpBoiteDixSvg(30, 30, A, { c }) + cpBoiteDixSvg(260, 30, 0, { c });
      for(let j = 0; j < B; j++){ const premier = j < c1, q = premier ? A + j : j - c1, bx = premier ? 30 : 260, kk = premier ? k1 : k2;
        const xd = bx + (q % 5) * c + c / 2, yd = 30 + Math.floor(q / 5) * c + c / 2, xs = 150 + j * 30, ys = 150;
        s += `<circle cx="${xs + (xd - xs) * kk}" cy="${ys + (yd - ys) * kk}" r="${c * .34}" fill="${premier ? CE2C.vert : CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1.2"/>`; }
      const texte = t < .2 ? `<b>${A} + ${B}</b> : la boîte a ${A} jetons. On en ajoute ${B}.`
        : t < .5 ? `D'abord, on complète la boîte : ${A} + <b>${c1}</b> = 10.`
        : t < .85 ? `${B}, c'est ${c1} et ${c2} : il reste <b>${c2}</b> jeton${c2 > 1 ? 's' : ''} à placer.`
        : `10 + ${c2} = <b>${10 + c2}</b>. Donc <b>${A} + ${B} = ${A + B}</b>.`;
      return { scene: `<svg viewBox="0 0 480 175" class="cma-svg" style="max-width:500px;">${s}</svg>`, texte };
    } });
}

/* ---- Le robot suit un programme de flèches sur un quadrillage, avec des obstacles ---- */
function cpAnimRobot(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2500 + P[a.etat.p].code.length * 1000,
    legende: o.legende || 'Avant de lancer : la classe lit le programme et prévoit où le robot s\'arrête.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], nc = p.nc || 7, nr = p.nr || 5, C = 40, L = cpSuivre(p.dep, p.code), n = p.code.length;
      const mur = (c, r) => (p.murs || []).some(([x, y]) => x === c && y === r);
      let bloque = n; for(let i = 1; i <= n; i++){ const [c, r] = L[i]; if(c < 0 || r < 0 || c >= nc || r >= nr || mur(c, r)){ bloque = i - 1; break; } }
      const f = cmPhase(t, .12, .9) * n, i = Math.min(n - 1, Math.floor(f)), kk = cmDoux(Math.min(1, (f - i) * 1.5));
      let x, y, choc = false;
      if(t < .12){ [x, y] = L[0]; } else if(i < bloque){ const A = L[i], B = L[i + 1]; x = A[0] + (B[0] - A[0]) * kk; y = A[1] + (B[1] - A[1]) * kk; }
      else { [x, y] = L[bloque]; choc = true; }
      let s = `<rect x="3" y="3" width="${nc * C}" height="${nr * C}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`;
      for(let c = 1; c < nc; c++) s += `<line x1="${3 + c * C}" y1="3" x2="${3 + c * C}" y2="${3 + nr * C}" stroke="#9FB0C4"/>`;
      for(let r = 1; r < nr; r++) s += `<line x1="3" y1="${3 + r * C}" x2="${3 + nc * C}" y2="${3 + r * C}" stroke="#9FB0C4"/>`;
      (p.murs || []).forEach(([c, r]) => { s += `<rect x="${5 + c * C}" y="${5 + r * C}" width="${C - 4}" height="${C - 4}" fill="#8A8F98"/><path d="M${5 + c * C} ${5 + r * C + 12} H${3 + (c + 1) * C} M${5 + c * C} ${5 + r * C + 26} H${3 + (c + 1) * C}" stroke="#5B6472"/>`; });
      if(p.but) s += CP_ICO.etoile(3 + p.but[0] * C + C / 2, 3 + p.but[1] * C + C / 2);
      const vu = t < .12 ? [] : L.slice(0, Math.min(i, bloque) + 1).concat([[x, y]]);
      if(vu.length > 1) s += `<polyline points="${vu.map(([c, r]) => `${3 + c * C + C / 2},${3 + r * C + C / 2}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 4"/>`;
      const rx = 3 + x * C + C / 2, ry = 3 + y * C + C / 2;
      s += `<rect x="${rx - 13}" y="${ry - 12}" width="26" height="22" rx="5" fill="${choc && t > .9 ? CE2C.rouge : '#2EA8C9'}" stroke="${CPC.bord}" stroke-width="1.5"/><circle cx="${rx - 5}" cy="${ry - 3}" r="3" fill="#fff"/><circle cx="${rx + 5}" cy="${ry - 3}" r="3" fill="#fff"/><line x1="${rx}" y1="${ry - 12}" x2="${rx}" y2="${ry - 18}" stroke="${CPC.bord}" stroke-width="2"/><circle cx="${rx}" cy="${ry - 19}" r="2.5" fill="${CE2C.rouge}"/>`;
      const fl = p.code.split('').map((d, q) => `<g transform="translate(${nc * C + 16 + (q % 4) * 34} ${6 + Math.floor(q / 4) * 36})">${cpFleche(d, t >= .12 && t < .9 && q === i).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`).join('');
      const fin = t >= .9, arrive = p.but && L[n][0] === p.but[0] && L[n][1] === p.but[1] && bloque === n;
      const texte = t < .12 ? 'Le robot va suivre le programme, flèche après flèche.'
        : !fin ? (i >= bloque ? 'Bing ! Le robot ne peut pas avancer.' : `Flèche ${i + 1}…`)
        : bloque < n ? `<b>Bing !</b> À la flèche ${bloque + 1}, le robot se cogne : il faut corriger le programme.` : arrive ? 'Le robot est arrivé sur l\'étoile : le programme est juste !' : 'Le programme est fini.';
      return { scene: `<svg viewBox="0 0 ${nc * C + 160} ${nr * C + 8}" class="cma-svg" style="max-width:600px;">${s}${fl}</svg>`, texte };
    } });
}
// Figures tracées sur un quadrillage : traits = [[points, couleur, fermé ?], …] (les points sont des nœuds).
function cpQuadFig(nc, nr, traits, o){
  o = o || {}; const c = o.c || 26; let s = '';
  for(let i = 0; i <= nc; i++) s += `<line x1="${4 + i * c}" y1="4" x2="${4 + i * c}" y2="${4 + nr * c}" stroke="#C7D2DE"/>`;
  for(let j = 0; j <= nr; j++) s += `<line x1="4" y1="${4 + j * c}" x2="${4 + nc * c}" y2="${4 + j * c}" stroke="#C7D2DE"/>`;
  traits.forEach(([pts, col, ferme]) => { const p = pts.map(([x, y]) => `${4 + x * c},${4 + y * c}`).join(' ');
    s += ferme === false ? `<polyline points="${p}" fill="none" stroke="${col || CPC.bord}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : `<polygon points="${p}" fill="${col}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.5"/>`; });
  (o.points || []).forEach(([x, y, nom]) => { s += `<circle cx="${4 + x * c}" cy="${4 + y * c}" r="4" fill="${CE2C.rouge}"/>` + (nom ? ce2T(4 + x * c + 9, 4 + y * c - 6, nom, { t: 13, g: 700 }) : ''); });
  return cpSvg(nc * c + 8, nr * c + 8, s, o.px);
}
/* ---- Reproduire une figure sur quadrillage : le trait se dessine côté par côté, en comptant les carreaux ---- */
function cpAnimReproduire(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2000 + P[a.etat.p].pts.length * 1200,
    legende: o.legende || 'Pour chaque côté, on compte les carreaux sur le modèle, puis on trace sur la feuille.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], c = 26, nc = 8, nr = 6, off = 9 * c + 10, pts = p.pts, n = pts.length - 1, f = cmPhase(t, .12, .9) * n;
      const grille = x0 => { let s = ''; for(let i = 0; i <= nc; i++) s += `<line x1="${x0 + i * c}" y1="4" x2="${x0 + i * c}" y2="${4 + nr * c}" stroke="#C7D2DE"/>`; for(let j = 0; j <= nr; j++) s += `<line x1="${x0}" y1="${4 + j * c}" x2="${x0 + nc * c}" y2="${4 + j * c}" stroke="#C7D2DE"/>`; return s; };
      let s = grille(4) + grille(4 + off) + ce2T(4 + nc * c / 2, nr * c + 26, 'le modèle', { t: 13, c: CE2C.gris }) + ce2T(4 + off + nc * c / 2, nr * c + 26, 'ma reproduction', { t: 13, c: CE2C.gris });
      s += `<polyline points="${pts.map(([x, y]) => `${4 + x * c},${4 + y * c}`).join(' ')}" fill="none" stroke="${CPC.bord}" stroke-width="3" stroke-linejoin="round"/>`;
      const i = Math.min(n - 1, Math.floor(f)), k = Math.min(1, f - i);
      if(t >= .12){ const fait = pts.slice(0, i + 1).map(([x, y]) => [x, y]); const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; fait.push([x0 + (x1 - x0) * k, y0 + (y1 - y0) * k]);
        s += `<polyline points="${fait.map(([x, y]) => `${4 + off + x * c},${4 + y * c}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
        if(t < .9) s += `<line x1="${4 + x0 * c}" y1="${4 + y0 * c}" x2="${4 + x1 * c}" y2="${4 + y1 * c}" stroke="${CE2C.rouge}" stroke-width="5" opacity=".6"/>`; }
      const [x0, y0] = pts[Math.min(i, n - 1)], [x1, y1] = pts[Math.min(i + 1, n)], dx = x1 - x0, dy = y1 - y0;
      const dir = dx && dy ? `en biais : ${Math.abs(dx)} carreau${Math.abs(dx) > 1 ? 'x' : ''} ${dx > 0 ? 'à droite' : 'à gauche'} et ${Math.abs(dy)} ${dy > 0 ? 'en bas' : 'en haut'}` : `${Math.abs(dx || dy)} carreau${Math.abs(dx || dy) > 1 ? 'x' : ''} ${dx > 0 ? 'à droite' : dx < 0 ? 'à gauche' : dy > 0 ? 'en bas' : 'en haut'}`;
      const texte = t < .12 ? 'On repère le point de départ sur le modèle, puis le même point sur sa feuille.' : t < .9 ? `Côté ${i + 1} : ${dir}.` : 'La figure est reproduite : on compare avec le modèle.';
      return { scene: `<svg viewBox="0 0 ${off + nc * c + 10} ${nr * c + 34}" class="cma-svg" style="max-width:560px;">${s}</svg>`, texte };
    } });
}
