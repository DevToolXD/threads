import { cn } from "@/lib/utils";
import { getUser } from "./data";

interface AvatarProps {
  handle: string;
  size?: number;
  className?: string;
}

/** Placeholder avatar: hue-based gradient circle with the first letter of the display name. */
export function Avatar({ handle, size = 36, className }: AvatarProps) {
  const user = getUser(handle);
  const initial = (user.name.trim()[0] ?? handle[0] ?? "?").toUpperCase();
  return (
    <span
      role="img"
      aria-label={`${handle}님의 프로필 사진`}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        backgroundImage: `linear-gradient(135deg, hsl(${user.hue} 70% 62%), hsl(${(user.hue + 40) % 360} 65% 45%))`,
      }}
    >
      {initial}
    </span>
  );
}
