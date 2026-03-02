import { TabBar } from "@/src/components/navigation/TabBar";
import { Tabs } from "expo-router";
import { View, useColorScheme } from "react-native";

export default function TabsLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: "none" },
          headerShown: false, // Global hide
        }}
      >
        {/* Explicitly hide the header on every single screen */}
        <Tabs.Screen name="home" options={{ headerShown: false }} />
        <Tabs.Screen name="message" options={{ headerShown: false }} />
        <Tabs.Screen name="notification" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>

      <TabBar />
    </View>
  );
}
