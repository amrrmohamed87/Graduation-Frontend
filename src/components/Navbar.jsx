import { Link } from "react-router-dom";

import { navLinks } from "../data/constants";
import logoImage1 from "../assets/images/MHI.png";
import logoImage2 from "../assets/images/MHI-Emerald.svg";
//import hamburger from "../assets/icons/hamburger.svg";

export default function Navbar({ isScrolled }) {
  return (
    <header className="w-full z-10 bg-[#F7F5F2] absolute">
      <nav
        className={`flex justify-center items-centeR max-container w-full fixed transition-all duration-300 ${
          isScrolled ? "bg-[#F7F5F2] shadow-md" : "bg-transparent shadow-none"
        }`}
      >
        <a href="/">
          <img
            src={isScrolled ? logoImage2 : logoImage1}
            alt="logo"
            className="px-6 w-[150px]"
          />
        </a>
        <ul className="flex flex-1 justify-center items-center gap-24">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className={
                isScrolled
                  ? "text-xl text-emerald-950 hover:text-slate-500"
                  : "text-xl text-slate-300 hover:text-slate-100"
              }
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <button
          className={
            isScrolled
              ? "text-xl text-emerald-950 hover:text-slate-500 px-8"
              : "text-xl text-slate-300 hover:text-slate-100 px-8"
          }
        >
          تسجيل الدخول
        </button>

        {/*  <div className="hidden max-lg:block fixed">
          <img src={hamburger} alt="Hamburger" width={25} height={25} />
        </div> */}
      </nav>
    </header>
  );
}
