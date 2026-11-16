import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdelantoShell } from "@/components/adelanto/adelanto-shell";
import { VehicleSummary } from "@/components/adelanto/adelanto-sections";
import { QuoteDemo } from "@/components/adelanto/quote-demo";
import { getVehicleBySlug, VEHICLES } from "@/lib/vehicles";

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ vehiculo: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/adelanto/cotizar/[vehiculo]">): Promise<Metadata> {
  const { vehiculo } = await params;
  const vehicle = getVehicleBySlug(vehiculo);
  return {
    title: vehicle ? `Cotizar ${vehicle.name} — Adelanto` : "Cotizar — Adelanto",
    robots: { index: false, follow: false },
  };
}

export default function CotizarVehiculoPage({ params }: PageProps<"/adelanto/cotizar/[vehiculo]">) {
  return (
    <Suspense fallback={<main id="contenido" className="flex-1" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/adelanto/cotizar/[vehiculo]">["params"] }) {
  const { vehiculo } = await params;
  const vehicle = getVehicleBySlug(vehiculo);
  if (!vehicle) notFound();
  return (
    <AdelantoShell
      title={`Cotizar ${vehicle.name}`}
      lead="Vista previa de cómo será la consulta de un modelo. En esta demo no se envía ninguna solicitud."
      crumbs={[
        { label: "Catálogo", href: "/adelanto/catalogo" },
        { label: "Solicitar cotización", href: "/adelanto/cotizar" },
        { label: vehicle.name },
      ]}
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <VehicleSummary vehicle={vehicle} />
        <QuoteDemo vehicleName={vehicle.name} />
      </div>
    </AdelantoShell>
  );
}
