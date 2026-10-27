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
function cpMainSvg(x, y, n, o){
  o = o || {}; const peau = '#F6C9A0', trait = '#9A5B34', dr = !!o.droite, st = `fill="${peau}" stroke="${trait}" stroke-width="1.8"`;
  // Pouce levé : dessiné avant la paume, qui recouvre sa base (il reste attaché à la main).
  const px = dr ? x + 52 : x + 6, py = y + 68;
  let s = n >= 1 ? `<rect x="${px - 6.5}" y="${py - 42}" width="13" height="44" rx="6.5" ${st} transform="rotate(${dr ? 30 : -30} ${px} ${py})"/>` : '';
  s += `<rect x="${x}" y="${y + 40}" width="58" height="46" rx="14" ${st}/>`;
  // Pouce replié : couché sur la paume.
  if(n < 1) s += `<rect x="${dr ? x + 30 : x + 4}" y="${y + 58}" width="24" height="12" rx="6" ${st}/>`;
  // Quatre doigts, de l'index (à côté du pouce) à l'auriculaire.
  const L = [44, 48, 44, 36];
  for(let d = 0; d < 4; d++){ const leve = n >= d + 2, h = leve ? L[d] : 10, cx = dr ? x + 44 - d * 13.5 : x + 3 + d * 13.5;
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
  for(let q = 0; q < Math.min(10, k); q++){ const i = q % 5, j = Math.floor(q / 5);
    s += `<circle cx="${x + c * i + c / 2}" cy="${y + c * j + c / 2}" r="${c * .34}" fill="${(o.couleurs && o.couleurs[q]) || CPC.jeton}" stroke="${CPC.bord}" stroke-width="1.2"/>`; }
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
