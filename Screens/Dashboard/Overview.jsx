import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { BalanceContext, UserContext } from "../../Context";

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
    <HStack w="50%">
      <Circle
        bgColor="primary.600"
        size={8}        
        _text={Object({ color: "white", fontSize: "20px", fontWeight: 700 })}
      >
        {label}
      </Circle>

      <VStack ml={2}>
        <Text fontSize={"13px"} fontWeight={700} color={"primary.600"}>
          {value}
        </Text>
        <Text fontSize={"11px"} fontWeight={500} flex={1} flexWrap={'wrap'}>{title}</Text>
      </VStack>
    </HStack>
  );
};

const Overview = () => {
  return (
    <Box
      borderWidth={1}
      borderColor={"primary.600"}
      padding={"13px"}
      rounded={12}
      mb={3}
    >
      <Text fontSize={"13px"} fontWeight={700} mb={2}>
        My Progress
      </Text>

      <VStack space={2}>
        <HStack>
          <ProgressItem            
            label={"D"}
            title={"Pieces of litter collected today"}
            value={2}
          />
          <ProgressItem
            label={"W"}            
            title={"Pieces of litter collected this week"}
            value={30}
          />
        </HStack>
        <HStack>
          <ProgressItem
            label={"M"}
            title={"Pieces of litter collected this month"}
            value={123}
          />
          <ProgressItem
            label={"Y"}
            title={"Pieces of litter collected this year"}
            value={273}
          />
        </HStack>
        <HStack>
          <ProgressItem label={"D"} title={"Daily streak"} value={4} />
          <ProgressItem label={"D"} title={"Daily max"} value={20} />
        </HStack>
      </VStack>
    </Box>
  );
};

const OverviewTab = () => {
  return (
    <ScrollView bgColor="white">
      <Box mt={3} px={6}>
        <Overview />
      </Box>
    </ScrollView>
  );
};

export { OverviewTab, Overview };
