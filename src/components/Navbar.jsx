import React, { useEffect, useContext } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { AppIconSmall } from "./AppIcon";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import { api } from "../utilities";
import { listingContext } from "../contexts/ListingContext";
import { SentimentSatisfied } from "@mui/icons-material";

const Navbar = () => {
  const { setLocation } = useContext(listingContext);
  const { user, setUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/");
      setUser(response.data);
      navigate("/");
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    whoAmI();
  }, []);

  const logOut = async () => {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      setUser(null);
      delete api.defaults.headers.common["Authorization"];
      navigate("/");
    }
  };

  const showLogo = location.pathname === "/";
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      height={52}
    >
      {!showLogo && (
        <Link to="/" style={{ marginRight: "auto" }}>
          <AppIconSmall />
        </Link>
      )}

      {!user ? (
        <Link to="/login" style={{ textDecoration: "none" }} className="link">
          <Typography>Login</Typography>
        </Link>
      ) : (
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="flex-end">
          <Link
            to="/profile"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <Typography
              component={"span"}
              display={{ xs: "none", sm: "block" }}
              sx={{ "&:hover": { color: "orange" }, marginRight: "15px" }}
            >
              {user.display_name}
            </Typography>
          </Link>
          <Box
            sx={{
              color: "white",
              marginRight: { xs: "none", sm: "15px" },
            }}
          >
            <Link to="/profile">
              {user.profile_pic ? (
                <Avatar
                  src={`${import.meta.env.VITE_BACKEND_URL}${user.profile_pic}`}
                />
              ) : (
                <Avatar>
                  <SentimentSatisfied fontSize="medium" />
                </Avatar>
              )}
            </Link>
          </Box>
          <Link to="/" style={{ textDecoration: "none" }} className="link">
            <Typography component={"span"} onClick={logOut}>
              Logout
            </Typography>
          </Link>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
