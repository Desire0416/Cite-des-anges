/**
 * Paramètres du site (entité SiteSettings du cahier des charges).
 *
 * Toutes les informations publiées proviennent de la brochure 2026–2027.
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

  address: {
    line: "Angré, Cité Gestoci",
    landmark: "en face du terrain de jeux",
    full: "Angré, Cité Gestoci, en face du terrain de jeux",
    locality: "Angré",
    country: "CI",
  },

  phones: [
    { label: "+225 07 02 29 09 00", href: "tel:+2250702290900", role: "Contact téléphonique" },
    { label: "+225 01 03 32 41 88", href: "tel:+2250103324188", role: "Contact complémentaire" },
    { label: "+225 07 48 10 22 28", href: "tel:+2250748102228", role: "Contact complémentaire" },
  ] satisfies Phone[],

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
    /** Vie scolaire : visible seulement avec des contenus authentiques approuvés. */
    vieScolaire: clean(process.env.NEXT_PUBLIC_FEATURE_VIE_SCOLAIRE) === "true",
  },
} as const;

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
  { href: "/ecole", label: "L’école" },
  {
    href: "/maternelle",
    label: "Nos cycles",
    children: [
      { href: "/maternelle", label: "Maternelle", description: "Sections, conditions d’accueil et démarches" },
      { href: "/primaire", label: "Primaire", description: "Classes ouvertes et préparation de la demande" },
    ],
  },
  { href: "/accueil-inclusif", label: "Accueil inclusif" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;
