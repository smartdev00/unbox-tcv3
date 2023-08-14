import {
  useTheme,
  Box,
  Divider,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
} from "native-base";
import { FilterThemed, SearchThemed } from "../../Components/ThemedSVGs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SearchBar = ({ showFilter = true, filterSheetShowing, onShowFilterChanged, onSearch, }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const { colors, } = useTheme();

  const handleChange = (text) => setValue(text);

  return (
    <Box px={30} bgColor="white">
      <HStack alignItems={"center"} space={2} mt={6} mb={18}>
        <SearchThemed />
        <Input
          value={value}
          onChangeText={handleChange}
          flex={1}
          rounded={20}
          h={30}
          placeholder={t("vouchers:home.search")}
          onSubmitEditing={() => onSearch(value)}
          InputRightElement={
            <Pressable onPress={() => {
              setValue("");
              onSearch("");
            }}>
              <Image
                source={require("../../assets/images/search-reset.png")}
                alt="search reset"
                w={"12px"}
                h={"12px"}
                mr={"10px"}
              />
            </Pressable>
          }
        />
        {showFilter && (
          <Pressable
            bg={(filterSheetShowing) ? colors.primary["600"] : "white"}
            borderWidth={1}
            borderColor={"primary.600"}
            h={30}
            rounded={20}
            onPress={() => onShowFilterChanged(!filterSheetShowing)}
          >
            <HStack alignItems={"center"} h={30} px={3} space={1}>
              <FilterThemed fill={(filterSheetShowing) ? "white" : colors.primary["600"]}/>
              <Text variant={"paragraph1"} color={(filterSheetShowing) ? "white" : colors.primary["600"]} >
                Filter
              </Text>
            </HStack>
          </Pressable>
        )}
      </HStack>
      <Divider />
    </Box>
  );
};

export default SearchBar;
