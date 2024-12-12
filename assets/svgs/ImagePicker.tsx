import React from "react";
import { Svg, Path, Rect, Mask, G } from "react-native-svg";

const Placeholder = () => {
  return (
    <Svg width="100" height="100" viewBox="0 0 144 144" fill="none">
      <Mask
        id="mask0_0_25"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="144"
        height="144"
      >
        <Rect width="144" height="144" rx="72" fill="#E2F4FF" />
      </Mask>
      <G mask="url(#mask0_0_25)">
        <Path
          d="M73 99.228C93.1929 99.228 109.562 83.0592 109.562 63.114C109.562 43.1688 93.1929 27 73 27C52.8071 27 36.4375 43.1688 36.4375 63.114C36.4375 83.0592 52.8071 99.228 73 99.228Z"
          fill="#009BFF"
        />
        <Path
          d="M131.437 135.393C131.47 134.879 131.47 134.363 131.437 133.849C131.292 131.95 130.753 130.095 129.85 128.388C126.295 121.443 116.331 118.297 108.016 116.516C102.084 115.281 96.0566 114.487 89.9906 114.142L83.6436 113.667H80.7874H77.2331H68.7281H65.1738H62.3177L55.9707 114.142C49.9046 114.487 43.8773 115.281 37.9452 116.516C29.6306 118.059 19.6658 121.265 16.1115 128.388C15.2084 130.095 14.6694 131.95 14.5247 133.849C14.4918 134.363 14.4918 134.879 14.5247 135.393C14.4943 135.907 14.4943 136.422 14.5247 136.936C14.6974 138.819 15.2577 140.654 16.175 142.338C19.7293 149.283 29.6941 152.429 38.0086 154.21C43.9518 155.387 49.9745 156.181 56.0341 156.584L62.3811 157H63.9044H65.2373H80.8509H82.1838H83.7071L90.0541 156.584C96.1137 156.181 102.136 155.387 108.08 154.21C116.394 152.607 126.359 149.461 129.913 142.338C130.788 140.6 131.325 138.731 131.5 136.817C131.508 136.342 131.487 135.866 131.437 135.393Z"
          fill="#009BFF"
        />
      </G>
    </Svg>
  );
};
export default Placeholder;
