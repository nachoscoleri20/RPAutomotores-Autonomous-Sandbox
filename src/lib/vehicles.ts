// Catálogo inicial (8 modelos de la web original de Roport). Solo datos verificados:
// nombre y color/descripción tal como figuran en la web actual. Sin precios, años, km,
// cilindrada ni stock. Forma pensada para mapear 1:1 a una tabla `vehicles` de Supabase
// (sin conexión todavía).

export type VehicleCategory = "moto" | "auto"
export type VehicleStatus = "published" | "hidden" | "archived"

export interface Vehicle {
  id: string
  slug: string
  name: string
  category: VehicleCategory
  /** Color / descripción breve verificada en la web original. */
  description: string
  /** Ruta pública de la foto optimizada, o null si falta (se muestra un placeholder). */
  image: string | null
  imageWidth?: number
  imageHeight?: number
  featured: boolean
  status: VehicleStatus
  sortOrder: number
}

export const AVAILABILITY_TEXT = "Consultar disponibilidad"
export const PHOTO_DISCLAIMER =
  "Fotos ilustrativas. Confirmá modelo, precio, stock y condiciones con un asesor."

export const VEHICLES: Vehicle[] = [
  { id: "veh-001", slug: "gilera-smash-110", name: "Gilera Smash 110", category: "moto", description: "Roja y negra", image: "/images/vehicles/gilera-smash-110.webp", imageWidth: 180, imageHeight: 130, featured: true, status: "published", sortOrder: 1 },
  { id: "veh-002", slug: "moto-110-negra", name: "Moto 110 negra", category: "moto", description: "Marca y versión a confirmar", image: "/images/vehicles/moto-110-negra.webp", imageWidth: 167, imageHeight: 163, featured: true, status: "published", sortOrder: 2 },
  { id: "veh-003", slug: "zanella-zb", name: "Zanella ZB", category: "moto", description: "Gris con detalles verdes", image: null, featured: true, status: "published", sortOrder: 3 },
  { id: "veh-004", slug: "corven-energy-110", name: "Corven Energy 110", category: "moto", description: "Azul", image: "/images/vehicles/corven-energy-110.webp", imageWidth: 193, imageHeight: 143, featured: true, status: "published", sortOrder: 4 },
  { id: "veh-005", slug: "gilera-smash-verde", name: "Gilera Smash", category: "moto", description: "Verde", image: "/images/vehicles/gilera-smash-verde.webp", imageWidth: 193, imageHeight: 188, featured: true, status: "published", sortOrder: 5 },
  { id: "veh-006", slug: "honda-wave", name: "Honda Wave", category: "moto", description: "Celeste", image: "/images/vehicles/honda-wave.webp", imageWidth: 170, imageHeight: 116, featured: true, status: "published", sortOrder: 6 },
  { id: "veh-007", slug: "motomel-110", name: "Motomel 110", category: "moto", description: "Negra", image: "/images/vehicles/motomel-110.webp", imageWidth: 186, imageHeight: 124, featured: true, status: "published", sortOrder: 7 },
  { id: "veh-008", slug: "blitz-110", name: "Blitz 110", category: "moto", description: "Gris y negra", image: "/images/vehicles/blitz-110.webp", imageWidth: 242, imageHeight: 161, featured: true, status: "published", sortOrder: 8 },
]

export const getFeaturedVehicles = () =>
  VEHICLES.filter((v) => v.featured && v.status === "published").sort((a, b) => a.sortOrder - b.sortOrder)

export const getVehicleBySlug = (slug: string) => VEHICLES.find((v) => v.slug === slug)
