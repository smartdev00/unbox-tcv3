import React, { useEffect, useState } from "react";

import { Box, Button, Image, VStack, Text, ScrollView } from "native-base";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { CommunityStatistics } from "./Dashboard/Statistics";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";

import LeaveCommunityModal from "./Dashboard/Communities/LeaveCommunityModal";

import { AppConfig } from "../config";

const CommunityDetails = ({ route }) => {
  const { t } = useTranslation();
  const { navigate, goBack } = useNavigation();

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const [community, setCommunity] = useState();

  const [getCommunityQuery] = useLazyQuery(gql(queries.getCommunity), {
    fetchPolicy: "no-cache",
  });

  const loadCommunity = async (communityId) => {
    try {
      const { data, error } = await getCommunityQuery({
        variables: {
          communityId,
        },
      });
      // setRefreshing(true);
      if (error) {
        console.log("getCommunityQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        console.log(JSON.stringify(data, null, 2));
        setCommunity(data.communityGet);
      }
    } finally {
      // setRefreshing(false);
    }
  };

  useEffect(() => {
    if (route.params?.id) loadCommunity(route.params.id);
  }, [route]);

  if (!community) return null;

  return (
    <ScrollView>
      <Box pb={5}>
        <VStack>
          <Box bgColor={"white"} alignItems={"center"}>
            <Image
              source={Object({
                uri: AppConfig.rootUri + community.assetUri,
              })}
              alt={community.name}
              // size="xl"
              resizeMode="contain"
              width={"150px"}
              height={"150px"}
            />
            <Text fontSize={"22px"} fontWeight={700} mb={3}>
              {community.name}
            </Text>
          </Box>

          <VStack space={3} padding={"13px"}>
            <Text
              variant={"paragraph1"}
              colorScheme={"primary"}
              fontWeight={"bold"}
            >
              {t("litter:screens.community.aboutUs")}
            </Text>
            {community.about && <Text>{community.about}</Text>}
            <CommunityStatistics community={community}/>
            <VStack space={3}>
              <Button onPress={() => goBack()}>
                {t("litter:screens.community.back")}
              </Button>
              <Button
                variant={"outline"}
                onPress={() => setShowLeaveModal(true)}
              >
                {t("litter:screens.community.leave")}
              </Button>
            </VStack>
          </VStack>
        </VStack>
        <LeaveCommunityModal
          community={community}
          show={showLeaveModal}
          onModalClosed={() => setShowLeaveModal(false)}
          onLeft={() => {
            setShowLeaveModal(false);
            goBack();
          }}
        />
      </Box>
    </ScrollView>
  );
};

export default CommunityDetails;
