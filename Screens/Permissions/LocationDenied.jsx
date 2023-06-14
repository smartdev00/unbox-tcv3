import React from "react";

import { useTranslation, } from "react-i18next";

import * as Location from 'expo-location';

import Permission from "./Permission";

const LocationDenied = ({ navigation }) => {
  
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
        title: t('screens.permissions.location-denied.title'),
        instructions: t('screens.permissions.location-denied.instructions'),
        label: t('screens.permissions.location-denied.button'),
      }}
      onPress={handleRequestLocationPermissions}
      color={"highlight"} 
      iconName="location-arrow"
    />
  )
}

export default LocationDenied;