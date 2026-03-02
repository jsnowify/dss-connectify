import PostCard from "@/src/components/post/PostCard";
import { usePosts } from "@/src/context/PostContext";
import { useTabBar } from "@/src/context/TabBarContext";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function FollowingFeedScreen() {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = getStyles(isDark, insets.top);
  const iconColor = isDark ? "#FAFAFA" : "#1A1A1A";

  const { posts } = usePosts();
  const { handleScroll } = useTabBar(); // Ensures the bottom TabBar hides on scroll

  // Filter to show only "following" posts (simulated by hiding your own posts)
  const followingPosts = posts.filter((post) => post.username !== "snowi");

  return (
    <View style={styles.container}>
      {/* Header - No Search Icon */}
      <View style={styles.header}>
        <Pressable
          style={styles.iconBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill={iconColor}>
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            />
          </Svg>
        </Pressable>

        <Text style={styles.headerTitle}>Following</Text>

        {/* Invisible spacer to maintain perfect center alignment for the title */}
        <View style={styles.iconBtn} />
      </View>

      {/* Pure Following Feed - No Composer */}
      <FlatList
        data={followingPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              You are not following anyone yet.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: topInset,
      height: 56 + topInset,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: -0.5,
      color: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    iconBtn: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    listContent: {
      paddingBottom: 90, // Space for the bottom TabBar
    },
    emptyState: {
      padding: 48,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 15,
      color: "#888888",
    },
  });
