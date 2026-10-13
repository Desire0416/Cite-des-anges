/**
 * Contenus officiels tirés du règlement intérieur de l'établissement
 * (version 01 du 08/05/2026, document signé par la direction).
 * Les formulations reprennent fidèlement le texte du règlement.
 */

/** Article 1 — Horaires scolaires. */
export const schedule = {
  days: ["Lundi", "Mardi", "Jeudi", "Vendredi"],
  summary: "Semaine de 4 jours : lundi, mardi, jeudi et vendredi.",
  rows: [
    { key: "maternelle", cycle: "Maternelle", morning: "08h00 – 11h30", afternoon: "14h00 – 16h00" },
    { key: "cp-ce2", cycle: "CP1 au CE2", morning: "07h45 – 12h00", afternoon: "14h00 – 16h30" },
    { key: "cm", cycle: "CM1 et CM2", morning: "07h30 – 12h00", afternoon: "14h00 – 16h30" },
  ],
  arrival: [
    "Les élèves arrivent au moins 15 minutes avant le début des cours ; ils sont accueillis au portail.",
    "L’après-midi, les enfants peuvent être admis en classe jusqu’à 14h30 ; au-delà, ils sont considérés comme absents.",
    "Les élèves qui ne sont pas inscrits à la cantine rentrent chez eux à midi et n’ont accès à l’établissement qu’à partir de 13h45.",
    "Tout élève retourne chez lui au plus tard à 17h00.",
    "Chaque enseignant accompagne ses élèves jusqu’au portail, où ils sont remis aux parents ou à la personne autorisée par écrit.",
  ],
} as const;

export type ScheduleRow = (typeof schedule.rows)[number];

export function scheduleFor(cycle: "maternelle" | "primaire") {
  return schedule.rows.filter((row) => (cycle === "maternelle" ? row.key === "maternelle" : row.key !== "maternelle"));
}

/** Principes généraux — missions de l'établissement. */
export const missions = [
  { title: "Instruire", text: "Faire acquérir des connaissances et des méthodes de travail." },
  {
    title: "Former",
    text: "Préparer les enfants à leur vie d’adulte, leur faire acquérir des savoirs, savoir-faire et savoir-être au sein d’une collectivité.",
  },
  {
    title: "Éduquer",
    text: "Transmettre et faire vivre les valeurs de responsabilité, de solidarité et de respect mutuel, pour préparer l’enfant à sa vie de citoyen.",
  },
  { title: "Favoriser l’inclusion", text: "Favoriser l’inclusion scolaire des élèves ayant des besoins éducatifs particuliers." },
] as const;

/** Principes généraux — les trois valeurs fondamentales (la devise). */
export const mottoValues = [
  {
    title: "Discipline",
    text: "Pour cultiver le respect des personnes, de l’environnement et des biens publics, ainsi que des règles.",
  },
  {
    title: "Rigueur",
    text: "Pour inculquer la précision, la persévérance et la recherche constante de l’excellence.",
  },
  {
    title: "Travail",
    text: "Pour stimuler le goût de l’effort, la détermination et la réussite.",
  },
] as const;

export const mottoIntro =
  "Trois valeurs fondamentales orientent, au quotidien, chacune des actions éducatives de l’établissement, pour donner à tous les élèves la possibilité de se réaliser.";

/** Règles de vie résumées (articles 2 à 14). */
export const rules = [
  {
    key: "assiduite",
    title: "Assiduité",
    article: "Article 2",
    items: [
      "L’inscription engage les parents au respect du calendrier scolaire et à une fréquentation assidue.",
      "En cas d’absence, les parents préviennent l’école puis en indiquent les raisons par écrit au retour de l’enfant.",
      "Les retards répétés peuvent entraîner une convocation des parents.",
    ],
  },
  {
    key: "cantine",
    title: "Cantine",
    article: "Article 3",
    items: [
      "Un service de cantine facultatif est proposé à la pause déjeuner.",
      "Les élèves y sont inscrits pour un trimestre complet.",
    ],
  },
  {
    key: "tenue",
    title: "Tenue vestimentaire",
    article: "Article 6",
    items: [
      "L’uniforme est obligatoire ; la tenue de sport l’est pendant les cours d’éducation physique.",
      "Chaussures fermées, à lacets, à boucles ou à sangles : ni sandales, ni chaussures fantaisie. Chaque enfant a des chaussures de sport.",
      "Un élève qui ne respecte pas les règles vestimentaires n’est pas admis dans l’établissement.",
    ],
  },
  {
    key: "hygiene",
    title: "Hygiène",
    article: "Article 7",
    items: [
      "Les élèves arrivent avec des vêtements propres.",
      "Cheveux propres et bien coiffés ; cheveux coupés courts pour les garçons.",
      "Les ongles sont coupés ras.",
    ],
  },
  {
    key: "sante",
    title: "Santé",
    article: "Article 8",
    items: [
      "Tout enfant malade est remis à sa famille ; une maladie contagieuse doit être signalée à l’école.",
      "Aucun médicament ne doit être laissé dans les poches ou le sac de l’enfant.",
      "Un médicament n’est administré que sur demande écrite des parents, accompagnée d’une ordonnance.",
    ],
  },
  {
    key: "securite",
    title: "Sécurité",
    article: "Articles 4, 5, 9 et 10",
    items: [
      "Téléphones portables, objets connectés, objets de valeur, argent et objets dangereux sont interdits aux élèves.",
      "Le piercing est interdit pour des raisons de sécurité.",
      "En cas d’accident, le chef d’établissement prend les mesures nécessaires et prévient les parents.",
    ],
  },
  {
    key: "familles",
    title: "Relations avec les familles",
    article: "Articles 11 à 14",
    items: [
      "Les bilans de l’évolution des acquis sont communiqués aux parents chaque mois, sur papier ou par voie électronique.",
      "Réunions de classe en début d’année ; entretiens parents-enseignants sur rendez-vous.",
      "Parents et équipe font preuve de réserve, de courtoisie et de respect mutuel.",
    ],
  },
  {
    key: "engagement",
    title: "Engagement des parents",
    article: "Article 15",
    items: [
      "À l’inscription, les parents signent le règlement, précédé de la mention « lu et approuvé ».",
      "Ils s’engagent au strict respect des échéanciers établis par l’école pour tous les frais convenus.",
    ],
  },
] as const;

export type RuleKey = (typeof rules)[number]["key"];
