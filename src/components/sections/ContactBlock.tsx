import Image from "next/image";
import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import facade from "@/assets/ecole/facade-ecole.jpg";
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
  /** Affiche la photo de la façade à la place de la liste des coordonnées. */
  photo?: boolean;
};

/** Bloc de contact contextuel présent en bas de chaque page. */
export function ContactBlock({
  eyebrow = "Parlons de votre enfant",
  title = "Rencontrez l’administration de La Cité des Anges",
  text = "Pour toute question sur les cycles, les démarches d’inscription ou l’accueil de votre enfant, contactez l’école ou demandez un rendez-vous.",
  primary = { href: "/admissions?motif=rendez-vous#demande", label: "Demander un rendez-vous" },
  flush = false,
  photo = false,
}: ContactBlockProps) {
  const wa = whatsappHref();

  return (
    <section className={flush ? "section pt-0 lg:pt-0" : "section"} aria-labelledby="contact-block-title">
      <div className="container-site">
        <div className="reveal reveal-scale relative isolate overflow-clip rounded-[2rem] bg-navy-800 px-6 py-12 text-white sm:px-10 lg:rounded-[2.5rem] lg:px-16 lg:py-16">
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
              {photo && (
                <ul className="mt-9 grid gap-3 border-t border-white/10 pt-7 text-[0.97rem] text-white/80 sm:grid-cols-2">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-1 size-4 shrink-0 text-cyan-300" aria-hidden />
                    <span className="flex flex-col gap-0.5">
                      {site.phones.map((p) => (
                        <a key={p.href} href={p.href} className="hover:text-white hover:underline" data-track="phone_click">
                          {p.label}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="flex flex-col gap-3">
                    <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all hover:text-white hover:underline">
                      <Mail className="mt-1 size-4 shrink-0 text-cyan-300" aria-hidden />
                      {site.email}
                    </a>
                    <span className="flex items-start gap-3">
                      <MapPin className="mt-1 size-4 shrink-0 text-cyan-300" aria-hidden />
                      {site.address.full}
                    </span>
                  </li>
                </ul>
              )}
            </div>

            {photo ? (
              <figure className="relative pb-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-[6px] border-white/15 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
                  <Image
                    src={facade}
                    alt="Façade du Groupe Scolaire La Cité des Anges : bâtiment à étage orange et bleu, décoré de fresques colorées"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute bottom-0 left-5 flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-5 text-navy-800 shadow-[var(--shadow-lift)]">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-500 text-white">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-display text-sm font-extrabold">{site.address.line}</span>
                    <span className="block text-xs text-muted">{site.address.landmark}</span>
                  </span>
                </figcaption>
              </figure>
            ) : (

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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
