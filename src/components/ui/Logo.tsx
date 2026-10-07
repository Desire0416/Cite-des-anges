import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Variante claire pour les fonds marine */
  tone?: "dark" | "light";
  compact?: boolean;
  priority?: boolean;
};

export function LogoLockup({ className, tone = "dark", compact = false, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3 rounded-2xl", className)}
      aria-label="La Cité des Anges, retour à l’accueil"
    >
      <Image
        src={logo}
        alt=""
        priority={priority}
        sizes="64px"
        className={cn(
          "h-auto shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-[-4deg] group-hover:scale-105",
          compact ? "w-12" : "w-14",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-[-0.02em] sm:text-[1.15rem]",
            tone === "dark" ? "text-navy-800" : "text-white",
          )}
        >
          La Cité des Anges
        </span>
        <span
          className={cn(
            "mt-1.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.18em]",
            tone === "dark" ? "text-cyan-700" : "text-cyan-300",
          )}
        >
          Groupe scolaire · Angré
        </span>
      </span>
    </Link>
  );
}
