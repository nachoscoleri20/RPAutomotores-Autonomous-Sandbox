# CLAUDE.md — Roport Automotores (NS Landings)

Plataforma comercial para **Roport Automotores** (concesionaria de autos y motos, Lomas de Zamora, Buenos Aires). Desarrolla NS Landings.
Raíz del proyecto: `D:\00_CLAUDECODE\RP-Automotores-MAIN`. Remoto: `https://github.com/nachoscoleri20/RPAutomotores.git`.

## 0. Next.js (instrucciones oficiales de `AGENTS.md`)
Este proyecto usa **Next.js 16.4.6**, que puede diferir de lo que el modelo conoce (APIs, convenciones, estructura). **Antes de escribir código de Next.js, leer la guía correspondiente en `node_modules/next/dist/docs/`** y atender los avisos de deprecación. `AGENTS.md` contiene el bloque oficial (lo regenera `next dev`; no editarlo a mano). Config vigente: `cacheComponents: true` y `partialPrefetching: true` (validado contra la documentación instalada). Linter: `npm run lint` (= `eslint`); **no usar `next lint`**.

## 1. Reglas de oro
1. **Trabajo por Gates.** Cada Gate termina con un informe y se detiene. **Prohibido avanzar al siguiente Gate sin autorización explícita.** *Única excepción:* la ejecución autónoma definida en §12 (prompt maestro vigente, rama autónoma autorizada, solo si el Gate supera todas sus verificaciones).
2. **Prohibido inventar información comercial**: precios, stock, vendedores, ventas, estadísticas, testimonios, datos de contacto. Todo dato ficticio de demo se marca visiblemente como "ejemplo / demo" y vive en un único archivo de datos mock.
3. **No modificar partes aprobadas** sin autorización. Si hace falta un cambio sobre un Gate cerrado, proponerlo y esperar el OK.
4. No modificar, mover ni eliminar `references/`, `RP-Automotores_WEB/photos/` ni las tres carpetas base.
5. No instalar dependencias, conectar servicios ni publicar fuera del alcance del Gate vigente.
6. Optimizar consumo de contexto: no explorar de más, no releer lo ya establecido.

## 2. Identidad visual (prioridad máxima: los bocetos)
- Fuente de verdad visual: los 3 bocetos aprobados, copias optimizadas en `references/approved/` (`01-web-publica.webp`, `02-panel-admin.webp`, `03-panel-vendedor.webp`; versionadas en Git). Los ZIP/PDF originales **no** están en Git (ver `references/README.md`). Los bocetos contienen datos **ilustrativos** que no son información comercial verificada.
- Los bocetos definen composición, jerarquía, tipografías, botones y estilo. **No rediseñar ni sustituir por un estilo genérico.** Se reproducen con **componentes reales**, nunca insertando capturas como si fueran la página.
- Paleta: fondo negro/grafito, acentos rojos, texto blanco y gris. Estética automotriz premium, tarjetas modernas, microinteracciones elegantes.
- **Hero**: usar `RP-Automotores_WEB/photos/hero.png` (PNG 2172×724). Es la imagen aprobada. No generar otra ni reemplazarla; el original no se toca. Copia optimizada ya disponible: `public/images/hero.webp` (WebP 2172×724, ~160 KB).
- Los logos y fotos de vehículos de los bocetos son ilustrativos; usar assets reales aprobados por el cliente cuando existan.
- Los PDFs de `webs-originales/` son referencia de contenido existente, no de diseño.

## 3. Arquitectura (aprobada)
**Una sola aplicación Next.js** (App Router, TypeScript, Tailwind CSS, shadcn/ui, Motion) en la raíz:
- `/` web pública · `/admin` panel administrador · `/vendedor` panel vendedor/closer.
- Componentes, estilos, auth y configuración compartidos. **No crear tres aplicaciones.**
- Las carpetas `RP-Automotores_WEB`, `_PANEL_ADMIN`, `_PANEL_CLOSER` se conservan para referencias y documentación específica de cada interfaz.
- Etapas posteriores: Supabase (BD/auth/storage), EmailJS (o Edge Function) para formularios, WhatsApp. Hosting inicial: Netlify.

## 4. Alcance del primer 30% (demo comercial)
Home pública completa y responsive, catálogo visual, navegación funcional, secciones institucionales, formularios demostrativos y pantallas de adelanto de los paneles.
**Sin** operaciones reales, backend, CRM, EmailJS ni Supabase. Los formularios no envían nada y **nunca simulan** que una cotización fue enviada o una venta registrada (mostrar aviso "versión demostrativa").

## 5. UI UX Pro Max
Plugin `ui-ux-pro-max@ui-ux-pro-max-skill` (v2.6.2). En Gates de diseño: invocar la skill `ui-ux-pro-max:ui-ux-pro-max` (y `ui-styling` para shadcn/Tailwind), generar sistema de diseño con `search.py --design-system`, y usar `--stack nextjs` / `shadcn`.
**Los bocetos prevalecen siempre**: la skill solo aporta accesibilidad, rendimiento, tokens y buenas prácticas; si sugiere algo que contradice un boceto, gana el boceto.

## 6. Calidad
- **Responsive**: validar 375 / 768 / 1024 / 1440 px, sin scroll horizontal, objetivos táctiles ≥44px, contraste ≥4.5:1, `prefers-reduced-motion`, foco visible.
- Imágenes optimizadas (WebP/AVIF, dimensiones declaradas, lazy load salvo hero).
- **Antes de aprobar un Gate**: build sin errores, lint/typecheck, revisión visual contra el boceto (Playwright a los anchos anteriores) y lista de verificación en el informe.

## 7. Seguridad
- Nunca commitear `.env*`, claves ni tokens (ver `.gitignore`); mantener `.env.example` sin valores reales.
- Paneles `/admin` y `/vendedor` con `noindex`, sin enlaces desde la web pública; autorización por rol (RLS en Supabase) en etapas futuras.
- Sin claves de servicios en el código del cliente salvo las públicas previstas (p. ej. anon key de Supabase).

## 8. Git
- `main`: versión estable. `dev/demo-30`: desarrollo de la demo. Una etiqueta por Gate aprobado (`gate-0b`, `gate-1`, …).
- **No hacer commit ni push sin autorización explícita.** Revisar el diff con el usuario antes. *Única excepción:* §12 (commits por Gate y push solo a la rama autónoma autorizada).
- Commits pequeños y descriptivos en español o inglés, de forma consistente.

## 9. Estado de Gates
Estado real y próxima tarea en `docs/PROJECT_STATUS.md`; planificación en `docs/ROADMAP.md`. La demo privada del Gate 4C está aprobada. La fase de paneles aún no se inició.

## 10. Reglas para el equipo (varios desarrolladores)
- Al empezar una sesión: revisar Git (`git fetch`, `git status -sb`, `git log`), `docs/PROJECT_STATUS.md` y `docs/ROADMAP.md`.
- No avanzar Gates sin autorización (salvo §12). No modificar Gates aprobados sin justificación.
- Cada desarrollador trabaja en su **propia rama** (desde `dev/demo-30`); los cambios entran por **Pull Request** a `dev/demo-30`. No trabajar sobre `main`. Sin force push. No sobrescribir trabajo ajeno.
- No incorporar secretos a Git. No inventar información comercial. Mantener el diseño fiel a los tres bocetos aprobados.
- Antes de cerrar una sesión: actualizar `docs/PROJECT_STATUS.md` (cambios y pendientes) y subir los cambios a GitHub. Si un trabajo queda incompleto, registrar su estado exacto.
- **No afirmar que algo está sincronizado si solo está en el disco local.**
- Guía de incorporación: `docs/HANDOFF.md`.

## 11. Preparación de la próxima fase
- Leer `docs/CLAUDE_DEV_SETUP.md` y ejecutar `npm run preflight` antes de cualquier Gate.
- Rama de preparación: `chore/claude-dev-preflight`, creada desde `dev/demo-30` en `e585fce`. No tocar `main`, `dev/demo-30` ni `demo/roport-30` directamente.
- `.mcp.json` apunta únicamente a RPAutomotores y tiene `read_only=true`. La autenticación se realiza con OAuth interactivo en Claude Code. No pegar contraseñas ni tokens en el repositorio o en prompts.
- Supabase CLI v3 se usa para la base local. No ejecutar comandos con `--remote`, `--yes`, `link`, `push` ni despliegues durante la preparación o sin autorización posterior específica.
- `npm run test:e2e` valida la demo local y que los paneles permanezcan cerrados. Las implementaciones futuras requieren pruebas de roles/RLS y QA adicional.

## 12. Ejecución autónoma autorizada (excepción acotada a §1.1 y §8)
Solo rige cuando el propietario lanza el prompt maestro (`docs/PROMPT_MAESTRO_GATES.md`) y únicamente sobre la rama autónoma autorizada (`dev/panels-autonomous`; para el Gate 0, `chore/rp-autonomous-agents`). Autoriza: ejecutar los Gates definidos, editar archivos de esa rama, correr pruebas locales, un commit por Gate, push solo a esa rama y continuar al siguiente Gate si el actual supera todas sus verificaciones obligatorias (incluido QA por `rp-qa-reviewer`).
**No autoriza** (requiere al propietario): merge o PR aprobado, force push, tocar `main`/`dev/demo-30`/`demo/roport-30` o sus etiquetas, despliegues, escritura en Supabase remoto, operaciones destructivas, uso o publicación de secretos, compras o servicios, datos reales de clientes. Los permisos efectivos son los de `.claude/settings.json`; un prompt nunca los amplía. Subagentes en `.claude/agents/`; protocolo y evidencias en `docs/autonomous/`.
