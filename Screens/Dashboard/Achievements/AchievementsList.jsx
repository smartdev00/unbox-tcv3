import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ScrollView,
  Text,
  VStack,
  ZStack,
} from "native-base";

import { Dimensions } from "react-native";

import { useTranslation } from "react-i18next";

import { SvgUri } from "react-native-svg";

import { AppConfig } from "../../../config";


import { useMutation, gql } from "@apollo/client";
import * as mutations from "../../../graphql/mutations";

const ClaimAchievementModal = ({ show, onModalClosed, achievement, onClaimed }) => {
  const { t } = useTranslation();

  const [claimBadge] = useMutation(gql(mutations.claimBadge), {
    fetchPolicy: "no-cache",
  });


  const handleClaimed = async () => {
    const { data } = await claimBadge({
      variables: {
        id: achievement.id,        
      },
      onError(err) {
        
      },
    });

    if (data) {
      onModalClosed();
      onClaimed();
    }
  }


  const handleModalClose = () => {
    if (onModalClosed) {
      onModalClosed();
    }
  };

  return (
    <Modal isOpen={show} onClose={handleModalClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
            {achievement.name}
          </Text>
          <Text>{achievement.descriptions.won}</Text>
          <Box alignItems={"center"} mt={5}>
            <SvgUri uri={AppConfig.rootUri + achievement.images.won} />
          </Box>

          <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
            {t("litter:screens.achievements.claimModal.reward")}
          </Text>
          <Text>{achievement.reward}</Text>
          <VStack space={2} mt={3}>
            <Button onPress={() => handleClaimed()}>{t("litter:screens.achievements.claimModal.button.claim")}</Button>
            <Button variant={"outline"} onPress={() => handleModalClose()}>
              {t("litter:screens.achievements.claimModal.button.cancel")}
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const Achievement = ({ achievement, screenWidth, onClaimed }) => {

  const { t } = useTranslation();
  const [showClaimModal, setShowClaimModal] = useState(false);

  return (
    <>
      <Box width={(screenWidth - 40) / 3} p={1} m={1}>
        
        <ZStack alignItems="center" justifyContent="center" width={(screenWidth - 40) / 3 - 10} height={(screenWidth - 40) / 3 - 10}>
          <SvgUri
            width={(screenWidth - 40) / 3 - 10}
            height={(screenWidth - 40) / 3 - 10}
            alignSelf={"center"}
            uri={
              achievement.won || achievement.claimed
                ? AppConfig.rootUri + achievement.images.won
                : AppConfig.rootUri + achievement.images.unwon
            }
          />
          {achievement.won && !achievement.claimed && (
            <Button size={"sm"} onPress={() => setShowClaimModal(true)}>{t("litter:screens.achievements.button.claimBadge")}</Button>
          )}
        </ZStack>
        
        <Text fontWeight={700}>{achievement.name}</Text>
        <Text>
          {achievement.won || achievement.claimed
            ? achievement.descriptions.won
            : achievement.descriptions.unwon}
        </Text>

        {/* <Image
        width={"100px"}
        height={"100px"}
        source={Object({ uri: achievement.imageUrlUnwon })}
        // source={Object({ uri: AppConfig.rootUri + achievement.imageUrlUnwon })}
        alt={achievement.name}
      /> */}
      </Box>
      <ClaimAchievementModal
        show={showClaimModal}
        onModalClosed={() => setShowClaimModal(false)}
        achievement={achievement}
        onClaimed={onClaimed}
      />
    </>
  );
};

const AchievementsList = ({ achievements, onClaimed, }) => {
  const screenWidth = Dimensions.get("window").width;

  if (!achievements || achievements === []) return <Text>No Achievements</Text>;

  return (
    <Box alignItems={"center"}>
      <HStack flexWrap={"wrap"}>
        {achievements.map((achievement, key) => (
          <Achievement
            achievement={achievement}
            key={key}
            screenWidth={screenWidth}
            onClaimed={onClaimed}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default AchievementsList;
