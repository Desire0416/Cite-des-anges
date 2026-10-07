import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, House, Phone, Shapes } from "lucide-react";
import { ArcsDecor } from "@/components/art/Decor";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ButtonLink } from "@/components/ui/Button";
import { primaryPhone } from "@/lib/site";

const links = [
  { href: "/maternelle", label: "La maternelle", icon: Shapes },
  { href: "/primaire", label: "Le primaire", icon: BookOpen },
  { href: "/accueil-inclusif", label: "L’accueil inclusif", icon: HeartHandshake },
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative isolate overflow-hidden bg-mist">
        <ArcsDecor className="absolute -right-40 -top-40 -z-10 hidden size-[40rem] lg:block" />
        <div className="container-site grid min-h-[70vh] items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Page introuvable</p>
            <h1 className="mt-5 text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]">
              Cette page n’existe pas ou a été déplacée
            </h1>
            <p className="lead mt-6 max-w-xl">
              Le lien que vous avez suivi ne mène nulle part. Revenez à l’accueil ou poursuivez vers les informations les plus
              consultées.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/" size="lg" icon={House}>
                Retour à l’accueil
              </ButtonLink>
              <ButtonLink href="/admissions" variant="secondary" size="lg">
                Admissions
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <p className="pointer-events-none select-none text-center font-display text-[9rem] font-extrabold leading-none tracking-[-0.06em] text-navy-800/[0.06] sm:text-[13rem]" aria-hidden>
              404
            </p>
            <ul className="-mt-16 space-y-3 sm:-mt-24">
              {links.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200"
                  >
                    <span className="icon-tile size-11 rounded-xl">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="flex-1 font-display font-bold text-navy-800">{label}</span>
                    <ArrowRight className="size-4 text-navy-300 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={primaryPhone.href}
                  className="group flex items-center gap-4 rounded-2xl bg-navy-800 p-4 text-white transition-all duration-300 hover:-translate-y-0.5"
                  data-track="phone_click"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                    <Phone className="size-5" aria-hidden />
                  </span>
                  <span className="flex-1 font-display font-bold">Appeler l’école · {primaryPhone.label}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
