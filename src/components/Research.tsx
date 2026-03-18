"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Link from "next/link";

const articles: {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  externalUrl?: string;
}[] = [
  {
    slug: "pricing-engine-liability",
    title: "Your Pricing Engine Isn't a System. It's a Liability.",
    description:
      "How rule-based pricing architectures silently erode margin, create compliance exposure, and become impossible to audit at scale.",
    tags: ["Pricing Infrastructure", "Enterprise Systems"],
    image: "/images/research/engine.png",
  },
  {
    slug: "pipeline-problem",
    title: "You Don't Have a Data Problem. You Have a Pipeline Problem.",
    description:
      "Why the reports your finance and ops teams don't trust aren't a data quality issue — they're a backend architecture issue.",
    tags: ["Backend Architecture", "Operational Finance"],
    image: "/images/research/pipelines.png",
  },
  {
    slug: "nobody-builds-for-the-audit",
    title: "Nobody Builds for the Audit. Then the Audit Arrives.",
    description:
      "Why compliance is always the last thing teams think about and the first thing that breaks them — and what it actually costs to fix it retroactively.",
    tags: ["Compliance Architecture", "Enterprise Infrastructure"],
    image: "/images/research/audit.png",
  },
  {
    slug: "agent-prompt-architecture",
    title: "Your AI Agent Isn't Broken. Your Prompt Is an Instruction Manual Written in Crayon.",
    description:
      "Why multi-agent systems fail in production — and what it takes to build ones that behave like software instead of guessing like interns.",
    tags: ["Agent Infrastructure", "Systems Engineering"],
    image: "/images/research/agent-prompt.png",
  },
  {
    slug: "realtime-systems-lie",
    title: "Your Real-Time Dashboard Isn't Real-Time. It's a Confident Lie.",
    description:
      "Why the number on your ops dashboard can be right on average and wrong right now — and what it actually takes to build a monitoring system your team can trust when it matters.",
    tags: ["Risk Engineering", "Data Infrastructure"],
    image: "/images/research/realtime.png",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Research() {
  return (
    <section id="research" className="relative py-28 md:py-36 bg-raised">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Research"
          title="Technical Writing"
          description="Not a blog. Deep technical content for engineers and protocol founders evaluating depth."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {articles.map((article) => {
            const Wrapper = article.externalUrl
              ? ({ children, className }: { children: React.ReactNode; className?: string }) => (
                  <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
                )
              : ({ children, className }: { children: React.ReactNode; className?: string }) => (
                  <Link href={`/research/${article.slug}`} className={className}>{children}</Link>
                );

            return (
              <motion.article
                key={article.slug}
                variants={card}
                className="group relative rounded-2xl overflow-hidden h-[450px] md:h-[550px] cursor-pointer"
              >
                <Wrapper>
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${article.image})`,
                    }}
                  >
                    {/* Fallback gradient if image doesn't load */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
                  </div>

                  {/* Dark Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-raised via-raised/85 to-raised/50 group-hover:from-raised/95 group-hover:via-raised/90 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-mono text-accent bg-accent-glow/50 backdrop-blur-sm rounded-md border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-heading leading-tight mb-3 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-body leading-relaxed mb-5 line-clamp-3">
                      {article.description}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent-alt transition-colors">
                      <span>Read Article</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </Wrapper>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
