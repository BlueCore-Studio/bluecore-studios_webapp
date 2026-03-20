import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Restrained geometric motif - oversized, cropped, atmospheric */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[32rem] w-[32rem] rounded-full border border-steel-blue/[0.04] bg-pale-blue/[0.05]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[15%] top-1/4 h-36 w-36 rotate-45 rounded-lg border border-steel-blue/[0.03]"
        aria-hidden
      />
      <div className="relative max-w-3xl">
        <Eyebrow className="mb-6">Enterprise solutions</Eyebrow>
        <h1 className="text-4xl font-medium leading-[1.12] tracking-[-0.03em] text-text-dark md:text-5xl lg:text-[3.25rem] lg:leading-[1.14]">
          Strategic solutions for modern enterprises
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-gray">
          Trusted by leading organizations to deliver precision, clarity, and
          measurable outcomes.
        </p>
        <div className="mt-12 flex gap-5">
          <Button size="lg">Start a conversation</Button>
          <Button variant="outline" size="lg">
            Learn more
          </Button>
        </div>
      </div>
    </Section>
  );
}
