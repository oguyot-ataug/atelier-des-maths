// E-mail de bienvenue envoyé au professeur quand l'administrateur approuve son inscription -- demandé le 01/11/2026
// (« Est-ce qu'elle a reçu un joli mail ? », puis « Oui, fais les deux et montre moi le mail avant d'envoyer à
// Virginie »). Même présentation que les autres e-mails du site (bandeau bleu marine, liseré orange, bouton orange).
// Fichier sans dépendance, pour pouvoir aussi en tirer un aperçu hors de Supabase.

const SITE = "https://latelierdesmaths.fr";
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function mailBienvenue(p: { prenom: string | null; identifiant: string; finEssai: Date | null }) {
  const bonjour = p.prenom ? `Bonjour ${p.prenom},` : "Bonjour,";
  const fin = p.finEssai
    ? p.finEssai.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" })
    : null;
  const acces = fin
    ? `Votre essai gratuit de 15 jours commence aujourd'hui et court jusqu'au <b>${fin}</b>, avec un accès complet au site.`
    : `Pendant la période de lancement, votre accès est <b>complet et gratuit</b>, sans date de fin.`;
  const etapes: [string, string, string, string][] = [
    ["Parcourir un chapitre", "Cours avec figures manipulables, méthodes animées, exercices corrigés et quiz, du CP à la 3e.", "/", "Voir les cours"],
    ["Créer vos classes", "Dans « Mes classes » : chaque élève reçoit son identifiant, et vous suivez ses devoirs et ses résultats.", "/#/supervision", "Mes classes"],
    ["Projeter une correction", "Rédigez la correction au clavier et projetez-la en direct, figures et opérations posées comprises.", "/#/correction", "Outil de correction"],
  ];
  const etapesHtml = etapes.map(([t, d, href, lien], i) => `
      <tr>
        <td style="vertical-align:top;padding:0 12px 14px 0;width:30px;"><div style="width:28px;height:28px;border-radius:50%;background:#FFF1E0;color:#FF8208;font-weight:bold;font-size:15px;line-height:28px;text-align:center;">${i + 1}</div></td>
        <td style="vertical-align:top;padding:0 0 14px 0;font-size:14px;line-height:1.5;"><b style="color:#1F3A5C;">${t}</b><br>${d}<br><a href="${SITE}${href}" style="color:#0C5BA0;font-weight:bold;text-decoration:none;">${lien} →</a></td>
      </tr>`).join("");
  const html = `<div style="background:#F3F6FA;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1F2A37;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E1E7EF;border-radius:14px;overflow:hidden;">
    <div style="background:#1F3A5C;padding:20px 28px;color:#FFFFFF;font-size:20px;font-weight:bold;">L'Atelier des Maths</div>
    <div style="height:5px;background:#FF8208;font-size:0;line-height:0;">&nbsp;</div>
    <div style="padding:26px 28px 8px 28px;font-size:15px;line-height:1.6;">
      <h2 style="font-size:20px;margin:0 0 14px 0;color:#1F3A5C;">Bienvenue, votre compte est ouvert !</h2>
      <p style="margin:0 0 14px 0;">${esc(bonjour)}</p>
      <p style="margin:0 0 14px 0;">Bonne nouvelle : votre inscription comme professeur sur L'Atelier des Maths est validée. Vous pouvez vous connecter dès maintenant.</p>
      <div style="background:#F7F9FC;border:1px solid #E1E7EF;border-radius:10px;padding:12px 16px;margin:0 0 14px 0;font-size:14px;">
        Votre identifiant : <b>${esc(p.identifiant)}</b><br>
        Votre mot de passe : celui que vous avez choisi en vous inscrivant.
      </div>
      <p style="margin:0 0 14px 0;">${acces}</p>
      <p style="margin:22px 0;text-align:center;"><a href="${SITE}/" style="background:#FF8208;color:#FFFFFF;text-decoration:none;padding:12px 26px;border-radius:999px;font-weight:bold;display:inline-block;">Me connecter</a></p>
      <h3 style="font-size:16px;margin:8px 0 12px 0;color:#1F3A5C;">Pour bien démarrer</h3>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">${etapesHtml}
      </table>
      <p style="margin:6px 0 14px 0;">Une question, ou envie d'une démonstration ? <a href="${SITE}/#/rendez-vous" style="color:#0C5BA0;font-weight:bold;">Prenez rendez-vous</a> pour en parler, ou répondez simplement à cet e-mail.</p>
      <p style="margin:0 0 18px 0;">Bonne découverte !<br>L'équipe de L'Atelier des Maths</p>
    </div>
    <div style="background:#F7F9FC;border-top:1px solid #E1E7EF;padding:14px 28px;font-size:12px;color:#5B6472;">latelierdesmaths.fr · une production de L'Atelier Augmenté</div>
  </div></div>`;
  const texte = `${bonjour}

Bonne nouvelle : votre inscription comme professeur sur L'Atelier des Maths est validée. Vous pouvez vous connecter dès maintenant : ${SITE}/

Votre identifiant : ${p.identifiant}
Votre mot de passe : celui que vous avez choisi en vous inscrivant.

${acces.replace(/<\/?b>/g, "")}

Pour bien démarrer :
${etapes.map(([t, d, href]) => `- ${t} : ${d} ${SITE}${href}`).join("\n")}

Une question, ou envie d'une démonstration ? Prenez rendez-vous : ${SITE}/#/rendez-vous, ou répondez simplement à cet e-mail.

Bonne découverte !
L'équipe de L'Atelier des Maths – latelierdesmaths.fr`;
  return { sujet: "Bienvenue sur L'Atelier des Maths : votre compte est ouvert", html, texte };
}
