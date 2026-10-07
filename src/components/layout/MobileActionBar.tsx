"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { primaryPhone } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Barre de deux actions sur mobile (« Appeler » et « Admissions »).
 * Elle apparaît après le premier écran et se retire pendant la saisie
 * pour ne jamais recouvrir les champs ni le clavier.
 */
export function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.55);
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable='true']");
    const onFocusIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onFocusOut = (e: FocusEvent) => isField(e.target) && setTyping(false);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const visible = pastHero && !typing;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_32px_-20px_rgb(8_45_85/0.4)] backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-out-soft)] md:hidden",
        visible ? "translate-y-0" : "translate-y-[110%]",
      )}
      inert={!visible}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={primaryPhone.href} className="btn btn-secondary w-full" data-track="phone_click">
          <Phone className="size-[1.1rem]" aria-hidden />
          Appeler
        </a>
        <Link href="/admissions#demande" className="btn btn-primary w-full" data-track="admissions_click">
          Admissions
          <ArrowRight className="btn-icon size-[1.1rem]" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
