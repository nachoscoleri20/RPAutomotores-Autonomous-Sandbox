import Link from "next/link"

/**
 * Lockup PROVISORIO de Roport Automotores / RP, recreado con texto y CSS a partir del boceto 01.
 * NO es el logo oficial: reemplazar por el SVG del cliente cuando esté disponible.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-3 rounded-md ${className}`}
    >
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.65rem] font-extrabold tracking-tight text-white italic">
          ROPORT
        </span>
        {/* Espacio real entre palabras: el nombre accesible incluye el texto visible (WCAG 2.5.3). */}
        {" "}
        <span className="mt-1 self-end font-display text-[0.5rem] font-semibold tracking-[0.35em] text-white/80 uppercase">
          Automotores
        </span>
      </span>
      {/* Sin aria-label: el nombre accesible sale del texto visible + "— Inicio", así contiene lo que se ve (WCAG 2.5.3). */}
      <span className="sr-only">— Inicio</span>
      <span aria-hidden="true" className="h-9 w-px bg-white/25" />
      <span
        aria-hidden="true"
        className="font-display text-[1.65rem] font-extrabold tracking-tight text-white italic"
      >
        R<span className="text-rp-red">P</span>
      </span>
    </Link>
  )
}
