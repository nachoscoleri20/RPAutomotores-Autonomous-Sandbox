# Catálogo destacado: procedencia de las fotos (Gate 1C-1)

- Fuente: captura PDF de la web original (`02-roport-automotores-netlify.pdf`, dentro de `references/Roport_Automotores_Webs_Originales.zip`). El PDF es una única imagen de página de 1680 px; **no se pudieron recuperar las fotografías originales**.
- Se recortó cada moto de esa captura, se eliminó el fondo blanco (o el fondo pizarra de la Gilera Smash 110) y se guardó como WebP con transparencia en `public/images/vehicles/` (≈ 170–240 px de ancho, sin escalar). Son de baja resolución: se verán algo blandas en pantallas retina.
- **Zanella ZB**: la foto de la web original está dañada (franjas por estiramiento de píxeles); se usa un placeholder "Foto pendiente".
- Pendiente: pedir al cliente las fotos originales en alta resolución (idealmente con fondo transparente).
- Datos: solo nombre y color de la web original. Sin precios, años, km, cilindrada ni stock. Ver `src/lib/vehicles.ts` (estructura lista para mapear a una tabla de Supabase).
