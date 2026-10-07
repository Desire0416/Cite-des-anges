import type { Metadata, Viewport } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "À Angré, Cité Gestoci, le Groupe Scolaire La Cité des Anges accueille les familles pour la maternelle et le primaire. Découvrez l’école et échangez avec l’administration sur les démarches d’inscription.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "La Cité des Anges | Maternelle et primaire à Angré",
    template: "%s | La Cité des Anges",
  },
  description,
  applicationName: site.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: site.name,
    title: "La Cité des Anges | Maternelle et primaire à Angré",
    description,
  },
  twitter: { card: "summary_large_image" },
  robots: site.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#082d55",
  width: "device-width",
  initialScale: 1,
};

/**
 * Active les animations d'apparition seulement si JavaScript s'exécute.
 * Sécurité : si le script d'observation ne démarre pas, le contenu redevient visible.
 */
const revealBootstrap = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady){document.documentElement.classList.remove('js')}},3500);`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr-CI"
      className={`${manrope.variable} ${sourceSans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="min-h-dvh flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
