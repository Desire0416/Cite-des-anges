/**
 * Médias institutionnels publiés par l'établissement (ancien site) :
 * photo de l'équipe et message vidéo de rentrée du cofondateur.
 */
import equipe from "@/assets/ecole/equipe-rentree-2026.jpg";
import facadeEntree from "@/assets/ecole/facade-ecole-entree.jpg";
import afficheMessage from "@/assets/ecole/message-rentree-2026-2027-affiche.jpg";

export const teamPhoto = {
  src: equipe,
  alt: "L’équipe de l’établissement réunie devant la façade de l’école, sous la banderole « Les inscriptions scolaires 2026-2027 ont démarré ! »",
  caption: "L’équipe de l’établissement, au lancement des inscriptions 2026-2027.",
};

export const entrancePhoto = {
  src: facadeEntree,
  alt: "Entrée de l’école, fresques murales et enseigne « Groupe Scolaire La Cité des Anges — Garderie, Maternelle, Primaire »",
};

export const directorMessage = {
  src: "/videos/message-rentree-2026-2027.mp4",
  poster: afficheMessage,
  title: "Message de rentrée 2026-2027",
  speaker: "M. KOMAN Étienne",
  role: "Cofondateur du Groupe Scolaire La Cité des Anges",
  duration: "2 min 19",
} as const;
