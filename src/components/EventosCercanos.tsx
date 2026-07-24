"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Evento } from "@/types/evento";
import { eventos, categorias } from "@/data/eventos";
import { getLugarByNombre } from "@/data/zonas";

const RADIO_MAX_KM = 5;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function ahora(): { dia: number; mes: number; horaMinutos: number } {
  const now = new Date();
  const [h, m] = now.toTimeString().slice(0, 5).split(":").map(Number);
  return { dia: now.getDate(), mes: now.getMonth() + 1, horaMinutos: h * 60 + m };
}

function horaAMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

interface EventoCercano extends Evento {
  distancia: number;
}

export default function EventosCercanos() {
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError("No se pudo obtener tu ubicación.");
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  const resultado = useMemo(() => {
    if (!userPos) return null;

    const { dia, mes, horaMinutos } = ahora();

    // Eventos de HOY que aún no han pasado (o están ahora)
    const eventosHoy = eventos.filter((e) => e.dia === dia && e.mes === mes);
    const hoyCercanos: EventoCercano[] = [];

    for (const ev of eventosHoy) {
      const finEv = horaAMinutos(ev.hora) + 90; // ~90 min estimado por evento
      if (finEv < horaMinutos) continue; // ya pasó

      const lugar = getLugarByNombre(ev.lugar);
      if (!lugar) continue;

      const distancia = haversine(userPos.lat, userPos.lng, lugar.lat, lugar.lng);
      if (distancia <= RADIO_MAX_KM) {
        hoyCercanos.push({ ...ev, distancia });
      }
    }

    hoyCercanos.sort((a, b) => {
      // Primero los que empiezan más pronto, luego por distancia
      const diffHora = horaAMinutos(a.hora) - horaAMinutos(b.hora);
      if (diffHora !== 0) return diffHora;
      return a.distancia - b.distancia;
    });

    if (hoyCercanos.length > 0) {
      return { tipo: "hoy" as const, eventos: hoyCercanos.slice(0, 6) };
    }

    // Si no hay hoy, buscar los próximos eventos cercanos
    const proximos: EventoCercano[] = [];
    for (const ev of eventos) {
      const totalMinEv = ev.dia * 1440 + ev.mes * 44000 + horaAMinutos(ev.hora);
      const totalMinAhora = dia * 1440 + mes * 44000 + horaMinutos;
      if (totalMinEv <= totalMinAhora) continue; // ya pasó

      const lugar = getLugarByNombre(ev.lugar);
      if (!lugar) continue;

      const distancia = haversine(userPos.lat, userPos.lng, lugar.lat, lugar.lng);
      if (distancia <= RADIO_MAX_KM) {
        proximos.push({ ...ev, distancia });
      }
    }

    proximos.sort((a, b) => a.distancia - b.distancia);
    if (proximos.length > 0) {
      return { tipo: "proximo" as const, eventos: proximos.slice(0, 6) };
    }

    return null;
  }, [userPos]);

  if (loading) {
    return (
      <div className="rounded-xl p-6 bg-white" style={{ border: "1px solid var(--color-borde)" }}>
        <div className="flex items-center gap-3">
          <span className="text-xl animate-pulse">📍</span>
          <p className="text-sm" style={{ color: "var(--color-texto-secundario)" }}>
            Buscando eventos cerca de ti...
          </p>
        </div>
      </div>
    );
  }

  if (error || !userPos || !resultado) return null;

  const titulo = resultado.tipo === "hoy"
    ? "Ahora cerca de ti"
    : "Próximos eventos cerca de ti";

  return (
    <div className="rounded-xl p-6 sm:p-8 bg-white" style={{ border: "1px solid var(--color-borde)" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{resultado.tipo === "hoy" ? "🔥" : "📍"}</span>
        <h2
          className="text-lg sm:text-xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
        >
          {titulo}
        </h2>
      </div>

      <div className="space-y-3">
        {resultado.eventos.map((ev) => {
          const cat = categorias.find((c) => c.id === ev.categoria);
          const mesNombre = ev.mes === 7 ? "jul" : "ago";
          const empiezaMin = horaAMinutos(ev.hora);
          const { horaMinutos: ahoraMin } = ahora();
          const minsRestan = empiezaMin - ahoraMin;
          const empiezaEn = minsRestan > 0 ? `en ${minsRestan} min` : "ahora";

          return (
            <div
              key={ev.id}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ background: "var(--color-fondo)" }}
            >
              <div className="flex-shrink-0 w-14 text-center">
                <span
                  className="block text-xs font-bold"
                  style={{ color: "var(--color-verde)" }}
                >
                  {ev.dia} {mesNombre}
                </span>
                <span
                  className="block text-xs tabular-nums mt-0.5"
                  style={{ color: "var(--color-texto-terciario)" }}
                >
                  {ev.hora}
                </span>
                {resultado.tipo === "hoy" && (
                  <span
                    className="block text-[10px] font-semibold mt-0.5"
                    style={{ color: minsRestan <= 15 ? "var(--color-verde)" : "var(--color-texto-terciario)" }}
                  >
                    {empiezaEn}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">{cat?.emoji || "📌"}</span>
                  <span
                    className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: cat?.color || "#888", color: "white" }}
                  >
                    {cat?.nombre}
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug truncate" style={{ color: "var(--color-texto)" }}>
                  {ev.titulo}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-texto-terciario)" }}>
                  📍 {ev.lugar} · {ev.distancia < 1 ? `${Math.round(ev.distancia * 1000)} m` : `${ev.distancia.toFixed(1)} km`}
                </p>
              </div>
              <Link
                href={`/dia/${ev.mes === 7 ? "prelaurentis" : ev.dia < 9 ? "portico" : String(ev.dia)}`}
                className="flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  background: "var(--color-verde)",
                  color: "white",
                }}
              >
                Ver
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
