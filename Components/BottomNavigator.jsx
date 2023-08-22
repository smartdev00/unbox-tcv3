import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// import messaging from '@react-native-firebase/messaging';

import {
  Box,
  Center,
  Circle,
  HStack,
  Pressable,
  Icon,
  Row,
  Spinner,
  Text,
  VStack,
  useTheme,
} from "native-base";

import {
  CameraButton,
  Home,
  Map,
  Market,
  Scan,
  Maps,
  Shop,
  Wallet,
} from "../assets/svg";

import * as Screens from "../Screens";
import { BalanceContext, UserContext } from "../Context";
import { Image, TouchableOpacity } from "react-native";
import { AppConfig } from "../config";

const HeaderLeft = (props) => {
  const [user] = useContext(UserContext);
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate("Dashboard", { screen: "DashboardTabs", params: { tab: "profile" } })}>
    {user.avatar ? (
      <Image
        source={Object({ uri: AppConfig.rootUri + user.avatar })}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          marginLeft: 8,
        }}
      />
    ) : (
      <Circle
      {...props}
      bgColor="primary.600"
      size={8}
      ml={2}
      _text={Object({ color: "white" })}
    >
      {user.initials}
    </Circle>
    )}
    </Pressable>
  );
};

const HeaderRight = (props) => {
  const [balance] = useContext(BalanceContext);

  return (
    <VStack mr={2} alignItems="flex-end">
      {balance.updating ?
      (
        <Spinner/>
      ) : (
        <>
          <Text color={"primary.600"} fontSize={"12px"}>
            Balance
          </Text>
          
          <Text {...props} fontSize={"12px"} fontWeight={700}>
            {balance.value || 0} CUC
          </Text>
        </>)
      }
    </VStack>
  );
};

const BottomNavigator = () => {
  const navigation = useNavigation();
  // const { navigate } = useNavigation();
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();
  const [selected, setSelected] = useState("home");
  const { colors } = useTheme();
  
  const HEIGHT = 150;
  const BUTTON_HEIGHT = 10;

  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );         
  //     navigation.navigate("Dashboard");      
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         // console.log(remoteMessage);           
  //       }
  //       // setLoading(false);
  //     });
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={Object({        
        tabBarStyle: { backgroundColor: colors["tabBarColor"] },
        tabBarActiveBackgroundColor: colors["tabBarColor"],
        tabBarInactiveBackgroundColor: colors["tabBarColor"],
        tabBarActiveTintColor: colors["primary"]["600"],
        tabBarInactiveTintColor: "#ffffff",

        headerLeft: (props) => <HeaderLeft {...props} />,
        headerRight: (props) => <HeaderRight {...props} />,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: colors["primary"]["600"],
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Screens.Dashboard}
        options={Object({
          headerTitle: t("litter:screens.dashboard.headerTitle"),
          tabBarLabel: t("litter:screens.dashboard.tabBarLabel"),
          tabBarIcon: ({ focused, color, size }) => <Home fillColor={color} />,
          // set this to hide left/right profile components:
          // headerRight: null
        })}
      />
      <Tab.Screen
        name="Wallet"
        component={Screens.Wallet}
        options={Object({
          headerTitle: t("litter:screens.wallet.headerTitle"),
          tabBarLabel: t("litter:screens.wallet.tabBarLabel"),
          tabBarIcon: ({ focused, color, size }) => (
            <Wallet fillColor={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Scan"
        component={Screens.Scan}
        options={({ navigation }) =>
          Object({
            headerTitle: t("litter:screens.scan.headerTitle"),
            tabBarLabel: "",
            tabBarIcon: ({ focused, color, size }) => (
              <CameraButton fill={colors["primary"]["600"]} />
            ),
            tabBarButton: ({ children, ...rest }) => {              
              // console.log(`scan screen is focused: ${navigation.isFocused()}`)
              return (
                <Pressable
                  {...rest}
                  onPress={() => {
                    //what's the current route?
                    navigation.navigate("Scan", { requestPhoto: navigation.isFocused()});
                  }}
                  pb={5}
                >
                  {children}
                </Pressable>
              );
            },
          })
        }
      />
      <Tab.Screen
        name="Map"
        component={Screens.Map}
        options={Object({
          headerTitle: t("litter:screens.map.headerTitle"),
          tabBarLabel: t("litter:screens.map.tabBarLabel"),
          tabBarIcon: ({ focused, color, size }) => <Maps fillColor={color} />,
        })}
      />
      <Tab.Screen
        name="Shop"
        component={Screens.Shop}
        options={Object({
          headerTitle: t("litter:screens.market.headerTitle"),
          tabBarLabel: t("litter:screens.market.tabBarLabel"),
          tabBarIcon: ({ focused, color, size }) => <Shop fillColor={color} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;