import type { ReactNode } from "react"
import Link from "next/link"
import { House, Info, LayoutGrid } from "lucide-react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/surface"
import { Eyebrow } from "@/components/ui/typography"

export type Crumb = { label: string; href?: string }

const crumbItem =
  "flex items-center gap-2 whitespace-nowrap after:text-base after:leading-none after:content-['›'] last:after:hidden"
const crumbLink = "inline-flex min-h-11 items-center rounded-sm hover:text-white hover:underline"

/**
 * Marco común de las pantallas de adelanto (Gate 3): header, ruta de navegación, aviso de demo,
 * contenido, salidas hacia inicio/catálogo y footer.
 * No usa `data-reveal` ni `HomeMotion`: estas rutas no tienen revelados (el footer va con `animated={false}`).
 */
export function AdelantoShell({
  title,
  lead,
  activeHref,
  crumbs,
  children,
}: {
  title: string
  lead: string
  activeHref?: string
  crumbs: Crumb[]
  children: ReactNode
}) {
  return (
    <>
      <SiteHeader activeHref={activeHref ?? ""} />
      <main id="contenido" className="flex-1">
        <Container className="rp-section">
          <nav aria-label="Ruta de navegación" className="mb-8">
            {/* El separador es un "›" posterior a cada ítem (CSS, no se lee): si la lista se parte en dos
                líneas, el separador queda al final de la primera y nunca al comienzo de la segunda. */}
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-rp-text-muted">
              <li className={crumbItem}>
                <Link href="/" className={crumbLink}>
                  Inicio
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label} className={crumbItem}>
                  {c.href && i < crumbs.length - 1 ? (
                    <Link href={c.href} className={crumbLink}>
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="inline-flex min-h-11 items-center text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <Eyebrow>Adelanto · versión demostrativa</Eyebrow>
          <h1 className="mt-4 font-display text-[length:var(--text-h1)] leading-[1.05] font-bold italic">{title}</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/85">{lead}</p>

          <p
            role="note"
            className="mt-6 flex max-w-3xl items-start gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/90"
          >
            <Info className="mt-0.5 size-4 shrink-0 text-rp-red-bright" aria-hidden />
            <span>
              <strong className="font-semibold text-white">Versión demostrativa.</strong> Esta pantalla muestra cómo
              será la sección; las funciones completas se incorporarán más adelante. Acá no se envía, guarda ni
              procesa ningún dato.
            </span>
          </p>

          <div className="mt-10">{children}</div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
            <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
              <House aria-hidden />
              Volver al inicio
            </Link>
            <Link href="/adelanto/catalogo" className={buttonVariants({ variant: "outlineRed", size: "lg" })}>
              <LayoutGrid aria-hidden />
              Ver catálogo
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter animated={false} />
    </>
  )
}
