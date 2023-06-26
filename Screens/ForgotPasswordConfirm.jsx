import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Pressable,
  Text,
} from 'native-base'
import UnboxLitterSVG from '../Components/UnboxLitterSVG'

const ForgotPasswordConfirm = ({ navigation }) => {
  const { t } = useTranslation()

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

  useEffect(() => {
    setNewPasswordInvalidLength(false)
    setNewPasswordNotMatched(false)
  }, [newPassword])

  useEffect(() => {
    setConfirmPasswordInvalidLength(false)
    setNewPasswordNotMatched(false)
  }, [confirmNewPassword])

  const handleChangePassword = async () => {
    setNewPasswordInvalid(!newPassword)
    setConfirmNewPasswordInvalid(!confirmNewPassword)
    setNewPasswordNotMatched(newPassword !== confirmNewPassword)

    if (!newPassword || !confirmNewPassword) return

    if (newPassword.length < 8) setNewPasswordInvalidLength(true)
    if (confirmNewPassword.length < 8) setConfirmPasswordInvalidLength(true)

    if (newPassword.length < 8 || confirmNewPassword.length < 8) return

    if (newPassword === confirmNewPassword) {
      // todo add API
      // todo add navigation to success
      const input = {
        password: newPassword,
      }
    }
  }

  return (
    <Box flex={1} bg={'white'} safeArea>
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        h={'100px'}
      >
        <UnboxLitterSVG />
      </Box>

      <Box px={6} pt={33} flex={1}>
        <Text
          variant={'heading1'}
          colorScheme={'primary'}
          textAlign={'center'}
          mx={'auto'}
          w={'50%'}
          mb={'58px'}
        >
          {t('litter:screens.confirmPassword.title')}
        </Text>
        <Text variant={'paragraph2'} textAlign={'center'} mb={53}>
          {t('litter:screens.confirmPassword.details')}
        </Text>

        <FormControl
          isRequired isInvalid={newPasswordInvalid || newPasswordInvalidLength}
          mb={18}
        >
          <FormControl.Label>
            <Text variant={'body1'}>
              {t('litter:screens.confirmPassword.label.newPassword')}
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
          isInvalid={confirmNewPasswordInvalid || newPasswordNotMatched ||
            confirmPasswordInvalidLength}
        >
          <FormControl.Label>
            <Text variant={'body1'}>
              {t('litter:screens.confirmPassword.label.confirmPassword')}
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
                onPress={() => setShowConfirmNewPassword(
                  !showConfirmNewPassword)}
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
            onPress={handleChangePassword}
            _text={Object({
              fontSize: 14,
              fontWeight: 700,
            })}
          >
            {t('litter:screens.confirmPassword.changeButton')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ForgotPasswordConfirm
