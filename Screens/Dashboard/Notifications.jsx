import React, { useState } from "react";
// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import { useNavigation } from "@react-navigation/native";
// import Carousel from "react-native-reanimated-carousel";

import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import CarouselComp from "../../Components/Carousel";
import Pagination from "../../Components/Pagination";
import { CloseIconThemed } from "../../Components/ThemedSVGs";
import { TouchableOpacity } from "react-native";

const Notification = ({ notification }) => {
  return (
    <VStack justifyContent={"space-between"} mb={3} w={"100%"}>
      <Text color="primary.600" fontWeight={700}>
        {notification.subject}
      </Text>
      <Text>{notification.body}</Text>
    </VStack>
  );
};

const Notifications = () => {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([
    {
      subject: "A message from The Click",
      body: "Don't forget to Click today!",
    },
    {
      subject: "A message from The Click 1",
      body: "Don't forget to Click today 1!",
    },
    {
      subject: "A message from The Click 2",
      body: "Don't forget to Click today 2!",
    },
    {
      subject: "A message from The Click 3",
      body: "Don't forget to Click today 3!",
    },
    {
      subject: "A message from The Click 4",
      body: "Don't forget to Click today 4!",
    }

    // {
    //   subject: "A message from The Click 2",
    //   body: "Don't forget to Click today 2!",
    // },
  ]);

  //carousel index
  const [index, setIndex] = useState(0);


  const renderItem = ({ item }) => {
    return (
        <Box
          flex={1}
        >
          <Text color="primary.600" fontWeight={700}> {item.subject} </Text>
          <Text> {item.body} </Text>
          
          {/* using random image for the moment*/}
          <Image
              source={{ uri: "https://picsum.photos/200/300" }}
              alt="image base"
              resizeMode="cover"
              height={100}
              roundedTop="md"
              roundedBottom="md"
              m={2}
            />
            <Text color="primary.600" fontWeight={700} 
            textAlign={"center"}
          > {item.subject} ?</Text>
        </Box>
    )
  };


  if (!notifications || notifications.length === 0 ) return null;

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
            padding: 10,
          }}
          
          onPress={() => {
            setNotifications(notifications.filter((_, i) => i !== index));
          }}
        >
          <CloseIconThemed />
        </TouchableOpacity>

      </Box>

      <Pagination data={notifications} index={index} />
      
    </Box>
  );
};

export default Notifications;
