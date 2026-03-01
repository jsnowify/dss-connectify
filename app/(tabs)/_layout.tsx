import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import { HomeFilled, HomeOutline } from "@/assets/icons/HomeIcons";
import { MessageFilled, MessageOutline } from "@/assets/icons/MessageIcon";
import {
  NotificationFilled,
  NotificationOutline,
} from "@/assets/icons/NotificationIcon";
import { ProfileFilled, ProfileOutline } from "@/assets/icons/ProfileIcon";

export default function TabsLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1A1A1A",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <HomeFilled color={color} />
            ) : (
              <HomeOutline color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <MessageFilled /> : <MessageOutline />,
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <NotificationFilled /> : <NotificationOutline />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileFilled /> : <ProfileOutline />,
        }}
      />
    </Tabs>
  );
}
