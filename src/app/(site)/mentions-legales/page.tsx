import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Informations légales du site du ${site.name} : éditeur, publication, hébergement et propriété intellectuelle.`,
  alternates: { canonical: "/mentions-legales" },
};

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <ul>
        <li>
          <strong>{site.name}</strong>
        </li>
        <li>Adresse : {site.address.full}</li>
        <li>
          Téléphone :{" "}
          {site.phones.map((p, i) => (
            <span key={p.href}>
              {i > 0 && " · "}
              <a href={p.href}>{p.label}</a>
            </span>
          ))}
        </li>
        <li>
          Email : <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      </ul>
    ),
  },
  {
    id: "publication",
    title: "Direction de la publication",
    content: <p>La direction de l’établissement est responsable de la publication des contenus de ce site.</p>,
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <p>
        {site.host ??
          (site.demoMode
            ? "Ce site est une version de démonstration. L’hébergeur de la version publique sera indiqué lors de sa mise en ligne."
            : "L’hébergeur du site est indiqué par l’établissement.")}
      </p>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          Le nom, l’emblème et la devise du {site.name} appartiennent à l’établissement. Toute reproduction sans
          autorisation est interdite.
        </p>
        <p>
          Les illustrations du site sont des compositions graphiques inspirées de l’emblème : elles ne représentent ni
          les locaux ni les élèves de l’établissement.
        </p>
      </>
    ),
  },
  {
    id: "informations",
    title: "Informations publiées",
    content: (
      <p>
        Les informations de ce site présentent l’établissement de manière générale. Les classes ouvertes, les conditions
        d’admission, les frais et les pièces à fournir sont précisés directement par l’administration. Une demande
        transmise en ligne ne vaut pas inscription définitive.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    content: (
      <p>
        Le traitement des informations transmises via le formulaire est décrit dans la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      crumbs={[{ label: "Mentions légales", href: "/mentions-legales" }]}
      eyebrow="Informations légales"
      title="Mentions légales"
      intro={<p>Les informations relatives à l’éditeur et à l’utilisation de ce site.</p>}
      updated="6 octobre 2026"
      sections={sections}
    />
  );
}
