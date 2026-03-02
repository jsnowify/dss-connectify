import { BADGES, BadgeType } from "@/src/types/badge";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  type: BadgeType;
};

export const BadgeTag = ({ type }: Props) => {
  const badge = BADGES[type];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: badge.color + "22" }, // 22 = ~13% opacity
      ]}
    >
      <Text style={[styles.label, { color: badge.color }]}>{badge.label}</Text>
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
