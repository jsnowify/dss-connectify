import { useTabBar } from "@/src/context/TabBarContext";
import { Post } from "@/src/types/post";
import { FlatList } from "react-native";
import PostCard from "../post/PostCard";
import { PostComposer } from "../post/PostComposer";

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => {
  const { handleScroll } = useTabBar();

  return (
    <FlatList<Post>
      data={posts}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<PostComposer />}
      renderItem={({ item }) => <PostCard post={item} />}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    />
  );
};
