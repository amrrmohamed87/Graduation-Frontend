import { Routes, Route } from "react-router-dom";

import AuthLayout from "./authentication/AuthLayout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
//import AboutUs from "./components/AboutUs";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route element={<AuthLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
        {/* Private Pages */}
      </Routes>
    </>
  );
}
