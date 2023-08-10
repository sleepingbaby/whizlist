import React, { useCallback, useContext, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { listingContext } from "../contexts/ListingContext";
const containerStyle = {
  flex: 1,
  border: "8px solid #597B91",
  borderRadius: "8px",
};
const Map = () => {
  const { location, locationLoaded } = useContext(listingContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIDSV3mtPwcrkvmNGME0V9A88Ix_btizg",
  });
  const [map, setMap] = useState(null);
  const loaded = locationLoaded && isLoaded;
  const center = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
  };

  const onLoad = (map) => {
    // const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(18);

    setMap(map);
  };

  const onUnmount = (map) => {
    setMap(null);
  };

  return loaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onMount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
