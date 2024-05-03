import {
  createBrowserRouter,
  Navigate,
  useLocation,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import RootLayout from "./root/RootLayout";
import Home from "./pages/Home";
import Error from "./Error/Error";
import ContactUs from "./pages/ContactUs.jsx";

import { Service } from "./pages/Service.jsx";
import { MedSearch } from "./pages/MedSearch.jsx";
import { DocSearch } from "./pages/DocSearch.jsx";
import { action as logoutAction } from "./pages/Logout.js";
import { loader as tokenLoader } from "./util/auth.js";
import Nutrition from "./health/Nutrition.jsx";
import HealthAwareness from "./health/HealthAwareness.jsx";
import ChildSafety from "./health/baby/ChildSafety.jsx";
import Vaccinations from "./health/baby/Vaccinations.jsx";
import SchoolHealth from "./health/baby/SchoolHealth.jsx";
import BabyNutrition from "./health/baby/BabyNutrition.jsx";
import BeforePregnancy from "./health/woman/BeforePregnancy.jsx";
import AfterPregnancy from "./health/woman/AfterPregnancy.jsx";
import DuringPregnancy from "./health/woman/DuringPregnancy.jsx";
import Birth from "./health/woman/Birth.jsx";
import Elderly from "./health/senior/Elderly.jsx";
import Alzheimers from "./health/senior/Alzheimers.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import Admin from "./pages/Admin.jsx";
import Hospital from "./pages/Hospital.jsx";
import Login from "./pages/Login.jsx";
import { useEffect } from "react";
import Contact from "./pages/Contact.jsx";
import { DoctorDashBoard } from "./pages/DoctorDashBoard";
import HospitalAdmin from "./pages/HospitalAdmin";

function PrivateRoutes({ roles, children }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ location }} replace />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/* function useRoleRedirect() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const publicRoutes = [
      "/",
      "/health-awareness",
      "/ca",
      "/service",
      "/searchmed",
      "/docsearch",
      "/contact-us",
      "/child-safety",
      "/vaccinations",
      "/school-health",
      "/baby-nutrition",
      "/before-pregnancy",
      "/during-pregnancy",
      "/after-pregnancy",
      "/care-of-the-elderly",
      "/alzheimers",
      "/birth",
    ];

    const isAccessingPublicRoutes = publicRoutes.includes(pathname);

    if (isAccessingPublicRoutes) {
      switch (role) {
        case "doctor":
          navigate("/doctor");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "hospital":
          navigate("/hospital");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [navigate, location, role]);
} */

export default function App() {
  //useRoleRedirect();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        { path: "", element: <Home /> },
        { path: "health-awareness", element: <HealthAwareness /> },
        { path: "ca", element: <Nutrition /> },
        { path: "service", element: <Service /> },
        { path: "searchmed", element: <MedSearch /> },
        { path: "docsearch", element: <DocSearch /> },
        { path: "contact-us", element: <Contact /> },
        { path: "logout", action: logoutAction },
      ],
    },
    { path: "/login", element: <Login /> },
    {
      path: "/doctor",
      element: (
        <PrivateRoutes roles={["doctor"]}>
          <DoctorDashBoard />
        </PrivateRoutes>
      ),
    },
    {
      path: "/admin",
      element: (
        <PrivateRoutes roles={["admin"]}>
          <Admin />
        </PrivateRoutes>
      ),
    },
    {
      path: "/hospital",
      element: (
        <PrivateRoutes roles={["hospital"]}>
          <Hospital />
        </PrivateRoutes>
      ),
    },
    {
      path: "/hospitalAdmin",
      element: (
        <PrivateRoutes roles={["HospitalAdmin"]}>
          <HospitalAdmin />
        </PrivateRoutes>
      ),
    },
    { path: "child-safety", element: <ChildSafety /> },
    { path: "vaccinations", element: <Vaccinations /> },
    { path: "school-health", element: <SchoolHealth /> },
    { path: "baby-nutrition", element: <BabyNutrition /> },
    { path: "before-pregnancy", element: <BeforePregnancy /> },
    { path: "during-pregnancy", element: <DuringPregnancy /> },
    { path: "after-pregnancy", element: <AfterPregnancy /> },
    { path: "birth", element: <Birth /> },
    { path: "care-of-the-elderly", element: <Elderly /> },
    { path: "alzheimers", element: <Alzheimers /> },
  ]);

  return <RouterProvider router={router} />;
}
