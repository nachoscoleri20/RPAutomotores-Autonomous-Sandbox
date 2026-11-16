import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PANELS_ENABLED } from "@/lib/demo";

export const metadata: Metadata = {
  title: "Panel vendedor",
  robots: { index: false, follow: false },
};

export default function Page() {
  // Demo: sin ENABLE_PANELS=true la ruta responde 404 (el código se conserva para la fase completa).
  if (!PANELS_ENABLED) notFound();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-8 text-center">
      <h1 className="text-2xl font-semibold">Panel vendedor — placeholder (Gate 0C)</h1>
      <p className="text-muted-foreground">Sin datos ni autenticación. Se desarrollará en un Gate posterior.</p>
    </main>
  );
}
