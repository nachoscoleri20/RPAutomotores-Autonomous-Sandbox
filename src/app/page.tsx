import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { BenefitsStrip } from "@/components/site/benefits-strip";
import { FeaturedCatalog } from "@/components/site/featured-catalog";
import { IntegralSolutions } from "@/components/site/integral-solutions";
import { FinancingBand } from "@/components/site/financing-band";
import { SiteFooter } from "@/components/site/site-footer";
import { HomeMotion } from "@/components/motion/home-motion";

// Home pública (Gates 1B–1C-2) con sistema de animaciones (Gate 2, ver docs/05-animation-system.md).
export default function Home() {
  return (
    <>
      <SiteHeader activeHref="/" />
      <main id="contenido">
        <Hero />
        <BenefitsStrip />
        <FeaturedCatalog />
        <IntegralSolutions />
        <FinancingBand />
      </main>
      <SiteFooter />
      <HomeMotion />
    </>
  );
}
