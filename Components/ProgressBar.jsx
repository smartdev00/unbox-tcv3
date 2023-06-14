import React, { useContext, } from 'react';

import {
  Box,
  Circle,
  Text,
} from 'native-base';

import { useTranslation, } from "react-i18next";

import {
  UserProgressContext,
} from '../Context';


const ProgressBar = () => {
  const { t } = useTranslation();

  const [userProgress,] = useContext(UserProgressContext);

  return (
    <>
      <Box width={"100%"} flexDir={"row"} justifyContent={"space-between"} mb={3}>
        <Text>0 {t('general.litterSuffix')}</Text>
        <Text>{userProgress.maxProgress} {t('general.litterSuffix')}</Text>
      </Box>
      <Box
        height={5}
        width="100%"
        bgColor={"primary.100"}
        flexDirection={"row"}
        alignItems={"center"}
        borderRadius={6}
        px={2}
      >
        <Box
          width={`${(userProgress.progress / userProgress.maxProgress) * 100}%`}
          bgColor={"primary.500"}
          height={3}          
          borderTopLeftRadius={2}
          borderBottomLeftRadius={2}
        >

        </Box>
        <Circle bgColor={"primary.500"} left={((userProgress.progress / userProgress.maxProgress) > 0.5) ? -30 : -8} size={8}
          _text={Object({
            color: "white",
            fontSize: 12
          })}
        >
          {userProgress.progress}
        </Circle>



      </Box>
    </>
  )
}

export default ProgressBar;