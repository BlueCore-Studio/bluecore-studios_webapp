import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-[0.02em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-navy text-soft-white hover:bg-deep-navy border border-navy",
    secondary:
      "bg-transparent text-navy hover:text-deep-navy border border-navy/30 hover:border-navy/50",
    outline:
      "border border-gray/25 text-text-dark hover:border-steel-blue/40 hover:text-navy bg-transparent",
    ghost: "text-text-dark hover:text-navy hover:bg-pale-blue/25 bg-transparent",
    light:
      "bg-soft-white text-navy hover:bg-pale-blue border border-soft-white/30",
  };

  const sizes = {
    sm: "h-9 px-5 text-[13px] rounded-sm",
    md: "h-10 px-6 text-[13px] rounded-sm",
    lg: "h-11 px-7 text-sm rounded-sm",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
