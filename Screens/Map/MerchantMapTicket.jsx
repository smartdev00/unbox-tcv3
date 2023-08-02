import React from "react";

import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";

const MerchantMapTicket = ({ merchant }) => {
  if (!merchant) return null;

  console.log(merchant);

  return (
    <Box borderRadius="md" shadow={3} bg="white" mb={3}>
      <HStack justifyContent={"flex-start"} alignItems={"center"}>
        {merchant.img && (
          <Image
            source={Object({
              uri: merchant.img,
            })}
            alt="Merchant"
            width={"100px"}
            height={"100px"}
          />
        )}

        <VStack align={"start"} m={3} flex={1}>
          <Text variant={"body1"} fontWeight={"bold"}>
            {merchant.company}
          </Text>
          <Text variant={"paragraph3"}>{merchant.category}</Text>
          {/* <Text
              variant={'body3'}
              colorScheme={'primary'}
              lineHeight={20}
            >
              Open
            </Text> */}

          <Text variant={"paragraph2"}>{merchant.visitingAddress}</Text>
          <Text variant={"paragraph2"} colorScheme={"primary"}>
            {merchant.phone}
          </Text>
        </VStack>

        {/* {!showDetails && <ExpandThemed />}
          {showDetails && <CollapseThemed />} */}
      </HStack>

      <VStack>
        <Text variant={"paragraph2"} mt={3} mb={"2px"}>
          {merchant.details}
        </Text>
        <Text textAlign={"center"} variant={"paragraph2"} color={"primary.500"}>
          {merchant.email}
        </Text>
      </VStack>
    </Box>
  );
};

export default MerchantMapTicket;
