import { Button, Image, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { t } from "i18next";

const Success = ({ route }) => {
  const {
    description,
    primaryButtonText,
    primaryButtonAction,
    secondaryButtonText,
    secondaryButtonAction,
  } = route.params

  const { navigate } = useNavigation()

  return (
    <VStack
      justifyContent={'space-between'}
      flex={1}
      bg={'white'}
    >
      <Text
        variant={'heading2'}
        colorScheme={'primary'}
        textAlign={'center'}
        mt={3}
      >
        {t("vouchers:success.title")}
      </Text>
      <VStack space={46} alignItems={'center'}>
        <Image
          source={require('../assets/images/success.png')}
          alt="Merchant section"
          width={124}
          height={124}
        />
        <Text>
          {description}
        </Text>
      </VStack>
      <VStack space={12}>
        <Button mb={20} mx={20} onPress={() => navigate(primaryButtonAction)}>{primaryButtonText}</Button>
        {secondaryButtonText && (
          <Button mb={20} mx={20} onPress={() => navigate(secondaryButtonText)}>{secondaryButtonAction}</Button>
        )}
      </VStack>
    </VStack>
  )
}

export default Success
