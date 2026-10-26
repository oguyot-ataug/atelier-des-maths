// Test de charge -- demandé : « vendre un produit qui bloque, non merci ! » puis « oui, prépare le test de
// charge » (25/10/2026). Joue des classes entières d'élèves fictifs contre la vraie base, comme le site :
//   1. connexion de toute la classe en 30 s, puis ouverture de la page (profil, classe, accès IA, veille) ;
//   2. veille (eleve_veille toutes les 25 à 35 s, comme veilleEleve dans cours-direct.js) ;
//   3. séance COURS en mode libre : l'élève rejoint, enregistre son travail toutes les 3 à 8 s, signale sa
//      présence toutes les 20 s, prévient le professeur en temps réel ; le professeur relit la liste des
//      élèves et les travaux toutes les 5 s et à chaque travail reçu (comme cours-direct.js / cours-exos.js) ;
//   4. automatismes : records (cm_get_all_records) puis un résultat enregistré (jamais un sans-faute, pour
//      ne pas toucher aux records affichés aux vrais élèves).
// Les comptes sont créés puis supprimés par la fonction test-charge (secret ALERTE_CLE).
// Lancement : workflow GitHub « Test de charge » ; en local : ALERTE_CLE=… node charge.mjs 30
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const app = readFileSync(new URL('../../app.js', import.meta.url), 'utf8');
const URL_SB = app.match(/SUPABASE_URL = '([^']+)'/)[1], ANON = app.match(/SUPABASE_ANON_KEY = '([^']+)'/)[1];
const CLE = process.env.ALERTE_CLE;
const ELEVES = Math.max(1, Math.min(300, parseInt(process.argv[2] || process.env.ELEVES || '30', 10) || 30));
const MIN_VEILLE = parseFloat(process.env.MINUTES_VEILLE || '3'), MIN_SEANCE = parseFloat(process.env.MINUTES_SEANCE || '5');
const TEMPS_REEL = process.env.TEMPS_REEL !== '0';
if (!CLE) { console.error('ALERTE_CLE manquant (secret GitHub).'); process.exit(1); }

const dormir = ms => new Promise(ok => setTimeout(ok, ms));
const hasard = (a, b) => a + Math.random() * (b - a);

// ---------- mesures ----------
const stats = new Map(), refus = {};
let phase = '';
function noter(op, ms, erreur) {
  const k = phase + ' · ' + op;
  if (!stats.has(k)) stats.set(k, { n: 0, t: [], err: {} });
  const s = stats.get(k); s.n++; s.t.push(ms);
  if (erreur) s.err[erreur] = (s.err[erreur] || 0) + 1;
}
async function mesure(op, f) {
  const t0 = performance.now();
  try {
    const r = await f();
    const e = r && r.error ? (r.status || r.error.status || r.error.code || 'erreur') + ' ' + String(r.error.message || '').slice(0, 60) : null;
    noter(op, performance.now() - t0, e);
    return r;
  } catch (e) { noter(op, performance.now() - t0, 'exception ' + String(e.message || e).slice(0, 60)); return { error: e }; }
}
// Même politique de nouveaux essais que le site (sbFetch, app.js) ; chaque refus du serveur est compté.
async function sbFetch(url, opts) {
  const lecture = String((opts && opts.method) || 'GET').toUpperCase() === 'GET';
  for (let essai = 0; ; essai++) {
    try {
      const r = await fetch(url, opts);
      const ko = r.status === 429 || r.status === 503 || (lecture && (r.status === 500 || r.status === 502 || r.status === 504));
      if (ko) refus[r.status] = (refus[r.status] || 0) + 1;
      if (!ko || essai >= 3) return r;
    } catch (e) {
      refus.reseau = (refus.reseau || 0) + 1;
      if (!lecture || essai >= 3 || (e && e.name === 'AbortError')) throw e;
    }
    await dormir((1000 << essai) * (0.6 + Math.random() * 0.8));
  }
}
const client = () => createClient(URL_SB, ANON, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: sbFetch }, realtime: { transport: WebSocket } });
async function fonction(action, extra) {
  const r = await fetch(URL_SB + '/functions/v1/test-charge', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-alerte-cle': CLE }, body: JSON.stringify({ action, ...extra }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error('test-charge ' + action + ' : ' + (j.error || r.status));
  return j;
}
const pourTous = (liste, f) => Promise.all(liste.map(f));
const jusqua = t => Date.now() < t;

// ---------- déroulé ----------
if (process.argv[2] === 'nettoyer') { // reste d'un test interrompu
  const r = await fonction('supprimer'); console.log(`Nettoyage : ${r.eleves} élèves et ${r.classes} classe(s) supprimés.`); process.exit(0);
}
let prep = null;
const debut = Date.now();
try {
  console.log(`Préparation de ${ELEVES} élèves fictifs…`);
  prep = await fonction('preparer', { eleves: ELEVES });
  const mdp = prep.mdp; delete prep.mdp;
  const eleves = prep.eleves.map(e => ({ ...e, sb: client() }));
  console.log(`${eleves.length} élèves dans ${prep.classes.length} classe(s).`);

  // 1. Connexion : chaque classe se connecte en 30 s, toutes les classes en même temps.
  phase = '1 connexion';
  await pourTous(eleves, async e => {
    await dormir(hasard(0, 30000));
    // Comme le site (globalSignIn, app.js) : file d'attente d'environ une minute si la limite anti-robots refuse.
    const r = await mesure('connexion', async () => {
      const fin = Date.now() + 60000; let r, essai = 0;
      for(;;){ r = await e.sb.auth.signInWithPassword({ email: e.email, password: mdp });
        if(!(r.error && (r.error.status === 429 || /rate limit|too many/i.test(r.error.message))) || Date.now() > fin) return r;
        essai++; refus.attente = (refus.attente || 0) + 1; await dormir(Math.min(12000, 2500 + essai * 2000) * (0.7 + Math.random() * 0.6)); }
    });
    e.ok = !r.error && r.data && r.data.user; if (!e.ok) return;
    e.id = r.data.user.id;
    await Promise.all([
      mesure('profil', () => e.sb.from('profiles').select('role,nom,prenom,uai,signup_status,subscription_status,subscription_expires_at,must_change_password').eq('id', e.id).maybeSingle()),
      mesure('ma classe', () => e.sb.from('class_students').select('classes(niveau,creee_par,groupe)').eq('student_id', e.id)),
      mesure('accès IA', () => e.sb.rpc('my_ai_access')),
      mesure('veille', () => e.sb.rpc('eleve_veille')),
    ]);
  });
  const actifs = eleves.filter(e => e.ok);
  console.log(`${actifs.length}/${eleves.length} élèves connectés.`);

  // 2. Veille.
  phase = '2 veille';
  const finVeille = Date.now() + MIN_VEILLE * 60000;
  await pourTous(actifs, async e => { while (jusqua(finVeille)) { await dormir(hasard(25000, 35000)); if (jusqua(finVeille)) await mesure('veille', () => e.sb.rpc('eleve_veille')); } });

  // 3. Séance COURS (mode libre, 3 exercices), une par classe.
  phase = '3 séance COURS';
  const prof = client();
  const rp = await mesure('connexion prof', () => prof.auth.signInWithPassword({ email: prep.prof, password: mdp }));
  if (rp.error) throw new Error('Connexion du professeur fictif : ' + rp.error.message);
  const items = [1, 2, 3].map(n => ({ titre: 'Exercice ' + n, chapitre: 'Test de charge', html: '<p>Exercice de test ' + n + '</p>' }));
  const seances = new Map();
  for (const c of prep.classes) {
    const r = await mesure('ouvrir la séance', () => prof.from('cours_direct').insert({ teacher_id: rp.data.user.id, class_id: c, titre: 'Test de charge', items, etat: { idx: 0, mode: 'libre' } }).select('id').single());
    if (r.error) throw new Error('Séance : ' + r.error.message);
    seances.set(c, r.data.id);
  }
  const finSeance = Date.now() + MIN_SEANCE * 60000;
  const canaux = [];
  // Professeur : une télécommande par classe.
  const profs = [...seances.values()].map(id => (async () => {
    let ch = null;
    if (TEMPS_REEL) {
      ch = prof.channel('cd-' + id, { config: { broadcast: { self: false } } })
        .on('broadcast', { event: 'trav' }, ({ payload }) => { mesure('prof : travail reçu', () => prof.from('cours_direct_travaux').select('student_id,reponses,updated_at').eq('direct_id', id).eq('item', payload.k).eq('student_id', payload.e)); })
        .subscribe();
      canaux.push([prof, ch]);
    }
    while (jusqua(finSeance)) {
      await Promise.all([
        mesure('prof : élèves', () => prof.from('cours_direct_membres').select('student_id,vu_at,dehors,sorties,sortie_at').eq('direct_id', id)),
        mesure('prof : travaux', () => prof.from('cours_direct_travaux').select('student_id,reponses,updated_at').eq('direct_id', id).eq('item', 0)),
      ]);
      await dormir(5000);
    }
  })());
  const elevesSeance = actifs.map(e => (async () => {
    const id = seances.get(e.classe);
    await dormir(hasard(0, 30000)); // le bandeau « Rejoindre » apparaît à la veille suivante
    const r = await mesure('rejoindre', () => e.sb.rpc('cours_direct_rejoindre_id', { p_id: id }));
    if (r.error) return;
    await mesure('état de la séance', () => e.sb.rpc('cours_direct_etat', { p_id: id }));
    let ch = null;
    if (TEMPS_REEL) {
      const t0 = performance.now();
      await new Promise(ok => {
        ch = e.sb.channel('cd-' + id, { config: { broadcast: { self: false } } })
          .subscribe(s => { if (s === 'SUBSCRIBED' || s === 'CHANNEL_ERROR' || s === 'TIMED_OUT') { noter('temps réel : abonnement', performance.now() - t0, s === 'SUBSCRIBED' ? null : s); ok(); } });
      });
      canaux.push([e.sb, ch]);
    }
    let signal = Date.now();
    while (jusqua(finSeance)) {
      await dormir(hasard(3000, 8000));
      const k = Math.floor(Math.random() * 3);
      const rt = await mesure('enregistrer le travail', () => e.sb.rpc('cours_direct_travail', { p_id: id, p_item: k, p_reponses: { q1: 'réponse ' + Math.floor(Math.random() * 1000) } }));
      if (!rt.error && ch) { try { ch.send({ type: 'broadcast', event: 'trav', payload: { e: e.id, k } }); } catch (x) {} }
      if (Date.now() - signal > 20000) { signal = Date.now(); await mesure('signal de présence', () => e.sb.rpc('cours_direct_signal', { p_id: id, p_dehors: false })); }
    }
  })());
  await Promise.all([...profs, ...elevesSeance]);
  for (const id of seances.values()) await mesure('fermer la séance', () => prof.from('cours_direct').update({ ended_at: new Date().toISOString() }).eq('id', id));
  for (const [sb, ch] of canaux) { try { await sb.removeChannel(ch); } catch (x) {} }

  // 4. Automatismes.
  phase = '4 automatismes';
  await pourTous(actifs, async e => {
    await dormir(hasard(0, 20000));
    await mesure('records', () => e.sb.rpc('cm_get_all_records', { p_class_id: e.classe }));
    await dormir(hasard(20000, 60000));
    await mesure('enregistrer un résultat', () => e.sb.from('cm_results').insert({ student_id: e.id, class_id: e.classe, sequence_id: '1', sequence_label: 'Test de charge', score: 8, total: 10, duration_ms: Math.round(hasard(30000, 90000)) }));
  });
} catch (e) {
  console.error('ARRÊT : ' + (e.message || e));
  process.exitCode = 1;
} finally {
  phase = 'nettoyage';
  try { const r = await fonction('supprimer'); console.log(`Nettoyage : ${r.eleves} élèves et ${r.classes} classe(s) supprimés.`); }
  catch (e) { console.error('Nettoyage impossible : ' + e.message + ' (relancer le workflow avec « nettoyer seulement »)'); process.exitCode = 1; }
}

// ---------- rapport ----------
const q = (t, p) => { if (!t.length) return 0; const s = [...t].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
const ms = v => v >= 1000 ? (v / 1000).toFixed(1) + ' s' : Math.round(v) + ' ms';
const lignes = [...stats.entries()].map(([k, s]) => {
  const ne = Object.values(s.err).reduce((a, b) => a + b, 0);
  return { op: k, n: s.n, erreurs: ne, detail: Object.entries(s.err).map(([e, n]) => n + ' × ' + e).join(' ; '), p50: q(s.t, .5), p95: q(s.t, .95), max: Math.max(...s.t) };
});
const total = lignes.reduce((a, l) => a + l.n, 0), ko = lignes.reduce((a, l) => a + l.erreurs, 0);
const p95max = Math.max(0, ...lignes.filter(l => !/connexion/.test(l.op)).map(l => l.p95));
const verdict = ko / Math.max(1, total) < 0.01 && p95max < 1000 ? '✅ Tient la charge' : ko / Math.max(1, total) < 0.05 && p95max < 3000 ? '⚠️ Tient, mais avec des lenteurs' : '❌ Ne tient pas';
const md = [
  `## Test de charge : ${ELEVES} élèves (${Math.ceil(ELEVES / 30)} classe(s)) · ${verdict}`, '',
  `Durée ${Math.round((Date.now() - debut) / 60000)} min · ${total} requêtes · ${ko} en erreur (${(100 * ko / Math.max(1, total)).toFixed(2)} %) · refus du serveur réessayés : ${JSON.stringify(refus)} · temps réel : ${TEMPS_REEL ? 'oui' : 'non'}`, '',
  '| Étape · action | Requêtes | Erreurs | Médiane | 95 % sous | Max |', '|---|---:|---:|---:|---:|---:|',
  ...lignes.map(l => `| ${l.op} | ${l.n} | ${l.erreurs}${l.detail ? ' (' + l.detail + ')' : ''} | ${ms(l.p50)} | ${ms(l.p95)} | ${ms(l.max)} |`),
].join('\n');
console.log('\n' + md);
writeFileSync('resultats.json', JSON.stringify({ eleves: ELEVES, verdict, refus, lignes }, null, 2));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
// Aussi en annotation de l'exécution (lisible par l'API GitHub, contrairement aux journaux).
if (process.env.GITHUB_ACTIONS) console.log('::notice title=Test de charge::' + md.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A'));
process.exit(process.exitCode || 0);
