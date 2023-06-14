import { Button, FormControl, Input, ScrollView, Text } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, gql } from '@apollo/client'
import * as mutations from '../graphql/mutations'
import { UserContext } from '../Context'

const EditDetails = ({ navigation }) => {
  const { t } = useTranslation()
  const [user, setUser] = useContext(UserContext)

  const [givenName, setGivenName] = useState(user.givenName)
  const [familyName, setFamilyName] = useState(user.familyName)
  const [email, setEmail] = useState(user.email)
  const [invalidEmail, setInvalidEmail] = useState(false)

  useEffect(() => setInvalidEmail(false), [email])

  const [updateUser] = useMutation(
    gql(mutations.updateUser),
    {
      fetchPolicy: 'no-cache',
    },
  )

  const handleSaveProfile = async () => {

    if (!givenName || !familyName || !email) {
      return
    }

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setInvalidEmail(true)
      return
    }

    const { data, error } = await updateUser({
      variables: {
        input: {
          firstName: givenName,
          lastName: familyName,
          email,
        },
      },
    })

    if (error) console.log(error)

    if (data) {
      setUser({
        ...data.userUpdate,
        releaseToken: true,
        initials: `${data.userUpdate.givenName[0]}${data.userUpdate.familyName[0]}`,
        displayName: `${data.userUpdate.givenName} ${data.userUpdate.familyName}`,
      })

      navigation.goBack()
    }
  }

  return (
    <ScrollView bgColor="gray.100" p={6} flexGrow={1}>
      <Text variant={'paragraph1'} fontWeight={'bold'} mb={8}>
        {t('litter:screens.dashboard.tabs.profile.editDetails.title')}
      </Text>

      <FormControl isRequired isInvalid={!givenName} mb={18}>
        <FormControl.Label>
          <Text variant={'body1'}>
            {t('litter:screens.dashboard.tabs.profile.personalDetails.givenName')}
          </Text>
        </FormControl.Label>
        <Input
          value={givenName || ''}
          onChangeText={(text) => setGivenName(text)}
          placeholder={t('litter:screens.dashboard.tabs.profile.personalDetails.givenName')}
          bg="#ffffff"
          h={36}
        />
        <FormControl.ErrorMessage>
          {t('common:required')}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!familyName} mb={18}>
        <FormControl.Label>
          <Text variant={'body1'}>
            {t('litter:screens.dashboard.tabs.profile.personalDetails.familyName')}
          </Text>
        </FormControl.Label>
        <Input
          value={familyName || ''}
          onChangeText={(text) => setFamilyName(text)}
          placeholder={t('litter:screens.dashboard.tabs.profile.personalDetails.familyName')}
          bg="#ffffff"
          h={36}
        />
        <FormControl.ErrorMessage>
          {t('common:required')}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!email || invalidEmail}>
        <FormControl.Label>
          <Text variant={'body1'}>
            {t('litter:screens.dashboard.tabs.profile.personalDetails.email')}
          </Text>
        </FormControl.Label>
        <Input
          value={email || ''}
          onChangeText={(text) => setEmail(text)}
          placeholder={t('litter:screens.dashboard.tabs.profile.personalDetails.email')}
          bg="#ffffff"
          h={36}
        />
        {!email && (
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

      <Button
        // variant={'primary'}
        onPress={handleSaveProfile}
        mt={50}
      >
        {t('litter:screens.dashboard.tabs.profile.editDetails.button')}
      </Button>
    </ScrollView>
  )
}

export default EditDetails