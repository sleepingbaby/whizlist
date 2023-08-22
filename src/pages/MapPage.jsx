import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { listingContext } from "../contexts/ListingContext";
import { List, Stack, Skeleton, Box, Typography, Link } from "@mui/material";
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
    <Stack
      direction={{ sm: "column", md: "row" }}
      pt={5}
      pb={2}
      gap={2}
      flex={1}
      height={`calc(100% - 40px)`}
    >
      <Box display="flex" flex="1">
        <Map />
      </Box>
      <Stack
        maxHeight="100%"
        minHeight="100%"
        minWidth={{ sm: "100%", md: "500px" }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: { sm: "100%", md: "500px" },
            overflow: "auto",
            borderRadius: "8px",
            "::-webkit-scrollbar": {
              width: "0",
              background: "transparent",
            },
            // border: "8px solid ",
            borderColor: "primary.main",
            maxHeight: "100%",
            minHeight: "100%",
            margin: 0,
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
            {toilets.length > 0 ? (
              <Typography>{toilets.length} Toilets Near You</Typography>
            ) : (
              <Typography>Loading...</Typography>
            )}
            <Link
              href="https://www.refugerestrooms.org/restrooms/new"
              target="_blank"
              sx={{ fontSize: ".8rem" }}
            >
              Submit a new toilet
            </Link>
          </Box>
          {!toiletsLoaded ? (
            <ListingsLoading />
          ) : (
            toilets.map((toilet) => <Listing key={toilet.id} toilet={toilet} />)
          )}
        </List>
      </Stack>
    </Stack>
  );
};

export default MapPage;
