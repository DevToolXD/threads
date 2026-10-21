import type { Metadata } from "next";
import { Suspense } from "react";
import { Column } from "@/components/sites/threads/column";
import { PageHeader } from "@/components/sites/threads/page-header";
import { SearchView } from "@/components/sites/threads/search-view";

export const metadata: Metadata = { title: "검색 • Threads (비공식 데모 클론)" };

export default function SearchPage() {
  return (
    <>
      <PageHeader title="검색" />
      <Column>
        <Suspense fallback={<div className="h-[240px]" aria-hidden="true" />}>
          <SearchView />
        </Suspense>
      </Column>
    </>
  );
}
