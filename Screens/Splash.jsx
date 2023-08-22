import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Button, Image, Text, VStack, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import { useTranslation } from "react-i18next";
import * as SplashScreen from "expo-splash-screen";
import { languages } from '../i18n/config';
import * as mutations from '../graphql/mutations'
import { gql, useMutation } from "@apollo/client";

SplashScreen.preventAutoHideAsync();

const Splash = ({onClickGo }) => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  
  const [setLocale] = useMutation(gql(mutations.setLocale), {
    fetchPolicy: 'no-cache',
  })

  const handleLanguageSelect = async (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
  };

  const handleStartClick = async () => {
    setLocale({
      variables: {
        locale: selectedLang,
      },
    })
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
          {languages.map((l, key) => (
            <TouchableOpacity
              key={l.language}
              onPress={() => handleLanguageSelect(l.language)}
              style={{
                marginHorizontal: 8,
              }}
            >
              <Text fontSize={"20px"} fontWeight={700} mb={50}
                color={(l.language === selectedLang) ? "#FFFFFF" : "#9B0048"}
                textTransform={"uppercase"}
              >{l.language}
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
