import React, { useContext, useEffect, useState } from "react";

import messaging from "@react-native-firebase/messaging";

import { useLazyQuery, gql } from "@apollo/client";

import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Row,
  Spinner,
  Text,
} from "native-base";
import { useMutation } from '@apollo/client'
import * as mutations from '../graphql/mutations'

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ApplicationContext,
  AuthContext,
  BalanceContext,
  UserContext,
} from '../Context'

import * as queries from "../graphql/queries";

import * as Components from "../Components";

import { AppConfig } from "../config";

import GraphQLException from "../exceptions";
import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import { BackButton } from "../Components";


const LoginScreen = ({ navigation, route, appConfig }) => {


  const LoginException = (message) => {
    console.log(`login exception: ${message}`);
    return {
      message,
    };
  };

  const AsyncSetItemException = () => {
    return {
      message: t("errors.asyncSetItemException"),
    };
  };

  const { t } = useTranslation();
  const [application, setApplication] = useContext(ApplicationContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  // const [wallet, setWallet] = useContext(WalletContext);
  // const [userProgress, setUserProgress] = useContext(UserProgressContext)
  const [balance, setBalance] = useContext(BalanceContext);

  const [err, setErr] = useState()
  const [email, setEmail] = useState(route.params?.username || "")
  const [password, setPassword] = useState(route.params?.releaseToken || "")

  const [showPassword, setShowPassword] = useState(false)

  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const [stayLoggedIn, setStayLoggedIn] = useState();
  const [loggingIn, setLoggingIn] = useState(false);

  const [postLoginQuery] = useLazyQuery(gql(queries.postLogin), {
    fetchPolicy: "no-cache",
  });

  // const [currentUserQuery] = useLazyQuery(gql(queries.currentUser), {
  //   fetchPolicy: "no-cache",
  // });

  // const [geofencesQuery] = useLazyQuery(gql(queries.geofences), {
  //   fetchPolicy: "no-cache",
  // });

  const handleCheckboxChange = (state, name) => {
    if (name === "stayLoggedIn") setStayLoggedIn(state);
  };

  const loginWithGoogle = () => {
    console.log("login with Google");
  };

  const loginWithFacebook = () => {
    console.log("login with Facebook");
  };

  const loginWithApple = () => {
    console.log("login with Apple");
  };

  useEffect(() => {
    setMissingEmail(false);
    setErr(null);
  }, [email]);

  useEffect(() => {
    setMissingPassword(false);
    setErr(null);
  }, [password]);

  // const loadUser = async () => {
  //   // const { data, error } = await userQuery({ variables: { username } });
  //   const { data, error } = await currentUserQuery();

  //   if (error) throw GraphQLException(error);
  //   if (!data) throw UserNotFoundException(username);

  //   return data;
  // };

  // const loadGeofences = async () => {
  //   const { data, error } = await geofencesQuery();

  //   if (error) throw GraphQLException(error);

  //   return data;
  // };

  const linkAccount = async () => {
    // make auth request and set token in local storage.
    const global_email = route.params?.ipemail || ""
    const global_identityProvider = route.params?.identityProvider || ""

    if (!email) setMissingEmail(true)
    if (!password) setMissingPassword(true)

    if (!email || !password) return

    try {
      setLoggingIn(true)
      console.log('logging in')

      console.log(AppConfig.ipAuthUri)

      const input = {
        identity: email,
        credential: password,
        identityProvider: global_identityProvider,
        ipemail: global_email
      };
      console.log(input, "IP Auth request")

      if (AppConfig.authUri) {
        const response = await fetch(AppConfig.ipAuthUri, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        })

        const responseJson = await response.json()
        console.log(responseJson, 'Auth ResponseJson')

        if (!responseJson.success) {
          throw LoginException(responseJson.error)
        }

        if (route.params?.ipemail) {
          const ip_data = {
            email: global_email,
            // identity: email,
            identityProvider: "googleId"
          };
          console.log(ip_data, 'setidentityprovider Request')

          const ipResponse = await fetch(AppConfig.setIdentityProviderUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ip_data),
          })

          const ipResponseJson = await ipResponse.json()
          console.log(ipResponseJson, 'setidentityprovider ResponseJson')

          if (!ipResponseJson.success) {
            throw LoginException(ipResponseJson.error)
          }
          submitLogin();
        }
      }
    } catch (e) {
      console.log('err handler')
      console.log('err', e)
      setErr(e)
    } finally {
      setLoggingIn(false)
    }

  }

  const submitLogin = async () => {
    // make auth request and set token in local storage.

    if (!email) setMissingEmail(true);
    if (!password) setMissingPassword(true);

    if (!email || !password) return;

    try {
      setLoggingIn(true);
      console.log("logging in");
      console.log(AppConfig);

      console.log(AppConfig.authUri);

      if (AppConfig.authUri) {
        const response = await fetch(AppConfig.authUri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: email,
            credential: password,
            refresh: true,
          }),
        });

        const responseJson = await response.json();
        console.log("responseJson", responseJson);

        if (!responseJson.success) {
          throw LoginException(responseJson.error);
        }

        const token = responseJson.result.session.value;
        const tokenExpires = responseJson.result.session.expires;
        const refreshToken = responseJson.result.refresh.value;
        const refreshExpires = responseJson.result.refresh.expires;

        console.log("token", token);
        console.log("refreshToken", refreshToken);

        try {
          await AsyncStorage.setItem("unbox-litter-the-click-3-token", token);
          await AsyncStorage.setItem(
            "unbox-litter-the-click-3-tokenExpires",
            tokenExpires
          );
          await AsyncStorage.setItem(
            "unbox-litter-the-click-3-refreshToken",
            refreshToken
          );
          await AsyncStorage.setItem(
            "unbox-litter-the-click-3-refreshTokenExpires",
            refreshExpires
          );
        } catch (e) {
          console.log("err", e);
          throw AsyncSetItemException();
        }

        if (responseJson.result.user.releaseToken) {
          navigation.navigate("ValidateAccount");
          setUser({ password });
          return;
        }
      }

      const { data, error } = await postLoginQuery();
      if (error) {
        console.log("postLoginQueryError", error);
        // throw GraphQLException(error)
      }

      console.log(data);

      setUser({
        username: data.user.username,
        givenName: data.user.firstName,
        familyName: data.user.lastName,
        nickname: `${data.user.firstName} ${data.user.lastName}`,
        displayName: `${data.user.firstName} ${data.user.lastName}`,
        initials: `${data.user.firstName[0] || " "} ${
          data.user.lastName[0] || " "
        }`,
        email: data.user.email,
        badges: data.user.badges,
        communities: data.user.communities,
        appPushId: data.user.appPushId,
      });
      await AsyncStorage.setItem(
        "unbox-litter-the-click-3-user",
        JSON.stringify({
          username: data.user.username,
          givenName: data.user.firstName,
          familyName: data.user.lastName,
          nickname: `${data.user.firstName} ${data.user.lastName}`,
          displayName: `${data.user.firstName} ${data.user.lastName}`,
          initials: `${data.user.firstName[0] || " "} ${
            data.user.lastName[0] || " "
          }`,
          email: data.user.email,
          badges: data.user.badges,
          communities: data.user.communities,
          appPushId: data.user.appPushId,
        })
      );

      setBalance({
        value: data.balance.remaining,
      });

      // setWallet(data.wallet);
      // setUserProgress(data.progress);

      setApplication((a) => {
        return {
          ...a,
          geofences: data.geofences.items,
        };
      });

      setAuth((auth) => {
        return {
          ...auth,
          authenticated: true,
        };
      });
      await AsyncStorage.setItem(
        "unbox-litter-the-click-3-auth",
        JSON.stringify({ authenticated: true })
      );
    } catch (e) {
      console.log("err handler");
      console.log("err", e);
      setErr(e);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <Box flex={1} safeArea bg={'white'}>
      <Box alignItems={"center"} justifyContent={"center"} h={"80px"}>
        <UnboxLitterSVG height={45} />
      </Box>
      <Box px={6} pt={33} flex={1}>
        <Text
          variant={"heading1"}
          colorScheme={"primary"}
          textAlign={"center"}
          mb={6}
        >
          {t("litter:screens.login.title")}
        </Text>
        <Text variant={"body3"} textAlign={"center"} mb={60}>
          {t("litter:screens.login.details")}
        </Text>

        {/*<Components.LanguageSelector mb={5} />*/}

        <FormControl isRequired isInvalid={missingEmail} mb={3}>
          <FormControl.Label>
            <Text variant={"body1"}>
              {t("litter:screens.login.fields.email")}
            </Text>
          </FormControl.Label>
          <Input
            value={email || ""}
            placeholder={t("litter:screens.login.fields.email")}
            onChangeText={(text) => setEmail(text)}
            bg="#ffffff"
            h={36}
          />
          {missingEmail && (
            <FormControl.ErrorMessage>
              {t("common:required")}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={missingPassword} mb={3}>
          <FormControl.Label>
            <Text variant={"body1"}>
              {t("litter:screens.login.fields.password")}
            </Text>
          </FormControl.Label>
          <Input
            type={showPassword ? "text" : "password"}
            value={password || ""}
            placeholder={t("litter:screens.login.fields.password")}
            onChangeText={(text) => setPassword(text)}
            bg="#ffffff"
            h={36}
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {!showPassword && (
                  <Image
                    source={require("../assets/images/eye-slash-icon.png")}
                    alt="show password"
                    w="20px"
                    h="18px"
                    mr={"10px"}
                  />
                )}
                {showPassword && (
                  <Image
                    source={require("../assets/images/eye-icon.png")}
                    alt="hide password"
                    w="24px"
                    h="24px"
                    mr={2}
                  />
                )}
              </Pressable>
            }
          />
          {missingPassword && (
            <FormControl.ErrorMessage>
              {t("common:required")}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        {err && (
          <Box
            borderColor={"#D10000"}
            borderWidth={1}
            rounded={5}
            py={2}
            px={4}
            bg={"#D1000033"}
            mb={3}
          >
            <Text variant={"body3"}>
              {t("litter:screens.login.text.error")}
            </Text>
          </Box>
        )}

        <FormControl>
          <Row alignItems={"center"} justifyContent={"space-between"}>
            {/* <Row alignItems={'center'}>
              <Checkbox
                mr={3}
                value={stayLoggedIn}
                onChange={(state) =>
                  handleCheckboxChange(state, 'stayLoggedIn')
                }
                aria-label={t('litter:screens.login.fields.stayLoggedIn.label')}
              ></Checkbox>
              <Text variant={'paragraph2'}>
                {t('litter:screens.login.fields.stayLoggedIn.label')}
              </Text>
            </Row> */}
            <Text
              variant={"paragraph2"}
              color={"primary.600"}
              fontWeight={700}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              {t("litter:screens.login.fields.forgotPassword.label")}
            </Text>
          </Row>
        </FormControl>

        <Box flex={1} justifyContent={"flex-end"} mb={6}>
          <Button
            mb={6}
            onPress={() => route.params?.ipemail ? linkAccount() : submitLogin()}
            _text={Object({
              fontSize: 14,
              fontWeight: 700,
            })}
          >
            {!loggingIn && t("litter:screens.login.buttonLogin")}
            {loggingIn && <Spinner color={"white"} />}
          </Button>

          <HStack justifyContent={"center"} space={1}>
            <Text variant={"body3"}>
              {t("litter:screens.login.text.noAccountYet")}
            </Text>
            <Text
              variant={"body3"}
              color="primary.600"
              fontWeight={700}
              onPress={() => navigation.navigate("Register")}
            >
              {t("litter:screens.login.text.registerHere")}
            </Text>
          </HStack>
        </Box>
      </Box>
      <BackButton navigation={navigation} />
    </Box>
  );
};

export default LoginScreen;
