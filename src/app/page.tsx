import { Column } from "@/components/sites/threads/column";
import { Feed } from "@/components/sites/threads/feed";
import { PageHeader } from "@/components/sites/threads/page-header";

export default function Home() {
  return (
    <>
      <PageHeader title="홈" />
      <Column>
        <Feed />
      </Column>
    </>
  );
}
