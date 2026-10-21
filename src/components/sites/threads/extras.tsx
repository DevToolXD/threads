"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * UI-only state that is not part of the core store contract in store.tsx:
 * saved/hidden posts, follower-count adjustments and the composer's prefilled text.
 */
interface ExtrasState {
  saved: ReadonlySet<string>;
  hidden: ReadonlySet<string>;
  /** Net follower-count change per handle caused by follow/unfollow clicks in this session. */
  followerDelta: Readonly<Record<string, number>>;
  /** Text the composer starts with the next time it opens (e.g. "@handle " for 언급). */
  composerPrefill: string;
  toggleSaved: (id: string) => void;
  hidePost: (id: string) => void;
  bumpFollowers: (handle: string, delta: 1 | -1) => void;
  setComposerPrefill: (text: string) => void;
}

const ExtrasContext = createContext<ExtrasState | null>(null);

export function ExtrasProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<ReadonlySet<string>>(new Set());
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [followerDelta, setFollowerDelta] = useState<Readonly<Record<string, number>>>({});
  const [composerPrefill, setComposerPrefill] = useState("");

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const hidePost = useCallback((id: string) => {
    setHidden((prev) => new Set(prev).add(id));
  }, []);

  const bumpFollowers = useCallback((handle: string, delta: 1 | -1) => {
    setFollowerDelta((prev) => ({ ...prev, [handle]: (prev[handle] ?? 0) + delta }));
  }, []);

  const value = useMemo<ExtrasState>(
    () => ({ saved, hidden, followerDelta, composerPrefill, toggleSaved, hidePost, bumpFollowers, setComposerPrefill }),
    [saved, hidden, followerDelta, composerPrefill, toggleSaved, hidePost, bumpFollowers],
  );

  return <ExtrasContext.Provider value={value}>{children}</ExtrasContext.Provider>;
}

export function useExtras(): ExtrasState {
  const ctx = useContext(ExtrasContext);
  if (!ctx) throw new Error("useExtras must be used inside <ExtrasProvider>");
  return ctx;
}
