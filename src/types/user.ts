import { BadgeType } from "./badge";

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: number;
  bio?: string;
  followers: number;
  following: number;
  badges?: BadgeType[];
};
