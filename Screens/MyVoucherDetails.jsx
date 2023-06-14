import React from "react";

import { useTranslation } from "react-i18next";
import { Button, Box, ScrollView, Text } from "native-base";

const MyVoucherDetails = () => {
  const { t } = useTranslation();
  return (
    <ScrollView bgColor="white">
      <Text>MyVoucherDetails</Text>
    </ScrollView>
  );
};

export default MyVoucherDetails;
