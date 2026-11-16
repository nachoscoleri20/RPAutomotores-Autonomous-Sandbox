// Marcas y datos de contacto publicados en las webs originales de Roport (Webnode y Netlify).
// PENDIENTE: confirmación comercial del cliente antes de producción (ver docs/PROJECT_STATUS.md).

// Marcas mencionadas en la web institucional original. Se muestran como texto (sin logos de terceros)
// y NO implican que Roport sea concesionario oficial de ninguna de ellas.
export const BRANDS = ["Fiat", "Renault", "Volkswagen", "Peugeot"] as const

export const CONTACT = {
  address: ["Manuel Acevedo 83,", "Lomas de Zamora"],
  // Dos teléfonos y dos correos publicados en distintas webs; no se elige uno arbitrariamente.
  phones: ["11 2243-9190", "11 6663-1989"],
  emails: ["roport.adm@gmail.com", "roportautomotores@gmail.com"],
  instagram: { handle: "@rp_automotor", href: "https://www.instagram.com/rp_automotor" },
} as const
