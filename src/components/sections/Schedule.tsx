import Link from "next/link";
import { ArrowRight, Download, FileText, Sun, Sunset } from "lucide-react";
import type { ScheduleRow } from "@/lib/reglement";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Horaires de classe par cycle (article 1 du règlement intérieur). */
export function ScheduleTable({ rows, className }: { rows: readonly ScheduleRow[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-soft)]", className)}>
      <div className="hidden grid-cols-[1.2fr_1fr_1fr] gap-4 border-b border-line bg-mist px-6 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-muted sm:grid">
        <span>Classes</span>
        <span className="inline-flex items-center gap-2">
          <Sun className="size-4 text-orange-500" aria-hidden />
          Matin
        </span>
        <span className="inline-flex items-center gap-2">
          <Sunset className="size-4 text-cyan-600" aria-hidden />
          Après-midi
        </span>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <li key={row.key} className="grid gap-3 px-6 py-5 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center sm:gap-4">
            <span className="font-display text-lg font-extrabold text-navy-800">{row.cycle}</span>
            <span className="flex items-center gap-3 sm:block">
              <span className="w-24 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-muted sm:hidden">Matin</span>
              <span className="font-display text-[1.05rem] font-bold tabular-nums text-ink">{row.morning}</span>
            </span>
            <span className="flex items-center gap-3 sm:block">
              <span className="w-24 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-muted sm:hidden">Après-midi</span>
              <span className="font-display text-[1.05rem] font-bold tabular-nums text-ink">{row.afternoon}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-line bg-mist/60 px-6 py-3.5 text-sm text-muted">
        Lundi, mardi, jeudi et vendredi · pas de classe le mercredi
      </p>
    </div>
  );
}

/** Carte de téléchargement du règlement intérieur officiel. */
export function ReglementCard({ withLink = false, className }: { withLink?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:p-8", className)}>
      <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-navy-800 text-white">
        <FileText className="size-8" strokeWidth={1.7} aria-hidden />
      </span>
      <div className="flex-1">
        <p className="font-display text-xl font-extrabold text-navy-800">Règlement intérieur</p>
        <p className="mt-1 text-sm text-muted">
          PDF · {site.reglement.pages} pages · {site.reglement.size} · {site.reglement.version}
        </p>
        <p className="mt-2 text-[0.97rem] text-muted">
          Signé par les parents lors de l’inscription, précédé de la mention « lu et approuvé ».
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:items-end">
        <a href={site.reglement.href} className="btn btn-primary" download target="_blank" rel="noopener">
          <Download className="size-[1.1rem]" aria-hidden />
          Télécharger
        </a>
        {withLink && (
          <Link href="/infos-pratiques" className="link-arrow text-sm">
            Horaires et règles de vie
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
