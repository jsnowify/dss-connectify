export type BadgeType = "student" | "visitor";

export type Badge = {
  type: BadgeType;
  label: string;
  lightColor: string; // used in light mode
  darkColor: string; // used in dark mode
};

export const BADGES: Record<BadgeType, Badge> = {
  student: {
    type: "student",
    label: "Student",
    lightColor: "#1E3A5F", // deep navy
    darkColor: "#5B9BD5", // lighter steel blue — visible on dark bg
  },
  visitor: {
    type: "visitor",
    label: "Visitor",
    lightColor: "#800020", // deep maroon
    darkColor: "#C06080", // muted rose — visible on dark bg
  },
};
