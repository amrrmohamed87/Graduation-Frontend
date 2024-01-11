import Menu from "../components/Menu.jsx";

import bg from "../assets/images/contact-us1.jpg";
import { backendEngineers, frontendEngineers } from "../data/constants.js";

export default function ContactUs() {
  return (
    <main className="">
      <Menu />
      <section className="relative h-screen w-full">
        <div className="absolute w-full h-screen">
          <img src={bg} className="object-cover object-center w-full h-full" />
        </div>
        <div className="absolute mt-12 md:mt-0 inset-2 left-4 md:inset-0 flex flex-col justify-center items-center">
          <h1 className="text-lg sm:text-3xl text-white font-[Poppins] font-[200]">
            Modern Academy Engineers
          </h1>
          <ul className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {frontendEngineers.map((engineer) => (
              <div key={engineer.name} className="font-[Poppins] text-center">
                <h2 className="text-white text-lg md:text-2xl font-[500] mb-1">
                  {engineer.name}
                </h2>
                <p className="text-slate-300 text-sm md:text-lg font-[400]">
                  {engineer.specialization}
                </p>
                <p className="text-slate-100 text-sm md:text-lg font-[300]">
                  {engineer.email}
                </p>
              </div>
            ))}
          </ul>
          <ul className="mt-3 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {backendEngineers.map((engineer) => (
              <div key={engineer.name} className="font-[Poppins] text-center">
                <h2 className="text-white text-xl md:text-2xl font-[500] mb-1">
                  {engineer.name}
                </h2>
                <p className="text-slate-300 text-sm md:text-lg font-[400]">
                  {engineer.specialization}
                </p>
                <p className="text-slate-100 text-sm md:text-lg font-[300]">
                  {engineer.email}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
