import { Box, Text, useTheme } from 'native-base'
import * as React from 'react'
import { Alert, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

const CarouselComp = ({ data, renderItem, setIndex, kind='notification' }) => {
  const { colors } = useTheme()


  const aspectRatio = 16 / 9;


  const width = Dimensions.get('window').width * 0.8
  const height = width / aspectRatio
  return (
    <Box flex={1}
    >
      
      {data.length === 0 && kind === 'notification' ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color={colors.primary['600']} fontWeight={700} fontSize="sm">
            No new notifications
          </Text>
        </Box>
      ) : (
        <Carousel
          loop
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          width={width}
          height={kind === 'notification' ? height : 260}
          autoPlay={true}
          data={data}
          scrollAnimationDuration={kind === 'notification' ? 1500 : 3000}
          onAnimatedValueChange={(value) => {
            console.log(value);
          }}
          onSnapToItem={(index) => {
            setIndex(index);
          }}
          renderItem={renderItem}
        />
      )}
    </Box>
  )
}

export default CarouselComp
