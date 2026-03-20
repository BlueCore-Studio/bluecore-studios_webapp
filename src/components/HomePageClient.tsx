"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import BluecoreHero from "@/components/BluecoreHero";
import { PartnersSection } from "@/components/PartnersSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StackSection } from "@/components/StackSection";
import { ThesisSection } from "@/components/ThesisSection";
import { CtaSection } from "@/components/CtaSection";
import { TeamSection } from "@/components/TeamSection";
import { ResearchSection } from "@/components/ResearchSection";
import { Footer } from "@/components/Footer";

const HERO_COLORS = [
  "#2563EB", // primary-blue
  "#3B82F6", // secondary-blue
  "#F8FAFC", // soft-white
  "#5B7FA6", // steel-blue
  "#0F1E3A", // navy
];

const CYCLE_DURATION_MS = 7500;

export function HomePageClient() {
  const [colorIndex, setColorIndex] = useState(0);
  const isLightBg = colorIndex === 2; // soft-white #F8FAFC

  useEffect(() => {
    const id = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % HERO_COLORS.length);
    }, CYCLE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navbar isLightBg={isLightBg} />
      <main className="mt-0">
        <BluecoreHero
          colorIndex={colorIndex}
          colors={HERO_COLORS}
          isLightBg={isLightBg}
        />
        <PartnersSection />
        <ServicesSection />
        <StackSection />
        <TeamSection />
        <ThesisSection />
        <ResearchSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
