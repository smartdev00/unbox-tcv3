import { Box } from "native-base";
import { Litter, Ucoin, Universe } from "./index";

const AboutContent = () => {
  return (
    <Box
      bg={"#F3F3F3"}
      px={8}
      py={6}
    >
      <Litter />
      <Ucoin />
      <Universe />
    </Box>
  );
};

export default AboutContent;
