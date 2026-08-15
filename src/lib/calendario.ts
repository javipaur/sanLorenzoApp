"use client";

import type { Evento } from "@/types/evento";

const SITIO_URL = "https://fiestassanlorenzo.javierpalacio.es";
const TZID = "Europe/Madrid";
const DURACION_DEFECTO_MS = 2 * 60 * 60 * 1000;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function aFechaLocal(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function aFechaHoraLocal(d: Date): string {
  return `${aFechaLocal(d)}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

function aUTC(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

function escapar(texto: string): string {
  return texto
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function eventoAFecha(evento: Evento): Date | null {
  if (!evento.hora) return null;
  const [h, m] = evento.hora.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  return new Date(evento.anio, evento.mes - 1, evento.dia, h, m);
}

function eventoAFechaFin(evento: Evento, inicio: Date): Date {
  if (evento.todoDia) {
    const diaFin = (evento.diaFin ?? evento.dia) + 1;
    return new Date(
      evento.anioFin ?? evento.anio,
      (evento.mesFin ?? evento.mes) - 1,
      diaFin
    );
  }
  if (evento.horaFin) {
    const [h, m] = evento.horaFin.split(":").map(Number);
    if (!isNaN(h) && !isNaN(m)) {
      return new Date(
        evento.anioFin ?? evento.anio,
        (evento.mesFin ?? evento.mes) - 1,
        evento.diaFin ?? evento.dia,
        h,
        m
      );
    }
  }
  return new Date(inicio.getTime() + DURACION_DEFECTO_MS);
}

function eventoAVEVENT(evento: Evento): string {
  const inicio = eventoAFecha(evento);
  if (!inicio) return "";

  const descripcion = [
    evento.descripcion !== evento.titulo ? escapar(evento.descripcion) : null,
    evento.organizador ? escapar(`Organiza: ${evento.organizador}`) : null,
    escapar(`${SITIO_URL}/dia/${evento.dia}`),
  ]
    .filter(Boolean)
    .join("\\n\\n");

  const fin = eventoAFechaFin(evento, inicio);
  const bloqueFechas = evento.todoDia
    ? `DTSTART;VALUE=DATE:${aFechaLocal(inicio)}\r\nDTEND;VALUE=DATE:${aFechaLocal(fin)}`
    : `DTSTART;TZID=${TZID}:${aFechaHoraLocal(inicio)}\r\nDTEND;TZID=${TZID}:${aFechaHoraLocal(fin)}`;

  return [
    "BEGIN:VEVENT",
    `UID:${evento.id}@fiestassanlorenzo.javierpalacio.es`,
    `DTSTAMP:${aUTC(new Date())}`,
    bloqueFechas,
    `SUMMARY:${escapar(evento.titulo)}`,
    `LOCATION:${escapar(evento.lugar)}`,
    descripcion ? `DESCRIPTION:${descripcion}` : "",
    `URL;VALUE=URI:${SITIO_URL}/dia/${evento.dia}`,
    "END:VEVENT",
  ]
    .filter((linea) => linea.length > 0)
    .join("\r\n");
}

export function crearICS(eventos: Evento[]): string {
  const cuerpo = eventos
    .map(eventoAVEVENT)
    .filter((c) => c.length > 0)
    .join("\r\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fiestas San Lorenzo 2026//Huesca//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    cuerpo,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function descargarICS(contenido: string, nombreArchivo: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([contenido], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}

export function urlGoogleCalendar(evento: Evento): string {
  const inicio = eventoAFecha(evento);
  if (!inicio) return "";
  const fin = eventoAFechaFin(evento, inicio);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: evento.titulo,
    dates: `${aFechaHoraLocal(inicio)}/${aFechaHoraLocal(fin)}`,
    details: [
      evento.descripcion !== evento.titulo ? evento.descripcion : "",
      evento.organizador ? `Organiza: ${evento.organizador}` : "",
      `${SITIO_URL}/dia/${evento.dia}`,
    ]
      .filter(Boolean)
      .join("\n"),
    location: evento.lugar,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function nombreArchivoICS(evento: Evento): string {
  const slug = evento.titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return `san-lorenzo-${slug || evento.id}.ics`;
}
