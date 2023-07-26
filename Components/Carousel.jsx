import { Box, useTheme } from 'native-base'
import * as React from 'react'
import { Alert, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

const CarouselComp = ({ data, renderItem, setIndex }) => {
  const { colors } = useTheme()
 
  return (
    <Box flex={1}
    >
      <Carousel
        loop
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        width={Dimensions.get('window').width * 0.8}
        height={Dimensions.get('window').height * 0.2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1500}
        onSnapToItem={(index) => {
          setIndex(index)
        }}
        renderItem={renderItem}
      />
    </Box>
  )
}

export default CarouselComp
