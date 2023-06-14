

const MarkersLayer = ({ markers, iconImage }) => {
  const markersGeoJSON = {
    type: "FeatureCollection",
    features: markers.map((marker) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            marker.longitude,
            marker.latitude,
          ],
        },
        properties: marker.properties
      };
    }),
  };

  return (
    <MapboxGL.ShapeSource
      id={"markersSource"}
      type={"geojson"}
      // onPress={(feature) => onShapeSourceLayer(feature)}
      shape={markersGeoJSON}
    >
      <MapboxGL.SymbolLayer
        id={"markersLayer"}
        sourceID={"markersSource"}
        minZoomLevel={8}
        style={Object({
          iconImage,
        })}
      />
    </MapboxGL.ShapeSource>
  );
};

export default MarkersLayer;