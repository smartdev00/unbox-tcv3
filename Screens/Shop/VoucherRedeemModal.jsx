import { Button, Modal, Text, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from "react-i18next";
import format from "date-fns/format";

import { useMutation, gql } from "@apollo/client";
import * as mutations from "../../graphql/mutations";

const VoucherRedeemModal = ({
  showRedeemModal,
  setShowRedeemModal,
  voucher,
  setVouchers,
  setShowModal,
  qrCode
}) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleSuccessfullyRedeem = () => navigation.navigate('Shop')

  const [redeemVoucher] = useMutation(gql(mutations.redeemVoucher), {
    fetchPolicy: "no-cache",
  });

  const handleRedeem = async () => {
    try {
      console.log("redeeming", qrCode);

      const { data, error } = await redeemVoucher({
        variables: {
          code: qrCode,
        },
      });

      if (error) {
        console.log(data, "error found");
      } 

      if (data) {      
        console.log(data, "success");
        setShowRedeemModal(false)
        setVouchers((prevState) => {
          const index = prevState.findIndex((el) => el.id === voucher.id);
          const newState = [...prevState];
          newState[index] = {
            ...voucher,
            qrStatus: data.qrVoucherRedeem.status,
            dateRedeemed: format(new Date(), "dd-MMM yyyy hh:mm:ss")
          };
          return newState;
        });
        navigation.goBack()
      }
    } finally {
      setShowRedeemModal(false);
    }
    // navigation.navigate('Success', {
    //   description: 'Voucher successfully redeemed!',
    //   primaryButtonText: 'Done',
    //   primaryButtonAction: handleSuccessfullyRedeem,
    // });
    // navigation.navigate("VoucherDetails", { voucher, setVouchers, buyMode: false });
    // setShowModal(false)
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
            {t('vouchers:redeemVoucher.title')}
          </Text>
        </Modal.Header>
        <Modal.Body pt={6}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={'bold'}
            color={'primary.600'}
            mb={2}
          >
            {t('vouchers:redeemVoucher.confirm')}
          </Text>
          {/* <Text
            fontSize={13}
            lineHeight={18}
            mb={1}
          >
            {voucher.discount}
          </Text> */}
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={'bold'}
            mb={7}
          >
            {t('vouchers:redeemVoucher.warning')}
          </Text>
          <Button
            onPress={handleRedeem}
            colorScheme={'primary'}
            _text={Object({ fontWeight: 'bold' })}
            mb={2}
          >
            {t('vouchers:redeemVoucher.redeemNow')}
          </Button>
          <Button
            bg={'white'}
            onPress={() => setShowRedeemModal(false)}
            _text={Object({ color: colors.primary["600"], fontWeight: 'bold' })}
          >
            {t('vouchers:cancel')}
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default VoucherRedeemModal
