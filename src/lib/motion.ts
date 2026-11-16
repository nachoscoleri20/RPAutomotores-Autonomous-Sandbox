import type { CSSProperties } from "react"

/**
 * Helpers del sistema de animaciones (Gate 2). Ver docs/05-animation-system.md.
 * Solo generan variables CSS: los componentes siguen siendo de servidor.
 */

/** Retardo de la secuencia de entrada del hero (`.rp-intro*`). */
export function introDelay(ms: number): CSSProperties {
  return { "--intro-delay": `${ms}ms` } as CSSProperties
}

/**
 * Posición de un elemento dentro de una grilla con revelado escalonado (`[data-reveal]`).
 * Cada breakpoint usa su propio índice de columna, para que el escalonado siga
 * la fila visible y no acumule retardos en mobile.
 */
export function staggerIndex({ base = 0, sm, lg }: { base?: number; sm?: number; lg?: number }): CSSProperties {
  return {
    "--i": base,
    "--i-sm": sm ?? base,
    "--i-lg": lg ?? sm ?? base,
  } as CSSProperties
}

/**
 * Script inline (antes del primer pintado) que habilita los estados ocultos de revelado.
 *  - Sin JavaScript o con movimiento reducido no se agrega `rp-anim`: todo queda visible.
 *  - Failsafe: si el controlador no confirma en 4 s (bundle caído, hidratación lenta), se quita la clase.
 */
export const MOTION_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("rp-anim");setTimeout(function(){if(!d.hasAttribute("data-reveal-ready")&&document.querySelector("[data-reveal]"))d.classList.remove("rp-anim")},4000)}catch(e){}})();`
