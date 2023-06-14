import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Keyboard, TouchableWithoutFeedback } from "react-native";

import { UserContext } from "../Context";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import {
  Avatar,
  Box,
  Button,
  Center,
  Circle,
  FormControl,
  Input,
  Modal,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
} from "native-base";

import * as Components from "../Components";

import * as ProfileTabs from "./ProfileTabs";

import { EmptyProfileAvatar } from "../assets/svg";

const ProfilePhotoModal = ({ show, onModalClose, onSubmit }) => {
  const { t } = useTranslation();

  const [image, setImage] = useState();

  const handleModalClose = () => {
    if (onModalClose) onModalClose();
  };

  const handleCancelPress = () => {
    if (!image) handleModalClose();
    else setImage();
  };

  const processImage = (result) => {
    setImage(result.assets[0].uri);
  };

  const showCamera = async () => {
    const result = await launchCamera({
      mediaType: "photo",
    });
    if (!result.didCancel) {
      processImage(result);
    }
  };

  const showLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
    });
    if (!result.didCancel) {
      processImage(result);
    }
  };

  return (
    <Modal isOpen={show} onClose={handleModalClose} size={"xl"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body alignItems={"center"}>
          <Text mt={3} color="primary.500" fontSize={24} fontWeight={700}>
            {t("screens.profile.photo-modal.title")}
          </Text>
          <Box my={5}>
            <EmptyProfileAvatar height={90} width={90} />
          </Box>

          {image ? (
            <Button
              mt={5}
              mb={3}
              bgColor="primary.500"
              _text={Object({
                textTransform: "uppercase",
              })}
              onPress={() => showCamera()}
            >
              {t("buttons.save")}
            </Button>
          ) : (
            <>
              <Button
                mt={5}
                mb={3}
                bgColor="primary.500"
                _text={Object({
                  textTransform: "uppercase",
                })}
                onPress={() => showCamera()}
              >
                {t("screens.profile.photo-modal.camera")}
              </Button>
              <Button
                mb={3}
                bgColor="primary.500"
                _text={Object({
                  textTransform: "uppercase",
                })}
                onPress={() => showLibrary()}
              >
                {t("screens.profile.photo-modal.library")}
              </Button>
            </>
          )}

          <Pressable my={3} onPress={() => handleCancelPress()}>
            <Text textTransform={"uppercase"} color={"primary.500"}>
              {t("buttons.cancel")}
            </Text>
          </Pressable>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const TabButton = ({ selectedTab, tab, onPress }) => {
  const { t } = useTranslation();

  return (
    <Pressable bg={selectedTab === tab ? "white" : "primary.100"} p={2}>
      <Text
        color={selectedTab === tab ? "primary.500" : "secondary.400"}
        bg={selectedTab === tab ? "white" : "primary.100"}
        fontSize={16}
        fontWeight={700}
        textTransform={"uppercase"}
        onPress={() => onPress()}
      >
        {t(`screens.profile.tabs.${tab}.title`)}
      </Text>
    </Pressable>
  );
};

const Profile = ({ navigation }) => {
  const [user] = useContext(UserContext);

  console.log(user);

  const [selectedTab, setSelectedTab] = useState("profile");
  const { t } = useTranslation();

  const [givenName, setGivenName] = useState(user.givenName);
  const [familyName, setFamilyName] = useState(user.familyName);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);

  const handleChange = (text, name) => {
    if (name === "givenName") setGivenName(text);
    if (name === "familyName") setFamilyName(text);
    if (name === "username") setUsername(text);
    if (name === "password") setPassword(text);
    if (name === "confirmPassword") setConfirmPassword(text);
  };

  const handleSelectedTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const saveProfileChanges = () => {
    console.log(familyName, givenName, username);
  };

  useEffect(() => {
    console.log(showProfilePhotoModal);
  }, [showProfilePhotoModal]);

  //<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

  return (
    <Box pt={3} flex={1} bgColor={"primary.50"} alignItems={"center"}>
      <Text
        mt={3}
        color="primary.500"
        fontSize={24}
        fontWeight={700}
        textTransform={"uppercase"}
      >
        {t("screens.profile.title")}
      </Text>
      <Box my={5}>
        <Pressable onPress={() => setShowProfilePhotoModal(true)}>
          <EmptyProfileAvatar height={90} width={90} />
        </Pressable>
      </Box>
      <Box flex={1} width={"100%"} px={0} mx={0}>
        <Row justifyContent={"space-evenly"} width={"100%"} bg={"primary.100"}>
          <TabButton
            selectedTab={selectedTab}
            tab={"profile"}
            onPress={() => handleSelectedTabChange("profile")}
          />
          <TabButton
            selectedTab={selectedTab}
            tab={"settings"}
            onPress={() => handleSelectedTabChange("settings")}
          />
          <TabButton
            selectedTab={selectedTab}
            tab={"faq"}
            onPress={() => handleSelectedTabChange("faq")}
          />
          <TabButton
            selectedTab={selectedTab}
            tab={"about"}
            onPress={() => handleSelectedTabChange("about")}
          />
        </Row>

        <ScrollView flex={1} bgColor="white">
          <View onStartShouldSetResponder={() => true}>
            {selectedTab === "profile" && (
              <ProfileTabs.ProfileTab user={user} />
            )}
            {selectedTab === "settings" && (
              <ProfileTabs.SettingsTab user={user} />
            )}
            {selectedTab === "faq" && <ProfileTabs.FAQTab />}
            {selectedTab === "about" && <ProfileTabs.AboutTab />}
          </View>
        </ScrollView>
      </Box>
      <ProfilePhotoModal
        show={showProfilePhotoModal}
        onModalClose={() => setShowProfilePhotoModal(false)}
      />
    </Box>
  );
};

export default Profile;
