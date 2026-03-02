import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const HEADER_HEIGHT = 56;

const BurgerIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
      fill={color}
    />
  </Svg>
);

const LogoIcon = ({ color }: { color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
      fill={color}
    />
  </Svg>
);

const SearchIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      fill={color}
    />
  </Svg>
);

export const HomeHeader = () => {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = getStyles(isDark, insets.top);
  const iconColor = isDark ? "#FAFAFA" : "#1A1A1A";

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconBtn}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <BurgerIcon color={iconColor} />
      </Pressable>

      <View style={styles.logoBtn}>
        <LogoIcon color={iconColor} />
      </View>

      <Pressable style={styles.iconBtn}>
        <SearchIcon color={iconColor} />
      </Pressable>
    </View>
  );
};

export { HEADER_HEIGHT };

const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      paddingTop: topInset,
      height: HEADER_HEIGHT + topInset,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 10,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    iconBtn: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    logoBtn: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
