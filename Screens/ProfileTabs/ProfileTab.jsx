import React, { useState, } from 'react';

import { useTranslation, } from "react-i18next";

import {
  Box,
  Button,
  FormControl,
  Input,
} from 'native-base';

const ProfileTab = ({ user, }) => {

  const { t } = useTranslation();

  const [givenName, setGivenName] = useState(user.givenName);
  const [familyName, setFamilyName] = useState(user.familyName);
  const [username, setUsername] = useState(user.username);

  const handleChange = (text, name) => {
    if (name === "givenName") setGivenName(text);
    if (name === "familyName") setFamilyName(text);
    if (name === "username") setUsername(text);    
  }

  return (
    <Box flex={1} p={5} alignItems={"center"} bgColor="white">
      <FormControl mt={5}>
        <Input
          mx={3}
          my={2}
          mb={1}
          color={"secondary.700"}
          borderWidth={0}
          borderBottomWidth={1}
          borderBottomColor={"secondary.700"}
          borderRadius={0}
          value={givenName}
          placeholder={t("screens.register.fields.givenName.placeholder")}
          onChangeText={(text) => handleChange(text, "givenName")}
        />
      </FormControl>
      <FormControl mt={5}>
        <Input
          mx={3}
          my={2}
          mb={1}
          color={"secondary.700"}
          borderWidth={0}
          borderBottomWidth={1}
          borderBottomColor={"secondary.700"}
          borderRadius={0}
          value={familyName}
          placeholder={t("screens.register.fields.familyName.placeholder")}
          onChangeText={(text) => handleChange(text, "familyName")}
        />
      </FormControl>
      <FormControl mt={5}>
        <Input
          mx={3}
          my={2}
          mb={1}
          color={"secondary.700"}
          borderWidth={0}
          borderBottomWidth={1}
          borderBottomColor={"secondary.700"}
          borderRadius={0}
          value={username}
          placeholder={t("screens.login.fields.username.placeholder")}
          onChangeText={(text) => handleChange(text, "username")}
        />
      </FormControl>
      <Button
        my={5}
        bg="primary.500"
        width="80%"
        onPress={() => saveProfileChanges()}
      >
        {t("buttons.save")}
      </Button>
    </Box>
  )
}

export default ProfileTab;