import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import TopDoctors from "../components/TopDoctors";
import Footer from "../components/Footer";

import hero from "../assets/images/hero.jpg";
import DownLoadApp from "../components/DownloadApp";
import { Link } from "react-router-dom";
import { PiTelegramLogo } from "react-icons/pi";
import { RiMentalHealthLine } from "react-icons/ri";

export default function Home() {
  return (
    <main>
      <section className="relative h-screen w-full">
        <div className="absolute w-full h-screen">
          <img
            src={hero}
            className="object-cover object-center h-screen w-full"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-2 left-4 md:inset-4 md:mt-36 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-end">
          <h2 className="text-white text-[65px] md:text-[80px]">
            مصر للتأمين الصحي
          </h2>
          <p className="text-slate-300 text-[25px] md:text-[40px] mt-4 md:mt-0">
            أعظم ثروة هي الصحة، والحياة مع التأمين يخلق ثروة عظيمة
          </p>
          <div className="flex flex-col justify-center items-end mt-8">
            <Link className="text-center bg-white flex justify-center gap-1 w-[150px] py-2 rounded-lg mb-3">
              <PiTelegramLogo size={23} className="text-emerald-500" />
              <button className="text-[20px]">التواصل معنا</button>
            </Link>
            <Link className="text-center bg-white flex justify-center gap-1 w-[150px] py-2 rounded-lg">
              <RiMentalHealthLine size={23} className="text-emerald-500" />
              <button className="text-[20px]">التوعية الصحية</button>
            </Link>
          </div>
        </div>
      </section>
      <AboutUs />
      <Services />
      <DownLoadApp />
      <Footer />
    </main>
  );
}
