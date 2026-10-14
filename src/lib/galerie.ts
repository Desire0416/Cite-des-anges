/**
 * Vie scolaire : photographies et vidéos réelles publiées par l’établissement
 * dans la galerie de son ancien site (récupérées le 13 octobre 2026).
 * Chaque média comporte un titre de thème, un texte alternatif, une origine
 * et un statut de publication (cahier des charges, section 12).
 * Aucun enfant n’est nommé ; les légendes restent descriptives.
 */
import type { StaticImageData } from "next/image";
import ecole01 from "@/assets/galerie/ecole/ecole-01.jpg";
import ecole02 from "@/assets/galerie/ecole/ecole-02.jpg";
import equipe01 from "@/assets/galerie/equipe/equipe-01.jpg";
import equipe02 from "@/assets/galerie/equipe/equipe-02.jpg";
import promotion01 from "@/assets/galerie/promotion/promotion-01.jpg";
import promotion02 from "@/assets/galerie/promotion/promotion-02.jpg";
import promotion03 from "@/assets/galerie/promotion/promotion-03.jpg";
import promotion04 from "@/assets/galerie/promotion/promotion-04.jpg";
import promotion05 from "@/assets/galerie/promotion/promotion-05.jpg";
import promotion06 from "@/assets/galerie/promotion/promotion-06.jpg";
import promotion07 from "@/assets/galerie/promotion/promotion-07.jpg";
import promotion08 from "@/assets/galerie/promotion/promotion-08.jpg";
import promotion09 from "@/assets/galerie/promotion/promotion-09.jpg";
import promotion10 from "@/assets/galerie/promotion/promotion-10.jpg";
import promotion11 from "@/assets/galerie/promotion/promotion-11.jpg";
import promotion12 from "@/assets/galerie/promotion/promotion-12.jpg";
import costumes01 from "@/assets/galerie/costumes/costumes-01.jpg";
import costumes02 from "@/assets/galerie/costumes/costumes-02.jpg";
import costumes03 from "@/assets/galerie/costumes/costumes-03.jpg";
import costumes04 from "@/assets/galerie/costumes/costumes-04.jpg";
import costumes05 from "@/assets/galerie/costumes/costumes-05.jpg";
import costumes06 from "@/assets/galerie/costumes/costumes-06.jpg";
import costumes07 from "@/assets/galerie/costumes/costumes-07.jpg";
import costumes08 from "@/assets/galerie/costumes/costumes-08.jpg";
import costumes09 from "@/assets/galerie/costumes/costumes-09.jpg";
import costumes10 from "@/assets/galerie/costumes/costumes-10.jpg";
import costumes11 from "@/assets/galerie/costumes/costumes-11.jpg";
import costumes12 from "@/assets/galerie/costumes/costumes-12.jpg";
import costumes13 from "@/assets/galerie/costumes/costumes-13.jpg";
import costumes14 from "@/assets/galerie/costumes/costumes-14.jpg";
import costumes15 from "@/assets/galerie/costumes/costumes-15.jpg";
import costumes16 from "@/assets/galerie/costumes/costumes-16.jpg";
import costumes17 from "@/assets/galerie/costumes/costumes-17.jpg";
import costumes18 from "@/assets/galerie/costumes/costumes-18.jpg";
import costumes19 from "@/assets/galerie/costumes/costumes-19.jpg";
import costumes20 from "@/assets/galerie/costumes/costumes-20.jpg";
import kungFu01 from "@/assets/galerie/kung-fu/kung-fu-01.jpg";
import kungFu02 from "@/assets/galerie/kung-fu/kung-fu-02.jpg";
import kungFu03 from "@/assets/galerie/kung-fu/kung-fu-03.jpg";
import posterMessageRentree from "@/assets/galerie/videos/message-rentree-2026-2027.jpg";
import posterDefileMarine from "@/assets/galerie/videos/defile-marine.jpg";
import posterDefileJugesAvocats from "@/assets/galerie/videos/defile-juges-avocats.jpg";
import posterDefileTenuesTraditionnelles from "@/assets/galerie/videos/defile-tenues-traditionnelles.jpg";
import posterPetitsTenueMilitaire from "@/assets/galerie/videos/petits-tenue-militaire.jpg";
import posterChoregraphieToge from "@/assets/galerie/videos/choregraphie-toge.jpg";
import posterDanseEnClasse from "@/assets/galerie/videos/danse-en-classe.jpg";

export type ThemeKey = "promotion" | "costumes" | "kung-fu" | "ecole";

export const themes: { key: ThemeKey; label: string; description: string }[] = [
  { key: "promotion", label: "Promotion Excellence 2025-2026", description: "Cérémonie de fin d’année : toges, écharpes, médailles et diplômes." },
  { key: "costumes", label: "Journée costumée", description: "Métiers, tenues traditionnelles et costumes : une journée de fête à l’école." },
  { key: "kung-fu", label: "Kung-Fu", description: "L’une des activités parascolaires proposées aux élèves." },
  { key: "ecole", label: "L’école et l’équipe", description: "Le bâtiment de Cité Gestoci et l’équipe de l’établissement." },
];

export type Photo = {
  src: StaticImageData;
  alt: string;
  theme: ThemeKey;
  origine: string;
  statut: "publié";
};

const ORIGINE = "Galerie de l’ancien site de l’établissement";

function photo(src: StaticImageData, alt: string, theme: ThemeKey): Photo {
  return { src, alt, theme, origine: ORIGINE, statut: "publié" };
}

export const photos: Photo[] = [
  photo(promotion01, "Élèves en toge et écharpe orange brandissant leur diplôme lors de la cérémonie Promotion Excellence 2025-2026", "promotion"),
  photo(promotion02, "Élèves posant avec leur diplôme devant l’arche de ballons de la cérémonie Promotion Excellence 2025-2026", "promotion"),
  photo(promotion03, "Photo de groupe des élèves en toge et écharpe orange de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion04, "Élève en toge et écharpe orange devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion05, "Élève en toge, médaille au cou, devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion06, "Deux élèves en tee-shirt rouge, médaille au cou, dans la cour de l’école", "promotion"),
  photo(promotion07, "Élève en costume, médaille au cou, devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion08, "Deux élèves médaillés devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion09, "Élève médaillée devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion10, "Élève tenant son trophée devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion11, "Élève en écharpe orange devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(promotion12, "Élève médaillée en écharpe orange devant le panneau de la Promotion Excellence 2025-2026", "promotion"),
  photo(costumes01, "Jeunes élèves en tenue militaire sous le chapiteau, devant la banderole des inscriptions 2026-2027", "costumes"),
  photo(costumes02, "Élève en uniforme vert et casquette d’officier", "costumes"),
  photo(costumes03, "Élèves en tenues de fête, perruque afro et chemise à motifs", "costumes"),
  photo(costumes04, "Élève en chemise à motifs et nœud papillon", "costumes"),
  photo(costumes05, "Élève en tenue rétro : perruque afro, chemise blanche et pantalon à motifs", "costumes"),
  photo(costumes06, "Jeune élève en uniforme vert et béret bleu, faisant le salut", "costumes"),
  photo(costumes07, "Élève déguisé en planteur, chapeau de paille et bottes", "costumes"),
  photo(costumes08, "Deux élèves en treillis militaire faisant le salut", "costumes"),
  photo(costumes09, "Deux élèves en robe d’avocat", "costumes"),
  photo(costumes10, "Élève en tenue traditionnelle rayée, avec un accessoire en raphia", "costumes"),
  photo(costumes11, "Élève en robe de magistrat", "costumes"),
  photo(costumes12, "Élève en uniforme blanc d’officier de marine", "costumes"),
  photo(costumes13, "Élève en chemise en jean, bretelles et casquette", "costumes"),
  photo(costumes14, "Deux élèves en tenue traditionnelle rayée", "costumes"),
  photo(costumes15, "Élève en robe traditionnelle rouge et collier de perles", "costumes"),
  photo(costumes16, "Élève en robe en pagne vert", "costumes"),
  photo(costumes17, "Jeune élève en treillis militaire et casquette", "costumes"),
  photo(costumes18, "Deux élèves, l’une en blouse de médecin, l’autre en robe rayée et parure de cauris", "costumes"),
  photo(costumes19, "Élève en robe rayée et parure de cauris", "costumes"),
  photo(costumes20, "Élève déguisé en peintre, rouleau à la main", "costumes"),
  photo(kungFu01, "Élèves en kimono blanc lors d’une séance de Kung-Fu dans la cour", "kung-fu"),
  photo(kungFu02, "Élèves en kimono blanc alignés pour un exercice de Kung-Fu", "kung-fu"),
  photo(kungFu03, "Élèves en kimono blanc pendant l’entraînement de Kung-Fu", "kung-fu"),
  photo(ecole01, "Façade de l’école : bâtiment à étage orange et bleu, décoré de fresques colorées", "ecole"),
  photo(ecole02, "Entrée de l’école, ses fresques murales et l’enseigne du groupe scolaire", "ecole"),
  photo(equipe01, "L’équipe de l’école devant la banderole « Les inscriptions scolaires 2026-2027 ont démarré ! »", "ecole"),
  photo(equipe02, "L’équipe de l’école réunie devant la façade, pour le lancement des inscriptions 2026-2027", "ecole"),
];

export const facadePhotos = { exterieur: ecole01, entree: ecole02 };
export const teamPhotos = [equipe01, equipe02];

export type Video = {
  key: string;
  src: string;
  poster: StaticImageData;
  title: string;
  description: string;
  duration: string;
  orientation: "portrait" | "paysage";
  theme?: ThemeKey;
};

/** Message de rentrée du cofondateur (vidéo publiée sur la page Direction de l’ancien site). */
export const directorVideo: Video = {
  key: "message-rentree-2026-2027",
  src: "/videos/message-rentree-2026-2027.mp4",
  poster: posterMessageRentree,
  title: "Message de rentrée 2026-2027",
  description: "M. KOMAN Étienne, cofondateur du Groupe Scolaire La Cité des Anges, présente la nouvelle année scolaire.",
  duration: "2 min 19",
  orientation: "paysage",
};

/** Sélection de vidéos d’événements (téléphone, format portrait), compressées pour le web. */
export const eventVideos: Video[] = [
  { key: "defile-marine", src: "/videos/defile-marine.mp4", poster: posterDefileMarine, title: "Défilé costumé : la marine", description: "Élèves en uniforme blanc de la marine, en cortège dans le quartier.", duration: "0 min 20", orientation: "portrait", theme: "costumes" },
  { key: "defile-juges-avocats", src: "/videos/defile-juges-avocats.mp4", poster: posterDefileJugesAvocats, title: "Défilé costumé : juges et avocats", description: "Élèves en robe de magistrat, pancartes à la main.", duration: "0 min 37", orientation: "portrait", theme: "costumes" },
  { key: "defile-tenues-traditionnelles", src: "/videos/defile-tenues-traditionnelles.mp4", poster: posterDefileTenuesTraditionnelles, title: "Défilé en tenues traditionnelles", description: "Pagnes, tenues rayées et parures de cauris dans le cortège.", duration: "0 min 14", orientation: "portrait", theme: "costumes" },
  { key: "petits-tenue-militaire", src: "/videos/petits-tenue-militaire.mp4", poster: posterPetitsTenueMilitaire, title: "Les petits en tenue militaire", description: "Les plus jeunes en treillis, en musique.", duration: "0 min 45", orientation: "portrait", theme: "costumes" },
  { key: "choregraphie-toge", src: "/videos/choregraphie-toge.mp4", poster: posterChoregraphieToge, title: "Chorégraphie en toge", description: "Les élèves en toge et écharpe orange dansent sous le chapiteau.", duration: "0 min 53", orientation: "portrait", theme: "promotion" },
  { key: "danse-en-classe", src: "/videos/danse-en-classe.mp4", poster: posterDanseEnClasse, title: "Danse en classe", description: "Un moment de danse dans une salle de classe décorée.", duration: "0 min 17", orientation: "portrait", theme: "costumes" },
];
