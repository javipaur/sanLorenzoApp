# AGENTS.md

## Proyecto

Agenda digital de las Fiestas de San Lorenzo 2026 - Huesca. Web en Next.js con:
- Programa diario de eventos (9-15 agosto 2026)
- Favoritos con categorías
- PWA: instalable como app en móvil, acceso directo
- SEO optimizado (SSG)

## Stack tecnológico

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **PWA:** next-pwa
- **Storage local:** `localStorage` para favoritos (no hay backend)

## Comandos

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor producción
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Playwright E2E tests
```

Ejecutar `lint -> typecheck -> build` antes de cada commit.

## Estructura

```
src/
  app/
    layout.tsx              # Layout raíz, metadata, manifest PWA
    page.tsx                # Landing / días de fiestas
    dia/[dia]/page.tsx      # Programa del día (SSG)
  components/
    EventoCard.tsx           # Tarjeta de evento con botón favorito
    FiltroCategorias.tsx     # Filtros por categoría
    FiltroCategoriasWrapper.tsx  # Wrapper con estado
    FavoritosPanel.tsx       # Panel de eventos favoritos
  data/
    eventos.ts              # Datos de eventos (fuente de verdad)
  lib/
    favoritos.ts            # Lógica de localStorage
    notificaciones.ts       # Push notifications
  types/
    evento.ts               # Tipos TypeScript
    next-pwa.d.ts           # Tipos para next-pwa
public/
  manifest.json             # Manifest PWA
  icons/                    # Iconos PWA (192x192, 512x512)
```

## Datos de eventos

- Extraídos de https://www.fiestassanlorenzo.es/programa
- Hardcodeados en `src/data/eventos.ts`
- Categorías: musica, infantil, religioso, tradicional, deportivo, cultural, taurino, otro
- Actualizar al inicio de cada edición de fiestas

## Convenciones

- **Idioma:** Todo en castellano
- **SEO:** Usar `generateMetadata` en cada página
- **Favoritos:** Solo `localStorage`, no sincronizar entre dispositivos
- **Categorías:** Fijas en el código. Añadir nuevas requiere actualizar tipos

## Cuidados

- `generateStaticParams` genera rutas para cada día. Si cambian fechas, actualizar `data/eventos.ts`
- `localStorage` no está disponible en SSR. Usar `useEffect` o guards
- El service worker puede cachear versiones antiguas. Testear con Application > Service Workers
- Next.js 16 usa Turbopack por defecto. La config de next-pwa usa webpack, pero funciona con `turbopack: {}`
