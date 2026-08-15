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
- **Analytics:** Google Analytics 4 (GTM tag en `Analytics.tsx`, helpers en `lib/analytics.ts`). Estadísticas de uso vía GA4 Data API (`@google-analytics/data`) en `/api/stats`. Complemento con PostHog (`posthog-js`, `lib/posthog.ts`): todo evento de `lib/analytics.ts` se envía a GA4 y PostHog vía `track()`. Instalaciones PWA (`pwa_install_prompt`, `pwa_installed`, `pwa_install_click`, `pwa_standalone_use`) se registran solo en `Analytics.tsx` (fuente única, evitando dobles conteos); `InstallPWA.tsx` solo gestiona la UI
- **Feedback:** Formulario + API `/api/feedback` con envío por SMTP (nodemailer)
- **Storage local:** `localStorage` para favoritos (no hay backend de datos)

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
    api/feedback/route.ts   # API de feedback (envía email por SMTP)
    api/stats/route.ts      # API de estadísticas (GA4 Data API)
    info/                   # Página /info (versión, stats, compartir, instalar)
  components/
    EventoCard.tsx           # Tarjeta de evento con botón favorito y compartir
    BotonCalendario.tsx      # Añadir al calendario (Google Calendar + .ics)
    InstallPWA.tsx           # Botón instalar PWA (variant: hero | card)
    SharePanel.tsx           # Compartir (nativo + WhatsApp, Telegram, X, Email, Instagram)
    StatsPanel.tsx           # Panel de estadísticas (consume /api/stats)
    FiltroCategorias.tsx     # Filtros por categoría
    FiltroCategoriasWrapper.tsx  # Wrapper con estado
    FavoritosPanel.tsx       # Panel de eventos favoritos
    FeedbackWidget.tsx       # Botón flotante + formulario de feedback
    CuentaAtras.tsx          # Cuenta atrás del hero (pre-fiestas y durante)
    NoTeLoPierdas.tsx        # Selección editorial diaria "No te lo pierdas"
  data/
    eventos.ts              # Datos de eventos (fuente de verdad)
    destacados.ts           # Destacados editoriales por día (ids referencian eventos.ts)
    zonas.ts                # Zonas y lugares de Huesca para el mapa
  lib/
    favoritos.ts            # Lógica de localStorage
    notificaciones.ts       # Push notifications
    calendario.ts           # Generación ICS y enlaces de Google Calendar
    analytics.ts            # Helpers de tracking (GA4 + PostHog vía track())
    posthog.ts              # Init y helpers de PostHog
    version.ts              # APP_VERSION, APP_NAME, APP_DESCRIPTION, FUENTE_OFICIAL
  types/
    evento.ts               # Tipos TypeScript
    next-pwa.d.ts           # Tipos para next-pwa
public/
  manifest.json             # Manifest PWA
  icons/                    # Iconos PWA (192x192, 512x512)
```

## Analytics, estadísticas y feedback

- Eventos: `pwa_install_prompt`, `pwa_install_click`, `pwa_installed`, `pwa_standalone_use`, `favorito`, `busqueda`, `feedback`, `share`, `calendario` (ver `lib/analytics.ts`). Todos se envían a GA4 y PostHog vía `track()`
- Añadir a calendario: `lib/calendario.ts` genera ICS (client-side, sin backend) y enlaces de Google Calendar. `BotonCalendario.tsx` ofrece popover con Google Calendar (1 evento) y descarga .ics (evento o favoritos completos). Params de `calendario`: `destino` (`google` | `ics`), `eventos`
- PostHog requiere `NEXT_PUBLIC_POSTHOG_KEY` y opcionalmente `NEXT_PUBLIC_POSTHOG_HOST` (ver `.env.local.example`). Sin ellas solo funciona GA4
- Feedback requiere variables SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `FEEDBACK_TO` (ver `.env.local.example`)
- El envío de email solo ocurre en la ruta API (server-side). El widget usa `fetch` a `/api/feedback`
- `/api/stats` consulta la GA4 Data API con `@google-analytics/data` y requiere: `GA_PROPERTY_ID` y credenciales de service account (`GA_CREDENTIALS_JSON_B64` en base64, o `GA_CLIENT_EMAIL` + `GA_PRIVATE_KEY`, o `GOOGLE_APPLICATION_CREDENTIALS`). Sin credenciales responde `configurado: false` y el panel muestra un aviso
- La versión mostrada en `/info` y el footer sale de `lib/version.ts` (usa `NEXT_PUBLIC_APP_VERSION`, por defecto `0.1.0`)

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
