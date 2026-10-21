/** localStorage key for the persisted appearance choice ("light" | "dark"). */
export const THEME_STORAGE_KEY = "threads-demo-theme";

/**
 * Inline script that runs before first paint so the `dark` class is on <html>
 * before React hydrates (no flash, no hydration warning on the class list).
 * Falls back to the OS preference when nothing is stored.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d){document.documentElement.classList.add("dark")}}catch(e){}})();`;
