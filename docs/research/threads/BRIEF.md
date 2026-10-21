# Threads clone: brief

Unofficial front-end-only demo of Threads (threads.com). Fictional mock data, no auth, no network.
Static export (`output: "export"`, `trailingSlash`), basePath from `NEXT_PUBLIC_BASE_PATH` (e.g. `/threads`).

## Route map
| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | header 홈, composer row, feed (top-level posts, newest first) |
| `/search/?q=` | `src/app/search/page.tsx` + `search-view.tsx` | client, `useSearchParams` in `<Suspense>`; empty query = 팔로우 추천 |
| `/activity/` | `src/app/activity/page.tsx` + `activity-view.tsx` | tabs 전체/팔로우/답글/멘션 over `ACTIVITY` |
| `/u/[handle]/` | `src/app/u/[handle]/page.tsx` + `profile-view.tsx` | `generateStaticParams` from `USERS`, `dynamicParams = false` |
| `/post/?id=` | `src/app/post/page.tsx` + `post-view.tsx` | client; local posts work; unknown id shows "게시물을 찾을 수 없어요" |
| 404 | `src/app/not-found.tsx` | inside the shell, link home |

Links go through `href.ts` (`profileHref`, `postHref`, `searchHref`) and `next/link`.

## File ownership (`src/components/sites/threads/`)
- Chrome: `app-shell`, `side-nav` (>=768px rail), `bottom-nav` (<768px), `page-header`, `column`, `toast`, `menu-popover` (더 보기: theme + notice).
- Posts: `feed`, `post-list`, `post-card`, `post-actions`, `post-menu`, `rich-text`, `media-attachment`, `composer` (base-ui Dialog, new/reply).
- Shared UI: `action-button`, `follow-button`, `user-row`, `tabs`, `empty-state`, `avatar`, `icons`, `extra-icons`, `back-button`.
- State: `store.tsx` (posts, liked, reposted, following, composer, toast), `extras.tsx` (saved, hidden, follower delta, composer prefill), `theme.tsx` + `theme-script.ts` (class on `<html>`, key `threads-demo-theme`).
- Data/copy: `data.ts` (USERS, POSTS, ACTIVITY), `messages.ts` (toast and notice strings), `use-copy-link.ts`, `use-active-tab.ts`.
- Parent-owned, do not change from here: `next.config.ts`, `href.ts`, `use-copy-link.ts`, README, scripts/, firebase/.

## Tokens (`src/app/globals.css`)
Measured from live `--barcelona-*`: light bg `#fff`, dark bg `#101010`, surface dark `#181818`, muted text `#999`/`#777`,
column outline `#d5d5d5`/`#2d2d2d`, like `#ff3040`, link `#0095f6`. Column max 640px, radius 24px; rail 68px; header 72px (60px mobile);
avatar 36px; action row 36px high. System font stack only, body 15px/21px.

## Disclaimer
"비공식 데모 · Meta와 무관" (`DEMO_NOTICE`): small text above 더 보기 in the rail (desktop), bottom of every page (mobile), and in the 더 보기 menu.

## Verified
- `npm run check` green (lint, typecheck, build; 15 static pages).
- Root build served on 127.0.0.1:3101: `/`, `/search/`, `/activity/`, `/u/dev.hojun/`, `/u/me.threads/`, `/post/?id=p1`, `/post/?id=nope` all 200; `lang="ko"`, title and notice present in the HTML.
- `NEXT_PUBLIC_BASE_PATH=/threads` build served under `/threads/`: `/`, `/search/`, `/activity/`, `/u/dev.hojun/`, `/post/?id=p1` 200; all `_next` asset URLs start with `/threads/_next/` and resolve.

## Known gaps
- NOT browser-tested: the browser tool refused localhost navigation ("blocked by policy"), so like/repost/composer/reply/follow/theme toggle,
  in-app navigation under `/threads`, console errors and the 1280x900 / 390x844 comparison against the reference screenshots were never run. Behavior is verified by typecheck, lint and static HTML only.
- Pixel polish not done: geometry follows measured tokens but no side-by-side diff exists. Avatars are gradient placeholders; media is a gradient block; the live right-hand login card is not cloned.
- Next skips the trailing slash for dotted path segments, so profile links render as `/u/dev.hojun` (no slash). Static hosts redirect to `/u/dev.hojun/`, but client navigation may fall back to a full page load. Fix (parent-owned `href.ts`): return `/u/${handle}/` from `profileHref`.
- Reposts tab: only the demo account has data (what it reposted this session); other profiles show the empty state.
- State is in-memory only (resets on reload); the parent plans persistence via `store.tsx`.
- Messages, insights and report are toasts ("데모에서는 지원하지 않아요"); "프로필 편집" toasts the same.
