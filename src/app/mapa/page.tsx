"use client";

import { useState } from "react";
import Link from "next/link";
import { eventos } from "@/data/eventos";
import { zonas } from "@/data/zonas";
import MapaInteractivo from "@/components/MapaInteractivo";
import EventoCard from "@/components/EventoCard";
import { Evento } from "@/types/evento";

export default function MapaPage() {
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>("todos");
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | undefined>();

  const dias = [
    { id: "todos", nombre: "Todos" },
    { id: "9", nombre: "9 Dom" },
    { id: "10", nombre: "10 Lun" },
    { id: "11", nombre: "11 Mar" },
    { id: "12", nombre: "12 Mié" },
    { id: "13", nombre: "13 Jue" },
    { id: "14", nombre: "14 Vie" },
    { id: "15", nombre: "15 Sáb" },
  ];

  const eventosFiltrados =
    diaSeleccionado === "todos"
      ? eventos
      : eventos.filter((e) => e.dia === parseInt(diaSeleccionado));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="festival-header text-white py-6 px-4">
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm mb-3 text-white/80 hover:text-white hover:underline"
          >
            ← Volver al programa
          </Link>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mapa de Eventos
          </h1>
          <p className="text-sm mt-1 text-white/70">
            Explora los eventos por zonas de Huesca
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          <div>
            {/* Day filter */}
            <div className="mb-4">
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--color-texto-secundario)" }}
              >
                Filtrar por día
              </h3>
              <div className="flex flex-wrap gap-2">
                {dias.map((dia) => (
                  <button
                    key={dia.id}
                    onClick={() => setDiaSeleccionado(dia.id)}
                    className="filter-chip px-3 py-1 rounded-full text-xs font-semibold"
                    style={
                      diaSeleccionado === dia.id
                        ? { backgroundColor: "var(--color-verde)", color: "white" }
                        : {
                            backgroundColor: "var(--color-fondo)",
                            color: "var(--color-texto-secundario)",
                          }
                    }
                  >
                    {dia.nombre}
                  </button>
                ))}
              </div>
            </div>

            <MapaInteractivo
              eventos={eventosFiltrados}
              eventoSeleccionado={eventoSeleccionado}
              mostrarFiltros={true}
            />

            {/* Legend */}
            <div
              className="mt-4 p-4 rounded-xl bg-white"
              style={{ border: "1px solid var(--color-borde)" }}
            >
              <h3
                className="font-semibold text-sm mb-2"
                style={{ color: "var(--color-texto)" }}
              >
                Zonas
              </h3>
              <div className="flex flex-wrap gap-3">
                {zonas.map((zona) => (
                  <div key={zona.id} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: zona.color }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-texto-secundario)" }}
                    >
                      {zona.nombre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-4 rounded-xl p-4 max-h-[calc(100vh-200px)] overflow-y-auto bg-white"
              style={{ border: "1px solid var(--color-borde)" }}
            >
              <h2
                className="font-semibold text-sm mb-3"
                style={{ color: "var(--color-texto)" }}
              >
                Eventos en el mapa ({eventosFiltrados.length})
              </h2>
              <div className="space-y-3">
                {eventosFiltrados.slice(0, 20).map((evento) => (
                  <div
                    key={evento.id}
                    onClick={() => setEventoSeleccionado(evento)}
                    className="cursor-pointer rounded-lg transition-colors"
                    style={
                      eventoSeleccionado?.id === evento.id
                        ? {
                            background: "var(--color-fondo)",
                            border: "1px solid var(--color-borde)",
                          }
                        : { border: "1px solid transparent" }
                    }
                  >
                    <EventoCard evento={evento} />
                  </div>
                ))}
                {eventosFiltrados.length > 20 && (
                  <p
                    className="text-xs text-center"
                    style={{ color: "var(--color-texto-terciario)" }}
                  >
                    +{eventosFiltrados.length - 20} eventos más
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
