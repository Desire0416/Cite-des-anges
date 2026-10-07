"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarCheck,
  CircleCheck,
  Download,
  FlaskConical,
  History,
  Inbox,
  LogOut,
  Mail,
  MessageSquareText,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { ASSIGNEES, STATUSES, type DemoInquiry, type Status } from "@/lib/demo-data";
import { CYCLES, MOTIFS, labelOf } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const statusStyle: Record<Status, string> = {
  Nouvelle: "bg-cyan-50 text-cyan-800 ring-cyan-200",
  "À contacter": "bg-orange-50 text-orange-700 ring-orange-200",
  "Contact établi": "bg-navy-50 text-navy-700 ring-navy-200",
  "Rendez-vous convenu": "bg-magenta-50 text-magenta-700 ring-magenta-500/30",
  Clôturée: "bg-slate-100 text-slate-600 ring-slate-200",
  "Inscription confirmée": "bg-leaf-50 text-[#3f7a1d] ring-leaf-500/30",
};

const kpis: { status: Status; icon: typeof Inbox }[] = [
  { status: "Nouvelle", icon: Inbox },
  { status: "À contacter", icon: PhoneCall },
  { status: "Contact établi", icon: MessageSquareText },
  { status: "Rendez-vous convenu", icon: CalendarCheck },
];

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
const fmt = (iso: string) => dateFmt.format(new Date(iso));

/** Neutralise les cellules interprétables comme formules par un tableur. */
function csvCell(value: string | undefined) {
  let v = value ?? "";
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

export function Dashboard({ initial, userName }: { initial: DemoInquiry[]; userName: string }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [motif, setMotif] = useState("");
  const [cycle, setCycle] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!q || [i.parent, i.reference, i.telephone, i.email ?? ""].some((v) => v.toLowerCase().includes(q))) &&
        (!motif || i.motif === motif) &&
        (!cycle || i.cycle === cycle) &&
        (!status || i.status === status),
    );
  }, [items, query, motif, cycle, status]);

  const selected = items.find((i) => i.id === selectedId) ?? null;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  function updateInquiry(id: string, patch: Partial<DemoInquiry>, label: string) {
    setItems((list) =>
      list.map((i) =>
        i.id === id
          ? { ...i, ...patch, history: [...i.history, { date: new Date().toISOString(), author: userName, label }] }
          : i,
      ),
    );
    setToast("Modification enregistrée (démonstration)");
  }

  function exportCsv() {
    const header = ["Référence", "Date", "Parent", "Téléphone", "Email", "Motif", "Cycle", "Année", "Statut", "Attribuée à", "Origine"];
    const rows = filtered.map((i) => [
      i.reference,
      i.createdAt,
      i.parent,
      i.telephone,
      i.email,
      labelOf(MOTIFS, i.motif),
      labelOf(CYCLES, i.cycle),
      i.annee,
      i.status,
      i.assignee,
      i.origine,
    ]);
    const csv = "﻿" + [header, ...rows].map((r) => r.map(csvCell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "demandes-fictives.csv" });
    a.click();
    URL.revokeObjectURL(url);
    setToast(`Export de ${rows.length} demande(s) journalisé (démonstration)`);
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/connexion");
    router.refresh();
  }

  const hasFilters = query || motif || cycle || status;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="" sizes="48px" className="h-auto w-10" />
            <div className="leading-tight">
              <p className="font-display font-extrabold text-navy-800">Suivi des demandes</p>
              <p className="hidden text-xs text-muted sm:block">La Cité des Anges</p>
            </div>
            <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-navy-900">
              <FlaskConical className="size-3.5" aria-hidden />
              Données fictives
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-muted md:inline-flex">
              <UserRound className="size-4" aria-hidden />
              {userName}
            </span>
            <button type="button" onClick={logout} className="btn btn-secondary btn-sm">
              <LogOut className="size-4" aria-hidden />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[90rem] flex-1 px-4 py-8 sm:px-6">
        <p className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm">
          <FlaskConical className="mt-0.5 size-4 shrink-0 text-orange-700" aria-hidden />
          <span>
            <strong className="font-display text-navy-800">Aperçu de démonstration.</strong> Les demandes ci-dessous sont
            fictives et les modifications ne sont pas conservées. Ce module n’est pas encore raccordé à l’école.
          </span>
        </p>

        {/* Indicateurs */}
        <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map(({ status: s, icon: Icon }, i) => {
            const count = items.filter((it) => it.status === s).length;
            return (
              <li key={s} className="anim-rise" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setStatus(status === s ? "" : s)}
                  aria-pressed={status === s}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:p-5",
                    status === s ? "border-navy-800 ring-1 ring-navy-800" : "border-line",
                  )}
                >
                  <span className={cn("grid size-11 place-items-center rounded-xl ring-1", statusStyle[s])}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-extrabold text-navy-800">{count}</span>
                    <span className="block text-sm text-muted">{s}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Filtres */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Rechercher</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un parent, une référence, un numéro…"
              className="field-input min-h-11 pl-11"
            />
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex">
            <FilterSelect label="Motif" value={motif} onChange={setMotif} options={MOTIFS.map((m) => [m.value, m.label])} />
            <FilterSelect label="Cycle" value={cycle} onChange={setCycle} options={CYCLES.map((c) => [c.value, c.label])} />
            <FilterSelect label="Année" value="" onChange={() => {}} options={[]} single="2026–2027" />
            <FilterSelect label="Statut" value={status} onChange={setStatus} options={STATUSES.map((s) => [s, s])} />
          </div>
          <div className="flex gap-2">
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setMotif("");
                  setCycle("");
                  setStatus("");
                }}
                className="btn btn-secondary btn-sm"
              >
                <X className="size-4" aria-hidden />
                Effacer
              </button>
            )}
            <button type="button" onClick={exportCsv} className="btn btn-primary btn-sm">
              <Download className="size-4" aria-hidden />
              Export CSV
            </button>
          </div>
        </div>

        {/* Liste */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
          <p className="border-b border-line px-5 py-3 text-sm text-muted" aria-live="polite">
            {filtered.length} demande{filtered.length > 1 ? "s" : ""}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="bg-mist font-display text-xs uppercase tracking-[0.08em] text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Référence</th>
                  <th scope="col" className="px-5 py-3 font-bold">Reçue le</th>
                  <th scope="col" className="px-5 py-3 font-bold">Parent</th>
                  <th scope="col" className="px-5 py-3 font-bold">Motif</th>
                  <th scope="col" className="px-5 py-3 font-bold">Cycle</th>
                  <th scope="col" className="px-5 py-3 font-bold">Statut</th>
                  <th scope="col" className="px-5 py-3 font-bold">Attribuée à</th>
                  <th scope="col" className="px-5 py-3 font-bold">Origine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((i) => (
                  <tr
                    key={i.id}
                    className={cn("cursor-pointer transition-colors hover:bg-mist", selectedId === i.id && "bg-cyan-50/60")}
                    onClick={() => setSelectedId(i.id)}
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(i.id);
                        }}
                        className="font-display font-bold tracking-wide text-navy-800 hover:underline"
                      >
                        {i.reference}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted">{fmt(i.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span className="block font-semibold text-navy-800">{i.parent}</span>
                      <span className="block text-xs text-muted">{i.telephone}</span>
                    </td>
                    <td className="px-5 py-4">{labelOf(MOTIFS, i.motif)}</td>
                    <td className="px-5 py-4">{labelOf(CYCLES, i.cycle)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={i.status} />
                    </td>
                    <td className="px-5 py-4 text-muted">{i.assignee ?? "—"}</td>
                    <td className="px-5 py-4 font-mono text-xs text-muted">{i.origine}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-14 text-center text-muted">
                      Aucune demande ne correspond à ces filtres.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {selected && (
        <DetailPanel
          key={selected.id}
          inquiry={selected}
          onClose={() => setSelectedId(null)}
          onSave={(patch, label) => updateInquiry(selected.id, patch, label)}
        />
      )}

      {toast && (
        <div role="status" className="anim-rise fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)]">
          <CircleCheck className="size-4 text-cyan-300" aria-hidden />
          {toast}
        </div>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full px-2.5 py-1 font-display text-xs font-bold ring-1", statusStyle[status])}>
      {status}
    </span>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  single,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  single?: string;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input min-h-11 py-2 pr-9 text-sm lg:w-44"
      >
        {single ? (
          <option value="">{single}</option>
        ) : (
          <>
            <option value="">{label} : tous</option>
            {options.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </>
        )}
      </select>
    </label>
  );
}

function DetailPanel({
  inquiry,
  onClose,
  onSave,
}: {
  inquiry: DemoInquiry;
  onClose: () => void;
  onSave: (patch: Partial<DemoInquiry>, label: string) => void;
}) {
  const [status, setStatus] = useState<Status>(inquiry.status);
  const [assignee, setAssignee] = useState(inquiry.assignee ?? "");
  const [nextAction, setNextAction] = useState(inquiry.nextAction ?? "");
  const [note, setNote] = useState(inquiry.note ?? "");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const dirty =
    status !== inquiry.status ||
    assignee !== (inquiry.assignee ?? "") ||
    nextAction !== (inquiry.nextAction ?? "") ||
    note !== (inquiry.note ?? "");

  function save() {
    const changes: string[] = [];
    if (status !== inquiry.status) changes.push(`Statut : ${status}`);
    if (assignee !== (inquiry.assignee ?? "")) changes.push(`Attribuée à ${assignee || "personne"}`);
    if (nextAction !== (inquiry.nextAction ?? "")) changes.push("Prochaine action mise à jour");
    if (note !== (inquiry.note ?? "")) changes.push("Note interne mise à jour");
    onSave({ status, assignee: assignee || undefined, nextAction: nextAction || undefined, note: note || undefined }, changes.join(" · "));
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <button type="button" tabIndex={-1} aria-hidden onClick={onClose} className="anim-fade absolute inset-0 bg-navy-950/40 backdrop-blur-[2px]" />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-xl animate-[slide-in_0.45s_var(--ease-out-soft)] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700">{inquiry.reference}</p>
            <h2 id="detail-title" className="mt-1 text-2xl font-extrabold">
              {inquiry.parent}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={inquiry.status} />
              <span className="rounded-full bg-orange-50 px-2.5 py-1 font-display text-xs font-bold text-orange-700">Fictif</span>
            </div>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full border border-line hover:border-navy-300">
            <X className="size-5" aria-hidden />
            <span className="sr-only">Fermer</span>
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto p-6">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Téléphone">
              <a href={`tel:${inquiry.telephone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:underline">
                <Phone className="size-3.5" aria-hidden />
                {inquiry.telephone}
              </a>
            </Info>
            <Info label="Email">
              {inquiry.email ? (
                <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:underline">
                  <Mail className="size-3.5" aria-hidden />
                  {inquiry.email}
                </a>
              ) : (
                "—"
              )}
            </Info>
            <Info label="Motif">{labelOf(MOTIFS, inquiry.motif)}</Info>
            <Info label="Cycle">{labelOf(CYCLES, inquiry.cycle)}</Info>
            <Info label="Année scolaire">{inquiry.annee}</Info>
            <Info label="Reçue le">{fmt(inquiry.createdAt)}</Info>
            <Info label="Page d’origine">
              <span className="font-mono text-xs">{inquiry.origine}</span>
            </Info>
          </dl>

          {inquiry.message && (
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">Message</p>
              <p className="mt-2 rounded-2xl bg-mist p-4 text-sm">{inquiry.message}</p>
            </div>
          )}

          <div className="space-y-4 rounded-2xl border border-line p-5">
            <p className="font-display text-sm font-extrabold text-navy-800">Traitement</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold text-navy-800">Statut</span>
                <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="field-input min-h-11 py-2 text-sm">
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold text-navy-800">Attribuée à</span>
                <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className="field-input min-h-11 py-2 text-sm">
                  <option value="">Non attribuée</option>
                  {ASSIGNEES.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy-800">Prochaine action</span>
              <input value={nextAction} onChange={(e) => setNextAction(e.target.value)} maxLength={120} className="field-input min-h-11 py-2 text-sm" placeholder="Ex. rappeler le parent" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy-800">Note interne</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} rows={3} className="field-input text-sm" placeholder="Suivi administratif uniquement" />
              <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck className="size-3.5 text-cyan-700" aria-hidden />
                Aucune information médicale dans les notes.
              </span>
            </label>
            <button type="button" disabled={!dirty} onClick={save} className="btn btn-primary w-full">
              Enregistrer les modifications
            </button>
          </div>

          <div>
            <p className="flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
              <History className="size-4" aria-hidden />
              Historique
            </p>
            <ol className="mt-4 space-y-4 border-l-2 border-line pl-5">
              {[...inquiry.history].reverse().map((h, idx) => (
                <li key={`${h.date}-${idx}`} className="relative">
                  <span className="absolute -left-[1.6rem] top-1 size-3 rounded-full border-2 border-white bg-cyan-500 ring-2 ring-cyan-100" aria-hidden />
                  <p className="text-sm font-semibold text-navy-800">{h.label}</p>
                  <p className="text-xs text-muted">
                    {fmt(h.date)} · {h.author}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-display text-xs font-extrabold uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="mt-1 text-ink">{children}</dd>
    </div>
  );
}
