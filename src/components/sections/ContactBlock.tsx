import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { ArcsDecor } from "@/components/art/Decor";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { primaryPhone, site, whatsappHref } from "@/lib/site";

type ContactBlockProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  /** Supprime l'espace supérieur quand la section précédente est déjà blanche. */
  flush?: boolean;
};

/** Bloc de contact contextuel présent en bas de chaque page. */
export function ContactBlock({
  eyebrow = "Parlons de votre enfant",
  title = "Rencontrez l’administration de La Cité des Anges",
  text = "Pour toute question sur les cycles, les démarches d’inscription ou l’accueil de votre enfant, contactez l’école ou demandez un rendez-vous.",
  primary = { href: "/admissions?motif=rendez-vous#demande", label: "Demander un rendez-vous" },
  flush = false,
}: ContactBlockProps) {
  const wa = whatsappHref();

  return (
    <section className={flush ? "section pt-0 lg:pt-0" : "section"} aria-labelledby="contact-block-title">
      <div className="container-site">
        <div className="reveal reveal-scale relative isolate overflow-hidden rounded-[2rem] bg-navy-800 px-6 py-12 text-white sm:px-10 lg:rounded-[2.5rem] lg:px-16 lg:py-16">
          <div className="bg-dots-light absolute inset-0 -z-10" aria-hidden />
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(18_172_212/0.35),transparent),radial-gradient(50%_70%_at_0%_100%,rgb(245_124_22/0.18),transparent)]"
            aria-hidden
          />
          <ArcsDecor tone="light" dots={false} className="absolute -bottom-64 -right-40 -z-10 size-[38rem]" />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow eyebrow-light">{eyebrow}</p>
              <h2 id="contact-block-title" className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-[2.4rem]">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={primary.href} variant="light" size="lg" icon={CalendarCheck} track="admissions_click">
                  {primary.label}
                </ButtonLink>
                <ButtonLink href={primaryPhone.href} variant="outline-light" size="lg" icon={Phone} track="phone_click">
                  Appeler l’école
                </ButtonLink>
                {wa && (
                  <ButtonLink href={wa} variant="outline-light" size="lg" track="whatsapp_click">
                    <span className="inline-flex items-center gap-2">
                      <WhatsAppIcon className="size-5" />
                      Écrire sur WhatsApp
                    </span>
                  </ButtonLink>
                )}
              </div>
            </div>

            <ul className="grid gap-3">
              <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-500 text-white">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-cyan-300">Adresse</span>
                  <span className="mt-1 block text-white">{site.address.full}</span>
                </span>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan-500 text-navy-900">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-cyan-300">Téléphone</span>
                  <span className="mt-1 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-5">
                    {site.phones.map((p) => (
                      <a key={p.href} href={p.href} className="text-white underline-offset-4 hover:underline" data-track="phone_click">
                        {p.label}
                      </a>
                    ))}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-navy-800">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-cyan-300">Email</span>
                  <a href={`mailto:${site.email}`} className="mt-1 block break-all text-white underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
