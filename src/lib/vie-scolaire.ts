/**
 * Vie scolaire : publications et médias réels, approuvés par l'école.
 *
 * Le module reste invisible (hors menu et hors sitemap) tant que la liste est
 * vide ou que la fonctionnalité n'est pas activée. Chaque média doit comporter
 * un titre, une description, un texte alternatif, une origine et une
 * autorisation de diffusion documentée.
 */
import { site } from "./site";

export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  description: string;
  origine: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  theme: string;
  content: string[];
  media?: Media;
};

export const posts: Post[] = [];

export const vieScolaireEnabled = site.features.vieScolaire && posts.length > 0;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
