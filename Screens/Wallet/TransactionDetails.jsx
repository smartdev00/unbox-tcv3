import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";

import format from "date-fns/format";

import { useTranslation } from "react-i18next";

import { AppConfig } from "../../config";

import { SvgUri } from "react-native-svg";
import { Linking, Pressable } from "react-native";
import VoucherRedeemModal from "../Shop/VoucherRedeemModal";
import VoucherPurchaseModal from "../Shop/VoucherPurchaseModal";
import moment from "moment";
import { gql, useLazyQuery } from "@apollo/client";
import * as queries from "../../graphql/queries";
import { BalanceContext } from "../../Context";
import { useContext, useEffect, useRef, useState } from "react";
import MapboxGL from "@rnmapbox/maps";
import { useNavigation } from "@react-navigation/native";

MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox);
MapboxGL.setAccessToken(AppConfig.mapboxAccessToken);

const PendingLitterTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color="#B3B3B3">
          {t("litter:screens.transaction.pendingLitter.title")}
        </Text>

        <Text fontWeight={700} color="#B3B3B3">
          {t("litter:screens.transaction.pendingLitter.subTitle")}
        </Text>

        <Image
          source={Object({
            uri: AppConfig.rootUri + transaction.litter.imageUri,
          })}
          alt={transaction.litter.productType}
          // size="xl"
          resizeMode="contain"
          width={"250px"}
          height={"250px"}
        />        
      </VStack>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.referenceNumber")}
            </Text>
            <Text>{transaction.id}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t("litter:screens.transaction.summary.scanTime")}</Text>
            <Text>
              {format(new Date(transaction.dateAdded), "hh:mm a, dd-MMM-yyyy")}
            </Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.itemType`)}</Text>
            <Text>{transaction.litterType}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.pending", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const ApprovedLitterTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color={"primary.600"}>
          {t("litter:screens.transaction.approvedLitter.title")}
        </Text>

        <Text fontWeight={700}>
          {t("litter:screens.transaction.approvedLitter.subTitle")}
        </Text>

        <Image
          source={Object({
            uri: AppConfig.rootUri + transaction.litter.imageUri,
          })}
          alt={transaction.litter.productType}
          // size="xl"
          resizeMode="contain"
          width={"250px"}
          height={"250px"}
        />
      </VStack>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.referenceNumber")}
            </Text>
            <Text>{transaction.id}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t("litter:screens.transaction.summary.scanTime")}</Text>
            <Text>
              {format(new Date(transaction.dateAdded), "hh:mm a, dd-MMM-yyyy")}
            </Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.itemType`)}</Text>
            <Text>
              {transaction.litter.productType.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.amount", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const BadgeTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color={"primary.600"}>
          {t("litter:screens.transaction.badgeWon.title")}
        </Text>

        <Text fontWeight={700}>
          {t("litter:screens.transaction.badgeWon.subTitle")}
        </Text>

        <SvgUri uri={AppConfig.rootUri + transaction.badge.images.won} />
      </VStack>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.achievement`)}</Text>
            <Text>{transaction.badge.name}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.amount", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const ReferrerTransaction = ({ transaction }) => {
  const { t } = useTranslation();
  return (
    <Box alignItems={"center"} m={3}>
      <VStack space={3} alignItems={"center"}>
        <Text fontSize={"20px"} fontWeight={700} color={"primary.600"}>
          {t("litter:screens.transaction.referenceCode.title")}
        </Text>

        <Text fontWeight={700}>
          {t("litter:screens.transaction.referenceCode.subTitle")}
        </Text>
      </VStack>

      <Box my={5} p={4} bgColor={"primary.400"} borderRadius={"8px"}>
        <Text color={"white"} fontSize={"25px"} fontWeight={700}>
          {transaction.referenceCode || "REFERENCE CODE"}
        </Text>
      </Box>

      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        padding={"13px"}
        rounded={12}
        my={3}
        width={"100%"}
      >
        <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
          {t("litter:screens.transaction.summary.title")}
        </Text>
        <Divider my={1} />
        <VStack>
          <HStack justifyContent={"space-between"}>
            <Text>{t(`litter:screens.transaction.summary.referenceCode`)}</Text>
            <Text>{transaction.referenceCode || "REFERENCE CODE"}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>
              {t("litter:screens.transaction.summary.amount", {
                currency: "CUC",
              })}
            </Text>
            <Text>{transaction.amount}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
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

const OrderTransaction = ({ transaction, setTransactions, buyMode=false }) => {

  const { t } = useTranslation();
  const navigation = useNavigation();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [qrImg, setQRImg] = useState();
  const [dateRedeemed, setDateRedeemed] = useState();
  const [datePurchased, setDatePurchased] = useState();
  const [qrCode, setQRCode] = useState();
  const [balance, setBalance] = useContext(BalanceContext);
  const [expiryDate, setExpiryDate] = useState();
  const mapRef = useRef();

  const [myVoucherDetailsQuery] = useLazyQuery(gql(queries.myVoucherDetails), {
    fetchPolicy: "no-cache",
  });

  const loadMyVoucher = async () => {
    console.log("voucher.orderLineId", transaction.orderLineId);

    const { data, error } = await myVoucherDetailsQuery({
      variables: {
        orderLineId: transaction.orderLineId,
      },
    });
    if (error) {
      console.log("myVoucherDetailsQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2), "my vouchers");
      setQRImg(data.myVoucher.qrCodeUrl);
      setQRCode(data.myVoucher.code);
      setDateRedeemed(data.myVoucher.dateRedeemed);
      setDatePurchased(data.myVoucher.datePurchased);
      setExpiryDate(data.myVoucher.dateExpires);
    }
  };

  useEffect(() => {
    console.log("11voucher// ", transaction);
      loadMyVoucher();
  }, []);


  return (
    <ScrollView px={30} showsVerticalScrollIndicator={false} bgColor="white">
      <Box my={6}>
        {buyMode && (
          <HStack justifyContent={"center"} mb={4}>
            <Image
              source={Object({
                uri: transaction.img,
              })}
              alt="Voucher"
              width={"216px"}
              height={"151px"}
            />
          </HStack>
        )}
        {transaction.retailer && (
          <>
            <Pressable
              onPress={() =>
                navigate("MerchantDetails", {
                  merchantId: transaction.retailer?.id,
                })
              }
            >
              <Text
                variant={"heading2"}
                colorScheme={"primary"}
                textAlign={"center"}
              >
                {transaction.retailer?.company || ""}
              </Text>
            </Pressable>
            <Divider my={1} />
          </>
        )}
        <Text variant={"heading3"} textAlign={"center"} mb={11}>
          {transaction.name}
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
              isDisabled={transaction.price > balance}
            >
              {t('vouchers:purchaseVoucher.buyNow')}
            </Button>
          </HStack>
        )}

        {!buyMode && qrImg && (
          <>
            {transaction.qrStatus !== "purchased" ? (
              <>
                <Text variant={"body3"} fontWeight={"bold"} my={4} textAlign={"center"}>
                  {t('vouchers:redeemVoucher.redeemed.description')}
                </Text>
                <Text variant={"body2"} fontWeight={"bold"}>
                  {t('vouchers:redeemVoucher.redeemed.date')}
                </Text>
                <Text variant={"body3"} fontWeight={"bold"} colorScheme={"primary"}>
                  {moment(dateRedeemed).format('DD-MMM yyyy hh:mm:ss')}
                </Text>
                <Text variant={"body3"} my={4}>
                  {t('vouchers:redeemVoucher.redeemed.consumer')}
                </Text>
                <Text variant={"body3"}>
                  {t('vouchers:redeemVoucher.redeemed.retailer')}
                </Text>
              </>
            ) : (
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
            )}
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
          mt={5}
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
            {t('vouchers:info.price')}
          </Text>
          <Text variant={"body3"} mb={4}>
            {transaction.price} CUC
          </Text>
          <Text variant={"body2"} fontWeight={"bold"}>
            {t('vouchers:form.description.label')}
          </Text>
          <Text variant={"body3"} mb={4}>
            {transaction.description}
          </Text>
          {!buyMode && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                {t('vouchers:info.date')}
              </Text>
              <Text variant={"body3"} mb={4}>
                {moment(datePurchased).format('DD/MM/yyyy')}
              </Text>
            </>
          )}
          <Text variant={"body2"} fontWeight={"bold"}>
            {t('vouchers:form.terms.label')}
          </Text>
          <Text variant={"body3"} mb={4}>
            {transaction.terms}
          </Text>
          {transaction.retailer && transaction.retailer.website && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                {t('vouchers:form.website.label')}
              </Text>

              <HStack justifyContent={"space-between"} mb={4}>

                <HStack space={1} alignItems={"center"} >
                  <Text variant={"body3"} onPress={()=> {
                    let url = transaction.retailer?.website;
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                      url = `http://${url}`;
                    }
                
                    Linking.openURL(url)
                      .catch(error => {
                        console.error('Error opening URL:', error);
                      });
                  }}
                  >
                    {transaction.retailer?.website}
                  
                  </Text>

                </HStack>
              </HStack>
            </>
          )}

          {transaction.visitingAddress && (
            <>
              <Text variant={"body2"} fontWeight={"bold"}>
                {t('vouchers:form.location.label')}
              </Text>
              <Text variant={"body3"} mb={4}>
                {transaction.visitingAddress}
              </Text>
            </>
          )}

          {transaction.retailer &&
            transaction.retailer.location &&
            transaction.retailer.location.latitude !== 0 &&
            transaction.retailer.location.longitude !== 0 && (
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
                onPress={() => {
                  const lat = transaction.retailer.location.latitude;
                  const lng = transaction.retailer.location.longitude;

                  const latLng = `${lat},${lng}`;
                  const label = transaction.retailer.name;

                  const scheme = Platform.select({
                    ios: 'maps:0,0?q=',
                    android: 'geo:0,0?q='
                  });

                  Linking.canOpenURL(scheme + latLng)
                    .then(supported => {
                      if (!supported) {
                        console.log(`Can't handle url: ${url}`);
                      } else {
                        if (Platform.OS === 'ios') {
                          ActionSheetIOS.showActionSheetWithOptions(
                            {
                              options: ['Apple Maps', 'Google Maps', 'waze', 'Cancel'],
                              cancelButtonIndex: 3,
                              title: 'Selection',
                              message: 'Select Navigation App'
                            },
                            buttonIndex => {
                              if (buttonIndex === 0) {
                                Linking.openURL(`${scheme}${label}@${latLng}`);
                              } else if (buttonIndex === 1) {
                                Linking.openURL(`comgooglemaps://?q=${latLng}`);
                              } else if (buttonIndex === 2) {
                                Linking.openURL(`waze://?ll=${latLng}&navigate=yes`);
                              }
                            }
                          );
                        } else { 
                          Linking.openURL(`${scheme}${latLng}(${label})`);
                        }
                      }
                    })
                    .catch(err => console.error('An error occurred', err));
                }}
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
                    transaction.retailer.location.longitude,
                    transaction.retailer.location.latitude,
                  ]}
                />
                <VoucherMarkerLayer merchant={transaction.retailer} />
              </MapboxGL.MapView>
            )}
        </Box>

        {!buyMode && transaction.qrStatus === "purchased" && (
          <>
            <Text variant={"body3"} mx={2}>
              {t('vouchers:redeemVoucher.redeemNotice')}
            </Text>
          </>
        )}

        
        {!buyMode && (
          <Button
            bg={transaction.qrStatus !== "purchased" ? "secondary.700" : "primary.600"}
            onPress={() => (
              transaction.qrStatus !== "purchased" ? 
                navigation.goBack() : setShowRedeemModal(true)
            )}
            mt={4}
          >
            {transaction.qrStatus !== "purchased" 
              ? t('vouchers:redeemVoucher.close')
              : t('vouchers:redeemVoucher.redeemNow')}
          </Button>
        )}
      </Box>
      <VoucherPurchaseModal
        {...{
          showPurchaseModal,
          setShowPurchaseModal,

          voucher: transaction,
        }}
      />
      <VoucherRedeemModal
        {...{
          showRedeemModal,
          setShowRedeemModal,
          voucher: transaction,
          setVouchers: setTransactions,
          qrCode
        }}
      />
    </ScrollView>
  );
};
const TransactionDetails = ({ route }) => {
  // console.log(route)
  console.log(JSON.stringify(route.params.transaction.referrer, null, 2));

  const transactionItem = ({ transaction }) => {
    switch (transaction.referrer) {
      case "litter-collection-pending":
        return <PendingLitterTransaction transaction={transaction} />;
      case "litter-collection":
        return <ApprovedLitterTransaction transaction={transaction} />;
      case "badge-won":
        return <BadgeTransaction transaction={transaction} />;
      case "litter-collection-referrer-code":
        return <ReferrerTransaction transaction={transaction} />;
      case "orders":
        return <OrderTransaction transaction={transaction} setTransactions={route.params.setTransactions} />;
    }
  };

  return (
    <ScrollView bgColor={"white"} px={3}>
      {transactionItem({ transaction: route.params.transaction })}
      {/* <Text>Transaction Details</Text>
    <Text>{JSON.stringify(route.params.transaction, null, 2)}</Text> */}
    </ScrollView>
  );
};

export default TransactionDetails;
