import Link from "next/link";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { ThreadsLogo } from "./icons";
import { MenuPopover } from "./menu-popover";

interface PageHeaderProps {
  title: string;
  /** Adds a back button and left-aligns the desktop title (profile, post detail). */
  back?: boolean;
}

/**
 * Sticky page header. Under 768px it is the logo bar (title kept for screen readers);
 * from 768px it is the 72px title bar above the rounded column.
 */
export function PageHeader({ title, back = false }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-header backdrop-blur-[28px] md:bg-background md:backdrop-blur-none">
      <div className="relative h-[60px] md:h-[72px]">
        <div className="absolute inset-x-0 top-3 flex justify-center md:hidden">
          <Link href="/" aria-label="Threads 홈" className="rounded-md text-foreground">
            <ThreadsLogo size={32} aria-hidden="true" />
          </Link>
        </div>
        {back ? <BackButton className="absolute top-2 left-2.5 md:top-[18px] md:left-6" /> : null}
        <div className="absolute top-2 right-2 md:hidden">
          <MenuPopover side="bottom" align="end" />
        </div>
        <h1
          className={cn(
            "max-md:sr-only md:absolute md:top-[21.5px] md:text-[20px] md:leading-[25px] md:font-semibold",
            back ? "md:left-[72px]" : "md:inset-x-0 md:text-center",
          )}
        >
          {title}
        </h1>
      </div>
    </header>
  );
}
