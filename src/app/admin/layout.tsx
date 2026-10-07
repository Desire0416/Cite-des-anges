import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Gestion des demandes", template: "%s | Gestion — La Cité des Anges" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-dvh flex-col bg-mist">{children}</div>;
}
