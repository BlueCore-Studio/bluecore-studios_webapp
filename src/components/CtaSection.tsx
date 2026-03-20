"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BlurFade } from "@/components/ui/BlurFade";

type ContactMethod = "call" | "telegram" | "email";

const TELEGRAM_URL = "https://t.me/bluecorestudios";
const CALENDLY_URL = "https://calendly.com/dev-bluecorestudio/30min";

const TAB_TILES: Record<ContactMethod, string> = {
  call: "/CTA/phone.png",
  telegram: "/CTA/telegram.png",
  email: "/CTA/email.png",
};

function CtaDivider() {
  return (
    <div className="mb-6 flex items-center gap-3" aria-hidden>
      <div className="h-px flex-1 bg-white/20" />
      <div className="flex items-center gap-2">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-soft-white">
          <path d="M4 1L7 7H1L4 1Z" fill="currentColor" />
        </svg>
        <svg width="6" height="6" viewBox="0 0 6 6" className="text-soft-white">
          <circle cx="3" cy="3" r="2.5" fill="currentColor" />
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-soft-white">
          <rect x="1" y="1" width="6" height="6" fill="currentColor" />
        </svg>
      </div>
      <div className="h-px flex-1 bg-white/20" />
    </div>
  );
}

const contentMap: Record<
  ContactMethod,
  { headline: string; copy: string; helperText?: string }
> = {
  call: {
    headline: "Let's Build",
    copy: "No enterprise forms. No 3-week sales cycles. Book a short technical call and we'll tell you exactly how we can help.",
    helperText: "Recommended for active projects",
  },
  telegram: {
    headline: "Let's Build",
    copy: "Have a quick question or early idea? Telegram is best for fast, async conversations.",
  },
  email: {
    headline: "Let's Build",
    copy: "Prefer email or formal introductions? Send us a note and we'll get back to you shortly.",
  },
};

export function CtaSection() {
  const [selectedMethod, setSelectedMethod] =
    useState<ContactMethod>("call");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const current = contentMap[selectedMethod];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-deep-navy pt-12 pb-8 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16"
    >
      {/* Abstract background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -bottom-24 h-[380px] w-[380px] rounded-full bg-pale-blue/[0.08]" />
        <div
          className="absolute -left-20 -bottom-8 h-[180px] w-[900px] bg-pale-blue/[0.05]"
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
        <div
          className="absolute left-[200px] bottom-0 h-[120px] w-[800px] bg-pale-blue/[0.04]"
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
        <div className="absolute -right-20 -top-16 h-[320px] w-[320px] rounded-full bg-pale-blue/[0.06]" />
        <div className="absolute -right-16 top-1/3 h-[200px] w-[200px] rotate-45 rounded-lg border border-pale-blue/[0.04]" />
      </div>

      <Container className="relative">
        <BlurFade>
        <div
          className="cta-card-animate relative overflow-hidden rounded-2xl border border-navy/10 bg-navy px-6 py-8 shadow-[0_4px_24px_rgba(15,30,58,0.12)] md:px-14 md:py-14 lg:px-20 lg:py-16"
          style={{
            backgroundImage: `linear-gradient(165deg, rgb(15, 30, 58) 0%, rgb(12, 24, 46) 100%)`,
          }}
        >
          {/* Decorative treatment */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/[0.03]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full border border-white/[0.02]" aria-hidden />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* ——— LEFT SECTION ——— */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-pale-blue/70">
                  Contact
                </span>
                <h2 className="mt-3 font-display text-2xl font-medium leading-[1.2] tracking-[-0.03em] text-soft-white md:text-[1.75rem]">
                  {current.headline}
                </h2>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedMethod}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-[14px] leading-[1.65] text-pale-blue/80 md:text-[15px]"
                  >
                    {current.copy}
                  </motion.p>
                </AnimatePresence>
                {current.helperText && (
                  <p className="mt-3 hidden text-[13px] text-pale-blue/60 md:block">
                    {current.helperText}
                  </p>
                )}

                <div
                  role="tablist"
                  aria-label="Contact method"
                  className="mt-8 flex flex-nowrap gap-2 overflow-x-auto md:flex-wrap md:overflow-visible"
                >
                  {(
                    [
                      { id: "call" as ContactMethod, label: "Book a Call" },
                      { id: "telegram" as ContactMethod, label: "Telegram" },
                      { id: "email" as ContactMethod, label: "Email" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={selectedMethod === tab.id}
                      onClick={() => {
                        setSelectedMethod(tab.id);
                        setSubmitted(false);
                      }}
                      className={`shrink-0 rounded-lg px-3 py-2 text-[12px] font-medium transition-colors md:px-4 md:py-2.5 md:text-[13px] ${
                        selectedMethod === tab.id
                          ? "bg-soft-white text-navy"
                          : "border border-white/15 bg-white/5 text-pale-blue/90 hover:border-white/25 hover:bg-white/10"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tile beneath content — hidden on mobile */}
              <div className="relative hidden min-h-[180px] min-w-0 flex-col justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] md:flex">
                <div
                  aria-hidden
                  className="flex items-center justify-center p-6"
                >
                  <Image
                    key={selectedMethod}
                    src={TAB_TILES[selectedMethod]}
                    alt=""
                    width={180}
                    height={180}
                    className="object-contain opacity-90"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* ——— RIGHT SECTION ——— */}
            <div className="min-h-0 border-t border-white/[0.06] pt-6 md:min-h-[400px] md:pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <AnimatePresence mode="wait">
                {selectedMethod === "call" && (
                  <motion.div
                    key="call"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full min-h-0 md:min-h-[360px] flex-col"
                  >
                    <div className="mb-6 hidden h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] md:flex">
                      <svg className="h-5 w-5 text-pale-blue/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                        <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-medium text-soft-white">
                      30-minute technical discovery
                    </h3>
                    <p className="mb-4 text-[14px] leading-[1.55] text-pale-blue/80">
                      We&apos;ll assess fit, scope, and timeline.
                    </p>
                    <div className="hidden flex-grow border-t border-white/[0.06] pt-4 md:block">
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-pale-blue/50">
                        What to expect
                      </p>
                      <ul className="space-y-2 text-[13px] text-pale-blue/80">
                        <li className="flex items-start gap-2">
                          <span className="text-pale-blue/50">•</span>
                          Technical assessment of your project
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pale-blue/50">•</span>
                          Scope and timeline discussion
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pale-blue/50">•</span>
                          Clear next steps and recommendations
                        </li>
                      </ul>
                    </div>
                    <CtaDivider />
                    <div>
                      <Link
                        href={CALENDLY_URL}
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-soft-white px-6 text-[13px] font-medium text-navy transition-all hover:bg-pale-blue"
                      >
                        Book a Call
                      </Link>
                    </div>
                  </motion.div>
                )}

                {selectedMethod === "telegram" && (
                  <motion.div
                    key="telegram"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full min-h-0 md:min-h-[360px] flex-col"
                  >
                    <div className="mb-6 hidden h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] md:flex">
                      <svg className="h-5 w-5 text-pale-blue/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-medium text-soft-white">
                      Chat on Telegram
                    </h3>
                    <p className="mb-4 text-[14px] leading-[1.55] text-pale-blue/80">
                      Quick questions or early ideas. For scoped work, we&apos;ll likely suggest a call.
                    </p>
                    <div className="hidden flex-grow border-t border-white/[0.06] pt-4 md:block">
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-pale-blue/50">
                        Best for
                      </p>
                      <ul className="space-y-2 text-[13px] text-pale-blue/80">
                        <li className="flex items-start gap-2">
                          <span className="text-pale-blue/50">•</span>
                          Quick technical questions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pale-blue/50">•</span>
                          Early-stage project discussions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pale-blue/50">•</span>
                          Async conversations and updates
                        </li>
                      </ul>
                    </div>
                    <CtaDivider />
                    <div>
                      <Link
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-soft-white px-6 text-[13px] font-medium text-navy transition-all hover:bg-pale-blue"
                      >
                        Chat on Telegram
                      </Link>
                    </div>
                  </motion.div>
                )}

                {selectedMethod === "email" && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full min-h-0 md:min-h-[360px]"
                  >
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex h-full min-h-0 md:min-h-[360px] flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center"
                      >
                        <div className="mb-5 hidden h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] md:flex">
                          <svg className="h-5 w-5 text-pale-blue/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <h3 className="mb-2 font-display text-lg font-medium text-soft-white">
                          Message Sent
                        </h3>
                        <p className="text-[14px] text-pale-blue/70">
                          We reply within 1–2 business days.
                        </p>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setSending(true);
                          setError("");
                          const form = e.target as HTMLFormElement;
                          const formData = new FormData(form);
                          try {
                            const res = await fetch("/api/contact", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                name: formData.get("name"),
                                email: formData.get("email"),
                                description: formData.get("description"),
                              }),
                            });
                            if (!res.ok) {
                              const data = await res.json();
                              throw new Error(data.error || "Something went wrong.");
                            }
                            setSubmitted(true);
                          } catch (err) {
                            setError(err instanceof Error ? err.message : "Failed to send message.");
                          } finally {
                            setSending(false);
                          }
                        }}
                        className="flex h-full min-h-0 md:min-h-[360px] flex-col"
                      >
                        <div className="flex-grow space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label
                                htmlFor="cta-name"
                                className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-pale-blue/50"
                              >
                                Name
                              </label>
                              <input
                                id="cta-name"
                                name="name"
                                type="text"
                                required
                                placeholder="Your name"
                                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-[14px] text-soft-white placeholder:text-pale-blue/50 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="cta-email"
                                className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-pale-blue/50"
                              >
                                Email
                              </label>
                              <input
                                id="cta-email"
                                name="email"
                                type="email"
                                required
                                placeholder="your@email.com"
                                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-[14px] text-soft-white placeholder:text-pale-blue/50 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="cta-message"
                              className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-pale-blue/50"
                            >
                              Brief Description
                            </label>
                            <textarea
                              id="cta-message"
                              name="description"
                              rows={6}
                              required
                              placeholder="What are you building and where do you need help?"
                              className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-[14px] text-soft-white placeholder:text-pale-blue/50 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                            />
                          </div>
                        </div>
                        <CtaDivider />
                        <div>
                          {error && (
                            <p className="mb-3 text-center text-[13px] text-red-400">
                              {error}
                            </p>
                          )}
                          <button
                            type="submit"
                            disabled={sending}
                            className="flex h-10 w-full items-center justify-center rounded-lg bg-soft-white px-6 text-[13px] font-medium text-navy transition-all hover:bg-pale-blue disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {sending ? "Sending..." : "Build with Us"}
                          </button>
                          <p className="mt-2 text-center text-[12px] text-pale-blue/50">
                            We reply within 1–2 business days
                          </p>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        </BlurFade>
      </Container>
    </section>
  );
}
