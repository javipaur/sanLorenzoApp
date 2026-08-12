"use client";

import { useEffect, useRef, useState } from "react";
import { Evento, Categoria, DiaFiesta } from "@/types/evento";
import EventoCard from "./EventoCard";
import FiltroCategorias from "./FiltroCategorias";

interface FiltroCategoriasWrapperProps {
  dia: DiaFiesta;
  eventos: Evento[];
}

const momentos = [
  { id: "manana", nombre: "Mañana" },
  { id: "tarde", nombre: "Tarde" },
  { id: "noche", nombre: "Noche" },
];

function horaEnMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
}

export default function FiltroCategoriasWrapper({
  dia,
  eventos,
}: FiltroCategoriasWrapperProps) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<
    Categoria[]
  >([]);
  const [eventoActualId, setEventoActualId] = useState<string | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (scrolledRef.current) return;
    const diaNum = Number(dia.id);
    if (isNaN(diaNum) || eventos.length === 0) return;

    const ahora = new Date();
    const esHoy =
      ahora.getDate() === dia.dia &&
      ahora.getMonth() + 1 === dia.mes &&
      ahora.getFullYear() === dia.anio;
    if (!esHoy) return;

    const ahoraMin = ahora.getHours() * 60 + ahora.getMinutes();
    const ordenados = [...eventos].sort(
      (a, b) => horaEnMinutos(a.hora) - horaEnMinutos(b.hora)
    );

    let objetivo = ordenados[0];
    for (const ev of ordenados) {
      if (horaEnMinutos(ev.hora) <= ahoraMin) objetivo = ev;
      else break;
    }

    const frame = requestAnimationFrame(() => {
      scrolledRef.current = true;
      setEventoActualId(objetivo.id);
      const el = document.getElementById(`evento-${objetivo.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return () => cancelAnimationFrame(frame);
  }, [dia, eventos]);

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
                <div
                  className="w-1 h-6 rounded-full"
                  style={{
                    background: momento.id === "manana" ? "var(--color-verde)" :
                                momento.id === "tarde" ? "#f59e0b" : "#6366f1"
                  }}
                />
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
                  <div
                    key={evento.id}
                    id={`evento-${evento.id}`}
                    data-ahora={evento.id === eventoActualId}
                    className="evento-wrap relative mb-3 last:mb-0"
                  >
                    {/* Dot */}
                    <div
                      className="timeline-dot absolute -left-[29px] top-4"
                      style={
                        idx === 0
                          ? { background: "var(--color-verde)" }
                          : undefined
                      }
                    />
                    <EventoCard evento={evento} actual={evento.id === eventoActualId} />
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
          <p
            className="text-lg font-semibold mb-1"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-texto-secundario)" }}
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
