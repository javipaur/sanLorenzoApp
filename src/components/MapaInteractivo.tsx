"use client";

import { useEffect, useState } from "react";
import { Evento } from "@/types/evento";
import { zonas } from "@/data/zonas";

interface MapaLeafletProps {
  eventos: Evento[];
  eventoSeleccionado?: Evento;
  filtroZona: string | null;
  filtroCategoria: string | null;
}

interface MapaInteractivoProps {
  eventos?: Evento[];
  eventoSeleccionado?: Evento;
  mostrarFiltros?: boolean;
}

export default function MapaInteractivo({
  eventos = [],
  eventoSeleccionado,
  mostrarFiltros = true,
}: MapaInteractivoProps) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<MapaLeafletProps> | null>(null);
  const [filtroZona, setFiltroZona] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);

  useEffect(() => {
    import("./MapaLeaflet").then((mod) => {
      setMapComponent(() => mod.default);
    });
  }, []);

  if (!MapComponent) {
    return (
      <div
        className="w-full h-[500px] rounded-xl flex items-center justify-center"
        style={{ background: "var(--color-fondo)" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2"
            style={{ borderColor: "var(--color-verde)" }}
          />
          <p className="text-sm" style={{ color: "var(--color-texto-secundario)" }}>
            Cargando mapa...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {mostrarFiltros && (
        <div className="mb-4 space-y-3">
          {/* Zonas */}
          <div>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              Zonas
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltroZona(null)}
                className="filter-chip px-3 py-1 rounded-full text-xs font-semibold"
                style={
                  filtroZona === null
                    ? { backgroundColor: "var(--color-verde)", color: "white" }
                    : { backgroundColor: "var(--color-fondo)", color: "var(--color-texto-secundario)" }
                }
              >
                Todas
              </button>
              {zonas.map((zona) => (
                <button
                  key={zona.id}
                  onClick={() => setFiltroZona(zona.id)}
                  className="filter-chip px-3 py-1 rounded-full text-xs font-semibold"
                  style={
                    filtroZona === zona.id
                      ? { backgroundColor: zona.color, color: "white" }
                      : { backgroundColor: "var(--color-fondo)", color: "var(--color-texto-secundario)" }
                  }
                >
                  {zona.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              Categorías
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltroCategoria(null)}
                className="filter-chip px-3 py-1 rounded-full text-xs font-semibold"
                style={
                  filtroCategoria === null
                    ? { backgroundColor: "var(--color-verde)", color: "white" }
                    : { backgroundColor: "var(--color-fondo)", color: "var(--color-texto-secundario)" }
                }
              >
                Todas
              </button>
              {["musica", "infantil", "tradicional", "taurino", "deportivo", "cultural", "religioso"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className="filter-chip px-3 py-1 rounded-full text-xs font-semibold"
                  style={
                    filtroCategoria === cat
                      ? { backgroundColor: "var(--color-verde)", color: "white" }
                      : { backgroundColor: "var(--color-fondo)", color: "var(--color-texto-secundario)" }
                  }
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <MapComponent
        eventos={eventos}
        eventoSeleccionado={eventoSeleccionado}
        filtroZona={filtroZona}
        filtroCategoria={filtroCategoria}
      />
    </div>
  );
}
