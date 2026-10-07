import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaternelleArt, PrimaireArt } from "@/components/art/CycleArt";
import { SectionHeading } from "./SectionHeading";

const cycles = [
  {
    href: "/maternelle",
    cycle: "maternelle",
    label: "Maternelle",
    title: "La maternelle",
    text: "Découvrez l’offre de maternelle et contactez l’école pour connaître les sections ouvertes et les conditions d’admission.",
    cta: "Découvrir la maternelle",
    Art: MaternelleArt,
    badge: "bg-cyan-50 text-cyan-700",
  },
  {
    href: "/primaire",
    cycle: "primaire",
    label: "Primaire",
    title: "Le primaire",
    text: "Renseignez-vous sur le primaire, les classes disponibles et les démarches à effectuer pour votre enfant.",
    cta: "Découvrir le primaire",
    Art: PrimaireArt,
    badge: "bg-orange-50 text-orange-700",
  },
] as const;

export function CyclesSection({
  eyebrow = "Nos cycles",
  title = "La maternelle et le primaire, à Angré",
  text = "Deux cycles présentés séparément pour vous aider à trouver les bonnes informations et à préparer votre échange avec l’administration.",
  exclude,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  exclude?: "maternelle" | "primaire";
}) {
  const list = cycles.filter((c) => c.cycle !== exclude);

  return (
    <section className="section" aria-labelledby="cycles-title">
      <div className="container-site">
        <SectionHeading id="cycles-title" eyebrow={eyebrow} title={title} text={text} />
        <div className={list.length > 1 ? "mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8" : "mt-10 max-w-xl"}>
          {list.map(({ href, label, title: cardTitle, text: cardText, cta, Art, badge }, i) => (
            <div key={href} className="reveal" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[400/260] overflow-hidden">
                  <Art className="transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
                  <span className={`absolute left-5 top-5 rounded-full px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] shadow-sm ${badge}`}>
                    Cycle · {label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className="text-2xl font-extrabold tracking-[-0.025em] sm:text-[1.75rem]">
                    <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                      {cardTitle}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-muted">{cardText}</p>
                  <span className="link-arrow mt-7 self-start">
                    {cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
