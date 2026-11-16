# Plan propuesto — Gate 0C (scaffold Next.js)

**Problema:** la raíz ya contiene `references/`, `docs/`, `CLAUDE.md`, `.gitignore`, `.git` y las tres carpetas; `create-next-app` rechaza o puede pisar directorios no vacíos.

**Procedimiento seguro (sin sobrescribir):**
1. Verificar `git status` limpio de cambios inesperados y backup (copia de `references/` y `RP-Automotores_WEB/photos/` fuera del repo).
2. Generar el scaffold en una carpeta temporal fuera del proyecto: `npx create-next-app@latest <tmp>/rp-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack?` (opciones a confirmar).
3. Revisar el contenido generado y copiarlo a la raíz **archivo por archivo**, sin sobrescribir nada existente (`.gitignore` y `README` se fusionan a mano).
4. `npm install` en la raíz; fijar Node en `.nvmrc`/`engines` (Node 24 local).
5. Inicializar shadcn/ui (`npx shadcn@latest init`), instalar `motion` y los componentes base mínimos (button, card, input, dialog…).
6. Crear estructura de rutas vacía: `src/app/(public)`, `src/app/admin`, `src/app/vendedor` con `noindex` en los dos paneles, y `src/lib/mock-data.ts` marcado como demo.
7. Definir tokens (negro/grafito/rojo, tipografías) con apoyo de UI UX Pro Max, tomando los colores y fuentes de los bocetos.
8. Optimizar el hero a `public/` (sin tocar el original).
9. Verificar: `npm run build`, lint, typecheck, arranque en dev.
10. Crear `.env.example` vacío. Sin servicios externos.

**Fuera de alcance de 0C:** componentes visuales de la home (Gate 1), Supabase, EmailJS, WhatsApp.

**Git:** crear `dev/demo-30` y primer commit solo con autorización.

**Decisiones pendientes del usuario:** gestor de paquetes (npm propuesto), Turbopack sí/no, `src/` sí/no, fuentes definitivas.
