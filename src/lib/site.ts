/**
 * Paramètres du site (entité SiteSettings du cahier des charges).
 *
 * Sources : brochure 2026–2027 et règlement intérieur de l'établissement
 * (version 01 du 08/05/2026, document officiel de la direction).
 * Les éléments non confirmés (WhatsApp, point carte, vie scolaire) restent
 * désactivés tant que la direction ne les a pas validés.
 */

/**
 * Les variables NEXT_PUBLIC_* doivent être lues par référence explicite
 * (process.env.NEXT_PUBLIC_X) pour être injectées dans le code du navigateur.
 */
const clean = (value: string | undefined) => value?.trim() || undefined;

const productionHost = clean(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL);

export type Phone = {
  /** Affichage lisible */
  label: string;
  /** Valeur pour le lien tel: */
  href: string;
  /** Rôle affiché */
  role: string;
};

export const site = {
  name: "Groupe Scolaire La Cité des Anges",
  shortName: "La Cité des Anges",
  motto: ["Discipline", "Rigueur", "Travail"] as const,
  /** Adresse publique : variable dédiée, sinon domaine de production Vercel, sinon local. */
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) ?? (productionHost ? `https://${productionHost}` : "http://localhost:3000"),

  /** Mode démonstration : aucune demande n'est transmise à l'école. */
  demoMode: clean(process.env.NEXT_PUBLIC_DEMO_MODE) !== "false",

  /** Indexation par les moteurs (désactivée pour la démonstration). */
  indexable: clean(process.env.NEXT_PUBLIC_SITE_INDEXABLE) === "true",

  cycles: ["Maternelle", "Primaire"] as const,

  /** Adresse du siège telle qu'indiquée au règlement intérieur, avec le repère de la brochure. */
  address: {
    line: "Angré Bessikoi, Cité Gestoci",
    landmark: "en face du terrain de jeux",
    area: "Angré",
    commune: "Cocody",
    city: "Abidjan",
    full: "Cocody Angré Bessikoi, Cité Gestoci, en face du terrain de jeux",
    official: "Abidjan, Cocody Angré Bessikoi, Cité Gestoci",
    country: "CI",
  },

  phones: [
    { label: "+225 07 02 29 09 00", href: "tel:+2250702290900", role: "Mobile" },
    { label: "+225 27 22 53 07 86", href: "tel:+2252722530786", role: "Ligne fixe" },
    { label: "+225 01 03 32 41 88", href: "tel:+2250103324188", role: "Mobile" },
    { label: "+225 07 48 10 22 28", href: "tel:+2250748102228", role: "Mobile" },
  ] satisfies Phone[],

  /** Identifiants légaux (en-tête du règlement intérieur). */
  legal: {
    rccm: "CI-ABJ-03-2025-12-02831",
    idu: "2025-0034810K",
    ncc: "2504300C",
    director: "M. KOMAN Étienne",
    directorRole: "Directeur Général",
  },

  /** Règlement intérieur téléchargeable (PDF officiel de l'établissement). */
  reglement: {
    href: "/documents/reglement-interieur-la-cite-des-anges.pdf",
    version: "version 01 du 8 mai 2026",
    pages: 6,
    size: "924 Ko",
  },

  email: "citange@citange.ci",

  campaign: {
    /** Campagne affichée ; passer à false pour la fermer sans toucher aux pages. */
    open: clean(process.env.NEXT_PUBLIC_CAMPAIGN_OPEN) !== "false",
    year: clean(process.env.NEXT_PUBLIC_CAMPAIGN_YEAR) ?? "2026–2027",
  },

  /**
   * Numéro WhatsApp : affiché uniquement après confirmation explicite
   * de la direction (format international sans « + », ex. 2250702290900).
   */
  whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  whatsappMessage:
    "Bonjour, je souhaite obtenir des renseignements sur les inscriptions à La Cité des Anges.",

  /** Lien d'itinéraire : activé après vérification du point exact. */
  directionsUrl: clean(process.env.NEXT_PUBLIC_DIRECTIONS_URL),

  /** Hébergeur affiché dans les mentions légales. */
  host: clean(process.env.NEXT_PUBLIC_HOST_INFO),

  features: {
    /** Vie scolaire : contenus authentiques publiés par l'établissement ; « false » pour la masquer. */
    vieScolaire: clean(process.env.NEXT_PUBLIC_FEATURE_VIE_SCOLAIRE) !== "false",
  },
} as const;

/** Numéro mis en avant pour les boutons « Appeler » (premier numéro de la brochure). */
export const primaryPhone = site.phones[0];

export const schoolYears = [site.campaign.year];

export const ctaLabel = site.campaign.open
  ? "Demander une préinscription"
  : "Me renseigner pour une prochaine rentrée";

export function whatsappHref() {
  if (!site.whatsapp) return undefined;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
}

export const nav = [
  {
    href: "/ecole",
    label: "L’école",
    kicker: "L’école",
    children: [
      { href: "/ecole", label: "Présentation", description: "Identité, missions et devise de l’établissement", icon: "school" },
      { href: "/infos-pratiques", label: "Horaires et règlement", description: "Journée de classe et règles de vie", icon: "clock" },
      { href: "/vie-scolaire", label: "Vie scolaire", description: "Moments de l’école en photos et en vidéo", icon: "camera" },
    ],
  },
  {
    href: "/maternelle",
    label: "Nos cycles",
    kicker: "Cycle",
    children: [
      { href: "/maternelle", label: "Maternelle", description: "Sections, conditions d’accueil et démarches", icon: "shapes" },
      { href: "/primaire", label: "Primaire", description: "Classes ouvertes et préparation de la demande", icon: "book" },
    ],
  },
  { href: "/accueil-inclusif", label: "Accueil inclusif" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;
