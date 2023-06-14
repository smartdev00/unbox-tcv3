import React from 'react';


import { Pressable } from 'react-native';

import {
  Icon,
  Text,
} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';



const BackButton = ({ navigation, screen}) => {
  return (
    <Pressable
      position={"absolute"}
      top={50}
      left={15}
      onPress={() => (!screen) ? navigation.goBack() : navigation.navigate(screen)}
    >      
      <Icon size={30} color={"primary.500"} as={FontAwesome} name={"arrow-left"} />
    </Pressable>
  )
}

export default BackButton;