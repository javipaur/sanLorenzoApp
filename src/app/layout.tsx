import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fiestas de San Lorenzo 2026 | Huesca",
  description:
    "Programa completo de las Fiestas de San Lorenzo 2026 en Huesca. Del 9 de julio al 15 de agosto: conciertos, tradiciones, toros, eventos infantiles y más.",
  keywords: [
    "fiestas",
    "san lorenzo",
    "huesca",
    "programa",
    "eventos",
    "2026",
    "julio",
    "agosto",
    "aragón",
    "prelaurentis",
    "pórtico laurentino",
  ],
  authors: [{ name: "Ayuntamiento de Huesca" }],
  openGraph: {
    title: "Fiestas de San Lorenzo 2026 | Huesca",
    description:
      "Programa completo de las Fiestas de San Lorenzo 2026 en Huesca. Del 9 de julio al 15 de agosto.",
    type: "website",
    locale: "es_ES",
    siteName: "Fiestas de San Lorenzo 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiestas de San Lorenzo 2026 | Huesca",
    description:
      "Programa completo de las Fiestas de San Lorenzo 2026 en Huesca. Del 9 de julio al 15 de agosto.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "San Lorenzo",
  },
};

export const viewport: Viewport = {
  themeColor: "#007a5a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${dmSans.variable} h-full`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
