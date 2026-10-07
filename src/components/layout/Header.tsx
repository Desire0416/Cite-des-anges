"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, ChevronDown, Mail, Menu, Phone, Shapes, X } from "lucide-react";
import { LogoLockup } from "@/components/ui/Logo";
import { MottoLine } from "@/components/ui/Icons";
import { ctaLabel, nav, primaryPhone, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const cycleIcons = { "/maternelle": Shapes, "/primaire": BookOpen } as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cyclesOpen, setCyclesOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ferme les menus à chaque changement de page
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setCyclesOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!cyclesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setCyclesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCyclesOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [cyclesOpen]);

  const openOnHover = () => {
    clearTimeout(hoverTimer.current);
    setCyclesOpen(true);
  };
  const closeOnLeave = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setCyclesOpen(false), 160);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500",
          scrolled
            ? "border-transparent bg-white/85 shadow-[0_12px_32px_-22px_rgb(8_45_85/0.45)] backdrop-blur-xl backdrop-saturate-150"
            : "border-line/70 bg-white",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-4 transition-[height] duration-500 ease-[var(--ease-out-soft)]",
            scrolled ? "h-[4.25rem] lg:h-[4.75rem]" : "h-[4.75rem] lg:h-[5.75rem]",
          )}
        >
          <LogoLockup priority compact={scrolled} />

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) =>
                "children" in item ? (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={openOnHover}
                    onMouseLeave={closeOnLeave}
                  >
                    <div ref={dropdownRef}>
                      <button
                        type="button"
                        aria-expanded={cyclesOpen}
                        aria-controls="menu-cycles"
                        onClick={() => setCyclesOpen((v) => !v)}
                        className={cn(
                          "nav-link inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 font-display text-[0.94rem] font-semibold transition-colors",
                          item.children.some((c) => isActive(pathname, c.href))
                            ? "text-navy-800"
                            : "text-ink/80 hover:text-navy-800",
                        )}
                        {...(item.children.some((c) => isActive(pathname, c.href)) ? { "aria-current": "page" as const } : {})}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-4 transition-transform duration-300", cyclesOpen && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                      <div
                        id="menu-cycles"
                        className={cn(
                          "absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 pt-3",
                          cyclesOpen ? "block" : "hidden",
                        )}
                      >
                        <ul className="animate-[slide-down_0.35s_var(--ease-out-soft)] rounded-3xl border border-line bg-white p-2.5 shadow-[var(--shadow-lift)]">
                          {item.children.map((child) => {
                            const Icon = cycleIcons[child.href];
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="group flex items-start gap-4 rounded-2xl p-3.5 transition-colors hover:bg-mist"
                                  {...(isActive(pathname, child.href) ? { "aria-current": "page" as const } : {})}
                                >
                                  <span
                                    className={cn(
                                      "icon-tile size-11 rounded-xl",
                                      child.href === "/primaire" && "bg-orange-50 text-orange-700",
                                    )}
                                  >
                                    <Icon className="size-5" aria-hidden />
                                  </span>
                                  <span>
                                    <span className="flex items-center gap-1.5 font-display font-bold text-navy-800">
                                      {child.label}
                                      <ArrowRight
                                        className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                        aria-hidden
                                      />
                                    </span>
                                    <span className="mt-0.5 block text-sm leading-snug text-muted">{child.description}</span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "nav-link inline-flex rounded-full px-3.5 py-2.5 font-display text-[0.94rem] font-semibold transition-colors",
                        isActive(pathname, item.href) ? "text-navy-800" : "text-ink/80 hover:text-navy-800",
                      )}
                      {...(isActive(pathname, item.href) ? { "aria-current": "page" as const } : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admissions#demande"
              className="btn btn-primary btn-sm hidden md:inline-flex"
              data-track="admissions_click"
            >
              <span className="xl:hidden">Préinscription</span>
              <span className="hidden xl:inline">{ctaLabel}</span>
              <ArrowRight className="btn-icon size-4" strokeWidth={2.4} aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="grid size-12 place-items-center rounded-full border border-line bg-white text-navy-800 transition hover:border-navy-300 xl:hidden"
            >
              <Menu className="size-5" aria-hidden />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[60] xl:hidden",
          menuOpen ? "visible" : "invisible transition-[visibility] delay-500",
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={closeMenu}
          className={cn(
            "absolute inset-0 bg-navy-950/45 backdrop-blur-sm transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-[var(--ease-out-soft)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-[4.75rem] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
            <LogoLockup compact />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              className="grid size-12 place-items-center rounded-full border border-line text-navy-800 transition hover:border-navy-300"
            >
              <X className="size-5" aria-hidden />
              <span className="sr-only">Fermer le menu</span>
            </button>
          </div>

          <nav aria-label="Navigation mobile" className="flex-1 px-5 py-6 sm:px-6">
            <ul className="space-y-1">
              {nav.map((item, i) => {
                const links = "children" in item ? item.children : [item];
                return links.map((link, j) => (
                  <li
                    key={link.href}
                    className={cn(
                      "transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
                      menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                    )}
                    style={{ transitionDelay: menuOpen ? `${120 + (i + j) * 55}ms` : "0ms" }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[1.3rem] font-bold tracking-[-0.02em] transition-colors",
                        isActive(pathname, link.href) ? "bg-mist text-navy-800" : "text-navy-800 hover:bg-mist",
                      )}
                      {...(isActive(pathname, link.href) ? { "aria-current": "page" as const } : {})}
                    >
                      <span className="flex items-center gap-3">
                        {"children" in item && (
                          <span className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700">
                            Cycle
                          </span>
                        )}
                        {link.label}
                      </span>
                      <ArrowRight className="size-5 text-navy-300" aria-hidden />
                    </Link>
                  </li>
                ));
              })}
            </ul>

            <div
              className={cn(
                "mt-8 space-y-3 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: menuOpen ? "480ms" : "0ms" }}
            >
              <Link href="/admissions#demande" className="btn btn-primary btn-lg w-full" data-track="admissions_click">
                {ctaLabel}
                <ArrowRight className="btn-icon size-5" aria-hidden />
              </Link>
              <a href={primaryPhone.href} className="btn btn-secondary btn-lg w-full" data-track="phone_click">
                <Phone className="size-5" aria-hidden />
                Appeler l’école
              </a>
            </div>
          </nav>

          <div className="border-t border-line bg-mist px-6 py-6 text-sm">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 font-semibold text-navy-800">
              <Mail className="size-4 text-cyan-700" aria-hidden />
              {site.email}
            </a>
            <p className="mt-2 text-muted">{site.address.full}</p>
            <MottoLine className="mt-4 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-navy-800" />
          </div>
        </div>
      </div>
    </>
  );
}
