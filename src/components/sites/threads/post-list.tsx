import type { ThreadsPost } from "@/types/threads";
import { EmptyState } from "./empty-state";
import { PostCard } from "./post-card";

/** Divided list of post cards with an empty state. */
export function PostList({ posts, empty }: { posts: ThreadsPost[]; empty: string }) {
  if (posts.length === 0) return <EmptyState>{empty}</EmptyState>;
  return (
    <div className="divide-y divide-border">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
