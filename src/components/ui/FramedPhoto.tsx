import Image, { type StaticImageData } from "next/image";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FramedPhotoProps = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Affiche l'adresse de l'école en surimpression */
  addressBadge?: boolean;
  /** Proportions de l'image (classe Tailwind aspect-*) */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Photographie réelle de l'établissement, présentée dans un cadre aux couleurs du site. */
export function FramedPhoto({
  src,
  alt,
  caption,
  addressBadge = false,
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 100vw, 560px",
  priority = false,
  className,
}: FramedPhotoProps) {
  return (
    <figure className={cn("group", className)}>
      <div className="relative isolate">
        <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-100 via-white to-orange-100 sm:-inset-4" aria-hidden />
        <div className={cn("relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-mist shadow-[var(--shadow-lift)]", aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/35 to-transparent" aria-hidden />
        </div>
        {addressBadge && (
          <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl border border-white bg-white/95 py-2.5 pl-2.5 pr-5 shadow-[var(--shadow-lift)] backdrop-blur sm:left-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-500 text-white">
              <MapPin className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[0.92rem] font-extrabold text-navy-800">{site.address.line}</span>
              <span className="block text-[0.8rem] text-muted">
                {site.address.landmark}, {site.address.commune}
              </span>
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className={cn("text-sm text-muted", addressBadge ? "mt-10" : "mt-4")}>{caption}</figcaption>
      )}
    </figure>
  );
}
