import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const FacebookThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="12" height="20" viewBox="0 0 12 20" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd" clip-rule="evenodd"
        d="M8.11939 4.04775C7.83866 4.04802 7.56949 4.15966 7.37098 4.35817C7.17246 4.55668 7.06082 4.82585 7.06056 5.10658V7.22023H10.2391L9.17923 9.87383H7.06056V18.3485H3.88306V9.87383H1.76441V7.22023H3.88207V4.57667C3.88207 3.73394 4.21683 2.92574 4.81273 2.32984C5.40862 1.73395 6.21684 1.39918 7.05956 1.39918H9.17822V4.04775H8.11939ZM2.82274 6.1609H0.705078V10.9332H2.82373V19.4078H8.11989V10.9332H9.89683L11.8028 6.1609H8.11989V5.10759L8.1204 5.10709L10.2375 5.10709V0.339844H7.05956C5.93589 0.339844 4.85823 0.78622 4.06367 1.58078C3.2691 2.37534 2.82274 3.453 2.82274 4.57667V6.1609Z"
        fill={colors.primary["600"]}
      />
    </Svg>
  )
}

export default FacebookThemed
