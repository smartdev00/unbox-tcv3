import React, { useEffect, useState } from "react";
// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import { useNavigation } from "@react-navigation/native";
// import Carousel from "react-native-reanimated-carousel";

import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import CarouselComp from "../../Components/Carousel";
import Pagination from "../../Components/Pagination";
import { CloseIconThemed } from "../../Components/ThemedSVGs";
import { Alert, TouchableOpacity } from "react-native";
import { gql, useLazyQuery } from "@apollo/client";
import * as queries from "../../graphql/queries";
import { AppConfig } from "../../config";

const Notifications = () => {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([]);

  const [fetchNotifications] = useLazyQuery(gql(queries.pushNotificationList), {
    fetchPolicy: "no-cache",
  });
  
  const fetchPushNotifications= async () => {
    const { data, error } = await fetchNotifications();

    if (error) {
      console.log(error);
      return;
    }
    
    setNotifications(data.pushNotificationList.items);

  };
  
  useEffect(() => {
    fetchPushNotifications();

  }, [fetchNotifications]);
  

  //carousel index
  const [index, setIndex] = useState(0);


  const renderItem = ({ item }) => {

    return (
        <Box
          flex={1}
        >
          <Text color="primary.600" fontWeight={700}> {item.subject} </Text>
          <Text> {item.body} </Text>

          <Image
            alignSelf={"center"}
              source={Object({
                uri: AppConfig.rootUri + item.image,
              })}
              alt={item.subject}
              resizeMode="contain"
              width={"70px"}
              height={"70px"}
            />

        </Box>
    )
  };

  if(!notifications || notifications.length === 0) return null;

  return (
    <Box
      mb={3}
    >
      <Text variant={"body2"} fontWeight={"bold"} ml={3} mb={3}>
        {t("litter:screens.dashboard.notifications.title")}
      </Text>

      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        mb={1}
      >
        <HStack w={"100%"}>
          <CarouselComp data={notifications} renderItem={renderItem} setIndex={setIndex} />
        </HStack> 

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 10,
          }}
          
          onPress={() => {
            setNotifications(notifications.filter((_, i) => i !== index));
          }}
        >
          <CloseIconThemed />
        </TouchableOpacity>

      </Box>

        <Box
          alignItems={"center"}
        >
          <Pagination data={notifications} index={index} />
        </Box>
    </Box>
  );
};

export default Notifications;
