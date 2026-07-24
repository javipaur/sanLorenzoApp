"use client";

import { useState } from "react";
import { Evento, Categoria } from "@/types/evento";
import EventoCard from "./EventoCard";
import FiltroCategorias from "./FiltroCategorias";

interface FiltroCategoriasWrapperProps {
  eventos: Evento[];
}

const momentos = [
  { id: "manana", nombre: "Mañana", emoji: "🌅" },
  { id: "tarde", nombre: "Tarde", emoji: "☀️" },
  { id: "noche", nombre: "Noche", emoji: "🌙" },
];

export default function FiltroCategoriasWrapper({
  eventos,
}: FiltroCategoriasWrapperProps) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<
    Categoria[]
  >([]);

  const eventosFiltrados =
    categoriasSeleccionadas.length === 0
      ? eventos
      : eventos.filter((e) => categoriasSeleccionadas.includes(e.categoria));

  return (
    <div>
      {/* Filters */}
      <div className="mb-6">
        <FiltroCategorias
          seleccionadas={categoriasSeleccionadas}
          onChange={setCategoriasSeleccionadas}
        />
      </div>

      {/* Timeline */}
      <div className="relative">
        {momentos.map((momento) => {
          const eventosMomento = eventosFiltrados.filter(
            (e) => e.momento === momento.id
          );

          if (eventosMomento.length === 0) return null;

          return (
            <div key={momento.id} className="mb-2 last:mb-0">
              {/* Section header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10">
                  <span className="text-xl">{momento.emoji}</span>
                </div>
                <h2
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-texto)",
                  }}
                >
                  {momento.nombre}
                </h2>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--color-fondo)",
                    color: "var(--color-texto-secundario)",
                  }}
                >
                  {eventosMomento.length}
                </span>
              </div>

              {/* Events */}
              <div
                className="relative ml-5 pl-6"
                style={{ borderLeft: "2px solid var(--color-borde)" }}
              >
                {eventosMomento.map((evento, idx) => (
                  <div key={evento.id} className="relative mb-3 last:mb-0">
                    {/* Dot */}
                    <div
                      className="timeline-dot absolute -left-[29px] top-4"
                      style={
                        idx === 0
                          ? { background: "var(--color-verde)" }
                          : undefined
                      }
                    />
                    <EventoCard evento={evento} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* No events */}
      {eventosFiltrados.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p
            className="text-lg font-semibold mb-1"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            Sin resultados
          </p>
          <p className="text-sm" style={{ color: "var(--color-texto-terciario)" }}>
            No hay eventos con esta categoría seleccionada.
          </p>
        </div>
      )}
    </div>
  );
}
