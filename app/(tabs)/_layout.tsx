import { TabBar } from "@/src/components/navigation/TabBar";
import { Tabs } from "expo-router";
import { useColorScheme, View } from "react-native";

export default function TabsLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: "none" },
          headerStyle: { backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" },
          headerTintColor: isDark ? "#FAFAFA" : "#1A1A1A",
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="message" />
        <Tabs.Screen name="notification" />
        <Tabs.Screen name="profile" />
      </Tabs>
      <TabBar />
    </View>
  );
}
