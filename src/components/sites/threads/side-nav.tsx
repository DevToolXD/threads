"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ME } from "./data";
import { profileHref } from "./href";
import { HeartIcon, HomeIcon, InsightsIcon, MessageIcon, PlusIcon, ProfileIcon, SearchIcon, ThreadsLogo } from "./icons";
import { MenuPopover } from "./menu-popover";
import { UNSUPPORTED_MESSAGE } from "./messages";
import { useThreads } from "./store";
import { useActiveTab } from "./use-active-tab";

const ITEM = "group flex h-[33px] w-[54px] items-center justify-center outline-none";

function pillClass(active: boolean): string {
  return cn(
    "flex h-[34px] w-[36px] items-center justify-center rounded-[10px] transition-[background-color,transform] group-focus-visible:outline-2 group-focus-visible:outline-ring group-active:scale-90",
    active ? "bg-nav-active text-foreground" : "text-nav-icon group-hover:bg-nav-hover",
  );
}

function RailLink({ href, label, active, children }: { href: string; label: string; active: boolean; children: ReactNode }) {
  return (
    <li>
      <Link href={href} aria-label={label} aria-current={active ? "page" : undefined} className={ITEM}>
        <span className={pillClass(active)}>{children}</span>
      </Link>
    </li>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <li>
      <button type="button" aria-label={label} onClick={onClick} className={ITEM}>
        <span className={pillClass(false)}>{children}</span>
      </button>
    </li>
  );
}

/** Left rail (>= 768px): logo, primary navigation, and the "더 보기" menu pinned to the bottom. */
export function SideNav() {
  const tab = useActiveTab();
  const { openComposer, showToast } = useThreads();
  const unsupported = () => showToast(UNSUPPORTED_MESSAGE);

  return (
    <nav aria-label="주 메뉴" className="fixed inset-y-0 left-0 z-30 hidden w-[68px] flex-col items-center md:flex">
      <Link href="/" aria-label="Threads 홈" className="mt-[25px] rounded-md text-foreground">
        <ThreadsLogo size={24} aria-hidden="true" />
      </Link>
      <ul className="mt-[35px] flex flex-col items-center">
        <RailLink href="/" label="홈" active={tab === "home"}>
          <HomeIcon size={18} active={tab === "home"} aria-hidden="true" />
        </RailLink>
        <RailButton label="만들기" onClick={() => openComposer()}>
          <PlusIcon size={18} aria-hidden="true" />
        </RailButton>
        <RailLink href="/search" label="검색" active={tab === "search"}>
          <SearchIcon size={18} active={tab === "search"} aria-hidden="true" />
        </RailLink>
        <li aria-hidden="true" className="h-[23px]" />
        <RailButton label="메시지" onClick={unsupported}>
          <MessageIcon size={18} aria-hidden="true" />
        </RailButton>
        <RailLink href="/activity" label="알림" active={tab === "activity"}>
          <HeartIcon size={18} filled={tab === "activity"} aria-hidden="true" />
        </RailLink>
        <RailLink href={profileHref(ME)} label="프로필" active={tab === "profile"}>
          <ProfileIcon size={18} active={tab === "profile"} aria-hidden="true" />
        </RailLink>
        <RailButton label="인사이트" onClick={unsupported}>
          <InsightsIcon size={18} aria-hidden="true" />
        </RailButton>
      </ul>
      <p className="mt-auto mb-3 w-[60px] text-center text-[10px] leading-[13px] text-muted-foreground">
        비공식 데모
        <br />
        Meta와 무관
      </p>
      <div className="mb-5 self-start pl-3">
        <MenuPopover side="right" align="end" />
      </div>
    </nav>
  );
}
