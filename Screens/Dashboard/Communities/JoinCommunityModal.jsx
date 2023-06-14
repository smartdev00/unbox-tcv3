import React, { useState } from "react";

import { StyleSheet } from "react-native";

import { Box, Button, Divider, Image, Modal, Text, VStack } from "native-base";

import { useTranslation } from "react-i18next";

import { useMutation, gql } from "@apollo/client";
import * as mutations from "../../../graphql/mutations";

import { AppConfig } from "../../../config";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const JoinCommunityModal = ({ show, onModalClosed, community, onJoined }) => {
  const { t } = useTranslation();

  const [joinCommunity] = useMutation(gql(mutations.joinCommunity), {
    fetchPolicy: "no-cache",
  });

  const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 1,
      margin: 2,
      borderColor: "#00000030",
      textAlign: "center",
    },
    focusCell: {
      borderColor: "#000",
    },
  });

  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const [pinIncorrect, setShowPinIncorrect] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleModalClose = () => {
    setValue("");
    if (onModalClosed) {
      onModalClosed();
    }
  };

  const handleJoin = async () => {
    const { data } = await joinCommunity({
      variables: {
        id: community.id,
        pin: value,
      },
      onError(err) {
        if (err.graphQLErrors[0].exception === "PermissionDenied") {
          setShowPinIncorrect(true);
        }
      },
    });

    if (data) {
      onModalClosed();
      onJoined();
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
            {t("litter:screens.communities.joinModal.title")}
          </Text>
          <Divider my={2} />
          <Text
            variant={"paragraph1"}
            colorScheme={"primary"}
            fontWeight={"bold"}
          >
            {community.name}
          </Text>
          <Text>{t("litter:screens.communities.joinModal.instructions")}</Text>

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
            />

            <Box m={3}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Box key={index}>
                    <Text
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </Box>
                )}
              />
            </Box>
            {pinIncorrect && (
              <Text my={3}>
                {t("litter:screens.communities.joinModal.incorrectPIN")}
              </Text>
            )}
            <VStack space={1} w={"100%"}>
              <Button
                _text={Object({
                  color: "white",
                  fontWeight: 700,
                })}
                onPress={() => handleJoin()}
              >
                {t("litter:screens.communities.joinModal.button.join")}
              </Button>
              <Button
                bgColor="white"
                _text={Object({
                  color: "primary.600",
                  fontWeight: 700,
                })}
                onPress={() => handleModalClose()}
              >
                {t("litter:screens.communities.joinModal.button.cancel")}
              </Button>
            </VStack>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default JoinCommunityModal;
