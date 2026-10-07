import Image from "next/image";
import { BookOpen, MapPin, Shapes } from "lucide-react";
import logo from "@/assets/logo.png";
import { arcPath } from "./Decor";

const orbitDots = [
  { angle: -62, r: 11, fill: "var(--color-orange-500)" },
  { angle: 18, r: 7, fill: "var(--color-leaf-500)" },
  { angle: 112, r: 6.5, fill: "var(--color-magenta-500)" },
  { angle: 196, r: 9, fill: "var(--color-cyan-500)" },
  { angle: 248, r: 5, fill: "var(--color-orange-400)" },
];

function Chip({
  icon: Icon,
  title,
  text,
  tone,
  className,
  delay,
}: {
  icon: typeof Shapes;
  title: string;
  text: string;
  tone: "cyan" | "orange" | "navy";
  className: string;
  delay: string;
}) {
  const tones = {
    cyan: "bg-cyan-50 text-cyan-700",
    orange: "bg-orange-50 text-orange-700",
    navy: "bg-navy-800 text-white",
  } as const;
  return (
    <div
      className={`anim-rise absolute flex items-center gap-3 rounded-2xl border border-white bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[var(--shadow-lift)] backdrop-blur sm:py-3 sm:pl-3 sm:pr-5 ${className}`}
      style={{ "--delay": delay } as React.CSSProperties}
    >
      <span className={`grid size-9 place-items-center rounded-xl sm:size-11 ${tones[tone]}`}>
        <Icon className="size-[1.1rem] sm:size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[0.8rem] font-extrabold text-navy-800 sm:text-[0.92rem]">{title}</span>
        <span className="block text-[0.72rem] text-muted sm:text-[0.8rem]">{text}</span>
      </span>
    </div>
  );
}

export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[33rem]">
      {/* Disque lumineux */}
      <div
        className="anim-fade absolute inset-[7%] rounded-full bg-[radial-gradient(circle_at_32%_26%,#ffffff_0%,var(--color-cyan-50)_58%,#dff1f8_100%)] shadow-[inset_0_0_0_1px_rgb(18_172_212/0.12)]"
        aria-hidden
      />

      {/* Orbite : le seul mouvement décoratif, lent et continu */}
      <div className="absolute inset-0 animate-orbit" aria-hidden>
        <svg viewBox="0 0 560 560" className="size-full overflow-visible">
          <circle cx="280" cy="280" r="246" fill="none" stroke="var(--color-cyan-300)" strokeWidth="1.6" strokeDasharray="1 11" strokeLinecap="round" />
          {orbitDots.map((d) => {
            const a = (d.angle * Math.PI) / 180;
            return <circle key={d.angle} cx={280 + 246 * Math.cos(a)} cy={280 + 246 * Math.sin(a)} r={d.r} fill={d.fill} />;
          })}
        </svg>
      </div>

      {/* Arc ouvert inspiré du cercle de l'emblème */}
      <svg viewBox="0 0 560 560" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="hero-arc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-cyan-300)" />
            <stop offset="1" stopColor="var(--color-cyan-500)" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="280" r="272" fill="none" stroke="var(--color-navy-100)" strokeWidth="1.5" />
        <path
          d={arcPath(280, 280, 214, 128, 392)}
          fill="none"
          stroke="url(#hero-arc)"
          strokeWidth="13"
          strokeLinecap="round"
          className="anim-draw"
          style={{ "--len": 1000, "--dur": "2.2s", "--delay": "0.25s" } as React.CSSProperties}
        />
      </svg>

      <Image
        src={logo}
        alt="Emblème du Groupe Scolaire La Cité des Anges : trois silhouettes d’enfants dans un cercle, entourées de lauriers, avec la devise Discipline, Rigueur, Travail."
        priority
        sizes="(max-width: 640px) 62vw, (max-width: 1024px) 50vw, 360px"
        className="anim-pop absolute left-1/2 top-1/2 h-auto w-[64%] -translate-x-1/2 -translate-y-[51%] drop-shadow-[0_28px_36px_rgb(8_45_85/0.28)]"
        style={{ "--delay": "0.1s" } as React.CSSProperties}
      />

      <div aria-hidden>
        <Chip icon={Shapes} title="Maternelle" text="Cycle proposé" tone="cyan" className="left-0 top-[12%] sm:-left-[3%]" delay="0.55s" />
        <Chip icon={BookOpen} title="Primaire" text="Cycle proposé" tone="orange" className="-right-[1%] top-[47%] sm:-right-[5%]" delay="0.7s" />
        <Chip
          icon={MapPin}
          title="Angré, Cité Gestoci"
          text="En face du terrain de jeux"
          tone="navy"
          className="bottom-[5%] left-[3%] sm:left-[1%]"
          delay="0.85s"
        />
      </div>
    </div>
  );
}
