import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  Pressable,
  Text,
  useTheme,
} from 'native-base'
import { useState } from 'react'
import VoucherRedeemModal from './VoucherRedeemModal'
import * as ThemedSVGs from '../../Components/ThemedSVGs'

const VoucherInfoModal = ({ showModal, setShowModal, voucher, buyMode }) => {
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const { colors } = useTheme();

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={'xl'}
      >
        <Modal.Content bg={'white'}>
          <Modal.CloseButton
            _icon={Object({ color: colors.primary["600"] })}
            _pressed={Object({ bg: 'white' })}
          />
          <Modal.Body mt={6} pb={6}>
            <HStack justifyContent={'center'} mb={4}>
              <Image
                source={require('../../assets/images/voucher-modal-info.png')}
                alt="Merchant section"
                width={'216px'}
                height={'151px'}
              />
            </HStack>
            <Text
              variant={'heading2'}
              colorScheme={'primary'}
              textAlign={'center'}
            >
              {voucher.discount}
            </Text>
            <Divider my={1} />
            <Text
              variant={'heading3'}
              textAlign={'center'}
              mb={11}
            >
              {voucher.name}
            </Text>
            {!buyMode && (
              <>
                <Box bg={'wheat'} mb={4}>QR placeholder</Box>
                <Text
                  variant={'body2'}
                  textAlign={'center'}
                  mb={3}
                >
                  Placeholder QR Number: 42
                </Text>
                <Box
                  borderWidth={1}
                  borderColor={'primary.600'}
                  rounded={12}
                  mb={11}
                  p={4}
                  pb={2}
                >
                  <Text
                    variant={'body2'}
                    colorScheme={'primary'}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                  >
                    Voucher code:
                  </Text>
                  <Button rounded={8}>
                    7BVAWDH
                  </Button>
                </Box>
              </>
            )}
            <Box
              borderWidth={1}
              borderColor={'primary.600'}
              rounded={12}
              p={4}
              mb={11}
            >
              <Text variant={'body2'} fontWeight={'bold'}>Voucher Type</Text>
              <Text variant={'body3'} mb={4}>Placeholder type</Text>
              <Text variant={'body2'} fontWeight={'bold'}>Price</Text>
              <Text variant={'body3'} mb={4}>{voucher.price} CUC</Text>
              <Text variant={'body2'} fontWeight={'bold'}>Description</Text>
              <Text variant={'body3'} mb={4}>Placeholder description</Text>
              <Text variant={'body2'} fontWeight={'bold'}>Expiry Date</Text>
              <Text variant={'body3'} mb={4}>Placeholder date</Text>
              <Text variant={'body2'} fontWeight={'bold'}>Location</Text>
              <Text variant={'body3'} mb={4}>Placeholder location</Text>
              <Text variant={'body2'} fontWeight={'bold'}>Terms</Text>
              <Text variant={'body3'}>Placeholder terms</Text>
            </Box>
            <Divider mb={11} />
            <Box bg={'wheat'} mb={2}>map placeholder</Box>
            <HStack mb={7} justifyContent={'space-between'}>
              <HStack space={1} alignItems={'center'}>
                <ThemedSVGs.DirectionsThemed />
                <Text variant={'body3'}>Get Directions</Text>
              </HStack>
              <HStack space={1} alignItems={'center'}>
                <ThemedSVGs.WebsiteThemed />
                <Text variant={'body3'}>View Website</Text>
              </HStack>
            </HStack>
            {!buyMode && (
              <>
                <Text variant={'body2'} fontWeight={'bold'}>Notice:</Text>
                <Text variant={'body3'} mb={6}>Placeholder notice</Text>
              </>
            )}

            {/*todo continue below*/}
            {buyMode && (
              <HStack space={4} alignItems={"center"}>
                {voucher.favourite && (
                  <Pressable onPress={() => console.log('change')}>
                    <ThemedSVGs.FavouriteThemed />
                  </Pressable>
                )}
                {!voucher.favourite && (
                  <Pressable onPress={() => console.log('change')}>
                    <ThemedSVGs.NotFavouriteThemed />
                  </Pressable>
                )}
                <Button
                  colorScheme={'primary'}
                  onPress={() => console.log('open purchase modal')}
                  flex={1}
                >
                  Buy Now
                </Button>
              </HStack>
            )}
            {!buyMode && (
              <Button
                colorScheme={'primary'}
                onPress={() => setShowRedeemModal(true)}
              >
                Redeem Now
              </Button>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {showRedeemModal && (
        <VoucherRedeemModal {...{
          showRedeemModal,
          setShowRedeemModal,
          voucher,
          setShowModal,
        }} />
      )}
    </>
  )
}

export default VoucherInfoModal
