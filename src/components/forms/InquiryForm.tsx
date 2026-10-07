"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  FlaskConical,
  LoaderCircle,
  Mail,
  Phone,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { track } from "@/lib/analytics";
import {
  CYCLES,
  FIELD_ORDER,
  MESSAGE_MAX,
  MOTIFS,
  validateInquiry,
  type Cycle,
  type FieldErrors,
  type InquiryInput,
  type Motif,
} from "@/lib/inquiry";
import { primaryPhone, schoolYears, site } from "@/lib/site";

type InquiryFormProps = {
  /** Page d'origine enregistrée avec la demande */
  origin: string;
  defaultMotif?: Motif;
  defaultCycle?: Cycle;
  title?: string;
  description?: string;
  /** Rappel affiché sous le message (ex. accueil inclusif) */
  notice?: string;
  /** Lit ?motif= et ?cycle= dans l'adresse pour présélectionner les choix */
  syncWithUrl?: boolean;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string; demo: boolean }
  | { kind: "failure" };

const newSubmissionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

function SearchParamsSync({ onChange }: { onChange: (motif?: Motif, cycle?: Cycle) => void }) {
  const params = useSearchParams();
  const motif = params.get("motif");
  const cycle = params.get("cycle");
  useEffect(() => {
    onChange(
      MOTIFS.some((m) => m.value === motif) ? (motif as Motif) : undefined,
      CYCLES.some((c) => c.value === cycle) ? (cycle as Cycle) : undefined,
    );
  }, [motif, cycle, onChange]);
  return null;
}

export function InquiryForm({
  origin,
  defaultMotif = "preinscription",
  defaultCycle,
  title = "Votre demande",
  description = "Quelques informations suffisent pour que l’administration puisse vous recontacter.",
  notice,
  syncWithUrl = false,
}: InquiryFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const submissionId = useRef<string>("");
  const started = useRef(false);
  const touched = useRef<{ motif: boolean; cycle: boolean }>({ motif: false, cycle: false });

  const [values, setValues] = useState<InquiryInput>({
    nom: "",
    telephone: "",
    email: "",
    motif: defaultMotif,
    cycle: defaultCycle ?? "",
    annee: schoolYears[0],
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [shake, setShake] = useState(0);

  const applyPreset = useCallback((motif?: Motif, cycle?: Cycle) => {
    setValues((v) => ({
      ...v,
      motif: motif && !touched.current.motif ? motif : v.motif,
      cycle: cycle && !touched.current.cycle ? cycle : v.cycle,
    }));
  }, []);

  const id = (name: string) => `${uid}-${name}`;

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { page: origin });
  };

  const update = (name: keyof InquiryInput, value: string) => {
    if (name === "motif" || name === "cycle") touched.current[name] = true;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = FIELD_ORDER.find((f) => fieldErrors[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return; // protection contre le double clic

    const result = validateInquiry(values);
    if (!result.ok) {
      setErrors(result.errors);
      setShake((n) => n + 1);
      track("form_error", { page: origin, motif: values.motif });
      requestAnimationFrame(() => focusFirstError(result.errors));
      return;
    }

    submissionId.current ||= newSubmissionId();
    setErrors({});
    setStatus({ kind: "submitting" });

    const honeypot = (formRef.current?.elements.namedItem("site_web") as HTMLInputElement | null)?.value ?? "";

    try {
      const response = await fetch("/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, origine: origin, submissionId: submissionId.current, site_web: honeypot }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok: true; reference: string; demo: boolean }
        | { ok: false; errors?: FieldErrors }
        | null;

      if (response.ok && payload?.ok) {
        setStatus({ kind: "success", reference: payload.reference, demo: payload.demo });
        if (!payload.demo) track("inquiry_saved", { page: origin, motif: values.motif, cycle: values.cycle });
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }

      if (response.status === 422 && payload && !payload.ok && payload.errors) {
        setErrors(payload.errors);
        setStatus({ kind: "idle" });
        track("form_error", { page: origin, motif: values.motif });
        requestAnimationFrame(() => focusFirstError(payload.errors!));
        return;
      }

      throw new Error(`HTTP ${response.status}`);
    } catch {
      setStatus({ kind: "failure" });
      track("form_error", { page: origin, motif: values.motif });
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  }

  function reset() {
    submissionId.current = "";
    started.current = false;
    touched.current = { motif: false, cycle: false };
    setValues((v) => ({ ...v, nom: "", telephone: "", email: "", message: "" }));
    setErrors({});
    setStatus({ kind: "idle" });
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const submitting = status.kind === "submitting";

  if (status.kind === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="card relative overflow-hidden p-7 outline-none sm:p-10"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cyan-500 via-navy-800 to-orange-500" aria-hidden />
        <span className="anim-pop grid size-16 place-items-center rounded-full bg-leaf-50 text-leaf-500 ring-8 ring-leaf-50/60">
          <CircleCheck className="size-9" strokeWidth={2} aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.7rem]">
          {status.demo ? "Simulation terminée — aucune demande envoyée" : "Votre demande a été enregistrée"}
        </h3>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-1.5 font-display text-sm font-bold text-navy-800">
          Référence : <span className="tracking-wider">{status.reference}</span>
        </p>

        {status.demo ? (
          <div className="mt-6 rounded-2xl border border-dashed border-navy-200 bg-mist/60 p-5">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700">
              Message affiché après la mise en service
            </p>
            <p className="mt-2 text-ink">
              Votre demande a été enregistrée. Elle ne vaut pas inscription définitive. Pour toute précision, vous pouvez
              contacter l’école.
            </p>
          </div>
        ) : (
          <p className="mt-5 text-ink">
            Votre demande a été enregistrée. Elle ne vaut pas inscription définitive. Pour toute précision, vous pouvez
            contacter l’école.
          </p>
        )}

        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <a href={primaryPhone.href} className="flex items-center gap-2.5 rounded-xl border border-line p-3 font-semibold text-navy-800 transition-colors hover:border-navy-200">
              <Phone className="size-4 text-cyan-700" aria-hidden />
              {primaryPhone.label}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 rounded-xl border border-line p-3 font-semibold text-navy-800 transition-colors hover:border-navy-200">
              <Mail className="size-4 text-cyan-700" aria-hidden />
              {site.email}
            </a>
          </li>
        </ul>

        <button type="button" onClick={reset} className="btn btn-secondary mt-8">
          <RotateCcw className="size-4" aria-hidden />
          Faire une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onFocus={onStart}
      aria-labelledby={id("title")}
      aria-busy={submitting}
      className="card relative overflow-hidden p-6 sm:p-9"
    >
      {syncWithUrl && (
        <Suspense fallback={null}>
          <SearchParamsSync onChange={applyPreset} />
        </Suspense>
      )}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cyan-500 via-navy-800 to-orange-500" aria-hidden />

      <h3 id={id("title")} className="text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.7rem]">
        {title}
      </h3>
      <p className="mt-2 text-muted">{description}</p>

      {site.demoMode && (
        <p className="mt-5 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-ink">
          <FlaskConical className="mt-0.5 size-4 shrink-0 text-orange-700" aria-hidden />
          <span>
            <strong className="font-display font-bold text-navy-800">Démonstration</strong> — aucune demande n’est
            transmise à l’école.
          </span>
        </p>
      )}

      {status.kind === "failure" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-orange-300 bg-orange-50 p-4 text-sm outline-none"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-orange-700" aria-hidden />
          <span>
            <strong className="block font-display font-bold text-navy-800">Votre demande n’a pas pu être enregistrée.</strong>
            Vos informations sont conservées ci-dessous : vous pouvez réessayer, ou contacter l’école au{" "}
            <a href={primaryPhone.href} className="font-semibold text-navy-800 underline underline-offset-2">
              {primaryPhone.label}
            </a>{" "}
            ou par email à{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-navy-800 underline underline-offset-2">
              {site.email}
            </a>
            .
          </span>
        </div>
      )}

      {errorCount > 0 && (
        <p key={shake} role="alert" className="anim-shake mt-5 flex items-center gap-2.5 rounded-2xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger-600">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {errorCount === 1 ? "Un champ est à vérifier." : `${errorCount} champs sont à vérifier.`}
        </p>
      )}

      <p className="mt-6 text-sm text-muted">
        Les champs marqués <span className="font-bold text-orange-700">*</span> sont obligatoires.
      </p>

      <fieldset className="mt-5" aria-describedby={errors.motif ? id("motif-err") : undefined}>
        <legend className="mb-3 font-display text-[0.95rem] font-bold text-navy-800">
          Motif de votre demande <span className="text-orange-700">*</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {MOTIFS.map((m, i) => (
            <label key={m.value} className="choice">
              <input
                type="radio"
                name="motif"
                value={m.value}
                checked={values.motif === m.value}
                onChange={() => update("motif", m.value)}
                className="sr-only"
                {...(i === 0 ? { "data-field": "motif" } : {})}
              />
              <span className="choice-dot" aria-hidden />
              {m.label}
            </label>
          ))}
        </div>
        <FieldError id={id("motif-err")} message={errors.motif} />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Nom du parent ou responsable" required htmlFor={id("nom")} error={errors.nom} errorId={id("nom-err")} className="sm:col-span-2">
          <input
            id={id("nom")}
            data-field="nom"
            name="nom"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={values.nom}
            onChange={(e) => update("nom", e.target.value)}
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? id("nom-err") : undefined}
            aria-required
            className="field-input"
            placeholder="Prénom et nom"
          />
        </Field>

        <Field
          label="Téléphone"
          required
          htmlFor={id("tel")}
          error={errors.telephone}
          errorId={id("tel-err")}
          hint="Numéro ivoirien à 10 chiffres ou numéro international avec indicatif."
          hintId={id("tel-hint")}
        >
          <input
            id={id("tel")}
            data-field="telephone"
            name="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={24}
            value={values.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            aria-invalid={!!errors.telephone}
            aria-describedby={[id("tel-hint"), errors.telephone && id("tel-err")].filter(Boolean).join(" ")}
            aria-required
            className="field-input"
            placeholder="07 00 00 00 00"
          />
        </Field>

        <Field label="Email" optional htmlFor={id("email")} error={errors.email} errorId={id("email-err")}>
          <input
            id={id("email")}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("email-err") : undefined}
            className="field-input"
            placeholder="nom@exemple.ci"
          />
        </Field>
      </div>

      <fieldset className="mt-6" aria-describedby={errors.cycle ? id("cycle-err") : undefined}>
        <legend className="mb-3 font-display text-[0.95rem] font-bold text-navy-800">
          Cycle souhaité <span className="text-orange-700">*</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {CYCLES.map((c, i) => (
            <label key={c.value} className="choice">
              <input
                type="radio"
                name="cycle"
                value={c.value}
                checked={values.cycle === c.value}
                onChange={() => update("cycle", c.value)}
                className="sr-only"
                {...(i === 0 ? { "data-field": "cycle" } : {})}
              />
              <span className="choice-dot" aria-hidden />
              <span className="leading-tight">{c.label}</span>
            </label>
          ))}
        </div>
        <FieldError id={id("cycle-err")} message={errors.cycle} />
      </fieldset>

      <div className="mt-6 grid gap-5">
        <Field label="Année scolaire" required htmlFor={id("annee")} error={errors.annee} errorId={id("annee-err")}>
          <select
            id={id("annee")}
            data-field="annee"
            name="annee"
            value={values.annee}
            onChange={(e) => update("annee", e.target.value)}
            aria-invalid={!!errors.annee}
            aria-describedby={errors.annee ? id("annee-err") : undefined}
            className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23082d55%22 stroke-width=%222.2%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-11"
          >
            {schoolYears.map((y) => (
              <option key={y} value={y}>
                {site.campaign.open ? `Année scolaire ${y}` : "Une prochaine rentrée"}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Message"
          optional
          htmlFor={id("message")}
          error={errors.message}
          errorId={id("message-err")}
          hint={notice ?? "Merci de ne pas partager d’informations médicales dans ce message."}
          hintId={id("message-hint")}
          counter={`${values.message.length} / ${MESSAGE_MAX}`}
        >
          <textarea
            id={id("message")}
            data-field="message"
            name="message"
            rows={4}
            maxLength={MESSAGE_MAX + 200}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={[id("message-hint"), errors.message && id("message-err")].filter(Boolean).join(" ")}
            className="field-input min-h-32 resize-y"
            placeholder="Une précision ou une question simple (facultatif)"
          />
        </Field>
      </div>

      {/* Champ piège anti-robot, invisible pour les personnes */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={id("hp")}>Ne pas remplir</label>
        <input id={id("hp")} name="site_web" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <p className="mt-7 flex items-start gap-3 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-cyan-700" aria-hidden />
        <span>
          Vos informations servent uniquement à l’administration de l’école pour répondre à votre demande, qui ne vaut
          pas inscription définitive. En savoir plus dans notre{" "}
          <Link href="/confidentialite" className="font-semibold text-navy-800 underline decoration-cyan-500 decoration-2 underline-offset-2">
            politique de confidentialité
          </Link>
          .
        </span>
      </p>

      <div className="mt-7 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a href={primaryPhone.href} className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-navy-800 hover:underline sm:justify-start" data-track="phone_click">
          <Phone className="size-4 text-cyan-700" aria-hidden />
          Une difficulté ? {primaryPhone.label}
        </a>
        <button type="submit" disabled={submitting} className="btn btn-primary btn-lg">
          {submitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              <ArrowRight className="btn-icon size-5" aria-hidden />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Envoi de votre demande en cours." : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  errorId,
  hint,
  hintId,
  counter,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  counter?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="font-display text-[0.95rem] font-bold text-navy-800">
          {label} {required && <span className="text-orange-700">*</span>}
          {optional && <span className="ml-1 font-sans text-sm font-normal text-muted">(facultatif)</span>}
        </label>
        {counter && <span className="text-xs tabular-nums text-muted">{counter}</span>}
      </div>
      {children}
      {hint && (
        <p id={hintId} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="anim-fade mt-2 flex items-start gap-1.5 text-sm font-semibold text-danger-600">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
