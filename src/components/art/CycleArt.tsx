import { cn } from "@/lib/utils";

const move = "transition-transform duration-[900ms] ease-[var(--ease-out-soft)]";
const spin = "[transform-box:fill-box] origin-center";

/** Maternelle : formes simples et colorées, comme des blocs d'éveil. */
export function MaternelleArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={cn("size-full", className)} aria-hidden>
      <rect width="400" height="260" fill="var(--color-cyan-50)" />
      <g opacity="0.55">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={30 + i * 44} cy="236" r="2.2" fill="var(--color-cyan-600)" />
        ))}
      </g>
      <path d="M0 210 Q 200 170 400 210 L400 260 L0 260 Z" fill="#ffffff" fillOpacity="0.7" />

      <g className={cn(move, "group-hover:-translate-y-2 group-hover:translate-x-1")}>
        <circle cx="118" cy="146" r="64" fill="var(--color-cyan-500)" />
        <circle cx="96" cy="124" r="20" fill="#ffffff" fillOpacity="0.22" />
      </g>
      <g className={cn(move, spin, "group-hover:rotate-[24deg]")}>
        <rect x="214" y="58" width="74" height="74" rx="18" fill="var(--color-leaf-500)" transform="rotate(14 251 95)" />
      </g>
      <g className={cn(move, "group-hover:translate-x-2")}>
        <path d="M232 214 a 62 62 0 0 1 124 0 z" fill="var(--color-orange-500)" />
      </g>
      <g className={cn(move, "group-hover:-translate-y-3")}>
        <circle cx="330" cy="64" r="17" fill="var(--color-magenta-500)" />
      </g>
      <g className={cn(move, spin, "group-hover:-rotate-12")}>
        <path d="M168 34 L 196 82 L 140 82 Z" fill="none" stroke="var(--color-navy-800)" strokeWidth="6" strokeLinejoin="round" />
      </g>
      <circle cx="54" cy="56" r="9" fill="var(--color-royal-500)" />
      <circle cx="350" cy="150" r="6" fill="var(--color-orange-300)" />
      <circle cx="198" cy="190" r="7" fill="var(--color-navy-800)" />
    </svg>
  );
}

/** Primaire : cahier, rapporteur et crayon, en formes géométriques. */
export function PrimaireArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={cn("size-full", className)} aria-hidden>
      <rect width="400" height="260" fill="var(--color-orange-50)" />
      <path d="M0 210 Q 200 176 400 214 L400 260 L0 260 Z" fill="#ffffff" fillOpacity="0.75" />

      {/* Cahier */}
      <g className={cn(move, spin, "group-hover:-rotate-3")}>
        <g transform="rotate(-7 150 128)">
          <rect x="70" y="48" width="160" height="164" rx="14" fill="#ffffff" stroke="var(--color-navy-100)" strokeWidth="2" />
          <line x1="98" y1="48" x2="98" y2="212" stroke="var(--color-orange-300)" strokeWidth="2.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1="108" x2={i === 5 ? 170 : 212} y1={84 + i * 21} y2={84 + i * 21} stroke="var(--color-navy-100)" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          <rect x="108" y="64" width="62" height="8" rx="4" fill="var(--color-navy-800)" />
        </g>
      </g>

      {/* Rapporteur */}
      <g className={cn(move, "group-hover:-translate-y-2")}>
        <path d="M232 206 a 72 72 0 0 1 144 0 z" fill="var(--color-cyan-500)" fillOpacity="0.92" />
        <path d="M256 206 a 48 48 0 0 1 96 0" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = Math.PI + (i * Math.PI) / 8;
          return (
            <line
              key={i}
              x1={304 + 60 * Math.cos(a)}
              y1={206 + 60 * Math.sin(a)}
              x2={304 + 70 * Math.cos(a)}
              y2={206 + 70 * Math.sin(a)}
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="304" cy="206" r="5" fill="#ffffff" />
      </g>

      {/* Crayon */}
      <g className={cn(move, "group-hover:translate-x-2 group-hover:-translate-y-1")}>
        <g transform="rotate(-38 300 92)">
          <rect x="240" y="80" width="112" height="24" rx="4" fill="var(--color-orange-500)" />
          <rect x="240" y="80" width="18" height="24" rx="4" fill="var(--color-magenta-500)" />
          <path d="M352 80 L 376 92 L 352 104 Z" fill="#f7d9b8" />
          <path d="M368 88 L 376 92 L 368 96 Z" fill="var(--color-navy-800)" />
        </g>
      </g>

      <circle cx="44" cy="66" r="10" fill="var(--color-leaf-500)" />
      <circle cx="372" cy="40" r="7" fill="var(--color-royal-500)" />
      <circle cx="40" cy="190" r="6" fill="var(--color-cyan-500)" />
    </svg>
  );
}
