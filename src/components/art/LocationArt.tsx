import { MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Repère graphique non cartographique : il situe l'adresse sans prétendre
 * à une localisation exacte (la carte sera activée après vérification).
 */
export function LocationArt({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[22rem]", className)} aria-hidden>
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
        {[180, 140, 100, 62].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill={dark ? "#ffffff" : "var(--color-cyan-500)"}
            fillOpacity={dark ? 0.03 + i * 0.015 : 0.05 + i * 0.03}
            stroke={dark ? "#ffffff" : "var(--color-cyan-500)"}
            strokeOpacity={dark ? 0.12 : 0.22}
            strokeDasharray={i % 2 ? "2 8" : undefined}
            strokeLinecap="round"
          />
        ))}
        <circle cx="70" cy="120" r="8" fill="var(--color-orange-500)" />
        <circle cx="330" cy="290" r="10" fill="var(--color-leaf-500)" fillOpacity="0.9" />
        <circle cx="318" cy="96" r="6" fill="var(--color-magenta-500)" fillOpacity="0.85" />
      </svg>
      <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-[60%] place-items-center rounded-full bg-orange-500 text-white shadow-[0_20px_40px_-16px_rgb(245_124_22/0.8)] ring-[10px] ring-white/90">
        <MapPin className="size-9" strokeWidth={2} />
      </span>
      <span
        className={cn(
          "absolute bottom-[13%] left-1/2 w-max -translate-x-1/2 rounded-2xl px-5 py-3 text-center shadow-[var(--shadow-lift)]",
          dark ? "bg-white text-navy-800" : "border border-line bg-white text-navy-800",
        )}
      >
        <span className="block font-display text-sm font-extrabold">{site.address.line}</span>
        <span className="block text-xs text-muted">{site.address.landmark}</span>
      </span>
    </div>
  );
}
