# GATE 0 — Configuración de agentes autónomos (informe)

Rama: `chore/rp-autonomous-agents`, creada desde el commit de preflight `6cf4dbc` (verificado: existe, coincide con `origin/chore/claude-dev-preflight`). No se tocaron `main`, `dev/demo-30`, `demo/roport-30` ni etiquetas. No hubo merge. Claude Code 2.1.323.

## 1. Cambios realizados
| Archivo | Cambio |
|---|---|
| `.claude/agents/rp-architect.md` | Nuevo subagente (solo lectura) |
| `.claude/agents/rp-security-reviewer.md` | Nuevo subagente (solo lectura) |
| `.claude/agents/rp-implementer.md` | Nuevo subagente (escritura local) |
| `.claude/agents/rp-qa-reviewer.md` | Nuevo subagente (verifica, no edita) |
| `.claude/settings.json` | Nuevo: permisos del proyecto (allow/ask/deny) |
| `CLAUDE.md` | §1.1, §8 y §10 remiten a la nueva §12; §12 define la excepción acotada de ejecución autónoma |
| `docs/PROMPT_MAESTRO_GATES.md` | Reescrito: orquestación secuencial con subagentes, QA obligatorio, commit/push por Gate, paradas |
| `docs/autonomous/GATE-0-REPORT.md` | Este informe |

`.claude/settings.local.json` (personal, ignorado por Git) no se modificó.

## 2. Agentes: solicitado vs. verificado
Campos admitidos verificados en la documentación oficial (`sub-agents`): `name`, `description`, `tools`, `disallowedTools`, `model`, `effort`, `maxTurns`, `color`, etc. Se usaron IDs completos de modelo, no alias.

| Agente | Modelo solicitado | Modelo verificado | Effort solicitado | Effort verificado | Herramientas verificadas |
|---|---|---|---|---|---|
| rp-architect | `claude-opus-5-5` | **`claude-opus-5-5`** (campo `modelUsage` de una ejecución real con `--agent`) | high | **No verificable** (el agente respondió "no determinable") | Read, Glob, Grep. Sin escritura ni shell (confirmado por el propio agente) |
| rp-security-reviewer | `claude-opus-5-5` | Frontmatter validado; **no ejecutado** | high | No verificado | Definidas: Read, Grep, Glob + 4 herramientas Supabase de lectura; sin shell ni `execute_sql`. No probadas en ejecución |
| rp-implementer | `claude-sonnet-5-5` | Frontmatter validado; **no ejecutado** (no se ejecutan tareas de desarrollo en este Gate) | high | No verificado | Definidas: Read, Grep, Glob, Edit, Write, Bash, PowerShell, context7. Sin Supabase/Stitch/Docs |
| rp-qa-reviewer | `claude-sonnet-5-5` | **`claude-sonnet-5-5`** (ejecución real) | high | **No verificable** | Read, Grep, Glob, Bash, PowerShell, 6 de Playwright; **sin Write/Edit** (confirmado). `git status --short` se ejecutó correctamente |

Hallazgos de validación:
- **Descubrimiento:** el directorio `.claude/agents/` no existía al iniciar esta sesión, por lo que **la sesión actual no los ve** (`Agent type 'rp-architect' not found`). **Hay que reiniciar Claude Code** para delegar a ellos con la herramienta Agent. Con una sesión nueva (`claude -p --agent <nombre>`) sí se descubren y cargan.
- La prueba se hizo con sesiones headless `--agent` (la sesión principal actuando como ese agente), no con una delegación desde la sesión principal. **La delegación sesión principal → subagente no está probada.** Tampoco está probado el cambio automático de modelo en una orquestación real.
- Primer intento: `rp-qa-reviewer` no tenía shell porque en esta máquina se exponen `Bash` y `PowerShell` y solo se había listado `Bash`. Corregido agregando `PowerShell` a `rp-qa-reviewer` y `rp-implementer`, y a la denylist de los agentes de solo lectura.
- Limitación del QA: no se puede impedir por herramientas que un agente con Bash/PowerShell escriba archivos por comandos; la restricción es de instrucción más permisos (`deny` para `Edit`/`Write` y reglas Bash). Es una defensa parcial.
- **Effort:** precedencia documentada: variable `CLAUDE_CODE_EFFORT_LEVEL` > parámetro por invocación > frontmatter > sesión. No hay variable `CLAUDE_CODE_EFFORT_LEVEL` ni `CLAUDE_CODE_SUBAGENT_MODEL` definidas en el entorno (se comprobó), así que nada fuerza un modelo común. Sí existe `CLAUDE_EFFORT` en el entorno de la sesión actual (no es una variable documentada en la precedencia; no se pudo determinar su efecto).
- **Sesión principal:** `~/.claude/settings.json` fija `model: sonnet` y `modelSettings.claude-sonnet-5-5.effortLevel: medium` (se guardó también con `/effort` en esta sesión). **El effort High de la sesión principal no está configurado ni verificado.** Lanzar con `claude --model sonnet --effort high` o `/effort high`.

## 3. Permisos (`.claude/settings.json`)
Mecanismo: reglas por herramienta y operación; orden deny → ask → allow (un deny no admite excepción por un allow más específico). No se usa `bypassPermissions` ni `--dangerously-skip-permissions`.

- **Permitido sin preguntar (Bash):** `npm run preflight|lint|typecheck|build|test:e2e`, `npx playwright test`, Supabase CLI local (`status|start|stop|db reset|db lint|test db|migration new|gen types --local`), `git fetch origin|status|diff|log|add|commit -m`, y `git push [-u] origin` solo a `chore/rp-autonomous-agents` y `dev/panels-autonomous`. Edición y escritura de archivos (los protegidos están en deny). Lecturas MCP de Supabase (tablas, migraciones, advisors, URL, docs).
- **Pide autorización:** instalar/desinstalar dependencias, cualquier otro `npx supabase`, `git checkout|switch|tag|stash`, otros `git commit`, `curl`/`wget`, `WebFetch`, `mcp__supabase__execute_sql` y `query_logs`.
- **Bloqueado (deny):** lectura/escritura de `.env*`; escritura en `references/`, `RP-Automotores_WEB/photos/`, `.mcp.json` y `.claude/settings.json`; `git push` con force/delete/mirror/tags/refspec o a `main`/`master`/`*demo*`; `git merge|rebase|reset --hard|clean|branch -d/-D/-m|commit --amend|tag -d|config|remote`; `gh pr merge|repo|release|api`; Supabase CLI `link|login|db push|db pull|--linked|--remote|--db-url|--yes|functions deploy|secrets|projects|branches|migration up`; `netlify`/`vercel`; `rm -r*`, `rmdir`, `del`; `npm publish`; herramientas MCP de Supabase que escriben o crean ramas/proyectos. Se incluyen espejos `PowerShell(...)` de las reglas críticas.
- **Prueba negativa:** `git merge --abort` fue **denegado** por regla. La edición de `.claude/settings.json` por script fue bloqueada por el clasificador de seguridad y por la regla de denegación propia: es el comportamiento buscado (los agentes no pueden aflojar sus permisos).

Intervención manual / limitaciones conocidas:
1. **Reglas Bash equivalentes para PowerShell (allow) pendientes.** El archivo tiene allow solo para `Bash`; en la herramienta `PowerShell` los comandos de verificación (`npm run ...`, `git add/commit/push`) pedirán confirmación. Las lecturas simples de git sí corren sin preguntar. Para habilitarlo, el propietario debe agregar en `.claude/settings.json` > `permissions.allow` las mismas reglas con prefijo `PowerShell(` en lugar de `Bash(`. No lo apliqué: mi propia regla me impide editar ese archivo.
2. Las reglas Bash por patrón **no son un límite de seguridad completo**: otras formas del mismo comando (por ejemplo `git -C . push`) no coinciden con el patrón. Mitigaciones: autenticación de GitHub y protección de ramas en el servidor (recomendado: activar branch protection en `main`, `dev/demo-30` y `demo/roport-30`) y revisión del propietario.
3. Las `allow` de un `settings.json` compartido requieren que el propietario **confíe en la carpeta** al abrir Claude Code (workspace trust); las `deny` y `ask` aplican de inmediato.
4. El permiso de `Edit`/`Write` abierto permite que un agente modifique `.claude/agents/`; la revisión de diff antes de cada commit debe vigilar cambios en `.claude/`.
5. `git commit` con mensajes de varias líneas (heredoc) puede no coincidir con `git commit -m *` y pedir confirmación.

## 4. Pruebas (rama `chore/rp-autonomous-agents`)
| Verificación | Resultado |
|---|---|
| `npm run preflight` | OK |
| `npm run lint` | OK (sin avisos) |
| `npm run typecheck` | OK |
| `npm run build` | OK, 22 páginas |
| `npm run test:e2e` (Playwright) | 1 de 1 pasó |
| Sintaxis de agentes y `settings.json` | Válidos (frontmatter y JSON parseados) |
| Descubrimiento de agentes | Solo en sesiones nuevas (ver §2) |
| Tarea de solo lectura con `rp-architect` | Ejecutada (headless): Opus 5.5, sin herramientas de escritura |
| Revisión con `rp-qa-reviewer` | Ejecutada (headless): Sonnet 5.5, sin Write/Edit, `git status` OK |
| Inspección de secretos | Sin hallazgos en `.claude/`, `CLAUDE.md` ni el prompt maestro |
| `git diff` | Solo `CLAUDE.md`, `docs/PROMPT_MAESTRO_GATES.md`, `.claude/`, `docs/autonomous/` |

## 5. Riesgos pendientes
- Delegación real sesión principal → subagente y alternancia Opus/Sonnet sin probar hasta reiniciar Claude Code; verificarlo en la primera tarea de la fase y registrar `modelUsage`.
- Effort no verificable por ninguna vía observada; Sonnet de la sesión principal en `medium` hasta ajustarlo.
- Reglas de permisos por patrón: límite parcial (ver §3.2). Sin branch protection en GitHub el único freno son las reglas locales.
- Reglas PowerShell `allow` pendientes (§3.1).
- MCP `nano-banana-2` no conecta (no afecta).
- `CLAUDE.md` y el prompt maestro son instrucciones, no controles técnicos.

## 6. Cómo lanzar la fase autónoma (después de aprobar este Gate)
1. Revisar y hacer merge de este Gate por el propietario (o continuar desde la rama), y aplicar el punto §3.1 si se desea.
2. Cerrar y reiniciar Claude Code en la raíz del proyecto y aceptar la confianza de la carpeta. Comprobar `/agents` (los cuatro `rp-*`) y `/status`.
3. `claude --model sonnet --effort high` (o `/effort high`). No usar `--dangerously-skip-permissions`.
4. Docker abierto y `npx supabase start`. Aprobar el plan de Gates 5A–9.
5. Pegar el bloque de `docs/PROMPT_MAESTRO_GATES.md`. La fase usará la rama `dev/panels-autonomous` (aún no creada).
