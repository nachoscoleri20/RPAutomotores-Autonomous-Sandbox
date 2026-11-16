import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { MOTION_BOOT_SCRIPT } from "@/lib/motion";

// Titulares: Montserrat (cursiva 600–700, como en los bocetos). Cuerpo: Inter.
const display = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roport Automotores",
  description: "Autos y motos en un solo lugar.",
  // Demo comercial: se pide a los buscadores no indexarla. Es una señal, no una protección: la URL sigue siendo pública.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de arranque agrega `rp-anim` al <html> antes de hidratar
    // (patrón oficial "preventing flash before hydration"; afecta solo a este elemento).
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`dark ${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
