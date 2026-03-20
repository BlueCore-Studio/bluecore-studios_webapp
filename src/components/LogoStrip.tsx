import { Section } from "@/components/ui/Section";

const PLACEHOLDER_LOGOS = [
  "Acme Corp",
  "Northgate",
  "Sterling",
  "Vantage",
  "Meridian",
];

export function LogoStrip() {
  return (
    <Section className="border-y border-gray/15 bg-pale-blue/[0.08] py-14 md:py-16">
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-20">
        <p className="text-center text-[13px] font-medium tracking-[0.02em] text-steel-blue md:text-left">
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {PLACEHOLDER_LOGOS.map((name) => (
            <div
              key={name}
              className="flex h-6 items-center text-[15px] font-medium text-gray/70"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
