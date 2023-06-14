import React from "react";
import {
  Text,
} from "native-base";


import TextSVG from '../Components/SVGs/UnboxTextSVG'

const UnboxProductTitle = () => {
  return (
    <Text variant={"productLabel"} colorScheme={"primary"} textTransform="uppercase">
      <Text
        fontWeight={"bold"}
        textTransform="uppercase"
        color="black"
      >
        <TextSVG fill={"black"}/>{" "}
      </Text>
       Litter
    </Text>
  );
};

export default UnboxProductTitle;
