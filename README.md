# Threads (비공식 데모 클론)

> **비공식 팬 프로젝트입니다.** Meta / Instagram / Threads와 관련이 없고, 로그인·실제 계정·실제 데이터를 다루지 않습니다.
> Threads 이름과 로고, 상표는 각 권리자(Meta)에게 있습니다. 화면의 사용자와 게시물은 모두 가상의 예시 데이터입니다.

**데모:** https://devtoolxd.github.io/threads/

[threads.com](https://www.threads.com/)의 화면 구성과 동작을 학습용으로 다시 만든 프런트엔드 데모입니다.
(English: an unofficial, educational front-end demo that recreates the Threads web UI with fictional data.)

## 기능

- 홈 피드, 게시물 작성과 답글, 좋아요·리포스트, 링크 복사
- 검색(사용자·게시물), 팔로우 추천, 알림 탭
- 프로필과 게시물 상세, 라이트·다크 테마
- 좋아요, 팔로우, 내가 쓴 글은 브라우저(localStorage)에 저장되고, Firebase를 설정하면 Firestore에도 저장됩니다.

## 기술 스택

Next.js 16 (정적 export) · React 19 · TypeScript · Tailwind CSS v4 · Firebase(익명 인증 + Firestore, REST 호출이라 SDK 없음)

## 실행

```bash
npm ci --ignore-scripts
npm run dev            # 개발 서버
npm run check          # lint + typecheck + build (out/ 생성)
```

## GitHub Pages 배포

Pages는 `gh-pages` 브랜치(루트)에서 서빙합니다. 프로젝트 사이트 경로(`/threads`)로 빌드한 뒤 배포합니다.

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/threads'; npm run build
node scripts/deploy-pages.mjs
```

macOS / Linux: `NEXT_PUBLIC_BASE_PATH=/threads npm run build`

## Firebase 설정 (선택, 무료 Spark 요금제)

1. Firebase 콘솔에서 프로젝트를 만들고 웹 앱을 등록해 `apiKey`, `projectId`를 확인합니다.
2. Authentication → 로그인 방법에서 **익명**을 사용 설정합니다.
3. Firestore Database를 만들고(Standard) `firebase/firestore.rules` 내용을 규칙에 게시합니다.
4. `.env.example`을 `.env.local`로 복사해 값을 채운 뒤 다시 빌드합니다.
5. (권장) Google Cloud 콘솔 → API 및 서비스 → 사용자 인증 정보에서 API 키의 HTTP 리퍼러를 배포 도메인으로 제한합니다.

웹 설정 값은 비밀이 아니고 접근은 보안 규칙이 제한합니다. 서비스 계정 키나 관리자 키는 절대 커밋하지 마세요.

## 크레딧과 라이선스

- [JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)(MIT) 템플릿에서 시작했습니다. 라이선스 전문은 `LICENSE`에 있습니다.
- 상표와 로고는 라이선스 대상이 아니며 각 권리자에게 있습니다.
