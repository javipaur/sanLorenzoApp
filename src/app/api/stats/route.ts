import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const runtime = "nodejs";

const TTL_CACHE = 5 * 60 * 1000;

let cache: { expira: number; datos: unknown } | null = null;

interface Credenciales {
  client_email?: string;
  private_key?: string;
}

function obtenerCredenciales(): Credenciales | null {
  const b64 = process.env.GA_CREDENTIALS_JSON_B64;
  if (b64) {
    try {
      const json = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
      if (json.client_email && json.private_key) return json;
    } catch {
      return null;
    }
  }
  const email = process.env.GA_CLIENT_EMAIL;
  const key = process.env.GA_PRIVATE_KEY;
  if (email && key) {
    return { client_email: email, private_key: key.replace(/\\n/g, "\n") };
  }
  return null;
}

interface FilaResumen {
  dimensionValues?: { value?: string | null }[] | null;
  metricValues?: { value?: string | null }[] | null;
}

function valorEntero(row: FilaResumen | undefined | null, indiceMetrica: number): number {
  const raw = row?.metricValues?.[indiceMetrica]?.value;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

function fechaISO(diasAtras: number): string {
  const d = new Date();
  d.setDate(d.getDate() - diasAtras);
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID;
  const credenciales = obtenerCredenciales();

  if (!propertyId) {
    return NextResponse.json(
      { configurado: false, error: "GA_PROPERTY_ID no configurado" },
      { status: 200 }
    );
  }

  const ahora = Date.now();
  if (cache && cache.expira > ahora) {
    return NextResponse.json(cache.datos);
  }

  try {
    const client = credenciales
      ? new BetaAnalyticsDataClient({ credentials: credenciales })
      : new BetaAnalyticsDataClient();

    const property = `properties/${propertyId}`;

    const [reporteTotales] = await client.runReport({
      property,
      dateRanges: [{ startDate: fechaISO(7), endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
      ],
    });

    const filaTotales = reporteTotales.rows?.[0];

    const [reporteEventos] = await client.runReport({
      property,
      dateRanges: [{ startDate: fechaISO(30), endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: [
              "favorito",
              "pwa_installed",
              "pwa_standalone_use",
              "busqueda",
              "feedback",
              "share",
            ],
          },
        },
      },
    });

    const conteos: Record<string, number> = {};
    for (const fila of reporteEventos.rows ?? []) {
      const nombre = fila.dimensionValues?.[0]?.value || "";
      conteos[nombre] = valorEntero(fila, 0);
    }

    const datos = {
      configurado: true,
      generado: new Date().toISOString(),
      periodo: {
        usuarios: { desde: fechaISO(7), hasta: fechaISO(0) },
        eventos: { desde: fechaISO(30), hasta: fechaISO(0) },
      },
      metricas: {
        usuarios7d: valorEntero(filaTotales, 0),
        visitas7d: valorEntero(filaTotales, 1),
        sesiones7d: valorEntero(filaTotales, 2),
        favoritos30d: conteos["favorito"] ?? 0,
        instalaciones30d: conteos["pwa_installed"] ?? 0,
        usoStandalone30d: conteos["pwa_standalone_use"] ?? 0,
        busquedas30d: conteos["busqueda"] ?? 0,
        feedback30d: conteos["feedback"] ?? 0,
        compartidos30d: conteos["share"] ?? 0,
      },
    };

    cache = { expira: ahora + TTL_CACHE, datos };
    return NextResponse.json(datos);
  } catch (error) {
    console.error("Error consultando GA4 Data API:", error);
    return NextResponse.json(
      { configurado: true, error: "No se pudieron obtener las estadísticas" },
      { status: 500 }
    );
  }
}
