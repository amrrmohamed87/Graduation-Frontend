import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./root/RootLayout";
import Home from "./pages/Home";
import Error from "./Error/Error";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signin from "./pages/Signin.jsx";
import NewLogin from "./pages/NewLogin.jsx";
import { action as authAction } from "./pages/NewLogin.jsx";
import { action as logoutAction } from "./pages/Logout.js";
import { loader as tokenLoader } from "./util/auth.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      { path: "", element: <Home /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "logout", action: logoutAction },
    ],
  },
  { path: "login", element: <NewLogin />, action: authAction },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
