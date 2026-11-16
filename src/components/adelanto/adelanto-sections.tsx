import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, AtSign, Bike, Compass, Handshake, Headset, Mail, MapPin, Phone } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/surface"
import { SlashMark } from "@/components/ui/typography"
import { VehicleCard } from "@/components/site/vehicle-card"
import { BRANDS, CONTACT } from "@/lib/brands"
import { CTA_QUOTE } from "@/lib/site"
import { AVAILABILITY_TEXT, getFeaturedVehicles, PHOTO_DISCLAIMER, VEHICLES, type Vehicle } from "@/lib/vehicles"

/**
 * Contenido de las pantallas de adelanto (Gate 3). Los textos comerciales salen de las webs
 * originales de Roport (Webnode y Netlify, capturas en `references/`); no se agregó ninguna
 * condición, precio, plazo ni beneficio que esas webs no mencionen.
 */

function SourceNote({ children }: { children?: ReactNode }) {
  return (
    <p className="mt-8 max-w-3xl text-xs leading-relaxed text-rp-text-muted">
      {children ?? "Contenido tomado de las webs actuales de Roport. Los textos finales serán validados con el cliente."}
    </p>
  )
}

function QuoteLink({ label = "Solicitar asesoramiento" }: { label?: string }) {
  return (
    <Link href={CTA_QUOTE.href} className={buttonVariants({ size: "lg", className: "!px-5 sm:!px-7" })}>
      <Headset aria-hidden />
      {label}
      <ArrowRight aria-hidden />
    </Link>
  )
}

/* ---------------------------------------------------------------- Catálogo */
export function CatalogoContent() {
  return (
    <>
      <h2 className="sr-only">Modelos disponibles para consultar</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {getFeaturedVehicles().map((v, i) => (
          <li key={v.id}>
            <VehicleCard vehicle={v} primary={i === 0} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-xs text-rp-text-muted">{PHOTO_DISCLAIMER}</p>
    </>
  )
}

/* ------------------------------------------------------- Planes de ahorro */
export function PlanesContent() {
  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Especialistas en planes de ahorro</h2>
          <p className="mt-2 font-display text-lg text-white/95 italic">
            Si tu plan quedó <span className="text-rp-red-bright">a la deriva</span>, acá lo anclamos.
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-white/85">
            Rescatamos planes de ahorro para autos y motos que otras concesionarias dejaron caídos, mal gestionados o
            directamente abandonados. Y si estás por empezar de cero, te armamos un plan nuevo, con condiciones claras
            desde el primer día.
          </p>
        </Card>
        <Card className="flex flex-col p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">Financiación y entrega de tu usada</h2>
          <p className="mt-3 leading-relaxed text-white/85">
            ¿Tenés DNI y una usada para entregar? Consultá las opciones disponibles. La financiación está sujeta a
            evaluación y condiciones vigentes.
          </p>
        </Card>
      </div>
      <div className="mt-8">
        <QuoteLink />
      </div>
      <SourceNote />
    </>
  )
}

/* --------------------------------------------------------------- Servicios */
const SERVICES = [
  { Icon: Compass, title: "Asesoramiento técnico automotriz" },
  { Icon: Handshake, title: "Gestión de ventas personalizada" },
  { Icon: Headset, title: "Atención al cliente especializada" },
] as const

export function ServiciosContent() {
  return (
    <>
      <Card className="p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">Asesoramiento y ventas de vehículos</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-white/85">
          En ROPORT AUTOMOTORES nos especializamos en brindar asesoramiento personalizado, atención al cliente de
          calidad y excelentes opciones de venta en el sector automotriz. Estamos ubicados en Buenos Aires y
          trabajamos con una amplia gama de marcas y modelos de vehículos para satisfacer las necesidades de nuestros
          clientes.
        </p>
      </Card>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {SERVICES.map(({ Icon, title }) => (
          <li key={title}>
            <Card className="h-full p-6 text-center">
              <Icon className="mx-auto size-9 stroke-[1.3] text-white" aria-hidden />
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <QuoteLink />
        <Link href="/adelanto/planes-de-ahorro" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Ver planes de ahorro
          <ArrowRight aria-hidden />
        </Link>
      </div>
      <SourceNote />
    </>
  )
}

/* ---------------------------------------------------------------- Nosotros */
export function NosotrosContent() {
  const brands = BRANDS.join(", ").replace(/, ([^,]*)$/, " y $1")
  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Expertos en automóviles</h2>
          <p className="mt-3 leading-relaxed text-white/85">
            Somos una empresa dedicada a brindar asesoramiento, atención al cliente y ventas en el sector automotriz en
            la ciudad de Buenos Aires. Nos enfocamos en ofrecer un servicio personalizado y de calidad para satisfacer
            las necesidades de nuestros clientes, ofreciéndoles distintas marcas como {brands}.
          </p>
          <p className="mt-3 text-xs text-rp-text-muted">
            La mención de marcas proviene de la web institucional actual y no implica representación oficial.
          </p>
        </Card>
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Asesoramiento y ventas de vehículos</h2>
          <p className="mt-3 leading-relaxed text-white/85">
            En ROPORT AUTOMOTORES nos especializamos en brindar asesoramiento personalizado, atención al cliente de
            calidad y excelentes opciones de venta en el sector automotriz.
          </p>
          <div className="mt-5">
            <Link href="/adelanto/servicios" className={buttonVariants({ variant: "outline" })}>
              Ver servicios
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </Card>
      </div>
      <SourceNote />
    </>
  )
}

/* ---------------------------------------------------------------- Contacto */
export function ContactoContent() {
  const rows = [
    { Icon: MapPin, label: "Dirección", body: CONTACT.address.map((l) => <span key={l} className="block">{l}</span>) },
    {
      Icon: Phone,
      label: "Teléfonos",
      body: CONTACT.phones.map((p) => (
        <a key={p} href={`tel:${p.replace(/\D/g, "")}`} className="block rounded-sm py-3 hover:underline">{p}</a>
      )),
    },
    {
      Icon: Mail,
      label: "Correos",
      body: CONTACT.emails.map((e) => (
        <a key={e} href={`mailto:${e}`} className="block rounded-sm py-3 [overflow-wrap:anywhere] hover:underline">{e}</a>
      )),
    },
    {
      Icon: AtSign,
      label: "Instagram",
      body: (
        <a href={CONTACT.instagram.href} target="_blank" rel="noopener noreferrer" className="block rounded-sm py-3 hover:underline">
          {CONTACT.instagram.handle}
        </a>
      ),
    },
  ]
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ Icon, label, body }) => (
          <li key={label}>
            <Card className="h-full p-6">
              <Icon className="size-7 text-rp-red-bright" aria-hidden />
              <h2 className="mt-4 font-display text-base font-semibold">{label}</h2>
              <div className="mt-2 text-sm leading-relaxed text-white/85">{body}</div>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-white/85">Atendemos en Lomas de Zamora y alrededores.</p>
      <SourceNote>
        Datos publicados en las webs actuales de Roport, pendientes de confirmación por el cliente (incluyendo cuál
        teléfono y cuál correo serán los principales). Esta pantalla no tiene formulario de contacto.
      </SourceNote>
    </>
  )
}

/* ---------------------------------------------------------------- Cotizar */
export function CotizarContent() {
  return (
    <>
      <h2 className="font-display text-xl font-semibold">1. Elegí un modelo</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {VEHICLES.map((v) => (
          <li key={v.id}>
            <Link
              href={`/adelanto/cotizar/${v.slug}`}
              className="rp-card group flex min-h-16 items-center justify-between gap-3 px-4 py-3 transition-colors hover:border-rp-red/60"
            >
              <span>
                <span className="block font-display font-semibold text-white">{v.name}</span>
                <span className="block text-sm text-rp-text-muted">{v.description}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-rp-red-bright transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-xl font-semibold">Cómo será el proceso</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["1", "Elegís el modelo", "Desde el catálogo o desde esta pantalla."],
          ["2", "Indicás qué querés consultar", "Disponibilidad, precio, financiación o entrega de tu usada."],
          ["3", "Un asesor te responde", "En la versión final. En esta demo no se envía nada."],
        ].map(([n, t, d]) => (
          <li key={n}>
            <Card className="h-full p-5">
              <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-white"><SlashMark />Paso {n}</span>
              <h3 className="mt-1 font-display text-base font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-rp-text-muted">{d}</p>
            </Card>
          </li>
        ))}
      </ol>
    </>
  )
}

/* ------------------------------------------------- Resumen del vehículo */
export function VehicleSummary({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className="p-5 sm:p-7">
      <p className="text-xs font-medium tracking-wide text-rp-text-muted uppercase">Modelo seleccionado</p>
      <div className="mt-3 flex h-44 items-center justify-center rounded-xl bg-black/25 px-4">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={`${vehicle.name}, ${vehicle.description.toLowerCase()}`}
            width={vehicle.imageWidth}
            height={vehicle.imageHeight}
            unoptimized
            className="max-h-36 w-auto max-w-full object-contain drop-shadow-[0_10px_14px_rgb(0_0_0/0.6)]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-rp-text-muted">
            <Bike className="size-9 stroke-[1.4]" aria-hidden />
            <span className="text-xs tracking-wide uppercase">Foto pendiente</span>
          </div>
        )}
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold">{vehicle.name}</h2>
      <p className="mt-1 text-rp-text-muted">{vehicle.description}</p>
      <p className="mt-1 text-sm text-white/80">{AVAILABILITY_TEXT}</p>
      <p className="mt-4 text-xs leading-relaxed text-rp-text-muted">{PHOTO_DISCLAIMER}</p>
      <div className="mt-5">
        <Link href="/adelanto/cotizar" className={buttonVariants({ variant: "outline" })}>
          Elegir otro modelo
        </Link>
      </div>
    </Card>
  )
}

export const ADELANTO_CONTENT: Record<string, () => ReactNode> = {
  catalogo: CatalogoContent,
  "planes-de-ahorro": PlanesContent,
  servicios: ServiciosContent,
  nosotros: NosotrosContent,
  contacto: ContactoContent,
  cotizar: CotizarContent,
}
