"use client";

import Image from "next/image";
import Link from "next/link";

interface BluecoreHeroProps {
  colorIndex: number;
  colors: string[];
  isLightBg: boolean;
}

export default function BluecoreHero({
  colorIndex,
  colors,
  isLightBg,
}: BluecoreHeroProps) {
  const textClass = isLightBg ? "text-text-dark" : "text-white";
  const textMutedClass = isLightBg ? "text-gray" : "text-white/95";
  const pulseRingClass = isLightBg
    ? "border-text-dark/50"
    : "border-white/70";
  const dotClass = isLightBg ? "bg-black" : "bg-white";

  // Shape colors: blue on navy and soft-white, white on others
  const isDarkBg = colorIndex === 4; // navy
  const shapeCircleClass =
    isLightBg
      ? "bg-[#5B7FA6]/[0.12]"
      : isDarkBg
        ? "bg-[#DCEBFF]/[0.12]"
        : "bg-white/[0.07]";
  const shapeTriangleClass =
    isLightBg
      ? "bg-[#5B7FA6]/[0.08]"
      : isDarkBg
        ? "bg-[#DCEBFF]/[0.08]"
        : "bg-white/[0.05]";

  return (
    <section
      className={`relative -mt-[5rem] overflow-hidden pt-[5rem] transition-colors duration-[2.7s] ${textClass}`}
      style={{ backgroundColor: colors[colorIndex] }}
    >
      {/* Subtle background geometry - bottom-left, larger */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[400px]"
      >
        <div
          className={`absolute -left-[80px] bottom-[-120px] h-[420px] w-[420px] rounded-full ${shapeCircleClass}`}
        />
        <div
          className={`absolute -left-[40px] -bottom-12 h-[220px] w-[960px] ${shapeTriangleClass}`}
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
        <div
          className={`absolute left-[280px] bottom-0 h-[140px] w-[1040px] ${shapeTriangleClass}`}
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
      </div>

      <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-12 px-6 py-16 sm:min-h-[75vh] sm:items-start sm:px-8 sm:py-20 md:min-h-[80vh] md:gap-16 md:py-24 lg:min-h-[88vh] lg:flex-row lg:items-center lg:px-14 lg:-translate-y-[30px]">
        <div className="w-full max-w-[480px] shrink-0 sm:ml-0 lg:ml-[12%]">
          <div className="flex items-baseline justify-center gap-2 sm:justify-start">
            <h1
              className={`text-[40px] font-extrabold leading-none tracking-[-0.04em] sm:text-[52px] md:text-[60px] lg:text-[72px] ${textClass}`}
            >
              BLUECORE
            </h1>
            <div className="relative inline-flex shrink-0 items-center justify-center overflow-visible">
              <span
                className={`hero-dot inline-block h-6 w-6 rounded-full transition-colors duration-700 ${dotClass}`}
                aria-hidden
              />
              <span
                key={colorIndex}
                className={`hero-pulse-ring absolute inset-0 m-auto h-6 w-6 rounded-full border-2 ${pulseRingClass}`}
                aria-hidden
              />
            </div>
          </div>

          <p
            className={`mt-6 max-w-[560px] text-left text-[20px] font-normal leading-[1.5] tracking-[-0.02em] md:text-[22px] ${textMutedClass}`}
          >
            We design digital systems that help teams move faster, operate
            smarter, and scale with confidence. We bring clarity and structure
            to every project.
          </p>

          <div className="mt-8 flex flex-row flex-wrap items-center justify-start gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="https://calendly.com/dev-bluecorestudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-9 items-center justify-center rounded-sm px-4 text-[13px] font-medium tracking-[0.02em] shadow-md transition-shadow hover:shadow-lg ${
                isLightBg
                  ? "bg-navy text-soft-white hover:bg-deep-navy border border-navy"
                  : "bg-soft-white text-navy hover:bg-pale-blue border border-soft-white/30"
              }`}
            >
              Book a Call
            </Link>
            <Link
              href="#services"
              className={`inline-flex h-9 items-center justify-center rounded-sm px-4 text-[13px] font-medium tracking-[0.02em] shadow-md transition-shadow hover:shadow-lg ${
                isLightBg
                  ? "border border-gray/25 text-text-dark hover:border-steel-blue/40 hover:text-navy"
                  : "bg-soft-white text-navy hover:bg-pale-blue border border-soft-white/30"
              }`}
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="relative hidden shrink-0 lg:ml-auto lg:mr-[14%] lg:block">
          <div className="relative h-[455px] w-[560px]">
            {[
              "/Group1.svg",
              "/Group2.svg",
              "/Group3.svg",
              "/Group4.svg",
              "/Group5.svg",
            ].map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={560}
                height={455}
                className={`absolute inset-0 object-contain transition-opacity duration-[2.7s] ease-out ${
                  i === colorIndex ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
