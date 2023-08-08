import React, { useContext, useEffect, useRef, useState } from "react";

import { useLazyQuery, gql } from "@apollo/client";
import MapboxGL from "@rnmapbox/maps";

import { ApplicationContext } from "../Context";

import { useTranslation } from "react-i18next";

import { useTheme, Box, HStack, Text } from "native-base";

import { AppConfig } from "../config";

import * as queries from "../graphql/queries";

import MapControls from "./Map/MapControls";
import MerchantMapTicket from "./Map/MerchantMapTicket";

import RecordControls from "./Map/RecordControls";
import PostRecordingModal from "./Map/PostRecordingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as turf from "@turf/turf";
import { buildGPX, BaseBuilder, } from 'gpx-builder';

const LOCATION_TASK_NAME = "the-click-3-background-location-task";

const storageRecording = "the-click-3-plogging-recording";
const storageRecordingStart = "the-click-3-plogging-recording-start";
const storageRecordingDistance = "the-click-3-plogging-recording-distance";
const storageLocations = "the-click-3-plogging-background-locations";
const storageRecordingLitters = "the-click-3-plogging-data";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    try {
      const { locations } = data;
      const { latitude, longitude, accuracy } = locations[0].coords;
      if (accuracy < 25) {

        const isRecording = await AsyncStorage.getItem(storageRecording);

        if (JSON.parse(isRecording)) {
          try {
            const previousLocationsValue = await AsyncStorage.getItem(
              storageLocations
            );
            let previousLocations = JSON.parse(previousLocationsValue) || [];
            let totalDistance = 0;


            if (previousLocations.length > 0) {
              const previousLocation = previousLocations[previousLocations.length - 1];

              const from = turf.point([
                previousLocation.longitude,
                previousLocation.latitude,
              ]);
              const to = turf.point([longitude, latitude]);
              const distance = turf.distance(from, to, { units: "meters" });

              const previousDistanceValue = JSON.parse(await AsyncStorage.getItem(storageRecordingDistance));
              totalDistance = Math.floor(previousDistanceValue + distance);
            }

            // console.log({ latitude, longitude, timestamp, totalDistance });

            previousLocations.push({ latitude, longitude, timestamp: new Date().getTime() });
            await AsyncStorage.setItem(storageLocations, JSON.stringify(previousLocations));
            await AsyncStorage.setItem(storageRecordingDistance, JSON.stringify(totalDistance));
            
          } catch (err) {
            console.log(err);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox);
MapboxGL.setAccessToken(AppConfig.mapboxAccessToken);

console.log(AppConfig.mapboxAccessToken);

const logoPosition = {
  bottom: 15,
  left: 15,
};

const attributionPosition = {
  bottom: 15,
  right: 15,
};

const styleUrl = MapboxGL.StyleURL.Street;

const RetailerMarkersLayer = ({ retailers, onSelectRetailer, }) => {

  const onRetailerPress = async (e) => {
    if (onSelectRetailer) onSelectRetailer(e.features[0].properties.retailer)
  }


  const retailersGeoJSON = {
    type: "FeatureCollection",
    features: retailers.map((retailer) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            retailer.location.longitude,
            retailer.location.latitude,
          ],
        },
        properties: {
          retailer,
        },
      };
    }),
  };

  return (
    <MapboxGL.ShapeSource
      id={"retailersSource"}
      type={"geojson"}
      onPress={(feature) => onRetailerPress(feature)}
      shape={retailersGeoJSON}
    >
      <MapboxGL.SymbolLayer
        id={"retailersLayer"}
        sourceID={"retailersSource"}
        minZoomLevel={8}
        style={Object({
          iconImage: "pin",
        })}
      />
    </MapboxGL.ShapeSource>
  );
};

const GeofencesLayer = () => {
  const [application] = useContext(ApplicationContext);
  const { colors } = useTheme();

  const geofencesGeoJSON = {
    type: "FeatureCollection",
    features: application.geofences.filter(geofence => geofence.visible).map((geofence) => {
      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            geofence.pointsArray.map((p) => {
              return [p.longitude, p.latitude];
            }),
          ],
        },
      };
    }),
  };

  return (
    <MapboxGL.ShapeSource
      id={"geofenceSource"}
      type={"geojson"}
      shape={geofencesGeoJSON}
    >
      <MapboxGL.FillLayer
        id={"geofenceLayer"}
        sourceId={"geofenceSource"}
        style={Object({
          fillColor: colors["primary"]["600"],
          fillOpacity: 0.1,
        })}
      />
      <MapboxGL.LineLayer
        id={"geofenceBorderLayer"}
        sourceID={"geofenceSource"}
        style={Object({
          lineColor: colors["primary"]["600"],
          lineWidth: 1,
        })}
      />
    </MapboxGL.ShapeSource>
  );
};

const PloggingLayer = () => {
  const { colors } = useTheme();

  return (
    <MapboxGL.VectorSource
      id={'vectorSource'}          
      tileUrlTemplates={[`https://uat.the-click.app/click-tiles/test-postgis/{z}/{x}/{y}.mvt`]}          
    >
      <MapboxGL.LineLayer
        id={'vectorLayer'}
        sourceID={'vectorSource'}
        sourceLayerID={'default'}     
        style={         
          {              
            lineCap: 'butt',
            lineJoin: 'miter',   
            lineOpacity: 1,              
            lineColor: [
              'case',
              ['<', ['get', 'score'], 33],
              colors.cleanlinessDirty.toString(),
              ['all', ['>=', ['get', 'score'], 33], ['<=', ['get', 'score'], 66]],
              colors.cleanlinessOkay.toString(),
              ['>', ['get', 'score'], 66],                  
              colors.cleanlinessClean.toString(),
              'gray',                  
            ],
            lineWidth: 3
          }
        }                  
      />
    </MapboxGL.VectorSource>
  )
}

const Map = ({ navigation }) => {
  const { t } = useTranslation();
  const mapRef = useRef();
  const [application] = useContext(ApplicationContext);
  const [insideGeofence, setInsideGeofence] = useState(true);
  const [retailers, setRetailers] = useState([]);

  const [followUserLocation, setFollowUserLocation] = useState(true);
  const [showMerchantsLayer, setShowMerchantsLayer] = useState(true);
  const [showPostRecordingModal, setShowPostRecordingModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState();
  

  const [showPloggingMenu, setShowPloggingMenu] = useState(false);

  const [recording, setRecording] = useState(false);
  const [recordingCount, setRecordingCount] = useState(0);
  const [gpx, setGpx] = useState();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);

  const [listRetailersQuery] = useLazyQuery(gql(queries.retailers), {
    fetchPolicy: "no-cache",
  });

  const [getRetailerQuery] = useLazyQuery(gql(queries.retailerGet), {
    fetchPolicy: "no-cache",
  });  

  const loadRetailers = async () => {
    const { data, error } = await listRetailersQuery();
    if (error) {
      console.log("listRetailersQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2));
      setRetailers(data.retailerList.items);
    }
  };


  const handleRecordingStart = async () => {
    try {
      setRecordingCount((prevCount) => prevCount + 1);
      setRecording(true);
  
      let { status } = await Location.requestBackgroundPermissionsAsync();
  
      await AsyncStorage.setItem(storageRecording, JSON.stringify(true));
      await AsyncStorage.setItem(
        storageRecordingStart,
        JSON.stringify(new Date())
      );
  
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        activityType: Location.LocationActivityType.Fitness,
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 2,
        showsBackgroundLocationIndicator: true,
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  const generateGpx = async () => {
    try {
      const gpxData = new BaseBuilder();
      const { Point, Metadata } = BaseBuilder.MODELS;
  
      gpxData.setMetadata(new Metadata({ name: 'theClick Activity' }));
  
      const jsonStorageLocations = await AsyncStorage.getItem(storageLocations);
      const locationData = JSON.parse(jsonStorageLocations) || [];
  
      if (locationData.length > 0) {
        const segmentPoints = locationData.map(p => new Point(p.latitude, p.longitude, { time: new Date(p.timestamp) }));
        gpxData.setSegmentPoints(segmentPoints);
      }
  
      const littersData = await AsyncStorage.getItem(storageRecordingLitters);
      const litters = JSON.parse(littersData) || [];
  
      if (litters.length > 0) {
        const wayPoints = litters.map(c => new Point(c.latitude, c.longitude, {
          time: new Date(c.dateAdded),
          extensions: { id: c.id },
        }));
        gpxData.setWayPoints(wayPoints);
      }
  
      const gpx = buildGPX(gpxData.toObject());
      return gpx;
    } catch (error) {
      console.error('Error generating GPX:', error);
      return null;
    }
};


  const handleRecordingStop = async () => {

    try {
      setRecording(false);

      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

      const plogGpx = await generateGpx();

      console.log(plogGpx)
      //get current journey GPX before clearing localstorage
      setGpx(plogGpx);

      await AsyncStorage.setItem(storageRecording, JSON.stringify(false));
      await AsyncStorage.setItem(storageLocations, JSON.stringify([]));
      await AsyncStorage.setItem(storageRecordingDistance, JSON.stringify(0));
      await AsyncStorage.setItem(storageRecordingLitters, JSON.stringify([]));
      setElapsedTime(0);
      setDistance(0);
      setShowPostRecordingModal(true);
    } catch (err) {
      console.log(err);
    }

  };

  const handlePostRecordingModalClose = async (result) => {
    setShowPostRecordingModal(false)
    setGpx();
  } 

  const onTimerInterval = async () => {
    const isRecording = await AsyncStorage.getItem(storageRecording);
    if (JSON.parse(isRecording)) {
      setRecording(true)
      const recordingStarted = await AsyncStorage.getItem(
        storageRecordingStart
      );
      setElapsedTime(new Date() - new Date(JSON.parse(recordingStarted)));
      const recordingDistance = await AsyncStorage.getItem(
        storageRecordingDistance
      );
      setDistance(recordingDistance);
    }
  };  

  const handleMerchantLayerChanged = (selected) => {
    if (!selected) setSelectedMerchant();
    setShowMerchantsLayer(selected);
  }

  const handleOnSelectRetailer = async (selectedRetailer) => {    
      const { data, error } = await getRetailerQuery({
      variables: {
        merchantId: selectedRetailer.id,
      },
    });
    if (error) {
      console.log("getRetailerQuery", error);
      // throw GraphQLException(error);
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2));      
      setSelectedMerchant({
        ...data.retailerGet,        
      });
    }
    
  }

  useEffect(() => {
    loadRetailers();
    const interval = setInterval(() => {
      onTimerInterval();
      // if (JSON.parse(isRecording)) {
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box flex={1}>
      <MapboxGL.MapView
        animated={false}
        ref={mapRef}
        zoomEnabled={true}
        style={Object({ flex: 1 })}
        styleURL={styleUrl}
        logoPosition={logoPosition}
        attributionPosition={attributionPosition}
        localizeLabels={true}
        rotateEnabled={false}
        onPress={() => setSelectedMerchant()}
      >
        <MapboxGL.Images
          images={Object({
            pin: { uri: `https://uat.the-click.app/assets/public/images/marker.png` },
            // current: { uri: `${application.assets}/current-location.png` },
          })}
        />
        <MapboxGL.UserLocation />
        { followUserLocation && 
        <MapboxGL.Camera zoomLevel={ 11 } centerCoordinate={[5.4051, 51.2213]} followUserLocation={followUserLocation}/>}
        { !followUserLocation && 
        <MapboxGL.Camera zoomLevel={ 11 } centerCoordinate={[5.4051, 51.2213]} followUserLocation={!followUserLocation}/>}

        {retailers && retailers.length > 0 && showMerchantsLayer && 
        <RetailerMarkersLayer 
          retailers={retailers} 
          onSelectRetailer={(retailer) => handleOnSelectRetailer(retailer)}
        />}

        <MapControls 
          isRecording={recording || showPostRecordingModal} 
          centerSelected={followUserLocation}
          ploggingSelected={showPloggingMenu} 
          merchantsSelected={showMerchantsLayer}
          onCenterSelected={(selected) => setFollowUserLocation(selected)}
          onPloggingSelected={(selected) => setShowPloggingMenu(selected)}
          onMerchantsSelected={(selected) => setShowMerchantsLayer(selected)}
        />

        {showPloggingMenu &&
          <PloggingLayer/>
        }

        {(showPloggingMenu && !showPostRecordingModal) &&
          <RecordControls
            recording={recording}
            onRecordingStart={handleRecordingStart}
            onRecordingStop={handleRecordingStop}
            elapsedTime={elapsedTime}
            distance={distance}    
            recordingCount={recordingCount}        
          />
        }   

      </MapboxGL.MapView>

      {(showMerchantsLayer) &&
        <Box position={"absolute"} width={"100%"} bottom={0} p={5}>
          <MerchantMapTicket merchant={selectedMerchant}/>
        </Box>
      }

      {!insideGeofence && (
        <Box
          position={"absolute"}
          alignItems={"center"}
          width={"100%"}
          p={4}
          bgColor={"highlight.500"}
        >
          <Text color={"white"} fontWeight={"bold"}>
            {t("screens.map.banners.outsideSupportedArea")}
          </Text>
        </Box>
      )}
      <PostRecordingModal 
        show={showPostRecordingModal} 
        onModalClose={handlePostRecordingModalClose}
        gpx={gpx}
      />
    </Box>
  );
};

export default Map;
