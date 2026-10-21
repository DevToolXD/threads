"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

export type ThemeName = "light" | "dark";

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The class on <html> is the single source of truth (set early by the init script). */
function getSnapshot(): ThemeName {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Server and first hydration pass render the light theme; React re-renders if the client differs. */
function getServerSnapshot(): ThemeName {
  return "light";
}

export function setTheme(next: ThemeName): void {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the class still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

export function useTheme(): { theme: ThemeName; setTheme: (next: ThemeName) => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { theme, setTheme };
}
