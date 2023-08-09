import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { UserContextProvider } from "./contexts/UserContext";
import { ListingContextProvider } from "./contexts/ListingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListingContextProvider>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserContextProvider>
    </ListingContextProvider>
  </React.StrictMode>
);
