import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const Heart = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8.38244 5C5.88097 5 3.85303 7.00868 3.85303 9.4864C3.85303 13.9728 9.20597 18.0513 12.0883 19C14.9707 18.0513 20.3236 13.9728 20.3236 9.4864C20.3236 7.00868 18.2957 5 15.7942 5C14.2624 5 12.9077 5.75331 12.0883 6.90631C11.6707 6.31705 11.1158 5.83614 10.4707 5.50431C9.82564 5.17248 9.10933 4.99949 8.38244 5Z"
      fill={fillColor}
      stroke="#EB1878"
      stroke-width="0.583333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Heart;
