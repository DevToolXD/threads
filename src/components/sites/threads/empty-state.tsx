import type { ReactNode } from "react";

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="px-6 py-16 text-center text-[15px] text-muted-foreground">{children}</p>;
}
