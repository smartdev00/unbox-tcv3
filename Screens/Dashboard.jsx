import React, { useContext, useEffect, useState, } from "react";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";

import { useTranslation } from "react-i18next";

import { Text, useTheme } from "native-base";

import { useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import HomepageTab from "./Dashboard/Homepage";

import AchievementsTab from "./Dashboard/AchievementsTab";
import ProfileTab from "./Dashboard/Profile";
import CommunitiesTab from "./Dashboard/CommunitiesTab";

import PersonalDetails from "./PersonalDetails";
import EditDetails from "./EditDetails";
import ChangePassword from "./ChangePassword";
import FAQ from "./FAQ";
import Legal from "./Legal";
import About from "./About";
import CommunityDetails from "./CommunityDetails";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const DashboardTabs = ({route }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  
  const [tabRoutes] = React.useState([
    {
      key: "homepage",
      title: t("litter:screens.dashboard.tabs.homepage.title"),
    },
    {
      key: "achievements",
      title: t("litter:screens.dashboard.tabs.achievements.title"),
    },
    {
      key: "communities",
      title: t("litter:screens.dashboard.tabs.communities.title"),
    },
    {
      key: "profile",
      title: t("litter:screens.dashboard.tabs.myProfile.title"),
    },
  ]);

  const getTabRouteIndex = ({ tabKey }) => {    
    const index = tabRoutes.map((r) => r.key).indexOf(tabKey);
    return !index || index < 0 ? null : index;
  };

  const [index, setIndex] = useState(
    getTabRouteIndex({ tabKey: route.params?.tab }) || 0
  );
  const [routes] = useState(tabRoutes);

  useEffect(() => {
    setIndex(getTabRouteIndex({ tabKey: route.params?.tab }) || 0);
  }, [route]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{paddingLeft: 4, paddingRight: 4}}
      renderLabel={({ route, focused, color }) => {
        return (
          <Text
            color={focused ? "primary.600" : "black"}
            fontSize={"12px"}
            fontWeight={"700"}
          >
            {route.title}
          </Text>
        );
      }}
      indicatorStyle={Object({ backgroundColor: colors["primary"]["600"] })}
      style={Object({ backgroundColor: "white" })}
    />
  );

  
  const renderScene = SceneMap({
    homepage: HomepageTab,     
    // overview: OverviewTab,
    achievements: AchievementsTab,
    communities: CommunitiesTab,
    profile: ProfileTab,
  });

  return (
    <TabView
      navigationState={Object({ index, routes })}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={Object({ width: layout.width })}
    />
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Stack.Navigator 
      labelStyle>
      <Stack.Screen
        name="DashboardTabs"
        component={DashboardTabs}
        options={Object({ headerShown: false, })}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}        
        options={Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: 'Personal Details',})}
      />
      <Stack.Screen
        name="EditDetails"
        component={EditDetails}
        options={Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: 'Edit Details',})}
      /> 
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: 'Change Password',})}
      />       
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: 'FAQs',})}
      />            
      <Stack.Screen
        name="Legal"
        component={Legal}
        options={Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: 'Legal',})}
      />      
      <Stack.Screen
        name="About"
        component={About}
        options={Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: 'About',})}
      />      
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetails}
        options={
          ({ route }) =>  
            Object({ headerShown: true, headerTintColor: colors["primary"]["600"], title: route.params.headerTitle || "Community Details",})          
        }              
      />            
    </Stack.Navigator>
  );
};

export default Dashboard;
