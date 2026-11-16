"use client"

import { useEffect } from "react"
import { inView } from "motion"

/**
 * Controlador único de movimiento de la home (Gate 2). No renderiza nada.
 *  1. Revelados al entrar en viewport: marca `[data-reveal]` con `data-revealed` una sola vez
 *     (Motion `inView`; al no devolver handler, deja de observar el elemento).
 *  2. Smooth scroll (Lenis) y parallax del hero: solo desktop con puntero fino y sin
 *     movimiento reducido. Se cargan con import dinámico, así mobile no descarga Lenis.
 */
export function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-reveal-ready", "")

    // --- 1. Revelados -----------------------------------------------------
    let stopReveal: VoidFunction | undefined
    if (root.classList.contains("rp-anim")) {
      stopReveal = inView(
        "[data-reveal]:not([data-revealed])",
        (el) => {
          el.setAttribute("data-revealed", "")
        },
        { amount: 0.15 }
      )
    }

    // --- 2. Desktop: Lenis + parallax ------------------------------------
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    let disposed = false
    const cleanups: VoidFunction[] = []

    if (!reduced && finePointer) {
      void import("lenis").then(({ default: Lenis }) => {
        if (disposed) return
        const lenis = new Lenis({
          autoRaf: true,
          lerp: 0.12, // inercia corta: suave pero sin "arrastre"
          smoothWheel: true,
          syncTouch: false, // touch nativo
          anchors: false, // anclas nativas: conservan foco y hash (skip link)
          stopInertiaOnNavigate: true,
        })
        cleanups.push(() => lenis.destroy())
      })

      const hero = document.querySelector<HTMLElement>("[data-hero]")
      const layer = document.querySelector<HTMLElement>("[data-hero-parallax]")
      const desktop = window.matchMedia("(min-width: 1280px)")
      if (hero && layer && desktop.matches) {
        void import("motion").then(({ animate, scroll }) => {
          if (disposed) return
          // La capa baja 40 px mientras el hero sale de pantalla (≈0,1× el scroll):
          // la franja que se descubre arriba queda siempre bajo el header sticky.
          const anim = animate(layer, { y: [0, 40] }, { ease: "linear" })
          const stop = scroll(anim, { target: hero, offset: ["start start", "end start"] })
          cleanups.push(() => {
            stop()
            anim.cancel()
            layer.style.transform = ""
          })
        })
      }
    }

    return () => {
      disposed = true
      stopReveal?.()
      cleanups.forEach((fn) => fn())
      // `data-reveal-ready` se conserva a propósito: indica "el controlador cargó en esta sesión".
      // Si se quitara al desmontar (navegar a /adelanto), el failsafe de 4 s del script de arranque
      // podría desactivar los revelados al volver a la home.
    }
  }, [])

  return null
}
