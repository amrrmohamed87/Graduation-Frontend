import { Outlet } from "react-router-dom";

import NewNavbar from "../components/NewNavbar.jsx";

export default function RootLayout() {
  return (
    <>
      <NewNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
