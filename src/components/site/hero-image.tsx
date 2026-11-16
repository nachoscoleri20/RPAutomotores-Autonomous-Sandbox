"use client"

/**
 * Foto del hero (misma fotografía en dos tamaños: `hero-1300.webp` para pantallas chicas y el
 * `hero.webp` original para anchos grandes). Medido con red/CPU de móvil emulada: LCP 2,9 s → 1,7 s.
 *
 * Es un Client Component A PROPÓSITO: un <img> en un Server Component hace que React incluya una
 * pista de preload en el payload RSC; al navegar/prefetchear la home desde /adelanto, el navegador
 * descargaba la foto y mostraba el aviso "preloaded but not used". En un Client Component el
 * payload solo lleva una referencia, y el SSR de la home sigue emitiendo su <img> normalmente.
 * `next/image` con `unoptimized` no genera srcset, por eso se usa <img>.
 */
export function HeroImage({ alt }: { alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/hero.webp"
      srcSet="/images/hero-1300.webp 1300w, /images/hero.webp 2172w"
      sizes="100vw"
      width={2172}
      height={724}
      alt={alt}
      className="rp-intro-img absolute inset-0 size-full object-cover object-[100%_center] sm:object-[88%_center] lg:object-center"
    />
  )
}
