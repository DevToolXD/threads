import Link from "next/link";
import { Column } from "@/components/sites/threads/column";
import { PageHeader } from "@/components/sites/threads/page-header";

export default function NotFound() {
  return (
    <>
      <PageHeader title="페이지를 찾을 수 없어요" />
      <Column>
        <div className="px-6 py-16 text-center">
          <p className="text-[15px] text-muted-foreground">페이지를 찾을 수 없어요</p>
          <Link href="/" className="mt-4 inline-block rounded-[10px] border border-border px-4 py-2 font-semibold hover:bg-hover">
            홈으로 돌아가기
          </Link>
        </div>
      </Column>
    </>
  );
}
