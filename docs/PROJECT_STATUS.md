# PROJECT_STATUS — Roport Automotores

> Actualizar este archivo al terminar cada sesión de trabajo. No registrar avances que no existan en el código.

- **Última actualización:** 2026-11-13
- **Rama de integración:** `dev/demo-30` (la rama `main` solo tiene la base del Gate 0C y no debe tocarse)
- **Último Gate aprobado y subido a GitHub:** Gate 4C, etiqueta `gate-4c-approved` → commit desplegado `0f03925` (**demo privada de ~30 %** en `https://rpautomotores-demo.netlify.app/`, rama `demo/roport-30`, proyecto Private). No implica web pública definitiva, backend ni paneles terminados.
- **Gate actual:** ninguno en curso. **Gate 4C aprobado como despliegue privado.** Siguiente etapa sin iniciar: decidir lanzamiento público y fase completa (Supabase, paneles, etc.), con autorización explícita.
- **Preparación local de la fase completa:** rama `chore/claude-dev-preflight` desde `e585fce`, con CLI Supabase v3, configuración local, MCP de proyecto en solo lectura, Playwright y documentación de arranque. Sin implementación de paneles ni cambios remotos. Ver `docs/CLAUDE_DEV_SETUP.md`; OAuth en Claude Code y rotación de la contraseña previamente compartida requieren acción del propietario. Verificación local: preflight, lint, typecheck, build y Playwright (1/1) pasaron; Supabase local arrancó, Postgres 17.11 respondió una consulta y la API local devolvió HTTP 200. No se usaron credenciales alojadas.
- **Etiquetas existentes:** `gate-0c-approved`, `gate-1a-approved`, `gate-1b-approved`, `gate-1c-1-approved`, `team-handoff-01`, `gate-1c-2-approved`, `gate-2-approved`, `gate-3-approved`, `gate-4ab-approved`, `gate-4c-prepared`, `gate-4c-approved`.

## Qué está desarrollado (verificado en el código)
- Base técnica: Next.js 16.4.6 (App Router, Turbopack, `cacheComponents` y `partialPrefetching` activos), React 19.3, TypeScript, Tailwind 4, shadcn/ui (`base-nova`). Node 24.15.0 (`.nvmrc`).
- Design system (`src/app/globals.css`, `docs/03-design-system.md`): tokens negro/grafito/rojo, Montserrat (titulares) e Inter (cuerpo).
- Home pública completa (`/`): header sticky con menú móvil, hero con `public/images/hero.webp`, franja de beneficios, catálogo destacado de 8 motos, soluciones integrales, marcas, banda de financiación y footer.
- Animaciones (Gate 2): entrada del hero en CSS, revelados al hacer scroll (Motion `inView`), smooth scroll Lenis solo en desktop, parallax sutil del hero (≥1280 px), estados de header, tarjetas y botones. Respeta `prefers-reduced-motion` y funciona sin JavaScript.
- Rutas `/admin` y `/vendedor`: **solo placeholders** con `noindex, nofollow`. Sin datos ni autenticación.
- Pantallas de adelanto: `/adelanto/[slug]` (catalogo, planes-de-ahorro, servicios, nosotros, contacto, cotizar) y `/adelanto/cotizar/[vehiculo]` (muestra el modelo elegido).

## Qué está pendiente de la home
Gate 4C: publicación de la demo (checklist en `docs/qa/gate-4/README.md`).

## Gate 4C — demo privada en Netlify (aprobada)
- `netlify.toml` mínimo (build `npm run build`, publish `.next`; adaptador OpenNext automático, sin versión fijada). Compatibilidad con Next 16.4.6 inferida de la documentación de Netlify ("última estable", Cache Components con soporte completo): **se confirma con el primer deploy**.
- `/admin` y `/vendedor` responden **HTTP 404** salvo `ENABLE_PANELS=true` (solo local); el código se conserva (`src/lib/demo.ts`).
- Cabeceras en `next.config.ts`: nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, HSTS, `X-Robots-Tag: noindex, nofollow` y CSP (solo producción, con `'unsafe-inline'` por Next.js; sin violaciones con Motion, Lenis y todas las rutas).
- Estrategia propuesta de rama demo `demo/roport-30` (no creada). Netlify Free: sin contraseña; solo proyecto **Private** (dueño del equipo). `noindex` no restringe el acceso.
- Procedimiento de despliegue, rollback y checklist: `docs/06-netlify-deployment.md`. Sin URL de Netlify (no existe).

### Evidencia del smoke test autenticado (Gate 4C)
Realizado por el propietario desde una sesión autorizada de Netlify sobre `https://rpautomotores-demo.netlify.app/` (commit publicado según Netlify `0f03925e0b8c343b16d1c76f15d4bdb182a5ab63`, rama `demo/roport-30`): 15 rutas comerciales HTTP 200; `/admin` y `/vendedor` HTTP 404; meta robots `noindex, nofollow`; `X-Robots-Tag: noindex, nofollow`; CSP presente; `X-Content-Type-Options: nosniff`; HSTS presente. El acceso anónimo devuelve HTTP 401 (protección Private de Netlify; confirmado también desde este entorno). Capturas de producción desktop y mobile revisadas y aprobadas por NS Landings. Animaciones, navegación y compilación se verificaron antes en local. Este entorno no pudo repetir las pruebas autenticadas (no se eludió la protección).

### Pendientes tras el Gate 4C
- LCP móvil simulado de Lighthouse por encima de 2,5 s (3,47 s en local).
- Sin pruebas con lector de pantalla ni en dispositivos móviles físicos.
- Logo y fotografías definitivas pendientes (logo y fotos de motos provisorios).
- Datos comerciales pendientes de validación (teléfonos, correos, dirección, Instagram, marcas).
- Revisar el sistema completo antes del lanzamiento definitivo y repetir pruebas reales cuando el sitio se haga público (Lighthouse, cabeceras, accesibilidad).
- La demo debe seguir **Private**; `noindex` no restringe el acceso.

## Gate 4A+4B — QA final (aprobado)
- Lighthouse en producción local (antes → después): Accesibilidad 95–96 → **100** en las pantallas de adelanto (home ya 100); Performance móvil de la home 90 → 91 (LCP simulado 3,55 → 3,47 s; TBT 122 → 55 ms; CLS 0); escritorio 99 con LCP 0,88 s. LCP con throttling real de móvil: 2,87 → 1,68 s. SEO 100 → 63 **a propósito** (`noindex`).
- Foto del hero en dos tamaños (`hero-1300.webp` = misma foto reducida, para pantallas chicas; `hero.webp` original en anchos grandes) mediante `srcset` en `src/components/site/hero-image.tsx` (Client Component a propósito). **Aprobado expresamente por NS Landings como excepción documentada a la regla del Gate 2 ("usar exclusivamente hero.webp")**: es una versión reducida del mismo recurso, no un cambio de diseño; no revertir.
- Accesibilidad: axe-core sin violaciones en las 15 rutas (390 y 1440 px); logo con nombre accesible correcto; heading-order del catálogo; contraste de "Paso N"; breadcrumb móvil con separador final; enlaces del footer y de Contacto más grandes (footer: 36 px móvil / 28 px escritorio).
- Defecto del Gate 1C-2 corregido: el botón de la banda de financiación quedaba recortado en móvil (≤ ~380 px) y entre 1024 y 1100 px.
- `noindex, nofollow` en todo el sitio (señal para buscadores, no protección).
- Sin errores de consola ni de hidratación (producción y dev), sin peticiones POST ni a dominios externos, 0 vulnerabilidades de producción.
- **Registrado:** el LCP móvil simulado de Lighthouse (3,47 s) todavía supera los 2,5 s. Las pruebas automáticas no sustituyen una auditoría con lector de pantalla ni pruebas en dispositivos reales.
- **No probado**: lector de pantalla real, dispositivos táctiles reales, datos de campo (INP).
- Checklist de publicación en Netlify: `docs/qa/gate-4/README.md` (sección 11).

## Gate 3 — demo navegable (aprobado)
- Pantallas de adelanto rediseñadas con un marco común (`src/components/adelanto/`): ruta de navegación, aviso "versión demostrativa", salidas a inicio y catálogo, footer. `/adelanto/catalogo` (8 modelos), `/planes-de-ahorro`, `/servicios`, `/nosotros`, `/contacto`, `/cotizar` (elegir modelo + proceso) y `/cotizar/[vehiculo]` (resumen del modelo + formulario demostrativo).
- Contenido comercial solo de las webs originales (Webnode y Netlify): planes de ahorro ("a la deriva"), financiación sujeta a evaluación, servicios, descripción de la empresa y marcas mencionadas (sin implicar representación oficial). Sin precios, cuotas, plazos ni condiciones inventadas.
- Cotización demostrativa: casillas de tipo de consulta + vista previa de ejemplo; **sin datos personales, sin `<form>`, sin envío, sin almacenamiento**; botón deshabilitado y aviso permanente "No se realizó ninguna solicitud".
- CTAs: "Cotizar por WhatsApp" → "Solicitar cotización" (header, menú móvil, hero), con ícono neutro. Los textos que ya describían su comportamiento no se tocaron.
- Header: en `/adelanto/cotizar*` ningún ítem de navegación queda activo (antes marcaba "Inicio").
- `HomeMotion` ya no quita `data-reveal-ready` al desmontarse: evita que el failsafe de 4 s desactive los revelados al volver a la home desde `/adelanto`. El footer admite `animated={false}` para rutas sin controlador.
- **Restauración del scroll**: al volver atrás desde una cotización se recupera la posición exacta (probado con rueda/Lenis, movimiento reducido y clic real: 1200→1200, 1676→1676, 1000→1000). La "limitación" anotada tras el Gate 2 era un artefacto de la prueba (el scroll automático de Playwright antes de cada clic); no hubo cambios de código.
- Aprobado: pantallas de adelanto completas, cotización demostrativa funcional sin envíos, regresión de animaciones corregida, restauración del scroll verificada y revisión visual aprobada.
- Pendientes (sin cambios de diseño por ahora): mejorar el salto de línea del breadcrumb en mobile; auditoría integral de accesibilidad; medición Lighthouse; logo y fotografías oficiales; confirmación de los datos comerciales; publicación de la demo.
- Limitaciones: las fichas siguen sin precios, especificaciones ni stock; el footer de la home (Gate 1C-2) conserva enlaces de contacto de ~19 px de alto (en las pantallas de adelanto nuevas sí son ≥44 px).

## Gate 2 — animaciones (aprobado)
Librerías nuevas con versión exacta: `motion` 14.7.1 y `lenis` 1.3.27 (GSAP no usado). Verificado: build, lint y tsc OK; 5 anchos sin scroll horizontal ni imágenes rotas; estado final con las mismas dimensiones que las capturas del Gate 1C-2 (diferencias de píxeles ≤0,13 %, solo antialiasing de texto); consola sin errores ni avisos de hidratación (dev y producción); teclado, skip link, menú móvil, movimiento reducido, sin JavaScript y JS bloqueado (failsafe 4 s) probados. 

## Gate 1C-2 (aprobado)
Soluciones integrales, fila de marcas, banda "Financiación y entrega a tu medida" (botón "Solicitar asesoramiento" → `/adelanto/cotizar`) y footer con datos de contacto. Verificado: build, lint y tsc OK; 5 anchos sin scroll horizontal ni imágenes rotas; tabulación en orden lógico con foco visible; consola sin errores.

## Información comercial pendiente de confirmación (antes de producción)
Publicada en las webs originales, **no confirmada por el cliente** (`src/lib/brands.ts`):
- Dirección: Manuel Acevedo 83, Lomas de Zamora.
- Teléfonos: 11 2243-9190 (Webnode) y 11 6663-1989 (Netlify). Se muestran ambos; falta definir cuál es el principal.
- Correos: roport.adm@gmail.com y roportautomotores@gmail.com. Se muestran ambos; falta definir el principal.
- Instagram: @rp_automotor.
- Marcas Fiat, Renault, Volkswagen y Peugeot (mencionadas en la web institucional original): se muestran como texto y **no** implican que Roport sea concesionario oficial; confirmar la redacción y si se usan logos.

## Qué es solo demostrativo
- Todos los botones de cotización/consulta llevan a pantallas de adelanto que avisan que no se envía nada. No hay WhatsApp, EmailJS ni Supabase conectados.
- El logo es una **recreación provisoria** con texto y CSS (`src/components/site/logo.tsx`), no el oficial.
- Navegación: "Catálogo", "Planes de ahorro", "Servicios", "Nosotros" y "Contacto" llevan a pantallas de adelanto.

## Problemas y limitaciones conocidos
- **Fotos de motos provisionales y de baja resolución** (170–240 px): recortes de una captura de la web original (la PDF no contiene las fotos sueltas). Zanella ZB usa placeholder porque su foto original está dañada. Ver `docs/04-catalogo-fotos.md`.
- Falta el logo vectorial oficial, los datos de contacto confirmados, las marcas confirmadas y las fotos originales del cliente.
- El PDF comercial no está disponible.
- Los bocetos contienen datos **ilustrativos** (precios, métricas, nombres, contactos): no son información comercial verificada.
- `npm audit`: 12 vulnerabilidades (2 bajas, 10 moderadas, 0 altas/críticas) en herramientas de desarrollo; 0 en producción (`--omit=dev`). Sin corregir a propósito (el único arreglo automático es rompiente).
- Los degradados/luces rojas del boceto 01 están simplificados (el Gate 2 solo agregó una luz roja de baja intensidad en el hero y la luz/barrido de la banda de financiación).
- Accesibilidad: auditoría automática (axe, Lighthouse) y de teclado hecha en el Gate 4; **falta** una prueba con lector de pantalla y dispositivos reales.
- No se ha publicado nada (Netlify sin configurar).

## Pruebas realizadas
`npm run build`, `npm run lint` y `npx tsc --noEmit` pasan. Capturas con Playwright a 320, 390, 768, 1024 y 1440 px en `docs/qa/gate-1b/`, `docs/qa/gate-1c-1/`, `docs/qa/gate-1c-2/` y `docs/qa/gate-2/` (incluye video de la entrada). Sin scroll horizontal, sin errores de consola en carga normal, navegación de tarjetas y menú móvil probados.

## Decisiones técnicas relevantes
- **Una sola app Next.js** con `/`, `/admin`, `/vendedor` (no tres aplicaciones).
- `shadcn` en `devDependencies`; `cn` como utilidad de clases (paquete `cn`).
- Con Cache Components, `params` se lee dentro de `<Suspense>` y no se usa `export const dynamicParams`.
- Datos de vehículos en `src/lib/vehicles.ts`, con forma pensada para una futura tabla de Supabase.
- `references/` está ignorado en Git salvo `README.md` y `approved/`.
- Animaciones: los componentes de la home siguen siendo de servidor; un único controlador cliente (`HomeMotion`). Estados ocultos de revelado solo con la clase `rp-anim` (script inline previo al pintado) para no ocultar contenido sin JS. Ver `docs/05-animation-system.md`.

## Próxima tarea exacta
Esperar autorización del Gate 4 (QA final y publicación de la demo). Pendientes para producción: logo oficial vectorial, imágenes originales de las motos en alta resolución y confirmación de los datos comerciales (contacto y marcas). Las fotos de motos siguen siendo provisionales.
