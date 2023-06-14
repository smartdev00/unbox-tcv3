import React, { useContext, useState, } from 'react';

import { useTranslation, } from "react-i18next";

import { AuthContext } from '../../Context';

import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  Row,
  ScrollView,
  Switch,
  Text
} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';

import * as Components from "../../Components";

const ProfileTab = ({ user, }) => {

  const { t } = useTranslation();
  const [auth, setAuth] = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (text, name) => {
    if (name === "currentPassword") setCurrentPassword(text);
    if (name === "password") setPassword(text);
    if (name === "confirmPassword") setConfirmPassword(text);
  }

  const handleLogout = () => {
    console.log('logout');

    setAuth((auth) => {
      return {
        ...auth,
        authorized: false,
      }
    });
  }

  return (

    <Box flex={1} bgColor="white">

      <Box alignItems={"center"} p={3}>
        <Box flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} width="100%" px={3} m={5}>
          <Text
            fontWeight={700}
          >
            {t('screens.profile.tabs.settings.language')}
          </Text>
          <Components.LanguageSelector />
        </Box>

        <Box flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} width="100%" px={3} m={5}>
          <Text
            fontWeight={700}
          >
            {t('screens.profile.tabs.settings.allowPushNotifications')}
          </Text>
          <Switch size="sm" onTrackColor={"primary.500"} />
        </Box>

        <Box flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} width="100%" px={3} m={5}>
          <Text
            fontWeight={700}
          >
            {t('screens.profile.tabs.settings.changePassword')}
          </Text>
          <Pressable onPress={() => setShowChangePassword(!showChangePassword)}>
            <Icon color={"black"} as={FontAwesome} name={(showChangePassword) ? "chevron-up" : "chevron-down"} />
          </Pressable>

        </Box>
      </Box>


      {(showChangePassword) &&
        <Box width="100%" bgColor={"gray.50"}>
          <Box px={3}>
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
                value={currentPassword}
                placeholder={t("screens.profile.tabs.settings.fields.currentPassword.placeholder")}
                onChangeText={(text) => handleChange(text, "currentPassword")}
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
                value={password}
                placeholder={t("screens.login.fields.password.placeholder")}
                onChangeText={(text) => handleChange(text, "password")}
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
                value={confirmPassword}
                placeholder={t("screens.register.fields.confirmPassword.placeholder")}
                onChangeText={(text) => handleChange(text, "confirmPassword")}
              />
            </FormControl>
          </Box>
        </Box>
      }


      <Box alignItems={"center"} px={3}>
        <Box flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} width="100%" px={3} m={5}>
          <Text
            fontWeight={700}
          >
            {t('screens.profile.tabs.settings.logOut')}
          </Text>
          <Pressable onPress={handleLogout}>
            <Icon color={"black"} as={FontAwesome} name={"power-off"} />
          </Pressable>

        </Box>
      </Box>

    </Box>

  )
}

export default ProfileTab;