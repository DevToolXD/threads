import type { Metadata } from "next";
import { ActivityView } from "@/components/sites/threads/activity-view";
import { Column } from "@/components/sites/threads/column";
import { PageHeader } from "@/components/sites/threads/page-header";

export const metadata: Metadata = { title: "알림 • Threads (비공식 데모 클론)" };

export default function ActivityPage() {
  return (
    <>
      <PageHeader title="알림" />
      <Column>
        <ActivityView />
      </Column>
    </>
  );
}
