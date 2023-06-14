import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const LitterGum = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M11.9993 17.1792C14.584 17.1792 16.6793 15.0839 16.6793 12.4992C16.6793 9.91452 14.584 7.81921 11.9993 7.81921C9.41464 7.81921 7.31934 9.91452 7.31934 12.4992C7.31934 15.0839 9.41464 17.1792 11.9993 17.1792Z"
      stroke={fillColor}
      stroke-width="1.26"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.92 17.18C10.92 18.62 10.2 20.78 8.76 21.5C7.68 21.5 6.6 20.06 5.88 18.62C4.44 17.9 3 16.46 3 15.74C3.72 14.3 5.88 13.58 7.32 13.58M13.08 7.82C13.08 6.38 13.8 4.22 15.24 3.5C16.32 3.5 17.4 4.94 18.12 6.38C19.56 7.1 21 8.54 21 9.26C20.28 10.7 18.12 11.42 16.68 11.42"
      stroke={fillColor}
      stroke-width="1.26"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default LitterGum;
