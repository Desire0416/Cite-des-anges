import Link from "next/link";
import { ArrowRight, CalendarCheck, Info, MapPin, Phone, Send, type LucideIcon } from "lucide-react";
import { MaternelleArt, PrimaireArt } from "@/components/art/CycleArt";
import { CycleFrame } from "@/components/art/FrameArt";
import { TrackView } from "@/components/layout/Effects";
import { ButtonLink } from "@/components/ui/Button";
import type { Faq } from "@/lib/content";
import { primaryPhone, site } from "@/lib/site";
import { ContactBlock } from "./ContactBlock";
import { FaqSection } from "./FaqSection";
import { PageHero } from "./PageHero";
import { SectionHeading } from "./SectionHeading";

type CyclePageProps = {
  cycle: "maternelle" | "primaire";
  title: string;
  intro: string;
  ctaLabel: string;
  presentation: { title: string; text: string };
  topics: { icon: LucideIcon; title: string; text: string }[];
  faq: Faq[];
};

const otherCycle = {
  maternelle: { href: "/primaire", label: "Le primaire", text: "Classes ouvertes et préparation de la demande." },
  primaire: { href: "/maternelle", label: "La maternelle", text: "Sections, conditions d’accueil et démarches." },
} as const;

export function CyclePage({ cycle, title, intro, ctaLabel, presentation, topics, faq }: CyclePageProps) {
  const label = cycle === "maternelle" ? "Maternelle" : "Primaire";
  const formHref = `/admissions?cycle=${cycle}#demande`;
  const Art = cycle === "maternelle" ? MaternelleArt : PrimaireArt;
  const accent = cycle === "maternelle" ? "cyan" : "orange";
  const other = otherCycle[cycle];

  const reperes = [
    {
      icon: MapPin,
      title: "Situer l’école",
      text: `${site.address.full}.`,
    },
    {
      icon: CalendarCheck,
      title: "Rencontrer l’administration",
      text: "Demandez un rendez-vous ; la date vous sera confirmée par l’école.",
    },
    {
      icon: Send,
      title: "Préparer la demande",
      text: `Indiquez le cycle ${label.toLowerCase()} dans le formulaire : l’administration vous recontacte.`,
    },
  ];

  return (
    <>
      <TrackView event="cycle_view" cycle={cycle} />
      <PageHero
        crumbs={[{ label, href: `/${cycle}` }]}
        eyebrow={`Cycle ${label.toLowerCase()}`}
        title={title}
        intro={<p>{intro}</p>}
        actions={
          <>
            <ButtonLink href={formHref} size="lg" track="admissions_click" trackCycle={cycle}>
              {ctaLabel}
            </ButtonLink>
            <ButtonLink href={primaryPhone.href} variant="secondary" size="lg" icon={Phone} track="phone_click">
              Appeler l’école
            </ButtonLink>
          </>
        }
        art={
          <CycleFrame label={`${label} · ${site.address.locality}`} tone={accent}>
            <Art />
          </CycleFrame>
        }
      />

      {/* Présentation du cycle et sujets à aborder */}
      <section className="section" aria-labelledby="cycle-presentation">
        <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="cycle-presentation" eyebrow="Le cycle" title={presentation.title} text={presentation.text} />
            <p className="reveal mt-7 flex items-start gap-3 rounded-2xl border border-line bg-mist p-4 text-sm text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              <Info className="mt-0.5 size-4 shrink-0 text-cyan-700" aria-hidden />
              Ces informations dépendent de l’année scolaire et du niveau de votre enfant : l’administration vous les
              précise lors de votre échange.
            </p>
          </div>

          <div>
            <h3 className="reveal font-display text-sm font-extrabold uppercase tracking-[0.14em] text-navy-800">
              Ce que l’administration vous précise
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {topics.map(({ icon: Icon, title: topicTitle, text }, i) => (
                <li
                  key={topicTitle}
                  className={topics.length % 2 === 1 && i === topics.length - 1 ? "reveal sm:col-span-2" : "reveal"}
                  style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                >
                  <div className="card card-hover group h-full p-6">
                    <span className={accent === "cyan" ? "icon-tile" : "icon-tile bg-orange-50 text-orange-700"}>
                      <Icon className="size-[1.35rem]" aria-hidden />
                    </span>
                    <h4 className="mt-5 text-lg font-extrabold tracking-[-0.015em]">{topicTitle}</h4>
                    <p className="mt-2 text-[0.97rem] text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Découvrir l'école */}
      <section className="section bg-mist" aria-labelledby="decouvrir-title">
        <div className="container-site">
          <SectionHeading
            id="decouvrir-title"
            eyebrow="Découvrir l’école"
            title="Trois repères pour préparer votre visite"
            text="Avant toute démarche, prenez le temps de situer l’école et d’échanger avec l’administration."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {reperes.map(({ icon: Icon, title: repTitle, text }, i) => (
              <li key={repTitle} className="reveal" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 sm:p-8">
                  <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-navy-50" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-navy-800 text-white">
                    <Icon className="size-[1.35rem]" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold">{repTitle}</h3>
                  <p className="mt-2 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "200ms" } as React.CSSProperties}>
            <ButtonLink href={formHref} track="admissions_click" trackCycle={cycle}>
              {ctaLabel}
            </ButtonLink>
            <ButtonLink href={`/admissions?motif=rendez-vous&cycle=${cycle}#demande`} variant="secondary" icon={CalendarCheck}>
              Demander un rendez-vous
            </ButtonLink>
          </div>
        </div>
      </section>

      <FaqSection
        items={faq}
        id="questions-cycle"
        title={`Vos questions sur ${cycle === "maternelle" ? "la maternelle" : "le primaire"}`}
        more={{ href: formHref, label: "Faire une demande" }}
      />

      {/* Lien vers l'autre cycle */}
      <section className="pb-4" aria-label="Autre cycle">
        <div className="container-site">
          <Link
            href={other.href}
            className="reveal group flex flex-col justify-between gap-4 rounded-3xl border border-line bg-white p-6 transition-colors duration-300 hover:border-navy-200 hover:bg-mist sm:flex-row sm:items-center sm:p-8"
          >
            <span>
              <span className="eyebrow">Découvrir aussi</span>
              <span className="mt-2 block font-display text-2xl font-extrabold text-navy-800">{other.label}</span>
              <span className="mt-1 block text-muted">{other.text}</span>
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-navy-800 text-white transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1 group-hover:-rotate-12">
              <ArrowRight className="size-6" aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      <ContactBlock
        title={cycle === "maternelle" ? "Préparer l’entrée de votre enfant en maternelle" : "Préparer l’entrée de votre enfant au primaire"}
        text="L’administration vous renseigne sur les classes ouvertes, les conditions d’admission, les frais et les pièces à fournir."
        primary={{ href: formHref, label: ctaLabel }}
      />
    </>
  );
}
