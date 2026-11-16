import Link from "next/link"
import { ArrowRight, ClipboardList } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Accent, Eyebrow } from "@/components/ui/typography"
import { CTA_QUOTE } from "@/lib/site"
import { introDelay } from "@/lib/motion"
import { HeroImage } from "@/components/site/hero-image"

/**
 * Hero (boceto 01). Foto oficial `public/images/hero.webp` (3:1, sin deformar).
 *  - < xl: foto arriba (recorte con object-position hacia los vehículos) y texto debajo.
 *  - ≥ xl: texto superpuesto a la izquierda sobre el cielo/playa oscura de la foto.
 *
 * Gate 2A: secuencia de entrada en CSS (`.rp-intro*`, globals.css), ~1,5 s:
 * foto (0 ms) → luz roja (300) → antetítulo (200) → titular (320/440) → texto (600)
 * → botones (720/800) → franja de beneficios (880+). Parallax desktop: `[data-hero-parallax]`
 * (lo maneja HomeMotion). Todo el texto sigue siendo HTML accesible.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-hero
      className="relative isolate overflow-hidden bg-rp-bg xl:flex xl:aspect-[3/1] xl:min-h-[26rem] xl:items-center"
    >
      {/* Foto */}
      <div className="relative aspect-[7/4] w-full sm:aspect-[2/1] lg:aspect-[3/1] xl:absolute xl:inset-0 xl:aspect-auto">
        <div data-hero-parallax className="absolute inset-0">
          <HeroImage alt="Camioneta SUV gris y moto Gilera Smash frente al salón de Roport Automotores al atardecer" />
        </div>
        {/* Luz roja decorativa de baja intensidad sobre el piso mojado (estática tras la entrada) */}
        <div
          aria-hidden
          className="rp-intro-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_68%_96%,rgb(214_21_29/0.16),transparent_70%)]"
        />
        {/* Fundido inferior hacia el fondo de página (móvil/tablet) y degradado de legibilidad */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-rp-bg to-transparent xl:h-24"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-r from-rp-bg/95 via-rp-bg/55 via-35% to-transparent to-62% xl:block"
        />
      </div>

      {/* Texto */}
      <div className="rp-container relative">
        <div className="-mt-4 pb-10 xl:mt-0 xl:max-w-[30rem] xl:pb-0">
          <Eyebrow className="rp-intro" style={introDelay(200)}>
            Roport Automotores
          </Eyebrow>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.1rem,1rem+5.2vw,3rem)] leading-[1.05] font-bold tracking-tight italic xl:text-[clamp(2.5rem,0.6rem+2.9vw,3.5rem)]"
          >
            <span className="rp-intro-mask block" style={introDelay(320)}>
              Autos y motos
            </span>
            <Accent className="rp-intro-mask block" style={introDelay(440)}>
              en un solo lugar
            </Accent>
          </h1>
          <p
            className="rp-intro mt-5 max-w-[34rem] text-[1.0625rem] xl:max-w-[29rem] leading-relaxed text-white/90"
            style={introDelay(600)}
          >
            Descubrí nuestro catálogo de autos y motos, solicitá cotizaciones, accedé a financiación y
            planes de ahorro, con atención personalizada.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/adelanto/catalogo"
              style={introDelay(720)}
              className={buttonVariants({ size: "lg", className: "rp-intro xl:px-5 xl:text-[0.9375rem]" })}
            >
              Ver catálogo completo
              <ArrowRight aria-hidden />
            </Link>
            <Link
              href={CTA_QUOTE.href}
              style={introDelay(800)}
              className={buttonVariants({ variant: "outline", size: "lg", className: "rp-intro xl:px-5 xl:text-[0.9375rem]" })}
            >
              <ClipboardList aria-hidden />
              {CTA_QUOTE.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
