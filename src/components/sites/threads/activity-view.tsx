"use client";

import Link from "next/link";
import { useState } from "react";
import type { ActivityItem, ActivityKind } from "@/types/threads";
import { Avatar } from "./avatar";
import { ACTIVITY, formatAge } from "./data";
import { EmptyState } from "./empty-state";
import { FollowButton } from "./follow-button";
import { ageLabel, profileHref } from "./href";
import { TabPanel, Tabs } from "./tabs";

type ActivityTab = "all" | "follow" | "reply" | "mention";

const TABS: ReadonlyArray<{ value: ActivityTab; label: string }> = [
  { value: "all", label: "전체" },
  { value: "follow", label: "팔로우" },
  { value: "reply", label: "답글" },
  { value: "mention", label: "멘션" },
];

const VERB: Record<ActivityKind, string> = {
  like: "님이 회원님의 스레드를 좋아해요",
  reply: "님이 답글을 남겼어요",
  follow: "님이 회원님을 팔로우하기 시작했어요",
  repost: "님이 회원님의 스레드를 리포스트했어요",
  mention: "님이 회원님을 언급했어요",
};

function ActivityRow({ item }: { item: ActivityItem }) {
  const age = formatAge(item.ageMinutes);
  return (
    <li className="flex gap-3 px-3 py-3 md:px-6">
      <Link href={profileHref(item.actor)} aria-label={`${item.actor} 프로필`} className="shrink-0 rounded-full">
        <Avatar handle={item.actor} size={36} />
      </Link>
      <div className="min-w-0 flex-1">
        <p>
          <Link href={profileHref(item.actor)} className="font-semibold hover:underline">
            {item.actor}
          </Link>
          <span className="text-muted-foreground">{VERB[item.kind]}</span>{" "}
          <span aria-label={ageLabel(age)} className="text-muted-foreground">
            {age}
          </span>
        </p>
        {item.excerpt ? <p className="mt-0.5 line-clamp-2 break-words text-muted-foreground">{item.excerpt}</p> : null}
      </div>
      {item.kind === "follow" ? <FollowButton handle={item.actor} tone="outline" /> : null}
    </li>
  );
}

/** 알림: filterable list of the mock ACTIVITY feed. */
export function ActivityView() {
  const [tab, setTab] = useState<ActivityTab>("all");
  const items = tab === "all" ? ACTIVITY : ACTIVITY.filter((item) => item.kind === tab);

  return (
    <div>
      <Tabs label="알림 필터" tabs={TABS} value={tab} onChange={setTab} idPrefix="activity" />
      <TabPanel idPrefix="activity" active={tab}>
        {items.length === 0 ? (
          <EmptyState>아직 알림이 없어요</EmptyState>
        ) : (
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </TabPanel>
    </div>
  );
}
