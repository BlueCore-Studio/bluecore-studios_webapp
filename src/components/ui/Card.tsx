import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray/15 bg-white p-6 shadow-card-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
