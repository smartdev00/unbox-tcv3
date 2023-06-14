import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Box, Circle, Button, Image, ScrollView, Text, useTheme, } from "native-base";

import { RefreshControl, Linking, Pressable, } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Merchant } from "../../assets/svg";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import TransactionCreditTicket from "./TransactionCreditTicket";
import { BalanceContext } from "../../Context";

const EarnedTab = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState();
  const { navigate } = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [balance, setBalance] = useContext(BalanceContext);

  const [listConsumerCreditTransactions] = useLazyQuery(
    gql(queries.consumerCreditTransactionsList),
    {
      fetchPolicy: "no-cache",
    }
  );

  const [myBalanceQuery] = useLazyQuery(gql(queries.myBalance), {
    fetchPolicy: "no-cache",
  });


  const updateBalance = async () => {
    console.log("update balance");
    const { data, error } = await myBalanceQuery();
    if (data) {
      setBalance({
        value: data.myBalance.remaining
      });
    }
    if (error) {
      console.log(error);
    }
  };


  const loadTransactions = async () => {
    try {
      const { data, error } = await listConsumerCreditTransactions();
      setRefreshing(true);
      if (error) {
        console.log("listConsumerCreditTransactions", error);
        // throw GraphQLException(error);
      }

      if (data) {
        console.log(JSON.stringify(data, null, 2));
        setTransactions(data.transactionList.items);
      }
    } finally {
      setRefreshing(false);
    }
    updateBalance();


  };

  useEffect(() => {
    loadTransactions([]);
  }, []);

  // if (!transactions || !transactions?.length)
  //   return (
  //     <ScrollView
  //       bgColor="white"
  //       refreshControl={
  //         <RefreshControl
  //           refreshing={refreshing}
  //           onRefresh={loadTransactions}
  //         />
  //       }
  //     >

  //     </ScrollView>
  //   );

  return (
    <ScrollView
      bgColor="white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadTransactions} />
      }
    >
      {(!transactions?.length && !refreshing) && (
        <Box alignItems={"center"}>
          <Circle
            p={10}
            bg={"#f3f3f3"}
            size={"180px"}
            mt={12}
            mb={7}
            alignItems={"center"}
          >
            <Merchant width={100} height={100} color400={colors.primary["400"]} color600={colors.primary["600"]} />
          </Circle>
          <Text mb={4}>{t("litter:screens.wallet.tabs.earned.noItems")}</Text>
          <Button
            colorScheme={"primary"}
            _text={Object({ fontSize: "14px", fontWeight: 700 })}
            onPress={() => navigate("Scan", { requestPhoto: false }) }
          >
            {t("litter:screens.wallet.tabs.earned.button")}
          </Button>
        </Box>
      )}

      {transactions &&
        transactions.map((transaction, key) => (
          <TransactionCreditTicket key={key} transaction={transaction}/>
        ))}
    </ScrollView>
  );
};

export default EarnedTab;
