import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./root/RootLayout";
import Home from "./pages/Home";
import Error from "./Error/Error";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signin from "./pages/Signin.jsx";
import NewLogin from "./pages/NewLogin.jsx";
import { action as authAction } from "./pages/NewLogin.jsx";
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
      { path: "service", element: <Service /> },
      { path: "searchmed", element: <MedSearch/> },
      { path: "docsearch", element: <DocSearch/> },
      { path: "health-awareness", element: <HealthAwareness /> },
      { path: "ca", element: <Nutrition /> },
      { path: "logout", action: logoutAction },
    ],
  },
  { path: "login", element: <NewLogin />, action: authAction },
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

export default function App() {
  return <RouterProvider router={router} />;
}
