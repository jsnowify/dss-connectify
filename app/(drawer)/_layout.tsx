import { CustomDrawer } from "@/src/components/navigation/CustomDrawer";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          drawerStyle: {
            backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
            width: "75%",
          },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
        <Drawer.Screen name="groups" options={{ headerShown: false }} />
        <Drawer.Screen name="following" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
