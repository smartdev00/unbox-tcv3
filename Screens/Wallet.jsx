import React, { useContext, useEffect, useState } from "react";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from "react-i18next";

import { BalanceContext } from "../Context";

import { Box, HStack, Image, Text, useTheme, ScrollView } from "native-base";

import { useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import EarnedTab from "./Wallet/EarnedTab";
import SpentTab from "./Wallet/SpentTab";
import TransactionDetails from "./Wallet/TransactionDetails";

const Stack = createNativeStackNavigator();

const TransactionAmount = ({ amount }) => {
  const { t } = useTranslation();

  const amountString = () => {
    return `${amount >= 0 ? "+" : ""}${amount} ${t("general.coinSuffix")}`;
  };

  return (
    <Text
      fontSize={16}
      fontWeight={700}
      color={amount >= 0 ? "primary.500" : "highlight.500"}
    >
      {amountString()}
    </Text>
  );
};

const Transaction = ({ transaction }) => {
  return (
    <Box
      w={"100%"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      my={2}
    >
      <Box>
        <Text fontSize={14} fontWeight={400}>
          {transaction.name}
        </Text>
        <Text fontSize={12} fontWeight={400}>
          {new Date(transaction.createdAt).toLocaleDateString()}
        </Text>
        <Text fontSize={12} fontWeight={400}>
          {new Date(transaction.createdAt).toLocaleTimeString()}
        </Text>
      </Box>
      <TransactionAmount amount={transaction.amount} />
    </Box>
  );
};

const Transactions = ({ transactions }) => {
  return (
    <>
      {transactions.map((transaction, key) => (
        <Transaction transaction={transaction} key={key} />
      ))}
    </>
  );
};

const WalletTabs = ({ navigation }) => {
  const { t } = useTranslation();

  const [balance] = useContext(BalanceContext);
  const [transactions, setTransactions] = useState([]);

  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "earned", title: "litter:screens.wallet.tabs.earned.title" },
    { key: "spent", title: "litter:screens.wallet.tabs.spent.title" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => {
        return (
          <Text
            color={focused ? "primary.600" : "black"}
            fontSize={"12px"}
            fontWeight={"700"}
          >
            {t(route.title)}
          </Text>
        );
      }}
      indicatorStyle={Object({ backgroundColor: colors["primary"]["600"] })}
      style={Object({ backgroundColor: "white" })}
    />
  );

  const renderScene = SceneMap({
    earned: EarnedTab,
    spent: SpentTab,
  });

  const [transactionsQuery] = useLazyQuery(gql(queries.transactions), {
    fetchPolicy: "no-cache",
  });

  // const loadTransactions = async () => {
  //   const { data, error } = await transactionsQuery ();

  //   if (error) throw GraphQLException(error);

  //   setTransactions(data.transactions.items);
  // }

  // useEffect(() => {
  //   loadTransactions();
  // }, []);

  // if (!transactions) return null;

  return (
    <Box flex={1}>
      <Box alignItems={"center"} bgColor={"white"}>
        <Text fontSize="59px" fontWeight={700}>
          {balance.value || 0}
        </Text>
      </Box>
      <HStack
        bgColor="white"
        justifyContent={"center"}
        alignItems={"center"}
        pb={5}
        space={1}
      >
        <Text fontSize="26px" color={"primary.600"}>
          circular
        </Text>
        <Image
          source={require("../assets/images/ucoins.png")}
          alt="ucoins"
          w="79px"
          h="20px"
        />
      </HStack>
      <TabView
        navigationState={Object({ index, routes })}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={Object({ width: layout.width })}
      />
    </Box>
  );
};

const WalletStack = ({ route }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Stack.Navigator labelStyle>
      <Stack.Screen
        name="WalletTabs"
        component={WalletTabs}
        options={Object({ headerShown: false })}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetails}
        options={Object({
          headerShown: true,
          title: null,
          headerTintColor: colors["primary"]["600"],
        })}
      />
    </Stack.Navigator>
  );
};

export default WalletStack;
