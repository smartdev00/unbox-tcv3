import { useTranslation } from 'react-i18next'
import { Box, Text } from 'native-base'

const AboutLitter = () => {
  const { t } = useTranslation('about')

  return (
    <Box mb={8}>
      <Text
        variant={'body2'}
        color="primary.600"
        fontWeight={'bold'}
        mb={4}
      >
        {t('productTitle')}
      </Text>
      <Text variant={'body3'}>{t('description')}</Text>
    </Box>
  )
}

export default AboutLitter
