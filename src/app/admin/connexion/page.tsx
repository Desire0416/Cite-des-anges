import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import logo from "@/assets/logo.png";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfigured } from "@/lib/session";

export const metadata: Metadata = { title: "Connexion" };

// Lit la configuration au moment de la requête
export const dynamic = "force-dynamic";

export default function ConnexionPage() {
  const configured = adminConfigured();

  return (
    <main className="relative isolate grid flex-1 place-items-center overflow-hidden px-5 py-16">
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" aria-hidden />
      <div className="absolute left-1/2 top-0 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden />

      <div className="anim-rise w-full max-w-md">
        <div className="card p-8 sm:p-10">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="" sizes="64px" className="h-auto w-14" priority />
            <div>
              <p className="font-display text-lg font-extrabold text-navy-800">La Cité des Anges</p>
              <p className="text-sm text-muted">Espace de gestion des demandes</p>
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-extrabold">Connexion</h1>
          <p className="mt-2 text-sm text-muted">Accès réservé aux personnes autorisées par l’établissement.</p>

          <p className="mt-5 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm">
            <FlaskConical className="mt-0.5 size-4 shrink-0 text-orange-700" aria-hidden />
            <span>
              <strong className="font-display text-navy-800">Aperçu de démonstration</strong> — les demandes affichées sont
              fictives. Ce module n’est pas encore raccordé à l’école.
            </span>
          </p>

          {configured ? (
            <LoginForm />
          ) : (
            <p className="mt-6 rounded-2xl bg-mist p-4 text-sm text-muted">
              L’accès de démonstration n’est pas configuré sur ce serveur (variables <code>ADMIN_DEMO_PASSWORD</code> et{" "}
              <code>SESSION_SECRET</code>).
            </p>
          )}
        </div>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:underline">
          <ArrowLeft className="size-4" aria-hidden />
          Retour au site
        </Link>
      </div>
    </main>
  );
}
