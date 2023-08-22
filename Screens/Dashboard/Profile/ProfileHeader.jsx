import { Box, Button, Circle, Divider, Icon, Modal, Spinner, Text, useTheme } from "native-base";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../Context";
import { Alert, Image, Pressable, TouchableOpacity } from "react-native";
import { EmptyProfileAvatar } from "../../../assets/svg";
import ImageCropPicker from "react-native-image-crop-picker";
import RNFS from 'react-native-fs';
import { gql, useMutation } from "@apollo/client";
import * as mutations from '../../../graphql/mutations';
import { AppConfig } from "../../../config";

const ProfilePhotoModal = ({ show, onModalClose }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [user, setUser] = useContext(UserContext);

  const [image, setImage] = useState();
  const [buttonText, setButtonText] = useState("Take a photo");
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(gql(mutations.updateAvatar), {
    fetchPolicy: 'no-cache',
  });

  const handleModalClose = () => {
    onModalClose && onModalClose();
    setImage(null);
    setButtonText("Take a photo");
  };

  const handleSave = async() => {

    if(image){
      try{
        setLoading(true);
        const imageBuffer = await RNFS.readFile(image.path, 'base64');
        const dataURL = `data:${image.mime};base64,${imageBuffer}`;

        const result = await updateAvatar({
          variables: {
            givenName: user.givenName,
            name: 'avatar',
            data: dataURL,
          }
        });

        console.log(result);
        await setUser({...user, avatar: result.data.userUpdate.avatarUri});
        handleModalClose();

        setLoading(false);

      }catch(error){
        console.log(error);
      }
    }

  };

  const processImage = async (result) => {
    if (result && result.path) {
      try {
        const croppedImage = await ImageCropPicker.openCropper({
          path: result.path,
          width: 300,
          height: 300,
          cropping: true,
          cropperCircleOverlay: true,
          cropperToolbarTitle: "move and scale",
          cropperToolbarWidget: "", 
          cropperChooseText: "Next",
          cropperChooseColor: colors.primary['600'],
          cropperCancelText: "Back",
          cropperCancelColor: colors.white,
          loadingLabelText: "Processing...",
          hideBottomControls: true,
          enableRotationGesture: true,
          cropperRotateButtonsHidden: true,
        });

        console.log('Cropped image:', croppedImage.path);
        setImage(croppedImage);
        setButtonText("Save");

      } catch (error) {
        console.log('Error cropping image:', error);
      }
    }
  };

  const showLibrary = async () => {
    try {
      const result = await ImageCropPicker.openPicker({
        mediaType: "photo",
      });
      if (!result.cancelled) {
        processImage(result);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };
  
  const openCamera = async () => {
    try {
      const result = await ImageCropPicker.openCamera({
        useFrontCamera: true,
        mediaType: "photo",
  
      });
      if (!result.cancelled) {
        processImage(result);
      }
    } catch (error) {
      console.log("Error opening camera:", error);
    }
  };



  return (
    <Modal isOpen={show} onClose={handleModalClose} size={"xl"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body alignItems={"center"}>
          <Text mt={3} fontSize={20} fontWeight={700} color={colors.primary['600']}>
            {t("litter:screens.dashboard.tabs.profile.photo-modal.title")}
          </Text>
          <Divider my={3} />
          <Box my={5}>
            {image ? (
              
              <Image
                source={{ uri: image.path }}
  
                style={{ width: 100, height: 100, borderRadius: 100 }}

              />
            ) : user.avatar ? 
              <Image 
                source={Object({ uri: AppConfig.rootUri + user.avatar })}
                style={{ width: 100, height: 100, borderRadius: 100 }} /> : (
                <Circle size={100} bgColor={"primary.600"} mb={15}>
                  <Text color="white" fontSize="40px">{user.initials}</Text>
                </Circle>
              )}

          </Box>
            
          <Button
            mt={5}
            mb={1}
            _text={{
              textTransform: "uppercase",
            }}
            borderWidth={1}
            borderColor={colors.primary['600']}
            onPress={!image ? openCamera : handleSave}
            width="80%"
          >
            {loading ? <Spinner color={"white"} /> : buttonText}
          </Button>

          <Button
            mb={3}
            borderColor={colors.primary['600']}
            borderWidth={1}
            backgroundColor="transparent"
            _text={{
              textTransform: "uppercase",
              color: colors.primary['600'],
            }}
            _pressed={{
              backgroundColor: "transparent",
            }}
            onPress={handleModalClose}
            width={"80%"}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const ProfileHeader = () => {
  const { t } = useTranslation("profile");
  const [user] = useContext(UserContext);
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false);

  if (!user) return null;

  return (
    <Box alignItems={"center"} py={10}>
      <Pressable
        onPress={() => setShowProfilePhotoModal(true)}
      >
        {user.avatar ? 
            <Image 
              source={Object({ uri: AppConfig.rootUri + user.avatar })}
              style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 15 }} /> : (
              <Circle size={51} bgColor={"primary.600"} mb={15}>
                <Text color="white" fontSize="24px">{user.initials}</Text>
              </Circle>
            )}

        {/* <Circle size={51} bgColor={"primary.600"} mb={15}>
          <Text color="white" fontSize="24px">{user.initials}</Text>
        </Circle> */}

      </Pressable>
      <Text variant="heading2">{user.displayName}</Text>
      <Text variant={"paragraph2"} color={"#B3B3B3"}>{user.email}</Text>
      <ProfilePhotoModal
        show={showProfilePhotoModal}
        onModalClose={() => setShowProfilePhotoModal(false)}
      />
    </Box>
  );
};

export default ProfileHeader;
