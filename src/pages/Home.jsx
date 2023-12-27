import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import hero from "../assets/images/hero.jpg";
import AboutUs from "../components/AboutUs";
export default function Home() {
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
    <main className="h-screen">
      <header className="">
        <Navbar isScrolled={isScrolled} />
        <div className="flex flex-col justify-center items-center relative">
          <img src={hero} className="object-contain w-full" />
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full ">
            <h2 className="text-[80px] text-slate-200 font-bold mb-2">
              مصر للتأمين الصحي
            </h2>
            <p className="text-[40px] text-slate-300 ">
              أعظم الثروة هي الصحة، والحياة مع التأمين يخلق ثروة عظيمة
            </p>
          </div>
        </div>
      </header>
      <AboutUs />
    </main>
  );
}
