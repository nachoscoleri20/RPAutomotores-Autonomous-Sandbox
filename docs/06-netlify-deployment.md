# 06 — Preparación de publicación en Netlify (Gate 4C)

> Estado: **preparado, NO publicado.** No se creó ningún sitio ni proyecto en Netlify, no se conectó ninguna cuenta y no hay URL. Es una **demo comercial (~30 %)**, no la aplicación definitiva: no hay cotización, pagos, administración ni registro de leads reales.

## 1. Compatibilidad (consultada en la documentación de Netlify y OpenNext)
- Netlify detecta Next.js y aprovisiona automáticamente el **adaptador OpenNext** mantenido por Netlify (`@netlify/plugin-nextjs`, "zero config"). Soporta Next.js ≥ 13.5 hasta la última estable y verifica cada versión nueva; **Cache Components figura como "Full Support"** y Partial Prerendering se sirve con una función serverless.
- La documentación consultada **no menciona Next.js 16 por su nombre**: la compatibilidad con 16.4.6 se infiere de ese "última estable"; **se confirma recién con el primer deploy** (por eso se recomienda un deploy privado primero).
- **No se fija la versión del adaptador** (Netlify recomienda no hacerlo; fijarlo desactiva las actualizaciones automáticas). No se usa `next export` ni salida estática forzada. No se agregaron dependencias.
- Build: `npm run build` (= `next build`), publicación `.next` (declarado en `netlify.toml`). Node 24.15.0 por `.nvmrc`; **riesgo**: si la imagen de build no ofreciera Node 24, el build falla y habría que declarar `NODE_VERSION` en el panel o en `netlify.toml`.
- El proyecto no usa `middleware`/`proxy`, Server Actions, rutas API ni Netlify Forms, así que no depende de las limitaciones conocidas del adaptador (edge runtime, rewrites a `public/`).

## 2. Archivos de configuración
| Archivo | Función |
|---|---|
| `netlify.toml` | `[build] command = "npm run build"`, `publish = ".next"`. Nada más (sin plugin, sin variables, sin secretos) |
| `next.config.ts` | Cabeceras de seguridad y `X-Robots-Tag` para todas las rutas y archivos estáticos (ver §5) |
| `src/lib/demo.ts` | `PANELS_ENABLED = process.env.ENABLE_PANELS === "true"` (ver §4) |
| `src/app/admin/page.tsx`, `src/app/vendedor/page.tsx` | Llaman a `notFound()` si los paneles no están habilitados |

Las cabeceras se definen en `next.config.ts` y no en `netlify.toml` porque Netlify evalúa `headers` de la plataforma después del middleware y, para contenido servido por funciones, Next.js es la fuente más fiable.

## 3. Estrategia de ramas (propuesta, **no creada**)
- `main`: versión inicial estable (`095e6a3`). No se toca. La rama de producción del repositorio en GitHub no se cambia.
- `dev/demo-30`: integración y desarrollo de la demo.
- **`demo/roport-30`** (propuesta): rama exclusiva de la demo para el cliente, creada desde el último estado aprobado (etiqueta del último Gate aprobado, p. ej. `gate-4ab-approved` más el commit de este Gate 4C una vez aprobado). Netlify desplegaría esta rama como **rama de producción del sitio** (Site configuration → Build & deploy → Branches → Production branch = `demo/roport-30`); esa es una opción del sitio de Netlify, no del repositorio.
- Congelar: solo se actualiza con `git merge --ff-only dev/demo-30` (o cherry-pick) tras aprobación de NS Landings; nunca se trabaja directamente en ella. Cada demo entregada lleva una etiqueta (`demo-30-vN`) para el rollback.
- Para crearla (cuando se autorice): `git checkout -b demo/roport-30 <etiqueta-aprobada>` y `git push -u origin demo/roport-30`.

## 4. Rutas administrativas
- `/admin` y `/vendedor` son placeholders (Gate 0C) y **responden HTTP 404** en la demo (y en cualquier build sin `ENABLE_PANELS=true`). Verificado en producción local: `/admin`, `/vendedor` y `/admin/x` → 404; el navegador muestra la página 404 de Next.js.
- Es mejor que `noindex` o ocultar enlaces: la ruta deja de existir para cualquier visitante.
- El código se conserva. Para trabajar en ellos en local: `ENABLE_PANELS=true npm run dev` (verificado: 200 en dev). **No** definir `ENABLE_PANELS` en Netlify.
- Esto no es autenticación ni protección de datos. Cuando existan los paneles reales (Supabase, roles, RLS), el control de acceso real debe implementarse en esa fase.

## 5. Visibilidad, SEO y cabeceras
**Indexación** (toda la demo): meta `robots: noindex, nofollow` (layout raíz y páginas) **y** cabecera `X-Robots-Tag: noindex, nofollow` (también para imágenes y archivos estáticos). No existe `robots.txt` a propósito: un `Disallow` impediría que los buscadores lean el `noindex`.

**Lo que `noindex` NO hace:**
- No restringe el acceso: cualquier persona con el enlace puede abrir la demo.
- Una URL pública o difícil de adivinar **no es seguridad**; puede difundirse o ser descubierta.
- Los datos comerciales de la demo **siguen sin confirmar** (ver §9).

**Visibilidad privada en Netlify Free (revisión interna).** Según la documentación de Netlify (consultada para este Gate):
- En el plan **Credit-based Free** la protección por **contraseña NO está disponible** (es de Pro en adelante).
- Sí se puede poner el proyecto como **Private** (Project configuration → General → Visitor access/Project visibility): solo accede el dueño del equipo (Team Owner) con su login de Netlify. Sirve para revisión interna, no para compartir con el cliente.
- Para mostrar la demo al cliente en Free hay que dejarla pública (con `noindex`) y compartir el enlace solo con quien corresponda, sabiendo que no está protegida; o subir de plan para usar contraseña/revisores. La documentación no confirma si en Free se puede proteger solo los deploy previews: verificar en el panel antes de contar con ello.
- Opción intermedia: usar **Deploy Previews / branch deploys** para revisión, sabiendo que también son accesibles por URL salvo que el plan permita protegerlos.

**Cabeceras** (`next.config.ts`, todas las rutas):
| Cabecera | Valor | Nota |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | |
| `X-Frame-Options` | `DENY` | equivale a `frame-ancestors 'none'` |
| `Permissions-Policy` | cámara, micrófono, geolocalización, pagos y USB desactivados | |
| `Strict-Transport-Security` | `max-age=31536000` | sin `includeSubDomains` ni `preload` (no se sabe qué dominio se usará) |
| `X-Robots-Tag` | `noindex, nofollow` | |
| `Content-Security-Policy` (solo producción) | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` | ver abajo |

**Sobre la CSP.** El sitio es estático/PPR y no puede generar un *nonce* por petición, y Next.js inyecta scripts y estilos en línea, por lo que se permite `'unsafe-inline'` en `script-src` y `style-src`. Aun así bloquea scripts, estilos, fuentes, imágenes y conexiones de **terceros**, objetos, `<base>` y enmarcado. No se usa `'unsafe-eval'`. Se probó en producción local con Next.js, Motion, Lenis, parallax, reveals, menú móvil, cotización demostrativa y movimiento reducido: **sin violaciones ni errores de consola**. No se aplica en `next dev` (requiere `eval` y WebSocket para HMR). **Si en el futuro se agrega un servicio externo** (Supabase, EmailJS, analítica, mapas, fuentes remotas), hay que ampliar la CSP en el mismo cambio. Una CSP con nonces/hashes requeriría renderizado dinámico y se deja para la fase completa.

## 6. Procedimiento de despliegue (a ejecutar solo con autorización)
1. Aprobación de NS Landings de este Gate y commit/etiqueta del mismo; luego crear y subir `demo/roport-30` (§3).
2. En Netlify: *Add new project → Import from Git* → repositorio `nachoscoleri20/RPAutomotores`. **Production branch: `demo/roport-30`.** Build command `npm run build`, publish `.next` (se toman de `netlify.toml`). **Sin variables de entorno.**
3. Decidir la visibilidad (§5) **antes** del primer deploy: para revisión interna, proyecto **Private**.
4. Primer deploy: confirmar que el build termina (Node 24, Next 16.4.6, adaptador automático). Si falla por Node, declarar `NODE_VERSION`; si falla por el adaptador, revisar el informe de compatibilidad de OpenNext/Netlify.
5. Ejecutar el checklist de §8 sobre la URL que asigne Netlify (no se inventa ninguna aquí).
6. Solo después de la revisión: decidir si se hace público y si se conecta un dominio propio.

## 7. Rollback
- **Netlify** (inmediato): Deploys → elegir un deploy anterior correcto → *Publish deploy* (restaura sin rebuild). También *Stop auto publishing* para congelar mientras se investiga.
- **Git**: `demo/roport-30` se mueve solo por avance rápido; para volver, redesplegar la etiqueta anterior (`git checkout demo/roport-30 && git reset --hard demo-30-vN` solo con autorización, o crear una rama nueva desde la etiqueta y cambiar la *Production branch*). No usar force push sobre `main` ni sobre `dev/demo-30`.
- Si hubo una exposición no deseada (p. ej. se publicó público por error): pasar el proyecto a **Private** o pausar el sitio de inmediato; `noindex` no retira lo ya difundido.

## 8. Checklist posterior al deploy (sobre la URL de Netlify)
- [ ] El build usó Node 24.15.0 y Next 16.4.6; sin errores ni advertencias del adaptador.
- [ ] `/`, `/adelanto/catalogo`, `/adelanto/planes-de-ahorro`, `/adelanto/servicios`, `/adelanto/nosotros`, `/adelanto/contacto`, `/adelanto/cotizar` y las 8 `/adelanto/cotizar/<modelo>` → 200.
- [ ] `/admin`, `/vendedor` y `/admin/x` → **404** (verificar el código HTTP, no solo la página).
- [ ] Cabeceras: `curl -I <url>` muestra las de §5, incluida `X-Robots-Tag` y la CSP; en los archivos de `/_next/static` e `/images` también.
- [ ] `<meta name="robots" content="noindex, nofollow">` presente; no hay `robots.txt` ni sitemap.
- [ ] Consola sin errores ni violaciones de CSP; sin errores de hidratación; ninguna petición a dominios externos ni POST.
- [ ] Home: entrada del hero, revelados, Lenis (solo desktop), parallax (≥ 1280 px), menú móvil, hover de tarjetas.
- [ ] Movimiento reducido: sin animaciones, contenido visible.
- [ ] Navegación atrás/adelante y restauración del scroll al volver de una cotización.
- [ ] Cotización demostrativa: casillas, vista previa y aviso "No se realizó ninguna solicitud"; botón de envío deshabilitado.
- [ ] Repetir Lighthouse móvil/escritorio sobre la URL real y comparar con `docs/qa/gate-4/README.md` (LCP móvil simulado previo: 3,47 s, > 2,5 s).
- [ ] Prueba con lector de pantalla y en celulares reales (no realizadas hasta ahora).
- [ ] La visibilidad configurada coincide con la decisión (Private/Pública) abriendo la URL en una ventana sin sesión.

## 9. Datos comerciales pendientes de confirmar con el cliente
Tomados de las webs originales; **no son definitivos**: dos teléfonos (11 2243-9190 y 11 6663-1989), dos correos (roport.adm@gmail.com y roportautomotores@gmail.com; falta definir el principal), dirección (Manuel Acevedo 83, Lomas de Zamora), Instagram (@rp_automotor; la URL `instagram.com/rp_automotor` fue armada a partir del identificador publicado y no fue validada), marcas (Fiat, Renault, Volkswagen, Peugeot; sin implicar representación oficial). Además: logo provisorio, fotos de motos provisorias (Zanella ZB sin foto) y textos a validar.

## 10. QA de producción del primer deploy (informe del Gate 4C)
Sitio: `https://rpautomotores-demo.netlify.app/` · commit desplegado `0f03925e0b8c343b16d1c76f15d4bdb182a5ab63` · rama `demo/roport-30` · proyecto **Private**.

**Verificado en producción (desde este entorno, 2026-11-12)**
- GitHub: `origin/demo/roport-30` y `origin/dev/demo-30` apuntan a `0f03925…`, el commit informado como desplegado (coincidencia confirmada del lado de Git; no se puede leer desde Netlify qué commit sirve el deploy).
- El sitio **está protegido**: `/`, `/admin`, `/vendedor`, `/adelanto/catalogo` y `/robots.txt` responden **HTTP 401** sin sesión de Netlify. Esto confirma que la visibilidad Private funciona frente a visitantes anónimos. La cabecera de ese 401 la genera Netlify (HSTS propio de la plataforma), no la aplicación.

**Evidencia visual aportada por el propietario (no verificada por este entorno)**
- Netlify muestra el deploy como *Published*; proyecto Private; home funcionando en desktop y mobile; `/admin` y `/vendedor` muestran la página 404.

**Verificado solo en local** (`next start`, Gate 4C): 15 rutas con 200; `/admin`, `/vendedor` y `/admin/x` con HTTP 404; `noindex, nofollow` (meta y `X-Robots-Tag`); cabeceras de seguridad y CSP sin violaciones; flujo catálogo → vehículo → cotización demostrativa → regreso; sin POST ni peticiones externas; Motion, Lenis y movimiento reducido; sin errores de hidratación.

**Smoke test autenticado (propietario, sesión autorizada):** 15 rutas comerciales HTTP 200; `/admin` y `/vendedor` HTTP 404; meta robots y `X-Robots-Tag` `noindex, nofollow`; CSP, `X-Content-Type-Options: nosniff` y HSTS presentes; capturas desktop y mobile aprobadas por NS Landings. Con esto el Gate 4C quedó **aprobado como despliegue privado** (`gate-4c-approved` → `0f03925`). Pendientes: ver `PROJECT_STATUS.md` (LCP móvil, lector de pantalla y móviles físicos, logo/fotos definitivos, datos comerciales, pruebas al hacerse público).
