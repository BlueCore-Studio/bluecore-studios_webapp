export type Article = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
};

export const articles: Record<string, Article> = {
  "pricing-engine-liability": {
    slug: "pricing-engine-liability",
    title: "Your Pricing Engine Isn't a System. It's a Liability.",
    description:
      "How rule-based pricing architectures silently erode margin, create compliance exposure, and become impossible to audit at scale.",
    tags: ["Pricing Infrastructure", "Enterprise Systems"],
    image: "/articles/engine.jpg",
    author: "Bluecore Team",
    date: "2024-01-15",
    readTime: "12 min read",
  },
  "pipeline-problem": {
    slug: "pipeline-problem",
    title: "You Don't Have a Data Problem. You Have a Pipeline Problem.",
    description:
      "Why the reports your finance and ops teams don't trust aren't a data quality issue — they're a backend architecture issue.",
    tags: ["Backend Architecture", "Operational Finance"],
    image: "/articles/pipelines.jpg",
    author: "Bluecore Team",
    date: "2024-02-20",
    readTime: "15 min read",
  },
  "nobody-builds-for-audit": {
    slug: "nobody-builds-for-audit",
    title: "Nobody Builds for the Audit. Then the Audit Arrives.",
    description:
      "Why compliance is always the last thing teams think about and the first thing that breaks them — and what it actually costs to fix it retroactively.",
    tags: ["Compliance Architecture", "Enterprise Infrastructure"],
    image: "/articles/audit.jpg",
    author: "Bluecore Team",
    date: "2024-03-10",
    readTime: "14 min read",
  },
  "agent-prompt-crayon": {
    slug: "agent-prompt-crayon",
    title:
      "Your AI Agent Isn't Broken. Your Prompt Is an Instruction Manual Written in Crayon.",
    description:
      "Why multi-agent systems fail in production — and what it takes to build ones that behave like software instead of guessing like interns.",
    tags: ["Agent Infrastructure", "Systems Engineering"],
    image: "/articles/agent-prompt.jpg",
    author: "Bluecore Team",
    date: "2024-04-05",
    readTime: "18 min read",
  },
  "evm-solana-account-model": {
    slug: "evm-solana-account-model",
    title: "EVM Developers on Solana: What the Account Model Actually Changes",
    description:
      "Most EVM-to-Solana comparisons stop at TPS and gas costs. The architectural difference that actually matters is that EVM contracts own their state and Solana programs don't.",
    tags: ["DeFi Infrastructure", "Protocol Design"],
    image: "/articles/evm_to_solana.jpg",
    author: "Bluecore Team",
    date: "2023-11-08",
    readTime: "18 min read",
  },
  "realtime-dashboard-lie": {
    slug: "realtime-dashboard-lie",
    title: "Your Real-Time Dashboard Isn't Real-Time. It's a Confident Lie.",
    description:
      "Why the number on your ops dashboard can be right on average and wrong right now — and what it actually takes to build a monitoring system your team can trust when it matters.",
    tags: ["Risk Engineering", "Data Infrastructure"],
    image: "/articles/realtime.jpg",
    author: "Bluecore Team",
    date: "2026-03-18",
    readTime: "16 min read",
  },
};
