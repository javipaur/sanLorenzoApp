"use client";

import { useSyncExternalStore } from "react";

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

  const toggleFavorito = (eventoId: string) => {
    const next = favoritos.includes(eventoId)
      ? favoritos.filter((id) => id !== eventoId)
      : [...favoritos, eventoId];
    setFavoritos(next);
  };

  const esFavorito = (eventoId: string) => favoritos.includes(eventoId);

  return { favoritos, toggleFavorito, esFavorito, isLoaded: true };
}
