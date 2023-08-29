import React, { useEffect, useState } from 'react';

// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import {
  Box,
  ScrollView,
  Text,
} from 'native-base';

import { RefreshControl } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";

import AchievementsList from './Achievements/AchievementsList';
import AchievementWonModal from './Achievements/AchievementWonModal';
import AchievementsProgress from './Achievements/AchievementsProgress';

const AchievementsTab = () => {

  const [achievements, setAchievements] = useState([]);
  const [targets, setTargets] = useState({});
  const [refreshing, setRefreshing] = useState(true)
  const [showWonModal, setShowWonModal] = useState(false);

  const handleWonModal = () => {
    setShowWonModal(true);  
  }

  const [listAchievementsQuery] = useLazyQuery(gql(queries.badgesListDetailed), {
    fetchPolicy: "no-cache",
  });
  const [userTargetsQuery] = useLazyQuery(gql(queries.getUserTargets), {
    fetchPolicy: "no-cache",
  });

  const loadAchievements = async () => {
    try {
      const { data, error } = await listAchievementsQuery();
      setRefreshing(true);
      if (error) {
        console.log("listAchievementsQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        // console.log(JSON.stringify(data, null, 2));

        // data.userBadges = {
        //   badges: {
        //     won: [4,5,6],
        //     claimed: [2]
        //   }
        // }

        const combinedBadges = data.badgeList.items.map((badge) => {
          return {
            ...badge,
            won: data.userBadges.badges.won.includes(badge.id),
            claimed: data.userBadges.badges.claimed.includes(badge.id)
          }
        })

        console.log(combinedBadges);
        setAchievements(combinedBadges);
      }      
    } finally {
      setRefreshing(false);
    }
  }

  const loadUserTargets = async () => {
    try {
      const { data, error } = await userTargetsQuery();
      if (error) {
        console.log("userTargetsQuery", error);
      }

      if (data) {
        console.log(JSON.stringify(data, null, 2), "userTargets");
        setTargets(data.targetsGet);
      }      
    } finally {
    }
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {        
        await loadUserTargets();
      })();
    }, [])
  );

  return (
    <ScrollView bgColor="white" showsVerticalScrollIndicator={false} pl={2}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadAchievements} />
      }>
      {targets && (
        <Box py={4} mr={4} ml={2}>
          <AchievementsProgress targets={targets} />
        </Box>
      )}
      <Box alignItems={"center"}>
        <AchievementsList achievements={achievements} onClaimed={loadAchievements} />
      </Box>
      <AchievementWonModal show={showWonModal} onModalClosed={() => setShowWonModal(false)} />
    </ScrollView>
  );
};

export default AchievementsTab;
