import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { listingContext } from "../contexts/ListingContext";

const MapPage = () => {
  const { location, setLocation } = useContext(listingContext);
  const [queryParams] = useSearchParams();
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");

  useEffect(() => {
    if (lat && lng && !location) {
      setLocation({ latitude: lat, longitude: lng });
    }
  }, [location]);

  return (
    <div>
      Latitude: {lat} Longitude: {lng}
    </div>
  );
};

export default MapPage;
