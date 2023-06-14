import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const Okay = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
      fill="#FFCC4D"
    />
    <Path
      d="M8.6708 14.4948C8.6908 14.5743 9.18991 16.441 11.9975 16.441C14.8055 16.441 15.3041 14.5743 15.3241 14.4948C15.3486 14.3983 15.305 14.2983 15.2188 14.2485C15.1321 14.1992 15.0237 14.2139 14.9521 14.2827C14.9437 14.2912 14.0837 15.1076 11.9975 15.1076C9.91125 15.1076 9.0508 14.2912 9.0428 14.2832C9.00014 14.241 8.94325 14.2188 8.88636 14.2188C8.84902 14.2188 8.81125 14.2281 8.77702 14.2472C8.68991 14.297 8.64636 14.3979 8.6708 14.4948V14.4948Z"
      fill="#664500"
    />
    <Path
      d="M9.32986 11.5564C9.94351 11.5564 10.441 10.86 10.441 10.0009C10.441 9.14176 9.94351 8.44531 9.32986 8.44531C8.71621 8.44531 8.21875 9.14176 8.21875 10.0009C8.21875 10.86 8.71621 11.5564 9.32986 11.5564Z"
      fill="#664500"
    />
    <Path
      d="M14.6658 11.5564C15.2794 11.5564 15.7769 10.86 15.7769 10.0009C15.7769 9.14176 15.2794 8.44531 14.6658 8.44531C14.0521 8.44531 13.5547 9.14176 13.5547 10.0009C13.5547 10.86 14.0521 11.5564 14.6658 11.5564Z"
      fill="#664500"
    />
  </Svg>
);

export default Okay;