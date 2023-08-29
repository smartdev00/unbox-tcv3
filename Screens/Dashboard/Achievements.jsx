// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import { useNavigation } from "@react-navigation/native";

import { Box, HStack, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { SvgUri } from "react-native-svg";
import AchievementsProgress from './Achievements/AchievementsProgress';
import { AppConfig } from "../../config";

const Achievements = ({ targets }) => {

  const { t } = useTranslation();
  const { replace, push, navigate, setParams, } = useNavigation();

  return (
    <Box
      borderWidth={1}
      borderColor={"primary.600"}
      padding={"13px"}
      rounded={12}
      mb={3}
    >
      <VStack>
        <HStack justifyContent={"space-between"} mb={3}>
          <HStack space={2}>
            <Text variant={"body2"} fontWeight={"bold"}>
              {t("litter:screens.dashboard.tabs.homepage.achievements")}
            </Text>
          </HStack>
          <Text
            variant={"paragraph2"}
            colorScheme={"primary"}
            fontWeight={"bold"}
            onPress={() =>
              setParams({ tab: "achievements" })
            }
          >
            {t("litter:screens.dashboard.tabs.homepage.seeAllAchievements")}
          </Text>
        </HStack>

        <Box alignItems={"center"}>
          <SvgUri
            width={85}
            height={85}
            alignSelf={"center"}
            uri={AppConfig.rootUri + "/assets/uploads/badges/14/Won.svg"}
          />
          <Text variant={"paragraph3"} mt={1}>
            Level 1/10
          </Text>
          <Text variant={"paragraph3"} fontWeight={"bold"} mt={1}>
            BRONZE Scanner
          </Text>
        </Box>

        <Box mt={4} ml={2} mb={1} mr={3}>
          <AchievementsProgress targets={targets} />
          <Text variant={"paragraph3"} mt={2} ml={1}>
            Scan 50 pieces of litter to unlock the next achievement badge!
          </Text>
        </Box>

      </VStack>
    </Box>
  );
};

export default Achievements;
