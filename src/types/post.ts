export type Post = {
  id: string;
  name: string;
  username: string;
  avatar: number; // require() returns a number in RN
  content: string;
  time: string;
  likes: number;
  comments: number;
};
