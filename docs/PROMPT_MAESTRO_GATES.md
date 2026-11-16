# Prompt maestro para Claude Code — fase completa (ejecución autónoma con subagentes)

Pegá el texto siguiente únicamente después de revisar y aprobar el plan de Gates. Al pegarlo, el propietario otorga la autorización acotada descrita en `CLAUDE.md` §12 y en el texto. Un prompt no amplía permisos técnicos: los permisos efectivos son los de `.claude/settings.json` (ver `docs/autonomous/GATE-0-REPORT.md`).

Requisitos previos (propietario): sesión principal iniciada con `claude --model sonnet --effort high`; subagentes `rp-*` visibles en `/agents` (reiniciar Claude Code si se crearon con la sesión abierta); `.claude/settings.json` vigente; base local lista (`npx supabase start`, Docker abierto).

```text
Trabajá en RP Automotores. Sos la sesión principal y coordinás; NO hay quinto agente coordinador. Modelo: Sonnet, effort high.

ARRANQUE
1. Leé AGENTS.md, CLAUDE.md (incluida §12), docs/PROJECT_STATUS.md, docs/ROADMAP.md, docs/CLAUDE_DEV_SETUP.md, docs/autonomous/GATE-0-REPORT.md y los tres bocetos de references/approved/.
2. git fetch; verificá HEAD y estado limpio. Creá (si no existe) la rama dev/panels-autonomous desde chore/rp-autonomous-agents (o desde la base que el propietario indique) y trabajá SOLO ahí. No toques main, dev/demo-30, demo/roport-30 ni sus etiquetas.
3. Ejecutá npm run preflight, lint, typecheck, build y test:e2e. Si algo falla, detenete e informá.
4. Confirmá que los subagentes rp-architect, rp-security-reviewer, rp-implementer y rp-qa-reviewer existen (/agents). Si falta alguno, detenete.

AUTORIZACIÓN (válida solo en dev/panels-autonomous)
Podés: ejecutar los Gates definidos en el plan aprobado, editar archivos de esa rama, correr pruebas locales y Supabase CLI local, crear un commit por Gate y hacer push solamente a dev/panels-autonomous, y continuar al siguiente Gate cuando el actual pase TODAS sus verificaciones obligatorias.
NO podés (detenete y pedí al propietario): merge o PR aprobado, force push, modificar ramas protegidas, desplegar, escribir en Supabase remoto (el MCP es read_only), operaciones destructivas, usar o publicar secretos, comprar o contratar servicios, procesar datos reales de clientes, inventar datos comerciales. Si un permiso técnico te lo impide, no lo evadas: informá.

PROTOCOLO POR GATE (secuencial; un Gate a la vez, un agente a la vez)
1. Plan del Gate: alcance, criterios de aceptación, esquema de datos, riesgos, archivos a tocar, pruebas. Registralo en docs/autonomous/gate-<id>.md.
2. rp-architect (Opus): revisión OBLIGATORIA antes de cualquier cambio estructural (modelo de datos, rutas, auth, contratos). Recibís recomendaciones y riesgos; las decisiones comerciales o de producto se escalan al propietario.
3. rp-security-reviewer (Opus): revisión OBLIGATORIA del diseño antes de implementar y del resultado antes de aprobar todo módulo sensible (auth, roles, RLS, sesiones, permisos, datos de clientes, cobranzas). Exigí y registrá las pruebas negativas que enumere. Un veredicto BLOQUEADO detiene el Gate; nunca se acepta una excepción de seguridad.
4. rp-implementer (Sonnet): implementa solo el alcance del Gate y las pruebas, con Supabase local. Sin acceso al remoto.
5. rp-qa-reviewer (Sonnet): revisión OBLIGATORIA antes del commit: diff, preflight, lint, typecheck, build, Playwright 375/768/1024/1440, accesibilidad, consola, regresión de rutas, pruebas RLS/roles. No modifica código; si NO PASA, el implementer corrige y QA repite.
6. Informe del Gate en docs/autonomous/gate-<id>.md con hashes y evidencias (comandos, salidas, veredictos de los agentes, modelo efectivo si es verificable) y actualización de docs/PROJECT_STATUS.md con hechos comprobados.
7. Commit por Gate (mensaje descriptivo, sin secretos) y push únicamente a dev/panels-autonomous. Verificá en GitHub (git ls-remote) y registrá el hash remoto antes de afirmar sincronización.
8. Continuá al siguiente Gate SOLO si todas las verificaciones pasaron.

REGLAS DE ORQUESTACIÓN
- Delegá explícitamente al subagente correspondiente por nombre; la sesión principal no reemplaza las revisiones obligatorias ni se autoaprueba.
- Prohibido el trabajo concurrente: no lances agentes en paralelo que puedan tocar los mismos archivos, Git o la base. Revisiones de solo lectura pueden ser simultáneas únicamente si no hay un implementer activo.
- Usá Opus solo donde corresponde (arquitectura y seguridad) para cuidar la cuota; el resto corre en Sonnet. No uses variables de entorno que fuercen un mismo modelo para todos los subagentes.
- No afirmes que una delegación o un modelo funcionó sin evidencia de la ejecución.
- No alteres, debilites ni saltees tests para obtener un resultado positivo. No saltees Gates dependientes.

CONDICIONES DE PARADA (detenerse, documentar la causa en docs/autonomous/ e informar)
- Cualquier verificación obligatoria que falle y no se corrija dentro del Gate en un intento razonable (tras corregir, se repite QA completo).
- Veredicto BLOQUEADO de seguridad, fuga de datos o de secretos, regresión de la demo aprobada.
- Operación destructiva, cambio en producción o entornos compartidos (Supabase remoto, Netlify, DNS, despliegues, envíos reales de email/WhatsApp).
- Credenciales faltantes (jamás las pidas por chat ni las escribas en el repositorio).
- Decisión humana: datos comerciales (stock, precios, vendedores, testimonios, condiciones, métricas) o de producto, o contradicción con los bocetos.
- Conflicto de Git, rama o permisos que no puedas resolver sin evadir una restricción.

PLAN DE FASE
Gates 5A a 9 según el plan aprobado por el propietario (modelo de datos y RLS; auth/roles; catálogo administrable; interesados y cotizaciones; panel administrador; panel vendedor/CRM; comunicaciones; auditoría, seguridad y QA integral; integración y lanzamiento). Dividí Gates grandes en entregas pequeñas y declará dependencias de datos y decisiones comerciales pendientes. Conservá la demo privada, los bocetos, los componentes aprobados y noindex en /admin y /vendedor.

Al terminar cada Gate informá el resultado y seguí; al terminar la fase (o al detenerte) entregá un informe consolidado con hashes de commit remotos, evidencias, riesgos y pendientes. Antes de producción quedan a cargo del propietario las pruebas manuales de accesibilidad, dispositivos reales y la autorización de lanzamiento.
```
