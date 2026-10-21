import type { Metadata } from "next";
import { Suspense } from "react";
import { Column } from "@/components/sites/threads/column";
import { PageHeader } from "@/components/sites/threads/page-header";
import { PostView } from "@/components/sites/threads/post-view";

export const metadata: Metadata = { title: "스레드 • Threads (비공식 데모 클론)" };

export default function PostPage() {
  return (
    <>
      <PageHeader title="스레드" back />
      <Column>
        <Suspense fallback={<div className="h-[240px]" aria-hidden="true" />}>
          <PostView />
        </Suspense>
      </Column>
    </>
  );
}
