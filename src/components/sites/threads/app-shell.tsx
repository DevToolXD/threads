import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { Composer } from "./composer";
import { DEMO_NOTICE } from "./messages";
import { SideNav } from "./side-nav";
import { Toast } from "./toast";

/**
 * Page chrome: left rail (>= 768px), bottom tab bar (< 768px), the centered 640px column,
 * and the global composer dialog and toast. The column is padded by the rail width on both
 * sides so it stays centered in the viewport without ever sliding under the rail.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SideNav />
      <div className="min-h-dvh md:px-[68px]">
        <main className="mx-auto w-full max-w-[640px] pb-[calc(50px+env(safe-area-inset-bottom))] md:pb-6">
          {children}
          <p className="px-6 pt-6 pb-2 text-center text-[13px] leading-[18px] text-muted-foreground md:hidden">
            {DEMO_NOTICE}
          </p>
        </main>
      </div>
      <BottomNav />
      <Composer />
      <Toast />
    </>
  );
}
