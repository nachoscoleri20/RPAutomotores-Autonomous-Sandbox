"use client"

import { useId, useState } from "react"

/** Tipos de consulta de ejemplo, con la redacción de las webs originales (modelos, precios, disponibilidad, financiación, usada). */
const TOPICS = [
  { id: "disponibilidad", label: "Disponibilidad" },
  { id: "precio", label: "Precio" },
  { id: "financiacion", label: "Financiación (sujeta a evaluación)" },
  { id: "usada", label: "Entrega de mi usada" },
] as const

/**
 * Formulario DEMOSTRATIVO de cotización (Gate 3C). No pide datos personales, no envía,
 * no guarda y no persiste nada: el estado vive solo en memoria mientras la pantalla está abierta.
 */
export function QuoteDemo({ vehicleName }: { vehicleName: string }) {
  const [picked, setPicked] = useState<string[]>(["disponibilidad"])
  const legendId = useId()

  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const chosen = TOPICS.filter((t) => picked.includes(t.id)).map((t) => t.label.toLowerCase())

  return (
    <div className="rp-card p-5 sm:p-7">
      <p className="inline-flex rounded-full border border-rp-warning/70 bg-rp-warning/10 px-3 py-0.5 text-xs font-medium text-rp-warning">
        Formulario de ejemplo · demo
      </p>
      <h2 className="mt-3 font-display text-xl font-semibold">¿Qué querés consultar?</h2>
      <p className="mt-1 text-sm text-rp-text-muted">
        Marcá las opciones para ver cómo se armaría la consulta. No hace falta ningún dato personal.
      </p>

      {/* Sin <form>: no hay envío posible. */}
      <fieldset aria-labelledby={legendId} className="mt-5">
        <legend id={legendId} className="sr-only">Tipo de consulta de ejemplo</legend>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <li key={t.id}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm transition-colors duration-200 hover:border-white/35 has-[:checked]:border-rp-red has-[:checked]:bg-rp-red/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rp-red-bright">
                <input
                  type="checkbox"
                  checked={picked.includes(t.id)}
                  onChange={() => toggle(t.id)}
                  className="size-4 shrink-0 accent-[var(--rp-red)]"
                />
                {t.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-6 rounded-xl border border-dashed border-white/25 bg-black/30 p-4">
        <p className="text-xs font-medium tracking-wide text-rp-text-muted uppercase">
          Vista previa de ejemplo · no se envía
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/90" aria-live="polite">
          Modelo: <strong className="font-semibold">{vehicleName}</strong>.{" "}
          {chosen.length > 0
            ? `Consulta sobre: ${chosen.join(", ")}.`
            : "Todavía no marcaste ninguna opción."}
        </p>
      </div>

      <div className="mt-5">
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 font-display text-base font-semibold text-white/60 sm:w-auto"
        >
          Enviar consulta · no disponible en la demo
        </button>
        <p role="status" className="mt-3 text-sm font-medium text-white">
          No se realizó ninguna solicitud. No se envió ni se guardó nada.
        </p>
        <p className="mt-1 text-sm text-rp-text-muted">
          Próximo paso en la versión final: la consulta llegará a un asesor de Roport para confirmar disponibilidad,
          precio y condiciones del modelo.
        </p>
      </div>
    </div>
  )
}
