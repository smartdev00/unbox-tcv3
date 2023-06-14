import { useContext, useEffect, useState } from "react";

import { Box, ScrollView, Text } from "native-base";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import { LocaleContext } from "../../Context";

import { RefreshControl } from "react-native";

import PartnerTicket from "./PartnerTicket";

const PartnersTab = () => {
  const [partners, setPartners] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [locale] = useContext(LocaleContext);

  console.log(locale);

  const [listPartnersQuery] = useLazyQuery(gql(queries.partnersListDetailed), {
    fetchPolicy: "no-cache",
  });

  const loadPartners = async () => {
    try {
      setRefreshing(true);
      const { data, error } = await listPartnersQuery({
        variables: {
          profile: `partners-${locale.language}`,
        },
      });

      if (error) {
        console.log("listPartnersQuery", error);
      }

      if (data) {
        console.log(JSON.stringify(data, null, 2));

        setPartners(data.partnerList.items);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  if (!partners)
    return (
      <Box>
        <Text>No partners found.</Text>
      </Box>
    );

  return (
    <ScrollView
      bgColor="white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadPartners} />
      }
    >
      <Box mt={3} px={6}>
        {partners &&
          partners.map((partner, key) => (
            <PartnerTicket partner={partner} key={key} />
          ))}
      </Box>
    </ScrollView>
  );
};

export default PartnersTab;
