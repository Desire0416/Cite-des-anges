import type { Metadata } from "next";
import { CalendarDays, ClipboardList, FileText, Layers, Wallet } from "lucide-react";
import { CyclePage } from "@/components/sections/CyclePage";
import { maternelleFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Maternelle à Angré",
  description:
    "La maternelle à La Cité des Anges, Angré, Cité Gestoci : l’administration vous renseigne sur les sections proposées, les conditions d’accueil et les démarches d’inscription.",
  alternates: { canonical: "/maternelle" },
};

export default function MaternellePage() {
  return (
    <CyclePage
      cycle="maternelle"
      title="La maternelle à La Cité des Anges"
      intro="Vous recherchez une école maternelle à Angré ? L’administration de La Cité des Anges vous renseigne sur les sections proposées, les conditions d’accueil et les démarches d’inscription."
      ctaLabel="Se renseigner pour la maternelle"
      presentation={{
        title: "Un cycle maternel à Angré, Cité Gestoci",
        text: "La Cité des Anges propose un cycle maternel. Pour préparer l’entrée de votre enfant, l’administration répond à vos questions et vous présente les démarches.",
      }}
      topics={[
        { icon: Layers, title: "Les sections ouvertes", text: "Les sections de maternelle proposées pour l’année scolaire." },
        { icon: ClipboardList, title: "Les conditions d’admission", text: "Les conditions d’âge et d’accueil applicables à votre enfant." },
        { icon: Wallet, title: "Les frais et modalités", text: "Les frais de scolarité et les modalités de règlement." },
        { icon: FileText, title: "Les pièces à fournir", text: "La liste des documents nécessaires au dossier d’inscription." },
        { icon: CalendarDays, title: "L’organisation de la rentrée", text: "Les informations pratiques pour préparer le premier jour." },
      ]}
      faq={maternelleFaq}
    />
  );
}
