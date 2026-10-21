import type { ThreadsPost } from "@/types/threads";

/** Everything the visitor changed in this demo: it is small enough to store as one JSON string. */
export interface PersistedState {
  v: 1;
  liked: string[];
  reposted: string[];
  following: string[];
  /** Posts and replies created by the visitor (ThreadsPost.local === true). */
  posts: ThreadsPost[];
}

const KEY = "threads.state.v1";
const MAX_POSTS = 200;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, 1000) : [];
}

function toPost(value: unknown): ThreadsPost | null {
  if (!isRecord(value)) return null;
  const { id, author, text, ageMinutes, likes, replies, reposts, parentId } = value;
  if (
    typeof id !== "string" ||
    typeof author !== "string" ||
    typeof text !== "string" ||
    typeof ageMinutes !== "number" ||
    typeof likes !== "number" ||
    typeof replies !== "number" ||
    typeof reposts !== "number"
  ) {
    return null;
  }
  return {
    id,
    author,
    text: text.slice(0, 500),
    ageMinutes,
    likes,
    replies,
    reposts,
    parentId: typeof parentId === "string" ? parentId : undefined,
    local: true,
  };
}

/** Validates untrusted JSON (localStorage or Firestore) and drops anything malformed. */
export function parseState(raw: string): PersistedState | null {
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data) || data.v !== 1) return null;
    const posts = Array.isArray(data.posts)
      ? data.posts.map(toPost).filter((post): post is ThreadsPost => post !== null).slice(0, MAX_POSTS)
      : [];
    return { v: 1, liked: stringList(data.liked), reposted: stringList(data.reposted), following: stringList(data.following), posts };
  } catch {
    return null;
  }
}

export function serializeState(state: PersistedState): string {
  return JSON.stringify(state);
}

export function readLocalState(): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? parseState(raw) : null;
  } catch {
    return null;
  }
}

export function writeLocalState(state: PersistedState): void {
  try {
    window.localStorage.setItem(KEY, serializeState(state));
  } catch {
    // Storage full or unavailable: the demo keeps working in memory.
  }
}
