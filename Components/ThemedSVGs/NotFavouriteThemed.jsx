import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const NotFavouriteThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="22" height="19" viewBox="0 0 22 19" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.53809 0.859376C3.47956 0.859376 1 3.33893 1 6.39747C1 11.9356 7.54502 16.9702 11.0693 18.1413C14.5935 16.9702 21.1385 11.9356 21.1385 6.39747C21.1385 3.33893 18.659 0.859376 15.6004 0.859376C13.7275 0.859376 12.0712 1.78927 11.0693 3.21256C10.5586 2.48516 9.88016 1.89152 9.09142 1.4819C8.30268 1.07228 7.42686 0.858748 6.53809 0.859376Z"
        fill="white" stroke={colors.primary['600']} strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default NotFavouriteThemed
