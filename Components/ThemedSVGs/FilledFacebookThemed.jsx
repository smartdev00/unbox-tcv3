import { useTheme } from 'native-base'
import Svg, { Path, Circle } from 'react-native-svg'

const FilledFacebookThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width='20'
      height='20'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Circle
        cx='8.63218'
        cy='8.63218'
        r='8.63218'
        fill={colors.primary['600']}
      />
      <Path
        d='M9.19173 7.23068V6.11434C9.19187 5.96607 9.25083 5.82391 9.35568 5.71907C9.46052 5.61422 9.60269 5.55526 9.75096 5.55512H10.3102V4.15625H9.1912C8.74611 4.15625 8.31925 4.33306 8.00452 4.64779C7.6898 4.96251 7.51299 5.38937 7.51299 5.83447V7.23068H6.39453V8.6322H7.51351V13.1081H9.19173V8.6322H10.3107L10.8705 7.23068H9.19173Z'
        fill='white'
      />
    </Svg>
  )
}

export default FilledFacebookThemed