import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const CollapseThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="13" height="8" viewBox="0 0 13 8" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1 6.75L6.5 1.25L12 6.75" stroke={colors.primary['600']}
        strokeWidth="1.375" strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CollapseThemed
