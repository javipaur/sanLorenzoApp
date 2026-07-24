"use client";

import { useEffect } from "react";
import { useFavoritos } from "@/lib/favoritos";
import { programarNotificacionesFavoritos } from "@/lib/notificaciones";

export default function NotificacionesInit() {
  const { favoritos } = useFavoritos();

  useEffect(() => {
    if (favoritos.length > 0) {
      programarNotificacionesFavoritos(favoritos);
    }
  }, [favoritos]);

  return null;
}
