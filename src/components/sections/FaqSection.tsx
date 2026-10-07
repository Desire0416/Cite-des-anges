import { Phone } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import type { Faq } from "@/lib/content";
import { primaryPhone } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

type FaqSectionProps = {
  items: Faq[];
  id?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  more?: { href: string; label: string };
  className?: string;
  withJsonLd?: boolean;
};

export function FaqSection({
  items,
  id = "questions",
  eyebrow = "Questions fréquentes",
  title = "Les réponses aux questions les plus courantes",
  text = "Frais, pièces à fournir, sections ouvertes : l’administration vous apporte des réponses précises selon le niveau de votre enfant.",
  more,
  className,
  withJsonLd = false,
}: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id={id} className={cn("section", className)} aria-labelledby={`${id}-title`}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} text={text} />
          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" style={{ "--d": "120ms" } as React.CSSProperties}>
            {more && (
              <ButtonLink href={more.href} variant="primary">
                {more.label}
              </ButtonLink>
            )}
            <ButtonLink href={primaryPhone.href} variant="secondary" icon={Phone} track="phone_click">
              {primaryPhone.label}
            </ButtonLink>
          </div>
        </div>
        <div className="reveal" style={{ "--d": "100ms" } as React.CSSProperties}>
          <Accordion items={items} />
        </div>
      </div>
      {withJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </section>
  );
}
