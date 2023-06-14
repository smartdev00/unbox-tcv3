import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const LitterCigarette = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M17.3073 9.59323L8.14733 18.7099L10.4265 20.9999L19.5865 11.8832M18.7164 8.15241L20.9956 10.4424M11.0098 15.8609L13.289 18.1509M15.0282 7.30323C13.6037 5.87197 12.4587 7.01156 11.0342 5.58031M16.4373 5.8624C15.0128 4.43115 13.8678 5.57073 12.4433 4.13948"
      stroke={fillColor}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default LitterCigarette;
