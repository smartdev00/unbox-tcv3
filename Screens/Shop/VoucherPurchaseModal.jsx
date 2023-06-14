import React, { useContext } from "react";
import { Button, Modal, Text, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useLazyQuery, useMutation, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { BalanceContext } from "../../Context";

const VoucherPurchaseModal = ({
  showPurchaseModal,
  setShowPurchaseModal,
  voucher,
}) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [balance, setBalance] = useContext(BalanceContext);

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
      const { data, error } = await updateUserPassword({
        variables: {
          productId: voucher.id,
        },
      });

      if (error) {
        console.log(data);
      }

      if (data) {
        console.log(data);
        await updateBalance();

        setShowPurchaseModal(false);
        navigate("Success", {
          description: "Voucher successfully purchased!",
          primaryButtonText: "Done",
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
            Order Confirmation
          </Text>
        </Modal.Header>
        <Modal.Body pt={11}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={"bold"}
            color={"primary.600"}
          >
            Do you wish to purchase?
          </Text>
          <Text fontSize={13} lineHeight={18} mb={4}>
            {voucher.name}
          </Text>
          <Button
            onPress={handlePurchase}
            colorScheme={"primary"}
            _text={Object({ fontWeight: "bold" })}
          >
            Confirm
          </Button>
          <Button
            bg={"white"}
            onPress={() => setShowPurchaseModal(false)}
            _text={Object({ color: colors.primary["600"], fontWeight: "bold" })}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default VoucherPurchaseModal;
