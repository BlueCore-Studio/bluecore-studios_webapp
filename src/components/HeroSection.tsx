import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden py-10 sm:py-24 md:py-32 lg:py-40">
      {/* Restrained geometric motif — hidden on mobile to avoid overflow */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 hidden h-[32rem] w-[32rem] rounded-full border border-steel-blue/[0.04] bg-pale-blue/[0.05] sm:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[15%] top-1/4 hidden h-36 w-36 rotate-45 rounded-lg border border-steel-blue/[0.03] sm:block"
        aria-hidden
      />
      <div className="relative max-w-3xl">
        <Eyebrow className="mb-3 sm:mb-6">Enterprise solutions</Eyebrow>
        <h1 className="text-2xl font-medium leading-[1.2] tracking-[-0.02em] text-text-dark sm:text-4xl sm:leading-[1.15] sm:tracking-[-0.03em] md:text-5xl lg:text-[3.25rem] lg:leading-[1.14]">
          Strategic solutions for modern enterprises
        </h1>
        <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-gray sm:mt-8 sm:text-[17px] sm:leading-[1.65]">
          Trusted by leading organizations to deliver precision, clarity, and
          measurable outcomes.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:mt-12 sm:flex-row sm:gap-5">
          <Button size="md" className="w-full sm:w-auto sm:!h-11 sm:!px-7 sm:!text-sm">
            Start a conversation
          </Button>
          <Button variant="outline" size="md" className="w-full sm:w-auto sm:!h-11 sm:!px-7 sm:!text-sm">
            Learn more
          </Button>
        </div>
      </div>
    </Section>
  );
}
