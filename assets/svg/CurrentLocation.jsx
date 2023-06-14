import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const CurrentLocation = ({ fillColor = "white", }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect
      x="11.0031"
      y="17.1125"
      width="1.2"
      height="2.84151"
      fill={fillColor}
      stroke={fillColor}
      stroke-width="0.4"
    />
    <Rect
      x="11.0031"
      y="4.08906"
      width="1.2"
      height="2.84151"
      fill={fillColor}
      stroke={fillColor}
      stroke-width="0.4"
    />
    <Rect
      x="6.59844"
      y="11.4133"
      width="1.21384"
      height="2.8"
      transform="rotate(90 6.59844 11.4133)"
      fill={fillColor}
      stroke={fillColor}
      stroke-width="0.4"
    />
    <Rect
      x="20.2"
      y="11.4133"
      width="1.21384"
      height="2.8"
      transform="rotate(90 20.2 11.4133)"
      fill={fillColor}
      stroke={fillColor}
      stroke-width="0.4"
    />
    <Path
      d="M17.0016 12.0217C17.0016 15.0711 14.5742 17.5255 11.6016 17.5255C8.62888 17.5255 6.20156 15.0711 6.20156 12.0217C6.20156 8.97235 8.62888 6.51797 11.6016 6.51797C14.5742 6.51797 17.0016 8.97235 17.0016 12.0217Z"
      stroke={fillColor}
      stroke-width="1.2"
    />
    <Ellipse cx="11.6008" cy="12.0203" rx="2.8" ry="2.84843" fill={fillColor} />
  </Svg>
);

export default CurrentLocation;
