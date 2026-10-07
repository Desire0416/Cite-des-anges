import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react";
import { primaryPhone, site } from "@/lib/site";

/** Bandeau de campagne paramétrable : masqué dès que la campagne est fermée. */
export function CampaignBar() {
  if (!site.campaign.open) return null;

  return (
    <div className="relative overflow-hidden bg-navy-900 text-white">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(60%_140%_at_0%_50%,rgb(18_172_212/0.28),transparent)]"
        aria-hidden
      />
      <div className="container-site relative flex min-h-11 items-center justify-between gap-4 py-2 text-[0.88rem]">
        <p className="flex items-center gap-2.5">
          <CalendarCheck className="size-4 shrink-0 text-cyan-300" aria-hidden />
          <span>
            <strong className="whitespace-nowrap font-display font-bold">Inscriptions {site.campaign.year}</strong>
            <span className="hidden text-white/70 sm:inline"> — faites une première demande auprès de l’administration.</span>
          </span>
        </p>
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={primaryPhone.href}
            className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            data-track="phone_click"
          >
            <Phone className="size-3.5 text-cyan-300" aria-hidden />
            {primaryPhone.label}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
          >
            <Mail className="size-3.5 text-cyan-300" aria-hidden />
            {site.email}
          </a>
        </div>
        <Link
          href="/admissions#demande"
          className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-display font-bold text-cyan-300 transition-colors hover:text-white lg:hidden"
          data-track="admissions_click"
        >
          Faire une demande
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
