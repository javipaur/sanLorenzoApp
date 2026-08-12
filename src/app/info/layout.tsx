import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Información - Fiestas de San Lorenzo 2026",
  description:
    "Sobre la agenda digital de las Fiestas de San Lorenzo 2026 en Huesca: versión de la app, estadísticas de uso, cómo instalarla y compartirla.",
};

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
