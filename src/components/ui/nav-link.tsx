import type { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "cn"

/**
 * Elemento de navegación principal (boceto 01: "Inicio" activo con subrayado rojo).
 * Presentacional: el estado activo lo decide quien lo usa (aria-current).
 */
function NavLink({
  active = false,
  className,
  ...props
}: ComponentProps<typeof Link> & { active?: boolean }) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex min-h-11 whitespace-nowrap items-center px-1 text-sm font-medium text-white/90 transition-colors duration-[var(--rp-dur)] hover:text-white",
        "after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-rp-red after:transition-transform after:duration-[var(--rp-dur)] hover:after:scale-x-100",
        active && "text-white after:scale-x-100",
        className
      )}
      {...props}
    />
  )
}

export { NavLink }
