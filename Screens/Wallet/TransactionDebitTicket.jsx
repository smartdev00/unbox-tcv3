import React from "react";

import { Box, Divider, HStack, Text, VStack, Pressable } from "native-base";

import format from "date-fns/format";

import { useNavigation } from "@react-navigation/native";

const TransactionDebitTicket = ({ transaction }) => {

  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate("TransactionDetails", { transaction } )}>
      <Box p={4}>
        <VStack space={1}>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={700} fontSize={"14px"}>
              {transaction.order.orderLines.items[0].productItem?.name}
            </Text>
            <Text fontWeight={700} fontSize={"14px"}>
              -{transaction.amount} CUC
            </Text>
          </HStack>
          <Text>
            {transaction.order.orderLines.items[0].productItem?.retailer?.company}
          </Text>
          <Text>
            {format(new Date(transaction.dateAdded), "hh:mm a, dd-MMM-yyyy")}
          </Text>
        </VStack>
      </Box>
      <Divider />
    </Pressable>
  );
};

export default TransactionDebitTicket;
