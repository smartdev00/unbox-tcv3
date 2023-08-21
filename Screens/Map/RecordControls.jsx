import React, { useEffect, useState } from "react";

import { Box, Circle, Divider, HStack, Pressable, Text } from "native-base";

import { useTranslation } from "react-i18next";
import {
  PloggingStart,
  PloggingStop,
  Distance,
  Stopwatch,
} from "../../assets/svg";


const ElapsedTimeDisplay = ({ elapsedTime, }) => {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  useEffect(() => {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    setHours(zeroPad(hours, 2));
    setMinutes(zeroPad(minutes, 2));
    setSeconds(zeroPad(seconds, 2));  
  }, [elapsedTime]);

  return (
    <Text>{hours}:{minutes}:{seconds}</Text>
  )
}

const DistanceDisplay = ({ distance, }) => {

  if (distance < 1000) {
    return <Text>{distance} m</Text>
  } else {
    return <Text>{distance / 1000} km</Text>
  }
}


const RecordControls = ({ recording, onRecordingStart, onRecordingStop, recordingCount, elapsedTime = 0, distance = 0 }) => {
  const { t } = useTranslation();

  const handleRecordingChange = () => {
    if (recording) onRecordingStop();
    else onRecordingStart();
  };
  return (
    <Box position={"absolute"} bottom={0} alignItems={"center"} width={"100%"}>
      {(!recording && recordingCount === 0) && (
        <Box mx={5} mb={5} bgColor={"#474747"} p={5} borderRadius={"10px"}>
          <Text color="white" fontSize={18} fontWeight={700}>
            {t("litter:screens.map.plogging.title")}
          </Text>
          <Text color="white">
            {t("litter:screens.map.plogging.instructions")}
          </Text>
        </Box>
      )}

      <Box bgColor={"white"} pb={5}>
        <Text my={3} mx={5} fontSize={18} color={"primary.600"}>
          {t("litter:screens.map.plogging.title")}
        </Text>
        <Box
          mx={5}
          mb={5}
          p={3}
          alignItems={"center"}
          bgColor={"primary.600"}
          borderRadius={"16px"}
        >
          <HStack justifyContent={"space-evenly"} w={"100%"}>
            <Box>
              <HStack alignItems={"center"}>
                <Stopwatch />
                <Text color={"white"} fontSize={14}>
                  {t("litter:screens.map.plogging.time")}
                </Text>
              </HStack>
              <Text color={"white"} fontSize={25}>                
                <ElapsedTimeDisplay elapsedTime={elapsedTime}/>
              </Text>
            </Box>
            <Divider orientation="vertical" color={"white"} py={3} />
            <Box>
              <HStack alignItems={"center"}>
              <Distance />
              <Text color={"white"} fontSize={14}>
                {t("litter:screens.map.plogging.distance")}
              </Text>
              </HStack>
              <Text color={"white"} fontSize={25}>
                <DistanceDisplay distance={distance}/>
              </Text>
            </Box>
            <Box alignItems={"center"}>
              <Pressable onPress={() => handleRecordingChange()}>
                {recording ? <PloggingStop /> : <PloggingStart />}
              </Pressable>

              <Text color={"white"} fontSize={14}>
                {recording
                  ? t("litter:screens.map.plogging.stop")
                  : t("litter:screens.map.plogging.start")}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default RecordControls;
