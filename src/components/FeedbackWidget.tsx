"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackFeedback } from "@/lib/analytics";

type Tipo = "sugerencia" | "mejora" | "error" | "otro";

const TIPOS: { value: Tipo; label: string }[] = [
  { value: "sugerencia", label: "Sugerencia" },
  { value: "mejora", label: "Mejora" },
  { value: "error", label: "Error o incidencia" },
  { value: "otro", label: "Otro" },
];

export default function FeedbackWidget() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");
  const [tipo, setTipo] = useState<Tipo>("sugerencia");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  const esMapa = pathname.startsWith("/mapa");

  useEffect(() => {
    if (abierto) {
      firstFieldRef.current?.focus();
    }
  }, [abierto]);

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

  if (esMapa) return null;

  const abrir = () => {
    setEstado("idle");
    setAbierto(true);
    trackFeedback("abierto");
  };

  const cerrar = () => setAbierto(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mensaje.trim().length < 3) return;
    setEnviando(true);
    setEstado("idle");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          nombre,
          email,
          mensaje,
          url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("feedback_error");
      setTipo("sugerencia");
      setNombre("");
      setEmail("");
      setMensaje("");
      setEstado("ok");
      trackFeedback("enviado");
    } catch {
      setEstado("error");
      trackFeedback("error");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="feedback-fab"
        onClick={abrir}
        aria-label="Enviar feedback o sugerencia"
        title="Feedback"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      {abierto && (
        <div
          className="feedback-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) cerrar();
          }}
        >
          <div
            className="feedback-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2
                  id="feedback-title"
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                >
                  Tu opinión nos ayuda
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--color-texto-terciario)" }}>
                  Cuéntanos qué mejorarías o qué falla en la agenda.
                </p>
              </div>
              <button
                type="button"
                className="feedback-close"
                onClick={cerrar}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {estado === "ok" ? (
              <div className="text-center py-6" aria-live="polite">
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{ background: "rgba(0,122,90,0.1)", color: "var(--color-verde)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-texto)" }}>
                  ¡Gracias! Mensaje enviado.
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-texto-terciario)" }}>
                  Hemos recibido tu feedback.
                </p>
                <button type="button" className="feedback-btn-primary mt-5" onClick={cerrar}>
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="feedback-tipo" className="feedback-label">
                      Tipo
                    </label>
                    <select
                      id="feedback-tipo"
                      ref={firstFieldRef}
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value as Tipo)}
                      className="feedback-input"
                    >
                      {TIPOS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="feedback-nombre" className="feedback-label">
                        Nombre (opcional)
                      </label>
                      <input
                        id="feedback-nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        maxLength={100}
                        placeholder="Tu nombre"
                        className="feedback-input"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="feedback-email" className="feedback-label">
                        Email de contacto (opcional)
                      </label>
                      <input
                        id="feedback-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={200}
                        placeholder="tu@email.com"
                        className="feedback-input"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback-mensaje" className="feedback-label">
                      Mensaje <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="feedback-mensaje"
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      required
                      minLength={3}
                      maxLength={2000}
                      rows={4}
                      placeholder="Describe tu sugerencia o el problema encontrado..."
                      className="feedback-input resize-none"
                    />
                  </div>

                  {estado === "error" && (
                    <p
                      className="text-xs font-semibold"
                      role="alert"
                      style={{ color: "#b91c1c" }}
                    >
                      No se pudo enviar el mensaje. Inténtalo de nuevo.
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button type="button" className="feedback-btn-secondary" onClick={cerrar}>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="feedback-btn-primary"
                      disabled={enviando || mensaje.trim().length < 3}
                    >
                      {enviando ? "Enviando..." : "Enviar feedback"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
