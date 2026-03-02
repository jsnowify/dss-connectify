import { BADGES, BadgeType } from "@/src/types/badge";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

type Props = {
  type: BadgeType;
};

export const BadgeTag = ({ type }: Props) => {
  const isDark = useColorScheme() === "dark";
  const badge = BADGES[type];
  const color = isDark ? badge.darkColor : badge.lightColor;

  return (
    <View style={[styles.container, { backgroundColor: color + "22" }]}>
      <Text style={[styles.label, { color }]}>{badge.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
});
