"use client";

import { useEffect, useState } from "react";

interface EstadoDiaProps {
  dia: { id: string; dia: number; mes: number; anio: number };
}

export default function EstadoDia({ dia }: EstadoDiaProps) {
  const [estado, setEstado] = useState<"hoy" | "pasado" | null>(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const diaNum = Number(dia.id);
      if (isNaN(diaNum)) return;

      const ahora = new Date();
      const hoy = new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        ahora.getDate()
      );
      const objetivo = new Date(dia.anio, dia.mes - 1, dia.dia);

      if (hoy.getTime() === objetivo.getTime()) setEstado("hoy");
      else if (objetivo.getTime() < hoy.getTime()) setEstado("pasado");
    });
    return () => cancelAnimationFrame(timer);
  }, [dia]);

  if (!estado) return null;

  return (
    <span className={`estado-dia-pill estado-dia-${estado}`}>
      {estado === "hoy" ? "Hoy" : "Día ya pasado"}
    </span>
  );
}
