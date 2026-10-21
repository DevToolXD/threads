"use client";

import { useMemo, useState } from "react";
import { ActionButton } from "./action-button";
import { Avatar } from "./avatar";
import { ME, formatCount, getUser } from "./data";
import { useExtras } from "./extras";
import { FollowButton, useFollowerCount } from "./follow-button";
import { VerifiedBadge } from "./icons";
import { UNSUPPORTED_MESSAGE } from "./messages";
import { PostList } from "./post-list";
import { useThreads } from "./store";
import { TabPanel, Tabs } from "./tabs";

type ProfileTab = "threads" | "replies" | "media" | "reposts";

const TABS: ReadonlyArray<{ value: ProfileTab; label: string }> = [
  { value: "threads", label: "스레드" },
  { value: "replies", label: "답글" },
  { value: "media", label: "미디어" },
  { value: "reposts", label: "리포스트" },
];

const EMPTY: Record<ProfileTab, string> = {
  threads: "아직 스레드가 없어요",
  replies: "아직 답글이 없어요",
  media: "아직 미디어가 없어요",
  reposts: "아직 리포스트가 없어요",
};

/** Profile page body: identity block, follow/edit button, and the four content tabs. */
export function ProfileView({ handle }: { handle: string }) {
  const user = getUser(handle);
  const isMe = handle === ME;
  const { posts, reposted, showToast } = useThreads();
  const { hidden } = useExtras();
  const followers = useFollowerCount(handle, user.followers);
  const [tab, setTab] = useState<ProfileTab>("threads");

  const visible = useMemo(
    () => posts.filter((p) => !hidden.has(p.id)).sort((a, b) => a.ageMinutes - b.ageMinutes),
    [posts, hidden],
  );
  const own = useMemo(() => visible.filter((p) => p.author === handle), [visible, handle]);
  const list = {
    threads: own.filter((p) => !p.parentId),
    replies: own.filter((p) => p.parentId),
    media: own.filter((p) => p.media),
    // Reposts are only tracked for the demo account (what it reposted in this session).
    reposts: isMe ? visible.filter((p) => reposted.has(p.id)) : [],
  }[tab];

  return (
    <div>
      <div className="flex items-start gap-4 px-3 pt-4 pb-4 md:px-6">
        <div className="min-w-0 flex-1">
          <h2 className="flex items-center gap-1.5 text-[24px] leading-[30px] font-bold">
            <span className="truncate">{user.name}</span>
            {user.verified ? <VerifiedBadge size={18} /> : null}
          </h2>
          <p className="mt-0.5 text-[15px]">{user.handle}</p>
          {user.bio ? <p className="mt-3 break-words whitespace-pre-line">{user.bio}</p> : null}
          <p className="mt-3 text-muted-foreground">
            팔로워 {formatCount(followers)}명 · 팔로잉 {formatCount(user.following)}명
          </p>
        </div>
        <Avatar handle={handle} size={84} />
      </div>
      <div className="px-3 pb-4 md:px-6">
        {isMe ? (
          <ActionButton variant="secondary" className="w-full" onClick={() => showToast(UNSUPPORTED_MESSAGE)}>
            프로필 편집
          </ActionButton>
        ) : (
          <FollowButton handle={handle} className="w-full" />
        )}
      </div>
      <Tabs label="프로필 탭" tabs={TABS} value={tab} onChange={setTab} idPrefix="profile" />
      <TabPanel idPrefix="profile" active={tab}>
        <PostList posts={list} empty={EMPTY[tab]} />
      </TabPanel>
    </div>
  );
}
