import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from 'native-base'
import { Path, Svg } from 'react-native-svg'

const CloseIconThemed = () => {
  const { colors } = useTheme()
  return (
    <Svg
      width='19'
      height='17'
      viewBox='0 0 19 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M2.70923 15.1561L16.3932 2.17341'
        stroke='#EB1878'
        stroke-width='3.5'
        stroke-linecap='round'
      />
      <Path
        d='M2.70923 2.17334L16.3932 15.1561'
        stroke='#EB1878'
        stroke-width='3.5'
        stroke-linecap='round'
      />
    </Svg>
  )
}

export default CloseIconThemed
