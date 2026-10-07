import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { site } from "@/lib/site";

export type Crumb = { label: string; href: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, site.url).toString(),
    })),
  };

  return (
    <nav aria-label="Fil d’Ariane" className="mb-7">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 text-navy-300" aria-hidden />}
              {last ? (
                <span aria-current="page" className="font-semibold text-navy-800">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-md transition-colors hover:text-navy-800"
                >
                  {i === 0 && <House className="size-3.5" aria-hidden />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
