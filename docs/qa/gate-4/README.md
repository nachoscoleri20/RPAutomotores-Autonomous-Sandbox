# Gate 4A + 4B — QA final, rendimiento y accesibilidad

> Estado: **aprobado** por NS Landings (`gate-4ab-approved`). Excepción documentada a la restricción del Gate 2: se aprueba conservar `hero-1300.webp` (versión reducida del `hero.webp` original) y el `srcset`; no revertir. No se publicó nada ni se conectó ningún servicio.
> Fecha: 2026-11-12. Todas las pruebas se hicieron sobre una **compilación de producción local** (`npm run build` + `npm run start`), no sobre `next dev` (salvo la comprobación de hidratación, que se hizo en dev a propósito).

## 1. Cómo se midió (y límites)
- **Lighthouse 12.8.2** (instalado fuera del repo, en una carpeta temporal) con Chrome local. Móvil y escritorio: 3 corridas de la home (mediana) y 1 corrida de dos pantallas de adelanto. Los informes completos de la home (inicial y final, móvil y escritorio) están en `informes-html/`; los números resumidos, en `lighthouse-resumen.json`, `lighthouse-final-devtools-resumen.json` y la tabla de abajo.
- **LCP "simulado" vs "observado".** Lighthouse móvil usa throttling simulado (4G lenta + CPU 4×); ese número es el que entra en el puntaje. Aparte se informa el LCP **observado** (sin throttling, en esta máquina).
- **INP**: no hay datos válidos (sin interacciones reales ni datos de campo); no se informa. **TBT** se usa como indicador de laboratorio.
- Las mediciones locales (localhost, sin CDN ni compresión de Netlify) no equivalen a producción: hay que repetirlas con la demo publicada.
- No se manipuló ninguna medición ni se ocultó ningún componente.

## 2. Resultados Lighthouse: antes y después
Mediana de las corridas ("n"). Perf = Performance, BP = Best Practices.

| Configuración | Perf | A11y | BP | SEO | FCP | LCP (simulado) | LCP (observado) | TBT | CLS | JS KB | Img KB | Total KB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| inicial · contacto-desktop (n=1) | 100 | 95 | 100 | 60 | 0.21 s | 0.66 s | 0.41 s | 0 ms | 0 | 160 | 0 | 326 |
| inicial · contacto-mobile (n=1) | 95 | 96 | 100 | 60 | 0.76 s | 2.86 s | 0.28 s | 95 ms | 0 | 160 | 0 | 326 |
| inicial · cotizar-blitz-desktop (n=1) | 100 | 96 | 100 | 63 | 0.21 s | 0.66 s | 0.38 s | 0 ms | 0 | 162 | 11 | 340 |
| inicial · cotizar-blitz-mobile (n=1) | 94 | 96 | 100 | 63 | 0.76 s | 3.04 s | 0.32 s | 62 ms | 0 | 162 | 11 | 340 |
| inicial · home-desktop (n=3) | 99 | 100 | 100 | 100 | 0.25 s | 0.88 s | 1.28 s | 0 ms | 0 | 194 | 222 | 586 |
| inicial · home-mobile (n=3) | 90 | 100 | 100 | 100 | 0.91 s | 3.55 s | 1.29 s | 122 ms | 0 | 160 | 211 | 534 |
| final · contacto-desktop (n=1) | 100 | 100 | 100 | 60 | 0.21 s | 0.61 s | 0.31 s | 0 ms | 0 | 160 | 0 | 326 |
| final · contacto-mobile (n=1) | 96 | 100 | 100 | 60 | 0.76 s | 2.86 s | 0.27 s | 47 ms | 0 | 160 | 0 | 327 |
| final · cotizar-blitz-desktop (n=1) | 100 | 100 | 100 | 63 | 0.21 s | 0.65 s | 0.35 s | 0 ms | 0 | 162 | 11 | 342 |
| final · cotizar-blitz-mobile (n=1) | 94 | 100 | 100 | 63 | 0.76 s | 3.08 s | 0.32 s | 43 ms | 0 | 162 | 11 | 342 |
| final · home-desktop (n=3) | 99 | 100 | 100 | 63 | 0.25 s | 0.88 s | 1.29 s | 0 ms | 0 | 194 | 222 | 586 |
| final · home-mobile (n=3) | 91 | 100 | 100 | 63 | 0.91 s | 3.47 s | 1.28 s | 55 ms | 0 | 160 | 112 | 436 |

Lectura:
- **Accesibilidad**: de 95–96 en las pantallas de adelanto a **100 en todas**.
- **SEO 100 → 63 en la home** es **intencional**: la demo ahora pide `noindex, nofollow` y Lighthouse penaliza "página bloqueada para indexación". Las pantallas de adelanto ya estaban en 60–63 por lo mismo. Si se publica una versión indexable, vuelve a ~100 al quitar `robots`.
- **Performance móvil de la home**: 90 → 91; **LCP simulado 3,55 → 3,47 s**, TBT 122 → 55 ms, CLS 0. El objetivo de LCP ≤ 2,5 s **no se cumple en la simulación móvil** (sí en escritorio: 0,88 s). Ver abajo.
- **Peso transferido** de la home móvil: 534 → 436 KB (imágenes 211 → 112 KB).
- CLS ≈ 0 en todas las mediciones.

### LCP con red/CPU de móvil emulada directamente por el navegador
Throttling aplicado por Chrome (no simulado): 4× CPU, 1,6 Mbps, 150 ms de latencia, 5 corridas por variante.

| Variante | LCP (mediana) |
|---|---|
| Antes (solo `hero.webp`, 157 KB) | **2,87 s** |
| Después (`hero-1300.webp` en móvil, 57 KB) | **1,68 s** (−41 %) |
| Lighthouse con throttling `devtools`, versión final (3 corridas) | 2,49 · 2,52 · 2,75 s (Perf 90 · 90 · 88, TBT ≈ 250 ms) |

Con throttling real el LCP queda cerca del límite de 2,5 s; con la simulación de Lighthouse sigue por encima (el modelo simulado casi no se movió con el cambio de la foto). Se informan ambos para no sobreestimar la mejora.

## 3. Hero cinematográfico y LCP
- **¿El fundido de entrada perjudica el LCP?** Se comprobó. Con throttling de móvil, quitar la animación **no** cambió el LCP (≈ 2,59 s con y sin animación): el cuello de botella es el ancho de banda (la foto compite con fuentes y JS). Sin throttling, el LCP **observado** es ≈ 1,28 s con la animación y ≈ 0,28 s sin ella (Chrome cuenta la foto cuando termina de aparecer), siempre dentro de 2,5 s. **No se tocó la animación aprobada.**
- **Lo que sí mejoró el LCP**: servir la misma fotografía en dos tamaños con `srcset` (`hero-1300.webp` para pantallas chicas y el `hero.webp` original para anchos grandes). Verificado: a 1440 px y en tablet de 1024 px con pantalla retina se sirve el original; la diferencia visual en móvil es mínima (diferencia media 2–3 de 255; ≤ 2 % de píxeles con cambio > 24).
- **Decisión para NS Landings**: el Gate 2 pedía usar "exclusivamente `public/images/hero.webp`". `hero-1300.webp` es **una copia reducida de esa misma foto** (no hay otra imagen), pero es un archivo nuevo. Si se prefiere no usarlo, basta con borrarlo y quitar el `srcSet` de `src/components/site/hero-image.tsx`; el costo es volver a un LCP ≈ 2,9 s con throttling.
- Probado y descartado: `fetchPriority="high"` y `preload` manual (sin mejora medible; además React convertía el primero en un preload que bajaba la foto en las pantallas de adelanto) y `decoding="async"` (provocaba un parpadeo en capturas).
- El `<img>` vive en un **Client Component a propósito** (`hero-image.tsx`): en un Server Component, el prefetch de la home desde `/adelanto` hacía que el navegador descargara la foto sin usarla y la consola mostraba "preloaded but not used". Verificado: las pantallas de adelanto no piden la foto y no hay avisos.

## 4. Carga de recursos (revisión)
- JS transferido: 160 KB (móvil) / 194 KB (escritorio) en la home; 160 KB en adelanto. Un único CSS de 11 KB comprimido.
- **Lenis** (≈ 5,5 KB) y el **parallax de Motion** (≈ 26 KB) se cargan solo con puntero fino; móvil no los descarga (verificado en emulación táctil).
- Fuentes: 3 archivos WOFF2 (≈ 120 KB), `display: swap`, preload automático de `next/font`.
- Fotos de vehículos: WebP de 7–12 KB con carga diferida de Next/Image. Sin dependencias nuevas.
- `npm audit --omit=dev`: 0 vulnerabilidades.

## 5. Problemas encontrados y correcciones
| # | Problema | Corrección |
|---|---|---|
| 1 | Logo: el nombre accesible (`aria-label`) no contenía el texto visible (axe `label-content-name-mismatch`, WCAG 2.5.3), en todas las páginas | Se quitó el `aria-label`; el nombre sale del texto visible + "— Inicio" (oculto visualmente) |
| 2 | `/adelanto/catalogo`: salto de encabezado h1 → h3 | `h2` oculto visualmente ("Modelos disponibles para consultar") antes de la grilla |
| 3 | Etiqueta "Paso N" en rojo (#ee2a31) sobre tarjeta: contraste 4,07:1 (< 4,5) | Texto blanco con la marca roja decorativa |
| 4 | Breadcrumb móvil: el separador podía quedar al inicio de la segunda línea | El separador ahora es un "›" **posterior** a cada ítem (CSS): si la lista se parte, queda al final de la primera línea. Verificado a 320/360/390/480 px |
| 5 | Footer de la home: enlaces de contacto de ~19 px de alto | 36 px en móvil/tablet y 28 px en escritorio (≥ 24 px, WCAG 2.2 AA). Altura de página: +60 px en móvil, +12 px a 1440 px, 0 px a 1024 px |
| 6 | **Botón "Solicitar asesoramiento" de la banda de financiación recortado** por la tarjeta en móvil (≤ ~380 px) y entre 1024 y 1100 px (defecto del Gate 1C-2 no detectado antes) | En móvil ocupa el ancho disponible y puede partir el texto; en escritorio el texto cede espacio. Barrido de 15 anchos × 10 rutas sin elementos recortados |
| 7 | La home no tenía `noindex` (solo las pantallas de adelanto y los paneles) | `robots: noindex, nofollow` en el layout raíz (señal para buscadores, **no una protección**: la URL sigue siendo pública) |
| 8 | Enlaces de la página Contacto de ~35–43 px de alto | 47 px |

## 6. Accesibilidad
**Automática** — axe-core (WCAG 2 A/AA, 2.1 A/AA, 2.2 AA y buenas prácticas) sobre las 15 rutas a 390 y 1440 px: **0 violaciones** (antes: `label-content-name-mismatch` en las 30 combinaciones y `heading-order` en 2). Lighthouse Accessibility: **100** en las mediciones finales. axe marca el contraste como "incompleto" (no evalúa fondos con degradado o imagen), por eso se calculó a mano:

| Combinación | Contraste |
|---|---|
| Gris `#a3a7ae` sobre fondo / tarjeta | 7,84 / 7,06 |
| Blanco 85 % sobre tarjeta | 12,6 |
| Texto de botón blanco sobre rojo | 5,27 – 6,41 |
| Texto de botón deshabilitado | 6,35 |
| Rojo `#d6151d` sobre fondo (solo títulos grandes) | 3,59 (≥ 3 para texto grande) |
| Rojo claro `#ee2a31` sobre fondo (íconos) | 4,52 |

**Manual (Playwright, teclado y estados):**
- Estructura: `header`, `nav` (principal, móvil y ruta de navegación), `main`, `footer`; `lang="es"`; un `h1` por página; jerarquía h1 → h2 → h3.
- Skip link: aparece al primer Tab y lleva a `#contenido`.
- Orden de tabulación lógico y **foco visible en todos los elementos** (26 pulsaciones en la cotización); el botón deshabilitado queda fuera del orden de tabulación.
- Casillas de cotización: etiqueta asociada, se activan con la barra espaciadora; la vista previa es una región `aria-live="polite"`; el aviso "No se realizó ninguna solicitud" tiene `role="status"`.
- Menú móvil: abre, navega y se cierra con Escape devolviendo el foco al botón.
- Movimiento reducido: sin animaciones en curso, sin Lenis, sin contenido oculto. Sin JavaScript: contenido completo y visible.
- **No se probó con un lector de pantalla** (NVDA, JAWS, VoiceOver): no hay uno disponible en este entorno. Las comprobaciones de nombres accesibles y estructura son automáticas/semánticas, no una prueba de escucha. Queda pendiente una prueba manual con lector de pantalla y con dispositivos táctiles reales.

## 7. Responsive y navegación
- 320, 390, 768, 1024 y 1440 px × 15 rutas (75 cargas): sin scroll horizontal, sin imágenes rotas, sin elementos recortados, un `h1`, `noindex` presente, sin errores ni avisos de consola, sin respuestas ≥ 400 y **sin ninguna petición POST/PUT/PATCH ni a dominios externos**. Además, un barrido de 15 anchos intermedios (320–1440) sobre 10 rutas.
- Producción local **y** `next dev`: sin errores de hidratación ni avisos (incluida la navegación cliente ida y vuelta).
- 15 enlaces internos únicos, todos 200; menú de escritorio y móvil, logo, breadcrumb, botones de regreso, selección de los 8 modelos, historial atrás/adelante y restauración del scroll (1200 → 1200) verificados.
- Capturas: `home-<ancho>.png` (página completa), `<ruta>-<ancho>.jpg`, `breadcrumb-*.png`, `footer-home-*.png`, `financiacion-*.png`. Nota: la home se captura tras decodificar ambos tamaños de la foto, porque la captura de página completa re-evalúa el `srcset` y puede mostrar el hero vacío un instante (artefacto de la captura, no del sitio).
- Comparación con el Gate 2 (home, parte superior): idéntica salvo el texto "Solicitar cotización" (Gate 3). Alturas de página: +60 / +60 / +67 px (320 / 390 / 768) por el footer, 0 px a 1024 y +12 px a 1440.

## 8. Regresión de animaciones
Verificada en producción con la versión final: entrada del hero (animación en curso a 350 ms, terminada a 2 s, sin `transform` residual), 29/29 revelados, hover de tarjeta (−4 px), parallax solo en escritorio, header con estado de scroll sin cambio de altura, Lenis con una sola instancia (también tras ida y vuelta a `/adelanto`), teclado con Lenis (PageDown/End), táctil sin Lenis y con la foto de 1300 px, movimiento reducido sin animaciones, y recorrido ida y vuelta tras más de 4 s fuera de la home (29/29).

## 9. Seguridad y datos comerciales
- Sin secretos ni `.env` versionados (`.gitignore` los excluye); sin rutas `route.ts`, Server Actions, `<form>` ni `fetch`; sin dependencias de Supabase/EmailJS/WhatsApp.
- `/admin` y `/vendedor` siguen siendo **placeholders públicos** con `noindex` y sin datos. Antes de publicar conviene excluirlos del despliegue o bloquearlos (ver checklist).
- Único enlace externo: Instagram, con `rel="noopener noreferrer"`. Títulos únicos por ruta y `noindex` en todas.
- **Datos no confirmados por el cliente** (se muestran como publicados en las webs originales, nunca como definitivos): dos teléfonos (11 2243-9190 y 11 6663-1989), dos correos (roport.adm@gmail.com y roportautomotores@gmail.com), dirección (Manuel Acevedo 83, Lomas de Zamora), Instagram (@rp_automotor; **la URL `instagram.com/rp_automotor` fue armada a partir del identificador publicado y no fue validada por el cliente**), marcas (Fiat, Renault, Volkswagen, Peugeot; sin implicar representación oficial), logo provisorio y fotos de motos provisorias (Zanella ZB sin foto).

## 10. Limitaciones y pendientes
- LCP móvil simulado de Lighthouse > 2,5 s (3,47 s); con throttling real ≈ 2,5 s. Medir con la demo publicada (CDN, HTTP/2–3, compresión) antes de concluir.
- Las pruebas automáticas no sustituyen una auditoría con lector de pantalla ni pruebas en dispositivos reales (no realizadas); sin datos de campo (INP/CrUX).
- `hero-1300.webp`: aprobado como excepción (sección 3).
- El footer de la home creció levemente en móvil por los objetivos táctiles de 36 px.
- Los botones de cotización siguen llevando a pantallas demostrativas.

## 11. Checklist de publicación en Netlify (Gate 4C, no ejecutado)
- [ ] Autorización explícita de NS Landings y confirmación del cliente de los datos comerciales (teléfonos, correos, dirección, Instagram, marcas).
- [ ] Decidir si la demo es pública: `noindex` está activo pero no protege; si debe ser privada, usar protección por contraseña de Netlify o un sitio no listado.
- [ ] Excluir o bloquear `/admin` y `/vendedor` (redirección o eliminación del placeholder).
- [ ] Node 24.15.0 (`.nvmrc`) y `npm run build`; usar el adaptador/plugin de Next.js de Netlify compatible con Next 16 (**verificar compatibilidad con Cache Components antes de publicar**).
- [ ] Sin variables de entorno por ahora; si aparecen, cargarlas en Netlify (nunca en Git).
- [ ] Cabeceras de seguridad (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`) y caché larga para `/_next/static` e `/images`.
- [ ] Dominio y HTTPS. No existe `robots.txt` (el `noindex` va por metadatos).
- [ ] Repetir Lighthouse (móvil y escritorio) sobre la URL publicada y comparar con la tabla de este informe.
- [ ] Probar con lector de pantalla y en celulares reales (iOS y Android).
- [ ] Verificar en producción: restauración del scroll, menú móvil, Lenis, `prefers-reduced-motion` y ausencia de peticiones a servicios externos.
- [ ] Quitar `noindex` solo si se decide indexar la versión definitiva.
