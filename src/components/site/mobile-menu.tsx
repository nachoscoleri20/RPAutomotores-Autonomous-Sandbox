"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, ClipboardList, Layers, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { CTA_CATALOG, CTA_QUOTE, NAV_ITEMS } from "@/lib/site"

/** Menú hamburguesa accesible (visible por debajo de `xl`). */
export function MobileMenu({ activeHref }: { activeHref?: string }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-[var(--rp-dur)] hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-rp-red-bright"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-t border-white/10 bg-rp-black shadow-2xl shadow-black/60 transition-[opacity,transform,visibility] duration-[var(--rp-dur)] ease-[var(--rp-ease)] ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Navegación principal móvil" className="rp-container py-4">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = item.href === activeHref
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center border-b border-white/10 font-display text-base font-medium ${
                      active ? "text-white" : "text-white/80"
                    } hover:text-white`}
                  >
                    {active && (
                      <span aria-hidden className="mr-3 h-4 w-1 -skew-x-[20deg] bg-rp-red" />
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={CTA_CATALOG.href}
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Layers aria-hidden />
              {CTA_CATALOG.label}
            </Link>
            <Link
              href={CTA_QUOTE.href}
              onClick={() => setOpen(false)}
              className={buttonVariants({ size: "lg" })}
            >
              <ClipboardList aria-hidden />
              {CTA_QUOTE.label}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
