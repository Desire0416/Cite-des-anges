import { BookOpenCheck, Compass, Ruler } from "lucide-react";
import { LaurelBranch, Stars } from "@/components/ui/Icons";
import { mottoValues } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const icons = [Compass, Ruler, BookOpenCheck];
const accents = ["text-cyan-300", "text-orange-400", "text-leaf-500"];

export function DeviseSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800 py-20 text-white lg:py-28" aria-labelledby="devise-title">
      <div className="bg-dots-light absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_10%,rgb(18_172_212/0.28),transparent),radial-gradient(40%_50%_at_10%_95%,rgb(245_124_22/0.14),transparent)]"
        aria-hidden
      />
      <svg
        viewBox="0 0 600 600"
        fill="none"
        className="pointer-events-none absolute -right-64 -top-72 -z-10 size-[46rem] text-white"
        aria-hidden
      >
        <circle cx="300" cy="300" r="290" stroke="currentColor" strokeOpacity="0.06" strokeWidth="2" />
        <circle cx="300" cy="300" r="225" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
      </svg>

      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          <SectionHeading
            id="devise-title"
            tone="light"
            eyebrow="Notre devise"
            title={
              <>
                Discipline, Rigueur, <span className="text-cyan-300">Travail</span>
              </>
            }
            text="Inscrite sur l’emblème de l’établissement, la devise de La Cité des Anges exprime les valeurs qu’il met en avant au quotidien."
          />
          <div className="reveal flex items-end justify-start gap-3 lg:justify-end" style={{ "--d": "150ms" } as React.CSSProperties}>
            <LaurelBranch className="h-16 text-orange-500" />
            <Stars className="mb-2 flex gap-1.5 text-xl text-orange-400" />
            <LaurelBranch flip className="h-16 text-orange-500" />
          </div>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {mottoValues.map((value, i) => {
            const Icon = icons[i];
            return (
              <li key={value.title} className="reveal" style={{ "--d": `${i * 130}ms` } as React.CSSProperties}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.09] sm:p-8">
                  <span
                    className="pointer-events-none absolute right-6 top-5 font-display text-[4.5rem] font-extrabold leading-none tracking-[-0.04em] text-white/[0.07] transition-transform duration-700 group-hover:-translate-y-1"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <span className={`grid size-14 place-items-center rounded-2xl bg-white/10 ${accents[i]} transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon className="size-7" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="mt-7 text-2xl font-extrabold text-white">{value.title}</h3>
                  <p className="mt-3 text-white/70">{value.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
