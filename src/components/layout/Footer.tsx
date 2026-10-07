import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { MottoLine } from "@/components/ui/Icons";
import { ctaLabel, site } from "@/lib/site";

const columns = [
  {
    title: "L’établissement",
    links: [
      { href: "/ecole", label: "L’école" },
      { href: "/maternelle", label: "Maternelle" },
      { href: "/primaire", label: "Primaire" },
      { href: "/accueil-inclusif", label: "Accueil inclusif" },
    ],
  },
  {
    title: "Démarches",
    links: [
      { href: "/admissions#demande", label: ctaLabel },
      { href: "/admissions?motif=rendez-vous#demande", label: "Demander un rendez-vous" },
      { href: "/admissions#questions", label: "Questions fréquentes" },
      { href: "/contact", label: "Contact et accès" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 pb-24 text-white/75 md:pb-0">
      {/* Arcs décoratifs */}
      <svg
        className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[42rem] text-white/[0.04]"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
      >
        <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="300" r="230" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="300" r="170" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" aria-hidden />

      <div className="container-site grid gap-12 pb-12 pt-16 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-10 lg:pt-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-4" aria-label="La Cité des Anges, retour à l’accueil">
            <Image src={logo} alt="" sizes="96px" className="h-auto w-20" />
            <span className="font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-white">
              Groupe Scolaire
              <br />
              La Cité des Anges
            </span>
          </Link>
          <p className="mt-6 max-w-xs leading-relaxed">
            Maternelle et primaire à Angré, Cité Gestoci. Échangez avec l’administration sur les démarches d’inscription.
          </p>
          <MottoLine className="mt-6 font-display text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-white" />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-cyan-300">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-1.5 transition-colors hover:text-white">
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-cyan-300">Nous contacter</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-orange-400" aria-hidden />
              <span>
                {site.address.line},
                <br />
                {site.address.landmark}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-orange-400" aria-hidden />
              <span className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="transition-colors hover:text-white" data-track="phone_click">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-orange-400" aria-hidden />
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/confidentialite" className="transition-colors hover:text-white">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="transition-colors hover:text-white">
                Mentions légales
              </Link>
            </li>
            {site.demoMode && (
              <li className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                <span className="size-1.5 rounded-full bg-orange-400" aria-hidden />
                Version de démonstration
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
