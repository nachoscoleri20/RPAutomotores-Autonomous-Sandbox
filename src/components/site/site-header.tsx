import Link from "next/link"
import { Layers, ClipboardList } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "@/components/ui/nav-link"
import { Logo } from "@/components/site/logo"
import { MobileMenu } from "@/components/site/mobile-menu"
import { HeaderScrollState } from "@/components/motion/header-scroll-state"
import { CTA_CATALOG, CTA_QUOTE, NAV_ITEMS } from "@/lib/site"

export function SiteHeader({ activeHref = "/" }: { activeHref?: string }) {
  return (
    // Gate 2D: al dejar la parte superior, fondo más opaco, borde más visible y sombra.
    // Solo color/sombra: la altura no cambia (sin saltos de layout).
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-white/10 bg-rp-black/90 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--rp-ease)] data-scrolled:border-white/15 data-scrolled:bg-rp-black/[0.97] data-scrolled:shadow-[0_14px_34px_-16px_rgb(0_0_0/0.9)]"
    >
      <HeaderScrollState targetId="site-header" />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-rp-red focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <div className="rp-container flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navegación principal" className="hidden xl:block">
          <ul className="flex items-center gap-5 2xl:gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} active={item.href === activeHref}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link href={CTA_CATALOG.href} className={buttonVariants({ variant: "outline", className: "px-4" })}>
            <Layers aria-hidden />
            {CTA_CATALOG.label}
          </Link>
          <Link href={CTA_QUOTE.href} className={buttonVariants({ className: "px-4" })}>
            <ClipboardList aria-hidden />
            {CTA_QUOTE.label}
          </Link>
        </div>

        <MobileMenu activeHref={activeHref} />
      </div>
    </header>
  )
}
