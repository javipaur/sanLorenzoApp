"use client";

import type { Evento } from "@/types/evento";
import { diasFiesta } from "@/data/eventos";

const NOTIF_PERMISSION_KEY = "sanlorenzo-notif-perm";

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return Promise.resolve("denied");
  }

  if (Notification.permission === "granted") {
    return Promise.resolve("granted");
  }

  if (Notification.permission === "denied") {
    return Promise.resolve("denied");
  }

  return Notification.requestPermission().then((perm) => {
    try {
      localStorage.setItem(NOTIF_PERMISSION_KEY, perm);
    } catch { /* */ }
    return perm;
  });
}

export function shouldAskPermission(): boolean {
  if (typeof window === "undefined") return false;
  if (!("Notification" in window)) return false;
  if (Notification.permission !== "default") return false;
  try {
    return localStorage.getItem(NOTIF_PERMISSION_KEY) === null;
  } catch {
    return false;
  }
}

function eventoFecha(evento: Evento): Date | null {
  if (!evento.hora) return null;
  const [h, m] = evento.hora.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  const d = new Date(evento.anio, evento.mes - 1, evento.dia, h, m);
  return d;
}

const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

function scheduleNotification(evento: Evento, delayMs: number) {
  if (pendingTimers.has(evento.id)) return;

  const timer = setTimeout(() => {
    if (Notification.permission !== "granted") return;
    new Notification(`🎉 ${evento.titulo}`, {
      body: `${evento.hora} · ${evento.lugar}`,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-192x192.png",
      tag: `sanlorenzo-${evento.id}`,
    });
    pendingTimers.delete(evento.id);
  }, delayMs);

  pendingTimers.set(evento.id, timer);
}

export function programarNotificacionEvento(evento: Evento) {
  if (typeof window === "undefined") return;
  if (Notification.permission !== "granted") return;

  const fechaEvento = eventoFecha(evento);
  if (!fechaEvento) return;

  const ahora = new Date();
  const ANTES_MS =
    Number(process.env.NEXT_PUBLIC_NOTIFICATION_TEST_DELAY) || 15 * 60 * 1000;
  const disparo = fechaEvento.getTime() - ANTES_MS;
  const delayMs = disparo - ahora.getTime();

  if (delayMs <= 0) return;

  scheduleNotification(evento, delayMs);
}

export function cancelarNotificacionEvento(eventoId: string) {
  const timer = pendingTimers.get(eventoId);
  if (timer) {
    clearTimeout(timer);
    pendingTimers.delete(eventoId);
  }
}

export function programarNotificacionesFavoritos(favoritosIds: string[]) {
  if (typeof window === "undefined") return;
  if (Notification.permission !== "granted") return;

  for (const dia of diasFiesta) {
    for (const evento of dia.eventos) {
      if (favoritosIds.includes(evento.id)) {
        programarNotificacionEvento(evento);
      }
    }
  }
}
