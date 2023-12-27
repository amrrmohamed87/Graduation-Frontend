import { navLinks } from "../data/navbar";
import logoImage1 from "../assets/images/MHI.png";
import logoImage2 from "../assets/images/MHI-Black.svg";
export default function Navbar({ isScrolled }) {
  return (
    <header className="w-full z-10 bg-[#F7F5F2] absolute">
      <nav
        className={`flex flex-1 justify-center items-center w-full fixed transition-all duration-300 ${
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
                  ? "text-xl text-slate-950 hover:text-slate-500"
                  : "text-xl text-slate-300 hover:text-slate-100"
              }
            >
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={
            isScrolled
              ? "text-xl text-slate-950 hover:text-slate-500 px-8"
              : "text-xl text-slate-300 hover:text-slate-100 px-8"
          }
        >
          تسجيل الدخول
        </button>
      </nav>
    </header>
  );
}
