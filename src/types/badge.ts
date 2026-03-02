export type BadgeType = "student" | "visitor";

export type Badge = {
  type: BadgeType;
  label: string;
  color: string;
  textColor: string;
};

export const BADGES: Record<BadgeType, Badge> = {
  student: {
    type: "student",
    label: "Student",
    color: "#1E3A5F",
    textColor: "#1E3A5F",
  },
  visitor: {
    type: "visitor",
    label: "Visitor",
    color: "#800020",
    textColor: "#800020",
  },
};
