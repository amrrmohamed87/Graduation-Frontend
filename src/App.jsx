import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./root/RootLayout";
import Home from "./pages/Home";
import Error from "./Error/Error";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
