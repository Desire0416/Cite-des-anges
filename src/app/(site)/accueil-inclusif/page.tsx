import type { Metadata } from "next";
import { CalendarCheck, CircleCheck, ClipboardList, Clock, Info, Phone, ShieldCheck, Users } from "lucide-react";
import { DialogueArt } from "@/components/art/DialogueArt";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { inclusifFaq } from "@/lib/content";
import { primaryPhone } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accueil inclusif",
  description:
    "La Cité des Anges annonce l’accueil d’enfants avec autisme. Échangez avec l’administration sur les possibilités et les conditions d’accueil de votre enfant.",
  alternates: { canonical: "/accueil-inclusif" },
};

const topics = [
  {
    icon: ClipboardList,
    title: "Les conditions d’admission",
    text: "Les conditions dans lesquelles la demande de votre enfant peut être étudiée.",
  },
  {
    icon: Clock,
    title: "L’organisation",
    text: "L’organisation de l’accueil au quotidien, telle que l’école peut vous la présenter.",
  },
  {
    icon: Users,
    title: "Les interlocuteurs",
    text: "Les personnes à qui vous adresser au sein de l’établissement.",
  },
  {
    icon: Info,
    title: "Les informations utiles",
    text: "Tout ce qui peut aider votre famille à préparer la suite des démarches.",
  },
];

const reminders = [
  "Aucun motif médical ni diagnostic n’est demandé.",
  "La demande de rendez-vous n’engage pas une admission.",
  "La date de l’échange est confirmée par l’école.",
];

export default function AccueilInclusifPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Accueil inclusif", href: "/accueil-inclusif" }]}
        eyebrow="Accueil inclusif"
        title="Échanger sur les conditions d’accueil de votre enfant"
        intro={
          <p>
            La Cité des Anges annonce l’accueil d’enfants avec autisme. Pour connaître les possibilités et les conditions
            d’accueil, nous vous invitons à échanger directement avec l’administration.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#rendez-vous" size="lg" icon={CalendarCheck}>
              Demander un rendez-vous
            </ButtonLink>
            <ButtonLink href={primaryPhone.href} variant="secondary" size="lg" icon={Phone} track="phone_click">
              Appeler l’école
            </ButtonLink>
          </>
        }
        art={<DialogueArt />}
      />

      {/* 1. L'information annoncée */}
      <section className="section" aria-labelledby="annonce-title">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <SectionHeading
            id="annonce-title"
            eyebrow="L’information annoncée"
            title="Un échange avec l’administration, en premier lieu"
            text={
              <>
                <p>
                  L’établissement annonce l’accueil d’enfants avec autisme. Chaque enfant et chaque famille étant
                  différents, les possibilités et les conditions d’accueil se discutent directement avec l’administration.
                </p>
                <p className="mt-4">
                  La demande de rendez-vous est le point de départ : elle vous permet de présenter votre situation et de
                  poser vos questions, sans engagement.
                </p>
              </>
            }
          />
          <div className="reveal reveal-right" style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="relative overflow-hidden rounded-[2rem] bg-navy-800 p-8 text-white sm:p-10">
              <div className="bg-dots-light absolute inset-0" aria-hidden />
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-cyan-500/20 blur-2xl" aria-hidden />
              <div className="relative">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Bon à savoir</p>
                <ul className="mt-5 space-y-4">
                  {reminders.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-cyan-300" aria-hidden />
                      <span className="text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href="#rendez-vous" variant="light" icon={CalendarCheck}>
                    Demander un rendez-vous
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Les sujets à aborder */}
      <section className="section bg-mist" aria-labelledby="sujets-title">
        <div className="container-site">
          <SectionHeading
            id="sujets-title"
            eyebrow="Préparer l’échange"
            title="Les questions que vous pourrez aborder"
            text="Pour vous aider à préparer le rendez-vous, voici les sujets que vous pouvez évoquer avec l’administration."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <div className="card card-hover group h-full p-7">
                  <span className="icon-tile">
                    <Icon className="size-[1.35rem]" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-extrabold tracking-[-0.015em]">{title}</h3>
                  <p className="mt-2 text-[0.97rem] text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Formulaire de rendez-vous */}
      <section id="rendez-vous" className="section scroll-mt-24" aria-labelledby="rdv-title">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="rdv-title"
              eyebrow="Rendez-vous"
              title="Demander un rendez-vous avec l’administration"
              text="Laissez vos coordonnées : l’administration prend connaissance de votre demande et vous propose un échange."
            />
            <p className="reveal mt-7 flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-ink" style={{ "--d": "120ms" } as React.CSSProperties}>
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-cyan-700" aria-hidden />
              <span>
                <strong className="font-display text-navy-800">Merci de ne pas transmettre de document médical via ce formulaire.</strong>{" "}
                Seules vos coordonnées sont nécessaires pour être recontacté.
              </span>
            </p>
          </div>
          <div className="reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
            <InquiryForm
              origin="/accueil-inclusif"
              defaultMotif="rendez-vous"
              title="Rendez-vous avec l’administration"
              description="Indiquez simplement comment vous joindre. La date du rendez-vous vous sera confirmée par l’école."
              notice="Merci de ne pas transmettre de document médical via ce formulaire, ni de partager d’informations médicales dans ce message."
            />
          </div>
        </div>
      </section>

      <FaqSection
        items={inclusifFaq}
        id="questions-inclusif"
        title="Vos questions sur l’accueil inclusif"
        text="Quelques repères avant un premier échange avec l’administration."
        className="bg-mist"
      />

      <ContactBlock
        eyebrow="Accueil inclusif"
        title="Parlons des conditions d’accueil de votre enfant"
        text="L’administration est votre premier interlocuteur pour échanger sur les possibilités d’accueil."
        primary={{ href: "#rendez-vous", label: "Demander un rendez-vous" }}
      />
    </>
  );
}
