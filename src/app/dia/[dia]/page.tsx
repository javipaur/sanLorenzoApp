import { notFound } from "next/navigation";
import Link from "next/link";
import { diasFiesta, eventos } from "@/data/eventos";
import FiltroCategoriasWrapper from "@/components/FiltroCategoriasWrapper";
import FavoritosPanel from "@/components/FavoritosPanel";

interface PageProps {
  params: Promise<{ dia: string }>;
}

export function generateStaticParams() {
  return diasFiesta.map((dia) => ({
    dia: dia.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { dia: diaId } = await params;
  const dia = diasFiesta.find((d) => d.id === diaId);

  if (!dia) {
    return { title: "Día no encontrado" };
  }

  return {
    title: `${dia.nombre} - Fiestas de San Lorenzo 2026`,
    description: `Programa del ${dia.nombre} en las Fiestas de San Lorenzo 2026 en Huesca`,
  };
}

export default async function DiaPage({ params }: PageProps) {
  const { dia: diaId } = await params;
  const dia = diasFiesta.find((d) => d.id === diaId);

  if (!dia) {
    notFound();
  }

  const diaNum = Number(dia.id);
  const isNumericDay = !isNaN(diaNum);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="festival-header text-white py-6 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm mb-3 text-white/80 hover:text-white hover:underline"
          >
            ← Volver al programa
          </Link>
          <div className="flex items-baseline gap-3">
            {isNumericDay ? (
              <span
                className="text-4xl sm:text-5xl font-black leading-none text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {diaNum}
              </span>
            ) : (
              <span className="text-4xl sm:text-5xl">
                {dia.id === "prelaurentis" ? "🎭" : "🎪"}
              </span>
            )}
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isNumericDay ? (dia.nombre.split(" ").slice(1).join(" ") || dia.nombre) : dia.nombre}
              </h1>
              <p className="text-sm text-white/70">
                {dia.fecha} &middot; {dia.eventos.length} eventos
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Timeline */}
          <div>
            <FiltroCategoriasWrapper eventos={dia.eventos} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-4 rounded-xl p-4 bg-white"
              style={{ border: "1px solid var(--color-borde)" }}
            >
        <FavoritosPanel eventos={eventos} />
            </div>
          </aside>
        </div>
      </main>

      {/* Spacer for BottomNav + mobile favorites */}
      <div className="h-32 lg:h-24" />

      {/* Mobile favorites - above BottomNav */}
      <div
        className="lg:hidden fixed left-0 right-0 p-4 bg-white"
        style={{
          bottom: "90px",
          borderTop: "1px solid var(--color-borde)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <FavoritosPanel eventos={eventos} emptyBehavior="hide" />
      </div>
    </div>
  );
}
