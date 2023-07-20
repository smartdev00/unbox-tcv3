import { Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import UnboxLitterSvg from "../Components/UnboxLitterSVG";
import {
  Box,
  Button,
  FormControl,
  Input,
  ScrollView,
  View,
  Text,
  useTheme,
} from "native-base";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n/config";
import { useNavigation } from "@react-navigation/native";

const Preferences = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [allowPushNotifications, setAllowPushNotifications] = useState(false);

  const handleToggleNotifications = () => {
    setAllowPushNotifications((previousState) => !previousState);
  };

  const handleSave = async () => {
    
    console.log("handleSave");
    console.log("selectedLang", selectedLang);
    console.log("allowPushNotifications", allowPushNotifications);

    i18n.changeLanguage(selectedLang);
    navigation.goBack();
  };


  return (
    <ScrollView
      bgColor="white"
      _contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Box alignItems={"center"} mt={85} mb={101}>
        <UnboxLitterSvg />
      </Box>

      <Box bgColor="gray.100" p={6} flexGrow={1}>
        <Text variant={"paragraph1"} fontWeight={"bold"} mb={6}>
          {t("litter:screens.dashboard.tabs.profile.preferences.title")}
        </Text>

        <FormControl
          mb={3}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControl.Label>
            <Text variant={"body1"} fontSize={14}>
            {t("litter:screens.dashboard.tabs.profile.preferences.language")}
            </Text>
          </FormControl.Label>
          <View style={{ flexDirection: "row" }}>
            {languages.map((l, key) => (
              <TouchableOpacity
                key={l.language}
                onPress={() => {
                  setSelectedLang(l.language);
                }}
                style={{
                  marginHorizontal: 8,
                }}
              >
                <Text
                  color={
                    l.language === selectedLang
                      ? colors["primary"]["600"]
                      : colors["gray"]["600"]
                  }
                  textTransform={"uppercase"}
                >
                  {l.language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FormControl>

        <FormControl
          mb={3}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <FormControl.Label>
            <Text variant={"body1"} fontSize={14}>
            {t("litter:screens.dashboard.tabs.profile.preferences.allowPushNotifications")}
            </Text>
          </FormControl.Label>
          <View style={{ flexDirection: "row" }}>
            <Switch
              backgroundColor={"primary"}
              onValueChange={handleToggleNotifications}
              value={allowPushNotifications}
              trackColor={{ true: colors["primary"]["600"], false: colors["gray"]["600"] }}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
          </View>
        </FormControl>
        <Button onPress={handleSave} mt={50}>
          {t("litter:screens.dashboard.tabs.profile.changePassword.button")}
        </Button>
      </Box>
    </ScrollView>
  );
};

export default Preferences;