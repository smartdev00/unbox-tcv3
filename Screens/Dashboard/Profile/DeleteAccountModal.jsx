import { Button, FormControl, Input, Modal, Text, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { AuthContext, UserContext } from "../../../Context";
import * as mutations from "../../../graphql/mutations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogOutModal = ({ show, onClose }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);  
  const [deleteConfirmation, setDeleteConfirmation] = useState("")

  const handleOnClose = () => {
    if (onClose) onClose();
  };

  const [deleteAccountMutation] = useMutation(gql(mutations.deleteAccount), {
    fetchPolicy: "no-cache",
  });

  const handleDeleteAccount = async () => {
    const { data } = await deleteAccountMutation({
      onError(err) {
        console.log(err);
        // if (err.graphQLErrors[0].exception === "UserExists") {
        //   console.log('user already exists, deal with it')
        // }
      },
    });

    if (data) {


      await AsyncStorage.removeItem("unbox-litter-the-click-3-auth");
      await AsyncStorage.removeItem("unbox-litter-the-click-3-user");
      await AsyncStorage.removeItem("unbox-litter-the-click-3-token");
      await AsyncStorage.removeItem("unbox-litter-the-click-3-tokenExpires");
      await AsyncStorage.removeItem("unbox-litter-the-click-3-refreshToken");
      await AsyncStorage.removeItem("unbox-litter-the-click-3-refreshTokenExpires");
      setAuth((a) => {
        return {
          ...a,
          authenticated: false,
        };
      });

      setUser();
    }
  };

  return (
    <Modal isOpen={show} onClose={() => handleOnClose()} size={"xl"}>
      <Modal.Content bg={"white"} px={5}>
        <Modal.CloseButton
          _icon={Object({ color: colors.primary["600"] })}
          _pressed={Object({ bg: "white" })}
        />
        <Modal.Header bg={"white"} pb={3} px={1}>
          <Text fontSize={18} fontWeight={"bold"} color={"primary.600"}>
            Delete account?
          </Text>
        </Modal.Header>
        <Modal.Body pt={11}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={"bold"}
            color={"primary.600"}
            mb={3}
          >
            Type delete below if you are sure you want to delete your account.
          </Text>
          <Text fontSize={13} lineHeight={18} fontWeight={"bold"} mb={3}>
            This action cannot be undone.
          </Text>

          <FormControl mb={18}>        
        <Input
          value={deleteConfirmation || ''}
          onChangeText={(text) => setDeleteConfirmation(text)}
          placeholder={"delete"}
          bg="#ffffff"
          h={36}
        />        
      </FormControl>
          
          <Button
            isDisabled={!(deleteConfirmation.toLowerCase() === "delete")}
            onPress={() => handleDeleteAccount()}
            colorScheme={"primary"}
            _text={Object({ fontWeight: "bold" })}
          >
            Delete Account
          </Button>
          <Button
            bg={"white"}
            onPress={() => handleOnClose()}
            _text={Object({ color: colors.primary["600"], fontWeight: "bold" })}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default LogOutModal;
