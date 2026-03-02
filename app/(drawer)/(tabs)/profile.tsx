import { BadgeTag } from "@/src/components/common/BadgeTag";
import { posts } from "@/src/data/posts";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const defaultAvatar = require("../../../assets/images/avatar.jpg");

const SettingsIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartOutline = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartFilled = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
      fill={color}
    />
  </Svg>
);

const RepostIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 1l4 4-4 4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 11V9a4 4 0 0 1 4-4h14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M7 23l-4-4 4-4"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 13v2a4 4 0 0 1-4 4H3"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const CommentIcon = ({
  color,
  size = 20,
}: {
  color: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type ProfileTab = "posts" | "replies" | "reposts";

const PROFILE_TABS: { key: ProfileTab; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "replies", label: "Replies" },
  { key: "reposts", label: "Reposts" },
];

const Profile = () => {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.top);
  const iconColor = isDark ? "#FAFAFA" : "#1A1A1A";
  const mutedColor = "#888";
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const tabPosts =
    activeTab === "posts" ? posts.filter((p) => p.username === "snowi") : [];

  const Header = (
    <View>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topUsername}>snowi</Text>
        <Pressable>
          <SettingsIcon color={iconColor} />
        </Pressable>
      </View>

      {/* Avatar + Name row */}
      <View style={styles.avatarNameRow}>
        <Image source={defaultAvatar} style={styles.avatar} />
        <View style={styles.nameSection}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Snowi Wu</Text>
            <BadgeTag type="student" />
          </View>
          <Text style={styles.bio}>
            just a dev who loves dark mode and good coffee ☕
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1.2K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>348</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.1K</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Share Profile</Text>
        </Pressable>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabRow}>
        {PROFILE_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.tabIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tabPosts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isLiked = likedPosts.includes(item.id);
          return (
            <View style={styles.postItem}>
              <View style={styles.postHeader}>
                <Image source={item.avatar} style={styles.postAvatar} />
                <View style={styles.postMeta}>
                  <View style={styles.postNameRow}>
                    <Text style={styles.postUsername}>{item.username}</Text>
                    <BadgeTag type="student" />
                    <Text style={styles.postTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.postContent}>{item.content}</Text>
                  <View style={styles.postActions}>
                    <Pressable
                      style={styles.actionIconBtn}
                      onPress={() => toggleLike(item.id)}
                    >
                      {isLiked ? (
                        <HeartFilled color="#EF4444" size={18} />
                      ) : (
                        <HeartOutline color={mutedColor} size={18} />
                      )}
                      <Text style={styles.actionCount}>
                        {isLiked ? item.likes + 1 : item.likes}
                      </Text>
                    </Pressable>
                    <Pressable style={styles.actionIconBtn}>
                      <CommentIcon color={mutedColor} size={18} />
                      <Text style={styles.actionCount}>{item.comments}</Text>
                    </Pressable>
                    <Pressable style={styles.actionIconBtn}>
                      <RepostIcon color={mutedColor} size={18} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === "replies"
                ? "No replies yet"
                : activeTab === "reposts"
                  ? "No reposts yet"
                  : "No posts yet"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Profile;

const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    list: {
      paddingBottom: 90,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: topInset,
      height: 48 + topInset,
    },
    topUsername: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "700",
      fontSize: 18,
    },
    avatarNameRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      gap: 12,
      marginTop: 2,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      resizeMode: "cover",
    },
    nameSection: {
      flex: 1,
      gap: 3,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    name: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "700",
      fontSize: 17,
    },
    bio: {
      color: isDark ? "#AAAAAA" : "#555555",
      fontSize: 13,
      lineHeight: 18,
    },
    statsRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      marginTop: 14,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      gap: 1,
    },
    statNumber: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "700",
      fontSize: 17,
    },
    statLabel: {
      color: "#888",
      fontSize: 11,
    },
    statDivider: {
      width: 1,
      height: 24,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    actionRow: {
      flexDirection: "row",
      paddingHorizontal: 16,
      gap: 8,
      marginTop: 14,
    },
    actionBtn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDark ? "#3A3A3A" : "#DEDEDE",
      alignItems: "center",
    },
    actionBtnText: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 13,
    },
    tabRow: {
      flexDirection: "row",
      marginTop: 14,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    tabItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 10,
      position: "relative",
    },
    tabLabel: {
      color: "#888",
      fontSize: 14,
      fontWeight: "500",
    },
    tabLabelActive: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
    },
    tabIndicator: {
      position: "absolute",
      bottom: 0,
      left: "25%",
      right: "25%",
      height: 2,
      borderRadius: 1,
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    postItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    postHeader: {
      flexDirection: "row",
      gap: 10,
    },
    postAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      resizeMode: "cover",
    },
    postMeta: {
      flex: 1,
      gap: 3,
    },
    postNameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    postUsername: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 14,
    },
    postTime: {
      color: "#888",
      fontSize: 12,
    },
    postContent: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 14,
      lineHeight: 20,
    },
    postActions: {
      flexDirection: "row",
      gap: 16,
      marginTop: 6,
    },
    actionIconBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    actionCount: {
      color: "#888",
      fontSize: 13,
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    emptyContainer: {
      paddingVertical: 32,
      alignItems: "center",
    },
    emptyText: {
      color: "#888",
      fontSize: 14,
    },
  });
