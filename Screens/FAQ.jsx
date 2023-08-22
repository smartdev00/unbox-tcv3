import React, { useState } from 'react'
import {
  Box,
  HStack,
  Link,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import UnboxLitterSVG from '../Components/UnboxLitterSVG'
import { CollapseThemed, ExpandThemed } from '../Components/ThemedSVGs'
import { Trans, useTranslation } from 'react-i18next'
import { Linking } from 'react-native'

let regex = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi; // The actual regex
let emailRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

const FAQsElement = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const { t } = useTranslation()

  let answerResult = '';
  let emailMatched = regex.exec(answer);
  if(emailMatched !== null){
    answerResult = answer.replace(emailMatched[1],'');
  }
  const urlMatches = answer.match(emailRegex);
  if(urlMatches !== null){
    answerResult = emailMatched !== null ? answerResult.replace(urlMatches[0],'') : answer.replace(urlMatches[0],'') ;
  }
  
  return (
    <Pressable
      onPress={() => setShowAnswer(!showAnswer)}
      rounded="8"
      borderWidth="1"
      py={'7px'}
      px={'14px'}
      bg={'white'}
      borderColor="#B3B3B3"
      mb={4}
    >
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text variant={'paragraph1'} w={'92%'}>{question}</Text>
        {!showAnswer && <ExpandThemed />}
        {showAnswer && <CollapseThemed />}
      </HStack>
      {showAnswer && (
        <Text variant={'paragraph1'} mt={4}>
          <Trans
            t={t}
            i18nKey={answerResult == '' ? answer : answerResult}
            components={[
              <Link href={'https://www.unboxuniverse.com'} />,
              <Link
                href={'https://uat.the-click.app/welcome#contact'}
                isUnderlined={false}
                _text={Object({ fontWeight: 700, fontSize: '14px', lineHeight: 0 })}
              />,
            ]}
          />
        { emailMatched !== null ? <Text variant={'paragraph1'} mt={4} color={"primary.600"} onPress={() => Linking.openURL(`mailto:${emailMatched[1]}`)}>{'\n'}{t('litter:screens.dashboard.tabs.profile.faq.email')} : {emailMatched[1]}</Text> : null}
        { urlMatches !== null ? <Text variant={'paragraph1'} mt={4} color={"primary.600"} onPress={() => Linking.openURL(`https://${urlMatches[0]}`)}>{'\n'}{t('litter:screens.dashboard.tabs.profile.faq.web')} : {urlMatches[0]}</Text> : null}
        </Text>
      )}
    </Pressable>
  )
}

const FAQ = () => {
  const { t, i18n } = useTranslation('faqs')
  const { faqs } = i18n.options.resources[i18n.language]

  if (!faqs) return null

  return (
    <ScrollView bgColor="white">
      <Box alignItems={'center'} mt={85} mb={101}>
        <UnboxLitterSVG />
      </Box>
      <VStack
        bg={'#F3F3F3'}
        alignItems={'center'}
        px={8}
        py={'18px'}
      >
        {Object.keys(faqs).map((key) => (
          <Box key={key} w={'100%'}>
            <Text
              variant={'body2'} fontWeight={'bold'}
              color={'primary.600'} mb={6} ml={2}
            >
              {key}
            </Text>
            {faqs[key].map((_, idx) => (
              <FAQsElement
                key={idx}
                question={t(`${key}.${idx}.question`)}
                answer={t(`${key}.${idx}.answer`)}
              />
            ))}
          </Box>
        ))}
      </VStack>
    </ScrollView>
  )
}

export default FAQ
