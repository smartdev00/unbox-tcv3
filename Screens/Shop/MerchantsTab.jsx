import { Box, Button, HStack, ScrollView, VStack } from "native-base";
import SearchBar from "./SearchBar";
import MerchantTicket from "./MerchantTicket";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";

const MerchantsTab = () => {
  const LIMIT = 10;
  const [retailers, setRetailers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [listRetailersQuery] = useLazyQuery(gql(queries.retailersDetailed), {
    fetchPolicy: "no-cache",
  });

  const loadRetailers = async () => {
    try {
      setRetailers();
      const { data, error } = await listRetailersQuery({
        variables: {
          limit: LIMIT,
          offset,
        },
      });
      setRefreshing(true);
      if (error) {
        console.log("listRetailersQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        // console.log(JSON.stringify(data, null, 2));
        setRetailers(data.retailersDetailed.items);
        setTotal(data.retailersDetailed.total);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRetailers();
  }, [offset]);

  return (
    <>
      <SearchBar showFilter={false}/>
      <ScrollView
        px={15}
        showsVerticalScrollIndicator={false}
        bgColor="white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadRetailers} />
        }
      >
        <VStack mt={6}>
          {retailers &&
            retailers.map((merchant, key) => (
              <MerchantTicket merchant={merchant} key={key} />
            ))}
        </VStack>
        {retailers && (retailers.length > 0) && (
          <Box>
            <HStack
              mb={5}
              space={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                isDisabled={offset === 0}
                onPress={() => setOffset(offset - LIMIT)}
              >
                Previous
              </Button>
              <Button
                isDisabled={offset > total - LIMIT}
                onPress={() => setOffset(offset + LIMIT)}
              >
                Next
              </Button>
            </HStack>
          </Box>
        )}
      </ScrollView>
    </>
  );
};

export default MerchantsTab;
