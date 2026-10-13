import { CampaignBar } from "./CampaignBar";
import { AnalyticsListener, PageTransition, RevealObserver } from "./Effects";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileActionBar } from "./MobileActionBar";
import facade from "@/assets/ecole/facade-ecole.jpg";
import { site } from "@/lib/site";

/** Données structurées limitées aux informations confirmées (brochure et règlement intérieur). */
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.motto.join(", "),
  url: site.url,
  logo: new URL("/brand/logo-og.png", site.url).toString(),
  email: site.email,
  image: new URL(facade.src, site.url).toString(),
  telephone: site.phones.map((p) => p.href.replace("tel:", "")),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.commune} ${site.address.line}, ${site.address.landmark}`,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  identifier: [
    { "@type": "PropertyValue", propertyID: "RCCM", value: site.legal.rccm },
    { "@type": "PropertyValue", propertyID: "NCC", value: site.legal.ncc },
  ],
};

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[100] rounded-full bg-navy-800 px-5 py-3 font-display font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <CampaignBar />
      <Header />
      <PageTransition>
        <main id="contenu" className="flex-1">
          {children}
        </main>
      </PageTransition>
      <Footer />
      <MobileActionBar />
      <RevealObserver />
      <AnalyticsListener />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }} />
    </>
  );
}
