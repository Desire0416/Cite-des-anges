import type { Metadata } from "next";
import {
  CalendarCheck,
  DoorOpen,
  Download,
  Droplets,
  HeartPulse,
  MessagesSquare,
  Shirt,
  ShieldCheck,
  Signature,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { WeekArt } from "@/components/art/WeekArt";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ReglementCard, ScheduleTable } from "@/components/sections/Schedule";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { rules, schedule, type RuleKey } from "@/lib/reglement";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Horaires et règlement intérieur",
  description:
    "Horaires de classe de la maternelle au CM2, semaine de 4 jours et principales règles de vie de La Cité des Anges, d’après le règlement intérieur de l’établissement.",
  alternates: { canonical: "/infos-pratiques" },
};

const ruleIcons: Record<RuleKey, LucideIcon> = {
  assiduite: CalendarCheck,
  cantine: UtensilsCrossed,
  tenue: Shirt,
  hygiene: Droplets,
  sante: HeartPulse,
  securite: ShieldCheck,
  familles: MessagesSquare,
  engagement: Signature,
};

export default function InfosPratiquesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "L’école", href: "/ecole" },
          { label: "Horaires et règlement", href: "/infos-pratiques" },
        ]}
        eyebrow="Infos pratiques"
        title="Horaires et règlement intérieur"
        intro={
          <p>
            Les horaires de classe et les principales règles de vie de La Cité des Anges, telles que les fixe le
            règlement intérieur de l’établissement.
          </p>
        }
        actions={
          <>
            <a href={site.reglement.href} className="btn btn-primary btn-lg" download target="_blank" rel="noopener">
              <Download className="size-[1.15rem]" aria-hidden />
              Télécharger le règlement
            </a>
            <ButtonLink href="#horaires" variant="secondary" size="lg">
              Voir les horaires
            </ButtonLink>
          </>
        }
        art={<WeekArt />}
      />

      {/* Horaires */}
      <section id="horaires" className="section scroll-mt-24" aria-labelledby="horaires-title">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="horaires-title"
              eyebrow="Horaires de classe"
              title="Une semaine de 4 jours"
              text={`${schedule.summary} Les horaires sont établis par cycle et doivent être strictement respectés.`}
            />
          </div>
          <div className="reveal" style={{ "--d": "100ms" } as React.CSSProperties}>
            <ScheduleTable rows={schedule.rows} />
          </div>
        </div>

        <div className="container-site mt-14">
          <div className="reveal rounded-3xl bg-mist p-7 sm:p-9">
            <h3 className="flex items-center gap-3 text-xl font-extrabold">
              <span className="grid size-11 place-items-center rounded-xl bg-white text-navy-800 shadow-sm">
                <DoorOpen className="size-5" aria-hidden />
              </span>
              Arrivées et sorties
            </h3>
            <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {schedule.arrival.map((item) => (
                <li key={item} className="flex gap-3 text-[0.98rem] text-ink">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Règles de vie */}
      <section className="section bg-mist" aria-labelledby="regles-title">
        <div className="container-site">
          <SectionHeading
            id="regles-title"
            eyebrow="Règles de vie"
            title="L’essentiel du règlement intérieur"
            text="Le règlement s’applique à toute la communauté éducative : élèves, parents, enseignants et personnel. Voici ses principaux points ; le texte complet fait foi."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {rules.map((rule, i) => {
              const Icon = ruleIcons[rule.key];
              return (
                <li key={rule.key} className="reveal" style={{ "--d": `${(i % 4) * 80}ms` } as React.CSSProperties}>
                  <div className="card card-hover group h-full p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="icon-tile">
                        <Icon className="size-[1.35rem]" aria-hidden />
                      </span>
                      <span className="rounded-full bg-mist px-2.5 py-1 text-[0.72rem] font-semibold text-muted">{rule.article}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold tracking-[-0.015em]">{rule.title}</h3>
                    <ul className="mt-3 space-y-2.5">
                      {rule.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-muted">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-500" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Téléchargement */}
      <section className="section" aria-labelledby="document-title">
        <div className="container-site max-w-4xl">
          <SectionHeading
            id="document-title"
            eyebrow="Document officiel"
            title="Le règlement intérieur complet"
            text="À lire avant l’inscription de votre enfant : il précise l’organisation, la discipline, l’hygiène, la santé, la sécurité et les relations entre l’école et les familles."
          />
          <div className="reveal mt-10" style={{ "--d": "100ms" } as React.CSSProperties}>
            <ReglementCard />
          </div>
        </div>
      </section>

      <ContactBlock
        eyebrow="Une question ?"
        title="L’administration répond à vos questions"
        text="Organisation de la journée, cantine, tenue : contactez l’école ou demandez un rendez-vous."
        flush
      />
    </>
  );
}
