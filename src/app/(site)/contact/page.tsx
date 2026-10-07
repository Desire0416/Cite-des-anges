import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Navigation, Phone, PhoneCall } from "lucide-react";
import { LocationArt } from "@/components/art/LocationArt";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { primaryPhone, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact et accès",
  description: `Contactez La Cité des Anges : ${site.phones.map((p) => p.label).join(", ")}, ${site.email}. Adresse : ${site.address.full}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappHref();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact et accès"
        title="Contacter l’école"
        intro={
          <p>
            Appelez l’administration, écrivez-nous ou demandez un rendez-vous. L’école se situe à {site.address.full}.
          </p>
        }
        actions={
          <>
            <ButtonLink href={primaryPhone.href} size="lg" icon={Phone} track="phone_click">
              Appeler l’école
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary" size="lg" icon={Mail}>
              Nous écrire
            </ButtonLink>
          </>
        }
        art={<LocationArt />}
      />

      {/* Coordonnées */}
      <section className="section" aria-labelledby="coordonnees-title">
        <div className="container-site">
          <SectionHeading id="coordonnees-title" eyebrow="Coordonnées" title="Toutes les façons de nous joindre" />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {/* Téléphones */}
            <div className="reveal lg:col-span-2">
              <div className="card h-full p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-cyan-500 text-navy-900">
                    <PhoneCall className="size-6" aria-hidden />
                  </span>
                  <h3 className="text-2xl font-extrabold">Par téléphone</h3>
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {site.phones.map((p, i) => (
                    <li key={p.href}>
                      <a
                        href={p.href}
                        className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-line p-5 transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-[var(--shadow-soft)]"
                        data-track="phone_click"
                      >
                        <span className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
                          {`Numéro ${i + 1}`}
                        </span>
                        <span className="font-display text-lg font-extrabold text-navy-800">{p.label}</span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700">
                          Appeler
                          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Email */}
            <div className="reveal" style={{ "--d": "100ms" } as React.CSSProperties}>
              <a
                href={`mailto:${site.email}`}
                className="card card-hover group flex h-full flex-col justify-between gap-8 p-7 sm:p-9"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-navy-800 text-white">
                    <Mail className="size-6" aria-hidden />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-navy-800">Par email</span>
                </span>
                <span>
                  <span className="block break-all font-display text-lg font-extrabold text-navy-800">{site.email}</span>
                  <span className="mt-2 block text-sm text-muted">Le lien ouvre votre logiciel de messagerie.</span>
                </span>
              </a>
            </div>

            {/* Adresse */}
            <div className="reveal lg:col-span-2" style={{ "--d": "60ms" } as React.CSSProperties}>
              <div className="card flex h-full flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange-500 text-navy-900">
                    <MapPin className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold">Adresse</h3>
                    <p className="mt-2 text-lg font-semibold text-navy-800">{site.address.line}</p>
                    <p className="text-muted">{site.address.landmark}</p>
                  </div>
                </div>
                {site.directionsUrl && (
                  <ButtonLink href={site.directionsUrl} variant="secondary" icon={Navigation} track="directions_click">
                    Voir l’itinéraire
                  </ButtonLink>
                )}
              </div>
            </div>

            {/* WhatsApp (après confirmation du numéro) ou rendez-vous */}
            <div className="reveal" style={{ "--d": "160ms" } as React.CSSProperties}>
              {wa ? (
                <a href={wa} className="card card-hover flex h-full flex-col justify-between gap-8 p-7 sm:p-9" data-track="whatsapp_click">
                  <span className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-leaf-500 text-white">
                      <WhatsAppIcon className="size-6" />
                    </span>
                    <span className="font-display text-2xl font-extrabold text-navy-800">WhatsApp</span>
                  </span>
                  <span className="text-sm text-muted">Écrire à l’école sur WhatsApp</span>
                </a>
              ) : (
                <a
                  href="#rendez-vous"
                  className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-navy-800 p-7 text-white transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-9"
                >
                  <span className="bg-dots-light absolute inset-0" aria-hidden />
                  <span className="relative font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Rendez-vous</span>
                  <span className="relative">
                    <span className="block font-display text-2xl font-extrabold">Rencontrer l’administration</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-display font-bold text-cyan-300">
                      Faire une demande
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section id="rendez-vous" className="section scroll-mt-24 bg-mist" aria-labelledby="contact-form-title">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="contact-form-title"
              eyebrow="Écrire à l’école"
              title="Une question, un rendez-vous ?"
              text="Utilisez le formulaire commun : l’administration prend connaissance de votre demande et revient vers vous. La date d’un rendez-vous est toujours confirmée par l’école."
            />
          </div>
          <div className="reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
            <InquiryForm
              origin="/contact"
              defaultMotif="rendez-vous"
              title="Votre message à l’administration"
              syncWithUrl
            />
          </div>
        </div>
      </section>
    </>
  );
}
