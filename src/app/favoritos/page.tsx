"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useFavoritos } from "@/lib/favoritos";
import { eventos } from "@/data/eventos";
import EventoCard from "@/components/EventoCard";

const diasSemana: Record<number, string> = {
  9: "Domingo",
  10: "Lunes",
  11: "Martes",
  12: "Miércoles",
  13: "Jueves",
  14: "Viernes",
  15: "Sábado",
};

const mesLabel: Record<number, string> = {
  7: "julio",
  8: "agosto",
};

export default function FavoritosPage() {
  const { favoritos } = useFavoritos();
  const eventosFavoritos = useMemo(() => {
    return eventos.filter((e) => favoritos.includes(e.id));
  }, [favoritos]);

  const agrupados = useMemo(() => {
    const map = new Map<string, { label: string; eventos: typeof eventosFavoritos }>();

    for (const ev of eventosFavoritos) {
      const key = `${ev.mes}-${ev.dia}`;
      if (!map.has(key)) {
        const diaNum = ev.dia;
        const nombreDia = diasSemana[diaNum] || "";
        const mes = mesLabel[ev.mes] || "";
        map.set(key, {
          label: ev.mes === 8 ? `${nombreDia} ${diaNum} ${mes}` : `Prelaurentis – ${mes}`,
          eventos: [],
        });
      }
      map.get(key)!.eventos.push(ev);
    }

    return Array.from(map.values());
  }, [eventosFavoritos]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="festival-header text-white py-6 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
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
            ⭐ Mis Favoritos
          </h1>
          <p className="text-sm mt-1 text-white/70">
            {eventosFavoritos.length} eventos guardados
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {eventosFavoritos.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-4xl block mb-4">☆</span>
            <p
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
            >
              No tienes favoritos aún
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--color-texto-secundario)" }}>
              Marca los eventos que no te quieres perder con la estrella ★
            </p>
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: "var(--color-verde)" }}
            >
              Explorar programa
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {agrupados.map((grupo) => (
              <section key={grupo.label}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ background: "var(--color-verde)" }}
                  />
                  <h2
                    className="text-sm font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                  >
                    {grupo.label}
                  </h2>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "var(--color-verde)", color: "white" }}
                  >
                    {grupo.eventos.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {grupo.eventos.map((evento) => (
                    <EventoCard key={evento.id} evento={evento} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Spacer for bottom nav */}
      <div className="h-28" />
    </div>
  );
}
