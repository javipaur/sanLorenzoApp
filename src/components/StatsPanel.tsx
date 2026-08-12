"use client";

import { useEffect, useState } from "react";

interface Metricas {
  usuarios7d: number;
  visitas7d: number;
  sesiones7d: number;
  favoritos30d: number;
  instalaciones30d: number;
  usoStandalone30d: number;
  busquedas30d: number;
  feedback30d: number;
  compartidos30d: number;
}

interface StatsResponse {
  configurado: boolean;
  generado?: string;
  error?: string;
  metricas?: Metricas;
}

interface Tarjeta {
  etiqueta: string;
  icono: string;
  color: string;
  valor: (m: Metricas) => number;
  periodo: string;
}

const tarjetas: Tarjeta[] = [
  {
    etiqueta: "Visitas",
    icono: "👁️",
    color: "#007a5a",
    valor: (m) => m.visitas7d,
    periodo: "últimos 7 días",
  },
  {
    etiqueta: "Usuarios",
    icono: "👥",
    color: "#3b82f6",
    valor: (m) => m.usuarios7d,
    periodo: "últimos 7 días",
  },
  {
    etiqueta: "Sesiones",
    icono: "💬",
    color: "#8b5cf6",
    valor: (m) => m.sesiones7d,
    periodo: "últimos 7 días",
  },
  {
    etiqueta: "Favoritos",
    icono: "⭐",
    color: "#d97706",
    valor: (m) => m.favoritos30d,
    periodo: "últimos 30 días",
  },
  {
    etiqueta: "Instalaciones",
    icono: "📲",
    color: "#059669",
    valor: (m) => m.instalaciones30d,
    periodo: "últimos 30 días",
  },
  {
    etiqueta: "Uso como app",
    icono: "🏠",
    color: "#0ea5e9",
    valor: (m) => m.usoStandalone30d,
    periodo: "últimos 30 días",
  },
  {
    etiqueta: "Búsquedas",
    icono: "🔍",
    color: "#ef4444",
    valor: (m) => m.busquedas30d,
    periodo: "últimos 30 días",
  },
  {
    etiqueta: "Feedback",
    icono: "💡",
    color: "#f97316",
    valor: (m) => m.feedback30d,
    periodo: "últimos 30 días",
  },
  {
    etiqueta: "Compartidos",
    icono: "🔗",
    color: "#64748b",
    valor: (m) => m.compartidos30d,
    periodo: "últimos 30 días",
  },
];

function formatoNumero(n: number): string {
  return n.toLocaleString("es-ES");
}

export default function StatsPanel() {
  const [estado, setEstado] = useState<"cargando" | "ok" | "error" | "no-configurado">(
    "cargando"
  );
  const [datos, setDatos] = useState<StatsResponse | null>(null);
  const [recargando, setRecargando] = useState(false);

  const aplicarResultado = (res: Response, data: StatsResponse) => {
    setDatos(data);
    if (!data.configurado) {
      setEstado("no-configurado");
    } else if (!res.ok || !data.metricas) {
      setEstado("error");
    } else {
      setEstado("ok");
    }
  };

  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        const data = (await res.json()) as StatsResponse;
        if (activo) aplicarResultado(res, data);
      } catch {
        if (activo) setEstado("error");
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  const refrescar = async () => {
    setEstado("cargando");
    setRecargando(true);
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      const data = (await res.json()) as StatsResponse;
      aplicarResultado(res, data);
    } catch {
      setEstado("error");
    }
    setRecargando(false);
  };

  if (estado === "cargando") {
    return (
      <div className="rounded-2xl p-6 text-center" style={{ border: "1px solid var(--color-borde)" }}>
        <p className="text-sm" style={{ color: "var(--color-texto-secundario)" }}>
          Cargando estadísticas...
        </p>
      </div>
    );
  }

  if (estado === "no-configurado") {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ border: "1px solid var(--color-borde)", background: "var(--color-fondo)" }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-texto)" }}>
          Estadísticas no disponibles
        </p>
        <p className="text-xs" style={{ color: "var(--color-texto-terciario)" }}>
          Esta sección se activa cuando la app esté conectada a Google Analytics.
        </p>
      </div>
    );
  }

  if (estado === "error" || !datos?.metricas) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ border: "1px solid var(--color-borde)" }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-texto)" }}>
          No se pudieron cargar las estadísticas
        </p>
        <button
          type="button"
          onClick={refrescar}
          className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
          style={{ background: "var(--color-verde)" }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  const metricas = datos.metricas;
  const generado = datos.generado
    ? new Date(datos.generado).toLocaleString("es-ES", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "";

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tarjetas.map((t) => (
          <div
            key={t.etiqueta}
            className="rounded-2xl p-4 bg-white transition-transform hover:-translate-y-0.5"
            style={{ border: "1px solid var(--color-borde-claro)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                style={{ background: t.color + "18" }}
                aria-hidden="true"
              >
                {t.icono}
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wide"
                style={{ color: t.color }}
              >
                {t.etiqueta}
              </span>
            </div>
            <p
              className="text-2xl font-black tabular-nums leading-none"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
            >
              {formatoNumero(t.valor(metricas))}
            </p>
            <p className="text-[10px] mt-1" style={{ color: "var(--color-texto-terciario)" }}>
              {t.periodo}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        {generado && (
          <p className="text-[10px]" style={{ color: "var(--color-texto-terciario)" }}>
            Actualizado: {generado}
          </p>
        )}
        <button
          type="button"
          onClick={refrescar}
          disabled={recargando}
          className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          style={{
            background: "var(--color-fondo)",
            color: "var(--color-verde-oscuro)",
            border: "1px solid var(--color-borde)",
          }}
        >
          {recargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>
    </div>
  );
}
