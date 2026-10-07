import type { SVGProps } from "react";

/** Glyphe WhatsApp (les icônes de marque ne font pas partie de Lucide). */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.72-1.5a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.1 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}

/** Rangée d'étoiles reprise du ruban du logo. */
export function Stars({ className, count = 5 }: { className?: string; count?: number }) {
  return (
    <span className={className} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="inline-block size-[1em]" fill="currentColor">
          <path d="m12 2.6 2.83 6.1 6.67.75-4.96 4.52 1.36 6.58L12 17.2l-5.9 3.35 1.36-6.58L2.5 9.45l6.67-.75z" />
        </svg>
      ))}
    </span>
  );
}

/** Devise de l'école avec ses étoiles séparatrices. */
export function MottoLine({ className, starClassName = "text-orange-500" }: { className?: string; starClassName?: string }) {
  const words = ["Discipline", "Rigueur", "Travail"];
  return (
    <p className={className}>
      {words.map((word, i) => (
        <span key={word} className="inline-flex items-center">
          {i > 0 && (
            <svg viewBox="0 0 24 24" className={`mx-2.5 inline-block size-[0.8em] ${starClassName}`} fill="currentColor" aria-hidden>
              <path d="m12 2.6 2.83 6.1 6.67.75-4.96 4.52 1.36 6.58L12 17.2l-5.9 3.35 1.36-6.58L2.5 9.45l6.67-.75z" />
            </svg>
          )}
          {word}
        </span>
      ))}
    </p>
  );
}

/** Branche de laurier stylisée, inspirée de l'emblème. */
export function LaurelBranch({ className, flip = false }: { className?: string; flip?: boolean }) {
  const leaves = Array.from({ length: 7 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 80 200"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="currentColor"
      aria-hidden
    >
      <path d="M58 196 C 30 160, 22 110, 34 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {leaves.map((i) => {
        const y = 175 - i * 24;
        const x = 50 - i * 2.6 - (i > 3 ? (i - 3) * 1.4 : 0);
        return (
          <g key={i}>
            <path d={`M${x} ${y} c -16 -4 -24 -16 -24 -26 c 12 2 22 12 24 26 z`} />
            <path d={`M${x + 1} ${y} c 14 -8 26 -8 32 -2 c -10 8 -22 8 -32 2 z`} />
          </g>
        );
      })}
    </svg>
  );
}
