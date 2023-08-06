import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/Login.jsx";
import App from "./App.jsx";

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
    ],
  },
]);

export default router;
