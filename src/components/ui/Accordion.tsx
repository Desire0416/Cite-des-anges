"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Accordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-soft)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.q} className={cn("transition-colors duration-300", isOpen && "bg-mist/70")}>
            <h3 className="m-0 text-base">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-display text-[1.02rem] font-bold text-navy-800 sm:px-7 sm:py-6 sm:text-[1.08rem]"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-spring)]",
                    isOpen
                      ? "rotate-45 border-navy-800 bg-navy-800 text-white"
                      : "border-line bg-white text-navy-800 group-hover:border-navy-300",
                  )}
                  aria-hidden
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-soft)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pr-16 text-muted sm:px-7 sm:pr-20">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
