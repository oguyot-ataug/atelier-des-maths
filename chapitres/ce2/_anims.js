/* ============================================================
   chapitres/ce2/_anims.js -- Animations des cours du CE2.

   Demandé : « Je préfère quand tu te comportes comme un fin pédagogue : utilise des animations pour
   illustrer un maximum. » Chaque animation utilise le lecteur commun du cours moyen (cmAnim,
   chapitres/cm1/_anims.js : Lecture / Pause, curseur, boutons de réglage) ; elle est lancée à
   l'ouverture du chapitre (cm1Chapitre › init).

   ce2Film(id, { film: a => ({ w, h, scenes }) , ... }) : une animation découpée en scènes. Chaque
   scène { de, a, dessin(k), texte } apparaît à t = de, progresse de k = 0 à 1 jusqu'à t = a, puis
   reste affichée ; le texte sous le dessin est celui de la dernière scène commencée.

   Animations : sauts sur une droite (calcul, monnaie, durées), schéma en barres qui se construit,
   rangées de jetons (multiplication, l'ordre des facteurs), glisse-nombre (× 10, × 100), horloge,
   règle graduée (mesurer, tracer, milieu), partage équitable, diagramme en barres, compas, angle qui
   s'ouvre, balance, verres qu'on remplit, fractions égales (on recoupe), addition de fractions,
   arbre des possibilités, polygone qu'on trace, matériel de numération, bande unité qu'on plie,
   symétrie sur quadrillage, report des côtés au compas (périmètre).
   Dépend de chapitres/cm1/_anims.js (cmAnim, cmBtn, cmPlusMoins, cmPhase, cmDoux, cmNb) et de
   _commun.js (cm1Frac).
   ============================================================ */
const CE2C = { bleu: '#2EA8C9', rouge: '#E35D3A', vert: '#2E9C6A', jaune: '#E9C46A', violet: '#7A4FC0', encre: '#1F3A5C', gris: '#5B6472', clair: '#D5DBE3' };
const ce2T = (x, y, s, o) => { o = o || {}; return `<text x="${x}" y="${y}" font-size="${o.t || 14}" text-anchor="${o.a || 'middle'}" fill="${o.c || CE2C.encre}" font-weight="${o.g || 600}" font-family="Space Grotesk, sans-serif"${o.op != null ? ` opacity="${o.op}"` : ''}>${s}</text>`; };
// Fraction écrite en étage dans un dessin SVG (KaTeX n'y entre pas).
const ce2FracSvg = (x, y, a, b, o) => { o = o || {}; const t = o.t || 13, c = o.c || CE2C.encre; return ce2T(x, y - 3, a, { t, c }) + `<line x1="${x - 7}" y1="${y + 1}" x2="${x + 7}" y2="${y + 1}" stroke="${c}" stroke-width="1.3"/>` + ce2T(x, y + t + 1, b, { t, c }); };
const ce2Mix = (a, b, k) => a + (b - a) * k;
const ce2Choix = (id, P, a) => P.length > 1 ? `<div class="cmp-modeles">${P.map((p, i) => cmBtn(id, 'p', i, p.nom, a.etat.p === i)).join('')}</div>` : '';
// Trait qui se dessine progressivement (k de 0 à 1).
const ce2Trace = (d, k, o) => { o = o || {}; return `<path d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - k}" fill="none" stroke="${o.c || CE2C.encre}" stroke-width="${o.l || 2.4}" stroke-linecap="round"/>`; };
const ce2Nb = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

function ce2Film(id, o){
  return cmAnim(id, {
    etat: o.etat || { p: 0 }, duree: o.duree || 8000, legende: o.legende, controles: o.controles,
    dessin: (t, a) => {
      const f = typeof o.film === 'function' ? o.film(a) : o.film;
      let s = '', texte = '';
      f.scenes.forEach(x => {
        if(t + 1e-9 < x.de) return;
        const k = x.a > x.de ? cmPhase(t, x.de, x.a) : 1;
        s += x.dessin ? x.dessin(cmDoux(k), k) : '';
        if(x.texte != null) texte = typeof x.texte === 'function' ? x.texte(k) : x.texte;
      });
      return { scene: `<svg viewBox="0 0 ${f.w} ${f.h}" class="cma-svg" style="max-width:${f.w}px;">${s}</svg>`, texte };
    } });
}
// Répartit n étapes dans [d0, d1] : renvoie [de, a] de l'étape i.
const ce2Creneau = (i, n, d0, d1, part) => { const L = (d1 - d0) / n; return [d0 + i * L, d0 + i * L + L * (part || .8)]; };

/* ---------------- Sauts sur une droite (calcul mental, rendre la monnaie, durées) ----------------
   presets : [{ nom, depart, sauts: [[écart, étiquette, texte?]], min, max, fmt?, fin }] */
function ce2AnimSauts(id, o){
  const P = o.presets;
  return ce2Film(id, { duree: o.duree || 8000, legende: o.legende, controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], W = 620, Y = 120, fmt = p.fmt || ce2Nb, X = v => 40 + (v - p.min) / (p.max - p.min) * (W - 90);
      const pts = [p.depart]; p.sauts.forEach(([d]) => pts.push(pts[pts.length - 1] + d));
      // Étiquettes des points d'arrivée : décalées vers le bas quand deux sont trop proches.
      const ligneLab = []; pts.forEach((v, i) => { ligneLab[i] = 0; for(let j = 0; j < i; j++) if(Math.abs(X(pts[j]) - X(v)) < 64 && ligneLab[j] === ligneLab[i]) ligneLab[i]++; });
      const repere = (i, k, c) => `<line x1="${X(pts[i])}" y1="${Y - 9}" x2="${X(pts[i])}" y2="${Y + 9}" stroke="${c || CE2C.encre}" stroke-width="2.4"/>` + ce2T(X(pts[i]), Y + 28 + ligneLab[i] * 18, fmt(pts[i]), { op: k, c: c || CE2C.encre });
      const scenes = [{ de: 0, a: .1, dessin: k => `<line x1="16" y1="${Y}" x2="${W - 14}" y2="${Y}" stroke="${CE2C.encre}" stroke-width="2"/><polygon points="${W - 14},${Y} ${W - 24},${Y - 5} ${W - 24},${Y + 5}" fill="${CE2C.encre}"/>` + repere(0, k, CE2C.bleu) + `<circle cx="${X(pts[0])}" cy="${Y}" r="6" fill="${CE2C.bleu}" opacity="${k}"/>`,
        texte: p.texteDepart || `On part de <b>${fmt(p.depart)}</b>.` }];
      p.sauts.forEach(([d, lab, tx], i) => {
        const [de, fin] = ce2Creneau(i, p.sauts.length, .14, .92, .85), x0 = X(pts[i]), x1 = X(pts[i + 1]), h = Math.min(70, 26 + Math.abs(x1 - x0) * .35), c = d >= 0 ? CE2C.vert : CE2C.rouge;
        scenes.push({ de, a: fin, dessin: k => ce2Trace(`M${x0} ${Y - 6} Q${(x0 + x1) / 2} ${Y - 6 - 2 * h} ${x1} ${Y - 6}`, k, { c, l: 2.6 })
          + (k >= 1 ? `<polygon points="${x1},${Y - 5} ${x1 + (d >= 0 ? -9 : 9)},${Y - 15} ${x1 + (d >= 0 ? -2 : 2)},${Y - 17}" fill="${c}"/>` : '')
          + ce2T((x0 + x1) / 2, Y - 12 - h, lab, { c, op: Math.min(1, k * 2), t: 15 }) + (k >= 1 ? repere(i + 1, 1, i === p.sauts.length - 1 ? CE2C.vert : CE2C.encre) : ''),
          texte: tx || `${lab} : on arrive à <b>${fmt(pts[i + 1])}</b>.` });
      });
      if(p.fin) scenes.push({ de: .95, a: 1, texte: p.fin });
      return { w: W, h: 190, scenes };
    } });
}
// Formats utiles : minutes depuis minuit → « 16 h 05 » ; centimes → « 3,68 € ».
const ce2Heure = m => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`;
const ce2Euros = c => `${Math.floor(c / 100)},${String(c % 100).padStart(2, '0')} €`;

/* ---------------- Schéma en barres qui se construit ----------------
   o.lignes : [[étiquette, [[longueur, texte, couleur, texteAnim?]]]] ; o.total : texte de l'accolade
   (sous la dernière ligne) ; o.solution : { ligne, part, texte, phrase } remplace le « ? ». */
function ce2AnimBarres(id, o){
  return ce2Film(id, { duree: o.duree || 8000, legende: o.legende,
    film: () => {
      const X0 = 96, H = 34, G = 16, U = o.unite || 1;
      const parts = []; let y = 10, maxx = 0;
      o.lignes.forEach(([lab, ps], li) => { let x = X0; ps.forEach(([l, tx, c, ta], pi) => { parts.push({ li, pi, x, y, w: l * U, tx, c, ta, lab: pi === 0 ? lab : null }); x += l * U; }); maxx = Math.max(maxx, x); y += H + G; });
      const n = parts.length + (o.total ? 1 : 0) + (o.solution ? 1 : 0), scenes = [];
      parts.forEach((p, i) => {
        const [de, fin] = ce2Creneau(i, n, 0, .95);
        scenes.push({ de, a: fin, dessin: k => (p.lab ? ce2T(X0 - 10, p.y + H / 2 + 5, p.lab, { a: 'end', op: Math.min(1, k * 3) }) : '')
          + `<rect x="${p.x}" y="${p.y}" width="${Math.max(.1, p.w * k)}" height="${H}" fill="${p.c === '#fff' ? '#fff' : p.c || CE2C.bleu}" fill-opacity="${p.c === '#fff' ? 1 : .4}" stroke="${CE2C.encre}" stroke-width="1.6"${p.c === '#fff' ? ' stroke-dasharray="5 4"' : ''}/>`
          + ce2T(p.x + p.w / 2, p.y + H / 2 + 5, p.tx, { op: k > .8 ? 1 : 0 }),
          texte: p.ta || '' });
      });
      let yb = y - G + 6;
      if(o.total){
        const [de, fin] = ce2Creneau(parts.length, n, 0, .95), xm = (X0 + maxx) / 2, y0 = yb;
        scenes.push({ de, a: fin, dessin: k => ce2Trace(`M${X0} ${y0} q0 10 10 10 H${xm - 8} q8 0 8 8 q0 -8 8 -8 H${maxx - 10} q10 0 10 -10`, k, { c: CE2C.rouge, l: 2 }) + ce2T(xm, y0 + 38, o.total, { c: CE2C.rouge, op: k }), texte: o.totalTexte || '' });
        yb += 46;
      }
      if(o.solution){
        const [de] = ce2Creneau(n - 1, n, 0, .95), s = o.solution, p = parts.find(q => q.li === s.ligne && q.pi === s.part);
        scenes.push({ de, a: Math.min(1, de + .08), dessin: k => `<rect x="${p.x + 2}" y="${p.y + 2}" width="${p.w - 4}" height="${H - 4}" fill="#fff" opacity="${k}"/>` + ce2T(p.x + p.w / 2, p.y + H / 2 + 5, s.texte, { c: CE2C.vert, op: k, t: 15 }), texte: s.phrase });
      }
      return { w: maxx + 20, h: Math.max(yb, y) + 4, scenes };
    } });
}

/* ---------------- Rangées de jetons : addition répétée, puis on tourne la feuille ---------------- */
function ce2AnimJetons(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { l: o.l || 4, c: o.c || 5 }, duree: 9000, legende: o.legende || 'Choisis le nombre de rangées et de jetons par rangée.',
    controles: a => `<div class="cmp-modeles">${cmPlusMoins(id, 'l', a.etat.l, 2, 9, 'Rangées')}${cmPlusMoins(id, 'c', a.etat.c, 2, 9, 'Jetons par rangée')}</div>`,
    dessin: (t, a) => {
      const { l, c } = a.etat, P = 32, S = Math.max(l, c) * P + 24, cx = S / 2, cy = S / 2, x0 = cx - c * P / 2, y0 = cy - l * P / 2;
      const vues = Math.min(l, Math.floor(cmPhase(t, .04, .55) * l + 1e-6) + (t > .04 ? 1 : 0)), rot = cmDoux(cmPhase(t, .7, .9)) * 90;
      let s = `<g transform="rotate(${rot} ${cx} ${cy})">`;
      for(let i = 0; i < l; i++) for(let j = 0; j < c; j++) if(i < vues) s += `<circle cx="${x0 + P / 2 + j * P}" cy="${y0 + P / 2 + i * P}" r="11" fill="${i % 2 ? CE2C.rouge : CE2C.bleu}" fill-opacity=".85" stroke="${CE2C.encre}" stroke-width="1"/>`;
      s += '</g>';
      const somme = Array(vues).fill(c).join(' + ');
      const texte = t < .58 ? (vues ? `${vues} rangée${vues > 1 ? 's' : ''} de ${c} : ${somme}${vues > 1 ? ' = <b>' + vues * c + '</b>' : ''}` : '')
        : t < .7 ? `${l} rangées de ${c} jetons : <b>${l} × ${c} = ${l * c}</b>.`
        : `On tourne la feuille : ${c} rangées de ${l} jetons. <b>${c} × ${l} = ${l * c}</b> aussi.`;
      return { scene: `<svg viewBox="0 0 ${S} ${S}" class="cma-svg" style="max-width:${S}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Glisse-nombre : multiplier par 10 ou par 100 ---------------- */
function ce2AnimGlisse(id, o){
  const P = o.presets, COLS = ['milliers', 'centaines', 'dizaines', 'unités'];
  return ce2Film(id, { duree: 7000, legende: o.legende || 'Chaque chiffre glisse vers la gauche : il prend une valeur 10 fois (ou 100 fois) plus grande.', controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], d = String(p.n).split(''), dec = p.f === 100 ? 2 : 1, CW = 96, X0 = 20, W = X0 * 2 + 4 * CW, colX = j => X0 + j * CW + CW / 2;
      let fond = '';
      COLS.forEach((c, j) => { fond += `<rect x="${X0 + j * CW}" y="20" width="${CW}" height="34" fill="${CE2C.encre}" stroke="#fff"/>` + ce2T(colX(j), 42, c, { c: '#fff', t: 13 }) + `<rect x="${X0 + j * CW}" y="54" width="${CW}" height="56" fill="#fff" stroke="${CE2C.encre}"/>`; });
      const debut = 4 - d.length;
      const chiffres = k => d.map((ch, i) => ce2T(colX(ce2Mix(debut + i, debut + i - dec, k)), 94, ch, { t: 34, c: CE2C.encre, g: 700 })).join('');
      const zeros = k => Array.from({ length: dec }, (_, z) => ce2T(colX(3 - z), 94, '0', { t: 34, c: CE2C.rouge, g: 700, op: k })).join('');
      return { w: W, h: 150, scenes: [
        { de: 0, a: .1, dessin: () => fond, texte: `Voici <b>${ce2Nb(p.n)}</b> dans le tableau.` },
        { de: .15, a: .6, dessin: k => chiffres(k), texte: `On multiplie par ${p.f} : chaque chiffre prend une valeur ${p.f} fois plus grande et glisse de ${dec} rang${dec > 1 ? 's' : ''} vers la gauche.` },
        { de: .65, a: .8, dessin: k => zeros(k), texte: `Les unités sont vides : on y écrit ${dec > 1 ? 'des zéros' : 'un zéro'}.` },
        { de: .85, a: 1, dessin: k => ce2T(W / 2, 140, `${ce2Nb(p.n)} × ${p.f} = ${ce2Nb(p.n * p.f)}`, { t: 18, c: CE2C.vert, op: k }), texte: `<b>${ce2Nb(p.n)} × ${p.f} = ${ce2Nb(p.n * p.f)}</b>` },
      ] };
    } });
}

/* ---------------- Horloge : les aiguilles tournent d'une heure à une autre ---------------- */
function ce2Horloge(cx, cy, R, mt, arcDe){
  let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${CE2C.encre}" stroke-width="3"/>`;
  if(arcDe != null && mt > arcDe){ // secteur balayé par la grande aiguille (au plus un tour)
    const a0 = (arcDe % 60) * Math.PI / 30, a1 = a0 + Math.min(mt - arcDe, 59.99) * Math.PI / 30, r = R - 6;
    s += `<path d="M${cx} ${cy} L${cx + r * Math.sin(a0)} ${cy - r * Math.cos(a0)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${cx + r * Math.sin(a1)} ${cy - r * Math.cos(a1)} Z" fill="${CE2C.jaune}" fill-opacity=".45"/>`;
  }
  for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, g = i % 5 === 0, r1 = g ? R - 9 : R - 4; s += `<line x1="${cx + r1 * Math.sin(a)}" y1="${cy - r1 * Math.cos(a)}" x2="${cx + R * Math.sin(a)}" y2="${cy - R * Math.cos(a)}" stroke="${CE2C.encre}" stroke-width="${g ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; s += ce2T(cx + (R - 21) * Math.sin(a), cy - (R - 21) * Math.cos(a) + 5, i, { t: 14, g: 700 }); }
  const ah = ((mt / 60) % 12) * Math.PI / 6, am = (mt % 60) * Math.PI / 30;
  s += `<line x1="${cx}" y1="${cy}" x2="${cx + R * .52 * Math.sin(ah)}" y2="${cy - R * .52 * Math.cos(ah)}" stroke="${CE2C.rouge}" stroke-width="6" stroke-linecap="round"/>`;
  s += `<line x1="${cx}" y1="${cy}" x2="${cx + R * .82 * Math.sin(am)}" y2="${cy - R * .82 * Math.cos(am)}" stroke="${CE2C.encre}" stroke-width="3.5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="${CE2C.encre}"/>`;
  return s;
}
const ce2Duree = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ' ' + (m % 60) + ' min' : ''}`;
function ce2AnimHorloge(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: o.legende || 'La grande aiguille tourne : la partie jaune montre le temps qui passe.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], m0 = p.de[0] * 60 + p.de[1], m1 = p.a[0] * 60 + p.a[1], k = cmDoux(cmPhase(t, .12, .88)), mt = Math.round(ce2Mix(m0, m1, k)), ecoule = mt - m0;
      const tours = Math.floor(ecoule / 60), reste = ecoule - tours * 60;
      let s = ce2Horloge(130, 125, 105, mt, m0 + tours * 60);
      s += ce2T(330, 70, ce2Heure(mt), { t: 30, g: 700 }) + ce2T(330, 110, ecoule ? '+ ' + ce2Duree(ecoule) : 'départ', { t: 20, c: CE2C.vert });
      if(tours) s += ce2T(330, 140, `${tours} tour${tours > 1 ? 's' : ''} complet${tours > 1 ? 's' : ''} = ${tours} h`, { t: 13, c: CE2C.gris });
      const texte = t < .12 ? `Il est <b>${ce2Heure(m0)}</b>.` : t < .9 ? `La grande aiguille avance : ${ce2Duree(ecoule)} se sont écoulées.` : (p.fin || `De ${ce2Heure(m0)} à ${ce2Heure(m1)}, il s'écoule <b>${ce2Duree(m1 - m0)}</b>.`);
      return { scene: `<svg viewBox="0 0 440 250" class="cma-svg" style="max-width:440px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Règle graduée : tracer (ou mesurer) un segment, placer son milieu ---------------- */
function ce2Regle(x0, y, cm, K){
  let s = `<rect x="${x0 - 12}" y="${y}" width="${cm * K + 24}" height="44" rx="4" fill="#FFF3D6" stroke="#C9A24A"/>`;
  for(let i = 0; i <= cm * 10; i++){ const x = x0 + i * K / 10, g = i % 10 === 0, m = i % 5 === 0; s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + (g ? 16 : m ? 12 : 7)}" stroke="#8A6D1F" stroke-width="${g ? 1.4 : .7}"/>`; if(g) s += ce2T(x, y + 34, i / 10, { t: 12, c: '#8A6D1F' }); }
  return s;
}
function ce2AnimRegle(id, o){
  const P = o.presets;
  return ce2Film(id, { duree: 8000, legende: o.legende, controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], K = 44, X0 = 30, L = (p.cm + p.mm / 10) * K, Y = 70, W = X0 * 2 + 10 * K, croix = (x, nom, c, k) => `<path d="M${x - 5} ${Y - 5} L${x + 5} ${Y + 5} M${x - 5} ${Y + 5} L${x + 5} ${Y - 5}" stroke="${c || CE2C.rouge}" stroke-width="2.2" opacity="${k}"/>` + ce2T(x, Y - 14, nom, { op: k, t: 15 });
      const lu = k => { const v = Math.round(L * k / K * 10); return `${Math.floor(v / 10)} cm${v % 10 ? ' et ' + (v % 10) + ' mm' : ''}`; };
      const sc = [
        { de: 0, a: .15, dessin: k => `<g transform="translate(0 ${(1 - k) * 40})" opacity="${k}">${ce2Regle(X0, Y + 4, 10, K)}</g>`, texte: 'Je pose la règle.' },
        { de: .16, a: .24, dessin: k => croix(X0, 'A', CE2C.rouge, k), texte: 'Je marque le point A en face du <b>0</b> de la règle.' },
        { de: .26, a: .7, dessin: k => `<line x1="${X0}" y1="${Y}" x2="${X0 + L * k}" y2="${Y}" stroke="${CE2C.encre}" stroke-width="3"/><circle cx="${X0 + L * k}" cy="${Y}" r="3.5" fill="${CE2C.rouge}"/>`, texte: k => `Je trace le long de la règle, sans la faire glisser : ${lu(k)}.` },
        { de: .72, a: .8, dessin: k => croix(X0 + L, 'B', CE2C.rouge, k), texte: p.texteB || `Je m'arrête en face de la bonne graduation : <b>le segment [AB] mesure ${lu(1)}</b>${p.mm ? `, c'est-à-dire ${p.cm * 10 + p.mm} mm` : ''}.` },
      ];
      if(p.milieu) sc.push({ de: .84, a: .97, dessin: k => croix(X0 + L / 2, 'I', CE2C.vert, k) + `<path d="M${X0 + L / 4 - 4} ${Y + 7} L${X0 + L / 4 + 4} ${Y - 7} M${X0 + 3 * L / 4 - 4} ${Y + 7} L${X0 + 3 * L / 4 + 4} ${Y - 7}" stroke="${CE2C.vert}" stroke-width="2" opacity="${k}"/>`, texte: `La moitié de ${p.cm} cm, c'est ${p.cm / 2} cm : le milieu I est en face du ${cmNb(p.cm / 2)}. Les petits traits verts montrent les deux longueurs égales.` });
      return { w: W, h: 130, scenes: sc };
    } });
}

/* ---------------- Partage équitable : on distribue un par un ---------------- */
function ce2AnimPartage(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 9000, legende: o.legende || 'On distribue les jetons un par un, chacun son tour, comme des cartes.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], n = p.parts, q = Math.floor(p.total / n), r = p.total - q * n, dist = q * n;
      const BW = 96, W = Math.max(520, 140 + n * (BW + 14)), cols = 6, pile = i => [20 + (i % cols) * 18, 30 + Math.floor(i / cols) * 18];
      const boite = (j, s) => [150 + j * (BW + 14) + 12 + (s % 4) * 20, 70 + Math.floor(s / 4) * 20];
      let s = '';
      for(let j = 0; j < n; j++) s += `<rect x="${150 + j * (BW + 14)}" y="56" width="${BW}" height="${Math.max(80, (Math.ceil(q / 4) + 1) * 20 + 10)}" rx="8" fill="#F4F7FA" stroke="${CE2C.encre}" stroke-width="1.5"/>` + ce2T(150 + j * (BW + 14) + BW / 2, 46, p.etiq ? p.etiq + ' ' + (j + 1) : 'part ' + (j + 1), { t: 12, c: CE2C.gris });
      let arrives = 0;
      for(let i = 0; i < p.total; i++){
        let [x, y] = pile(i);
        if(i < dist){ const de = .06 + i / dist * .78, k = cmDoux(cmPhase(t, de, de + .78 / dist * 1.6)); const [bx, by] = boite(i % n, Math.floor(i / n)); x = ce2Mix(x, bx, k); y = ce2Mix(y, by, k); if(k >= 1) arrives++; }
        s += `<circle cx="${x}" cy="${y}" r="8" fill="${i >= dist && t > .9 ? CE2C.rouge : CE2C.bleu}" stroke="${CE2C.encre}" stroke-width="1"/>`;
      }
      const tour = Math.floor(arrives / n);
      const texte = t < .06 ? `${p.total} ${p.objets || 'jetons'} à partager en ${n} parts égales.` : t < .9 ? `Tour ${Math.min(q, tour + 1)} : chaque part reçoit un jeton. Déjà ${tour} jeton${tour > 1 ? 's' : ''} par part.`
        : (p.fin || `Chaque part a <b>${q}</b> jetons${r ? ` et il en reste <b>${r}</b> (pas assez pour un autre tour)` : ''} : ${p.total} ÷ ${n} = ${q}${r ? ', reste ' + r : ''}.`);
      const H = Math.max(170, 80 + (Math.ceil(q / 4) + 1) * 20 + 20, 40 + Math.ceil(p.total / cols) * 18);
      return { scene: `<svg viewBox="0 0 ${W} ${H}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Diagramme en barres qui se construit ---------------- */
function ce2AnimDiagramme(id, o){
  return ce2Film(id, { duree: o.duree || 8000, legende: o.legende,
    film: () => {
      const H = 190, X0 = 50, BW = 58, G = 30, n = o.donnees.length, W = X0 + n * (BW + G) + 16, Y = v => 24 + H - v / o.max * H;
      let axes = ''; for(let v = 0; v <= o.max; v += o.pas) axes += `<line x1="${X0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}" stroke="${CE2C.clair}"/>` + ce2T(X0 - 8, Y(v) + 4, v, { a: 'end', t: 12, c: CE2C.gris, g: 500 });
      axes += `<line x1="${X0}" y1="18" x2="${X0}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/><line x1="${X0}" y1="${Y(0)}" x2="${W - 6}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/>` + (o.titre ? ce2T(W / 2, 12, o.titre, { t: 13 }) : '');
      const sc = [{ de: 0, a: .1, dessin: k => `<g opacity="${k}">${axes}</g>`, texte: o.texteAxes || `L'axe vertical est gradué de ${o.pas} en ${o.pas}.` }];
      o.donnees.forEach(([lab, v, c], i) => {
        const [de, fin] = ce2Creneau(i, n, .12, .92), x = X0 + G / 2 + i * (BW + G);
        sc.push({ de, a: fin, dessin: k => `<rect x="${x}" y="${Y(v * k)}" width="${BW}" height="${Y(0) - Y(v * k)}" fill="${c || CE2C.bleu}" fill-opacity=".85" stroke="${CE2C.encre}"/>` + ce2T(x + BW / 2, Y(0) + 18, lab, { t: 12, g: 500 }) + ce2T(x + BW / 2, Y(v) - 6, v, { t: 13, op: k > .95 ? 1 : 0 }),
          texte: `${lab} : la barre monte jusqu'à <b>${v}</b>.` });
      });
      if(o.fin) sc.push({ de: .95, a: 1, texte: o.fin });
      return { w: W, h: H + 56, scenes: sc };
    } });
}

/* ---------------- Le compas trace un cercle ---------------- */
function ce2AnimCompas(id, o){
  const P = o.presets || [{ nom: 'Rayon 3 cm', r: 3 }, { nom: 'Rayon 4 cm', r: 4 }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: 9000, legende: o.legende || 'On écarte le compas sur la règle, puis on trace sans changer l\'écartement.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const r = P[a.etat.p].r, K = 30, R = r * K, cx = 190, cy = 150, W = 470, H = 330;
      let s = ce2Regle(40, 286, 7, K);
      const compas = (px, py, qx, qy) => { const mx = (px + qx) / 2, my = (py + qy) / 2 - 70; return `<line x1="${px}" y1="${py}" x2="${mx}" y2="${my}" stroke="#6B7785" stroke-width="5" stroke-linecap="round"/><line x1="${qx}" y1="${qy}" x2="${mx}" y2="${my}" stroke="#6B7785" stroke-width="5" stroke-linecap="round"/><circle cx="${mx}" cy="${my}" r="7" fill="${CE2C.encre}"/><circle cx="${qx}" cy="${qy}" r="3.5" fill="${CE2C.rouge}"/>`; };
      let texte;
      if(t < .3){ const k = cmDoux(cmPhase(t, .04, .26)); s += compas(40, 286, 40 + R * k, 286); texte = `J'écarte le compas : la pointe sur le 0, la mine sur le ${r}. L'écartement est de <b>${r} cm</b>.`; }
      else {
        s += `<path d="M${cx - 5} ${cy - 5} L${cx + 5} ${cy + 5} M${cx - 5} ${cy + 5} L${cx + 5} ${cy - 5}" stroke="${CE2C.encre}" stroke-width="2"/>` + ce2T(cx - 12, cy - 8, 'O', { t: 14 });
        const k = cmPhase(t, .36, .86), ang = k * 2 * Math.PI;
        if(k > 0) s += `<path d="M${cx + R} ${cy} A${R} ${R} 0 ${ang > Math.PI ? 1 : 0} 1 ${cx + R * Math.cos(ang)} ${cy + R * Math.sin(ang)}" fill="none" stroke="${CE2C.bleu}" stroke-width="3"/>`;
        if(k >= 1) s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${CE2C.bleu}" fill-opacity=".08" stroke="${CE2C.bleu}" stroke-width="3"/>`;
        if(t < .9) s += compas(cx, cy, cx + R * Math.cos(ang), cy + R * Math.sin(ang));
        texte = t < .36 ? 'Je pique la pointe sur le centre O.' : t < .9 ? 'Je tourne le compas en le tenant par le haut, sans changer l\'écartement.' : '';
        if(t >= .9){ const k2 = cmPhase(t, .9, 1); s += `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(-.8)}" y2="${cy + R * Math.sin(-.8)}" stroke="${CE2C.rouge}" stroke-width="2.4" opacity="${k2}"/>` + ce2T(cx + R * .55 * Math.cos(-.8) + 22, cy + R * .55 * Math.sin(-.8), 'rayon', { c: CE2C.rouge, op: k2, t: 13 })
          + `<line x1="${cx - R}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="${CE2C.vert}" stroke-width="2.4" opacity="${k2}"/>` + ce2T(cx - R / 2, cy + 18, 'diamètre', { c: CE2C.vert, op: k2, t: 13 });
          texte = `Le cercle a un <b>rayon de ${r} cm</b> : son <b>diamètre</b> mesure 2 rayons, <b>${2 * r} cm</b>.`; }
      }
      return { scene: `<svg viewBox="0 0 ${W} ${H}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Un angle qui s'ouvre : aigu, droit, obtus ---------------- */
function ce2AnimAngle(id, o){
  o = o || {};
  return cmAnim(id, {
    duree: 9000, legende: o.legende || 'Le côté rouge tourne : l\'angle s\'ouvre de plus en plus.',
    dessin: t => {
      const deg = t < .4 ? ce2Mix(20, 90, cmDoux(cmPhase(t, 0, .4))) : t < .6 ? 90 : ce2Mix(90, 150, cmDoux(cmPhase(t, .6, 1)));
      const S = [200, 200], L = 160, a = deg * Math.PI / 180, B = [S[0] + L * Math.cos(a), S[1] - L * Math.sin(a)], droit = Math.abs(deg - 90) < .5;
      const nom = droit ? 'droit' : deg < 90 ? 'aigu' : 'obtus', c = droit ? CE2C.rouge : deg < 90 ? CE2C.bleu : CE2C.violet;
      let s = `<line x1="${S[0]}" y1="${S[1]}" x2="${S[0] + L}" y2="${S[1]}" stroke="${CE2C.encre}" stroke-width="4" stroke-linecap="round"/><line x1="${S[0]}" y1="${S[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${CE2C.rouge}" stroke-width="4" stroke-linecap="round"/>`;
      if(droit) s += `<polygon points="${S[0]},${S[1]} ${S[0] + 110},${S[1]} ${S[0]},${S[1] - 70}" fill="#9BB7D4" fill-opacity=".35" stroke="#6B88A8"/><path d="M${S[0] + 18} ${S[1]} V${S[1] - 18} H${S[0]}" fill="none" stroke="${CE2C.rouge}" stroke-width="2.4"/>`;
      else s += `<path d="M${S[0] + 34} ${S[1]} A34 34 0 0 0 ${S[0] + 34 * Math.cos(a)} ${S[1] - 34 * Math.sin(a)} Z" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="2"/>`;
      s += ce2T(S[0], S[1] + 24, 'sommet', { t: 12, c: CE2C.gris }) + ce2T(470, 60, 'angle ' + nom, { t: 22, c, a: 'end', g: 700 });
      const texte = droit ? 'Le côté rouge est contre le bord de l\'équerre : c\'est un <b>angle droit</b>. On le code par un petit carré.'
        : deg < 90 ? 'L\'angle est <b>plus petit</b> qu\'un angle droit : c\'est un <b>angle aigu</b>.' : 'L\'angle est <b>plus grand</b> qu\'un angle droit : c\'est un <b>angle obtus</b>.';
      return { scene: `<svg viewBox="0 0 480 230" class="cma-svg" style="max-width:480px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Balance à plateaux ---------------- */
function ce2AnimBalance(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 6500, legende: o.legende || 'On pose un objet sur chaque plateau : le plus lourd fait descendre son plateau.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], [ng, mg, cg] = p.g, [nd, md, cd] = p.d, sens = mg > md ? 1 : mg < md ? -1 : 0;
      const pente = 12 * sens * cmDoux(cmPhase(t, .5, .8)), chute = cmDoux(cmPhase(t, .05, .4));
      const plateau = (x, y, nom, c, kObj, poids) => `<line x1="${x - 34}" y1="${y + 56}" x2="${x}" y2="${y}" stroke="${CE2C.encre}" stroke-width="1.2"/><line x1="${x + 34}" y1="${y + 56}" x2="${x}" y2="${y}" stroke="${CE2C.encre}" stroke-width="1.2"/>`
        + `<g transform="translate(0 ${(1 - kObj) * -90})" opacity="${kObj > 0 ? 1 : 0}"><rect x="${x - 28}" y="${y + 26}" width="56" height="30" rx="6" fill="${c}" stroke="${CE2C.encre}"/>${ce2T(x, y + 46, poids, { t: 11, c: '#fff' })}</g>`
        + `<path d="M${x - 54} ${y + 56} H${x + 54} L${x + 42} ${y + 66} H${x - 42} Z" fill="#C9CBCF" stroke="${CE2C.encre}" stroke-width="1.5"/>` + ce2T(x, y + 86, nom, { t: 13 });
      const s = `<path d="M170 210 H230 L215 190 H185 Z" fill="#8A6D1F"/><line x1="200" y1="190" x2="200" y2="40" stroke="#8A6D1F" stroke-width="6"/>`
        + plateau(90, 40 + pente, ng, cg, chute, p.montrer ? p.g[3] : '') + plateau(310, 40 - pente, nd, cd, chute, p.montrer ? p.d[3] : '')
        + `<line x1="90" y1="${40 + pente}" x2="310" y2="${40 - pente}" stroke="#8A6D1F" stroke-width="6" stroke-linecap="round"/><circle cx="200" cy="40" r="6" fill="${CE2C.encre}"/>`;
      const lourd = sens > 0 ? ng : nd;
      const texte = t < .45 ? 'On pose les deux objets sur les plateaux.' : sens === 0 ? 'La balance reste en <b>équilibre</b> : les deux objets ont <b>la même masse</b>.' : `Le plateau ${sens > 0 ? 'de gauche' : 'de droite'} descend : <b>${lourd}</b> est plus lourd${p.fem ? 'e' : ''}.${p.fin ? ' ' + p.fin : ''}`;
      return { scene: `<svg viewBox="0 0 400 220" class="cma-svg" style="max-width:400px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Remplir des verres avec une bouteille d'un litre ---------------- */
function ce2AnimVerser(id, o){
  const P = o.presets || [{ nom: 'Verres de 20 cL', v: 20 }, { nom: 'Verres de 25 cL', v: 25 }, { nom: 'Verres de 50 cL', v: 50 }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: 9000, legende: o.legende || 'Une bouteille d\'un litre contient 100 cL. On remplit les verres un par un.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const v = P[a.etat.p].v, n = 100 / v, W = 140 + n * 80;
      let verse = 0, s = '';
      for(let i = 0; i < n; i++){ const k = cmPhase(t, .08 + i * .8 / n, .08 + (i + .85) * .8 / n); verse += k * v;
        const x = 130 + i * 80, hv = 70 * v / 50, y = 180 - hv;
        s += `<rect x="${x}" y="${y + hv * (1 - k)}" width="50" height="${hv * k}" fill="${CE2C.bleu}" fill-opacity=".6"/><path d="M${x} ${y - 6} V180 H${x + 50} V${y - 6}" fill="none" stroke="${CE2C.encre}" stroke-width="2"/>` + ce2T(x + 25, 200, k >= 1 ? v + ' cL' : '', { t: 12 }); }
      const reste = 100 - verse, hb = 150 * reste / 100;
      s += `<rect x="30" y="${190 - hb}" width="60" height="${hb}" fill="${CE2C.bleu}" fill-opacity=".6"/><path d="M48 30 V22 H72 V30 Q90 40 90 60 V190 H30 V60 Q30 40 48 30 Z" fill="none" stroke="${CE2C.encre}" stroke-width="2.4"/>` + ce2T(60, 212, Math.round(reste) + ' cL', { t: 13 });
      const plein = Math.floor(verse / v + 1e-6);
      const texte = t < .08 ? 'La bouteille est pleine : <b>1 L = 100 cL</b>.' : t < .9 ? `${plein} verre${plein > 1 ? 's' : ''} rempli${plein > 1 ? 's' : ''} : il reste ${Math.round(reste)} cL dans la bouteille.` : `Avec 1 L, on remplit <b>${n} verres de ${v} cL</b>, car ${n} × ${v} cL = 100 cL.`;
      return { scene: `<svg viewBox="0 0 ${W} 220" class="cma-svg" style="max-width:${W}px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Fractions égales : on recoupe chaque part ---------------- */
function ce2AnimFracEgales(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: o.legende || 'On partage chaque part en parts plus petites : la quantité coloriée ne change pas.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const { n, k, f } = P[a.etat.p], L = 420, H = 60, X = 20, c1 = cmPhase(t, .3, .7), N = n * f;
      let s = '';
      for(let i = 0; i < n; i++) s += `<rect x="${X + i * L / n}" y="20" width="${L / n}" height="${H}" fill="${i < k ? CE2C.rouge : '#fff'}" fill-opacity="${i < k ? .7 : 1}"/>`;
      for(let i = 1; i < n; i++) s += `<line x1="${X + i * L / n}" y1="20" x2="${X + i * L / n}" y2="${20 + H}" stroke="${CE2C.encre}" stroke-width="2.6"/>`;
      for(let j = 1; j < N; j++) if(j % f){ const de = (j - 1) / N; if(c1 > de) s += `<line x1="${X + j * L / N}" y1="20" x2="${X + j * L / N}" y2="${20 + H * Math.min(1, (c1 - de) * N)}" stroke="${CE2C.encre}" stroke-width="1.4" stroke-dasharray="4 3"/>`; }
      s += `<rect x="${X}" y="20" width="${L}" height="${H}" fill="none" stroke="${CE2C.encre}" stroke-width="2.6"/>`;
      const texte = t < .3 ? `On a colorié ${cm1Frac(k, n)} de la bande : ${k} part${k > 1 ? 's' : ''} sur ${n}.`
        : t < .75 ? `On partage chaque part en ${f} : les parts sont ${f} fois plus petites, il y en a ${N}.`
        : `On a colorié ${k * f} parts sur ${N} : ${cm1Frac(k, n)} = ${cm1Frac(k * f, N)}. Des parts ${f} fois plus petites, ${f} fois plus de parts : la même quantité.`;
      return { scene: `<svg viewBox="0 0 460 100" class="cma-svg" style="max-width:460px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Additionner (ou comparer) des fractions de même dénominateur ---------------- */
function ce2AnimFracAdd(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 8000, legende: o.legende || 'Les parts rouges viennent se placer à la suite des parts bleues.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const { n, x, y } = P[a.etat.p], L = 400, H = 44, X = 70, w = L / n, k = cmDoux(cmPhase(t, .3, .75));
      const bande = (yy, lab) => { let s = ''; for(let i = 0; i < n; i++) s += `<rect x="${X + i * w}" y="${yy}" width="${w}" height="${H}" fill="#fff" stroke="${CE2C.encre}" stroke-width="1.6"/>`; return s + ce2T(X - 12, yy + H / 2 + 5, lab, { a: 'end', t: 13, c: CE2C.gris }); };
      let s = bande(20, 'bande 1') + bande(110, 'bande 2');
      for(let i = 0; i < x; i++) s += `<rect x="${X + i * w}" y="20" width="${w}" height="${H}" fill="${CE2C.bleu}" fill-opacity=".75" stroke="${CE2C.encre}" stroke-width="1.6"/>`;
      for(let i = 0; i < y; i++) s += `<rect x="${X + ce2Mix(i, x + i, k) * w}" y="${ce2Mix(110, 20, k)}" width="${w}" height="${H}" fill="${CE2C.rouge}" fill-opacity=".75" stroke="${CE2C.encre}" stroke-width="1.6"/>`;
      const texte = t < .3 ? `${cm1Frac(x, n)} en bleu, ${cm1Frac(y, n)} en rouge : des ${n === 2 ? 'demis' : n === 3 ? 'tiers' : n === 4 ? 'quarts' : n + '<sup>es</sup>'} dans les deux cas.`
        : t < .8 ? `On met les parts ensemble : ${x} part${x > 1 ? 's' : ''} et encore ${y}.` : `${cm1Frac(x, n)} + ${cm1Frac(y, n)} = ${cm1Frac(x + y, n)} : on ajoute les parts, le dénominateur ne change pas.`;
      return { scene: `<svg viewBox="0 0 490 170" class="cma-svg" style="max-width:490px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Arbre des possibilités qui pousse ----------------
   niveaux : [{ nom, choix: [[étiquette, couleur]] }] */
function ce2AnimArbre(id, o){
  return ce2Film(id, { duree: o.duree || 10000, legende: o.legende,
    film: () => {
      const N = o.niveaux, total = N.reduce((p, n) => p * n.choix.length, 1), PAS = 22, H = total * PAS + 20, W = 140 + N.length * 150;
      const xs = N.map((_, i) => 30 + (i + 1) * 150), sc = [];
      const noeuds = []; // par niveau : [{ y, lab, c, py }]
      N.forEach((niv, i) => {
        const avant = i ? noeuds[i - 1] : [{ y: H / 2 }], sous = N.slice(i + 1).reduce((p, n) => p * n.choix.length, 1), liste = [];
        avant.forEach((par, pi) => niv.choix.forEach(([lab, c], j) => { const idx = pi * niv.choix.length + j; liste.push({ y: 14 + (idx * sous + (sous - 1) / 2) * PAS, lab, c, py: par.y, px: i ? xs[i - 1] : 30 }); }));
        noeuds.push(liste);
        const [de, fin] = ce2Creneau(i, N.length, .03, .9);
        const nbAvant = avant.length, nb = liste.length;
        sc.push({ de, a: fin, dessin: k => liste.map(p => ce2Trace(`M${p.px + (i ? 64 : 0)} ${p.py} L${xs[i] - 8} ${p.y}`, k, { c: CE2C.clair, l: 1.4 }) + `<circle cx="${xs[i]}" cy="${p.y}" r="6" fill="${p.c}" opacity="${k}"/>` + ce2T(xs[i] + 10, p.y + 4, p.lab, { a: 'start', t: 12, g: 500, op: k })).join(''),
          texte: i === 0 ? `${niv.nom} : ${nb} choix.` : `Pour chacun des ${nbAvant} début${nbAvant > 1 ? 's' : ''}, ${niv.choix.length} choix de ${niv.nom.toLowerCase()} : ${nbAvant} × ${niv.choix.length} = <b>${nb}</b>.` });
      });
      if(o.fin) sc.push({ de: .93, a: 1, texte: o.fin });
      return { w: W, h: H, scenes: sc };
    } });
}

/* ---------------- Un polygone qu'on trace côté après côté ---------------- */
function ce2AnimPolygone(id, o){
  const P = o.presets || [
    { nom: 'Triangle', pts: [[80, 200], [200, 40], [320, 200]], mot: 'un triangle' },
    { nom: 'Quadrilatère', pts: [[70, 190], [110, 50], [300, 40], [330, 200]], mot: 'un quadrilatère' },
    { nom: 'Pentagone', pts: [[200, 30], [330, 120], [280, 210], [120, 210], [70, 120]], mot: 'un pentagone' },
    { nom: 'Hexagone', pts: [[140, 30], [260, 30], [330, 120], [260, 210], [140, 210], [70, 120]], mot: 'un hexagone' }];
  return ce2Film(id, { duree: 8000, legende: o.legende || 'On trace les côtés un par un, puis on compte les sommets.', controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], n = p.pts.length, sc = [];
      p.pts.forEach((A, i) => { const B = p.pts[(i + 1) % n], [de, fin] = ce2Creneau(i, n, .02, .7);
        sc.push({ de, a: fin, dessin: k => ce2Trace(`M${A[0]} ${A[1]} L${B[0]} ${B[1]}`, k, { c: CE2C.encre, l: 3 }) + ce2T((A[0] + B[0]) / 2 + (A[1] - B[1]) * .12, (A[1] + B[1]) / 2 + (B[0] - A[0]) * .12 + 5, 'côté ' + (i + 1), { t: 11, c: CE2C.gris, op: k }), texte: `Je trace le côté ${i + 1}.` }); });
      p.pts.forEach((A, i) => { const [de, fin] = ce2Creneau(i, n, .72, .95);
        sc.push({ de, a: fin, dessin: k => `<circle cx="${A[0]}" cy="${A[1]}" r="${7 * k}" fill="${CE2C.rouge}"/>`, texte: `Sommet ${i + 1}.` }); });
      sc.push({ de: .96, a: 1, dessin: k => `<polygon points="${p.pts.map(q => q.join(',')).join(' ')}" fill="${CE2C.bleu}" fill-opacity="${.15 * k}"/>`, texte: `${n} côtés et ${n} sommets : c'est <b>${p.mot}</b>.` });
      return { w: 400, h: 240, scenes: sc };
    } });
}

/* ---------------- Matériel de numération : milliers, centaines, dizaines, unités ---------------- */
function ce2AnimNumeration(id, o){
  const P = o.presets;
  return ce2Film(id, { duree: 9000, legende: o.legende || 'Un millier = 10 centaines, une centaine = 10 dizaines, une dizaine = 10 unités.', controles: a => ce2Choix(id, P, a),
    film: a => {
      const n = P[a.etat.p].n, [m, c, d, u] = String(n).padStart(4, '0').split('').map(Number), sc = [];
      const cube = (x, y) => { let s = `<rect x="${x}" y="${y}" width="54" height="54" fill="${CE2C.violet}" fill-opacity=".35" stroke="${CE2C.violet}" stroke-width="1.6"/>`; for(let i = 1; i < 10; i++) s += `<line x1="${x + i * 5.4}" y1="${y}" x2="${x + i * 5.4}" y2="${y + 54}" stroke="${CE2C.violet}" stroke-width=".4"/><line x1="${x}" y1="${y + i * 5.4}" x2="${x + 54}" y2="${y + i * 5.4}" stroke="${CE2C.violet}" stroke-width=".4"/>`; return s + `<polygon points="${x},${y} ${x + 10},${y - 10} ${x + 64},${y - 10} ${x + 54},${y}" fill="${CE2C.violet}" fill-opacity=".55"/><polygon points="${x + 54},${y} ${x + 64},${y - 10} ${x + 64},${y + 44} ${x + 54},${y + 54}" fill="${CE2C.violet}" fill-opacity=".7"/>`; };
      const plaque = (x, y) => { let s = `<rect x="${x}" y="${y}" width="40" height="40" fill="${CE2C.bleu}" fill-opacity=".35" stroke="${CE2C.bleu}" stroke-width="1.4"/>`; for(let i = 1; i < 10; i++) s += `<line x1="${x + i * 4}" y1="${y}" x2="${x + i * 4}" y2="${y + 40}" stroke="${CE2C.bleu}" stroke-width=".4"/><line x1="${x}" y1="${y + i * 4}" x2="${x + 40}" y2="${y + i * 4}" stroke="${CE2C.bleu}" stroke-width=".4"/>`; return s; };
      const barre = (x, y) => `<rect x="${x}" y="${y}" width="5" height="40" fill="${CE2C.vert}" fill-opacity=".5" stroke="${CE2C.vert}" stroke-width="1.2"/>`;
      const unite = (x, y) => `<rect x="${x}" y="${y}" width="6" height="6" fill="${CE2C.rouge}" fill-opacity=".7" stroke="${CE2C.rouge}"/>`;
      const groupes = [[m, 'millier', 'milliers', 1000, (i, x0) => cube(x0 + (i % 2) * 70, 40 + Math.floor(i / 2) * 70), 160, CE2C.violet],
        [c, 'centaine', 'centaines', 100, (i, x0) => plaque(x0 + (i % 3) * 46, 40 + Math.floor(i / 3) * 46), 150, CE2C.bleu],
        [d, 'dizaine', 'dizaines', 10, (i, x0) => barre(x0 + (i % 5) * 10, 40 + Math.floor(i / 5) * 48), 70, CE2C.vert],
        [u, 'unité', 'unités', 1, (i, x0) => unite(x0 + (i % 3) * 10, 40 + Math.floor(i / 3) * 10), 50, CE2C.rouge]];
      let x0 = 16; const parts = [];
      groupes.forEach(([q, s1, sp, v, f, w, col], gi) => { const xx = x0, [de, fin] = ce2Creneau(gi, 4, .02, .86);
        sc.push({ de, a: fin, dessin: k => { let s = ce2T(xx + w / 2 - 10, 22, `${q} ${q > 1 ? sp : s1}`, { t: 13, c: col, op: Math.min(1, k * 3) }); const vis = Math.round(q * k); for(let i = 0; i < vis; i++) s += f(i, xx); return s; },
          texte: `<b>${q}</b> ${q > 1 ? sp : s1}${q ? ` : ${ce2Nb(q * v)}` : ''}.` });
        parts.push(ce2Nb(q * v)); x0 += w + 18; });
      sc.push({ de: .9, a: 1, texte: `<b>${ce2Nb(n)}</b> = ${parts.filter(x => x !== '0').join(' + ')}` });
      return { w: x0, h: 220, scenes: sc };
    } });
}

/* ---------------- Une bande unité qu'on plie : graduer en quarts, puis mesurer ---------------- */
function ce2AnimBandeUnite(id, o){
  const P = o.presets || [{ nom: 'Trois quarts', q: 3 }, { nom: 'Un demi', q: 2 }, { nom: 'Une unité et un quart', q: 5 }];
  return ce2Film(id, { duree: 10000, legende: o.legende || 'On plie l\'unité en deux, puis encore en deux : on obtient des quarts d\'unité.', controles: a => ce2Choix(id, P, a),
    film: a => {
      const q = P[a.etat.p].q, U = 220, X = 30, Y = 40, W = X * 2 + 2 * U + 10;
      const grad = (x, lab, k, haut) => `<line x1="${x}" y1="${Y}" x2="${x}" y2="${Y + (haut || 30)}" stroke="${CE2C.encre}" stroke-width="2" opacity="${k}"/>` + (lab || '');
      const sc = [
        { de: 0, a: .1, dessin: k => `<rect x="${X}" y="${Y}" width="${U}" height="30" fill="${CE2C.jaune}" fill-opacity=".45" stroke="${CE2C.encre}" stroke-width="2" opacity="${k}"/>` + ce2T(X, Y + 50, '0', { op: k }) + ce2T(X + U, Y + 50, '1', { op: k }), texte: 'Voici l\'<b>unité</b> : une bande de papier.' },
        { de: .12, a: .3, dessin: k => grad(X + U / 2, ce2FracSvg(X + U / 2, Y + 50, 1, 2, {}), k), texte: 'Je plie la bande en deux : le pli est au milieu, à un demi d\'unité.' },
        { de: .32, a: .5, dessin: k => grad(X + U / 4, ce2FracSvg(X + U / 4, Y + 50, 1, 4, {}), k) + grad(X + 3 * U / 4, ce2FracSvg(X + 3 * U / 4, Y + 50, 3, 4, {}), k), texte: `Je plie encore en deux : l'unité est partagée en <b>4 quarts</b>. ${cm1Frac(1, 2)} = ${cm1Frac(2, 4)}.` },
        { de: .52, a: .62, dessin: k => `<g opacity="${k}"><rect x="${X + U}" y="${Y}" width="${U}" height="30" fill="${CE2C.jaune}" fill-opacity=".25" stroke="${CE2C.encre}" stroke-width="2"/>${[1, 2, 3].map(i => grad(X + U + i * U / 4, '', 1)).join('')}${ce2T(X + 2 * U, Y + 50, '2')}</g>`, texte: 'Je reporte les graduations sur une deuxième unité : j\'ai une règle graduée en quarts.' },
        { de: .66, a: .9, dessin: k => `<rect x="${X + ce2Mix(-U, 0, k)}" y="${Y + 76}" width="${q * U / 4}" height="22" rx="3" fill="${CE2C.rouge}" fill-opacity=".8" stroke="${CE2C.encre}"/><line x1="${X + q * U / 4}" y1="${Y}" x2="${X + q * U / 4}" y2="${Y + 100}" stroke="${CE2C.rouge}" stroke-dasharray="4 3" opacity="${k >= 1 ? 1 : 0}"/>`, texte: 'Je pose la bande rouge contre la règle, au départ du 0.' },
        { de: .93, a: 1, texte: q < 4 ? `La bande rouge mesure ${cm1Frac(q, 4)} d'unité${q === 2 ? `, c'est-à-dire ${cm1Frac(1, 2)} unité` : ''}.` : `La bande rouge mesure 1 unité et ${cm1Frac(q - 4, 4)} d'unité.` },
      ];
      return { w: W, h: 160, scenes: sc };
    } });
}

/* ---------------- Symétrie sur quadrillage : sommet par sommet ----------------
   presets : [{ nom, n, m, pts: [[col, lig]], axe: { v: col } ou { h: lig } }] */
function ce2AnimSymQuad(id, o){
  const P = o.presets;
  return ce2Film(id, { duree: 10000, legende: o.legende || 'Chaque sommet a son image de l\'autre côté de l\'axe, à la même distance : on compte les carreaux.', controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], K = 28, M = 10, W = p.n * K + 2 * M, H = p.m * K + 2 * M, X = x => M + x * K, Y = y => M + y * K;
      const im = ([x, y]) => p.axe.v != null ? [2 * p.axe.v - x, y] : [x, 2 * p.axe.h - y];
      let g = ''; for(let i = 0; i <= p.n; i++) g += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(p.m)}" stroke="${CE2C.clair}"/>`; for(let j = 0; j <= p.m; j++) g += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(p.n)}" y2="${Y(j)}" stroke="${CE2C.clair}"/>`;
      g += p.axe.v != null ? `<line x1="${X(p.axe.v)}" y1="${Y(0) - 6}" x2="${X(p.axe.v)}" y2="${Y(p.m) + 6}" stroke="${CE2C.rouge}" stroke-width="2.4" stroke-dasharray="7 5"/>` : `<line x1="${X(0) - 6}" y1="${Y(p.axe.h)}" x2="${X(p.n) + 6}" y2="${Y(p.axe.h)}" stroke="${CE2C.rouge}" stroke-width="2.4" stroke-dasharray="7 5"/>`;
      const poly = (pts, c, k, tir) => `<polygon points="${pts.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="${c}" fill-opacity="${.25 * k}" stroke="${c}" stroke-width="2.6" opacity="${k}"${tir ? ' stroke-dasharray="6 4"' : ''}/>`;
      const sc = [{ de: 0, a: .08, dessin: k => g + poly(p.pts, CE2C.vert, k), texte: 'Voici la figure et l\'axe de symétrie (en rouge).' }];
      const uniques = p.pts.filter((q, i) => p.pts.findIndex(r => r[0] === q[0] && r[1] === q[1]) === i);
      uniques.forEach((A, i) => {
        const B = im(A), [de, fin] = ce2Creneau(i, uniques.length, .1, .86), d = p.axe.v != null ? Math.abs(A[0] - p.axe.v) : Math.abs(A[1] - p.axe.h);
        sc.push({ de, a: fin, dessin: k => `<circle cx="${X(A[0])}" cy="${Y(A[1])}" r="5" fill="${CE2C.vert}"/>` + (d ? ce2Trace(`M${X(A[0])} ${Y(A[1])} L${X(B[0])} ${Y(B[1])}`, k, { c: CE2C.violet, l: 1.6 }) : '') + `<circle cx="${X(B[0])}" cy="${Y(B[1])}" r="5" fill="${CE2C.violet}" opacity="${k >= 1 ? 1 : 0}"/>`,
          texte: d ? `Ce sommet est à <b>${d} carreau${d > 1 ? 'x' : ''}</b> de l'axe : son image est à ${d} carreau${d > 1 ? 'x' : ''} de l'autre côté.` : 'Ce sommet est sur l\'axe : il est sa propre image.' });
      });
      sc.push({ de: .88, a: 1, dessin: k => poly(p.pts.map(im), CE2C.violet, k), texte: 'On relie les images dans le même ordre : la figure est complétée par symétrie.' });
      return { w: W, h: H, scenes: sc };
    } });
}

/* ---------------- Périmètre : reporter les côtés bout à bout sur une droite ---------------- */
function ce2AnimReport(id, o){
  o = o || {};
  const tri = o.pts || [[60, 150], [190, 150], [140, 60]];
  return cmAnim(id, {
    duree: 9000, legende: o.legende || 'Chaque côté vient se poser à la suite du précédent, sur la droite : on obtient la longueur du tour.',
    dessin: t => {
      const cotes = tri.map((A, i) => [A, tri[(i + 1) % tri.length]]), Y = 220, cols = [CE2C.rouge, CE2C.bleu, CE2C.vert, CE2C.violet];
      let s = `<line x1="20" y1="${Y}" x2="560" y2="${Y}" stroke="${CE2C.gris}" stroke-width="1.4"/><polygon points="${tri.map(p => p.join(',')).join(' ')}" fill="${CE2C.jaune}" fill-opacity=".15" stroke="${CE2C.clair}" stroke-width="2"/>`, x = 40, texte = 'Voici la figure. On va mettre ses côtés bout à bout.';
      cotes.forEach(([A, B], i) => {
        const L = Math.hypot(B[0] - A[0], B[1] - A[1]), [de, fin] = ce2Creneau(i, cotes.length, .08, .85), k = cmDoux(cmPhase(t, de, fin));
        const P1 = [ce2Mix(A[0], x, k), ce2Mix(A[1], Y, k)], P2 = [ce2Mix(B[0], x + L, k), ce2Mix(B[1], Y, k)];
        s += `<line x1="${P1[0]}" y1="${P1[1]}" x2="${P2[0]}" y2="${P2[1]}" stroke="${cols[i]}" stroke-width="5" stroke-linecap="round"/>`;
        if(t >= de) texte = `On reporte le côté ${i + 1} au compas, à la suite${i ? ' des autres' : ''}.`;
        x += L;
      });
      if(t > .88){ s += `<path d="M40 ${Y + 10} V${Y + 22} H${x} V${Y + 10}" fill="none" stroke="${CE2C.encre}" stroke-width="1.6"/>` + ce2T((40 + x) / 2, Y + 40, 'le périmètre', { t: 14 }); texte = 'Le segment obtenu a la même longueur que le <b>tour de la figure</b> : c\'est son <b>périmètre</b>.'; }
      return { scene: `<svg viewBox="0 0 580 270" class="cma-svg" style="max-width:580px;">${s}</svg>`, texte };
    } });
}

/* ---------------- Glisse-nombre avec virgule : × ou ÷ 10, 100, 1 000 (CM1, CM2) ----------------
   presets : [{ nom, n: '4,27', f: 10, op: '×' | '÷' }]. Les chiffres glissent de rang en rang ; la
   virgule reste en place ; les zéros nécessaires apparaissent en rouge. */
function cmAnimGlisseDec(id, o){
  const P = o.presets, RANGS = [3, 2, 1, 0, -1, -2, -3], NOMS = { 3: 'milliers', 2: 'centaines', 1: 'dizaines', 0: 'unités', '-1': 'dixièmes', '-2': 'centièmes', '-3': 'millièmes' };
  return ce2Film(id, { duree: 7500, legende: o.legende || 'La virgule ne bouge pas : ce sont les chiffres qui glissent vers la gauche (×) ou vers la droite (÷).', controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], [e, d = ''] = String(p.n).split(','), dec = Math.round(Math.log10(p.f)), sh = p.op === '÷' ? -dec : dec;
      const ent = e.replace(/^0+/, ''), zeroDepart = !ent; // « 0,56 » : le 0 des unités ne glisse pas, il s'efface
      const chiffres = [...ent].map((c, i) => ({ c, r: ent.length - 1 - i })).concat([...d].map((c, i) => ({ c, r: -1 - i })));
      const CW = 70, X0 = 14, VG = 18, colX = r => X0 + (3 - r) * CW + CW / 2 + (r < 0 ? VG : 0), W = X0 * 2 + 7 * CW + VG;
      const occ = new Set(chiffres.map(x => x.r + sh)), hi = Math.max(...occ), lo = Math.min(...occ), zeros = [];
      for(let r = Math.min(lo, 0); r <= Math.max(hi, 0); r++) if(!occ.has(r) && (r >= 0 || r > lo)) zeros.push(r);
      // Résultat écrit : chiffres décalés et zéros utiles (à gauche de la virgule jusqu'aux unités, entre les chiffres).
      const res = {}; chiffres.forEach(x => res[x.r + sh] = x.c); zeros.forEach(r => res[r] = '0');
      const rs = Object.keys(res).map(Number), top = Math.max(...rs, 0), bas = Math.min(...rs, 0);
      let txt = ''; for(let r = top; r >= bas; r--){ txt += res[r] ?? '0'; if(r === 0 && bas < 0) txt += ','; if(r === 3 && top >= 3) txt += ' '; }
      let fond = '';
      RANGS.forEach(r => { const x = colX(r) - CW / 2; fond += `<rect x="${x}" y="20" width="${CW}" height="30" fill="${r >= 0 ? CE2C.encre : CE2C.violet}" stroke="#fff"/>` + ce2T(x + CW / 2, 40, NOMS[r], { c: '#fff', t: 11 }) + `<rect x="${x}" y="50" width="${CW}" height="56" fill="#fff" stroke="${CE2C.encre}"/>`; });
      fond += ce2T(colX(0) + CW / 2 + VG / 2, 92, ',', { t: 34, g: 700, c: CE2C.rouge });
      const lu = p.op === '÷' ? 'plus petite' : 'plus grande', sens = p.op === '÷' ? 'la droite' : 'la gauche';
      return { w: W, h: 150, scenes: [
        { de: 0, a: .1, dessin: () => fond, texte: `Voici <b>${p.n}</b> dans le tableau.` },
        { de: 0, a: .11, dessin: k => k < 1 ? (zeroDepart ? ce2T(colX(0), 90, '0', { t: 32, g: 700 }) : '') + chiffres.map(x => ce2T(colX(x.r), 90, x.c, { t: 32, g: 700 })).join('') : '' },
        { de: .12, a: .62, dessin: k => (zeroDepart ? ce2T(colX(0), 90, '0', { t: 32, g: 700, op: 1 - k }) : '') + chiffres.map(x => ce2T(ce2Mix(colX(x.r), colX(x.r + sh), k), 90, x.c, { t: 32, g: 700 })).join(''), texte: `${p.op === '÷' ? 'On divise' : 'On multiplie'} par ${ce2Nb(p.f)} : chaque chiffre prend une valeur ${ce2Nb(p.f)} fois ${lu} et glisse de ${dec} rang${dec > 1 ? 's' : ''} vers ${sens}.` },
        { de: .66, a: .8, dessin: k => zeros.map(r => ce2T(colX(r), 90, '0', { t: 32, g: 700, c: CE2C.rouge, op: k })).join(''), texte: zeros.length ? 'On écrit les zéros nécessaires (en rouge).' : 'Aucun zéro à ajouter.' },
        { de: .84, a: 1, dessin: k => ce2T(W / 2, 140, `${p.n} ${p.op} ${ce2Nb(p.f)} = ${txt}`, { t: 18, c: CE2C.vert, op: k }), texte: `<b>${p.n} ${p.op} ${ce2Nb(p.f)} = ${txt}</b>` },
      ] };
    } });
}

/* ---------------- Paver un rectangle avec des carrés unités, ligne par ligne (aires) ----------------
   presets : [{ nom, l: lignes, c: colonnes, unite: 'carreaux' | 'cm²' }] */
function cmAnimPaver(id, o){
  const P = o.presets;
  return ce2Film(id, { duree: 8000, legende: o.legende || 'On recouvre le rectangle de carrés unités, ligne par ligne, puis on compte.', controles: a => ce2Choix(id, P, a),
    film: a => {
      const p = P[a.etat.p], K = Math.min(40, 360 / p.c), X0 = 20, Y0 = 16, W = X0 * 2 + p.c * K + 60, H = Y0 * 2 + p.l * K + 30, u = p.unite || 'carreaux';
      const sc = [{ de: 0, a: .08, dessin: k => `<rect x="${X0}" y="${Y0}" width="${p.c * K}" height="${p.l * K}" fill="none" stroke="${CE2C.encre}" stroke-width="2.5" opacity="${k}"/>`, texte: `Un rectangle de ${p.c} sur ${p.l}${u === 'cm²' ? ' cm' : ' carreaux'}.` }];
      for(let i = 0; i < p.l; i++){ const [de, fin] = ce2Creneau(i, p.l, .1, .85);
        sc.push({ de, a: fin, dessin: k => { let s = ''; const n = Math.round(p.c * k); for(let j = 0; j < n; j++) s += `<rect x="${X0 + j * K + 1}" y="${Y0 + i * K + 1}" width="${K - 2}" height="${K - 2}" fill="${i % 2 ? CE2C.bleu : CE2C.vert}" fill-opacity=".45" stroke="${CE2C.encre}" stroke-width=".8"/>`; return s + (k >= 1 ? ce2T(X0 + p.c * K + 30, Y0 + i * K + K / 2 + 5, p.c, { t: 13, c: CE2C.gris }) : ''); },
          texte: `${i + 1} ligne${i ? 's' : ''} de ${p.c} ${u === 'cm²' ? 'carrés de 1 cm²' : 'carreaux'} : ${i ? Array(i + 1).fill(p.c).join(' + ') + ' = ' : ''}${(i + 1) * p.c}.` });
      }
      sc.push({ de: .9, a: 1, texte: `${p.l} lignes de ${p.c} : ${p.l} × ${p.c} = <b>${p.l * p.c} ${u}</b>. C'est l'aire du rectangle.` });
      return { w: W, h: H, scenes: sc };
    } });
}

/* ---------------- Tirages au hasard dans un sac (probabilités) ----------------
   presets : [{ nom, billes: [[couleur, nombre, code couleur]], n: nombre de tirages }]. Tirages
   pseudo-aléatoires mais toujours les mêmes à la relecture (graine fixe). */
function cmAnimTirages(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 10000, legende: o.legende || 'On tire une bille au hasard, on note sa couleur, on la remet dans le sac… et on recommence.', controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], N = p.n || 40, total = p.billes.reduce((s, b) => s + b[1], 0);
      let g = 12345 + a.etat.p * 77; const rnd = () => (g = (g * 1103515245 + 12345) % 2147483648) / 2147483648;
      const tirs = Array.from({ length: N }, () => { let r = rnd() * total; for(const b of p.billes){ if(r < b[1]) return b; r -= b[1]; } return p.billes[0]; });
      const fait = Math.floor(cmPhase(t, .05, .95) * N + 1e-6), compte = p.billes.map(b => tirs.slice(0, fait).filter(x => x === b).length);
      let s = `<path d="M30 70 Q30 40 60 40 H140 Q170 40 170 70 V170 Q170 190 150 190 H50 Q30 190 30 170 Z" fill="#E9DCC5" stroke="#8A6D1F" stroke-width="2"/>`;
      let k = 0; p.billes.forEach(([nom, nb, c]) => { for(let i = 0; i < nb; i++, k++) s += `<circle cx="${52 + (k % 6) * 19}" cy="${80 + Math.floor(k / 6) * 19}" r="8" fill="${c}" stroke="${CE2C.encre}" stroke-width=".8"/>`; });
      if(fait > 0){ const d = tirs[fait - 1]; s += `<circle cx="215" cy="70" r="14" fill="${d[2]}" stroke="${CE2C.encre}" stroke-width="1.4"/>` + ce2T(215, 105, 'tirée', { t: 11, c: CE2C.gris }); }
      const X0 = 270, maxH = 140, maxC = Math.max(N * .8, 1);
      p.billes.forEach(([nom, nb, c], i) => { const h = compte[i] / maxC * maxH, x = X0 + i * 70;
        s += `<rect x="${x}" y="${190 - h}" width="44" height="${h}" fill="${c}" fill-opacity=".85" stroke="${CE2C.encre}"/>` + ce2T(x + 22, 186 - h, compte[i], { t: 13 }) + ce2T(x + 22, 208, nom, { t: 12, g: 500 }); });
      s += `<line x1="${X0 - 8}" y1="190" x2="${X0 + p.billes.length * 70}" y2="190" stroke="${CE2C.encre}" stroke-width="1.5"/>`;
      const texte = fait === 0 ? `Dans le sac : ${p.billes.map(b => `${b[1]} ${b[0]}${b[1] > 1 ? 's' : ''}`).join(', ')}.`
        : t < .95 ? `${fait} tirage${fait > 1 ? 's' : ''} : ${p.billes.map((b, i) => `${compte[i]} ${b[0]}${compte[i] > 1 ? 's' : ''}`).join(', ')}.`
        : (p.fin || `Après ${N} tirages : ${p.billes.map((b, i) => `${compte[i]} ${b[0]}${compte[i] > 1 ? 's' : ''}`).join(', ')}. La couleur qui a le plus de billes sort le plus souvent… mais pas à tous les coups !`);
      return { scene: `<svg viewBox="0 0 ${Math.max(480, X0 + p.billes.length * 70 + 10)} 220" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}
