import { PostList } from "@/src/components/common/PostList";
import { HomeHeader } from "@/src/components/navigation/HomeHeader";
import { usePosts } from "@/src/context/PostContext";
import { StyleSheet, useColorScheme, View } from "react-native";

const Home = () => {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);
  const { posts } = usePosts();

  return (
    <View style={styles.container}>
      <HomeHeader />
      <PostList posts={posts} />
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
  });

export default Home;
