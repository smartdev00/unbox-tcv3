import React from 'react';

import { useTranslation, } from "react-i18next";


import {
  Box,
  Button,
  Text,
} from 'native-base';

import {
  CircleBurst,
  TopBar,
} from "../../Components";

const Permission = ({ navigation, color, iconName, _translations, onPress }) => {

  const { t } = useTranslation();

  
  return (
    <Box p={3} flex={1} bg={"white"} alignItems={"center"} justifyContent={"space-evenly"}>
      <TopBar navigation={navigation} balanceHighlight={true} />

      <CircleBurst color={color} iconName={iconName} />
      <Text
        fontSize={18}
        fontWeight={700}
      >
        {_translations.title}
      </Text>

      <Text
        fontSize={14}
        fontWeight={400}
      >
        {_translations.instructions}
      </Text>

    
      <Button
        my={2}
        bg="primary.500"
        width="80%"
        onPress={() => onPress()}
        _text={Object({
          textTransform: "uppercase",
          fontSize: 14,
          fontWeight: 700,
        })}
      >
        {_translations.label}
      </Button>


      <Text
        my={2}
        color="primary.500"
        fontSize={14}
        fontWeight={700}
        onPress={() => navigation.navigate("Dashboard")}        
        textTransform={"uppercase"}
        
      >
        {t("screens.scan-complete.back-to-dashboard")}
      </Text>
    </Box>

  )
}

export default Permission;