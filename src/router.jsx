import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import App from "./App.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import MapPage from "./pages/MapPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
    ],
  },
]);

export default router;
