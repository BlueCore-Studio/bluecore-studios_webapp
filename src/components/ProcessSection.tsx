import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
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
    <Section
      id="process"
      className="border-x border-t border-gray/10 bg-soft-white pt-14 md:pt-16 pb-10 md:pb-12"
      contained={false}
    >
      <Container>
        <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-gray/15 bg-white p-8 shadow-sm md:p-10">
          {/* Blue circle — upper right of main card, clipped */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-blue md:-right-28 md:-top-28 md:h-80 md:w-80"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr,minmax(320px,380px)] lg:gap-14 lg:items-start">
          <div className="relative overflow-hidden rounded-lg border border-gray/10 bg-white p-6 md:p-8 shadow-sm">
            {/* Numbered squares — bottom right of workflow card (hidden on mobile) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -bottom-4 hidden h-40 w-40 rotate-12 items-start justify-start rounded-lg bg-steel-blue p-2.5 md:-right-12 md:-bottom-6 md:flex md:h-48 md:w-48 md:p-3"
            >
              <span className="text-[13px] font-semibold text-white/90 md:text-[15px]">1.</span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -bottom-8 hidden h-36 w-36 -rotate-6 items-start justify-start rounded-lg bg-pale-blue p-2.5 md:-right-6 md:-bottom-10 md:flex md:h-44 md:w-44 md:p-3"
            >
              <span className="text-[13px] font-semibold text-navy/90 md:text-[15px]">2.</span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute right-4 -bottom-16 hidden h-32 w-32 rotate-6 items-start justify-start rounded-lg bg-secondary-blue p-2.5 md:right-6 md:-bottom-20 md:flex md:h-40 md:w-40 md:p-3"
            >
              <span className="text-[13px] font-semibold text-white/90 md:text-[15px]">3.</span>
            </div>
            <div className="relative">
            <Eyebrow className="mb-4">Workflow</Eyebrow>
            <h2 className="max-w-2xl text-2xl font-medium leading-[1.18] tracking-[-0.025em] text-text-dark md:text-3xl">
              Our clear and structured process
            </h2>
            <div className="mt-10 space-y-8">
              {STEPS.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[12px] font-semibold text-steel-blue">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-text-dark">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[1.6] text-gray">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative min-h-[200px] overflow-hidden rounded-lg border border-navy/60 bg-navy p-6 md:p-8">
              <div
                className="pointer-events-none absolute bottom-6 right-6 h-28 w-28 rotate-45 rounded-lg border border-soft-white/[0.03]"
                aria-hidden
              />
              <div className="relative">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-soft-white md:text-xl">
                  Fast, structured delivery
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-pale-blue/90">
                  Designed for clarity, consistency, and efficient implementation.
                </p>
                <div className="mt-6">
                  <a
                    href="https://calendly.com/dev-bluecorestudio/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="light" size="md">
                      Book a Call
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-steel-blue/20 bg-pale-blue/30 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-dark md:text-xl">
                Clear communication
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-steel-blue/90">
                Weekly syncs, async updates. Transparent pricing, no surprises.
              </p>
            </div>
          </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
