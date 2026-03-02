export type ActivityType =
  | "follow"
  | "following"
  | "liked_post"
  | "shared_post"
  | "group_approved"
  | "reply"
  | "comment"
  | "reposted"
  | "liked_repost"
  | "mention"
  | "tagged"
  | "poll_vote";

export type Activity = {
  id: string;
  type: ActivityType;
  username: string;
  avatar: number;
  message: string;
  time: string;
  isRead: boolean;
  postPreview?: string;
};
