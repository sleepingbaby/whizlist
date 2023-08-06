import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { AppIconSmall } from "./AppIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
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
      <Link to="/login" style={{ textDecoration: "none" }} className="link">
        <Typography>Login</Typography>
      </Link>
    </Stack>
  );
};

export default Navbar;
