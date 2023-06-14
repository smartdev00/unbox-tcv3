import { Text } from "native-base";
import { useTranslation } from "react-i18next";

const UnboxNeedHelp = () => {
  const { t } = useTranslation("onboarding");

  return (
    <Text
      fontWeight={"bold"}
      color={"primary.600"}
      lineHeight={"16px"}
    >
      {t("help")}
    </Text>
  );
};

export default UnboxNeedHelp;
