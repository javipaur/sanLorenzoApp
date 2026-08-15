import type { Metadata } from "next";
import AbrirFeedback from "@/components/AbrirFeedback";
import { ANIO_FIESTAS, PROXIMO_ANIO_FIESTAS } from "@/lib/fechas";
import { APP_VERSION } from "@/lib/version";

export const metadata: Metadata = {
  title: `¡Gracias! Nos vemos en ${PROXIMO_ANIO_FIESTAS} | Fiestas de San Lorenzo`,
  description: `Las Fiestas de San Lorenzo ${ANIO_FIESTAS} han terminado. Gracias por usar la agenda. Nos vemos en ${PROXIMO_ANIO_FIESTAS}.`,
};

export default function GraciasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Hero ── */}
      <header className="festival-header festival-header-foto text-white py-16 px-4 sm:py-24">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="hero-date-strip mb-6">
            Huesca &middot; San Lorenzo {ANIO_FIESTAS}
          </div>
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¡Gracias!
          </h1>
          <p className="text-sm sm:text-base mt-6 text-white/60 max-w-sm mx-auto leading-relaxed">
            Por vivir las fiestas con la agenda de San Lorenzo {ANIO_FIESTAS}.
          </p>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1">
        <section className="max-w-4xl mx-auto w-full px-4 py-12 sm:py-16 text-center">
          <div
            className="inline-block rounded-2xl px-8 py-6 mb-8"
            style={{
              background:
                "linear-gradient(135deg, var(--color-verde) 0%, var(--color-verde-claro) 100%)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Nos vemos en
            </p>
            <p
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {PROXIMO_ANIO_FIESTAS}
            </p>
          </div>

          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
          >
            La edición de {ANIO_FIESTAS} ha llegado a su fin
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            Gracias por usar la aplicación durante estos días de fiesta.
            Queremos que la próxima edición sea todavía mejor.
          </p>
        </section>

        <section className="section-alt">
          <div className="max-w-4xl mx-auto w-full px-4 py-12 sm:py-16">
            <div className="section-header">
              <div className="section-header-line" />
              <h2 className="section-header-title">¿Tienes una mejora o un aporte?</h2>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-2xl"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              Si has detectado un error, tienes una sugerencia o quieres aportar
              algo para el año que viene, cuéntanoslo: tu mensaje nos llega por
              correo directamente.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AbrirFeedback />
              <a
                href="https://www.fiestassanlorenzo.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold hover:underline"
                style={{ color: "var(--color-verde-oscuro)" }}
              >
                Web oficial de las fiestas
              </a>
            </div>
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
            className="text-base font-bold mb-1"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
          >
            Fiestas de San Lorenzo {ANIO_FIESTAS}
          </p>
          <p className="text-xs mb-4" style={{ color: "var(--color-texto-terciario)" }}>
            Huesca &middot; Nos vemos en {PROXIMO_ANIO_FIESTAS}
          </p>
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
            &copy; {ANIO_FIESTAS}{" "}
            <a
              href="https://javierpalacio.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--color-verde)" }}
            >
              Javier Palacio
            </a>
            {" "}&middot; hecha en Huesca, a ritmo de charanga
          </p>
          <p className="text-[10px] mt-2" style={{ color: "var(--color-texto-terciario)" }}>
            Foto del hero:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Catedral_de_Huesca_con_fuegos_artificiales_durante_las_fiestas_de_San_Lorenzo.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--color-verde)" }}
            >
              Saul Moya
            </a>{" "}
            &middot;{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--color-verde)" }}
            >
              CC BY-SA 4.0
            </a>{" "}
            &middot; Wikimedia Commons
          </p>
          <p className="text-[10px] mt-2" style={{ color: "var(--color-texto-terciario)" }}>
            v{APP_VERSION}
          </p>
        </div>
      </footer>

      {/* Spacer for the feedback FAB */}
      <div className="h-28" />
    </div>
  );
}
