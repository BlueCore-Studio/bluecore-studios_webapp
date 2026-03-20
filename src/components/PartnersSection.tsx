"use client";

import Image from "next/image";

const PARTNER_LOGOS = [
  { src: "/partners/aws.png", alt: "AWS" },
  { src: "/partners/certik.png", alt: "CertiK" },
  { src: "/partners/cloudflare.png", alt: "Cloudflare" },
  { src: "/partners/figma.png", alt: "Figma" },
  { src: "/partners/github.png", alt: "GitHub" },
  { src: "/partners/jupiter.png", alt: "Jupiter" },
  { src: "/partners/quantstamp.png", alt: "Quantstamp" },
  { src: "/partners/resend.png", alt: "Resend" },
  { src: "/partners/stripe.png", alt: "Stripe" },
  { src: "/partners/sumsub.png", alt: "Sumsub" },
];

function MarqueeContent() {
  return (
    <>
      {PARTNER_LOGOS.map((logo, i) => {
        const isResend = logo.alt === "Resend";
        return (
          <div
            key={i}
            className={`relative flex shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100 ${
              isResend ? "h-14 w-32" : "h-10 w-24"
            }`}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={isResend ? 128 : 96}
              height={isResend ? 56 : 40}
              className="object-contain"
              sizes={isResend ? "128px" : "96px"}
            />
          </div>
        );
      })}
    </>
  );
}

export function PartnersSection() {
  return (
    <section
      className="overflow-hidden border-y border-gray/10 bg-white py-8"
      aria-label="Partners"
    >
      <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-gray">
        Our Partners
      </h2>
      <div className="flex w-max animate-marquee">
        <div className="flex items-center gap-12 pr-12">
          <MarqueeContent />
        </div>
        <div className="flex items-center gap-12 pr-12" aria-hidden>
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
}
