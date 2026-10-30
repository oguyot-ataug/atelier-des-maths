// supabase/functions/stripe-webhook/facture-pdf.ts
//
// Facture en PDF, jointe à l'e-mail envoyé après un paiement -- demandé le 30/10/2026 : « Joins la
// facture en PDF à l'e-mail. » Même mise en page que la facture du site (facDocHtml, facturation.js),
// pour les factures acquittées des offres Professeur et Famille (client « particulier », payé par carte).
// Polices standard du PDF (Helvetica) : les caractères hors de leur jeu sont remplacés (voir propre()).

import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";

const BLEU = rgb(12 / 255, 91 / 255, 160 / 255);
const ENCRE = rgb(28 / 255, 35 / 255, 48 / 255);
const GRIS = rgb(107 / 255, 116 / 255, 130 / 255);
const GRIS_TEXTE = rgb(85 / 255, 85 / 255, 85 / 255);
const VERT = rgb(31 / 255, 122 / 255, 77 / 255);
const VIOLET = rgb(75 / 255, 44 / 255, 145 / 255);
const LIGNE = rgb(227 / 255, 231 / 255, 236 / 255);
const BORD = rgb(207 / 255, 214 / 255, 223 / 255);
const FOND_ENTETE = rgb(238 / 255, 243 / 255, 249 / 255);
const FOND_OBJET = rgb(245 / 255, 248 / 255, 252 / 255);
const FOND_TEST = rgb(244 / 255, 240 / 255, 252 / 255);

const LIB: Record<string, string> = { cm1: "CM1", cm2: "CM2" };
const date = (d: string | null | undefined) => d ? String(d).slice(0, 10).split("-").reverse().join("/") : "";
function euros(n: unknown): string {
  const [e, c] = (Math.round((Number(n) || 0) * 100) / 100).toFixed(2).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "," + c + " €";
}

export async function facturePdf(d: any, logos: { atelier?: Uint8Array | null; maths?: Uint8Array | null } = {}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle("Facture " + d.numero);
  pdf.setAuthor(String(d.emetteur?.nom || "L'Atelier Augmenté"));
  pdf.setLanguage("fr-FR");
  const f = await pdf.embedFont(StandardFonts.Helvetica);
  const fb = await pdf.embedFont(StandardFonts.HelveticaBold);
  const jeu = new Set(f.getCharacterSet());
  // Texte limité au jeu de caractères des polices standard (WinAnsi).
  const propre = (s: unknown) => String(s ?? "")
    .replace(/[−‐‑]/g, "-").replace(/[   ]/g, " ").replace(/→/g, "->")
    .replace(/[^\n]/g, (ch) => jeu.has(ch.codePointAt(0)!) ? ch : "?");

  const page = pdf.addPage([595.28, 841.89]); // A4
  const W = page.getWidth(), H = page.getHeight(), M = 42, droite = W - M;
  let y = H - M;

  const larg = (t: string, taille: number, gras = false) => (gras ? fb : f).widthOfTextAtSize(t, taille);
  const texte = (t: string, x: number, yy: number, taille: number, o: { gras?: boolean; couleur?: any } = {}) =>
    page.drawText(propre(t), { x, y: yy, size: taille, font: o.gras ? fb : f, color: o.couleur || ENCRE });
  const aDroite = (t: string, xd: number, yy: number, taille: number, o: { gras?: boolean; couleur?: any } = {}) =>
    texte(t, xd - larg(propre(t), taille, o.gras), yy, taille, o);
  // Découpe en lignes d'au plus `max` points (respecte les retours à la ligne du texte).
  function lignes(t: unknown, taille: number, max: number, gras = false): string[] {
    const out: string[] = [];
    for (const para of propre(t).split("\n")) {
      let cur = "";
      for (const mot of para.split(/ +/)) {
        const essai = cur ? cur + " " + mot : mot;
        if (!cur || larg(essai, taille, gras) <= max) cur = essai;
        else { out.push(cur); cur = mot; }
      }
      out.push(cur);
    }
    return out;
  }

  const em = d.emetteur || {}, cli = d.client || {};
  const particulier = cli.statut === "particulier";
  const acquittee = particulier && d.type === "facture";

  // Bandeau des documents de test
  if (d.test) {
    page.drawRectangle({ x: M, y: y - 26, width: droite - M, height: 26, color: FOND_TEST, borderColor: VIOLET, borderWidth: 1.5, borderDashArray: [5, 3] });
    const t = "DOCUMENT DE TEST – SANS VALEUR (paiement simulé, aucun encaissement)";
    texte(t, M + (droite - M - larg(t, 9.5, true)) / 2, y - 17, 9.5, { gras: true, couleur: VIOLET });
    y -= 40;
  }

  // Émetteur (à gauche) et titre (à droite)
  const haut = y;
  if (logos.atelier) {
    try { const img = await pdf.embedPng(logos.atelier); const h = 58, w = img.width * h / img.height; page.drawImage(img, { x: M, y: y - h, width: w, height: h }); y -= h + 8; } catch (_) { /* sans logo */ }
  }
  texte(em.nom || "", M, y - 11, 12, { gras: true }); y -= 15;
  const infos = [em.enseigne, ...String(em.adresse || "").split("\n"), em.siret ? "SIRET " + em.siret : "", em.rcs,
    [em.email, em.telephone].filter(Boolean).join(" · ")].filter((x) => x && String(x).trim());
  for (const l of infos) { texte(l, M, y - 9.5, 9.5); y -= 13; }
  const titre = ({ devis: "DEVIS", facture: "FACTURE", avoir: "AVOIR" } as Record<string, string>)[d.type] || "FACTURE";
  let yt = haut - 22;
  aDroite(titre, droite, yt, 22, { gras: true, couleur: BLEU }); yt -= 18;
  const nLab = "N° ", nVal = String(d.numero || "");
  aDroite(nVal, droite, yt, 10, { gras: true }); aDroite(nLab, droite - larg(propre(nVal), 10, true), yt, 10); yt -= 14;
  aDroite("Date : " + date(d.date_emission), droite, yt, 10); yt -= 14;
  if (acquittee) { aDroite("Acquittée", droite, yt, 10, { gras: true, couleur: VERT }); yt -= 14; }
  if (d.type === "facture" && d.date_echeance) { aDroite("Échéance : " + date(d.date_echeance), droite, yt, 10); yt -= 14; }
  y = Math.min(y, yt) - 14;

  // Destinataire (moitié droite)
  const bx = M + (droite - M) * 0.52, bw = droite - bx, pad = 10;
  const dest: { t: string; gras?: boolean; petit?: boolean }[] = [{ t: "FACTURÉ À", petit: true }];
  for (const l of lignes(cli.organisme || cli.nom || "", 10.5, bw - 2 * pad, true)) dest.push({ t: l, gras: true });
  if (cli.organisme && cli.nom) dest.push({ t: "pour " + cli.nom });
  for (const l of lignes(cli.adresse || "", 10.5, bw - 2 * pad)) if (l.trim()) dest.push({ t: l });
  if (particulier && cli.email && !/@mathcollege\.local$/i.test(cli.email)) dest.push({ t: cli.email });
  if (cli.uai) dest.push({ t: "UAI " + cli.uai });
  if (cli.siret) dest.push({ t: "SIRET " + cli.siret });
  const bh = pad * 2 + dest.reduce((h, l) => h + (l.petit ? 12 : 14.5), 0) - 3;
  page.drawRectangle({ x: bx, y: y - bh, width: bw, height: bh, borderColor: BORD, borderWidth: 1 });
  let yd = y - pad;
  for (const l of dest) {
    if (l.petit) { texte(l.t, bx + pad, yd - 8, 8, { couleur: GRIS }); yd -= 12; }
    else { texte(l.t, bx + pad, yd - 10.5, 10.5, { gras: l.gras }); yd -= 14.5; }
  }
  y -= bh + 14;

  // Objet
  const periode = d.periode_debut && d.periode_fin ? "du " + date(d.periode_debut) + " au " + date(d.periode_fin) : "";
  const quoi = d.prof_id ? "offre professeur" : particulier ? "offre Famille" : "licence établissement";
  const niv = (d.niveaux || []).map((n: string) => LIB[n] || n).join(", ");
  const objet = "L'Atelier des Maths (latelierdesmaths.fr) – " + quoi + (periode ? ", " + periode : "") + (niv ? " – niveaux " + niv : "") + ".";
  let logoMaths: any = null;
  if (logos.maths) { try { logoMaths = await pdf.embedPng(logos.maths); } catch (_) { /* sans logo */ } }
  const lh = 38, lw = logoMaths ? logoMaths.width * lh / logoMaths.height : 0;
  const tx = M + 10 + (lw ? lw + 12 : 0), tmax = droite - 10 - tx;
  const lObjet = lignes("Objet : " + objet, 10.5, tmax);
  const oh = Math.max(lh + 12, lObjet.length * 14 + 14);
  page.drawRectangle({ x: M, y: y - oh, width: droite - M, height: oh, color: FOND_OBJET });
  if (logoMaths) page.drawImage(logoMaths, { x: M + 10, y: y - oh + (oh - lh) / 2, width: lw, height: lh });
  let yo = y - (oh - lObjet.length * 14) / 2 - 10;
  lObjet.forEach((l, i) => {
    if (i === 0 && l.startsWith("Objet :")) { texte("Objet :", tx, yo, 10.5, { gras: true }); texte(l.slice(7), tx + larg("Objet :", 10.5, true), yo, 10.5); }
    else texte(l, tx, yo, 10.5);
    yo -= 14;
  });
  y -= oh + 12;

  // Lignes de la facture
  const cQte = droite - 200, cPu = droite - 90, cMt = droite;
  const desMax = cQte - 70 - (M + 8);
  page.drawRectangle({ x: M, y: y - 20, width: droite - M, height: 20, color: FOND_ENTETE });
  page.drawLine({ start: { x: M, y: y - 20 }, end: { x: droite, y: y - 20 }, thickness: 0.8, color: BORD });
  texte("Désignation", M + 8, y - 13.5, 9, { gras: true });
  aDroite("Quantité", cQte - 8, y - 13.5, 9, { gras: true });
  aDroite("Prix unitaire", cPu - 8, y - 13.5, 9, { gras: true });
  aDroite("Montant", cMt - 8, y - 13.5, 9, { gras: true });
  y -= 20;
  for (const l of d.lignes || []) {
    const des = lignes(l.designation, 10.5, desMax), det = l.detail ? lignes(l.detail, 8.5, desMax) : [];
    let yl = y - 8;
    des.forEach((t) => { texte(t, M + 8, yl - 10, 10.5); yl -= 13.5; });
    det.forEach((t) => { texte(t, M + 8, yl - 9, 8.5, { couleur: GRIS }); yl -= 11; });
    const q = Number(l.qte) || 0;
    const qte = q + (l.unite ? " " + l.unite + (Math.abs(q) > 1 ? "s" : "") : "");
    aDroite(qte, cQte - 8, y - 18, 10.5);
    aDroite(euros(l.pu), cPu - 8, y - 18, 10.5);
    aDroite(euros(Math.round(q * Number(l.pu) * 100) / 100), cMt - 8, y - 18, 10.5);
    y = yl - 6;
    page.drawLine({ start: { x: M, y }, end: { x: droite, y }, thickness: 0.6, color: LIGNE });
  }

  // Total
  y -= 14;
  const tx0 = droite - (droite - M) * 0.55;
  page.drawLine({ start: { x: tx0, y }, end: { x: droite, y }, thickness: 2, color: ENCRE });
  const libTotal = d.type === "avoir" ? "Total de l'avoir" : d.type === "devis" ? "Total" : particulier ? "Total payé" : "Net à payer";
  texte(libTotal, tx0 + 8, y - 17, 12.5, { gras: true });
  aDroite(euros(d.total), droite - 8, y - 17, 12.5, { gras: true });
  y -= 30;
  if (em.mention_tva) { aDroite(em.mention_tva, droite, y - 9, 9, { couleur: GRIS_TEXTE }); y -= 16; }
  if (d.notes) {
    const ln = lignes(d.notes, 10, droite - M - 20);
    const nh = ln.length * 13 + 12;
    page.drawRectangle({ x: M, y: y - nh, width: droite - M, height: nh, color: rgb(246 / 255, 247 / 255, 249 / 255) });
    ln.forEach((t, i) => texte(t, M + 10, y - 16 - i * 13, 10));
    y -= nh + 8;
  }

  // Paiement
  y -= 12;
  if (acquittee) {
    const p1 = lignes("Facture acquittée : payée par carte bancaire le " + date(d.paye_le || d.date_emission) + " (paiement en ligne sécurisé).", 10.5, droite - M);
    p1.forEach((t, i) => {
      if (i === 0) { texte("Facture acquittée", M, y - 10.5, 10.5, { gras: true }); texte(t.slice("Facture acquittée".length), M + larg("Facture acquittée", 10.5, true), y - 10.5, 10.5); }
      else texte(t, M, y - 10.5, 10.5);
      y -= 14;
    });
    y -= 6;
    const p2 = (d.prof_id ? "Accès professionnel à L'Atelier des Maths" : "Accès personnel et familial à L'Atelier des Maths") +
      ", sans reconduction automatique. Conditions générales de vente : latelierdesmaths.fr/#/cgv.";
    for (const t of lignes(p2, 8.5, droite - M)) { texte(t, M, y - 8.5, 8.5, { couleur: GRIS_TEXTE }); y -= 11; }
  }

  // Pied de page
  const pied = [em.nom, em.enseigne].filter(Boolean).join(" – ") + " · SIRET " + (em.siret || "") + (em.rcs ? " · " + em.rcs : "") + (em.email ? " · " + em.email : "");
  page.drawLine({ start: { x: M, y: M + 14 }, end: { x: droite, y: M + 14 }, thickness: 0.6, color: BORD });
  lignes(pied, 8, droite - M).forEach((t, i) => texte(t, M + (droite - M - larg(t, 8)) / 2, M + 2 - i * 10, 8, { couleur: GRIS }));

  return await pdf.save();
}

// Contenu base64 (pièce jointe Resend).
export function base64(octets: Uint8Array): string {
  let s = "";
  for (let i = 0; i < octets.length; i += 0x8000) s += String.fromCharCode(...octets.subarray(i, i + 0x8000));
  return btoa(s);
}
