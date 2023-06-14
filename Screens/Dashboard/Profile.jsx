import { ScrollView, } from "native-base";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileOptions from "./Profile/ProfileOptions";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ProfileTab = () => {
  return (
    <ScrollView bgColor="white">
      <ProfileHeader />
      <ProfileOptions />
    </ScrollView>
  );
};

export default ProfileTab;
