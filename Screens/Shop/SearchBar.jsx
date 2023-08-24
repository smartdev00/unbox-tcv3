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
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { View, TextInput, Keyboard, StyleSheet } from 'react-native';

const SearchBar = ({ showFilter = true, filterSheetShowing, onShowFilterChanged, onSearch, }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const { colors, } = useTheme();

  const handleChange = (text) => {
    setValue(text);
    console.log(text);
  }

  const handleReset = () => {
    console.log('reset clicked');
    setValue("");
    onSearch("");
  }

  const handleKeyPress = (event) => {
    console.log(event.nativeEvent.key, 'handleKeyPress');
    if (event.nativeEvent.key === 'Enter') {
      console.log('Enter key pressed');
      // Perform actions when the Enter key is pressed
    }
  };

  return (
    <Box px={30} bgColor="white">
      <HStack alignItems={"center"} space={2} mt={6} mb={18}>
        <SearchThemed />
        <Box style={{ flex: 1 }}>
          <View style={styles.searchBox}>
            <TextInput
              value={value}
              placeholder={t("vouchers:home.search")}
              onChangeText={handleChange}
              onSubmitEditing={() => onSearch(value)}
              // onKeyPress={handleKeyPress}
              onPressOut={handleKeyPress}
              returnKeyType={'search'}
              style={styles.input}
            />
              <Pressable
                style={{ alignItems: 'center', width: 16 }}
                onPress={() => handleReset()}>
                <Image
                  source={require("../../assets/images/search-reset.png")}
                  alt="search reset"
                  w={"12px"}
                  h={"12px"}
                  mx={"8px"}
                />
              </Pressable>
          </View>
        </Box>

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
                {t("vouchers:offer.filter")}
              </Text>
            </HStack>
          </Pressable>
        )}
      </HStack>
      <Divider />
    </Box>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderRadius: 20,
    borderWidth: 1,
    height: 30,
    paddingHorizontal: 10,
  },
  input: {
    height: 30,
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
  },
});


export default SearchBar;
