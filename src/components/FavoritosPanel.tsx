"use client";

import { Evento } from "@/types/evento";
import { useFavoritos } from "@/lib/favoritos";
import EventoCard from "./EventoCard";

interface FavoritosPanelProps {
  eventos: Evento[];
  emptyBehavior?: "hide" | "message";
}

export default function FavoritosPanel({
  eventos,
  emptyBehavior = "message",
}: FavoritosPanelProps) {
  const { favoritos, isLoaded } = useFavoritos();

  if (!isLoaded) return null;

  const eventosFavoritos = eventos.filter((e) => favoritos.includes(e.id));

  if (eventosFavoritos.length === 0) {
    if (emptyBehavior === "hide") return null;

    return (
      <div className="text-center py-8">
        <p className="text-3xl mb-2">⭐</p>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-texto-secundario)" }}>
          Sin favoritos aún
        </p>
        <p className="text-xs" style={{ color: "var(--color-texto-terciario)" }}>
          Pulsa la estrella de un evento para guardarlo aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2
        className="text-base font-bold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-texto)",
        }}
      >
        Favoritos{" "}
        <span className="text-xs font-normal" style={{ color: "var(--color-texto-terciario)" }}>
          ({eventosFavoritos.length})
        </span>
      </h2>
      {eventosFavoritos.map((evento) => (
        <EventoCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}
