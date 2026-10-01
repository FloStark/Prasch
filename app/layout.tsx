import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maler-prasch.at"),
  title: {
    default: "Malerbetrieb Prasch Graz | Malermeister & Farben-Shop",
    template: "%s | Malerbetrieb Prasch"
  },
  description: "Malerbetrieb Prasch in Graz: Fassadengestaltung, Innenmalerei, Anstriche und Profi-Farben im Farben-Shop.",
  applicationName: "Malerbetrieb Prasch",
  authors: [{ name: "Malerbetrieb Prasch" }],
  creator: "Malerbetrieb Prasch",
  publisher: "Malerbetrieb Prasch",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: "Malerbetrieb Prasch",
    title: "Malerbetrieb Prasch Graz | Malermeister & Farben-Shop",
    description: "Fassadengestaltung, Innenmalerei, Anstriche und Profi-Farben in Graz."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="icon" type="image/png" href="/Assets/image/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
