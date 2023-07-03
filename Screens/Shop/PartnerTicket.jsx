import React from "react";

import { Box, Button, Image, Text } from "native-base";

import { AppConfig } from "../../config";
import { Pressable, } from "react-native";
import HTML from 'react-native-render-html';


const PartnerAPI = ({ partner, }) => {
  return (
    <Box alignItems={"center"}>
      <Text mt={4}>{partner.contentTitle}</Text>
      <Image resizeMode={'contain'} width={"100px"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>               
      <Text>{partner.contentListLabel}</Text>
      <Button mt={4}>{partner.contentListButton}</Button>      
      <HTML source={{ html: partner.contentBody }} />
    </Box>
  )
}


const PartnerPage = ({ partner, }) => {
  var htmlContent = partner.contentBody;
  htmlContent = htmlContent.replaceAll('src="/assets/', 'src="' + AppConfig.rootUri + '/assets/');
  return (
    <Box alignItems={"center"}>
      <Text mt={4}>{partner.contentTitle}</Text>
      <Image resizeMode={'contain'} width={"100px"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>               
      <Text>{partner.contentListLabel}</Text>
      <Button mt={4}>{partner.contentListButton}</Button>   
      <HTML source={{ html: htmlContent }} />
    </Box>
  );
};

const PartnerItem = ({ partner, }) => {

  console.log(partner.contentImage)
  return (
    <Box alignItems={"center"} m={5}>
      <Image resizeMode={'contain'} width={"100px"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>               
      <Text>{partner.contentListLabel}</Text>
    </Box>
  );
};

const PartnerTicket = ({ partner }) => {
  let partnerItem;
  console.log("partner item", partner);

  switch (partner.type) {
    case "api": 
      partnerItem = <PartnerAPI partner={partner} />;
      break;
    case "item":
      partnerItem = <PartnerItem partner={partner} />;
      break;
    case "page":
      partnerItem = <PartnerPage partner={partner} />;
      break;
    default:
      partnerItem = null;
      break;
  }

  if (!partnerItem) return null;

  return (
    <Pressable>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        px={4}
        pb={4}
        rounded={12}
        mb={3}
      >
        {partnerItem}
      </Box>
    </Pressable>
  );
};

export default PartnerTicket;
