"use client";

import { Evento } from "@/types/evento";
import { useFavoritos } from "@/lib/favoritos";
import FavoritosPanel from "./FavoritosPanel";

interface MobileFavoritesBarProps {
  eventos: Evento[];
}

export default function MobileFavoritesBar({ eventos }: MobileFavoritesBarProps) {
  const { tieneFavoritosEn } = useFavoritos();

  if (!tieneFavoritosEn(eventos)) return null;

  return (
    <div
      className="lg:hidden fixed left-0 right-0 p-4 bg-white max-h-[45vh] overflow-y-auto"
      style={{
        bottom: "calc(90px + env(safe-area-inset-bottom))",
        borderTop: "1px solid var(--color-borde)",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <FavoritosPanel eventos={eventos} emptyBehavior="hide" />
    </div>
  );
}
