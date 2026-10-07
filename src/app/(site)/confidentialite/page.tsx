import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment La Cité des Anges traite les informations transmises par le formulaire de demande : finalités, destinataires, conservation et droits des familles.",
  alternates: { canonical: "/confidentialite" },
};

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <>
        <p>
          Les informations transmises via ce site sont traitées par le {site.name}, situé à {site.address.full}.
        </p>
        <ul>
          <li>
            Email : <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            Téléphone : <a href={site.phones[0].href}>{site.phones[0].label}</a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Informations collectées",
    content: (
      <>
        <p>Le formulaire de demande recueille uniquement les informations nécessaires pour vous recontacter :</p>
        <ul>
          <li>
            <strong>obligatoires</strong> : nom du parent ou responsable, numéro de téléphone, motif de la demande,
            cycle souhaité et année scolaire ;
          </li>
          <li>
            <strong>facultatives</strong> : adresse email et message libre ;
          </li>
          <li>
            <strong>techniques</strong> : date de la demande et page du site depuis laquelle elle a été envoyée.
          </li>
        </ul>
        <p>
          Aucune pièce d’identité, aucun bulletin, aucun diagnostic ni dossier médical n’est demandé à cette étape.
          Merci de ne pas partager d’informations médicales dans le message libre.
        </p>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Utilisation des informations",
    content: (
      <>
        <p>Vos informations sont utilisées pour :</p>
        <ul>
          <li>répondre à votre demande de préinscription, de rendez-vous ou de renseignement ;</li>
          <li>assurer le suivi administratif de cette demande par l’établissement.</li>
        </ul>
        <p>
          Elles ne sont ni vendues, ni cédées, ni utilisées à des fins publicitaires. Une demande en ligne ne vaut pas
          inscription définitive : le dossier d’admission, s’il est engagé, fait l’objet d’une démarche distincte.
        </p>
      </>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires",
    content: (
      <>
        <p>Les demandes sont accessibles uniquement :</p>
        <ul>
          <li>aux personnes habilitées de l’administration de l’école, chargées des admissions ;</li>
          <li>
            aux prestataires techniques de l’établissement (hébergement du site, envoi des notifications), dans la seule
            limite de leur mission.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    content: (
      <p>
        Les demandes sont conservées pendant la campagne d’inscription concernée, puis supprimées ou anonymisées dans un
        délai de six mois après la fin de celle-ci.
      </p>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <p>
        Le site utilise une connexion chiffrée. L’accès aux demandes est réservé aux comptes autorisés et les droits sont
        vérifiés à chaque action. Les notes de suivi internes ne servent pas à conserver d’informations médicales.
      </p>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>
          Conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère
          personnel, vous pouvez demander l’accès à vos informations, leur rectification ou leur suppression, et vous
          opposer à leur traitement.
        </p>
        <p>
          Pour exercer ces droits, écrivez à <a href={`mailto:${site.email}`}>{site.email}</a> ou adressez-vous à
          l’administration de l’école. Vous pouvez également saisir l’Autorité de Régulation des Télécommunications/TIC de
          Côte d’Ivoire (ARTCI), autorité de protection des données.
        </p>
      </>
    ),
  },
  {
    id: "mesure",
    title: "Mesure d’audience et cookies",
    content: (
      <p>
        Le site n’utilise pas de cookies publicitaires. Si une mesure d’audience est activée, elle reste agrégée et ne
        contient ni nom, ni téléphone, ni email, ni contenu de message. Un cookie technique est utilisé uniquement pour
        la connexion du personnel autorisé à l’espace de gestion. Pour toute question, consultez aussi les{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      crumbs={[{ label: "Confidentialité", href: "/confidentialite" }]}
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      intro={<p>Comment vos informations sont utilisées lorsque vous contactez l’école depuis ce site.</p>}
      updated="6 octobre 2026"
      sections={sections}
      demoNotice="Version de démonstration : le formulaire ne transmet aucune donnée à l’école. Cette notice sera validée par l’établissement avant toute collecte réelle."
    />
  );
}
