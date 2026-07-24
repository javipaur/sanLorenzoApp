"use client";

import { useSyncExternalStore, useCallback } from "react";

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

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
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
}

export function useFavoritos() {
  const favoritos = useSyncExternalStore(subscribe, getSnapshot, () => []);

  const toggleFavorito = useCallback((eventoId: string) => {
    const next = cacheFavoritos.includes(eventoId)
      ? cacheFavoritos.filter((id) => id !== eventoId)
      : [...cacheFavoritos, eventoId];
    setFavoritos(next);
  }, []);

  const esFavorito = useCallback(
    (eventoId: string) => favoritos.includes(eventoId),
    [favoritos]
  );

  return { favoritos, toggleFavorito, esFavorito };
}
