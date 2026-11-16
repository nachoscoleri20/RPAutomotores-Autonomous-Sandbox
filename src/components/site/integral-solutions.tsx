import { Compass, Handshake, Headset, Layers } from "lucide-react"
import { Eyebrow } from "@/components/ui/typography"
import { Container } from "@/components/ui/surface"
import { BRANDS } from "@/lib/brands"
import { staggerIndex } from "@/lib/motion"

const SOLUTIONS = [
  { Icon: Layers, title: "Planes de ahorro", text: "Accedé a tu auto o moto con planes a tu medida." },
  { Icon: Compass, title: "Asesoramiento automotriz", text: "Te ayudamos a elegir la mejor opción según tus necesidades." },
  { Icon: Handshake, title: "Gestión de ventas personalizada", text: "Acompañamiento integral desde la consulta hasta la entrega." },
  { Icon: Headset, title: "Atención al cliente especializada", text: "Un equipo preparado para brindarte una experiencia ágil y confiable." },
] as const

/** "Soluciones integrales" + marcas (boceto 01). Gate 2D: revelado del texto, columnas en secuencia y marcas escalonadas (sin carrusel). */
export function IntegralSolutions() {
  return (
    <section aria-labelledby="soluciones-title" id="servicios" className="border-t border-white/10 py-12 lg:py-14">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.6fr)] lg:gap-8">
          <div data-reveal>
            <Eyebrow>Soluciones integrales</Eyebrow>
            <h2
              id="soluciones-title"
              className="mt-3 font-display text-[length:var(--text-h2)] leading-tight font-bold tracking-tight italic"
            >
              Más que vehículos,
              <br />
              una solución completa
            </h2>
            <p className="mt-4 max-w-md text-sm text-rp-text-muted">
              Te acompañamos en todo el proceso de compra: planes de ahorro, asesoramiento, gestión de ventas
              personalizada y atención especializada.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-0">
            {SOLUTIONS.map(({ Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                style={staggerIndex({ base: i % 2, lg: i + 1 })}
                className={`px-2 text-center lg:px-5 ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
                <Icon className="mx-auto size-9 stroke-[1.3] text-white" aria-hidden />
                <h3 className="mt-4 font-display text-[0.95rem] leading-snug font-semibold">{title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-rp-text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <p data-reveal className="font-display text-[0.7rem] font-medium tracking-[0.25em] text-white/80 uppercase sm:text-xs">
            Marcas presentes en nuestra web actual
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BRANDS.map((b, i) => (
              <li
                key={b}
                data-reveal
                style={staggerIndex({ base: i + 1 })}
                className="[--reveal-y:12px] font-display text-lg font-bold tracking-[0.12em] text-white/90 uppercase sm:text-xl">
                {b}
              </li>
            ))}
          </ul>
          <p data-reveal style={staggerIndex({ base: 5 })} className="mt-4 text-xs text-rp-text-muted">Marcas mencionadas en la web institucional original; no implica representación oficial.</p>
        </div>
      </Container>
    </section>
  )
}
