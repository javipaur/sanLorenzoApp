"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FECHA_FIN_FIESTAS } from "@/lib/fechas";

export default function FinFiestasRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/gracias") return;
    if (Date.now() >= FECHA_FIN_FIESTAS.getTime()) {
      router.replace("/gracias");
    }
  }, [pathname, router]);

  return null;
}
