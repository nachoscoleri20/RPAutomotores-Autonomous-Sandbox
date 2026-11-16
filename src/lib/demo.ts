/**
 * Modo demo: los paneles `/admin` y `/vendedor` son solo placeholders y NO deben mostrarse
 * públicamente. Por defecto responden 404 (también en el despliegue de Netlify).
 * Para trabajar localmente en ellos: `ENABLE_PANELS=true npm run dev`.
 * Se evalúa en el servidor al compilar; no es autenticación ni protección de datos.
 */
export const PANELS_ENABLED = process.env.ENABLE_PANELS === "true"
