import React, { useState } from "react";

import {
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  Text,
  VStack,
  useTheme,
} from "native-base";

import { useTranslation } from "react-i18next";


import { useMutation, gql } from "@apollo/client";
import * as mutations from "../../graphql/mutations";

import {
  Clean,
  Dirty,
  Okay,
  LitterBottle,
  LitterCan,
  LitterCarton,
  LitterCigarette,
  LitterGum,
  LitterPaper,
  LitterPlastic,
  LitterPlasticBottle,
  LitterOther,
} from "../../assets/svg";

const CleanlinessTypes = {
  DIRTY: 25,
  OKAY: 50,
  CLEAN: 75,
};

const PostRecordingModalTypes = {
  CLEANLINESS: "cleanliness",
  SUMMARY: "summary",
};



const CleanlinessLabel = ({ cleanliness }) => {
  const { t } = useTranslation();

  switch (cleanliness) {
    case CleanlinessTypes.DIRTY:
      return (
        <Text fontWeight={500} color={"cleanlinessDirty"}>
          {t("litter:screens.map.cleanlinessModal.dirty")}
        </Text>
      );
    case CleanlinessTypes.OKAY:
      return (
        <Text fontWeight={500} color={"cleanlinessOkay"}>
          {t("litter:screens.map.cleanlinessModal.okay")}
        </Text>
      );
    case CleanlinessTypes.CLEAN:
      return (
        <Text fontWeight={500} color={"cleanlinessClean"}>
          {t("litter:screens.map.cleanlinessModal.clean")}
        </Text>
      );
    default:
      return <Text>{cleanliness}</Text>;
  }
};

const LitterIcon = ({ type }) => {
  const { colors } = useTheme();

  switch (type) {
    case "cigarette":
      return <LitterCigarette fillColor={colors.primary["600"]} />;
    case "paper":
      return <LitterPaper fillColor={colors.primary["600"]} />;
    case "plasticBottle":
      return <LitterPlasticBottle fillColor={colors.primary["600"]} />;
    case "can":
      return <LitterCan fillColor={colors.primary["600"]} />;
    case "glassBottle":
      return <LitterBottle fillColor={colors.primary["600"]} />;
    case "drinkCarton":
      return <LitterCarton fillColor={colors.primary["600"]} />;
    case "chewingGum":
      return <LitterGum fillColor={colors.primary["600"]} />;
    case "otherPlastic":
      return <LitterPlastic fillColor={colors.primary["600"]} />;
    case "other":
      return <LitterOther fillColor={colors.primary["600"]} />;
    default:
      return null;
  }
};

const CleanlinessPage = ({ onCleanlinessChanged }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header bg={"white"} pb={3} mx={1}>
        <Text fontSize={18} fontWeight={"bold"} color={"primary.600"}>
          {t("litter:screens.map.cleanlinessModal.title")}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text>{t("litter:screens.map.cleanlinessModal.header")}</Text>
        <Text>{t("litter:screens.map.cleanlinessModal.text")}</Text>
        <VStack space={2} mt={3} mx={3}>
          <Button
            onPress={() => onCleanlinessChanged(CleanlinessTypes.DIRTY)}
            bg={"cleanlinessDirty"}
          >
            <HStack alignItems={"center"}>
              <Dirty />
              <Text color={"white"}>
                {t("litter:screens.map.cleanlinessModal.dirty")}
              </Text>
            </HStack>
          </Button>
          <Button
            onPress={() => onCleanlinessChanged(CleanlinessTypes.OKAY)}
            bg={"cleanlinessOkay"}
          >
            <HStack alignItems={"center"}>
              <Okay />
              <Text color={"white"}>
                {t("litter:screens.map.cleanlinessModal.okay")}
              </Text>
            </HStack>
          </Button>
          <Button
            onPress={() => onCleanlinessChanged(CleanlinessTypes.CLEAN)}
            bg={"cleanlinessClean"}
          >
            <HStack alignItems={"center"}>
              <Clean />
              <Text color={"white"}>
                {t("litter:screens.map.cleanlinessModal.clean")}
              </Text>
            </HStack>
          </Button>
        </VStack>
      </Modal.Body>
    </>
  );
};

const SummaryPage = ({ recordingSummary, onModalClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header bg={"white"} pb={3} mx={1}>
        <Text fontSize={18} fontWeight={"bold"} color={"primary.600"}>
          {t("litter:screens.map.summaryModal.title")}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.map.summaryModal.header")}
        </Text>
        <Text>
          {t("litter:screens.map.summaryModal.text", {
            currency: "CUC",
          })}
        </Text>
        <Box
          borderWidth={1}
          borderColor={"primary.600"}
          padding={"13px"}
          rounded={12}
          my={3}
        >
          <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
            {t("litter:screens.map.summaryModal.summary.title")}
          </Text>
          <Divider my={1} />
          <VStack>
            <HStack justifyContent={"space-between"} mb={1}>
              <Text>
                {t("litter:screens.map.summaryModal.summary.totalDistance")}
              </Text>
              <Text>{recordingSummary.totalDistance}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text>
                {t("litter:screens.map.summaryModal.summary.totalScans")}
              </Text>
              <Text>{recordingSummary.totalScans}</Text>
            </HStack>
            <Box my={1}>
            {recordingSummary.items.map((item, key) => (
              <HStack key={key} justifyContent={"space-between"}>
                <HStack justifyContent={"flex-start"} space={2}>
                  <Box ml={3}>
                  <LitterIcon type={item.type} />
                  </Box>
                  <Text>
                    {t(`litter:screens.map.summaryModal.summary.${item.type}`)}
                  </Text>
                </HStack>
                <Text>x {item.value}</Text>
              </HStack>
            ))}
            </Box>
            <HStack justifyContent={"space-between"} mb={1}>
              <Text>
                {t("litter:screens.map.summaryModal.summary.earned", {
                  currency: "CUC",
                })}
              </Text>
              <Text>{recordingSummary.earned} CUC</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text>
                {t("litter:screens.map.summaryModal.summary.cleanliness")}
              </Text>
              <CleanlinessLabel cleanliness={recordingSummary.cleanliness} />
            </HStack>
          </VStack>
        </Box>
        <Button onPress={() => onModalClose()}>Continue</Button>
      </Modal.Body>
    </>
  );
};

const PostRecordingModal = ({
  show,
  onModalClose,
  gpx,  
}) => {
  const [cleanliness, setCleanliness] = useState();
  const [modalState, setModalState] = useState(
    PostRecordingModalTypes.CLEANLINESS
  );

  const [recordingSummary, setRecordingSummary] = useState();

  const [createPlog] = useMutation(gql(mutations.createPlog), {
    fetchPolicy: "no-cache",
  });

  const handleCleanlinessChanged = async (cleanliness) => {
    console.log(cleanliness);
    setCleanliness(cleanliness);

    console.log(gpx);

    const { data } = await createPlog({
      variables: {
        route: gpx,
        score: cleanliness
      },
      onError(err) {  
        console.log(err);
        onModalClose()
      },
    });

    if (data) {
      console.log(data);


      setRecordingSummary({
        totalDistance: data.plogCreate.distance,
        totalScans: data.plogCreate.litter.length,
        items: [
          { type: "cigarette", value: data.plogCreate.litter.filter(l => l.productType == "cigarette").length },
          { type: "paper", value: data.plogCreate.litter.filter(l => l.productType == "paper").length },
          { type: "plasticBottle", value: data.plogCreate.litter.filter(l => l.productType == "plastic-bottle").length },
          { type: "can", value: data.plogCreate.litter.filter(l => l.productType == "can").length },
          { type: "glassBottle", value: data.plogCreate.litter.filter(l => l.productType == "glass-bottle").length },
          { type: "drinkCarton", value: data.plogCreate.litter.filter(l => l.productType == "drink-carton").length },
          { type: "chewingGum", value: data.plogCreate.litter.filter(l => l.productType == "chewing-gum").length },
          { type: "otherPlastic", value: data.plogCreate.litter.filter(l => l.productType == "other-plastic").length },
          { type: "other", value: data.plogCreate.litter.filter(l => l.productType == "other").length },
        ],
        earned: data.plogCreate.credits.reduce(
          (a, b) => a + b.amount, 0,
        ),
        cleanliness: data.plogCreate.score,        
      });

      // setRecordingSummary(data.plogCreate);
      setModalState(PostRecordingModalTypes.SUMMARY);
    }
  };

  const handleCloseModal = () => {
    setModalState(PostRecordingModalTypes.CLEANLINESS);
    setRecordingSummary();
    onModalClose()
  }

  const modalPage = () => {
    {
      switch (modalState) {
        case PostRecordingModalTypes.CLEANLINESS:
          return (
            <CleanlinessPage
              onCleanlinessChanged={(c) => handleCleanlinessChanged(c)}
            />
          );
        case PostRecordingModalTypes.SUMMARY:
          return <SummaryPage recordingSummary={recordingSummary} onModalClose={() => handleCloseModal()} />;
        default:
          return null;
      }
    }
  };

  return (
    <Modal isOpen={show} onClose={() => handleCloseModal()} size={"xl"}>
      <Modal.Content>{modalPage()}</Modal.Content>
    </Modal>
  );
};

export default PostRecordingModal;
