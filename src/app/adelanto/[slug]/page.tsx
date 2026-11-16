import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdelantoShell } from "@/components/adelanto/adelanto-shell";
import { ADELANTO_CONTENT } from "@/components/adelanto/adelanto-sections";
import { ADELANTO_PAGES } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(ADELANTO_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/adelanto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = ADELANTO_PAGES[slug];
  return {
    title: page ? `${page.title} — Adelanto` : "Adelanto",
    robots: { index: false, follow: false },
  };
}

/** Pantalla de adelanto reutilizable: secciones que se desarrollan en Gates posteriores. */
export default function AdelantoPage({ params }: PageProps<"/adelanto/[slug]">) {
  // `params` se lee dentro de <Suspense> (requisito de Cache Components para navegación instantánea).
  return (
    <Suspense fallback={<main id="contenido" className="flex-1" />}>
      <AdelantoContent params={params} />
    </Suspense>
  );
}

async function AdelantoContent({ params }: { params: PageProps<"/adelanto/[slug]">["params"] }) {
  const { slug } = await params;
  const page = ADELANTO_PAGES[slug];
  if (!page) notFound();

  const Content = ADELANTO_CONTENT[slug];
  // "cotizar" no está en la navegación principal: no marca ningún ítem como activo.
  const activeHref = slug === "cotizar" ? undefined : `/adelanto/${slug}`;
  const crumbs = slug === "cotizar" ? [{ label: "Catálogo", href: "/adelanto/catalogo" }, { label: page.title }] : [{ label: page.title }];

  return (
    <AdelantoShell title={page.title} lead={page.lead} activeHref={activeHref} crumbs={crumbs}>
      <Content />
    </AdelantoShell>
  );
}
