import React from 'react';

import {
  Text,
} from 'native-base';

import { useTranslation, } from "react-i18next";


const ContactUs = ({ navigation, }) => {
  const { t } = useTranslation();

  return (
    <Text 
    color={"primary.500"}
    my={2}
    onPress={() => navigation.navigate("ContactUs")}
    >
    {t("text.contactUs")}
  </Text>
  )
}

export default ContactUs;