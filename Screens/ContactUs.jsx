import React from 'react';

import { Linking } from 'react-native'

import { useTranslation, } from "react-i18next";


import {
  Box,
  Text,
} from 'native-base';

import {
  UnboxLogo,
} from "../assets/svg";

import {
  BackButton,
} from "../Components";


const ContactUs = ({ navigation }) => {

  const { t } = useTranslation();

  return (
    <Box p={1} flex={1} bg={"white"} alignItems={"center"} justifyContent={"space-evenly"}>
      <Box flex={1} alignItems={"center"} justifyContent={"space-around"} width={"100%"}>
        <BackButton navigation={navigation} />
        <Text
          my={3}
          color={"primary.500"}
          fontSize={24}
          fontWeight={700}
          textTransform={"uppercase"}>{t("screens.contactUs.title")}
        </Text>
        <UnboxLogo />
        <Box alignItems={"center"}>
          <Text>Str.RegeleFerdinand Nr.22-26,nivel3</Text>
          <Text>400110 Cluj Napoca</Text>
          <Text>Romania</Text>
          <Text
            color={"primary.500"}
            mt={5}
            onPress={() => Linking.openURL('mailto:cluj@unboxuniverse.com')}
          >
            cluj@unboxuniverse.com
          </Text>
        </Box>
      </Box>
    </Box >
  )
}

export default ContactUs;