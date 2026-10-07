import { cn } from "@/lib/utils";

/** Chemin d'arc de cercle (angles en degrés, 0° = 3 h, sens horaire). */
export function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const rad = (a: number) => (a * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(start));
  const y1 = cy + r * Math.sin(rad(start));
  const x2 = cx + r * Math.cos(rad(end));
  const y2 = cy + r * Math.sin(rad(end));
  const large = end - start > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/** Arcs concentriques ouverts — motif « Un cadre pour grandir ». */
export function ArcsDecor({
  className,
  tone = "navy",
  dots = true,
}: {
  className?: string;
  tone?: "navy" | "light";
  dots?: boolean;
}) {
  const stroke = tone === "navy" ? "var(--color-navy-800)" : "#ffffff";
  return (
    <svg viewBox="0 0 600 600" fill="none" className={cn("pointer-events-none", className)} aria-hidden>
      <path d={arcPath(300, 300, 280, 200, 470)} stroke={stroke} strokeOpacity="0.07" strokeWidth="2" />
      <path d={arcPath(300, 300, 225, 160, 420)} stroke={stroke} strokeOpacity="0.09" strokeWidth="2" />
      <path
        d={arcPath(300, 300, 170, 120, 380)}
        stroke="var(--color-cyan-500)"
        strokeOpacity="0.35"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {dots && (
        <>
          <circle cx="300" cy="20" r="9" fill="var(--color-orange-500)" fillOpacity="0.7" />
          <circle cx="530" cy="190" r="6" fill="var(--color-leaf-500)" fillOpacity="0.6" />
          <circle cx="120" cy="470" r="7" fill="var(--color-magenta-500)" fillOpacity="0.45" />
        </>
      )}
    </svg>
  );
}
