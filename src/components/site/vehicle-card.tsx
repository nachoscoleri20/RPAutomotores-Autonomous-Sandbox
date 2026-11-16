import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bike } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/surface"
import { AVAILABILITY_TEXT, type Vehicle } from "@/lib/vehicles"

/** Tarjeta de vehículo (boceto 01). `primary` = botón rojo relleno ("Cotizar"). */
export function VehicleCard({ vehicle, primary = false }: { vehicle: Vehicle; primary?: boolean }) {
  return (
    // Gate 2C: hover solo en dispositivos con hover (variante `hover:` de Tailwind 4).
    // Elevación 4 px, borde con acento rojo, sombra más profunda y luz roja bajo la foto.
    <Card className="group flex h-full flex-col overflow-hidden transition-[translate,box-shadow,border-color] duration-300 ease-[var(--rp-ease)] hover:-translate-y-1 hover:border-rp-red/45 hover:shadow-[0_22px_44px_-18px_rgb(0_0_0/0.95),0_0_0_1px_rgb(214_21_29/0.12)] motion-reduce:hover:translate-y-0">
      <div className="relative flex h-44 items-center justify-center px-4 pt-4">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 bottom-3 h-8 rounded-full bg-rp-red/30 opacity-0 blur-2xl transition-opacity duration-500 ease-[var(--rp-ease)] group-hover:opacity-100"
        />
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={`${vehicle.name}, ${vehicle.description.toLowerCase()}`}
            width={vehicle.imageWidth}
            height={vehicle.imageHeight}
            unoptimized
            className="relative max-h-36 w-auto max-w-full object-contain drop-shadow-[0_10px_14px_rgb(0_0_0/0.6)] transition-[scale] duration-500 ease-[var(--rp-ease)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-rp-text-muted">
            <Bike className="size-9 stroke-[1.4]" aria-hidden />
            <span className="text-xs tracking-wide uppercase">Foto pendiente</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5 pt-3">
        <h3 className="font-display text-lg font-semibold text-white">{vehicle.name}</h3>
        <p className="text-sm text-rp-text-muted">{vehicle.description}</p>
        <p className="text-sm text-white/80">{AVAILABILITY_TEXT}</p>
        <div className="mt-auto pt-4">
        <Link
          href={`/adelanto/cotizar/${vehicle.slug}`}
          aria-label={`${primary ? "Cotizar" : "Consultar"} ${vehicle.name}`}
          className={buttonVariants({
            variant: primary ? "default" : "outlineRed",
            size: "sm",
            className: "min-h-11 px-5",
          })}
        >
          {primary ? "Cotizar" : "Consultar"}
          <ArrowRight aria-hidden />
        </Link>
        </div>
      </div>
    </Card>
  )
}
