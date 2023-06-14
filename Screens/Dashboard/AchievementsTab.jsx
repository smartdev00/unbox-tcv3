import { useEffect, useState } from 'react';

// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import {
  Box,
  ScrollView,
  Text,
} from 'native-base';

import { RefreshControl } from "react-native";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";

import AchievementsList from './Achievements/AchievementsList';
import AchievementWonModal from './Achievements/AchievementWonModal';
import AchievementsProgress from './Achievements/AchievementsProgress';

const AchievementsTab = () => {

  const [achievements, setAchievements] = useState([]);
  const [refreshing, setRefreshing] = useState(true)
  const [showWonModal, setShowWonModal] = useState(false);

  const handleWonModal = () => {
    setShowWonModal(true);  
  }

  const [listAchievementsQuery] = useLazyQuery(gql(queries.badgesListDetailed), {
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
        setAchievements(combinedBadges)
      }      
    } finally {
      setRefreshing(false);
    }
  }


  useEffect(() => {
    loadAchievements();
  }, []);

  return (
    <ScrollView bgColor="white" showsVerticalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={loadAchievements} />
    }>
      <AchievementsProgress/>
      <Box alignItems={"center"}>
      <AchievementsList achievements={achievements} onClaimed={loadAchievements}/>
      </Box>
      <AchievementWonModal show={showWonModal} onModalClosed={() => setShowWonModal(false)}/>
    </ScrollView>
  );
};

export default AchievementsTab;
