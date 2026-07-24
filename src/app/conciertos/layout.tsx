import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programación Musical - Fiestas de San Lorenzo 2026",
  description:
    "Conciertos, orquestas, DJs y charangas de las Fiestas de San Lorenzo 2026 en Huesca. Programación musical completa.",
};

export default function ConciertosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
