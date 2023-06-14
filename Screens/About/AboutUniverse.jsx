import { HStack, Image, Text, Link } from 'native-base'
import { useTranslation } from 'react-i18next'
import * as ThemedSVGs from "../../Components/ThemedSVGs";

const AboutUniverse = () => {
  const { t } = useTranslation('about')

  return (
    <>
      <Text
        variant={"body2"}
        color="primary.600"
        fontWeight={'bold'}
        mb={4}
      >
        UNBOX Universe
      </Text>
      <Text variant={'paragraph2'} mb={4}>{t('universe')}</Text>
      <HStack alignItems={'center'} space={4} mb={4}>
        <Link href={'https://www.linkedin.com/company/unboxuniverse/'}>
          <ThemedSVGs.LinkedinThemed />
        </Link>
        <Link href={'https://www.facebook.com/unboxtheuniverse'}>
          <ThemedSVGs.FacebookThemed />
        </Link>
        <Link href={'https://www.instagram.com/unbox.the.universe/'}>
          <ThemedSVGs.InstagramThemed />
        </Link>
        <Link href={'https://twitter.com/unbox_universe'}>
          <ThemedSVGs.TwitterThemed />
        </Link>
      </HStack>
      <Link href={'https://www.unboxuniverse.com'}>
        <Text>www.unboxuniverse.com</Text>
      </Link>
    </>
  )
}

export default AboutUniverse
