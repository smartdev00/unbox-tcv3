import React from 'react'
import { Box, ScrollView, Text } from 'native-base'
import UnboxLitterSVG from '../Components/UnboxLitterSVG'
import { useTranslation } from 'react-i18next'

const Legal = () => {
  const { t, i18n } = useTranslation('legal')
  const { terms } = i18n.options.resources[i18n.language]['legal']

  if (!terms) return null

  return (
    <ScrollView bgColor="white">
      <Box alignItems={'center'} mt={85} mb={101}>
        <UnboxLitterSVG />
      </Box>
      <Box
        bg={'#F3F3F3'}
        px={8}
        py={6}
      >
        {terms.map((_, idx) => (
          <Text
            key={idx}
            variant={'body3'}
            mb={5}
          >
            {t(`terms.${idx}`)}
          </Text>
        ))}
      </Box>
    </ScrollView>
  )
}

export default Legal
