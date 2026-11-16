import { Bike, CreditCard, Layers, UserRound, Car } from "lucide-react"
import { introDelay } from "@/lib/motion"

const BENEFITS = [
  { icon: "vehicles", title: "Autos y motos", text: "Catálogo de modelos" },
  { icon: "finance", title: "Financiación", text: "Sujeta a evaluación" },
  { icon: "savings", title: "Planes de ahorro", text: "Empezá tu próximo vehículo" },
  { icon: "care", title: "Atención personalizada", text: "Asesoramiento en todo el proceso" },
] as const

function BenefitIcon({ kind }: { kind: (typeof BENEFITS)[number]["icon"] }) {
  const cls = "size-9 shrink-0 stroke-[1.4] text-white"
  switch (kind) {
    case "vehicles":
      return (
        <span className="flex items-center gap-1" aria-hidden>
          <Bike className={cls} />
          <Car className={cls} />
        </span>
      )
    case "finance":
      return <CreditCard className={cls} aria-hidden />
    case "savings":
      return <Layers className={cls} aria-hidden />
    case "care":
      return <UserRound className={cls} aria-hidden />
  }
}

/** Franja de beneficios inmediatamente posterior al hero (boceto 01). Cierra la entrada del hero (Gate 2A). */
export function BenefitsStrip() {
  return (
    <section aria-label="Beneficios" className="border-y border-white/10 bg-rp-black/60">
      <ul className="rp-container grid grid-cols-1 gap-y-1 py-3 sm:grid-cols-2 lg:grid-cols-4 lg:py-0">
        {BENEFITS.map((b, i) => (
          <li
            key={b.title}
            style={introDelay(880 + i * 60)}
            className={`rp-intro flex items-center gap-3.5 py-4 lg:px-5 lg:py-6 ${
              i > 0 ? "border-t border-white/10 sm:[&:nth-child(2)]:border-t-0 lg:border-t-0 lg:border-l" : ""
            } ${i === 0 ? "lg:pl-0" : ""}`}
          >
            <span className="flex w-[5.25rem] shrink-0 sm:w-auto"><BenefitIcon kind={b.icon} /></span>
            <div>
              <p className="font-display text-[0.95rem] font-semibold text-white">{b.title}</p>
              <p className="text-[0.8125rem] text-rp-text-muted">{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
