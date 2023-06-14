import { Box, Button, Divider, Image, Modal, Text, VStack } from "native-base";

import { useTranslation } from "react-i18next";

import { useMutation, gql } from "@apollo/client";
import * as mutations from "../../../graphql/mutations";

import { AppConfig } from "../../../config";

const LeaveCommunityModal = ({ show, onModalClosed, community, onLeft }) => {
  const { t } = useTranslation();

  const [leaveCommunity] = useMutation(gql(mutations.leaveCommunity), {
    fetchPolicy: "no-cache",
  });

  const handleModalClose = () => {
    if (onModalClosed) {
      onModalClosed();
    }
  };

  const handleLeave = async () => {
    const { data } = await leaveCommunity({
      variables: {
        id: community.id,
      },
      onError(err) {
        
      },
    });

    if (data) {
      onModalClosed();
      onLeft();
    }
  };

  return (
    <Modal isOpen={show} onClose={handleModalClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Text
            variant={"paragraph1"}
            colorScheme={"primary"}
            fontWeight={"bold"}
            fontSize={"22px"}
          >
            {t("litter:screens.communities.leaveModal.title")}
          </Text>
          <Divider my={2} />
          <Text
            variant={"paragraph1"}
            colorScheme={"primary"}
            fontWeight={"bold"}
          >
            {community.name}
          </Text>
          <Text>{t("litter:screens.communities.leaveModal.instructions")}</Text>
          <Box alignItems={"center"}>
            <Image
              source={Object({
                uri: AppConfig.rootUri + "/" + community.imageUrl,
              })}
              alt={community.name}
              // size="xl"
              resizeMode="contain"
              width={"100px"}
              height={"100px"}
              m={3}
            />

            <Text fontSize={"18px"} fontWeight={700}>
              {community.name}
            </Text>
          </Box>
          <VStack space={1} w={"100%"} mt={5}>
            <Button
              _text={Object({
                color: "white",
                fontWeight: 700,
              })}
              onPress={() => handleLeave()}
            >
              {t("litter:screens.communities.leaveModal.button.leave")}
            </Button>
            <Button
              bgColor="white"
              _text={Object({
                color: "primary.600",
                fontWeight: 700,
              })}
              onPress={() => handleModalClose()}
            >
              {t("litter:screens.communities.leaveModal.button.cancel")}
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default LeaveCommunityModal;
