# Gate 0D — Seguridad y versionado inicial

## npm audit (12 vulnerabilidades: 2 bajas, 10 moderadas; 0 altas/críticas)
- `--omit=dev`: 6 (2 bajas, 4 moderadas).
- **deepmerge** (prototype poisoning, GHSA-gcqx-w48m-w2h4) vía `shadcn` → `@shadcn/registry`. Único "fix" ofrecido: `--force` con `shadcn@1.0.0` (cambio rompiente / retroceso). **No aplicado.**
- **minimatch** (DoS, GHSA-g3hv-75wg-m249) vía `ts-morph`/`@ts-morph/common` (dependencias de la CLI `shadcn`) y vía `@typescript-eslint/*` (solo desarrollo). Arreglable con `npm audit fix` (no ejecutado).
- Evaluación: todo cuelga de herramientas de build (CLI `shadcn`, ESLint). Ningún paquete afectado se importa en código de la app en runtime; `shadcn` solo aporta `shadcn/tailwind.css` en build. Sin impacto previsto en producción, pendiente de decisión sobre actualizar/mover `shadcn` a devDependencies.

## Pendientes antes de publicar
- Decidir sobre `npm audit fix` y mover `shadcn` a `devDependencies`.
- Tokens de color provisorios; PDF comercial faltante; datos reales del cliente sin confirmar.
- Autenticación y RLS (Supabase) pendientes: `noindex` no protege los paneles.

## Versionado
- Primer commit en `main`: `chore: initialize Roport Automotores Next.js foundation` (hash en el informe del Gate 0D).
- Etiqueta: `gate-0c-approved`. Ramas: `main` (estable) y `dev/demo-30` (desarrollo, rama activa).
- Excluidos de Git: ZIP/PDF de `references/`, `node_modules/`, `.next/`, `.env*`.
- Incluidos: código, docs, `public/images/hero.webp` y el original `RP-Automotores_WEB/photos/hero.png` (2 MB).
