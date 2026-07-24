"use client";

export async function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("SW registrado:", registration);
      return registration;
    } catch (error) {
      console.error("Error al registrar SW:", error);
      return null;
    }
  }
  return null;
}

export async function solicitarPermisoNotificaciones(): Promise<boolean> {
  if (!("Notification" in window)) {
    console.log("Este navegador no soporta notificaciones");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
}

export function enviarNotificacion(titulo: string, opciones?: NotificationOptions) {
  if (Notification.permission === "granted") {
    new Notification(titulo, {
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-192x192.png",
      ...opciones,
    });
  }
}
