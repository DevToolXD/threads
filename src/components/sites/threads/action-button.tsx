import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ActionButtonVariant = "primary" | "secondary";

interface ActionButtonProps extends ComponentProps<"button"> {
  variant?: ActionButtonVariant;
}

const VARIANTS: Record<ActionButtonVariant, string> = {
  primary: "border-primary bg-primary text-primary-foreground hover:opacity-85 active:opacity-70",
  secondary: "border-border bg-transparent text-foreground hover:bg-hover active:bg-pressed",
};

/** Threads' rounded rectangle button: 34px tall, 10px radius, 15px/600 label. */
export function ActionButton({ variant = "primary", className, type = "button", ...props }: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-[34px] shrink-0 items-center justify-center rounded-[10px] border px-4 text-[15px] font-semibold whitespace-nowrap transition-[background-color,opacity] disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
