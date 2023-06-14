import React from "react";

import { useTranslation, } from "react-i18next";

import * as Location from 'expo-location';

import Permission from "./Permission";

const RequestLocation = ({ navigation }) => {
  
  const { t } = useTranslation();

  const handleRequestLocationPermissions = async () => {    
    const { status } = await Location.requestForegroundPermissionsAsync();    
    if (status === "granted") {
      navigation.navigate("Scan");
    }
  }


  return (
    <Permission 
      navigation={navigation}
      _translations={ {
        title: t('screens.permissions.request-location.title'),
        instructions: t('screens.permissions.request-location.instructions'),
        label: t('screens.permissions.request-location.button'),
      }}
      onPress={handleRequestLocationPermissions}
      color={"primary"} 
      iconName="location-arrow"
    />
  )
}

export default RequestLocation;