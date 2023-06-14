import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { BalanceContext, UserContext } from "../../Context";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";

import {
  Box,
  Button,
  Circle,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";

const ProgressItem = ({ label, title, value }) => {
  return (
    <HStack w="50%" pr={2}>
      <Circle
        bgColor="primary.600"
        size={8}
        _text={Object({ color: "white", fontSize: "20px", fontWeight: 700 })}
      >
        {label}
      </Circle>

      <VStack ml={2} mr={5}>
        <Text fontSize={"13px"} fontWeight={700} color={"primary.600"}>
          {value}
        </Text>
        <Text fontSize={"11px"} fontWeight={500} flex={1} flexWrap={"wrap"}>
          {title}
        </Text>
      </VStack>
    </HStack>
  );
};

const Statistics = () => {
  const { t } = useTranslation();

  const [statistics, setStatistics] = useState();

  const [userStatisticsQuery] = useLazyQuery(gql(queries.getUserStatistics), {
    fetchPolicy: "no-cache",
  });

  const loadStatistics = async () => {
    const { data, error } = await userStatisticsQuery();

    if (error) console.log(error);
    // throw GraphQLException(error);
    setStatistics(data.userGet.statistics);
  };

  useEffect(() => {
    //get user statistics

    loadStatistics();
  }, []);

  if (!statistics) return null;

  return (
    <Box
      borderWidth={1}
      borderColor={"primary.600"}
      padding={"13px"}
      rounded={12}
      mb={3}
    >
      <Text fontSize={"13px"} fontWeight={700} mb={2}>
        {t("litter:statistics.userTitle")}
      </Text>

      <VStack space={2}>
        <HStack>
          <ProgressItem
            label={"D"}
            title={t("litter:statistics.today")}
            value={statistics.today}
          />
          <ProgressItem
            label={"W"}
            title={t("litter:statistics.week")}
            value={statistics.week}
          />
        </HStack>
        <HStack>
          <ProgressItem
            label={"M"}
            title={t("litter:statistics.month")}
            value={statistics.month}
          />
          <ProgressItem
            label={"Y"}
            title={t("litter:statistics.year")}
            value={statistics.year}
          />
        </HStack>
        <HStack>
          <ProgressItem
            label={"D"}
            title={t("litter:statistics.streak")}
            value={statistics.streak}
          />
          <ProgressItem
            label={"D"}
            title={t("litter:statistics.daily")}
            value={statistics.daily.current}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

const CommunityStatistics = ({ community }) => {
  const [statistics, setStatistics] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    //get user statistics

    setStatistics(community.statistics);
  }, []);

  if (!statistics) return null;

  return (
    <Box
      borderWidth={1}
      borderColor={"primary.600"}
      padding={"13px"}
      rounded={12}
      mb={3}
    >
      <VStack space={2}>
        <HStack>
          <ProgressItem
            label={"D"}
            title={t("litter:statistics.today")}
            value={statistics.today}
          />
          <ProgressItem
            label={"W"}
            title={t("litter:statistics.week")}
            value={statistics.week}
          />
        </HStack>
        <HStack>
          <ProgressItem
            label={"M"}
            title={t("litter:statistics.month")}
            value={statistics.month}
          />
          <ProgressItem
            label={"Y"}
            title={t("litter:statistics.year")}
            value={statistics.year}
          />
        </HStack>        
        <HStack>
          <ProgressItem
            label={"D"}
            title={t("litter:statistics.totalDistance")}
            value={`${statistics.totalDistance} m`}
          />
          <ProgressItem
            label={"D"}
            title={t("litter:statistics.totalLitter")}
            value={statistics.totalClicks}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

const StatisticsTab = () => {
  return (
    <ScrollView bgColor="white">
      <Box mt={3} px={6}>
        <Statistics />
      </Box>
    </ScrollView>
  );
};

export { StatisticsTab, Statistics, CommunityStatistics, };
