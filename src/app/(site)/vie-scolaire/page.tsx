import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Drama, GraduationCap, HandFist, Play, type LucideIcon } from "lucide-react";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { PageHero } from "@/components/sections/PageHero";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { directorMessage } from "@/lib/medias-ecole";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { moments, vieScolaireEnabled, type Moment } from "@/lib/vie-scolaire";

export const metadata: Metadata = {
  title: "Vie scolaire",
  description:
    "Promotion Excellence 2025-2026, journée costumée, Kung-Fu : quelques moments de la vie du Groupe Scolaire La Cité des Anges, en photos et en vidéo.",
  alternates: { canonical: "/vie-scolaire" },
};

const momentIcons: Record<string, LucideIcon> = {
  promotion: GraduationCap,
  "journee-costumee": Drama,
  "kung-fu": HandFist,
};

function MomentIndex() {
  return (
    <nav aria-label="Moments de la vie scolaire" className="mx-auto w-full max-w-[26rem]">
      <div className="relative">
        <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-100 via-white to-orange-100" aria-hidden />
        <div className="rounded-[2rem] border border-white bg-white p-5 shadow-[var(--shadow-lift)] sm:p-6">
          <p className="px-2 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">Au sommaire</p>
          <ul className="mt-3 space-y-1.5">
            {moments.map((moment, i) => {
              const Icon = momentIcons[moment.key] ?? GraduationCap;
              return (
                <li key={moment.key} className="anim-rise" style={{ "--delay": `${0.2 + i * 0.1}s` } as React.CSSProperties}>
                  <a href={`#${moment.key}`} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-mist">
                    <span className={cn("icon-tile size-12 rounded-xl", i === 1 && "bg-orange-50 text-orange-700", i === 2 && "bg-navy-50 text-navy-800")}>
                      <Icon className="size-[1.3rem]" aria-hidden />
                    </span>
                    <span className="flex-1 leading-tight">
                      <span className="block text-xs text-muted">{moment.kicker}</span>
                      <span className="block font-display font-extrabold text-navy-800">{moment.title}</span>
                    </span>
                    <ArrowRight className="size-4 text-navy-300 transition-transform group-hover:translate-x-1" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function MomentText({ moment, className }: { moment: Moment; className?: string }) {
  return (
    <div className={cn("reveal", className)}>
      <p className="eyebrow">{moment.kicker}</p>
      <h2 id={`${moment.key}-title`} className="mt-4 text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[2.4rem]">
        {moment.title}
      </h2>
      <p className="lead mt-5 max-w-xl">{moment.text}</p>
    </div>
  );
}

function MomentPhoto({ moment, index = 0, className, sizes }: { moment: Moment; index?: number; className?: string; sizes: string }) {
  const p = moment.photos[index];
  return (
    <figure className={cn("relative overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-mist shadow-[var(--shadow-lift)]", className)}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} placeholder="blur" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] hover:scale-[1.03]" />
    </figure>
  );
}

export default function VieScolairePage() {
  if (!vieScolaireEnabled) notFound();

  const [promotion, costumes, kungFu] = moments;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "L’école", href: "/ecole" },
          { label: "Vie scolaire", href: "/vie-scolaire" },
        ]}
        eyebrow="Vie scolaire"
        title="La vie de l’école en images"
        intro={
          <p>
            Cérémonie de fin d’année, journée costumée, activités : quelques moments partagés par La Cité des Anges,
            en photos et en vidéo.
          </p>
        }
        art={<MomentIndex />}
      />

      {/* Promotion Excellence */}
      <section id={promotion.key} className="section scroll-mt-24" aria-labelledby={`${promotion.key}-title`}>
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="reveal reveal-left">
            <MomentPhoto moment={promotion} className="mx-auto aspect-[4/5] max-w-[30rem]" sizes="(max-width: 1024px) 100vw, 480px" />
          </div>
          <MomentText moment={promotion} />
        </div>
      </section>

      {/* Journée costumée */}
      <section id={costumes.key} className="section scroll-mt-24 bg-mist" aria-labelledby={`${costumes.key}-title`}>
        <div className="container-site">
          <MomentText moment={costumes} />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {costumes.video && (
              <div className="reveal col-span-2 sm:col-span-1">
                <VideoPlayer
                  {...costumes.video}
                  aspect="aspect-[3/4]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  className="mx-auto max-w-[22rem] sm:max-w-none"
                />
              </div>
            )}
            {costumes.photos.map((p, i) => {
              // Sur mobile, la dernière photo (de groupe) passe en pleine largeur pour éviter une vignette isolée
              const last = i === costumes.photos.length - 1;
              return (
                <div key={p.alt} className={cn("reveal", last && "col-span-2 sm:col-span-1")} style={{ "--d": `${(i + 1) * 90}ms` } as React.CSSProperties}>
                  <MomentPhoto
                    moment={costumes}
                    index={i}
                    className={last ? "aspect-[4/3] sm:aspect-[3/4]" : "aspect-[3/4]"}
                    sizes={last ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px" : "(max-width: 1024px) 50vw, 280px"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kung-Fu */}
      <section id={kungFu.key} className="section scroll-mt-24" aria-labelledby={`${kungFu.key}-title`}>
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <MomentText moment={kungFu} className="lg:order-1" />
          <div className="reveal reveal-right lg:order-2">
            <MomentPhoto moment={kungFu} className="mx-auto aspect-[4/5] max-w-[30rem]" sizes="(max-width: 1024px) 100vw, 480px" />
          </div>
        </div>
      </section>

      {/* Message de rentrée */}
      <section className="pb-4" aria-label="Message de rentrée">
        <div className="container-site">
          <Link
            href="/ecole#message-rentree"
            className="reveal group flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-line bg-white p-5 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:p-6"
          >
            <span className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-2xl sm:w-64">
              <Image src={directorMessage.poster} alt="" fill sizes="256px" placeholder="blur" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-navy-950/25">
                <span className="grid size-12 place-items-center rounded-full bg-white text-navy-800">
                  <Play className="ml-0.5 size-5 fill-current" aria-hidden />
                </span>
              </span>
            </span>
            <span className="flex-1">
              <span className="eyebrow">À voir aussi</span>
              <span className="mt-2 block font-display text-2xl font-extrabold tracking-[-0.02em] text-navy-800">
                {directorMessage.title}
              </span>
              <span className="mt-1 block text-muted">
                Par {directorMessage.speaker}, cofondateur de l’établissement · {directorMessage.duration}
              </span>
            </span>
            <span className="link-arrow shrink-0">
              Voir la vidéo
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
          <p className="mt-6 text-sm text-muted">
            Photos et vidéos publiées par l’établissement. Pour toute demande de retrait d’une image, écrivez à{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-navy-800 underline decoration-cyan-500 decoration-2 underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
