import React from "react";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%" }}
    >
      <div id="roll">
        <div id="top">
          <div id="hole"></div>
        </div>

        <div id="shadow"></div>

        <div id="cut">
          <div id="inner-cut"></div>
        </div>

        <div id="paper"></div>
        <div id="paper-fall"></div>
      </div>
    </Box>
  );
};

export default Loading;
