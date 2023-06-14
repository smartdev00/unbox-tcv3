import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import { CollapseThemed, ExpandThemed } from "../../Components/ThemedSVGs";
import { useNavigation } from "@react-navigation/native";

const MerchantTicket = ({ merchant }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { navigate } = useNavigation();

  const handleOpenMerchant = () => {
    navigate("MerchantDetails", { merchantId: merchant.id, });
    // setShowModal(true)
  };

  return (
    <Box borderRadius="md" shadow={3} bg="white" mb={3}>
      <Pressable onPress={handleOpenMerchant}>
        <HStack justifyContent={"flex-start"} alignItems={"center"}>          
          <Image
            source={Object({
              uri: merchant.img,
            })}
            alt="Merchant"
            width={"100px"}
            height={'100px'}
          />
          
            <VStack align={"start"} ml={3}>
              <Text variant={"body1"} fontWeight={"bold"}>
                {merchant.name}
              </Text>
              <Text variant={"paragraph3"}>{merchant.type}</Text>
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
        {showDetails && (
          <VStack>
            <Text variant={"paragraph2"} mt={3} mb={"2px"}>
              {merchant.details}
            </Text>
            <Text
              textAlign={"center"}
              variant={"paragraph2"}
              color={"primary.500"}
            >
              {merchant.email}
            </Text>
          </VStack>
        )}
      </Pressable>
    </Box>
  );
};

export default MerchantTicket;
