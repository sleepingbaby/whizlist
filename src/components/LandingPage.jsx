import { Button, Stack, TextField } from "@mui/material";
import AppIcon from "./AppIcon";
import { listingContext } from "../contexts/ListingContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";

const LandingPage = () => {
  const navigate = useNavigate();
  const { location, setLocation } = useContext(listingContext);
  const [loading, setLoading] = useState(false);
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
  // useEffect(() => {
  //   if (location.latitude !== 0 && location.longitude !== 0) {
  //     navigate(`/map?lat=${location.latitude}&lng=${location.longitude}`);
  //   }
  // }, [location.latitude, location.longitude, navigate]);

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
            spacing={2}
            mt={4}
            sx={{ width: "100%", maxWidth: "700px" }}
          >
            <TextField
              id="filled-basic"
              label="Location..."
              variant="filled"
              sx={{ ...InputCSS }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "#324754" },
                height: { sm: "56px" },
                width: { xs: "90%", sm: "100px" },
                borderRadius: "8px",
              }}
            >
              Submit
            </Button>
          </Stack>
          <Button onClick={handleLocate}>Find My Location</Button>
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
  marginTop: "25px",
  "& label.Mui-focused": { color: "#828282" },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
};

export default LandingPage;
