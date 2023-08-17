import {
  useTheme,
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import * as ThemedSVGs from "../../Components/ThemedSVGs";
import { useState } from "react";
import VoucherInfoModal from "./VoucherInfoModal";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { Heart } from "../../assets/svg";

import { useMutation, gql } from "@apollo/client";
import * as mutations from "../../graphql/mutations";

const VoucherFavorite = ({ isFavorite, onFavoritePress }) => {
  const { colors } = useTheme();

  const handleVoucherFavorite = () => {
    if (onFavoritePress) onFavoritePress();
  };

  return (
    <Box position={"absolute"} zIndex={1} right={0} m={1}>
      <Pressable onPress={handleVoucherFavorite}>
        <Heart fillColor={isFavorite ? colors.primary["600"] : "white"} />
      </Pressable>
    </Box>    
  );
};

const VoucherTicket = ({ voucher, setVouchers, buyMode = false }) => {
  // const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation()
  const { navigate } = useNavigation();

  const [updateVoucherFavorite] = useMutation(
    gql(mutations.updateVoucherFavorite),
    {
      fetchPolicy: "no-cache",
    }
  );

  const handleOpenVoucher = () => {
    navigate("VoucherDetails", { voucher, setVouchers, buyMode });
  };

  const handleFavoritePress = async (voucher) => {
    const { data } = await updateVoucherFavorite({
      variables: {
        id: voucher.id,
      },
      onError(err) {
        console.log(err);
      },
    });

    if (data) {      
      setVouchers((prevState) => {
        const index = prevState.findIndex((el) => el.id === voucher.id);
        const newState = [...prevState];
        newState[index] = {
          ...voucher,
          isFavorite: data.productItemFavorite,
        };
        return newState;
      });
    }
  };

  return (
    <Box borderRadius="md" shadow={3} bg="white">
      <VStack>
        <Box>
          <VoucherFavorite
            isFavorite={voucher.isFavorite}
            onFavoritePress={() => handleFavoritePress(voucher)}
          />

          <Image
            source={Object({
              uri: voucher.img,
            })}
            alt="Voucher"
            height={"100px"}
          />
        </Box>
        <Box p={3}>
          <Text fontSize={14} fontWeight={500} numberOfLines={1}>
            {voucher.retailer?.name || ""}
          </Text>
          <Text fontSize={12} fontWeight={500} numberOfLines={1}>
            {voucher.name}
          </Text>
          {buyMode && (
            <Text fontSize={18} fontWeight={400}>
              {voucher.price} CUC
            </Text>
          )}
          {!buyMode && voucher.qrStatus !== "purchased" ? (
            <Button onPress={handleOpenVoucher} mt={2} bg="secondary.700">
              {t('vouchers:redeemVoucher.redeemed')}
            </Button>
          ) : (
            <Button onPress={handleOpenVoucher} mt={2}>
              {buyMode ? t('vouchers:home.moreInfo') : t('vouchers:home.viewVoucher')}
            </Button>
          )}
        </Box>
      </VStack>

      {/* {voucher.favourite && (
              <Pressable onPress={handleDeselectFavourite}>
                <ThemedSVGs.FavouriteThemed />
              </Pressable>
            )}
            {!voucher.favourite && (
              <Pressable onPress={handleSetFavourite}>
                <ThemedSVGs.NotFavouriteThemed />
              </Pressable>
            )} */}

      {/* {showModal && (
        <VoucherInfoModal {...{ showModal, setShowModal, voucher, buyMode }} />
      )} */}
    </Box>
  );
};

export default VoucherTicket;
