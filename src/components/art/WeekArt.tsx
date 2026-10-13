import { Sun, Sunset } from "lucide-react";
import { cn } from "@/lib/utils";

const week = [
  { day: "Lun", on: true },
  { day: "Mar", on: true },
  { day: "Mer", on: false },
  { day: "Jeu", on: true },
  { day: "Ven", on: true },
];

/** Semaine de 4 jours (article 1 du règlement intérieur). */
export function WeekArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[28rem]", className)} aria-hidden>
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-100 via-white to-orange-100" />
      <div className="rounded-[2rem] border border-white bg-white p-6 shadow-[var(--shadow-lift)] sm:p-8">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">Semaine de classe</p>
        <p className="mt-1 font-display text-2xl font-extrabold text-navy-800">4 jours</p>
        <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
          {week.map(({ day, on }, i) => (
            <div
              key={day}
              className={cn(
                "anim-rise flex flex-col items-center gap-2 rounded-2xl py-4 font-display text-sm font-extrabold",
                on ? "bg-navy-800 text-white" : "border-2 border-dashed border-navy-100 text-navy-300",
              )}
              style={{ "--delay": `${0.25 + i * 0.08}s` } as React.CSSProperties}
            >
              {day}
              <span className={cn("size-2 rounded-full", on ? "bg-cyan-300" : "bg-navy-100")} />
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-3.5">
            <span className="grid size-10 place-items-center rounded-xl bg-orange-500 text-white">
              <Sun className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold text-navy-800">Matin</span>
              <span className="block text-xs text-muted">dès 07h30 selon la classe</span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-cyan-50 p-3.5">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-500 text-navy-900">
              <Sunset className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold text-navy-800">Après-midi</span>
              <span className="block text-xs text-muted">à partir de 14h00</span>
            </span>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-muted">Pas de classe le mercredi</p>
      </div>
    </div>
  );
}
