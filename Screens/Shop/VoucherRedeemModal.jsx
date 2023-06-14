import { Button, Modal, Text, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const VoucherRedeemModal = ({
  showRedeemModal,
  setShowRedeemModal,
  voucher,
  setShowModal,
}) => {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleSuccessfullyRedeem = () => navigation.navigate('Shop')

  const handleRedeem = () => {
    setShowRedeemModal(false)
    navigation.navigate('Success', {
      description: 'Voucher successfully redeemed!',
      primaryButtonText: 'Done',
      primaryButtonAction: handleSuccessfullyRedeem,
    })
    setShowModal(false)
  }

  return (
    <Modal
      isOpen={showRedeemModal}
      onClose={() => setShowRedeemModal(false)}
      size={'xl'}
    >
      <Modal.Content bg={'white'} px={5}>
        <Modal.CloseButton
          _icon={Object({ color: colors.primary["600"] })}
          _pressed={Object({ bg: 'white' })}
        />
        <Modal.Header
          bg={'white'}
          pb={3}
          px={1}
        >
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'primary.600'}
          >
            Redeem Voucher
          </Text>
        </Modal.Header>
        <Modal.Body pt={11}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={'bold'}
            color={'primary.600'}
          >
            Do you wish to redeem this voucher now?
          </Text>
          <Text
            fontSize={13}
            lineHeight={18}
            mb={4}
          >
            {voucher.discount}
          </Text>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={'bold'}
            mb={7}
          >
            This can only be done once and cannot be undone.
          </Text>
          <Button
            onPress={handleRedeem}
            colorScheme={'primary'}
            _text={Object({ fontWeight: 'bold' })}
          >
            Redeem Now
          </Button>
          <Button
            bg={'white'}
            onPress={() => setShowRedeemModal(false)}
            _text={Object({ color: colors.primary["600"], fontWeight: 'bold' })}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default VoucherRedeemModal
