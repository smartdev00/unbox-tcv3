import React, { useContext, useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Pressable,
  Spinner,
  Text,
} from 'native-base'
import UnboxLitterSVG from '../Components/UnboxLitterSVG'
import * as mutations from '../graphql/mutations'
import { UserContext } from '../Context'

const SuccessView = ({ navigation }) => {
  const { t } = useTranslation()
  const [user, setUser] = useContext(UserContext)

  const handleRedirect = () => {
    setUser()
    navigation.navigate('Login')
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
      <Box
        px={6} pt={33}
        flex={1} pb={12}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text variant={'heading1'} colorScheme={'primary'}>
          {t('litter:screens.activeAccount.successView.title')}
        </Text>
        <Image
          source={require("../assets/images/success.png")}
          alt="linkedin profile"
          w={124}
          h={124}
        />
        <Text variant={'paragraph2'} w={'50%'} textAlign={'center'}>
          {t('litter:screens.activeAccount.successView.text1')}
        </Text>
        <Text variant={'paragraph2'} w={'70%'} textAlign={'center'}>
          {t('litter:screens.activeAccount.successView.text2')}
        </Text>
        <Button
          onPress={handleRedirect}
          w={'100%'}
          _text={Object({
            fontSize: 14,
            fontWeight: 700,
          })}
        >
          {t('litter:screens.activeAccount.successView.continue')}
        </Button>
      </Box>
    </Box>
  )
}

const ValidateAccount = ({ route, navigation }) => {
  const { t } = useTranslation()
  // const { account, } = route.params;

  const [user] = useContext(UserContext)
  const [success, setSuccess] = useState(false)
  const [newPassword, setNewPassword] = useState()
  const [confirmNewPassword, setConfirmNewPassword] = useState()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [newPasswordNotMatched, setNewPasswordNotMatched] = useState(false)

  const [newPasswordInvalid, setNewPasswordInvalid] = useState(false)
  const [confirmNewPasswordInvalid, setConfirmNewPasswordInvalid] = useState(
    false)

  const [newPasswordInvalidLength, setNewPasswordInvalidLength] = useState(
    false)
  const [confirmPasswordInvalidLength, setConfirmPasswordInvalidLength] = useState(
    false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setNewPasswordInvalidLength(false)
    setNewPasswordNotMatched(false)
  }, [newPassword])

  useEffect(() => {
    setConfirmPasswordInvalidLength(false)
    setNewPasswordNotMatched(false)
  }, [confirmNewPassword])

  const [updateUserPassword] = useMutation(gql(mutations.updateUserPassword), {
    fetchPolicy: "no-cache",
  });

  const handleChangePassword = async () => {
    setNewPasswordInvalid(!newPassword)
    setConfirmNewPasswordInvalid(!confirmNewPassword)
    setNewPasswordNotMatched(newPassword !== confirmNewPassword)

    if (!newPassword || !confirmNewPassword) return

    if (newPassword.length < 8) setNewPasswordInvalidLength(true)
    if (confirmNewPassword.length < 8) setConfirmPasswordInvalidLength(true)

    if (newPassword.length < 8 || confirmNewPassword.length < 8) return

    if (newPassword === confirmNewPassword) {
      try {
        setLoading(true)

        const input = {
          password: newPassword,
        }

        const { data } = await updateUserPassword({
          variables: {
            input,
            password: user.password,
          },
          onError(err) {
            console.log(err)
          }
        })

        if (data) {
          setSuccess(true)
        }

      }
      catch (e) {}
      finally {
        setLoading(false)
      }
    }
  }

  if (success) return <SuccessView navigation={navigation} />

  return (
    <Box flex={1} safeArea bg={'white'}>
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        h={'80px'}
      >
        <UnboxLitterSVG height={45} />
      </Box>
      <Box px={6} pt={53} flex={1}>
        <Text
          variant={'heading1'}
          colorScheme={'primary'}
          textAlign={'center'}
          mb={6}
          w={'50%'}
          mx={'auto'}
        >
          {t('litter:screens.activeAccount.title')}
        </Text>
        <Text variant={'body3'} textAlign={'center'} mb={60}>
          {t('litter:screens.activeAccount.details')}
        </Text>

        <FormControl
          isRequired
          isInvalid={newPasswordInvalid || newPasswordInvalidLength}
          mb={3}
        >
          <FormControl.Label>
            <Text variant={'body1'}>
              {t('litter:screens.activeAccount.label.newPassword')}
            </Text>
          </FormControl.Label>
          <Input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword || ''}
            placeholder="*********"
            onChangeText={(text) => setNewPassword(text)}
            bg="#ffffff"
            h={36}
            InputRightElement={
              <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                {!showNewPassword && (
                  <Image
                    source={require('../assets/images/eye-slash-icon.png')}
                    alt="show password"
                    w="20px"
                    h="18px"
                    mr={'10px'}
                  />
                )}
                {showNewPassword && (
                  <Image
                    source={require('../assets/images/eye-icon.png')}
                    alt="hide password"
                    w="24px"
                    h="24px"
                    mr={2}
                  />
                )}
              </Pressable>
            }
          />
          {newPasswordInvalid && (
            <FormControl.ErrorMessage>
              {t('common:required')}
            </FormControl.ErrorMessage>
          )}
          {newPasswordInvalidLength && (
            <FormControl.ErrorMessage>
              {t('common:password.length')}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={confirmNewPasswordInvalid || newPasswordNotMatched || confirmPasswordInvalidLength}
        >
          <FormControl.Label>
            <Text variant={'body1'}>
              {t('litter:screens.activeAccount.label.confirmPassword')}
            </Text>
          </FormControl.Label>
          <Input
            type={showConfirmNewPassword ? 'text' : 'password'}
            value={confirmNewPassword || ''}
            placeholder="*********"
            onChangeText={(text) => setConfirmNewPassword(text)}
            bg="#ffffff"
            h={36}
            InputRightElement={
              <Pressable
                onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              >
                {!showConfirmNewPassword && (
                  <Image
                    source={require('../assets/images/eye-slash-icon.png')}
                    alt="show password"
                    w="20px"
                    h="18px"
                    mr={'10px'}
                  />
                )}
                {showConfirmNewPassword && (
                  <Image
                    source={require('../assets/images/eye-icon.png')}
                    alt="hide password"
                    w="24px"
                    h="24px"
                    mr={2}
                  />
                )}
              </Pressable>
            }
          />
          {confirmNewPasswordInvalid && (
            <FormControl.ErrorMessage>
              {t('common:required')}
            </FormControl.ErrorMessage>
          )}
          {confirmPasswordInvalidLength && (
            <FormControl.ErrorMessage>
              {t('common:password.length')}
            </FormControl.ErrorMessage>
          )}
          {newPasswordNotMatched && (
            <FormControl.ErrorMessage>
              {t('common:password.match')}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <Box flex={1} justifyContent={'flex-end'} mb={6}>
          <Button
            mb={6}
            onPress={handleChangePassword}
            _text={Object({
              fontSize: 14,
              fontWeight: 700,
            })}
          >
            {!loading && (
              t('litter:screens.activeAccount.submitButton')
            )}
            {loading && <Spinner color={'white'} />}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ValidateAccount
