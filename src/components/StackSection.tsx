"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

type Category = "all" | "frontend" | "backend" | "mobile" | "devops";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "devops", label: "DevOps" },
];

const STACK_ITEMS: { name: string; category: Category; iconSlug: string }[] = [
  { name: "React", category: "frontend", iconSlug: "react" },
  { name: "Vue.js", category: "frontend", iconSlug: "vuedotjs" },
  { name: "Angular", category: "frontend", iconSlug: "angular" },
  { name: "Next.js", category: "frontend", iconSlug: "nextdotjs" },
  { name: "Node.js", category: "backend", iconSlug: "nodedotjs" },
  { name: "Python", category: "backend", iconSlug: "python" },
  { name: "Rust", category: "backend", iconSlug: "rust" },
  { name: "Go", category: "backend", iconSlug: "go" },
  { name: "Laravel", category: "backend", iconSlug: "laravel" },
  { name: "Swift", category: "mobile", iconSlug: "swift" },
  { name: "React Native", category: "mobile", iconSlug: "react" },
  { name: "Flutter", category: "mobile", iconSlug: "flutter" },
  { name: "Docker", category: "devops", iconSlug: "docker" },
  { name: "Kubernetes", category: "devops", iconSlug: "kubernetes" },
  { name: "GCP", category: "devops", iconSlug: "googlecloud" },
  { name: "AWS", category: "devops", iconSlug: "__aws" },
  { name: "PostgreSQL", category: "devops", iconSlug: "postgresql" },
  { name: "Figma", category: "frontend", iconSlug: "figma" },
];

const ICON_COLOR = "5B7FA6";

function StackDivider() {
  return (
    <div className="mx-auto mb-8 flex w-full max-w-[200px] items-center gap-3 md:mb-10" aria-hidden>
      <div className="h-px flex-1 bg-steel-blue/25" />
      <div className="flex shrink-0 items-center gap-2">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-primary-blue">
          <path d="M4 1L7 7H1L4 1Z" fill="currentColor" />
        </svg>
        <svg width="6" height="6" viewBox="0 0 6 6" className="text-primary-blue">
          <circle cx="3" cy="3" r="2.5" fill="currentColor" />
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-primary-blue">
          <rect x="1" y="1" width="6" height="6" fill="currentColor" />
        </svg>
      </div>
      <div className="h-px flex-1 bg-steel-blue/25" />
    </div>
  );
}

// AWS icon not available on simpleicons CDN — encoded inline from simple-icons source
const AWS_ICON_SVG = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%235B7FA6"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/></svg>')}`;

const CATEGORY_COLORS: Record<Category, { color: string; colorLight: string }> = {
  all: { color: "rgb(37, 99, 235)", colorLight: "rgba(37, 99, 235, 0.08)" },
  frontend: { color: "rgb(59, 130, 246)", colorLight: "rgba(59, 130, 246, 0.08)" },
  backend: { color: "rgb(91, 127, 166)", colorLight: "rgba(91, 127, 166, 0.08)" },
  mobile: { color: "rgb(107, 148, 194)", colorLight: "rgba(107, 148, 194, 0.08)" },
  devops: { color: "rgb(15, 30, 58)", colorLight: "rgba(15, 30, 58, 0.06)" },
};

/* ── All: 2x2 dashboard grid ── */
function AllShape({ isActive }: { isActive: boolean }) {
  const c = CATEGORY_COLORS.all;
  const border = isActive ? c.color : "rgba(148, 163, 184, 0.25)";
  const bg = isActive ? c.colorLight : "white";
  const tileBg = isActive ? "rgba(37, 99, 235, 0.12)" : "rgba(148, 163, 184, 0.08)";
  return (
    <div
      className="flex h-[120px] w-full flex-col overflow-hidden rounded-xl border-[1.5px] transition-all duration-200"
      style={{ borderColor: border, backgroundColor: bg }}
    >
      <div className="flex h-6 items-center gap-1 border-b px-2.5" style={{ borderColor: border }}>
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? c.color : "rgba(148,163,184,0.4)" }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? c.color : "rgba(148,163,184,0.3)" }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? c.color : "rgba(148,163,184,0.2)" }} />
      </div>
      <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-1.5 p-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-md" style={{ backgroundColor: tileBg }} />
        ))}
      </div>
    </div>
  );
}

/* ── Frontend: browser window ── */
function BrowserShape({ isActive }: { isActive: boolean }) {
  const c = CATEGORY_COLORS.frontend;
  const border = isActive ? c.color : "rgba(148, 163, 184, 0.25)";
  const bg = isActive ? c.colorLight : "white";
  return (
    <div
      className="flex h-[120px] w-full flex-col overflow-hidden rounded-xl border-[1.5px] transition-all duration-200"
      style={{ borderColor: border, backgroundColor: bg }}
    >
      {/* Title bar */}
      <div className="flex h-6 items-center gap-1 border-b px-2.5" style={{ borderColor: border }}>
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? "#EF4444" : "rgba(148,163,184,0.4)" }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? "#F59E0B" : "rgba(148,163,184,0.3)" }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? "#22C55E" : "rgba(148,163,184,0.2)" }} />
      </div>
      {/* Address bar */}
      <div className="flex h-5 items-center px-2.5" style={{ borderBottom: `1px solid ${border}` }}>
        <div
          className="h-2 w-3/4 rounded-sm"
          style={{ backgroundColor: isActive ? "rgba(59,130,246,0.15)" : "rgba(148,163,184,0.1)" }}
        />
      </div>
      {/* Content area */}
      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <div className="h-2 w-full rounded-sm" style={{ backgroundColor: isActive ? "rgba(59,130,246,0.12)" : "rgba(148,163,184,0.08)" }} />
        <div className="h-2 w-4/5 rounded-sm" style={{ backgroundColor: isActive ? "rgba(59,130,246,0.09)" : "rgba(148,163,184,0.06)" }} />
        <div className="h-2 w-3/5 rounded-sm" style={{ backgroundColor: isActive ? "rgba(59,130,246,0.06)" : "rgba(148,163,184,0.04)" }} />
      </div>
    </div>
  );
}

/* ── Backend: terminal ── */
function TerminalShape({ isActive }: { isActive: boolean }) {
  const c = CATEGORY_COLORS.backend;
  const border = isActive ? c.color : "rgba(148, 163, 184, 0.25)";
  const headerBg = isActive ? c.color : "rgba(148, 163, 184, 0.12)";
  const bodyBg = isActive ? "rgb(20, 30, 42)" : "rgba(15, 23, 42, 0.04)";
  const lineBright = isActive ? "rgba(91, 200, 166, 0.7)" : "rgba(148,163,184,0.2)";
  const lineDim = isActive ? "rgba(91, 200, 166, 0.35)" : "rgba(148,163,184,0.12)";
  return (
    <div
      className="flex h-[120px] w-full flex-col overflow-hidden rounded-xl border-[1.5px] transition-all duration-200"
      style={{ borderColor: border }}
    >
      {/* Dark header */}
      <div className="flex h-6 items-center gap-1 px-2.5" style={{ backgroundColor: headerBg }}>
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? "rgba(255,255,255,0.5)" : "rgba(148,163,184,0.4)" }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? "rgba(255,255,255,0.35)" : "rgba(148,163,184,0.3)" }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "rgba(148,163,184,0.2)" }} />
      </div>
      {/* Terminal body */}
      <div className="flex flex-1 flex-col gap-1.5 p-2.5" style={{ backgroundColor: bodyBg }}>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5" style={{ backgroundColor: lineBright }} />
          <div className="h-1.5 w-3/4 rounded-sm" style={{ backgroundColor: lineBright }} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5" style={{ backgroundColor: lineDim }} />
          <div className="h-1.5 w-1/2 rounded-sm" style={{ backgroundColor: lineDim }} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5" style={{ backgroundColor: lineDim }} />
          <div className="h-1.5 w-2/3 rounded-sm" style={{ backgroundColor: lineDim }} />
        </div>
        {/* Cursor blink */}
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5" style={{ backgroundColor: lineBright }} />
          <div className="h-3 w-1.5 rounded-sm" style={{ backgroundColor: lineBright, opacity: isActive ? 1 : 0.4 }} />
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: phone ── */
function PhoneShape({ isActive }: { isActive: boolean }) {
  const c = CATEGORY_COLORS.mobile;
  const border = isActive ? c.color : "rgba(148, 163, 184, 0.25)";
  const bg = isActive ? c.colorLight : "white";
  const barColor = isActive ? "rgba(107,148,194,0.2)" : "rgba(148,163,184,0.1)";
  return (
    <div className="flex h-[120px] w-full items-center justify-center" style={{ backgroundColor: "transparent" }}>
      <div
        className="flex h-[110px] w-[62px] flex-col overflow-hidden rounded-2xl border-[2px] transition-all duration-200"
        style={{ borderColor: border, backgroundColor: bg }}
      >
        {/* Notch */}
        <div className="mx-auto mt-1.5 h-1 w-5 rounded-full" style={{ backgroundColor: isActive ? c.color : "rgba(148,163,184,0.25)" }} />
        {/* Screen content */}
        <div className="flex flex-1 flex-col gap-1.5 px-2 pt-2.5">
          <div className="h-1.5 w-full rounded-sm" style={{ backgroundColor: barColor }} />
          <div className="h-1.5 w-4/5 rounded-sm" style={{ backgroundColor: barColor }} />
          <div className="h-1.5 w-3/5 rounded-sm" style={{ backgroundColor: barColor }} />
          <div className="mt-auto mb-1 h-4 w-full rounded-md" style={{ backgroundColor: isActive ? "rgba(107,148,194,0.18)" : "rgba(148,163,184,0.06)" }} />
        </div>
        {/* Home indicator */}
        <div className="mx-auto mb-1.5 h-0.5 w-5 rounded-full" style={{ backgroundColor: isActive ? c.color : "rgba(148,163,184,0.2)" }} />
      </div>
    </div>
  );
}

/* ── DevOps: cloud with nodes ── */
function CloudShape({ isActive }: { isActive: boolean }) {
  const c = CATEGORY_COLORS.devops;
  const stroke = isActive ? c.color : "rgba(148, 163, 184, 0.4)";
  const fill = isActive ? c.colorLight : "rgba(148, 163, 184, 0.04)";
  const nodeFill = isActive ? c.color : "rgba(148, 163, 184, 0.3)";
  const lineStroke = isActive ? "rgba(15, 30, 58, 0.3)" : "rgba(148, 163, 184, 0.15)";
  return (
    <div className="flex h-[120px] w-full items-center justify-center">
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
        {/* Cloud shape */}
        <path
          d="M30 65 C10 65 8 48 22 42 C18 25 38 15 52 22 C58 10 82 10 88 22 C102 18 112 30 108 45 C118 50 115 65 100 65 Z"
          stroke={stroke}
          strokeWidth="1.5"
          fill={fill}
        />
        {/* Connection lines */}
        <line x1="45" y1="45" x2="60" y2="38" stroke={lineStroke} strokeWidth="1" />
        <line x1="60" y1="38" x2="78" y2="45" stroke={lineStroke} strokeWidth="1" />
        <line x1="60" y1="38" x2="60" y2="52" stroke={lineStroke} strokeWidth="1" />
        {/* Nodes */}
        <circle cx="45" cy="45" r="4" fill={nodeFill} />
        <circle cx="60" cy="38" r="5" fill={nodeFill} />
        <circle cx="78" cy="45" r="4" fill={nodeFill} />
        <circle cx="60" cy="52" r="3.5" fill={nodeFill} />
      </svg>
    </div>
  );
}

const SHAPE_COMPONENTS: Record<Category, React.ComponentType<{ isActive: boolean }>> = {
  all: AllShape,
  frontend: BrowserShape,
  backend: TerminalShape,
  mobile: PhoneShape,
  devops: CloudShape,
};

function CategoryCard({
  category,
  label,
  count,
  isActive,
  onClick,
}: {
  category: Category;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const colors = CATEGORY_COLORS[category];
  const ShapeComponent = SHAPE_COMPONENTS[category];

  return (
    <button
      onClick={onClick}
      className={`group flex cursor-pointer flex-col items-center gap-2 transition-all duration-200 ${
        isActive ? "" : "opacity-75 hover:opacity-100"
      }`}
    >
      <ShapeComponent isActive={isActive} />
      <span
        className={`text-[13px] font-semibold transition-colors duration-200 ${
          isActive ? "text-text-dark" : "text-gray group-hover:text-text-dark"
        }`}
        style={isActive ? { color: colors.color } : undefined}
      >
        {label}
      </span>
      <span
        className={`text-[11px] font-medium transition-colors duration-200 ${
          isActive ? "text-steel-blue" : "text-gray/50"
        }`}
      >
        {count} tools
      </span>
    </button>
  );
}

function StackItem({
  name,
  iconSlug,
  index,
}: {
  name: string;
  iconSlug: string;
  index: number;
}) {
  return (
    <div
      className="stack-grid-item flex items-center gap-3 rounded-lg border border-gray/15 bg-white px-4 py-3 shadow-card-soft transition-colors duration-150 hover:border-primary-blue/30 hover:shadow-md"
      style={{ animationDelay: `${index * 20}ms`, opacity: 0 }}
    >
      <img
        src={iconSlug === "__aws" ? AWS_ICON_SVG : `https://cdn.simpleicons.org/${iconSlug}/${ICON_COLOR}`}
        alt=""
        className="h-6 w-6 shrink-0 object-contain"
      />
      <span className="text-sm font-medium text-text-dark">{name}</span>
    </div>
  );
}

export function StackSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredItems =
    activeCategory === "all"
      ? STACK_ITEMS
      : STACK_ITEMS.filter((item) => item.category === activeCategory);

  const getCategoryCount = (id: Category) =>
    id === "all"
      ? STACK_ITEMS.length
      : STACK_ITEMS.filter((item) => item.category === id).length;

  return (
    <section className="border-b border-gray/10 bg-soft-white pt-12 md:pt-14 pb-20 md:pb-24">
      <Container>
        <StackDivider />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-medium uppercase tracking-wider text-primary-blue">
            Stack
          </h2>
          <h3 className="mt-2.5 text-2xl font-semibold text-text-dark sm:text-3xl">
            Technologies We Ship With
          </h3>
          <p className="mt-3.5 text-[15px] leading-relaxed text-gray">
            An engineer will scan this in 3 seconds. We made sure it&apos;s
            worth the look.
          </p>
        </div>

        <div className="mt-14 lg:mt-16">
          {/* Shape card selector */}
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-5 sm:gap-5">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat.id}
                label={cat.label}
                count={getCategoryCount(cat.id)}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>

          {/* Technology grid */}
          <div className="mx-auto mt-10 max-w-3xl lg:mt-12">
            <div
              key={activeCategory}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
            >
              {filteredItems.map((item, index) => (
                <StackItem
                  key={item.name}
                  name={item.name}
                  iconSlug={item.iconSlug}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
