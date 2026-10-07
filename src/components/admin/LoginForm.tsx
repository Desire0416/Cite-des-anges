"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CircleAlert, Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      setError(
        res.status === 429
          ? "Trop de tentatives. Patientez quelques minutes avant de réessayer."
          : "Identifiant ou mot de passe incorrect.",
      );
    } catch {
      setError("La connexion a échoué. Vérifiez votre réseau et réessayez.");
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
      <div>
        <label htmlFor="admin-identifier" className="font-display text-[0.95rem] font-bold text-navy-800">
          Identifiant
        </label>
        <input
          id="admin-identifier"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "admin-login-error" : undefined}
          className="field-input mt-2"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="font-display text-[0.95rem] font-bold text-navy-800">
          Mot de passe
        </label>
        <div className="relative mt-2">
          <input
            id="admin-password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "admin-login-error" : undefined}
            className="field-input pr-14"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-mist hover:text-navy-800"
          >
            {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
            <span className="sr-only">{visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}</span>
          </button>
        </div>
      </div>
      {error && (
        <p id="admin-login-error" role="alert" className="anim-fade flex items-center gap-1.5 text-sm font-semibold text-danger-600">
          <CircleAlert className="size-4" aria-hidden />
          {error}
        </p>
      )}
      <button type="submit" disabled={pending || !identifier || !password} className="btn btn-primary btn-lg w-full">
        {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden /> : <LogIn className="size-5" aria-hidden />}
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
