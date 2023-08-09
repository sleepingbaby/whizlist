import { createContext, useState, useEffect } from "react";
import { toilet } from "../utilities";

export const listingContext = createContext({
  location: null,
  setLocation: () => null,
});

export function ListingContextProvider({ children }) {
  const [location, setLocation] = useState();
  const [toilets, setToilets] = useState([]);
  useEffect(() => {
    const getToilets = async () => {
      try {
        let response = await toilet.get(
          `by_location?lat=${location.latitude}&lng=${location.longitude}`
        );
        const data = await response.data;
        setToilets(data);
      } catch (err) {
        console.log(err);
      }
    };
    getToilets();
  }, [location]);

  console.log(toilets);

  return (
    <listingContext.Provider value={{ location, setLocation }}>
      {children}
    </listingContext.Provider>
  );
}
