"use client";

import { Categoria } from "@/types/evento";
import { categorias } from "@/data/eventos";

interface FiltroCategoriasProps {
  seleccionadas: Categoria[];
  onChange: (categorias: Categoria[]) => void;
}

export default function FiltroCategorias({
  seleccionadas,
  onChange,
}: FiltroCategoriasProps) {
  const toggleCategoria = (catId: Categoria) => {
    if (seleccionadas.includes(catId)) {
      onChange(seleccionadas.filter((c) => c !== catId));
    } else {
      onChange([...seleccionadas, catId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {categorias.map((cat) => {
        const activa = seleccionadas.includes(cat.id);
        return (
          <button
            key={cat.id}
            onClick={() => toggleCategoria(cat.id)}
            className={`filter-chip px-3 py-1.5 rounded-full text-xs font-semibold ${
              activa ? "filter-chip-active" : ""
            }`}
            style={
              activa
                ? { backgroundColor: cat.color, color: "white" }
                : {
                    backgroundColor: "var(--color-fondo)",
                    color: "var(--color-texto-secundario)",
                  }
            }
            aria-pressed={activa}
          >
            {cat.emoji} {cat.nombre}
          </button>
        );
      })}
    </div>
  );
}
