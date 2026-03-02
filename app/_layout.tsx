import { PostProvider } from "@/src/context/PostContext";
import { TabBarProvider } from "@/src/context/TabBarContext";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <PostProvider>
      <TabBarProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" },
            headerTintColor: isDark ? "#FAFAFA" : "#1A1A1A",
          }}
        >
          {/* This points to the Drawer group safely */}
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

          <Stack.Screen
            name="compose"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </TabBarProvider>
    </PostProvider>
  );
}
