import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const FavouriteThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="21" height="19" viewBox="0 0 21 19" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.53809 0.859376C2.47956 0.859376 0 3.33893 0 6.39747C0 11.9356 6.54502 16.9702 10.0693 18.1413C13.5935 16.9702 20.1385 11.9356 20.1385 6.39747C20.1385 3.33893 17.659 0.859376 14.6004 0.859376C12.7275 0.859376 11.0712 1.78927 10.0693 3.21256C9.55859 2.48516 8.88016 1.89152 8.09142 1.4819C7.30268 1.07228 6.42686 0.858748 5.53809 0.859376Z"
        fill={colors.primary['600']}
      />
    </Svg>
  )
}

export default FavouriteThemed
