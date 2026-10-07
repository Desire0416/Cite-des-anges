import { MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accueil inclusif : deux cercles qui se rejoignent — la famille et l'école —
 * pour représenter l'échange, sans image stéréotypée.
 */
export function DialogueArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[5/4] w-full max-w-[30rem]", className)} aria-hidden>
      <svg viewBox="0 0 500 400" className="absolute inset-0 size-full">
        <defs>
          <radialGradient id="dlg-a" cx="35%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="var(--color-cyan-100)" />
          </radialGradient>
          <radialGradient id="dlg-b" cx="65%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="var(--color-orange-100)" />
          </radialGradient>
        </defs>
        <circle cx="180" cy="200" r="148" fill="url(#dlg-a)" />
        <circle cx="320" cy="200" r="148" fill="url(#dlg-b)" style={{ mixBlendMode: "multiply" }} />
        <circle cx="180" cy="200" r="148" fill="none" stroke="var(--color-cyan-500)" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
        <circle cx="320" cy="200" r="148" fill="none" stroke="var(--color-orange-500)" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
        <circle cx="74" cy="92" r="10" fill="var(--color-leaf-500)" />
        <circle cx="440" cy="300" r="12" fill="var(--color-magenta-500)" fillOpacity="0.8" />
        <circle cx="430" cy="84" r="7" fill="var(--color-royal-500)" />
      </svg>
      <span className="absolute left-[14%] top-1/2 -translate-y-1/2 font-display text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-cyan-700 sm:text-xs">
        La famille
      </span>
      <span className="absolute right-[15%] top-1/2 -translate-y-1/2 font-display text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-orange-700 sm:text-xs">
        L’école
      </span>
      <span className="absolute left-1/2 top-1/2 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy-800 text-white shadow-[0_18px_36px_-14px_rgb(8_45_85/0.6)] ring-8 ring-white sm:size-20">
        <MessagesSquare className="size-8" strokeWidth={1.8} />
      </span>
    </div>
  );
}
