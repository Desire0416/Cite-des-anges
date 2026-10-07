import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "lg";
  /** Icône à gauche du libellé */
  icon?: LucideIcon;
  /** Flèche animée à droite (par défaut pour les liens internes) */
  arrow?: boolean;
  className?: string;
  track?: AnalyticsEvent;
  trackCycle?: string;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size,
  icon: Icon,
  arrow,
  className,
  track,
  trackCycle,
  ...rest
}: ButtonLinkProps) {
  const external = isExternalHref(href);
  const showArrow = arrow ?? (!external && !Icon);
  const classes = cn("btn", `btn-${variant}`, size && `btn-${size}`, className);
  const content = (
    <>
      {Icon && <Icon className="size-[1.15rem] shrink-0" strokeWidth={2.2} aria-hidden />}
      <span>{children}</span>
      {showArrow && <ArrowRight className="btn-icon size-[1.1rem] shrink-0" strokeWidth={2.4} aria-hidden />}
    </>
  );
  const data = track ? { "data-track": track, "data-track-cycle": trackCycle } : {};

  if (external) {
    return (
      <a href={href} className={classes} {...data} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...data} {...rest}>
      {content}
    </Link>
  );
}
