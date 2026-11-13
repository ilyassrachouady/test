import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "HYB Prévention Conseil | Services de nettoyage au Québec",
  description: "HYB Prévention : découvrez notre offre de grand ménage, nettoyage de déménagement et entretien de locations de courte durée au Québec.",
  openGraph: { title: "HYB Prévention — Un espace propre, l’esprit léger", description: "Grand ménage, nettoyage de déménagement et entretien de locations : un intérieur frais et accueillant.", type: "website", locale: "fr_CA" },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr-CA"><body>{children}</body></html>;
}
