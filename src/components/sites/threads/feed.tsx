"use client";

import { useMemo } from "react";
import { ActionButton } from "./action-button";
import { Avatar } from "./avatar";
import { ME } from "./data";
import { useExtras } from "./extras";
import { COMPOSER_PLACEHOLDER } from "./messages";
import { PostList } from "./post-list";
import { useThreads } from "./store";

/** Top row of the home feed: avatar + prompt, both open the composer dialog. */
function ComposerRow() {
  const { openComposer } = useThreads();
  return (
    <div className="flex items-center gap-3 border-b border-border px-3 py-4 md:px-6">
      <Avatar handle={ME} size={36} />
      <button
        type="button"
        onClick={() => openComposer()}
        className="min-w-0 flex-1 truncate text-left text-[15px] text-muted-foreground"
      >
        {COMPOSER_PLACEHOLDER}
      </button>
      <ActionButton variant="secondary" className="text-muted-foreground" onClick={() => openComposer()}>
        게시
      </ActionButton>
    </div>
  );
}

/** Home feed: composer row, then top-level posts newest first. */
export function Feed() {
  const { posts } = useThreads();
  const { hidden } = useExtras();

  const topLevel = useMemo(
    () => posts.filter((post) => !post.parentId && !hidden.has(post.id)).sort((a, b) => a.ageMinutes - b.ageMinutes),
    [posts, hidden],
  );

  return (
    <div>
      <ComposerRow />
      <PostList posts={topLevel} empty="표시할 스레드가 없어요" />
    </div>
  );
}
