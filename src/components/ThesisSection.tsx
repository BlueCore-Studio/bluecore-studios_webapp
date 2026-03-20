"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CelestialSphere } from "@/components/ui/CelestialSphere";

/* ------------------------------------------------------------------ */
/*  Keyframes for quote & line animations                              */
/* ------------------------------------------------------------------ */
const AnimStyles = () => (
  <style>{`
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; }
      50%      { opacity: 1;   }
    }
    @keyframes quote-border {
      0%   { background-position: 0% 0%;   }
      50%  { background-position: 0% 100%; }
      100% { background-position: 0% 0%;   }
    }
    @keyframes line-travel {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(300%); }
    }
    @keyframes line-travel-h {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  BlurFade — scroll-triggered reveal                                 */
/* ------------------------------------------------------------------ */
function BlurFade({
  children,
  delay = 0,
  yOffset = 8,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: yOffset, opacity: 0, filter: "blur(6px)" }}
      animate={
        isInView
          ? { y: 0, opacity: 1, filter: "blur(0px)" }
          : { y: yOffset, opacity: 0, filter: "blur(6px)" }
      }
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  WordReveal — word-by-word blur reveal on scroll                    */
/* ------------------------------------------------------------------ */
function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(8px)", y: 12 }
          }
          transition={{
            duration: 0.35,
            delay: i * 0.07,
            ease: "easeOut",
          }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  ThesisSection                                                      */
/* ------------------------------------------------------------------ */
export function ThesisSection() {
  return (
    <section className="relative w-full overflow-x-hidden bg-navy py-12 md:py-24 lg:py-32">
      <AnimStyles />

      {/* ── WebGL Celestial Sphere background ────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <CelestialSphere
          speed={0.3}
          className="h-full w-full"
        />
      </div>

      {/* ── Traveling accent lines (left & right edges) ──────────── */}
      <div className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-px bg-white/[0.06]">
        <div
          className="absolute h-32 w-px bg-gradient-to-b from-transparent via-pale-blue/40 to-transparent"
          style={{ animation: "line-travel 6s linear infinite" }}
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-px bg-white/[0.06]">
        <div
          className="absolute h-32 w-px bg-gradient-to-b from-transparent via-pale-blue/30 to-transparent"
          style={{ animation: "line-travel 8s linear infinite 2s" }}
        />
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-[1] h-px w-full bg-white/[0.06]">
        <div
          className="absolute h-px w-40 bg-gradient-to-r from-transparent via-pale-blue/30 to-transparent"
          style={{ animation: "line-travel-h 7s linear infinite 1s" }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <Container>
        <div className="relative z-10">
          {/* Eyebrow */}
          <BlurFade delay={0}>
            <Eyebrow className="mb-6 text-pale-blue/90">Our Thesis</Eyebrow>
          </BlurFade>

          {/* Word-by-word headline */}
          <WordReveal
            text="Where Critical Systems Meet Uncompromising Engineering"
            className="mb-10 max-w-5xl font-display text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:mb-20 md:text-5xl md:leading-[0.95] lg:text-6xl xl:text-7xl"
          />

          {/* Two-column thesis text */}
          <BlurFade delay={0.15}>
            <div className="mb-12 grid gap-6 md:mb-24 md:grid-cols-2 md:gap-12">
              <p className="font-body text-base font-light leading-relaxed text-pale-blue/70 md:col-span-2 md:text-lg">
                The infrastructure that moves capital, prices risk, and enforces
                compliance at scale isn&apos;t going to be built by bloated
                teams on 18-month timelines. It&apos;ll be built by small,
                senior crews who scope honestly, ship tight, and treat every line
                of code like someone&apos;s money depends on it. Because it
                does.
              </p>
              <p className="font-body text-base font-light leading-relaxed text-pale-blue/70 md:text-lg">
                Most teams split into two camps. You either build enterprise
                systems with legacy tooling and governance-by-committee, or you
                build protocol infrastructure fast and figure out security later.
                Both leave value on the table. One is too slow to matter. The
                other is too fragile to trust.
              </p>
              <p className="font-body text-base font-light leading-relaxed text-pale-blue/70 md:text-lg">
                We reject that tradeoff. Pricing engines, protocol middleware,
                compliance infrastructure — same philosophy across the board.
                Audit-ready from sprint one, not sprint last. Deterministic where
                reliability matters. Purpose-built where the problem demands it.
              </p>
            </div>
          </BlurFade>

          {/* Pull quote with animated gradient border */}
          <BlurFade delay={0.2}>
            <div className="relative my-12 overflow-hidden rounded-lg md:my-20">
              {/* Animated gradient border */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(180deg, rgba(220,235,255,0.4) 0%, transparent 30%, transparent 70%, rgba(220,235,255,0.3) 100%)",
                  backgroundSize: "100% 200%",
                  animation: "quote-border 4s ease-in-out infinite",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div className="relative bg-navy/80 py-8 pl-6 pr-6 backdrop-blur-md md:py-12 md:pl-16 md:pr-16">
                {/* Pulsing quote mark */}
                <div
                  className="absolute left-4 top-2 font-display text-4xl text-pale-blue md:left-8 md:top-4 md:text-6xl"
                  style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
                >
                  &ldquo;
                </div>
                <blockquote className="max-w-4xl font-display text-lg font-bold leading-tight text-white sm:text-xl md:text-3xl lg:text-4xl">
                  If your system can&apos;t survive an audit, you don&apos;t
                  have a product. You have a demo.{" "}
                  <span className="text-pale-blue">
                    Compliance is architecture, not a final sprint.
                  </span>
                </blockquote>
              </div>
            </div>
          </BlurFade>

          {/* Closing paragraph */}
          <BlurFade delay={0.25}>
            <p className="mx-auto mb-12 max-w-3xl text-center font-body text-base font-light leading-relaxed text-pale-blue/70 md:mb-24 md:text-lg">
              The teams that understand both the enterprise stack and the
              protocol layer — that can move between a Go monorepo and a Solana
              program without blinking — are the ones that will actually build
              the next generation of critical infrastructure. We build at that
              intersection. Not because it sounds good on a landing page, but
              because it&apos;s where honest engineering meets real capital.
            </p>
          </BlurFade>

        </div>
      </Container>
    </section>
  );
}
