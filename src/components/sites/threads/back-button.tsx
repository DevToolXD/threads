"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "./extra-icons";

/** Goes back in history, or to the home feed when the page was opened directly. */
export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="뒤로 가기"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push("/");
      }}
      className={cn("flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-hover active:bg-pressed", className)}
    >
      <ArrowLeftIcon size={20} />
    </button>
  );
}
