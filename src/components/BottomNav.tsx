"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/conciertos", label: "Música", icon: "🎵" },
  { href: "/favoritos", label: "Favoritos", icon: "☆", iconActive: "★" },
  { href: "/mapa", label: "Mapa", icon: "🗺️" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

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
                {isActive && item.iconActive ? item.iconActive : item.icon}
              </span>
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
