import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import { useContext, useState, useRef, useEffect } from "react";
import { SvgUri } from "react-native-svg";

import MapboxGL from "@rnmapbox/maps";

import * as ThemedSVGs from "../Components/ThemedSVGs";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { AppConfig } from "../config";

import VoucherRedeemModal from "./Shop/VoucherRedeemModal";
import VoucherPurchaseModal from "./Shop/VoucherPurchaseModal";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";

import Markers from "../Components/Map/Markers";

import { BalanceContext } from "../Context";

MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox);
MapboxGL.setAccessToken(AppConfig.mapboxAccessToken);

const logoPosition = {
  bottom: 15,
  left: 15,
};

const attributionPosition = {
  bottom: 15,
  right: 15,
};

const styleUrl = MapboxGL.StyleURL.Street;

const VoucherMarkerLayer = ({ merchant }) => {
  const merchantGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            merchant.location.longitude,
            merchant.location.latitude,
          ],
        },
        properties: {
          company: merchant.company,
        },
      },
    ],
  };

  console.log(merchantGeoJSON);

  return (
    <MapboxGL.ShapeSource
      id={"merchantSource"}
      type={"geojson"}
      // onPress={(feature) => onShapeSourceLayer(feature)}
      shape={merchantGeoJSON}
    >
      <MapboxGL.SymbolLayer
        id={"merchantLayer"}
        sourceID={"merchantSource"}
        // minZoomLevel={
        style={Object({
          iconImage: "pin",
        })}
      />
    </MapboxGL.ShapeSource>
  );
};

const VoucherDetails = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { voucher, buyMode } = route.params;
  const mapRef = useRef();
  const { navigate } = useNavigation();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [qrImg, setQRImg] = useState();
  const [qrCode, setQRCode] = useState();
  const [balance, setBalance] = useContext(BalanceContext);

  const [myVoucherDetailsQuery] = useLazyQuery(gql(queries.myVoucherDetails), {
    fetchPolicy: "no-cache",
  });

  const loadMyVoucher = async () => {
    console.log("voucher.orderLineId", voucher.orderLineId);

    const { data, error } = await myVoucherDetailsQuery({
      variables: {
        orderLineId: voucher.orderLineId,
      },
    });
    if (error) {
      console.log("myVoucherDetailsQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2));
      setQRImg(data.myVoucher.qrCodeUrl);
      setQRCode(data.myVoucher.code);
    }
  };

  useEffect(() => {
    if (!route.params.buyMode) {
      console.log("load more data");
      loadMyVoucher();
    }
  }, [route.params]);

  return (
    <ScrollView px={30} showsVerticalScrollIndicator={false} bgColor="white">
      <Box my={6}>
        {buyMode && (
          <HStack justifyContent={"center"} mb={4}>
            <Image
              source={Object({
                uri: voucher.img,
              })}
              alt="Voucher"
              width={"216px"}
              height={"151px"}
            />
          </HStack>
        )}
        {voucher.retailer && (
          <>
            <Pressable
              onPress={() =>
                navigate("MerchantDetails", {
                  merchantId: voucher.retailer?.id,
                })
              }
            >
              <Text
                variant={"heading2"}
                colorScheme={"primary"}
                textAlign={"center"}
              >
                {voucher.retailer?.name || ""}
              </Text>
            </Pressable>
            <Divider my={1} />
          </>
        )}
        <Text variant={"heading3"} textAlign={"center"} mb={11}>
          {voucher.name}
        </Text>
        {buyMode && (
          <HStack space={4} alignItems={"center"} my={4}>
            {/* removed in pilot
          {voucher.favourite && (
            <Pressable onPress={() => console.log("change")}>
              <ThemedSVGs.FavouriteThemed />
            </Pressable>
          )}
          {!voucher.favourite && (
            <Pressable onPress={() => console.log("change")}>
              <ThemedSVGs.NotFavouriteThemed />
            </Pressable>
          )}
          */}
            <Button
              colorScheme={"primary"}
              onPress={() => setShowPurchaseModal(true)}
              flex={1}
              isDisabled={voucher.price > balance}
            >
              Buy Now
            </Button>
          </HStack>
        )}

        {!buyMode && qrImg && (
          <>
            <Box
              alignItems={"center"}
              p={5}
              m={5}
              shadow={3}
              borderRadius="md"
              bg="white"
            >
              <SvgUri width={250} height={250} uri={qrImg} />
            </Box>
            <Box alignItems={"center"} m={5}>
              <Text>Voucher Code:</Text>
              <Text variant={"heading2"} colorScheme={"primary"}>
                {qrCode}
              </Text>
            </Box>
          </>
        )}

        {/* {!buyMode && (
          <>
            <Divider my={1} />
            <HStack justifyContent={"center"} mb={4}>
              <Image
                source={Object({
                  uri: voucher.img,
                })}
                alt="Merchant section"
                width={"216px"}
                height={"151px"}
              />
            </HStack>
          </>
        )} */}

        <Box
          borderWidth={1}
          borderColor={"primary.600"}
          rounded={12}
          p={4}
          mt={3}
          mb={11}
        >
          {/* removed for pilot
        <Text variant={"body2"} fontWeight={"bold"}>
          Voucher Type
        </Text>
        <Text variant={"body3"} mb={4}>
          Placeholder type
        </Text> */}
          <Text variant={"body2"} fontWeight={"bold"}>
            {buyMode ? "Price" : "Cost"}
          </Text>
          <Text variant={"body3"} mb={4}>
            {voucher.price} CUC
          </Text>
          <Text variant={"body2"} fontWeight={"bold"}>
            Description
          </Text>
          <Text variant={"body3"} mb={4}>
            {voucher.description}
          </Text>
          {/* removed for pilot
        <Text variant={"body2"} fontWeight={"bold"}>
          Expiry Date
        </Text>
        <Text variant={"body3"} mb={4}>
          Placeholder date
        </Text>
        */}

          <Text variant={"body2"} fontWeight={"bold"}>
            Terms
          </Text>
          <Text variant={"body3"} mb={4}>
            {voucher.terms}
          </Text>
          {voucher.retailer && voucher.retailer.website && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                Website
              </Text>

              <HStack justifyContent={"space-between"} mb={4}>
                {/* <HStack space={1} alignItems={"center"}>
          <ThemedSVGs.DirectionsThemed />
          <Text variant={"body3"}>Get Directions</Text>
        </HStack> */}
                <HStack space={1} alignItems={"center"}>
                  {/* <ThemedSVGs.WebsiteThemed /> */}
                  <Text variant={"body3"}>{voucher.retailer?.website}</Text>
                </HStack>
              </HStack>
            </>
          )}

          {voucher.visitingAddress && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                Location
              </Text>
              <Text variant={"body3"} mb={4}>
                {voucher.visitingAddress}
              </Text>
            </>
          )}

          {voucher.retailer &&
            voucher.retailer.location &&
            voucher.retailer.location.latitude !== 0 &&
            voucher.retailer.location.longitude !== 0 && (
              <MapboxGL.MapView
                animated={false}
                ref={mapRef}
                // zoomEnabled={false}
                // scrollEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                styleURL={styleUrl}
                style={Object({ height: 200 })}
                // logoPosition={logoPosition}
                // attributionPosition={attributionPosition}
                localizeLabels={true}
              >
                <MapboxGL.Images
                  images={Object({
                    pin: {
                      uri: `https://uat.the-click.app/assets/public/images/marker.png`,
                    },
                    // current: { uri: `${application.assets}/current-location.png` },
                  })}
                />
                <MapboxGL.UserLocation />
                <MapboxGL.Camera
                  zoomLevel={13}
                  centerCoordinate={[
                    voucher.retailer.location.longitude,
                    voucher.retailer.location.latitude,
                  ]}
                />
                <VoucherMarkerLayer merchant={voucher.retailer} />
              </MapboxGL.MapView>
            )}
        </Box>

        {/* {!buyMode && (
          <>
            <Text variant={"body2"} fontWeight={"bold"}>
              Notice:
            </Text>
            <Text variant={"body3"} mb={6}>
              Placeholder notice
            </Text>
          </>
        )} */}

        {/*todo continue below*/}

        {/* {!buyMode && (
          <Button
            colorScheme={"primary"}
            onPress={() => setShowRedeemModal(true)}
          >
            Redeem Now
          </Button>
        )} */}
      </Box>
      <VoucherPurchaseModal
        {...{
          showPurchaseModal,
          setShowPurchaseModal,

          voucher,
        }}
      />
      <VoucherRedeemModal
        {...{
          showRedeemModal,
          setShowRedeemModal,
          voucher,
        }}
      />
    </ScrollView>
  );
};

export default VoucherDetails;
