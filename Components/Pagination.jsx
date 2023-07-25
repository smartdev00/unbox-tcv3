import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, useTheme } from 'native-base'

const Pagination = ({ data, index }) => {
  const { colors } = useTheme()

  return (
    <Box flexDirection='row' justifyContent='center' alignItems='center' mt={2}>
      {data.map((_, i) => {
        return (
          <Box
            key={i}
            style={{
              width: index === i ? 20 : 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 2,
              backgroundColor:
                index === i ? colors.purple[600] : colors.gray[300],
            }}
          />
        )
      })}
    </Box>
  )
}

export default Pagination
