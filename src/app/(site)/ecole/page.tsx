import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Building2, HeartHandshake, Mail, MapPin, Phone, Shapes, Star } from "lucide-react";
import { EmblemArt } from "@/components/art/FrameArt";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { CyclesSection } from "@/components/sections/CyclesSection";
import { DeviseSection } from "@/components/sections/DeviseSection";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "L’école",
  description:
    "Situé à Angré, Cité Gestoci, le Groupe Scolaire La Cité des Anges propose un enseignement maternel et primaire. Devise : Discipline, Rigueur, Travail.",
  alternates: { canonical: "/ecole" },
};

const facts = [
  { icon: Building2, label: "Dénomination", value: site.name },
  { icon: Shapes, label: "Cycles", value: "Maternelle et primaire" },
  { icon: MapPin, label: "Adresse", value: site.address.full },
  { icon: Star, label: "Devise", value: site.motto.join(" • ") },
  { icon: HeartHandshake, label: "Accueil", value: "Accueil d’enfants avec autisme annoncé par l’établissement" },
];

export default function EcolePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "L’école", href: "/ecole" }]}
        eyebrow="L’établissement"
        title="Le Groupe Scolaire La Cité des Anges"
        intro={
          <p>
            Situé à Angré, Cité Gestoci, en face du terrain de jeux, le Groupe Scolaire La Cité des Anges propose un
            enseignement maternel et primaire. Sa devise est Discipline, Rigueur, Travail. L’établissement annonce
            également l’accueil d’enfants avec autisme.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#cycles-title" size="lg">
              Découvrir les cycles
            </ButtonLink>
            <ButtonLink href="/admissions?motif=rendez-vous#demande" variant="secondary" size="lg">
              Rencontrer l’administration
            </ButtonLink>
          </>
        }
        art={<EmblemArt />}
      />

      {/* Identité et localisation */}
      <section className="section" aria-labelledby="identite-title">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              id="identite-title"
              eyebrow="Identité et localisation"
              title="Une école maternelle et primaire à Angré"
              text="La Cité des Anges réunit deux cycles dans un même établissement, à Angré, Cité Gestoci. L’école se trouve en face du terrain de jeux."
            />
            <div className="reveal mt-8 grid gap-3 sm:grid-cols-2" style={{ "--d": "120ms" } as React.CSSProperties}>
              <Link href="/maternelle" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-navy-200 hover:bg-mist">
                <span className="icon-tile size-11 rounded-xl">
                  <Shapes className="size-5" aria-hidden />
                </span>
                <span className="flex-1 font-display font-bold text-navy-800">Maternelle</span>
                <ArrowRight className="size-4 text-navy-300 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link href="/primaire" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-navy-200 hover:bg-mist">
                <span className="icon-tile size-11 rounded-xl bg-orange-50 text-orange-700">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <span className="flex-1 font-display font-bold text-navy-800">Primaire</span>
                <ArrowRight className="size-4 text-navy-300 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Fiche de l'établissement */}
          <div className="reveal reveal-right" style={{ "--d": "100ms" } as React.CSSProperties}>
            <div className="card overflow-hidden">
              <div className="relative flex items-center justify-between gap-4 overflow-hidden bg-navy-800 px-7 py-6 text-white">
                <div className="bg-dots-light absolute inset-0" aria-hidden />
                <div className="relative">
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Fiche de l’établissement</p>
                  <p className="mt-1 font-display text-xl font-extrabold">{site.shortName}</p>
                </div>
                <span className="relative flex gap-1 text-orange-400" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
              </div>
              <dl className="divide-y divide-line">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 px-7 py-5">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-navy-800">
                      <Icon className="size-[1.1rem]" aria-hidden />
                    </span>
                    <div>
                      <dt className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{label}</dt>
                      <dd className="mt-1 font-semibold text-navy-800">{value}</dd>
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-x-6 gap-y-2 px-7 py-5 text-sm">
                  <a href={site.phones[0].href} className="inline-flex items-center gap-2 font-semibold text-navy-800 hover:underline" data-track="phone_click">
                    <Phone className="size-4 text-cyan-700" aria-hidden />
                    {site.phones[0].label}
                  </a>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-semibold text-navy-800 hover:underline">
                    <Mail className="size-4 text-cyan-700" aria-hidden />
                    {site.email}
                  </a>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-mist">
        <CyclesSection
          eyebrow="Les cycles"
          title="Deux cycles dans un même établissement"
          text="De la maternelle au primaire, chaque cycle dispose de sa page pour vous présenter les informations utiles et les démarches."
        />
      </div>

      <DeviseSection />

      {/* Accueil inclusif */}
      <section className="section pb-0 lg:pb-0" aria-labelledby="ecole-inclusif">
        <div className="container-site">
          <Link
            href="/accueil-inclusif"
            className="reveal group relative flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-cyan-50 via-white to-orange-50 p-7 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-10 md:flex-row md:items-center md:justify-between"
          >
            <span className="flex items-start gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-navy-800 text-white">
                <HeartHandshake className="size-7" strokeWidth={1.8} aria-hidden />
              </span>
              <span>
                <span className="eyebrow">Accueil inclusif</span>
                <span id="ecole-inclusif" className="mt-2 block font-display text-2xl font-extrabold tracking-[-0.02em] text-navy-800">
                  L’établissement annonce l’accueil d’enfants avec autisme
                </span>
                <span className="mt-2 block max-w-2xl text-muted">
                  Échangez avec l’administration sur les possibilités et les conditions d’accueil de votre enfant.
                </span>
              </span>
            </span>
            <span className="link-arrow shrink-0 self-start md:self-center">
              En savoir plus
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      <ContactBlock title="Rencontrer l’administration" />
    </>
  );
}
