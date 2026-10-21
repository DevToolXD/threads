"use client";

import { useState, type ReactNode } from "react";
import type { ThreadsPost } from "@/types/threads";
import { cn } from "@/lib/utils";
import { formatCount } from "./data";
import { postHref } from "./href";
import { CommentIcon, HeartIcon, RepostIcon, ShareIcon } from "./icons";
import { useThreads } from "./store";
import { useCopyLink } from "./use-copy-link";

interface ActionItemProps {
  label: string;
  count?: number;
  pressed?: boolean;
  /** Overrides the default charcoal color while the action is on. */
  activeClass?: string;
  onClick: () => void;
  children: ReactNode;
}

function ActionItem({ label, count = 0, pressed, activeClass, onClick, children }: ActionItemProps) {
  return (
    <button
      type="button"
      aria-label={count > 0 ? `${label} ${count}` : label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-1 rounded-full px-3 text-[13px] leading-[18px] transition-colors hover:bg-hover active:bg-pressed",
        activeClass ?? "text-charcoal",
      )}
    >
      {children}
      {count > 0 ? <span className="tabular-nums">{formatCount(count)}</span> : null}
    </button>
  );
}

/** Like, comment (opens the composer in reply mode), repost and share (copies the post URL). */
export function PostActions({ post, className }: { post: ThreadsPost; className?: string }) {
  const { liked, reposted, toggleLike, toggleRepost, openComposer } = useThreads();
  const copyLink = useCopyLink();
  const [popping, setPopping] = useState(false);

  const isLiked = liked.has(post.id);
  const isReposted = reposted.has(post.id);

  return (
    <div className={cn("flex items-center", className)}>
      <ActionItem
        label={isLiked ? "좋아요 취소" : "좋아요"}
        count={post.likes + (isLiked ? 1 : 0)}
        pressed={isLiked}
        activeClass={isLiked ? "text-liked" : undefined}
        onClick={() => {
          if (!isLiked) setPopping(true);
          toggleLike(post.id);
        }}
      >
        <span
          className={cn("flex", popping && "motion-safe:animate-like-pop")}
          onAnimationEnd={() => setPopping(false)}
        >
          <HeartIcon size={20} filled={isLiked} aria-hidden="true" />
        </span>
      </ActionItem>
      <ActionItem label="댓글" count={post.replies} onClick={() => openComposer(post.id)}>
        <CommentIcon size={20} aria-hidden="true" />
      </ActionItem>
      <ActionItem
        label={isReposted ? "리포스트 취소" : "리포스트"}
        count={post.reposts + (isReposted ? 1 : 0)}
        pressed={isReposted}
        activeClass={isReposted ? "text-foreground" : undefined}
        onClick={() => toggleRepost(post.id)}
      >
        <RepostIcon size={20} active={isReposted} aria-hidden="true" />
      </ActionItem>
      <ActionItem label="공유하기" onClick={() => void copyLink(postHref(post))}>
        <ShareIcon size={18} aria-hidden="true" />
      </ActionItem>
    </div>
  );
}
