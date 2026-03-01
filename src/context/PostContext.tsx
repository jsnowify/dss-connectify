import { posts as initialPosts } from "@/src/data/posts";
import { Post } from "@/src/types/post";
import { createContext, useContext, useState } from "react";

// require must be static — never inside a function
const defaultAvatar = require("../../assets/images/avatar.jpg");

type PostContextType = {
  posts: Post[];
  addPost: (content: string) => void;
};

const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      name: "Snowi",
      username: "snowi",
      avatar: defaultAvatar,
      content,
      time: "now",
      likes: 0,
      comments: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within PostProvider");
  return context;
};
