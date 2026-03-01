import { ComposeIcon } from "@/assets/icons/ComposeIcon";
import { HomeFilled, HomeOutline } from "@/assets/icons/HomeIcons";
import { MessageFilled, MessageOutline } from "@/assets/icons/MessageIcon";
import {
  NotificationFilled,
  NotificationOutline,
} from "@/assets/icons/NotificationIcon";
import { ProfileFilled, ProfileOutline } from "@/assets/icons/ProfileIcon";
import { useTabBar } from "@/src/context/TabBarContext";
import { usePathname, useRouter } from "expo-router";
import { Animated, Pressable, StyleSheet, useColorScheme } from "react-native";

const TABS = [
  {
    name: "home",
    route: "/(tabs)/home",
    Icon: HomeOutline,
    IconFilled: HomeFilled,
  },
  {
    name: "message",
    route: "/(tabs)/message",
    Icon: MessageOutline,
    IconFilled: MessageFilled,
  },
  {
    name: "notification",
    route: "/(tabs)/notification",
    Icon: NotificationOutline,
    IconFilled: NotificationFilled,
  },
  {
    name: "profile",
    route: "/(tabs)/profile",
    Icon: ProfileOutline,
    IconFilled: ProfileFilled,
  },
];

const TAB_BAR_HEIGHT = 70;

export const TabBar = () => {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);
  const router = useRouter();
  const pathname = usePathname();
  const { tabBarTranslateY } = useTabBar();

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: tabBarTranslateY }] },
      ]}
    >
      {/* First two tabs */}
      {TABS.slice(0, 2).map((tab) => {
        const isActive = pathname.includes(tab.name);
        const iconColor = isActive ? (isDark ? "#FAFAFA" : "#1A1A1A") : "#888";
        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            {isActive ? (
              <tab.IconFilled size={28} color={iconColor} />
            ) : (
              <tab.Icon size={28} color={iconColor} />
            )}
          </Pressable>
        );
      })}

      {/* Compose button in the middle */}
      <Pressable
        style={styles.composeBtn}
        onPress={() => router.push("/compose")}
      >
        <ComposeIcon size={26} color={isDark ? "#1A1A1A" : "#FAFAFA"} />
      </Pressable>

      {/* Last two tabs */}
      {TABS.slice(2).map((tab) => {
        const isActive = pathname.includes(tab.name);
        const iconColor = isActive ? (isDark ? "#FAFAFA" : "#1A1A1A") : "#888";
        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            {isActive ? (
              <tab.IconFilled size={28} color={iconColor} />
            ) : (
              <tab.Icon size={28} color={iconColor} />
            )}
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: TAB_BAR_HEIGHT,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
      // remove these two lines
      // borderTopWidth: 1,
      // borderTopColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    tab: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    composeBtn: {
      width: 45,
      height: 40,
      borderRadius: 8, // was 10, lower = more square
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 8,
    },
  });
