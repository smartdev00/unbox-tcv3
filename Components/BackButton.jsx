import React from 'react';


import { TouchableOpacity } from 'react-native';

import {
  Icon,
  Text,
  Pressable
} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';
import BackThemed from './ThemedSVGs/BackThemed'



const BackButton = ({ navigation, screen}) => {
  return (
    <Pressable
      position={"absolute"}
      top={75}
      left={15}
      onPress={() => (!screen) ? navigation.goBack() : navigation.navigate(screen)}
    >      
      <BackThemed />
    </Pressable>
  )
}

export default BackButton;