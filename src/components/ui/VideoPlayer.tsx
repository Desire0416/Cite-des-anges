"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  src: string;
  poster: StaticImageData;
  title: string;
  duration: string;
  orientation?: "portrait" | "paysage";
  /** Proportions du cadre (classe aspect-*) ; par défaut selon l'orientation */
  aspect?: string;
  sizes?: string;
  className?: string;
};

/**
 * Vidéo chargée uniquement à la demande : l'affiche est montrée d'abord,
 * la lecture ne démarre qu'au clic (aucune vidéo automatique).
 */
export function VideoPlayer({
  src,
  poster,
  title,
  duration,
  orientation = "paysage",
  aspect,
  sizes = "(max-width: 1024px) 100vw, 640px",
  className,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-navy-950 shadow-[var(--shadow-lift)]",
        aspect ?? (orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"),
        className,
      )}
    >
      {playing ? (
        <video
          src={src}
          poster={poster.src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="size-full bg-black object-contain"
          aria-label={title}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 size-full text-left"
          aria-label={`Lire la vidéo : ${title} (${duration})`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" aria-hidden />
          <span className="absolute left-1/2 top-1/2 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy-800 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.55)] ring-8 ring-white/25 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
            <Play className="ml-1 size-7 fill-current" aria-hidden />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
            <span className="font-display text-[0.95rem] font-extrabold leading-snug text-white sm:text-base">{title}</span>
            <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              {duration}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
