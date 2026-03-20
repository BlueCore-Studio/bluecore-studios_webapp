import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-gray/15 bg-deep-navy py-18 md:py-22">
      <Container>
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-24">
          <div className="max-w-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft-white">
              Bluecore
            </span>
            <p className="mt-5 text-[15px] leading-[1.65] text-gray">
              Bluecore designs and builds modern digital experiences with
              clarity, structure, and precision.
            </p>
          </div>
          <nav className="flex gap-16">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-blue">
                Navigate
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#services"
                    className="text-[14px] text-gray hover:text-soft-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#process"
                    className="text-[14px] text-gray hover:text-soft-white transition-colors"
                  >
                    Process
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-[14px] text-gray hover:text-soft-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-16 border-t border-gray/15 pt-8 text-[13px] text-gray">
          © {new Date().getFullYear()} Bluecore. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
