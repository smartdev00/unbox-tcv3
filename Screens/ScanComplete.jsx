import React, { useContext, } from 'react';

import { useTranslation, } from "react-i18next";
import { useFocusEffect } from '@react-navigation/native';

import {
  WalletContext,
} from '../Context';

import {
  Box,
  Button,  
  Text,
} from 'native-base';

import {
  CircleBurst,
  TopBar,
} from "../Components";

const ScanComplete = ({ navigation }) => {

  const { t } = useTranslation();

  const [wallet, setWallet] = useContext(WalletContext);

  useFocusEffect(
    React.useCallback(() => {
      // test code to increment wallet context.
      setWallet((w) => {
        return {
          ...w,
          balance: w.balance + 5,
        }
      })
    }, [])
  );

  return (
    <Box p={3} flex={1} bg={"white"} alignItems={"center"} justifyContent={"space-evenly"}>
      <TopBar navigation={navigation} balanceHighlight={true} />
      <Text
        my={3}
        color="primary.500"
        fontSize={24}
        fontWeight={700}
        textTransform={"uppercase"}>{t("screens.scanComplete.title")}
      </Text>

      <Text
        fontWeight={700}
      >
        {t("screens.scanComplete.thankyou")}
      </Text>

      <Text
        fontWeight={700}
      >
        {t("screens.scanComplete.itemSubmitted")}
      </Text>

      <CircleBurst color={"primary"} iconName="check" />

      <Text
        fontSize={31}
        color={"primary.500"}
      >
        + 5 {t('general.coinSuffix')}
      </Text>
      <Text>
        {t("screens.scanComplete.addedToWallet")}
      </Text>

      <Button
        my={2}
        bg="primary.500"
        width="80%"
        onPress={() => navigation.navigate("Scan")}
        _text={Object({
          textTransform: "uppercase",
          fontSize: 14,
          fontWeight: 700,
        })}
      >
        {t("screens.scanComplete.scanAgain")}
      </Button>


      <Text
        my={2}
        color="primary.500"
        fontSize={14}
        fontWeight={700}
        onPress={() => navigation.navigate("Dashboard")}
      >
        {t("screens.scanComplete.backToDashboard")}
      </Text>
    </Box>

  )
}

export default ScanComplete;