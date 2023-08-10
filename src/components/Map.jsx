import React, { useContext, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { listingContext } from "../contexts/ListingContext";
import { VITE_GOOGLE_API_KEY } from "../../.env";
const containerStyle = {
  flex: 1,
  border: "8px solid #597B91",
  borderRadius: "8px",
};
const libraries = ["places"];
const Map = () => {
  const { location, locationLoaded, toilets } = useContext(listingContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_API_KEY,
    libraries: libraries,
  });
  const [map, setMap] = useState(null);
  const loaded = locationLoaded && isLoaded;
  const center = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
  };

  const onLoad = (map) => {
    map.setZoom(15);

    setMap(map);
  };

  const onUnmount = (map) => {
    setMap(null);
  };

  const handleMarkerClick = (marker) => {
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${marker.latitude},${marker.longitude}`;
    window.open(googleMapsLink, "_blank");
  };

  return loaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onMount={onUnmount}
    >
      <Marker position={center} />
      {toilets ? (
        toilets.map((toilet) => (
          <Marker
            key={toilet.id}
            position={{ lat: toilet.latitude, lng: toilet.longitude }}
            onClick={() => handleMarkerClick(toilet)}
            icon={{
              url: "noun-public.svg",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
