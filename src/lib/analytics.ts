/**
 * Plan de mesure (section 17 du cahier des charges).
 *
 * Seules des propriétés agrégées sont transmises : jamais de nom, de
 * coordonnées ni de texte libre. La collecte reste désactivée en mode
 * démonstration et tant qu'elle n'est pas explicitement activée.
 */
import { site } from "./site";

export type AnalyticsEvent =
  | "cycle_view"
  | "admissions_click"
  | "form_start"
  | "inquiry_saved"
  | "form_error"
  | "phone_click"
  | "whatsapp_click"
  | "directions_click";

export type AnalyticsProps = {
  page?: string;
  cycle?: string;
  motif?: string;
  campagne?: string;
};

const ALLOWED: Array<keyof AnalyticsProps> = ["page", "cycle", "motif", "campagne"];

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __revealReady?: boolean;
  }
}

const enabled = !site.demoMode && process.env.NEXT_PUBLIC_ANALYTICS === "true";

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const payload: Record<string, string> = {};
  for (const key of ALLOWED) {
    const value = props[key];
    if (typeof value === "string" && value.length <= 64) payload[key] = value;
  }
  payload.page ??= window.location.pathname;

  if (!enabled) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[mesure désactivée] ${event}`, payload);
    }
    return;
  }

  window.dataLayer ??= [];
  window.dataLayer.push({ event, ...payload });
}
