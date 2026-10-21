"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Avatar } from "./avatar";
import { ME } from "./data";
import { EmptyState } from "./empty-state";
import { useExtras } from "./extras";
import { PostCard } from "./post-card";
import { PostList } from "./post-list";
import { useThreads } from "./store";

/** Post detail: ?id= selects the post (so locally created posts work in a static export). */
export function PostView() {
  const id = useSearchParams().get("id") ?? "";
  const { posts, openComposer } = useThreads();
  const { hidden } = useExtras();

  const post = posts.find((p) => p.id === id);
  const parent = post?.parentId ? posts.find((p) => p.id === post.parentId) : undefined;
  const replies = useMemo(
    () => posts.filter((p) => p.parentId === id && !hidden.has(p.id)).sort((a, b) => a.ageMinutes - b.ageMinutes),
    [posts, hidden, id],
  );

  if (!post) {
    return (
      <div className="pb-16 text-center">
        <EmptyState>게시물을 찾을 수 없어요</EmptyState>
        <Link href="/" className="inline-block rounded-[10px] border border-border px-4 py-2 font-semibold hover:bg-hover">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      {parent ? <PostCard post={parent} threadLine className="border-b-0" /> : null}
      <PostCard post={post} variant="detail" connected={Boolean(parent)} />
      <button
        type="button"
        onClick={() => openComposer(post.id)}
        className="flex w-full items-center gap-3 border-y border-border px-3 py-3 text-left text-muted-foreground hover:bg-hover md:px-6"
      >
        <Avatar handle={ME} size={36} />
        <span className="flex-1 truncate text-[15px]">{post.author}님에게 답글 남기기...</span>
        <span className="font-semibold">답글</span>
      </button>
      <PostList posts={replies} empty="아직 답글이 없어요. 첫 답글을 남겨보세요." />
    </div>
  );
}
