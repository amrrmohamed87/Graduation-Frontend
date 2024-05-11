import { motion } from "framer-motion";

import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import TopDoctors from "../components/TopDoctors";
import Footer from "../components/Footer";
import { features } from "@/data/constants";

import hero from "../assets/images/hero.jpg";
import DownLoadApp from "../components/DownloadApp";
import { Link } from "react-router-dom";
import { PiTelegramLogo } from "react-icons/pi";
import { RiMentalHealthLine } from "react-icons/ri";

export default function Home() {
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: "100vw", // Starts off-screen to the left, 'vw' stands for viewport width
    },
    visible: {
      opacity: 1,
      x: 0, // Ends at its natural position
      transition: {
        duration: 0.9,
        ease: "easeInOut",
      },
    },
  };

  const upwardMotionVariants = {
    offscreen: {
      opacity: 0,
      y: 500, // Start below the natural position
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Optional, for a spring-like effect
        bounce: 0.1, // Adjust the bounce effect, if spring type is used
        duration: 2,
      },
    },
  };

  const fadeInMotionVariants = {
    offscreen: {
      opacity: 0,
      y: 60,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Optional, for a spring-like effect
        bounce: 0.4, // Adjust the bounce effect, if spring type is used
        duration: 5,
      },
    },
  };

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
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={upwardMotionVariants}
          className="absolute inset-2 left-4 md:inset-4 md:mt-36 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-end"
        >
          <h2 className="text-white text-[40px] md:text-[70px]">
            مصر للتأمين الصحي
          </h2>
          <p className="text-slate-300 text-[20px] md:text-[35px] mt-4 md:mt-0">
            أعظم ثروة هي الصحة، والحياة مع التأمين يخلق ثروة عظيمة
          </p>
          <div className="flex flex-col justify-center items-end mt-8 md:flex-row md:items-start md:gap-4">
            <Link
              to="contact-us"
              className="text-center bg-white flex justify-center gap-1 w-[150px] py-2 rounded-lg mb-3 md:w-[200px] md:items-center"
            >
              <PiTelegramLogo size={23} className="text-emerald-500" />
              <button className="text-[20px] md:text-[23px]">
                التواصل معنا
              </button>
            </Link>
            <Link
              to="/health-awareness"
              className="text-center bg-emerald-800 flex justify-center gap-1 w-[150px] py-2 rounded-lg md:w-[200px] md:items-center"
            >
              <RiMentalHealthLine size={23} className="text-white" />
              <button className="text-[20px] md:text-[23px] text-white">
                التوعية الصحية
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={upwardMotionVariants}
      >
        <h1 className="text-center text-[#056558] mt-12 text-[22px] md:text-[30px]">
          مميزاتنا
        </h1>
        <p className="text-center text-gray-800 text-[25px] md:text-[40px]">
          التأمين الأفضل يبدأ من هنا
        </p>
        <div className="flex flex-col justify-center items-center gap-8 sm:flex sm:flex-row sm:justify-center sm:gap-16 sm:p-4 sm:mt-4">
          {features.map((feature) => (
            <Link key={feature.src} to={feature.link}>
              <div className="p-4 w-[290px] h-[290px] bg-white shadow-md rounded-lg md:p-12 flex flex-col justify-center items-end text-right">
                <img src={feature.src} className="w-[70px] mt-8 mb-3" />
                <h2 className="text-black md:text-[25px] mb-2">
                  {feature.label}
                </h2>
                <p className="text-gray-800 md:text-[18px]">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={fadeInMotionVariants}
      >
        <AboutUs />
      </motion.div>
      <Services />
      <DownLoadApp />
      <Footer />
    </main>
  );
}
