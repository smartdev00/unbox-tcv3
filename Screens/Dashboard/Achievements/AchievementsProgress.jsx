import React, { useRef } from 'react';
import { useTranslation } from "react-i18next";

import {
  Box,
  Text,
  Circle,
} from 'native-base';
import { Dimensions } from "react-native";


const AchievementsProgress = ({ targets }) => {
  const parentRef = useRef(null);
  const { t } = useTranslation();
  const screenWidth = Dimensions.get("window").width;

  const getParentWidth = () => {
    if (parentRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      console.log(parentWidth, "parentWidth");
    }
  };
  getParentWidth();

  if (targets.progress === undefined) return;
  return (
    <Box ref={parentRef}>
      {/* <Text>{t("litter:screens.achievements.title.progress")}</Text> */}
      <Box
        height={"12px"}
        bgColor={"#D9D9D9"}
        flexDirection={"row"}
        alignItems={"center"}
        borderRadius={"7px"}
        borderWidth={"0.5px"}
        borderColor={"secondary.700"}
        py={'1px'}
        pr={'22px'}
        position={'relative'}
      >
        {targets.progress &&
          (<Box
            width={`${(targets.progress / targets.target) * 100}%`}
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
          left={`${(targets.progress / targets.target) * 100}%`}
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