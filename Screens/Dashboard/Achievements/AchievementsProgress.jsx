import React from 'react';
import { useTranslation } from "react-i18next";

import {
  Box,
  Text,
  Circle,
} from 'native-base';
import { Dimensions } from "react-native";


const AchievementsProgress = ({ targets }) => {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get("window").width;
  if (targets.progress === undefined) return;
  return (
    <Box my={4} ml={2}>
      {/* <Text>{t("litter:screens.achievements.title.progress")}</Text> */}
      <Box
        height={"12px"}
        width={screenWidth - 40}
        bgColor={"#D9D9D9"}
        flexDirection={"row"}
        alignItems={"center"}
        borderRadius={"7px"}
        borderWidth={"0.5px"}
        borderColor={"secondary.700"}
        py={'1px'}
        position={'relative'}
      >
        {targets.progress &&
          (<Box
            width={(screenWidth - 60) * targets.progress / targets.target}
            bgColor={"primary.600"}
            height={'11px'}
            borderTopLeftRadius={'7px'}
            borderBottomLeftRadius={'7px'}
            borderColor={"black"}
            borderWidth={"0.5px"}
            position={'absolute'}
            borderRightColor={"primary.600"}
            zIndex={3}
          />)}

        <Circle
          bgColor={"primary.600"}
          size={'26px'}
          position={'absolute'}
          left={(screenWidth - 60) * (targets.progress / targets.target)}
          ml={"-2px"}
          borderWidth={"0.5px"}
          zIndex={2}
          _text={Object({
            color: "white",
            fontSize: 9,
            fontWeight: 700
          })}
        >
          {targets.progress}
        </Circle>
        <Text
          variant={'heading1'}
          position={'absolute'}
          zIndex={1}
          right={1}
          fontSize={9}>
          {targets.target}
        </Text>
      </Box>
    </Box>
  )
}

export default AchievementsProgress;