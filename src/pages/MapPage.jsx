import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { listingContext } from "../contexts/ListingContext";
import { List, Stack, Skeleton, Box } from "@mui/material";
import Listing from "../components/Listing";
import Map from "../components/Map";

const ListingsLoading = () => {
  return (
    <Stack spacing={1}>
      {Array.from(Array(6)).map((_, index) => (
        <Skeleton key={index} variant="rectangular" height={80} width="100%" />
      ))}
    </Stack>
  );
};

const MapPage = () => {
  const { location, setLocation, toilets, toiletsLoaded } =
    useContext(listingContext);
  const [queryParams] = useSearchParams();
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");

  useEffect(() => {
    if (lat !== location.latitude || lng !== location.longitude) {
      setLocation({ latitude: lat, longitude: lng });
    }
  }, [location]);

  return (
    <Stack direction="row" pt={5} spacing={2} flex={1} overflow="hidden">
      <Stack maxHeight="100%" minWidth={{ xs: "100%", sm: "500px" }}>
        <List
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "500px" },
            backgroundColor: "white",
            overflow: "scroll",
            borderRadius: "8px",
            "::-webkit-scrollbar": {
              width: "0",
              background: "transparent",
            },
            // border: "8px solid ",
            borderColor: "primary.main",
            maxHeight: "100%",
            minHeight: "100%",
            padding: 0,
          }}
        >
          <Box
            sx={{
              backgroundColor: "secondary.main",
              color: "white",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {toilets.length} Toilets Near You
          </Box>
          {!toiletsLoaded ? (
            <ListingsLoading />
          ) : (
            toilets.map((toilet) => <Listing key={toilet.id} toilet={toilet} />)
          )}
        </List>
      </Stack>
      <Box display="flex" flex="1" visibility={{ xs: "none" }}>
        <Map />
      </Box>
      x
    </Stack>
  );
};

export default MapPage;
