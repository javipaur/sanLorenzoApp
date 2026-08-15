import { destacadosPorDia } from "@/data/destacados";
import { eventos } from "@/data/eventos";

interface NoTeLoPierdasProps {
  diaId: string;
}

export default function NoTeLoPierdas({ diaId }: NoTeLoPierdasProps) {
  const picks = destacadosPorDia[diaId];
  if (!picks || picks.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-1 h-6 rounded-full"
          style={{ background: "var(--color-verde-oscuro)" }}
        />
        <h2
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-texto)" }}
        >
          No te lo pierdas
        </h2>
      </div>
      <p className="text-xs mb-3" style={{ color: "var(--color-texto-secundario)" }}>
        Lo que no hay que dejar escapar este día, dicho por quien lo conoce.
      </p>

      <div className="picks-scroll flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {picks.map((pick) => {
          const ev = eventos.find((e) => e.id === pick.eventoId);
          if (!ev) return null;
          return (
            <a
              key={pick.eventoId}
              href={`#evento-${ev.id}`}
              className="picks-card flex-shrink-0 w-64 rounded-xl p-4 bg-white transition-shadow hover:shadow-md focus-visible:outline-none"
              style={{
                border: "1px solid var(--color-borde)",
                textDecoration: "none",
              }}
              aria-label={`Ir al evento: ${ev.titulo}`}
            >
              <p
                className="text-[13px] leading-relaxed mb-2 italic"
                style={{ color: "var(--color-texto)" }}
              >
                {pick.comentario}
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-xs font-bold tabular-nums flex-shrink-0"
                  style={{ color: "var(--color-verde)" }}
                >
                  {ev.hora}
                </span>
                <span
                  className="text-xs font-semibold leading-snug line-clamp-2"
                  style={{ color: "var(--color-texto-secundario)" }}
                >
                  {ev.titulo}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
