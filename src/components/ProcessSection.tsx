import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const STEPS = [
  {
    number: "1",
    title: "Discovery Call",
    body: "Discuss your vision, goals, and requirements.",
  },
  {
    number: "2",
    title: "Strategy",
    body: "Create a clear plan and precise design direction.",
  },
  {
    number: "3",
    title: "Execution",
    body: "Build and refine a polished digital experience.",
  },
];

export function ProcessSection() {
  return (
    <Section id="process" className="bg-white py-24 md:py-28 lg:py-32">
      <Eyebrow className="mb-6">Workflow</Eyebrow>
      <h2 className="max-w-2xl text-3xl font-medium leading-[1.18] tracking-[-0.025em] text-text-dark md:text-4xl">
        Our clear and structured process
      </h2>
      <div className="mt-18 grid gap-12 lg:grid-cols-[1fr,minmax(340px,400px)] lg:gap-20 lg:items-start">
        {/* Left: Process steps */}
        <div className="space-y-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex gap-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[13px] font-semibold text-steel-blue">
                {step.number}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-gray">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Right: Dark panel */}
        <div className="relative overflow-hidden rounded-lg border border-navy/60 bg-navy p-8 md:p-10">
          {/* Subtle cropped geometric shapes */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-soft-white/[0.04] bg-pale-blue/[0.04]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-6 right-6 h-28 w-28 rotate-45 rounded-lg border border-soft-white/[0.03]"
            aria-hidden
          />
          <div className="relative">
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-soft-white md:text-2xl">
              Fast, structured delivery
            </h3>
            <p className="mt-4 text-[15px] leading-[1.6] text-pale-blue/90">
              Designed for clarity, consistency, and efficient implementation.
            </p>
            <div className="mt-8">
              <Button variant="light" size="lg">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
