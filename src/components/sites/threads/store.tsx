"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { firebaseEnabled, loadRemoteState, saveRemoteState } from "@/lib/firebase-rest";
import { parseState, readLocalState, serializeState, writeLocalState, type PersistedState } from "@/lib/persist";
import type { ThreadsPost } from "@/types/threads";
import { ME, POSTS } from "./data";

interface ThreadsState {
  posts: ThreadsPost[];
  liked: ReadonlySet<string>;
  reposted: ReadonlySet<string>;
  following: ReadonlySet<string>;
  composerOpen: boolean;
  /** When set, the composer creates a reply to this post. */
  replyTo: string | null;
  openComposer: (replyTo?: string) => void;
  closeComposer: () => void;
  createPost: (text: string, parentId?: string) => string;
  toggleLike: (id: string) => void;
  toggleRepost: (id: string) => void;
  toggleFollow: (handle: string) => void;
  toast: string | null;
  showToast: (message: string) => void;
}

const ThreadsContext = createContext<ThreadsState | null>(null);

function toggled(set: ReadonlySet<string>, key: string): Set<string> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}

/** Rebuilds the feed from the seed data plus the posts/replies the visitor created earlier. */
function mergePosts(saved: ThreadsPost[]): ThreadsPost[] {
  const replyCount = new Map<string, number>();
  for (const post of saved) {
    if (post.parentId) replyCount.set(post.parentId, (replyCount.get(post.parentId) ?? 0) + 1);
  }
  const seeds = POSTS.map((post) => {
    const extra = replyCount.get(post.id);
    return extra ? { ...post, replies: post.replies + extra } : post;
  });
  return [...saved.filter((post) => !post.parentId), ...seeds, ...saved.filter((post) => post.parentId)];
}

export function ThreadsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<ThreadsPost[]>(POSTS);
  const [liked, setLiked] = useState<ReadonlySet<string>>(new Set());
  const [reposted, setReposted] = useState<ReadonlySet<string>>(new Set());
  const [following, setFollowing] = useState<ReadonlySet<string>>(new Set(["dev.hojun", "ai.weekly"]));
  const [composerOpen, setComposerOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const postSeq = useRef(0);

  const showToast = useCallback((message: string) => {
    setToast(message);
    // Restart the timer so a repeated message is not dismissed by the previous call's timeout.
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const openComposer = useCallback((target?: string) => {
    setReplyTo(target ?? null);
    setComposerOpen(true);
  }, []);
  const closeComposer = useCallback(() => setComposerOpen(false), []);

  const createPost = useCallback((text: string, parentId?: string) => {
    postSeq.current += 1;
    const id = `local-${Date.now()}-${postSeq.current}`;
    const post: ThreadsPost = {
      id,
      author: ME,
      text,
      ageMinutes: 0,
      likes: 0,
      replies: 0,
      reposts: 0,
      parentId,
      local: true,
    };
    setPosts((prev) => {
      const next = parentId
        ? prev.map((p) => (p.id === parentId ? { ...p, replies: p.replies + 1 } : p))
        : prev;
      return parentId ? [...next, post] : [post, ...next];
    });
    return id;
  }, []);

  const toggleLike = useCallback((id: string) => setLiked((s) => toggled(s, id)), []);
  const toggleRepost = useCallback((id: string) => setReposted((s) => toggled(s, id)), []);
  const toggleFollow = useCallback((handle: string) => setFollowing((s) => toggled(s, handle)), []);

  // Persistence: localStorage always, Firestore as well when Firebase is configured (src/lib/firebase-rest.ts).
  const [hydrated, setHydrated] = useState(false);
  const lastSaved = useRef("");

  useEffect(() => {
    let cancelled = false;
    const apply = (state: PersistedState) => {
      setLiked(new Set(state.liked));
      setReposted(new Set(state.reposted));
      setFollowing(new Set(state.following));
      setPosts(mergePosts(state.posts));
      lastSaved.current = serializeState(state);
    };
    void (async () => {
      const local = readLocalState();
      if (local) apply(local);
      if (firebaseEnabled) {
        try {
          const remote = await loadRemoteState();
          const parsed = remote ? parseState(remote.state) : null;
          if (!cancelled && parsed) apply(parsed);
        } catch (error) {
          console.warn("Firebase sync unavailable", error);
        }
      }
      if (!cancelled) setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: PersistedState = {
      v: 1,
      liked: [...liked],
      reposted: [...reposted],
      following: [...following],
      posts: posts.filter((post) => post.local),
    };
    const raw = serializeState(state);
    if (raw === lastSaved.current) return;
    const timer = window.setTimeout(() => {
      lastSaved.current = raw;
      writeLocalState(state);
      if (firebaseEnabled) {
        saveRemoteState(raw).catch((error: unknown) => console.warn("Firebase save failed", error));
      }
    }, 800);
    return () => window.clearTimeout(timer);
  }, [hydrated, posts, liked, reposted, following]);

  const value = useMemo<ThreadsState>(
    () => ({
      posts,
      liked,
      reposted,
      following,
      composerOpen,
      replyTo,
      openComposer,
      closeComposer,
      createPost,
      toggleLike,
      toggleRepost,
      toggleFollow,
      toast,
      showToast,
    }),
    [posts, liked, reposted, following, composerOpen, replyTo, openComposer, closeComposer, createPost, toggleLike, toggleRepost, toggleFollow, toast, showToast],
  );

  return <ThreadsContext.Provider value={value}>{children}</ThreadsContext.Provider>;
}

export function useThreads(): ThreadsState {
  const ctx = useContext(ThreadsContext);
  if (!ctx) throw new Error("useThreads must be used inside <ThreadsProvider>");
  return ctx;
}
