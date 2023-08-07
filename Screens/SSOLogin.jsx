import React, { useContext, useEffect, useState } from 'react'
import { Platform, Alert } from 'react-native'

import { useLazyQuery, gql } from '@apollo/client'

import { useTranslation } from 'react-i18next'

import { GoogleThemed, AppleThemed } from '../Components/ThemedSVGs'

import {
  Box,
  HStack,
  Pressable,
  Spinner,
  Text,
} from 'native-base'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  ApplicationContext,
  AuthContext,
  BalanceContext,
  UserContext,
} from '../Context'

import * as queries from '../graphql/queries'

import * as Components from '../Components'

import { AppConfig } from '../config'

import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import { center } from '@turf/turf'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import SSOLinkModal from "./SSOLinkModal";
import jwt_decode from "jwt-decode";

const SSOLoginScreen = ({ navigation, route, appConfig }) => {

  const LoginException = (message) => {
    console.log(`login exception: ${message}`)
    return {
      message,
    }
  }

  const AsyncSetItemException = () => {
    return {
      message: t('errors.asyncSetItemException'),
    }
  }

  const { t } = useTranslation()
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [globalEmail, setGlobalEmail] = useState("")
  const [globalIdentifier, setGlobalIdentifier] = useState("")
  const [isCreate, setIsCreate] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [auth, setAuth] = useContext(AuthContext)
  const [user, setUser] = useContext(UserContext)
  const [application, setApplication] = useContext(ApplicationContext)
  const [balance, setBalance] = useContext(BalanceContext)
  const [err, setErr] = useState()
  const [email, setEmail] = useState(route.params?.username || "")
  const [password, setPassword] = useState(route.params?.releaseToken || "")
  const [globalData, setGlobalData] = useState({})

  const [postLoginQuery] = useLazyQuery(gql(queries.postLogin), {
    fetchPolicy: 'no-cache',
  })

  const handleGoogleLogin = async () => {
    console.log('login with Google');
    try {
      await GoogleSignin.hasPlayServices();
      // const {accessToken, user} = await GoogleSignin.signIn();
      const result = await GoogleSignin.signIn();
      const userInfo = result.user;
      setGlobalEmail(userInfo.email)
      setGlobalIdentifier("GoogleN");

      const data = {
        "identity": userInfo.email,
        "firstName": userInfo.givenName,
        "lastName": userInfo.familyName,
        "promocode": "",
        "ssoIdentifier": "GoogleN",
        "credential": result.idToken,
        "code": result.serverAuthCode,
        "debug": "true"
      };
      setGlobalData(data);
      await generateToken(userInfo.email, "googleId", data);
      /*
      await GoogleSignin.signIn().then(async result => {
        console.log(result, "Google login result");
        const userInfo = result.user;

        setGlobalEmail(userInfo.email);
        setGlobalIdentifier("GoogleN");

        const data = {
          "identity": userInfo.email,
          "firstName": userInfo.givenName,
          "lastName": userInfo.familyName,
          "promocode": "",
          "ssoIdentifier": "GoogleN",
          "credential": result.idToken,
          "code": result.serverAuthCode,
          "debug": "true"
        };
        setGlobalData(data);
        generateToken(userInfo.email, "googleId", data);
      });
      */
    } catch (error) {
      console.log(error, 'Error found');
      setLoggingIn(false);
      Alert.alert(error?.message || 'Something went wrong!');
    }
  };

  const handleAppleLogin = async () => {
    console.log('login with Apple')
    try {
      const appleResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      console.log(appleResponse, "Apple login response")
      var decoded = jwt_decode(appleResponse.identityToken);
      console.log(decoded, "identityToken");

      setGlobalEmail(decoded.email);
      setGlobalIdentifier("AppleN");

      const data = {
        "email": decoded.email,
        "user": {
          "name": {
            "firstName": appleResponse.fullName.givenName || "",
            "lastName": appleResponse.fullName.familyName || "",
          },
          "email": decoded.email
        },
        "firstName": appleResponse.fullName.givenName || "",
        "lastName": appleResponse.fullName.familyName || "",
        "ssoIdentifier": "AppleN",
        "authorization_code": {
          "id_token": appleResponse.identityToken,
          "code": appleResponse.authorizationCode
        },
        "id_token": appleResponse.identityToken,
        "code": appleResponse.authorizationCode,
      };
      setGlobalData(data);
      generateToken(decoded.email, "appleId", data);
      
    } catch (error) {
      console.log(error, 'Error found');
      setLoggingIn(false);
    }
  }

  const generateToken = async (email, identityProvider, data) => {
    console.log('generateToken');
    const input = {
      email,
      identityProvider
    };
    console.log(JSON.stringify(input));

    try {
      setLoggingIn(true);

      const response = await fetch(AppConfig.generateTokenUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const responseJson = await response.json();
      console.log(responseJson, "api/userflow/generatetoken");

      if (!responseJson.success) {
        setErr(true);
        return;
      }

      const spamToken = responseJson.result.replaceAll ? responseJson.result.replaceAll('"', "") : responseJson.result;
      checkEmail(email, spamToken, identityProvider, data);

    } catch (err) {
      console.log(err, "Error found");
      setLoggingIn(false);
      throw err;
    }
  }

  const checkEmail = async (email, spamToken, identityProvider, data) => {
    console.log('checkEmail');
    const input = {
      email,
      spamToken,
      identityProvider
    };
    console.log(input, "checkEmail request body");

    try {
      setLoggingIn(true);

      const response = await fetch(AppConfig.checkEmailUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const responseJson = await response.json();
      console.log(responseJson, "api/userflow/checkemail");

      if (!responseJson.success) {
        setErr(true);
        return;
      }
      setLoggingIn(false);

      if (responseJson.result.includes("notFound")) {
        setShowLinkModal(true);
      } else if (responseJson.result.includes("unKnown")) {
        console.log("unKnown");
        Alert.alert("unKnown")
      } else {
        if (identityProvider === "appleId") {
          loginWithApple(data);
        } else {
          loginWithGoogle(data);
        }
      }

    } catch (err) {
      console.log(err, "Error found");
      setLoggingIn(false);
    }
  }

  const loginWithGoogle = async (data) => {
    console.log(data, "loginWithGoogle");

    try {
      setLoggingIn(true);
      const response = await fetch(AppConfig.googleAuthUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJson = await response.json();
      console.log(responseJson, "api/userflow/google");

      if (!responseJson.success) {
        throw LoginException(responseJson.error)
      }

      postLogin(responseJson, "google");

    } catch (err) {
      console.log(err, "Error found");
      setLoggingIn(false);
    }
  }

  const loginWithApple = async (data) => {
    console.log(data, "loginWithApple");
    try {
      setLoggingIn(true);
      const response = await fetch(AppConfig.appleAuthUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJson = await response.json();
      console.log(responseJson, "api/userflow/apple");

      if (!responseJson.success) {
        throw LoginException(responseJson.error)
      }

      postLogin(responseJson, "apple");

    } catch (err) {
      console.log(err, "Error found");
      setLoggingIn(false);
    }
  }

  const postLogin = async (responseJson, sso) => {
    try {

      const token = responseJson.result.session.value;
      const tokenExpires = responseJson.result.session.expires;
      const refreshToken = responseJson.result.refresh.value;
      const refreshExpires = responseJson.result.refresh.expires;

      console.log('token', token)
      console.log('refreshToken', refreshToken)

      try {
        await AsyncStorage.setItem("unbox-litter-the-click-3-token", token);
        await AsyncStorage.setItem("unbox-litter-the-click-3-tokenExpires", tokenExpires);
        await AsyncStorage.setItem("unbox-litter-the-click-3-refreshToken", refreshToken);
        await AsyncStorage.setItem("unbox-litter-the-click-3-refreshTokenExpires", refreshExpires);
      } catch (e) {
        console.log('err', e)
        throw AsyncSetItemException()
      }

      const { data, error } = await postLoginQuery()
      if (error) {
        console.log('postLoginQueryError', error)
        // throw GraphQLException(error)
      }

      console.log(data, "postlogin data")
      setUser({
        username: data.user.username,
        givenName: data.user.firstName,
        familyName: data.user.lastName,
        nickname: `${data.user.firstName} ${data.user.lastName}`,
        displayName: `${data.user.firstName} ${data.user.lastName}`,
        initials: `${data.user.firstName[0] ||
          ' '} ${data.user.lastName[0] || ' '}`,
        email: data.user.email,
        badges: data.user.badges,
        communities: data.user.communities,
        sso
      })
      await AsyncStorage.setItem("unbox-litter-the-click-3-user", JSON.stringify({
        username: data.user.username,
        givenName: data.user.firstName,
        familyName: data.user.lastName,
        nickname: `${data.user.firstName} ${data.user.lastName}`,
        displayName: `${data.user.firstName} ${data.user.lastName}`,
        initials: `${data.user.firstName[0] ||
          ' '} ${data.user.lastName[0] || ' '}`,
        email: data.user.email,
        badges: data.user.badges,
        communities: data.user.communities,
      }));

      setBalance({
        value: data.balance.remaining
      });

      // setWallet(data.wallet);
      // setUserProgress(data.progress);

      setApplication((a) => {
        return {
          ...a,
          geofences: data.geofences.items,
        }
      })

      setAuth((auth) => {
        return {
          ...auth,
          authenticated: true,
        }
      })
      await AsyncStorage.setItem(
        "unbox-litter-the-click-3-auth",
        JSON.stringify({ authenticated: true })
      );

    } catch (e) {
      console.log('err handler')
      console.log('err', e)
      setErr(e)
    } finally {
      setLoggingIn(false)
    }
  };

  useEffect(() => {
    if (isCreate) {
      setShowLinkModal(false);
      console.log(globalIdentifier, "globalIdentifier");
      if (globalIdentifier === "AppleN") loginWithApple(globalData);
      else loginWithGoogle(globalData);
    }
  }, [isCreate])

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: Platform.OS === 'ios' ? AppConfig.googleClientID : AppConfig.googleClientIDAndroid,
      offlineAccess: true,
    });
  }, []);

  return (
    <Box flex={1} safeArea bg={'white'}>
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        h={'80px'}
      >
        <UnboxLitterSVG height={45} />
      </Box>
      <Box px={6} pt={33} flex={1}>
        <Text
          variant={'heading1'}
          colorScheme={'primary'}
          textAlign={'center'}
          mb={6}
        >
          {t('onboarding:consumer.title')}
        </Text>
        <Text variant={'body3'} textAlign={'center'} mb={60}>
          {t('onboarding:welcome.info')}
        </Text>

        {/* <Components.LanguageSelector mb={5} /> */}

        <Pressable
          bg={"white"}
          borderWidth={1}
          borderColor={"secondary.700"}
          h={46}
          rounded={50}
          onPress={() => handleGoogleLogin()}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={'center'}
          >
            <GoogleThemed />
            <Text variant={"body2"} px={4}>
              {t('onboarding:login.google')}
            </Text>
          </HStack>
        </Pressable>

        {
          Platform.OS === 'ios' && 
        <Pressable
          bg={"white"}
          borderWidth={1}
          borderColor={"secondary.700"}
          h={46}
          mt={2}
          rounded={50}
          onPress={() => handleAppleLogin()}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={'center'}
          >
            <AppleThemed />
            <Text variant={"body2"} px={6}>
              {t('onboarding:login.apple')}
            </Text>
          </HStack>
        </Pressable>
        }

        <Box my={10}>
          <HStack alignItems={"center"} w={'100%'}
            px={6}
            justifyContent={'center'}
          >
            <Text h={'1px'} w={'48%'} bg="secondary.700" />
            <Text variant={"body2"} px={4}>
              OR
            </Text>
            <Text h={'1px'} w={'48%'} bg="secondary.700" />
          </HStack>
        </Box>

        <Pressable
          bg={"white"}
          borderWidth={1}
          borderColor={"primary.600"}
          h={46}
          mb={6}
          rounded={50}
          onPress={() => navigation.navigate('Login')}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={'center'}
          >
            <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
              {t('onboarding:login.email')}
            </Text>
          </HStack>
        </Pressable>

        {loggingIn && <Spinner color={"primary.500"} />}

        <Box flex={1} justifyContent={'flex-end'} mb={6}>
          <HStack justifyContent={'center'} space={1}>
            <Text variant={'body3'}>
              {t('litter:screens.login.text.noAccountYet')}
            </Text>
            <Text
              variant={'body3'}
              color="primary.600"
              fontWeight={700}
              onPress={() => navigation.navigate('SSORegister')}
            >
              {t('litter:screens.login.text.registerHere')}
            </Text>
          </HStack>
        </Box>
      </Box>

      <SSOLinkModal
        show={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        ipemail={globalEmail}
        identityProvider={globalIdentifier}
        setIsCreate={setIsCreate} />
    </Box>
  )
}

export default SSOLoginScreen
