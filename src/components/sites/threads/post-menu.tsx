"use client";

import { Menu } from "@base-ui/react/menu";
import type { ReactNode } from "react";
import type { ThreadsPost } from "@/types/threads";
import { cn } from "@/lib/utils";
import { useExtras } from "./extras";
import { postHref } from "./href";
import { MoreIcon } from "./icons";
import { UNSUPPORTED_MESSAGE } from "./messages";
import { useThreads } from "./store";
import { useCopyLink } from "./use-copy-link";

interface PostMenuItemProps {
  className?: string;
  onClick: () => void;
  children: ReactNode;
}

function PostMenuItem({ className, onClick, children }: PostMenuItemProps) {
  return (
    <Menu.Item
      onClick={onClick}
      className={cn(
        "flex h-[38px] cursor-pointer items-center rounded-lg px-3 text-[15px] font-semibold outline-none data-[highlighted]:bg-hover",
        className,
      )}
    >
      {children}
    </Menu.Item>
  );
}

/** "…" menu on every post: save, copy link, hide, report. */
export function PostMenu({ post }: { post: ThreadsPost }) {
  const { showToast } = useThreads();
  const { saved, toggleSaved, hidePost } = useExtras();
  const copyLink = useCopyLink();
  const isSaved = saved.has(post.id);

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label="더 보기"
        className="-m-1.5 flex size-8 items-center justify-center rounded-full text-muted-foreground outline-offset-0 transition-colors hover:bg-hover data-[popup-open]:bg-hover"
      >
        <MoreIcon size={20} aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={4} collisionPadding={12} className="z-50 outline-none">
          <Menu.Popup className="min-w-[200px] origin-[var(--transform-origin)] rounded-[18px] border border-menu-outline bg-surface p-2 text-foreground shadow-[0_8px_40px_rgba(0,0,0,0.16)] outline-none transition-[opacity,transform] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <PostMenuItem
              onClick={() => {
                toggleSaved(post.id);
                showToast(isSaved ? "저장을 취소했어요" : "저장했어요");
              }}
            >
              {isSaved ? "저장 취소" : "저장"}
            </PostMenuItem>
            <PostMenuItem onClick={() => void copyLink(postHref(post))}>링크 복사</PostMenuItem>
            <PostMenuItem
              onClick={() => {
                hidePost(post.id);
                showToast("스레드를 숨겼어요");
              }}
            >
              숨기기
            </PostMenuItem>
            <div role="separator" className="mx-3 my-1.5 h-px bg-border" />
            <PostMenuItem className="text-destructive" onClick={() => showToast(UNSUPPORTED_MESSAGE)}>
              신고하기
            </PostMenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
