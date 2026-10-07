import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/admin/Dashboard";
import { demoInquiries } from "@/lib/demo-data";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const metadata: Metadata = { title: "Suivi des demandes" };

export default async function AdminPage() {
  // Vérification serveur, indépendante du proxy
  const session = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/connexion");

  return <Dashboard initial={demoInquiries} userName={session.name} />;
}
