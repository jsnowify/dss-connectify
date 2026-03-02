import { BadgeType } from "@/src/types/badge";

export type MessagePreview = {
  id: string;
  username: string;
  avatar: number;
  lastMessage: string;
  time: string;
  unread: number;
  badges?: BadgeType[];
  isGroup?: boolean;
  isRequest?: boolean;
  groupAvatars?: number[];
};
