"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ME, USERS, getUser } from "./data";
import { EmptyState } from "./empty-state";
import { useExtras } from "./extras";
import { SearchIcon } from "./icons";
import { PostList } from "./post-list";
import { useThreads } from "./store";
import { UserRow } from "./user-row";

function SectionTitle({ children }: { children: string }) {
  return <h2 className="border-b border-border px-3 py-3 text-[15px] font-semibold md:px-6">{children}</h2>;
}

function SearchBody({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const { posts } = useThreads();
  const { hidden } = useExtras();
  const needle = query.trim().toLowerCase();

  const users = useMemo(
    () =>
      USERS.filter(
        (u) => u.handle !== ME && `${u.handle} ${u.name} ${u.bio}`.toLowerCase().includes(needle),
      ),
    [needle],
  );
  const matchedPosts = useMemo(
    () =>
      posts
        .filter((p) => !hidden.has(p.id) && `${p.text} ${p.author} ${getUser(p.author).name}`.toLowerCase().includes(needle))
        .sort((a, b) => a.ageMinutes - b.ageMinutes),
    [posts, hidden, needle],
  );

  return (
    <div>
      <div className="border-b border-border px-3 py-3 md:px-6">
        <label className="flex h-11 items-center gap-2 rounded-xl bg-field px-4 text-muted-foreground focus-within:outline-2 focus-within:outline-ring">
          <SearchIcon size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색"
            aria-label="사용자와 스레드 검색"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>
      {needle === "" ? (
        <section aria-label="팔로우 추천">
          <SectionTitle>팔로우 추천</SectionTitle>
          <div className="divide-y divide-border">
            {users.map((u) => (
              <UserRow key={u.handle} handle={u.handle} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {users.length > 0 ? (
            <section aria-label="사용자">
              <SectionTitle>사용자</SectionTitle>
              <div className="divide-y divide-border border-b border-border">
                {users.map((u) => (
                  <UserRow key={u.handle} handle={u.handle} />
                ))}
              </div>
            </section>
          ) : null}
          {matchedPosts.length > 0 ? (
            <section aria-label="스레드">
              <SectionTitle>스레드</SectionTitle>
              <PostList posts={matchedPosts} empty="" />
            </section>
          ) : null}
          {users.length === 0 && matchedPosts.length === 0 ? (
            <EmptyState>&apos;{query.trim()}&apos;에 대한 검색 결과가 없어요</EmptyState>
          ) : null}
        </>
      )}
    </div>
  );
}

/** Search: ?q= seeds the field; typing filters users and posts instantly. Empty query shows follow suggestions. */
export function SearchView() {
  const q = useSearchParams().get("q") ?? "";
  return <SearchBody key={q} initialQuery={q} />;
}
