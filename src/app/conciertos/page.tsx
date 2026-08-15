"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { eventos } from "@/data/eventos";
import { useFavoritos } from "@/lib/favoritos";
import { getGoogleMapsUrl, getLugarByNombre } from "@/data/zonas";
import { Evento } from "@/types/evento";

interface VenueGroup {
  id: string;
  nombre: string;
  emoji: string;
  color: string;
  venues: string[];
}

const gruposGrandes: VenueGroup[] = [
  {
    id: "conciertos",
    nombre: "Conciertos",
    emoji: "🎤",
    color: "#007a5a",
    venues: [
      "Palacio de Congresos",
      "Plaza de Navarra",
    ],
  },
  {
    id: "djs",
    nombre: "DJs y Sesiones",
    emoji: "🎧",
    color: "#3b82f6",
    venues: ["Plaza de los Fueros de Aragón"],
  },
];

const gruposFolk: VenueGroup[] = [
  {
    id: "orquestas",
    nombre: "Orquestas y Verbenas",
    emoji: "🪗",
    color: "#8b5cf6",
    venues: ["Plaza Luis López Allué"],
  },
  {
    id: "iberiafolk",
    nombre: "Iberi@huesca.folk",
    emoji: "🎻",
    color: "#d97706",
    venues: ["Plaza General Alsina"],
  },
  {
    id: "charangas",
    nombre: "Charangas y Batucadas",
    emoji: "🎺",
    color: "#ef4444",
    venues: [
      "Centro de la ciudad",
      "Casco Viejo",
      "Calle Lanuza",
      "Barrio María Auxiliadora",
      "Barrio de Santiago",
    ],
  },
  {
    id: "bandas",
    nombre: "Bandas y Otros",
    emoji: "🎵",
    color: "#059669",
    venues: [
      "Parque Miguel Servet",
      "Parque Universidad",
      "Parque del Encuentro",
      "Coso Bajo",
      "Restaurante La Olla",
      "Casa Aísa",
    ],
  },
];

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

function clasificarEvento(ev: Evento): string {
  const l = ev.lugar.toLowerCase();
  if (l.includes("plaza luis") || l.includes("lópez allué")) return "orquestas";
  if (l.includes("general alsina")) return "iberiafolk";
  if (l.includes("fueros")) return "djs";
  if (
    ev.titulo.toLowerCase().includes("charanga") ||
    ev.titulo.toLowerCase().includes("batucada") ||
    ev.titulo.toLowerCase().includes("ronda charanguera") ||
    ev.titulo.toLowerCase().includes("vermú charanguero") ||
    l.includes("centro de la ciudad") ||
    l.includes("casco viejo") ||
    l.includes("lanuza")
  ) return "charangas";
  if (l.includes("palacio de congresos") || l.includes("plaza de navarra")) return "conciertos";
  return "bandas";
}

function subtypeTag(ev: Evento): { label: string; color: string } {
  const t = ev.titulo.toLowerCase();
  if (t.includes("dj") || t.includes("sessions") || t.includes("remember") || t.includes("fiesta ochentera")) return { label: "DJ", color: "#3b82f6" };
  if (t.includes("verbena") || t.includes("orquesta")) return { label: "Orquesta", color: "#8b5cf6" };
  if (t.includes("charanga")) return { label: "Charanga", color: "#ef4444" };
  if (t.includes("batucada")) return { label: "Batucada", color: "#f97316" };
  if (t.includes("concierto") || t.includes("festival")) return { label: "Concierto", color: "#007a5a" };
  if (t.includes("banda")) return { label: "Banda", color: "#059669" };
  return { label: "Música", color: "#888" };
}

function EventoMusical({
  ev,
  esDiaGrande,
  esFavorito,
  onToggleFav,
}: {
  ev: Evento;
  esDiaGrande: boolean;
  esFavorito: boolean;
  onToggleFav: () => void;
}) {
  const tag = subtypeTag(ev);
  const lugar = getLugarByNombre(ev.lugar);
  const mapsUrl = getGoogleMapsUrl(lugar?.direccion || ev.lugar);
  const [animKey, setAnimKey] = useState(0);

  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl bg-white transition-all hover:shadow-sm"
      style={{ border: "1px solid var(--color-borde)" }}
    >
      {/* Time */}
      <div className="flex-shrink-0 w-12 text-right">
        <span
          className="block text-sm font-bold tabular-nums"
          style={{ color: "var(--color-verde)" }}
        >
          {ev.hora}
        </span>
        {esDiaGrande && (
          <span
            className="block text-[10px] mt-0.5"
            style={{ color: "var(--color-texto-terciario)" }}
          >
            Día {ev.dia}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
            style={{ backgroundColor: tag.color + "18", color: tag.color }}
          >
            {tag.label}
          </span>
        </div>
        <h3
          className="text-sm font-semibold leading-snug"
          style={{ color: "var(--color-texto)" }}
        >
          {ev.titulo}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[11px]"
            style={{ color: "var(--color-texto-terciario)" }}
          >
            {ev.lugar}
          </span>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3 mt-1.5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold hover:underline"
            style={{ color: "var(--color-verde-oscuro)" }}
            onClick={(e) => e.stopPropagation()}
          >
            Cómo llegar
          </a>
          {!esDiaGrande && (
            <Link
              href={`/dia/${String(ev.dia)}`}
              className="text-[11px] font-medium hover:underline"
              style={{ color: "var(--color-texto-terciario)" }}
            >
              Día {ev.dia}/{ev.mes}
            </Link>
          )}
        </div>
      </div>

      {/* Favorite */}
      <button
        onClick={(e) => { e.stopPropagation(); setAnimKey((k) => k + 1); onToggleFav(); }}
        key={animKey}
        className="fav-btn fav-btn-active self-start p-1 text-lg flex-shrink-0"
        style={{ color: esFavorito ? "var(--color-verde-claro)" : "var(--color-texto-terciario)" }}
        aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {esFavorito ? "★" : "☆"}
      </button>
    </div>
  );
}

export default function ConciertosPage() {
  const [diaSeleccionado, setDiaSeleccionado] = useState("todos");
  const { esFavorito, toggleFavorito } = useFavoritos();

  const eventosMusica = useMemo(() => {
    return eventos.filter((e) => e.categoria === "musica");
  }, []);

  const eventosFiltrados = useMemo(() => {
    if (diaSeleccionado === "todos") return eventosMusica;
    const diaNum = parseInt(diaSeleccionado);
    return eventosMusica.filter((e) => e.dia === diaNum);
  }, [eventosMusica, diaSeleccionado]);

  const agrupar = (lista: VenueGroup[]) => {
    return lista
      .map((v) => ({
        ...v,
        eventos: eventosFiltrados
          .filter((ev) => clasificarEvento(ev) === v.id)
          .sort((a, b) => a.hora.localeCompare(b.hora)),
      }))
      .filter((g) => g.eventos.length > 0);
  };

  const grand = agrupar(gruposGrandes);
  const folk = agrupar(gruposFolk);

  const totalMusica = eventosFiltrados.length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="festival-header text-white py-6 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm mb-3 text-white/80 hover:text-white hover:underline"
          >
            &larr; Volver al programa
          </Link>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Programación Musical
          </h1>
          <p className="text-sm mt-1 text-white/60">
            {totalMusica} eventos &middot; {diaSeleccionado === "todos" ? "todos los días" : `día ${diaSeleccionado}`}
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Day filter */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            {dias.map((dia) => (
              <button
                key={dia.id}
                onClick={() => setDiaSeleccionado(dia.id)}
                className="filter-chip px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={
                  diaSeleccionado === dia.id
                    ? { backgroundColor: "var(--color-verde)", color: "white" }
                    : { backgroundColor: "var(--color-fondo)", color: "var(--color-texto-secundario)" }
                }
              >
                {dia.nombre}
              </button>
            ))}
          </div>
        </section>

        {/* ═══ ESCENARIOS GRANDES ═══ */}
        {grand.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-1.5 h-8 rounded-full"
                style={{ background: "var(--color-verde)" }}
              />
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
              >
                Escenarios grandes
              </h2>
            </div>

            <div className="space-y-6">
              {grand.map((grupo) => (
                <div key={grupo.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{grupo.emoji}</span>
                    <h3 className="text-sm font-bold" style={{ color: "var(--color-texto)" }}>
                      {grupo.nombre}
                    </h3>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: grupo.color + "18", color: grupo.color }}
                    >
                      {grupo.eventos.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {grupo.eventos.map((ev) => (
                      <EventoMusical
                        key={ev.id}
                        ev={ev}
                        esDiaGrande={diaSeleccionado === "todos"}
                        esFavorito={esFavorito(ev.id)}
                        onToggleFav={() => toggleFavorito(ev.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ FOLK, ORQUESTAS Y TRADICIONES ═══ */}
        {folk.length > 0 && (
          <section className="section-alt -mx-4 px-4 py-10 sm:py-14">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-8 rounded-full"
                  style={{ background: "linear-gradient(to bottom, #8b5cf6, #d97706)" }}
                />
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                >
                  Folk, Orquestas y Tradiciones
                </h2>
              </div>

              <div className="space-y-6">
                {folk.map((grupo) => (
                  <div key={grupo.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{grupo.emoji}</span>
                      <h3 className="text-sm font-bold" style={{ color: "var(--color-texto)" }}>
                        {grupo.nombre}
                      </h3>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: grupo.color + "18", color: grupo.color }}
                      >
                        {grupo.eventos.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {grupo.eventos.map((ev) => (
                        <EventoMusical
                          key={ev.id}
                          ev={ev}
                          esDiaGrande={diaSeleccionado === "todos"}
                          esFavorito={esFavorito(ev.id)}
                          onToggleFav={() => toggleFavorito(ev.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {grand.length === 0 && folk.length === 0 && (
          <div className="text-center py-12">
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-texto-secundario)" }}
            >
              No hay eventos musicales para este día
            </p>
          </div>
        )}
      </main>

      {/* Spacer for bottom nav */}
      <div className="h-28" />
    </div>
  );
}
