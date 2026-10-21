"use client";

import { useThreads } from "./store";

/** Bottom-centered status pill driven by `showToast` in the store. */
export function Toast() {
  const { toast } = useThreads();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(66px+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 md:bottom-8"
    >
      {toast ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 rounded-xl bg-primary px-4 py-3 text-[15px] font-semibold text-primary-foreground shadow-lg duration-200">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
