import { Accent, SectionTitle, SlashMark } from "@/components/ui/typography"
import { Container, Section } from "@/components/ui/surface"
import { VehicleCard } from "@/components/site/vehicle-card"
import { getFeaturedVehicles, PHOTO_DISCLAIMER } from "@/lib/vehicles"
import { staggerIndex } from "@/lib/motion"

/** "Nuestras motos destacadas" (boceto 01). Datos desde `lib/vehicles.ts`. */
export function FeaturedCatalog() {
  const vehicles = getFeaturedVehicles()
  return (
    <Section aria-labelledby="catalogo-title" id="catalogo">
      <Container>
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <SectionTitle id="catalogo-title" className="text-center">
            <SlashMark className="mr-3" />
            Nuestras <Accent>motos</Accent> destacadas
          </SectionTitle>
          <p className="mt-3 text-sm text-rp-text-muted">
            Elegí un modelo y consultá disponibilidad con un asesor.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {vehicles.map((v, i) => (
            // Gate 2C: entrada escalonada por columna visible, con leve profundidad (scale .97).
            <li
              key={v.id}
              data-reveal
              className="[--reveal-scale:0.97] [--reveal-y:32px]"
              style={staggerIndex({ base: 0, sm: i % 2, lg: i % 4 })}
            >
              <VehicleCard vehicle={v} primary={i === 0} />
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8 text-center text-xs text-rp-text-muted">{PHOTO_DISCLAIMER}</p>
      </Container>
    </Section>
  )
}
