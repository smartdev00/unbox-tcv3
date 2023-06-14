import React from "react";

import {
  Box,
  Center,
  Circle,
  Icon,
} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';



const CircleBurst = ({ color = "primary", iconName = "question", }) => {

  return (
    <Circle size="166px" bg={`${color}.50`}>
      <Circle size="118px" bg={`${color}.300`}>
        <Circle size="58px" bg={`${color}.500`}>                  
          <Icon size={30} color="white" as={FontAwesome} name={iconName}/>          
        </Circle>
      </Circle>
    </Circle>
  )
}

export default CircleBurst;
