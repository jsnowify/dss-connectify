import Svg, { Path } from "react-native-svg";

export function ComposeIcon({ size = 24, color = "#1A1A1A" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4V20M4 12H20"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
