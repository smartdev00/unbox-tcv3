import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Box, Circle, Button, Image, ScrollView, Text, useTheme, } from "native-base";

import { Merchant } from "../../assets/svg";

import { Alert, RefreshControl } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import TransactionDebitTicket from "./TransactionDebitTicket";
import { BalanceContext } from "../../Context";

const SpentTab = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState();
  const { navigate } = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [balance, setBalance] = useContext(BalanceContext);

  const [listConsumerDebitTransactions] = useLazyQuery(
    gql(queries.consumerDebitTransactionsList),
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
      const { data, error } = await listConsumerDebitTransactions();
      setRefreshing(true);
      if (error) {
        console.log("listConsumerDebitTransactions", error);
        // throw GraphQLException(error);
      }

      if (data) {
        let transactions = [];

        data.transactionList?.items.forEach((transaction) => {
          transaction.order.orderLines?.items.forEach((orderLine) => {
            transactions.push({
              ...transaction,
              ...orderLine.productItem,
              orderLineId: orderLine.id,
              visitingAddress: orderLine.productItem?.retailer?.visitingAddress,
              qrStatus: orderLine.qrVoucher?.status,
            });
          });
        });

        setTransactions(transactions);
      
      }
    } finally {
      setRefreshing(false);
    }
  };


  useEffect(() => {
    loadTransactions();

  }, [balance]);


  useEffect(() => {
    loadTransactions();
  }, []);

  const [myVouchers, setMyVouchers] = useState([]);



  return (
    <ScrollView
      bgColor="white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadTransactions} />
      }
    >
      {!transactions?.length && !refreshing && (
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
          {Boolean(balance) && (
           <>
             <Text mb={4}>{t("litter:screens.wallet.tabs.spent.noItems")}</Text>
             <Button
               colorScheme={"primary"}
               _text={Object({ fontSize: "14px", fontWeight: 700 })}
               onPress={() => navigate("Shop", { tab: "merchants" })}
             >
               {t("litter:screens.wallet.tabs.spent.button")}
             </Button>
           </>
          )}
          {!Boolean(balance) && (
            <>
              <Text mb={4}>{t("litter:screens.wallet.tabs.earned.noItems")}</Text>
              <Button
                colorScheme={"primary"}
                _text={Object({ fontSize: "14px", fontWeight: 700 })}
                onPress={() => navigate("Scan", { requestPhoto: false })}
              >
                {t("litter:screens.wallet.tabs.earned.button")}
              </Button>
            </>
          )}
        </Box>
      )}

      {transactions &&
        transactions.map((transaction, key) => (
          <TransactionDebitTicket key={key} transaction={transaction} setTransactions={setTransactions} />
        ))}
    </ScrollView>
  );
};

export default SpentTab;
