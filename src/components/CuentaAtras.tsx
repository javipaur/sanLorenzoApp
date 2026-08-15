"use client";

import { useEffect, useState } from "react";

const INICIO_FIESTAS = new Date(2026, 7, 9, 0, 0, 0);
const FIN_FIESTAS = new Date(2026, 7, 15, 23, 59, 59);

function diasHasta(fecha: Date): number {
  const ahora = new Date();
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  const destino = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  return Math.round((destino.getTime() - hoy.getTime()) / 86400000);
}

export default function CuentaAtras() {
  const [ahora, setAhora] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setAhora(new Date());
    const timer = setInterval(tick, 60_000);
    const inicial = setTimeout(tick, 0);
    return () => {
      clearInterval(timer);
      clearTimeout(inicial);
    };
  }, []);

  if (!ahora) return null;

  const enFiestas = ahora >= INICIO_FIESTAS && ahora <= FIN_FIESTAS;
  const enPreludio = ahora < INICIO_FIESTAS;

  if (enFiestas) {
    const diaNumero = ahora.getDate() - 8;
    return (
      <div className="cuenta-atras-chips">
        <span className="cuenta-atras-chip">
          {diaNumero >= 7 ? "Último día de las fiestas" : `Día ${diaNumero} de las fiestas`}
        </span>
      </div>
    );
  }

  if (enPreludio) {
    const dias = diasHasta(INICIO_FIESTAS);
    return (
      <div className="cuenta-atras">
        <span className="cuenta-atras-num">{dias}</span>
        <span className="cuenta-atras-text">
          {dias === 1 ? "día para San Lorenzo" : "días para San Lorenzo"}
        </span>
      </div>
    );
  }

  return null;
}
