import type { ThreadsPost } from "@/types/threads";

/**
 * Static export has no rewrites, so routes are real folders:
 *   /u/[handle]      profile (pre-rendered for every known user)
 *   /post?id=<id>    post detail (query based so locally created posts work too)
 * `<Link>` adds the basePath itself; use withBasePath() for anything built by hand.
 */
export function profileHref(handle: string): string {
  // Trailing slash: Next omits it for dotted segments (dev.hojun), which would force a full page load.
  return `/u/${encodeURIComponent(handle)}/`;
}

export function postHref(post: Pick<ThreadsPost, "author" | "id">): string {
  return `/post?id=${encodeURIComponent(post.id)}`;
}

export function searchHref(query: string): string {
  return `/search?q=${encodeURIComponent(query)}`;
}

/** Prefix a site-relative path with the deploy basePath (empty locally, "/threads" on Pages). */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

/** "방금" stays as-is; relative ages read "7시간 전" for assistive tech. */
export function ageLabel(age: string): string {
  return age === "방금" ? age : `${age} 전`;
}
