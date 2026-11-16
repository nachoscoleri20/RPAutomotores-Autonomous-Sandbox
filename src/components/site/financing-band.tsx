import Link from "next/link"
import { ArrowRight, Headset } from "lucide-react"
import { Container } from "@/components/ui/surface"
import { buttonVariants } from "@/components/ui/button"
import { SlashMark } from "@/components/ui/typography"
import { CTA_QUOTE } from "@/lib/site"
import { staggerIndex } from "@/lib/motion"

/**
 * Banda "Financiación y entrega a tu medida" (boceto 01). Demo: lleva a la pantalla de adelanto; no abre WhatsApp.
 * Gate 2D: revelado con profundidad (scale .98), luz roja lateral que se enciende después
 * y un barrido de luz único sobre el borde superior que termina invisible (composición intacta).
 */
export function FinancingBand() {
  return (
    <section aria-labelledby="financiacion-title" id="financiacion" className="pb-12 lg:pb-14">
      <Container>
        <div
          data-reveal
          className="[--reveal-scale:0.98] [--reveal-y:28px] relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-rp-surface via-rp-card to-rp-surface">
          <div
            aria-hidden
            className="rp-reveal-glow pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-rp-red/20 to-transparent"
          />
          <div
            aria-hidden
            className="rp-sweep pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rp-red-bright to-transparent"
          />
          <div className="relative flex flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-12 lg:py-9">
            <div data-reveal style={staggerIndex({ base: 2 })} className="[--reveal-y:12px] min-w-0 max-w-2xl lg:flex-1">
              <h2 id="financiacion-title" className="font-display text-2xl font-semibold italic sm:text-[1.7rem]">
                <SlashMark className="mr-3" />
                Financiación y entrega a tu medida
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Consultá por opciones de financiación (sujeta a evaluación) y la posibilidad de entregar tu usado
                como parte de pago.
              </p>
            </div>
            <div data-reveal style={staggerIndex({ base: 3 })} className="[--reveal-y:12px] self-stretch sm:self-start lg:shrink-0 lg:self-auto">
            {/* Gate 4: en móvil el botón podía salirse de la tarjeta (≤380 px) y entre 1024 y 1100 px; ahora el texto cede espacio y el botón ocupa el ancho disponible. */}
            <Link href={CTA_QUOTE.href} className={buttonVariants({ size: "lg", className: "w-full !whitespace-normal py-2 text-center sm:w-auto sm:!whitespace-nowrap" })}>
              <Headset aria-hidden />
              Solicitar asesoramiento
              <ArrowRight aria-hidden />
            </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
