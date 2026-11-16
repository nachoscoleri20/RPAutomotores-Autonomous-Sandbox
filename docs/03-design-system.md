# Design System — Roport Automotores (Gate 1A)

Fuente de verdad: bocetos aprobados 01 (web), 02 (admin), 03 (vendedor). Los valores se **muestrearon** de los PNG; donde el boceto usa degradados o texturas se documenta la aproximación. Implementación: `src/app/globals.css`.

## Paleta (HEX)
| Token | HEX | Origen / uso |
|---|---|---|
| `--rp-red` | `#d6151d` | Muestreado: botón "Ver catálogo". CTA, acentos, subrayados, trazo `/` |
| `--rp-red-deep` | `#be0f1c` | Muestreado: botón "Cotizar por WhatsApp" (fin del degradado) |
| `--rp-red-bright` | `#ee2a31` | **Aproximación**: hover y foco (no existe en el boceto) |
| `--rp-black` | `#0a0b0d` | Fondo superior/cabecera (muestra `#0c0d0f`) |
| `--rp-bg` | `#0e1114` | Fondo de página y footer (muestras `#0e1114`, `#0e1115`) |
| `--rp-surface` | `#131518` | Paneles (muestras admin `#131518`, `#111316`) |
| `--rp-card` / `--rp-card-hi` | `#1a1c20` / `#23252a` | Tarjetas (muestras `#1d1f23`, `#25262a`); `hi` = parte alta del degradado |
| `--rp-border` | `rgba(255,255,255,.10)` | Bordes de tarjetas; `-strong` al 22 % para hover |
| `--rp-text` / muted | `#f4f4f5` / `#a3a7ae` | Texto principal / secundario (≥7:1 sobre `--rp-bg`) |
| Estados | success `#22c55e`, info `#3b82f6`, warning `#d9a21b` | Aproximados de las píldoras de los bocetos 02/03 (solo paneles) |

Los rojos del boceto son degradados con brillo; se simplifican a rojo plano + sombra roja suave (`--rp-shadow-red`).

## Tipografía (2 familias, `next/font`, gratuitas, OFL)
- **Montserrat** (`--font-heading`): titulares en **cursiva 600–800**, como "Autos y motos en un solo lugar", y botones/etiquetas. Es la aproximación más fiel a la geométrica itálica del boceto (la fuente original no es identificable).
- **Inter** (`--font-body`): cuerpo, tablas y datos.
- Geist eliminada. Escala fluida: `--text-display` 36→68 px, `--text-h1`, `--text-h2` 24→36 px, `--text-h3`; cuerpo 16 px / 1.6.
- Clase `.rp-display` (cursiva bold) y `<Accent>` (palabra en rojo).

## Tokens
- Radios: tarjetas `1rem`, paneles `1.25rem`, botones/etiquetas **píldora**.
- Sombras: `--rp-shadow-card` (negra, profunda) y `--rp-shadow-red` (brillo del CTA).
- Movimiento: `--rp-ease` cubic-bezier(.22,1,.36,1), 150/250 ms; revelados 750 ms, 24 px, escalonado 80 ms. Sistema completo (Motion + Lenis) en `docs/05-animation-system.md`.
- Layout: `--rp-container` 1280 px, gutter fluido `clamp(1rem,4vw,2.5rem)`, ritmo de sección `clamp(3rem,7vw,6rem)`.
- Los tokens de shadcn (`--primary`, `--card`, `--ring`…) están mapeados a la marca; la web es **siempre oscura** (`<html class="dark">`).

## Componentes base (`src/components/ui/`)
- `button.tsx`: `default` (rojo), `outline` (píldora borde blanco), `outlineRed`, `secondary`, `ghost`, `link`; tamaños `default`/`lg` ≥44 px táctiles, `sm` 36 px (uso en tarjetas densas), `icon`.
- `typography.tsx`: `SlashMark`, `Eyebrow`, `SectionTitle`, `Accent`, `Muted`.
- `surface.tsx`: `Container`, `Section`, `Card` (`.rp-card`), `Tag` (neutral/red/success/info/warning).
- `nav-link.tsx`: enlace con subrayado rojo y `aria-current`.

## Responsive
Mobile-first sobre Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`). Anchos de control: **320, 390, 768, 1024, 1440 px**. Tipografía y espaciado con `clamp()`; sin scroll horizontal; `min-h-11` en controles; foco visible (`outline` rojo 2 px); `prefers-reduced-motion` neutraliza animaciones y smooth scroll.

## Diferencias inevitables respecto de los bocetos
1. Degradados, viñetas rojas y luces del fondo se aproximan con color plano + sombra; se retomarán sección por sección en el Gate 1B.
2. Tipografías originales no identificables; se usa Montserrat/Inter.
3. Logo "ROPORT AUTOMOTORES / RP": no hay archivo vectorial disponible; hay que solicitarlo al cliente.
4. Hover, foco y colores de estados son aproximaciones propias.
5. Iconografía: Lucide (bocetos usan íconos de línea similares).
