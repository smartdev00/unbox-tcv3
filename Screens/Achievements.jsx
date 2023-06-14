import React, { useContext, useEffect, useState, } from 'react';

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";

import { useTranslation, } from "react-i18next";

import {
  AchievementsContext,
  UserProgressContext,
} from '../Context';

import {
  Box,
  ScrollView,
  Square,
  Text,
} from 'native-base';

import {
  TopBar,
  ProgressBar,
} from "../Components";

import { GraphQLException, } from '../exceptions';

import {
  AchievementClaimed,
  AchievementLocked,
  AchievementWon,
} from "../assets/svg";



const Achievement = ({ achievement, }) => {

  const achievementImage = () => {
    switch (achievement.status) {
      case "claimed": return <AchievementClaimed />;
      case "won": return <AchievementWon />;
      case "locked": return <AchievementLocked />;
      default: return <AchievementLocked />
    }
  }

  const textColor = () => {
    switch (achievement.status) {
      case "claimed": return "black";
      case "won": return "primary.500";
      case "locked": return "gray.300";
      default: return "black"
    }
  }

  return (
    <Box alignItems={"center"} my={2}>
      <Square size={"lg"} bgColor={"gray.50"} mx={2} borderRadius={10}>
        {achievementImage()}
      </Square>
      <Text
        color={textColor()}
        fontWeight={700}
      >
        {achievement.name}
      </Text>
      <Text
        color={(achievement.status === "locked") ? "gray.300" : "black" }
        fontWeight={400}
      >
        {achievement.description}
      </Text>
    </Box>
  )
}

const Achievements = ({ navigation, }) => {

  const { t } = useTranslation();
  const [userProgress,] = useContext(UserProgressContext);

  const [achievements, setAchievements] = useContext(AchievementsContext);

  const [achievementsQuery] = useLazyQuery(gql(queries.achievements), {
    fetchPolicy: "no-cache",
  });

  const loadAchievements = async () => {
    const { data, error } = await achievementsQuery ();

    if (error) 
      console.log(error)
      // throw GraphQLException(error);
      
    console.log(data);
    setAchievements(data.badges.items);
  }

  
  useEffect(() => {
    loadAchievements();
  }, []);
  
  if (!achievements) return null;    

  return (
    <Box p={3} flex={1} bg={"white"} alignItems={"center"}>
      <TopBar navigation={navigation} />
      <Text
        my={3}
        color="primary.500"
        fontSize={24}
        fontWeight={700}
        textTransform={"uppercase"}>{t("screens.achievements.title")}
      </Text>
      <ProgressBar />
      <Text my={3} alignSelf={"flex-start"}>{t('screens.achievements.message', { toGo: userProgress.maxProgress - userProgress.progress, nextLevel: userProgress.nextLevel })}</Text>

      <ScrollView>
        <Box flexWrap={"wrap"} flexDirection={"row"} justifyContent={"space-between"}>
          {achievements && achievements.map((achievement, key) => (
            <Achievement achievement={achievement} key={key} />
          ))}
        </Box>
      </ScrollView>
    </Box>

  )
}

export default Achievements;