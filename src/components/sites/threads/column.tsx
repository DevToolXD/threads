import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The feed container: edge-to-edge on mobile, a 24px-radius outlined card from 768px. */
export function Column({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-clip md:rounded-[24px] md:border md:border-column-outline", className)}>
      {children}
    </div>
  );
}
