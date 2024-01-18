import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { navLinks } from "../data/constants";
import logo1 from "../assets/images/MHI.png";
import logo2 from "../assets/images/MHI-Emerald.svg";

export default function Menu() {
  // State to Manage the navbar's visibility on small screens
  const [isSidebar, setIsSidebar] = useState(false);
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

  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/login");
  }

  function handleSidebar() {
    setIsSidebar(!isSidebar);
  }

  return (
    <header className="z-10 absolute">
      <nav
        className={`flex justify-between items-center p-4  w-full h-24 max-w-[1536px] mx-auto fixed transition-all duration-300 ${
          isScrolled ? "bg-[#f7f5f2] shadow-md" : "bg-transparent shadow-none"
        }`}
      >
        <NavLink to="/">
          <img
            src={isScrolled ? logo2 : logo1}
            alt="logo"
            className="px-6 w-[150px]"
          />
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className={`p-6
                ${
                  isScrolled
                    ? "text-xl text-emerald-950 hover:text-slate-500"
                    : "text-xl text-slate-300 hover:text-slate-100"
                }`}
            >
              <NavLink to={item.to}>{item.label}</NavLink>
            </li>
          ))}
          {/* <div className="flex items-end">
            <button
              onClick={navigateHandler}
              className={
                isScrolled
                  ? "text-xl text-emerald-950 hover:text-slate-500 px-8"
                  : "text-xl text-slate-300 hover:text-slate-100 px-8"
              }
            >
              تسجيل الدخول
            </button>
          </div> */}
        </ul>

        {/* Mobile Icon */}
        <div
          onClick={handleSidebar}
          className={
            isScrolled
              ? "block cursor-pointer text-emerald-950 md:hidden"
              : "block cursor-pointer text-white md:hidden"
          }
        >
          {!isSidebar && <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Sidebar */}
        <ul
          className={
            isSidebar
              ? "fixed md:hidden right-0 top-0 w-[50%] h-full border-r border-r-gray-9000 bg-[#f7f5f2] ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 right-[-100%]"
          }
        >
          <div className="flex justify-between items-center">
            <NavLink to="/">
              <img src={logo2} alt="logo" className="px-3 w-[100px]" />
            </NavLink>
            <button onClick={handleSidebar} className="p-3 text-emerald-950">
              {isSidebar && <AiOutlineClose size={20} />}
            </button>
          </div>
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="m-2 p-4 shadow-md mb-4 rounded-2xl text-emerald-950  hover:bg-emerald-950 duration-300 hover:text-white cursor-pointer border-gray-600 text-end"
            >
              <NavLink to={item.to}>{item.label}</NavLink>
            </li>
          ))}
          {/*  <div className="text-right mt-8">
            <button
              onClick={navigateHandler}
              className="text-xl text-emerald-950 hover:text-slate-500 px-8"
            >
              تسجيل الدخول
            </button>
          </div> */}
        </ul>
      </nav>
    </header>
  );
}
