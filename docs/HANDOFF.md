# HANDOFF — guía para un nuevo desarrollador

Repositorio: `https://github.com/nachoscoleri20/RPAutomotores.git`. Rama de integración: `dev/demo-30`.

## 1–3. Clonar y levantar el proyecto
```bash
git clone https://github.com/nachoscoleri20/RPAutomotores.git
cd RPAutomotores
git checkout dev/demo-30
node -v        # debe ser 24.15.0 (ver .nvmrc)
npm ci         # instala exactamente lo del package-lock.json
npm run dev    # http://localhost:3000
```
Otros comandos: `npm run build`, `npm run lint` (ESLint directo, **no** `next lint`), `npx tsc --noEmit`, `npm run start`.
No hay variables de entorno todavía. Cuando existan, usar `.env.local` (ignorado por Git) y mantener `.env.example` sin valores.

## 4–5. Qué leer antes de tocar nada
1. `CLAUDE.md` (reglas del proyecto) y `AGENTS.md` (Next.js 16: leer `node_modules/next/dist/docs/` antes de escribir código de Next).
2. `docs/PROJECT_STATUS.md` (estado real) y `docs/ROADMAP.md`.
3. `docs/03-design-system.md` y `docs/04-catalogo-fotos.md`.
4. Bocetos aprobados: `references/approved/` (ver `references/README.md`). Los ZIP/PDF originales no están en Git.

## 6. UI UX Pro Max
Plugin de Claude Code `ui-ux-pro-max@ui-ux-pro-max-skill` (v2.6.2), instalado en el perfil de cada usuario (no viaja con el repo). En una sesión de diseño, pedir que cargue la skill `ui-ux-pro-max:ui-ux-pro-max`. **Los bocetos aprobados mandan** sobre cualquier sugerencia de la skill.

## 7. Consultar el estado actual
```bash
git fetch origin && git status -sb
git log --oneline -10
git tag --list
```
Y leer `docs/PROJECT_STATUS.md`.

## 8. Continuar un Gate pendiente
No empezar un Gate sin autorización del responsable. Si hay trabajo a medias, el estado exacto está en `PROJECT_STATUS.md` (sección "Próxima tarea exacta"). Trabajar en la rama propia (abajo), con capturas de QA en `docs/qa/<gate>/`.

## 9. Guardar avances en GitHub
Cada desarrollador usa **su propia rama** creada desde `dev/demo-30`, por ejemplo `feat/<nombre>-<tema>`:
```bash
git checkout dev/demo-30 && git pull
git checkout -b feat/<nombre>-<tema>
# ...trabajo...
git add <archivos>            # revisar el diff; nunca secretos
git commit -m "feat: descripción"
git push -u origin feat/<nombre>-<tema>
```
Los cambios entran a `dev/demo-30` mediante **Pull Request**. No trabajar sobre `main`, no hacer force push, no sobrescribir trabajo ajeno.

## 10. Dejar el proyecto listo para el siguiente
Antes de cerrar la sesión: ejecutar build, lint y tsc; actualizar `docs/PROJECT_STATUS.md` (qué se hizo, qué falta, en qué estado exacto está lo incompleto); hacer commit y push. **Un cambio que solo está en tu disco no está sincronizado.**
