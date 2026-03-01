import Svg, { Path } from "react-native-svg";

export function ProfileOutline({ size = 24, color = "#888" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M4 22C4 18.6863 7.58172 16 12 16C16.4183 16 20 18.6863 20 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ProfileFilled({ size = 24, color = "#1A1A1A" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill={color}
      />
      {/* Arc path must use stroke — fill on an open path renders nothing */}
      <Path
        d="M4 22C4 18.6863 7.58172 16 12 16C16.4183 16 20 18.6863 20 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
