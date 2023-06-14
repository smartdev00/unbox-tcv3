import React from "react";

import { Box } from "native-base";

const PartnersList = () => {
  return (
    <Box mt={3} px={6}>
      {partners &&
        partners.map((partner, key) => <Partner partner={partner} key={key} />)}
    </Box>
  );
};

export default PartnersList;
