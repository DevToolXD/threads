"use client";

import { useCallback } from "react";
import { withBasePath } from "./href";
import { useThreads } from "./store";

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fall through to the legacy path (insecure context, missing permission, unfocused document).
  }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

/** Copies an absolute URL for `path` and reports the real outcome through the toast. */
export function useCopyLink(): (path: string) => Promise<void> {
  const { showToast } = useThreads();
  return useCallback(
    async (path: string) => {
      // Site-relative path (no basePath) -> absolute URL that also works under /threads on GitHub Pages.
      const url = new URL(withBasePath(path), window.location.origin).toString();
      const ok = await writeClipboard(url);
      showToast(ok ? "링크를 복사했어요" : "링크를 복사하지 못했어요");
    },
    [showToast],
  );
}
