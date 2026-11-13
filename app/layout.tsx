import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "HYB Prévention Conseil | Santé et sécurité, RH et formations au Québec",
  description: "HYB Prévention Conseil, fondée par Hygo Bisimwa : prévention en santé et sécurité du travail, formations sur mesure et conseils en ressources humaines pour les entreprises du Québec.",
  openGraph: { title: "HYB Prévention Conseil — Restez bien conseillé!", description: "Santé et sécurité du travail, ressources humaines et formations adaptées à votre entreprise.", type: "website", locale: "fr_CA" },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr-CA"><body>{children}</body></html>;
}
