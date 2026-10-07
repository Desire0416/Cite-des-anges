import { FlaskConical } from "lucide-react";
import type { Crumb } from "@/components/ui/Breadcrumb";
import { site } from "@/lib/site";
import { PageHero } from "./PageHero";

export type LegalSection = { id: string; title: string; content: React.ReactNode };

type LegalPageProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  updated: string;
  sections: LegalSection[];
  demoNotice?: string;
};

export function LegalPage({ crumbs, eyebrow, title, intro, updated, sections, demoNotice }: LegalPageProps) {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={eyebrow} title={title} intro={intro} />
      <section className="section pt-12 lg:pt-16">
        <div className="container-site grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="Sommaire" className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">Sommaire</p>
            <ol className="mt-4 space-y-1 border-l-2 border-line">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] text-muted transition-colors hover:border-cyan-500 hover:text-navy-800"
                  >
                    <span className="mr-2 font-display text-xs font-bold text-navy-300">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">Mise à jour : {updated}</p>
          </nav>

          <article className="prose-site max-w-3xl">
            {site.demoMode && demoNotice && (
              <p className="!mb-8 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-[0.97rem]">
                <FlaskConical className="mt-1 size-5 shrink-0 text-orange-700" aria-hidden />
                <span>{demoNotice}</span>
              </p>
            )}
            {sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id} className="border-b border-line pb-4 last:border-0">
                <h2 id={s.id} className={i === 0 ? "!mt-0" : undefined}>
                  <span className="mr-3 font-display text-base text-cyan-700">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.content}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
