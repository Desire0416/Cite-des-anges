import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts, vieScolaireEnabled } from "@/lib/vie-scolaire";

const routes = [
  { path: "/", priority: 1 },
  { path: "/ecole", priority: 0.8 },
  { path: "/maternelle", priority: 0.9 },
  { path: "/primaire", priority: 0.9 },
  { path: "/accueil-inclusif", priority: 0.8 },
  { path: "/admissions", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/confidentialite", priority: 0.3 },
  { path: "/mentions-legales", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();

  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: url(r.path),
    changeFrequency: "monthly",
    priority: r.priority,
  }));

  // Vie scolaire : seulement avec des contenus réels approuvés
  if (vieScolaireEnabled) {
    pages.push({ url: url("/vie-scolaire"), changeFrequency: "weekly", priority: 0.6 });
    for (const post of posts) {
      pages.push({ url: url(`/vie-scolaire/${post.slug}`), lastModified: post.date, priority: 0.5 });
    }
  }

  return pages;
}
