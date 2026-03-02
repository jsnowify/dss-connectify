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
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen name="home" options={{ headerShown: false }} />
        <Tabs.Screen name="message" options={{ headerShown: false }} />
        <Tabs.Screen name="notification" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
      <TabBar />
    </View>
  );
}
