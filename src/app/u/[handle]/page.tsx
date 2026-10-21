import type { Metadata } from "next";
import { Column } from "@/components/sites/threads/column";
import { ME, USERS, getUser } from "@/components/sites/threads/data";
import { PageHeader } from "@/components/sites/threads/page-header";
import { ProfileView } from "@/components/sites/threads/profile-view";

// Static export: only the handles in the mock data exist; everything else is the 404 page.
export const dynamicParams = false;

export function generateStaticParams(): Array<{ handle: string }> {
  return USERS.map((user) => ({ handle: user.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  return { title: `${getUser(handle).name} (${handle}) • Threads (비공식 데모 클론)` };
}

export default async function ProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return (
    <>
      <PageHeader title={getUser(handle).name} back={handle !== ME} />
      <Column>
        <ProfileView handle={handle} />
      </Column>
    </>
  );
}
