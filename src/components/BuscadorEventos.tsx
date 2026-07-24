"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { eventos, categorias } from "@/data/eventos";

export default function BuscadorEventos() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resultados = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return eventos
      .filter((e) => {
        const searchable = `${e.titulo} ${e.lugar} ${e.descripcion} ${e.categoria}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return searchable.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  const showResults = focused && query.trim().length >= 2;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-50">🔍</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Buscar eventos, artistas, lugares..."
          className="w-full pl-9 pr-4 py-3 rounded-2xl text-sm font-medium outline-none transition-shadow"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Buscar eventos"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-50 hover:opacity-80"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {showResults && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {resultados.length === 0 ? (
            <p className="px-4 py-5 text-sm text-center" style={{ color: "var(--color-texto-terciario)" }}>
              No se encontraron eventos
            </p>
          ) : (
            <div className="py-1">
              {resultados.map((ev) => {
                const cat = categorias.find((c) => c.id === ev.categoria);
                return (
                  <Link
                    key={ev.id}
                    href={`/dia/${ev.dia}`}
                    onClick={() => { setQuery(""); setFocused(false); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03] transition-colors"
                  >
                    <span className="text-base flex-shrink-0">{cat?.emoji || "📌"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--color-texto)" }}>
                        {ev.titulo}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--color-texto-terciario)" }}>
                        {ev.hora} · {ev.lugar}
                      </p>
                    </div>
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--color-verde)" }}>
                      Día {ev.dia}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
