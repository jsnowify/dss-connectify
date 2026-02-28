import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" },
        headerTintColor: isDark ? "#FAFAFA" : "#1A1A1A",
        tabBarStyle: {
          backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="message" options={{ title: "Message" }} />
      <Tabs.Screen name="notification" options={{ title: "Notification" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
