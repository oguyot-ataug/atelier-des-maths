/* =====================================================================
   questionnaires-fractions.js -- Question « Fraction d'une figure »

   Demandé : « Reconnaître les parts coloriées et remplir les parts… Il faut ce genre d'exercices en
   nombre. Dans la création de questionnaires, il faut aussi ce genre d'exercices. »

   - Figure (fractions-figures.js) : disque, rectangle de carreaux, bande, hexagone, triangle, carré
     partagé en 4 ou en 8 triangles.
   - Deux sortes de questions :
       « lire » : la figure est coloriée, l'élève écrit la fraction (numérateur et dénominateur) ;
                  une fraction égale est acceptée, sauf si le professeur exige le nombre de parts ;
       « colorier » : l'élève touche les parts à colorier ; il doit colorier autant de parts que la
                  fraction demandée (n'importe lesquelles).
   - « Une fraction différente pour chaque élève » : la fraction (et les parts coloriées) est tirée
     d'une graine propre à l'élève, gardée dans sa réponse (rep.s) -- comme le tracé sur quadrillage.

   Rien de secret : la figure et la fraction demandée font partie de l'énoncé ; la réponse se déduit
   de la figure, la correction est faite sur l'appareil du professeur comme pour les autres types.
   Réponse : lire { n, d, s? } ; colorier { c: [parts], s? }.
   Dépend de questionnaires.js (QZ_EXT, QZ_TYPES, qzP, qzEdQ, qzEdRender, qzSaisieValeur, qzModifie,
   qzEsc, qzMath…), questionnaires-interactif.js (qziSet, qziQ, qziObj) et fractions-figures.js (FRF).
   ===================================================================== */

const QZFF_FORMES = { disque: 'Disque', rect: 'Rectangle de carreaux', barre: 'Bande', hexagone: 'Hexagone (6 parts)', triangle: 'Triangle', carre4: 'Carré en 4 triangles', carre8: 'Carré en 8 triangles' };
const QZFF_NOMS = { disque: 'du disque', rect: 'du rectangle', barre: 'de la bande', hexagone: 'de l\'hexagone', triangle: 'du triangle', carre4: 'du carré', carre8: 'du carré' };
const QZFF_ENONCE = { lire: 'Quelle fraction de la figure est coloriée ?', colorier: 'Colorie la fraction de la figure qui est demandée.' };

function qzffConf(q){ return Object.assign({ forme: 'disque', n: 8, l: 3, c: 4, k: 3, mode: 'lire', colories: [], cible: '3/8', varie: false, exacte: false, simplifie: false }, q.ff || {}); }
function qzffFig(ff){
  const b = (v, a, z, d) => Math.max(a, Math.min(z, parseInt(v, 10) || d));
  if(ff.forme === 'rect') return { forme: 'rect', l: b(ff.l, 1, 8, 3), c: b(ff.c, 1, 10, 4) };
  if(ff.forme === 'triangle') return { forme: 'triangle', k: b(ff.k, 2, 4, 3) };
  if(ff.forme === 'disque' || ff.forme === 'barre') return { forme: ff.forme, n: b(ff.n, 2, 24, 8) };
  return { forme: ff.forme in QZFF_FORMES ? ff.forme : 'disque' };
}
function qzffFrac(s){ const m = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(String(s || '')); return m && +m[2] > 0 ? [+m[1], +m[2]] : null; }
function qzffTex(a, b){ return qzMath(`$\\dfrac{${a}}{${b}}$`); }
// Graine d'un élève pour une question : la même à chaque affichage.
function qzffGraine(q){ let h = 2166136261; for(const ch of (typeof currentUser !== 'undefined' && currentUser ? currentUser.id : 'x') + '|' + q.id){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) % 1000000; }
function qzffAlea(seed){ let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
// Ce que voit un élève : figure, parts coloriées (lire), fraction à colorier (colorier) et réponse attendue.
function qzffPour(q, rep){
  const ff = qzffConf(q), fig = qzffFig(ff), n = FRF.nb(fig), r = qziObj(rep);
  const s = ff.varie ? (r.s != null ? r.s : qzffGraine(q)) : null;
  if(ff.mode === 'colorier'){
    if(s != null){
      const al = qzffAlea(s), k = 1 + Math.floor(al() * (n - 1)), g = FRF.pgcd(k, n);
      const cible = ff.simplifie && g > 1 ? [k / g, n / g] : [k, n];
      return { ff, fig, n, s, cible, k };
    }
    const c = qzffFrac(ff.cible) || [1, 2];
    return { ff, fig, n, s, cible: c, k: c[0] * n / c[1] };
  }
  let colories = (ff.colories || []).filter(i => i >= 0 && i < n);
  if(s != null){
    const al = qzffAlea(s), k = 1 + Math.floor(al() * (n - 1));
    if(fig.forme === 'disque' || fig.forme === 'barre'){ const d = fig.forme === 'disque' ? Math.floor(al() * n) : 0; colories = Array.from({ length: k }, (_, i) => (d + i) % n); }
    else { const t = Array.from({ length: n }, (_, i) => i); for(let i = n - 1; i > 0; i--){ const j = Math.floor(al() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } colories = t.slice(0, k).sort((a, b) => a - b); }
  }
  return { ff, fig, n, s, colories, k: colories.length };
}
// Réponse juste ?
function qzffJuste(q, rep){
  const P = qzffPour(q, rep), r = qziObj(rep);
  if(P.ff.mode === 'colorier') return Array.isArray(r.c) && r.c.length * P.cible[1] === P.cible[0] * P.n;
  const a = parseInt(r.n, 10), b = parseInt(r.d, 10);
  if(!(b > 0) || isNaN(a)) return false;
  if(P.ff.exacte && b !== P.n) return false;
  return a * P.n === P.k * b;
}

QZ_EXT.fraction = {
  nouvelle(q){ q.ff = { forme: 'disque', n: 8, l: 3, c: 4, k: 3, mode: 'lire', colories: [0, 1, 2], cible: '3/8', varie: false, exacte: false, simplifie: false }; q.enonce = QZFF_ENONCE.lire; q.points = 1; },
  corps(q){
    const id = q.id, ff = qzffConf(q), fig = qzffFig(ff), n = FRF.nb(fig), P = qzffPour(q, null);
    const num = (ch, v, a, z) => `<input type="number" min="${a}" max="${z}" value="${v}" style="width:62px;" onchange="qziSet('${id}','ff.${ch}',parseInt(this.value,10)||${a},true)">`;
    const opt = (v, t, cur) => `<option value="${v}"${cur === v ? ' selected' : ''}>${t}</option>`;
    let fig2 = '';
    if(ff.mode === 'lire' && !ff.varie) fig2 = `<p class="hint" style="margin:6px 0 2px;">Touchez les parts pour les colorier ou les effacer.</p>${FRF.svg(fig, P.colories, { px: 170, cellMax: 36, clic: i => `onclick="qzffEdClic('${id}',${i})" style="cursor:pointer;"`, classe: 'qzff-svg' })}
      <p class="hint" style="margin:2px 0;">Partie coloriée : ${P.colories.length} part${P.colories.length > 1 ? 's' : ''} sur ${n}.</p>`;
    else if(ff.mode === 'colorier' && !ff.varie) fig2 = `<label class="qzff-l">Fraction à colorier <input type="text" value="${qzEsc(ff.cible)}" style="width:80px;" placeholder="3/8" oninput="qziSet('${id}','ff.cible',this.value)" onchange="qzEdRender()"></label>
      ${FRF.svg(fig, [], { px: 140, cellMax: 30, classe: 'qzff-svg' })}`;
    else fig2 = `<p class="hint" style="margin:6px 0 2px;">Chaque élève reçoit sa fraction, tirée au hasard (de 1 à ${n - 1} parts sur ${n}). Exemple :</p>${FRF.svg(fig, ff.mode === 'lire' ? P.colories : [], { px: 140, cellMax: 30, classe: 'qzff-svg' })}${ff.mode === 'colorier' ? ` <span style="font-size:1.2rem;">${qzffTex(...P.cible)}</span>` : ''}`;
    return `<span class="qz-lab">Figure partagée en parts égales</span>
      <div class="qz-reg-grid">
        <label>Forme <select onchange="qziSet('${id}','ff.forme',this.value,true)">${Object.entries(QZFF_FORMES).map(([v, t]) => opt(v, t, ff.forme)).join('')}</select></label>
        ${ff.forme === 'disque' || ff.forme === 'barre' ? `<label>${num('n', fig.n, 2, 24)} parts</label>` : ''}
        ${ff.forme === 'rect' ? `<label>${num('l', fig.l, 1, 8)} ligne(s) de ${num('c', fig.c, 1, 10)} carreaux</label>` : ''}
        ${ff.forme === 'triangle' ? `<label>partagé en <select onchange="qziSet('${id}','ff.k',parseInt(this.value,10),true)">${[2, 3, 4].map(k => opt(k, k * k + ' petits triangles', fig.k)).join('')}</select></label>` : ''}
      </div>
      <span class="qz-lab">L'élève doit…</span>
      <div class="qz-reg-grid">
        <label class="qz-check"><input type="radio" name="qzffm_${id}" ${ff.mode === 'lire' ? 'checked' : ''} onchange="qzffMode('${id}','lire')"> écrire la fraction coloriée</label>
        <label class="qz-check"><input type="radio" name="qzffm_${id}" ${ff.mode === 'colorier' ? 'checked' : ''} onchange="qzffMode('${id}','colorier')"> colorier une fraction donnée</label>
      </div>
      <div class="qz-reg-grid">
        <label class="qz-check"><input type="checkbox" ${ff.varie ? 'checked' : ''} onchange="qziSet('${id}','ff.varie',this.checked,true)"> Une fraction différente pour chaque élève</label>
        ${ff.mode === 'lire' ? `<label class="qz-check"><input type="checkbox" ${ff.exacte ? 'checked' : ''} onchange="qziSet('${id}','ff.exacte',this.checked,true)"> Exiger le nombre de parts comme dénominateur (sinon une fraction égale est acceptée)</label>` : ''}
        ${ff.mode === 'colorier' && ff.varie ? `<label class="qz-check"><input type="checkbox" ${ff.simplifie ? 'checked' : ''} onchange="qziSet('${id}','ff.simplifie',this.checked,true)"> Donner la fraction simplifiée quand c'est possible (ex. colorier ${qzffTex(3, 4)} d'un disque de 8 parts)</label>` : ''}
      </div>
      <div class="qzff-ed">${fig2}</div>`;
  },
  verifier(q){
    const ff = qzffConf(q), n = FRF.nb(qzffFig(ff));
    if(n < 2) return 'la figure doit avoir au moins deux parts.';
    if(ff.varie) return null;
    if(ff.mode === 'lire') return (ff.colories || []).length ? null : 'coloriez au moins une part de la figure.';
    const c = qzffFrac(ff.cible);
    if(!c) return 'écrivez la fraction à colorier, par exemple 3/8.';
    if(c[0] < 1 || c[0] > c[1]) return 'la fraction à colorier doit être comprise entre 0 et 1.';
    if((c[0] * n) % c[1]) return `on ne peut pas colorier ${c[0]}/${c[1]} d'une figure de ${n} parts : changez la fraction ou le nombre de parts.`;
    return null;
  },
  saisie(q, rep, mode){
    const P = qzffPour(q, rep), r = qziObj(rep), passer = mode === 'passer', corr = mode === 'corrige', nom = QZFF_NOMS[P.fig.forme] || 'de la figure';
    if(P.ff.mode === 'colorier'){
      const c = Array.isArray(r.c) ? r.c : [];
      const juste = corr && rep ? qzffJuste(q, rep) : null;
      return `<div class="qzff">
        <p class="qzff-cible">Colorie ${qzffTex(...P.cible)} ${nom}.</p>
        ${FRF.svg(P.fig, c, { px: 190, cellMax: 46, coul: juste === null ? '#E9A21C' : juste ? '#7DC68F' : '#EE9A8E', classe: 'qzff-svg', clic: passer ? i => `onclick="qzffClic('${q.id}',${i})" style="cursor:pointer;"` : null })}
        ${passer ? `<p class="hint" style="margin:4px 0 0;">Touche une part pour la colorier, touche-la encore pour l'effacer. Parts coloriées : <b>${c.length}</b>.</p>` : `<p class="hint" style="margin:4px 0 0;">Parts coloriées : <b>${c.length}</b> sur ${P.n}.</p>`}
        ${corr && !juste ? `<p class="qz-sol"><span class="gicon">check_circle</span> Il fallait colorier ${P.k} part${P.k > 1 ? 's' : ''} sur ${P.n} (n'importe lesquelles).</p>` : ''}
      </div>`;
    }
    const juste = corr && rep ? qzffJuste(q, rep) : null;
    const champ = (k, v) => `<input type="text" inputmode="numeric" class="qzff-in${juste === null ? '' : juste ? ' juste' : ' faux'}" value="${qzEsc(v ?? '')}" ${passer ? `oninput="qzffTape('${q.id}','${k}',this.value)"` : 'disabled'} autocomplete="off" aria-label="${k === 'n' ? 'numérateur' : 'dénominateur'}">`;
    return `<div class="qzff qzff-lire">
      ${FRF.svg(P.fig, P.colories, { px: 170, cellMax: 40, coul: '#2EA8C9', classe: 'qzff-svg' })}
      <span class="qzff-frac">${champ('n', r.n)}<span class="qzff-barre"></span>${champ('d', r.d)}</span>
      ${corr && !juste ? `<p class="qz-sol" style="flex-basis:100%;"><span class="gicon">check_circle</span> Réponse attendue : ${qzffTex(P.k, P.n)}${P.ff.exacte ? '' : ' (ou une fraction égale)'}</p>` : ''}
    </div>`;
  },
  repondue(q, rep){ const r = qziObj(rep); return qzffConf(q).mode === 'colorier' ? Array.isArray(r.c) && r.c.length > 0 : String(r.n ?? '').trim() !== '' && String(r.d ?? '').trim() !== ''; },
  auto(q, rep, max){ return rep && this.repondue(q, rep) && qzffJuste(q, rep) ? max : 0; },
};

// Éditeur : changer de sorte de question (l'énoncé par défaut suit) ; colorier une part.
function qzffMode(id, m){
  const q = qzEdQ(id); if(!q) return;
  q.ff = Object.assign(qzffConf(q), { mode: m });
  if(!String(q.enonce || '').trim() || Object.values(QZFF_ENONCE).includes(q.enonce)) q.enonce = QZFF_ENONCE[m];
  qzEdRender();
}
function qzffEdClic(id, i){
  const q = qzEdQ(id); if(!q) return;
  const ff = qzffConf(q), s = new Set(ff.colories || []);
  s.has(i) ? s.delete(i) : s.add(i);
  q.ff = Object.assign(ff, { colories: [...s].sort((a, b) => a - b) });
  qzEdRender();
}
// Élève : colorier une part ; écrire le numérateur ou le dénominateur (sans réafficher : le curseur reste).
function qzffClic(qid, i){
  const q = qziQ(qid); if(!q) return;
  const P = qzffPour(q, qzP.reponses[qid]), r = Object.assign({}, qziObj(qzP.reponses[qid]));
  const s = new Set(Array.isArray(r.c) ? r.c : []); s.has(i) ? s.delete(i) : s.add(i);
  r.c = [...s].sort((a, b) => a - b); if(P.s != null) r.s = P.s;
  qzSaisieValeur(qid, r.c.length ? r : undefined);
}
function qzffTape(qid, k, v){
  const q = qziQ(qid); if(!q || !qzP) return;
  const P = qzffPour(q, qzP.reponses[qid]), r = Object.assign({}, qziObj(qzP.reponses[qid]));
  r[k] = String(v).replace(/\D/g, '').slice(0, 4); if(P.s != null) r.s = P.s;
  if(r[k] !== v){ const el = document.activeElement; if(el && el.classList.contains('qzff-in')) el.value = r[k]; }
  if(!r.n && !r.d) delete qzP.reponses[qid]; else qzP.reponses[qid] = r;
  qzModifie();
}

// Proposé dans l'éditeur, après « Point dans un repère » ; jamais demandé à l'IA (format propre).
(function(){
  const t = { id: 'fraction', label: 'Fraction d\'une figure', icon: 'pie_chart', aide: 'Lire la fraction coloriée d\'une figure, ou colorier une fraction donnée (disque, rectangle, bande, hexagone…) : corrigé automatiquement.', sansIA: true };
  const i = QZ_TYPES.findIndex(x => x.id === 'repere');
  QZ_TYPES.splice(i < 0 ? QZ_TYPES.length : i + 1, 0, t);
})();

(function qzffStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qzff{display:flex;flex-direction:column;align-items:flex-start;gap:4px;}
    .qzff-lire{flex-direction:row;flex-wrap:wrap;align-items:center;gap:22px;}
    .qzff-svg{background:#fff;border-radius:8px;}
    .qzff-svg path[onclick]:hover{filter:brightness(.93);}
    .qzff-cible{margin:0 0 4px;font-size:1.05rem;}
    .qzff-frac{display:inline-flex;flex-direction:column;align-items:center;gap:4px;}
    .qzff-in{width:64px;text-align:center;font:700 1.25rem 'Space Grotesk',sans-serif;padding:6px 4px;border:1.5px solid rgba(107,63,160,.45);border-radius:8px;background:#FBF9FE;}
    .qzff-in:focus{outline:none;border-color:#6B3FA0;box-shadow:0 0 0 3px rgba(107,63,160,.15);}
    .qzff-in.juste{border-color:#1E7B34;background:#EAF6EC;} .qzff-in.faux{border-color:#C0392B;background:#FBECEA;}
    .qzff-barre{display:block;width:76px;height:3px;background:#1C1B2E;border-radius:2px;}
    .qzff-ed{margin-top:4px;} .qzff-l{display:inline-flex;align-items:center;gap:6px;margin:4px 12px 6px 0;font-size:.88rem;}
  `;
  document.head.appendChild(st);
})();
