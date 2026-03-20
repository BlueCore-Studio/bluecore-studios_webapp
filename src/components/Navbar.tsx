"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface NavbarProps {
  isLightBg?: boolean;
}

export function Navbar({ isLightBg = false }: NavbarProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 250);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const useLightNavbar = isLightBg && !scrolledPastHero;
  const useNavyNavbar = scrolledPastHero;
  const textClass = useLightNavbar
    ? "text-text-dark hover:text-deep-navy"
    : "text-white hover:text-white";
  const linkClass = useLightNavbar
    ? "text-gray hover:text-text-dark"
    : "text-white/90 hover:text-white";
  const borderClass = useLightNavbar ? "border-b border-gray/20 border-t-white" : "border-b border-white/10";
  const bgClass = useNavyNavbar ? "bg-navy shadow-sm border-t-navy" : useLightNavbar ? "bg-white border-t-white" : "bg-transparent border-t-transparent";

  const navLinks = (
    <>
      <Link href="/blog" className={`text-[13px] font-medium tracking-[0.02em] transition-colors ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
      <Link href="/#services" className={`text-[13px] font-medium tracking-[0.02em] transition-colors ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>Services</Link>
      <Link href="/#process" className={`text-[13px] font-medium tracking-[0.02em] transition-colors ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>Process</Link>
      <Link href="/#contact" className={`text-[13px] font-medium tracking-[0.02em] transition-colors ${linkClass}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
      <Link
        href="https://calendly.com/dev-bluecorestudio/30min"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex h-auto items-center justify-center rounded-sm py-1.5 px-4 text-[13px] font-medium tracking-[0.02em] transition-colors ${
          useLightNavbar ? "bg-navy text-soft-white hover:bg-deep-navy border border-navy" : "bg-soft-white text-navy hover:bg-pale-blue border border-soft-white/30"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        Book a Call
      </Link>
    </>
  );

  return (
    <header className={`sticky top-0 z-50 border-t transition-colors duration-200 ${bgClass} ${borderClass}`}>
      <Container>
        <nav className="flex h-[5rem] items-center justify-between">
          <Link href="/" className={`text-[15px] font-semibold tracking-[-0.02em] transition-colors ${textClass}`}>
            Bluecore
          </Link>
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {navLinks}
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col justify-center gap-1.5 p-2 md:hidden ${textClass}`}
          >
            <span className={`block h-0.5 w-6 transition-all ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} style={{ backgroundColor: "currentColor" }} />
            <span className={`block h-0.5 w-6 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} style={{ backgroundColor: "currentColor" }} />
            <span className={`block h-0.5 w-6 transition-all ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} style={{ backgroundColor: "currentColor" }} />
          </button>
        </nav>
      </Container>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[5rem] z-40 md:hidden ${mobileMenuOpen ? "visible" : "invisible"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-navy/95 backdrop-blur-sm transition-opacity duration-200 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className={`absolute inset-x-0 top-0 flex flex-col gap-6 border-b border-white/10 bg-navy px-6 py-8 transition-transform duration-200 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-4"}`}>
          <Link href="/blog" className="text-[15px] font-medium text-white/90 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/#services" className="text-[15px] font-medium text-white/90 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/#process" className="text-[15px] font-medium text-white/90 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Process</Link>
          <Link href="/#contact" className="text-[15px] font-medium text-white/90 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link
            href="https://calendly.com/dev-bluecorestudio/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-sm bg-soft-white px-5 py-2.5 text-[13px] font-medium text-navy hover:bg-pale-blue"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      </div>
    </header>
  );
}
