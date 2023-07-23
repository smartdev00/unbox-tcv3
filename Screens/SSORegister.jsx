import React, { useContext, useEffect, useState } from 'react'

import { useLazyQuery, gql } from '@apollo/client'

import { useTranslation } from 'react-i18next'

import { GoogleThemed, AppleThemed } from '../Components/ThemedSVGs'

import {
  Box,
  Button,
  HStack,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from 'native-base'

import {
  ApplicationContext,
  AuthContext,
  BalanceContext,
  UserContext,
} from '../Context'

import * as queries from '../graphql/queries'

import { AppConfig } from '../config'

import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import { center } from '@turf/turf'
import { BackButton } from "../Components";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RegisterMailThemed } from "../Components/ThemedSVGs";

const SuccessView = ({ navigation, email }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);

  const handleResendEmail = async () => {
    setCounter((prevState) => prevState + 1);

    // prevent multiple resends
    if (counter >= 2) return;

    const input = {
      email,
      ssoIdentifier: "API Consumer Registration",
    };

    await fetch(AppConfig.resendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  };

  return (
    <Box flex={1} safeArea bg={"white"}>
      <Box alignItems={"center"} justifyContent={"center"} h={"80px"}>
        <UnboxLitterSVG height={45} />
      </Box>
      <Box flex={1} justifyContent={"flex-end"} px={6} pb={6}>
        <Box mb={20} alignItems={"center"}>
          <RegisterMailThemed />
        </Box>
        <Text
          fontSize={31}
          fontWeight={700}
          color={"primary.600"}
          textAlign={"center"}
          mb={7}
        >
          {t("litter:screens.register.success.title")}
        </Text>
        <Text variant={"paragraph2"} textAlign={"center"} mb={5}>
          {t("litter:screens.register.success.text1")}
        </Text>
        <Text variant={"paragraph2"} textAlign={"center"} mb={50}>
          {t("litter:screens.register.success.text2")}
        </Text>
        <Button onPress={handleResendEmail} mb={2}>
          {t("litter:screens.register.success.resendButton")}
        </Button>
        <Button onPress={() => navigation.navigate("SSOLogin")} mb={9}>
          {t("litter:screens.register.success.loginButton")}
        </Button>
        <Text
          variant={"paragraph2"}
          color={"primary.600"}
          fontWeight={700}
          textAlign={"center"}
          onPress={() =>
            Linking.openURL("https://uat.the-click.app/consumer/faqs")
          }
        >
          {t("litter:screens.register.success.help")}
        </Text>
      </Box>
    </Box>
  );
};

const SSORegisterScreen = ({ navigation, route, appConfig }) => {

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

  const [err, setErr] = useState()
  const [registering, setRegistering] = useState(false);
  const [success, setSuccess] = useState(false);

  let global_data = {};

  const generateToken = async (email, identityProvider) => {
    console.log('generateToken');
    const input = {
      email,
      identityProvider
    };
    console.log(JSON.stringify(input));

    try {
      setRegistering(true);

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

      const spamToken = responseJson.result.replaceAll('"', "");
      checkEmail(email, spamToken, identityProvider);

    } catch (err) {
      console.log(err, "Error found");
      setRegistering(false);
    }
  }

  const checkEmail = async (email, spamToken, identityProvider) => {
    console.log('checkEmail');
    const input = {
      email,
      spamToken,
      identityProvider
    };
    console.log(input, "checkEmail request body");

    try {
      setRegistering(true);

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

      if (responseJson.result.includes("notFound")) {
        if (identityProvider === "GoogleN") {
          signupWithGoogle();
        } else {
          signupWithApple();
        }
      } else if (responseJson.result.includes("unKnown")) {
        console.log("unKnown");
      } else {
        alert("Already exists, Please try to login.");
      }

    } catch (err) {
      console.log(err, "Error found");
      setRegistering(false);
    }
  }

  const handleGoogleRegister = async () => {
    console.log('login with Google');

    try {
      await GoogleSignin.hasPlayServices();
      // const {accessToken, user} = await GoogleSignin.signIn();
      await GoogleSignin.signIn().then(async result => {
        console.log(result, "Google login result");
        const userInfo = result.user;
        setRegistering(true);

        global_data = {
          "identity": userInfo.email,
          "firstName": userInfo.givenName,
          "lastName": userInfo.familyName,
          "promocode": "",
          "ssoIdentifier": "GoogleN",
          "credential": result.idToken,
          "code": result.serverAuthCode
        };

        generateToken(userInfo.email, "GoogleN");
      });
    } catch (error) {
      console.log(error, 'Error found');
      setRegistering(false);
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
      console.log(decoded);

      setGlobalEmail(decoded.email);
      setGlobalIdentifier("Apple");

      global_data = {
        "email": decoded.email,
        "user": appleResponse.fullName || {},
        "firstName": appleResponse.fullName.givenName || "",
        "lastName": appleResponse.fullName.familyName || "",
        "ssoIdentifier": "Apple",
        "authorization_code": appleResponse.authorizationCode,
        "id_token": appleResponse.identityToken,
        "code": appleResponse.authorizationCode
      };

      generateToken(decoded.email, "Apple");
    } catch (error) {
      console.log(error, 'Error found');
      setLoggingIn(false);
    }
  }

  const signupWithGoogle = async () => {
    console.log(global_data, "signupWithGoogle");

    try {
      setRegistering(true);
      const response = await fetch(AppConfig.googleAuthUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(global_data),
      });

      const responseJson = await response.json();
      console.log(responseJson, "api/userflow/google");

      if (!responseJson.success) {
        throw LoginException(responseJson.error)
      }

      setSuccess(true);

    } catch (err) {
      console.log(err, "Error found");
      setRegistering(false);
    }
  }

  const signupWithApple = async () => {
    console.log(global_data, "signupWithApple");

    try {
      setRegistering(true);
      const response = await fetch(AppConfig.appleAuthUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(global_data),
      });

      const responseJson = await response.json();
      console.log(responseJson, "api/userflow/apple");

      if (!responseJson.success) {
        throw LoginException(responseJson.error)
      }

      setSuccess(true);

    } catch (err) {
      console.log(err, "Error found");
      setRegistering(false);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: AppConfig.googleClientID,
      offlineAccess: true,
    });
  }, []);

  if (success) return <SuccessView navigation={navigation} email={email} />;

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
          {t('litter:screens.register.title')}
        </Text>
        <Text variant={'body3'} textAlign={'center'} mb={60}>
          {t('onboarding:welcome.info')}
        </Text>

        {/*<Components.LanguageSelector mb={5} />*/}

        <Pressable
          bg={"white"}
          borderWidth={1}
          borderColor={"secondary.700"}
          h={46}
          rounded={50}
          onPress={() => handleGoogleRegister()}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={center}
          >
            <GoogleThemed />
            <Text variant={"body2"} px={4}>
              {t('onboarding:signup.google')}
            </Text>
          </HStack>
        </Pressable>

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
            justifyContent={center}
          >
            <AppleThemed />
            <Text variant={"body2"} px={6}>
              {t('onboarding:signup.apple')}
            </Text>
          </HStack>
        </Pressable>

        <Box my={10}>
          <HStack alignItems={"center"} w={'100%'}
            px={6}
            justifyContent={center}
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
          rounded={50}
          mb={6}
          onPress={() => navigation.navigate('Register')}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={center}
          >
            <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
              {t('onboarding:signup.email')}
            </Text>
          </HStack>
        </Pressable>

        {registering && <Spinner color={"primary.500"} />}

        <Box flex={1} justifyContent={'flex-end'} mb={6}>
          <HStack justifyContent={"center"} space={1}>
            <Text variant={"body3"}>
              {t("litter:screens.register.noAccountYet")}
            </Text>
            <Text
              variant={"body3"}
              color="primary.600"
              fontWeight={700}
              onPress={() => navigation.navigate("SSOLogin")}
            >
              {t("litter:screens.register.loginHere")}
            </Text>
          </HStack>
        </Box>
      </Box>
      <BackButton navigation={navigation} />
    </Box>
  )
}

export default SSORegisterScreen
