import type { ComponentProps, ElementType } from "react"
import { cn } from "cn"

/** Marca de acento: pequeño trazo rojo inclinado que precede a títulos (bocetos 01–03). */
function SlashMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-[0.9em] w-[0.28em] -skew-x-[20deg] rounded-[1px] bg-rp-red align-[-0.1em]",
        className
      )}
    />
  )
}

/** Sobretítulo en mayúsculas con tracking amplio ("ROPORT AUTOMOTORES", "SOLUCIONES INTEGRALES"). */
function Eyebrow({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display text-xs font-medium tracking-[0.3em] text-white/90 uppercase",
        className
      )}
      {...props}
    >
      <SlashMark />
      {children}
    </p>
  )
}

/** Título de sección centrado o alineado; el acento rojo se marca con <Accent>. */
function SectionTitle({
  as: Tag = "h2",
  className,
  children,
  ...props
}: ComponentProps<"h2"> & { as?: ElementType }) {
  return (
    <Tag
      className={cn(
        "font-display text-[length:var(--text-h2)] font-bold tracking-tight uppercase",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

function Accent({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("text-rp-red", className)} {...props} />
}

/** Texto secundario/gris. */
function Muted({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-rp-text-muted", className)} {...props} />
}

export { SlashMark, Eyebrow, SectionTitle, Accent, Muted }
