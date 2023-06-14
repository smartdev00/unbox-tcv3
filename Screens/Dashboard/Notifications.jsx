import React, { useState } from "react";
// import ProfileHeader from "./Profile/ProfileHeader";
// import ProfileOptions from "./Profile/ProfileOptions";
import { useNavigation } from "@react-navigation/native";
// import Carousel from "react-native-reanimated-carousel";

import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";

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
    // {
    //   subject: "A message from The Click 2",
    //   body: "Don't forget to Click today 2!",
    // },
  ]);

  if (!notifications) return null;

  return (
    <>
      <Text variant={"body2"} fontWeight={"bold"} ml={3} mb={3}>
        {t("litter:screens.dashboard.notifications.title")}
      </Text>

      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        mb={3}
      >
        <HStack w={"100%"}>
          {notifications &&
            notifications.map((notification, key) => (
              <Notification notification={notification} key={key} />
            ))}
        </HStack>
      </Box>
    </>
  );
};

export default Notifications;
