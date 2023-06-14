import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Pressable,
  Text,
} from 'native-base'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, gql } from '@apollo/client'
import * as mutations from '../graphql/mutations'

const ChangePassword = ({ navigation }) => {
  const { t } = useTranslation()
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmNewPassword, setConfirmNewPassword] = useState()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [newPasswordNotMatched, setNewPasswordNotMatched] = useState(false)

  const [oldPasswordInvalid, setOldPasswordInvalid] = useState(false)
  const [newPasswordInvalid, setNewPasswordInvalid] = useState(false)
  const [confimNewPasswordInvalid, setConfirmNewPasswordInvalid] = useState(
    false)

  const [showCurrentIncorrect, setShowCurrentIncorrect] = useState(false)
  const [newPasswordInvalidLength, setNewPasswordInvalidLength] = useState(false)
  const [confirmPasswordInvalidLength, setConfirmPasswordInvalidLength] = useState(false)

  useEffect(() => {
    setNewPasswordInvalidLength(false)
    setNewPasswordNotMatched(false)
  }, [newPassword])

  useEffect(() => {
    setConfirmPasswordInvalidLength(false)
    setNewPasswordNotMatched(false)
  }, [confirmNewPassword])

  const [updateUserPassword] = useMutation(gql(mutations.updateUserPassword), {
    fetchPolicy: 'no-cache',
  })

  const handleSavePassword = async () => {
    setOldPasswordInvalid(!oldPassword)
    setNewPasswordInvalid(!newPassword)
    setConfirmNewPasswordInvalid(!confirmNewPassword)
    setNewPasswordNotMatched(newPassword !== confirmNewPassword)

    if (!oldPassword || !newPassword || !confirmNewPassword) return

    if (newPassword.length < 8) setNewPasswordInvalidLength(true)
    if (confirmNewPassword.length < 8) setConfirmPasswordInvalidLength(true)

    if (newPassword.length < 8 || confirmNewPassword.length < 8) return

    if (newPassword === confirmNewPassword) {
      const input = {
        password: newPassword,
      }

      const { data } = await updateUserPassword({
        variables: {
          input,
          password: oldPassword,
        },
        onError(err) {
          if (err.graphQLErrors[0].exception === 'BadPassword') {
            setShowCurrentIncorrect(true)
          }
        },
      })

      if (data) navigation.goBack()

    }
  }

  return (
    <Box
      bgColor="gray.100"
      p={6}
      flexGrow={1}
    >
      <Text
        variant={'paragraph1'}
        fontWeight={'bold'}
        mb={8}
      >
        {t('litter:screens.dashboard.tabs.profile.changePassword.title')}
      </Text>

      <FormControl
        isRequired isInvalid={oldPasswordInvalid || showCurrentIncorrect} mb={3}
      >
        <FormControl.Label>
          <Text variant={'body1'}>
            {t('litter:screens.dashboard.tabs.profile.changePassword.current')}
          </Text>
        </FormControl.Label>
        <Input
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword || ''}
          placeholder="*********"
          onChangeText={(text) => setOldPassword(text)}
          bg="#ffffff"
          h={36}
          InputRightElement={
            <Pressable onPress={() => setShowOldPassword(!showOldPassword)}>
              {!showOldPassword && (
                <Image
                  source={require('../assets/images/eye-slash-icon.png')}
                  alt="show password"
                  w="20px"
                  h="18px"
                  mr={'10px'}
                />
              )}
              {showOldPassword && (
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
        {oldPasswordInvalid && (
          <FormControl.ErrorMessage>
            {t('common:required')}
          </FormControl.ErrorMessage>
        )}
        {showCurrentIncorrect && (
          <FormControl.ErrorMessage>
            {t('common:password.incorrect')}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={newPasswordInvalid || newPasswordInvalidLength} mb={3}>
        <FormControl.Label>
          <Text variant={'body1'}>
            {t('litter:screens.dashboard.tabs.profile.changePassword.new')}
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
        isInvalid={confimNewPasswordInvalid || newPasswordNotMatched || confirmPasswordInvalidLength}
      >
        <FormControl.Label>
          <Text variant={'body1'}>
            {t('litter:screens.dashboard.tabs.profile.changePassword.confirm')}
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
        {confimNewPasswordInvalid && (
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

      <Button
        // variant={"primary"}
        onPress={handleSavePassword}
        mt={50}
      >
        {t('litter:screens.dashboard.tabs.profile.changePassword.button')}
      </Button>
    </Box>
  )
}

export default ChangePassword
