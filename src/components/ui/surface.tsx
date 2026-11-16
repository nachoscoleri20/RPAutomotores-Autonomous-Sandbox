import type { ComponentProps, ElementType } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/** Contenedor de página: ancho máximo 1280 px y gutter fluido. */
function Container({
  as: Tag = "div",
  className,
  ...props
}: ComponentProps<"div"> & { as?: ElementType }) {
  return <Tag className={cn("rp-container", className)} {...props} />
}

/** Sección con ritmo vertical fluido. */
function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("rp-section", className)} {...props} />
}

/** Tarjeta base (vehículos, beneficios, paneles). */
function Card({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card" className={cn("rp-card", className)} {...props} />
}

/** Etiqueta / píldora de estado (paneles) o categoría (catálogo). */
const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-white/25 bg-white/5 text-white",
        red: "border-rp-red bg-rp-red/15 text-white",
        success: "border-rp-success/70 bg-rp-success/10 text-rp-success",
        info: "border-rp-info/70 bg-rp-info/10 text-rp-info",
        warning: "border-rp-warning/70 bg-rp-warning/10 text-rp-warning",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
)

function Tag({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof tagVariants>) {
  return <span data-slot="tag" className={cn(tagVariants({ tone }), className)} {...props} />
}

export { Container, Section, Card, Tag, tagVariants }
