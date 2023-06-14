import { Box, Circle, Text } from "native-base";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../Context";

const ProfileHeader = () => {
  const { t } = useTranslation("profile");
  const [user] = useContext(UserContext)

  if (!user) return null;
  
    return (
      <Box alignItems={"center"} py={10}>
        <Circle
          size={51}
          bgColor={"primary.600"}
          mb={15}
        >
          <Text color="white" fontSize="24px">{user.initials}</Text>
        </Circle>
        <Text variant="heading2">{user.displayName}</Text>
        <Text variant={"paragraph2"} color={"#B3B3B3"}>{user.email}</Text>        
      </Box>
    );
  

};

export default ProfileHeader;
