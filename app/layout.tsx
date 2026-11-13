import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KlinUp | Thoughtful Home Cleaning in Manhattan",
  description: "A clean home, a clear mind. Discover professional deep cleaning, move-out cleaning, and Airbnb turnover services in Manhattan.",
  openGraph: { title: "KlinUp — A little more room to breathe", description: "Professional cleaning, beautifully simple.", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
