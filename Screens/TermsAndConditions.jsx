import React from 'react';

import { useTranslation, } from "react-i18next";

import {
  Box,
  Text,
} from 'native-base';

import {
  BackButton,
} from "../Components";


const TermsAndConditions = ({ navigation }) => {

  const { t } = useTranslation();

  return (
    <Box p={1} flex={1} bg={"white"} alignItems={"center"}>
      <BackButton navigation={navigation} />
      <Text
        my={3}
        color="primary.500"
        fontSize={24}
        fontWeight={700}
        textTransform={"uppercase"}>{t("screens.termsAndConditions.title")}
      </Text>
    </Box >
  )
}

export default TermsAndConditions;