import { Box, Button, HStack, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { useState,  } from "react";

import { useNavigation } from "@react-navigation/native";
import { Pressable, Linking } from "react-native";
import LogOutModal from "./LogOutModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { FilledFacebookThemed, FilledInstagramThemed, FilledLinkedinThemed } from "../../../Components/ThemedSVGs";

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

  const socialMediaPlatforms = [
    {
      title: 'The Click BXL',
      facebookUrl: 'http://www.facebook.com/theclickbxl/',
      instagramUrl: 'https://www.instagram.com/theclickbxl/',
      linkedinUrl: 'https://www.linkedin.com/company/the-click-bxl/',
    },
    {
      title: 'De Click Vlaanderen',
      facebookUrl: 'http://www.facebook.com/declickvlaanderen/',
      instagramUrl: 'https://www.instagram.com/declick_vlaanderen/',
      linkedinUrl: 'https://www.linkedin.com/company/de-click-vlaanderen/',
    },
    {
      title: 'De Click aan zee',
      facebookUrl: 'http://www.facebook.com/declickaanzee/',
      instagramUrl: 'https://www.instagram.com/declick_aanzee/',
      linkedinUrl: 'http://www.linkedin.com/company/de-click-aan-zee/',
    },
    {
      title: 'Le Click Wallonie',
      facebookUrl: 'http://www.facebook.com/leclickwallonie/',
      instagramUrl: 'https://www.instagram.com/leclick_wallonie/',
      linkedinUrl: 'http://www.linkedin.com/company/le-click-wallonie/',
    },
  ]

  const socialMediaLinks = socialMediaPlatforms.map((platform) => {
    return {
      title: platform.title,
      links: [
        { url: platform.facebookUrl, icon: <FilledFacebookThemed /> },
        { url: platform.instagramUrl, icon: <FilledInstagramThemed /> },
        { url: platform.linkedinUrl, icon: <FilledLinkedinThemed /> },
      ],
    }
  })

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
      >
        {t("litter:screens.dashboard.tabs.profile.logout")}
      </Button>
      <LogOutModal show={showLogOutModal} onClose={() => setShowLogOutModal(false)}/>
      <DeleteAccountModal show={showDeleteAccountModal} onClose={() => setShowDeleteAccountModal(false)}/>
      <Box mb={10} mt={10}>
        <Text variant={'paragraph1'} mb={2}>
          {t('litter:screens.dashboard.tabs.profile.followUs')}
        </Text>

          <Box
            flexDirection={'row'}
            flexWrap={'wrap'}
            mb={4}
          >
            {socialMediaLinks.map((link) => (
              <Box key={link.title} mb={4} w={'50%'}>
                <Text variant={'paragraph1'} fontWeight={'bold'} color={'primary.600'}>
                  {link.title}
                </Text>
                <HStack space={2}>
                  {link.links.map((link) => (
                    <Pressable
                      key={link.url}
                      onPress={() => Linking.openURL(link.url)}
                    >
                      {link.icon}
                    </Pressable>
                  ))}
                </HStack>
              </Box>
            ))}
          </Box>
    
        <Text variant={'paragraph2'} color={'gray.600'}>
          {t('litter:screens.dashboard.tabs.profile.appVersion')} 3.0
        </Text>

        <Text variant={'paragraph2'} color={'gray.600'}>
          {t('litter:screens.dashboard.tabs.profile.lookAt')}{'  '}
          <Text
            variant={'paragraph2'}
            color={'black'}
            underline
            onPress={() => Linking.openURL('www.the-click.be')}
          >
            www.the-click.be
            </Text>
        </Text>
      </Box> 
    </Box>
  );
};

export default ProfileOptions;
