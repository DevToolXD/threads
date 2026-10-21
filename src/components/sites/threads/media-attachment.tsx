import type { ThreadsPost } from "@/types/threads";

/** Gradient placeholder rendered where the live site shows a photo; no external images are used. */
export function MediaAttachment({ media }: { media: NonNullable<ThreadsPost["media"]> }) {
  return (
    <div
      role="img"
      aria-label={media.caption ?? "첨부 이미지"}
      className="relative mt-2 aspect-[16/10] overflow-hidden rounded-[8px] border border-media-outline"
      style={{
        backgroundImage: `radial-gradient(circle at 24% 18%, rgba(255,255,255,0.38), transparent 46%), linear-gradient(135deg, ${media.from}, ${media.to})`,
      }}
    >
      {media.caption ? (
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent px-3 pt-10 pb-2.5 text-[15px] font-semibold text-white">
          {media.caption}
        </div>
      ) : null}
    </div>
  );
}
