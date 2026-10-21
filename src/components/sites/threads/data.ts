import type { ActivityItem, ThreadsPost, ThreadsUser } from "@/types/threads";

/** The signed-in demo account used across the clone. */
export const ME = "me.threads";

export const USERS: ThreadsUser[] = [
  { handle: ME, name: "나", bio: "Threads 클론 데모 계정 ✨\nNext.js로 만든 스레드", followers: 128, following: 64, hue: 215 },
  { handle: "minji.daily", name: "민지의 하루", bio: "카페 · 산책 · 필름카메라\n서울 성수동", followers: 12840, following: 301, hue: 340 },
  { handle: "dev.hojun", name: "호준 | 개발자", bio: "프론트엔드 개발자. TypeScript, React, 가끔 Rust.\n퇴근 후엔 러닝 🏃", followers: 48210, following: 188, verified: true, hue: 160 },
  { handle: "sora_books", name: "소라의 책장", bio: "일주일에 한 권 읽기 📚\n독서 기록 + 한 줄 감상", followers: 9320, following: 412, hue: 30 },
  { handle: "chef.taeyang", name: "태양 셰프", bio: "집밥 레시피 / 15분 요리\n문의: DM", followers: 76500, following: 95, verified: true, hue: 15 },
  { handle: "jiwoo.runs", name: "지우", bio: "마라톤 준비 중 · 서브4 도전\n한강 러닝크루", followers: 5410, following: 560, hue: 100 },
  { handle: "ai.weekly", name: "AI 위클리", bio: "매주 정리하는 AI 소식\n링크는 프로필에", followers: 103400, following: 40, verified: true, hue: 265 },
  { handle: "nari_travel", name: "나리 여행", bio: "42개국 · 배낭 + 노트북\n지금은 리스본", followers: 22150, following: 701, hue: 195 },
];

export const POSTS: ThreadsPost[] = [
  {
    id: "p1",
    author: "dev.hojun",
    text: "코드 리뷰에서 제일 도움 됐던 한 마디.\n\"이 코드를 6개월 뒤에 내가 읽어도 이해될까?\"\n\n그 뒤로 변수 이름에 훨씬 신경 쓰게 됐다. #개발자 #코드리뷰",
    ageMinutes: 14,
    likes: 1284,
    replies: 96,
    reposts: 212,
  },
  {
    id: "p2",
    author: "minji.daily",
    text: "성수동 새로 생긴 카페, 창가 자리에서 보이는 노을이 미쳤다 🌇\n평일 오후 4시쯤 가면 자리 여유 있어요",
    ageMinutes: 38,
    likes: 842,
    replies: 41,
    reposts: 17,
    media: { from: "#f6a56b", to: "#c2506b", caption: "노을 · 성수동" },
  },
  {
    id: "p3",
    author: "ai.weekly",
    text: "이번 주 AI 소식 3줄 요약\n\n1. 코딩 에이전트가 PR을 스스로 열고 테스트까지 돌리는 흐름이 보편화\n2. 온디바이스 모델이 폰에서 실시간 번역 지원\n3. 오픈소스 모델 성능 격차 계속 축소 #AI #주간뉴스",
    ageMinutes: 72,
    likes: 3920,
    replies: 188,
    reposts: 902,
  },
  {
    id: "p3r1",
    author: "dev.hojun",
    text: "2번이 체감상 제일 크다. 번역 앱 끄고 살아도 될 듯.",
    ageMinutes: 60,
    likes: 120,
    replies: 4,
    reposts: 2,
    parentId: "p3",
  },
  {
    id: "p4",
    author: "sora_books",
    text: "이번 주 읽은 책: 《아주 작은 습관의 힘》\n\n한 줄 감상 — 의지력이 아니라 환경을 바꾸는 이야기. 책상 위에 책을 올려두는 것부터 시작했다.",
    ageMinutes: 125,
    likes: 506,
    replies: 33,
    reposts: 21,
  },
  {
    id: "p5",
    author: "chef.taeyang",
    text: "15분 완성 💨 간장버터계란밥\n\n밥 1공기 + 버터 한 조각 + 계란 노른자 + 간장 반 스푼 + 참기름.\n전자레인지 30초만 돌리면 끝. 김가루는 취향!",
    ageMinutes: 190,
    likes: 7310,
    replies: 412,
    reposts: 1430,
    media: { from: "#ffd66b", to: "#e8833a", caption: "간장버터계란밥" },
  },
  {
    id: "p6",
    author: "jiwoo.runs",
    text: "오늘 한강 10km 55분 컷 🏃‍♀️\n작년 이맘때는 숨차서 5km도 못 뛰었는데… 꾸준함이 진짜 이긴다.",
    ageMinutes: 255,
    likes: 689,
    replies: 52,
    reposts: 9,
  },
  {
    id: "p7",
    author: "nari_travel",
    text: "리스본 트램 28번, 평일 아침 8시에 타면 한산해요.\n오후엔 줄이 어마어마하니까 일찍 움직이세요 🚋",
    ageMinutes: 340,
    likes: 1520,
    replies: 77,
    reposts: 64,
    media: { from: "#6bc5f6", to: "#3a62e8", caption: "리스본 · 트램 28" },
  },
  {
    id: "p8",
    author: "dev.hojun",
    text: "TypeScript 팁: `satisfies` 연산자 아직 안 쓰고 있다면 오늘 써보세요. 타입 추론은 유지하면서 형태만 검증해줍니다.",
    ageMinutes: 480,
    likes: 2210,
    replies: 120,
    reposts: 340,
  },
  {
    id: "p9",
    author: "minji.daily",
    text: "필름 현상 맡겼는데 오늘 스캔본 도착 😭 첫 롤이라 반은 흔들렸지만 그래서 더 좋은 느낌",
    ageMinutes: 720,
    likes: 431,
    replies: 18,
    reposts: 5,
  },
  {
    id: "p10",
    author: "sora_books",
    text: "독서 모임에서 나온 질문: \"책을 끝까지 안 읽으면 죄책감 느껴야 하나요?\"\n\n저는 아니라고 생각해요. 안 맞는 책은 덮어도 됩니다.",
    ageMinutes: 1000,
    likes: 1190,
    replies: 143,
    reposts: 58,
  },
  {
    id: "p11",
    author: ME,
    text: "Threads 클론 만드는 중! 아직 갈 길이 멀지만 홈 피드는 거의 비슷해졌다 👀",
    ageMinutes: 1500,
    likes: 12,
    replies: 2,
    reposts: 0,
  },
];

export const ACTIVITY: ActivityItem[] = [
  { id: "a1", kind: "like", actor: "dev.hojun", ageMinutes: 5, excerpt: "Threads 클론 만드는 중! 아직 갈 길이 멀지만…" },
  { id: "a2", kind: "follow", actor: "minji.daily", ageMinutes: 22 },
  { id: "a3", kind: "reply", actor: "sora_books", ageMinutes: 47, excerpt: "오 완성되면 꼭 공유해주세요!" },
  { id: "a4", kind: "repost", actor: "ai.weekly", ageMinutes: 130, excerpt: "Threads 클론 만드는 중!" },
  { id: "a5", kind: "mention", actor: "jiwoo.runs", ageMinutes: 260, excerpt: "@me.threads 이거 어떻게 만들었어요?" },
  { id: "a6", kind: "follow", actor: "chef.taeyang", ageMinutes: 600 },
  { id: "a7", kind: "like", actor: "nari_travel", ageMinutes: 1200, excerpt: "Threads 클론 만드는 중!" },
];

export function getUser(handle: string): ThreadsUser {
  return (
    USERS.find((u) => u.handle === handle) ?? {
      handle,
      name: handle,
      bio: "",
      followers: 0,
      following: 0,
      hue: 220,
    }
  );
}

export function formatAge(ageMinutes: number): string {
  if (ageMinutes < 1) return "방금";
  if (ageMinutes < 60) return `${Math.floor(ageMinutes)}분`;
  if (ageMinutes < 60 * 24) return `${Math.floor(ageMinutes / 60)}시간`;
  if (ageMinutes < 60 * 24 * 7) return `${Math.floor(ageMinutes / (60 * 24))}일`;
  return `${Math.floor(ageMinutes / (60 * 24 * 7))}주`;
}

export function formatCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "")}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}천`;
  return String(n);
}
