"use client";

import { useSyncExternalStore, useCallback } from "react";
import { trackFavorito } from "@/lib/analytics";

const FAVORITOS_KEY = "sanlorenzo-favoritos";

function leerFavoritos(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

let cacheFavoritos: string[] = [];
let cacheLoaded = false;
const snapshotServer: string[] = [];
const listeners: Set<() => void> = new Set();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  if (!cacheLoaded) {
    cacheFavoritos = leerFavoritos();
    cacheLoaded = true;
  }
  return cacheFavoritos;
}

function setFavoritos(next: string[]) {
  cacheFavoritos = next;
  try {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable
  }
  emitChange();
}

export function useFavoritos() {
  const favoritos = useSyncExternalStore(subscribe, getSnapshot, () => snapshotServer);

  const toggleFavorito = useCallback((eventoId: string) => {
    const anadido = !cacheFavoritos.includes(eventoId);
    const next = anadido
      ? [...cacheFavoritos, eventoId]
      : cacheFavoritos.filter((id) => id !== eventoId);
    setFavoritos(next);
    trackFavorito(eventoId, anadido ? "anadido" : "eliminado");
  }, []);

  const esFavorito = useCallback(
    (eventoId: string) => favoritos.includes(eventoId),
    [favoritos]
  );

  const tieneFavoritos = favoritos.length > 0;

  const tieneFavoritosEn = useCallback(
    (eventos: { id: string }[]) => eventos.some((e) => favoritos.includes(e.id)),
    [favoritos]
  );

  return { favoritos, toggleFavorito, esFavorito, tieneFavoritos, tieneFavoritosEn };
}
