import type { Metadata } from "next";
import { Ban, CircleHelp, FileX2, Mail, MapPin, Phone, Receipt } from "lucide-react";
import { FormArt } from "@/components/art/FrameArt";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { AdmissionSteps } from "@/components/sections/AdmissionSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { admissionsFaq } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Admissions ${site.campaign.year}`,
  description:
    "Préparer l’inscription de votre enfant à La Cité des Anges : faites une première demande, l’administration vous précise les classes disponibles, les conditions d’admission, les frais et les pièces nécessaires.",
  alternates: { canonical: "/admissions" },
};

const goodToKnow = [
  { icon: Ban, title: "Aucune place réservée", text: "Une demande en ligne ne réserve pas de place et ne vaut pas inscription définitive." },
  { icon: FileX2, title: "Aucun document demandé", text: "Ni pièce d’identité, ni bulletin, ni dossier médical à cette première étape." },
  { icon: Receipt, title: "Frais et pièces précisés", text: "L’administration vous indique les frais et les pièces selon le niveau demandé." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Admissions", href: "/admissions" }]}
        eyebrow={site.campaign.open ? `Inscriptions ${site.campaign.year}` : "Admissions"}
        title="Préparer l’inscription de votre enfant"
        intro={
          <p>
            Vous souhaitez inscrire votre enfant à La Cité des Anges ? Faites une première demande. L’administration
            pourra vous préciser les classes disponibles, les conditions d’admission, les frais et les pièces
            nécessaires.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#demande" size="lg">
              Faire ma demande
            </ButtonLink>
            <ButtonLink href="#questions" variant="secondary" size="lg" icon={CircleHelp}>
              Questions fréquentes
            </ButtonLink>
          </>
        }
        art={<FormArt />}
      />

      {/* Parcours */}
      <section className="section" aria-labelledby="parcours-title">
        <div className="container-site">
          <SectionHeading
            id="parcours-title"
            align="center"
            eyebrow="Le parcours"
            title="Comment se déroule une demande"
            text="Trois étapes simples, de votre première prise de contact aux démarches d’inscription."
          />
          <AdmissionSteps className="mt-14 lg:mt-20" />
          <ul className="mt-16 grid gap-4 md:grid-cols-3">
            {goodToKnow.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal" style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-line bg-mist p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-navy-800 shadow-sm">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display font-extrabold text-navy-800">{title}</span>
                    <span className="mt-1 block text-[0.95rem] text-muted">{text}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulaire */}
      <section id="demande" className="section relative isolate scroll-mt-24 overflow-hidden bg-mist" aria-labelledby="demande-title">
        <div className="bg-dots absolute inset-y-0 right-0 -z-10 w-1/2 [mask-image:radial-gradient(60%_60%_at_80%_20%,#000,transparent)]" aria-hidden />
        <div className="container-site grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          <div>
            <SectionHeading
              id="demande-title"
              eyebrow="Votre demande"
              title="Faire une première demande"
              text="Préinscription, rendez-vous ou simple renseignement : indiquez le motif et le cycle souhaité."
              className="mb-10"
            />
            <div className="reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
              <InquiryForm origin="/admissions" syncWithUrl />
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-32 lg:mt-[12.5rem] lg:self-start" aria-label="Coordonnées de l’école">
            <div className="reveal rounded-3xl bg-navy-800 p-7 text-white" style={{ "--d": "150ms" } as React.CSSProperties}>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Vous préférez appeler ?</p>
              <ul className="mt-5 space-y-2.5">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition-colors hover:bg-white/[0.12]"
                      data-track="phone_click"
                    >
                      <Phone className="size-4 text-cyan-300" aria-hidden />
                      <span className="font-display font-bold">{p.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${site.email}`} className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline">
                <Mail className="size-4 text-cyan-300" aria-hidden />
                {site.email}
              </a>
            </div>
            <div className="reveal rounded-3xl border border-line bg-white p-7" style={{ "--d": "220ms" } as React.CSSProperties}>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">Adresse</p>
              <p className="mt-3 flex items-start gap-3 font-semibold text-navy-800">
                <MapPin className="mt-0.5 size-5 shrink-0 text-orange-500" aria-hidden />
                {site.address.full}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection
        items={admissionsFaq}
        withJsonLd
        title="Vos questions sur les admissions"
        more={{ href: "#demande", label: "Faire ma demande" }}
      />
    </>
  );
}
