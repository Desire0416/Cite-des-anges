/**
 * DONNÉES FICTIVES — utilisées uniquement pour présenter l'aperçu de gestion.
 * Aucun de ces enregistrements ne correspond à une famille réelle.
 */
import type { Cycle, Motif } from "./inquiry";

export const STATUSES = [
  "Nouvelle",
  "À contacter",
  "Contact établi",
  "Rendez-vous convenu",
  "Clôturée",
  "Inscription confirmée",
] as const;

export type Status = (typeof STATUSES)[number];

export type InquiryAction = {
  date: string;
  author: string;
  label: string;
};

export type DemoInquiry = {
  id: string;
  reference: string;
  parent: string;
  telephone: string;
  email?: string;
  motif: Motif;
  cycle: Cycle;
  annee: string;
  message?: string;
  status: Status;
  origine: string;
  createdAt: string;
  assignee?: string;
  nextAction?: string;
  note?: string;
  history: InquiryAction[];
};

export const ASSIGNEES = ["Référent admissions", "Suppléant admissions", "Direction"] as const;

type Seed = [string, Motif, Cycle, Status, string, string, string?, string?];

// [parent, motif, cycle, statut, origine, date ISO, message, assigné]
const seeds: Seed[] = [
  ["Aya K.", "preinscription", "maternelle", "Nouvelle", "/maternelle", "2026-10-06T08:42:00", "Nous aimerions connaître les sections ouvertes pour la rentrée."],
  ["Mamadou T.", "rendez-vous", "primaire", "Nouvelle", "/admissions", "2026-10-06T07:15:00"],
  ["Christelle N.", "renseignement", "conseil", "À contacter", "/", "2026-10-05T18:03:00", "Quels sont les frais pour deux enfants ?", "Référent admissions"],
  ["Jean-Marc Y.", "preinscription", "primaire", "À contacter", "/primaire", "2026-10-05T11:27:00", undefined, "Référent admissions"],
  ["Fatou D.", "rendez-vous", "conseil", "Contact établi", "/accueil-inclusif", "2026-10-04T16:40:00", "Nous souhaitons échanger avec l’administration sur l’accueil de notre fils.", "Direction"],
  ["Serge K.", "preinscription", "maternelle", "Rendez-vous convenu", "/maternelle", "2026-10-03T09:12:00", undefined, "Référent admissions"],
  ["Mariam O.", "renseignement", "primaire", "Contact établi", "/contact", "2026-10-02T14:55:00", "Mon enfant arrive d’une autre école en cours d’année.", "Suppléant admissions"],
  ["Ange B.", "preinscription", "primaire", "Clôturée", "/admissions", "2026-09-30T10:20:00", undefined, "Référent admissions"],
  ["Prisca K.", "rendez-vous", "maternelle", "Rendez-vous convenu", "/admissions", "2026-09-29T17:48:00", "Disponible plutôt en fin de journée.", "Référent admissions"],
  ["Ibrahim C.", "preinscription", "conseil", "Inscription confirmée", "/", "2026-09-26T08:05:00", undefined, "Direction"],
  ["Estelle A.", "renseignement", "maternelle", "Clôturée", "/maternelle", "2026-09-24T12:31:00", undefined, "Suppléant admissions"],
  ["Didier G.", "preinscription", "primaire", "À contacter", "/primaire", "2026-09-23T19:10:00", "Pouvez-vous me rappeler en semaine ?"],
];

export const demoInquiries: DemoInquiry[] = seeds.map(([parent, motif, cycle, status, origine, createdAt, message, assignee], i) => {
  const n = String(i + 1).padStart(2, "0");
  const history: InquiryAction[] = [{ date: createdAt, author: "Site internet", label: "Demande reçue" }];
  if (status !== "Nouvelle") {
    history.push({
      date: new Date(new Date(createdAt).getTime() + 1000 * 60 * 60 * 3).toISOString(),
      author: assignee ?? "Référent admissions",
      label: `Statut : ${status}`,
    });
  }
  return {
    id: `demo-${n}`,
    reference: `DEMO-${["7K2M9Q", "H4TN8W", "P3XC6R", "B9LV2D", "Q6ZF4K", "M2RW7H", "T8NB3J", "C5KD9X", "W3HQ6M", "R7FP2B", "Y4GM8T", "D6VC3N"][i]}`,
    parent,
    telephone: `+225 07 00 00 00 ${n}`,
    email: i % 3 === 0 ? undefined : `parent${n}@exemple.ci`,
    motif,
    cycle,
    annee: "2026–2027",
    message,
    status,
    origine,
    createdAt,
    assignee,
    nextAction: status === "À contacter" ? "Rappeler le parent" : status === "Rendez-vous convenu" ? "Préparer l’entretien" : undefined,
    history,
  };
});
