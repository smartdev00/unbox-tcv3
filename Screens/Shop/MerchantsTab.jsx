import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
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
  const [queryVariables, setQueryVariables] = useState()
  const [count, setCount] = useState(0);

  const [listRetailersQuery] = useLazyQuery(gql(queries.retailersDetailed), {
    fetchPolicy: "no-cache",
  });

  const loadRetailers = async () => {
    try {
      const { data, error } = await listRetailersQuery({
        variables: {
          ...queryVariables,
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
        console.log(JSON.stringify(data, null, 2));
        setRetailers(data.retailersDetailed.items);
        setTotal(data.retailersDetailed.total);
        setCount(data.retailersDetailed.count);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRetailers();
  }, [offset, queryVariables]);

  return (
    <>
      <SearchBar showFilter={false}
        onSearch={(search) => {

          if (search === "") {
            setQueryVariables();
            return;
          }
          setQueryVariables((q) => {
            return {
              ...q,
              filter: {
                field: "company",
                operator: "LI",
                value: search,
              }
            };
          });
        }}
      />

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
        {count > 10 && (
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
