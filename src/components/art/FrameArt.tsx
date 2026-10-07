import Image from "next/image";
import { Check } from "lucide-react";
import logo from "@/assets/logo.png";
import { arcPath } from "./Decor";
import { cn } from "@/lib/utils";

/** Emblème dans un cadre d'arcs (page école). */
export function EmblemArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[26rem]", className)}>
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff,var(--color-cyan-50)_60%,#dff1f8)]" aria-hidden />
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="200" cy="200" r="194" fill="none" stroke="var(--color-navy-100)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="176" fill="none" stroke="var(--color-cyan-300)" strokeWidth="1.5" strokeDasharray="1 9" strokeLinecap="round" />
        <path
          d={arcPath(200, 200, 156, 140, 400)}
          fill="none"
          stroke="var(--color-cyan-500)"
          strokeWidth="10"
          strokeLinecap="round"
          className="anim-draw"
          style={{ "--len": 720, "--delay": "0.35s" } as React.CSSProperties}
        />
        <circle cx="200" cy="6" r="8" fill="var(--color-orange-500)" />
        <circle cx="372" cy="120" r="6" fill="var(--color-leaf-500)" />
        <circle cx="40" cy="300" r="6" fill="var(--color-magenta-500)" />
      </svg>
      <Image
        src={logo}
        alt="Emblème du Groupe Scolaire La Cité des Anges"
        priority
        sizes="(max-width: 1024px) 60vw, 280px"
        className="absolute left-1/2 top-1/2 h-auto w-[66%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_30px_rgb(8_45_85/0.25)]"
      />
    </div>
  );
}

/** Formulaire stylisé (page admissions). */
export function FormArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[26rem]", className)} aria-hidden>
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
        <circle cx="200" cy="200" r="190" fill="var(--color-cyan-50)" />
        <path d={arcPath(200, 200, 168, 200, 470)} fill="none" stroke="var(--color-cyan-500)" strokeWidth="10" strokeLinecap="round" className="anim-draw" style={{ "--len": 800, "--delay": "0.35s" } as React.CSSProperties} />
        <circle cx="62" cy="96" r="9" fill="var(--color-orange-500)" />
        <circle cx="346" cy="300" r="8" fill="var(--color-leaf-500)" />
        <circle cx="338" cy="84" r="6" fill="var(--color-magenta-500)" />
      </svg>
      <div className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-3 rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-lift)] sm:p-6">
        <div className="h-2.5 w-24 rounded-full bg-navy-800" />
        <div className="mt-2 h-2 w-36 rounded-full bg-navy-100" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-4">
            <div className="h-1.5 w-14 rounded-full bg-navy-200" />
            <div className="mt-2 h-8 rounded-xl border-[1.5px] border-line bg-mist" />
          </div>
        ))}
        <div className="mt-4 flex gap-2">
          <div className="h-7 flex-1 rounded-full border-[1.5px] border-navy-800 bg-navy-50" />
          <div className="h-7 flex-1 rounded-full border-[1.5px] border-line" />
        </div>
        <div className="mt-5 h-9 rounded-full bg-navy-800" />
      </div>
      <span className="anim-pop absolute right-[13%] top-[16%] grid size-14 place-items-center rounded-full bg-leaf-500 text-white shadow-[0_14px_28px_-12px_rgb(109_179_63/0.8)] ring-[6px] ring-white" style={{ "--delay": "0.6s" } as React.CSSProperties}>
        <Check className="size-7" strokeWidth={3} />
      </span>
    </div>
  );
}

/** Illustration de cycle encadrée (pages maternelle et primaire). */
export function CycleFrame({ children, label, tone }: { children: React.ReactNode; label: string; tone: "cyan" | "orange" }) {
  return (
    <div className="relative mx-auto w-full max-w-[30rem]" aria-hidden>
      <div className="absolute -inset-4 rounded-[2.5rem] bg-white/60 sm:-inset-5" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white shadow-[var(--shadow-lift)]">
        <div className="aspect-[400/260]">{children}</div>
      </div>
      <span
        className={cn(
          "anim-rise absolute -bottom-5 left-6 rounded-2xl border border-white px-4 py-2.5 font-display text-sm font-extrabold shadow-[var(--shadow-lift)]",
          tone === "cyan" ? "bg-cyan-500 text-navy-900" : "bg-orange-500 text-navy-900",
        )}
        style={{ "--delay": "0.5s" } as React.CSSProperties}
      >
        {label}
      </span>
    </div>
  );
}
