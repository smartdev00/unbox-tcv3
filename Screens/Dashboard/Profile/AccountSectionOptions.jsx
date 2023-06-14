import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Box, Text } from "native-base";
import { UserContext } from "../../../Context";

const AccountSectionOptions = () => {
  const { t } = useTranslation();
  const [user] = useContext(UserContext)
  
    return (
      <>
        <Box
          bgColor="white"
          borderTopRadius={12}
          borderBottomWidth={1}
          borderColor={"primary.600"}
          py={3}
          pl={30}
          onClick={() => console.log("/edit-profile")}
        >
          <Text variant={"paragraph2"}>{t("litter:screens.dashboard.tabs.profile.editProfile")}</Text>
        </Box>
      </>
    );
  }



export default AccountSectionOptions;
