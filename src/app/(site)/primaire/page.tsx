import type { Metadata } from "next";
import { CalendarCheck, ClipboardList, FileText, LayoutGrid, Wallet } from "lucide-react";
import { CyclePage } from "@/components/sections/CyclePage";
import { primaireFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Primaire à Angré",
  description:
    "Le primaire à La Cité des Anges, Angré, Cité Gestoci : contactez l’administration pour connaître les classes ouvertes et préparer votre demande d’inscription.",
  alternates: { canonical: "/primaire" },
};

export default function PrimairePage() {
  return (
    <CyclePage
      cycle="primaire"
      title="Le primaire à La Cité des Anges"
      intro="La Cité des Anges propose un cycle primaire à Angré, Cité Gestoci. Contactez l’administration pour connaître les classes ouvertes et préparer votre demande d’inscription."
      ctaLabel="Se renseigner pour le primaire"
      presentation={{
        title: "Un cycle primaire à Angré, Cité Gestoci",
        text: "Que votre enfant entre au primaire ou change d’établissement, l’administration vous indique les classes ouvertes et les étapes de la demande.",
      }}
      topics={[
        { icon: LayoutGrid, title: "Les classes ouvertes", text: "Les classes du primaire proposées pour l’année scolaire." },
        { icon: ClipboardList, title: "Les conditions d’admission", text: "Les conditions d’admission selon le niveau de votre enfant." },
        { icon: Wallet, title: "Les frais et modalités", text: "Les frais de scolarité et les modalités de règlement." },
        { icon: FileText, title: "Les pièces à fournir", text: "Les documents nécessaires pour le niveau demandé." },
        { icon: CalendarCheck, title: "Un rendez-vous", text: "Une rencontre avec l’administration, à une date confirmée par l’école." },
      ]}
      faq={primaireFaq}
    />
  );
}
