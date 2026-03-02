import { BadgeType } from "@/src/types/badge";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { BadgeTag } from "./BadgeTag";

type Props = {
  username: string;
  time?: string;
  badges?: BadgeType[];
};

export const UsernameRow = ({ username, time, badges }: Props) => {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);

  return (
    <View style={styles.row}>
      <Text style={styles.username}>{username}</Text>
      {badges?.map((badge) => (
        <BadgeTag key={badge} type={badge} />
      ))}
      {time && <Text style={styles.time}>{time}</Text>}
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      flexWrap: "wrap",
    },
    username: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 14,
    },
    time: {
      color: "#888",
      fontSize: 13,
    },
  });
