# Entorno Claude Code — preparación de fase completa

Estado: rama `chore/claude-dev-preflight` desde `dev/demo-30` (`e585fce`). No hay paneles implementados ni integración de la app con Supabase. La demo privada sigue en su rama y despliegue actuales.

## Arranque local

1. `npm ci` y `npm run preflight`.
2. Abrir Docker Desktop; `npx supabase start` crea una base **local**, aislada del proyecto alojado. `npx supabase status` muestra URL y claves locales; no copiarlas a Git. `npx supabase stop` la detiene.
3. `npx playwright install chromium`, luego `npm run test:e2e`. Ejecutar también `npm run lint`, `npm run typecheck` y `npm run build`.

## Supabase remoto y autenticación humana

El proyecto RPAutomotores tiene referencia `xczwsamkziqqtdmohdjv`. `.mcp.json` limita Claude Code a ese proyecto, en modo lectura y con grupos de herramientas restringidos. Desde la raíz, abrir Claude Code en una terminal y ejecutar `/mcp`; seleccionar `supabase` → `Authenticate`, iniciar sesión en el navegador y escoger la organización que contiene RPAutomotores. Volver a `/mcp` para confirmar conexión y pedir una consulta de solo lectura (por ejemplo, listar tablas). OAuth no necesita contraseña de base ni PAT. Si Claude pide aprobar el servidor del proyecto, revisar la URL y aceptar solo la configuración versionada.

La conexión de la CLI al proyecto alojado **no** se necesita para este preflight. No usar `supabase login`, `link`, operaciones `--remote` ni contraseñas de base para estas pruebas. Rotar en el panel de Supabase la contraseña de base compartida previamente en un chat; hacerlo el propietario y guardar la nueva en un gestor de secretos. No colocarla en archivos, mensajes ni comandos.

## Variables y límites

`.env.example` contiene únicamente nombres de variables para una futura integración. Cuando se autorice un Gate de backend, crear `.env.local` localmente con URL y clave publicable correspondientes al entorno deseado. Nunca poner secret key/service_role en `NEXT_PUBLIC_*`. El preflight actual no requiere `.env.local`.

La CLI v3 apunta a local por defecto. Revisar destino y diff antes de cualquier cambio remoto futuro. Los datos reales, producción, Netlify y la demo privada quedan fuera de las pruebas locales. El MCP remoto de solo lectura no puede aplicar migraciones: implementar y probar migraciones en local, revisar RLS y obtener autorización explícita antes de promoverlas.

## Gate de salida de esta preparación

Registrar versión de CLI, estado de Docker/base local, resultado de preflight, lint, tipos, build y Playwright. OAuth debe figurar como pendiente hasta que el propietario lo complete en Claude Code. Revisar `git diff` antes de solicitar permiso para commit o push; ninguna sincronización se presume por existir archivos locales.

Referencias: [Supabase MCP](https://supabase.com/docs/guides/ai-tools/mcp), [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started), [cambio CLI v3](https://supabase.com/changelog/supabase-cli-v3), [Claude Code MCP](https://code.claude.com/docs/en/mcp), [Playwright](https://playwright.dev/docs/intro).
