/* =====================================================================
   tools/histoire-images/images.mjs -- Images de la frise historique (Wikimedia Commons)

   Demandé : « dans la partie histoire et frise historique, il manque des illustrations, les papyrus
   par exemple, pour savoir de quoi on parle, pas seulement des points sur une carte. Ou des
   représentations des mathématiciens. »

   Lancé par le workflow « Images de l'histoire » (.github/workflows/images-histoire.yml), sur les
   serveurs de GitHub (Wikimedia n'est pas joignable depuis tous les postes de travail) :
   - Étape sans choix dans choix.json : recherche de candidats sur Commons (recherche.json), en
     planches contact numérotées (candidats/planche-N.jpg) + candidats/candidats.json (licences).
   - Étape choisie (choix.json : titre -> « File:… ») : téléchargement de l'image, réduite, dans
     img/histoire/<slug>.jpg, et ses crédits dans img/histoire/credits.json (auteur, licence, source).
   Seules les licences libres sont retenues (domaine public, CC0, CC BY, CC BY-SA).
   ===================================================================== */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const ICI = path.dirname(fileURLToPath(import.meta.url)), RACINE = path.resolve(ICI, '../..');
const SORTIE = path.join(RACINE, 'img/histoire'), CAND = path.join(ICI, 'candidats'), TMP = '/tmp/histoire-images';
const UA = { 'User-Agent': 'AtelierDesMathsImages/1.0 (https://maths.latelieraugmente.fr)' };
const API = 'https://commons.wikimedia.org/w/api.php';
const lire = f => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
const recherche = lire(path.join(ICI, 'recherche.json')), choix = lire(path.join(ICI, 'choix.json'));
delete recherche._; delete choix._;
export const slug = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const pause = ms => new Promise(r => setTimeout(r, ms));
const texte = h => String(h || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const LIBRE = /public domain|^pd|cc0|cc[- ]by/i;

async function api(params){
  const u = API + '?' + new URLSearchParams(Object.assign({ action: 'query', format: 'json', formatversion: '2' }, params));
  for(let essai = 0; essai < 4; essai++){
    const r = await fetch(u, { headers: UA });
    if(r.ok) return r.json();
    await pause(2000 * (essai + 1));
  }
  throw new Error('Commons injoignable : ' + u);
}
async function telecharger(url, f){
  for(let essai = 0; essai < 4; essai++){
    const r = await fetch(url, { headers: UA });
    if(r.ok){ fs.writeFileSync(f, Buffer.from(await r.arrayBuffer())); return; }
    await pause(2000 * (essai + 1));
  }
  throw new Error('Téléchargement impossible : ' + url);
}
const infos = p => {
  const ii = (p.imageinfo || [])[0] || {}, m = ii.extmetadata || {};
  return { fichier: p.title, licence: texte(m.LicenseShortName && m.LicenseShortName.value), auteur: texte(m.Artist && m.Artist.value).slice(0, 160),
    source: ii.descriptionurl, vignette: ii.thumburl, mime: ii.mime };
};

fs.mkdirSync(TMP, { recursive: true });
const aChercher = Object.keys(recherche).filter(t => !(t in choix));
const choisis = Object.entries(choix).filter(([, f]) => f);

/* 1) Candidats, en planches contact (6 étapes par planche, 5 images par étape). */
if(aChercher.length){
  fs.mkdirSync(CAND, { recursive: true });
  const tous = {}, lignes = [];
  for(const t of aChercher){
    const d = await api({ generator: 'search', gsrnamespace: '6', gsrsearch: recherche[t] + ' filetype:bitmap', gsrlimit: '8',
      prop: 'imageinfo', iiprop: 'url|extmetadata|mime', iiurlwidth: '260' });
    const pages = ((d.query && d.query.pages) || []).sort((a, b) => a.index - b.index).map(infos).filter(c => c.vignette && LIBRE.test(c.licence)).slice(0, 5);
    tous[t] = pages.map((c, k) => Object.assign({ k: k + 1 }, c, { vignette: undefined }));
    const tuiles = [];
    for(const [k, c] of pages.entries()){
      const f = path.join(TMP, `${slug(t)}-${k + 1}.jpg`);
      try{ await telecharger(c.vignette, f); tuiles.push(['-label', `${k + 1} · ${c.licence}`.slice(0, 30), f]); }catch(e){ console.warn(e.message); }
      await pause(150);
    }
    const ligne = path.join(TMP, `ligne-${lignes.length}.png`);
    if(tuiles.length) execFileSync('montage', [...tuiles.flat(), '-tile', '5x1', '-geometry', '230x200+6+6', '-pointsize', '15', '-title', t, '-background', '#ffffff', ligne]);
    else execFileSync('convert', ['-size', '1210x60', 'xc:#ffffff', '-pointsize', '20', '-annotate', '+10+35', t + ' : aucun candidat libre', ligne]);
    lignes.push(ligne);
    console.log(`${t} : ${pages.length} candidat(s)`);
    await pause(300);
  }
  for(let i = 0; i < lignes.length; i += 6){
    execFileSync('convert', [...lignes.slice(i, i + 6), '-append', '-quality', '72', path.join(CAND, `planche-${i / 6 + 1}.jpg`)]);
  }
  fs.writeFileSync(path.join(CAND, 'candidats.json'), JSON.stringify(tous, null, 1) + '\n');
}

/* 2) Images choisies : réduites (480 px au plus), avec leurs crédits. */
if(choisis.length){
  fs.mkdirSync(SORTIE, { recursive: true });
  const credits = lire(path.join(SORTIE, 'credits.json'));
  for(const [t, fichier] of choisis){
    const s = slug(t), f = path.join(SORTIE, s + '.jpg');
    if(credits[t] && credits[t].fichier === fichier && fs.existsSync(f)) continue;
    const d = await api({ titles: fichier, prop: 'imageinfo', iiprop: 'url|extmetadata|mime', iiurlwidth: '640' });
    const p = ((d.query && d.query.pages) || [])[0];
    if(!p || p.missing){ console.warn('Fichier introuvable : ' + fichier); continue; }
    const c = infos(p);
    if(!LIBRE.test(c.licence)){ console.warn(`Licence non libre (${c.licence}) : ${fichier}`); continue; }
    const brut = path.join(TMP, s + '-brut');
    await telecharger(c.vignette, brut);
    execFileSync('convert', [brut + '[0]', '-auto-orient', '-resize', '480x400>', '-background', '#ffffff', '-flatten', '-strip', '-quality', '82', f]);
    credits[t] = { fichier: c.fichier, image: `img/histoire/${s}.jpg`, auteur: c.auteur, licence: c.licence, source: c.source };
    console.log(`${t} : ${c.fichier} (${c.licence})`);
    await pause(300);
  }
  fs.writeFileSync(path.join(SORTIE, 'credits.json'), JSON.stringify(credits, null, 1) + '\n');
}
