import { HStack, Pressable, Text } from 'native-base'
import { useState } from 'react'
import {
    CollapseThemed,
    ExpandThemed,
    PositionThemed,
    QRThemed,
    VoucherThemed,
} from '../../Components/ThemedSVGs'
import { useTranslation } from 'react-i18next'

const AboutUcoin = () => {
  const [showMerchant, setShowMerchant] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const { t } = useTranslation('about')

  return (
    <>
      <Text
        variant={'body2'}
        color="primary.600"
        mb={4}
        fontWeight={'bold'}
      >
        {t('resources')}
      </Text>
      <Pressable
        // onPress={() => setShowMerchant(!showMerchant)}
        rounded="12"
        py={'7px'}
        px={'14px'}
        bg={'white'}
        mb={6}
      >
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          h={'33px'}
        >
          <HStack alignItems={'center'}>
            <Text mr={'21px'}>1.</Text>
            <PositionThemed />
            <Text variant={'paragraph2'} ml={2}>{t('merchant')}</Text>
          </HStack>
          {/* {!showMerchant && <ExpandThemed />}
          {showMerchant && <CollapseThemed />} */}
        </HStack>
        {showMerchant && (
          <Text>"-"</Text>
        )}
      </Pressable>
      <Pressable
        // onPress={() => setShowRequest(!showRequest)}
        rounded="12"
        py={'7px'}
        px={'14px'}
        bg={'white'}
        mb={6}
      >
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          h={'33px'}
        >
          <HStack alignItems={'center'}>
            <Text mr={'21px'}>2.</Text>
            <VoucherThemed />
            <Text variant={'paragraph2'} ml={2}>{t('request')}</Text>
          </HStack>
          {/* {!showRequest && <ExpandThemed />}
          {showRequest && <CollapseThemed />} */}
        </HStack>
        {showRequest && (
          <Text>"-"</Text>
        )}
      </Pressable>
      <Pressable
        // onPress={() => setShowPay(!showPay)}
        rounded="12"
        py={'7px'}
        px={'14px'}
        bg={'white'}
        mb={8}
      >
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          h={'33px'}
        >
          <HStack alignItems={'center'}>
            <Text mr={'21px'}>3.</Text>
            <QRThemed />
            <Text variant={'paragraph2'} ml={2}>{t('pay')}</Text>
          </HStack>
          {/* {!showPay && <ExpandThemed />}
          {showPay && <CollapseThemed />} */}
        </HStack>
        {showPay && (
          <Text>"-"</Text>
        )}
      </Pressable>
    </>
  )
}

export default AboutUcoin
