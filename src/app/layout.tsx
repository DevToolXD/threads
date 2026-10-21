import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/sites/threads/app-shell";
import { ExtrasProvider } from "@/components/sites/threads/extras";
import { ThreadsProvider } from "@/components/sites/threads/store";
import { themeInitScript } from "@/components/sites/threads/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threads (비공식 데모 클론)",
  description:
    "Threads 화면을 모방한 비공식 프론트엔드 데모입니다. Meta와 무관하며 모든 데이터는 가상의 예시입니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">
        <ThreadsProvider>
          <ExtrasProvider>
            <AppShell>{children}</AppShell>
          </ExtrasProvider>
        </ThreadsProvider>
      </body>
    </html>
  );
}
