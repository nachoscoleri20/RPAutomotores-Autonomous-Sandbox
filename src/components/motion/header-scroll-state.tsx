"use client"

import { useEffect } from "react"

/**
 * Marca el header con `data-scrolled` cuando la página dejó la parte superior (Gate 2D).
 * Un listener pasivo + rAF; solo escribe en el DOM cuando el estado cambia. Sin re-renders.
 */
export function HeaderScrollState({ targetId }: { targetId: string }) {
  useEffect(() => {
    const header = document.getElementById(targetId)
    if (!header) return
    let frame = 0
    let scrolled: boolean | null = null
    const update = () => {
      frame = 0
      const next = window.scrollY > 8
      if (next !== scrolled) {
        scrolled = next
        header.toggleAttribute("data-scrolled", next)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [targetId])

  return null
}
