import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const DirectionsThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="8" height="8" viewBox="0 0 8 8" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8 0L-1.49868e-07 3.42857L3.42857 4.57143L4.57143 8L8 0Z"
        fill={colors.primary['600']}
      />
    </Svg>
  )
}

export default DirectionsThemed
