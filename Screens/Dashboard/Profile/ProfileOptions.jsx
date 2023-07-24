import { Box, Button, HStack, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { useState,  } from "react";

import { useNavigation } from "@react-navigation/native";
import { Pressable, Linking } from "react-native";
import LogOutModal from "./LogOutModal";
import DeleteAccountModal from "./DeleteAccountModal";

const ProfileOptions = () => {
  const { t } = useTranslation();

  const { navigate } = useNavigation();

  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);


  const handleLegalLink = async () => {
    await Linking.openURL("https://uat.the-click.app/terms");
  };

  const handlePrivacyLink = async () => {
    await Linking.openURL("https://uat.the-click.app/privacy");
  };

  return (
    <Box bgColor="gray.100" px={30} pt={15} flexGrow={1}>
      <Text variant={"paragraph1"} fontWeight={"bold"}>
        {t("litter:screens.dashboard.tabs.profile.account")}
      </Text>
      <Box my={3} borderRadius={12} borderWidth={1} borderColor={"primary.600"}>
        <VStack>
          <Pressable onPress={() => navigate("PersonalDetails")}>
            <Box
              bgColor="white"
              borderTopRadius={12}
              borderBottomWidth={1}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.personalDetails")}
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => navigate("ChangePassword")}>
            <Box
              bgColor="white"              
              borderBottomWidth={1}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.changePassword")}
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setShowDeleteAccountModal(true)}>
          <Box
              bgColor="white"
              borderBottomRadius={12}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.deleteAccount")}
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => {
            navigate("Preferences")
          }}>
          <Box
              bgColor="white"
              borderBottomRadius={12}
              borderTopWidth={1}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.preferences")}
              </Text>
            </Box>
          </Pressable>         
        </VStack>
      </Box>
      <Text variant={"paragraph1"} fontWeight={"bold"}>
        {t("litter:screens.dashboard.tabs.profile.general")}
      </Text>
      <Box my={3} borderRadius={12} borderWidth={1} borderColor={"primary.600"}>
        <VStack>
          <Pressable onPress={() => navigate("FAQ")}>
            <Box
              bgColor="white"
              borderTopRadius={12}
              borderBottomWidth={1}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.faq")}
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={handleLegalLink}>
            <Box
              bgColor="white"
              borderBottomWidth={1}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.legal")}
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={handlePrivacyLink}>
            <Box
              bgColor="white"
              borderBottomWidth={1}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.privacy")}
              </Text>
            </Box>
          </Pressable>

          <Pressable onPress={() => navigate("About")}>
            <Box
              bgColor="white"
              borderBottomRadius={12}
              borderColor={"primary.600"}
              py={3}
              pl={30}
            >
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.profile.about")}
              </Text>
            </Box>
          </Pressable>
        </VStack>
      </Box>
      <Button
        variant={"main"}
        colorScheme={"primary"}
        onPress={() => setShowLogOutModal(true)}
        bg={"white"}
        mb={12}
      >
        {t("litter:screens.dashboard.tabs.profile.logout")}
      </Button>
      <LogOutModal show={showLogOutModal} onClose={() => setShowLogOutModal(false)}/>
      <DeleteAccountModal show={showDeleteAccountModal} onClose={() => setShowDeleteAccountModal(false)}/>
    </Box>
  );
};

export default ProfileOptions;
