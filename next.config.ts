import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * CSP sin nonce (el sitio es estático/PPR y no puede generar un nonce por petición):
 * bloquea scripts, estilos, imágenes, fuentes y conexiones de terceros, pero debe permitir
 * 'unsafe-inline' en script/style porque Next.js inyecta scripts y estilos en línea.
 * Solo en producción: en `next dev` hacen falta 'unsafe-eval' y WebSocket (HMR).
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ")

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  // Demo: no indexar (también archivos estáticos). Es una señal para buscadores, no controla el acceso.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
