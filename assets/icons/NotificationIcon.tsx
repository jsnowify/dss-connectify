import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export function NotificationOutline({ size = 24, color = "#888" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.0238 1.08512C5.00433 1.15617 6.02604 1.63415 7.00408 2.60152C7.98187 1.63442 9.00268 1.15735 9.9823 1.08788C11.0879 1.00947 12.0653 1.45632 12.7725 2.16133C14.1628 3.54747 14.5994 6.05569 12.8742 7.78093C12.8684 7.78675 12.8624 7.79243 12.8563 7.79795L7.33974 12.7949C7.14923 12.9674 6.85892 12.9674 6.66841 12.7949L1.15183 7.79795C1.14573 7.79243 1.13977 7.78675 1.13395 7.78093C-0.60028 6.0467 -0.166008 3.53819 1.22889 2.15313C1.93778 1.44923 2.91717 1.00494 4.0238 1.08512Z"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
export function NotificationFilled({ size = 24, color = "#1A1A1A" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.0238 1.08512C5.00433 1.15617 6.02604 1.63415 7.00408 2.60152C7.98187 1.63442 9.00268 1.15735 9.9823 1.08788C11.0879 1.00947 12.0653 1.45632 12.7725 2.16133C14.1628 3.54747 14.5994 6.05569 12.8742 7.78093C12.8684 7.78675 12.8624 7.79243 12.8563 7.79795L7.33974 12.7949C7.14923 12.9674 6.85892 12.9674 6.66841 12.7949L1.15183 7.79795C1.14573 7.79243 1.13977 7.78675 1.13395 7.78093C-0.60028 6.0467 -0.166008 3.53819 1.22889 2.15313C1.93778 1.44923 2.91717 1.00494 4.0238 1.08512Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
