"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface InstallPWAProps {
  variant?: "hero" | "card";
}

export default function InstallPWA({ variant = "card" }: InstallPWAProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [instalada, setInstalada] = useState(false);
  const [esIOS, setEsIOS] = useState(false);
  const [mostrarAyudaIOS, setMostrarAyudaIOS] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setInstalada(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    queueMicrotask(() => {
      setInstalada(isStandalone);
      setEsIOS(ios);
      setListo(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstalar = async () => {
    if (!deferredPrompt) {
      if (esIOS) setMostrarAyudaIOS((v) => !v);
      return;
    }
    track("pwa_install_click");
    const promptEvent = deferredPrompt;
    setDeferredPrompt(null);
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") {
        setInstalada(true);
      }
    } catch {
      // El navegador puede lanzar el prompt una única vez; sin problema.
    }
  };

  // Esperar a que el listener se registre antes de decidir qué mostrar.
  if (!listo) return null;

  if (instalada) {
    return (
      <p
        className="inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: variant === "hero" ? "rgba(255,255,255,0.9)" : "var(--color-verde)" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        La app ya está instalada en tu dispositivo
      </p>
    );
  }

  const visible = deferredPrompt !== null || esIOS;
  if (!visible) return null;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleInstalar}
        className={
          variant === "hero"
            ? "w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-[var(--color-verde-oscuro)] font-bold text-sm px-5 py-3 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            : "w-full inline-flex items-center justify-center gap-2 rounded-2xl text-white font-bold text-sm px-5 py-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        }
        style={variant === "card" ? { background: "var(--color-verde)" } : undefined}
        aria-label="Instalar la aplicación en tu dispositivo"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Instalar app
      </button>

      {esIOS && mostrarAyudaIOS && (
        <div
          className="mt-3 rounded-xl p-4 text-xs leading-relaxed"
          style={{
            background: "rgba(0,122,90,0.06)",
            border: "1px solid var(--color-borde)",
            color: "var(--color-texto-secundario)",
          }}
          role="note"
        >
          <p className="font-bold mb-1" style={{ color: "var(--color-texto)" }}>
            Cómo instalar en iPhone / iPad
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Toca el botón de compartir
              <span aria-hidden="true"> </span>
              <svg
                className="inline"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </li>
            <li>Desplázate y pulsa &quot;Añadir a pantalla de inicio&quot;.</li>
            <li>Confirma con &quot;Añadir&quot;. La app quedará en tu inicio.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
