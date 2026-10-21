"use client";

import { usePathname } from "next/navigation";
import { ME } from "./data";

export type NavTab = "home" | "search" | "activity" | "profile";

/**
 * Which primary tab the current URL belongs to. `/@handle` is rewritten to `/u/handle`
 * internally, so both forms count as the profile tab (keeps server and client output equal).
 */
export function useActiveTab(): NavTab | null {
  const pathname = usePathname();
  if (pathname === "/") return "home";
  if (pathname.startsWith("/search")) return "search";
  if (pathname.startsWith("/activity")) return "activity";
  for (const base of [`/@${ME}`, `/u/${ME}`]) {
    if (pathname === base || pathname.startsWith(`${base}/`)) return "profile";
  }
  return null;
}
