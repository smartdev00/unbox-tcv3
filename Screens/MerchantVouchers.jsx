import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Box, HStack, ScrollView, Text } from "native-base";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";
import VoucherTicket from './Shop/VoucherTicket'

const MerchantVouchers = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { merchant } = route.params;
  const [vouchers, setVouchers] = useState([]);

  const [listMerchantVouchersQuery] = useLazyQuery(
    gql(queries.merchantVouchersListDetailed),
    {
      fetchPolicy: "no-cache",
    }
  );

  const loadVouchers = async () => {
    const { data, error } = await listMerchantVouchersQuery({
      variables: {
        merchantId: merchant.id.toString(),
      },
    });
    if (error) {
      console.log("listMerchantVouchersQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2));
      setVouchers(data.merchantVouchersListDetailed.items);
    }
  };

  useEffect(() => {
    loadVouchers();
  }, []);

  return (
    <ScrollView px={15} showsVerticalScrollIndicator={false} bgColor="white">
      <Text lineHight={21} fontWeight={"bold"} my={22}>
        All {merchant.name} Deals and Vouchers
      </Text>
      <HStack alignSelf="center" flexWrap={"wrap"}>
        {vouchers &&
          vouchers.map((voucher, key) => (
            <Box
              w={"50%"}
              key={voucher.id}
              pl={key % 2 === 0 ? 0 : 1}
              pr={key % 2 === 0 ? 1 : 0}
              mb={3}
            >
              <VoucherTicket
                setVouchers={setVouchers}
                voucher={voucher}
                buyMode={true}
              />
            </Box>
          ))}
      </HStack>
    </ScrollView>
  );
};

export default MerchantVouchers;
