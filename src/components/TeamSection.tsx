"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { BlurFade } from "@/components/ui/BlurFade";

const TEAM_MEMBERS: Record<
  string,
  { name: string; role: string; image: string; linkedin: string; objectPosition?: string }
> = {
  "2-0": {
    name: "Robert",
    role: "Front-end / PM",
    image: "/team/rob.png",
    linkedin: "https://www.linkedin.com/in/robert-taylor-421094165/",
    objectPosition: "center top",
  },
  "1-1": {
    name: "Alex",
    role: "AI Lead, Senior Engineer",
    image: "/team/alex.png",
    linkedin: "https://www.linkedin.com/in/alex-lazarev-bluecore/",
    objectPosition: "center 25%",
  },
  "3-1": {
    name: "Vlad",
    role: "CTO",
    image: "/team/vlad.png",
    linkedin: "https://www.linkedin.com/in/vl-kuz/",
    objectPosition: "center 25%",
  },
};

// Row 0: teamSVG1, teamSVG2, rob, teamSVG3, teamSVG4
// Row 1: teamSVG5, alex, teamSVG6, vlad, teamSVG7
const GRID_LAYOUT: { type: "svg" | "person"; src?: string; key?: string }[][] = [
  [
    { type: "svg", src: "/team/teamSVG1.svg", key: "svg1" },
    { type: "svg", src: "/team/teamSVG2.svg", key: "svg2" },
    { type: "person", key: "2-0" },
    { type: "svg", src: "/team/teamSVG3.svg", key: "svg3" },
    { type: "svg", src: "/team/teamSVG4.svg", key: "svg4" },
  ],
  [
    { type: "svg", src: "/team/teamSVG5.svg", key: "svg5" },
    { type: "person", key: "1-1" },
    { type: "svg", src: "/team/teamSVG6.svg", key: "svg6" },
    { type: "person", key: "3-1" },
    { type: "svg", src: "/team/teamSVG7.svg", key: "svg7" },
  ],
];

// Mobile: 2 cols × 3 rows — person | tile per row (swap: tile left, person right for Alex)
const MOBILE_LAYOUT: { person: string; svg: string; swap?: boolean }[] = [
  { person: "2-0", svg: "/team/teamSVG2.svg" },
  { person: "1-1", svg: "/team/teamSVG6.svg", swap: true },
  { person: "3-1", svg: "/team/teamSVG3.svg" },
];

function SvgTile({ src }: { src: string }) {
  return (
    <div
      className="relative w-full overflow-hidden bg-white m-0 p-0"
      style={{ aspectRatio: "1 / 0.84" }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 1280px) 20vw, 256px"
      />
    </div>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PersonTile({
  name,
  role,
  image,
  linkedin,
  objectPosition = "center center",
}: {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  objectPosition?: string;
}) {
  return (
    <Link
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden bg-white m-0 p-0"
      style={{ aspectRatio: "1 / 0.84" }}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover grayscale md:transition-transform md:duration-500 md:group-hover:scale-105 md:group-hover:grayscale-0"
        style={{ objectPosition }}
        sizes="(max-width: 1280px) 20vw, 256px"
      />
      {/* Mobile: small LinkedIn icon always visible in corner */}
      <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0A66C2] shadow-sm md:hidden">
        <LinkedInIcon className="h-5 w-5" />
      </span>
      {/* Desktop: full overlay on hover (no hover on mobile) */}
      <div className="absolute inset-0 bg-[#2563EB]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 hidden flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
        <span className="text-lg font-semibold tracking-[-0.02em] text-white">
          {name}
        </span>
        <span className="text-center text-[13px] font-medium tracking-[0.02em] text-white/95">
          {role}
        </span>
        <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30">
          <LinkedInIcon className="h-6 w-6" />
        </span>
      </div>
    </Link>
  );
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden pt-16 pb-0 md:pt-20 md:pb-0 lg:pt-24 lg:pb-0"
      style={{ backgroundColor: "#2563EB" }}
    >
      {/* Overlapping triangles - upper left (hidden on mobile) */}
      <div
        aria-hidden
        className="absolute left-0 top-0 hidden h-64 w-64 opacity-[0.35] md:block"
        style={{
          background: "white",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-8 top-8 hidden h-48 w-48 opacity-[0.18] md:block"
        style={{
          background: "white",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <BlurFade>
      <div className="relative">
        <Container>
          <div>
            <Eyebrow className="mb-6 text-white/80">Who we are</Eyebrow>
            <h2 className="text-3xl font-medium leading-[1.18] tracking-[-0.025em] text-white md:text-4xl">
              The people building the future of web3
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-white/90 md:text-base">
              We&apos;re a small group dedicated to smart contract auditing and secure
              infrastructure for web3. We help teams ship with confidence—from protocol
              design to production deployment. If you&apos;re an exceptional individual
              with a desire to shape the future of decentralized systems, hit us up.
            </p>
            <Link href="#contact" className="mt-8 inline-block">
              <Button variant="light" size="sm">
                Join our team
              </Button>
            </Link>
          </div>
        </Container>
        {/* Spacer — extends header area so shapes can sit at top of grid */}
        <div className="h-12 md:h-16" />
        {/* Decorative geometric motif — aligns with button on mobile, right side on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-[calc(100%-4rem)] flex items-center gap-3 md:bottom-8 md:right-16 md:top-auto md:items-end md:gap-5"
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-white md:h-14 md:w-14" />
          <div className="h-10 w-10 shrink-0 bg-white md:h-14 md:w-14" />
          <div
            className="h-10 w-10 shrink-0 bg-white md:h-14 md:w-14"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
      </div>
      {/* Mobile: 2 cols × 3 rows — person | tile per row (swap: tile left, person right for Alex) */}
      <div className="grid w-full grid-cols-2 gap-0 p-0 m-0 md:hidden">
        {MOBILE_LAYOUT.map((row, i) => (
          <Fragment key={i}>
            {row.swap ? (
              <>
                <SvgTile src={row.svg} />
                <PersonTile
                  name={TEAM_MEMBERS[row.person].name}
                  role={TEAM_MEMBERS[row.person].role}
                  image={TEAM_MEMBERS[row.person].image}
                  linkedin={TEAM_MEMBERS[row.person].linkedin}
                  objectPosition={TEAM_MEMBERS[row.person].objectPosition}
                />
              </>
            ) : (
              <>
                <PersonTile
                  name={TEAM_MEMBERS[row.person].name}
                  role={TEAM_MEMBERS[row.person].role}
                  image={TEAM_MEMBERS[row.person].image}
                  linkedin={TEAM_MEMBERS[row.person].linkedin}
                  objectPosition={TEAM_MEMBERS[row.person].objectPosition}
                />
                <SvgTile src={row.svg} />
              </>
            )}
          </Fragment>
        ))}
      </div>
      {/* Desktop: original 5×2 grid */}
      <div
        className="hidden w-full grid-cols-5 gap-0 p-0 m-0 md:grid"
        style={{ gridTemplateRows: "auto auto" }}
      >
        {GRID_LAYOUT.flat().map((cell) =>
          cell.type === "svg" && cell.src ? (
            <SvgTile key={cell.key!} src={cell.src} />
          ) : cell.type === "person" && cell.key ? (
            <PersonTile
              key={cell.key}
              name={TEAM_MEMBERS[cell.key].name}
              role={TEAM_MEMBERS[cell.key].role}
              image={TEAM_MEMBERS[cell.key].image}
              linkedin={TEAM_MEMBERS[cell.key].linkedin}
              objectPosition={TEAM_MEMBERS[cell.key].objectPosition}
            />
          ) : null
        )}
      </div>
      </BlurFade>
    </section>
  );
}
