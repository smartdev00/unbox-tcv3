import React, { useContext, useEffect, useState } from "react";

import { useFonts } from 'expo-font';

import { NavigationContainer } from "@react-navigation/native";

import messaging from '@react-native-firebase/messaging';
import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";


import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';

import {
  extendTheme,
  Badge,
  Box,
  Button,
  Center,
  HStack,
  NativeBaseProvider,
  Text,
} from 'native-base';

import { useTranslation } from 'react-i18next';

import i18next from "i18next";

import {
  AchievementsContext,
  ApplicationContext,
  AuthContext,
  BalanceContext,
  LocaleContext,
  UserContext,
  UserProgressContext,
} from "./Context";


import { AppConfig } from "./config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Screens from "./Screens";
import BottomNavigator from "./Components/BottomNavigator";
import * as Unbox from './CommonComponents';

import extendedTheme from "./extendedTheme";
import UnboxLitterSVG from "./Components/UnboxLitterSVG";
import Splash from "./Screens/Splash";

const theme = extendTheme(extendedTheme);

const linking = {
  prefixes: ["unlitter://"],
  config: {
    screens: {
      Login: "login/:username/:releaseToken",
    },
  },
};

const httpLink = createHttpLink({
  uri: AppConfig.graphqlEndpoint,
});



const authLink = setContext(async (req, { headers }) => {
  try {
    const token = await AsyncStorage.getItem("unbox-litter-the-click-3-token") || null;

    console.log('authLink: token = ', token);

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  } catch (e) {
    console.log(e);
  }
});

const getNewToken = async () => {
  console.log('getting new token')
  // set context for user to be null

  let refreshToken = await AsyncStorage.getItem("unbox-litter-the-click-3-refreshToken")
  let token = await AsyncStorage.getItem("unbox-litter-the-click-3-token")

  const url = `${AppConfig.authUri}/refresh`;
  const body = {
    token: refreshToken,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const data = await res.json();

    if (data.success) {
      await AsyncStorage.setItem("unbox-litter-the-click-3-token", data.result.session.value);
      await AsyncStorage.setItem("unbox-litter-the-click-3-tokenExpires", JSON.stringify((Date.now() / 1000) + data.result.session.duration));
      await AsyncStorage.setItem("unbox-litter-the-click-3-refreshToken", data.result.refresh.value);
      await AsyncStorage.setItem("unbox-litter-the-click-3-refreshTokenExpires", data.result.refresh.expires);
      return data.result.session.value;
    }


  } catch (err) {
    console.log(err)
    return null;
  }
}

let isRefreshing = false;
let pendingRequests = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

// https://stackoverflow.com/questions/61327448/how-to-refresh-jwt-token-using-apollo-and-graphql

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.code) {
          case 401:
            let forward$;

            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                getNewToken()
                  .then(async (accessToken) => {
                    resolvePendingRequests();
                    return accessToken;
                  })
                  .catch((error) => {
                    pendingRequests = [];
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter((value) => Boolean(value));
            } else {
              forward$ = fromPromise(
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve());
                })
              );
            }

            return forward$.flatMap(() => forward(operation));

          default:
            console.log(err)
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  // uri: AppConfig.graphqlEndpoint,
  link: new ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});




const App = () => {
  const { t } = useTranslation();
  const Stack = createNativeStackNavigator();
  const [application, setApplication] = useState({
    geofences: [],
  });

  const [locale, setLocale] = useState({
    language: "en",
  });

  const [ready, setReady] = useState(false);
  const [isSplash, setSplashComplete] = useState(false);

  const [auth, setAuth] = useState();
  const [user, setUser] = useState();

  const [userProgress, setUserProgress] = useState({
    level: "level"
  });
  const [balance, setBalance] = useState({
    updating: false,
    value: 0
  });

  const [initialRouteName, setInitialRouteName] = useState("Login");
  const [achievements, setAchievements] = useState([]);

  const [fontsLoaded] = useFonts({
    "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-BoldItalic": require("./assets/fonts/Ubuntu-BoldItalic.ttf"),
    "Ubuntu-Italic": require("./assets/fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-LightItalic": require("./assets/fonts/Ubuntu-LightItalic.ttf"),
    "Ubuntu-Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-MediumItalic": require("./assets/fonts/Ubuntu-MediumItalic.ttf"),
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
  });

  const [language, setLanguage] = useState("en");

  const changeLanguage = async ({ language }) => {
    if (i18next.language !== language) {
      await i18next.changeLanguage(language);
    }
  };

  useEffect(() => {
    changeLanguage({ language });
  }, [language]);




  useEffect(() => {
    const loadPrevious = async () => {     
      // const messagingToken = await messaging().getToken();
      // console.log('messagingToken', messagingToken);

      const _auth = await AsyncStorage.getItem("unbox-litter-the-click-3-auth");
      const authenticated = JSON.parse(_auth);

      let _refreshTokenExpires = await AsyncStorage.getItem("unbox-litter-the-click-3-refreshTokenExpires");
   
      const now = new Date();
      const expires = new Date(_refreshTokenExpires);
    
      if (authenticated && (now < expires)) {
        setAuth({ authenticated: true})
      } else {
        setAuth({ authenticated: false})
        await AsyncStorage.removeItem("unbox-litter-the-click-3-auth");
        await AsyncStorage.removeItem("unbox-litter-the-click-3-token");
        await AsyncStorage.removeItem("unbox-litter-the-click-3-tokenExpires");
        await AsyncStorage.removeItem("unbox-litter-the-click-3-refreshToken");
        await AsyncStorage.removeItem("unbox-litter-the-click-3-refreshTokenExpires");
        await AsyncStorage.removeItem("unbox-litter-the-click-3-user");
      }

      const _user = await AsyncStorage.getItem("unbox-litter-the-click-3-user");
        const parsedUser = JSON.parse(_user);

      if (parsedUser) {
        setUser(parsedUser)
      } else {
        setUser();
      }

      setReady(true)
      console.log(isSplash)
    }
  
    loadPrevious()
  }, [])

  const handleClickGo = () => {
    setSplashComplete(true)
  }

  if (!fontsLoaded) {
    return null;
  }

  if (!ready) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={[auth, setAuth]}>
        <LocaleContext.Provider value={[locale, setLocale]}>
          <ApplicationContext.Provider value={[application, setApplication]}>
            <UserContext.Provider value={[user, setUser]}>
              <UserProgressContext.Provider
                value={[userProgress, setUserProgress]}
              >
                <BalanceContext.Provider value={[balance, setBalance]}>
                  <AchievementsContext.Provider
                    value={[achievements, setAchievements]}
                  >
                    <NativeBaseProvider theme={theme}>
                      {!isSplash ? (
                        <Splash onClickGo={handleClickGo} />
                      ) :
                        <>
                          {!auth.authenticated ? (
                            <NavigationContainer linking={linking}>
                              <Stack.Navigator
                                initialRouteName={initialRouteName}
                                screenOptions={Object({
                                  headerShown: false,
                                  animation: "none",
                                })}
                              >
                                <Stack.Screen
                                  name="ChangePassword"
                                  component={Screens.ChangePassword}
                                />
                                <Stack.Screen
                                  name="ContactUs"
                                  component={Screens.ContactUs}
                                />
                                <Stack.Screen
                                  name="ForgotPassword"
                                  component={Screens.ForgotPassword}
                                />
                                <Stack.Screen
                                  name="ForgotPasswordConfirm"
                                  component={Screens.ForgotPasswordConfirm}
                                />
                                <Stack.Screen
                                  name="Login"
                                  component={Screens.Login}
                                />
                                <Stack.Screen
                                  name="Register"
                                  component={Screens.Register}
                                />
                                <Stack.Screen
                                  name="TermsAndConditions"
                                  component={Screens.TermsAndConditions}
                                />
                                <Stack.Screen
                                  name="ValidateAccount"
                                  component={Screens.ValidateAccount}
                                />
                              </Stack.Navigator>
                            </NavigationContainer>
                          ) : (
                            <NavigationContainer safeAreaTop>
                              <BottomNavigator />
                            </NavigationContainer>
                          )}
                        </>
                      }
                    </NativeBaseProvider>
                  </AchievementsContext.Provider>
                </BalanceContext.Provider>
              </UserProgressContext.Provider>
            </UserContext.Provider>
          </ApplicationContext.Provider>
        </LocaleContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
