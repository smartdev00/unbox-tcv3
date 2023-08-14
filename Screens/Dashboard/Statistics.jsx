import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

import { BalanceContext, UserContext } from "../../Context";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import ClickChart from '../../Components/ClickChart';
import ContributionChart from '../../Components/ContributionChart';
import CarouselComp from "../../Components/Carousel";
import Pagination from "../../Components/Pagination";

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
  const [index, setIndex] = useState(0);

  const [userStatisticsQuery] = useLazyQuery(gql(queries.getUserStatistics), {
    fetchPolicy: "no-cache",
  });

  const loadStatistics = async () => {
    const { data, error } = await userStatisticsQuery();

    if (error) console.log(error);
    // throw GraphQLException(error);
    console.log(data.userGet.statistics, "stattistics data");
    if (data.userGet.statistics)
      setStatistics(data.userGet.statistics);
  };

  useEffect(() => {
    //get user statistics

    loadStatistics();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      //get user statistics
      loadStatistics();
    }, [])
  );

  const renderItem = ({ item }) => {
    const index = caArray.indexOf(item);
    return (
      <Box flex={1} pt={4} alignItems={'center'} >
        {index === 0 ? (
          <Box alignSelf="center" alignItems="center">
            <ClickChart chartType={'daily'} chartData={item} />
            <Text m={2} color={'primary.600'} bold>{t('litter:screens.dashboard.statistics.titleDaily')}</Text>
          </Box>
        ) : index === 1 ? (
          <Box alignSelf="center" alignItems="center">
            <ClickChart chartType={'monthly'} chartData={statistics.monthly} />
            <Text m={2} color={'primary.600'} bold>{t('litter:screens.dashboard.statistics.titleMonthly')}</Text>
          </Box>
        ) : (
          <Box alignSelf="center" alignItems="center">
            <ContributionChart chartType={'contribution'} chartData={statistics.contribution} />
            <Text m={2} color={'primary.600'} bold>{t('litter:screens.dashboard.statistics.titleCalendar')}</Text>
          </Box>
        )}
      </Box>
    )
  };

  if (!statistics) return <></>;

  const caArray = [statistics.daily, statistics.monthly, statistics.contribution];

  return (
    <Box
      borderWidth={1}
      borderColor={"primary.600"}
      padding={"13px"}
      rounded={12}
      mb={3}
    >
      <Text fontSize={"13px"} fontWeight={700} mb={2}>
        {t("litter:screens.dashboard.tabs.myOverview.title")}
      </Text>

      <HStack w={"100%"}>
        <CarouselComp data={caArray} renderItem={renderItem} setIndex={setIndex} kind={"statistics"} />
      </HStack>

      <Box alignItems={"center"} mb={6}>
        <Pagination data={caArray} index={index} kind={"statistics"}/>
      </Box>

      <Box flex={1}>
        <VStack space={2}>
          <HStack>
            <ProgressItem
              label={"D"}
              title={t("litter:screens.dashboard.statistics.today")}
              value={statistics.today}
            />
            <ProgressItem
              label={"W"}
              title={t("litter:screens.dashboard.statistics.week")}
              value={statistics.week}
            />
          </HStack>
          <HStack>
            <ProgressItem
              label={"M"}
              title={t("litter:screens.dashboard.statistics.month")}
              value={statistics.month}
            />
            <ProgressItem
              label={"Y"}
              title={t("litter:screens.dashboard.statistics.year")}
              value={statistics.year}
            />
          </HStack>
          <HStack>
            <ProgressItem
              label={"D"}
              title={t("litter:screens.dashboard.statistics.streak")}
              value={statistics.streak}
            />
            <ProgressItem
              label={"D"}
              title={t("litter:screens.dashboard.statistics.daily")}
              value={statistics.daily.current}
            />
          </HStack>
        </VStack>
      </Box>
    </Box >
  )
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
