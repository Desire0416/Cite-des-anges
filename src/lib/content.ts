/**
 * Contenus éditoriaux. Toutes les réponses s'appuient sur les informations
 * de la brochure ; les détails non établis (frais, pièces, âges, classes)
 * sont renvoyés vers l'administration, sans valeur inventée.
 */
import { site } from "./site";

export type Faq = { q: string; a: string };

const year = site.campaign.year;

export const faq = {
  cycles: {
    q: "Quels cycles sont proposés ?",
    a: `La Cité des Anges propose la maternelle et le primaire. L’administration vous précise les sections et les classes ouvertes pour l’année ${year}.`,
  },
  localisation: {
    q: "Où se situe l’école ?",
    a: `L’école se situe à ${site.address.full}.`,
  },
  frais: {
    q: "Comment connaître les frais de scolarité ?",
    a: "Contactez l’administration pour obtenir les frais et les modalités applicables au niveau de votre enfant.",
  },
  pieces: {
    q: "Quelles pièces faut-il fournir ?",
    a: "L’administration vous précisera les pièces nécessaires pour le niveau demandé. Aucun document n’est demandé lors de la première demande en ligne.",
  },
  inscription: {
    q: "La demande en ligne vaut-elle inscription ?",
    a: "Non. Elle permet d’entamer un échange avec l’école. Elle ne réserve pas de place et ne vaut pas inscription définitive.",
  },
  rendezVous: {
    q: "Puis-je demander un rendez-vous ?",
    a: "Oui, vous pouvez transmettre une demande de rendez-vous ; la date sera confirmée par l’école.",
  },
  inclusif: {
    q: "Quelles sont les conditions d’accueil inclusif ?",
    a: "Échangez avec l’administration sur les possibilités et les conditions d’accueil de votre enfant. Une demande de rendez-vous est le meilleur point de départ.",
  },
} satisfies Record<string, Faq>;

export const homeFaq: Faq[] = [faq.cycles, faq.localisation, faq.frais, faq.inscription];

export const admissionsFaq: Faq[] = [
  faq.cycles,
  faq.localisation,
  faq.frais,
  faq.pieces,
  faq.inscription,
  faq.rendezVous,
  faq.inclusif,
];

export const maternelleFaq: Faq[] = [
  {
    q: "Quelles sections de maternelle sont ouvertes ?",
    a: `L’administration vous indique les sections ouvertes pour l’année ${year} ainsi que les conditions d’admission.`,
  },
  {
    q: "À partir de quel âge mon enfant peut-il être accueilli ?",
    a: "Les conditions d’âge et d’admission vous sont précisées par l’administration lors de votre échange.",
  },
  faq.frais,
  {
    q: "Comment découvrir l’école avant de faire une demande ?",
    a: "Transmettez une demande de rendez-vous : l’école vous confirmera une date pour rencontrer l’administration.",
  },
];

export const primaireFaq: Faq[] = [
  {
    q: "Quelles classes du primaire sont ouvertes ?",
    a: `Les classes ouvertes pour l’année ${year} vous sont précisées par l’administration.`,
  },
  {
    q: "Mon enfant est scolarisé dans une autre école : comment procéder ?",
    a: "Faites une première demande en indiquant le cycle primaire. L’administration vous précisera ensuite les démarches et les pièces nécessaires.",
  },
  faq.frais,
  faq.inscription,
];

export const inclusifFaq: Faq[] = [
  {
    q: "Faut-il joindre un document médical à ma demande ?",
    a: "Non. Merci de ne transmettre aucun document médical via le site. L’administration vous indiquera, le moment venu, la suite des démarches.",
  },
  {
    q: "La demande de rendez-vous engage-t-elle une admission ?",
    a: "Non. Elle permet d’échanger avec l’administration sur les possibilités et les conditions d’accueil de votre enfant.",
  },
  {
    q: "Qui sera mon interlocuteur ?",
    a: "L’administration de l’école prend connaissance de votre demande et vous propose un échange.",
  },
];

export const mottoValues = [
  {
    title: "Discipline",
    text: "Un cadre de vie scolaire clair, qui aide chaque enfant à trouver ses repères.",
  },
  {
    title: "Rigueur",
    text: "Une attention constante portée au travail, à chaque étape des apprentissages.",
  },
  {
    title: "Travail",
    text: "L’implication de l’enfant dans ses apprentissages, jour après jour.",
  },
] as const;

export const admissionSteps = [
  {
    title: "Vous faites une demande",
    text: "Vous transmettez vos coordonnées et indiquez le cycle souhaité, en quelques minutes.",
  },
  {
    title: "L’administration vous propose un échange",
    text: "Elle prend connaissance de votre demande et revient vers vous pour en parler.",
  },
  {
    title: "Les démarches vous sont précisées",
    text: "L’école vous indique les étapes et examine le dossier selon ses conditions d’admission.",
  },
] as const;
