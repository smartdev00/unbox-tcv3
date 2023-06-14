import React from "react";

import { useTranslation, } from "react-i18next";

import { Camera, } from 'expo-camera';

import Permission from "./Permission";

const RequestCamera = ({ navigation }) => {
  
  const { t } = useTranslation();

  const handleRequestCameraPermissions = async () => {    
    const { status } = await Camera.requestCameraPermissionsAsync();    
    if (status === "granted") {
      navigation.navigate("Scan");
    }
  }


  return (
    <Permission 
      navigation={navigation}
      _translations={ {
        title: t('screens.permissions.request-camera.title'),
        instructions: t('screens.permissions.request-camera.instructions'),
        label: t('screens.permissions.request-camera.button'),
      }}
      onPress={handleRequestCameraPermissions}
      color={"primary"} 
      iconName="camera-retro"
    />
  )
}

export default RequestCamera;