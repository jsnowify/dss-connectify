import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const defaultAvatar = require("../../../assets/images/avatar.jpg");

export const PostComposer = () => {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);
  const router = useRouter();

  return (
    <Pressable style={styles.container} onPress={() => router.push("/compose")}>
      <Image source={defaultAvatar} style={styles.avatar} />
      <View style={styles.textArea}>
        <Text style={styles.username}>snowi</Text>
        <Text style={styles.placeholder}>Your thoughts...</Text>
      </View>
    </Pressable>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      resizeMode: "cover",
    },
    textArea: {
      flex: 1,
      gap: 2,
    },
    username: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 14,
    },
    placeholder: {
      color: "#888",
      fontSize: 15,
    },
  });
