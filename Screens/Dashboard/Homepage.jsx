import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useLazyQuery, gql, useMutation } from "@apollo/client";

import { ApplicationContext, BalanceContext, UserContext } from "../../Context";

import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

import messaging from '@react-native-firebase/messaging';

import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Camera, } from "expo-camera";
import * as Location from "expo-location";

import {
  Box,
  Button,
  Circle,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useTheme,
} from "native-base";

import Notifications from "./Notifications";
import { Statistics } from "./Statistics";
import Achievements from "./Achievements";



import { Merchant } from "../../assets/svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomepageTab = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [balance, setBalance] = useContext(BalanceContext);
  const [application, setApplication,] = useContext(ApplicationContext);
  const [user, setUser] = useContext(UserContext);
  const [retailersCount, setRetailersCount] = useState(0);
  const { navigate } = useNavigation();
  const [loaded, setLoaded] = useState(false);
  
  const [retailersCountQuery] = useLazyQuery(gql(queries.retailersCount), {
    fetchPolicy: "no-cache",
  });

  const [myBalanceQuery] = useLazyQuery(gql(queries.myBalance), {
    fetchPolicy: "no-cache",
  });

  const [geofencesQuery] = useLazyQuery(gql(queries.geofences), {
    fetchPolicy: "no-cache",
  });

  const updateBalance = async () => {
    try {      
      setBalance((b) => {
        return {
          ...b,
          updating: true,          
        }
      });

      console.log("update balance");
      const { data, error } = await myBalanceQuery();
      if (data) {
        setBalance((b) => {
          return {
            value: data.myBalance.remaining,
            updating: false,          
          }
        });                
      }
      if (error) {
        console.log(error);
      }
    } finally {
      setBalance((b) => {
        return {
          ...b,
          updating: false,          
        }
      });
    }
  };

  const loadRetailers = async () => {
    const { data, error } = await retailersCountQuery();
    if (error) {
      console.log("listRetailersQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      setRetailersCount(data.retailerList.count);
    }
  };

  const loadGeofences = async () => {    
    console.log("update geofences");
    const { data, error } = await geofencesQuery();
    if (data) {
      setApplication((a) => {
        return {
          ...a,
          geofences: data.geofences.items,
        }
      })
    }
    if (error) {
      console.log(error);
    }
  }


  const [setAppPushId] = useMutation(gql(mutations.setAppPushId), {
    fetchPolicy: 'no-cache',
  })

  const AfterLogin = async () => {

    console.log("AfterLogin");
    const deviceToken = await AsyncStorage.getItem("unbox-litter-the-click-3-appPushId");
    if (!deviceToken) {
      try {
        const deviceToken = await messaging().getToken();
    
        console.log("Device Token:", deviceToken);
    
        if (deviceToken) {
          const input = {
            appPushId: deviceToken,
          };
    
          try {
            await setAppPushId({
              variables: {
                input,
              },
            });

            setUser((u) => {
              return {
                ...u,
                appPushId: deviceToken,
              }
            })
    
            await AsyncStorage.setItem("unbox-litter-the-click-3-appPushId", deviceToken);
            await AsyncStorage.setItem("unbox-litter-the-click-3-user", JSON.stringify(user));
          } catch (error) {
            console.error("Error setting app push ID:", error);
          }
        }
    
      } catch (error) {
        console.log("Error getting device token:", error);
      }
    }

  };



  const requestUserNotificationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
  
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
      AfterLogin();
    }
  }

  useEffect(() => {
    requestUserNotificationPermission();
    updateBalance();
    if (!loaded) {
      loadRetailers();
      loadGeofences();
      setLoaded(true);
    }
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log('camera perms', status);    
    return status === "granted";
  };

  const getLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log('location perms', status);    
        
    return status === "granted";
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {        
        await getCameraPermissions();
        await getLocationPermissions();
      })();
    }, [])
  );

  return (
    <ScrollView bgColor="white">
      <Box mt={3} px={6}>
        <Box textAlign={"center"} mb={3} alignItems={"center"}>          
          <Text fontSize="60px" fontWeight={"bold"} lineHeight={"89px"}>
            {(balance.updating) ? <Spinner height={"73px"}/> : balance.value}
          </Text>
          <HStack
            justifyContent={"center"}
            alignItems={"center"}
            mb={5}
            space={1}
          >
            <Text fontSize="26px" color={"primary.600"}>
              circular
            </Text>
            <Image
              source={require("../../assets/images/ucoins.png")}
              alt="ucoins"
              w="79px"
              h="20px"
            />
          </HStack>

          <Text
            variant={"body3"}
            colorScheme={"primary"}
            fontWeight={"bold"}
            mb={"22px"}
            onPress={() => navigate("Wallet")}
          >
            {t("litter:screens.dashboard.tabs.homepage.history")} &gt;
          </Text>

          <Button
            colorScheme="primary"
            onPress={() => navigate("Shop", { screen: "ShopTabs", params: { tab: "vouchers" } })}
            mb={2}
            py={14}
            w={"100%"}
          >
            <HStack alignItems={"center"} space={1}>
              <Text variant={"body1"} color={"white"} fontWeight={700}>
                {t("litter:screens.dashboard.tabs.homepage.buyVouchers")}
              </Text>
            </HStack>
          </Button>

          <Button
            colorScheme="primary"
            variant={"outline"}
            onPress={() => navigate("Shop", { screen: "ShopTabs", params: { tab: "myVouchers" } })}
            mb={2}
            py={14}
            w={"100%"}
          >
            <HStack alignItems={"center"} space={1}>
              <Text variant={"body1"} color={"primary.600"} fontWeight={700}>
                {t("litter:screens.dashboard.tabs.homepage.myVouchers")}
              </Text>
            </HStack>
          </Button>
        </Box>

        <Notifications />

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
                {t("litter:screens.dashboard.tabs.homepage.merchants")}
              </Text>
              <Text variant={"paragraph2"}>
                {t("litter:screens.dashboard.tabs.homepage.spend")}
              </Text>
            </HStack>
            <Text
              variant={"paragraph2"}
              colorScheme={"primary"}
              fontWeight={"bold"}
              onPress={() => navigate("Shop", { screen: "ShopTabs", params: { tab: "merchants" } })}
            >
              {t("litter:screens.dashboard.tabs.homepage.seeAllMerchants")}
            </Text>
          </HStack>
          <Box p={3} mb={3} alignItems={"center"}>
            <Merchant width={120} height={120} color400={colors.primary["400"]} color600={colors.primary["600"]} />
            {/* <Text variant={"paragraph2"} py={2} px={3}>
              {t("litter:screens.dashboard.tabs.homepage.findMerchants")}
            </Text> */}
          </Box>
          <Text variant={"paragraph2"}>
            {t("litter:screens.dashboard.tabs.homepage.availableMerchants", {
              count: retailersCount,
            })}
          </Text>
        </Box>

        <Statistics />

        <Achievements/>
        
        {/*
        <Box borderWidth={1} borderColor={"primary.600"} rounded={12}>
          <Box
            position={"relative"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => navigate("/about")}
          >
            <Image
              source={require("../../assets/images/products.png")}
              alt="about city"
              height={101}
              width={"100%"}
            />
            <HStack position={"absolute"} alignItems={"center"} space={2}>
              <Image
                source={require("../../assets/images/unbox-white-log.png")}
                alt="ucoins"
                w="92px"
                h="17px"
              />
              <Text
                color={"white"}
                letterSpacing={"xl"}
                fontSize={"21px"}                
              >
                LITTER
              </Text>
            </HStack>
          </Box>
          <HStack justifyContent={"space-between"} p={"10px"}>
            <Text variant={"paragraph2"}>{t("litter:screens.dashboard.tabs.homepage.learn")}</Text>
            <Text
              variant={"paragraph2"}
              colorScheme={"primary"}
              fontWeight={"bold"}
              onPress={() => navigate("/about")}
            >
              {t("litter:screens.dashboard.tabs.homepage.details")}
            </Text>
          </HStack>
        </Box> */}
      </Box>
    </ScrollView>
  );
};

export default HomepageTab;
