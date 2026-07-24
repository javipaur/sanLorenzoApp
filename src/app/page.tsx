import Link from "next/link";
import { diasFiesta } from "@/data/eventos";
import EventosCercanos from "@/components/EventosCercanos";

const diasSemana: Record<number, string> = {
  9: "Domingo",
  10: "Lunes",
  11: "Martes",
  12: "Miércoles",
  13: "Jueves",
  14: "Viernes",
  15: "Sábado",
};

export default function Home() {
  const prelaurentis = diasFiesta.find((d) => d.id === "prelaurentis");
  const portico = diasFiesta.find((d) => d.id === "portico");
  const fiestas = diasFiesta.filter((d) => d.id !== "prelaurentis" && d.id !== "portico");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="festival-header text-white py-14 px-4 sm:py-20">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-4 text-white/80">
            Huesca &middot; Julio - Agosto 2026
          </p>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fiestas de
            <br />
            <span className="text-white">San Lorenzo</span>
          </h1>
          <p className="text-base sm:text-lg mt-6 text-white/75">
            Programa completo &middot; Del 9 de julio al 15 de agosto
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 sm:py-14">

        {/* === PRELAURENTIS === */}
        {prelaurentis && (
          <section className="mb-10">
            <Link href={`/dia/${prelaurentis.id}`} className="group block">
              <div
                className="rounded-xl p-6 sm:p-8 bg-white transition-shadow hover:shadow-md"
                style={{ border: "1px solid var(--color-borde)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                  >
                    {prelaurentis.nombre}
                  </h2>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--color-texto-secundario)" }}>
                  {prelaurentis.fecha} &middot; {prelaurentis.eventos.length} eventos
                </p>
                <p className="text-xs" style={{ color: "var(--color-texto-terciario)" }}>
                  Concursos, exposiciones, música y actos previos a las fiestas.
                </p>
                <span
                  className="inline-block mt-3 text-xs font-semibold group-hover:underline"
                  style={{ color: "var(--color-verde-oscuro)" }}
                >
                  Ver programa →
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* === PÓRTICO LAURENTINO === */}
        {portico && (
          <section className="mb-10">
            <Link href={`/dia/${portico.id}`} className="group block">
              <div
                className="rounded-xl p-6 sm:p-8 bg-white transition-shadow hover:shadow-md"
                style={{ border: "1px solid var(--color-borde)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🐂</span>
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
                  >
                    {portico.nombre}
                  </h2>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--color-texto-secundario)" }}>
                  {portico.fecha} &middot; {portico.eventos.length} eventos
                </p>
                <p className="text-xs" style={{ color: "var(--color-texto-terciario)" }}>
                  Deportes, tradiciones, Pan de San Lorenzo y la Novillada.
                </p>
                <span
                  className="inline-block mt-3 text-xs font-semibold group-hover:underline"
                  style={{ color: "var(--color-verde-oscuro)" }}
                >
                  Ver programa →
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* === FIESTAS 9-15 === */}
        <section>
          <h2
            className="text-xl sm:text-2xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-texto)",
            }}
          >
            📅 Fiestas de San Lorenzo
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {fiestas.map((dia) => {
              const diaNum = Number(dia.id);
              const nombreDia = diasSemana[diaNum] || "";

              return (
                <Link
                  key={dia.id}
                  href={`/dia/${dia.id}`}
                  className="dia-card block rounded-xl p-5 sm:p-6 bg-white"
                  style={{ border: "1px solid var(--color-borde)" }}
                >
                  <span
                    className="block text-4xl sm:text-5xl font-black leading-none"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-verde)",
                    }}
                  >
                    {diaNum}
                  </span>
                  <span
                    className="block text-sm font-semibold mt-1"
                    style={{ color: "var(--color-texto)" }}
                  >
                    {nombreDia}
                  </span>
                  <span
                    className="block text-xs mt-3"
                    style={{ color: "var(--color-texto-terciario)" }}
                  >
                    {dia.eventos.length} eventos
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Nearby events */}
        <section className="mt-10">
          <EventosCercanos />
        </section>

        {/* Features */}
        <section
          className="mt-12 rounded-xl p-6 sm:p-8 bg-white"
          style={{ border: "1px solid var(--color-borde)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-verde)",
                }}
              >
                ⭐
              </div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-texto)" }}>
                Favoritos
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--color-texto-secundario)" }}>
                Marca los eventos que no te quieres perder
              </p>
            </div>
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-verde)",
                }}
              >
                🔍
              </div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-texto)" }}>
                Filtrar
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--color-texto-secundario)" }}>
                Busca por categoría: música, tradición, infantil
              </p>
            </div>
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-verde)",
                }}
              >
                🗺️
              </div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-texto)" }}>
                Cómo llegar
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--color-texto-secundario)" }}>
                Abre la ubicación directamente en el mapa
              </p>
            </div>
            <div>
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-verde)",
                }}
              >
                📲
              </div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-texto)" }}>
                Instalable
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--color-texto-secundario)" }}>
                Añade la app a tu pantalla de inicio
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center"
        style={{ borderTop: "1px solid var(--color-borde)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-texto-terciario)" }}>
          Fiestas de San Lorenzo 2026 &middot; Huesca
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--color-texto-terciario)" }}>
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
      </footer>
    </div>
  );
}
