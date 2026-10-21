export interface ThreadsUser {
  handle: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  verified?: boolean;
  /** Hue (0-360) used to generate the placeholder avatar gradient. */
  hue: number;
}

export interface ThreadsPost {
  id: string;
  author: string;
  text: string;
  /** Minutes since the post was created (relative to "now"). */
  ageMinutes: number;
  likes: number;
  replies: number;
  reposts: number;
  /** Optional gradient placeholder rendered as an attached image. */
  media?: { from: string; to: string; caption?: string };
  /** Parent post id when this post is a reply. */
  parentId?: string;
  /** Set when the post was created locally in this session. */
  local?: boolean;
}

export type ActivityKind = "like" | "reply" | "follow" | "repost" | "mention";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  actor: string;
  ageMinutes: number;
  excerpt?: string;
}
