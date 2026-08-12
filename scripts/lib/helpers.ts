import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

import type { Categoria, Momento } from "../../src/types/evento";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export interface BorradorEvento {
  id: string;
  fuente: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  horaInicio?: string;
  horaFin?: string;
  lugar: string;
  direccion?: string;
  categoria: Categoria;
  momento?: Momento;
  organizador?: string;
  precio?: string;
  url?: string;
  urlOrigen: string;
  imagen?: string;
  etiquetas: string[];
}

export async function fetchUrl(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} al obtener ${url}`);
  }
  return res.text();
}

export async function fetchCached(url: string, cacheDir: string): Promise<string> {
  fs.mkdirSync(cacheDir, { recursive: true });
  const key = createHash("sha1").update(url).digest("hex");
  const file = path.join(cacheDir, `${key}.html`);
  if (fs.existsSync(file)) {
    const stat = fs.statSync(file);
    if (Date.now() - stat.mtimeMs < CACHE_TTL_MS) {
      return fs.readFileSync(file, "utf-8");
    }
  }
  const text = await fetchUrl(url);
  fs.writeFileSync(file, text, "utf-8");
  return text;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    const chunkResults = await Promise.all(chunk.map((item) => fn(item)));
    results.push(...chunkResults);
  }
  return results;
}

const ENTIDADES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&iacute;": "í",
  "&aacute;": "á",
  "&eacute;": "é",
  "&oacute;": "ó",
  "&uacute;": "ú",
  "&ntilde;": "ñ",
  "&uuml;": "ü",
  "&auml;": "ä",
  "&ouml;": "ö",
  "&middot;": "·",
  "&ndash;": "–",
  "&mdash;": "—",
};

function decodificarEntidades(texto: string): string {
  let out = texto;
  for (const [k, v] of Object.entries(ENTIDADES)) {
    out = out.split(k).join(v);
  }
  out = out.replace(/&#(\d+);/g, (_, n) => {
    try {
      return String.fromCodePoint(Number(n));
    } catch {
      return "";
    }
  });
  return out;
}

export function stripHtml(html: string): string {
  return decodificarEntidades(html)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function limpiarTexto(texto: string): string {
  return decodificarEntidades(texto).replace(/\s+/g, " ").trim();
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function fechaISO(anio: number, mes: number, dia: number): string {
  return `${pad2(anio)}-${pad2(mes)}-${pad2(dia)}`;
}

const MESES_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function parseFechaDDMMYYYY(texto: string): string | undefined {
  const m = texto.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/);
  if (!m) return undefined;
  return fechaISO(Number(m[3]), Number(m[2]), Number(m[1]));
}

export function parseFechaES(texto: string): string | undefined {
  const m = texto.match(/(\d{1,2})\s+([a-záéíóúñ]+)\s+(\d{4})/i);
  if (!m) return undefined;
  const mes = MESES_ES.findIndex((nombre) =>
    nombre.toLowerCase().startsWith(m[2].toLowerCase())
  );
  if (mes < 0) return undefined;
  return fechaISO(Number(m[3]), mes + 1, Number(m[1]));
}

export function parseFechaICS(texto: string): { fecha: string; hora?: string } | undefined {
  const m = texto.match(/(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2}))?/);
  if (!m) return undefined;
  const fecha = fechaISO(Number(m[1]), Number(m[2]), Number(m[3]));
  if (!m[4]) return { fecha };
  return { fecha, hora: `${m[4]}:${m[5]}` };
}

export function horaNormalizada(texto: string): string | undefined {
  const m = texto.match(/(\d{1,2}):(\d{2})/);
  if (!m) return undefined;
  return `${pad2(Number(m[1]))}:${m[2]}`;
}

export function mapMomento(hora?: string): Momento | undefined {
  if (!hora) return undefined;
  const h = Number(hora.split(":")[0]);
  if (Number.isNaN(h)) return undefined;
  if (h < 14) return "manana";
  if (h < 20) return "tarde";
  return "noche";
}

export function categoriaDeClaves(mapeo: Record<string, Categoria>, claves: string[]): Categoria {
  for (const clave of claves) {
    const normalizada = clave.trim().toLowerCase();
    if (mapeo[normalizada]) return mapeo[normalizada];
  }
  return "otro";
}

export function slug(id: string): string {
  return (
    id
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "evento"
  );
}
