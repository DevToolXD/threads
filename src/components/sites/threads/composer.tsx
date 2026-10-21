"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { ActionButton } from "./action-button";
import { Avatar } from "./avatar";
import { ME } from "./data";
import { useExtras } from "./extras";
import { COMPOSER_PLACEHOLDER, POST_MAX_LENGTH } from "./messages";
import { useThreads } from "./store";

function autosize(el: HTMLTextAreaElement): void {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

function ComposerBody({ textareaRef }: { textareaRef: RefObject<HTMLTextAreaElement | null> }) {
  const { replyTo, posts, closeComposer, createPost, showToast } = useThreads();
  const { composerPrefill, setComposerPrefill } = useExtras();
  const [text, setText] = useState(composerPrefill);

  const parent = replyTo ? posts.find((p) => p.id === replyTo) : undefined;
  const length = Array.from(text).length;
  const overLimit = length > POST_MAX_LENGTH;
  const canPost = text.trim().length > 0 && !overLimit;

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current);
  }, [textareaRef]);

  const submit = () => {
    if (!canPost) return;
    createPost(text.trim(), replyTo ?? undefined);
    setComposerPrefill("");
    closeComposer();
    showToast(parent ? "답글을 게시했어요" : "게시했어요");
  };

  return (
    <>
      <div className="relative flex h-[46px] shrink-0 items-center justify-center md:h-[52px]">
        <Dialog.Close className="absolute left-4 rounded-md px-1 text-[15px] text-foreground md:left-6">취소</Dialog.Close>
        <Dialog.Title className="text-[15px] font-semibold">{parent ? "답글" : "새로운 스레드"}</Dialog.Title>
      </div>
      <Dialog.Description className="sr-only">
        {parent ? `${parent.author}님의 스레드에 답글을 작성합니다.` : "새 스레드를 작성합니다."}
      </Dialog.Description>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-2 pb-3 md:px-6">
        {parent ? (
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Avatar handle={parent.author} size={36} />
              <div className="mt-2 w-0.5 flex-1 rounded-full bg-threadline" />
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <div className="text-[15px] font-semibold">{parent.author}</div>
              <p className="line-clamp-4 whitespace-pre-line break-words text-[15px] leading-[21px]">{parent.text}</p>
            </div>
          </div>
        ) : null}
        <div className="flex gap-3">
          <Avatar handle={ME} size={36} className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold">{ME}</div>
            <textarea
              ref={textareaRef}
              value={text}
              rows={3}
              placeholder={parent ? `${parent.author}님에게 답글 남기기...` : COMPOSER_PLACEHOLDER}
              aria-label={parent ? "답글 입력" : "새 스레드 입력"}
              onChange={(event) => {
                setText(event.target.value);
                autosize(event.currentTarget);
              }}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.preventDefault();
                  submit();
                }
              }}
              className="block max-h-[40dvh] min-h-[66px] w-full resize-none bg-transparent text-[15px] leading-[21px] outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
        <span className="text-[15px] text-muted-foreground">누구에게나 답글 및 인용 허용</span>
        <div className="flex items-center gap-3">
          <span
            aria-label={`${length}자 입력, 최대 ${POST_MAX_LENGTH}자`}
            className={cn("text-[13px] tabular-nums", overLimit ? "text-destructive" : "text-muted-foreground")}
          >
            {length}/{POST_MAX_LENGTH}
          </span>
          <ActionButton disabled={!canPost} onClick={submit}>
            게시
          </ActionButton>
        </div>
      </div>
    </>
  );
}

/** Global composer dialog: new thread, or a reply when the store's `replyTo` is set. */
export function Composer() {
  const { composerOpen, closeComposer } = useThreads();
  const { setComposerPrefill } = useExtras();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Dialog.Root
      open={composerOpen}
      onOpenChange={(open) => {
        if (open) return;
        setComposerPrefill("");
        closeComposer();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-backdrop transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          initialFocus={textareaRef}
          className="fixed inset-0 z-50 flex flex-col bg-surface text-foreground outline-none transition-[opacity,scale] duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[min(80dvh,640px)] md:w-[620px] md:max-w-[calc(100vw-24px)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[16px] md:border md:border-border md:shadow-[0_8px_40px_rgba(0,0,0,0.18)] md:data-[ending-style]:scale-95 md:data-[starting-style]:scale-95"
        >
          <ComposerBody textareaRef={textareaRef} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
