import { ArcsDecor } from "@/components/art/Decor";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  actions?: React.ReactNode;
  art?: React.ReactNode;
  className?: string;
};

/** En-tête des pages internes : fil d'Ariane, titre, introduction et composition. */
export function PageHero({ crumbs, eyebrow, title, intro, actions, art, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-mist", className)}>
      <div className="bg-dots absolute inset-y-0 right-0 -z-10 w-1/2 [mask-image:radial-gradient(70%_70%_at_80%_30%,#000,transparent)]" aria-hidden />
      <ArcsDecor className="absolute -left-[24rem] -top-[20rem] -z-10 size-[36rem] opacity-60" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-white/60" aria-hidden />

      <div
        className={cn(
          "container-site grid items-center gap-12 pb-16 pt-9 lg:pb-24 lg:pt-12",
          art ? "lg:grid-cols-[1.12fr_0.88fr]" : "",
        )}
      >
        <div className={cn(!art && "max-w-3xl")}>
          <Breadcrumb items={crumbs} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <div className="lead mt-6 max-w-2xl">{intro}</div>
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {art && <div className="anim-rise" style={{ "--delay": "0.15s" } as React.CSSProperties}>{art}</div>}
      </div>
    </section>
  );
}
