// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import { useNavigation } from "@react-navigation/native";

import { Box, HStack, Text } from "native-base";
import { useTranslation } from "react-i18next";

const Achievements = () => {

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
            setParams({ tab: "achievements"})
          }
        >
          {t("litter:screens.dashboard.tabs.homepage.seeAllAchievements")}
        </Text>
      </HStack>
    </Box>
  );
};

export default Achievements;
