"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Audience = "enterprise" | "startup";

// Minimal enterprise-style line icons (24x24)
const ICONS = {
  distributed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
      <path d="M10 7h4M10 17h4M7 10v4M17 10v4" />
    </svg>
  ),
  compliance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 14v4M12 10v8M17 6v12" />
    </svg>
  ),
  identity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6z" />
      <path d="M9 17v2a2 2 0 0 0 2 2h2" />
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  smartContract: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  defi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  token: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22v-7" />
    </svg>
  ),
  indexing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
} as const;

type IconKey = keyof typeof ICONS;

const ENTERPRISE_SERVICES = [
  {
    title: "Distributed Systems",
    description:
      "High-availability architectures built for scale — fault-tolerant, audited, and production-hardened.",
    tags: ["Rust", "Go", "Kubernetes", "Terraform"],
    icon: "distributed" as IconKey,
  },
  {
    title: "Compliance Middleware",
    description:
      "Regulatory screening, audit trails, and policy enforcement layers that sit between your systems and institutional requirements.",
    tags: ["KYC/AML", "Merkle Verification", "SOC 2"],
    icon: "compliance" as IconKey,
  },
  {
    title: "AI Agents & Automation",
    description:
      "Autonomous decision engines that execute complex operational strategies — optimization, rebalancing, and real-time response.",
    tags: ["Python", "LangChain", "ML Pipelines"],
    icon: "ai" as IconKey,
  },
  {
    title: "Data Pipelines & Analytics",
    description:
      "Event streaming, indexing, and ML-driven risk models powering real-time operational intelligence.",
    tags: ["Kafka", "PyTorch", "PostgreSQL", "ClickHouse"],
    icon: "data" as IconKey,
  },
  {
    title: "Identity & Access Systems",
    description:
      "Credential management, role-based access, and zero-trust architecture for regulated environments.",
    tags: ["OAuth", "SSO", "RBAC", "MFA"],
    icon: "identity" as IconKey,
  },
  {
    title: "Risk Engineering",
    description:
      "Real-time monitoring, anomaly detection, and automated response systems for high-stakes operations.",
    tags: ["Prometheus", "Grafana", "Custom Alerting"],
    icon: "risk" as IconKey,
  },
];

const STARTUP_SERVICES = [
  {
    title: "Smart Contract Systems",
    description:
      "Production-grade contracts for DeFi, NFTs, and governance. Audited, gas-optimized, and battle-tested.",
    tags: ["Solidity", "Rust", "Anchor", "Foundry"],
    icon: "smartContract" as IconKey,
  },
  {
    title: "DeFi Primitives",
    description:
      "Vaults, AMMs, lending protocols, and staking mechanisms across EVM and Solana ecosystems.",
    tags: ["EVM", "Solana", "Cross-chain"],
    icon: "defi" as IconKey,
  },
  {
    title: "AI Agents & Onchain Automation",
    description:
      "Autonomous systems that execute onchain strategies — yield optimization, rebalancing, liquidation protection.",
    tags: ["Python", "LangChain", "ML Pipelines"],
    icon: "ai" as IconKey,
  },
  {
    title: "Token Engineering",
    description:
      "Mechanism design, tokenomics modeling, and agent-based simulation for sustainable protocol economies.",
    tags: ["cadCAD", "Agent-based Models"],
    icon: "token" as IconKey,
  },
  {
    title: "Launch Infrastructure",
    description:
      "Token launches, liquidity bootstrapping, vesting contracts, and distribution pipelines — from testnet to mainnet.",
    tags: ["Solana", "EVM", "Merkle Distributors"],
    icon: "launch" as IconKey,
  },
  {
    title: "Indexing & Protocol Analytics",
    description:
      "Custom subgraphs, real-time dashboards, and on-chain data pipelines so your team sees everything.",
    tags: ["TheGraph", "Helius", "Dune", "Flipside"],
    icon: "indexing" as IconKey,
  },
];

function ServiceCard({
  title,
  description,
  tags,
  icon,
  index,
  isDarkMode,
}: {
  title: string;
  description: string;
  tags: string[];
  icon: IconKey;
  index: number;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`service-card-animate group relative flex flex-col rounded-xl shadow-card-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-elevated ${
        isDarkMode
          ? "border border-white/15 bg-navy hover:border-white/25"
          : "border border-gray/20 bg-white hover:border-primary-blue/20"
      }`}
      style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-xl ${
          isDarkMode ? "bg-white/20" : "bg-pale-blue/30"
        }`}
        aria-hidden
      />
      <div className="relative flex flex-col p-6">
        <div
          className={`mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-white/15 text-pale-blue group-hover:bg-white/25 group-hover:text-soft-white"
              : "bg-pale-blue/50 text-steel-blue group-hover:bg-pale-blue/80 group-hover:text-primary-blue"
          }`}
        >
          <span className="[&>svg]:h-4 [&>svg]:w-4 [&>svg]:stroke-[1.75]">
            {ICONS[icon]}
          </span>
        </div>
        <h3
          className={`text-lg font-semibold leading-snug ${
            isDarkMode ? "text-white" : "text-text-dark"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 flex-1 text-[15px] leading-[1.6] ${
            isDarkMode ? "text-white/80" : "text-gray"
          }`}
        >
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                isDarkMode
                  ? "border border-white/20 bg-white/10 text-pale-blue"
                  : "border border-steel-blue/12 bg-steel-blue/[0.06] text-steel-blue"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [audience, setAudience] = useState<Audience>("enterprise");
  const isDarkMode = audience === "enterprise";

  const services =
    audience === "enterprise" ? ENTERPRISE_SERVICES : STARTUP_SERVICES;

  return (
    <section
      id="services"
      className={`relative overflow-hidden border-y py-16 transition-colors duration-300 md:py-20 lg:py-24 ${
        isDarkMode
          ? "border-white/10 bg-navy"
          : "border-gray/10 bg-pale-blue/[0.15]"
      }`}
    >
      {/* Decorative shapes - primary-blue, secondary-blue, steel-blue, pale-blue */}
      <div
        className="services-shape-animate pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-lg"
        style={{
          "--shape-rotation": "12deg",
          animationDelay: "0s",
          background: isDarkMode
            ? "rgba(220, 235, 255, 0.45)"
            : "rgba(37, 99, 235, 0.35)",
        } as React.CSSProperties}
        aria-hidden
      />
      <div
        className="services-shape-animate pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-lg"
        style={{
          "--shape-rotation": "-15deg",
          animationDelay: "2s",
          background: isDarkMode
            ? "rgba(59, 130, 246, 0.42)"
            : "rgba(59, 130, 246, 0.32)",
        } as React.CSSProperties}
        aria-hidden
      />
      <div
        className="services-shape-animate pointer-events-none absolute -left-8 top-12 h-48 w-48 rounded-lg"
        style={{
          "--shape-rotation": "8deg",
          animationDelay: "1s",
          background: isDarkMode
            ? "rgba(91, 127, 166, 0.4)"
            : "rgba(91, 127, 166, 0.3)",
        } as React.CSSProperties}
        aria-hidden
      />
      <div
        className="services-shape-animate pointer-events-none absolute right-1/4 bottom-1/4 h-48 w-48 rounded-lg"
        style={{
          "--shape-rotation": "-10deg",
          animationDelay: "2.5s",
          background: isDarkMode
            ? "rgba(248, 250, 252, 0.25)"
            : "rgba(220, 235, 255, 0.5)",
        } as React.CSSProperties}
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-pale-blue/90">
            Services
          </Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl text-white">
            What We Build
          </h2>
          <p className="mt-3 text-white/80">
            Same team, same skills — two different front doors. Pick the lens
            that fits your world.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Audience"
            className={`inline-flex rounded-full p-1 transition-colors duration-300 ${
              isDarkMode
                ? "border border-white/20 bg-white/5"
                : "border border-gray/20 bg-soft-white"
            }`}
          >
            <button
              role="tab"
              aria-selected={audience === "enterprise"}
              onClick={() => setAudience("enterprise")}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                audience === "enterprise"
                  ? "bg-primary-blue text-white shadow-sm"
                  : isDarkMode
                    ? "text-white/60 hover:text-white"
                    : "text-gray hover:text-text-dark"
              }`}
            >
              Enterprise
            </button>
            <button
              role="tab"
              aria-selected={audience === "startup"}
              onClick={() => setAudience("startup")}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                audience === "startup"
                  ? "bg-primary-blue text-white shadow-sm"
                  : isDarkMode
                    ? "text-white/60 hover:text-white"
                    : "text-gray hover:text-text-dark"
              }`}
            >
              Startups
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={`${audience}-${service.title}`}
              title={service.title}
              description={service.description}
              tags={service.tags}
              icon={service.icon}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
