import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Notification = () => {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const styles = getStyles(isDark, insets.top);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>activity</Text>
      </View>
    </View>
  );
};

export default Notification;

const getStyles = (isDark: boolean, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
      paddingTop: topInset,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 56,
    },
    title: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "700",
      fontSize: 28,
    },
  });
