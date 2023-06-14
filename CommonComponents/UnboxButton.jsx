import React from 'react';
import {
  Button,
} from 'native-base';

const UnboxButton = (props) => {  
  return (
    <Button {...props}>{props.children}</Button>
  )
}

export default UnboxButton;