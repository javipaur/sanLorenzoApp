"use client";

import { useState, useMemo } from "react";
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

function getInitialGeoState(): {
  pos: { lat: number; lng: number } | null;
  loading: boolean;
  error: boolean;
  asked: boolean;
} {
  if (typeof window === "undefined") {
    return { pos: null, loading: false, error: false, asked: false };
  }
  if (!navigator.geolocation) {
    return { pos: null, loading: false, error: true, asked: false };
  }
  return { pos: null, loading: false, error: false, asked: false };
}

export default function EventosCercanos() {
  const [geoState, setGeoState] = useState(getInitialGeoState);

  const pedirUbicacion = () => {
    if (!navigator.geolocation) return;
    setGeoState((s) => ({ ...s, loading: true, asked: true }));
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setGeoState({
          pos: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          loading: false,
          error: false,
          asked: true,
        }),
      () => setGeoState((s) => ({ ...s, pos: null, loading: false, error: true })),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  };

  const { pos: userPos, loading, error } = geoState;

  const resultado = useMemo(() => {
    if (!userPos) return null;

    const { dia, mes, horaMinutos } = ahora();

    const eventosHoy = eventos.filter((e) => e.dia === dia && e.mes === mes);
    const hoyCercanos: EventoCercano[] = [];

    for (const ev of eventosHoy) {
      const finEv = horaAMinutos(ev.hora) + 90;
      if (finEv < horaMinutos) continue;

      const lugar = getLugarByNombre(ev.lugar);
      if (!lugar) continue;

      const distancia = haversine(userPos.lat, userPos.lng, lugar.lat, lugar.lng);
      if (distancia <= RADIO_MAX_KM) {
        hoyCercanos.push({ ...ev, distancia });
      }
    }

    hoyCercanos.sort((a, b) => {
      const diffHora = horaAMinutos(a.hora) - horaAMinutos(b.hora);
      if (diffHora !== 0) return diffHora;
      return a.distancia - b.distancia;
    });

    if (hoyCercanos.length > 0) {
      return { tipo: "hoy" as const, eventos: hoyCercanos.slice(0, 3) };
    }

    const proximos: EventoCercano[] = [];
    for (const ev of eventos) {
      const totalMinEv = ev.dia * 1440 + ev.mes * 44000 + horaAMinutos(ev.hora);
      const totalMinAhora = dia * 1440 + mes * 44000 + horaMinutos;
      if (totalMinEv <= totalMinAhora) continue;

      const lugar = getLugarByNombre(ev.lugar);
      if (!lugar) continue;

      const distancia = haversine(userPos.lat, userPos.lng, lugar.lat, lugar.lng);
      if (distancia <= RADIO_MAX_KM) {
        proximos.push({ ...ev, distancia });
      }
    }

    proximos.sort((a, b) => a.distancia - b.distancia);
    if (proximos.length > 0) {
      return { tipo: "proximo" as const, eventos: proximos.slice(0, 3) };
    }

    return null;
  }, [userPos]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/60 text-sm">
        <span className="animate-pulse">📍</span>
        <span>Buscando eventos cerca...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-3 px-4 rounded-xl bg-white/10">
        <p className="text-xs text-white/50">
          No se pudo obtener tu ubicación. Actívala en la configuración del navegador.
        </p>
      </div>
    );
  }

  if (!geoState.asked) {
    return (
      <button
        onClick={pedirUbicacion}
        className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">📍</span>
          <span className="text-sm font-semibold text-white">Eventos cerca de ti</span>
        </div>
        <p className="text-[11px] text-white/50">
          Activa tu ubicación para ver qué eventos tienes a menos de 5 km.
        </p>
      </button>
    );
  }

  if (!userPos || !resultado) return null;

  const esHoy = resultado.tipo === "hoy";

  return (
    <div className="mt-4 p-4 rounded-xl bg-white/15 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{esHoy ? "🔥" : "📍"}</span>
        <span className="text-sm font-semibold text-white">
          {esHoy ? "Ahora cerca de ti" : "Próximos cerca de ti"}
        </span>
      </div>
      <div className="space-y-2">
        {resultado.eventos.map((ev) => {
          const cat = categorias.find((c) => c.id === ev.categoria);
          const empiezaMin = horaAMinutos(ev.hora);
          const { horaMinutos: ahoraMin } = ahora();
          const minsRestan = empiezaMin - ahoraMin;

          return (
            <Link
              key={ev.id}
              href={`/dia/${ev.mes === 7 ? "prelaurentis" : ev.dia < 9 ? "portico" : String(ev.dia)}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex-shrink-0 w-10 text-center">
                <span className="block text-xs font-bold text-white">{ev.hora}</span>
                {esHoy && minsRestan > 0 && (
                  <span className="block text-[10px] text-white/60">
                    en {minsRestan}m
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{ev.titulo}</p>
                <p className="text-[10px] text-white/50">
                  {cat?.emoji} {ev.lugar}
                </p>
              </div>
              <span
                className="flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: cat?.color || "#888", color: "white" }}
              >
                {cat?.nombre}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
