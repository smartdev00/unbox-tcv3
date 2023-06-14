import React from "react";

import { Box, Divider, HStack, Text, VStack, Pressable } from "native-base";

import format from "date-fns/format";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const TransactionCreditTicket = ({ transaction }) => {
  const { navigate } = useNavigation();
    const { t } = useTranslation();

  return (
    <Pressable onPress={() => navigate("TransactionDetails", { transaction } )}>
      <Box p={4}>
        <VStack space={1}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={700} fontSize={"14px"}>
              {t(`litter:screens.wallet.transaction.${transaction.referrer}`)}
            </Text>
            <Text fontWeight={700} fontSize={"14px"}>
              +{transaction.amount} CUC
            </Text>
          </HStack>
          <Text>
            {format(new Date(transaction.dateAdded), "hh:mm a, dd-MMM-yyyy")}
          </Text>
        </VStack>
      </Box>
      <Divider />
    </Pressable>
  );
};

export default TransactionCreditTicket;