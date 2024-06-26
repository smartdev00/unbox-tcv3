import React, { useContext,useState } from "react";
import { Button, Modal, Text, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useLazyQuery, useMutation, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { BalanceContext } from "../../Context";
import { t } from "i18next";

const VoucherPurchaseModal = ({
  showPurchaseModal,
  setShowPurchaseModal,
  voucher,
}) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [balance, setBalance] = useContext(BalanceContext);
  const [loader, setLoader] = useState(false)

  const [myBalanceQuery] = useLazyQuery(gql(queries.myBalance), {
    fetchPolicy: "no-cache",
  });

  const [updateUserPassword] = useMutation(gql(mutations.buyVoucher), {
    fetchPolicy: "no-cache",
  });

  // const handleSuccessfulPurchase = () => navigate('ShopTabs')

  const updateBalance = async () => {
    console.log("update balance");
    const { data, error } = await myBalanceQuery();
    if (data) {
      setBalance({
        value: data.myBalance.remaining
      });
    }
    if (error) {
      console.log(error);
    }
  };

  const handlePurchase = async () => {
    try {
      console.log("buying", voucher.id);
      setLoader(true);
      const { data, error } = await updateUserPassword({
        variables: {
          productId: voucher.id,
        },
      });

      if (error) {
        setLoader(false);
        console.log(data);
      }

      if (data) {
        console.log(data);
        await updateBalance();

        setShowPurchaseModal(false);
        navigate("Success", {
          description: t("vouchers:purchaseVoucher.successfully.purchased"),
          primaryButtonText: t("vouchers:success.button"),
          primaryButtonAction: "ShopTabs",
        });
      }
    } finally {
      setShowPurchaseModal(false);
    }
  };
  
  return (
    <Modal
      isOpen={showPurchaseModal}
      onClose={() => setShowPurchaseModal(false)}
      size={"xl"}
    >
      <Modal.Content bg={"white"} px={5}>
        <Modal.CloseButton
          _icon={Object({ color: colors.primary["600"] })}
          _pressed={Object({ bg: "white" })}
        />
        <Modal.Header bg={"white"} pb={3} px={1}>
          <Text fontSize={18} fontWeight={"bold"} color={"primary.600"}>
            {t("vouchers:purchaseVoucher.title")}
          </Text>
        </Modal.Header>
        <Modal.Body pt={11}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={"bold"}
            color={"primary.600"}
          >
            {t("vouchers:purchaseVoucher.description")}
          </Text>
          <Text fontSize={13} lineHeight={18} mb={4}>
            {voucher.name}
          </Text>
          <Button
            onPress={handlePurchase}
            colorScheme={"primary"}
            _text={Object({ fontWeight: "bold" })}
            isLoading={loader}
          >
            {t("vouchers:purchaseVoucher.confirm")}
          </Button>
          <Button
            bg={"white"}
            onPress={() => setShowPurchaseModal(false)}
            _text={Object({ color: colors.primary["600"], fontWeight: "bold" })}
          >
            {t("vouchers:purchaseVoucher.cancel")}
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default VoucherPurchaseModal;
