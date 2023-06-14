import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const PloggingStart = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 4C7.58214 4 4 7.58214 4 12C4 16.4179 7.58214 20 12 20C16.4179 20 20 16.4179 20 12C20 7.58214 16.4179 4 12 4ZM14.5732 12.1232L10.6732 14.9607C10.6518 14.9761 10.6266 14.9853 10.6004 14.9872C10.5741 14.9892 10.5478 14.9839 10.5244 14.9719C10.501 14.9599 10.4813 14.9417 10.4675 14.9192C10.4538 14.8968 10.4465 14.871 10.4464 14.8446V9.17321C10.4463 9.14683 10.4536 9.12094 10.4673 9.09841C10.481 9.07588 10.5007 9.0576 10.5242 9.04558C10.5477 9.03356 10.574 9.02828 10.6003 9.03032C10.6266 9.03236 10.6519 9.04164 10.6732 9.05714L14.5732 11.8929C14.5916 11.9059 14.6067 11.9231 14.617 11.9432C14.6274 11.9632 14.6328 11.9855 14.6328 12.008C14.6328 12.0306 14.6274 12.0528 14.617 12.0729C14.6067 12.0929 14.5916 12.1102 14.5732 12.1232V12.1232Z"
      fill={fillColor}
    />
  </Svg>
);

export default PloggingStart;
