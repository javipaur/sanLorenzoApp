import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Favoritos - Fiestas de San Lorenzo 2026",
  description:
    "Tus eventos guardados de las Fiestas de San Lorenzo 2026 en Huesca.",
};

export default function FavoritosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
