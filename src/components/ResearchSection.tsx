"use client";

import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { BlurFade } from "@/components/ui/BlurFade";

const RESEARCH_POSTS = [
  {
    slug: "pricing-engine-liability",
    tags: ["Pricing Infrastructure", "Enterprise Systems"],
    title: "Your Pricing Engine Isn't a System. It's a Liability.",
    description:
      "How rule-based pricing architectures silently erode margin, create compliance exposure, and become impossible to audit at scale.",
    image: "/articles/engine.jpg",
  },
  {
    slug: "pipeline-problem",
    tags: ["Backend Architecture", "Operational Finance"],
    title: "You Don't Have a Data Problem. You Have a Pipeline Problem.",
    description:
      "Why the reports your finance and ops teams don't trust aren't a data quality issue — they're a backend architecture issue.",
    image: "/articles/pipelines.jpg",
  },
  {
    slug: "nobody-builds-for-audit",
    tags: ["Compliance Architecture", "Enterprise Infrastructure"],
    title: "Nobody Builds for the Audit. Then the Audit Arrives.",
    description:
      "Why compliance is always the last thing teams think about and the first thing that breaks them — and what it actually costs to fix it retroactively.",
    image: "/articles/audit.jpg",
  },
  {
    slug: "agent-prompt-crayon",
    tags: ["Agent Infrastructure", "Systems Engineering"],
    title:
      "Your AI Agent Isn't Broken. Your Prompt Is an Instruction Manual Written in Crayon.",
    description:
      "Why multi-agent systems fail in production — and what it takes to build ones that behave like software instead of guessing like interns.",
    image: "/articles/agent-prompt.jpg",
  },
  {
    slug: "evm-solana-account-model",
    tags: ["DeFi Infrastructure", "Protocol Design"],
    title: "EVM Developers on Solana: What the Account Model Actually Changes",
    description:
      "Most EVM-to-Solana comparisons stop at TPS and gas costs. The architectural difference that actually matters is that EVM contracts own their state and Solana programs don't.",
    image: "/articles/evm_to_solana.jpg",
  },
  {
    slug: "realtime-dashboard-lie",
    tags: ["Risk Engineering", "Data Infrastructure"],
    title: "Your Real-Time Dashboard Isn't Real-Time. It's a Confident Lie.",
    description:
      "Why the number on your ops dashboard can be right on average and wrong right now — and what it actually takes to build a monitoring system your team can trust when it matters.",
    image: "/articles/realtime.jpg",
  },
];

export function ResearchSection() {
  return (
    <Section
      id="research"
      className="relative overflow-hidden py-24 md:py-28 lg:py-32"
      contained={false}
      style={{ backgroundColor: "#2563EB" }}
    >
      <Container className="relative">
        <BlurFade>
        <Eyebrow className="mb-6 text-white/80">Research</Eyebrow>
        <h2 className="text-3xl font-medium leading-[1.18] tracking-[-0.025em] text-white md:text-4xl">
          Technical Writing
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-white/90 md:text-base">
          Not a blog. Deep technical content for engineers and protocol founders
          evaluating depth.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative block overflow-hidden rounded-lg bg-white shadow-[0_2px_12px_rgba(15,30,58,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,30,58,0.1)]"
            >
              <div
                aria-hidden
                className="absolute -bottom-14 -right-14 h-44 w-44 opacity-[0.12]"
                style={{
                  background: "#2563EB",
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0F1E3A]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray">
                  {post.tags.join(" · ")}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-text-dark transition-colors group-hover:text-[#2563EB]">
                  {post.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-gray">
                  {post.description}
                </p>
                <span className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#2563EB] transition-colors group-hover:text-[#14B8A6]">
                  Read Article
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-12 inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/10 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/20 hover:text-white"
        >
          View all articles
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        </BlurFade>
      </Container>
    </Section>
  );
}
