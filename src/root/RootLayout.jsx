import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Menu from "../components/Menu.jsx";

export default function RootLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  function handleScroll() {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Menu isScrolled={isScrolled} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
