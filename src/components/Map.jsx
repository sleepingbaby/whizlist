import React, { useContext, useState, useEffect } from "react";
import { GoogleMap, MarkerF as Marker } from "@react-google-maps/api";
import { listingContext } from "../contexts/ListingContext";
const containerStyle = {
  flex: 1,
  border: "8px solid #3E4D6A",
  borderRadius: "8px",
  minHeight: "500px",
};

const Map = () => {
  const { location, locationLoaded, toilets } = useContext(listingContext);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    setCenter({
      lat: Number(location.latitude),
      lng: Number(location.longitude),
    });
  }, [location]);

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

  return locationLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onMount={onUnmount}
    >
      {toilets ? (
        <>
          <Marker position={center} />
          {toilets.map((toilet) => (
            <Marker
              key={toilet.id}
              position={{ lat: toilet.latitude, lng: toilet.longitude }}
              onClick={() => handleMarkerClick(toilet)}
              icon={{
                url: "noun-public.svg",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
