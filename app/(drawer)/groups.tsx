import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
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

// --- Mock Data ---
const MY_GROUPS = [
  {
    id: "g1",
    name: "Dev Crew",
    avatar: require("../../assets/images/avatar2.jpg"),
    unread: 3,
  },
  {
    id: "g2",
    name: "UI/UX PH",
    avatar: require("../../assets/images/avatar3.jpg"),
    unread: 0,
  },
  {
    id: "g3",
    name: "Thesis Squad",
    avatar: require("../../assets/images/avatar4.jpg"),
    unread: 12,
  },
  {
    id: "g4",
    name: "React Native",
    avatar: require("../../assets/images/avatar5.jpg"),
    unread: 0,
  },
  {
    id: "g5",
    name: "Design Sys",
    avatar: require("../../assets/images/avatar6.jpg"),
    unread: 1,
  },
];

const GROUP_POSTS = [
  {
    id: "p1",
    username: "ren.exe",
    groupName: "Dev Crew",
    avatar: require("../../assets/images/avatar4.jpg"),
    content:
      "Anyone using the new Expo Router API? The nested drawer layout is kind of tricky but so powerful.",
    time: "2m",
    likes: 14,
    comments: 5,
  },
  {
    id: "p2",
    username: "nova.ui",
    groupName: "UI/UX PH",
    avatar: require("../../assets/images/avatar3.jpg"),
    content:
      "Minimalism isn't about removing elements, it's about adding purpose to the whitespace. Thoughts?",
    time: "1h",
    likes: 89,
    comments: 22,
  },
];

const DISCOVER_GROUPS = [
  {
    id: "d1",
    name: "Frontend Masters",
    description:
      "A community for UI developers focusing on React, Vue, and modern CSS architecture.",
    members: "12.4k",
    avatar: require("../../assets/images/avatar7.jpg"),
  },
  {
    id: "d2",
    name: "Indie Hackers",
    description:
      "Build in public, share revenue milestones, and grow your SaaS product.",
    members: "8.1k",
    avatar: require("../../assets/images/avatar.jpg"),
  },
  {
    id: "d3",
    name: "Figma Wizards",
    description:
      "Share your components, auto-layout tricks, and design system templates.",
    members: "24.5k",
    avatar: require("../../assets/images/avatar2.jpg"),
  },
];

// --- Icons ---
const SearchIcon = ({ color }: { color: string }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
  >
    <Path
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusIcon = ({ color }: { color: string }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
  >
    <Path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HeartOutline = ({ color }: { color: string }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
  >
    <Path
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CommentIcon = ({ color }: { color: string }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
  >
    <Path
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- Main Screen Component ---
export default function GroupsScreen() {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = getStyles(isDark, insets.top);
  const iconColor = isDark ? "#FAFAFA" : "#1A1A1A";
  const mutedColor = isDark ? "#888888" : "#666666";

  const [activeTab, setActiveTab] = useState<"feed" | "discover">("feed");

  // 1. Group Carousel Render
  const renderGroupCarousel = () => {
    type GroupItem = (typeof MY_GROUPS)[0];
    type CreateItem = { id: string; name: string; isCreate: boolean };
    type CarouselData = GroupItem | CreateItem;

    const carouselData: CarouselData[] = [
      { id: "create", name: "Create", isCreate: true },
      ...MY_GROUPS,
    ];

    return (
      <View style={styles.carouselContainer}>
        <FlatList<CarouselData>
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          data={carouselData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if ("isCreate" in item) {
              return (
                <Pressable style={styles.groupItem}>
                  <View style={[styles.avatarBase, styles.createAvatar]}>
                    <PlusIcon color={iconColor} />
                  </View>
                  <Text style={styles.groupName} numberOfLines={1}>
                    Create
                  </Text>
                </Pressable>
              );
            }

            return (
              <Pressable style={styles.groupItem}>
                <View>
                  <Image
                    source={item.avatar}
                    style={[styles.avatarBase, styles.groupAvatar]}
                  />
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>
                        {item.unread > 9 ? "9+" : item.unread}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.groupName} numberOfLines={1}>
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    );
  };

  // 2. Tab Switcher Render
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <Pressable style={styles.tabBtn} onPress={() => setActiveTab("feed")}>
        <Text
          style={[styles.tabText, activeTab === "feed" && styles.tabTextActive]}
        >
          Public Feed
        </Text>
        {activeTab === "feed" && <View style={styles.activeIndicator} />}
      </Pressable>

      <Pressable style={styles.tabBtn} onPress={() => setActiveTab("discover")}>
        <Text
          style={[
            styles.tabText,
            activeTab === "discover" && styles.tabTextActive,
          ]}
        >
          Discover
        </Text>
        {activeTab === "discover" && <View style={styles.activeIndicator} />}
      </Pressable>
    </View>
  );

  // Combine headers so both FlatLists can share it
  const ListHeader = (
    <>
      {renderGroupCarousel()}
      {renderTabs()}
    </>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
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
        <Text style={styles.headerTitle}>groups</Text>
        <Pressable style={styles.iconBtn}>
          <SearchIcon color={iconColor} />
        </Pressable>
      </View>

      {/* Conditionally Render the correct Type-Safe List */}
      {activeTab === "feed" ? (
        <FlatList
          data={GROUP_POSTS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={item.avatar} style={styles.postAvatar} />
                <View style={styles.postMeta}>
                  <View style={styles.breadcrumbRow}>
                    <Text style={styles.postUsername}>{item.username}</Text>
                    <Svg
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={mutedColor}
                      strokeWidth={2}
                    >
                      <Path
                        d="m9 18 6-6-6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                    <Text style={styles.postGroupName}>{item.groupName}</Text>
                  </View>
                  <Text style={styles.postTime}>{item.time}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{item.content}</Text>
              <View style={styles.postActions}>
                <Pressable style={styles.actionBtn}>
                  <HeartOutline color={mutedColor} />
                  <Text style={styles.actionText}>{item.likes}</Text>
                </Pressable>
                <Pressable style={styles.actionBtn}>
                  <CommentIcon color={mutedColor} />
                  <Text style={styles.actionText}>{item.comments}</Text>
                </Pressable>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.listBottomPadding}
        />
      ) : (
        <FlatList
          data={DISCOVER_GROUPS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <Pressable style={styles.discoverCard}>
              <Image source={item.avatar} style={styles.discoverAvatar} />

              <View style={styles.discoverContent}>
                <View style={styles.discoverTitleRow}>
                  <Text style={styles.discoverName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.discoverMembers}>
                    {item.members} members
                  </Text>
                </View>
                <Text style={styles.discoverDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.joinBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <Text style={styles.joinBtnText}>Join</Text>
              </Pressable>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.listBottomPadding}
        />
      )}
    </View>
  );
}

// --- Styles (8-Point Grid) ---
const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },

    // Header
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

    // Horizontal Carousel
    carouselContainer: {
      paddingVertical: 24,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    carouselContent: {
      paddingHorizontal: 16,
      gap: 16,
    },
    groupItem: {
      alignItems: "center",
      width: 64,
      gap: 8,
    },
    avatarBase: {
      width: 56,
      height: 56,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    createAvatar: {
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: isDark ? "#555555" : "#CCCCCC",
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    groupAvatar: {
      resizeMode: "cover",
      borderWidth: 1,
      borderColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    unreadBadge: {
      position: "absolute",
      top: -4,
      right: -4,
      backgroundColor: "#EF4444",
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: isDark ? "#1A1A1A" : "#FAFAFA",
      paddingHorizontal: 4,
    },
    unreadText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "700",
    },
    groupName: {
      fontSize: 12,
      fontWeight: "500",
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      textAlign: "center",
    },

    // Tabs
    tabContainer: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    tabBtn: {
      flex: 1,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    tabText: {
      fontSize: 15,
      fontWeight: "600",
      color: isDark ? "#888888" : "#888888",
    },
    tabTextActive: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    activeIndicator: {
      position: "absolute",
      bottom: -1,
      width: 40,
      height: 2,
      borderRadius: 2,
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
    },

    // Post Feed (Tab 1)
    postCard: {
      padding: 16,
    },
    postHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    postAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    postMeta: {
      flex: 1,
      gap: 2,
    },
    breadcrumbRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    postUsername: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    postGroupName: {
      fontSize: 14,
      fontWeight: "700",
      color: isDark ? "#AAAAAA" : "#555555",
    },
    postTime: {
      fontSize: 12,
      color: isDark ? "#888888" : "#888888",
    },
    postContent: {
      fontSize: 15,
      lineHeight: 22,
      color: isDark ? "#E0E0E0" : "#333333",
      marginBottom: 16,
    },
    postActions: {
      flexDirection: "row",
      gap: 24,
    },
    actionBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    actionText: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? "#888888" : "#888888",
    },

    // Discover Groups (Tab 2)
    discoverCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 12,
    },
    discoverAvatar: {
      width: 56,
      height: 56,
      borderRadius: 20, // Match the squircle from the header
      borderWidth: 1,
      borderColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    discoverContent: {
      flex: 1,
      gap: 4,
    },
    discoverTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    discoverName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      flexShrink: 1, // Prevents long names from pushing members out
    },
    discoverMembers: {
      fontSize: 13,
      fontWeight: "500",
      color: isDark ? "#888888" : "#888888",
    },
    discoverDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: isDark ? "#AAAAAA" : "#666666",
    },
    joinBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
      justifyContent: "center",
      alignItems: "center",
    },
    joinBtnText: {
      fontSize: 13,
      fontWeight: "700",
      color: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    btnPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.95 }],
    },

    // Utilities
    divider: {
      height: 1,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    listBottomPadding: {
      paddingBottom: 100,
    },
  });
