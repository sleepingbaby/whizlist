import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { UserContextProvider } from "./contexts/UserContext";
import { ListingContextProvider } from "./contexts/ListingContext";
import { LoadScript } from "@react-google-maps/api";
const libraries = ["places"];

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadScript
    googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
    libraries={libraries}
  >
    <ListingContextProvider>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserContextProvider>
    </ListingContextProvider>
  </LoadScript>
);
