import { Button, Modal, Text, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useContext, useState,  } from "react";


import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AuthContext,  
  UserContext,
} from "../../../Context";

const LogOutModal = ({
  show,
  onClose,
}) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const handleOnClose = () => {
    if (onClose) onClose();
  }

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("unbox-litter-the-click-3-auth");
    await AsyncStorage.removeItem("unbox-litter-the-click-3-user");
    await AsyncStorage.removeItem("unbox-litter-the-click-3-token");
    await AsyncStorage.removeItem("unbox-litter-the-click-3-tokenExpires");
    await AsyncStorage.removeItem("unbox-litter-the-click-3-refreshToken");
    await AsyncStorage.removeItem("unbox-litter-the-click-3-refreshTokenExpires");
    await AsyncStorage.removeItem("unbox-litter-the-click-3-appPushId");


    setAuth((a) => {
      return {
        ...a,
        authenticated: false,
      };
    });

    setUser();
        
  };

  return (
    <Modal
      isOpen={show}
      onClose={() => handleOnClose()}
      size={'xl'}
    >
      <Modal.Content bg={'white'} px={5}>
        <Modal.CloseButton
          _icon={Object({ color: colors.primary["600"] })}
          _pressed={Object({ bg: 'white' })}
        />
        <Modal.Header
          bg={'white'}
          pb={3}
          px={1}
        >
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'primary.600'}
          >
            Log out?
          </Text>
        </Modal.Header>
        <Modal.Body pt={11}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={'bold'}
            color={'primary.600'}
            mb={3}
          >
            Are you sure you want to log out?
          </Text>          
          <Button
            onPress={() => handleLogOut()}
            colorScheme={'primary'}
            _text={Object({ fontWeight: 'bold' })}
          >
            Log out
          </Button>
          <Button
            bg={'white'}
            onPress={() => handleOnClose()}
            _text={Object({ color: colors.primary["600"], fontWeight: 'bold' })}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default LogOutModal