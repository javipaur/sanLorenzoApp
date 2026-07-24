"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { eventos } from "@/data/eventos";
import { zonas, getLugarByNombre } from "@/data/zonas";
import EventoCard from "@/components/EventoCard";
import { Evento } from "@/types/evento";

const MapaLeaflet = dynamic(() => import("@/components/MapaLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--color-fondo)" }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: "var(--color-verde)" }} />
        <p className="text-sm" style={{ color: "var(--color-texto-secundario)" }}>Cargando mapa...</p>
      </div>
    </div>
  ),
});

function MapLegend({ abierto, onToggle, eventos }: { abierto: boolean; onToggle: () => void; eventos: Evento[] }) {
  const zonasActivas = useMemo(() => {
    const ids = new Set<string>();
    eventos.forEach((e) => {
      const lugar = getLugarByNombre(e.lugar);
      if (lugar) ids.add(lugar.zona);
    });
    return zonas.filter((z) => ids.has(z.id));
  }, [eventos]);

  if (zonasActivas.length === 0) return null;

  return (
    <div className="map-legend">
      <button onClick={onToggle} className="map-legend-toggle" aria-label={abierto ? "Ocultar leyenda" : "Mostrar leyenda"}>
        <span className="map-legend-icon">●</span>
        <span>{abierto ? "Ocultar" : "Leyenda"}</span>
      </button>
      {abierto && (
        <div className="map-legend-list">
          {zonasActivas.map((zona) => (
            <div key={zona.id} className="map-legend-item">
              <span className="map-legend-dot" style={{ backgroundColor: zona.color }} />
              <span className="map-legend-name">{zona.nombre}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getDiaActual(): string {
  const now = new Date();
  if (now.getMonth() === 7 && now.getDate() >= 9 && now.getDate() <= 15) {
    return String(now.getDate());
  }
  return "todos";
}

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

const categoriasMapa = [
  { id: "musica", nombre: "Música", emoji: "🎵" },
  { id: "infantil", nombre: "Infantil", emoji: "🎪" },
  { id: "tradicional", nombre: "Tradicional", emoji: "🎺" },
  { id: "taurino", nombre: "Taurino", emoji: "🐂" },
  { id: "deportivo", nombre: "Deportivo", emoji: "⚽" },
  { id: "cultural", nombre: "Cultural", emoji: "🎭" },
  { id: "religioso", nombre: "Religioso", emoji: "⛪" },
];

export default function MapaPage() {
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>(getDiaActual);
  const [filtroZona, setFiltroZona] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | undefined>();
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [legendAbierto, setLegendAbierto] = useState(false);

  const eventosFiltrados = useMemo(() => {
    let filtered = diaSeleccionado === "todos"
      ? eventos
      : eventos.filter((e) => e.dia === parseInt(diaSeleccionado));
    if (filtroZona) {
      filtered = filtered.filter((e) => {
        const lugar = getLugarByNombre(e.lugar);
        return lugar?.zona === filtroZona;
      });
    }
    if (filtroCategoria) {
      filtered = filtered.filter((e) => e.categoria === filtroCategoria);
    }
    return filtered;
  }, [diaSeleccionado, filtroZona, filtroCategoria]);

  const handleEventoClick = useCallback((evento: Evento) => {
    setEventoSeleccionado(evento);
    setPanelAbierto(false);
  }, []);

  const handleClearFiltros = useCallback(() => {
    setFiltroZona(null);
    setFiltroCategoria(null);
  }, []);

  const filtrosActivos = (filtroZona ? 1 : 0) + (filtroCategoria ? 1 : 0);

  return (
    <div className="map-fullscreen">
      {/* Mapa */}
      <div className="map-fullscreen-map">
        <MapaLeaflet
          eventos={eventosFiltrados}
          eventoSeleccionado={eventoSeleccionado}
          filtroZona={filtroZona}
          filtroCategoria={filtroCategoria}
        />
      </div>

      {/* Back button */}
      <Link href="/" className="map-float-btn map-float-btn-left" aria-label="Volver al programa">
        <span className="text-base">←</span>
      </Link>

      {/* Legend — bottom left */}
      <MapLegend abierto={legendAbierto} onToggle={() => setLegendAbierto(!legendAbierto)} eventos={eventosFiltrados} />

      {/* Day filter bar */}
      <div className="map-float-daybar">
        <div className="map-float-daybar-inner">
          {dias.map((dia) => (
            <button
              key={dia.id}
              onClick={() => setDiaSeleccionado(dia.id)}
              className="map-day-pill"
              data-active={diaSeleccionado === dia.id}
            >
              {dia.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Single FAB */}
      <button
        onClick={() => setPanelAbierto(!panelAbierto)}
        className="map-fab-single"
        aria-label={panelAbierto ? "Cerrar panel" : "Filtros y eventos"}
        aria-expanded={panelAbierto}
      >
        <span className="text-xl">{panelAbierto ? "✕" : "☰"}</span>
        {!panelAbierto && filtrosActivos > 0 && (
          <span className="map-fab-single-badge">{filtrosActivos}</span>
        )}
      </button>

      {/* Combined panel */}
      {panelAbierto && (
        <div className="map-panel">
          <div className="map-panel-header">
            <h3 className="map-panel-title">
              {eventosFiltrados.length} eventos
            </h3>
            {filtrosActivos > 0 && (
              <button onClick={handleClearFiltros} className="map-panel-clear">
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="map-panel-body">
            {/* Zonas */}
            <div className="map-panel-section">
              <h4 className="map-panel-label">Zonas</h4>
              <div className="map-panel-chips">
                <button
                  onClick={() => setFiltroZona(null)}
                  className="map-chip"
                  data-active={filtroZona === null}
                >
                  Todas
                </button>
                {zonas.map((zona) => (
                  <button
                    key={zona.id}
                    onClick={() => setFiltroZona(zona.id)}
                    className="map-chip"
                    data-active={filtroZona === zona.id}
                  >
                    <span className="map-chip-dot" style={{ backgroundColor: zona.color }} />
                    {zona.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div className="map-panel-section">
              <h4 className="map-panel-label">Categorías</h4>
              <div className="map-panel-chips">
                <button
                  onClick={() => setFiltroCategoria(null)}
                  className="map-chip"
                  data-active={filtroCategoria === null}
                >
                  Todas
                </button>
                {categoriasMapa.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFiltroCategoria(cat.id)}
                    className="map-chip"
                    data-active={filtroCategoria === cat.id}
                  >
                    {cat.emoji} {cat.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="map-panel-divider" />

            {/* Event list */}
            <div className="map-panel-events">
              {eventosFiltrados.length === 0 ? (
                <p className="map-event-empty">No hay eventos para esta selección</p>
              ) : (
                eventosFiltrados.map((evento) => (
                  <button
                    key={evento.id}
                    onClick={() => handleEventoClick(evento)}
                    className="map-event-row"
                    data-selected={eventoSeleccionado?.id === evento.id}
                  >
                    <EventoCard evento={evento} />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-28" />
    </div>
  );
}
