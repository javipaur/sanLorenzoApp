import Link from "next/link";
import { diasFiesta, eventos } from "@/data/eventos";
import EventosCercanos from "@/components/EventosCercanos";
import BuscadorEventos from "@/components/BuscadorEventos";
import { Evento } from "@/types/evento";

const diasSemana: Record<number, string> = {
  9: "Domingo",
  10: "Lunes",
  11: "Martes",
  12: "Miércoles",
  13: "Jueves",
  14: "Viernes",
  15: "Sábado",
};

function eventoDestacado(evts: Evento[]): Evento | undefined {
  const preferentes = ["tradicional", "taurino", "religioso"];
  return (
    evts.find((e) => e.categoria === "tradicional" && e.momento === "manana") ||
    evts.find((e) => preferentes.includes(e.categoria)) ||
    evts[0]
  );
}

function getFaseActual(): string {
  const now = new Date();
  const mes = now.getMonth(); // 0=jan, 7=aug
  const dia = now.getDate();
  if (mes === 6) return "prelaurentis"; // julio
  if (mes === 7 && dia >= 1 && dia <= 8) return "portico"; // 1-8 agosto
  if (mes === 7 && dia >= 9 && dia <= 15) return "fiestas"; // 9-15 agosto
  return "";
}

export default function Home() {
  const prelaurentis = diasFiesta.find((d) => d.id === "prelaurentis");
  const portico = diasFiesta.find((d) => d.id === "portico");
  const fiestas = diasFiesta.filter(
    (d) => d.id !== "prelaurentis" && d.id !== "portico"
  );

  const faseActual = getFaseActual();
  const totalEventos = eventos.length;
  const totalDias = 37;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Hero ── */}
      <header className="festival-header text-white py-14 px-4 sm:py-20">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-4 text-white/80">
            Huesca &middot; Julio – Agosto 2026
          </p>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fiestas de
            <br />
            <span className="text-white">San Lorenzo</span>
          </h1>
          <p className="text-base sm:text-lg mt-4 text-white/75">
            Programa completo · Del 9 de julio al 15 de agosto
          </p>

          {/* Stat badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="hero-stat">
              <span style={{ fontSize: "1rem" }}>🎉</span>
              {totalEventos}+ eventos
            </span>
            <span className="hero-stat">
              <span style={{ fontSize: "1rem" }}>📅</span>
              {totalDias} días
            </span>
            <span className="hero-stat">
              <span style={{ fontSize: "1rem" }}>📍</span>
              15 zonas
            </span>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto">
            <BuscadorEventos />
          </div>

          <div className="mt-6 max-w-sm mx-auto">
            <EventosCercanos />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1">

        {/* === TIMELINE: Las 3 fases === */}
        <section className="max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">
          <h2
            className="text-xl sm:text-2xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
          >
            El programa en 3 fases
          </h2>

          <div className="phase-timeline">
            {/* Prelaurentis */}
            {prelaurentis && (
              <div className={`phase-node ${faseActual === "prelaurentis" ? "phase-node-active" : ""}`}>
                <Link href={`/dia/${prelaurentis.id}`} className="group block">
                  <div
                    className="rounded-xl p-5 sm:p-6 bg-white transition-shadow hover:shadow-md"
                    style={{ border: "1px solid var(--color-borde)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🎉</span>
                      <h3
                        className="text-lg sm:text-xl font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                      >
                        {prelaurentis.nombre}
                      </h3>
                      {faseActual === "prelaurentis" && (
                        <span className="phase-badge">Ahora</span>
                      )}
                    </div>
                    <p className="text-sm mb-2" style={{ color: "var(--color-texto-secundario)" }}>
                      {prelaurentis.fecha} · {prelaurentis.eventos.length} eventos
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {prelaurentis.eventos.slice(0, 2).map((e) => (
                        <span key={e.id} className="featured-pill">
                          {e.hora} {e.titulo}
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-xs font-semibold group-hover:underline"
                      style={{ color: "var(--color-verde-oscuro)" }}
                    >
                      Ver programa →
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Pórtico */}
            {portico && (
              <div className={`phase-node ${faseActual === "portico" ? "phase-node-active" : ""}`}>
                <Link href={`/dia/${portico.id}`} className="group block">
                  <div
                    className="rounded-xl p-5 sm:p-6 bg-white transition-shadow hover:shadow-md"
                    style={{ border: "1px solid var(--color-borde)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🐂</span>
                      <h3
                        className="text-lg sm:text-xl font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                      >
                        {portico.nombre}
                      </h3>
                      {faseActual === "portico" && (
                        <span className="phase-badge">Ahora</span>
                      )}
                    </div>
                    <p className="text-sm mb-2" style={{ color: "var(--color-texto-secundario)" }}>
                      {portico.fecha} · {portico.eventos.length} eventos
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {portico.eventos.slice(0, 2).map((e) => (
                        <span key={e.id} className="featured-pill">
                          {e.hora} {e.titulo}
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-xs font-semibold group-hover:underline"
                      style={{ color: "var(--color-verde-oscuro)" }}
                    >
                      Ver programa →
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Fiestas */}
            <div className={`phase-node ${faseActual === "fiestas" ? "phase-node-active" : ""}`}>
              <div
                className="rounded-xl p-5 sm:p-6"
                style={{ background: "var(--color-verde)", color: "white" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🔥</span>
                  <h3
                    className="text-lg sm:text-xl font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Fiestas de San Lorenzo
                  </h3>
                  {faseActual === "fiestas" && (
                    <span className="phase-badge phase-badge-light">Ahora</span>
                  )}
                </div>
                <p className="text-sm opacity-80 mb-1">
                  9 – 15 agosto · {fiestas.reduce((s, d) => s + d.eventos.length, 0)}+ eventos
                </p>
                <p className="text-xs opacity-60">
                  La semana grande: música, tradiciones, toros, procession...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === GRID DE DÍAS === */}
        <section className="section-alt">
          <div className="max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
              >
                📅 Agenda por días
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {fiestas.map((dia) => {
                const diaNum = Number(dia.id);
                const nombreDia = diasSemana[diaNum] || "";
                const destacado = eventoDestacado(dia.eventos);
                const horas = dia.eventos.map((e) => e.hora).sort();
                const rangoHoras = horas.length > 0 ? `${horas[0]} – ${horas[horas.length - 1]}` : "";
                const esHoy = faseActual === "fiestas" && new Date().getDate() === diaNum;

                return (
                  <Link
                    key={dia.id}
                    href={`/dia/${dia.id}`}
                    className="dia-card block rounded-xl p-5 sm:p-6 bg-white"
                    style={{
                      border: esHoy
                        ? "2px solid var(--color-verde)"
                        : "1px solid var(--color-borde)",
                    }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className="block text-4xl sm:text-5xl font-black leading-none"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-verde)" }}
                      >
                        {diaNum}
                      </span>
                      {esHoy && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--color-verde)", color: "white" }}>
                          HOY
                        </span>
                      )}
                    </div>
                    <span
                      className="block text-sm font-semibold mt-1"
                      style={{ color: "var(--color-texto)" }}
                    >
                      {nombreDia}
                    </span>
                    <span
                      className="block text-xs mt-2 tabular-nums"
                      style={{ color: "var(--color-texto-terciario)" }}
                    >
                      {rangoHoras} · {dia.eventos.length} eventos
                    </span>
                    {destacado && (
                      <div className="featured-pill mt-2 block">
                        <span className="font-bold" style={{ color: "var(--color-verde)" }}>{destacado.hora}</span>
                        <span>{destacado.titulo}</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* === MAPA === */}
        <section>
          <div className="max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">
            <Link
              href="/mapa"
              className="group block rounded-xl p-6 sm:p-8 transition-all hover:shadow-md"
              style={{
                border: "1px solid var(--color-borde)",
                background: "linear-gradient(135deg, rgba(0,122,90,0.04) 0%, rgba(62,167,109,0.08) 100%)",
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span
                  className="text-4xl flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,122,90,0.1)" }}
                >
                  🗺️
                </span>
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                  >
                    Explora el mapa
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-texto-secundario)" }}>
                    15 zonas de Huesca con colores diferenciados. Descubre los espacios de las fiestas y localiza eventos por barrios.
                  </p>
                  <span
                    className="inline-block mt-2 text-xs font-semibold group-hover:underline"
                    style={{ color: "var(--color-verde-oscuro)" }}
                  >
                    Abrir mapa interactivo →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* === MÚSICA === */}
        <section className="section-alt">
          <div className="max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
              >
                🎵 Programación Musical
              </h2>
              <Link
                href="/conciertos"
                className="text-xs font-semibold hover:underline"
                style={{ color: "var(--color-verde-oscuro)" }}
              >
                Ver todo →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Conciertos */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-verde)" }} />
                  <h3 className="text-sm font-bold" style={{ color: "var(--color-texto)" }}>
                    🎤 Conciertos
                  </h3>
                </div>
                <div className="space-y-2">
                  {eventos
                    .filter((e) => e.categoria === "musica")
                    .filter((e) =>
                      e.titulo.toLowerCase().includes("concierto") ||
                      e.titulo.toLowerCase().includes("nil moliner") ||
                      e.titulo.toLowerCase().includes("nacha pop") ||
                      e.titulo.toLowerCase().includes("fangoria") ||
                      e.titulo.toLowerCase().includes("andrés campo") ||
                      e.titulo.toLowerCase().includes("deltó") ||
                      e.titulo.toLowerCase().includes("salsa punk")
                    )
                    .slice(0, 3)
                    .map((ev) => (
                      <Link
                        key={ev.id}
                        href={`/dia/${String(ev.dia)}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white transition-all hover:shadow-sm"
                        style={{ border: "1px solid var(--color-borde)" }}
                      >
                        <div className="flex-shrink-0 w-10 text-right">
                          <span
                            className="block text-xs font-bold tabular-nums"
                            style={{ color: "var(--color-verde)" }}
                          >
                            {ev.hora}
                          </span>
                          <span className="block text-[10px]" style={{ color: "var(--color-texto-terciario)" }}>
                            Día {ev.dia}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold leading-snug truncate" style={{ color: "var(--color-texto)" }}>
                            {ev.titulo}
                          </h4>
                          <p className="text-[10px] truncate" style={{ color: "var(--color-texto-terciario)" }}>
                            📍 {ev.lugar}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Orquestas y Verbenas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: "#8b5cf6" }} />
                  <h3 className="text-sm font-bold" style={{ color: "var(--color-texto)" }}>
                    🪗 Orquestas y Verbenas
                  </h3>
                </div>
                <div className="space-y-2">
                  {eventos
                    .filter((e) => e.categoria === "musica")
                    .filter((e) =>
                      e.titulo.toLowerCase().includes("verbena") ||
                      e.titulo.toLowerCase().includes("orquesta")
                    )
                    .filter((e, i, arr) =>
                      arr.findIndex((x) => x.titulo === e.titulo) === i
                    )
                    .slice(0, 3)
                    .map((ev) => (
                      <Link
                        key={ev.id}
                        href={`/dia/${String(ev.dia)}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white transition-all hover:shadow-sm"
                        style={{ border: "1px solid var(--color-borde)" }}
                      >
                        <div className="flex-shrink-0 w-10 text-right">
                          <span className="block text-xs font-bold tabular-nums" style={{ color: "#8b5cf6" }}>
                            {ev.hora}
                          </span>
                          <span className="block text-[10px]" style={{ color: "var(--color-texto-terciario)" }}>
                            Día {ev.dia}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold leading-snug truncate" style={{ color: "var(--color-texto)" }}>
                            {ev.titulo}
                          </h4>
                          <p className="text-[10px] truncate" style={{ color: "var(--color-texto-terciario)" }}>
                            📍 {ev.lugar}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <Link
              href="/conciertos"
              className="mt-6 block text-center py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-sm"
              style={{
                border: "1px solid var(--color-borde)",
                background: "white",
                color: "var(--color-verde-oscuro)",
              }}
            >
              Ver los 118 eventos musicales →
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-10 px-4 text-center"
        style={{ borderTop: "1px solid var(--color-borde)", background: "var(--color-fondo)" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-base font-bold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
          >
            Fiestas de San Lorenzo 2026
          </p>
          <p className="text-xs mb-4" style={{ color: "var(--color-texto-terciario)" }}>
            Huesca · Del 9 de julio al 15 de agosto
          </p>
          <div className="flex justify-center gap-4 text-xs mb-4">
            <Link href="/" className="hover:underline" style={{ color: "var(--color-verde)" }}>
              Inicio
            </Link>
            <Link href="/mapa" className="hover:underline" style={{ color: "var(--color-verde)" }}>
              Mapa
            </Link>
            <a
              href="https://www.fiestassanlorenzo.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--color-verde)" }}
            >
              Web oficial
            </a>
          </div>
          <p className="text-[10px]" style={{ color: "var(--color-texto-terciario)" }}>
            Datos de{" "}
            <a
              href="https://www.fiestassanlorenzo.es"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--color-verde)" }}
            >
              fiestassanlorenzo.es
            </a>
          </p>
          <p
            className="text-xs mt-4 text-center text-pretty"
            style={{ color: "var(--color-texto-terciario)" }}
          >
            © 2026{" "}
            <a
              href="https://javierpalacio.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--color-verde)" }}
            >
              Javier Palacio
            </a>
            . Hecho con{" "}
            <svg
              className="size-3.5 text-red-500 inline"
              aria-label="amor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033l.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185l-.048.041l-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082l-7.493-7.422a6 6 0 0 1 3.176-10.215z" />
            </svg>
            en Huesca
          </p>
        </div>
      </footer>

      {/* Spacer for bottom nav */}
      <div className="h-28" />
    </div>
  );
}
