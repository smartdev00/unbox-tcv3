import React, { useContext, useEffect, useState } from 'react'

import { useLazyQuery, gql } from '@apollo/client'

import { useTranslation } from 'react-i18next'

import { GoogleThemed, ExpandThemed, AppleThemed } from '../Components/ThemedSVGs'

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
  useTheme,
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

import GraphQLException from '../exceptions'
import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import { center } from '@turf/turf'

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
  const { colors } = useTheme();
  const [application, setApplication] = useContext(ApplicationContext)
  const [auth, setAuth] = useContext(AuthContext)
  const [user, setUser] = useContext(UserContext)
  // const [wallet, setWallet] = useContext(WalletContext);
  // const [userProgress, setUserProgress] = useContext(UserProgressContext)
  const [balance, setBalance] = useContext(BalanceContext);

  const [err, setErr] = useState()
  const [email, setEmail] = useState(route.params?.username || "")
  const [password, setPassword] = useState(route.params?.releaseToken || "")

  const [showPassword, setShowPassword] = useState(false)

  const [missingEmail, setMissingEmail] = useState(false)
  const [missingPassword, setMissingPassword] = useState(false)

  const [stayLoggedIn, setStayLoggedIn] = useState()
  const [loggingIn, setLoggingIn] = useState(false)

  const [postLoginQuery] = useLazyQuery(gql(queries.postLogin), {
    fetchPolicy: 'no-cache',
  })

  // const [currentUserQuery] = useLazyQuery(gql(queries.currentUser), {
  //   fetchPolicy: "no-cache",
  // });

  // const [geofencesQuery] = useLazyQuery(gql(queries.geofences), {
  //   fetchPolicy: "no-cache",
  // });

  const handleCheckboxChange = (state, name) => {
    if (name === 'stayLoggedIn') setStayLoggedIn(state)
  }

  const loginWithGoogle = () => {
    console.log('login with Google')
  }

  const loginWithFacebook = () => {
    console.log('login with Facebook')
  }

  const loginWithApple = () => {
    console.log('login with Apple')
  }

  useEffect(() => {
    setMissingEmail(false)
    setErr(null)
  }, [email])

  useEffect(() => {
    setMissingPassword(false)
    setErr(null)
  }, [password])

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

  const submitLogin = async () => {
    // make auth request and set token in local storage.

    if (!email) setMissingEmail(true)
    if (!password) setMissingPassword(true)

    if (!email || !password) return

    try {
      setLoggingIn(true)
      console.log('logging in')
      console.log(AppConfig)

      console.log(AppConfig.authUri)

      if (AppConfig.authUri) {
        const response = await fetch(AppConfig.authUri, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identity: email,
            credential: password,
            refresh: true,
          }),
        })

        const responseJson = await response.json()
        console.log('responseJson', responseJson)

        if (!responseJson.success) {
          throw LoginException(responseJson.error)
        }

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

        if (responseJson.result.user.releaseToken) {
          navigation.navigate('ValidateAccount')
          setUser({ password })
          return;
        }
      }

      const { data, error } = await postLoginQuery()
      if (error) {
        console.log('postLoginQueryError', error)
        // throw GraphQLException(error)
      }

      console.log(data)
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
      await AsyncStorage.setItem("unbox-litter-the-click-3-auth", JSON.stringify({ authenticated: true }));

    } catch (e) {
      console.log('err handler')
      console.log('err', e)
      setErr(e)
    } finally {
      setLoggingIn(false)
    }
  }

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

        {/*<Components.LanguageSelector mb={5} />*/}

        <Pressable
          bg={"white"}
          borderWidth={1}
          borderColor={"secondary.700"}
          h={46}
          rounded={50}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={center}
          >
            <GoogleThemed />
            <Text variant={"body2"} px={4}>
              {t('onboarding:login.google')}
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
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}
            justifyContent={center}
          >
            <AppleThemed />
            <Text variant={"body2"} px={6}>
              {t('onboarding:login.apple')}
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
          onPress={() => navigation.navigate('Login')}
        >
          <HStack alignItems={"center"} h={'100%'} w={'100%'}
            px={6} space={1}  
            justifyContent={center}
          >
            <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
              {t('onboarding:login.email')}
            </Text>
          </HStack>
        </Pressable>

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
    </Box>
  )
}

export default SSOLoginScreen
