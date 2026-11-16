// Navegación y rutas de "adelanto" (secciones aún no desarrolladas en la demo del 30%).

export const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/adelanto/catalogo" },
  { label: "Planes de ahorro", href: "/adelanto/planes-de-ahorro" },
  { label: "Servicios", href: "/adelanto/servicios" },
  { label: "Nosotros", href: "/adelanto/nosotros" },
  { label: "Contacto", href: "/adelanto/contacto" },
] as const

export const CTA_CATALOG = { label: "Ver catálogo", href: "/adelanto/catalogo" } as const
// Gate 3: el botón lleva a una pantalla demostrativa (no abre WhatsApp), por eso no promete WhatsApp.
export const CTA_QUOTE = { label: "Solicitar cotización", href: "/adelanto/cotizar" } as const

/** Pantallas de adelanto: título, bajada y ruta de navegación (el contenido está en components/adelanto). */
export const ADELANTO_PAGES: Record<string, { title: string; lead: string }> = {
  catalogo: {
    title: "Catálogo",
    lead: "Modelos para consultar disponibilidad. El catálogo completo, con filtros y fichas individuales, se incorporará en la versión final.",
  },
  "planes-de-ahorro": {
    title: "Planes de ahorro",
    lead: "Asesoramiento para autos y motos, tanto para planes nuevos como para planes que quedaron abandonados.",
  },
  servicios: {
    title: "Servicios",
    lead: "Asesoramiento, gestión de ventas y atención al cliente para acompañarte en todo el proceso de compra.",
  },
  nosotros: {
    title: "Nosotros",
    lead: "Una empresa dedicada al asesoramiento, la atención al cliente y la venta en el sector automotriz.",
  },
  contacto: {
    title: "Contacto y ubicación",
    lead: "Datos de contacto publicados en las webs actuales de Roport.",
  },
  cotizar: {
    title: "Solicitar cotización",
    lead: "Elegí un modelo para ver cómo será el proceso de consulta. En esta demo no se envía ninguna solicitud.",
  },
}
