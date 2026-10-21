"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { ThreadsPost } from "@/types/threads";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { formatAge, getUser } from "./data";
import { ageLabel, postHref, profileHref } from "./href";
import { VerifiedBadge } from "./icons";
import { MediaAttachment } from "./media-attachment";
import { PostActions } from "./post-actions";
import { PostMenu } from "./post-menu";
import { RichText } from "./rich-text";

interface PostCardProps {
  post: ThreadsPost;
  /** "feed" opens the post detail when the card is clicked; "detail" is the post being viewed. */
  variant?: "feed" | "detail";
  /** Draws the thread connector below the avatar (this post has a reply right under it). */
  threadLine?: boolean;
  /** This post continues a thread whose parent is rendered directly above it. */
  connected?: boolean;
  className?: string;
}

const INTERACTIVE = "a, button, input, textarea, [role='menu'], [role='menuitem'], [role='menuitemradio']";

/** One post: avatar column, header (name, badge, age, menu), text, optional media, actions. */
export function PostCard({ post, variant = "feed", threadLine = false, connected = false, className }: PostCardProps) {
  const router = useRouter();
  const user = getUser(post.author);
  const age = formatAge(post.ageMinutes);
  const href = postHref(post);
  const clickable = variant === "feed";

  const openDetail = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof Element) || event.target.closest(INTERACTIVE)) return;
    if (window.getSelection()?.toString()) return;
    router.push(href);
  };

  return (
    <article
      onClick={clickable ? openDetail : undefined}
      className={cn(
        "flex gap-3 px-3 md:px-6",
        connected ? "pt-1" : "pt-3",
        threadLine ? "pb-0" : "pb-2",
        clickable && "cursor-pointer",
        className,
      )}
    >
      <div className="flex shrink-0 flex-col items-center pt-1">
        <Link href={profileHref(post.author)} aria-label={`${post.author} 프로필`} className="rounded-full">
          <Avatar handle={post.author} size={36} />
        </Link>
        {threadLine ? <div className="mt-2 w-0.5 flex-1 rounded-full bg-threadline" /> : null}
      </div>
      <div className={cn("min-w-0 flex-1", threadLine && "pb-2")}>
        <div className="flex h-[21px] items-center gap-1">
          <Link href={profileHref(post.author)} className="truncate font-semibold hover:underline">
            {post.author}
          </Link>
          {user.verified ? <VerifiedBadge size={14} /> : null}
          <Link href={href} aria-label={ageLabel(age)} className="shrink-0 text-muted-foreground hover:underline">
            {age}
          </Link>
          <div className="ml-auto shrink-0 pl-2">
            <PostMenu post={post} />
          </div>
        </div>
        <div className="mt-[3px] break-words whitespace-pre-line">
          <RichText text={post.text} />
        </div>
        {post.media ? <MediaAttachment media={post.media} /> : null}
        <PostActions post={post} className="-ml-3 mt-1.5" />
      </div>
    </article>
  );
}
