import { Outlet } from "react-router-dom";

import NewNavbar from "../components/NewNavbar.jsx";
import Scroll from "@/routes/Scroll.jsx";

export default function RootLayout() {
  return (
    <>
      <Scroll />
      <NewNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
