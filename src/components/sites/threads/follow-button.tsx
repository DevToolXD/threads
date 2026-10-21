"use client";

import { cn } from "@/lib/utils";
import { ActionButton } from "./action-button";
import { useExtras } from "./extras";
import { useThreads } from "./store";

interface FollowButtonProps {
  handle: string;
  /** "solid" shows a filled button until followed (profile); "outline" is always outlined (lists). */
  tone?: "solid" | "outline";
  className?: string;
}

export function FollowButton({ handle, tone = "solid", className }: FollowButtonProps) {
  const { following, toggleFollow } = useThreads();
  const { bumpFollowers } = useExtras();
  const isFollowing = following.has(handle);

  return (
    <ActionButton
      variant={isFollowing || tone === "outline" ? "secondary" : "primary"}
      aria-pressed={isFollowing}
      aria-label={`${isFollowing ? "팔로잉" : "팔로우"} ${handle}`}
      className={cn(isFollowing && "text-muted-foreground", className)}
      onClick={() => {
        toggleFollow(handle);
        bumpFollowers(handle, isFollowing ? -1 : 1);
      }}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </ActionButton>
  );
}

/** Follower count including this session's follow/unfollow clicks. */
export function useFollowerCount(handle: string, base: number): number {
  const { followerDelta } = useExtras();
  return base + (followerDelta[handle] ?? 0);
}
