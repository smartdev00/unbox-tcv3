import React from 'react';
import {
  Text,
} from 'native-base';

import TextSVG from '../Components/SVGs/UnboxTextSVG'

const UnboxPoweredBy = (props) => {  
  return (
    <Text {...props}>Powered by <TextSVG fill={"black"}/></Text>
  )
}

export default UnboxPoweredBy;