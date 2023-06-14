import { useTheme } from 'native-base'
import Svg, { Path } from 'react-native-svg'

const HomewareCategoryThemed = () => {
  const { colors } = useTheme()

  return (
    <Svg
      width="27" height="22" viewBox="0 0 27 22" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M23.2222 6.11111V3.66667C23.2222 1.65 21.5722 0 19.5556 0H7.33333C5.31667 0 3.66667 1.65 3.66667 3.66667V6.11111C1.65 6.11111 0 7.76111 0 9.77778V15.8889C0 17.9056 1.65 19.5556 3.66667 19.5556V20.7778C3.66667 21.45 4.21667 22 4.88889 22C5.56111 22 6.11111 21.45 6.11111 20.7778V19.5556H20.7778V20.7778C20.7778 21.45 21.3278 22 22 22C22.6722 22 23.2222 21.45 23.2222 20.7778V19.5556C25.2389 19.5556 26.8889 17.9056 26.8889 15.8889V9.77778C26.8889 7.76111 25.2389 6.11111 23.2222 6.11111ZM6.11111 3.66667C6.11111 2.99444 6.66111 2.44444 7.33333 2.44444H19.5556C20.2278 2.44444 20.7778 2.99444 20.7778 3.66667V7.06444C20.0322 7.73667 19.5556 8.70222 19.5556 9.77778V12.2222H7.33333V9.77778C7.33333 8.70222 6.85667 7.73667 6.11111 7.06444V3.66667ZM24.4444 15.8889C24.4444 16.5611 23.8944 17.1111 23.2222 17.1111H3.66667C2.99444 17.1111 2.44444 16.5611 2.44444 15.8889V9.77778C2.44444 9.10556 2.99444 8.55556 3.66667 8.55556C4.33889 8.55556 4.88889 9.10556 4.88889 9.77778V14.6667H22V9.77778C22 9.10556 22.55 8.55556 23.2222 8.55556C23.8944 8.55556 24.4444 9.10556 24.4444 9.77778V15.8889Z"
        fill={colors.primary["600"]}
      />
    </Svg>
  )
}

export default HomewareCategoryThemed