"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DiaFiesta, Evento } from "@/types/evento";

const diasSemana: Record<number, string> = {
  9: "Domingo",
  10: "Lunes",
  11: "Martes",
  12: "Miércoles",
  13: "Jueves",
  14: "Viernes",
  15: "Sábado",
};

function eventoDestacado(evts: Evento[]): Evento | undefined {
  const preferentes = ["tradicional", "taurino", "religioso"];
  return (
    evts.find((e) => e.categoria === "tradicional" && e.momento === "manana") ||
    evts.find((e) => preferentes.includes(e.categoria)) ||
    evts[0]
  );
}

interface AgendaDiasGridProps {
  fiestas: DiaFiesta[];
}

export default function AgendaDiasGrid({ fiestas }: AgendaDiasGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  let visibles = fiestas;
  let terminadas = false;
  let ocultos = false;

  const hoy = new Date();
  const diaHoy = hoy.getDate();
  const mesHoy = hoy.getMonth() + 1;

  if (mounted) {
    const enFiestas = mesHoy === 8 && diaHoy >= 9 && diaHoy <= 15;
    const trasFiestas = mesHoy > 8 || (mesHoy === 8 && diaHoy > 15);

    if (enFiestas) {
      visibles = fiestas.filter((d) => Number(d.id) >= diaHoy);
      ocultos = visibles.length < fiestas.length;
    } else if (trasFiestas) {
      terminadas = true;
    }
  }

  return (
    <section className="section-alt">
      <div className="max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">
        <div className="section-header">
          <div className="section-header-line" />
          <h2 className="section-header-title">Agenda por días</h2>
          <span className="section-header-count">{visibles.length} días</span>
        </div>

        {terminadas && (
          <div
            className="rounded-xl p-4 mb-6 text-sm"
            style={{
              background: "var(--color-verde)",
              color: "white",
            }}
          >
            <p className="font-semibold">
              Las fiestas de 2026 han terminado. ¡Gracias por seguirlas!
            </p>
            <p className="opacity-80 text-xs mt-1">
              Puedes consultar aquí todo el programa del año.
            </p>
          </div>
        )}

        {ocultos && (
          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-texto-terciario)" }}
          >
            Se ocultan los días anteriores a hoy. Elige un día del programa
            para verlo completo.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {visibles.map((dia) => {
            const diaNum = Number(dia.id);
            const nombreDia = diasSemana[diaNum] || "";
            const destacado = eventoDestacado(dia.eventos);
            const horas = dia.eventos.map((e) => e.hora).sort();
            const rangoHoras =
              horas.length > 0 ? `${horas[0]} – ${horas[horas.length - 1]}` : "";
            const esHoy =
              mounted && mesHoy === 8 && Number(dia.id) === diaHoy;

            return (
              <Link
                key={dia.id}
                href={`/dia/${dia.id}`}
                className={`dia-card block rounded-xl p-5 sm:p-6 bg-white ${esHoy ? "dia-card-hoy" : ""}`}
                style={{
                  border: esHoy ? undefined : "1px solid var(--color-borde)",
                }}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="block text-4xl sm:text-5xl font-black leading-none"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-verde)",
                    }}
                  >
                    {diaNum}
                  </span>
                  {esHoy && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: "var(--color-verde)", color: "white" }}
                    >
                      HOY
                    </span>
                  )}
                </div>
                <span
                  className="block text-sm font-semibold mt-1"
                  style={{ color: "var(--color-texto)" }}
                >
                  {nombreDia}
                </span>
                <span
                  className="block text-xs mt-2 tabular-nums"
                  style={{ color: "var(--color-texto-terciario)" }}
                >
                  {rangoHoras} &middot; {dia.eventos.length} eventos
                </span>
                {destacado && (
                  <div className="featured-pill mt-2 block">
                    <span
                      className="font-bold"
                      style={{ color: "var(--color-verde)" }}
                    >
                      {destacado.hora}
                    </span>
                    <span>{destacado.titulo}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
