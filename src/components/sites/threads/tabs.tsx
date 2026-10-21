"use client";

import { cn } from "@/lib/utils";

interface TabsProps<T extends string> {
  label: string;
  tabs: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  idPrefix: string;
}

/** Equal-width underline tabs (activity filters, profile sections). Arrow keys move between tabs. */
export function Tabs<T extends string>({ label, tabs, value, onChange, idPrefix }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className="flex border-b border-border">
      {tabs.map((tab, index) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            id={`${idPrefix}-tab-${tab.value}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event) => {
              const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
              if (step === 0) return;
              event.preventDefault();
              const next = tabs[(index + step + tabs.length) % tabs.length];
              onChange(next.value);
              document.getElementById(`${idPrefix}-tab-${next.value}`)?.focus();
            }}
            className={cn(
              "-mb-px h-12 flex-1 border-b border-transparent text-[15px] font-semibold outline-none transition-colors focus-visible:bg-hover",
              selected ? "border-foreground text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

/** Wrapper that pairs with <Tabs idPrefix> for the active panel. */
export function TabPanel({ idPrefix, active, children }: { idPrefix: string; active: string; children: React.ReactNode }) {
  return (
    <div role="tabpanel" id={`${idPrefix}-panel`} aria-labelledby={`${idPrefix}-tab-${active}`}>
      {children}
    </div>
  );
}
