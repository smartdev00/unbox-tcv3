import React from "react";

import { useTranslation, } from "react-i18next";

import { Camera, } from 'expo-camera';

import Permission from "./Permission";

const CameraDenied = ({ navigation }) => {
  
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
        title: t('screens.permissions.camera-denied.title'),
        instructions: t('screens.permissions.camera-denied.instructions'),
        label: t('screens.permissions.camera-denied.button'),
      }}
      onPress={handleRequestCameraPermissions}
      color={"highlight"} 
      iconName="camera-retro"
    />
  )
}

export default CameraDenied;