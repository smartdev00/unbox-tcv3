import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import { RefreshControl } from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";

import { UserContext } from "../../Context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SearchThemed } from "../../Components/ThemedSVGs";

import JoinCommunityModal from "./Communities/JoinCommunityModal";
import LeaveCommunityModal from "./Communities/LeaveCommunityModal";

import { AppConfig } from "../../config";

const Stack = createNativeStackNavigator();

const CommunityItem = ({ community, onJoined, onLeft, }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleJoinModal = () => {
    setShowJoinModal(true);
  };

  const handleLeaveModal = () => {
    setShowLeaveModal(true);
  };
  
  return (
    <>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        borderRadius={12}
        // padding={"13px"}
        pr={3}
        rounded={12}
        mb={3}
      >
        <Pressable
          onPress={() => {
            if (community.member) {
              navigate("CommunityDetails", {
                id: community.id,
                headerTitle: community.name,
              });
            }
          }}
        >
          <HStack space={3}>
            <Image
              source={Object({
                uri: AppConfig.rootUri + community.assetUri,
              })}
              alt={community.name}
              // size="xl"
              resizeMode="contain"
              width={"100px"}
              height={"100px"}
            />

            <VStack justifyContent={"space-evenly"} flex={1}>
              <Text fontSize={"20px"} fontWeight={600}>
                {community.name}
              </Text>

              {community.member ? (
                <Button
                  onPress={() => handleLeaveModal()}
                  // colorScheme="primary"
                  variant={"outline"}
                  size={"sm"}
                  borderColor={"#B3B3B3"}
                  borderWidth={1}
                  bgColor="#B3B3B3"
                  _text= {Object({
                    color:"white",
                    fontWeight: 700
                  })}
                >
                  {t("litter:screens.communities.leave")}
                </Button>
              ) : (
                <Button
                  onPress={() => handleJoinModal()}
                  // colorScheme="primary"
                  // variant={"outline"}                  
                  bgColor={"white"}
                  borderColor={"primary.600"}
                  borderWidth={1}
                  size={"sm"}                  
                  _text= {Object({
                    color:"primary.600",
                    fontWeight: 700
                  })}
                >
                  {t("litter:screens.communities.join")}
                </Button>
              )}
            </VStack>
          </HStack>
        </Pressable>
      </Box>
      <JoinCommunityModal
        community={community}
        show={showJoinModal}
        onModalClosed={() => setShowJoinModal(false)}
        onJoined={() => onJoined()}
      />
      <LeaveCommunityModal
        community={community}
        show={showLeaveModal}
        onModalClosed={() => setShowLeaveModal(false)}
        onLeft={() => onLeft()}
      />
    </>
  );
};

const CommunitySearch = () => {
  const [value, setValue] = useState("");

  const handleChange = (text) => setValue(text);

  return (
    <Box px={30} bgColor="white">
      <HStack alignItems={"center"} space={2} mt={6} mb={18}>
        <SearchThemed />
        <Input
          value={value}
          onChangeText={handleChange}
          flex={1}
          rounded={20}
          h={30}
          placeholder={"Search..."}
          InputRightElement={
            <Pressable onPress={() => setValue("")}>
              <Image
                source={require("../../assets/images/search-reset.png")}
                alt="search reset"
                w={"12px"}
                h={"12px"}
                mr={"10px"}
              />
            </Pressable>
          }
        />
      </HStack>
      <Divider />
    </Box>
  );
};

const CommunitiesTab = () => {
  const { t } = useTranslation();

  const [communities, setCommunities] = useState();
  const [refreshing, setRefreshing] = useState(true);

  const [listConsumersQuery] = useLazyQuery(
    gql(queries.communitiesListDetailed),
    {
      fetchPolicy: "no-cache",
    }
  );

  const loadCommunities = async () => {
    console.log("loadCommunities");
    try {
      const { data, error } = await listConsumersQuery();
      setRefreshing(true);
      if (error) {
        console.log("listConsumersQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        console.log(JSON.stringify(data, null, 2));

        const combinedCommunities = data.communityList.items.map(
          (community) => {
            return {
              ...community,
              member: data.userCommunities.communities.includes(community.id),
            };
          }
        );

        setCommunities(combinedCommunities);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCommunities();
  }, []);

  return (
    <>
      {/* <CommunitySearch /> */}
      <ScrollView
        bgColor="white"
        px={30}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadCommunities} />
        }
      >
        <Text my={3}>{t("litter:screens.communities.preText")}</Text>
        {communities &&
          communities.map((community, key) => (
            <CommunityItem
              community={community}
              key={key}
              onJoined={() => loadCommunities()}
              onLeft={() => loadCommunities()}
            />
          ))}
        <Text my={3}>{t("litter:screens.communities.postText")}</Text>
      </ScrollView>
    </>
  );
};

export default CommunitiesTab;
