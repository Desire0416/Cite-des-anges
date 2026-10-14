/**
 * Vie scolaire : moments réels de l'école, illustrés par une sélection de
 * photos et de vidéos publiées par l'établissement dans la galerie de son
 * ancien site. Seuls des médias pertinents sont retenus (photos de groupe,
 * pas de portraits individuels répétés) ; aucun enfant n'est nommé.
 *
 * Chaque média comporte un texte alternatif, une origine et un statut de
 * publication (cahier des charges, section 12).
 */
import type { StaticImageData } from "next/image";
import defileAffiche from "@/assets/vie-scolaire/defile-juges-avocats-affiche.jpg";
import avocates from "@/assets/vie-scolaire/journee-costumee-avocates.jpg";
import petits from "@/assets/vie-scolaire/journee-costumee-petits.jpg";
import tenuesTraditionnelles from "@/assets/vie-scolaire/journee-costumee-tenues-traditionnelles.jpg";
import kungFu from "@/assets/vie-scolaire/kung-fu.jpg";
import promotion from "@/assets/vie-scolaire/promotion-excellence-2025-2026.jpg";
import { site } from "./site";

const ORIGINE = "Galerie de l’ancien site de l’établissement";

export type Photo = {
  src: StaticImageData;
  alt: string;
  origine: string;
  statut: "publié";
};

export type Video = {
  src: string;
  poster: StaticImageData;
  title: string;
  duration: string;
  orientation: "portrait" | "paysage";
  origine: string;
  statut: "publié";
};

export type Moment = {
  key: string;
  kicker: string;
  title: string;
  text: string;
  photos: Photo[];
  video?: Video;
};

const photo = (src: StaticImageData, alt: string): Photo => ({ src, alt, origine: ORIGINE, statut: "publié" });

export const moments: Moment[] = [
  {
    key: "promotion",
    kicker: "Fin d’année 2025-2026",
    title: "Promotion Excellence 2025-2026",
    text: "Toges, écharpes orange et diplômes : les élèves de la Promotion Excellence 2025-2026 réunis pour la remise des diplômes.",
    photos: [
      photo(
        promotion,
        "Élèves en toge et écharpe orange brandissant leur diplôme devant l’arche de ballons de la Promotion Excellence 2025-2026",
      ),
    ],
  },
  {
    key: "journee-costumee",
    kicker: "Événement",
    title: "Journée costumée",
    text: "Robes d’avocat, uniformes et tenues traditionnelles : les élèves ont défilé dans le quartier de l’école, des plus petits aux plus grands.",
    photos: [
      photo(avocates, "Deux élèves en robe d’avocat dans la cour de l’école"),
      photo(tenuesTraditionnelles, "Deux élèves en tenue traditionnelle rayée"),
      photo(petits, "Jeunes élèves en tenue militaire sous le chapiteau, devant la banderole des inscriptions 2026-2027"),
    ],
    video: {
      src: "/videos/defile-juges-avocats.mp4",
      poster: defileAffiche,
      title: "Le défilé des juges et avocats",
      duration: "0 min 37",
      orientation: "portrait",
      origine: ORIGINE,
      statut: "publié",
    },
  },
  {
    key: "kung-fu",
    kicker: "Activité",
    title: "Kung-Fu",
    text: "Introduit par l’établissement, le Kung-Fu fait partie des activités proposées aux élèves.",
    photos: [photo(kungFu, "Élèves en kimono blanc alignés pour un exercice de Kung-Fu dans la cour")],
  },
];

/** Publications datées (articles) : à alimenter avec des contenus approuvés. */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  theme: string;
  content: string[];
  media?: { src: string; width: number; height: number; alt: string; description: string };
};

export const posts: Post[] = [];

export const vieScolaireEnabled = site.features.vieScolaire && moments.length > 0;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
