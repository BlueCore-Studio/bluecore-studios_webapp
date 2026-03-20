"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  isLightBg?: boolean;
}

export function Navbar({ isLightBg = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const textClass = isLightBg
    ? "text-text-dark hover:text-deep-navy"
    : "text-white hover:text-white";
  const linkClass = isLightBg
    ? "text-gray hover:text-text-dark"
    : "text-white/90 hover:text-white";
  const borderClass = isLightBg ? "border-gray/20" : "border-white/10";
  const mobileBg = isLightBg ? "bg-white" : "bg-navy";
  const hamburgerColor = isLightBg ? "bg-text-dark" : "bg-white";

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-transparent transition-colors ${borderClass}`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-[5rem]">
          <Link
            href="/"
            className={`text-[15px] font-semibold tracking-[-0.02em] transition-colors ${textClass}`}
          >
            Bluecore
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-[0.02em] transition-colors ${linkClass}`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant={isLightBg ? "primary" : "light"} size="sm">
              Book a Call
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-[1.5px] w-5 rounded-full transition-all duration-200 ${hamburgerColor} ${
                mobileOpen ? "translate-y-[4.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 rounded-full transition-all duration-200 ${hamburgerColor} ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 rounded-full transition-all duration-200 ${hamburgerColor} ${
                mobileOpen ? "-translate-y-[4.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </Container>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t transition-all duration-250 ease-out md:hidden ${borderClass} ${mobileBg} ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container>
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-[14px] font-medium transition-colors ${linkClass}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <Button
                variant={isLightBg ? "primary" : "light"}
                size="md"
                className="w-full"
              >
                Book a Call
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
