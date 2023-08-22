import { Button, Stack, TextField, Typography } from "@mui/material";
import AppIcon from "./AppIcon";
import { listingContext } from "../contexts/ListingContext";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Loading from "../pages/Loading";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LandingPage = () => {
  const navigate = useNavigate();
  const { setLocation } = useContext(listingContext);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const handleSelect = async (address) => {
    setAddress(address);
    try {
      const results = await geocodeByAddress(address);
      const location = await getLatLng(results[0]);
      setCustomLocation(location);
    } catch (error) {
      console.error("Error geocoding selected place: ", error);
    }
  };

  const handleSubmit = () => {
    setLocation({
      latitude: customLocation.lat,
      longitude: customLocation.lng,
    });
    navigate(`/map?lat=${customLocation.lat}&lng=${customLocation.lng}`);
  };

  const handleLocate = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
      navigate(
        `/map?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", margin: "auto" }}
        >
          <AppIcon />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
            mt={4}
            sx={{ width: "100%", maxWidth: "700px" }}
          >
            {/* <TextField
              id="filled-basic"
              label="Location..."
              variant="filled"
              sx={{ ...InputCSS }}
            /> */}
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <Stack
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <TextField
                    id="filled-basic"
                    variant="filled"
                    label="Location..."
                    sx={{ ...InputCSS }}
                    {...getInputProps({})}
                  />
                  <Stack
                    zIndex={20}
                    maxHeight="125px"
                    position="absolute"
                    overflow="hidden"
                    sx={{
                      top: "60px",
                      width: "100%",
                    }}
                  >
                    {loading && <></>}
                    {suggestions.map((suggestion, index) => {
                      const style = {
                        backgroundColor: "#D9D9D9",
                        color: "#828282",
                        maxWidth: "100%",
                      };
                      return (
                        <Stack
                          key={index}
                          className="suggestion"
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          <Typography
                            sx={{
                              "&:hover": {
                                backgroundColor: "primary.main",
                                color: "white",
                                cursor: "pointer",
                              },
                            }}
                          >
                            {suggestion.description}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              )}
            </PlacesAutocomplete>
            <Stack
              height="100%"
              width={{ xs: "90%", sm: "100px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!customLocation}
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "#324754" },
                  height: { sm: "56px" },
                  width: "100%",
                  borderRadius: "8px",
                  "&:disabled": { backgroundColor: "secondary.main" },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
          <Link
            className="link"
            onClick={handleLocate}
            style={{ marginTop: "15px" }}
          >
            Find My Location
          </Link>
        </Stack>
      )}
    </>
  );
};

const InputCSS = {
  width: { xs: "90%", sm: "100%" },
  borderRadius: "8px",
  backgroundColor: "#D9D9D9",
  color: "#828282",
  "& label.Mui-focused": { color: "#828282" },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
};

export default LandingPage;
