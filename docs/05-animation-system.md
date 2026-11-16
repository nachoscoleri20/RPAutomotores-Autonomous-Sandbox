# 05 — Sistema de animaciones (Gate 2)

> Estado: aprobado (etiqueta `gate-2-approved`).
> Principio: las animaciones cambian **cómo aparece** el contenido, nunca su composición final.
> El estado final es pixel-idéntico a las capturas aprobadas del Gate 1C-2 (ver "QA").

## 1. Librerías

| Librería | Versión (exacta) | Uso | Carga |
|---|---|---|---|
| `motion` (Motion for React / JS) | 14.7.1 | `inView` (revelados), `animate` + `scroll` (parallax del hero) | `inView`: en el chunk de la home (~6,6 KB gzip junto con el controlador). `animate`/`scroll`: import dinámico **solo desktop ≥1280 px con puntero fino** (~26 KB gzip) |
| `lenis` | 1.3.27 | Smooth scroll con rueda/trackpad | Import dinámico **solo puntero fino y sin movimiento reducido** (~5,5 KB gzip). En celulares no se descarga |

Versiones elegidas con más de dos semanas de publicadas. **GSAP no se usa ni hace falta**: todo se resolvió con CSS + Motion.

## 2. Arquitectura

Los componentes de la home **siguen siendo de servidor**. El movimiento se reparte así:

| Pieza | Archivo | Tipo | Qué hace |
|---|---|---|---|
| Tokens y keyframes | `src/app/globals.css` (bloque "Sistema de animaciones") | CSS | Duraciones, easing, keyframes del hero, estados ocultos de revelado |
| Helpers | `src/lib/motion.ts` | servidor | `introDelay(ms)`, `staggerIndex({base, sm, lg})` (solo variables CSS) y `MOTION_BOOT_SCRIPT` |
| Script de arranque | `src/app/layout.tsx` | inline, antes del primer pintado | Agrega `rp-anim` al `<html>` si hay JS y no hay movimiento reducido. Failsafe a 4 s |
| `HomeMotion` | `src/components/motion/home-motion.tsx` | cliente (único en la home) | Revelados con `inView`, Lenis y parallax. Limpia todo al desmontar |
| `HeaderScrollState` | `src/components/motion/header-scroll-state.tsx` | cliente | Pone `data-scrolled` en el header (listener pasivo + rAF, escribe solo al cambiar) |

### Por qué la entrada del hero es CSS y no JS
Corre en el **primer pintado**, sin esperar la hidratación (que en un celular lento puede tardar más de 1 s), no puede producir errores de hidratación y, sin JavaScript, termina igual: visible. `animation-fill-mode: backwards` evita que queden `transform`/`clip-path` residuales al terminar.

### Por qué el estado oculto depende de `rp-anim`
Un elemento con `opacity: 0` en el HTML del servidor quedaría invisible sin JS. Por eso la regla oculta es `.rp-anim [data-reveal]:not([data-revealed])` y la clase la pone un script inline antes de pintar (patrón oficial de Next 16, `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`; el `<html>` lleva `suppressHydrationWarning` solo por esa clase).
- **Sin JS**: no hay clase → todo visible (verificado).
- **JS caído** (bundle bloqueado): el failsafe quita la clase a los 4 s si `HomeMotion` no confirmó con `data-reveal-ready` (verificado).
- **Movimiento reducido**: no se agrega la clase y el CSS está dentro de `@media (prefers-reduced-motion: no-preference)` (doble protección).

### Cómo agregar un revelado
1. Poner `data-reveal` en el elemento (no en uno que ya tenga `transform` propio: envolverlo).
2. Opcional: `style={staggerIndex({ base, sm, lg })}` para escalonar por columna visible; variables `[--reveal-y:12px]`, `[--reveal-scale:0.97]`.
3. La página debe montar `<HomeMotion />` (hoy solo la home). Un `data-reveal` en una página sin controlador quedaría oculto hasta el failsafe.

## 3. Tokens: duraciones y easing

| Token | Valor | Uso |
|---|---|---|
| `--rp-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Easing único (ease-out suave) para entradas y microinteracciones |
| `--rp-dur-fast` / `--rp-dur` | 150 / 250 ms | Microinteracciones existentes |
| botones | 200 ms | hover / press |
| tarjetas | 300 ms (foto y luz 500 ms) | hover |
| header | 300 ms | cambio de estado al hacer scroll |
| `--rp-dur-reveal` | 750 ms (transform +100 ms) | revelados al hacer scroll |
| `--rp-reveal-y` | 24 px | desplazamiento por defecto |
| `--rp-stagger` | 80 ms | separación entre elementos escalonados |

## 4. Animaciones implementadas

### 2A — Hero (≈1,6 s en total, una sola vez)
| t (ms) | Elemento | Efecto |
|---|---|---|
| 0 | Foto `hero.webp` | fundido + zoom 1,025 → 1 (1100 ms) |
| 200 | Antetítulo | sube 14 px + opacidad (650 ms) |
| 300 | Luz roja sobre el piso | fundido (1200 ms), luego estática; intensidad 16 % |
| 320 / 440 | Titular, línea 1 / línea 2 | revelado con máscara (`clip-path`) + subida 0,45 em (800 ms) |
| 600 | Texto | sube + opacidad |
| 720 / 800 | Botones | suben + opacidad |
| 880–1060 | Franja de beneficios (4 ítems, 60 ms) | suben + opacidad |

Parallax (desktop ≥1280 px, puntero fino): la capa de la foto baja hasta 40 px mientras el hero sale de pantalla (≈0,1× el scroll). La franja que se descubre arriba queda siempre bajo el header sticky, así que no hay recortes ni bordes vacíos. Los vehículos no se mueven por separado.

### 2B — Smooth scroll y secciones
- Lenis: `lerp 0.12` (inercia corta), `smoothWheel`, `syncTouch: false` (touch nativo), `anchors: false` (las anclas nativas conservan foco y hash, p. ej. "Saltar al contenido"), `stopInertiaOnNavigate`. `html.lenis { scroll-behavior: auto }` evita doble suavizado.
- Revelados una sola vez (no se repiten al subir y bajar) en catálogo, soluciones, marcas, financiación y footer. Umbral: 15 % del elemento visible, sin margen negativo (para que el footer, al final de la página, también se revele).

### 2C — Catálogo
- Entrada escalonada por **columna visible** (mobile 0 ms; 2 columnas 0/80 ms; 4 columnas 0–240 ms), con subida de 32 px y `scale .97 → 1`.
- Hover (solo dispositivos con hover; la variante `hover:` de Tailwind 4 ya lo limita): elevación 4 px, borde rojo al 45 %, sombra más profunda, zoom de foto 5 % y luz roja difusa bajo la moto. Con movimiento reducido: sin elevación ni zoom.

### 2D — Microinteracciones
- **Header**: al pasar 8 px de scroll, fondo 90 % → 97 %, borde más visible y sombra. Altura fija (73 px, verificado): sin saltos.
- **Botones** (`button.tsx`, todos los usos): hover sube 1 px y la flecha final avanza 2 px; press `scale .97`; el CTA rojo suma un halo rojo. Foco: anillo rojo existente. Se transicionan `translate`/`scale` porque Tailwind 4 usa esas propiedades individuales.
- **Financiación**: la tarjeta entra con `scale .98`; luego el texto y el botón; la luz roja lateral se enciende 350 ms después y un barrido de luz recorre una vez el borde superior y desaparece (la composición final no cambia).
- **Servicios**: texto, luego las 4 columnas en secuencia (80 ms).
- **Marcas**: encabezado y luego cada marca (sube 12 px), sin carrusel.
- **Footer**: logo y datos en secuencia.

## 5. Comportamiento por dispositivo

| | Desktop (puntero fino) | Tablet / celular (touch) |
|---|---|---|
| Entrada del hero | sí | sí |
| Revelados | sí | sí (escalonado adaptado a la columna) |
| Smooth scroll (Lenis) | sí | **no** (scroll nativo; Lenis no se descarga) |
| Parallax | solo ≥1280 px | no |
| Hover de tarjetas/botones | sí | no (solo press) |

## 6. Movimiento reducido
Con `prefers-reduced-motion: reduce`: sin entrada del hero, sin revelados (contenido visible de inmediato), sin Lenis, sin parallax, sin elevación de tarjetas ni zoom, transiciones prácticamente instantáneas (regla global existente). Navegación, foco y contenido intactos (verificado).

## 7. Efectos omitidos y por qué
- **Animación por letra** del titular: prohibida por el Gate; además perjudica lectores de pantalla.
- **Animaciones infinitas** (pulsos, brillos en loop): distraen; la luz del hero es estática después de entrar.
- **Parallax en más secciones**: el Gate permite uno o dos; uno alcanza y evita mareos.
- **Magnetismo de botones**: descartado (el Gate pide no exagerar).
- **Transiciones entre páginas** (View Transitions): fuera de alcance; posible en Gate 3.
- **Blur sobre la foto del hero**: prohibido; solo hay un `blur` en la luz roja de 32 px bajo cada moto (elemento pequeño).

## 8. Mantenimiento
- Cambiar ritmo global: tokens `--rp-dur-reveal`, `--rp-reveal-y`, `--rp-stagger` y `--rp-ease` en `globals.css`.
- La secuencia del hero se ajusta con los `introDelay(...)` de `hero.tsx` y `benefits-strip.tsx`.
- No poner `data-reveal` en un elemento con `transform` propio (hover, etc.): usar un envoltorio (como las tarjetas: `li` con revelado, `Card` con hover).
- Lenis y Motion tienen versión exacta en `package.json`; al actualizar, revisar la API de `inView`/`scroll` y las opciones de Lenis.
- El parallax depende de que el hero esté justo debajo del header sticky; si se cambia esa estructura, revisar el cálculo (comentario en `home-motion.tsx`).

## 9. QA (evidencias en `docs/qa/gate-2/`)
- `01`–`03`: hero 1440 inicial / intermedio / final. `04`–`05`: mobile 390 intermedio y final. `06`: header en estado scroll + parallax. `07`: hover de tarjeta. `08`–`09`: movimiento reducido. `10`: sin JavaScript. `11`: video de la entrada y el scroll (1280×720, WebM). `home-<ancho>.png`: página completa a 320/390/768/1024/1440.
- Comparación con las capturas aprobadas del Gate 1C-2: mismas dimensiones en los 5 anchos; diferencias de píxeles ≤0,13 %, solo en el antialiasing del texto de la banda de financiación.

## 10. Cambios del Gate 4 que afectan al sistema
- La foto del hero la renderiza `src/components/site/hero-image.tsx` (Client Component, `<img>` con `srcset`): ver `docs/qa/gate-4/README.md` §3. La animación `.rp-intro-img` y el parallax (`[data-hero-parallax]`) no cambiaron.
- Medido: el fundido de entrada no empeora el LCP con red lenta (el cuello de botella es el ancho de banda); sin throttling, el LCP observado es ≈ 1,3 s, dentro del objetivo de 2,5 s.
