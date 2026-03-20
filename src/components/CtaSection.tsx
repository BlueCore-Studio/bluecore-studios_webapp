"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

type ContactMethod = "call" | "telegram" | "email";

const TELEGRAM_URL = "https://t.me/bluecorestudios";
const CALENDLY_URL = "https://calendly.com/dev-bluecorestudio/30min";

const contentMap: Record<
  ContactMethod,
  { headline: string; copy: string; helperText?: string }
> = {
  call: {
    headline: "Let\u2019s Build",
    copy: "No enterprise forms. No 3-week sales cycles. Book a short technical call and we\u2019ll tell you exactly how we can help.",
    helperText: "Recommended for active projects",
  },
  telegram: {
    headline: "Let\u2019s Build",
    copy: "Have a quick question or early idea? Telegram is best for fast, async conversations.",
  },
  email: {
    headline: "Let\u2019s Build",
    copy: "Prefer email or formal introductions? Send us a note and we\u2019ll get back to you shortly.",
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
      className="relative overflow-hidden bg-deep-navy py-20 md:py-28 lg:py-32"
    >
      {/* Abstract background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-24 -left-32 h-[380px] w-[380px] rounded-full bg-pale-blue/[0.08]" />
        <div
          className="absolute -bottom-8 -left-20 h-[180px] w-[900px] bg-pale-blue/[0.05]"
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
        <div
          className="absolute bottom-0 left-[200px] h-[120px] w-[800px] bg-pale-blue/[0.04]"
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
        <div className="absolute -right-20 -top-16 h-[320px] w-[320px] rounded-full bg-pale-blue/[0.06]" />
        <div className="absolute -right-16 top-1/3 h-[200px] w-[200px] rotate-45 rounded-lg border border-pale-blue/[0.04]" />
      </div>

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(37, 99, 235, 0.06) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — Messaging + Selector */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pale-blue/70">
              Contact
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {current.headline}
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={selectedMethod}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-5 max-w-md text-[15px] leading-relaxed text-pale-blue/80"
              >
                {current.copy}
              </motion.p>
            </AnimatePresence>

            {current.helperText && (
              <p className="mt-3 text-[13px] text-pale-blue/50">
                {current.helperText}
              </p>
            )}

            {/* Pill selector */}
            <div className="mt-10 flex flex-wrap gap-3">
              {(
                [
                  { id: "call", label: "Book a Call" },
                  { id: "telegram", label: "Telegram" },
                  { id: "email", label: "Email" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedMethod(tab.id);
                    setSubmitted(false);
                  }}
                  aria-pressed={selectedMethod === tab.id}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    selectedMethod === tab.id
                      ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/25"
                      : "border border-white/15 bg-white/5 text-pale-blue/90 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Dynamic content panel */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {selectedMethod === "call" && (
                <motion.div
                  key="call"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-navy/60 p-8 backdrop-blur-sm"
                >
                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-blue/15">
                    <svg className="h-6 w-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h3 className="mb-3 font-display text-xl font-bold text-white">
                    30-minute technical discovery
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-pale-blue/70">
                    We&apos;ll assess fit, scope, and timeline.
                  </p>

                  <div className="flex-grow border-t border-white/[0.06] pt-4">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-pale-blue/50">
                      What to expect
                    </p>
                    <ul className="space-y-2.5 text-sm text-pale-blue/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary-blue">•</span>
                        Technical assessment of your project
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary-blue">•</span>
                        Scope and timeline discussion
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary-blue">•</span>
                        Clear next steps and recommendations
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={CALENDLY_URL}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-blue"
                    >
                      Book a Call
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
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
                  className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-navy/60 p-8 backdrop-blur-sm"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-blue/15">
                    <svg className="h-6 w-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <h3 className="mb-3 font-display text-xl font-bold text-white">
                    Chat on Telegram
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-pale-blue/70">
                    Quick questions or early ideas. For scoped work, we&apos;ll likely suggest a call.
                  </p>

                  <div className="flex-grow border-t border-white/[0.06] pt-4">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-pale-blue/50">
                      Best for
                    </p>
                    <ul className="space-y-2.5 text-sm text-pale-blue/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary-blue">•</span>
                        Quick technical questions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary-blue">•</span>
                        Early-stage project discussions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary-blue">•</span>
                        Async conversations and updates
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-blue"
                    >
                      Chat on Telegram
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
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
                  className="h-full"
                >
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-full flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-navy/60 p-10 text-center backdrop-blur-sm"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-blue/15">
                        <svg className="h-6 w-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold text-white">
                        Message Sent
                      </h3>
                      <p className="text-sm text-pale-blue/70">
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
                      className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-navy/60 p-8 backdrop-blur-sm"
                    >
                      <div className="flex-grow space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="cta-name"
                              className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-pale-blue/50"
                            >
                              Name
                            </label>
                            <input
                              id="cta-name"
                              name="name"
                              type="text"
                              required
                              placeholder="Your name"
                              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-pale-blue/40 focus:border-primary-blue/50 focus:outline-none focus:ring-1 focus:ring-primary-blue/30"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cta-email"
                              className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-pale-blue/50"
                            >
                              Email
                            </label>
                            <input
                              id="cta-email"
                              name="email"
                              type="email"
                              required
                              placeholder="your@email.com"
                              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-pale-blue/40 focus:border-primary-blue/50 focus:outline-none focus:ring-1 focus:ring-primary-blue/30"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="cta-message"
                            className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-pale-blue/50"
                          >
                            Brief Description
                          </label>
                          <textarea
                            id="cta-message"
                            name="description"
                            rows={4}
                            placeholder="What are you building and where do you need help?"
                            className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-pale-blue/40 focus:border-primary-blue/50 focus:outline-none focus:ring-1 focus:ring-primary-blue/30"
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        {error && (
                          <p className="mb-3 text-center text-sm text-red-400">
                            {error}
                          </p>
                        )}
                        <button
                          type="submit"
                          disabled={sending}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-blue disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {sending ? "Sending..." : "Build with Us"}
                          {!sending && (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
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
      </Container>
    </section>
  );
}
