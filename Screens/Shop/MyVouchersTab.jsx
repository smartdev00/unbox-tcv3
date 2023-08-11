import { Box, Button, Circle, HStack, ScrollView, Text, useTheme, } from "native-base";
import SearchBar from "./SearchBar";
import VoucherTicket from "./VoucherTicket";
import { useEffect, useState, useCallback } from "react";
import { RefreshControl } from "react-native";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";

import { Merchant } from "../../assets/svg";
import { useTranslation } from "react-i18next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const MyVouchersTab = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [myVouchers, setMyVouchers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation();

  const [listMyVouchersQuery] = useLazyQuery(gql(queries.myVouchersList), {
    fetchPolicy: "no-cache",
  });

  const loadMyVouchers = async () => {
    try {
      const { data, error } = await listMyVouchersQuery();
      setRefreshing(true);
      if (error) {
        console.log("listMyVouchersQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        let vouchers = [];
        data.myVouchers?.items.forEach((orderItem) => {
          orderItem.orderLines?.items.forEach((orderLineItem) => {
            vouchers.push({
              ...orderLineItem.productItem,
              orderLineId: orderLineItem.id,
              visitingAddress:
                orderLineItem.productItem?.retailer?.visitingAddress,
              qrStatus: orderLineItem.qrVoucher?.status,
            });
          });
        });

        setMyVouchers(vouchers);
      }
    } finally {
      setRefreshing(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadMyVouchers();
    }, [])
  );


  useEffect(() => {
    loadMyVouchers();
  }, []);

  return (
    <>      
      <ScrollView
        px={15}
        showsVerticalScrollIndicator={false}
        bgColor="white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadMyVouchers} />
        }
      >        
        <HStack alignItems="center" alignSelf="center" flexWrap={"wrap"} mt={6}>
          {myVouchers &&
            myVouchers.length > 0 &&
            myVouchers.map((voucher, key) => (
              <Box
                w={"50%"}
                key={key}
                pl={key % 2 === 0 ? 0 : 1}
                pr={key % 2 === 0 ? 1 : 0}
                mb={3}
              >
                <VoucherTicket
                  setVouchers={setMyVouchers}
                  voucher={voucher}
                  buyMode={false}
                />
              </Box>
            ))}

          {myVouchers && myVouchers.length === 0 && (
            <Box alignItems={"center"}>
              <Circle
                p={10}
                bg={"#f3f3f3"}
                size={"180px"}
                mt={12}
                mb={7}
                alignItems={"center"}
              >
                <Merchant width={100} height={100} color400={colors.primary["400"]} color600={colors.primary["600"]} />
              </Circle>
              <Text mb={4}>
                {t("litter:screens.shop.tabs.myVouchers.noVouchers")}
              </Text>
              <Button
                colorScheme={"primary"}
                _text={Object({ fontSize: "14px", fontWeight: 700 })}
                onPress={() => navigate("ShopTabs", { tab: "vouchers" })}
              >
                {t("litter:screens.shop.tabs.myVouchers.findVouchers")}
              </Button>
            </Box>
          )}
        </HStack>
      </ScrollView>
    </>
  );
};

export default MyVouchersTab;
