import { activities } from "@/src/data/activities";
import { Activity } from "@/src/types/activity";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

const HeartIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
      fill="#fff"
    />
  </Svg>
);

const MentionIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
      fill="#fff"
    />
  </Svg>
);

const FollowIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z"
      fill="#fff"
    />
  </Svg>
);

const FollowingIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Circle cx="9" cy="7" r="4" stroke="#fff" strokeWidth={2.5} />
    <Path
      d="M17 11l2 2 4-4"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CommentIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
      fill="#fff"
    />
  </Svg>
);

const ReplyIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 15L3 9l6-6"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 9h12a6 6 0 0 1 0 12h-3"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

const RepostIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 1l4 4-4 4"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 11V9a4 4 0 0 1 4-4h14"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Path
      d="M7 23l-4-4 4-4"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 13v2a4 4 0 0 1-4 4H3"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

const ShareIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 5l7 7-7 7M2 12h20"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13l4 4L19 7"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TagIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="7" cy="7" r="1.5" fill="#fff" />
  </Svg>
);

const PollIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 20V10M12 20V4M6 20v-6"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "follow":
      return <FollowIcon />;
    case "following":
      return <FollowingIcon />;
    case "liked_post":
    case "liked_repost":
      return <HeartIcon />;
    case "shared_post":
      return <ShareIcon />;
    case "group_approved":
      return <CheckIcon />;
    case "reply":
      return <ReplyIcon />;
    case "comment":
      return <CommentIcon />;
    case "reposted":
      return <RepostIcon />;
    case "mention":
    case "tagged":
      return <MentionIcon />;
    case "poll_vote":
      return <PollIcon />;
    default:
      return null;
  }
};

type ActivityFilter =
  | "all"
  | "follows"
  | "likes"
  | "comments"
  | "reposts"
  | "mentions"
  | "groups";

const FILTER_TABS: { key: ActivityFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "follows", label: "Follows" },
  { key: "likes", label: "Likes" },
  { key: "comments", label: "Comments" },
  { key: "reposts", label: "Reposts" },
  { key: "mentions", label: "Mentions" },
  { key: "groups", label: "Groups" },
];

const filterActivities = (items: Activity[], filter: ActivityFilter) => {
  switch (filter) {
    case "follows":
      return items.filter((a) => a.type === "follow" || a.type === "following");
    case "likes":
      return items.filter(
        (a) => a.type === "liked_post" || a.type === "liked_repost",
      );
    case "comments":
      return items.filter((a) => a.type === "comment" || a.type === "reply");
    case "reposts":
      return items.filter(
        (a) => a.type === "reposted" || a.type === "shared_post",
      );
    case "mentions":
      return items.filter((a) => a.type === "mention" || a.type === "tagged");
    case "groups":
      return items.filter((a) => a.type === "group_approved");
    default:
      return items;
  }
};

const Notification = () => {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.top);
  const badgeBg = isDark ? "#FAFAFA" : "#1A1A1A";
  const [followedBack, setFollowedBack] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");

  const handleFollowBack = (id: string) => {
    setFollowedBack((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filtered = filterActivities(activities, activeFilter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>activity</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <Pressable
                key={tab.key}
                style={[styles.filterTab, isActive && styles.filterTabActive]}
                onPress={() => setActiveFilter(tab.key)}
              >
                <Text
                  style={[
                    styles.filterLabel,
                    isActive && styles.filterLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isFollowedBack = followedBack.includes(item.id);
          return (
            <Pressable style={[styles.item, !item.isRead && styles.itemUnread]}>
              <View style={styles.avatarContainer}>
                <Image source={item.avatar} style={styles.avatar} />
                <View style={[styles.iconBadge, { backgroundColor: badgeBg }]}>
                  {getActivityIcon(item.type)}
                </View>
              </View>

              <View style={styles.content}>
                <View style={styles.textRow}>
                  <Text style={styles.username}>{item.username} </Text>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
                {item.postPreview && (
                  <Text style={styles.postPreview} numberOfLines={1}>
                    {item.postPreview}
                  </Text>
                )}
                <Text style={styles.time}>{item.time}</Text>
              </View>

              {item.type === "follow" && (
                <Pressable
                  style={[
                    styles.followBtn,
                    isFollowedBack && styles.followBtnActive,
                  ]}
                  onPress={() => handleFollowBack(item.id)}
                >
                  <Text
                    style={[
                      styles.followBtnText,
                      isFollowedBack && styles.followBtnTextActive,
                    ]}
                  >
                    {isFollowedBack ? "Following" : "Follow Back"}
                  </Text>
                </Pressable>
              )}

              {!item.isRead && item.type !== "follow" && (
                <View style={styles.unreadDot} />
              )}
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Notification;

const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
      paddingTop: topInset,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 56,
    },
    title: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "700",
      fontSize: 28,
    },
    filterWrapper: {
      height: 50,
    },
    filterRow: {
      paddingHorizontal: 16,
      gap: 8,
      alignItems: "center",
      height: 50,
    },
    filterTab: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    filterTabActive: {
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    filterLabel: {
      color: "#888",
      fontSize: 14,
      fontWeight: "500",
    },
    filterLabelActive: {
      color: isDark ? "#1A1A1A" : "#FAFAFA",
      fontWeight: "600",
    },
    list: {
      paddingBottom: 90,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    },
    itemUnread: {
      backgroundColor: isDark ? "#222222" : "#F5F5F5",
    },
    avatarContainer: {
      position: "relative",
    },
    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      resizeMode: "cover",
    },
    iconBadge: {
      position: "absolute",
      bottom: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    content: {
      flex: 1,
      gap: 2,
    },
    textRow: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    username: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 14,
    },
    message: {
      color: isDark ? "#CCCCCC" : "#444444",
      fontSize: 14,
    },
    postPreview: {
      color: "#888",
      fontSize: 13,
    },
    time: {
      color: "#888",
      fontSize: 12,
      marginTop: 2,
    },
    followBtn: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    followBtnActive: {
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    followBtnText: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 13,
      fontWeight: "600",
    },
    followBtnTextActive: {
      color: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
      marginLeft: 74,
    },
  });
