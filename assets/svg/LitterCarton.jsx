import * as React from "react";
import Svg, { G, Path, Circle, Ellipse, Rect } from "react-native-svg";

const LitterCarton = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M16.3407 20.3728V5.38757L11.7852 8.14486V23.25L16.3407 20.3728Z"
      stroke={fillColor}
      stroke-width="0.0709744"
      stroke-linejoin="round"
    />
    <Path
      d="M6.75 20.25V5.26477L11.7851 8.14194V23.2471L6.75 20.25Z"
      stroke={fillColor}
      stroke-width="0.0709744"
      stroke-linejoin="round"
    />
    <Path
      d="M16.3407 18.3317V10.899L11.7852 13.6563V21.2089L16.3407 18.3317Z"
      fill={fillColor}
    />
    <Path
      d="M6.75 18.2163V10.7836L11.7851 13.6607V21.2133L6.75 18.2163Z"
      fill={fillColor}
    />
    <Path
      d="M6.75 5.26677L9.26753 4.66732V3.70826M6.75 5.26677L11.7851 8.14395L16.3406 5.38661L14.0628 2.14984C14.0628 2.50947 14.0628 2.94101 14.0628 1.79014C14.0628 0.639276 13.6632 0.671244 13.4634 0.831087C13.0638 1.07085 11.9769 1.69424 10.826 2.26967C9.67513 2.84511 9.30749 3.4685 9.26753 3.70826M6.75 5.26677L9.26753 3.70826"
      stroke={fillColor}
      stroke-width="0.0709744"
      stroke-linejoin="round"
    />
    <Circle
      cx="13.1031"
      cy="5.14523"
      r="1.16333"
      fill="#F3F3F3"
      stroke={fillColor}
      stroke-width="0.0709744"
      stroke-linejoin="round"
    />
    <Circle
      cx="13.3448"
      cy="4.90683"
      r="1.16333"
      fill="#F3F3F3"
      stroke={fillColor}
      stroke-width="0.0709744"
      stroke-linejoin="round"
    />
  </Svg>
);

export default LitterCarton;
