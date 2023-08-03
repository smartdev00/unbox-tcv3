import { Alert, Switch, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UnboxLitterSvg from "../Components/UnboxLitterSVG";
import {
  Box,
  Button,
  FormControl,
  ScrollView,
  View,
  Text,
  useTheme,
} from "native-base";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n/config";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context";
import { gql, useMutation } from "@apollo/client";
import * as mutations from '../graphql/mutations'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Preferences = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const [user, setUser] = useContext(UserContext)

  const [allowPushNotifications, setAllowPushNotifications] = useState(
    Boolean(user.appPushId)
  );

  const [setAppPushId] = useMutation(gql(mutations.setAppPushId), {
    fetchPolicy: 'no-cache',
  })

  const handleToggleNotifications = () => {
    setAllowPushNotifications((prev) => !prev);
  };

  const handleSave = async () => {
    try {

      if (selectedLang !== i18n.language) {
        i18n.changeLanguage(selectedLang);
      }      

      const deviceToken = allowPushNotifications
        ? await AsyncStorage.getItem("unbox-litter-the-click-3-appPushId")
        : "";

      updateAppPushId(deviceToken);

      navigation.goBack();

    } catch (error) {
      console.error("Error handling save:", error);
    }
  };

  const updateAppPushId = async (deviceToken) => {
    const input = {
      appPushId: deviceToken,
    };

    try {
      await setAppPushId({
        variables: {
          input,
        },
      });

      setUser({
        ...user,
        appPushId: deviceToken,
      });

      console.log("Successfully set app push ID:", deviceToken);

      await AsyncStorage.setItem(
        "unbox-litter-the-click-3-user",
        JSON.stringify({
          ...user,
          appPushId: deviceToken,
        })
      );

    } catch (error) {
      console.error("Error setting app push ID:", error);
    }
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