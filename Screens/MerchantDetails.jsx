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
import { useEffect, useState, useRef } from "react";

import MapboxGL from "@rnmapbox/maps";

import * as ThemedSVGs from "../Components/ThemedSVGs";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { AppConfig } from "../config";
import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";
import { ActivityIndicator, Linking } from "react-native";

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

const MerchantMarkerLayer = ({ merchant }) => {
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
        // minZoomLevel={8}
        style={Object({
          iconImage: "pin",
        })}
      />
    </MapboxGL.ShapeSource>
  );
};

const MerchantDetails = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { merchantId } = route.params;
  const mapRef = useRef();
  const { navigate } = useNavigation();
  const [merchant, setMerchant] = useState();
  const [loading, setLoading] = useState(true);

  console.log(route.params);

  const [getRetailerQuery] = useLazyQuery(gql(queries.retailerGet), {
    fetchPolicy: "no-cache",
  });

  const handleMakeCall = async () => {
    Linking.openURL(`tel:${merchant.phone}`);
  };

  const handleMerchantLink = async () => {
    if (new RegExp("^(http|https)://", "i").test(merchant.website))
      await Linking.openURL(merchant.website);
    else await Linking.openURL(`https://${merchant.website}`);
  };

  const loadMerchant = async () => {
    const { data, error } = await getRetailerQuery({
      variables: {
        merchantId,
      },
    });
    if (error) {
      console.log("getRetailerQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2));
      setMerchant({
        ...data.retailerGet,        
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMerchant();
  }, []);

  if (loading) return <ActivityIndicator color={colors.primary[600]} />;
  if (!merchant) return <Text>Merchant not found</Text>;

  return (
    <ScrollView px={30} showsVerticalScrollIndicator={false} bgColor="white">
      <Box my={6}>
        <HStack justifyContent={"center"} mb={4}>
          <Image
            source={Object({
              uri: merchant.img,
            })}
            alt="Merchant"
            width={"216px"}
            height={"151px"}
          />
        </HStack>
        <Text variant={"heading2"} colorScheme={"primary"} textAlign={"center"}>
          {merchant.name || ""}
        </Text>
        <Box
          borderWidth={1}
          borderColor={"primary.600"}
          rounded={12}
          p={4}
          my={11}
        >
          <Text variant={"body2"} fontWeight={"bold"}>
            Category
          </Text>
          <Text variant={"body3"} mb={4}>
            {merchant.category}
          </Text>
          {merchant.description && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                Description
              </Text>

              <Text variant={"body3"} mb={4}>
                {merchant.description}
              </Text>
            </>
          )}

          {merchant.phone && (
            <Pressable onPress={handleMakeCall}>
              <Text variant={"body2"} fontWeight={"bold"}>
                Phone
              </Text>
              <Text variant={"body3"} mb={4}>
                {merchant.phone}
              </Text>
            </Pressable>
          )}
          {merchant.website && (
            <Pressable onPress={handleMerchantLink}>
              <Text variant={"body2"} fontWeight={"bold"}>
                Website
              </Text>
              <Text variant={"body3"} mb={4}>
                {merchant.website}
              </Text>
            </Pressable>
          )}
          {merchant.visitingAddress && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                Location
              </Text>

              <Text variant={"body3"} mb={4}>
                {merchant.visitingAddress}
              </Text>
            </>
          )}

          {/* <Text variant={"heading3"} textAlign={"center"} mb={11}>
        {voucher.name}
      </Text>
      {!buyMode && (
        <>
          <Box bg={"wheat"} mb={4}>
            QR placeholder
          </Box>
          <Text variant={"body2"} textAlign={"center"} mb={3}>
            Placeholder QR Number: 42
          </Text>
          <Box
            borderWidth={1}
            borderColor={"primary.600"}
            rounded={12}
            mb={11}
            p={4}
            pb={2}
          >
            <Text
              variant={"body2"}
              colorScheme={"primary"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              Voucher code:
            </Text>
            <Button rounded={8}>7BVAWDH</Button>
          </Box>
        </>
      )}
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        rounded={12}
        p={4}
        mb={11}
      >

        <Text variant={"body2"} fontWeight={"bold"}>
          Price
        </Text>
        <Text variant={"body3"} mb={4}>
          {voucher.price} Ucoins
        </Text>
        <Text variant={"body2"} fontWeight={"bold"}>
          Description
        </Text>
        <Text variant={"body3"} mb={4}>
          {voucher.description}
        </Text>

        <Text variant={"body2"} fontWeight={"bold"}>
          Location
        </Text>
        <Text variant={"body3"} mb={4}>
          {voucher.visitingAddress}
        </Text>
        <Text variant={"body2"} fontWeight={"bold"}>
          Terms
        </Text>
        <Text variant={"body3"}>{voucher.terms}</Text>
      </Box>
      <Divider mb={11} /> */}

          {merchant.location &&
            merchant.location.latitude !== 0 &&
            merchant.location.longitude !== 0 && (
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
                    merchant.location.longitude,
                    merchant.location.latitude,
                  ]}
                />
                <MerchantMarkerLayer merchant={merchant} />
              </MapboxGL.MapView>
            )}
        </Box>
        {/* <HStack mb={7} justifyContent={"space-between"}>
        {/* <HStack space={1} alignItems={"center"}>
          <ThemedSVGs.DirectionsThemed />
          <Text variant={"body3"}>Get Directions</Text>
        </HStack> 
        <HStack space={1} alignItems={"center"}>
          <ThemedSVGs.WebsiteThemed />
          <Text variant={"body3"}>View Website</Text>
        </HStack>
      </HStack> */}

        <Box mt={11}>
          <Button onPress={() => navigate("MerchantVouchers", { merchant })}>
            All Vouchers
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default MerchantDetails;
