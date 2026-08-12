"use client";

import { useEffect, useRef, useState } from "react";
import { trackGA4 } from "@/lib/analytics";

interface SharePanelProps {
  titulo: string;
  texto: string;
  url: string;
  variant?: "icon" | "card";
  etiqueta?: string;
}

const canUseNativeShare = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function";

function IconoCompartir() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function SharePanel({
  titulo,
  texto,
  url,
  variant = "icon",
  etiqueta,
}: SharePanelProps) {
  const [abierto, setAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const copyRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (abierto && !canUseNativeShare()) copyRef.current?.focus();
  }, [abierto]);

  const abrir = async () => {
    if (canUseNativeShare()) {
      trackGA4("share", { destino: "nativo" });
      try {
        await navigator.share({ title: titulo, text: texto, url });
      } catch {
        // El usuario canceló el diálogo nativo; sin problema.
      }
      return;
    }
    setAbierto(true);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      trackGA4("share", { destino: "copiar_enlace" });
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin acceso al portapapeles; se ignora.
    }
  };

  const registrar = (destino: string) => () => trackGA4("share", { destino });

  const enlaceWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${texto}\n${url}`)}`;
  const enlaceTelegram = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;
  const enlaceX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
  const enlaceEmail = `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(`${texto}\n${url}`)}`;

  const abrirInstagram = async () => {
    await copiar();
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const opciones = [
    {
      id: "whatsapp",
      nombre: "WhatsApp",
      href: enlaceWhatsApp,
      color: "#25D366",
      onOpen: registrar("whatsapp"),
    },
    {
      id: "telegram",
      nombre: "Telegram",
      href: enlaceTelegram,
      color: "#26A5E4",
      onOpen: registrar("telegram"),
    },
    {
      id: "x",
      nombre: "X (Twitter)",
      href: enlaceX,
      color: "#111111",
      onOpen: registrar("x"),
    },
    {
      id: "email",
      nombre: "Email",
      href: enlaceEmail,
      color: "#8b5cf6",
      onOpen: registrar("email"),
    },
  ];

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={abrir}
          className="share-btn"
          aria-label="Compartir"
          title="Compartir"
        >
          <IconoCompartir />
        </button>
      ) : (
        <button
          type="button"
          onClick={abrir}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl text-white font-bold text-sm px-5 py-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--color-verde)" }}
          aria-label="Compartir"
        >
          <IconoCompartir />
          {etiqueta || "Compartir"}
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
            aria-labelledby="share-title"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2
                  id="share-title"
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                >
                  Compartir
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--color-texto-terciario)" }}>
                  {titulo}
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

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {opciones.map((op) => (
                <a
                  key={op.id}
                  href={op.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={op.onOpen}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    border: "1px solid var(--color-borde-claro)",
                    background: "var(--color-fondo)",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: op.color }}
                    aria-hidden="true"
                  >
                    {op.id === "whatsapp" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                    )}
                    {op.id === "telegram" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    )}
                    {op.id === "x" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                    )}
                    {op.id === "email" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-texto)" }}>
                    {op.nombre}
                  </span>
                </a>
              ))}

              <button
                type="button"
                ref={copyRef}
                onClick={copiar}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--color-texto)" }}>
                  {copiado ? "¡Enlace copiado!" : "Copiar enlace"}
                </span>
              </button>

              <button
                type="button"
                onClick={abrirInstagram}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  border: "1px solid var(--color-borde-claro)",
                  background: "var(--color-fondo)",
                }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--color-texto)" }}>
                  Instagram
                </span>
              </button>
            </div>

            <p className="text-[10px]" style={{ color: "var(--color-texto-terciario)" }}>
              Instagram no permite compartir enlaces web directamente. Al pulsarlo se copia el enlace y se abre Instagram para que lo pegues en una historia o mensaje.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
