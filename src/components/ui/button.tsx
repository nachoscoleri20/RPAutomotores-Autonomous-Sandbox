import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Botones Roport (bocetos 01–03): píldora, tipografía display semibold.
 *  - default   → CTA rojo relleno ("Ver catálogo", "Cotizar", "Agregar vehículo")
 *  - outline   → píldora con borde blanco ("Solicitar cotización" secundario)
 *  - outlineRed→ píldora con borde rojo ("Consultar" en tarjetas)
 *  - ghost / link → acciones terciarias
 * Gate 2D: hover eleva 1 px (y la flecha final avanza 2 px), press comprime a 0,97, 200 ms.
 * Tailwind 4 usa las propiedades `translate`/`scale`, por eso se transicionan esas.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border font-display font-semibold whitespace-nowrap transition-[background-color,border-color,box-shadow,color,translate,scale] duration-200 ease-[var(--rp-ease)] outline-none select-none hover:-translate-y-px active:translate-y-0 active:scale-[0.97] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-rp-red-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>svg:last-child:not(:first-child)]:transition-[translate] [&>svg:last-child:not(:first-child)]:duration-200 hover:[&>svg:last-child:not(:first-child)]:translate-x-0.5 motion-reduce:hover:[&>svg:last-child:not(:first-child)]:translate-x-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-b from-rp-red to-rp-red-deep text-white shadow-red hover:from-rp-red-bright hover:to-rp-red hover:shadow-[0_12px_30px_-10px_rgb(214_21_29/0.6)]",
        outline:
          "border-white/70 bg-black/30 text-white hover:border-white hover:bg-white/10",
        outlineRed:
          "border-rp-red bg-transparent text-white hover:bg-rp-red/15 hover:border-rp-red-bright",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:bg-rp-card-hi hover:border-white/30",
        ghost: "border-transparent text-white hover:bg-white/10",
        link: "rounded-none border-transparent text-white underline-offset-4 hover:text-rp-red-bright hover:underline",
      },
      size: {
        // Objetivo táctil ≥44 px en default y lg
        default: "min-h-11 px-5 text-sm",
        sm: "min-h-9 px-4 text-[0.8125rem]",
        lg: "min-h-12 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
