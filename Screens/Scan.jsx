import React, { useContext, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import { Camera, CameraType } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImageManipulator from "expo-image-manipulator";
import * as Location from "expo-location";

import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Image,
  Modal,
  Select,
  Text,
} from "native-base";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

import { t } from "i18next";

import * as turf from "@turf/turf";

import { ApplicationContext, BalanceContext } from "../Context";
import { isConstValueNode } from "graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ScanningStatusTypes = {
  NONE: null,
  INITIALIZING: "initializing",
  SCANNING: "scanning",
  CHECKING: "checking",
  CHECKED: "checked",
  CAPTURING: "capturing",
  LOCATION_OFF: "locationOff",
  OUTSIDE_GEOFENCE: "outsideGeofence",
  TOO_MANY_ITEMS: "tooManyItems",
  NO_CAMERA: "noCamera",
};

const storageRecording = "the-click-3-plogging-recording";
const storageRecordingLitters = "the-click-3-plogging-data";

const ScanningStatusBar = ({ scanningStatus }) => {
  if (!scanningStatus) return null;

  return (
    <Box
      alignItems={"center"}
      backgroundColor="primary.600"
      width={"100%"}
      position={"absolute"}
      bottom={100}
    >
      <Text color={"white"} my={4} textAlign={"center"}>
        {t(`litter:screens.scan.status.${scanningStatus}`)}
      </Text>
    </Box>
  );
};

const ScanRecognisedModal = ({ show, onModalClosed, onSubmit, image }) => {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [promise, setPromise] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setSubmitting(false);
    setAllowSubmit(false);
    setPromise(false);
  };

  const handleModalClose = () => {
    if (onModalClosed) {
      reset();
      onModalClosed();
    }
  };

  const togglePromise = () => {
    setPromise((p) => {
      return !p;
    });
  };

  const handleSubmitPress = () => {
    if (onSubmit) {
      setSubmitting(true);
      onSubmit();
    }
  };

  useEffect(() => {
    if (show) reset();
  }, [show]);

  useEffect(() => {
    setAllowSubmit(promise);
  }, [promise]);

  return (
    <Modal isOpen={show} onClose={handleModalClose} size={"xl"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Box alignItems={"center"} mt={5}>
            <Text fontSize={24} fontWeight={700} color={"primary.600"}>
              {t("litter:screens.scan.modal.recognised.title")}
            </Text>
            <Text my={3} fontSize={14} fontWeight={700}>
              {t("litter:screens.scan.modal.recognised.subtitle")}
            </Text>

            {image && (
              <AspectRatio ratio={image.width / image.height} height={200}>
                <Image
                  source={Object({ uri: image.data })}
                  alt="Litter Image"
                />
              </AspectRatio>
            )}

            <Checkbox
              onChange={() => togglePromise()}
              isChecked={promise}
              my={2}
            >
              <Text fontSize={14}>
                {t("litter:screens.scan.modal.recognised.promise")}
              </Text>
            </Checkbox>

            <Button
              my={2}
              bg={allowSubmit ? "primary.600" : "gray.500"}
              width="80%"
              disabled={!allowSubmit || submitting}
              onPress={() => handleSubmitPress()}
              _text={Object({
                fontSize: 14,
                fontWeight: 700,
              })}
            >
              {submitting
                ? t("litter:screens.scan.buttons.submitting")
                : t("litter:screens.scan.buttons.submit")}
            </Button>
            <Button
              mb={2}
              bg={"gray.500"}
              width="80%"
              disabled={submitting}
              onPress={() => handleModalClose()}
              _text={Object({
                fontSize: 14,
                fontWeight: 700,
              })}
            >
              {t("litter:screens.scan.buttons.cancel")}
            </Button>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const ScanNotRecognisedModal = ({ show, onModalClosed, onSubmit, image }) => {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [promise, setPromise] = useState(false);
  const [itemType, setItemType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setSubmitting(false);
    setAllowSubmit(false);
    setPromise(false);
    setItemType("");
  };

  const handleModalClose = () => {
    if (onModalClosed) {
      reset();
      onModalClosed();
    }
  };

  const togglePromise = () => {
    setPromise((p) => {
      return !p;
    });
  };

  const handleSubmitPress = () => {
    if (onSubmit) {
      setSubmitting(true);
      // reset();
      onSubmit(itemType);
    }
  };

  useEffect(() => {
    if (show) reset();
  }, [show]);

  useEffect(() => {
    setAllowSubmit(promise && itemType);
  }, [promise, itemType]);

  return (
    <Modal isOpen={show} onClose={handleModalClose} size={"xl"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Box alignItems={"center"} mt={5}>
            <Text fontSize={24} fontWeight={700} color={"primary.600"}>
              {t("litter:screens.scan.modal.unrecognised.title")}
            </Text>
            <Text my={3} fontSize={14} fontWeight={700}>
              {t("litter:screens.scan.modal.unrecognised.subtitle")}
            </Text>

            {image && (
              <AspectRatio ratio={image.width / image.height} height={200}>
                <Image
                  source={Object({ uri: image.data })}
                  alt="Litter Image"
                />
              </AspectRatio>
            )}

            <Select
              mx={3}
              my={3}
              width="100%"
              accessibilityLabel={t(
                "litter:screens.scan.modal.unrecognised.placeholder"
              )}
              placeholder={t(
                "litter:screens.scan.modal.unrecognised.placeholder"
              )}
              onValueChange={(value) => setItemType(value)}
              selectedValue={itemType}
              _selectedItem={Object({
                bg: "primary.600",
              })}
            >
              <Select.Item label={t("litter:screens.scan.litter.can")} value="can" />
              <Select.Item label={t("litter:screens.scan.litter.glassBottle")} value="glass-bottle" />
              <Select.Item label={t("litter:screens.scan.litter.plasticBottle")} value="plastic-bottle" />
              <Select.Item label={t("litter:screens.scan.litter.drinkCarton")} value="drink-carton" />
              <Select.Item label={t("litter:screens.scan.litter.paper")} value="paper" />
              <Select.Item label={t("litter:screens.scan.litter.cigarette")} value="cigarette" />
              <Select.Item label={t("litter:screens.scan.litter.gum")} value="chewing-gum" />
              <Select.Item label={t("litter:screens.scan.litter.plasticOther")} value="plastic-other" />
              <Select.Item label={t("litter:screens.scan.litter.other")} value="other" />
            </Select>

            <Checkbox
              onChange={() => togglePromise()}
              isChecked={promise}
              my={2}
            >
              <Text fontSize={14}>
                {t("litter:screens.scan.modal.unrecognised.promise")}
              </Text>
            </Checkbox>

            <Button
              my={2}
              bg={allowSubmit ? "primary.600" : "gray.500"}
              width="80%"
              disabled={!allowSubmit || submitting}
              onPress={() => handleSubmitPress()}
              _text={Object({
                fontSize: 14,
                fontWeight: 700,
              })}
            >
              {submitting
                ? t("litter:screens.scan.buttons.submitting")
                : t("litter:screens.scan.buttons.submit")}
            </Button>
            <Button
              mb={2}
              bg={"gray.500"}
              width="80%"
              disabled={submitting}
              onPress={() => handleModalClose()}
              _text={Object({
                fontSize: 14,
                fontWeight: 700,
              })}
            >
              {t("litter:screens.scan.buttons.cancel")}
            </Button>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const ManualPhotoModal = ({ show, onModalClosed, onSubmit, image }) => {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [promise, setPromise] = useState(false);
  const [itemType, setItemType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setSubmitting(false);
    setAllowSubmit(false);
    setPromise(false);
    setItemType("");
  };

  const handleModalClose = () => {
    if (onModalClosed) {
      reset();
      onModalClosed();
    }
  };

  const togglePromise = () => {
    setPromise((p) => {
      return !p;
    });
  };

  const handleSubmitPress = () => {
    if (onSubmit) {
      // reset();
      setSubmitting(true);
      onSubmit(itemType);
    }
  };

  useEffect(() => {
    if (show) reset();
  }, [show]);

  useEffect(() => {
    setAllowSubmit(promise && itemType);
  }, [promise, itemType]);

  return (
    <Modal isOpen={show} onClose={handleModalClose} size={"xl"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Box alignItems={"center"} mt={5}>
            <Text fontSize={24} fontWeight={700} color={"primary.600"}>
              {t("litter:screens.scan.modal.manual.title")}
            </Text>
            <Text my={3} fontSize={14} fontWeight={700}>
              {t("litter:screens.scan.modal.manual.subtitle")}
            </Text>

            {image && (
              <AspectRatio ratio={image.width / image.height} height={200}>
                <Image
                  source={Object({ uri: image.data })}
                  alt="Litter Image"
                />
              </AspectRatio>
            )}

            <Select
              mx={3}
              my={3}
              width="100%"
              accessibilityLabel={t(
                "litter:screens.scan.modal.manual.placeholder"
              )}
              placeholder={t("litter:screens.scan.modal.manual.placeholder")}
              onValueChange={(value) => setItemType(value)}
              selectedValue={itemType}
              _selectedItem={Object({
                bg: "primary.600",
              })}
            >
              <Select.Item label={t("litter:screens.scan.litter.can")} value="can" />
              <Select.Item label={t("litter:screens.scan.litter.glassBottle")} value="glass-bottle" />
              <Select.Item label={t("litter:screens.scan.litter.plasticBottle")} value="plastic-bottle" />
              <Select.Item label={t("litter:screens.scan.litter.drinkCarton")} value="drink-carton" />
              <Select.Item label={t("litter:screens.scan.litter.paper")} value="paper" />
              <Select.Item label={t("litter:screens.scan.litter.cigarette")} value="cigarette" />
              <Select.Item label={t("litter:screens.scan.litter.gum")} value="chewing-gum" />
              <Select.Item label={t("litter:screens.scan.litter.plasticOther")} value="plastic-other" />
              <Select.Item label={t("litter:screens.scan.litter.other")} value="other" />
            </Select>

            <Checkbox
              onChange={() => togglePromise()}
              isChecked={promise}
              my={2}
            >
              <Text fontSize={14}>
                {t("litter:screens.scan.modal.manual.promise")}
              </Text>
            </Checkbox>

            <Button
              my={2}
              bg={allowSubmit ? "primary.600" : "gray.500"}
              width="80%"
              disabled={!allowSubmit || submitting}
              onPress={() => handleSubmitPress()}
              _text={Object({
                fontSize: 14,
                fontWeight: 700,
              })}
            >
              {submitting
                ? t("litter:screens.scan.buttons.submitting")
                : t("litter:screens.scan.buttons.submit")}
            </Button>
            <Button
              mb={2}
              bg={"gray.500"}
              width="80%"
              disabled={submitting}
              onPress={() => handleModalClose()}
              _text={Object({
                fontSize: 14,
                fontWeight: 700,
              })}
            >
              {t("litter:screens.scan.buttons.cancel")}
            </Button>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const Scan = ({ navigation, route }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [showRecognisedModal, setShowRecognisedModal] = useState(false);
  const [showNotRecognisedModal, setShowNotRecognisedModal] = useState(false);
  const [showManualPhotoModal, setShowManualPhotoModal] = useState(false);
  const [recognised, setRecognised] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [cameraPermissionsRequested, setCameraPermissionsRequested] =
    useState(false);
  const [locationPermissionsRequested, setLocationPermissionsRequested] =
    useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState();
  const [cameraType] = useState(CameraType.back);
  const [ok, setOk] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [barcodeFound, setBarcodeFound] = useState();
  const [scanningStatus, setScanningStatus] = useState(
    ScanningStatusTypes.INITIALIZING
  );
  const [currentLocation, setCurrentLocation] = useState();
  const [insideGeofence, setInsideGeofence] = useState();
  const [locationSubscription, setLocationSubscription] = useState();
  const [application] = useContext(ApplicationContext);
  const cameraRef = useRef(null);
  const [image, setImage] = useState();
  const [balance, setBalance] = useContext(BalanceContext);
  const [packaging, setPackaging] = useState();

  // console.log(route.params)

  const handleRequestPhoto = async () => {
    if (
      hasCameraPermission &&
      !showRecognisedModal &&
      !showNotRecognisedModal &&
      scanningStatus === ScanningStatusTypes.SCANNING
    ) {
      setScanningStatus(ScanningStatusTypes.CAPTURING);
      setScanned(true);
      await takePicture();
      setShowManualPhotoModal(true);
    }
    console.log("TAKE A PHOTO");
  };

  const updateBalance = async () => {
    console.log("update balance");
    const { data, error } = await myBalanceQuery();
    if (data) {
      setBalance({
        value: data.myBalance.remaining
      });
    }
    if (error) {
      console.log(error);
    }
  };

  const [barcodeScanQuery] = useLazyQuery(gql(queries.barcodeScan), {
    fetchPolicy: "no-cache",
  });

  const [myBalanceQuery] = useLazyQuery(gql(queries.myBalance), {
    fetchPolicy: "no-cache",
  });

  const [submitLitterMutation] = useMutation(gql(mutations.submitLitter), {
    fetchPolicy: "no-cache",
  });

  const handleRecognisedClosed = () => {
    setBarcodeFound();
    setShowRecognisedModal(false);
    setScanned(false);
    setScanningStatus(ScanningStatusTypes.SCANNING);
  };

  const handleNotRecognisedClosed = () => {
    setBarcodeFound();
    setShowNotRecognisedModal(false);
    setScanned(false);
    setScanningStatus(ScanningStatusTypes.SCANNING);
  };

  const handleManualClosed = () => {
    setBarcodeFound();
    setShowManualPhotoModal(false);
    setScanned(false);
    setScanningStatus(ScanningStatusTypes.SCANNING);
  };

  const checkAndUpdateRecording = async (data) => {
    try {
  
      if (data) {
        
        await updateBalance();

        const isRecording = await AsyncStorage.getItem(storageRecording);
  
        if (JSON.parse(isRecording)) {
          const littersPloggingData = await AsyncStorage.getItem(storageRecordingLitters);
          const littersPlogging = littersPloggingData ? JSON.parse(littersPloggingData) : [];
          
          littersPlogging.push({
            id: data.litterCreate.id,
            latitude: data.litterCreate.location.latitude,
            longitude: data.litterCreate.location.longitude,
            dateAdded: data.litterCreate.dateAdded,
          });
  
          await AsyncStorage.setItem(storageRecordingLitters, JSON.stringify(littersPlogging));
          console.log('within the plog');
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  
  };

  const handleSubmitScan = async ({ itemType, closeModal }) => {
    const start = performance.now();
    const { longitude, latitude } = currentLocation.coords;
    const input = {
      barcode: barcodeFound?.data || "",
      location: { longitude, latitude },
      type: itemType || packaging,
      image: { data: image.data, name: image.name },
    };
  
    try {
      const { data } = await submitLitterMutation({
        variables: { input },
        onError(err) {
          console.log(err);
        },
      });
  
      checkAndUpdateRecording(data);
    } catch (err) {
      console.log(err);
    }

    closeModal();
    const end = performance.now();
    console.log(`Scan took ${end - start} milliseconds`);

  };

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log('camera perms', status);
    setCameraPermissionsRequested(true);
    return status === "granted";
  };

  const getLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log('location perms', status);
    setLocationPermissionsRequested(true);
    return status === "granted";
  };

  const takePicture = async () => {
    if (cameraRef) {
      const picture = await cameraRef.current.takePictureAsync();
      const resizedPicture = await ImageManipulator.manipulateAsync(
        picture.uri,
        [{ resize: { width: 600 } }],
        { base64: true }
      );
      // console.log(resizedPicture);
      setImage({
        name: `litter-image.jpg`,
        data: `data:image/jpg;base64,${resizedPicture.base64}`,
        width: resizedPicture.width,
        height: resizedPicture.height,
      });
    }
  };

  const handleBarcodeScanned = async (result) => {
    const { type, data } = result;
    setScanned(true);
    setScanningStatus(ScanningStatusTypes.SCANNED);
    await takePicture();
    setBarcodeFound({ type, data });
  };

  const checkBarcode = async () => {
    setScanningStatus(ScanningStatusTypes.CHECKING);
    const { data, error } = await barcodeScanQuery({
      variables: {
        barcode: barcodeFound.data,
      },
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log('checkbarcode', data);
      setScanningStatus(ScanningStatusTypes.CHECKED);
      if (data.barcodeScan.packaging) {     
        setPackaging(data.barcodeScan.packaging);   
        setShowRecognisedModal(true);
      } else {
        setPackaging();
        setShowNotRecognisedModal(true);
      }
    }
  };

  const handleOnBarCodeScanned = () => {
    if (scanned) return;

    switch (scanningStatus) {
      case ScanningStatusTypes.NONE:
      case ScanningStatusTypes.INITIALIZING:
      case ScanningStatusTypes.OUTSIDE_GEOFENCE:
      case ScanningStatusTypes.LOCATION_OFF:
        return;
      case ScanningStatusTypes.SCANNING:
        return handleBarcodeScanned;
    }
  };

  const handleCurrentLocationChanged = (currentLocation) => {
    if (!currentLocation) return;

    console.log(JSON.stringify(currentLocation, null, 2));

    var pt = turf.point([
      currentLocation.coords.longitude,
      currentLocation.coords.latitude,
    ]);
    console.log(pt);

    let found = false;

    for (let g = 0; g < application.geofences.length; g++) {
      var poly = turf.polygon([
        application.geofences[g].pointsArray.map((p) => {
          return [p.longitude, p.latitude];
        }),
      ]);
      found = turf.booleanPointInPolygon(pt, poly);
      if (found) break;
    }

    setInsideGeofence(found);
  };

  useEffect(() => {
    const { requestPhoto } = route.params;
    if (requestPhoto) {
      handleRequestPhoto();
    }
  }, [route.params]);

  useEffect(() => {
    if (barcodeFound) {
      checkBarcode();
    }
  }, [barcodeFound]);

  useEffect(() => {
    if (insideGeofence) {
      console.log("inside geofence");
      setScanningStatus(ScanningStatusTypes.SCANNING);
    } else {
      if (currentLocation) {
        console.log("outside geofence");
        setScanningStatus(ScanningStatusTypes.OUTSIDE_GEOFENCE);
      }
    }
  }, [insideGeofence]);

  useEffect(() => {
    handleCurrentLocationChanged(currentLocation);
  }, [currentLocation]);

  // useEffect(() => {
  //   if (!hasCameraPermission) setScanningStatus(ScanningStatusTypes.NO_CAMERA);
  // }, [hasCameraPermission]);

  useEffect(() => {
    _getLocationAsync = async () => {
      if (!locationSubscription) {
        const _locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 1,
          },
          (location) => {
            setCurrentLocation(location);
          }
        );
        setLocationSubscription(_locationSubscription);
      }
    };

    if (locationPermissionsRequested && !hasLocationPermission) {
      setScanningStatus(ScanningStatusTypes.LOCATION_OFF);
    }

    if (locationPermissionsRequested && hasLocationPermission) {
      _getLocationAsync();
    }
  }, [hasLocationPermission]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const cameraPermissionsGranted = await getCameraPermissions();
        setHasCameraPermission(cameraPermissionsGranted);

        const locationPermissionsGranted = await getLocationPermissions();
        setHasLocationPermission(locationPermissionsGranted);
      })();
    }, [])
  );

  if (!hasCameraPermission && cameraPermissionsRequested) {
    return (
      <Box flex={1} bg={"black"}>
        <ScanningStatusBar scanningStatus={ScanningStatusTypes.NO_CAMERA} />
      </Box>
    );
  }

  return (
    <>
      <Box flex={1} bg={"white"}>
        {isFocused && cameraPermissionsRequested && hasCameraPermission && (
          <Camera
            flex={1}
            type={cameraType}
            onBarCodeScanned={handleOnBarCodeScanned()}
            ref={cameraRef}
          />
        )}
        {!showRecognisedModal &&
          !showNotRecognisedModal &&
          !showManualPhotoModal && (
            <ScanningStatusBar scanningStatus={scanningStatus} />
          )}
      </Box>
      <ScanRecognisedModal
        show={showRecognisedModal}
        image={image}
        onModalClosed={handleRecognisedClosed}
        onSubmit={() =>
          handleSubmitScan({
            closeModal: () => handleRecognisedClosed(),
          })
        }
      />
      <ScanNotRecognisedModal
        show={showNotRecognisedModal}
        onModalClosed={handleNotRecognisedClosed}
        image={image}
        onSubmit={(itemType) =>
          handleSubmitScan({
            itemType,
            closeModal: () => handleNotRecognisedClosed(),
          })
        }
      />
      <ManualPhotoModal
        show={showManualPhotoModal}
        image={image}
        onModalClosed={handleManualClosed}
        onSubmit={(itemType) =>
          handleSubmitScan({
            itemType,
            closeModal: () => handleManualClosed(),
          })
        }
      />
    </>
  );
};

export default Scan;
