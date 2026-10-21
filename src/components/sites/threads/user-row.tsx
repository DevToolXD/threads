"use client";

import Link from "next/link";
import { Avatar } from "./avatar";
import { formatCount, getUser } from "./data";
import { FollowButton, useFollowerCount } from "./follow-button";
import { profileHref } from "./href";
import { VerifiedBadge } from "./icons";

/** Compact user line used by search results and the follow suggestions: avatar, names, follower count, follow button. */
export function UserRow({ handle }: { handle: string }) {
  const user = getUser(handle);
  const followers = useFollowerCount(handle, user.followers);

  return (
    <div className="flex items-center gap-3 px-3 py-3 md:px-6">
      <Link href={profileHref(handle)} aria-label={`${handle} 프로필`} className="rounded-full">
        <Avatar handle={handle} size={44} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={profileHref(handle)} className="flex items-center gap-1 hover:underline">
          <span className="truncate font-semibold">{user.handle}</span>
          {user.verified ? <VerifiedBadge size={14} /> : null}
        </Link>
        <div className="truncate text-muted-foreground">{user.name}</div>
        <div className="text-[13px] leading-[18px] text-muted-foreground">팔로워 {formatCount(followers)}명</div>
      </div>
      <FollowButton handle={handle} tone="outline" />
    </div>
  );
}
