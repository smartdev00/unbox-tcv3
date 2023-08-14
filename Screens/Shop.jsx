import { Box, Text, useTheme } from "native-base";
import { useEffect, useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { useTranslation } from "react-i18next";
import VouchersTab from "./Shop/VouchersTab";

import PartnersTab from "./Shop/PartnersTab";
import MerchantsTab from "./Shop/MerchantsTab";
// import MyFavouritesTab from "./Shop/MyFavouritesTab";
import MyVouchersTab from "./Shop/MyVouchersTab";
import { useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VoucherDetails from "./VoucherDetails";
import MyVoucherDetails from "./MyVoucherDetails";
import MerchantDetails from "./MerchantDetails";
import MerchantVouchers from "./MerchantVouchers";
import Success from "./Success";
import PartnerDetails from "./PartnerDetails";

const Stack = createNativeStackNavigator();

const ShopTabs = ({ route }) => {
  const { t } = useTranslation();

  const tabRoutes = [
    { key: "vouchers", title: t("litter:screens.shop.tabs.vouchers.title") },
    { key: "partners", title: t("litter:screens.shop.tabs.partners.title") },
    { key: "merchants", title: t("litter:screens.shop.tabs.merchants.title") },
    // {
    //   key: "myFavourites",
    //   title: t("litter:screens.shop.tabs.myFavourites.title"),
    // },
    {
      key: "myVouchers",
      title: t("litter:screens.shop.tabs.myVouchers.title"),
    },
  ];

  const getTabRouteIndex = ({ tabKey }) => {    
    const index = tabRoutes.map((r) => r.key).indexOf(tabKey);
    return !index || index < 0 ? null : index;
  };

  const { colors } = useTheme();
  const layout = useWindowDimensions();

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
    vouchers: VouchersTab,
    partners: PartnersTab,
    merchants: MerchantsTab,
    // myFavourites: MyFavouritesTab,
    myVouchers: MyVouchersTab,
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

const Shop = ({ route }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  
  return (
    <Stack.Navigator labelStyle>
      <Stack.Screen
        name="ShopTabs"
        component={ShopTabs}
        options={Object({ headerShown: false })}
      />
      <Stack.Screen
        name="VoucherDetails"
        component={VoucherDetails}
        options={Object({
          headerShown: true,
          title: t('vouchers:form.title'),
          headerTintColor: colors["primary"]["600"],
          headerBackTitle: t('vouchers:back')
        })}
      />
      <Stack.Screen
        name="MyVoucherDetails"
        component={MyVoucherDetails}
        options={Object({
          headerShown: true,
          title: t('vouchers:form.title'),
          headerTintColor: colors["primary"]["600"],
          headerBackTitle: t('vouchers:back')
        })}
      />
      <Stack.Screen
        name="MerchantDetails"
        component={MerchantDetails}
        options={Object({
          headerShown: true,
          title: 'Merchant Details',
          headerTintColor: colors["primary"]["600"],
        })}
      />
      <Stack.Screen
        name="MerchantVouchers"
        component={MerchantVouchers}
        options={Object({
          headerShown: true,
          headerTintColor: colors["primary"]["600"],
        })}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={Object({ headerShown: false })}
      />
      <Stack.Screen
        name="PartnerDetails"
        component={PartnerDetails}
        options={Object({ headerShown: false })}
      />
    </Stack.Navigator>
  );
};

export default Shop;
