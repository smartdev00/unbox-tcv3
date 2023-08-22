import {
  Box,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import format from "date-fns/format";

import { useTranslation } from "react-i18next";

import { AppConfig } from "../../config";

import { SvgUri } from "react-native-svg";

const PendingLitterTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color="#B3B3B3">
          {t("litter:screens.transaction.pendingLitter.title")}
        </Text>

        <Text fontWeight={700} color="#B3B3B3">
          {t("litter:screens.transaction.pendingLitter.subTitle")}
        </Text>

        <Image
          source={Object({
            uri: AppConfig.rootUri + transaction.litter.imageUri,
          })}
          alt={transaction.litter.productType}
          // size="xl"
          resizeMode="contain"
          width={"250px"}
          height={"250px"}
        />        
      </VStack>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.referenceNumber")}
            </Text>
            <Text>{transaction.id}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t("litter:screens.transaction.summary.scanTime")}</Text>
            <Text>
              {format(new Date(transaction.dateAdded), "hh:mm a, dd-MMM-yyyy")}
            </Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.itemType`)}</Text>
            <Text>{transaction.litterType}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.pending", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const ApprovedLitterTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color={"primary.600"}>
          {t("litter:screens.transaction.approvedLitter.title")}
        </Text>

        <Text fontWeight={700}>
          {t("litter:screens.transaction.approvedLitter.subTitle")}
        </Text>

        <Image
          source={Object({
            uri: AppConfig.rootUri + transaction.litter.imageUri,
          })}
          alt={transaction.litter.productType}
          // size="xl"
          resizeMode="contain"
          width={"250px"}
          height={"250px"}
        />
      </VStack>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.referenceNumber")}
            </Text>
            <Text>{transaction.id}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t("litter:screens.transaction.summary.scanTime")}</Text>
            <Text>
              {format(new Date(transaction.dateAdded), "hh:mm a, dd-MMM-yyyy")}
            </Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.itemType`)}</Text>
            <Text>
              {transaction.litter.productType.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.amount", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const BadgeTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color={"primary.600"}>
          {t("litter:screens.transaction.badgeWon.title")}
        </Text>

        <Text fontWeight={700}>
          {t("litter:screens.transaction.badgeWon.subTitle")}
        </Text>

        <SvgUri uri={AppConfig.rootUri + transaction.badge.images.won} />
      </VStack>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.achievement`)}</Text>
            <Text>{transaction.badge.name}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.amount", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const ReferrerTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color={"primary.600"}>
          {t("litter:screens.transaction.referenceCode.title")}
        </Text>

        <Text fontWeight={700}>
          {t("litter:screens.transaction.referenceCode.subTitle")}
        </Text>
      </VStack>

      <Box my={5} p={4} bgColor={"primary.400"} borderRadius={"8px"}>
        <Text color={"white"} fontSize={"25px"} fontWeight={700}>
          {transaction.referenceCode || "REFERENCE CODE"}
        </Text>
      </Box>

      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.referenceCode`)}</Text>
            <Text>{transaction.referenceCode || "REFERENCE CODE"}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.amount", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const TransactionDetails = ({ route }) => {
  // console.log(route)
  console.log(route.params.transaction);

  const transactionItem = ({ transaction }) => {
    switch (transaction.referrer) {
      case "litter-collection-pending":
        return <PendingLitterTransaction transaction={transaction} />;
      case "litter-collection":
        return <ApprovedLitterTransaction transaction={transaction} />;
      case "badge-won":
        return <BadgeTransaction transaction={transaction} />;
      case "litter-collection-referrer-code":
        return <ReferrerTransaction transaction={transaction} />;
    }
  };

  return (
    <ScrollView bgColor={"white"} px={3}>
      {transactionItem({ transaction: route.params.transaction })}
      {/* <Text>Transaction Details</Text>
    <Text>{JSON.stringify(route.params.transaction, null, 2)}</Text> */}
    </ScrollView>
  );
};

export default TransactionDetails;
