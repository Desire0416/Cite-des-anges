/**
 * Règles du formulaire de demande (section 11 du cahier des charges).
 * Partagées entre le navigateur et le point d'entrée serveur.
 */
import { schoolYears } from "./site";

export const MOTIFS = [
  { value: "preinscription", label: "Préinscription" },
  { value: "rendez-vous", label: "Rendez-vous" },
  { value: "renseignement", label: "Renseignement" },
] as const;

export const CYCLES = [
  { value: "maternelle", label: "Maternelle" },
  { value: "primaire", label: "Primaire" },
  { value: "conseil", label: "Je souhaite être conseillé" },
] as const;

export type Motif = (typeof MOTIFS)[number]["value"];
export type Cycle = (typeof CYCLES)[number]["value"];

export const MESSAGE_MAX = 1000;

export type InquiryInput = {
  nom: string;
  telephone: string;
  email: string;
  motif: string;
  cycle: string;
  annee: string;
  message: string;
};

export type InquiryData = {
  nom: string;
  telephone: string;
  email?: string;
  motif: Motif;
  cycle: Cycle;
  annee: string;
  message?: string;
};

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

/** Ordre des champs, utilisé pour placer le focus sur la première erreur. */
export const FIELD_ORDER: Array<keyof InquiryInput> = [
  "motif",
  "nom",
  "telephone",
  "email",
  "cycle",
  "annee",
  "message",
];

/**
 * Normalise un numéro : numéros ivoiriens à 10 chiffres complétés par +225,
 * numéros internationaux conservés avec leur indicatif.
 */
export function normalizePhone(raw: string) {
  let value = raw.trim().replace(/[\s.\-()/]/g, "");
  if (value.startsWith("00")) value = `+${value.slice(2)}`;
  if (/^\d{10}$/.test(value)) value = `+225${value}`;
  if (/^225\d{10}$/.test(value)) value = `+${value}`;
  return value;
}

export function isValidPhone(normalized: string) {
  if (normalized.startsWith("+225")) return /^\+225\d{10}$/.test(normalized);
  return /^\+[1-9]\d{7,14}$/.test(normalized);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(input: InquiryInput):
  | { ok: true; data: InquiryData }
  | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const nom = input.nom.trim().replace(/\s+/g, " ");
  if (nom.length < 2) errors.nom = "Indiquez votre nom (au moins 2 caractères).";
  else if (nom.length > 100) errors.nom = "Le nom ne peut pas dépasser 100 caractères.";

  const telephone = normalizePhone(input.telephone);
  if (!input.telephone.trim()) errors.telephone = "Indiquez un numéro de téléphone pour être rappelé.";
  else if (!isValidPhone(telephone))
    errors.telephone = "Ce numéro semble incomplet. Exemple : 07 02 29 09 00 ou +33 6 12 34 56 78.";

  const email = input.email.trim();
  if (email && (email.length > 254 || !EMAIL_RE.test(email)))
    errors.email = "Vérifiez le format de l’adresse email (exemple : nom@domaine.ci).";

  if (!MOTIFS.some((m) => m.value === input.motif)) errors.motif = "Choisissez le motif de votre demande.";
  if (!CYCLES.some((c) => c.value === input.cycle)) errors.cycle = "Choisissez le cycle souhaité.";
  if (!schoolYears.includes(input.annee)) errors.annee = "Choisissez l’année scolaire concernée.";

  const message = input.message.trim();
  if (message.length > MESSAGE_MAX)
    errors.message = `Le message ne peut pas dépasser ${MESSAGE_MAX} caractères.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      nom,
      telephone,
      email: email || undefined,
      motif: input.motif as Motif,
      cycle: input.cycle as Cycle,
      annee: input.annee,
      message: message || undefined,
    },
  };
}

export const ORIGINS = [
  "/",
  "/ecole",
  "/maternelle",
  "/primaire",
  "/accueil-inclusif",
  "/admissions",
  "/contact",
] as const;

export function labelOf<T extends { value: string; label: string }>(list: readonly T[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}
