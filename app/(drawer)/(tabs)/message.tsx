import { BadgeTag } from "@/src/components/common/BadgeTag";
import { messages } from "@/src/data/messages";
import { MessagePreview } from "@/src/types/message";
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const WriteIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
      fill={color}
    />
    <Path
      d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
      fill={color}
    />
  </Svg>
);

const SearchIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      fill={color}
    />
  </Svg>
);

type FilterTab = "all" | "unread" | "groups" | "requests";

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "groups", label: "Groups" },
  { key: "requests", label: "Requests" },
];

const GroupAvatar = ({ avatars }: { avatars: number[] }) => {
  const displayed = avatars.slice(0, 4);
  return (
    <View style={groupAvatarStyles.container}>
      {displayed.map((avatar, index) => (
        <Image key={index} source={avatar} style={groupAvatarStyles.image} />
      ))}
    </View>
  );
};

const groupAvatarStyles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 24,
    overflow: "hidden",
    gap: 1,
  },
  image: {
    width: 23,
    height: 23,
    resizeMode: "cover",
  },
});

const ACTIONS = ["Mark as Read", "Mute", "Archive", "Delete"];

const Message = () => {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.top);
  const iconColor = isDark ? "#FAFAFA" : "#1A1A1A";
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [peekedMessage, setPeekedMessage] = useState<MessagePreview | null>(
    null,
  );

  const filtered = messages.filter((m) => {
    const matchesSearch = m.username
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "unread" && m.unread > 0) ||
      (activeFilter === "groups" && m.isGroup) ||
      (activeFilter === "requests" && m.isRequest);
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>messages</Text>
        <Pressable>
          <WriteIcon color={iconColor} />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SearchIcon color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
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

      {/* Message List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onLongPress={() => setPeekedMessage(item)}
            delayLongPress={300}
          >
            <View style={styles.avatarContainer}>
              {item.isGroup && item.groupAvatars ? (
                <GroupAvatar avatars={item.groupAvatars} />
              ) : (
                <Image source={item.avatar} style={styles.avatar} />
              )}
              {item.unread > 0 && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.itemBody}>
              <View style={styles.itemHeader}>
                <View style={styles.usernameRow}>
                  <Text style={styles.username}>{item.username}</Text>
                  {item.badges?.map((badge) => (
                    <BadgeTag key={badge} type={badge} />
                  ))}
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text
                style={[
                  styles.lastMessage,
                  item.unread > 0 && styles.unreadMessage,
                ]}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Peek Modal */}
      <Modal
        visible={!!peekedMessage}
        transparent
        animationType="fade"
        onRequestClose={() => setPeekedMessage(null)}
      >
        <Pressable
          style={styles.peekOverlay}
          onPress={() => setPeekedMessage(null)}
        >
          <BlurView
            intensity={60}
            tint={isDark ? "dark" : "light"}
            style={StyleSheet.absoluteFill}
          />

          {/* Peek Card */}
          <View style={styles.peekCard}>
            {/* Conversation preview header */}
            <View style={styles.peekHeader}>
              {peekedMessage?.isGroup && peekedMessage.groupAvatars ? (
                <GroupAvatar avatars={peekedMessage.groupAvatars} />
              ) : (
                <Image
                  source={peekedMessage?.avatar}
                  style={styles.peekAvatar}
                />
              )}
              <View style={styles.peekMeta}>
                <View style={styles.usernameRow}>
                  <Text style={styles.peekUsername}>
                    {peekedMessage?.username}
                  </Text>
                  {peekedMessage?.badges?.map((badge) => (
                    <BadgeTag key={badge} type={badge} />
                  ))}
                </View>
                <Text style={styles.peekTime}>{peekedMessage?.time}</Text>
              </View>
            </View>

            {/* Last message preview */}
            <View style={styles.peekBody}>
              <View style={styles.peekBubble}>
                <Text style={styles.peekBubbleText}>
                  {peekedMessage?.lastMessage}
                </Text>
              </View>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionSheet}>
            {ACTIONS.map((action, index) => (
              <View key={action}>
                <Pressable
                  style={styles.actionItem}
                  onPress={() => setPeekedMessage(null)}
                >
                  <Text
                    style={[
                      styles.actionText,
                      action === "Delete" && styles.actionDelete,
                    ]}
                  >
                    {action}
                  </Text>
                </Pressable>
                {index < ACTIONS.length - 1 && (
                  <View style={styles.actionDivider} />
                )}
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Message;

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
      justifyContent: "space-between",
      paddingHorizontal: 16,
      height: 56,
    },
    title: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "700",
      fontSize: 28,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
      gap: 8,
    },
    searchInput: {
      flex: 1,
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 15,
      padding: 0,
    },
    filterWrapper: {
      height: 50,
      marginTop: 8,
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
    avatarContainer: {
      position: "relative",
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      resizeMode: "cover",
    },
    unreadDot: {
      position: "absolute",
      bottom: 1,
      right: 1,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#3B82F6",
      borderWidth: 2,
      borderColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    itemBody: {
      flex: 1,
      gap: 3,
    },
    itemHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    usernameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    username: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 15,
    },
    time: {
      color: "#888",
      fontSize: 12,
    },
    lastMessage: {
      color: "#888",
      fontSize: 14,
    },
    unreadMessage: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "500",
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
      marginLeft: 76,
    },
    peekOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      gap: 12,
    },
    peekCard: {
      width: "100%",
      backgroundColor: isDark ? "#2A2A2A" : "#FFFFFF",
      borderRadius: 16,
      overflow: "hidden",
    },
    peekHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#3A3A3A" : "#EFEFEF",
    },
    peekAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      resizeMode: "cover",
    },
    peekMeta: {
      flex: 1,
      gap: 2,
    },
    peekUsername: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 15,
    },
    peekTime: {
      color: "#888",
      fontSize: 12,
    },
    peekBody: {
      padding: 16,
      minHeight: 80,
    },
    peekBubble: {
      alignSelf: "flex-start",
      backgroundColor: isDark ? "#3A3A3A" : "#EFEFEF",
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
      maxWidth: "80%",
    },
    peekBubbleText: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 15,
    },
    actionSheet: {
      width: "100%",
      backgroundColor: isDark ? "#2A2A2A" : "#FFFFFF",
      borderRadius: 14,
      overflow: "hidden",
    },
    actionItem: {
      paddingVertical: 16,
      alignItems: "center",
    },
    actionText: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 16,
    },
    actionDelete: {
      color: "#EF4444",
    },
    actionDivider: {
      height: 1,
      backgroundColor: isDark ? "#3A3A3A" : "#EFEFEF",
    },
  });
