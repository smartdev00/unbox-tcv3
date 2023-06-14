import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { UserContext } from "../Context";
import { useNavigation } from '@react-navigation/native'; 
import {
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";


const PersonalDetails = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [user] = useContext(UserContext);

  return (
    <ScrollView bgColor="white">
      <Box bgColor="gray.100" p={6} flexGrow={1}>
        <Box
          borderWidth={1}
          borderColor={"primary.600"}
          bg={"white"}
          rounded={12}
          p={5}
        >
          <HStack justifyContent={"space-between"} mb={2}>
            <Text variant={"heading3"}>{t("litter:screens.dashboard.tabs.profile.personalDetails.title")}</Text>
            <Button
              // variant={"secondary"}
              onPress={() => navigate("EditDetails")}
              py={"10px"}
              px={14}
            >
              {t("litter:screens.dashboard.tabs.profile.personalDetails.button")}
            </Button>
          </HStack>
          <VStack>
            <Text variant={"paragraph2"} color={"#474747"}>
              {t("litter:screens.dashboard.tabs.profile.personalDetails.type")}
            </Text>
            <Text variant={"paragraph2"} mt={1}>
              Consumer
            </Text>
          </VStack>
          <Divider my={22} />
          <HStack>
            <VStack flex={1}>
              <Text variant={"paragraph2"} color={"#474747"}>
                {t("litter:screens.dashboard.tabs.profile.personalDetails.givenName")}
              </Text>
              <Text variant={"paragraph2"} mt={1}>
                {user.givenName}
              </Text>
            </VStack>
            <VStack flex={1}>
              <Text variant={"paragraph2"} color={"#474747"}>
                {t("litter:screens.dashboard.tabs.profile.personalDetails.familyName")}
              </Text>
              <Text variant={"paragraph2"} mt={1}>
                {user.familyName}
              </Text>
            </VStack>
          </HStack>
          <Divider my={22} />
          <VStack>
            <Text variant={"paragraph2"} color={"#474747"}>
              {t("litter:screens.dashboard.tabs.profile.personalDetails.email")}
            </Text>
            <Text variant={"paragraph2"} mt={1}>
              {user.email}
            </Text>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PersonalDetails;
