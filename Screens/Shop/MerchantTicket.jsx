import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import { CollapseThemed, ExpandThemed } from "../../Components/ThemedSVGs";
import { useNavigation } from "@react-navigation/native";

const MerchantTicket = ({ merchant }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { navigate } = useNavigation();

  const handleOpenMerchant = () => {
    navigate("MerchantDetails", { merchantId: merchant.id, });
    // setShowModal(true)
  };

  let openStatus = "";
  const openingHours = Array.isArray(JSON.parse(merchant.openingHours)) ? JSON.parse(merchant.openingHours) : [];

  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  console.log(currentTime, " - currentTime");

  let isOpen = false;
  let nextOpenDay = null;
  let nextOpenTime = null;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const today = daysOfWeek[currentDate.getDay()];

  for (const openingHour of openingHours) {
    if (openingHour.OpeningHoursSpecification) {
      const { dayOfWeek, opens, closes } = openingHour.OpeningHoursSpecification;

      if (dayOfWeek.includes(today)) {
        const openingTime = new Date(`1970-01-01T${opens}`);
        const closingTime = new Date(`1970-01-01T${closes}`);
        const currentTimeObj = new Date(`1970-01-01T${currentTime}`);

        if (currentTimeObj >= openingTime && currentTimeObj <= closingTime) {
          isOpen = true;
          nextOpenTime = closingTime;
          break;
        } else if (currentTimeObj < openingTime) {
          if (!nextOpenTime || openingTime < nextOpenTime) {
            nextOpenTime = openingTime;
            nextOpenDay = today;
          }
        } else {
          let nextDay = dayOfWeek.find((day) => daysOfWeek.indexOf(day) > daysOfWeek.indexOf(today));
          if (!nextDay) nextDay = dayOfWeek.pop();
          if (!nextOpenDay || daysOfWeek.indexOf(nextOpenDay) > daysOfWeek.indexOf(nextDay)) {
            nextOpenDay = nextDay;
            nextOpenTime = new Date(`1970-01-01T${opens}`);
          }
        }
      } else {
        let nextDay = dayOfWeek.find((day) => daysOfWeek.indexOf(day) > daysOfWeek.indexOf(today));
        if (!nextDay) nextDay = dayOfWeek.pop();
        if (!nextOpenDay || daysOfWeek.indexOf(nextOpenDay) > daysOfWeek.indexOf(nextDay)) {
          nextOpenDay = nextDay;
          nextOpenTime = new Date(`1970-01-01T${opens}`);
        }
      }
    }
  }

  if (isOpen) {
    const formattedNextOpenTime = nextOpenTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    openStatus = `Open until ${formattedNextOpenTime}`;
    console.log(openStatus);
  } else if (nextOpenDay && nextOpenTime) {
    const formattedNextOpenTime = nextOpenTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    openStatus = `Open at ${formattedNextOpenTime} ${nextOpenDay}`;
  } else {
    console.log("The business is closed and there are no more opening hours available.");
  }
  console.log(openStatus);

  return (
    <Box borderRadius="md" shadow={3} bg="white" mb={3}>
      <Pressable onPress={handleOpenMerchant}>
        <HStack justifyContent={"flex-start"} alignItems={"center"}>
          <Image
            source={Object({
              uri: merchant.img,
            })}
            alt="Merchant"
            width={"100px"}
            minHeight={'112px'}
            height={'100%'}
          />

          <VStack align={"start"} ml={3} flex={1}>
            <Text variant={"body2"} mt={"8px"} fontWeight={"bold"}>
              {merchant.company}
            </Text>
            <Text variant={"paragraph3"} mt={"2px"}>{merchant.category}</Text>
            <Text variant={"paragraph2"} mt={"4px"}>{merchant.visitingAddress}</Text>
            {merchant.phone && (
              <Text variant={"paragraph2"} mt={"4px"} colorScheme={"primary"}>
                {merchant.phone}
              </Text>
            )}
            {openStatus && (
              <Text
                mt={"4px"}
                mb={"8px"}
                variant={"paragraph3"}
                colorScheme={isOpen ? "highlight" : "danger"}
              >
                {openStatus}
              </Text>
            )}
          </VStack>

          {/* {!showDetails && <ExpandThemed />}
          {showDetails && <CollapseThemed />} */}
        </HStack>
        {showDetails && (
          <VStack>
            <Text variant={"paragraph2"} mt={3} mb={"2px"}>
              {merchant.details}
            </Text>
            <Text
              textAlign={"center"}
              variant={"paragraph2"}
              color={"primary.500"}
            >
              {merchant.email}
            </Text>
          </VStack>
        )}
      </Pressable>
    </Box>
  );
};

export default MerchantTicket;
