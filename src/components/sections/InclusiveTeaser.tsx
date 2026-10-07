import { CalendarCheck } from "lucide-react";
import { DialogueArt } from "@/components/art/DialogueArt";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";

/** Annonce factuelle de l'accueil inclusif et invitation à échanger. */
export function InclusiveTeaser() {
  return (
    <section className="section relative isolate overflow-hidden bg-mist" aria-labelledby="inclusif-title">
      <div className="bg-dots absolute inset-y-0 left-0 -z-10 w-1/2 [mask-image:radial-gradient(60%_60%_at_25%_50%,#000,transparent)]" aria-hidden />
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal reveal-left order-2 lg:order-1">
          <DialogueArt />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            id="inclusif-title"
            eyebrow="Accueil inclusif"
            title="Échanger sur l’accueil de votre enfant"
            text="La Cité des Anges annonce l’accueil d’enfants avec autisme. Pour connaître les possibilités et les conditions d’accueil, nous vous invitons à échanger directement avec l’administration."
          />
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "120ms" } as React.CSSProperties}>
            <ButtonLink href="/accueil-inclusif#rendez-vous" icon={CalendarCheck}>
              Demander un rendez-vous
            </ButtonLink>
            <ButtonLink href="/accueil-inclusif" variant="secondary">
              En savoir plus
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
