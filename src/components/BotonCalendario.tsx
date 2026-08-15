"use client";

import { useEffect, useState } from "react";
import type { Evento } from "@/types/evento";
import { crearICS, descargarICS, urlGoogleCalendar, nombreArchivoICS } from "@/lib/calendario";
import { track } from "@/lib/analytics";

interface BotonCalendarioProps {
  evento?: Evento;
  eventos?: Evento[];
  variant?: "icon" | "boton";
  etiqueta?: string;
}

function IconoCalendario({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export default function BotonCalendario({
  evento,
  eventos = [],
  variant = "icon",
  etiqueta,
}: BotonCalendarioProps) {
  const [abierto, setAbierto] = useState(false);
  const lista = evento ? [evento] : eventos;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    if (abierto) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const descargar = () => {
    if (lista.length === 0) return;
    const archivo = evento ? nombreArchivoICS(evento) : "favoritos-san-lorenzo-2026.ics";
    descargarICS(crearICS(lista), archivo);
    track("calendario", { destino: "ics", eventos: lista.length });
    setAbierto(false);
  };

  const abrirGoogle = () => {
    if (!evento) return;
    window.open(urlGoogleCalendar(evento), "_blank", "noopener,noreferrer");
    track("calendario", { destino: "google", eventos: 1 });
    setAbierto(false);
  };

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="share-btn"
          aria-label="Añadir al calendario"
          title="Añadir al calendario"
        >
          <IconoCalendario />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl text-white font-bold text-sm px-5 py-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--color-verde)" }}
        >
          <IconoCalendario />
          {etiqueta || "Añadir al calendario"}
        </button>
      )}

      {abierto && (
        <div
          className="feedback-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAbierto(false);
          }}
        >
          <div
            className="feedback-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendario-titulo"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2
                  id="calendario-titulo"
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                >
                  Añadir al calendario
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--color-texto-terciario)" }}>
                  {evento
                    ? `${evento.titulo} · ${evento.hora}`
                    : `${lista.length} eventos de tus favoritos`}
                </p>
              </div>
              <button
                type="button"
                className="feedback-close"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {evento && (
                <button
                  type="button"
                  onClick={abrirGoogle}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    border: "1px solid var(--color-borde-claro)",
                    background: "var(--color-fondo)",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: "#4285F4" }}
                    aria-hidden="true"
                  >
                    <IconoCalendario />
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-texto)" }}>
                    Google Calendar
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={descargar}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  border: "1px solid var(--color-borde-claro)",
                  background: "var(--color-fondo)",
                }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "var(--color-verde)" }}
                  aria-hidden="true"
                >
                  <IconoCalendario />
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--color-texto)" }}>
                  {evento
                    ? "Descargar archivo (.ics)"
                    : `Descargar archivo (.ics, ${lista.length} eventos)`}
                </span>
              </button>
            </div>

            <p className="text-[10px] mt-3" style={{ color: "var(--color-texto-terciario)" }}>
              El archivo .ics se abrirá en tu app de calendario (iOS, Android, Outlook o Apple).
            </p>
          </div>
        </div>
      )}
    </>
  );
}
