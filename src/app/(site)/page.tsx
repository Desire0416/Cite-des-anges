import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Info, MapPin, Phone, Shapes } from "lucide-react";
import { HeroArt } from "@/components/art/HeroArt";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { CyclesSection } from "@/components/sections/CyclesSection";
import { DeviseSection } from "@/components/sections/DeviseSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { InclusiveTeaser } from "@/components/sections/InclusiveTeaser";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { MottoLine } from "@/components/ui/Icons";
import { homeFaq } from "@/lib/content";
import { ctaLabel, primaryPhone, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const reperes = [
  { href: "/maternelle", icon: Shapes, title: "Maternelle", text: "Découvrir le cycle", tile: "bg-cyan-50 text-cyan-700" },
  { href: "/primaire", icon: BookOpen, title: "Primaire", text: "Découvrir le cycle", tile: "bg-orange-50 text-orange-700" },
  { href: "/contact", icon: MapPin, title: "Angré, Cité Gestoci", text: "En face du terrain de jeux", tile: "bg-navy-50 text-navy-800" },
  { href: "/accueil-inclusif", icon: HeartHandshake, title: "Accueil inclusif", text: "Enfants avec autisme", tile: "bg-magenta-50 text-magenta-500" },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Premier écran */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_88%_18%,var(--color-cyan-50),transparent_70%),radial-gradient(40%_50%_at_0%_100%,var(--color-orange-50),transparent_70%)]"
          aria-hidden
        />
        <div className="bg-dots absolute inset-y-0 right-0 -z-10 w-2/3 [mask-image:radial-gradient(55%_60%_at_70%_40%,#000,transparent)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-mist" aria-hidden />

        <div className="container-site grid items-center gap-10 pb-28 pt-9 sm:pt-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8 lg:pb-36 lg:pt-14">
          <div>
            {site.campaign.open && (
              <p className="inline-flex items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 shadow-[var(--shadow-soft)]">
                <span className="rounded-full bg-navy-800 px-3 py-1 font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-white">
                  Inscriptions
                </span>
                <span className="font-display text-sm font-bold text-navy-800">Année scolaire {site.campaign.year}</span>
              </p>
            )}

            <h1 className="mt-7 text-[2.45rem] font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.3rem]">
              Apprendre et{" "}
              <span className="relative inline-block whitespace-nowrap text-cyan-700">
                grandir
                <svg
                  viewBox="0 0 220 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3 sm:h-4"
                  aria-hidden
                >
                  <path
                    d="M3 12 C 50 4, 140 2, 217 9"
                    fill="none"
                    stroke="var(--color-orange-500)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="anim-draw"
                    style={{ "--len": 230, "--dur": "1.1s", "--delay": "0.5s" } as React.CSSProperties}
                  />
                </svg>
              </span>{" "}
              à La Cité des Anges
            </h1>

            <p className="lead mt-7 max-w-xl">
              À Angré, Cité Gestoci, le Groupe Scolaire La Cité des Anges accueille les familles pour la maternelle et le
              primaire. Découvrez l’école et échangez avec l’administration sur les démarches d’inscription.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/admissions#demande" size="lg" track="admissions_click">
                {ctaLabel}
              </ButtonLink>
              <ButtonLink href="/ecole" variant="secondary" size="lg">
                Découvrir l’école
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between lg:max-w-xl">
              <a href={primaryPhone.href} className="group inline-flex items-center gap-3.5" data-track="phone_click">
                <span className="grid size-11 place-items-center rounded-full bg-orange-500 text-white shadow-[0_10px_20px_-10px_rgb(245_124_22/0.9)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-12 group-hover:scale-110">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm text-muted">Une question ? Appelez l’école</span>
                  <span className="block font-display font-extrabold text-navy-800">{primaryPhone.label}</span>
                </span>
              </a>
              <MottoLine className="font-display text-[0.74rem] font-extrabold uppercase tracking-[0.16em] text-navy-800" />
            </div>
          </div>

          <HeroArt />
        </div>
      </section>

      {/* 2. Repères immédiats */}
      <section aria-label="Repères" className="relative z-10 -mt-20 bg-gradient-to-b from-transparent from-50% to-white to-50% lg:-mt-24">
        <div className="container-site">
          <ul className="reveal grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[var(--shadow-lift)] lg:grid-cols-4">
            {reperes.map(({ href, icon: Icon, title, text, tile }, i) => (
              <li
                key={href}
                className={[
                  "border-line",
                  i % 2 === 0 ? "border-r" : "",
                  i < 2 ? "border-b lg:border-b-0" : "",
                  i === 1 ? "lg:border-r" : "",
                  i === 3 ? "lg:border-r-0" : "",
                ].join(" ")}
              >
                <Link href={href} className="group flex h-full flex-col gap-4 p-5 transition-colors duration-300 hover:bg-mist sm:flex-row sm:items-center sm:p-6 lg:p-7">
                  <span className={`icon-tile ${tile}`}>
                    <Icon className="size-[1.35rem]" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[0.98rem] font-extrabold leading-snug text-navy-800 sm:text-[1.05rem]">{title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{text}</span>
                  </span>
                  <ArrowRight
                    className="hidden size-4 shrink-0 -translate-x-2 text-navy-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Les deux cycles */}
      <CyclesSection />

      {/* 4. Identité et devise */}
      <DeviseSection />

      {/* 5. Accueil inclusif */}
      <InclusiveTeaser />

      {/* 6. Admission en trois étapes */}
      <section className="section" aria-labelledby="etapes-title">
        <div className="container-site">
          <SectionHeading
            id="etapes-title"
            align="center"
            eyebrow={`Admissions ${site.campaign.year}`}
            title="Une demande, un échange, des démarches claires"
            text="Une première demande permet d’entamer un échange avec l’école. Elle ne réserve pas de place et ne vaut pas inscription définitive."
          />
          <AdmissionSteps className="mt-14 lg:mt-20" />
          <div className="reveal mt-14 flex flex-col items-center gap-5" style={{ "--d": "200ms" } as React.CSSProperties}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/admissions#demande" size="lg" track="admissions_click">
                {ctaLabel}
              </ButtonLink>
              <ButtonLink href="/admissions" variant="secondary" size="lg">
                Voir les admissions
              </ButtonLink>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <Info className="size-4 text-cyan-700" aria-hidden />
              Les frais et les pièces à fournir vous sont précisés par l’administration.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Vie scolaire : affichée uniquement avec des contenus authentiques approuvés */}

      {/* 8. Questions fréquentes */}
      <FaqSection items={homeFaq} className="bg-mist" more={{ href: "/admissions#questions", label: "Toutes les questions" }} />

      {/* 9. Contact final */}
      <ContactBlock />
    </>
  );
}
