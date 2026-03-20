"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Send, MessageCircle, Mail, Calendar, ArrowRight } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import AnimateIn from "./AnimateIn";

type ContactMethod = "call" | "telegram" | "email";

interface ContentConfig {
  headline: string;
  copy: string;
  helperText?: string;
}

const contentMap: Record<ContactMethod, ContentConfig> = {
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

export default function Contact() {
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod>("call");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform background position based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!turnstileToken) {
      setError("Please complete the verification.");
      return;
    }

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
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setSending(false);
    }
  }

  const currentContent = contentMap[selectedMethod];

  return (
    <section 
      ref={sectionRef}
      id="contact-form"
      className="relative pt-28 md:pt-36 pb-20 md:pb-24 bg-raised overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/images/CTA_Background.png')",
          backgroundSize: "150%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: backgroundY,
        }}
      />
      {/* Dark overlay to reduce image distraction */}
      <div
        className="absolute inset-0 pointer-events-none bg-raised/60"
      />
      {/* Background overlay for better text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(33, 118, 255, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Messaging + Selector */}
          <div>
            <AnimateIn>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Contact
              </span>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-heading leading-tight">
                {currentContent.headline}
              </h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedMethod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 text-lg text-body leading-relaxed max-w-md"
                >
                  {currentContent.copy}
                </motion.p>
              </AnimatePresence>
              {currentContent.helperText && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-muted"
                >
                  {currentContent.helperText}
                </motion.p>
              )}
            </AnimateIn>

            {/* Pill Selector */}
            <AnimateIn delay={0.1} className="mt-10">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedMethod("call")}
                  className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    selectedMethod === "call"
                      ? "bg-accent text-white shadow-lg shadow-accent/25"
                      : "bg-card border border-edge text-body hover:border-edge-light hover:text-heading"
                  }`}
                  aria-pressed={selectedMethod === "call"}
                >
                  Book a Call
                </button>
                <button
                  onClick={() => setSelectedMethod("telegram")}
                  className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    selectedMethod === "telegram"
                      ? "bg-accent text-white shadow-lg shadow-accent/25"
                      : "bg-card border border-edge text-body hover:border-edge-light hover:text-heading"
                  }`}
                  aria-pressed={selectedMethod === "telegram"}
                >
                  Telegram
                </button>
                <button
                  onClick={() => setSelectedMethod("email")}
                  className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    selectedMethod === "email"
                      ? "bg-accent text-white shadow-lg shadow-accent/25"
                      : "bg-card border border-edge text-body hover:border-edge-light hover:text-heading"
                  }`}
                  aria-pressed={selectedMethod === "email"}
                >
                  Email
                </button>
              </div>
            </AnimateIn>
          </div>

          {/* Right — Dynamic Content Panel */}
          <AnimateIn delay={0.15}>
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {selectedMethod === "call" && (
                  <motion.div
                    key="call"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl bg-card/50 backdrop-blur-sm border border-edge/40 p-8 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-glow mb-6">
                      <Calendar size={22} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-heading mb-3">
                      30-minute technical discovery
                    </h3>
                    <p className="text-sm text-body leading-relaxed mb-4">
                      We'll assess fit, scope, and timeline.
                    </p>
                    <div className="space-y-4 flex-grow">
                      <div className="pt-4 border-t border-edge">
                        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                          What to expect
                        </p>
                        <ul className="space-y-2 text-sm text-body">
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>Technical assessment of your project</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>Scope and timeline discussion</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>Clear next steps and recommendations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href="https://calendly.com/dev-bluecorestudio/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                      >
                        Book a Call
                        <ArrowRight size={15} />
                      </a>
                    </div>
                    {/* Optional: Uncomment to add Calendly embed */}
                    {/* <div className="mt-6">
                      <div className="calendly-inline-widget" data-url="YOUR_CALENDLY_URL" style={{ minWidth: '320px', height: '630px' }}></div>
                    </div> */}
                  </motion.div>
                )}

                {selectedMethod === "telegram" && (
                  <motion.div
                    key="telegram"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl bg-card/50 backdrop-blur-sm border border-edge/40 p-8 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-glow mb-6">
                      <MessageCircle size={22} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-heading mb-3">
                      Chat on Telegram
                    </h3>
                    <p className="text-sm text-body leading-relaxed mb-4">
                      Quick questions or early ideas. For scoped work, we'll likely suggest a call.
                    </p>
                    <div className="space-y-4 flex-grow">
                      <div className="pt-4 border-t border-edge">
                        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                          Best for
                        </p>
                        <ul className="space-y-2 text-sm text-body">
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>Quick technical questions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>Early-stage project discussions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>Async conversations and updates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href="https://t.me/bluecorestudios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                      >
                        Chat on Telegram
                        <ArrowRight size={15} />
                      </a>
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
                        className="rounded-xl bg-card/50 backdrop-blur-sm border border-edge/40 p-10 text-center h-full flex flex-col items-center justify-center"
                      >
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-glow mx-auto mb-5">
                          <Send size={22} className="text-accent" />
                        </div>
                        <h3 className="font-display font-bold text-xl text-heading mb-2">
                          Message Sent
                        </h3>
                        <p className="text-sm text-body">
                          We reply within 1–2 business days.
                        </p>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="rounded-xl bg-card/50 backdrop-blur-sm border border-edge/40 p-8 h-full flex flex-col"
                      >
                        <div className="space-y-5 flex-grow">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                              >
                                Name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                              >
                                Email
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="description"
                              className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                            >
                              Brief Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              rows={4}
                              className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
                              placeholder="What are you building and where do you need help?"
                            />
                          </div>
                        </div>

                        <Turnstile
                          ref={turnstileRef}
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                          onSuccess={setTurnstileToken}
                          onError={() => setTurnstileToken(null)}
                          onExpire={() => setTurnstileToken(null)}
                          options={{ size: "flexible", theme: "dark", appearance: "interaction-only" }}
                          className="mt-4"
                        />

                        <div className="mt-4">
                          {error && (
                            <p className="text-sm text-red-400 mb-3 text-center">
                              {error}
                            </p>
                          )}
                          <button
                            type="submit"
                            disabled={sending || !turnstileToken}
                            className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {sending ? "Sending..." : "Build with Us"}
                            {!sending && <Send size={15} />}
                          </button>
                          <p className="text-xs text-muted text-center mt-2">
                            We reply within 1–2 business days
                          </p>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
