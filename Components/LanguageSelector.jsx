import React, { useContext, } from 'react';

import {
  Box,
  Text,
  Row,
} from 'native-base';

import { LocaleContext } from '../Context';

import { languages } from '../i18n/config';

const PreAuthLanguageSelector = (props) => {

  const [locale, setLocale] = useContext(LocaleContext);

  const handleLanguageSelect = (language) => {
    setLocale((locale) => {
      return {
        ...locale,
        language,
      }
    })
  }

  if (languages.length === 1) return null;

  return (
    <Box {...props}>
      <Row justifyContent="center">
      {languages.map((l, key) => (
        <Text
          mx={2}
          key={key}
          color={(l.language === locale.language) ? "primary.500" : "secondary.700"}
          fontSize={14}
          fontWeight={700}
          onPress={() => handleLanguageSelect(l.language)}
          textTransform={"uppercase"}
        >
          {l.language}
        </Text>
      ))}
      </Row>
    </Box>

  )
}

export default PreAuthLanguageSelector;