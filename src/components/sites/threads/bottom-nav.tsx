"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ME } from "./data";
import { profileHref } from "./href";
import { HeartIcon, HomeIcon, PlusIcon, ProfileIcon, SearchIcon } from "./icons";
import { useThreads } from "./store";
import { useActiveTab } from "./use-active-tab";

const TAB = "flex h-[50px] flex-1 items-center justify-center outline-none transition-transform active:scale-90 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring";

function TabLink({ href, label, active, children }: { href: string; label: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(TAB, active ? "text-foreground" : "text-nav-icon")}
    >
      {children}
    </Link>
  );
}

/** Bottom tab bar for viewports under 768px: 홈, 검색, +, 알림, 프로필. */
export function BottomNav() {
  const tab = useActiveTab();
  const { openComposer } = useThreads();

  return (
    <nav
      aria-label="하단 메뉴"
      className="fixed inset-x-0 bottom-0 z-30 flex h-[calc(50px+env(safe-area-inset-bottom))] items-start bg-header pb-[env(safe-area-inset-bottom)] backdrop-blur-[28px] md:hidden"
    >
      <TabLink href="/" label="홈" active={tab === "home"}>
        <HomeIcon size={24} active={tab === "home"} aria-hidden="true" />
      </TabLink>
      <TabLink href="/search" label="검색" active={tab === "search"}>
        <SearchIcon size={24} active={tab === "search"} aria-hidden="true" />
      </TabLink>
      <button type="button" aria-label="만들기" onClick={() => openComposer()} className={cn(TAB, "text-nav-icon")}>
        <span className="flex h-[40px] w-[66px] items-center justify-center rounded-xl bg-floating">
          <PlusIcon size={24} aria-hidden="true" />
        </span>
      </button>
      <TabLink href="/activity" label="알림" active={tab === "activity"}>
        <HeartIcon size={24} filled={tab === "activity"} aria-hidden="true" />
      </TabLink>
      <TabLink href={profileHref(ME)} label="프로필" active={tab === "profile"}>
        <ProfileIcon size={24} active={tab === "profile"} aria-hidden="true" />
      </TabLink>
    </nav>
  );
}
