import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const ExpandThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="13" height="8" viewBox="0 0 13 8" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12 0.847168L6.5 6.34717L1 0.847167" stroke={colors.primary['600']}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ExpandThemed
