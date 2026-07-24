"use client";

import { Evento } from "@/types/evento";
import { categorias } from "@/data/eventos";
import { useFavoritos } from "@/lib/favoritos";
import { getLugarByNombre, getZonaById, getGoogleMapsUrl } from "@/data/zonas";

interface EventoCardProps {
  evento: Evento;
}

export default function EventoCard({ evento }: EventoCardProps) {
  const { esFavorito, toggleFavorito } = useFavoritos();
  const favorito = esFavorito(evento.id);
  const categoria = categorias.find((c) => c.id === evento.categoria);

  const lugar = getLugarByNombre(evento.lugar);
  const zona = lugar ? getZonaById(lugar.zona) : null;
  const googleMapsUrl = getGoogleMapsUrl(lugar?.direccion || evento.lugar);

  return (
    <div className="evento-card rounded-lg p-4 bg-white">
      <div className="flex gap-3">
        {/* Time */}
        <div className="flex-shrink-0 w-14 text-right">
          <span
            className="block text-sm font-bold tabular-nums"
            style={{ color: "var(--color-verde)" }}
          >
            {evento.hora}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm" title={categoria?.nombre}>
              {categoria?.emoji || "📌"}
            </span>
            <span
              className="cat-badge"
              style={{
                backgroundColor: categoria?.color || "#888",
                color: "white",
              }}
            >
              {categoria?.nombre || "Otro"}
            </span>
            {zona && (
              <span
                className="cat-badge"
                style={{ backgroundColor: zona.color, color: "white" }}
              >
                {zona.nombre}
              </span>
            )}
          </div>
          <h3
            className="font-semibold text-sm sm:text-base leading-snug"
            style={{ color: "var(--color-texto)" }}
          >
            {evento.titulo}
          </h3>
          {evento.descripcion !== evento.titulo && (
            <p
              className="text-xs sm:text-sm mt-1 leading-relaxed"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              {evento.descripcion}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-xs" style={{ color: "var(--color-texto-terciario)" }}>
              📍 {evento.lugar}
            </span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium hover:underline"
              style={{ color: "var(--color-verde-oscuro)" }}
              onClick={(e) => e.stopPropagation()}
            >
              Cómo llegar
            </a>
          </div>
          {evento.organizador && (
            <p className="text-xs mt-1" style={{ color: "var(--color-texto-terciario)" }}>
              Organiza: {evento.organizador}
            </p>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={() => toggleFavorito(evento.id)}
          className="fav-btn self-start p-1.5 text-lg"
          style={{
            color: favorito ? "var(--color-verde-claro)" : "var(--color-texto-terciario)",
          }}
          aria-label={favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {favorito ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
