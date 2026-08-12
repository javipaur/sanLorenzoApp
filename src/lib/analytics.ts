"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
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

export function trackFavorito(eventoId: string, accion: "anadido" | "eliminado") {
  trackGA4("favorito", { evento_id: eventoId, accion });
}

export function trackBusqueda(termino: string) {
  const t = termino.trim();
  if (t.length < 2) return;
  trackGA4("busqueda", { busqueda: t });
}

export function trackFeedback(accion: "abierto" | "enviado" | "error") {
  trackGA4("feedback", { accion });
}
