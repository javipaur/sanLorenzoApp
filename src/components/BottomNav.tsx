"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function IconHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </svg>
  );
}

function IconMusica() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function IconEstrella({ activo }: { activo: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={activo ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.8l2.8 5.9 6.2.7-4.6 4.3 1.2 6.2L12 16.9l-5.6 3-1.2-6.2L.6 9.4l6.2-.7L12 2.8z" />
    </svg>
  );
}

function IconMapa() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

const items = [
  { href: "/", label: "Inicio", Icon: IconHome },
  { href: "/conciertos", label: "Música", Icon: IconMusica },
  { href: "/favoritos", label: "Favoritos", Icon: IconEstrella },
  { href: "/mapa", label: "Mapa", Icon: IconMapa },
  { href: "/info", label: "Info", Icon: IconInfo },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isMapa = pathname.startsWith("/mapa");
  const esGracias = pathname === "/gracias";

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (isMapa || esGracias) return null;

  return (
    <nav
      className={`bottom-nav ${mounted ? "bottom-nav-visible" : ""}`}
      aria-label="Navegación principal"
    >
      <div className="bottom-nav-pill">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${isActive ? "bottom-nav-item-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="bottom-nav-icon">
                <item.Icon activo={isActive} />
              </span>
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
