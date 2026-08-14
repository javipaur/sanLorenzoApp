"use client";

import { trackPostHog } from "@/lib/posthog";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGA4(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // gtag.js solo envía a GA4 las llamadas a gtag('event', ...). Si no está
  // cargado aún, dejamos el evento en dataLayer como fallback.
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  dataLayer.push({ event: eventName, ...params });
}

export function track(eventName: string, params: Record<string, unknown> = {}) {
  trackGA4(eventName, params);
  trackPostHog(eventName, params);
}

export function detectAppMode(): "standalone" | "browser" {
  if (typeof window === "undefined") return "browser";
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return standalone ? "standalone" : "browser";
}

export function setAppMode(appMode: "standalone" | "browser") {
  if (typeof window === "undefined") return;
  const comando = ["set", "user_properties", { app_mode: appMode }] as unknown[];
  if (typeof window.gtag === "function") {
    window.gtag(...comando);
    return;
  }
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  dataLayer.push(comando);
}

export function trackFavorito(eventoId: string, accion: "anadido" | "eliminado") {
  track("favorito", { evento_id: eventoId, accion });
}

export function trackBusqueda(termino: string) {
  const t = termino.trim();
  if (t.length < 2) return;
  track("busqueda", { busqueda: t });
}

export function trackFeedback(accion: "abierto" | "enviado" | "error") {
  track("feedback", { accion });
}
