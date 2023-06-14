import * as React from "react";
import Svg, { G, Path, Ellipse, Rect } from "react-native-svg";

const LitterCan = ({ fillColor = "white" }) => (
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
      d="M8.67163 3.17185C8.01229 3.37743 7.80263 3.5625 7.58513 3.90832C7.58513 3.98031 7.39722 4.37032 7.16756 4.77494L6.75 5.51062V11.8348C6.75 17.9512 6.75933 18.1722 7.03213 18.5597C7.18719 18.78 7.40683 19.208 7.51999 19.5106C7.63315 19.8132 7.86643 20.1637 8.03818 20.2893C8.61039 20.7075 9.97986 21 11.3656 21C13.5777 21 15.1086 20.4803 15.393 19.633C15.4708 19.4013 15.6895 18.9598 15.8791 18.6519L16.2237 18.0921L16.1452 5.21641L15.783 4.67215C15.5838 4.3728 15.3834 4.00908 15.3378 3.86384C15.2921 3.71876 15.048 3.47524 14.7952 3.323C14.4115 3.09161 13.9229 3.03952 11.8304 3.00702C10.0916 2.97996 9.1251 3.03034 8.67163 3.17185ZM14.4673 3.9968C14.7135 4.15805 14.6882 4.19071 14.1889 4.35477C13.8869 4.45398 13.1151 4.57651 12.4738 4.6269C11.4802 4.70496 11.2889 4.68055 11.1794 4.46206C11.0342 4.17221 9.69243 4.09057 9.45386 4.3571C9.29672 4.53266 8.58269 4.35725 8.52729 4.12944C8.45909 3.84891 9.29783 3.76105 11.7608 3.79029C13.2882 3.80848 14.2975 3.88546 14.4673 3.9968ZM8.5767 5.09092C9.46277 5.47377 13.5074 5.48325 14.4007 5.10445C14.9898 4.85455 15.229 4.9124 15.2384 5.30691C15.2425 5.48325 14.1789 5.76689 12.8395 5.94665C10.6217 6.24429 7.58847 5.71527 7.81019 5.06946C7.91124 4.77556 7.84263 4.77354 8.5767 5.09092ZM8.66871 6.4679C9.07332 6.578 9.86294 6.71624 10.4236 6.77487L11.4427 6.88154L11.5321 8.28651C11.5944 9.26789 11.7513 10.0953 12.0522 11.0305C12.8371 13.4688 12.9287 13.9772 12.7714 15.0239C12.6933 15.5429 12.3584 16.6193 12.0272 17.4158L11.4249 18.8642L10.3749 18.773C8.99246 18.6531 7.90874 18.3847 7.65263 18.0988C7.47712 17.9025 7.44594 16.9774 7.44594 11.9531C7.44594 6.38004 7.46 6.04509 7.68952 6.15301C7.82356 6.21599 8.26409 6.35765 8.66871 6.4679ZM15.4541 17.8355C15.4118 18.0297 15.2026 18.2395 14.9551 18.3359L14.5288 18.5018L14.6411 17.7683C14.7028 17.3648 14.7511 16.125 14.7484 15.0131C14.744 13.116 14.7153 12.9054 14.2822 11.592C13.8901 10.4034 13.8216 9.99332 13.827 8.87074C13.8365 6.94343 13.9315 6.6898 14.7608 6.37989L15.4492 6.12253L15.4881 11.8118C15.5094 14.941 15.4941 17.6517 15.4541 17.8355ZM13.2019 7.43233C12.9891 8.90168 13.1059 10.1132 13.6284 11.8558C14.0567 13.2847 14.127 13.7212 14.127 14.9531C14.127 16.3475 13.9073 18.325 13.7285 18.5412C13.6796 18.6001 13.3113 18.6965 12.9098 18.7556L12.1797 18.8628L12.7567 17.4873C13.7875 15.0296 13.7864 14.1002 12.7483 10.875C12.4875 10.0652 12.281 9.05765 12.2257 8.32523C12.1448 7.25599 12.1641 7.08991 12.3916 6.90409C12.5333 6.78839 12.7976 6.69369 12.9789 6.69369C13.2948 6.69369 13.3044 6.72526 13.2019 7.43233ZM11.4824 19.5227C12.3628 19.5227 13.4433 19.4697 13.8834 19.4047C14.8652 19.2599 14.9291 19.4689 14.0226 19.8597C13.1487 20.2363 9.76606 20.2561 8.91521 19.8895C8.03289 19.5093 8.11098 19.2621 9.06887 19.4031C9.51594 19.4689 10.602 19.5227 11.4824 19.5227Z"
      fill={fillColor}
    />
    <Path
      d="M8.39202 5.88945C10.3375 6.69249 14.4636 6.22144 15.2742 5.88684L15.2755 8.43729C15.2755 11.4487 15.6652 17.3549 15.2761 18.1579C14.8871 18.9609 11.4867 19.1053 8.32707 18.4766C7.51647 13.9594 6.44658 5.0864 8.39202 5.88945Z"
      fill="#F3F3F3"
    />
  </Svg>
);

export default LitterCan;
