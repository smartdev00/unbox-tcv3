import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const MerchantMapControl = ({ fillColor = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.5 9.33784V17.8349C4.5 18.7554 5.24619 19.5015 6.16667 19.5015L17.7812 19.5017L17.8333 19.5015C18.7538 19.5015 19.5 18.7554 19.5 17.8349V9.33784C18.9896 10.1849 18.061 10.7513 17 10.7513C15.939 10.7513 15.0104 10.1848 14.5 9.33784C13.9896 10.1848 13.061 10.7513 12 10.7513C10.939 10.7513 10.0104 10.1848 9.5 9.33784C8.98963 10.1848 8.06097 10.7513 7 10.7513C5.93903 10.7513 5.01037 10.1849 4.5 9.33784ZM14.5 18.4184V15.002C14.5 14.5352 14.5 14.3019 14.4092 14.1236C14.3293 13.9668 14.2018 13.8393 14.045 13.7594C13.8667 13.6686 13.6334 13.6686 13.1667 13.6686H10.8333C10.3666 13.6686 10.1333 13.6686 9.95501 13.7594C9.79821 13.8393 9.67072 13.9668 9.59083 14.1236C9.5 14.3019 9.5 14.5352 9.5 15.002V18.4184H14.5Z"
      fill={fillColor}
    />
    <Path
      d="M12 9.91801C10.8494 9.91801 9.91667 8.98527 9.91667 7.83468C9.91667 7.60456 9.73012 7.41801 9.5 7.41801C9.26988 7.41801 9.08333 7.60456 9.08333 7.83468C9.08333 8.98527 8.15059 9.91801 7 9.91801C5.84941 9.91801 4.91667 8.98527 4.91667 7.83468V7.01562C4.91667 6.54204 4.91699 6.21191 4.93799 5.95489C4.95859 5.70274 4.997 5.55787 5.05291 5.44814C5.17275 5.21293 5.36398 5.02171 5.59918 4.90187C5.70891 4.84596 5.85378 4.80755 6.10593 4.78695C6.36295 4.76595 6.69308 4.76562 7.16667 4.76562H16.8333C17.3069 4.76562 17.637 4.76595 17.8941 4.78695C18.1462 4.80755 18.2911 4.84596 18.4008 4.90187C18.636 5.02171 18.8272 5.21293 18.9471 5.44814C19.003 5.55787 19.0414 5.70274 19.062 5.95489C19.083 6.21191 19.0833 6.54204 19.0833 7.01562V7.83468C19.0833 8.98527 18.1506 9.91801 17 9.91801C15.8494 9.91801 14.9167 8.98527 14.9167 7.83468C14.9167 7.60456 14.7301 7.41801 14.5 7.41801C14.2699 7.41801 14.0833 7.60456 14.0833 7.83468C14.0833 8.98527 13.1506 9.91801 12 9.91801Z"
      fill={fillColor}
    />
  </Svg>
);

export default MerchantMapControl;
