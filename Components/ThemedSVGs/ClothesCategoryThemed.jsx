import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const ClothesCategoryThemed = () => {
   const { colors } = useTheme()

  return (
    <Svg
      width="34" height="26" viewBox="0 0 34 26" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M25.7179 0.800183L25.7755 0.833068L31.9718 4.37026C31.972 4.37036 31.9722 4.37046 31.9724 4.37056C32.475 4.65385 32.8492 5.11979 33.0174 5.67169C33.1856 6.22362 33.1349 6.81911 32.8756 7.33459C32.8756 7.33474 32.8755 7.3349 32.8754 7.33505L30.5674 11.9636L30.5669 11.9646C30.3787 12.3381 30.0904 12.652 29.7341 12.8712C29.3779 13.0905 28.9677 13.2064 28.5494 13.2061M25.7179 0.800183L26.4034 12.9561V13.2061M25.7179 0.800183H25.6872L25.6691 0.792973L25.6244 0.775092H25.5993L25.5813 0.767881L25.5366 0.75H25.4885H21.1351C20.8026 0.75 20.4837 0.882081 20.2486 1.11719C20.0135 1.35229 19.8814 1.67117 19.8814 2.00366C19.8814 2.73592 19.5905 3.43818 19.0728 3.95596C18.555 4.47375 17.8527 4.76464 17.1205 4.76464C16.3882 4.76464 15.6859 4.47375 15.1681 3.95596C14.6504 3.43818 14.3595 2.73592 14.3595 2.00366C14.3595 1.67117 14.2274 1.35229 13.9923 1.11719C13.7572 0.882081 13.4383 0.75 13.1058 0.75H8.75245H8.7043L8.6596 0.767881L8.64157 0.775092H8.61648L8.57178 0.792972L8.55375 0.800183H8.52302L8.46541 0.833068L2.26906 4.37026C2.26884 4.37039 2.26862 4.37051 2.2684 4.37064C1.76586 4.65393 1.39167 5.11984 1.22348 5.67169C1.05527 6.22363 1.10606 6.81915 1.36529 7.33463C1.36537 7.33477 1.36544 7.33491 1.36551 7.33505L3.67352 11.9636L3.67399 11.9646C3.86222 12.3381 4.15054 12.652 4.50678 12.8712C4.86303 13.0905 5.27318 13.2064 5.69147 13.2061M25.7179 0.800183L5.69129 12.9561M28.5494 13.2061L28.5496 12.9561V13.2061H28.5494ZM28.5494 13.2061H26.4034M26.4034 13.2061H26.1534V22.9927C26.1534 23.5251 25.9419 24.0356 25.5655 24.4121C25.189 24.7885 24.6784 25 24.1461 25H10.0948C9.56247 25 9.0519 24.7885 8.67545 24.4121C8.29901 24.0356 8.08752 23.5251 8.08752 22.9927V13.2061H7.83752M26.4034 13.2061V22.9927C26.4034 23.5914 26.1656 24.1655 25.7422 24.5888C25.3189 25.0122 24.7447 25.25 24.1461 25.25H10.0948C9.49616 25.25 8.92201 25.0122 8.49868 24.5888C8.07535 24.1655 7.83752 23.5914 7.83752 22.9927V13.2061M7.83752 13.2061V12.9561H5.69129M7.83752 13.2061H5.69147M5.69147 13.2061L5.69129 12.9561M5.69147 13.2061H5.69129V12.9561M7.83752 10.6988H5.8458L3.7123 6.43179L7.83752 4.07766V10.6988ZM23.8961 22.7427H10.3448V3.1695H12.0023C12.2731 4.27996 12.8985 5.27426 13.7864 5.99997C14.7273 6.76904 15.9052 7.18917 17.1205 7.18917C18.3357 7.18917 19.5136 6.76904 20.4545 5.99997C21.3424 5.27426 21.9678 4.27996 22.2386 3.1695H23.8961V22.7427ZM30.5286 6.43179L28.3951 10.6988H26.4034V4.07766L30.5286 6.43179Z"
        fill={colors.primary['600']} stroke={colors.primary['600']} strokeWidth="0.5"
      />
    </Svg>
  )
}

export default ClothesCategoryThemed