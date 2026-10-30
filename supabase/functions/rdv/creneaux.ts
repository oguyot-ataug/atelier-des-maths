// supabase/functions/rdv/creneaux.ts
//
// Calcul des créneaux de rendez-vous libres, en heures de Paris (heure d'été comprise). Sans dépendance, pour être
// testé hors de Deno. Utilisé par la fonction rdv (index.ts).

export type Plage = [string, string]; // ["18:00", "20:00"]
export type Reglages = {
  plages: Record<string, Plage[]>; // 1 = lundi … 7 = dimanche
  duree_min: number;
  pause_min: number;
  preavis_h: number;
  horizon_j: number;
  bloques: { du: string; au?: string; motif?: string }[];
};
export type Intervalle = { debut: number; fin: number }; // instants en millisecondes
export type Creneau = { debut: string; jour: string; heure: string };

const FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

// Instant → jour (AAAA-MM-JJ) et heure (HH:MM) à Paris.
export function enParis(ms: number): { jour: string; heure: string } {
  const p = Object.fromEntries(FMT.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return { jour: `${p.year}-${p.month}-${p.day}`, heure: `${p.hour}:${p.minute}` };
}

// Jour et heure de Paris → instant (ms).
export function deParis(jour: string, heure: string): number {
  const [y, m, d] = jour.split("-").map(Number), [h, mi] = heure.split(":").map(Number);
  const voulu = Date.UTC(y, m - 1, d, h, mi);
  let t = voulu;
  for (let i = 0; i < 2; i++) {
    const p = enParis(t);
    const [py, pm, pd] = p.jour.split("-").map(Number), [ph, pmi] = p.heure.split(":").map(Number);
    t += voulu - Date.UTC(py, pm - 1, pd, ph, pmi);
  }
  return t;
}

// 1 = lundi … 7 = dimanche.
export function jourSemaine(jour: string): number {
  const [y, m, d] = jour.split("-").map(Number);
  const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return w === 0 ? 7 : w;
}

// Jours de `de` à `a` inclus (62 au plus).
export function joursEntre(de: string, a: string): string[] {
  const [y, m, d] = de.split("-").map(Number);
  const out: string[] = [];
  for (let t = Date.UTC(y, m - 1, d); out.length < 62; t += 86400000) {
    const j = new Date(t).toISOString().slice(0, 10);
    if (j > a) break;
    out.push(j);
  }
  return out;
}

// Créneaux libres de `de` à `a` : dans les plages du jour, au moins `preavis_h` heures après maintenant, au plus
// `horizon_j` jours après, hors périodes bloquées. Les créneaux s'enchaînent sans pause (8 h, 8 h 30, 9 h…) ; la pause ne
// sert qu'autour d'un moment occupé (rendez-vous pris, agenda Google) : un créneau doit finir `pause_min` avant lui, et
// après lui la grille repart de sa fin plus la pause -- demandé le 30/10/2026 : « Il y a toujours un décalage de 10 minutes entre
// chaque RV qui ne fait que grandir. Il faut que ça s'adapte. »
export function creneauxLibres(r: Reglages, de: string, a: string, maintenant: number, occupes: Intervalle[]): Creneau[] {
  const res: Creneau[] = [];
  const duree = r.duree_min * 60000, pause = r.pause_min * 60000;
  const mini = maintenant + r.preavis_h * 3600000, maxi = maintenant + r.horizon_j * 86400000;
  for (const jour of joursEntre(de, a)) {
    if ((r.bloques || []).some((b) => b && b.du && jour >= b.du && jour <= (b.au || b.du))) continue;
    for (const [h1, h2] of (r.plages || {})[String(jourSemaine(jour))] || []) {
      const finPlage = deParis(jour, h2);
      let debut = deParis(jour, h1);
      while (debut + duree <= finPlage) {
        const fin = debut + duree;
        const genes = occupes.filter((o) => o.debut < fin + pause && o.fin > debut - pause);
        if (genes.length) { debut = Math.max(...genes.map((o) => o.fin)) + pause; continue; }
        if (debut >= mini && debut <= maxi) res.push({ debut: new Date(debut).toISOString(), jour, heure: enParis(debut).heure });
        debut = fin;
      }
    }
  }
  return res;
}
