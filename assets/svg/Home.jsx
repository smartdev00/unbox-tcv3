import * as React from "react"
import Svg, { G, Path } from 'react-native-svg';

const Home = ({ fillColor, }) => (
<Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M20.2908 9.99453L18.8629 8.56662L11.0055 0.709157C10.7266 0.430281 10.2744 0.430281 9.99544 0.709157L2.13794 8.56662L0.709317 9.99528C0.435254 10.2791 0.443081 10.7313 0.726854 11.0053C1.00368 11.2727 1.44252 11.2727 1.71935 11.0053L1.92791 10.7953V19.7857C1.92791 20.1802 2.24772 20.5 2.64224 20.5H18.3572C18.7517 20.5 19.0715 20.1802 19.0715 19.7857V10.7953L19.2808 11.0046C19.5646 11.2787 20.0168 11.2708 20.2908 10.9871C20.5582 10.7102 20.5582 10.2714 20.2908 9.99453ZM12.6427 19.0714H8.3568V13.3568H12.6427V19.0714ZM17.6429 19.0714H14.0713V12.6425C14.0713 12.248 13.7515 11.9282 13.357 11.9282H7.64247C7.24795 11.9282 6.92814 12.248 6.92814 12.6425V19.0714H3.35657V9.36667L10.4997 2.22349L17.6429 9.36667V19.0714Z" fill={fillColor}/>
</Svg>
)

export default Home;

