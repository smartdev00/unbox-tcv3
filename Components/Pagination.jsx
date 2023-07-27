import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Box, useTheme } from 'native-base'

const Pagination = ({ data, index }) => {
  const { colors } = useTheme()
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current && data.length > 0) {
      const dotWidth = 20;
      const numOfDots = data.length;
      const scrollViewWidth = numOfDots * dotWidth;
  
      const centerScrollView = scrollViewWidth / 2;
  
      const centerActiveDot = (index + 0.5) * dotWidth;
  
      const offset = centerActiveDot - centerScrollView;
  
      scrollViewRef.current.scrollTo({
        x: Math.max(0, offset),
        y: 0,
        animated: true,
      });
    }
  }, [data, index]);

  

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        justifyContent: 'center',
      }}
    >
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
    </ScrollView>
  )
}

export default Pagination
