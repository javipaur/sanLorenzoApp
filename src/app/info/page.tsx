import Link from "next/link";
import {
  APP_NAME,
  APP_DESCRIPTION,
  APP_VERSION,
  FUENTE_OFICIAL,
} from "@/lib/version";
import StatsPanel from "@/components/StatsPanel";
import SharePanel from "@/components/SharePanel";
import InstallPWA from "@/components/InstallPWA";

export const SITIO_URL = "https://fiestassanlorenzo.javierpalacio.es";

export default function InfoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="festival-header text-white py-6 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm mb-3 text-white/80 hover:text-white hover:underline"
          >
            &larr; Volver al programa
          </Link>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Información
          </h1>
          <p className="text-sm mt-1 text-white/60">Sobre la app y las fiestas</p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-8">
        {/* Sobre la app */}
        <section>
          <div
            className="rounded-2xl p-6 sm:p-7 bg-white"
            style={{ border: "1px solid var(--color-borde)" }}
          >
            <h2
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
            >
              {APP_NAME}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-texto-secundario)" }}>
              {APP_DESCRIPTION}. Agenda oficial con el programa diario, favoritos con
              avisos, mapa de zonas y programación musical, disponible como app
              instalable.
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div
                className="rounded-xl p-3"
                style={{ background: "var(--color-fondo)" }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--color-texto-terciario)" }}>
                  Versión
                </dt>
                <dd className="font-bold mt-0.5" style={{ color: "var(--color-texto)" }}>
                  v{APP_VERSION}
                </dd>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ background: "var(--color-fondo)" }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--color-texto-terciario)" }}>
                  Fechas
                </dt>
                <dd className="font-bold mt-0.5" style={{ color: "var(--color-texto)" }}>
                  9 – 15 agosto 2026
                </dd>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ background: "var(--color-fondo)" }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--color-texto-terciario)" }}>
                  Fuente
                </dt>
                <dd className="font-bold mt-0.5" style={{ color: "var(--color-texto)" }}>
                  <a
                    href={FUENTE_OFICIAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: "var(--color-verde-oscuro)" }}
                  >
                    fiestassanlorenzo.es
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Instalar */}
        <section>
          <div className="section-header" style={{ marginBottom: "0.75rem" }}>
            <div className="section-header-line" />
            <h2 className="section-header-title">Instalar la app</h2>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--color-texto-secundario)" }}>
            Instala la agenda en tu dispositivo para tener acceso directo desde el
            inicio, sin navegador.
          </p>
          <InstallPWA variant="card" />
        </section>

        {/* Compartir */}
        <section>
          <div className="section-header" style={{ marginBottom: "0.75rem" }}>
            <div className="section-header-line" />
            <h2 className="section-header-title">Compartir la app</h2>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--color-texto-secundario)" }}>
            Comparte la agenda con tus amigos por WhatsApp, Telegram, redes sociales o
            email.
          </p>
          <SharePanel
            variant="card"
            etiqueta="Compartir app"
            titulo="Fiestas de San Lorenzo 2026"
            texto="Mira el programa completo de las Fiestas de San Lorenzo 2026 en Huesca"
            url={SITIO_URL}
          />
        </section>

        {/* Estadísticas */}
        <section>
          <div className="section-header" style={{ marginBottom: "0.75rem" }}>
            <div className="section-header-line" />
            <h2 className="section-header-title">Estadísticas de uso</h2>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--color-texto-secundario)" }}>
            Datos agregados de uso de la app durante las fiestas.
          </p>
          <StatsPanel />
        </section>

        {/* Feedback */}
        <section>
          <div className="section-header" style={{ marginBottom: "0.75rem" }}>
            <div className="section-header-line" />
            <h2 className="section-header-title">Tu opinión cuenta</h2>
          </div>
          <p className="text-xs mb-3" style={{ color: "var(--color-texto-secundario)" }}>
            ¿Encontraste un error o tienes una sugerencia? El botón flotante de
            feedback te permite avisarnos directamente.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ background: "var(--color-verde)" }}
          >
            Enviar feedback
          </Link>
        </section>

        {/* Créditos */}
        <section>
          <div
            className="rounded-2xl p-6 text-center"
            style={{ border: "1px solid var(--color-borde)", background: "var(--color-fondo)" }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-texto-secundario)" }}>
              Datos extraídos de{" "}
              <a
                href={FUENTE_OFICIAL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--color-verde)" }}
              >
                fiestassanlorenzo.es
              </a>
              . App desarrollada por{" "}
              <a
                href="https://javierpalacio.es"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--color-verde)" }}
              >
                Javier Palacio
              </a>
              .
            </p>
            <p className="text-[10px] mt-2" style={{ color: "var(--color-texto-terciario)" }}>
              v{APP_VERSION} &middot; &copy; 2026
            </p>
          </div>
        </section>
      </main>

      {/* Spacer for bottom nav */}
      <div className="h-28" />
    </div>
  );
}
