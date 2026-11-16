import type { ReactNode } from "react"
import { AtSign, Mail, MapPin, Phone } from "lucide-react"
import { Container } from "@/components/ui/surface"
import { Logo } from "@/components/site/logo"
import { CONTACT } from "@/lib/brands"
import { staggerIndex } from "@/lib/motion"

// Objetivo táctil: 36 px en móvil/tablet y 28 px en desktop (≥24 px, WCAG 2.2 AA), con 2 enlaces por columna: así el footer no crece de forma notable.
const linkCls =
  "flex min-h-9 items-center rounded-sm hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-rp-red-bright lg:min-h-7"

function Item({ icon, label, index, animated, children }: { icon: ReactNode; label: string; index: number; animated: boolean; children: ReactNode }) {
  return (
    <li
      {...(animated ? { "data-reveal": "" } : {})}
      style={staggerIndex({ base: 0, sm: index % 2, lg: index + 1 })}
      className="[--reveal-y:14px] flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-5">
      <span className="shrink-0 text-rp-red-bright" aria-hidden>{icon}</span>
      <div className="min-w-0 text-sm leading-snug text-white/85 [overflow-wrap:anywhere]">
        <span className="sr-only">{label}: </span>
        {children}
      </div>
    </li>
  )
}

/**
 * Footer (boceto 01). Datos publicados en las webs originales; confirmación del cliente pendiente.
 * Gate 2B: revelado suave del logo y de los datos en secuencia. `[data-reveal]` requiere
 * <HomeMotion /> en la página; en rutas sin ese controlador usar `animated={false}` (sin `data-reveal`).
 */
export function SiteFooter({ animated = true }: { animated?: boolean } = {}) {
  const icon = "size-6"
  return (
    <footer className="border-t border-white/10 bg-rp-black/70">
      <Container>
        <div className="grid gap-8 py-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
          <div {...(animated ? { "data-reveal": "" } : {})} className="flex [--reveal-y:14px]">
            <Logo />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[1fr_0.8fr_1.3fr_1fr]">
            <Item icon={<MapPin className={icon} />} label="Dirección" index={0} animated={animated}>
              {CONTACT.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </Item>
            <Item icon={<Phone className={icon} />} label="Teléfonos" index={1} animated={animated}>
              {CONTACT.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\D/g, "")}`} className={linkCls}>{p}</a>
              ))}
            </Item>
            <Item icon={<Mail className={icon} />} label="Correos" index={2} animated={animated}>
              {CONTACT.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className={linkCls}>{e}</a>
              ))}
            </Item>
            <Item icon={<AtSign className={icon} />} label="Instagram" index={3} animated={animated}>
              <span className="block">Seguinos en Instagram</span>
              <a href={CONTACT.instagram.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {CONTACT.instagram.handle}
              </a>
            </Item>
          </ul>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs text-rp-text-muted">
          <strong className="font-display font-semibold tracking-wide text-white">ROPORT AUTOMOTORES</strong>
          <span className="mx-3 hidden sm:inline">|</span>
          <span className="block sm:inline">
            Autos y motos · Planes de ahorro · Financiación (sujeta a evaluación) · Atención personalizada.
          </span>
        </p>
      </Container>
    </footer>
  )
}
