import React, { useEffect, useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { AppIconSmall } from "./AppIcon";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import { api } from "../utilities";
import WcIcon from "@mui/icons-material/Wc";
import { listingContext } from "../contexts/ListingContext";

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
  console.log(user);
  const handleLogoClick = () => {
    setLocation(null);
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
        <Link to="/" style={{ marginRight: "auto" }} onClick={handleLogoClick}>
          <AppIconSmall />
        </Link>
      )}

      {!user ? (
        <Link to="/login" style={{ textDecoration: "none" }} className="link">
          <Typography>Login</Typography>
        </Link>
      ) : (
        <Stack direction="row" alignItems="flex-end">
          <Typography sx={{ color: "white", marginRight: "15px" }}>
            {user.email}
          </Typography>
          <Typography
            sx={{
              color: "white",
              marginRight: "15px",
            }}
          >
            <WcIcon color="primary.main" fontSize="small" />
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }} className="link">
            <Typography onClick={logOut}>Logout</Typography>
          </Link>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
