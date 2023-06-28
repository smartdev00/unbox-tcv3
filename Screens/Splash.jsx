import React, { useCallback, useContext, useEffect, useState } from "react";
import { LocaleContext } from "../Context";
import { TouchableOpacity, View } from "react-native";
import { Button, Image, Text, VStack, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import { useTranslation } from "react-i18next";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Splash = ({onClickGo }) => {
  const [locale, setLocale] = useContext(LocaleContext);
  const { t } = useTranslation();
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const [selectedTab, setSelectedTab] = useState("en");
  const tabs = [
    { id: "en", label: "EN" },
    { id: "fr", label: "FR" },
    { id: "nl", label: "NL" },
  ];

  const handleLangSelect = (lang) => {
    setLocale({
      language: lang
    });
    setSelectedTab(lang);
  };

  const handleStartClick = async () => {
    onClickGo();
  };

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <VStack justifyContent={"center"} flex={1} bg={"#EB1878"}>
      <VStack alignItems={"center"}>
        <UnboxLitterSVG white={true} />
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleLangSelect(tab.id)}
              style={{
                marginHorizontal: 8,
              }}
            >
              <Text fontSize={"20px"} fontWeight={700} mb={50}
                color={(tab.id === selectedTab) ? "#FFFFFF" : "#9B0048"}
              >{tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </VStack>
      <VStack
        alignItems={"center"}
        style={{
          width: "100%",
          position: "absolute",
          bottom: 60,
        }}
      >
        <Pressable onPress={() => handleStartClick()}>
          <Image
            source={require("../assets/images/let-go.png")}
            alt="search reset"
            w="80px"
            h="80px"
          />
        </Pressable>
      </VStack>
    </VStack>
  );
}

export default Splash;
