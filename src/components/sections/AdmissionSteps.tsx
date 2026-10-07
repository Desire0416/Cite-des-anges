import { FileCheck2, MessagesSquare, Send } from "lucide-react";
import { admissionSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = [Send, MessagesSquare, FileCheck2];
const tiles = ["bg-cyan-500 text-navy-900", "bg-navy-800 text-white", "bg-orange-500 text-navy-900"];

/** Les trois étapes d'une demande : demande → échange → démarches précisées. */
export function AdmissionSteps({ className }: { className?: string }) {
  return (
    <div className={cn("reveal relative", className)}>
      {/* Ligne de liaison (grand écran) */}
      <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-[3px] overflow-hidden rounded-full bg-line md:block" aria-hidden>
        <div className="step-line h-full w-full bg-gradient-to-r from-cyan-500 via-navy-800 to-orange-500" />
      </div>
      <ol className="relative grid gap-5 md:grid-cols-3 md:gap-8">
        {admissionSteps.map((step, i) => {
          const Icon = icons[i];
          return (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              {i < admissionSteps.length - 1 && (
                <span className="absolute left-8 top-16 h-[calc(100%-2.75rem)] w-[3px] rounded-full bg-gradient-to-b from-line to-transparent md:hidden" aria-hidden />
              )}
              <span
                className={cn(
                  "relative grid size-16 shrink-0 place-items-center rounded-full shadow-[0_14px_28px_-14px_rgb(8_45_85/0.55)] ring-8 ring-white",
                  tiles[i],
                )}
              >
                <Icon className="size-7" strokeWidth={1.9} aria-hidden />
                <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-white font-display text-xs font-extrabold text-navy-800 shadow">
                  {i + 1}
                </span>
              </span>
              <div className="pb-6 md:mt-6 md:pb-0">
                <h3 className="text-xl font-extrabold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-muted md:mx-auto md:max-w-xs">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
