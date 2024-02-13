import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import TopDoctors from "../components/TopDoctors";
import Footer from "../components/Footer";

import hero from "../assets/images/hero.jpg";

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
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
          <h2 className="text-white text-[80px]">مصر للتأمين الصحي</h2>
          <p className="text-slate-300 text-[40px] mt-2 md:mt-0">
            أعظم الثروة هي الصحة، والحياة مع التأمين يخلق ثروة عظيمة
          </p>
        </div>
      </section>
      <AboutUs />
      <Services />
      <TopDoctors />
      <Footer />
    </main>
  );
}
