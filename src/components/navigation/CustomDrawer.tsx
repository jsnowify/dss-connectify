import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

// --- Data Constants ---
const QUICK_ACTIONS = {
  liked:
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  saved:
    "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
};

// --- Reusable Icons ---
const ActionIcon = ({ path, color }: { path: string; color: string }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
  >
    <Path d={path} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HomeIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 22 22">
    <Path
      d="M0.5 9.49913C0.181098 9.79636 0 10.2127 0 10.6487V19.6429C0 20.9446 1.05533 22 2.35714 22H9.42857V17.2857C9.42857 16.4178 10.1321 15.7143 11 15.7143C11.8679 15.7143 12.5714 16.4178 12.5714 17.2857V22H19.6429C20.9446 22 22 20.9446 22 19.6429V10.6487C22 10.2127 21.819 9.79636 21.5 9.49913L11.5113 0.189156C11.2171 -0.0630518 10.7829 -0.0630521 10.4887 0.189156L0.5 9.49913Z"
      fill={color}
    />
  </Svg>
);

const FollowingIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={2.5} />
    <Path
      d="M17 11l2 2 4-4"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GroupsIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ComposeIcon = ({ color }: { color: string }) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.75}
  >
    <Path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DraftsIcon = ({ color }: { color: string }) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.75}
  >
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.top);
  const router = useRouter();

  const themeColors = {
    icon: isDark ? "#FAFAFA" : "#1A1A1A",
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Area with Compose & Drafts */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>menu</Text>

        <View style={styles.headerActions}>
          <Pressable
            style={({ pressed }) => [
              styles.headerIconBtn,
              pressed && styles.pressedState,
            ]}
            onPress={() => console.log("Navigating to Drafts...")}
          >
            <DraftsIcon color={themeColors.icon} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.headerIconBtn,
              pressed && styles.pressedState,
            ]}
            onPress={() => router.push("/compose")}
          >
            <ComposeIcon color={themeColors.icon} />
          </Pressable>
        </View>
      </View>

      {/* 2. Quick Actions (Liked & Saved) */}
      <View style={styles.quickActionsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.quickActionBtn,
            pressed && styles.pressedState,
          ]}
          onPress={() => console.log("Navigating to Liked...")}
        >
          <ActionIcon path={QUICK_ACTIONS.liked} color={themeColors.icon} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.quickActionBtn,
            pressed && styles.pressedState,
          ]}
          onPress={() => console.log("Navigating to Saved...")}
        >
          <ActionIcon path={QUICK_ACTIONS.saved} color={themeColors.icon} />
        </Pressable>
      </View>

      {/* 3. Main Navigation Links */}
      <View style={styles.mainNavContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.navItemBtn,
            pressed && styles.pressedState,
          ]}
          onPress={() => router.push("/(drawer)/(tabs)/home")}
        >
          <HomeIcon color={themeColors.icon} />
          <Text style={styles.navItemLabel}>Home</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          style={({ pressed }) => [
            styles.navItemBtn,
            pressed && styles.pressedState,
          ]}
          onPress={() => router.push("/following")}
        >
          <FollowingIcon color={themeColors.icon} />
          <Text style={styles.navItemLabel}>Following</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          style={({ pressed }) => [
            styles.navItemBtn,
            pressed && styles.pressedState,
          ]}
          onPress={() => router.push("/groups")}
        >
          <GroupsIcon color={themeColors.icon} />
          <Text style={styles.navItemLabel}>Groups</Text>
        </Pressable>
      </View>
    </View>
  );
};

// --- Styles ---
const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: topInset + 20,
      paddingHorizontal: 20,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: -0.5,
      color: isDark ? "#FAFAFA" : "#1A1A1A",
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    headerIconBtn: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 18,
    },

    quickActionsContainer: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 24,
    },
    quickActionBtn: {
      flex: 1,
      height: 48,
      borderRadius: 12,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
      borderWidth: 1.5,
      borderColor: isDark ? "#FAFAFA" : "#1A1A1A",
      justifyContent: "center",
      alignItems: "center",
    },

    mainNavContainer: {
      gap: 4,
    },
    navItemBtn: {
      flexDirection: "row",
      alignItems: "center",
      height: 48,
      paddingHorizontal: 12,
      borderRadius: 12,
      gap: 16,
    },
    navItemLabel: {
      fontSize: 16,
      fontWeight: "600",
      letterSpacing: 0.2,
      color: isDark ? "#FAFAFA" : "#1A1A1A",
    },

    divider: {
      height: 1,
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
      marginVertical: 4,
      marginHorizontal: 12,
    },

    pressedState: {
      opacity: 0.6,
      transform: [{ scale: 0.96 }],
    },
  });
