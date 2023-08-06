import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppBody = () => {
  return (
    <Stack height="100%">
      <Navbar showLogo={false} />
      <Outlet />
    </Stack>
  );
};

export default AppBody;
