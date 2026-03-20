import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Use Container wrapper; default true */
  contained?: boolean;
}

export function Section({
  children,
  className,
  contained = true,
  ...props
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;
  return (
    <section
      className={cn("py-16 md:py-20 lg:py-24", className)}
      {...props}
    >
      {content}
    </section>
  );
}
