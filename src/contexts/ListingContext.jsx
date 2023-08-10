import { createContext, useState, useEffect } from "react";
import { toilet } from "../utilities";

const DEFAULT_LOCATION = {
  latitude: 0,
  longitude: 0,
};
export const listingContext = createContext({
  location: DEFAULT_LOCATION,
  setLocation: () => null,
});

export function ListingContextProvider({ children }) {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [toilets, setToilets] = useState([]);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [toiletsLoaded, setToiletsLoaded] = useState(false);

  useEffect(() => {
    if (location && !locationLoaded) {
      setLocationLoaded(true);
    }
  }, [location]);

  useEffect(() => {
    const getToilets = async () => {
      setToilets([]); // Initialize toilets to an empty array
      if (
        locationLoaded &&
        location?.latitude !== 0 &&
        location?.longitude !== 0
      ) {
        try {
          let response = await toilet.get(
            `by_location?lat=${location.latitude}&lng=${location.longitude}`
          );
          const data = await response.data;
          setToilets(data);
          setToiletsLoaded(true);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getToilets(); // Fetch toilets immediately when the component mounts
  }, [locationLoaded, location]);

  return (
    <listingContext.Provider
      value={{ location, setLocation, toilets, locationLoaded, toiletsLoaded }}
    >
      {children}
    </listingContext.Provider>
  );
}
