#!/usr/bin/env node
/* ============================================================
   Référencement (Google) -- génère les pages statiques indexables du site.

   Pourquoi : l'application est une seule page (index.html) dont les chapitres sont des adresses
   en « #/chapitre/... », que Google ne traite pas comme des pages distinctes. Ce script produit,
   à partir du VRAI contenu des chapitres (rendu dans un navigateur sans interface, figures
   comprises), une page HTML par chapitre, plus les pages d'accueil par niveau et la page
   « Pour les professeurs », le sitemap.xml et le robots.txt.

   Fichiers produits (à committer avec le reste du site) :
     6e/index.html, 5e/index.html            -- sommaire de chaque niveau
     6e/<chapitre>/index.html, 5e/...        -- une page par chapitre ayant un vrai cours
     professeurs/index.html                  -- présentation des outils enseignants
     sitemap.xml, robots.txt
     assets/og-image.png                     -- image d'aperçu (créée seulement si absente)
     tools/seo-manifest.json                 -- empreinte de chaque page, pour une date de
                                                modification (lastmod) qui ne change que si
                                                le contenu change vraiment

   Utilisation (à relancer après toute modification d'un chapitre ou de la page professeurs) :
     (cd tools && npm install)        -- une fois : KaTeX, pour rendre les formules
     NODE_PATH=/opt/node22/lib/node_modules node tools/build-seo.js
   Nécessite Playwright + Chromium (variable PW_CHROMIUM pour un autre chemin de navigateur).
   ============================================================ */
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://maths.latelieraugmente.fr';
const LEVELS = ['6e', '5e'];
const LEVEL_INFO = {
  '6e': { cycle: 'cycle 3', long: 'sixième', other: '5e' },
  '5e': { cycle: 'cycle 4', long: 'cinquième', other: '6e' },
};
const CAT_LABEL = { N: 'Nombres et calculs', G: 'Géométrie', D: 'Données et probabilités', M: 'Grandeurs et mesures', P: 'Proportionnalité et fonctions' };
const CAT_COLOR = { N: ['#FFD8B0', '#8A4210'], G: ['#B9E8C4', '#1F6B3A'], D: ['#BFDCFB', '#1A4E9E'], M: ['#DCC9F7', '#5B2F9E'], P: ['#FAC3DE', '#9E1F5E'] };

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const cut = (s, n) => { s = s.replace(/\s+/g, ' ').trim(); if (s.length <= n) return s; const t = s.slice(0, n - 1); return t.slice(0, t.lastIndexOf(' ')) + '…'; };
const appUrl = (lvl, c, tab) => '/#/chapitre/' + lvl + '/' + c.n + '-' + slugify(c.t) + '/' + (tab || 'cours');

// ---------- petit serveur statique local ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
function serve() {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    let f = path.join(ROOT, p);
    if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

// ---------- extraction du contenu des chapitres, dans le vrai site ----------
async function extractChapters(page, base) {
  // Pages identiques d'une génération à l'autre (sinon Google les croirait sans cesse modifiées) :
  // hasard rejouable (jeux, exemples tirés au sort) et animations laissées aller à leur terme.
  await page.addInitScript(() => {
    let seed = 20260819;
    Math.random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  });
  await page.goto(base + '/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  return page.evaluate(async (levels) => {
    // Copie « statique » d'un bloc : ni scripts, ni boutons, ni champs, ni éléments masqués.
    function snapshot(el) {
      const hidden = [];
      el.querySelectorAll('*').forEach(n => { if (getComputedStyle(n).display === 'none') hidden.push(n); });
      hidden.forEach(n => n.setAttribute('data-seo-hidden', '1'));
      const clone = el.cloneNode(true);
      hidden.forEach(n => n.removeAttribute('data-seo-hidden'));
      // Formules pas encore rendues par l'application (ex. onglet Méthode, rendu au fil de l'animation).
      if (window.katex) clone.querySelectorAll('.tex:not([data-rendered])').forEach(n => {
        try { n.innerHTML = katex.renderToString(n.textContent, { throwOnError: false }); } catch (e) {}
      });
      clone.querySelectorAll('[data-seo-hidden], script, canvas, button, input, select, textarea, iframe, .interaction-hint, .no-print, label').forEach(n => n.remove());
      clone.querySelectorAll('*').forEach(n => {
        [...n.attributes].forEach(a => { if (/^on/i.test(a.name) || a.name === 'contenteditable' || a.name === 'draggable') n.removeAttribute(a.name); });
        if (n.style && n.style.cursor) n.style.cursor = '';
      });
      // Éléments vidés par le nettoyage (conteneurs de boutons, etc.)
      clone.querySelectorAll('div, p, span').forEach(n => { if (!n.textContent.trim() && !n.querySelector('svg, img, table')) n.remove(); });
      return clone.innerHTML.trim();
    }
    const out = [];
    for (const lvl of levels) for (const c of CHAPITRES_BY_LEVEL[lvl]) {
      location.hash = '#/chapitre/' + lvl + '/' + c.n + '-' + routerSlugify(c.t) + '/cours';
      await new Promise(r => setTimeout(r, 250));
      const block = p => [...document.querySelectorAll('#panel-' + p + ' > div')]
        .filter(d => d.id && getComputedStyle(d).display !== 'none' && !/generic/.test(d.id))[0];
      const res = { lvl, n: c.n, t: c.t, cat: c.cat, code: c.code, sections: {}, headings: [] };
      // Chaque onglet doit être affiché pour que ses figures soient dessinées.
      for (const tab of ['cours', 'methode', 'exercices', 'histoire']) {
        const btn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
        if (btn) btn.click();
        await new Promise(r => setTimeout(r, 700));
        const b = block(tab);
        if (b && b.innerText.trim().length > 80) res.sections[tab] = snapshot(b);
      }
      const cb = block('cours');
      if (cb) res.headings = [...cb.querySelectorAll('.lesson-header h3, h3')].map(h => h.textContent.trim()).filter(Boolean);
      res.firstDef = cb ? ((cb.querySelector('.def-box') || {}).textContent || '').trim() : '';
      out.push(res);
    }
    return out;
  }, LEVELS);
}

// ---------- gabarit commun ----------
function layout({ title, description, canonical, jsonld, body, ogType }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:type" content="${ogType || 'article'}">
<meta property="og:site_name" content="L'Atelier des Maths">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:image" content="${SITE}/assets/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0C5BA0">
<link rel="icon" type="image/png" href="/assets/logo-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Caveat:wght@600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<link rel="stylesheet" href="/styles.css">
<style>
  .seo-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:12px 20px;background:rgba(253,249,246,.95);border-bottom:1px solid rgba(28,43,57,.08);position:sticky;top:0;z-index:5;}
  .seo-top img{height:40px;display:block;}
  .seo-top nav{display:flex;gap:6px;flex-wrap:wrap;align-items:center;}
  .seo-top nav a{padding:7px 12px;border-radius:8px;font-weight:600;font-size:.92rem;color:var(--ink);}
  .seo-top nav a:hover{background:rgba(12,91,160,.07);}
  .seo-top nav a.cta{background:var(--accent);color:#fff;}
  .seo-wrap{max-width:920px;margin:0 auto;padding:18px 16px 40px;}
  .seo-crumbs{font-size:.85rem;color:var(--ink-soft);margin:4px 0 14px;}
  .seo-crumbs a{text-decoration:underline;text-underline-offset:2px;}
  .seo-wrap h1{font-size:2rem;margin:0 0 6px;line-height:1.15;}
  .seo-sub{color:var(--ink-soft);margin:0 0 16px;font-size:1.02rem;}
  .seo-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:.78rem;font-weight:700;margin-right:6px;vertical-align:middle;}
  .seo-cta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:space-between;background:rgba(12,91,160,.06);border:1px solid rgba(12,91,160,.18);border-radius:12px;padding:14px 16px;margin:14px 0 24px;}
  .seo-cta p{margin:0;flex:1;min-width:220px;}
  .seo-btn{display:inline-block;background:var(--accent);color:#fff !important;font-weight:700;padding:10px 16px;border-radius:9px;white-space:nowrap;}
  .seo-btn.alt{background:#fff;color:var(--accent) !important;border:1px solid rgba(12,91,160,.35);}
  .seo-section{background:var(--white);border-radius:14px;box-shadow:var(--shadow);padding:18px 20px;margin:0 0 22px;overflow-x:auto;}
  .seo-section > h2{margin:0 0 12px;font-size:1.35rem;display:flex;align-items:center;gap:8px;}
  .seo-section svg{max-width:100%;height:auto;}
  .seo-list{list-style:none;padding:0;margin:0;display:grid;gap:10px;}
  .seo-list li a, .seo-list li > span{display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:10px;background:var(--white);box-shadow:var(--shadow);}
  .seo-list li a:hover{outline:2px solid rgba(12,91,160,.25);}
  .seo-list .num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.2rem;min-width:2ch;color:var(--accent);}
  .seo-list .soon{opacity:.6;}
  .seo-nav{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:8px;}
  .seo-nav a{font-weight:600;color:var(--accent);}
  .seo-feat{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin:0 0 22px;}
  .seo-feat div{background:var(--white);border-radius:12px;box-shadow:var(--shadow);padding:14px 16px;}
  .seo-feat h3{margin:0 0 6px;font-size:1.05rem;display:flex;gap:8px;align-items:center;}
  .seo-feat p{margin:0;font-size:.93rem;color:var(--ink-soft);line-height:1.5;}
  .seo-foot{max-width:920px;margin:0 auto;padding:18px 16px 30px;font-size:.85rem;color:var(--ink-soft);border-top:1px solid rgba(28,43,57,.08);}
  .seo-foot a{text-decoration:underline;text-underline-offset:2px;}
  @media (max-width:600px){ .seo-wrap h1{font-size:1.55rem;} .seo-section{padding:14px 12px;} .seo-top{padding:10px 12px;} }
</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
<header class="seo-top">
  <a href="/" aria-label="L'Atelier des Maths, accueil"><img src="/assets/logo-horizontal.png" alt="L'Atelier des Maths" width="115" height="40"></a>
  <nav>
    <a href="/6e/">Cours 6e</a>
    <a href="/5e/">Cours 5e</a>
    <a href="/professeurs/">Professeurs</a>
    <a class="cta" href="/">Ouvrir l'application</a>
  </nav>
</header>
<main class="seo-wrap">
${body}
</main>
<footer class="seo-foot">
  <a href="/">L'Atelier des Maths</a> · cours de mathématiques interactifs pour le collège ·
  <a href="/6e/">Cours de maths 6e</a> · <a href="/5e/">Cours de maths 5e</a> · <a href="/professeurs/">Pour les professeurs</a><br>
  Une production de <a href="https://www.latelieraugmente.fr" rel="noopener">L'Atelier Augmenté</a> · Programme de mathématiques B.O. 2026.
</footer>
</body>
</html>
`;
}
const PUBLISHER = { '@type': 'Organization', name: "L'Atelier des Maths", url: SITE + '/', logo: SITE + '/assets/logo-icon.png' };
const crumbsLd = items => ({ '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it[0], item: SITE + it[1] })) });

// ---------- page d'un chapitre ----------
function chapterPage(ch, prev, next) {
  const lvl = ch.lvl, info = LEVEL_INFO[lvl];
  const url = '/' + lvl + '/' + slugify(ch.t) + '/';
  const topics = ch.headings.slice(0, 5);
  const description = cut(`Cours de maths ${lvl} : ${ch.t}. ` + (topics.length ? topics.join(', ') + '. ' : '') + 'Définitions, figures interactives, méthode animée, exercices et un peu d\'histoire.', 158);
  const title = `${ch.t} – Cours de maths ${lvl} | L'Atelier des Maths`;
  const [bg, fg] = CAT_COLOR[ch.cat] || ['#eee', '#333'];
  const S = ch.sections;
  const section = (key, icon, h2, intro) => S[key] ? `
<section class="seo-section" id="${key}">
  <h2><span class="gicon">${icon}</span> ${h2}</h2>
  ${intro ? `<p class="hint" style="margin:-4px 0 12px;">${intro}</p>` : ''}
  ${S[key]}
</section>` : '';
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'LearningResource', name: `${ch.t} (${lvl})`, headline: `${ch.t} – cours de mathématiques de ${lvl}`, description, url: SITE + url,
      inLanguage: 'fr', learningResourceType: ['Cours', 'Exercices'], educationalLevel: `${lvl} (${info.cycle}, collège)`,
      about: CAT_LABEL[ch.cat], teaches: topics, isAccessibleForFree: true, audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
      publisher: PUBLISHER, isPartOf: { '@type': 'Course', name: `Mathématiques ${lvl}`, url: SITE + '/' + lvl + '/', provider: PUBLISHER } },
    crumbsLd([['Accueil', '/'], [`Cours de maths ${lvl}`, '/' + lvl + '/'], [ch.t, url]]),
  ] };
  const body = `
<div class="seo-crumbs"><a href="/">Accueil</a> › <a href="/${lvl}/">Cours de maths ${lvl}</a> › ${esc(ch.t)}</div>
<h1>${esc(ch.t)}</h1>
<p class="seo-sub"><span class="seo-badge" style="background:${bg};color:${fg};">${esc(CAT_LABEL[ch.cat] || '')}</span> Cours de mathématiques de ${lvl} (${info.long}) · chapitre ${ch.n}${topics.length ? ' · ' + esc(topics.join(' · ')) : ''}</p>
<div class="seo-cta">
  <p><b>Version interactive :</b> dans l'application, les points des figures se déplacent, les figures se construisent pas à pas à la règle et au compas et un quiz s'invente à chaque essai.</p>
  <a class="seo-btn" href="${appUrl(lvl, ch)}">Ouvrir le chapitre interactif</a>
</div>
${section('cours', 'menu_book', 'Le cours', '')}
${section('methode', 'draw', 'Méthode', 'Dans l\'application, cette méthode est animée étape par étape (règle, équerre, compas, rapporteur).')}
${section('exercices', 'edit', 'Exercices et rédaction', '')}
${section('histoire', 'history_edu', 'Un peu d\'histoire', '')}
<div class="seo-cta">
  <p>Pour s'entraîner : <b>quiz générés à chaque essai</b>, figures manipulables et constructions animées.</p>
  <a class="seo-btn" href="${appUrl(lvl, ch, 'quiz')}">Faire le quiz</a>
</div>
<nav class="seo-nav">
  <span>${prev ? `← <a href="/${lvl}/${slugify(prev.t)}/">${esc(prev.t)}</a>` : ''}</span>
  <a href="/${lvl}/">Tous les chapitres de ${lvl}</a>
  <span>${next ? `<a href="/${lvl}/${slugify(next.t)}/">${esc(next.t)}</a> →` : ''}</span>
</nav>`;
  return { url, html: layout({ title, description, canonical: url, jsonld, body }) };
}

// ---------- sommaire d'un niveau ----------
function levelPage(lvl, all, published) {
  const info = LEVEL_INFO[lvl];
  const url = '/' + lvl + '/';
  const chs = all.filter(c => c.lvl === lvl);
  const n = chs.filter(c => published.has(c)).length;
  const title = `Cours de maths ${lvl} : les ${chs.length} chapitres du programme | L'Atelier des Maths`;
  const description = cut(`Tous les cours de mathématiques de ${lvl} (${info.long}, ${info.cycle}) conformes au programme 2026 : ` + chs.slice(0, 6).map(c => c.t.toLowerCase()).join(', ') + '… Figures interactives, méthodes animées, exercices et quiz.', 158);
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Course', name: `Mathématiques ${lvl}`, description, url: SITE + url, inLanguage: 'fr', educationalLevel: `${lvl} (${info.cycle}, collège)`, isAccessibleForFree: true, provider: PUBLISHER,
      hasPart: chs.filter(c => published.has(c)).map(c => ({ '@type': 'LearningResource', name: c.t, url: SITE + '/' + lvl + '/' + slugify(c.t) + '/' })) },
    crumbsLd([['Accueil', '/'], [`Cours de maths ${lvl}`, url]]),
  ] };
  const body = `
<div class="seo-crumbs"><a href="/">Accueil</a> › Cours de maths ${lvl}</div>
<h1>Cours de maths ${lvl}</h1>
<p class="seo-sub">Les ${chs.length} chapitres de mathématiques de ${info.long} (${info.cycle}), dans l'ordre de la progression de l'année et conformes au programme 2026. Chaque cours comprend les définitions et propriétés à retenir, des figures, une méthode animée, des exercices de rédaction et un peu d'histoire des mathématiques.</p>
<div class="seo-cta">
  <p>Dans l'application : <b>figures manipulables, constructions animées, quiz</b> et, pour les professeurs, outils de correction et devoirs en ligne.</p>
  <a class="seo-btn" href="/#/niveau/${lvl}">Ouvrir la ${lvl} dans l'application</a>
</div>
<ul class="seo-list">
${chs.map(c => {
    const [bg, fg] = CAT_COLOR[c.cat] || ['#eee', '#333'];
    const badge = `<span class="seo-badge" style="background:${bg};color:${fg};">${esc(CAT_LABEL[c.cat] || '')}</span>`;
    return published.has(c)
      ? `  <li><a href="/${lvl}/${slugify(c.t)}/"><span class="num">${c.n}</span><span><b>${esc(c.t)}</b><br>${badge}<span class="hint">${esc(c.headings.slice(0, 4).join(' · '))}</span></span></a></li>`
      : `  <li><span class="soon"><span class="num">${c.n}</span><span><b>${esc(c.t)}</b><br>${badge}<span class="hint">cours en préparation</span></span></span></li>`;
  }).join('\n')}
</ul>
<p style="margin-top:20px;">Voir aussi : <a href="/${info.other}/" style="color:var(--accent);font-weight:600;">les cours de maths ${info.other}</a> · <a href="/professeurs/" style="color:var(--accent);font-weight:600;">les outils pour les professeurs</a>.</p>`;
  return { url, html: layout({ title, description, canonical: url, jsonld, body, ogType: 'website' }), n };
}

// ---------- page professeurs ----------
function teachersPage() {
  const url = '/professeurs/';
  const title = "Outils pour les professeurs de maths au collège | L'Atelier des Maths";
  const description = "Outil de correction à projeter, tableau interactif de géométrie (règle, équerre, compas, rapporteur), constructions animées par IA, devoirs en ligne et cahier de corrections partagé.";
  const feats = [
    ['desktop_windows', 'Outil de correction à projeter', "Rédigez la correction au clavier et projetez-la en direct au vidéoprojecteur ou sur le TNI : figures, graphiques, arbres de probabilités, opérations posées, impression en un clic."],
    ['architecture', 'Tableau interactif de géométrie', "Règle, équerre, réquerre, compas et rapporteur à manipuler comme au tableau, avec zoom : idéal pour montrer les gestes de construction à toute la classe."],
    ['auto_awesome', 'Constructions géométriques animées par IA', "Écrivez l'énoncé (« construire un triangle ABC tel que… ») : la construction se dessine pas à pas avec les vrais instruments, codages et longueurs, en choisissant les outils autorisés."],
    ['menu_book', 'Cahier de corrections partagé', "Chaque correction est archivée par classe et par date, partagée avec vos collègues du même niveau, consultable en ligne et imprimable."],
    ['assignment_turned_in', 'Devoirs en ligne', "Automatismes, « Objectif Nombre » ou fichier à rendre : vous voyez qui a rendu, qui est en retard, les scores et les médailles en temps réel."],
    ['edit_note', 'Évaluations', "Rédaction manuelle ou assistée par IA, mise en page en colonnes, impression fidèle à l'écran."],
    ['pin', 'Automatismes et calcul mental', "112 séquences d'automatismes générées et corrigées automatiquement, et « Objectif Nombre » pour muscler le calcul mental."],
    ['bar_chart', 'Suivi des classes', "Progression des automatismes et résultats de chaque élève, classe par classe."],
    ['domain', 'Gestion d\'établissement', "Un professeur référent gère les comptes de son collège : import des élèves et des classes, validation des collègues, licence établissement et clé IA commune."],
  ];
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebApplication', name: "L'Atelier des Maths", url: SITE + '/', applicationCategory: 'EducationalApplication', operatingSystem: 'Navigateur web', inLanguage: 'fr',
      description, audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
      offers: { '@type': 'Offer', price: '16.90', priceCurrency: 'EUR', description: "Abonnement annuel enseignant, après 15 jours d'essai gratuit" }, publisher: PUBLISHER },
    crumbsLd([['Accueil', '/'], ['Pour les professeurs', url]]),
  ] };
  const body = `
<div class="seo-crumbs"><a href="/">Accueil</a> › Pour les professeurs</div>
<h1>Des outils pour enseigner les maths au collège</h1>
<p class="seo-sub">L'Atelier des Maths accompagne les professeurs de mathématiques de 6e et de 5e : en classe (projection, géométrie au tableau), pour les devoirs, les évaluations et le suivi des élèves. Conçu par un professeur de mathématiques, conforme au programme 2026.</p>
<div class="seo-feat">
${feats.map(f => `  <div><h3><span class="gicon">${f[0]}</span> ${esc(f[1])}</h3><p>${esc(f[2])}</p></div>`).join('\n')}
</div>
<section class="seo-section">
  <h2><span class="gicon">school</span> Pour vos élèves</h2>
  <p>Chaque chapitre de <a href="/6e/" style="color:var(--accent);font-weight:600;">6e</a> et de <a href="/5e/" style="color:var(--accent);font-weight:600;">5e</a> propose un cours avec des figures manipulables, une méthode animée, des exercices de rédaction, un quiz différent à chaque essai et un peu d'histoire des mathématiques. Vous décidez, classe par classe et même élève par élève, quels outils d'intelligence artificielle leur sont ouverts.</p>
</section>
<section class="seo-section">
  <h2><span class="gicon">key</span> Accès</h2>
  <p>L'inscription est réservée aux enseignants disposant d'une adresse académique. Après vérification, vous bénéficiez de <b>15 jours d'essai gratuit</b>, puis d'un abonnement annuel (16,90 € par an). Un établissement peut aussi prendre une <b>licence établissement</b> pour tous ses professeurs. Les fonctions d'IA utilisent votre propre clé, celle de l'établissement ou celle du site selon ce qui a été décidé : vous voyez toujours le détail de la consommation.</p>
  <p style="margin-top:12px;"><a class="seo-btn" href="/">Découvrir l'application</a></p>
</section>`;
  return { url, html: layout({ title, description, canonical: url, jsonld, body, ogType: 'website' }) };
}

// ---------- image d'aperçu (partages, réseaux sociaux) ----------
async function ogImage(page, base) {
  const out = path.join(ROOT, 'assets', 'og-image.png');
  if (fs.existsSync(out)) return false;
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<html><body style="margin:0;width:1200px;height:630px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 15% 0%,#FFFEFC 0%,#FDF9F6 60%);font-family:sans-serif;">
    <div style="text-align:center;">
      <img src="${base}/assets/logo-horizontal.png" style="width:620px;display:block;margin:0 auto 26px;">
      <div style="font-size:40px;font-weight:700;color:#20242E;">Cours de maths 6e et 5e interactifs</div>
      <div style="font-size:26px;color:#5B6472;margin-top:12px;">Figures manipulables · constructions animées · quiz · outils pour les professeurs</div>
    </div></body></html>`, { waitUntil: 'load' });
  await page.screenshot({ path: out });
  return true;
}

(async () => {
  const server = await serve();
  const base = 'http://127.0.0.1:' + server.address().port;
  const exe = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  // Rien d'extérieur (paiement, base de données, polices) : seul le contenu des chapitres compte.
  // Exception : KaTeX (formules comme \widehat{MON}), servi depuis la copie locale de tools/.
  let katexJs = null;
  try { katexJs = fs.readFileSync(require.resolve('katex/dist/katex.min.js', { paths: [__dirname] })); }
  catch (e) { console.warn('KaTeX introuvable : lancez « npm install » dans tools/ (sinon les formules restent en code LaTeX).'); }
  await page.route(url => !url.href.startsWith(base), r => {
    if (katexJs && /katex(\.min)?\.js$/.test(r.request().url())) return r.fulfill({ status: 200, contentType: 'text/javascript', body: katexJs });
    return r.abort();
  });

  const chapters = await extractChapters(page, base);
  const published = new Set(chapters.filter(c => c.sections.cours));
  const pages = [];
  for (const lvl of LEVELS) {
    const list = chapters.filter(c => c.lvl === lvl && published.has(c));
    list.forEach((c, i) => pages.push(chapterPage(c, list[i - 1], list[i + 1])));
    pages.push(levelPage(lvl, chapters, published));
  }
  pages.push(teachersPage());
  const madeOg = await ogImage(page, base);
  await browser.close();
  server.close();

  // Nettoie les anciennes pages de chapitre (chapitre renommé ou retiré).
  const keep = new Set(pages.map(p => p.url));
  for (const lvl of LEVELS) {
    const dir = path.join(ROOT, lvl);
    if (!fs.existsSync(dir)) continue;
    for (const d of fs.readdirSync(dir)) {
      const full = path.join(dir, d);
      if (fs.statSync(full).isDirectory() && !keep.has('/' + lvl + '/' + d + '/')) fs.rmSync(full, { recursive: true });
    }
  }
  // Écriture + date de dernière modification réelle (empreinte du contenu).
  const manifestPath = path.join(__dirname, 'seo-manifest.json');
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
  const today = new Date().toISOString().slice(0, 10);
  const homeHash = crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').replace(/v=\d{8}-\d+|build \d{4}-\d{2}-\d{2}\.\d+/g, '')).digest('hex');
  const entries = [{ url: '/', hash: homeHash }];
  for (const p of pages) {
    const file = path.join(ROOT, p.url, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, p.html);
    entries.push({ url: p.url, hash: crypto.createHash('sha1').update(p.html).digest('hex') });
  }
  const newManifest = {};
  for (const e of entries) {
    const old = manifest[e.url];
    newManifest[e.url] = { hash: e.hash, lastmod: old && old.hash === e.hash ? old.lastmod : today };
  }
  fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 1) + '\n');
  const prio = u => u === '/' ? '1.0' : /^\/(6e|5e)\/$/.test(u) || u === '/professeurs/' ? '0.9' : '0.8';
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url><loc>${SITE}${e.url}</loc><lastmod>${newManifest[e.url].lastmod}</lastmod><priority>${prio(e.url)}</priority></url>`).join('\n')}
</urlset>
`);
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `# L'Atelier des Maths -- généré par tools/build-seo.js
User-agent: *
Allow: /
# Liens d'invitation personnels : jamais dans les moteurs de recherche.
Disallow: /invitation.html

Sitemap: ${SITE}/sitemap.xml
`);
  console.log(`${pages.length} pages générées (${published.size} chapitres avec cours, ${chapters.length - published.size} en préparation non publiés)${madeOg ? ', image d\'aperçu créée' : ''}.`);
  if (pageErrors.length) console.log('Erreurs JavaScript pendant l\'extraction :', [...new Set(pageErrors)].slice(0, 5));
})().catch(e => { console.error(e); process.exit(1); });
