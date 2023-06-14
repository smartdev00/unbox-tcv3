import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
} from 'native-base'
import UnboxLitterSVG from '../Components/UnboxLitterSVG'
import { AppConfig } from '../config'

const ForgotPassword = ({ navigation }) => {
  const { t } = useTranslation()

  const [email, setEmail] = useState()
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [missingEmail, setMissingEmail] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setMissingEmail(false)
    setInvalidEmail(false)
  }, [email])

  const submitPasswordReset = async () => {

    if (!email) {
      setMissingEmail(true)
      return
    }

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setInvalidEmail(true)
      return
    }

    setCounter(prevState => prevState + 1)

    // spam prevention
    if (counter > 2) return

    const input = {
      email,
    }

    await fetch(AppConfig.forgotUri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    setSubmitted(true)
  }

  return (
    <Box flex={1} bg={'white'} safeArea>
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        h={'56px'}
      >
        <UnboxLitterSVG />
      </Box>

      <Box px={6} pt={53} flex={1}>
        <Text
          variant={'heading1'}
          colorScheme={'primary'}
          textAlign={'center'}
          mx={'auto'}
          w={'50%'}
          mb={'58px'}
        >
          {t('litter:screens.forgotPassword.title')}
        </Text>
        <Text variant={'paragraph2'} textAlign={'center'} mb={53}>
          {t('litter:screens.forgotPassword.details')}
        </Text>

        <FormControl
          isRequired
          isInvalid={missingEmail || invalidEmail}
          mb={1}
        >
          <FormControl.Label>
            <Text variant={'body1'}>
              {t('litter:screens.register.fields.email')}
            </Text>
          </FormControl.Label>
          <Input
            value={email || ''}
            placeholder={t('litter:screens.register.fields.email')}
            onChangeText={(text) => setEmail(text)}
            bg="#ffffff"
            h={36}
          />
          {missingEmail && (
            <FormControl.ErrorMessage>
              {t('common:required')}
            </FormControl.ErrorMessage>
          )}
          {invalidEmail && (
            <FormControl.ErrorMessage>
              {t('common:invalidEmail')}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        {submitted && (
          <>
            <Text variant={'body3'} color={'#006700'} mb={4}>
              {t('litter:screens.forgotPassword.text.entry')}
            </Text>
            <Box
              borderColor={'##4DC01D'}
              borderWidth={1}
              rounded={5}
              py={2}
              px={4}
              bg={'#DBF2D2'}
              mb={3}
            >
              <Text variant={'paragraph2'}>
                {t('litter:screens.forgotPassword.text.response')}
              </Text>
            </Box>
          </>
        )}

        <Box flex={1} justifyContent={'flex-end'} mb={6}>
          <Button
            onPress={submitPasswordReset}
            mb={5}
            _text={Object({
              fontSize: 14,
              fontWeight: 700,
            })}
          >
            {counter === 0
              ? t('litter:screens.forgotPassword.submitButton')
              : t(
                'litter:screens.forgotPassword.resendButton')}
          </Button>
          <Text
            variant={'body2'}
            color={'primary.600'}
            fontWeight={700}
            textAlign={'center'}
            onPress={() => navigation.navigate('Login')}
          >
            {t('common:back')}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ForgotPassword
